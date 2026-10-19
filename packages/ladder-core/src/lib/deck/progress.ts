// Deck state in progress (C7): each deck is a progress extension named by the course ('deck',
// 'kanjiDeck', …), a map of card id → DeckCardState.
import * as store from '../progress/store';
import type { ProgressState } from '../progress/types';
import { dayNumber, review, teach, type DeckCardState } from './schedule';

export type DeckCards = Record<string, DeckCardState>;

/** A review: Ingat (remembered) or Belum ingat. Counts as practice for the week strip. */
export function reviewDeckCard(key: string, id: string, remembered: boolean) {
  store.updateExt<DeckCards>(key, (d) => ({ ...d, [id]: review(d[id], remembered, dayNumber()) }), { practiced: true });
}

/** Cards a completed lesson taught join the deck as learned (used inside onCompleteLesson). */
export function teachDeck(s: ProgressState, key: string, ids: string[], today = dayNumber()): ProgressState {
  const deck = { ...(s[key] as DeckCards) };
  for (const id of ids) deck[id] = teach(deck[id], today);
  return { ...s, [key]: deck };
}
