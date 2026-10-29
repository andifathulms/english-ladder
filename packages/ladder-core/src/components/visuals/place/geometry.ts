// The place scene's geometry (table, box and ball), shared by courses that teach prepositions of
// place with it (English PlaceScene, Arabic PlaceSceneAr). Each course adds its own words.
export const PLACES = ['in', 'on', 'under', 'next to', 'behind', 'in front of'] as const;
export type Place = (typeof PLACES)[number];
/** Two more places a course may opt into (German über, zwischen): above, not touching; between two boxes. */
export const EXTRA_PLACES = ['above', 'between'] as const;
export type ExtraPlace = (typeof EXTRA_PLACES)[number];
export type AnyPlace = Place | ExtraPlace;

/**
 * Draw-order slots, back to front:
 *  under  — below the table, drawn before the table top
 *  behind — on the table, drawn before the box
 *  inside — drawn between the box's back and its see-through front
 *  front  — drawn after everything
 */
export type Slot = 'under' | 'behind' | 'inside' | 'front';

export const BALL_R = 14;

type Spec = {
  x: number;
  y: number;
  slot: Slot;
  ref: 'table' | 'box';
  id: string;
  lifted: boolean;
  /** How far below the ball its shadow falls (a ball floating over the box); 0 when it rests. */
  float?: number;
};

// Ball centres in the 400×260 scene (see PlaceDrawing for the geometry). `id` is the Indonesian
// preposition, used in Indonesian alternatives.
export const PLACE_SPEC: Record<Place, Spec> = {
  in: { x: 190, y: 138, slot: 'inside', ref: 'box', id: 'di dalam', lifted: false },
  on: { x: 200, y: 102, slot: 'front', ref: 'box', id: 'di atas', lifted: true },
  under: { x: 180, y: 230, slot: 'under', ref: 'table', id: 'di bawah', lifted: false },
  'next to': { x: 286, y: 140, slot: 'front', ref: 'box', id: 'di sebelah', lifted: false },
  behind: { x: 250, y: 112, slot: 'behind', ref: 'box', id: 'di belakang', lifted: false },
  'in front of': { x: 190, y: 152, slot: 'front', ref: 'box', id: 'di depan', lifted: false },
};

export const isPlace = (v: unknown): v is Place => PLACES.includes(v as Place);

/** The opt-in places: above the box (its shadow on the box top) and between the box and a second one. */
export const EXTRA_PLACE_SPEC: Record<ExtraPlace, Spec> = {
  above: { x: 200, y: 62, slot: 'front', ref: 'box', id: 'di atas (tidak menempel)', lifted: true, float: 44 },
  between: { x: 266, y: 140, slot: 'front', ref: 'box', id: 'di antara', lifted: false },
};

export const isAnyPlace = (v: unknown): v is AnyPlace => isPlace(v) || EXTRA_PLACES.includes(v as ExtraPlace);
export const placeSpec = (p: AnyPlace): Spec => (isPlace(p) ? PLACE_SPEC[p] : EXTRA_PLACE_SPEC[p]);
