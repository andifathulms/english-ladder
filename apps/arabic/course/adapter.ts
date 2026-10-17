// How the engine reads Arabic Ladder content: target text is `ar` (with `tr`, and `eg` for
// Egyptian), `id` is the Indonesian meaning and `en` the optional English gloss.
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Dialogue as CoreDialogue, Gloss, Lesson as CoreLesson, Line, Reading as CoreReading } from '@ladder/core/lib/types';
import { parseInline } from '@ladder/core/lib/markup';
import type { Dialogue, GlossaryEntry, Lesson, Reading, Rung } from './types';

const ar = (l: CoreLesson) => l as unknown as Lesson;
const rd = (r: CoreReading) => r as unknown as Reading;
const dg = (d: CoreDialogue) => d as unknown as Dialogue;

type ArLine = { ar: string; tr: string; id: string; en?: string };
const line = (e: ArLine, extra: Partial<Line> = {}): Line => ({
  text: e.ar,
  translit: e.tr,
  meaning: { id: e.id, ...(e.en ? { en: e.en } : {}) },
  raw: e,
  ...extra,
});
const gloss = (g: GlossaryEntry): Gloss => ({
  key: g.ar,
  text: g.ar,
  translit: g.tr,
  meaning: { id: g.id, ...(g.en ? { en: g.en } : {}) },
  raw: g,
});
/** The first example a learner reads (not a Huruf 1 picture word). */
const lead = (l: Lesson) => l.examples.filter((e) => !e.display_only)[0] ?? l.examples[0];

export const adapter: ContentAdapter = {
  lesson: {
    title: (l) => ({ target: ar(l).title.ar, id: ar(l).title.id, en: ar(l).title.en }),
    examples: (l) => ar(l).examples.map((e) => line(e, { note: e.display_only ? undefined : (e.note ?? true) })),
    worked: (l) => ar(l).worked?.map((w) => line(w)) ?? null,
    pair: (l) => ({
      off: { text: ar(l).pair.off.ar, translit: ar(l).pair.off.tr, raw: ar(l).pair.off },
      natural: { text: ar(l).pair.natural.ar, translit: ar(l).pair.natural.tr, raw: ar(l).pair.natural },
    }),
    glossary: (l) => ar(l).glossary.map(gloss),
    lead: (l) => line(lead(ar(l))),
    closing: (l) => ar(l).summary.id,
    keyword: (l) => parseInline(lead(ar(l)).ar).find((t) => t.t === 'focus')?.v ?? null,
    focusTexts: (l) => [
      ...ar(l).examples.map((e) => e.ar),
      ...(ar(l).talk?.lines ?? []).map((t) => t.ar),
      ar(l).pair.natural.ar,
      ar(l).pair.off.ar,
    ],
  },
  reading: {
    title: (r) => ({ target: rd(r).title.ar, id: rd(r).title.id, en: rd(r).title.en }),
    // Transliteration under a reading only where the rung always shows it.
    text: (r, rung) => ({ text: rd(r).ar, translit: (rung as Rung).translit === 'always' ? rd(r).tr : undefined }),
    translation: (r, lang) => (lang === 'en' && rd(r).en ? { text: rd(r).en!, lang: 'en' } : { text: rd(r).id, lang: 'id' }),
    glossary: (r) => rd(r).glossary.map(gloss),
  },
  dialogue: {
    title: (d) => ({ target: dg(d).title.ar, id: dg(d).title.id, en: dg(d).title.en }),
    lines: (d) => dg(d).lines.map((l) => ({ who: l.who, line: line(l, { variety: dg(d).variety }) })),
    note: (d) => dg(d).note ?? null,
    variety: (d) => dg(d).variety,
  },
};
