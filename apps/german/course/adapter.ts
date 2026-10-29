// How the engine reads German Ladder content: target text is `de` (standard German, Germany); `id` is
// the Indonesian meaning and `en` the optional English gloss. `raw` keeps the course object for German
// slots.
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Dialogue as CoreDialogue, Gloss, Lesson as CoreLesson, Line, Reading as CoreReading } from '@ladder/core/lib/types';
import type { DeLine, Dialogue, GlossaryEntry, Lesson, Reading } from './types';

const gl = (l: CoreLesson) => l as unknown as Lesson;
const rd = (r: CoreReading) => r as unknown as Reading;
const dg = (d: CoreDialogue) => d as unknown as Dialogue;

const line = (e: DeLine, extra: Partial<Line> = {}): Line => ({
  text: e.de,
  meaning: { id: e.id, ...(e.en ? { en: e.en } : {}) },
  raw: e,
  ...extra,
});
const gloss = (g: GlossaryEntry): Gloss => ({ key: g.de, text: g.de, meaning: { id: g.id, ...(g.en ? { en: g.en } : {}) }, raw: g });
const title = (t: { id: string; en: string; de: string }) => ({ target: t.de, id: t.id, en: t.en, raw: t });

export const adapter: ContentAdapter = {
  lesson: {
    title: (l) => title(gl(l).title),
    examples: (l) => gl(l).examples.map((e) => line(e, { note: e.note ?? true })),
    worked: (l) => gl(l).worked?.map((w) => line(w)) ?? null,
    pair: (l) => ({ off: { text: gl(l).pair.off }, natural: { text: gl(l).pair.natural } }),
    glossary: (l) => gl(l).glossary.map(gloss),
    closing: (l) => gl(l).summary.id,
    focusTexts: (l) => [
      ...gl(l).examples.map((e) => e.de),
      ...(gl(l).talk?.lines ?? []).map((t) => t.de),
      ...(gl(l).work?.lines ?? []).map((t) => t.de),
      gl(l).pair.natural,
      gl(l).pair.off,
    ],
  },
  reading: {
    title: (r) => title(rd(r).title),
    text: (r) => ({ text: rd(r).lines.map((x) => x.de).join(' '), raw: rd(r).lines }),
    translation: (r, lang) => ({ text: rd(r).lines.map((x) => (lang === 'en' ? (x.en ?? x.id) : x.id)).join(' '), lang }),
    glossary: (r) => rd(r).glossary.map(gloss),
  },
  dialogue: {
    title: (d) => title(dg(d).title),
    lines: (d) => dg(d).lines.map((l) => ({ who: l.who, line: line(l) })),
    note: (d) => dg(d).note ?? null,
  },
};
