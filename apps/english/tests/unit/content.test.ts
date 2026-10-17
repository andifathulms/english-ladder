import { describe, expect, it } from 'vitest';
import { parseSections } from '@ladder/core/lib/content/sections';
import { getCurriculum, getLessons, summarize } from '@ladder/core/lib/content/load';
import { CheckItemSchema } from '@ladder/core/lib/content/schema';

const body = (extra = '') => `
## concept.id
Konsep.

## concept.en
Concept.

## contrast.id
Beda.

## contrast.en
Contrast.
${extra}`;

describe('section parser', () => {
  it('maps fixed headings', () => {
    expect(parseSections(body())).toEqual({
      concept: { id: 'Konsep.', en: 'Concept.' },
      contrast: { id: 'Beda.', en: 'Contrast.' },
    });
  });
  it('rejects unknown headings', () => {
    expect(() => parseSections(body('\n## notes\nx'))).toThrow(/unknown section/);
  });
  it('rejects missing sections', () => {
    expect(() => parseSections('## concept.id\nx')).toThrow(/missing section/);
  });
});

describe('check item schema', () => {
  const why = { id: 'x', en: 'y' };
  it('requires the answer among options', () => {
    const r = CheckItemSchema.safeParse({ id: 'a', type: 'choice', prompt: 'p', options: ['a', 'b'], answer: 'c', why });
    expect(r.success).toBe(false);
  });
  it('requires exactly one gap', () => {
    const r = CheckItemSchema.safeParse({ id: 'a', type: 'gap', prompt: 'no gap', options: ['a', 'b'], answer: 'a', why });
    expect(r.success).toBe(false);
  });
  it('requires a listen answer among options', () => {
    const r = CheckItemSchema.safeParse({ id: 'a', type: 'listen', audio: 'x', options: ['a', 'b'], answer: 'x', why });
    expect(r.success).toBe(false);
  });
  it('requires order answers to use the tiles', () => {
    const r = CheckItemSchema.safeParse({ id: 'a', type: 'order', tiles: ['a', 'b'], answer: ['a', 'c'], why });
    expect(r.success).toBe(false);
  });
});

describe('content loaders', () => {
  it('loads ten rungs: an optional Starter under Easy 1', () => {
    const rungs = getCurriculum();
    expect(rungs).toHaveLength(10);
    expect(rungs[0]).toMatchObject({ id: 'starter', status: 'live', optional: true });
    expect(rungs[1]).toMatchObject({ id: 'easy-1', status: 'live', optional: false });
  });
  it('parses Easy 1 lessons and summarises them', () => {
    const lessons = getLessons('easy-1', { includeDrafts: true });
    expect(lessons.length).toBeGreaterThan(0);
    const s = summarize(lessons[0]);
    expect(s.resume).toHaveLength(6);
    expect(s.checkTexts.length).toBe(lessons[0].check.length);
  });
});

import { INVENTORY_DETECTORS, englishTexts } from '@ladder/core/lib/content/lint';
import { getTestPool, getNouns } from '@ladder/core/lib/content/load';
import { drawTest } from '@ladder/core/lib/check/draw';

describe('Easy 1 content', () => {
  const lessons = getLessons('easy-1', { includeDrafts: true });

  it('has ten draft lessons in order, chained by next', () => {
    expect(lessons.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(lessons.every((l) => l.status === 'draft')).toBe(true);
    lessons.slice(0, -1).forEach((l, i) => expect(l.next).toBe(lessons[i + 1].id));
  });

  it('does not use a/an before lesson 3 or prepositions before lesson 9', () => {
    for (const l of lessons.filter((x) => x.order < 3)) {
      for (const t of englishTexts(l).filter((x) => x.where !== 'pair.off')) expect(INVENTORY_DETECTORS['articles-a-an'].test(t.text)).toBe(false);
    }
    for (const l of lessons.filter((x) => x.order < 9)) {
      for (const t of englishTexts(l).filter((x) => x.where !== 'pair.off')) expect(INVENTORY_DETECTORS['prep-place-basic'].test(t.text)).toBe(false);
    }
  });

  it('draws a 16-item test with every lesson represented', () => {
    const pool = getTestPool('easy-1')!;
    expect(pool.items.length).toBeGreaterThanOrEqual(24);
    const drawn = drawTest(pool.items, 2026, pool.draw);
    expect(drawn).toHaveLength(16);
    expect(new Set(drawn.map((i) => i.from)).size).toBe(10);
  });

  it('authors around 120 nouns, including the tricky a/an ones', () => {
    const nouns = getNouns();
    expect(nouns.length).toBeGreaterThanOrEqual(120);
    expect(nouns.find((n) => n.word === 'hour')?.initial_sound).toBe('vowel');
    expect(nouns.find((n) => n.word === 'university')?.initial_sound).toBe('consonant');
  });
});

describe('Starter content', () => {
  const lessons = getLessons('starter', { includeDrafts: true });
  it('has eight draft lessons chained by next', () => {
    expect(lessons.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(lessons.every((l) => l.status === 'draft')).toBe(true);
    lessons.slice(0, -1).forEach((l, i) => expect(l.next).toBe(lessons[i + 1].id));
  });
  it('draws a 12-item test with every lesson represented', () => {
    const pool = getTestPool('starter')!;
    const drawn = drawTest(pool.items, 7, pool.draw);
    expect(drawn).toHaveLength(12);
    expect(new Set(drawn.map((i) => i.from)).size).toBe(8);
  });
});

describe('readings', () => {
  it('loads the Easy 1 capstone with questions', async () => {
    const { getReading } = await import('@ladder/core/lib/content/load');
    const r = getReading('easy-1')!;
    expect(r.items.length).toBeGreaterThanOrEqual(2);
    expect(r.text).toContain('Rina');
  });
});
