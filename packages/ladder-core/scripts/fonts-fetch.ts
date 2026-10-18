/*
 * Downloads a course's source fonts into fonts-src/ (git-ignored) and verifies their SHA-256.
 * Run from an app: tsx ../../packages/ladder-core/scripts/fonts-fetch.ts (reads ./fonts.config.ts).
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { FontsConfig } from './fonts';

const { fonts } = (await import(path.resolve(process.cwd(), 'fonts.config.ts'))) as { fonts: FontsConfig };
const DIR = path.join(process.cwd(), 'fonts-src');
const sha = (buf: Buffer) => crypto.createHash('sha256').update(buf).digest('hex');

fs.mkdirSync(DIR, { recursive: true });
for (const f of fonts.sources) {
  const dest = path.join(DIR, f.file);
  if (fs.existsSync(dest) && sha(fs.readFileSync(dest)) === f.sha256) continue;
  let buf: Buffer | null = null;
  for (let i = 1; i <= 5 && !buf; i++) {
    try {
      const r = await fetch(f.url);
      if (!r.ok) throw new Error(`${r.status} ${f.url}`);
      buf = Buffer.from(await r.arrayBuffer());
    } catch (e) {
      if (i === 5) throw e;
      await new Promise((res) => setTimeout(res, 1500 * i));
    }
  }
  if (sha(buf!) !== f.sha256) throw new Error(`${f.file}: checksum mismatch`);
  fs.writeFileSync(dest, buf!);
  console.log(`fetched ${f.file}`);
}
console.log('fonts:fetch — fonts-src/ is ready');
