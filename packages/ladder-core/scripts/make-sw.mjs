// Writes public/sw.js for the app in the current directory from the engine's template.
// Usage: node ../../packages/ladder-core/scripts/make-sw.mjs [--cache-first dir:ext …] <cache-prefix> <version> <shell paths…>
// e.g.   make-sw.mjs arabic-ladder- v0.1.0 '' rung/huruf-1/ placement/ manifest.webmanifest
// --cache-first strokes:.json adds a cache-first route for /strokes/*.json (stored on first use,
// never precached), like recorded audio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const cacheFirst = [];
while (args[0] === '--cache-first') {
  const [dir, ext] = args[1].split(':');
  cacheFirst.push({ dir, ext });
  args.splice(0, 2);
}
const [prefix, version, ...shell] = args;
if (!prefix || !version) {
  console.error('usage: make-sw.mjs <cache-prefix> <version> <shell paths…>');
  process.exit(1);
}
const here = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.join(here, '../sw/sw.template.js'), 'utf8');
/** A cache-first route for <dir>/*<ext>, the same shape as the audio route. */
const routeFor = ({ dir, ext }) => `
  // ${dir} files are cache-first, stored when first used (never precached).
  if (url.pathname.includes('/${dir}/') && url.pathname.endsWith('${ext}')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
            return res;
          }),
      ),
    );
    return;
  }
`;
const list = `[\n${shell.map((p) => `  '${p}',`).join('\n')}\n]`;
const out = template
  .replace(/^\/\* Ladder service worker template[\s\S]*?\*\/\n/, `/* Service worker generated from @ladder/core/sw/sw.template.js by scripts/make-sw.mjs.\n   Bump the version on every release. */\n`)
  .replace("const CACHE_VERSION = 'v1.0.0';", `const CACHE_VERSION = '${version}';`)
  .replaceAll('__CACHE_PREFIX__', prefix)
  .replace('__SHELL__', list)
  .replace('__CACHE_FIRST__\n', cacheFirst.map(routeFor).join(''));
fs.writeFileSync(path.join(process.cwd(), 'public/sw.js'), out);
console.log(`public/sw.js — ${prefix}${version}, ${shell.length} shell entries`);
