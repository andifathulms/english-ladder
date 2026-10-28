// Course item types (beyond the engine's choice/gap/order/scene/fix/listen): their grading and
// text logic. Registered once by the course (client providers and the build-time content model),
// so grade(), itemText() and content:check handle them. Rendering is registered separately in
// CourseConfig.check (client only).
import type { TextRules } from '@ladder/core/course/types';
import type { Settings } from '../progress/types';
import { isCoreItem, type CheckItem, type ExtraItem } from '../types';

export type Response = string | string[];

/** A note shown with a correct answer (a UI string key and its params), e.g. Spanish "Almost: *está*". */
export type GradeNote = { key: string; params?: Record<string, string | number> };
export type GradeResult = { correct: boolean; note?: GradeNote };
/** What grading may consult beyond the item: the learner's settings (e.g. strict accents always). */
export type GradeContext = { settings?: Settings };

export type ItemTypeLogic = {
  /** Grades a response; `text` are the course's text rules. A result may carry a note shown with a
   *  correct answer (e.g. accepted without its accents). */
  grade(item: ExtraItem, response: Response, text: TextRules, ctx?: GradeContext): boolean | GradeResult;
  /** One-line text for the continue card and review lists. */
  itemText(item: ExtraItem): string;
  /** The correct answer as a sentence-ish string (test results). */
  answerText(item: ExtraItem): string;
  /** Target strings in the item, for content:check (focus count, lint). */
  sentences(item: ExtraItem): string[];
  /** The option list, when the item picks one (number keys, pills). */
  options?(item: ExtraItem): string[];
  /** Tile items: the tiles to show and the answer tiles in order. */
  tiles?(item: ExtraItem): { tiles: string[]; answer: string[] };
  /** Whether a response is complete enough to move on, in a test or the placement check.
   *  Default: tile items need every answer tile; anything else needs a response. */
  answered?(item: ExtraItem, response: Response, where: 'test' | 'placement'): boolean;
};

const registry = new Map<string, ItemTypeLogic>();
const overrides = new Map<string, Partial<Pick<ItemTypeLogic, 'itemText' | 'answerText'>>>();

export function registerItemTypes(types: Record<string, ItemTypeLogic>) {
  for (const [k, v] of Object.entries(types)) registry.set(k, v);
}

/** Overrides the text of an engine item type (e.g. the line quoted for a listen item without prompt). */
export function overrideItemText(type: string, itemText: (item: ExtraItem) => string) {
  overrides.set(type, { ...overrides.get(type), itemText });
}

/** Overrides the answer text of an engine item type (test results, placement review). */
export function overrideAnswerText(type: string, answerText: (item: ExtraItem) => string) {
  overrides.set(type, { ...overrides.get(type), answerText });
}

export function itemTextOverride(type: string): ((item: ExtraItem) => string) | undefined {
  return overrides.get(type)?.itemText;
}

export function answerTextOverride(type: string): ((item: ExtraItem) => string) | undefined {
  return overrides.get(type)?.answerText;
}

export function itemType(type: string): ItemTypeLogic | undefined {
  return registry.get(type);
}

/** The registered definition for an item that isn't a core type; throws if none. */
export function extraType(item: { type: string; id?: string }): ItemTypeLogic {
  const def = registry.get(item.type);
  if (!def) throw new Error(`no item type "${item.type}" registered${item.id ? ` (item ${item.id})` : ''}`);
  return def;
}

/** Whether a test or placement response lets the learner move on. */
export function isAnswered(item: CheckItem, r: Response | undefined, where: 'test' | 'placement'): boolean {
  if (r === undefined) return false;
  const custom = isCoreItem(item) ? undefined : itemType((item as ExtraItem).type)?.answered;
  if (custom) return custom(item as ExtraItem, r, where);
  return !Array.isArray(r) || r.length === tilesNeeded(item);
}

/** Tiles an item's answer needs before it counts as answered (order and tile types), else 0. */
export function tilesNeeded(item: CheckItem): number {
  if (item.type === 'order') return item.tiles.length;
  if (isCoreItem(item)) return 0;
  return itemType((item as ExtraItem).type)?.tiles?.(item as ExtraItem).answer.length ?? 0;
}
