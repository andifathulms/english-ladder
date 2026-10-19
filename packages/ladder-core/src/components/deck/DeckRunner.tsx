'use client';

import { useState } from 'react';
import { reviewDeckCard } from '../../lib/deck/progress';
import { IconClose } from '../ui/Icon';
import { useT } from '../ProgressProvider';

/** The course's study card: shows the card, and calls onGrade with Ingat (true) or Belum ingat. */
export type DeckCardSlot<W> = React.ComponentType<{ word: W; onGrade: (remembered: boolean) => void }>;

type Props<W extends { id: string }> = {
  name: string;
  queue: W[];
  onClose: () => void;
  stateKey: string;
  prefix?: string;
  Card: DeckCardSlot<W>;
};

/** A deck session: the day's due cards then new ones, one at a time; ends with a one-line summary. */
export function DeckRunner<W extends { id: string }>({ name, queue, onClose, stateKey, prefix = 'deck', Card }: Props<W>) {
  const { t } = useT<string>();
  const [i, setI] = useState(0);
  const [known, setKnown] = useState(0);
  const done = i >= queue.length;
  const k = (s: string) => `${prefix}.${s}`;

  const grade = (remembered: boolean) => {
    reviewDeckCard(stateKey, queue[i].id, remembered);
    if (remembered) setKnown((n) => n + 1);
    setI(i + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-col gap-4" data-deck-runner>
      <div className="flex items-center justify-between gap-3">
        <span className="label text-muted">
          {name} · <span className="tnum">{Math.min(i + 1, queue.length)} / {queue.length}</span>
        </span>
        <button type="button" onClick={onClose} aria-label={t(k('close'))} className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-ink hover:bg-paper-2">
          <IconClose />
        </button>
      </div>
      {done ? (
        <div className="card flex flex-col items-start gap-3 p-5" aria-live="polite">
          <p className="font-display text-h2 font-medium tnum">{t(k('summary'), { k: known, n: queue.length })}</p>
          <p className="text-muted">{t(k('done'))}</p>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t(k('back'))}
          </button>
        </div>
      ) : (
        <Card key={queue[i].id} word={queue[i]} onGrade={grade} />
      )}
    </div>
  );
}
