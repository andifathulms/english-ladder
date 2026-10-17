// Course item types (beyond the engine's choice/gap/order/scene/fix/listen): their grading and
// text logic. Registered once by the course (client providers and the build-time content model),
// so grade(), itemText() and content:check handle them. Rendering is registered separately in
// CourseConfig.check (client only).
import type { TextRules } from '@ladder/core/course/types';
import { isCoreItem, type CheckItem, type ExtraItem } from '../types';

export type Response = string | string[];

export type ItemTypeLogic = {
  /** Grades a response; `text` are the course's text rules. */
  grade(item: ExtraItem, response: Response, text: TextRules): boolean;
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
};

const registry = new Map<string, ItemTypeLogic>();
const overrides = new Map<string, Partial<Pick<ItemTypeLogic, 'itemText'>>>();

export function registerItemTypes(types: Record<string, ItemTypeLogic>) {
  for (const [k, v] of Object.entries(types)) registry.set(k, v);
}

/** Overrides the text of an engine item type (e.g. the line quoted for a listen item without prompt). */
export function overrideItemText(type: string, itemText: (item: ExtraItem) => string) {
  overrides.set(type, { itemText });
}

export function itemTextOverride(type: string): ((item: ExtraItem) => string) | undefined {
  return overrides.get(type)?.itemText;
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

/** Tiles an item's answer needs before it counts as answered (order and tile types), else 0. */
export function tilesNeeded(item: CheckItem): number {
  if (item.type === 'order') return item.tiles.length;
  if (isCoreItem(item)) return 0;
  return itemType((item as ExtraItem).type)?.tiles?.(item as ExtraItem).answer.length ?? 0;
}
