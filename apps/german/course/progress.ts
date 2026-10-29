// German Ladder's progress shape (PRD §8): its own key and schema, its own settings (spelling
// strictness, case colours, the word deck), and the word deck as a state part of its own.
import type { ProgressExtension } from '@ladder/core/lib/progress/config';
import type { ProgressState, Settings } from '@ladder/core/lib/progress/types';
import { validDeckCards } from '@ladder/core/lib/deck/schedule';
import { teachDeck } from '@ladder/core/lib/deck/progress';

export const STORAGE_KEY = 'german-ladder:v1';
/** A fresh app at v1: no migrations of its own yet (the built-in 0 → 1 step only). */
export const SCHEMA_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  spellingStrict: 'rung',
  caseColours: 'rung',
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
  spellingStrict: ['rung', 'always'],
  caseColours: ['rung', 'on', 'off'],
  deckDaily: [5, 10, 20],
  deckFace: ['word', 'meaning', 'audio'],
} as const;

/** --paper of each theme, for the browser chrome (theme-color follows the in-app theme). */
export const THEME_COLOR = { light: '#F4F3EE', dark: '#121718' } as const;

export const EXTENSIONS: Record<string, ProgressExtension> = {
  deck: { empty: () => ({}), validate: (d) => validDeckCards(d) },
};

/** A completed lesson's words join Kartu kata as learned (PRD §5.7). */
export function onCompleteLesson(s: ProgressState, _lessonId: string, data: unknown): ProgressState {
  const d = data as { wordIds?: string[] } | undefined;
  return teachDeck(s, 'deck', d?.wordIds ?? []);
}
