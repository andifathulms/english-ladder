import { describe, expect, it } from 'vitest';
import { parseSections } from '@/lib/content/sections';
import { getCurriculum, getLessons, summarize } from '@/lib/content/load';
import { CheckItemSchema } from '@/lib/content/schema';

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
  it('requires order answers to use the tiles', () => {
    const r = CheckItemSchema.safeParse({ id: 'a', type: 'order', tiles: ['a', 'b'], answer: ['a', 'c'], why });
    expect(r.success).toBe(false);
  });
});

describe('content loaders', () => {
  it('loads nine rungs, Easy 1 live at the bottom', () => {
    const rungs = getCurriculum();
    expect(rungs).toHaveLength(9);
    expect(rungs[0]).toMatchObject({ id: 'easy-1', status: 'live' });
  });
  it('parses Easy 1 lessons and summarises them', () => {
    const lessons = getLessons('easy-1', { includeDrafts: true });
    expect(lessons.length).toBeGreaterThan(0);
    const s = summarize(lessons[0]);
    expect(s.resume).toHaveLength(6);
    expect(s.checkTexts.length).toBe(lessons[0].check.length);
  });
});
