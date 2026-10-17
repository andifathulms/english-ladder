// Writes public/sw.js for the app in the current directory from the engine's template.
// Usage: node ../../packages/ladder-core/scripts/make-sw.mjs <cache-prefix> <version> <shell paths…>
// e.g.   make-sw.mjs arabic-ladder- v0.1.0 '' rung/huruf-1/ placement/ manifest.webmanifest
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [prefix, version, ...shell] = process.argv.slice(2);
if (!prefix || !version) {
  console.error('usage: make-sw.mjs <cache-prefix> <version> <shell paths…>');
  process.exit(1);
}
const here = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.join(here, '../sw/sw.template.js'), 'utf8');
const list = `[\n${shell.map((p) => `  '${p}',`).join('\n')}\n]`;
const out = template
  .replace(/^\/\* Ladder service worker template[\s\S]*?\*\/\n/, `/* Service worker generated from @ladder/core/sw/sw.template.js by scripts/make-sw.mjs.\n   Bump the version on every release. */\n`)
  .replace("const CACHE_VERSION = 'v1.0.0';", `const CACHE_VERSION = '${version}';`)
  .replaceAll('__CACHE_PREFIX__', prefix)
  .replace('__SHELL__', list);
fs.writeFileSync(path.join(process.cwd(), 'public/sw.js'), out);
console.log(`public/sw.js — ${prefix}${version}, ${shell.length} shell entries`);
