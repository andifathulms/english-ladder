'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { LessonSummary, Noun } from '@/lib/types';
import { missedCount } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { useProgress, useT } from './ProgressProvider';
import { PageShell } from './ui/PageShell';
import { PlayButton } from './lesson/PlayButton';
import { IconBook, IconSearch } from './ui/Icon';
import { article } from './visuals/nounLogic';
import { useSpeak } from './useSpeech';

export function WordsView({ lessons, nouns = [] }: { lessons: LessonSummary[]; nouns?: Noun[] }) {
  const { t } = useT();
  const progress = useProgress();
  const speak = useSpeak();
  const [q, setQ] = useState('');
  const [only, setOnly] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(false);

  const byWord = useMemo(() => new Map(nouns.map((n) => [n.word.toLowerCase(), n])), [nouns]);
  const opened = lessons.filter((l) => progress.opened.includes(l.id)).sort((a, b) => a.order - b.order);
  const total = opened.reduce((n, l) => n + l.glossary.length, 0);
  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return opened
      .filter((l) => (!only || l.id === only) && (!mistakes || missedCount(l, progress) > 0))
      .map((l) => ({
        l,
        words: l.glossary.filter((g) => !needle || g.en.toLowerCase().includes(needle) || g.id.toLowerCase().includes(needle)),
      }))
      .filter((g) => g.words.length);
  }, [opened, q, only, mistakes, progress]);

  const chip = (on: boolean) =>
    `min-h-touch shrink-0 rounded-full px-4 text-small font-bold transition-colors duration-quick ${
      on ? 'bg-ink text-paper' : 'bg-surface text-ink shadow-e1 hover:bg-paper-2'
    }`;

  return (
    <PageShell
      title={t('words.title')}
      subtitle={total > 0 ? t('words.subtitle', { n: total, l: opened.length }) : undefined}
    >
      {total === 0 ? (
        <div className="card flex flex-col items-start gap-3 p-5">
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-md bg-paper-2 text-muted">
            <IconBook size={24} />
          </span>
          <p className="max-w-measure text-muted">{t('words.empty')}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <label className="flex min-h-[48px] items-center gap-2 rounded-lg bg-surface px-3 text-muted shadow-e1 focus-within:outline focus-within:outline-2 focus-within:outline-accent">
              <IconSearch />
              <span className="sr-only">{t('words.search')}</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('words.searchPlaceholder')}
                className="min-h-touch min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
              />
            </label>
            <div className="relative -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1" role="group" aria-label={t('rung.lessons')}>
              <button type="button" aria-pressed={!only} className={chip(!only)} onClick={() => setOnly(null)}>
                {t('words.all')}
              </button>
              {opened.map((l) => (
                <button key={l.id} type="button" aria-pressed={only === l.id} className={chip(only === l.id)} onClick={() => setOnly(l.id)}>
                  <span className="tnum">{l.order}</span> · <span lang="en">{l.title.en}</span>
                </button>
              ))}
            </div>
            <label className="flex min-h-touch items-center gap-2 text-small">
              <input
                type="checkbox"
                checked={mistakes}
                onChange={(e) => setMistakes(e.target.checked)}
                className="h-[20px] w-[20px]"
                style={{ accentColor: 'var(--accent)' }}
              />
              {t('words.mistakesOnly')}
            </label>
          </div>
          {groups.length === 0 ? (
            <p className="text-muted">{t('words.noMatch')}</p>
          ) : (
            groups.map(({ l, words }) => (
              <section key={l.id} className="flex flex-col gap-2">
                <h2 className="eyebrow">
                  <Link href={lessonHref(l)} className="text-muted no-underline hover:text-accent">
                    {t('home.lessonN', { n: l.order })} · <span lang="en">{l.title.en}</span>
                  </Link>
                </h2>
                <ul className="card flex flex-col divide-y divide-rule overflow-hidden">
                  {words.map((w) => {
                    const noun = byWord.get(w.en.toLowerCase());
                    return (
                      <li key={w.en} className="flex min-h-[60px] items-center gap-3 px-4 py-2">
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span lang="en" className="font-display text-body font-bold">
                            {w.en}
                            {noun && noun.plural_rule === 'irregular' && (
                              <span className="font-medium text-muted"> → {noun.plural}</span>
                            )}
                          </span>
                          <span lang="id" className="id-text text-small">
                            {w.id}
                          </span>
                        </span>
                        {noun && (
                          <span lang="en" className="label rounded-sm bg-accent-soft px-2 py-[2px] normal-case tracking-normal text-accent">
                            {article(noun)}
                          </span>
                        )}
                        <PlayButton text={w.en} onPlay={() => void speak(w.en)} small />
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </>
      )}
    </PageShell>
  );
}
