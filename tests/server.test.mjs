import test from 'node:test';
import assert from 'node:assert/strict';
import { request } from 'node:http';
import { mkdtemp, writeFile, mkdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createStaticServer } from '../scripts/serve.mjs';

function rawRequest(port, path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method }, response => {
      const chunks = [];
      response.on('data', data => chunks.push(data));
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks).toString() }));
    });
    req.on('error', reject); req.end();
  });
}

test('static server serves dist, supports HEAD and blocks traversal, identities and symlink escapes', async t => {
  const temp = await mkdtemp(join(tmpdir(), 'embassy-server-')), dist = join(temp, 'dist');
  await mkdir(join(dist, 'data'), { recursive: true });
  await writeFile(join(dist, 'index.html'), '<h1>Test</h1>');
  await writeFile(join(dist, 'data/config.json'), '{"safe":true}');
  await writeFile(join(temp, 'private.txt'), 'PRIVATE');
  await symlink(join(temp, 'private.txt'), join(dist, 'outside.txt'));
  const server = createStaticServer(dist);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(temp, { recursive: true, force: true }); });
  const port = server.address().port;
  assert.equal((await rawRequest(port, '/')).body, '<h1>Test</h1>');
  const json = await rawRequest(port, '/data/config.json?cache=1');
  assert.equal(json.status, 200); assert.match(json.headers['content-type'], /application\/json/);
  assert.equal(json.headers['x-content-type-options'], 'nosniff');
  const head = await rawRequest(port, '/data/config.json', 'HEAD');
  assert.equal(head.status, 200); assert.equal(head.body, ''); assert.equal(Number(head.headers['content-length']), 13);
  assert.equal((await rawRequest(port, '/data/config.json', 'POST')).status, 405);
  assert.equal((await rawRequest(port, '/missing')).status, 404);
  assert.equal((await rawRequest(port, '/%ZZ')).status, 400);
  for (const path of ['/../private.txt', '/%2e%2e/private.txt', '/.openai/project.json', '/data/%2e%2e/index.html', '/a%5cb', '/outside.txt']) assert.equal((await rawRequest(port, path)).status, 403, path);
});
