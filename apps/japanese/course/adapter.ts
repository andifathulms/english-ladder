// How the engine reads Japanese Ladder content: target text is `ja` (ruby markup, words separated by
// spaces) with its reading `kana`; `id` is the Indonesian meaning and `en` the optional English gloss.
// `raw` keeps the course object, so Japanese's slots can draw furigana, mora beats and pitch.
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Dialogue as CoreDialogue, Gloss, Lesson as CoreLesson, Line, Quote, Reading as CoreReading, Title } from '@ladder/core/lib/types';
import { parseInline } from '@ladder/core/lib/markup';
import { toPlain } from '@/lib/ja/text';
import type { Dialogue, GlossaryEntry, Lesson, Reading, Rung } from './types';

const jl = (l: CoreLesson) => l as unknown as Lesson;
const rd = (r: CoreReading) => r as unknown as Reading;
const dg = (d: CoreDialogue) => d as unknown as Dialogue;

type JaLine = { ja: string; kana: string; id?: string; en?: string; note?: { id: string; en: string } };
const line = (e: JaLine, extra: Partial<Line> = {}): Line => ({
  text: e.ja,
  translit: e.kana,
  ...(e.id ? { meaning: { id: e.id, ...(e.en ? { en: e.en } : {}) } } : {}),
  raw: e,
  ...extra,
});
const gloss = (g: GlossaryEntry): Gloss => ({
  key: `${g.ja}|${g.kana}`,
  text: g.ja,
  translit: g.kana,
  meaning: { id: g.id, ...(g.en ? { en: g.en } : {}) },
  raw: g,
});
const title = (t: { id: string; en: string; ja: string; kana: string }): Title => ({ target: toPlain(t.ja), id: t.id, en: t.en, raw: t });

/** "N5" … "N1"; the Kana rungs have no JLPT level and no label. */
export const jlptLabel = (jlpt: string): string => (jlpt === '—' ? '' : jlpt);

/** The continue card quotes Japanese with its furigana. */
const quote = (l: Line): Quote => {
  const e = l.raw as JaLine;
  return { text: toPlain(e.ja), raw: { ja: e.ja, kana: e.kana } };
};

export const adapter: ContentAdapter = {
  rung: { levelLabel: (r) => jlptLabel((r as unknown as Rung).jlpt) },
  lesson: {
    title: (l) => title(jl(l).title),
    examples: (l) => jl(l).examples.map((e) => line(e, { note: e.note ?? true })),
    worked: (l) => jl(l).worked?.map((w) => line(w)) ?? null,
    pair: (l) => ({ off: line(jl(l).pair.off), natural: line(jl(l).pair.natural) }),
    glossary: (l) => jl(l).glossary.map(gloss),
    closing: (l) => jl(l).summary.id,
    quote,
    // The lesson's key word: the first example's focus, else its first new kanji.
    keyword: (l) => {
      const f = parseInline(jl(l).examples[0].ja).find((t) => t.t === 'focus')?.v;
      return f ? toPlain(f) : (jl(l).kanji?.[0] ?? null);
    },
    focusTexts: (l) => [
      ...jl(l).examples.map((e) => e.ja),
      ...(jl(l).talk?.lines ?? []).map((t) => t.ja),
      jl(l).pair.natural.ja,
      jl(l).pair.off.ja,
    ],
  },
  reading: {
    title: (r) => title(rd(r).title),
    // The whole text as one line; the Sentence slot draws it line by line from `raw`.
    text: (r) => ({ text: rd(r).lines.map((x) => x.ja).join(' '), raw: rd(r).lines }),
    translation: (r, lang) => ({ text: rd(r).lines.map((x) => (lang === 'en' ? (x.en ?? x.id) : x.id)).join(' '), lang }),
    glossary: (r) => rd(r).glossary.map(gloss),
  },
  dialogue: {
    title: (d) => title(dg(d).title),
    lines: (d) => dg(d).lines.map((l) => ({ who: l.who, line: line(l) })),
    note: (d) => dg(d).note ?? null,
  },
};
