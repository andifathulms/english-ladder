// Japanese Ladder's check-item logic (CLAUDE.md §5.3): its own types (kana, mora, pitch, form, trace,
// build; added in M5/M6) and its wording of the engine's types. Used at build time and in the client.
import type { ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { traceItemType } from '@ladder/core/lib/strokes/item';
import { normJa, toKana } from '@/lib/ja/text';
import { toHiragana } from '@/lib/ja/kana';

/** Japanese without markup or spaces; Latin text as written (markup removed). */
const plain = (s: string) => {
  const t = stripMarkup(s);
  return /[぀-ヿ㐀-鿿]/u.test(t) ? normJa(t) : t;
};
const prompted = (i: ExtraItem, fallback: string) => (i.prompt ? plain(i.prompt as string) : fallback);

type Kana = ExtraItem & { audio?: string; ja?: string; prompt?: string; answer: string; accept?: string[]; script: 'hiragana' | 'katakana' | 'any' };
type Mora = ExtraItem & { audio: string; prompt?: string; ask: 'count' | 'spelling'; options: string[]; answer: string };
type Pitch = ExtraItem & { audio: string; prompt?: string; pair: { ja: string; kana: string; pitch: number; id: string }[]; answer: string };
type Form = ExtraItem & { word: string; target: string; prompt?: string; options?: string[]; answer: string; accept?: string[] };

const str = (r: string | string[]) => (Array.isArray(r) ? r.join('') : r);
/** Kana compared exactly after normJa (long vowels and っ count); `any` unifies the two scripts. */
const sameKana = (given: string, want: string, script: Kana['script']) => {
  const a = normJa(given);
  const b = normJa(want);
  return script === 'any' ? toHiragana(a) === toHiragana(b) : a === b;
};
/** The plain spelling and the reading of a Japanese answer (ruby markup allowed). */
const forms = (s: string) => {
  try {
    return [normJa(s), normJa(toKana(s))];
  } catch {
    return [normJa(s)];
  }
};

export const itemTypes: Record<string, ItemTypeLogic> = {
  kana: {
    grade: (i, r) => {
      const k = i as Kana;
      return [k.answer, ...(k.accept ?? [])].some((a) => sameKana(str(r), a, k.script));
    },
    itemText: (i) => prompted(i, (i as Kana).ja ? 'Tulis bacaannya dalam kana.' : 'Dengarkan, lalu tulis dalam kana.'),
    answerText: (i) => (i as Kana).answer,
    sentences: () => [],
    // An empty box is not an answer in the rung test (the placement check counts any response).
    answered: (_i, r, where) => where === 'placement' || str(r).trim() !== '',
  },
  mora: {
    grade: (i, r) => normJa(str(r)) === normJa((i as Mora).answer),
    itemText: (i) => prompted(i, (i as Mora).ask === 'count' ? 'Dengarkan, lalu hitung ketukannya.' : 'Dengarkan, lalu pilih tulisannya.'),
    answerText: (i) => (i as Mora).answer,
    sentences: () => [],
    options: (i) => (i as Mora).options,
  },
  pitch: {
    grade: (i, r) => str(r) === (i as Pitch).answer,
    itemText: (i) => prompted(i, 'Dengarkan, lalu pilih artinya.'),
    answerText: (i) => {
      const p = i as Pitch;
      const w = p.pair.find((x) => x.id === p.answer)!;
      return `${plain(w.ja)} · ${w.id}`;
    },
    sentences: () => [],
    options: (i) => (i as Pitch).pair.map((p) => p.id),
  },
  form: {
    grade: (i, r) => {
      const f = i as Form;
      const given = forms(str(r));
      return [f.answer, ...(f.accept ?? [])].some((a) => forms(a).some((x) => given.includes(x)));
    },
    itemText: (i) => prompted(i, `Ubah ${plain((i as Form).word)}.`),
    answerText: (i) => plain((i as Form).answer),
    sentences: () => [],
    options: (i) => (i as Form).options ?? [],
    answered: (_i, r, where) => where === 'placement' || str(r).trim() !== '',
  },
  trace: traceItemType((i) => prompted(i, `Tulis ${i.char}.`)),
};

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
