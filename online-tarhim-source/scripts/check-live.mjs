import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Check actual deployed bytes; health.json alone never proves app/runtime health. */
export async function checkLive(address, fetchFile = fetch) {
  const base = new URL(address);
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash) throw new Error('Use an HTTPS site/folder URL without credentials or query');
  if (!base.pathname.endsWith('/')) base.pathname += '/';
  async function download(path) {
    const url = new URL(path, base);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) throw new Error('Public file URL escapes site/folder');
    const response = await fetchFile(url, { redirect: 'error', headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
    return Buffer.from(await response.arrayBuffer());
  }
  let manifest;
  try { manifest = JSON.parse((await download('health.json')).toString('utf8')); }
  catch (error) { throw new Error(`Static health manifest unavailable/invalid: ${error.message}`); }
  if (manifest.schemaVersion !== 1 || manifest.mode !== 'static' || manifest.service !== 'online-tarhim-landing' || !['production','staging'].includes(manifest.environment) || !Array.isArray(manifest.assets) || !manifest.assets.length || manifest.assets.length > 200) throw new Error('Unexpected static health manifest');
  const names = new Set();
  for (const item of manifest.assets) {
    if (typeof item.path !== 'string' || item.path.startsWith('/') || item.path.includes('\\') || item.path.split('/').some(x => !x || x === '.' || x === '..') || /[%?:#]/.test(item.path) || !/^[a-f0-9]{64}$/.test(item.sha256) || !Number.isSafeInteger(item.bytes) || item.bytes < 1 || names.has(item.path)) throw new Error('Invalid/duplicate public file entry');
    names.add(item.path);
  }
  if (!names.has('index.html')) throw new Error('Static manifest omits index.html');
  const expectedId = createHash('sha256').update(JSON.stringify(manifest.assets)).digest('hex').slice(0,16);
  if (manifest.buildId !== expectedId) throw new Error('Invalid manifest build identifier');
  let next = 0;
  const results = await Promise.allSettled(Array.from({ length: Math.min(4, manifest.assets.length) }, async () => {
    while (next < manifest.assets.length) {
      const item = manifest.assets[next++];
      const actual = await download(item.path);
      if (actual.length !== item.bytes || createHash('sha256').update(actual).digest('hex') !== item.sha256) throw new Error(`Deployed file differs from manifest: ${item.path}`);
    }
  }));
  const failure = results.find(result => result.status === 'rejected');
  if (failure) throw failure.reason;
  return { check: 'live-static-files', ok: true, url: base.href, environment: manifest.environment, buildId: manifest.buildId, verifiedFiles: manifest.assets.length,
    limitation: 'Verifies public files only, not business functions, browser rendering, backend or database.' };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Usage: npm run healthcheck -- https://your-domain/');
    console.log(JSON.stringify(await checkLive(process.argv[2]), null, 2));
  } catch (error) {
    console.error(JSON.stringify({ check: 'live-static-files', ok: false, error: error.message }));
    process.exitCode = 1;
  }
}
