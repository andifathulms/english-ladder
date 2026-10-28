// Spanish Ladder's check-item logic (CLAUDE.md §3.3, §5.2): form, conjugate, agree, dictation and
// stress, and its wording of the engine's types. Used at build time and in the client.
//
// Typed answers compare with normEs: case, the opening ¿ ¡ and trailing punctuation never matter.
// In lenient mode (before Easy 3, unless the learner chose "always strict") an answer that only
// misses or misplaces accents is accepted with a note showing the right spelling. Responses for
// grids are arrays: conjugate in its persons' order, agree as [article, adjective], stress as
// [syllable index, "yes" | "no"].
import type { GradeContext, GradeResult, ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { accentDiff, normEs, type AccentMode } from '@/lib/es/text';
import { foldAccents } from '@/lib/es/text';
import type { AgreeItem, ConjugateItem, DictationItem, FormItem, StressItem } from './schema';
import type { z } from 'zod';

type Form = z.infer<typeof FormItem>;
type Conjugate = z.infer<typeof ConjugateItem>;
type Agree = z.infer<typeof AgreeItem>;
type Dictation = z.infer<typeof DictationItem>;
type Stress = z.infer<typeof StressItem>;

const str = (r: string | string[]) => (Array.isArray(r) ? r.join(' ') : r);
const cells = (r: string | string[]) => (Array.isArray(r) ? r : [r]);

/** The item's accent mode, unless the learner asked for strict accents everywhere (PRD §5.8). */
export function modeOf(item: { accents?: AccentMode }, ctx?: GradeContext): AccentMode {
  if (ctx?.settings?.accentStrict === 'always') return 'strict';
  return item.accents ?? 'strict';
}

/** One typed answer against the accepted spellings; a lenient pass names the right spelling. */
export function gradeTyped(given: string, accepted: string[], mode: AccentMode): GradeResult {
  const g = normEs(stripMarkup(given));
  for (const a of accepted) if (g === normEs(stripMarkup(a))) return { correct: true };
  if (mode === 'lenient') {
    const hit = accepted.find((a) => accentDiff(g, stripMarkup(a)));
    if (hit) return { correct: true, note: { key: 'check.accentNote', params: { answer: stripMarkup(hit) } } };
  }
  return { correct: false };
}

/** Several cells graded together: all must pass; one note lists the cells written without accents. */
function gradeCells(given: string[], want: string[], mode: AccentMode): GradeResult {
  const notes: string[] = [];
  for (let i = 0; i < want.length; i++) {
    const r = gradeTyped(given[i] ?? '', [want[i]], mode);
    if (!r.correct) return { correct: false };
    if (r.note) notes.push(want[i]);
  }
  return notes.length ? { correct: true, note: { key: 'check.accentNote', params: { answer: notes.join(', ') } } } : { correct: true };
}

/** Per-cell results for a grid (the answer area colours each cell). */
export function cellResults(given: string[], want: string[], mode: AccentMode): boolean[] {
  return want.map((w, i) => gradeTyped(given[i] ?? '', [w], mode).correct);
}

const filledIn = (r: string | string[]) => str(r).trim() !== '';

export const itemTypes: Record<string, ItemTypeLogic> = {
  form: {
    grade: (i, r, _text, ctx) => {
      const f = i as unknown as Form;
      // Chosen from options: exact (the accents are part of the choice).
      if (f.options) return str(r) === f.answer;
      return gradeTyped(str(r), [f.answer, ...(f.accept ?? [])], modeOf(f, ctx));
    },
    itemText: (i) => (i as unknown as Form).base,
    answerText: (i) => (i as unknown as Form).answer,
    sentences: (i) => {
      const f = i as unknown as Form;
      return [f.frame ? f.frame.replace('___', f.answer) : f.answer];
    },
    options: (i) => (i as unknown as Form).options ?? [],
    answered: (_i, r, where) => where === 'placement' || filledIn(r),
  },
  conjugate: {
    grade: (i, r, _text, ctx) => {
      const c = i as unknown as Conjugate;
      return gradeCells(cells(r), c.persons.map((p) => c.answers[p]!), modeOf(c, ctx));
    },
    itemText: (i) => (i as unknown as Conjugate).verb,
    answerText: (i) => {
      const c = i as unknown as Conjugate;
      return c.persons.map((p) => c.answers[p]).join(', ');
    },
    sentences: (i) => Object.values((i as unknown as Conjugate).answers) as string[],
    answered: (i, r, where) => where === 'placement' || cells(r).filter((x) => x.trim()).length === (i as unknown as Conjugate).persons.length,
  },
  agree: {
    grade: (i, r) => {
      const a = i as unknown as Agree;
      const [art, adj] = cells(r);
      return art === a.answers.article && adj === a.answers.adjective;
    },
    itemText: (i) => {
      const a = i as unknown as Agree;
      return `___ ${a.noun.es} ___ (${a.adj})`;
    },
    answerText: (i) => {
      const a = i as unknown as Agree;
      return `${a.answers.article} ${a.noun.es} ${a.answers.adjective}`;
    },
    sentences: (i) => {
      const a = i as unknown as Agree;
      return [`${a.answers.article} ${a.noun.es} ${a.answers.adjective}`];
    },
    answered: (_i, r, where) => where === 'placement' || cells(r).filter(Boolean).length === 2,
  },
  dictation: {
    grade: (i, r, _text, ctx) => {
      const d = i as unknown as Dictation;
      return gradeTyped(str(r), [d.answer, ...(d.accept ?? [])], modeOf(d, ctx));
    },
    itemText: () => 'Dengarkan, lalu tulis.',
    answerText: (i) => (i as unknown as Dictation).answer,
    sentences: (i) => [(i as unknown as Dictation).answer],
    answered: (_i, r, where) => where === 'placement' || filledIn(r),
  },
  stress: {
    // Always strict (CLAUDE.md §3.3): the stressed syllable and whether it needs a written accent.
    grade: (i, r) => {
      const s = i as unknown as Stress;
      const [syl, accent] = cells(r);
      return Number(syl) === s.stressed && accent === (s.needsAccent ? 'yes' : 'no');
    },
    itemText: (i) => foldAccents((i as unknown as Stress).word),
    answerText: (i) => (i as unknown as Stress).word,
    sentences: (i) => [(i as unknown as Stress).word],
    answered: (_i, r, where) => where === 'placement' || cells(r).filter(Boolean).length === 2,
  },
};

type Core = ExtraItem & { prompt?: string; wrong?: string; answer?: string | string[] };
const plain = (s: string) => stripMarkup(s);
const filled = (i: ExtraItem) => {
  const c = i as Core;
  return c.prompt && c.prompt.includes('___') ? plain(c.prompt.replace('___', c.answer as string)) : plain(c.answer as string);
};

/** How engine item types read on the continue card and in results. */
export const itemText: Record<string, (item: ExtraItem) => string> = {
  listen: (i) => (i.prompt ? plain(i.prompt as string) : 'Dengarkan, lalu pilih.'),
};

export const answerText: Record<string, (item: ExtraItem) => string> = {
  choice: filled,
  gap: filled,
};
