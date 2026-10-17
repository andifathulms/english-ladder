// How the engine reads English Ladder lessons: in lesson content `en` is the target text.
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { Lesson, Line, Reading } from '@ladder/core/lib/types';
import type { EnLesson, EnReading } from './schema';

const en = (l: Lesson) => l as unknown as EnLesson;
const rd = (r: Reading) => r as unknown as EnReading;

export const adapter: ContentAdapter = {
  lesson: {
    title: (l) => ({ target: en(l).title.en, id: en(l).title.id, en: en(l).title.en }),
    examples: (l) =>
      en(l).examples.map((e): Line => ({ text: e.en, meaning: { id: e.id }, note: e.note ?? true, raw: e })),
    worked: (l) => en(l).worked?.map((w): Line => ({ text: w.en, meaning: { id: w.id }, raw: w })) ?? null,
    pair: (l) => ({ off: { text: en(l).pair.off }, natural: { text: en(l).pair.natural } }),
    glossary: (l) => en(l).glossary.map((g) => ({ key: g.en, text: g.en, meaning: { id: g.id }, raw: g })),
    closing: (l) => en(l).summary.en,
    focusTexts: (l) => [
      ...en(l).examples.map((e) => e.en),
      ...(en(l).talk ?? []).map((t) => t.en),
      en(l).pair.natural,
      en(l).pair.off,
    ],
  },
  reading: {
    title: (r) => ({ target: rd(r).title.en, id: rd(r).title.id, en: rd(r).title.en }),
    text: (r) => ({ text: rd(r).text }),
    translation: (r) => ({ text: rd(r).translation, lang: 'id' }),
    glossary: (r) => rd(r).glossary.map((g) => ({ key: g.en, text: g.en, meaning: { id: g.id }, raw: g })),
  },
};
