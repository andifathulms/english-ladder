// Compares tests/parity/baseline with tests/parity/after.
//
// Both trees are produced by the same Playwright/Chromium on identical DOM, so an
// exact byte match is the strictest possible "maxDiffPixels: 0". Any mismatch means
// the refactor changed the rendered output and must be fixed (not the threshold).
//
// Usage: node tests/parity/compare.mjs

import fs from 'node:fs';
import path from 'node:path';

const baseDir = process.argv[2] || 'tests/parity/baseline';
const afterDir = process.argv[3] || 'tests/parity/after';

const list = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.png')).sort() : []);
const baseFiles = list(baseDir);
const afterFiles = list(afterDir);

if (baseFiles.length === 0) {
  console.error(`no baseline screenshots in ${baseDir}`);
  process.exit(1);
}

const missing = baseFiles.filter((f) => !afterFiles.includes(f));
const extra = afterFiles.filter((f) => !baseFiles.includes(f));
const diffs = [];

for (const f of baseFiles) {
  if (!afterFiles.includes(f)) continue;
  const a = fs.readFileSync(path.join(baseDir, f));
  const b = fs.readFileSync(path.join(afterDir, f));
  if (!a.equals(b)) diffs.push(f);
}

console.log(`compared ${baseFiles.length} baseline shots against ${afterDir}`);
if (missing.length) console.log(`  MISSING in after: ${missing.join(', ')}`);
if (extra.length) console.log(`  EXTRA in after:   ${extra.join(', ')}`);
if (diffs.length) console.log(`  DIFFERENT:        ${diffs.join(', ')}`);

if (missing.length || diffs.length) {
  console.error(`\nPARITY FAIL: ${diffs.length} different, ${missing.length} missing`);
  process.exit(1);
}
console.log('\nPARITY OK: every route matches byte-for-byte');
