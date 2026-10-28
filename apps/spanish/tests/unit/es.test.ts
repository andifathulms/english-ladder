import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import {
  PERSONS,
  accentDiff,
  adjForms,
  agreeAdj,
  article,
  buildFormIndex,
  conjugate,
  conjugateAll,
  foldAccents,
  gerundio,
  needsAccent,
  normEs,
  participio,
  plural,
  stemEnding,
  stressOf,
  syllabify,
  withStress,
  type Tense,
  type VerbData,
} from '@/lib/es';
import { SYLLABLES } from './es-words';

// verbs.yaml and the verbs added with each rung's lessons (data/verbs/*.yaml).
const DATA = path.join(__dirname, '../../content/data');
const verbFiles = [path.join(DATA, 'verbs.yaml'), ...(fs.existsSync(path.join(DATA, 'verbs')) ? fs.readdirSync(path.join(DATA, 'verbs')).filter((f) => f.endsWith('.yaml')).map((f) => path.join(DATA, 'verbs', f)) : [])];
const VERBS = verbFiles.flatMap((f) => yaml.load(fs.readFileSync(f, 'utf8'), { schema: yaml.JSON_SCHEMA }) as VerbData[]);
const verb = (inf: string) => VERBS.find((v) => v.inf === inf)!;

describe('syllabify', () => {
  it('has at least 200 hand-checked words', () => expect(SYLLABLES.length).toBeGreaterThanOrEqual(200));

  it.each(SYLLABLES.map((w) => [w.word, w.syllables.join('-')]))('%s → %s', (word, want) => {
    expect(syllabify(word).join('-')).toBe(want);
  });

  it('keeps the spelling and case', () => {
    expect(syllabify('México')).toEqual(['Mé', 'xi', 'co']);
    expect(syllabify('¿Qué')).toEqual(['¿Qué']);
  });
});

describe('stressOf and needsAccent', () => {
  const poly = SYLLABLES.filter((w) => w.syllables.length > 1);

  it('covers at least 150 words', () => expect(poly.length).toBeGreaterThanOrEqual(150));

  it.each(SYLLABLES.map((w) => [w.word, w.stressed]))('%s is stressed on syllable %i', (word, idx) => {
    expect(stressOf(word as string)).toBe(idx);
  });

  it.each(poly.map((w) => [w.word, w.stressed]))('%s: an accent mark exactly when written', (word, idx) => {
    expect(needsAccent(word as string, idx as number)).toBe(/[áéíóú]/.test(word as string));
  });

  it('decides from the spelling without its accent too (except a hiatus í/ú, which the accent makes)', () => {
    for (const w of poly.filter((x) => !/[íú]/.test(x.word))) {
      expect(needsAccent(foldAccents(w.word), w.stressed), w.word).toBe(/[áéó]/.test(w.word));
    }
  });

  it('monosyllables never need one by the rules', () => {
    expect(needsAccent('sol', 0)).toBe(false);
    expect(needsAccent('fue', 0)).toBe(false);
  });

  it('writes the stress back when an ending moves it', () => {
    expect(withStress('jovenes', 0)).toBe('jóvenes');
    expect(withStress('ingleses', 1)).toBe('ingleses');
    expect(withStress('cancion', 1)).toBe('canción');
    expect(withStress('canciones', 1)).toBe('canciones');
    expect(withStress('alemana', 2)).toBe('alemana');
    expect(withStress('aleman', 2)).toBe('alemán');
  });
});

describe('conjugate', () => {
  const cases = VERBS.flatMap((v) => Object.entries(v.check ?? {}).map(([tense, forms]) => [v.inf, tense, forms] as const));

  it('every verb lists its present tense', () => {
    for (const v of VERBS) expect(v.check?.presente, v.inf).toHaveLength(6);
  });

  it.each(cases)('%s, %s', (inf, tense, forms) => {
    expect(conjugateAll(verb(inf), tense as Tense)).toEqual(forms);
  });

  it('spelling changes keep the sound', () => {
    expect(conjugate(verb('buscar'), 'subjuntivo', 'yo')).toBe('busque');
    expect(conjugate(verb('llegar'), 'subjuntivo', 'nosotros')).toBe('lleguemos');
    expect(conjugate(verb('seguir'), 'presente', 'yo')).toBe('sigo');
    expect(conjugate(verb('escoger'), 'subjuntivo', 'el')).toBe('escoja');
  });

  it('commands: tú from él, listed irregulars, usted from the subjunctive', () => {
    expect(conjugate(verb('hablar'), 'imperativo', 'tu')).toBe('habla');
    expect(conjugate(verb('seguir'), 'imperativo', 'tu')).toBe('sigue');
    expect(conjugate(verb('tener'), 'imperativo', 'tu')).toBe('ten');
    expect(conjugate(verb('girar'), 'imperativo', 'el')).toBe('gire');
    expect(conjugate(verb('hablar'), 'imperativo', 'vosotros')).toBe('hablad');
    expect(conjugate(verb('hablar'), 'imperativo', 'yo')).toBe('');
  });

  it('gerunds and participles', () => {
    expect(['hablar', 'comer', 'leer', 'pedir', 'dormir', 'ir', 'decir'].map((v) => gerundio(verb(v)))).toEqual([
      'hablando',
      'comiendo',
      'leyendo',
      'pidiendo',
      'durmiendo',
      'yendo',
      'diciendo',
    ]);
    expect(['hablar', 'comer', 'leer', 'hacer', 'ver', 'escribir', 'volver'].map((v) => participio(verb(v)))).toEqual([
      'hablado',
      'comido',
      'leído',
      'hecho',
      'visto',
      'escrito',
      'vuelto',
    ]);
  });

  it('reflexive verbs carry their pronoun', () => {
    expect(conjugateAll(verb('levantarse'), 'presente')[0]).toBe('me levanto');
    expect(conjugate(verb('levantarse'), 'preterito', 'el')).toBe('se levantó');
  });

  it('splits stem and ending for the grid', () => {
    expect(stemEnding(verb('hablar'), 'hablamos')).toEqual({ stem: 'habl', ending: 'amos' });
    expect(stemEnding(verb('comer'), 'comí')).toEqual({ stem: 'com', ending: 'í' });
    expect(stemEnding(verb('levantarse'), 'me levanto')).toEqual({ stem: 'me levant', ending: 'o' });
  });
});

describe('form index', () => {
  const index = buildFormIndex(VERBS);

  it('finds a form with its verb, tense and person', () => {
    expect(index.get('tuvo')).toEqual([{ inf: 'tener', tense: 'preterito', person: 'el' }]);
    expect(index.get('levanto')?.[0]).toMatchObject({ inf: 'levantarse', tense: 'presente', person: 'yo' });
  });

  it('keeps ambiguous forms with every reading', () => {
    const tenses = index.get('hablamos')!.map((f) => f.tense);
    expect(tenses).toEqual(expect.arrayContaining(['presente', 'preterito']));
    expect(index.get('fue')!.map((f) => f.inf).sort()).toEqual(['ir', 'ser']);
  });
});

describe('agreement', () => {
  it('adjectives in -o, -e, consonant, -or, -án, -és, -ista', () => {
    expect(adjForms('blanco')).toEqual(['blanco', 'blanca', 'blancos', 'blancas']);
    expect(adjForms('verde')).toEqual(['verde', 'verde', 'verdes', 'verdes']);
    expect(adjForms('azul')).toEqual(['azul', 'azul', 'azules', 'azules']);
    expect(adjForms('feliz')).toEqual(['feliz', 'feliz', 'felices', 'felices']);
    expect(adjForms('joven')).toEqual(['joven', 'joven', 'jóvenes', 'jóvenes']);
    expect(adjForms('trabajador')).toEqual(['trabajador', 'trabajadora', 'trabajadores', 'trabajadoras']);
    expect(adjForms('alemán')).toEqual(['alemán', 'alemana', 'alemanes', 'alemanas']);
    expect(adjForms('inglés')).toEqual(['inglés', 'inglesa', 'ingleses', 'inglesas']);
    expect(adjForms('optimista')).toEqual(['optimista', 'optimista', 'optimistas', 'optimistas']);
    expect(adjForms('mejor')).toEqual(['mejor', 'mejor', 'mejores', 'mejores']);
  });

  it('listed forms win', () => {
    expect(agreeAdj('español', 'f', 'pl', ['español', 'española', 'españoles', 'españolas'])).toBe('españolas');
  });

  it('noun plurals', () => {
    const cases = { libro: 'libros', ciudad: 'ciudades', lápiz: 'lápices', joven: 'jóvenes', lunes: 'lunes', país: 'países', canción: 'canciones', examen: 'exámenes', sofá: 'sofás', reloj: 'relojes', autobús: 'autobuses', mes: 'meses', rey: 'reyes' };
    for (const [sg, pl] of Object.entries(cases)) expect(plural(sg), sg).toBe(pl);
  });

  it('articles, with el agua', () => {
    expect(article('m', 'sg', true)).toBe('el');
    expect(article('f', 'pl', true)).toBe('las');
    expect(article('f', 'sg', false)).toBe('una');
    expect(article('f', 'sg', true, { el: true })).toBe('el');
    expect(article('f', 'pl', true, { el: true })).toBe('las');
    expect(article('f', 'sg', false, { el: true })).toBe('un');
  });
});

describe('normEs', () => {
  it('lowercases, drops ¿ ¡ and trailing punctuation', () => {
    expect(normEs('¿Dónde ESTÁ?')).toBe('dónde está');
    expect(normEs('  ¡Hola,  amigo! ')).toBe('hola, amigo');
  });

  it('strict keeps accents; lenient folds á é í ó ú but not ñ or ü', () => {
    expect(normEs('Está')).not.toBe(normEs('Esta'));
    expect(normEs('Está', { accents: 'lenient' })).toBe(normEs('esta', { accents: 'lenient' }));
    expect(normEs('año', { accents: 'lenient' })).not.toBe(normEs('ano', { accents: 'lenient' }));
    expect(normEs('pingüino', { accents: 'lenient' })).not.toBe(normEs('pinguino', { accents: 'lenient' }));
  });

  it('accentDiff is true only when accents are the whole difference', () => {
    expect(accentDiff('esta', 'está')).toBe(true);
    expect(accentDiff('Está.', 'está')).toBe(false);
    expect(accentDiff('estas', 'está')).toBe(false);
    expect(accentDiff('ano', 'año')).toBe(false);
  });
});

it('PERSONS order is yo, tú, él, nosotros, vosotros, ellos', () => {
  expect(PERSONS).toEqual(['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos']);
});
