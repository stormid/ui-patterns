import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join, normalize, resolve, sep } from 'node:path';

// Serves the production static build so end-to-end tests run against the same
// minified HTML, CSS and JS that is deployed, not the dev server's output.
// Usage: node tools/testing/serve.mjs [port]
const { output } = createRequire(import.meta.url)('../../paths.config.js');

const ROOT = resolve(process.cwd(), output);
const PORT = Number(process.argv[2]) || 8082;

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Maps a URL path to a file under ROOT, resolving directory URLs to their
// index.html as the static host does. Returns null for anything outside ROOT.
const toFile = pathname => {
    const file = normalize(join(ROOT, decodeURIComponent(pathname)));
    if (file !== ROOT && !file.startsWith(`${ROOT}${sep}`)) return null;
    if (existsSync(file) && statSync(file).isDirectory()) return join(file, 'index.html');
    return file;
};

createServer((req, res) => {
    const file = toFile(new URL(req.url, 'http://localhost').pathname);

    if (!file || !existsSync(file) || !statSync(file).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
    }

    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => process.stdout.write(`Serving ${ROOT} at http://127.0.0.1:${PORT}\n`));
