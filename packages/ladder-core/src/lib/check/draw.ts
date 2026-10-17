import type { ProgressState } from '../progress/types';
import { rng, shuffle } from './random';

/** What drawing needs from an item (engine and course item types alike). */
type Drawable = { id: string; from?: string };

/** Draws n test items deterministically from the seed, with at least one item from every lesson. */
export function drawTest<T extends Drawable>(pool: T[], seed: number, n = 16): T[] {
  const rand = rng(seed);
  const byLesson = new Map<string, T[]>();
  for (const item of pool) {
    const k = item.from ?? '';
    byLesson.set(k, [...(byLesson.get(k) ?? []), item]);
  }
  const picked: T[] = [];
  const rest: T[] = [];
  for (const k of [...byLesson.keys()].sort()) {
    const [first, ...others] = shuffle(byLesson.get(k)!, rand);
    picked.push(first);
    rest.push(...others);
  }
  const fill = shuffle(rest, rand).slice(0, Math.max(0, n - picked.length));
  return shuffle([...picked.slice(0, n), ...fill], rand);
}

/** Up to n review items from completed lessons: box 1 first, then 2, then 3; ties by oldest lastSeen. */
export function drawReview<T extends Drawable>(
  progress: ProgressState,
  items: { item: T; lessonId: string }[],
  n = 5,
): T[] {
  return items
    .filter(({ lessonId }) => progress.lessons[lessonId]?.completed)
    .map(({ item }) => ({ item, p: progress.items[item.id] }))
    .sort((a, b) => (a.p?.box ?? 1) - (b.p?.box ?? 1) || (a.p?.lastSeen ?? 0) - (b.p?.lastSeen ?? 0))
    .slice(0, n)
    .map((x) => x.item);
}
