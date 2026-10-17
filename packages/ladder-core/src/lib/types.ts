// Engine-level content types. A course's own schema (apps/<course>/course/schema.ts) produces
// objects that satisfy these; anything course-specific stays opaque here and is read only through
// the course's ContentAdapter (lib/content/adapter.ts). Type-only: safe for client code.

export type Bilingual = { id: string; en: string };
export type Visual = { id: string; props: Record<string, unknown> };

type ItemBase = {
  id: string;
  /** Optional line in the learner's language above the item. */
  cue?: string;
  why: Bilingual;
  /** Test/placement pools: the lesson the item comes from. */
  from?: string;
  /** exact keeps every mark; loose (default) lets the course's text rules ignore some. */
  match?: 'exact' | 'loose';
  /** Placement items: which part of the check the item belongs to. */
  section?: string;
};

export type ChoiceItem = ItemBase & { type: 'choice'; prompt: string; options: string[]; answer: string };
export type GapItem = ItemBase & { type: 'gap'; prompt: string; options: string[]; answer: string };
export type OrderItem = ItemBase & {
  type: 'order';
  prompt?: string;
  tiles: string[];
  answer: string[];
  accept?: string[][];
};
export type SceneItem = ItemBase & { type: 'scene'; prompt?: string; visual: Visual; options: string[]; answer: string };
export type FixItem = ItemBase & { type: 'fix'; wrong: string; options: string[]; answer: string };
export type ListenItem = ItemBase & {
  type: 'listen';
  prompt?: string;
  audio: string;
  /** Spoken variety (e.g. Arabic fusha | eg); passed to the course's audio/voice choice. */
  variety?: string;
  options: string[];
  answer: string;
};

/** The item types the engine renders itself. */
export type CoreItem = ChoiceItem | GapItem | OrderItem | SceneItem | FixItem | ListenItem;
export const CORE_ITEM_TYPES = ['choice', 'gap', 'order', 'scene', 'fix', 'listen'] as const;

/** A course's own item type (registered with registerItemTypes / CourseConfig.check.types). */
export type ExtraItem = ItemBase & { type: string; [field: string]: unknown };

/**
 * Items as the engine handles them. Core code narrows on the core types; anything else is a
 * course item type and goes through its registered definition (lib/check/itemTypes.ts).
 */
export type CheckItem = CoreItem;

export const isCoreItem = (item: { type: string }): item is CoreItem =>
  (CORE_ITEM_TYPES as readonly string[]).includes(item.type);

export type Rung = {
  id: string;
  name: string;
  tier: string;
  cefr: string;
  status: 'live' | 'soon';
  /** An optional rung never becomes the learner's current rung on its own. */
  optional: boolean;
  /** Notch count. */
  lessons: number;
  description: Bilingual;
  topics: string[];
  threads: string[];
  inventory: string[];
  /** Course fields (e.g. English explain_lang, Arabic name_ar/harakat/translit). */
  [field: string]: unknown;
};

/** A parsed lesson: engine fields plus the course's own, which core reads only via the adapter. */
export type Lesson = {
  id: string;
  slug: string;
  rung: string;
  order: number;
  status: 'draft' | 'reviewed';
  minutes: number;
  summary: Bilingual;
  introduces: string[];
  spiral: string;
  visual?: Visual;
  check: CheckItem[];
  next?: string | null;
  concept: Bilingual;
  contrast: Bilingual;
  [field: string]: unknown;
};

export type LessonSections = { concept: Bilingual; contrast: Bilingual };

/** A lesson or reading title: the target-language title (if any) and the learner-language ones. */
export type Title = { target: string | null; id: string; en: string };

/** A line in the target language, as the engine sees it. `raw` is the course's own object. */
export type Line = {
  /** Target text with [[focus]] / *em* / **strong** markup. */
  text: string;
  translit?: string;
  meaning?: { id: string; en?: string };
  /** Note revealed by tapping the focus word (true: the generic note). */
  note?: Bilingual | true;
  raw?: unknown;
};

/** A glossary word. */
export type Gloss = {
  /** Stable key (unique within a lesson). */
  key: string;
  text: string;
  translit?: string;
  meaning: { id: string; en?: string };
  raw?: unknown;
};

/** A line to quote on the continue card: target text (with transliteration) or learner text. */
export type Quote = { text: string; tr?: string };

/** Lightweight lesson info for lists, the ladder and the continue card (plain JSON). */
export type LessonSummary = {
  id: string;
  slug: string;
  rung: string;
  order: number;
  status: 'draft' | 'reviewed';
  minutes: number;
  title: Title;
  /** The lesson's focus keyword, for a chip on the rung page (courses that show one). */
  keyword: string | null;
  checkIds: string[];
  /** Step resume text: index 0..5 → a line to quote on the continue card. */
  resume: Quote[];
  /** One line per check item, for resuming mid-check. */
  checkTexts: Quote[];
  glossary: Gloss[];
};

/** A rung's reading capstone. Course fields are read through the adapter. */
export type Reading = { rung: string; items: CheckItem[]; [field: string]: unknown };

export type TestPool = { rung: string; draw: number; pass: number; items: CheckItem[] };
