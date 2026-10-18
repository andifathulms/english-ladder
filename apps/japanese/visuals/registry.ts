import type { ComponentType } from 'react';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';

/** Visual id → component. Lesson frontmatter refers to visuals by id only (filled in M6, M8, M9). */
export const registry: Record<string, ComponentType<never>> = {
  'stroke-order': StrokeOrder,
};
