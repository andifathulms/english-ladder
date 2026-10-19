'use client';

import { useMemo, useState } from 'react';
import { dayNumber, plan } from '../../lib/deck/schedule';
import type { DeckCards } from '../../lib/deck/progress';
import { DeckRunner, type DeckCardSlot } from './DeckRunner';
import { PlayButton } from '../lesson/PlayButton';
import { IconArrowRight, IconSearch } from '../ui/Icon';
import { usePlay } from '../useSpeech';
import { useHydrated, useProgress, useSettings, useT } from '../ProgressProvider';

/** A card the deck can schedule: an id, and the lesson that teaches it, if any. */
export type DeckItem = { id: string; lesson?: string };

/** One deck: a rung's (or level's) cards, with its heading already worded by the course. */
export type CoreDeck<W extends DeckItem> = { rung: string; name: string; title: string; words: W[] };

type Filter = 'all' | 'new' | 'learned' | 'lessons';

export type DeckHomeProps<W extends DeckItem> = {
  decks: CoreDeck<W>[];
  /** The progress extension holding this deck's cards ('deck', 'kanjiDeck', …). */
  stateKey: string;
  /** String keys: `${prefix}.start`, `${prefix}.list`, … (Mandarin's word deck: 'deck'). */
  prefix?: string;
  /** Search over a card's text. */
  match: (w: W, q: string) => boolean;
  /** A list row's text (inside the row's flex span). */
  RowText: (p: { word: W }) => React.ReactNode;
  /** What a list row's play button plays. */
  audio: (w: W) => string;
  /** The study card. */
  Card: DeckCardSlot<W>;
};

/**
 * A deck home (DESIGN §6.8, from Mandarin Ladder's Kartu kata): one card per deck (how many are
 * learned, today's new and due counts, Mulai), and below it the full list with search and filters.
 * No streak.
 */
export function DeckHome<W extends DeckItem>({ decks, stateKey, prefix = 'deck', match, RowText, audio, Card }: DeckHomeProps<W>) {
  const { t } = useT<string>();
  const progress = useProgress();
  const hydrated = useHydrated();
  const { deckDaily } = useSettings();
  const play = usePlay();
  const [running, setRunning] = useState<{ deck: CoreDeck<W>; queue: W[] } | null>(null);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const today = dayNumber();
  const deck = (progress[stateKey] ?? {}) as DeckCards;
  const k = (s: string) => `${prefix}.${s}`;

  const plans = useMemo(
    () => decks.map((d) => ({ d, p: plan(d.words, deck, today, deckDaily as number, d.rung) })),
    [decks, deck, today, deckDaily],
  );

  if (running) return <DeckRunner name={running.deck.name} queue={running.queue} onClose={() => setRunning(null)} stateKey={stateKey} prefix={prefix} Card={Card} />;
  if (!decks.length) return <p className="text-muted">{t(k('none'))}</p>;

  const studied = (id: string) => !!deck[id] && (deck[id].learned || deck[id].lastSeen > 0);
  const chip = (on: boolean) =>
    `min-h-touch shrink-0 rounded-full px-4 text-small font-bold transition-colors duration-quick ${on ? 'bg-ink text-paper' : 'bg-surface text-ink shadow-e1 hover:bg-paper-2'}`;

  return (
    <div className="flex flex-col gap-6">
      {plans.map(({ d, p }) => {
        const learned = d.words.filter((w) => studied(w.id)).length;
        const queue = [...p.due, ...p.fresh];
        return (
          <section key={d.rung} className="card flex flex-col gap-3 p-5" aria-labelledby={`${prefix}-${d.rung}`}>
            <h2 id={`${prefix}-${d.rung}`} className="font-display text-card font-medium">
              {d.title}
            </h2>
            <p className="text-small text-muted tnum">{t(k('learned'), { n: hydrated ? learned : 0, total: d.words.length })}</p>
            <span className="h-[4px] w-full overflow-hidden rounded-full bg-paper-2" aria-hidden>
              <span className="block h-full rounded-full bg-accent" style={{ width: `${(learned / d.words.length) * 100}%` }} />
            </span>
            <p className="text-small tnum">{t(k('today'), { n: hydrated ? p.fresh.length : 0, k: hydrated ? p.due.length : 0 })}</p>
            <button type="button" className="btn btn-primary self-start" disabled={!queue.length} onClick={() => setRunning({ deck: d, queue })}>
              {queue.length ? t(k('start')) : t(k('nothing'))} {queue.length > 0 && <IconArrowRight />}
            </button>
          </section>
        );
      })}

      <section className="flex flex-col gap-3" aria-labelledby={`${prefix}-list`}>
        <h2 id={`${prefix}-list`} className="eyebrow">
          {t(k('list'))}
        </h2>
        <label className="flex min-h-[48px] items-center gap-2 rounded-lg bg-surface px-3 text-muted shadow-e1 focus-within:outline focus-within:outline-2 focus-within:outline-accent">
          <IconSearch />
          <span className="sr-only">{t('words.search')}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('words.searchPlaceholder')} className="min-h-touch min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t(k('filter'))}>
          {(['all', 'new', 'learned', 'lessons'] as Filter[]).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} className={chip(filter === f)} onClick={() => setFilter(f)}>
              {t(`${k('filter')}.${f}`)}
            </button>
          ))}
        </div>
        {decks.map((d) => {
          const list = d.words.filter(
            (w) => match(w, q) && (filter === 'all' || (filter === 'new' && !studied(w.id)) || (filter === 'learned' && studied(w.id)) || (filter === 'lessons' && !!w.lesson)),
          );
          return (
            <ul key={d.rung} className="card flex flex-col divide-y divide-rule overflow-hidden" aria-label={d.name}>
              {list.slice(0, 200).map((w) => (
                <li key={w.id} className="flex min-h-[56px] items-center gap-3 px-4 py-2">
                  <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3">
                    <RowText word={w} />
                  </span>
                  <span className={`label shrink-0 ${studied(w.id) ? 'text-good' : 'text-muted'}`}>{studied(w.id) ? t(k('state.learned')) : t(k('state.new'))}</span>
                  <PlayButton text={audio(w)} onPlay={() => void play(audio(w))} small />
                </li>
              ))}
              {list.length > 200 && <li className="px-4 py-2 text-small text-muted">{t(k('more'), { n: list.length - 200 })}</li>}
              {list.length === 0 && <li className="px-4 py-3 text-small text-muted">{t('words.noMatch')}</li>}
            </ul>
          );
        })}
      </section>
    </div>
  );
}
