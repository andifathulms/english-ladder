// Japanese text rules for CourseConfig.text: grading and search (CLAUDE.md §7.3).
import type { TextRules, Token } from '@ladder/core/course/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { hasJapanese, normJa } from '@/lib/ja/text';

const PUNCT_END = /[、。！？，．,.!?;:]+$/u;

/** Japanese: normJa equality. Latin (Indonesian, English): case-insensitive, trimmed. */
export function compare(a: string, b: string): boolean {
  const x = stripMarkup(a);
  const y = stripMarkup(b);
  if (hasJapanese(x) || hasJapanese(y)) return normJa(x) === normJa(y);
  return x.trim().toLowerCase().normalize('NFC') === y.trim().toLowerCase().normalize('NFC');
}

/** Order tokens: normJa, then trailing punctuation dropped; then exact. */
const sameToken = (a: string, b: string) => normJa(a).replace(PUNCT_END, '') === normJa(b).replace(PUNCT_END, '');

/** Whitespace word tokeniser with offsets (Japanese words are separated by spaces in the markup). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  for (const m of s.matchAll(/\S+/g)) out.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  return out;
}

export const text: TextRules = {
  normalise: (s) => normJa(s),
  tokenEquals: (a, b) => sameToken(a, b),
  trimPunct: PUNCT_END,
  tokenise,
  equals: (given, expected, item) => (item.type === 'order' ? sameToken(given, expected) : compare(given, expected)),
};
