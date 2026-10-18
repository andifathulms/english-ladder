// How the engine reads Mandarin Ladder content: target text is `zh` (authored with spaces between
// words) with its pinyin `py` token for token; `id` is the Indonesian meaning and `en` the optional
// English gloss. `raw` keeps the course object, so Mandarin's slots can draw ruby pinyin.
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Dialogue as CoreDialogue, Gloss, Lesson as CoreLesson, Line, Quote, Reading as CoreReading, Title } from '@ladder/core/lib/types';
import { parseInline } from '@ladder/core/lib/markup';
import { plainZh } from '@/lib/zh/text';
import type { Dialogue, GlossaryEntry, Lesson, Reading, Rung } from './types';

const zl = (l: CoreLesson) => l as unknown as Lesson;
const rd = (r: CoreReading) => r as unknown as Reading;
const dg = (d: CoreDialogue) => d as unknown as Dialogue;

type ZhLine = { zh: string; py: string; id?: string; en?: string; note?: { id: string; en: string } };
const line = (e: ZhLine, extra: Partial<Line> = {}): Line => ({
  text: e.zh,
  translit: e.py,
  ...(e.id ? { meaning: { id: e.id, ...(e.en ? { en: e.en } : {}) } } : {}),
  raw: e,
  ...extra,
});
const gloss = (g: GlossaryEntry): Gloss => ({
  key: `${g.zh}${g.py}`,
  text: g.zh,
  translit: g.py,
  meaning: { id: g.id, ...(g.en ? { en: g.en } : {}) },
  raw: g,
});
const title = (t: { id: string; en: string; zh: string; py: string }): Title => ({ target: t.zh, id: t.id, en: t.en, raw: t });

/** "HSK 1", "HSK 7–9"; the Dasar rungs have no HSK level and no label. */
export const hskLabel = (hsk: string): string => (hsk === '—' ? '' : `HSK ${hsk.replace('-', '–')}`);

/** The continue card quotes Chinese with its pinyin (as ruby on the board). */
const quote = (l: Line): Quote => {
  const e = l.raw as ZhLine;
  return { text: plainZh(e.zh), raw: { zh: e.zh, py: e.py } };
};

export const adapter: ContentAdapter = {
  rung: { levelLabel: (r) => hskLabel((r as unknown as Rung).hsk) },
  lesson: {
    title: (l) => title(zl(l).title),
    examples: (l) => zl(l).examples.map((e) => line(e, { note: e.note ?? true })),
    worked: (l) => zl(l).worked?.map((w) => line(w)) ?? null,
    pair: (l) => ({ off: line(zl(l).pair.off), natural: line(zl(l).pair.natural) }),
    glossary: (l) => zl(l).glossary.map(gloss),
    closing: (l) => zl(l).summary.id,
    // The standalone app quoted the summary as written (its *italic* markers included).
    closingQuote: (l) => ({ text: zl(l).summary.id }),
    quote,
    // The lesson's key character or word: the first example's focus, else its first new character.
    keyword: (l) => parseInline(zl(l).examples[0].zh).find((t) => t.t === 'focus')?.v.replace(/\s+/g, '') ?? zl(l).hanzi?.[0] ?? null,
    focusTexts: (l) => [
      ...zl(l).examples.map((e) => e.zh),
      ...(zl(l).talk?.lines ?? []).map((t) => t.zh),
      zl(l).pair.natural.zh,
      zl(l).pair.off.zh,
    ],
  },
  reading: {
    title: (r) => title(rd(r).title),
    // The whole text as one line; the Sentence slot draws it line by line from `raw`.
    text: (r) => ({ text: rd(r).lines.map((x) => x.zh).join(''), raw: rd(r).lines }),
    translation: (r, lang) => ({ text: rd(r).lines.map((x) => (lang === 'en' ? (x.en ?? x.id) : x.id)).join(' '), lang }),
    glossary: (r) => rd(r).glossary.map(gloss),
  },
  dialogue: {
    title: (d) => title(dg(d).title),
    lines: (d) => dg(d).lines.map((l) => ({ who: l.who, line: line(l) })),
    note: (d) => dg(d).note ?? null,
  },
};
