// German text normalisation for grading, search and lint (CLAUDE.md §5.1). Pure. The lenient
// spelling rules (ae → ä, a plain vowel for an umlaut) and the noun-capital check live in normDe
// (lib/de/spelling.ts, M5); this is the shared base.

/** Trailing punctuation dropped before comparing. */
export const PUNCT_END = /[.,;:!?…»«"“”„')\]]+$/u;

/** Canonical form for equality: NFC, quotes and trailing punctuation removed, spaces collapsed. Case kept. */
export function baseDe(s: string): string {
  return s.normalize('NFC').replace(/[„“”"«»‚‘’]/g, '').replace(/\s+/g, ' ').trim().replace(PUNCT_END, '').trim();
}

/** ä ö ü → a o u and ß → ss (for search that ignores umlauts). */
export const foldUmlauts = (s: string) =>
  s.normalize('NFC').replace(/[äöüÄÖÜß]/g, (c) => ({ ä: 'a', ö: 'o', ü: 'u', Ä: 'A', Ö: 'O', Ü: 'U', ß: 'ss' })[c]!);

/** German letters, including umlauts and ß (for word tokenising). */
export const WORD = /[A-Za-zÄÖÜäöüß]+/gu;
