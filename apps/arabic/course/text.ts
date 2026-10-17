// Arabic text rules for CourseConfig.text: grading, search and audio keys (CLAUDE.md §7.3).
import type { TextRules } from '@ladder/core/course/types';
import type { CheckItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { hasArabic, looseKey, normalise, tokenise } from '@/lib/arabic/text';
import { translitKey } from '@/lib/arabic/translit';

export type Match = 'exact' | 'loose';

/**
 * Compares two answers. Arabic: exact → normalised text with harakat; loose → no harakat, unified
 * alef/hamza seats. Latin (transliteration or Indonesian): case-insensitive, ʿ ʾ and apostrophes equal.
 */
export function compare(a: string, b: string, match: Match = 'loose'): boolean {
  const x = stripMarkup(a);
  const y = stripMarkup(b);
  if (!hasArabic(x) && !hasArabic(y)) return translitKey(x) === translitKey(y);
  return match === 'exact' ? normalise(x) === normalise(y) : looseKey(x) === looseKey(y);
}

/**
 * The match mode for an item. Loose is the default, but an item whose options differ only in
 * harakat or hamza seats is always graded exactly, so a wrong option can never pass as right.
 */
export function matchOf(item: CheckItem): Match {
  const declared = item.match ?? 'loose';
  if (declared === 'exact') return 'exact';
  const opts: string[] = 'options' in item ? (item.options as string[]) : [];
  const keys = opts.filter(hasArabic).map(looseKey);
  return new Set(keys).size < keys.length ? 'exact' : 'loose';
}

export const text: TextRules = {
  normalise,
  // Order items: token by token, no case rule; the item's match mode comes through `equals`.
  tokenEquals: (a, b) => compare(a, b),
  trimPunct: /[.,!?;:،؛؟]+$/u,
  tokenise,
  equals: (given, expected, item) => compare(given, expected, matchOf(item)),
};
