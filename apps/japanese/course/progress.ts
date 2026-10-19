// Japanese Ladder's progress shape (CLAUDE.md §7.4): its own key and schema, its own settings (Japanese
// text size, pitch marks, romaji in My words, word decks), and three state parts of its own: the word
// deck, the kanji deck and traced characters, stored after `opened`.
import type { ProgressExtension } from '@ladder/core/lib/progress/config';
import type { ProgressState, Settings } from '@ladder/core/lib/progress/types';
import { validDeckCards } from '@ladder/core/lib/deck/schedule';
import { teachDeck } from '@ladder/core/lib/deck/progress';
import * as store from '@ladder/core/lib/progress/store';

export const STORAGE_KEY = 'japanese-ladder:v1';
/** A fresh app at v1: no migrations of its own yet (the built-in 0 → 1 step only). */
export const SCHEMA_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  uiLang: 'id',
  voice: 'female',
  rate: 1,
  sfx: true,
  textSize: 100,
  jaSize: 100,
  pitchMarks: true,
  romajiInWords: false,
  deckDaily: 10,
  deckFace: 'kanji',
  theme: 'light',
  motion: 'system',
};

export const ALLOWED_SETTINGS = {
  jaSize: [100, 120, 140],
  pitchMarks: [true, false],
  romajiInWords: [true, false],
  deckDaily: [5, 10, 20],
  deckFace: ['kanji', 'meaning', 'audio'],
} as const;

/** --paper of each theme, for the browser chrome (theme-color follows the in-app theme). */
export const THEME_COLOR = { light: '#F4F1EA', dark: '#121115' } as const;

export type TraceProgress = { bestMisses: number; lastSeen: number };
export type Traces = Record<string, TraceProgress>;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Deck cards (core deck engine): malformed entries dropped, missing fields filled. */
const validCards = (d: unknown) => validDeckCards(d);

const validTraces = (t: unknown): Traces =>
  isObj(t) ? (Object.fromEntries(Object.entries(t).filter(([, v]) => isObj(v) && typeof v.bestMisses === 'number')) as Traces) : {};

export const EXTENSIONS: Record<string, ProgressExtension> = {
  deck: { empty: () => ({}), validate: validCards },
  kanjiDeck: { empty: () => ({}), validate: validCards },
  traces: { empty: () => ({}), validate: validTraces },
};

/** The best (fewest-miss) trace of a character. */
export function recordTrace(char: string, misses: number) {
  store.updateExt<Traces>('traces', (t) => ({
    ...t,
    [char]: { bestMisses: Math.min(t[char]?.bestMisses ?? Infinity, misses), lastSeen: Date.now() },
  }));
}

/** A completed lesson's words and kanji join Kartu kata and Kartu kanji as learned (PRD §5.7). */
export function onCompleteLesson(s: ProgressState, _lessonId: string, data: unknown): ProgressState {
  const d = data as { wordIds?: string[]; kanjiIds?: string[] } | undefined;
  return teachDeck(teachDeck(s, 'deck', d?.wordIds ?? []), 'kanjiDeck', d?.kanjiIds ?? []);
}
