import type { ComponentType } from 'react';
import type { VisualId } from '@ladder/core/lib/visualIds';
import { PlaceScene } from './PlaceScene';
import { NounBuilder } from './NounBuilder';
import { NearFar } from './NearFar';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
// Each visual takes VisualProps plus its own props from frontmatter.
export const registry = {
  'place-scene': PlaceScene,
  'noun-builder': NounBuilder,
  'near-far': NearFar,
} satisfies Record<VisualId, ComponentType<never>>;
