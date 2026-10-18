// Mandarin's own check-item types (CLAUDE.md §5.4): tone, pinyin, trace, build. Grading and text
// logic only; their rendering is in components/check/slots.tsx. Used at build time and in the client.
import type { ItemTypeLogic, Response } from '@ladder/core/lib/check/itemTypes';
import type { ExtraItem } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { plainZh } from '@/lib/zh/text';
import { samePinyin } from '@/lib/zh/pinyin';

type Tone = ExtraItem & { audio: string; prompt?: string; options: number[][]; answer: number[] };
type Pinyin = ExtraItem & { audio: string; prompt?: string; answer: string; accept?: string[] };
type Trace = ExtraItem & { char: string; prompt?: string };
type Build = ExtraItem & { char: string; prompt?: string; parts: string[]; answer: string[] };

/** "3,3" or "3+3" → [3, 3]. */
export const parseTones = (r: Response): number[] =>
  (Array.isArray(r) ? r : r.split(/[\s,+]+/)).filter((x) => x !== '').map((x) => Number(x));

/** Trace responses carry the misses: "misses:1". Two or fewer total misses is correct (CLAUDE.md §7.5). */
export const TRACE_PASS_MISSES = 2;
export const traceMisses = (r: Response): number => {
  const m = /^misses:(\d+)$/.exec(Array.isArray(r) ? r.join('') : r);
  return m ? Number(m[1]) : Infinity;
};

const toneSeq = (t: number[]) => t.map((n) => (n === 0 ? '·' : n)).join(' + ');
const prompted = (i: ExtraItem, fallback: string) => (i.prompt ? stripMarkup(i.prompt as string) : fallback);

export const itemTypes: Record<string, ItemTypeLogic> = {
  tone: {
    grade: (i, r) => {
      const t = parseTones(r);
      const a = (i as Tone).answer;
      return t.length === a.length && t.every((x, k) => x === a[k]);
    },
    itemText: (i) => prompted(i, 'Dengarkan, lalu pilih nadanya.'),
    answerText: (i) => `${plainZh((i as Tone).audio)} · ${toneSeq((i as Tone).answer)}`,
    sentences: () => [],
    // Each option is a tone sequence; as a string it is "3,3" (number keys, pills).
    options: (i) => (i as Tone).options.map((o) => o.join(',')),
  },
  pinyin: {
    grade: (i, r) => {
      const p = i as Pinyin;
      const given = Array.isArray(r) ? r.join(' ') : r;
      return [p.answer, ...(p.accept ?? [])].some((a) => samePinyin(given, a));
    },
    itemText: (i) => prompted(i, 'Dengarkan, lalu tulis pinyinnya.'),
    answerText: (i) => (i as Pinyin).answer,
    sentences: () => [],
    // An empty box is not an answer in the rung test (the placement check accepted it as given).
    answered: (_i, r, where) => where === 'placement' || r !== '',
  },
  trace: {
    grade: (_i, r) => traceMisses(r) <= TRACE_PASS_MISSES,
    itemText: (i) => prompted(i, `Tulis ${(i as Trace).char}`),
    answerText: (i) => (i as Trace).char,
    sentences: () => [],
  },
  build: {
    grade: (i, r) => {
      if (!Array.isArray(r)) return false;
      return [...r].sort().join('|') === [...(i as Build).answer].sort().join('|');
    },
    itemText: (i) => prompted(i, `Bangun ${(i as Build).char}`),
    answerText: (i) => `${(i as Build).char} = ${(i as Build).answer.join(' + ')}`,
    sentences: () => [],
    // Answered once as many parts are chosen as the character has.
    answered: (i, r, where) =>
      Array.isArray(r) ? r.length === (i as Build).answer.length : where === 'placement' || r !== '',
  },
};

type Core = ExtraItem & { prompt?: string; wrong?: string; answer?: string | string[] };

/** How engine item types read in Mandarin Ladder: Indonesian, and hanzi without spaces. */
export const itemText: Record<string, (item: ExtraItem) => string> = {
  choice: (i) => plainZh(stripMarkup((i as Core).prompt!)),
  gap: (i) => plainZh(stripMarkup((i as Core).prompt!)),
  fix: (i) => plainZh((i as Core).wrong!),
  listen: (i) => prompted(i, 'Dengarkan, lalu pilih.'),
};

const filled = (i: ExtraItem) => {
  const c = i as Core;
  if (c.prompt!.includes('___')) return plainZh(stripMarkup(c.prompt!.replace('___', c.answer as string)));
  return plainZh(stripMarkup(c.answer as string));
};

export const answerText: Record<string, (item: ExtraItem) => string> = {
  order: (i) => plainZh(((i as Core).answer as string[]).join(' ')),
  choice: filled,
  gap: filled,
  scene: (i) => plainZh(stripMarkup((i as Core).answer as string)),
  fix: (i) => plainZh(stripMarkup((i as Core).answer as string)),
  listen: (i) => plainZh(stripMarkup((i as Core).answer as string)),
};
