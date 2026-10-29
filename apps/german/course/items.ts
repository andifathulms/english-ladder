// German Ladder's check-item logic (CLAUDE.md §3.3, §5.2): form, conjugate, dictation, gender, case,
// wordorder and wechsel, and its wording of the engine's types. Used at build time and in the client.
//
// Typed answers compare with normDe: the sentence start's capital and trailing punctuation never
// matter; elsewhere case does (a noun without its capital is wrong, with a `caps` note). In lenient
// mode (before Easy 3, unless the learner chose "always strict") ae/oe/ue/ss and a missed umlaut are
// accepted with a note showing the right spelling. Grids answer as arrays in their persons' order;
// wordorder as tiles, graded by the verbal bracket so any valid order passes.
import type { GradeContext, GradeResult, ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { baseDe } from '@/lib/de/text';
import { capsCheck, normDe, type SpellingMode } from '@/lib/de/spelling';
import { PUNCT_END } from '@/lib/de/text';
import { validOrder, type ClauseType, type Zone } from '@/lib/de/bracket';
import type { CaseItem, ConjugateItem, DictationItem, FormItem, GenderItem, WechselItem, WordorderItem } from './schema';
import type { z } from 'zod';

type Form = z.infer<typeof FormItem>;
type Conjugate = z.infer<typeof ConjugateItem>;
type Dictation = z.infer<typeof DictationItem>;
type Gender = z.infer<typeof GenderItem>;
type Case = z.infer<typeof CaseItem>;
type Wordorder = z.infer<typeof WordorderItem>;
type Wechsel = z.infer<typeof WechselItem>;

/** Spelling options as items carry them (stamped from the rung by the content model). */
export type Spelling = { spelling?: SpellingMode; nounCaps?: boolean };

const str = (r: string | string[]) => (Array.isArray(r) ? r.join(' ') : r);
const cells = (r: string | string[]) => (Array.isArray(r) ? r : [r]);
const filledIn = (r: string | string[]) => str(r).trim() !== '';

/** The item's spelling mode, unless the learner asked for strict spelling everywhere (PRD §5.8). */
export function modeOf(item: Spelling, ctx?: GradeContext): SpellingMode {
  if (ctx?.settings?.spellingStrict === 'always') return 'strict';
  return item.spelling ?? 'strict';
}

/**
 * One typed answer against the accepted spellings. A lenient pass carries a note with the right
 * spelling; a capital missing on a noun fails with the caps note.
 */
export function gradeTyped(given: string, accepted: string[], item: Spelling, ctx?: GradeContext): GradeResult {
  const mode = modeOf(item, ctx);
  const opts = { spelling: mode, nounCaps: item.nounCaps ?? true, umlautLenient: mode === 'lenient' };
  let caps: string | null = null;
  for (const a of accepted) {
    const want = stripMarkup(a);
    const r = normDe(stripMarkup(given), want, opts);
    if (r.correct && r.notes.length === 0) return { correct: true };
    // The note quotes the answer without its closing mark (the note ends its own sentence).
    if (r.correct) return { correct: true, note: { key: `check.spelling.${r.notes[0]}`, params: { answer: want.replace(PUNCT_END, '') } } };
    // The caps note names the nouns written small (Bruder), or the answer when it is one word.
    if (r.notes.includes('caps') && !caps) caps = capsCheck(stripMarkup(given), want).join(', ') || want.replace(PUNCT_END, '');
  }
  return caps ? { correct: false, note: { key: 'check.spelling.caps', params: { answer: caps } } } : { correct: false };
}

/** Several cells graded together: all must pass; one note lists the cells with their right spelling. */
function gradeCells(given: string[], want: string[], item: Spelling, ctx?: GradeContext): GradeResult {
  const noted: string[] = [];
  let key = '';
  for (let i = 0; i < want.length; i++) {
    const r = gradeTyped(given[i] ?? '', [want[i]], item, ctx);
    if (!r.correct) return { correct: false, ...(r.note ? { note: r.note } : {}) };
    if (r.note) {
      noted.push(want[i]);
      key ||= r.note.key;
    }
  }
  return noted.length ? { correct: true, note: { key, params: { answer: noted.join(', ') } } } : { correct: true };
}

/** Per-cell results for a grid (the answer area colours each cell). */
export function cellResults(given: string[], want: string[], item: Spelling, ctx?: GradeContext): boolean[] {
  return want.map((w, i) => gradeTyped(given[i] ?? '', [w], item, ctx).correct);
}

/** A wordorder item's clause type, read from its zones: verb first → yes/no question; verb last → subordinate. */
export function clauseOf(zones: Zone[]): ClauseType {
  if (zones[0] === 'verb') return 'question';
  if (zones[zones.length - 1] === 'verb') return 'sub';
  return 'main';
}

/** Tile orders compared as the engine's order items do: the first word's case is free. */
const sameTiles = (a: string[], b: string[]) =>
  a.length === b.length && a.every((t, i) => (i === 0 ? t.toLowerCase() === b[i].toLowerCase() : t === b[i]));

export function gradeWordorder(w: Wordorder, given: string[]): boolean {
  if ([w.answer, ...(w.accept ?? [])].some((a) => sameTiles(given, a))) return true;
  return !!w.zones && validOrder(given, w.answer, w.zones, clauseOf(w.zones));
}

const filledSlot = (sentence: string, answer: string) => sentence.replace('___', answer);

export const itemTypes: Record<string, ItemTypeLogic> = {
  form: {
    grade: (i, r, _text, ctx) => {
      const f = i as unknown as Form;
      // Chosen from options: exact (the umlaut is part of the choice).
      if (f.options) return str(r) === f.answer;
      return gradeTyped(str(r), [f.answer, ...(f.accept ?? [])], f, ctx);
    },
    itemText: (i) => (i as unknown as Form).base,
    answerText: (i) => (i as unknown as Form).answer,
    sentences: (i) => {
      const f = i as unknown as Form;
      return [f.frame ? filledSlot(f.frame, f.answer) : f.answer];
    },
    options: (i) => (i as unknown as Form).options ?? [],
    answered: (_i, r, where) => where === 'placement' || filledIn(r),
  },
  conjugate: {
    grade: (i, r, _text, ctx) => {
      const c = i as unknown as Conjugate;
      return gradeCells(cells(r), c.persons.map((p) => c.answers[p]!), c, ctx);
    },
    itemText: (i) => (i as unknown as Conjugate).verb,
    answerText: (i) => {
      const c = i as unknown as Conjugate;
      return c.persons.map((p) => c.answers[p]).join(', ');
    },
    sentences: (i) => Object.values((i as unknown as Conjugate).answers) as string[],
    answered: (i, r, where) => where === 'placement' || cells(r).filter((x) => x.trim()).length === (i as unknown as Conjugate).persons.length,
  },
  dictation: {
    grade: (i, r, _text, ctx) => {
      const d = i as unknown as Dictation;
      return gradeTyped(str(r), [d.answer, ...(d.accept ?? [])], d, ctx);
    },
    itemText: () => 'Dengarkan, lalu tulis.',
    answerText: (i) => (i as unknown as Dictation).answer,
    sentences: (i) => [(i as unknown as Dictation).answer],
    answered: (_i, r, where) => where === 'placement' || filledIn(r),
  },
  gender: {
    grade: (i, r) => str(r) === (i as unknown as Gender).answer,
    itemText: (i) => (i as unknown as Gender).noun,
    answerText: (i) => {
      const g = i as unknown as Gender;
      return `${{ m: 'der', f: 'die', n: 'das' }[g.answer]} ${g.noun}`;
    },
    sentences: (i) => [(i as unknown as Gender).noun],
    options: () => ['m', 'f', 'n'],
  },
  case: {
    // Exact forms (CLAUDE.md §5.2): den is not dem, whatever the spelling mode.
    grade: (i, r) => baseDe(str(r)) === baseDe((i as unknown as Case).answer),
    itemText: (i) => stripMarkup((i as unknown as Case).sentence),
    answerText: (i) => {
      const c = i as unknown as Case;
      return stripMarkup(filledSlot(c.sentence, c.answer));
    },
    sentences: (i) => {
      const c = i as unknown as Case;
      return [filledSlot(c.sentence, c.answer)];
    },
    options: (i) => (i as unknown as Case).options ?? [],
    answered: (_i, r, where) => where === 'placement' || filledIn(r),
  },
  wordorder: {
    grade: (i, r) => gradeWordorder(i as unknown as Wordorder, cells(r)),
    itemText: (i) => (i as unknown as Wordorder).prompt ?? (i as unknown as Wordorder).answer.join(' '),
    answerText: (i) => (i as unknown as Wordorder).answer.join(' '),
    sentences: (i) => [(i as unknown as Wordorder).answer.join(' ')],
    tiles: (i) => {
      const w = i as unknown as Wordorder;
      return { tiles: w.tiles, answer: w.answer };
    },
  },
  wechsel: {
    grade: (i, r) => str(r) === (i as unknown as Wechsel).answer,
    itemText: (i) => stripMarkup((i as unknown as Wechsel).sentence),
    answerText: (i) => {
      const w = i as unknown as Wechsel;
      return stripMarkup(filledSlot(w.sentence, w.answer));
    },
    sentences: (i) => {
      const w = i as unknown as Wechsel;
      return [filledSlot(w.sentence, w.answer)];
    },
    options: (i) => (i as unknown as Wechsel).options,
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
