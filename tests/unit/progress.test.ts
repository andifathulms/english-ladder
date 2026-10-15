import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as store from '@/lib/progress/store';
import { migrate, MigrationError } from '@/lib/progress/migrations';
import { STORAGE_KEY, SCHEMA_VERSION } from '@/lib/progress/constants';
import { continueTarget, lessonState, weekDays } from '@/lib/progress/derive';
import { emptyState } from '@/lib/progress/defaults';
import type { LessonSummary, Rung } from '@/lib/types';

beforeEach(() => {
  localStorage.clear();
  store.__resetForTests();
});

describe('migrations', () => {
  it('upgrades unversioned state and fills defaults', () => {
    const s = migrate({ lessons: { a: { step: 2, furthest: 2, completed: false, lastOpened: 1 } } });
    expect(s.schemaVersion).toBe(SCHEMA_VERSION);
    expect(s.lessons.a.step).toBe(2);
    expect(s.settings.uiLang).toBe('id');
  });
  it('drops invalid settings values', () => {
    expect(migrate({ schemaVersion: 1, settings: { theme: 'neon', textSize: 115 } }).settings).toMatchObject({ theme: 'light', textSize: 115 });
  });
  it('refuses newer versions and non-objects', () => {
    expect(() => migrate({ schemaVersion: 99 })).toThrow(MigrationError);
  });

  it('moves the old "system" default to the bright theme once, keeps an explicit dark', () => {
    expect(migrate({ schemaVersion: 1, settings: { theme: 'system' } }).settings.theme).toBe('light');
    expect(migrate({ schemaVersion: 1, settings: { theme: 'dark' } }).settings.theme).toBe('dark');
    expect(migrate({ schemaVersion: 2, settings: { theme: 'system' } }).settings.theme).toBe('system');
    expect(() => migrate('nope')).toThrow(MigrationError);
  });
});

describe('store', () => {
  it('records steps, completion and answers, and persists on flush', () => {
    store.setLessonStep('L1', 3);
    store.recordAnswer('i1', false);
    store.recordAnswer('i2', true);
    store.completeLesson('L1');
    store.flush();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.lessons.L1).toMatchObject({ completed: true, furthest: 5 });
    expect(saved.items.i1).toMatchObject({ firstTry: false, box: 1 });
    expect(saved.items.i2).toMatchObject({ firstTry: true, box: 2 });
    expect(saved.days).toContain(store.todayKey());
  });

  it('exports and imports the same shape, and rejects garbage', () => {
    store.setLessonStep('L1', 1);
    const json = store.exportJSON();
    store.reset();
    expect(store.getState().lessons).toEqual({});
    expect(store.importJSON(json)).toEqual({ ok: true });
    expect(store.getState().lessons.L1.step).toBe(1);
    expect(store.importJSON('{not json').ok).toBe(false);
  });

  it('reset keeps settings', () => {
    store.setSettings({ uiLang: 'en' });
    store.setLessonStep('L1', 1);
    store.reset();
    expect(store.getState().settings.uiLang).toBe('en');
    expect(store.getState().lessons).toEqual({});
  });

  it('keeps working in memory when storage throws', () => {
    const spy = vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    try {
      store.__resetForTests();
      expect(store.isStorageAvailable()).toBe(false);
      store.setLessonStep('L1', 2);
      store.flush();
      expect(store.getState().lessons.L1.step).toBe(2);
    } finally {
      spy.mockRestore();
    }
  });
});

describe('derived state', () => {
  const rung = { id: 'easy-1', name: 'Easy 1', status: 'live', lessons: 8, tier: 'easy', cefr: 'A1', explain_lang: 'id', description: { id: '', en: '' }, topics: ['x'], threads: [], inventory: [] } as Rung;
  const mk = (n: number): LessonSummary => ({
    id: `L${n}`,
    slug: `0${n}-x`,
    rung: 'easy-1',
    order: n,
    status: 'draft',
    minutes: 6,
    title: { en: `L${n}`, id: `L${n}` },
    checkIds: [`L${n}-c1`],
    resume: ['s0', 's1', 's2', 's3', 's4', 's5'].map((s) => `${s}-${n}`),
    checkTexts: [`check-${n}`],
    glossary: [],
  });
  const lessons = [mk(1), mk(2)];

  it('welcomes a first visit', () => {
    expect(continueTarget([rung], lessons, emptyState()).kind).toBe('welcome');
  });

  it('continues the open lesson at its step, quoting the check item', () => {
    const p = emptyState();
    p.lessons.L1 = { step: 4, furthest: 4, checkIndex: 0, completed: false, lastOpened: 5 };
    expect(continueTarget([rung], lessons, p)).toMatchObject({ kind: 'lesson', step: 4, text: 'check-1' });
  });

  it('moves to the next lesson after finishing one', () => {
    const p = emptyState();
    p.lessons.L1 = { step: 5, furthest: 5, completed: true, lastOpened: 5 };
    expect(continueTarget([rung], lessons, p)).toMatchObject({ kind: 'lesson', lesson: { id: 'L2' }, step: 0 });
  });

  it('marks lessons with first-try misses as to review', () => {
    const p = emptyState();
    p.lessons.L1 = { step: 5, furthest: 5, completed: true, lastOpened: 5 };
    p.items['L1-c1'] = { firstTry: false, box: 1, lastSeen: 1 };
    expect(lessonState(lessons[0], p)).toEqual({ kind: 'review', n: 1 });
  });

  it('builds a Monday-first week', () => {
    const p = emptyState();
    p.days = ['2026-10-12'];
    const w = weekDays(p, new Date('2026-10-15T10:00:00'));
    expect(w[0]).toMatchObject({ key: '2026-10-12', practised: true });
    expect(w[3].today).toBe(true);
  });
});
