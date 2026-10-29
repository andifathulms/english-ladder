/** Visual ids lesson content may reference. Components live in visuals/registry.ts. */
export const VISUAL_IDS = ['mouth-places-de', 'gender-tiles', 'case-machine', 'verb-bracket', 'wechsel-scene', 'compound-builder', 'day-planner'] as const;
export type VisualId = (typeof VISUAL_IDS)[number];
