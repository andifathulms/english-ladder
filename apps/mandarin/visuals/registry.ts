import type { ComponentType } from 'react';
import type { VisualId } from '@/visuals/visualIds';
import { StrokeOrder } from '@/visuals/StrokeOrder';
import { ToneContour } from '@/visuals/ToneContour';
import { SyllableBuilder } from '@/visuals/SyllableBuilder';
import { MouthPlaces } from '@/visuals/MouthPlaces';
import { SandhiStrip } from '@/visuals/SandhiStrip';
import { CharacterParts } from '@/visuals/CharacterParts';
import { PlaceSceneZh } from '@/visuals/PlaceSceneZh';
import { MeasureWords } from '@/visuals/MeasureWords';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
// Each visual takes VisualProps plus its own props from frontmatter.
export const registry = {
  'tone-contour': ToneContour,
  'syllable-builder': SyllableBuilder,
  'mouth-places': MouthPlaces,
  'sandhi-strip': SandhiStrip,
  'stroke-order': StrokeOrder,
  'character-parts': CharacterParts,
  'place-scene-zh': PlaceSceneZh,
  'measure-words': MeasureWords,
} satisfies Record<VisualId, ComponentType<never>>;
