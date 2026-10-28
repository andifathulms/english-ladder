'use client';

import { useRef, useState } from 'react';
import { DeckHome } from '@ladder/core/components/deck/DeckHome';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { IconPlay } from '@ladder/core/components/ui/Icon';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { article } from '@/lib/es/agree';
import { foldAccents } from '@/lib/es/text';
import type { SpanishKey } from '@/i18n/overrides';
import { GenderChip } from './GenderChip';

/** One word of Kartu kata, as the words page hands it to the client (course/decks.ts). */
export type EsDeckWord = {
  id: string;
  es: string;
  /** Indonesian meaning. */
  mean: string;
  en?: string;
  pos: string;
  gender?: 'm' | 'f' | 'mf';
  el?: boolean;
  plural?: string;
  es_es?: string;
  /** The lesson whose glossary teaches it. */
  lesson?: string;
  ex?: { es: string; id: string };
  /** Frequency rank (FrequencyWords, OpenSubtitles 2018). */
  rank?: number;
};

type Data = { words: { rung: string; name: string; level: string; words: EsDeckWord[] }[] };

/** A noun with its article on the card: la casa, el agua, el/la estudiante. */
const withArticle = (w: EsDeckWord) =>
  w.pos === 'noun' && w.gender ? `${w.gender === 'mf' ? 'el/la' : article(w.gender, 'sg', true, { el: w.el })} ${w.es}` : w.es;

/** The study card frame (as the siblings'): front, flip, back; then Belum ingat / Ingat. Swipe grades too. */
function CardFrame({ id, front, back, onGrade }: { id: string; front: React.ReactNode; back: React.ReactNode; onGrade: (r: boolean) => void }) {
  const { t } = useT<SpanishKey>();
  const [flipped, setFlipped] = useState(false);
  const start = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const up = () => {
    if (start.current === null) return;
    start.current = null;
    if (Math.abs(dx) > 80) onGrade(dx > 0);
    setDx(0);
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        className="card flex min-h-[320px] flex-col items-center justify-center gap-4 p-6 text-center"
        style={{ transform: dx ? `translateX(${dx}px) rotate(${dx / 30}deg)` : undefined, transition: dx ? 'none' : 'transform var(--m-base-d) var(--ease)', touchAction: flipped ? 'pan-y' : undefined }}
        onPointerDown={(e) => {
          if (flipped) start.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (start.current !== null) setDx(e.clientX - start.current);
        }}
        onPointerUp={up}
        onPointerCancel={up}
        data-deck-card={id}
      >
        {!flipped ? (
          <>
            {front}
            <button type="button" className="btn btn-ghost" onClick={() => setFlipped(true)}>
              {t('deck.flip')}
            </button>
          </>
        ) : (
          <div className="fade-in flex w-full flex-col items-center gap-3" data-back>
            {back}
          </div>
        )}
      </div>
      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => onGrade(false)}>
            {t('deck.again')}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => onGrade(true)}>
            {t('deck.know')}
          </button>
        </div>
      )}
    </div>
  );
}

/** A Kartu kata card: the word (or its meaning, or its sound) in front; gender, plural, Spain's word and an example behind. */
export function WordCard({ word, onGrade }: { word: EsDeckWord; onGrade: (r: boolean) => void }) {
  const { t, lang } = useT<SpanishKey>();
  const { deckFace } = useSettings();
  const play = usePlay();
  const shown = withArticle(word);
  const meaning = lang === 'en' && word.en ? word.en : word.mean;
  const front =
    deckFace === 'meaning' ? (
      <p lang={lang === 'en' && word.en ? 'en' : 'id'} className="id-text text-center text-h2">
        {meaning}
      </p>
    ) : deckFace === 'audio' ? (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          void play(shown);
        }}
        aria-label={t('deck.playWord')}
        className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-accent text-accent-ink"
        data-play
      >
        <IconPlay size={36} />
      </button>
    ) : (
      <span lang="es-419" className="font-display text-[2.5rem] leading-tight">
        {shown}
      </span>
    );
  const back = (
    <>
      <div className="flex items-center gap-3">
        <span lang="es-419" className="font-display text-[2.25rem] leading-tight">
          {shown}
        </span>
        <PlayButton text={shown} onPlay={() => void play(shown)} />
      </div>
      <p className="flex flex-wrap items-center justify-center gap-2">
        {word.gender && <GenderChip gender={word.gender} el={word.el} />}
        {word.plural && (
          <span lang="es-419" className="text-small text-muted">
            {t('words.plural')} {word.plural}
          </span>
        )}
      </p>
      <p lang={lang === 'en' && word.en ? 'en' : 'id'} className="id-text text-body">
        {meaning}
      </p>
      {word.es_es && (
        <p className="flex items-baseline gap-2 text-small">
          <span className="label text-es">{t('lesson.spainEs')}</span>
          <span lang="es-ES">{word.es_es}</span>
        </p>
      )}
      <span className="label rounded-sm bg-paper-2 px-2 py-[2px] text-muted">{t('deck.level', { level: 'A1' })}</span>
      {word.ex && (
        <div className="w-full rounded-md bg-paper-2 p-3 text-start">
          <Sentence en={word.ex.es} id={word.ex.id} size="body" />
        </div>
      )}
    </>
  );
  return <CardFrame id={word.id} front={front} back={back} onGrade={onGrade} />;
}

/** The Kartu kata tab: core's deck home over the A1 deck. */
export function WordDeckPanel({ data }: { data: unknown }) {
  const { t } = useT<SpanishKey>();
  const d = (data as Data | undefined) ?? { words: [] };
  if (!d.words.length) return <p className="max-w-measure text-muted">{t('deck.soon')}</p>;
  const decks = d.words.map((x) => ({ rung: x.rung, name: x.name, title: t('deck.title', { level: x.level }), words: x.words }));
  return (
    <DeckHome
      decks={decks}
      stateKey="deck"
      match={(w, q) => {
        const n = foldAccents(q.trim().toLowerCase());
        return !n || [w.es, w.mean, w.en ?? '', w.es_es ?? ''].some((x) => foldAccents(x.toLowerCase()).includes(n));
      }}
      RowText={({ word }) => (
        <>
          <span lang="es-419" className="font-display text-[1.125rem]">
            {withArticle(word)}
          </span>
          <span className="id-text text-small">{word.mean}</span>
        </>
      )}
      audio={(w) => withArticle(w)}
      Card={WordCard}
    />
  );
}
