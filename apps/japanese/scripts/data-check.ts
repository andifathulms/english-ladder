/*
 * Checks the imported data in content/data/vendor/ (CLAUDE.md §5.6): every file present and well
 * formed, ids unique, readings in kana, and the curriculum's cumulative word and kanji estimates
 * against the imported lists (warnings beyond ±20%: the lists themselves are estimates).
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const DIR = path.join(process.cwd(), 'content', 'data', 'vendor');
const errors: string[] = [];
const warnings: string[] = [];
const load = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as T;

type Word = { id: string; ja: string; kana: string; alt?: string[]; jlpt: string };
type Kanji = { char: string; jlpt: string | null; strokes: number; on: string[]; kun: string[] };
const words = load<Word[]>('jlpt-words.json');
const kanji = load<Kanji[]>('kanji.json');
const jmdict = load<{ k: string[]; r: string[]; pos: string[] }[]>('jmdict.json');
const pitch = load<Record<string, number[]>>('pitch.json');
if (!fs.existsSync(path.join(DIR, 'SOURCE.md'))) errors.push('content/data/vendor/SOURCE.md is missing');

const ids = new Set<string>();
for (const w of words) {
  if (ids.has(w.id)) errors.push(`jlpt-words.json: duplicate id ${w.id}`);
  ids.add(w.id);
  // Affixes ("お～") and a few source slips keep their notation; flag, don't fail.
  if (!/^[぀-ヿー・～〜]+$/u.test(w.kana)) warnings.push(`jlpt-words.json: ${w.ja}: reading "${w.kana}" is not plain kana`);
}
for (const k of kanji) if (!(k.strokes > 0)) errors.push(`kanji.json: ${k.char}: no stroke count`);
if (jmdict.length < 20000) errors.push(`jmdict.json: only ${jmdict.length} entries`);
if (Object.keys(pitch).length < 10000) errors.push(`pitch.json: only ${Object.keys(pitch).length} words`);

// Curriculum estimates vs the lists: each rung covers half or all of its JLPT level.
type Rung = { id: string; jlpt: string; words_cum: number; kanji_cum: number };
const rungs = (yaml.load(fs.readFileSync(path.join(process.cwd(), 'content', 'curriculum.yaml'), 'utf8'), { schema: yaml.JSON_SCHEMA }) as { rungs: Rung[] }).rungs;
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const before = (l: string, list: { jlpt: string | null }[]) => list.filter((x) => x.jlpt && LEVELS.indexOf(x.jlpt) < LEVELS.indexOf(l)).length;
const at = (l: string, list: { jlpt: string | null }[]) => list.filter((x) => x.jlpt === l).length;
for (const [i, r] of rungs.entries()) {
  if (r.jlpt === '—') continue;
  // The first rung of a level covers half of it; a rung whose next rung is a new level covers all of it.
  const last = rungs[i + 1]?.jlpt !== r.jlpt;
  const share = last ? 1 : 0.5;
  for (const [what, list, est] of [['words', words, r.words_cum], ['kanji', kanji, r.kanji_cum]] as const) {
    const expected = Math.round(before(r.jlpt, list) + share * at(r.jlpt, list));
    const off = Math.abs(est - expected) / expected;
    if (off > 0.2) warnings.push(`curriculum.yaml: ${r.id} ${what}_cum ${est} is ${Math.round(off * 100)}% off the imported lists (${expected})`);
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`data:check — ${words.length} words, ${kanji.length} kanji, ${jmdict.length} JMdict entries, ${Object.keys(pitch).length} pitch: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
