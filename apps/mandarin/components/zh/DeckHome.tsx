'use client';

import { useMemo } from 'react';
import { DeckHome as CoreDeckHome } from '@ladder/core/components/deck/DeckHome';
import { matchesEntry as matchesWord } from '@/components/WordsRow';
import { MandarinDeckCard } from './DeckRunner';
import type { DeckWord } from './DeckCard';
import { ZhText } from './ZhText';
import { Pinyin } from './Pinyin';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import type { MandarinKey } from '@/i18n/overrides';

export type Deck = { rung: string; name: string; hsk: string; words: DeckWord[] };

/** A list row: hanzi, tone-coloured pinyin, the meaning. */
function Row({ word: w }: { word: DeckWord }) {
  const { toneColours } = useSettings();
  return (
    <>
      <ZhText face="ui" className="text-zh-small">
        {w.zh}
      </ZhText>
      <Pinyin text={w.py} tones={toneColours !== false} className="text-small" />
      <span lang={w.meanLang} className="id-text text-small">
        {w.mean}
      </span>
    </>
  );
}

const match = (w: DeckWord, q: string) => matchesWord({ zh: w.zh, py: w.py, id: w.mean }, q);
const audio = (w: DeckWord) => w.zh;

/** Kartu kata (DESIGN §6.8): the core deck home over HSK word decks. */
export function DeckHome({ decks }: { decks: Deck[] }) {
  const { t } = useT<MandarinKey>();
  const titled = useMemo(() => decks.map((d) => ({ ...d, title: t('deck.title', { hsk: d.hsk }) })), [decks, t]);
  return <CoreDeckHome decks={titled} stateKey="deck" match={match} RowText={Row} audio={audio} Card={MandarinDeckCard} />;
}
