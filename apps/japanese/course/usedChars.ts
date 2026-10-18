// Build-time only: the Japanese characters the site can show, for the font subsets (CLAUDE.md §7.6)
// and the stroke files (§5.6). Kana always ship in full (every kana is taught); kanji and symbols
// come from content (in curriculum order), the UI, and the kanji lists of the live rungs (the decks).
import fs from 'node:fs';
import path from 'node:path';
import { getCurriculum } from '@/course/content';

const ROOT = process.cwd();
const JA = /[　-〿぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿！-｠々〆]/u;
const KANJI = /[㐀-䶿一-鿿豈-﫿々〆]/u;

/** Every hiragana and katakana, small kana, ー and the iteration marks. */
export const ALL_KANA = (() => {
  const out: string[] = [];
  for (let cp = 0x3041; cp <= 0x3096; cp++) out.push(String.fromCodePoint(cp));
  for (let cp = 0x309b; cp <= 0x309e; cp++) out.push(String.fromCodePoint(cp));
  for (let cp = 0x30a1; cp <= 0x30fe; cp++) out.push(String.fromCodePoint(cp));
  return out;
})();

function walk(dir: string, exts: RegExp, skip: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((d) => {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) return skip.includes(d.name) ? [] : walk(p, exts, skip);
      return exts.test(d.name) ? [p] : [];
    });
}

/**
 * Japanese characters in order of first appearance: all kana, then content (lessons in curriculum
 * order, then the rest of content/ except the imported data), the UI, and every kanji on the live
 * rungs' JLPT levels. `strokes` is what a learner can trace or open stroke order for: kana, and kanji
 * from content and the live rungs' lists (not UI chrome).
 */
export function usedChars(): { ordered: string[]; strokes: Set<string> } {
  const ordered: string[] = [];
  const seen = new Set<string>();
  const strokes = new Set<string>();
  const add = (text: string, forStrokes: boolean) => {
    for (const ch of text) {
      if (!JA.test(ch)) continue;
      if (forStrokes && (KANJI.test(ch) || /[ぁ-ヺ]/u.test(ch))) strokes.add(ch);
      if (seen.has(ch)) continue;
      seen.add(ch);
      ordered.push(ch);
    }
  };
  add(ALL_KANA.join(''), true);
  const rungs = getCurriculum();
  for (const r of rungs) for (const f of walk(path.join(ROOT, 'content', r.id), /\.(md|ya?ml)$/)) add(fs.readFileSync(f, 'utf8'), true);
  for (const f of walk(path.join(ROOT, 'content'), /\.ya?ml$/, ['vendor'])) add(fs.readFileSync(f, 'utf8'), !f.endsWith('curriculum.yaml') && !f.includes(`${path.sep}data${path.sep}`));
  for (const dir of ['i18n', 'components', 'visuals', 'app']) for (const f of walk(path.join(ROOT, dir), /\.(ts|tsx)$/)) add(fs.readFileSync(f, 'utf8'), false);
  add(fs.readFileSync(path.join(ROOT, 'course', 'speech.ts'), 'utf8'), false);
  // The decks show every kanji and word of the live rungs' levels.
  const levels = new Set<string>(rungs.filter((r) => r.status === 'live' && r.jlpt !== '—').map((r) => r.jlpt));
  if (levels.size) {
    const kanji = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/data/vendor/kanji.json'), 'utf8')) as { char: string; jlpt: string | null }[];
    const words = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/data/vendor/jlpt-words.json'), 'utf8')) as { ja: string; kana: string; jlpt: string }[];
    for (const k of kanji) if (k.jlpt && levels.has(k.jlpt)) add(k.char, true);
    for (const w of words) if (levels.has(w.jlpt)) add(w.ja + w.kana, true);
  }
  return { ordered, strokes };
}
