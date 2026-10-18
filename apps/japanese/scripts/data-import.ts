/*
 * Rebuilds content/data/vendor/ from the downloaded sources in vendor-src/ (git-ignored; fetch them with
 * npm run data:fetch). Rarely run: the outputs are committed. Deterministic: same inputs, same files.
 *
 *   jlpt-words.json  JLPT word lists N5–N1 (estimates)       jamsinclair/open-anki-jlpt-decks ← tanos.co.uk
 *   kanji.json       jōyō + JLPT kanji: readings, strokes…   KANJIDIC2 (EDRDG); JLPT levels ← kanji-data ← tanos
 *   jmdict.json      common words + every JLPT word          JMdict (EDRDG)
 *   pitch.json       Tokyo accent numbers for those words     Kanjium accents.txt
 *
 * See content/data/vendor/SOURCE.md for versions and licences.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'vendor-src');
const OUT = path.join(ROOT, 'content', 'data', 'vendor');
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;

const read = (f: string) => fs.readFileSync(path.join(SRC, f));
const gunzip = (f: string) => zlib.gunzipSync(read(f)).toString('utf8');
const write = (f: string, data: unknown) => fs.writeFileSync(path.join(OUT, f), `${JSON.stringify(data)}\n`);

/** RFC 4180-ish CSV (quoted fields may contain commas). */
function csv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') field += c;
  }
  if (field || row.length) rows.push([...row, field]);
  return rows;
}

const wordId = (level: string, ja: string, kana: string) => `w-${level.toLowerCase()}-${crypto.createHash('sha1').update(ja + kana).digest('hex').slice(0, 8)}`;

// 1. JLPT words: the easiest level a word appears in wins.
type JlptWord = { id: string; ja: string; kana: string; alt?: string[]; en: string; jlpt: string };
const words: JlptWord[] = [];
const seenWord = new Set<string>();
for (const level of LEVELS) {
  const [, ...rows] = csv(read(`jlpt-${level.toLowerCase()}.csv`).toString('utf8'));
  for (const [expression, reading, meaning] of rows) {
    if (!expression) continue;
    // Notes in parentheses ("よろしく (かん)") are not part of the spelling.
    const ja = expression.replace(/\s*[（(][^)）]*[)）]\s*/g, '').trim();
    // Some readings list alternatives ("いく; ゆく"): the first is the reading, the rest are accepted.
    // Notes in parentheses ("けっこん (する)", "(〜を) とお") and a leading 〜 are not part of the reading.
    const clean = (x: string) => x.replace(/[（(][^)）]*[)）]/g, '').replace(/^[～〜]/, '').replace(/\s+/g, '');
    const [kana, ...alt] = (reading || expression).split(/[;；、,]\s*/).map(clean).filter(Boolean);
    const key = `${ja}|${kana}`;
    if (seenWord.has(key)) continue;
    seenWord.add(key);
    words.push({ id: wordId(level, ja, kana), ja, kana, ...(alt.length ? { alt } : {}), en: meaning.trim(), jlpt: level });
  }
}

// 2. Kanji: KANJIDIC2 for readings, meanings, strokes, grade; kanji-data for the JLPT (N5–N1) level.
const kd = gunzip('kanjidic2.xml.gz');
const jlptOf = JSON.parse(read('kanji-data.json').toString('utf8')) as Record<string, { jlpt_new: number | null }>;
type Kanji = { char: string; strokes: number; grade: number | null; jouyou: boolean; jlpt: string | null; on: string[]; kun: string[]; meanings: string[] };
const kanji: Kanji[] = [];
for (const m of kd.matchAll(/<character>([\s\S]*?)<\/character>/g)) {
  const body = m[1];
  const char = /<literal>(.*?)<\/literal>/.exec(body)![1];
  const grade = Number(/<grade>(\d+)<\/grade>/.exec(body)?.[1] ?? NaN);
  const n = jlptOf[char]?.jlpt_new;
  const jlpt = n ? `N${n}` : null;
  const jouyou = grade >= 1 && grade <= 8;
  if (!jouyou && !jlpt) continue;
  kanji.push({
    char,
    strokes: Number(/<stroke_count>(\d+)<\/stroke_count>/.exec(body)![1]),
    grade: Number.isNaN(grade) ? null : grade,
    jouyou,
    jlpt,
    on: [...body.matchAll(/<reading r_type="ja_on">(.*?)<\/reading>/g)].map((r) => r[1]),
    kun: [...body.matchAll(/<reading r_type="ja_kun">(.*?)<\/reading>/g)].map((r) => r[1]),
    meanings: [...body.matchAll(/<meaning>(.*?)<\/meaning>/g)].map((r) => r[1]),
  });
}
kanji.sort((a, b) => a.char.codePointAt(0)! - b.char.codePointAt(0)!);

// 3. JMdict: common entries (news1, ichi1, spec1/2, gai1) plus every entry with a JLPT word's spelling.
const jlptSpellings = new Set(words.flatMap((w) => [w.ja, w.kana, ...(w.alt ?? [])]));
type Entry = { k: string[]; r: string[]; pos: string[] };
const entries: Entry[] = [];
const COMMON = /<(?:ke|re)_pri>(?:news1|ichi1|spec1|spec2|gai1)<\/(?:ke|re)_pri>/;
for (const m of gunzip('JMdict_e.gz').matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
  const body = m[1];
  const k = [...body.matchAll(/<keb>(.*?)<\/keb>/g)].map((x) => x[1]);
  const r = [...body.matchAll(/<reb>(.*?)<\/reb>/g)].map((x) => x[1]);
  if (!COMMON.test(body) && ![...k, ...r].some((s) => jlptSpellings.has(s))) continue;
  const pos = [...new Set([...body.matchAll(/<pos>&(.*?);<\/pos>/g)].map((x) => x[1]))];
  entries.push({ k, r, pos });
}

// 4. Pitch: Kanjium accents for the words we keep ("ja|kana" → accent numbers; tags dropped).
const keep = new Set(entries.flatMap((e) => (e.k.length ? e.k.flatMap((k) => e.r.map((r) => `${k}|${r}`)) : e.r.map((r) => `${r}|${r}`))));
const pitch: Record<string, number[]> = {};
for (const line of read('kanjium-accents.txt').toString('utf8').split('\n')) {
  const [ja, kana, acc] = line.split('\t');
  if (!ja || !acc) continue;
  const key = `${ja}|${kana || ja}`;
  if (!keep.has(key)) continue;
  const nums = [...acc.replace(/\([^)]*\)/g, '').matchAll(/\d+/g)].map((x) => Number(x[0]));
  if (nums.length) pitch[key] = [...new Set(nums)];
}

fs.mkdirSync(OUT, { recursive: true });
write('jlpt-words.json', words);
write('kanji.json', kanji);
write('jmdict.json', entries);
write('pitch.json', Object.fromEntries(Object.entries(pitch).sort(([a], [b]) => (a < b ? -1 : 1))));
const count = (l: string) => words.filter((w) => w.jlpt === l).length;
const kcount = (l: string) => kanji.filter((k) => k.jlpt === l).length;
console.log(
  `data:import — words ${LEVELS.map((l) => `${l} ${count(l)}`).join(', ')}; kanji ${kanji.length} (${LEVELS.map((l) => `${l} ${kcount(l)}`).join(', ')}); ` +
    `jmdict ${entries.length} entries; pitch ${Object.keys(pitch).length} words`,
);
