import { progressConfig, type MigrationStep, type RawState } from './config';
import { emptyState } from './defaults';
import type { ProgressState, Settings } from './types';

/** 0 → 1: pre-release shape had no schemaVersion. Nothing to move. Every course starts here. */
const BASE_STEPS: Record<number, MigrationStep> = {
  0: (s) => ({ ...s, schemaVersion: 1 }),
};

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export class MigrationError extends Error {}

/** Upgrades stored state one version at a time, using the course's own steps. */
export function migrate(input: unknown): ProgressState {
  if (!isObj(input)) throw new MigrationError('not an object');
  const { schemaVersion, migrations } = progressConfig();
  const steps = { ...BASE_STEPS, ...migrations };
  let s: RawState = { ...input };
  let v = typeof s.schemaVersion === 'number' ? s.schemaVersion : 0;
  if (v > schemaVersion) throw new MigrationError(`schemaVersion ${v} is newer than this app`);
  while (v < schemaVersion) {
    const step = steps[v];
    if (!step) throw new MigrationError(`no migration from version ${v}`);
    s = step(s);
    v = s.schemaVersion as number;
  }
  return normalize(s);
}

/** Fills missing fields with defaults and drops anything with the wrong type. */
function normalize(s: RawState): ProgressState {
  const base = emptyState();
  const { defaults, allowed, features } = progressConfig();
  const raw = isObj(s.settings) ? s.settings : {};
  const settings = {} as Settings;
  for (const k of Object.keys(defaults)) {
    const ok = allowed[k];
    (settings as Record<string, unknown>)[k] = ok && ok.includes(raw[k]) ? raw[k] : defaults[k];
  }
  return {
    ...base,
    lessons: isObj(s.lessons) ? (s.lessons as ProgressState['lessons']) : {},
    items: isObj(s.items) ? (s.items as ProgressState['items']) : {},
    rungs: isObj(s.rungs) ? (s.rungs as ProgressState['rungs']) : {},
    ...(features.capstones ? { capstones: isObj(s.capstones) ? (s.capstones as NonNullable<ProgressState['capstones']>) : {} } : {}),
    ...(features.placement ? { placement: validPlacement(s.placement) } : {}),
    days: Array.isArray(s.days) ? s.days.filter((d): d is string => typeof d === 'string').slice(-60) : [],
    opened: Array.isArray(s.opened) ? s.opened.filter((d): d is string => typeof d === 'string') : [],
    settings,
  };
}

function validPlacement(v: unknown): ProgressState['placement'] {
  if (!isObj(v)) return null;
  const ok =
    typeof v.score === 'number' && typeof v.total === 'number' && typeof v.date === 'string' && typeof v.result === 'string';
  if (!ok) return null;
  const missed = Array.isArray(v.missed) ? v.missed.filter((x): x is string => typeof x === 'string') : [];
  return { ...(v as NonNullable<ProgressState['placement']>), missed };
}
