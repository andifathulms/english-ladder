// English Ladder's progress shape: storage key, schema version, migrations and its own settings.
import type { MigrationStep } from '@ladder/core/lib/progress/config';
import { CORE_DEFAULT_SETTINGS } from '@ladder/core/lib/progress/config';
import type { Settings } from '@ladder/core/lib/progress/types';

export const STORAGE_KEY = 'english-ladder:v1';
export const SCHEMA_VERSION = 2;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export const migrations: Record<number, MigrationStep> = {
  // 1 → 2: the bright cream theme became the default. "system" was the untouched old default,
  // so it moves to "light" once; dark stays one tap away in Settings.
  1: (s) => {
    const settings = isObj(s.settings) ? s.settings : {};
    return {
      ...s,
      schemaVersion: 2,
      settings: settings.theme === 'system' || settings.theme === undefined ? { ...settings, theme: 'light' } : settings,
    };
  },
};

/** English adds the explanation language and the accent; key order is the stored order. */
export const DEFAULT_SETTINGS: Settings = {
  uiLang: CORE_DEFAULT_SETTINGS.uiLang,
  explain: 'rung',
  accent: 'gb',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  theme: 'light',
  motion: 'system',
};

export const ALLOWED_SETTINGS = { explain: ['rung', 'id', 'en'], accent: ['gb', 'us'] } as const;
