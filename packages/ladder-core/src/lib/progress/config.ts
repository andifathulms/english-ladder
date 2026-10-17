import type { Settings } from './types';

/** Raw stored state, before migration. */
export type RawState = Record<string, unknown> & { schemaVersion?: unknown };

/** Upgrades raw state from version `v` to `v + 1`. Never edit a step after release. */
export type MigrationStep = (s: RawState) => RawState;

/** Optional parts of the progress state a course turns on (see ProgressState). */
export type ProgressFeatures = {
  /** `capstones` record and completeCapstone(). */
  capstones?: boolean;
  /** `placement` record, applyPlacement() and `rungs[id].via`. */
  placement?: boolean;
};

/** Everything the store needs from the course: where it lives and how its shape evolves. */
export type ProgressConfig = {
  storageKey: string;
  schemaVersion: number;
  /** Steps keyed by the version they upgrade from. Step 0 (no schemaVersion) is built in. */
  migrations: Record<number, MigrationStep>;
  /** Default settings, in the key order they are stored. */
  defaults: Settings;
  /** Allowed values per setting; values outside the list fall back to the default. */
  allowed: Record<string, readonly unknown[]>;
  features: ProgressFeatures;
};

/** Allowed values for the settings every course has. */
export const CORE_ALLOWED: Record<string, readonly unknown[]> = {
  uiLang: ['id', 'en'],
  voice: ['female', 'male'],
  rate: [0.75, 1],
  sfx: [true, false],
  textSize: [100, 115, 130],
  theme: ['system', 'light', 'dark'],
  motion: ['system', 'reduce'],
};

export const CORE_DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  theme: 'light',
  motion: 'system',
};

const NEUTRAL: ProgressConfig = {
  storageKey: 'ladder:v1',
  schemaVersion: 1,
  migrations: {},
  defaults: CORE_DEFAULT_SETTINGS,
  allowed: CORE_ALLOWED,
  features: {},
};

let current: ProgressConfig = NEUTRAL;

/**
 * Points the store at a course. Call once, before the first read (the app's providers do this at
 * module load). Tests may call it again after store.__resetForTests().
 */
export function configureProgress(c: Partial<ProgressConfig> & Pick<ProgressConfig, 'storageKey'>) {
  current = {
    ...NEUTRAL,
    ...c,
    allowed: { ...CORE_ALLOWED, ...(c.allowed ?? {}) },
    features: { ...(c.features ?? {}) },
  };
}

export function progressConfig(): ProgressConfig {
  return current;
}
