import type { Lesson, Rung } from '../types';

export type Finding = { level: 'error' | 'warn'; message: string };

/** Inventory, lexicon and structure lint. Filled in with the Easy 1 content (M7). */
export function lintLessons(_rungs: Rung[], _byRung: Map<string, Lesson[]>): Finding[] {
  return [];
}
