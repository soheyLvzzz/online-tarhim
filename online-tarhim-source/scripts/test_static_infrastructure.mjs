import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyStaticBuild } from './verify-static-build.mjs';
import { checkLive } from './check-live.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'tarhim-static-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'assets')); await mkdir(join(root, 'fonts'));
  await writeFile(join(root, 'index.html'), '<html lang="fa" dir="rtl"><head><link rel="icon" href="./icon.png"><link rel="stylesheet" href="./assets/main.css"></head><body><script src="./assets/main.js"></script></body></html>');
  await writeFile(join(root, 'icon.png'), 'image-fixture');
  await writeFile(join(root, 'assets/main.js'), 'console.log("fixture");');
  await writeFile(join(root, 'assets/main.css'), '@font-face{src:url(../fonts/test.woff2)}');
  await writeFile(join(root, 'fonts/test.woff2'), 'font-fixture');
  return root;
}

test('checks a full static deployment and rejects modified bytes', async t => {
  const root = await fixture(t);
  const manifest = await verifyStaticBuild(root);
  const fetchFile = async url => {
    try { return new Response(await readFile(join(root, new URL(url).pathname.replace('/staging/', '')))); }
    catch { return new Response('missing', { status: 404 }); }
  };
  const result = await checkLive('https://example.test/staging/', fetchFile);
  assert.equal(result.verifiedFiles, manifest.assets.length);
  await writeFile(join(root, 'assets/main.js'), 'changed-on-host');
  await assert.rejects(checkLive('https://example.test/staging/', fetchFile), /differs from manifest/);
});

test('missing referenced font stops the build check', async t => {
  const root = await fixture(t);
  await rm(join(root, 'fonts/test.woff2'));
  await assert.rejects(verifyStaticBuild(root), /Missing referenced file/);
  await assert.rejects(readFile(join(root, 'health.json')));
});

test('production noindex and source/environment leakage are rejected', async t => {
  const root = await fixture(t);
  const html = await readFile(join(root, 'index.html'), 'utf8');
  await writeFile(join(root, 'index.html'), html.replace('</head>', '<meta name="robots" content="noindex,nofollow"></head>'));
  await assert.rejects(verifyStaticBuild(root), /robots setting/);
  await verifyStaticBuild(root, 'staging');
  await writeFile(join(root, '.env'), 'PRIVATE=not-a-real-secret');
  await assert.rejects(verifyStaticBuild(root, 'staging'), /Environment file/);
});

test('missing manifest is not reported as healthy', async () => {
  await assert.rejects(checkLive('https://example.test/', async () => new Response('missing', { status: 404 })), /HTTP 404/);
});

test('manifest cannot send checks outside the chosen site directory', async () => {
  let calls = 0;
  const fake = async () => { calls++; return new Response(JSON.stringify({ schemaVersion: 1, mode: 'static', service: 'online-tarhim-landing', environment: 'staging', assets: [{ path: '../private.txt', bytes: 1, sha256: '0'.repeat(64) }] })); };
  await assert.rejects(checkLive('https://example.test/staging/', fake), /Invalid\/duplicate/);
  assert.equal(calls, 1);
});
