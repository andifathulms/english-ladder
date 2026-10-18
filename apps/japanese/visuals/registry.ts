import type { ComponentType } from 'react';

/** Visual id → component. Lesson frontmatter refers to visuals by id only (filled in M6, M8, M9). */
export const registry: Record<string, ComponentType<never>> = {};
