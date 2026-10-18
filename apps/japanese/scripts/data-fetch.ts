/*
 * Downloads the vendor sources into vendor-src/ (git-ignored) for npm run data:import and
 * strokes:extract. Rarely needed: the derived files in content/data/vendor/ and public/strokes/ are
 * committed. Versions and licences: content/data/vendor/SOURCE.md.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'vendor-src');
const RAW = 'https://raw.githubusercontent.com';

export const SOURCES: { file: string; url: string }[] = [
  { file: 'JMdict_e.gz', url: 'http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz' },
  { file: 'kanjidic2.xml.gz', url: 'http://www.edrdg.org/kanjidic/kanjidic2.xml.gz' },
  { file: 'kanjivg-main.zip', url: 'https://github.com/KanjiVG/kanjivg/releases/download/r20260714/kanjivg-20260714-main.zip' },
  ...['n5', 'n4', 'n3', 'n2', 'n1'].map((n) => ({ file: `jlpt-${n}.csv`, url: `${RAW}/jamsinclair/open-anki-jlpt-decks/main/src/${n}.csv` })),
  { file: 'kanji-data.json', url: `${RAW}/davidluzgouveia/kanji-data/master/kanji.json` },
  { file: 'kanjium-accents.txt', url: `${RAW}/mifunetoshiro/kanjium/master/data/source_files/raw/accents.txt` },
];

fs.mkdirSync(DIR, { recursive: true });
for (const s of SOURCES) {
  const dest = path.join(DIR, s.file);
  // curl resumes partial downloads; the EDRDG server is slow.
  execFileSync('curl', ['-sSL', '-C', '-', '--retry', '5', '-o', dest, s.url], { stdio: 'inherit' });
  console.log(`fetched ${s.file}`);
}
console.log('data:fetch — vendor-src/ is ready');
