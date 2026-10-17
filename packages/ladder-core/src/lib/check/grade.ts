import type { CheckItem } from '../types';
import { stripMarkup } from '../markup';

export type Response = string | string[];

const trimPunct = (s: string) => s.replace(/[.,!?;:]+$/u, '');

/** Order answers: first word case-sensitive, the rest case-insensitive, trailing punctuation ignored. */
export function sameOrder(given: string[], expected: string[]): boolean {
  const norm = (a: string[]) => a.map((w) => trimPunct(w.trim())).filter(Boolean);
  const g = norm(given);
  const e = norm(expected);
  if (g.length !== e.length) return false;
  return g.every((w, i) => (i === 0 ? w === e[i] : w.toLowerCase() === e[i].toLowerCase()));
}

export function grade(item: CheckItem, response: Response): { correct: boolean } {
  if (item.type === 'order') {
    if (!Array.isArray(response)) return { correct: false };
    return { correct: [item.answer, ...(item.accept ?? [])].some((a) => sameOrder(response, a)) };
  }
  if (typeof response !== 'string') return { correct: false };
  return { correct: stripMarkup(response) === stripMarkup(item.answer) };
}
