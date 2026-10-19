import type { ComponentType } from 'react';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { KanaChart } from './KanaChart';
import { KanaOrigins } from './KanaOrigins';
import { MoraBeats } from './MoraBeats';
import { PitchLine } from './PitchLine';

/** Visual id → component. Lesson frontmatter refers to visuals by id only (Easy 1's three arrive in M9). */
export const registry: Record<string, ComponentType<never>> = {
  'stroke-order': StrokeOrder,
  'kana-chart': KanaChart,
  'kana-origins': KanaOrigins,
  'mora-beats': MoraBeats,
  'pitch-line': PitchLine,
};
