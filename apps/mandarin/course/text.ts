// Mandarin text rules for CourseConfig.text: grading and search (CLAUDE.md §7.3).
import type { TextRules, Token } from '@ladder/core/course/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { hasHan, normZh } from '@/lib/zh/text';

const PUNCT_END = /[，。！？、：；,.!?;:]+$/u;

/**
 * Compares two answers. Chinese: normZh equality (full-width punctuation unified, spaces and markup
 * removed). Latin (Indonesian, English, pinyin options): case-insensitive, trimmed.
 */
export function compare(a: string, b: string): boolean {
  const x = stripMarkup(a);
  const y = stripMarkup(b);
  if (hasHan(x) || hasHan(y)) return normZh(x) === normZh(y);
  return x.trim().toLowerCase().normalize('NFC') === y.trim().toLowerCase().normalize('NFC');
}

/** Order tokens: normZh, then trailing punctuation dropped; then exact (no case rule). */
const sameToken = (a: string, b: string) => normZh(a).replace(PUNCT_END, '') === normZh(b).replace(PUNCT_END, '');

/** Whitespace word tokeniser with offsets, for Latin lines (Chinese lines highlight by character). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  for (const m of s.matchAll(/\S+/g)) out.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  return out;
}

export const text: TextRules = {
  normalise: (s) => normZh(s),
  tokenEquals: (a, b) => sameToken(a, b),
  trimPunct: PUNCT_END,
  tokenise,
  equals: (given, expected, item) => (item.type === 'order' ? sameToken(given, expected) : compare(given, expected)),
};
