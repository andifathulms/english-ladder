/** Visual ids lesson content may reference. Components live in visuals/registry.ts. */
export const VISUAL_IDS = ['stress-map', 'agreement', 'ser-estar', 'conjugation-grid', 'gustar-flip', 'place-scene-es', 'routine-clock'] as const;
export type VisualId = (typeof VISUAL_IDS)[number];
