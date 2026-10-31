"""Regression coverage for stale build assets surviving in dist/assets."""
import base64
from pathlib import Path
import tempfile
import unittest
from runpy import run_path
build_preview = run_path(str(Path(__file__).with_name('make-preview.py')))['build_preview']


class PreviewEntrypointTests(unittest.TestCase):
    def test_current_html_wins_over_older_assets(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            assets = root / 'dist/assets'
            assets.mkdir(parents=True)
            # Stale files deliberately precede the current files in creation/name order.
            (assets / 'a-old.js').write_text('const staleBundle = true;')
            (assets / 'a-old.css').write_text('.stale-layout { color: red; }')
            (assets / 'z-current.js').write_text('const currentPlans = "./assets/bullet.svg";')
            (assets / 'z-current.css').write_text('.current-full-bleed { color: gold; }')
            (assets / 'bullet.svg').write_bytes(b'<svg width="9" height="9"/>')
            (root / 'dist/index.html').write_text('<script type="module" src="./assets/z-current.js"></script><link rel="stylesheet" href="./assets/z-current.css">')
            result = build_preview(root).read_text()
            self.assertIn('currentPlans', result)
            self.assertIn('.current-full-bleed', result)
            self.assertNotIn('staleBundle', result)
            self.assertNotIn('.stale-layout', result)
            self.assertIn(base64.b64encode((assets / 'bullet.svg').read_bytes()).decode(), result)
            self.assertNotIn('./assets/', result)

    def test_missing_current_entrypoint_fails_instead_of_using_stale_file(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            assets = root / 'dist/assets'
            assets.mkdir(parents=True)
            (assets / 'old.js').write_text('const staleBundle = true;')
            (root / 'dist/index.html').write_text('<script type="module" src="./assets/missing.js"></script>')
            with self.assertRaises(FileNotFoundError):
                build_preview(root)
            self.assertFalse((root / 'preview.html').exists())


if __name__ == '__main__':
    unittest.main()
