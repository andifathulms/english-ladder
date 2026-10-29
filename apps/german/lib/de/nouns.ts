// Gender clues and compounds (CLAUDE.md §5.1). Pure: genderClue reports the ending rule a noun matches
// (the noun's gender always comes from the data); compound joins authored parts.
import type { Gender } from './articles';

export type Clue = { suffix: string; gender: Gender; note?: 'people'; notAfter?: RegExp };

/** Ending rules, longest first (DESIGN §7.2). -er and -ling only for people (Lehrer, Lehrling). */
export const CLUES: Clue[] = [
  { suffix: 'schaft', gender: 'f' },
  { suffix: 'ismus', gender: 'm' },
  { suffix: 'chen', gender: 'n' },
  { suffix: 'heit', gender: 'f' },
  { suffix: 'keit', gender: 'f' },
  { suffix: 'lein', gender: 'n' },
  { suffix: 'ment', gender: 'n' },
  { suffix: 'ling', gender: 'm', note: 'people' },
  { suffix: 'ung', gender: 'f' },
  { suffix: 'ion', gender: 'f' },
  { suffix: 'tät', gender: 'f' },
  { suffix: 'ei', gender: 'f' },
  { suffix: 'ik', gender: 'f' },
  // Latin -um (Zentrum, Studium), not -aum (der Baum, der Raum)
  { suffix: 'um', gender: 'n', notAfter: /a$/ },
  { suffix: 'er', gender: 'm', note: 'people' },
];

/** The ending rule a noun matches, if any. `person` says whether the noun names a person (for -er, -ling). */
export function genderClue(noun: string, { person = false }: { person?: boolean } = {}): Clue | null {
  const n = noun.normalize('NFC');
  for (const c of CLUES) {
    if (!n.endsWith(c.suffix) || n.length <= c.suffix.length + 1) continue;
    if (c.note === 'people' && !person) continue;
    if (c.notAfter?.test(n.slice(0, -c.suffix.length))) continue;
    return c;
  }
  return null;
}

/**
 * A compound from its parts, with an optional linking element after each part but the last
 * (Arbeit + s + Platz → Arbeitsplatz). The compound takes the last part's gender.
 */
export function compound(parts: string[], links: (string | null)[] = [], lastGender?: Gender): { word: string; gender?: Gender } {
  const word = parts
    .map((p, i) => (i === 0 ? p : p.charAt(0).toLowerCase() + p.slice(1)) + (i < parts.length - 1 ? (links[i] ?? '') : ''))
    .join('');
  return { word, ...(lastGender ? { gender: lastGender } : {}) };
}

/** Plural patterns as nouns.yaml writes them (¨ = umlaut on the last a, o, u or au). */
export const PLURAL_PATTERNS = ['-', '¨', '-e', '¨e', '-er', '¨er', '-n', '-en', '-nen', '-s', '-se', 'other'] as const;
export type PluralPattern = (typeof PLURAL_PATTERNS)[number];

const UMLAUT: Record<string, string> = { au: 'äu', a: 'ä', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü', Au: 'Äu' };

/** The noun with its last a, o, u or au umlauted (Mutter → Mütter, Haus → Häus-, Bahnhof → Bahnhöf-). */
function umlaut(word: string): string {
  const m = /(Au|au|[aouAOU])(?!.*(?:au|[aou]))/.exec(word);
  if (!m) return word;
  return word.slice(0, m.index) + UMLAUT[m[1]] + word.slice(m.index + m[1].length);
}

/**
 * The plural a pattern gives, for checking authored plurals (nouns.yaml states every plural; this
 * never replaces it). null for 'other' (Museum → Museen).
 */
export function pluralOf(singular: string, pattern: PluralPattern): string | null {
  if (pattern === 'other') return null;
  const base = pattern.startsWith('¨') ? umlaut(singular) : singular;
  return base + pattern.replace(/^[-¨]/, '');
}
