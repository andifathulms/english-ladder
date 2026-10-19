// Build-time only: the word and kanji decks (PRD §4.2, §5.7) for the words page and lesson completion.
// One Kartu kata and one Kartu kanji per JLPT level that has lessons, from the imported lists
// (content/data/vendor/, labelled "perkiraan" in the app): Easy 1 and Easy 2 share N5.
import fs from 'node:fs';
import path from 'node:path';
import { parseRuby, toPlain } from '@/lib/ja/text';
import type { JaDeckWord, JaKanjiDeckCard } from '@/components/decks';
// Circular with content.ts (its wordsPageData calls decksData): used only inside functions, after both load.
import { content, getCurriculum, getLessons } from './content';
import type { GlossaryEntry, Lesson, Rung } from './types';

const vendor = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/data/vendor', f), 'utf8')) as T;

type VendorWord = { id: string; ja: string; kana: string; en: string; jlpt: string; alt?: string[] };
type VendorKanji = { char: string; strokes: number; jlpt: string | null; on: string[]; kun: string[]; meanings: string[] };

export type DeckLevel = { level: string; rung: string; name: string };

/** The JLPT levels with lessons, each placed on its first rung (where the rung page links to it). */
export function deckLevels(): DeckLevel[] {
  const out: DeckLevel[] = [];
  for (const r of getCurriculum() as Rung[]) {
    if (r.jlpt === '—' || out.some((d) => d.level === r.jlpt)) continue;
    const rungs = (getCurriculum() as Rung[]).filter((x) => x.jlpt === r.jlpt);
    if (!rungs.some((x) => getLessons(x.id, { includeDrafts: true }).length)) continue;
    out.push({ level: r.jlpt, rung: r.id, name: r.name });
  }
  return out;
}

const key = (ja: string, kana: string) => `${ja}|${kana}`;
const levelLessons = (level: string) =>
  (getCurriculum() as Rung[]).filter((r) => r.jlpt === level).flatMap((r) => getLessons(r.id, { includeDrafts: true }));

/** The deck id of a glossary word, if it is on the imported list (the lesson-completion hook uses it). */
export function wordIdOf(g: Pick<GlossaryEntry, 'ja' | 'kana'>, words = vendorWords()): string | undefined {
  return words.byKey.get(key(toPlain(g.ja), g.kana))?.id;
}

let wordsCache: { list: VendorWord[]; byKey: Map<string, VendorWord> } | null = null;
function vendorWords() {
  if (!wordsCache) {
    // Some entries list two spellings ("伯母さん; 叔母さん"): show the first, match either.
    const raw = vendor<VendorWord[]>('jlpt-words.json');
    const spellings = (w: VendorWord) => w.ja.split(/[;；]\s*/).map((x) => x.trim()).filter(Boolean);
    const list = raw.map((w) => ({ ...w, ja: spellings(w)[0] ?? w.ja }));
    const byKey = new Map<string, VendorWord>();
    raw.forEach((w, i) => {
      for (const sp of spellings(w)) for (const k of [w.kana, ...(w.alt ?? [])]) if (!byKey.has(key(sp, k))) byKey.set(key(sp, k), list[i]);
    });
    wordsCache = { list, byKey };
  }
  return wordsCache;
}

/** Kartu kata: the level's words, with Indonesian meanings and examples where a lesson has them. */
export function wordDeck(level: string): JaDeckWord[] {
  const lessons = levelLessons(level);
  const gloss = new Map<string, { g: GlossaryEntry; lesson: Lesson }>();
  for (const l of lessons) for (const g of l.glossary) gloss.set(key(toPlain(g.ja), g.kana), { g, lesson: l });
  const pitch = vendor<Record<string, number[]>>('pitch.json');
  return vendorWords()
    .list.filter((w) => w.jlpt === level)
    .map((w) => {
      const hit = gloss.get(key(w.ja, w.kana));
      const ex = lessons.flatMap((l) => l.examples).find((e) => parseRuby(e.ja).some((t) => t.plain === w.ja));
      const p = pitch[key(w.ja, w.kana)]?.[0];
      return {
        id: w.id,
        ja: w.ja,
        kana: w.kana,
        mean: hit?.g.id ?? w.en,
        meanLang: hit ? 'id' : 'en',
        jlpt: w.jlpt,
        ...(hit ? { lesson: hit.lesson.id } : {}),
        ...(ex ? { ex: { ja: ex.ja, id: ex.id } } : {}),
        ...(p !== undefined ? { pitch: p } : {}),
      } as JaDeckWord;
    });
}

/** Kartu kanji: the level's kanji, plus any the level's lessons introduce, with readings and example words. */
export function kanjiDeck(level: string): JaKanjiDeckCard[] {
  const lessons = levelLessons(level);
  const kanji = vendor<VendorKanji[]>('kanji.json');
  const byChar = new Map(kanji.map((k) => [k.char, k]));
  const meanings = (content.exists('data/kanji-id.yaml') ? content.readYaml('data/kanji-id.yaml') : {}) as Record<string, string>;
  const taught = new Map<string, string>();
  for (const l of lessons) for (const k of l.kanji ?? []) if (!taught.has(k)) taught.set(k, l.id);
  const chars = [...new Set([...taught.keys(), ...kanji.filter((k) => k.jlpt === level).map((k) => k.char)])];
  const words = vendorWords().list.filter((w) => w.jlpt === level);
  return chars.flatMap((ch) => {
    const k = byChar.get(ch);
    if (!k) return [];
    const examples = words
      .filter((w) => w.ja.includes(ch))
      .sort((a, b) => a.ja.length - b.ja.length)
      .slice(0, 3)
      .map((w) => ({ ja: w.ja, kana: w.kana, en: w.en.split(/[;,]/)[0].trim() }));
    const lesson = taught.get(ch);
    return [
      {
        id: `k-${ch}`,
        char: ch,
        strokes: k.strokes,
        on: k.on.slice(0, 3),
        kun: k.kun.filter((r) => !r.startsWith('-') && !r.endsWith('-')).slice(0, 3),
        meaning: meanings[ch] ? { text: meanings[ch], lang: 'id' } : { text: k.meanings.slice(0, 2).join(', '), lang: 'en' },
        jlpt: k.jlpt ?? level,
        examples,
        ...(lesson ? { lesson } : {}),
      } as JaKanjiDeckCard,
    ];
  });
}

export type DecksData = { words: { rung: string; name: string; level: string; words: JaDeckWord[] }[]; kanji: { rung: string; name: string; level: string; words: JaKanjiDeckCard[] }[] };

/** Everything the words page's two deck tabs need. */
export function decksData(): DecksData {
  const levels = deckLevels();
  return {
    words: levels.map((d) => ({ rung: d.rung, name: d.name, level: d.level, words: wordDeck(d.level) })),
    kanji: levels.map((d) => ({ rung: d.rung, name: d.name, level: d.level, words: kanjiDeck(d.level) })),
  };
}
