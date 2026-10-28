// Spanish Ladder's progress shape (PRD §8): its own key and schema, its own settings (the variety of
// speech audio, accent strictness, the word deck), and the word deck as a state part of its own.
import type { ProgressExtension } from '@ladder/core/lib/progress/config';
import type { ProgressState, Settings } from '@ladder/core/lib/progress/types';
import { validDeckCards } from '@ladder/core/lib/deck/schedule';
import { teachDeck } from '@ladder/core/lib/deck/progress';

export const STORAGE_KEY = 'spanish-ladder:v1';
/** A fresh app at v1: no migrations of its own yet (the built-in 0 → 1 step only). */
export const SCHEMA_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  variety: 'latam',
  accentStrict: 'rung',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  deckDaily: 10,
  deckFace: 'word',
  theme: 'light',
  motion: 'system',
};

export const ALLOWED_SETTINGS = {
  variety: ['latam', 'es'],
  accentStrict: ['rung', 'always'],
  deckDaily: [5, 10, 20],
  deckFace: ['word', 'meaning', 'audio'],
} as const;

/** --paper of each theme, for the browser chrome (theme-color follows the in-app theme). */
export const THEME_COLOR = { light: '#F6F1E7', dark: '#15120F' } as const;

export const EXTENSIONS: Record<string, ProgressExtension> = {
  deck: { empty: () => ({}), validate: (d) => validDeckCards(d) },
};

/** A completed lesson's words join Kartu kata as learned (PRD §5.7). */
export function onCompleteLesson(s: ProgressState, _lessonId: string, data: unknown): ProgressState {
  const d = data as { wordIds?: string[] } | undefined;
  return teachDeck(s, 'deck', d?.wordIds ?? []);
}
