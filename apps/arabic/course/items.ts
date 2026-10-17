// Arabic's own check-item types (CLAUDE.md §5.3): read, spell, mark. Grading and text logic only;
// their rendering is in components/check/slots.tsx. Used at build time and in the client.
import type { ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { rng, shuffle } from '@ladder/core/lib/check/random';
import { MARK_LABEL, type MarkName } from '@/lib/arabic/marks';
import { normalise } from '@/lib/arabic/text';
import { compare, matchOf } from './text';

type Read = ExtraItem & { ar: string; prompt?: string; options: string[]; answer: string };
type Spell = ExtraItem & {
  prompt?: string;
  letters: string[];
  distractors: string[];
  answer: string;
  audio?: string;
  dictation?: boolean;
};
type Mark = ExtraItem & { ar: string; target: number; prompt?: string; options: MarkName[]; answer: MarkName };

/** Spell tiles are shuffled deterministically per item. */
const seedOf = (id: string) => [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export const itemTypes: Record<string, ItemTypeLogic> = {
  read: {
    grade: (i, r) => typeof r === 'string' && compare(r, (i as Read).answer, matchOf(i as never)),
    itemText: (i) => stripMarkup((i as Read).ar),
    answerText: (i) => `${stripMarkup((i as Read).ar)} · ${(i as Read).answer}`,
    sentences: (i) => [(i as Read).ar, ...(i as Read).options],
    options: (i) => (i as Read).options,
  },
  spell: {
    grade: (i, r) => normalise(Array.isArray(r) ? r.join('') : r) === normalise((i as Spell).answer),
    itemText: (i) => {
      const s = i as Spell;
      return s.prompt ? stripMarkup(s.prompt) : s.dictation ? 'Dengarkan, lalu susun hurufnya.' : 'Susun hurufnya.';
    },
    answerText: (i) => stripMarkup((i as Spell).answer),
    sentences: (i) => [(i as Spell).answer],
    tiles: (i) => {
      const s = i as Spell;
      return { tiles: shuffle([...s.letters, ...s.distractors], rng(seedOf(s.id))), answer: s.letters };
    },
  },
  mark: {
    grade: (i, r) => typeof r === 'string' && r === (i as Mark).answer,
    itemText: (i) => stripMarkup((i as Mark).ar),
    answerText: (i) => `${stripMarkup((i as Mark).ar)} · ${MARK_LABEL[(i as Mark).answer]}`,
    sentences: (i) => [(i as Mark).ar],
    options: (i) => (i as Mark).options,
  },
};

/** How engine item types read in Indonesian where the engine's default is English. */
export const itemText: Record<string, (item: ExtraItem) => string> = {
  listen: (i) => (i.prompt ? stripMarkup(i.prompt as string) : 'Dengarkan, lalu pilih.'),
};
