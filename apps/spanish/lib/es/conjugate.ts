// Spanish conjugation (CLAUDE.md §5.1). Regular -ar/-er/-ir patterns, stem changes (e→ie, o→ue,
// e→i, u→ue), spelling changes (c→qu, g→gu, z→c, g→j, gu→g, c→zc, -uir → y), and the irregular
// cells listed per verb in content/data/verbs.yaml. Pure: the verb data is passed in.
import { syllabify } from './syllables';

export const PERSONS = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'] as const;
export const TENSES = ['presente', 'preterito', 'imperfecto', 'futuro', 'condicional', 'subjuntivo', 'imperativo'] as const;
export type Person = (typeof PERSONS)[number];
export type Tense = (typeof TENSES)[number];

/** Six forms in PERSONS order, a map of some persons, or (preterite, future) a stem. */
export type Override = string[] | Partial<Record<Person, string>> | { stem: string };

/** One verb as content/data/verbs.yaml lists it. */
export type VerbData = {
  inf: string;
  id: string;
  en?: string;
  /** Present-tense stem change: e→ie, o→ue, e→i (‑ir), u→ue (jugar). */
  stem?: 'ie' | 'ue' | 'i' | 'u-ue';
  /** yo in -zco (conocer, conducir). */
  zc?: boolean;
  /** Stressed í/ú in the boot persons (enviar → envío, continuar → continúo). */
  stress?: 'i' | 'u';
  /** Cells the rules don't produce, per tense. */
  irregular?: Partial<Record<Tense | 'gerundio' | 'participio', Override | string>>;
  /** Reference forms (PERSONS order) the library is tested against. */
  check?: Partial<Record<Tense, string[]>>;
};

const ENDINGS: Record<'ar' | 'er' | 'ir', Record<Exclude<Tense, 'futuro' | 'condicional' | 'subjuntivo' | 'imperativo'>, string[]>> = {
  ar: {
    presente: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    preterito: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    imperfecto: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
  },
  er: {
    presente: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    preterito: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperfecto: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
  ir: {
    presente: ['o', 'es', 'e', 'imos', 'ís', 'en'],
    preterito: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperfecto: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
};
const FUTURE = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
const CONDITIONAL = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
/** Strong (irregular-stem) preterite endings: tuve, tuviste, tuvo … ; after j, -eron. */
const STRONG_PRET = ['e', 'iste', 'o', 'imos', 'isteis', 'ieron'];

const BOOT: Person[] = ['yo', 'tu', 'el', 'ellos'];
const pi = (p: Person) => PERSONS.indexOf(p);

/** The verb without a reflexive -se, and whether it had one. */
export function splitReflexive(inf: string): { base: string; reflexive: boolean } {
  return /(ar|er|ir|ír)se$/.test(inf) ? { base: inf.slice(0, -2), reflexive: true } : { base: inf, reflexive: false };
}

export const groupOf = (base: string): 'ar' | 'er' | 'ir' => (base.endsWith('ar') ? 'ar' : base.endsWith('er') ? 'er' : 'ir');

const REFLEXIVE: Record<Person, string> = { yo: 'me', tu: 'te', el: 'se', nosotros: 'nos', vosotros: 'os', ellos: 'se' };

/** Applies the stem change to the last e/o/u of the stem. */
function changeStem(stem: string, change: NonNullable<VerbData['stem']> | 'e-i' | 'o-u'): string {
  const from = change === 'ue' || change === 'o-u' ? 'o' : change === 'u-ue' ? 'u' : 'e';
  const to = change === 'ie' ? 'ie' : change === 'ue' || change === 'u-ue' ? 'ue' : change === 'i' || change === 'e-i' ? 'i' : 'u';
  const at = stem.lastIndexOf(from);
  if (at < 0) return stem;
  // A word-initial o→ue writes hue (oler → huelo); not needed in v1, so plain.
  return stem.slice(0, at) + to + stem.slice(at + 1);
}

/** A generated one-syllable form never carries a written accent (vio, dio, fue). */
function monosyllable(form: string): string {
  return syllabify(form).length === 1 ? form.replace(/[áéíóú]/g, (c) => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' })[c]!) : form;
}

/**
 * Spelling before an ending, so the consonant keeps its sound. -ar stems before e: c→qu, g→gu, z→c
 * (busqué, llegué, empecé). -er/-ir stems before a/o: g→j, gu→g, c→z after a consonant (escojo,
 * sigo, venzo).
 */
function spell(stem: string, ending: string, group: 'ar' | 'er' | 'ir'): string {
  if (group === 'ar') {
    if (!/^[eé]/.test(ending)) return stem;
    if (stem.endsWith('c')) return stem.slice(0, -1) + 'qu';
    if (stem.endsWith('g')) return stem.slice(0, -1) + 'gu';
    if (stem.endsWith('z')) return stem.slice(0, -1) + 'c';
    return stem;
  }
  if (!/^[aoáó]/.test(ending)) return stem;
  if (stem.endsWith('gu') && !stem.endsWith('qu')) return stem.slice(0, -1);
  if (stem.endsWith('g')) return stem.slice(0, -1) + 'j';
  if (/[^aeiou]c$/.test(stem)) return stem.slice(0, -1) + 'z';
  return stem;
}

const isVowel = (c: string | undefined) => !!c && /[aeiouáéíóú]/.test(c);

function overrideCell(o: Override | string | undefined, person: Person): string | undefined {
  if (o === undefined) return undefined;
  if (typeof o === 'string') return person === 'tu' ? o : undefined;
  if (Array.isArray(o)) return o[pi(person)];
  if ('stem' in o) return undefined;
  return (o as Partial<Record<Person, string>>)[person];
}
const overrideStem = (o: Override | string | undefined) => (o && typeof o === 'object' && !Array.isArray(o) && 'stem' in o ? (o as { stem: string }).stem : undefined);

function presente(v: VerbData, base: string, person: Person): string {
  const g = groupOf(base);
  let stem = base.slice(0, -2);
  const ending = ENDINGS[g].presente[pi(person)];
  const boot = BOOT.includes(person);
  if (v.stem && boot) stem = changeStem(stem, v.stem);
  if (person === 'yo' && v.zc) return stem.slice(0, -1) + 'zco';
  // -uir (not -guir): construyo, construyes, construye, construyen.
  if (/[^gq]uir$/.test(base) && boot) return stem + 'y' + ending;
  if (v.stress && boot) {
    const at = stem.lastIndexOf(v.stress);
    stem = stem.slice(0, at) + (v.stress === 'i' ? 'í' : 'ú') + stem.slice(at + 1);
  }
  return stem.length ? spell(stem, ending, g) + ending : ending;
}

function preterito(v: VerbData, base: string, person: Person): string {
  const g = groupOf(base);
  const strong = overrideStem(v.irregular?.preterito);
  const i = pi(person);
  if (strong) {
    const end = strong.endsWith('j') && person === 'ellos' ? 'eron' : STRONG_PRET[i];
    // hacer: hice, hiciste, hizo.
    if (strong.endsWith('c') && person === 'el') return strong.slice(0, -1) + 'zo';
    return strong + end;
  }
  let stem = base.slice(0, -2);
  let ending = ENDINGS[g].preterito[i];
  // -ir stem-changers: e→i, o→u in él and ellos (pidió, durmieron).
  if (g === 'ir' && v.stem && (person === 'el' || person === 'ellos')) stem = changeStem(stem, v.stem === 'ue' ? 'o-u' : 'e-i');
  // -er/-ir after a vowel: leyó, leyeron; leíste, leímos, leísteis.
  if (g !== 'ar' && isVowel(stem[stem.length - 1]) && !/[gq]u$/.test(stem)) {
    if (person === 'el' || person === 'ellos') ending = 'y' + ending.slice(1);
    // -uir keeps its diphthong (construiste); leer, creer, caer write í (leíste).
    else if (ending.startsWith('i') && !stem.endsWith('u')) ending = 'í' + ending.slice(1);
  }
  return monosyllable(spell(stem, ending, g) + ending);
}

function subjuntivo(v: VerbData, base: string, person: Person, all: Conjugator): string {
  const g = groupOf(base);
  // The stem is the present yo form's (tenga, conozca, siga, quiera).
  const yo = all('presente', 'yo');
  if (!yo.endsWith('o')) return '';
  let stem = yo.slice(0, -1);
  const ending = (g === 'ar' ? ['e', 'es', 'e', 'emos', 'éis', 'en'] : ['a', 'as', 'a', 'amos', 'áis', 'an'])[pi(person)];
  if (!BOOT.includes(person)) {
    // Outside the boot the stem change goes back (queramos, podamos, juguemos), except that -ir
    // changers keep a raised vowel (sintamos, durmamos, pidamos).
    if (v.stem === 'ie') stem = replaceLast(stem, 'ie', g === 'ir' ? 'i' : 'e');
    else if (v.stem === 'ue') stem = replaceLast(stem, 'ue', g === 'ir' ? 'u' : 'o');
    else if (v.stem === 'u-ue') stem = replaceLast(stem, 'ue', 'u');
    if (v.stress) stem = stem.replace(/[íú]/, (c) => (c === 'í' ? 'i' : 'u'));
  }
  // -ar: busque, llegue, empiece. -er/-ir stems from yo already have their spelling (tenga, siga).
  return (g === 'ar' ? spell(stem, ending, g) : stem) + ending;
}

function replaceLast(s: string, from: string, to: string): string {
  const at = s.lastIndexOf(from);
  return at < 0 ? s : s.slice(0, at) + to + s.slice(at + from.length);
}

type Conjugator = (tense: Tense, person: Person) => string;

/**
 * One form of a verb. Reflexive infinitives (levantarse) come with their pronoun (me levanto).
 * Imperativo: tú affirmative, usted (el), nosotros, vosotros, ustedes (ellos); none for yo.
 */
export function conjugate(v: VerbData, tense: Tense, person: Person): string {
  const { base, reflexive } = splitReflexive(v.inf);
  const all: Conjugator = (t, p) => conjugate({ ...v, inf: base }, t, p);
  const listed = overrideCell(v.irregular?.[tense], person);
  let form: string;
  if (listed !== undefined) form = listed;
  else {
    const g = groupOf(base);
    switch (tense) {
      case 'presente':
        form = presente(v, base, person);
        break;
      case 'preterito':
        form = preterito(v, base, person);
        break;
      case 'imperfecto':
        form = base.slice(0, -2) + ENDINGS[g].imperfecto[pi(person)];
        break;
      case 'futuro':
        form = monosyllable((overrideStem(v.irregular?.futuro) ?? base.replace(/ír$/, 'ir')) + FUTURE[pi(person)]);
        break;
      case 'condicional':
        form = (overrideStem(v.irregular?.futuro) ?? overrideStem(v.irregular?.condicional) ?? base.replace(/ír$/, 'ir')) + CONDITIONAL[pi(person)];
        break;
      case 'subjuntivo':
        form = monosyllable(subjuntivo(v, base, person, all));
        break;
      case 'imperativo':
        if (person === 'yo') form = '';
        else if (person === 'tu') form = typeof v.irregular?.imperativo === 'string' ? v.irregular.imperativo : all('presente', 'el');
        else if (person === 'vosotros') form = base.replace(/r$/, 'd');
        else form = conjugate({ ...v, inf: base }, 'subjuntivo', person);
        break;
    }
  }
  if (!reflexive || !form) return form;
  // Affirmative commands take the pronoun after (levántate); v1 teaches none with a reflexive.
  if (tense === 'imperativo') return form;
  return `${REFLEXIVE[person]} ${form}`;
}

/** All six persons of one tense (imperativo: yo is ''). */
export const conjugateAll = (v: VerbData, tense: Tense): string[] => PERSONS.map((p) => conjugate(v, tense, p));

/** The gerund (hablando, comiendo, leyendo, pidiendo, durmiendo). */
export function gerundio(v: VerbData): string {
  const listed = v.irregular?.gerundio;
  if (typeof listed === 'string') return listed;
  const { base } = splitReflexive(v.inf);
  const g = groupOf(base);
  let stem = base.slice(0, -2);
  if (g === 'ar') return stem + 'ando';
  if (g === 'ir' && v.stem) stem = changeStem(stem, v.stem === 'ue' ? 'o-u' : 'e-i');
  return isVowel(stem[stem.length - 1]) && !/[gq]u$/.test(stem) ? stem + 'yendo' : stem + 'iendo';
}

/** The past participle (hablado, comido, leído; listed irregulars: hecho, dicho, visto …). */
export function participio(v: VerbData): string {
  const listed = v.irregular?.participio;
  if (typeof listed === 'string') return listed;
  const { base } = splitReflexive(v.inf);
  const stem = base.slice(0, -2);
  if (groupOf(base) === 'ar') return stem + 'ado';
  return isVowel(stem[stem.length - 1]) && !/[gq]u$/.test(stem) ? stem + 'ído' : stem + 'ido';
}

/** Splits a regular form into stem and ending for display (ConjugationGrid: stem in ink, ending in
 *  the accent). The ending is what follows the infinitive's stem, when the form starts with it. */
export function stemEnding(v: VerbData, form: string): { stem: string; ending: string } {
  const plain = form.replace(/^(me|te|se|nos|os) /, '');
  const pre = form.slice(0, form.length - plain.length);
  const stem = splitReflexive(v.inf).base.slice(0, -2);
  // The longest common prefix, ignoring accents, marks where the ending starts.
  const fold = (s: string) => s.replace(/[áéíóú]/g, (c) => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' })[c]!);
  let n = 0;
  while (n < stem.length && n < plain.length && fold(stem[n]) === fold(plain[n])) n++;
  if (n === 0) return { stem: pre + plain, ending: '' };
  return { stem: pre + plain.slice(0, n), ending: plain.slice(n) };
}
