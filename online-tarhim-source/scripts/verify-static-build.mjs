import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const hash = data => createHash('sha256').update(data).digest('hex');

export async function verifyStaticBuild(directory, environment = 'production') {
  if (!['production', 'staging'].includes(environment)) throw new Error('Unknown environment');
  const root = resolve(directory);
  const files = new Map();
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error(`Symlink is not a public build file: ${entry.name}`);
      const path = resolve(folder, entry.name);
      const name = relative(root, path).split(sep).join('/');
      if (entry.isDirectory()) {
        if (['.git', 'node_modules', 'src', 'docs'].includes(entry.name)) throw new Error(`Private source directory in build: ${name}`);
        await walk(path);
      } else if (entry.isFile() && name !== 'health.json') {
        if (/^\.env(?:\.|$)/.test(entry.name)) throw new Error(`Environment file in public build: ${name}`);
        const data = await readFile(path);
        if (!data.length) throw new Error(`Empty public file: ${name}`);
        files.set(name, data);
      }
    }
  }
  await walk(root);
  const html = files.get('index.html')?.toString('utf8');
  if (!html) throw new Error('Missing index.html');
  if (!/<html\b[^>]*\blang=["']fa["']/i.test(html) || !/<html\b[^>]*\bdir=["']rtl["']/i.test(html)) throw new Error('Missing Persian/RTL document attributes');
  if (!/<link\b[^>]*\brel=["']icon["']/i.test(html)) throw new Error('Missing favicon link');
  const noindex = /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
  if ((environment === 'staging') !== noindex) throw new Error(`Unexpected robots setting for ${environment}`);
  function checkReference(owner, raw) {
    if (raw.startsWith('data:') || raw.startsWith('#')) return;
    if (/^(?:[a-z]+:|\/\/)/i.test(raw)) throw new Error(`Unexpected external static reference: ${raw}`);
    const clean = decodeURIComponent(raw.split(/[?#]/)[0]);
    const path = clean.startsWith('/') ? resolve(root, `.${clean}`) : resolve(root, dirname(owner), clean);
    if (!path.startsWith(root + sep)) throw new Error(`Reference escapes build: ${raw}`);
    const name = relative(root, path).split(sep).join('/');
    if (!files.has(name)) throw new Error(`Missing referenced file: ${name} (from ${owner})`);
  }
  for (const match of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) checkReference('index.html', match[1]);
  for (const [name, data] of files) {
    if (name.endsWith('.css')) {
      for (const match of data.toString('utf8').matchAll(/url\(([^)]+)\)/g)) checkReference(name, match[1].trim().replace(/^["']|["']$/g, ''));
    }
    if (name.endsWith('.js')) {
      for (const match of data.toString('utf8').matchAll(/["'](\.\/assets\/[^"']+)["']/g)) checkReference('index.html', match[1]);
    }
  }
  const assets = [...files].sort(([a], [b]) => a.localeCompare(b)).map(([path, data]) => ({ path, bytes: data.length, sha256: hash(data) }));
  const manifest = { schemaVersion: 1, service: 'online-tarhim-landing', mode: 'static', environment,
    buildId: hash(JSON.stringify(assets)).slice(0, 16), assets };
  await writeFile(resolve(root, 'health.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await verifyStaticBuild(process.argv[2] || 'dist', process.argv[3] || 'production');
    console.log(JSON.stringify({ check: 'static-build', ok: true, buildId: result.buildId, environment: result.environment, files: result.assets.length }));
  } catch (error) {
    console.error(JSON.stringify({ check: 'static-build', ok: false, error: error.message }));
    process.exitCode = 1;
  }
}
