'use client';

import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import type { Letter, MakhrajPoint } from '@/course/types';

/** Letter and makhraj data for the Huruf visuals, read at build time (course/content.ts visualData). */
export type ArabicVisualData = { letters: Letter[]; makhraj: MakhrajPoint[] };

const EMPTY: ArabicVisualData = { letters: [], makhraj: [] };

export function useArabicData(): ArabicVisualData {
  return useVisualData<ArabicVisualData>() ?? EMPTY;
}
