import type { ComponentType } from 'react';
import type { VisualId } from './visualIds';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. The seven visuals
 *  arrive in M6; until then no lesson names one. */
export const registry: Partial<Record<VisualId, ComponentType<never>>> = {};
