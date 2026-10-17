import { buildThemeScript } from '@ladder/core/lib/themeScript';
import { STORAGE_KEY } from '@/course/progress';

// Runs before first paint so theme, text size and motion never flash. "system" is honoured only
// from schema version 2 (see the 1 → 2 migration in course/progress.ts).
export const themeScript = buildThemeScript({ storageKey: STORAGE_KEY, systemThemeSince: 2 });
