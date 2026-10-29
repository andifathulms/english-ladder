// German determiners, personal pronouns and adjective endings (CLAUDE.md §5.1). Pure tables: every
// form the course shows comes from here, never from a component.

export type Gender = 'm' | 'f' | 'n';
export type Num = 'sg' | 'pl';
export type Kase = 'nom' | 'akk' | 'dat' | 'gen';
export const KASES: Kase[] = ['nom', 'akk', 'dat', 'gen'];

/** der-words' and ein-words' slots: masculine, feminine, neuter singular, then plural. */
type Slot = 'm' | 'f' | 'n' | 'pl';
const slotOf = (gender: Gender, number: Num): Slot => (number === 'pl' ? 'pl' : gender);

const DEFINITE: Record<Kase, Record<Slot, string>> = {
  nom: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  akk: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  dat: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
  gen: { m: 'des', f: 'der', n: 'des', pl: 'der' },
};

/** Endings of ein, kein and the possessives (ein has no plural). */
const EIN_ENDING: Record<Kase, Record<Slot, string>> = {
  nom: { m: '', f: 'e', n: '', pl: 'e' },
  akk: { m: 'en', f: 'e', n: '', pl: 'e' },
  dat: { m: 'em', f: 'er', n: 'em', pl: 'en' },
  gen: { m: 'es', f: 'er', n: 'es', pl: 'er' },
};

/** The possessive stems: mein, dein, sein (his/its), ihr (her/their), unser, euer, Ihr (your, formal). */
export const POSSESSIVES = ['mein', 'dein', 'sein', 'ihr', 'unser', 'euer', 'Ihr'] as const;
export type ArticleType = 'def' | 'indef' | 'kein' | (typeof POSSESSIVES)[number];

/**
 * The determiner for a noun: definite (der …), indefinite (ein …; null in the plural), kein, or a
 * possessive. euer drops its e before an ending (eure, euren).
 */
export function article(type: ArticleType, gender: Gender, number: Num, kase: Kase): string | null {
  const slot = slotOf(gender, number);
  if (type === 'def') return DEFINITE[kase][slot];
  if (type === 'indef' && number === 'pl') return null;
  const stem = type === 'indef' ? 'ein' : type;
  const ending = EIN_ENDING[kase][slot];
  if (stem === 'euer' && ending) return `eur${ending}`;
  return stem + ending;
}

export type PronounPerson = 'ich' | 'du' | 'er' | 'sie-sg' | 'es' | 'wir' | 'ihr' | 'sie-pl' | 'Sie';
export const PRONOUN_PERSONS: PronounPerson[] = ['ich', 'du', 'er', 'sie-sg', 'es', 'wir', 'ihr', 'sie-pl', 'Sie'];

const PRONOUNS: Record<Kase, Record<PronounPerson, string>> = {
  nom: { ich: 'ich', du: 'du', er: 'er', 'sie-sg': 'sie', es: 'es', wir: 'wir', ihr: 'ihr', 'sie-pl': 'sie', Sie: 'Sie' },
  akk: { ich: 'mich', du: 'dich', er: 'ihn', 'sie-sg': 'sie', es: 'es', wir: 'uns', ihr: 'euch', 'sie-pl': 'sie', Sie: 'Sie' },
  dat: { ich: 'mir', du: 'dir', er: 'ihm', 'sie-sg': 'ihr', es: 'ihm', wir: 'uns', ihr: 'euch', 'sie-pl': 'ihnen', Sie: 'Ihnen' },
  gen: { ich: 'meiner', du: 'deiner', er: 'seiner', 'sie-sg': 'ihrer', es: 'seiner', wir: 'unser', ihr: 'euer', 'sie-pl': 'ihrer', Sie: 'Ihrer' },
};

/** A personal pronoun in a case. */
export const pronoun = (person: PronounPerson, kase: Kase): string => PRONOUNS[kase][person];

export type Declension = 'weak' | 'mixed' | 'strong';

const ADJ: Record<Declension, Record<Kase, Record<Slot, string>>> = {
  // After der, die, das, dieser …
  weak: {
    nom: { m: 'e', f: 'e', n: 'e', pl: 'en' },
    akk: { m: 'en', f: 'e', n: 'e', pl: 'en' },
    dat: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    gen: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  },
  // After ein, kein, mein … (plural after keine, meine …)
  mixed: {
    nom: { m: 'er', f: 'e', n: 'es', pl: 'en' },
    akk: { m: 'en', f: 'e', n: 'es', pl: 'en' },
    dat: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    gen: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  },
  // No article.
  strong: {
    nom: { m: 'er', f: 'e', n: 'es', pl: 'e' },
    akk: { m: 'en', f: 'e', n: 'es', pl: 'e' },
    dat: { m: 'em', f: 'er', n: 'em', pl: 'en' },
    gen: { m: 'en', f: 'er', n: 'en', pl: 'er' },
  },
};

/** An attributive adjective's ending (Medium 1+; predicative adjectives take none). */
export const adjEnding = (declension: Declension, gender: Gender, number: Num, kase: Kase): string => ADJ[declension][kase][slotOf(gender, number)];

/** A determiner form's reading; plural readings carry no gender. */
export type Reading = { type: ArticleType; gender: Gender | null; number: Num; kase: Kase };

/** Every determiner form with its readings, for the agreement lint. */
export function determinerReadings(): Map<string, Reading[]> {
  const out = new Map<string, Reading[]>();
  const types: ArticleType[] = ['def', 'indef', 'kein', ...POSSESSIVES];
  for (const type of types)
    for (const kase of KASES)
      for (const number of ['sg', 'pl'] as Num[])
        for (const gender of ['m', 'f', 'n'] as Gender[]) {
          const a = article(type, gender, number, kase);
          if (!a) continue;
          const key = a.toLowerCase();
          const list = out.get(key) ?? [];
          const g = number === 'pl' ? null : gender;
          if (!list.some((x) => x.type === type && x.gender === g && x.number === number && x.kase === kase)) list.push({ type, gender: g, number, kase });
          out.set(key, list);
        }
  return out;
}
