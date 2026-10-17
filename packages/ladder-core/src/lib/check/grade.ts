import { isCoreItem, type CheckItem, type ExtraItem } from '../types';
import { extraType } from './itemTypes';
import type { TextRules } from '@ladder/core/course/types';
import { stripMarkup } from '../markup';

export type Response = string | string[];

/** Order answers compared per the course's text rules (English: first word case-sensitive,
 *  the rest case-insensitive, trailing punctuation ignored). */
export function sameOrder(given: string[], expected: string[], text: TextRules, item?: CheckItem): boolean {
  const norm = (a: string[]) => a.map((w) => w.trim().replace(text.trimPunct, '')).filter(Boolean);
  const g = norm(given);
  const e = norm(expected);
  if (g.length !== e.length) return false;
  return g.every((w, i) => (text.equals && item ? text.equals(w, e[i], item) : text.tokenEquals(w, e[i], i)));
}

export function grade(item: CheckItem, response: Response, text: TextRules): { correct: boolean } {
  if (!isCoreItem(item)) return { correct: extraType(item).grade(item as ExtraItem, response, text) };
  if (item.type === 'order') {
    if (!Array.isArray(response)) return { correct: false };
    return { correct: [item.answer, ...(item.accept ?? [])].some((a) => sameOrder(response, a, text, item)) };
  }
  if (typeof response !== 'string') return { correct: false };
  if (text.equals) return { correct: text.equals(response, item.answer, item) };
  return { correct: text.normalise(stripMarkup(response)) === text.normalise(stripMarkup(item.answer)) };
}
