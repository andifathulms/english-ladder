import { SCHEMA_VERSION } from './constants';
import { DEFAULT_SETTINGS, emptyState } from './defaults';
import type { ProgressState } from './types';

type Raw = Record<string, unknown> & { schemaVersion?: unknown };

/**
 * Upgrades stored state one version at a time. Add a step here whenever the shape changes;
 * never edit an existing step after release.
 */
const steps: Record<number, (s: Raw) => Raw> = {
  // 0 → 1: pre-release shape had no schemaVersion. Nothing to move.
  0: (s) => ({ ...s, schemaVersion: 1 }),
};

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export class MigrationError extends Error {}

export function migrate(input: unknown): ProgressState {
  if (!isObj(input)) throw new MigrationError('not an object');
  let s: Raw = { ...input };
  let v = typeof s.schemaVersion === 'number' ? s.schemaVersion : 0;
  if (v > SCHEMA_VERSION) throw new MigrationError(`schemaVersion ${v} is newer than this app`);
  while (v < SCHEMA_VERSION) {
    const step = steps[v];
    if (!step) throw new MigrationError(`no migration from version ${v}`);
    s = step(s);
    v = s.schemaVersion as number;
  }
  return normalize(s);
}

/** Fills missing fields with defaults and drops anything with the wrong type. */
function normalize(s: Raw): ProgressState {
  const base = emptyState();
  const settings = isObj(s.settings) ? s.settings : {};
  const pick = <K extends keyof typeof DEFAULT_SETTINGS>(k: K, allowed: readonly unknown[]) =>
    (allowed.includes(settings[k]) ? settings[k] : DEFAULT_SETTINGS[k]) as (typeof DEFAULT_SETTINGS)[K];
  return {
    ...base,
    lessons: isObj(s.lessons) ? (s.lessons as ProgressState['lessons']) : {},
    items: isObj(s.items) ? (s.items as ProgressState['items']) : {},
    rungs: isObj(s.rungs) ? (s.rungs as ProgressState['rungs']) : {},
    days: Array.isArray(s.days) ? s.days.filter((d): d is string => typeof d === 'string').slice(-60) : [],
    opened: Array.isArray(s.opened) ? s.opened.filter((d): d is string => typeof d === 'string') : [],
    settings: {
      uiLang: pick('uiLang', ['id', 'en']),
      explain: pick('explain', ['rung', 'id', 'en']),
      accent: pick('accent', ['gb', 'us']),
      rate: pick('rate', [0.75, 1]),
      sfx: pick('sfx', [true, false]),
      textSize: pick('textSize', [100, 115, 130]),
      theme: pick('theme', ['system', 'light', 'dark']),
      motion: pick('motion', ['system', 'reduce']),
    },
  };
}
