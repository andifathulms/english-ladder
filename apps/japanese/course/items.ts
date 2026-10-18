// Japanese Ladder's check-item logic (CLAUDE.md §5.3): its own types (kana, mora, pitch, form, trace,
// build; added in M5/M6) and its wording of the engine's types. Used at build time and in the client.
import type { ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { normJa } from '@/lib/ja/text';

/** Japanese without markup or spaces; Latin text as written (markup removed). */
const plain = (s: string) => {
  const t = stripMarkup(s);
  return /[぀-ヿ㐀-鿿]/u.test(t) ? normJa(t) : t;
};
const prompted = (i: ExtraItem, fallback: string) => (i.prompt ? plain(i.prompt as string) : fallback);

export const itemTypes: Record<string, ItemTypeLogic> = {};

type Core = ExtraItem & { prompt?: string; wrong?: string; answer?: string | string[] };

/** How engine item types read in Japanese Ladder: Indonesian, and Japanese without spaces or ruby. */
export const itemText: Record<string, (item: ExtraItem) => string> = {
  choice: (i) => plain((i as Core).prompt!),
  gap: (i) => plain((i as Core).prompt!),
  fix: (i) => plain((i as Core).wrong!),
  scene: (i) => (i.prompt ? plain(i.prompt as string) : plain((i as Core).answer as string)),
  order: (i) => (i.prompt ? plain(i.prompt as string) : ((i as unknown as { tiles: string[] }).tiles.map(plain).join(' · '))),
  listen: (i) => prompted(i, 'Dengarkan, lalu pilih.'),
};

const filled = (i: ExtraItem) => {
  const c = i as Core;
  return c.prompt!.includes('___') ? plain(c.prompt!.replace('___', c.answer as string)) : plain(c.answer as string);
};

export const answerText: Record<string, (item: ExtraItem) => string> = {
  order: (i) => plain(((i as Core).answer as string[]).join(' ')),
  choice: filled,
  gap: filled,
  scene: (i) => plain((i as Core).answer as string),
  fix: (i) => plain((i as Core).answer as string),
  listen: (i) => plain((i as Core).answer as string),
};
