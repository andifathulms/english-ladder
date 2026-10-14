import { describe, expect, it } from 'vitest';
import { grade, sameOrder } from '@/lib/check/grade';
import { drawReview, drawTest } from '@/lib/check/draw';
import { nextBox } from '@/lib/check/leitner';
import { emptyState } from '@/lib/progress/defaults';
import type { CheckItem } from '@/lib/types';

const why = { id: 'x', en: 'y' };

describe('grade', () => {
  it('grades choice, gap, scene and fix by exact option', () => {
    const c: CheckItem = { id: 'a', type: 'choice', prompt: 'p', options: ['in', 'on'], answer: 'on', why };
    expect(grade(c, 'on').correct).toBe(true);
    expect(grade(c, 'in').correct).toBe(false);
    expect(grade(c, ['on']).correct).toBe(false);
    const f: CheckItem = { id: 'b', type: 'fix', wrong: 'She have', options: ['She [[has]] two cats.', 'x'], answer: 'She [[has]] two cats.', why };
    expect(grade(f, 'She has two cats.').correct).toBe(true);
  });

  it('grades order against answer and accept alternatives', () => {
    const o: CheckItem = {
      id: 'c',
      type: 'order',
      tiles: ['I', 'am', 'tired', "I'm"],
      answer: ['I', 'am', 'tired'],
      accept: [["I'm", 'tired']],
      why,
    };
    expect(grade(o, ['I', 'am', 'tired']).correct).toBe(true);
    expect(grade(o, ["I'm", 'tired.']).correct).toBe(true);
    expect(grade(o, ['am', 'I', 'tired']).correct).toBe(false);
  });

  it('order comparison is case-sensitive for the first word only', () => {
    expect(sameOrder(['The', 'Ball'], ['The', 'ball'])).toBe(true);
    expect(sameOrder(['the', 'ball'], ['The', 'ball'])).toBe(false);
    expect(sameOrder(['The', 'ball?'], ['The', 'ball'])).toBe(true);
  });
});

describe('drawTest', () => {
  const pool: CheckItem[] = Array.from({ length: 24 }, (_, i) => ({
    id: `t${i}`,
    type: 'choice',
    prompt: 'p',
    options: ['a', 'b'],
    answer: 'a',
    why,
    from: `L${i % 8}`,
  }));

  it('is deterministic for a seed and returns n unique items', () => {
    const a = drawTest(pool, 42);
    const b = drawTest(pool, 42);
    expect(a.map((x) => x.id)).toEqual(b.map((x) => x.id));
    expect(new Set(a.map((x) => x.id)).size).toBe(16);
  });

  it('differs between seeds', () => {
    expect(drawTest(pool, 1).map((x) => x.id)).not.toEqual(drawTest(pool, 2).map((x) => x.id));
  });

  it('includes at least one item from every lesson', () => {
    for (const seed of [1, 7, 99, 12345]) {
      const lessons = new Set(drawTest(pool, seed).map((x) => x.from));
      expect(lessons.size).toBe(8);
    }
  });
});

describe('drawReview and Leitner', () => {
  it('moves boxes: miss → 1, correct → up one, max 3', () => {
    expect(nextBox(undefined, false)).toBe(1);
    expect(nextBox(undefined, true)).toBe(2);
    expect(nextBox(2, true)).toBe(3);
    expect(nextBox(3, true)).toBe(3);
    expect(nextBox(3, false)).toBe(1);
  });

  it('draws box 1 first, then by oldest lastSeen, from completed lessons only', () => {
    const p = emptyState();
    p.lessons = {
      L1: { step: 5, furthest: 5, completed: true, lastOpened: 0 },
      L2: { step: 2, furthest: 2, completed: false, lastOpened: 0 },
    };
    p.items = {
      a: { firstTry: true, box: 3, lastSeen: 1 },
      b: { firstTry: false, box: 1, lastSeen: 50 },
      c: { firstTry: true, box: 2, lastSeen: 5 },
      d: { firstTry: false, box: 1, lastSeen: 10 },
    };
    const mk = (id: string, lessonId: string) => ({
      lessonId,
      item: { id, type: 'choice', prompt: 'p', options: ['a', 'b'], answer: 'a', why } as CheckItem,
    });
    const drawn = drawReview(p, [mk('a', 'L1'), mk('b', 'L1'), mk('c', 'L1'), mk('d', 'L1'), mk('e', 'L2')], 3);
    expect(drawn.map((x) => x.id)).toEqual(['d', 'b', 'c']);
  });
});
