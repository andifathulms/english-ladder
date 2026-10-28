// Imports the frequency list (content/data/vendor/SOURCE.md) into a ranked subset the content
// pipeline reads: content/data/vendor/frequency.json, { word: rank } for the 10,000 most frequent
// Spanish word forms in OpenSubtitles 2018 (hermitdave/FrequencyWords, CC BY-SA 4.0).
//
// Usage: npm run data:import -w spanish-ladder   (downloads into vendor-src/ when missing)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const SRC_URL = 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/es/es_50k.txt';
const SRC = path.join(process.cwd(), 'vendor-src', 'es_50k.txt');
const OUT = path.join(process.cwd(), 'content', 'data', 'vendor', 'frequency.json');
const KEEP = 10_000;

async function main() {
  if (!fs.existsSync(SRC)) {
    fs.mkdirSync(path.dirname(SRC), { recursive: true });
    const res = await fetch(SRC_URL);
    if (!res.ok) throw new Error(`download failed: ${res.status}`);
    fs.writeFileSync(SRC, Buffer.from(await res.arrayBuffer()));
  }
  const raw = fs.readFileSync(SRC);
  const sha = crypto.createHash('sha256').update(raw).digest('hex');
  const ranks: Record<string, number> = {};
  let rank = 0;
  for (const line of raw.toString('utf8').split('\n')) {
    const word = line.split(' ')[0]?.normalize('NFC').toLowerCase();
    // Letters only (drops numbers, apostrophes and subtitle debris).
    if (!word || !/^[a-záéíóúüñ]+$/.test(word) || word in ranks) continue;
    ranks[word] = ++rank;
    if (rank >= KEEP) break;
  }
  fs.writeFileSync(OUT, JSON.stringify(ranks) + '\n');
  console.log(`frequency.json: ${rank} words · source sha256 ${sha}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
