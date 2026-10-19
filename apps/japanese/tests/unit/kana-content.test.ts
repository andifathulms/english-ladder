// The Kana rungs' content (PRD §4.3, §5.2, §5.5): lessons, pools, placement, reading, kana data.
import { describe, expect, it } from 'vitest';
import { getKana, getLessons, getPlacement, getReading, getTestPool } from '@/course/content';
import { drawTest } from '@ladder/core/lib/check/draw';

describe.each(['kana-1', 'kana-2'])('%s', (rung) => {
  const lessons = getLessons(rung, { includeDrafts: true });
  it('has ten draft lessons in order, chained by next', () => {
    expect(lessons.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(lessons.every((l) => l.status === 'draft' && !l.review)).toBe(true);
    lessons.slice(0, -1).forEach((l, i) => expect(l.next).toBe(lessons[i + 1].id));
    expect(lessons[9].next ?? null).toBeNull();
  });
  it('has a test pool of 28, drawing 14 with every lesson represented, pass 11', () => {
    const pool = getTestPool(rung)!;
    expect(pool.items).toHaveLength(28);
    expect([pool.draw, pool.pass]).toEqual([14, 11]);
    expect(new Set(pool.items.map((i) => i.from))).toEqual(new Set(lessons.map((l) => l.id)));
    for (const seed of [1, 7, 42]) {
      const drawn = drawTest(pool.items, seed, pool.draw);
      expect(drawn).toHaveLength(14);
      expect(new Set(drawn.map((i) => i.from)).size).toBe(10);
    }
  });
  it('never traces in the test (tracing is graded in lessons)', () => {
    expect(getTestPool(rung)!.items.some((i) => i.type === 'trace')).toBe(false);
  });
});

describe('Kana 1 and the kana data', () => {
  const kana = getKana();
  const lessons = getLessons('kana-1', { includeDrafts: true });
  it('introduces each plain and voiced kana in the lesson kana.yaml dates it to', () => {
    for (const k of [...kana.seion, ...kana.dakuon]) {
      const l = lessons.find((x) => x.order === k.lesson)!;
      expect(l.kana_new ?? [], `${k.hira} in lesson ${k.lesson}`).toContain(k.hira);
    }
  });
  it('teaches romaji-free reading from lesson 9 (no kana_new romaji after the fade)', () => {
    expect(lessons.filter((l) => l.order >= 9).flatMap((l) => l.kana_new ?? [])).toEqual(['っ']);
  });
});

describe('Kana 2 extras', () => {
  it('has the Kana 2 reading, and Kana 1 has none (PRD §5.5)', () => {
    expect(getReading('kana-2')!.items.length).toBeGreaterThanOrEqual(2);
    expect(getReading('kana-1')).toBeNull();
  });
  it('introduces the ten first kanji in its last lesson', () => {
    const last = getLessons('kana-2', { includeDrafts: true })[9];
    expect(last.kanji).toEqual(['一', '二', '三', '日', '月', '人', '口', '山', '川', '本']);
  });
});

describe('placement (Cek kana)', () => {
  const p = getPlacement()!;
  it('has 20 items in the six sections, and thresholds 17 and 12', () => {
    const count = (s: string) => p.items.filter((i) => i.section === s).length;
    expect([count('hiragana'), count('katakana'), count('dakuten'), count('ear'), count('typing'), count('kanji')]).toEqual([6, 4, 3, 3, 2, 2]);
    expect(p.thresholds).toEqual({ easy1: 17, kana2: 12 });
  });
  it('hears long vowels and っ through minimal pairs, which play from recordings only', () => {
    expect(p.items.filter((i) => i.section === 'ear').every((i) => i.type === 'mora')).toBe(true);
  });
});
