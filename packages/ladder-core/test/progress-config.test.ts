// The store belongs to the course: its key, schema version, migrations and settings come from
// the course config, so two courses never share (or migrate) each other's progress.
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import * as store from '@ladder/core/lib/progress/store';
import { progressConfig, CORE_DEFAULT_SETTINGS } from '@ladder/core/lib/progress/config';
import { migrate } from '@ladder/core/lib/progress/migrations';
import type { ProgressState } from '@ladder/core/lib/progress/types';

const saved = progressConfig();
const v1Course = {
  storageKey: 'other-ladder:v1',
  schemaVersion: 1,
  defaults: { ...CORE_DEFAULT_SETTINGS, targetSize: 100 },
  allowed: { targetSize: [100, 120, 140] },
};

describe('per-course progress config', () => {
  beforeEach(() => {
    localStorage.clear();
    store.configure(v1Course);
  });
  afterAll(() => store.configure(saved));

  it('reads and writes the configured storage key only', () => {
    localStorage.setItem('english-ladder:v1', JSON.stringify({ schemaVersion: 2, opened: ['en-lesson'] }));
    localStorage.setItem('other-ladder:v1', JSON.stringify({ schemaVersion: 1, opened: ['ar-lesson'] }));
    expect(store.getState().opened).toEqual(['ar-lesson']);
    store.setLessonStep('x', 1);
    store.flush();
    expect(JSON.parse(localStorage.getItem('other-ladder:v1')!).opened).toContain('x');
    expect(JSON.parse(localStorage.getItem('english-ladder:v1')!).opened).toEqual(['en-lesson']);
  });

  it('runs only the course’s own migrations (no foreign 1 → 2 theme step)', () => {
    const s = migrate({ schemaVersion: 1, settings: { theme: 'system', targetSize: 140 } });
    expect(s.schemaVersion).toBe(1);
    expect(s.settings.theme).toBe('system');
    expect(s.settings.targetSize).toBe(140);
  });

  it('normalises course settings against their allowed values, in default key order', () => {
    const s = migrate({ schemaVersion: 1, settings: { targetSize: 999, explain: 'en' } });
    expect(s.settings.targetSize).toBe(100);
    expect('explain' in s.settings).toBe(false);
    expect(Object.keys(s.settings)).toEqual(Object.keys(v1Course.defaults));
  });

  it('leaves out optional state the course does not use', () => {
    const s = store.getState();
    expect('capstones' in s).toBe(false);
    expect('placement' in s).toBe(false);
  });
});

describe('progress extensions', () => {
  const ext = {
    ...v1Course,
    extensions: {
      deck: {
        empty: () => ({}),
        validate: (raw: unknown) => (raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}),
      },
    },
    onCompleteLesson: (s: ProgressState, _id: string, data: unknown) => ({
      ...s,
      deck: { ...(s.deck as object), ...Object.fromEntries((data as string[]).map((w) => [w, 1])) },
    }),
  };
  beforeEach(() => {
    localStorage.clear();
    store.__resetForTests();
    store.configure(ext);
  });
  afterAll(() => store.configure(saved));

  it('stores extensions after opened and before settings', () => {
    store.setLessonStep('x', 1);
    store.flush();
    const keys = Object.keys(JSON.parse(localStorage.getItem('other-ladder:v1')!));
    expect(keys.indexOf('deck')).toBe(keys.indexOf('opened') + 1);
    expect(keys.indexOf('settings')).toBe(keys.indexOf('deck') + 1);
  });

  it('validates stored extensions and applies onCompleteLesson in the same commit', () => {
    localStorage.setItem('other-ladder:v1', JSON.stringify({ schemaVersion: 1, deck: 'junk' }));
    expect(store.getExt('deck')).toEqual({});
    store.completeLesson('l1', ['a', 'b']);
    expect(store.getExt('deck')).toEqual({ a: 1, b: 1 });
    store.updateExt<Record<string, number>>('deck', (d) => ({ ...d, a: 2 }));
    expect(store.getExt('deck')).toEqual({ a: 2, b: 1 });
    store.reset();
    expect(store.getExt('deck')).toEqual({});
  });

  it('a course without extensions stores none', () => {
    store.configure(v1Course);
    store.setLessonStep('x', 1);
    store.flush();
    expect(Object.keys(JSON.parse(localStorage.getItem('other-ladder:v1')!))).not.toContain('deck');
  });
});
