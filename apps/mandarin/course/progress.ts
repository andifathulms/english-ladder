// Mandarin Ladder's progress shape (CLAUDE.md §7.4): its own key and schema, so learners keep their
// progress, its own settings (hanzi size, tone colours, word deck), and two state parts of its own:
// the word deck and the traced characters, stored after `opened` as the standalone app did.
import type { ProgressExtension } from '@ladder/core/lib/progress/config';
import type { ProgressState, Settings } from '@ladder/core/lib/progress/types';
import * as store from '@ladder/core/lib/progress/store';
import { validDeckCards, type DeckCardState } from '@/lib/deck/schedule';
import { reviewDeckCard, teachDeck } from '@ladder/core/lib/deck/progress';

/** Unchanged from the standalone app: existing learners keep their progress. */
export const STORAGE_KEY = 'mandarin-ladder:v1';
/** A fresh app at v1: no migrations of its own yet (the built-in 0 → 1 step only). */
export const SCHEMA_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  zhSize: 100,
  toneColours: 'rung',
  deckDaily: 10,
  deckFace: 'hanzi',
  theme: 'light',
  motion: 'system',
};

export const ALLOWED_SETTINGS = {
  zhSize: [100, 120, 140],
  toneColours: [true, false, 'rung'],
  deckDaily: [5, 10, 20],
  deckFace: ['hanzi', 'meaning', 'audio'],
} as const;

/** --paper of each theme, for the browser chrome (theme-color follows the in-app theme, DESIGN §3.3). */
export const THEME_COLOR = { light: '#F6F2E9', dark: '#170F0E' } as const;

export type Deck = Record<string, DeckCardState>;
export type TraceProgress = { bestMisses: number; lastSeen: number };
export type Traces = Record<string, TraceProgress>;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

const validDeck = (d: unknown): Deck => validDeckCards(d);

const validTraces = (t: unknown): Traces =>
  isObj(t) ? (Object.fromEntries(Object.entries(t).filter(([, v]) => isObj(v) && typeof v.bestMisses === 'number')) as Traces) : {};

export const EXTENSIONS: Record<string, ProgressExtension> = {
  deck: { empty: () => ({}), validate: validDeck },
  traces: { empty: () => ({}), validate: validTraces },
};

/** A completed lesson's HSK words join the word deck as learned (PRD §5.8). */
export function onCompleteLesson(s: ProgressState, _lessonId: string, data: unknown): ProgressState {
  const wordIds = (data as { wordIds?: string[] } | undefined)?.wordIds ?? [];
  return teachDeck(s, 'deck', wordIds);
}

/** A word-deck review: Ingat (remembered) or Belum ingat. */
export function reviewCard(wordId: string, remembered: boolean) {
  reviewDeckCard('deck', wordId, remembered);
}

/** The best (fewest-miss) trace of a character. */
export function recordTrace(char: string, misses: number) {
  store.updateExt<Traces>('traces', (t) => ({
    ...t,
    [char]: { bestMisses: Math.min(t[char]?.bestMisses ?? Infinity, misses), lastSeen: Date.now() },
  }));
}
