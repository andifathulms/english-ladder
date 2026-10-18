// A progress file exported from the live standalone Mandarin Ladder (tests/fixtures/live-export.json,
// made by tests/fixtures/make-live-export.mjs) imports into the monorepo app unchanged: same
// storage key, same schema, same shape (deck and traces after `opened`), and exporting it again
// gives back the very same file.
import fs from 'node:fs';
import path from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import * as store from '@ladder/core/lib/progress/store';
import { continueTarget, rungState } from '@ladder/core/lib/progress/derive';
import { content } from '@/course/content';
import { STORAGE_KEY, type Deck, type Traces } from '@/course/progress';

const file = fs.readFileSync(path.join(process.cwd(), 'tests/fixtures/live-export.json'), 'utf8');
const live = JSON.parse(file);

describe('progress exported from the live app', () => {
  beforeEach(() => {
    localStorage.clear();
    store.__resetForTests();
  });

  it('imports, and exports back byte for byte', () => {
    expect(store.importJSON(file)).toEqual({ ok: true });
    expect(store.exportJSON()).toBe(file.trimEnd());
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(live);
  });

  it('is read from the same storage key a returning learner already has', () => {
    localStorage.setItem('mandarin-ladder:v1', file);
    expect(store.getState()).toEqual(live);
  });

  it('shows the same state: placement, climbs, lessons, capstone, deck, traces, settings', () => {
    store.importJSON(file);
    const s = store.getState();
    expect(s.placement).toMatchObject({ score: 20, total: 20, result: 'easy-1' });
    expect(s.rungs['dasar-1']).toMatchObject({ climbed: true, via: 'placement' });
    expect(s.rungs['dasar-2']).toMatchObject({ climbed: true, via: 'placement' });
    expect(s.capstones!['dasar-2'].reading).toBe(live.capstones['dasar-2'].reading);
    expect(store.getExt<Deck>('deck')).toEqual(live.deck);
    expect(Object.values(store.getExt<Deck>('deck')).filter((c) => c.lastSeen > 0)).toHaveLength(5);
    expect(store.getExt<Traces>('traces')).toEqual(live.traces);
    expect(s.settings).toEqual({
      uiLang: 'id',
      voice: 'male',
      rate: 0.75,
      sfx: true,
      textSize: 100,
      zhSize: 140,
      toneColours: 'rung',
      deckDaily: 10,
      deckFace: 'hanzi',
      theme: 'dark',
      motion: 'system',
    });

    const rungs = content.getCurriculum();
    const lessons = content.getAllSummaries();
    const target = continueTarget(rungs, lessons, s);
    expect(target).toMatchObject({ kind: 'lesson', step: 2, lesson: { id: 'easy1-02-pertanyaan' } });
    const dasar1 = rungs.find((r) => r.id === 'dasar-1')!;
    expect(rungState(dasar1, lessons, s).kind).toBe('climbed');
  });
});
