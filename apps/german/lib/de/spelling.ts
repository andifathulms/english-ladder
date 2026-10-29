// Typed-answer spelling (CLAUDE.md §5.1, §5.2): exact, or lenient with a note. Pure.
import { baseDe } from './text';

export type SpellingMode = 'strict' | 'lenient';
export type SpellingNote = 'digraph' | 'umlaut' | 'caps' | 'start';
export type SpellingResult = { correct: boolean; notes: SpellingNote[] };

/** ä ö ü → ae oe ue and ß → ss (both sides), so a typed digraph matches. */
const digraphs = (s: string) => s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue').replace(/ß/g, 'ss');
/** ä ö ü → a o u (both sides), so a missed umlaut matches. */
const plainVowels = (s: string) => s.replace(/[äÄöÖüÜ]/g, (c) => ({ ä: 'a', Ä: 'A', ö: 'o', Ö: 'O', ü: 'u', Ü: 'U' })[c]!);

/**
 * Compares a typed answer with one expected spelling.
 * - The first letter of the answer may differ in case (a sentence start).
 * - Elsewhere case matters: a noun typed in lower case is wrong (`caps` note, for the answer area's
 *   hint), unless `nounCaps` is off.
 * - Lenient: ae/oe/ue/ss for ä/ö/ü/ß pass with `digraph`; with `umlautLenient` a plain vowel for an
 *   umlaut passes with `umlaut` (before Easy 3, never for sound items).
 */
export function normDe(given: string, expected: string, { spelling = 'strict', nounCaps = true, umlautLenient = false }: { spelling?: SpellingMode; nounCaps?: boolean; umlautLenient?: boolean } = {}): SpellingResult {
  const g = baseDe(given);
  const e = baseDe(expected);
  const startFix = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const variants: [string, string, SpellingNote | null][] = [[g, e, null]];
  if (spelling === 'lenient') {
    variants.push([digraphs(g), digraphs(e), 'digraph']);
    if (umlautLenient) variants.push([plainVowels(g).replace(/ß/g, 'ss'), plainVowels(e).replace(/ß/g, 'ss'), 'umlaut']);
  }
  for (const [a, b, note] of variants) {
    if (a === b) return { correct: true, notes: note ? [note] : [] };
    if (startFix(a) === startFix(b)) return { correct: true, notes: note ? [note] : [] };
  }
  // Only the case differs: a noun's capital missing (wrong), or capitals don't matter here.
  for (const [a, b, note] of variants) {
    if (a.toLowerCase() === b.toLowerCase()) return nounCaps ? { correct: false, notes: ['caps'] } : { correct: true, notes: note ? [note] : [] };
  }
  return { correct: false, notes: [] };
}

/** The words of `expected` that the given answer wrote without their capital (for the hint). */
export function capsCheck(given: string, expected: string): string[] {
  const g = baseDe(given).split(/\s+/);
  const e = baseDe(expected).split(/\s+/);
  return e.filter((w, i) => i > 0 && /^[A-ZÄÖÜ]/.test(w) && g[i] !== undefined && g[i] === w.toLowerCase());
}
