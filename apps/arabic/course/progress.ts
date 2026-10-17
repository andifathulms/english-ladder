// Arabic Ladder's progress shape (CLAUDE.md §7.5): its own key and schema, so learners keep their
// progress, and its own settings (Arabic size; no explanation language, no accent).
import type { Settings } from '@ladder/core/lib/progress/types';

/** Unchanged from the standalone app: existing learners keep their progress. */
export const STORAGE_KEY = 'arabic-ladder:v1';
/** A fresh app at v1: no migrations of its own yet (the built-in 0 → 1 step only). */
export const SCHEMA_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  arabicSize: 100,
  theme: 'light',
  motion: 'system',
};

export const ALLOWED_SETTINGS = { arabicSize: [100, 120, 140] } as const;

/** --paper of each theme, for the browser chrome (theme-color follows the in-app theme, DESIGN §3.3). */
export const THEME_COLOR = { light: '#F6F2E9', dark: '#0B1914' } as const;
