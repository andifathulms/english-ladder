// German conjugation (CLAUDE.md §5.1): present (with stem-vowel changes and e-insertion), imperative,
// Perfekt (auxiliary + Partizip II), Präteritum and Konjunktiv II, with the irregular cells listed per
// verb in content/data/verbs.yaml. Separable verbs keep their prefix apart. Pure.

export const PERSONS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'] as const;
export const TENSES = ['praesens', 'perfekt', 'praeteritum', 'imperativ', 'konj2'] as const;
export type Person = (typeof PERSONS)[number];
export type Tense = (typeof TENSES)[number];

/** Six forms in PERSONS order, or a map of some persons. */
export type Cells = string[] | Partial<Record<Person, string>>;

/** One verb as content/data/verbs.yaml lists it. */
export type VerbData = {
  inf: string;
  id: string;
  en?: string;
  /** Separable prefix (aufstehen → auf). */
  sep?: string;
  /** Perfekt auxiliary and Partizip II (with the prefix: aufgestanden). */
  aux: 'haben' | 'sein';
  partizip: string;
  /** Present-tense stem-vowel change for du and er/sie/es: a→ä (fahren), e→i (sprechen), e→ie (sehen), au→äu (laufen), o→ö (stoßen). */
  vowel?: 'a-ä' | 'e-i' | 'e-ie' | 'au-äu' | 'o-ö';
  /** Präteritum: a strong stem (fuhr) or a mixed one that takes the weak endings (hatt-, konnt-, brach-te → "brachte"). */
  praet?: { stem: string; weak?: boolean };
  /** Cells the rules don't produce (sein, haben, werden, wissen, modals). */
  irregular?: Partial<Record<Tense, Cells>>;
  /** Reference forms (PERSONS order) the library is tested against. */
  check?: Partial<Record<Tense, string[]>>;
};

const pi = (p: Person) => PERSONS.indexOf(p);
const cell = (c: Cells | undefined, p: Person) => (c === undefined ? undefined : Array.isArray(c) ? c[pi(p)] : c[p]);

/** The verb without its separable prefix. */
export function separate(v: Pick<VerbData, 'inf' | 'sep'>): { prefix: string | null; base: string } {
  if (v.sep && v.inf.startsWith(v.sep)) return { prefix: v.sep, base: v.inf.slice(v.sep.length) };
  return { prefix: null, base: v.inf };
}

/** The present stem: wohnen → wohn, wandern → wander, sammeln → sammel (ich sammle, du sammelst). */
function stemOf(base: string): string {
  if (/[ae]rn$/.test(base) || /eln$/.test(base)) return base.slice(0, -1);
  return base.replace(/e?n$/, '');
}

/**
 * An extra e before -st/-t: stems in -t/-d (arbeitest), or m/n after a consonant other than l, r, m,
 * n (atmest, öffnest, zeichnest; but lernst, kommst, and wohnst, where h only lengthens the vowel).
 */
function needsE(stem: string): boolean {
  if (/[td]$/.test(stem)) return true;
  const m = /([^aeiouäöü])([mn])$/.exec(stem);
  if (!m || /[lrmn]/.test(m[1])) return false;
  if (m[1] === 'h' && /[aeiouäöü]h[mn]$/.test(stem)) return false;
  return true;
}
/** du takes -t instead of -st after s, ß, x, z (heißt, tanzt). */
const sibilant = (stem: string) => /(s|ß|x|z)$/.test(stem);

function changeVowel(stem: string, change: NonNullable<VerbData['vowel']>): string {
  const [from, to] = change.split('-');
  const at = stem.lastIndexOf(from);
  if (at < 0) return stem;
  // e→ie in "sehen" (seh → sieh), e→i in "sprechen" (sprech → sprich)
  return stem.slice(0, at) + to + stem.slice(at + from.length);
}

/** The finite present form (without a separable prefix). */
function praesens(v: VerbData, base: string, p: Person): string {
  let stem = stemOf(base);
  const changed = v.vowel && (p === 'du' || p === 'er');
  if (changed) stem = changeVowel(stem, v.vowel!);
  const e = needsE(stem) && !changed ? 'e' : '';
  switch (p) {
    case 'ich':
      // -eln verbs drop the e before l: sammeln → ich sammle.
      return /eln$/.test(base) ? stem.replace(/el$/, 'le') : `${stem}e`;
    case 'du':
      if (changed && /t$/.test(stem)) return `${stem}st`; // hältst, rätst
      return sibilant(stem) ? `${stem}${e}t` : `${stem}${e}st`;
    case 'er':
      if (changed && /t$/.test(stem)) return stem; // hält, rät
      return `${stem}${e}t`;
    case 'wir':
    case 'sie':
      return /[ae]rn$|eln$/.test(base) ? `${stem}n` : `${stem}en`;
    case 'ihr':
      return `${stem}${needsE(stem) ? 'e' : ''}t`;
  }
}

/** The finite Präteritum form. */
function praeteritum(v: VerbData, base: string, p: Person): string {
  if (v.praet && !v.praet.weak) {
    const s = v.praet.stem;
    const strong = { ich: '', du: 'st', er: '', wir: 'en', ihr: 't', sie: 'en' }[p];
    // du fandest? Modern: fandst. After s/ß: du lasest → last; keep the plain endings.
    return s + strong;
  }
  const stem = v.praet?.weak ? v.praet.stem : stemOf(base) + (needsE(stemOf(base)) ? 'e' : '');
  const weak = { ich: 'te', du: 'test', er: 'te', wir: 'ten', ihr: 'tet', sie: 'ten' }[p];
  return v.praet?.weak ? stem + weak.slice(1) : stem + weak;
}

const AUX: Record<'haben' | 'sein', string[]> = {
  haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
  sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
};
const WUERDE = ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'];

export type Parts = { finite: string; rest: string | null };

/**
 * A form split as the sentence uses it: the finite verb (position 2) and what goes to the end (the
 * separable prefix, the participle or the infinitive). Imperativ: du, ihr, sie (= Sie); none for ich,
 * er, wir.
 */
export function conjugateParts(v: VerbData, tense: Tense, p: Person): Parts | null {
  const { prefix, base } = separate(v);
  const listed = cell(v.irregular?.[tense], p);
  if (tense === 'perfekt') return { finite: listed ?? AUX[v.aux][pi(p)], rest: v.partizip };
  if (tense === 'konj2' && !listed) return { finite: WUERDE[pi(p)], rest: v.inf };
  if (tense === 'imperativ') {
    if (p !== 'du' && p !== 'ihr' && p !== 'sie') return null;
    if (listed) return { finite: listed, rest: prefix };
    if (p === 'sie') return { finite: `${base} Sie`, rest: prefix };
    if (p === 'ihr') return { finite: praesens(v, base, 'ihr'), rest: prefix };
    // du: the stem (+e after t/d); e→i(e) verbs keep the change (nimm, lies), a→ä verbs don't (fahr).
    let stem = stemOf(base);
    if (v.vowel === 'e-i' || v.vowel === 'e-ie') stem = changeVowel(stem, v.vowel);
    return { finite: needsE(stem) ? `${stem}e` : stem, rest: prefix };
  }
  if (listed !== undefined) return { finite: listed, rest: tense === 'konj2' ? null : prefix };
  const finite = tense === 'praesens' ? praesens(v, base, p) : tense === 'praeteritum' ? praeteritum(v, base, p) : WUERDE[pi(p)];
  return { finite, rest: prefix };
}

/** A form as one string, the end part after the finite verb: "stehe auf", "habe gearbeitet", "würde gehen". */
export function conjugate(v: VerbData, tense: Tense, p: Person): string {
  const parts = conjugateParts(v, tense, p);
  if (!parts) return '';
  return parts.rest ? `${parts.finite} ${parts.rest}` : parts.finite;
}

export const conjugateAll = (v: VerbData, tense: Tense): string[] => PERSONS.map((p) => conjugate(v, tense, p));

const INSEPARABLE = /^(be|ge|er|ver|zer|ent|emp|miss)/;

/**
 * The regular Partizip II (for testing the listed ones and for verbs not yet listed): ge- + stem + -t
 * (-et after t/d); no ge- for -ieren verbs and inseparable prefixes; a separable prefix goes first
 * (aufgemacht). Strong participles (gefahren) are always listed.
 */
export function regularPartizip(v: Pick<VerbData, 'inf' | 'sep'>): string {
  const { prefix, base } = separate(v);
  const stem = stemOf(base);
  const t = needsE(stem) ? 'et' : 't';
  const ge = /ieren$/.test(base) || INSEPARABLE.test(base) ? '' : 'ge';
  return `${prefix ?? ''}${ge}${stem}${t}`;
}
