// The `trace` check item's grading, for a course's itemTypes (rendering: components/strokes/TraceCheck).
// A trace response carries the misses ("misses:1"); up to TRACE_CONFIG.passMisses in total is correct.
import type { ItemTypeLogic, Response } from '../check/itemTypes';
import type { ExtraItem } from '../types';
import { TRACE_CONFIG } from './trace';

export const traceMisses = (r: Response): number => {
  const m = /^misses:(\d+)$/.exec(Array.isArray(r) ? r.join('') : r);
  return m ? Number(m[1]) : Infinity;
};

/** Trace item logic; `text` is how the item reads in lists (the course's wording). */
export function traceItemType(text: (item: ExtraItem & { char: string }) => string, passMisses = TRACE_CONFIG.passMisses): ItemTypeLogic {
  return {
    grade: (_i, r) => traceMisses(r) <= passMisses,
    itemText: (i) => text(i as ExtraItem & { char: string }),
    answerText: (i) => (i as ExtraItem & { char: string }).char,
    sentences: () => [],
  };
}
