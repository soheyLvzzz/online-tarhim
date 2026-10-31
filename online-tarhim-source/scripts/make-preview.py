"""Embed exactly the entrypoints referenced by the current Vite HTML build."""
import base64
import mimetypes
from pathlib import Path
import re


def data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')


def build_preview(root: Path) -> Path:
    dist = root / 'dist'
    html = (dist / 'index.html').read_text()

    def inline_script(match: re.Match) -> str:
        # Use the HTML's exact entrypoint, never the first file in an asset glob.
        script_path = dist / match[1]
        js = script_path.read_text()
        js = re.sub(
            r'''(?P<quote>["'])\./assets/(?P<name>[^"']+)(?P=quote)''',
            lambda asset: asset['quote'] + data_url(dist / 'assets' / asset['name']) + asset['quote'],
            js,
        )
        return '<script type="module">' + js.replace('</script', '<\\/script') + '</script>'

    def inline_stylesheet(match: re.Match) -> str:
        tag = match[0]
        if not re.search(r'''\brel=["']stylesheet["']''', tag):
            return tag
        href = re.search(r'''\bhref=["']([^"']+)["']''', tag)
        if href is None:
            raise ValueError('Stylesheet has no href')
        css_path = dist / href[1]
        css = css_path.read_text()
        css = re.sub(
            r'url\(([^)]+)\)',
            lambda asset: 'url("' + data_url((css_path.parent / asset[1].strip('\"\'')).resolve()) + '")',
            css,
        )
        return '<style>' + css + '</style>'

    html, script_count = re.subn(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*></script>', inline_script, html)
    html = re.sub(r'<link\b[^>]*>', inline_stylesheet, html)
    if script_count == 0:
        raise ValueError('Build HTML contains no script entrypoint')
    if re.search(r'''(?:src|href)=["']\./assets/''', html):
        raise ValueError('Preview still contains external build entrypoints')
    output = root / 'preview.html'
    output.write_text(html)
    return output


if __name__ == '__main__':
    output = build_preview(Path(__file__).resolve().parents[1])
    print(f'Created {output.name} from exact current HTML entrypoints with embedded assets.')
