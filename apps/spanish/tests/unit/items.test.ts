import { describe, expect, it } from 'vitest';
import { grade } from '@ladder/core/lib/check/grade';
import { isAnswered } from '@ladder/core/lib/check/itemTypes';
import { placementOutcome } from '@ladder/core/lib/check/placement';
import type { CheckItem, Placement } from '@ladder/core/lib/types';
import { course } from '@/course.config';
import { DEFAULT_SETTINGS } from '@/course/progress';
import { gradeTyped } from '@/course/items';

const why = { id: 'x', en: 'x' };
const item = (x: Record<string, unknown>) => ({ id: 'i', why, ...x }) as unknown as CheckItem;
const text = course.text;
const strictAlways = { settings: { ...DEFAULT_SETTINGS, accentStrict: 'always' } };

describe('typed answers (form, dictation)', () => {
  const form = item({ type: 'form', base: 'estar', target: { person: 'el', tense: 'presente' }, answer: 'está', accents: 'lenient' });

  it('case, ¿ ¡ and trailing punctuation never matter', () => {
    expect(grade(form, 'ESTÁ.', text)).toEqual({ correct: true });
    expect(grade(item({ type: 'dictation', audio: '¿Dónde está?', answer: '¿Dónde está?', accents: 'strict' }), 'dónde está', text).correct).toBe(true);
  });

  it('lenient: a missing accent is accepted with a note naming the right spelling', () => {
    expect(grade(form, 'esta', text)).toEqual({ correct: true, note: { key: 'check.accentNote', params: { answer: 'está' } } });
  });

  it('strict, or the learner chose always strict: a missing accent is wrong', () => {
    expect(grade({ ...form, accents: 'strict' } as unknown as CheckItem, 'esta', text).correct).toBe(false);
    expect(grade(form, 'esta', text, strictAlways).correct).toBe(false);
  });

  it('ñ is a letter, not an accent: never forgiven', () => {
    expect(gradeTyped('ano', ['año'], 'lenient').correct).toBe(false);
  });

  it('a form chosen from options is exact', () => {
    const chosen = { ...form, options: ['está', 'esta'] } as unknown as CheckItem;
    expect(grade(chosen, 'esta', text).correct).toBe(false);
    expect(grade(chosen, 'está', text).correct).toBe(true);
  });

  it('an empty box is not an answer in a test', () => {
    expect(isAnswered(form, '', 'test')).toBe(false);
    expect(isAnswered(form, 'x', 'test')).toBe(true);
  });
});

describe('conjugate (per cell)', () => {
  const c = item({ type: 'conjugate', verb: 'comer', tense: 'presente', persons: ['yo', 'tu', 'nosotros'], answers: { yo: 'como', tu: 'comes', nosotros: 'comemos' }, accents: 'lenient' });
  it('every cell must be right; accents are forgiven before Easy 3', () => {
    expect(grade(c, ['como', 'comes', 'comemos'], text)).toEqual({ correct: true });
    expect(grade(c, ['como', 'come', 'comemos'], text).correct).toBe(false);
    const hablar = item({ type: 'conjugate', verb: 'estar', tense: 'presente', persons: ['tu', 'el'], answers: { tu: 'estás', el: 'está' }, accents: 'lenient' });
    expect(grade(hablar, ['estas', 'esta'], text)).toEqual({ correct: true, note: { key: 'check.accentNote', params: { answer: 'estás, está' } } });
  });
  it('a test needs every cell', () => expect(isAnswered(c, ['como', '', 'comemos'], 'test')).toBe(false));
});

describe('agree and stress', () => {
  it('agree: article and adjective both', () => {
    const a = item({ type: 'agree', noun: { es: 'casas', gender: 'f', number: 'pl' }, adj: 'blanco', definite: true, options: { article: ['los', 'las'], adjective: ['blancos', 'blancas'] }, answers: { article: 'las', adjective: 'blancas' } });
    expect(grade(a, ['las', 'blancas'], text).correct).toBe(true);
    expect(grade(a, ['las', 'blancos'], text).correct).toBe(false);
  });
  it('stress: the syllable and whether it needs an accent, always strict', () => {
    const s = item({ type: 'stress', word: 'café', syllables: ['ca', 'fé'], stressed: 1, needsAccent: true, accents: 'strict' });
    expect(grade(s, ['1', 'yes'], text).correct).toBe(true);
    expect(grade(s, ['1', 'no'], text).correct).toBe(false);
    expect(grade(s, ['0', 'yes'], text).correct).toBe(false);
  });
});

describe('placement (PRD §5.2): the first rung where a section is under 75%', () => {
  const p = { items: [], thresholds: {} } as unknown as Placement;
  const by = (d: number, e1: number, e2: number, e3: number) => ({ dasar: { score: d, total: 6 }, easy1: { score: e1, total: 6 }, easy2: { score: e2, total: 6 }, easy3: { score: e3, total: 6 } });
  const at = (s: ReturnType<typeof by>) => placementOutcome(0, p, course.placement!.outcomes, s).result;
  it('places by the first weak section', () => {
    expect(at(by(4, 6, 6, 6))).toBe('dasar');
    expect(at(by(5, 4, 6, 6))).toBe('easy-1');
    expect(at(by(5, 5, 2, 0))).toBe('easy-2');
  });
  it('passing everything while Easy 3 is soon still places in Easy 2', () => expect(at(by(6, 6, 6, 6))).toBe('easy-2'));
});
