import type { ComponentType } from 'react';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { KanaChart } from './KanaChart';
import { KanaOrigins } from './KanaOrigins';
import { MoraBeats } from './MoraBeats';
import { PitchLine } from './PitchLine';
import { ParticleTrain } from './ParticleTrain';
import { PlaceSceneJa } from './PlaceSceneJa';
import { Counters } from './Counters';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
export const registry: Record<string, ComponentType<never>> = {
  'stroke-order': StrokeOrder,
  'kana-chart': KanaChart,
  'kana-origins': KanaOrigins,
  'mora-beats': MoraBeats,
  'pitch-line': PitchLine,
  'particle-train': ParticleTrain,
  'place-scene-ja': PlaceSceneJa,
  counters: Counters,
};
