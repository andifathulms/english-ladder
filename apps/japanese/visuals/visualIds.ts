/** Visual ids lesson content may reference. Components live in visuals/registry.ts. */
export const VISUAL_IDS = [
  'kana-chart',
  'kana-origins',
  'mora-beats',
  'pitch-line',
  'stroke-order',
  'particle-train',
  'place-scene-ja',
  'counters',
] as const;
export type VisualId = (typeof VISUAL_IDS)[number];
