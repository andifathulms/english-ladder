import { describe, expect, it } from 'vitest';
import { getCurriculum, getData, getLessons } from '@/course/content';
import { lintLessons } from '@/course/lint';
import type { CheckItem, Lesson } from '@/course/types';

// The real data and curriculum, with one Easy 1 lesson changed per case.
const rungs = getCurriculum();
const data = getData();
const base = getLessons('easy-1', { includeDrafts: true }).find((l) => l.id === 'easy1-01-hola')!;

function lint(change: (l: Lesson) => Partial<Lesson>, opts: { order?: number; rung?: string } = {}) {
  const lesson = { ...base, ...change(base), order: opts.order ?? base.order, rung: opts.rung ?? base.rung } as Lesson;
  const byRung = new Map<string, Lesson[]>([[lesson.rung, [lesson]]]);
  return lintLessons(rungs, byRung, data);
}
const example = (es: string, extra: Partial<Lesson['examples'][number]> = {}) => (l: Lesson) => ({ examples: [...l.examples.slice(0, 5), { es, id: 'x', ...extra }] });
const errors = (fs: { level: string; message: string }[]) => fs.filter((f) => f.level === 'error').map((f) => f.message);
const warns = (fs: { level: string; message: string }[]) => fs.filter((f) => f.level === 'warn').map((f) => f.message);

describe('lint: the sample lesson', () => {
  it('is clean', () => expect(lint(() => ({}))).toEqual([]));
});

describe('lint: inventory (CLAUDE.md §4.1)', () => {
  it('flags a past tense before Easy 3', () => {
    const e = errors(lint(example('Lucía [[habló]].', {}), {}));
    expect(e.join('\n')).toMatch(/habló.*a2-indefinido/);
  });

  it('flags a stem-changing present before Easy 2 lesson 1', () => {
    expect(errors(lint((l) => ({ ...example('[[Quiero]] agua.')(l), glossary: [...l.glossary, { es: 'querer', id: 'mau', pos: 'verb', verb: { group: 'er' } }, { es: 'agua', id: 'air', pos: 'noun', gender: 'f', el: true }] }))).join('\n')).toMatch(/Quiero.*a1-stem-change/);
  });

  it('flags a reflexive verb before a1-reflexive, but allows me llamo', () => {
    const fs = lint((l) => ({ ...example('Me [[levanto]].')(l), glossary: [...l.glossary, { es: 'levantarse', id: 'bangun', pos: 'verb', verb: { group: 'ar', reflexive: true } }] }));
    expect(errors(fs).join('\n')).toMatch(/levanto/);
    expect(errors(fs).join('\n')).not.toMatch(/llamo/);
  });

  it('flags vosotros in a Latin American line, not in its Spain variant', () => {
    expect(errors(lint(example('¿Cómo [[estáis]]?'))).join('\n')).toMatch(/estáis.*hard2-vosotros|estáis/);
    expect(errors(lint(example('¿Cómo [[están]]?', { es_es: '¿Cómo [[estáis]]?' })))).toEqual([]);
  });

  it('flags se lo before Medium 1', () => {
    expect(errors(lint(example('Lucía, [[se lo]].'))).join('\n')).toMatch(/se lo/);
  });
});

describe('lint: words and spelling', () => {
  it('an unknown word is a warning in a draft and an error once reviewed', () => {
    expect(warns(lint(example('[[Hola]], jirafa.'))).join('\n')).toMatch(/unknown word "jirafa"/);
    expect(errors(lint((l) => ({ ...example('[[Hola]], jirafa.')(l), status: 'reviewed', review: { by: 'X', date: '2026-12-01' } }))).join('\n')).toMatch(/jirafa/);
  });

  it('a known word with wrong accents is always an error', () => {
    expect(errors(lint(example('[[Adios]], Lucía.'))).join('\n')).toMatch(/Adios.*adiós/);
  });

  it('question words carry their accent after ¿, and ? needs ¿', () => {
    expect(errors(lint(example('¿Como [[estás]]?'))).join('\n')).toMatch(/Como.*cómo/);
    expect(errors(lint(example('[[Hola]], Lucía?'))).join('\n')).toMatch(/without "¿"/);
    expect(errors(lint(example('[[Hola]], Lucía!'))).join('\n')).toMatch(/without "¡"/);
  });

  it('tu before a verb is the pronoun tú', () => {
    expect(errors(lint(example('¿Y tu [[estás]] bien?'))).join('\n')).toMatch(/tú/);
  });
});

describe('lint: variety (CLAUDE.md §4.2)', () => {
  const carro = (l: Lesson) => ({ glossary: [...l.glossary, { es: 'carro', id: 'mobil', pos: 'noun' as const, gender: 'm' as const, es_es: 'coche' }, { es: 'coche', id: 'mobil (Spanyol)', pos: 'noun' as const, gender: 'm' as const }] });
  it('a Spain word in a Latin American line, and the other way round', () => {
    expect(errors(lint((l) => ({ ...carro(l), ...example('El [[coche]].')(l) }))).join('\n')).toMatch(/coche.*Spain/);
    expect(errors(lint((l) => ({ ...carro(l), ...example('El [[carro]].', { es_es: 'El [[carro]] rojo.' })(l) }))).join('\n')).toMatch(/carro.*Latin American/);
  });

  it('an es_es line identical to its es line', () => {
    expect(errors(lint(example('[[Hola]].', { es_es: '[[Hola]].' }))).join('\n')).toMatch(/identical/);
  });
});

describe('lint: agreement (CLAUDE.md §4.5)', () => {
  const words = (l: Lesson) => [
    ...l.glossary,
    { es: 'casa', id: 'rumah', pos: 'noun' as const, gender: 'f' as const },
    { es: 'libro', id: 'buku', pos: 'noun' as const, gender: 'm' as const },
    { es: 'blanco', id: 'putih', pos: 'adj' as const },
  ];
  it('article and adjective agree with the noun', () => {
    expect(errors(lint((l) => ({ ...example('[[La]] libro.')(l), glossary: words(l) }))).join('\n')).toMatch(/article is "el"/);
    expect(errors(lint((l) => ({ ...example('Las [[casas]] blancos.')(l), glossary: words(l) }))).join('\n')).toMatch(/agrees as "blancas"/);
    expect(errors(lint((l) => ({ ...example('Las [[casas]] blancas.')(l), glossary: words(l) })))).toEqual([]);
  });
});

describe('lint: check items against lib/es (CLAUDE.md §4.4)', () => {
  const withItem = (item: Partial<CheckItem>) => (l: Lesson) => ({ check: [...l.check.slice(0, 4), { id: 'e1-01-cx', why: { id: 'x', en: 'x' }, ...item } as CheckItem] });
  it('a form item whose answer is not the library form', () => {
    expect(errors(lint(withItem({ type: 'form', base: 'llamarse', target: { person: 'yo', tense: 'presente' }, answer: 'me llamas', accents: 'lenient' } as never))).join('\n')).toMatch(/me llamas.*me llamo/);
  });
  it('a stress item that disagrees with syllabify and stressOf', () => {
    expect(errors(lint(withItem({ type: 'stress', word: 'café', syllables: ['caf', 'e'], stressed: 0, needsAccent: true } as never))).join('\n')).toMatch(/syllables[\s\S]*stressed/);
  });
  it('learners never produce vosotros before Hard 2', () => {
    expect(errors(lint(withItem({ type: 'conjugate', verb: 'llamarse', tense: 'presente', persons: ['yo', 'vosotros'], answers: { yo: 'me llamo', vosotros: 'os llamáis' } } as never))).join('\n')).toMatch(/vosotros/);
  });
});

describe('lint: bridges', () => {
  it('a glossary bridge must match bridges.yaml', () => {
    const fs = lint((l) => ({ glossary: [...l.glossary, { es: 'mesa', id: 'meja', pos: 'noun', gender: 'f', bridge: { pt: 'mesa', id: 'meja' } }, { es: 'zapato', id: 'sepatu', pos: 'noun', gender: 'm', bridge: { pt: 'zapato', id: 'sepatu' } }] }));
    expect(errors(fs).join('\n')).toMatch(/bridge for "zapato"/);
    expect(errors(fs).join('\n')).not.toMatch(/bridge for "mesa"/);
  });
});

describe('lint: M7 follow-ups', () => {
  it('a glossary es_es word is known in Spain lines only', () => {
    const withCarro = (l: Lesson) => ({ glossary: [...l.glossary, { es: 'carro', id: 'mobil', pos: 'noun' as const, gender: 'm' as const, es_es: 'coche' }] });
    expect(lint((l) => ({ ...withCarro(l), ...example('El [[carro]].', { es_es: 'El [[coche]].' })(l) }))).toEqual([]);
  });
  it('invariable plurals agree in either number (el lunes, los lunes)', () => {
    const lunes = (l: Lesson) => ({ glossary: [...l.glossary, { es: 'lunes', id: 'Senin', pos: 'noun' as const, gender: 'm' as const, plural: 'lunes' }] });
    expect(errors(lint((l) => ({ ...lunes(l), ...example('Los [[lunes]].')(l) })))).toEqual([]);
    expect(errors(lint((l) => ({ ...lunes(l), ...example('El [[lunes]].')(l) })))).toEqual([]);
    expect(errors(lint((l) => ({ ...lunes(l), ...example('La [[lunes]].')(l) }))).join('\n')).toMatch(/article/);
  });
});
