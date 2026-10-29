import { buildThemeScript } from '@ladder/core/lib/themeScript';
import { STORAGE_KEY, THEME_COLOR } from '@/course/progress';

// Runs before first paint so theme, text size and motion never flash; the browser's theme-color
// follows the in-app theme.
export const themeScript = buildThemeScript({ storageKey: STORAGE_KEY, themeColor: THEME_COLOR });
