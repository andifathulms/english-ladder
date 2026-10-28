// How the engine reads Spanish Ladder content: target text is `es` (neutral Latin American), with
// `es_es` (the Spain variant) where Spain differs; `id` is the Indonesian meaning and `en` the
// optional English gloss. `raw` keeps the course object for Spanish slots (the España line).
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Dialogue as CoreDialogue, Gloss, Lesson as CoreLesson, Line, Reading as CoreReading, Rung as CoreRung, Title } from '@ladder/core/lib/types';
import type { Dialogue, EsLine, GlossaryEntry, Lesson, Reading, Rung } from './types';

const sl = (l: CoreLesson) => l as unknown as Lesson;
const rd = (r: CoreReading) => r as unknown as Reading;
const dg = (d: CoreDialogue) => d as unknown as Dialogue;

const line = (e: EsLine, extra: Partial<Line> = {}): Line => ({
  text: e.es,
  meaning: { id: e.id, ...(e.en ? { en: e.en } : {}) },
  raw: e,
  ...extra,
});
const gloss = (g: GlossaryEntry): Gloss => ({ key: g.es, text: g.es, meaning: { id: g.id, ...(g.en ? { en: g.en } : {}) }, raw: g });
const title = (t: { id: string; en: string; es: string }): Title => ({ target: t.es, id: t.id, en: t.en, raw: t });

/** "A1" … "C1"; Dasar has no DELE level, so its label is its CEFR band. */
export const levelLabel = (r: CoreRung) => (r as unknown as Rung).cefr;

export const adapter: ContentAdapter = {
  lesson: {
    title: (l) => title(sl(l).title),
    examples: (l) => sl(l).examples.map((e) => line(e, { note: e.note ?? true })),
    worked: (l) => sl(l).worked?.map((w) => line(w)) ?? null,
    pair: (l) => ({ off: { text: sl(l).pair.off }, natural: { text: sl(l).pair.natural } }),
    glossary: (l) => sl(l).glossary.map(gloss),
    closing: (l) => sl(l).summary.id,
    focusTexts: (l) => [
      ...sl(l).examples.map((e) => e.es),
      ...sl(l).examples.flatMap((e) => (e.es_es ? [e.es_es] : [])),
      ...(sl(l).talk?.lines ?? []).map((t) => t.es),
      sl(l).pair.natural,
      sl(l).pair.off,
    ],
  },
  reading: {
    title: (r) => title(rd(r).title),
    text: (r) => ({ text: rd(r).lines.map((x) => x.es).join(' '), raw: rd(r).lines }),
    translation: (r, lang) => ({ text: rd(r).lines.map((x) => (lang === 'en' ? (x.en ?? x.id) : x.id)).join(' '), lang }),
    glossary: (r) => rd(r).glossary.map(gloss),
  },
  dialogue: {
    title: (d) => title(dg(d).title),
    lines: (d) => dg(d).lines.map((l) => ({ who: l.who, line: line(l, dg(d).variety === 'es' ? { variety: 'es' } : {}) })),
    note: (d) => dg(d).note ?? null,
    variety: (d) => (dg(d).variety === 'es' ? 'es' : undefined),
  },
};
