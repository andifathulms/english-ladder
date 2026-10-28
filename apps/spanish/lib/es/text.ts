// Spanish text normalisation for grading, search and lint (CLAUDE.md §5.1). Pure.

export type AccentMode = 'strict' | 'lenient';

const FOLD: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };

/** á é í ó ú → a e i o u. ñ and ü stay distinct: they are different letters, not accents. */
export const foldAccents = (s: string) => s.normalize('NFC').replace(/[áéíóú]/g, (c) => FOLD[c]).replace(/[ÁÉÍÓÚ]/g, (c) => FOLD[c.toLowerCase()].toUpperCase());

/** Trailing punctuation dropped before comparing. */
export const PUNCT_END = /[.,;:!?…»"')\]]+$/u;

/**
 * Canonical form for equality: NFC, lowercase, opening ¿ ¡ and trailing punctuation removed, spaces
 * collapsed. With `accents: 'lenient'`, acute accents are folded as well.
 */
export function normEs(s: string, { accents = 'strict' }: { accents?: AccentMode } = {}): string {
  let out = s.normalize('NFC').toLowerCase().replace(/[¿¡«"]/g, '').replace(/\s+/g, ' ').trim().replace(PUNCT_END, '').trim();
  if (accents === 'lenient') out = foldAccents(out);
  return out;
}

/** True when `given` differs from `expected` only in accent marks (á é í ó ú), after normEs. */
export function accentDiff(given: string, expected: string): boolean {
  const g = normEs(given);
  const e = normEs(expected);
  return g !== e && foldAccents(g) === foldAccents(e);
}

/** Spanish letters, including accented vowels, ñ and ü (for word tokenising). */
export const WORD = /[a-záéíóúüñ]+/giu;
