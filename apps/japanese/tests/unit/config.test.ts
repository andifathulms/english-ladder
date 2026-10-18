// The course config keeps the identity a returning learner depends on (CLAUDE.md §2.3, §7.4).
import { describe, expect, it } from 'vitest';
import { course } from '@/course.config';
import { content } from '@/course/content';

describe('Japanese Ladder config', () => {
  it('has its own storage key, cache prefix and export name', () => {
    expect(course.storageKey).toBe('japanese-ladder:v1');
    expect(course.cachePrefix).toBe('japanese-ladder-');
    expect(course.exportFilePrefix).toBe('japanese-ladder-progress');
    expect(course.target.lang).toBe('ja');
  });

  it('turns on every English Ladder fix', () => {
    expect(Object.values(course.fixes ?? {}).every(Boolean)).toBe(true);
    expect(Object.keys(course.fixes ?? {})).toHaveLength(9);
  });

  it('puts all eleven rungs on the ladder, Kana tier at the bottom', () => {
    const rungs = content.getCurriculum();
    expect(rungs.map((r) => r.id)).toEqual(['kana-1', 'kana-2', 'easy-1', 'easy-2', 'easy-3', 'medium-1', 'medium-2', 'medium-3', 'hard-1', 'hard-2', 'hard-3']);
    expect(course.ladder?.tiers).toEqual(['hard', 'medium', 'easy', 'kana']);
    expect(rungs.filter((r) => r.optional).map((r) => r.id)).toEqual(['kana-1', 'kana-2']);
  });

  it('labels levels with JLPT, and JFT-Basic only at Medium 1', () => {
    const rungs = content.getCurriculum();
    expect(rungs.map((r) => course.adapter.rung!.levelLabel(r))).toEqual(['', '', 'N5', 'N5', 'N4', 'N4', 'N3', 'N3', 'N2', 'N2', 'N1']);
    expect(rungs.filter((r) => r.jft).map((r) => r.id)).toEqual(['medium-1']);
  });
});
