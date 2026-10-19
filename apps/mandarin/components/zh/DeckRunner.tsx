'use client';

import { DeckRunner as CoreDeckRunner } from '@ladder/core/components/deck/DeckRunner';
import { useSettings } from '@ladder/core/components/ProgressProvider';
import { DeckCard, type DeckWord } from './DeckCard';

/** Mandarin's study card for the core deck: the front follows the Settings card face. */
export function MandarinDeckCard({ word, onGrade }: { word: DeckWord; onGrade: (remembered: boolean) => void }) {
  const { deckFace } = useSettings();
  return <DeckCard word={word} face={deckFace as 'hanzi' | 'meaning' | 'audio'} onGrade={onGrade} />;
}

type Props = { name: string; queue: DeckWord[]; onClose: () => void };

/** A deck session (core DeckRunner) over the word deck. */
export function DeckRunner({ name, queue, onClose }: Props) {
  return <CoreDeckRunner name={name} queue={queue} onClose={onClose} stateKey="deck" Card={MandarinDeckCard} />;
}
