import { describe, expect, it } from 'vitest';
import type { ExtraItem } from '@ladder/core/lib/types';
import type { Settings } from '@ladder/core/lib/progress/types';
import { clauseOf, gradeTyped, itemTypes } from '@/course/items';

const grade = (item: Record<string, unknown>, r: string | string[], settings?: Partial<Settings>) => {
  const res = itemTypes[item.type as string].grade(item as unknown as ExtraItem, r, {} as never, settings ? { settings: settings as Settings } : undefined);
  return typeof res === 'boolean' ? { correct: res } : res;
};
const why = { id: 'x', en: 'x' };

describe('typed answers (CLAUDE.md §5.2)', () => {
  const form = { id: 'f', type: 'form', why, base: 'fahren', target: { person: 'er', tense: 'praesens' }, answer: 'fährt', spelling: 'lenient', nounCaps: true };
  it('exact, and lenient with a note naming the right spelling', () => {
    expect(grade(form, 'fährt')).toEqual({ correct: true });
    expect(grade(form, 'faehrt')).toEqual({ correct: true, note: { key: 'check.spelling.digraph', params: { answer: 'fährt' } } });
    expect(grade(form, 'fahrt')).toEqual({ correct: true, note: { key: 'check.spelling.umlaut', params: { answer: 'fährt' } } });
  });
  it('strict items, and the always-strict setting, refuse them', () => {
    expect(grade({ ...form, spelling: 'strict' }, 'faehrt').correct).toBe(false);
    expect(grade(form, 'faehrt', { spellingStrict: 'always' } as never).correct).toBe(false);
  });
  it('a noun without its capital fails with the caps note', () => {
    expect(gradeTyped('ich habe einen bruder', ['Ich habe einen Bruder'], { nounCaps: true })).toEqual({ correct: false, note: { key: 'check.spelling.caps', params: { answer: 'Ich habe einen Bruder' } } });
    expect(gradeTyped('ich habe einen bruder', ['Ich habe einen Bruder'], { nounCaps: false }).correct).toBe(true);
  });
  it('options are exact', () => {
    expect(grade({ ...form, options: ['fährt', 'fahrt'] }, 'fahrt').correct).toBe(false);
  });
  it('conjugate grids: every cell, one note', () => {
    const c = { id: 'c', type: 'conjugate', why, verb: 'fahren', tense: 'praesens', persons: ['ich', 'du', 'er'], answers: { ich: 'fahre', du: 'fährst', er: 'fährt' }, spelling: 'lenient' };
    expect(grade(c, ['fahre', 'faehrst', 'fährt'])).toEqual({ correct: true, note: { key: 'check.spelling.digraph', params: { answer: 'fährst' } } });
    expect(grade(c, ['fahre', 'fahrst', 'fahre']).correct).toBe(false);
  });
});

describe('gender, case, wechsel', () => {
  it('compare exact forms', () => {
    expect(grade({ id: 'g', type: 'gender', why, noun: 'Haus', answer: 'n' }, 'n').correct).toBe(true);
    expect(grade({ id: 'g', type: 'gender', why, noun: 'Haus', answer: 'n' }, 'm').correct).toBe(false);
    const c = { id: 'k', type: 'case', why, sentence: 'Ich habe ___ Bruder.', role: 'akk', noun: 'Bruder', answer: 'einen' };
    expect(grade(c, 'einen').correct).toBe(true);
    expect(grade(c, 'einem').correct).toBe(false);
    expect(itemTypes.case.answerText(c as unknown as ExtraItem)).toBe('Ich habe einen Bruder.');
  });
});

describe('wordorder (CLAUDE.md §5.2)', () => {
  const w = {
    id: 'w',
    type: 'wordorder',
    why,
    tiles: ['auf', 'um 6 Uhr', 'heute', 'stehe', 'Ich'],
    answer: ['Ich', 'stehe', 'heute', 'um 6 Uhr', 'auf'],
    zones: ['p1', 'verb', 'middle', 'middle', 'end'],
  };
  it('accepts the answer and any valid fronting', () => {
    expect(grade(w, ['Ich', 'stehe', 'heute', 'um 6 Uhr', 'auf']).correct).toBe(true);
    expect(grade(w, ['Heute', 'stehe', 'ich', 'um 6 Uhr', 'auf']).correct).toBe(true);
    expect(grade(w, ['Um 6 Uhr', 'stehe', 'ich', 'heute', 'auf']).correct).toBe(true);
  });
  it('rejects the verb third or the prefix early', () => {
    expect(grade(w, ['Heute', 'ich', 'stehe', 'um 6 Uhr', 'auf']).correct).toBe(false);
    expect(grade(w, ['Ich', 'stehe', 'auf', 'heute', 'um 6 Uhr']).correct).toBe(false);
  });
  it('without zones, only the answer and accept', () => {
    const plain = { ...w, zones: undefined, accept: [['Heute', 'stehe', 'ich', 'um 6 Uhr', 'auf']] };
    expect(grade(plain, ['Heute', 'stehe', 'ich', 'um 6 Uhr', 'auf']).correct).toBe(true);
    expect(grade(plain, ['Um 6 Uhr', 'stehe', 'ich', 'heute', 'auf']).correct).toBe(false);
  });
  it('reads the clause type from the zones', () => {
    expect(clauseOf(['verb', 'middle', 'end'])).toBe('question');
    expect(clauseOf(['p1', 'middle', 'verb'])).toBe('sub');
    expect(clauseOf(['p1', 'verb', 'middle'])).toBe('main');
  });
});
