import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectRoot } from './validate.mjs';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.zip': 'application/zip' };

export function createStaticServer(dist = resolve(projectRoot, 'dist')) {
  const root = resolve(dist);
  return createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.dutchbitcoinembassy.com; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
    const fail = (status, text) => { response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end(request.method === 'HEAD' ? undefined : text); };
    if (!['GET', 'HEAD'].includes(request.method)) { response.setHeader('Allow', 'GET, HEAD'); fail(405, 'Method not allowed'); return; }
    let path;
    try { path = decodeURIComponent((request.url ?? '/').split('?')[0]); }
    catch { fail(400, 'Invalid path encoding'); return; }
    if (!path.startsWith('/') || /[\\\u0000-\u001f\u007f]/.test(path) || path.split('/').some(part => part.startsWith('.'))) { fail(403, 'Forbidden path'); return; }
    if (path.endsWith('/')) path += 'index.html';
    const filename = resolve(root, `.${path}`);
    if (!filename.startsWith(root + sep)) { fail(403, 'Forbidden path'); return; }
    try {
      const canonicalRoot = await realpath(root), canonicalFile = await realpath(filename);
      if (!canonicalFile.startsWith(canonicalRoot + sep)) { fail(403, 'Forbidden path'); return; }
      const info = await stat(canonicalFile);
      if (!info.isFile()) { fail(404, 'Not found'); return; }
      const content = request.method === 'HEAD' ? null : await readFile(canonicalFile);
      response.writeHead(200, { 'Content-Type': types[extname(canonicalFile)] ?? 'application/octet-stream', 'Content-Length': info.size });
      response.end(content);
    } catch (error) { fail(['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500, 'Not found'); }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), port = args.length ? Number(args[1]) : 4173;
  if (args.length && (args.length !== 2 || args[0] !== '--port') || !Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Usage: npm start -- --port 4173'); process.exitCode = 1;
  } else {
    const server = createStaticServer();
    server.on('error', error => { console.error(error.message); process.exitCode = 1; });
    server.listen(port, '127.0.0.1', () => console.log(`Embassy Commons: http://127.0.0.1:${port}`));
  }
}
