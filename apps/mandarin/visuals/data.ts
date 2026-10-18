'use client';

import { useVisualData as useCoreVisualData } from '@ladder/core/components/visuals/VisualData';
import type { HanziCard, MeasureWord, Radical } from '@/course/types';
import type { StrokeName } from '@/lib/zh/trace';

/** One syllable of the pinyin table with the tones that exist (and so may be recorded). */
export type SyllableRow = { b: string; i: string; f: string; t: number[] };

/** Data for Mandarin's visuals, read at build time (course/content.ts visualData). */
export type VisualDataValue = {
  syllables: SyllableRow[];
  measureWords: MeasureWord[];
  radicals: Radical[];
  /** Parts and notes for characters the page's visuals show. */
  hanzi: Record<string, HanziCard>;
  /** Authored stroke names (content/data/stroke-names.yaml), which win over the heuristic. */
  strokeNames: Record<string, StrokeName[]>;
  /** A real word per syllable and tone ("ma3" → 马), for SyllableBuilder. */
  examples: Record<string, { zh: string; py: string }>;
  /** Other characters that share a component (女 → 妈 好 姐 她), for CharacterParts. */
  family: Record<string, string[]>;
};

const EMPTY: VisualDataValue = { syllables: [], measureWords: [], radicals: [], hanzi: {}, strokeNames: {}, examples: {}, family: {} };

export function useVisualData(): VisualDataValue {
  return useCoreVisualData<VisualDataValue>() ?? EMPTY;
}
