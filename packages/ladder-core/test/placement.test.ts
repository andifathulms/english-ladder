// Placement is data-driven: outcomes name the rung, the threshold key and the rungs it climbs.
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import * as store from '@ladder/core/lib/progress/store';
import { progressConfig, CORE_DEFAULT_SETTINGS } from '@ladder/core/lib/progress/config';
import { placementOutcome, scorePlacement } from '@ladder/core/lib/check/placement';
import { continueTarget } from '@ladder/core/lib/progress/derive';
import type { CheckItem, LessonSummary, Placement, Rung } from '@ladder/core/lib/types';
import { fakeArabic } from './fakeCourse';

const outcomes = [
  { result: 'easy-1', threshold: 'easy1', climbs: ['script-1', 'script-2'] },
  { result: 'script-2', threshold: 'script2', climbs: ['script-1'] },
  { result: 'script-1', climbs: [] },
];
const item = (id: string, section: string, from: string): CheckItem =>
  ({ id, type: 'choice', prompt: 'p', options: ['a', 'b'], answer: 'a', why: { id: '', en: '' }, section, from }) as CheckItem;
const p: Placement = {
  items: [item('1', 'forms', 's1-a'), item('2', 'forms', 's1-b'), item('3', 'sounds', 's2-a'), item('4', 'sounds', 's2-a')],
  thresholds: { easy1: 4, script2: 2 },
};
const saved = progressConfig();

describe('placement', () => {
  beforeEach(() => {
    localStorage.clear();
    store.configure({ storageKey: 'p:v1', schemaVersion: 1, defaults: CORE_DEFAULT_SETTINGS, features: { placement: true } });
  });
  afterAll(() => store.configure(saved));

  it('picks the first outcome whose threshold the score reaches', () => {
    expect(placementOutcome(4, p, outcomes).result).toBe('easy-1');
    expect(placementOutcome(3, p, outcomes).result).toBe('script-2');
    expect(placementOutcome(0, p, outcomes).result).toBe('script-1');
  });

  it('scores by section and collects the lessons behind misses', () => {
    const s = scorePlacement(p, { '1': 'a', '2': 'b', '3': 'a' }, { sections: ['forms', 'sounds'], outcomes }, fakeArabic.text);
    expect(s).toMatchObject({ score: 2, total: 4, result: 'script-2', missed: ['s1-b', 's2-a'] });
    expect(s.bySection).toEqual({ forms: { score: 1, total: 2 }, sounds: { score: 1, total: 2 } });
  });

  it('marks climbs via placement, never un-climbs, never overwrites a test climb', () => {
    store.recordTest('script-1', { score: 9, total: 10, seed: 1, date: '' }, true);
    store.applyPlacement({ score: 4, total: 4, result: 'easy-1', missed: [] }, ['script-1', 'script-2']);
    const s = store.getState();
    expect(s.rungs['script-1']).toMatchObject({ climbed: true, via: 'test' });
    expect(s.rungs['script-2']).toMatchObject({ climbed: true, via: 'placement' });
    expect(s.placement).toMatchObject({ result: 'easy-1', score: 4 });
  });

  it('a placed learner who has not started continues at the placed rung', () => {
    const rung = { id: 'easy-1' } as Rung;
    const first = { id: 'e1', rung: 'easy-1', order: 1, resume: [{ text: 'q' }] } as unknown as LessonSummary;
    store.applyPlacement({ score: 4, total: 4, result: 'easy-1', missed: [] }, []);
    expect(continueTarget([rung], [first], store.getState())).toMatchObject({ kind: 'lesson', step: 0, text: { text: 'q' } });
  });
});
