'use client';

import { useVisualData as useCoreVisualData } from '@ladder/core/components/visuals/VisualData';
import type { KanaData } from '@/lib/ja/kanaTable';

/** Data for Japanese's visuals, read at build time (course/content.ts visualData). */
export type VisualDataValue = {
  /** The kana grid, on pages with KanaChart or KanaOrigins. */
  kana?: KanaData;
};

export function useVisualData(): VisualDataValue {
  return useCoreVisualData<VisualDataValue>() ?? {};
}
