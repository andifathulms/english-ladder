'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { DeckHome } from '@ladder/core/components/deck/DeckHome';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { TraceCheck } from '@ladder/core/components/strokes/TraceCheck';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { IconCards, IconChevron, IconPlay } from '@ladder/core/components/ui/Icon';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import { recordTrace } from '@/course/progress';
import { JaSentence } from './ja/JaSentence';
import { PitchLineMini } from '@/visuals/PitchLineMini';

/** One word of Kartu kata, as the words page hands it to the client (course/decks.ts). */
export type JaDeckWord = {
  id: string;
  /** The list's spelling (kanji where it has them) and the reading. */
  ja: string;
  kana: string;
  /** Indonesian from a lesson glossary where there is one, else the list's English (meanLang says which). */
  mean: string;
  meanLang: 'id' | 'en';
  jlpt: string;
  lesson?: string;
  /** A lesson example that uses the word (ruby markup). */
  ex?: { ja: string; id: string };
  pitch?: number;
};

/** One kanji of Kartu kanji (KANJIDIC2 readings; Indonesian meaning from kanji-id.yaml where written). */
export type JaKanjiDeckCard = {
  id: string;
  char: string;
  strokes: number;
  /** On readings in katakana; kun in hiragana with okurigana after a dot (た.べる). */
  on: string[];
  kun: string[];
  meaning: { text: string; lang: 'id' | 'en' };
  jlpt: string;
  examples: { ja: string; kana: string; en: string }[];
  lesson?: string;
};

type Deck<W> = { rung: string; name: string; level: string; words: W[] };
type Data = { words: Deck<JaDeckWord>[]; kanji: Deck<JaKanjiDeckCard>[] };
type Face = 'kanji' | 'meaning' | 'audio';

const norm = (s: string) => s.toLowerCase().normalize('NFKC');
/** Kun reading shown with its okurigana in brackets: た.べる → た(べる). */
export const kunShown = (r: string) => (r.includes('.') ? `${r.split('.')[0]}(${r.split('.')[1]})` : r);

/**
 * The study card frame (DESIGN §6.8, as Mandarin Ladder's): the front, tap to flip, the back; then two
 * grades, Belum ingat and Ingat. On phones a swipe left or right grades too.
 */
function CardFrame({ id, front, back, onGrade, prefix }: { id: string; front: React.ReactNode; back: React.ReactNode; onGrade: (r: boolean) => void; prefix: string }) {
  const { t } = useT<string>();
  const [flipped, setFlipped] = useState(false);
  const start = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const onPointerUp = () => {
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
          if (flipped && !(e.target as HTMLElement).closest('[data-trace]')) start.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (start.current !== null) setDx(e.clientX - start.current);
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-deck-card={id}
      >
        {!flipped ? (
          <>
            {front}
            <button type="button" className="btn btn-ghost" onClick={() => setFlipped(true)}>
              {t(`${prefix}.flip`)}
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
            {t(`${prefix}.again`)}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => onGrade(true)}>
            {t(`${prefix}.know`)}
          </button>
        </div>
      )}
    </div>
  );
}

function AudioFront({ text, label }: { text: string; label: string }) {
  const play = usePlay();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        void play(text);
      }}
      aria-label={label}
      className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-accent text-accent-ink"
      data-play
    >
      <IconPlay size={36} />
    </button>
  );
}

/** A Kartu kata card: the word (or its meaning, or its sound) on the front; reading, meaning, pitch and an example behind. */
export function WordCard({ word, onGrade }: { word: JaDeckWord; onGrade: (r: boolean) => void }) {
  const { t } = useT<JapaneseKey>();
  const { deckFace, pitchMarks } = useSettings();
  const play = usePlay();
  const face = deckFace as Face;
  const front =
    face === 'meaning' ? (
      <p lang={word.meanLang} className="id-text text-center text-h2">
        {word.mean}
      </p>
    ) : face === 'audio' ? (
      <AudioFront text={word.kana} label={t('deck.playWord')} />
    ) : (
      <span lang="ja" className="ja font-ja text-[2.75rem] leading-tight">
        {word.ja}
      </span>
    );
  const back = (
    <>
      <div className="flex items-center gap-3">
        <span className="flex flex-col items-center">
          {word.ja !== word.kana && (
            <span lang="ja" className="ja font-ja-ui text-ja-small text-muted">
              {word.kana}
            </span>
          )}
          <span lang="ja" className="ja font-ja text-[2.5rem] leading-tight">
            {word.ja}
          </span>
        </span>
        <PlayButton text={word.kana} onPlay={() => void play(word.kana)} />
      </div>
      {pitchMarks !== false && word.pitch !== undefined && <PitchLineMini kana={word.kana} accent={word.pitch} label={t('deck.pitch', { n: word.pitch })} />}
      <p lang={word.meanLang} className="id-text text-body">
        {word.mean}
      </p>
      <p className="flex flex-wrap justify-center gap-2">
        <span className="label rounded-sm bg-paper-2 px-2 py-[2px] text-muted">{t('deck.level', { level: word.jlpt })}</span>
      </p>
      {word.ex && (
        <div className="w-full rounded-md bg-paper-2 p-3 text-start">
          <JaSentence ja={word.ex.ja} id={word.ex.id} size="body" />
        </div>
      )}
    </>
  );
  return <CardFrame id={word.id} front={front} back={back} onGrade={onGrade} prefix="deck" />;
}

/**
 * A Kartu kanji card (DESIGN §6.8): the kanji on the practice grid; behind it its meaning, on and kun
 * readings, three example words, the stroke order and a tracing card.
 */
export function KanjiDeckCard({ word: k, onGrade }: { word: JaKanjiDeckCard; onGrade: (r: boolean) => void }) {
  const { t, lang } = useT<JapaneseKey>();
  const { deckFace } = useSettings();
  const [traced, setTraced] = useState<number | null>(null);
  const [tracing, setTracing] = useState(false);
  const face = deckFace as Face;
  const first = k.examples[0];
  const front =
    face === 'meaning' ? (
      <p lang={k.meaning.lang} className="id-text text-center text-h2">
        {k.meaning.text}
      </p>
    ) : face === 'audio' && first ? (
      <AudioFront text={first.kana} label={t('deck.playWord')} />
    ) : (
      <span lang="ja" className="ja practice-grid flex h-[140px] w-[140px] items-center justify-center rounded-md bg-paper-2 font-ja text-ja-glyph leading-none">
        {k.char}
      </span>
    );
  const back = (
    <>
      <span lang="ja" className="ja font-ja text-ja-glyph leading-none">
        {k.char}
      </span>
      <p lang={k.meaning.lang} className="id-text text-body">
        {k.meaning.text}
      </p>
      <dl className="grid w-full grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-start text-small">
        {k.on.length > 0 && (
          <>
            <dt className="label text-muted">{t('kanji.on')}</dt>
            <dd lang="ja" className="ja font-ja-ui">
              {k.on.join('、')}
            </dd>
          </>
        )}
        {k.kun.length > 0 && (
          <>
            <dt className="label text-muted">{t('kanji.kun')}</dt>
            <dd lang="ja" className="ja font-ja-ui">
              {k.kun.map(kunShown).join('、')}
            </dd>
          </>
        )}
        <dt className="label text-muted">{t('kanji.strokes')}</dt>
        <dd className="tnum">{k.strokes}</dd>
      </dl>
      {k.examples.length > 0 && (
        <ul className="flex w-full flex-col gap-1 rounded-md bg-paper-2 p-3 text-start">
          {k.examples.map((e) => (
            <li key={e.ja} className="flex flex-wrap items-baseline gap-x-2">
              <span lang="ja" className="ja font-ja text-ja-body">
                {e.ja}
              </span>
              <span lang="ja" className="ja font-ja-ui text-small text-muted">
                {e.kana}
              </span>
              <span lang="en" className="text-small text-muted">
                {e.en}
              </span>
            </li>
          ))}
        </ul>
      )}
      <StrokeOrder char={k.char} size={180} lang={lang} />
      <section className="flex w-full flex-col items-center gap-2" data-trace aria-label={t('kanji.traceTitle')}>
        {!tracing ? (
          <button type="button" className="btn btn-quiet" onClick={() => setTracing(true)}>
            {t('kanji.trace')}
          </button>
        ) : (
          <>
            <TraceCheck
              item={{ char: k.char, guide: 'on' }}
              solved={traced !== null}
              onDone={(misses) => {
                recordTrace(k.char, misses);
                setTraced(misses);
              }}
            />
            {traced !== null && (
              <p className="text-small text-good" aria-live="polite">
                {traced === 0 ? t('kanji.traceClean') : t('kanji.traceDone', { n: traced })}
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
  return <CardFrame id={k.id} front={front} back={back} onGrade={onGrade} prefix="kanjiDeck" />;
}

const matchWord = (w: JaDeckWord, q: string) => !q.trim() || [w.ja, w.kana, w.mean].some((s) => norm(s).includes(norm(q.trim())));
const matchKanji = (k: JaKanjiDeckCard, q: string) => !q.trim() || [k.char, k.meaning.text, ...k.on, ...k.kun].some((s) => norm(s).includes(norm(q.trim())));

function WordRow({ word: w }: { word: JaDeckWord }) {
  return (
    <>
      <span lang="ja" className="ja font-ja text-ja-body">
        {w.ja}
      </span>
      {w.ja !== w.kana && (
        <span lang="ja" className="ja font-ja-ui text-small text-muted">
          {w.kana}
        </span>
      )}
      <span lang={w.meanLang} className="id-text text-small">
        {w.mean}
      </span>
    </>
  );
}

function KanjiRow({ word: k }: { word: JaKanjiDeckCard }) {
  return (
    <>
      <span lang="ja" className="ja font-ja text-ja-body">
        {k.char}
      </span>
      <span lang={k.meaning.lang} className="id-text text-small">
        {k.meaning.text}
      </span>
    </>
  );
}

/** The Kartu kata tab: the core deck home over the levels' word decks. */
export function WordDeckPanel({ data }: { data: unknown }) {
  const { t } = useT<JapaneseKey>();
  const d = data as Data | undefined;
  const decks = useMemo(() => (d?.words ?? []).map((x) => ({ ...x, title: t('deck.title', { level: x.level }) })), [d, t]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{t('words.estimate')}</p>
      <DeckHome decks={decks} stateKey="deck" match={matchWord} RowText={WordRow} audio={(w) => w.kana} Card={WordCard} />
    </div>
  );
}

/** The Kartu kanji tab: the kanji decks, with stroke order and tracing on every card. */
export function KanjiDeckPanel({ data }: { data: unknown }) {
  const { t } = useT<JapaneseKey>();
  const d = data as Data | undefined;
  const decks = useMemo(() => (d?.kanji ?? []).map((x) => ({ ...x, title: t('kanjiDeck.title', { level: x.level }) })), [d, t]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{t('words.estimate')}</p>
      <DeckHome decks={decks} stateKey="kanjiDeck" prefix="kanjiDeck" match={matchKanji} RowText={KanjiRow} audio={(k) => k.examples[0]?.kana ?? k.char} Card={KanjiDeckCard} />
    </div>
  );
}

/** Rung pages of a level with decks: links to Kartu kata and Kartu kanji, after the capstones. */
export function DeckLinks({ data }: { data: unknown }) {
  const { t } = useT<JapaneseKey>();
  const d = data as { level: string; words: number; kanji: number } | null;
  if (!d) return null;
  const link = (hash: string, title: string, meta: string) => (
    <Link href={`/words/#${hash}`} className="card mt-2 flex min-h-[64px] items-center gap-4 p-4 text-ink no-underline transition-colors duration-quick hover:bg-paper-2">
      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md bg-rung-soft" style={{ color: 'var(--rung)' }}>
        <IconCards />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-card font-medium">{title}</span>
        <span className="text-small text-muted tnum">{meta}</span>
      </span>
      <IconChevron className="shrink-0 text-muted" />
    </Link>
  );
  return (
    <>
      {link('deck', t('deck.title', { level: d.level }), t('rung.deckMeta', { n: d.words }))}
      {link('kanji', t('kanjiDeck.title', { level: d.level }), t('rung.kanjiDeckMeta', { n: d.kanji }))}
    </>
  );
}
