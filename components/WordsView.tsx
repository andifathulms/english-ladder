'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { LessonSummary } from '@/lib/types';
import { missedCount } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { useProgress, useT } from './ProgressProvider';
import { PageShell } from './ui/PageShell';
import { PlayButton } from './lesson/PlayButton';
import { useSpeak } from './useSpeech';

export function WordsView({ lessons }: { lessons: LessonSummary[] }) {
  const { t } = useT();
  const progress = useProgress();
  const speak = useSpeak();
  const [q, setQ] = useState('');
  const [mistakes, setMistakes] = useState(false);

  const opened = lessons.filter((l) => progress.opened.includes(l.id)).sort((a, b) => a.order - b.order);
  const total = opened.reduce((n, l) => n + l.glossary.length, 0);
  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return opened
      .filter((l) => !mistakes || missedCount(l, progress) > 0)
      .map((l) => ({
        l,
        words: l.glossary.filter((g) => !needle || g.en.toLowerCase().includes(needle) || g.id.toLowerCase().includes(needle)),
      }))
      .filter((g) => g.words.length);
  }, [opened, q, mistakes, progress]);

  return (
    <PageShell title={t('words.title')}>
      {total === 0 ? (
        <p className="text-muted">{t('words.empty')}</p>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="label text-muted">{t('words.search')}</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="min-h-touch rounded-sm border border-rule bg-surface px-3 text-ink"
              />
            </label>
            <label className="flex min-h-touch items-center gap-2 text-small">
              <input type="checkbox" checked={mistakes} onChange={(e) => setMistakes(e.target.checked)} className="h-[20px] w-[20px]" style={{ accentColor: 'var(--accent)' }} />
              {t('words.mistakesOnly')}
            </label>
            <p className="label tnum text-muted">{t('words.count', { n: total })}</p>
          </div>
          {groups.length === 0 ? (
            <p className="text-muted">{t('words.noMatch')}</p>
          ) : (
            groups.map(({ l, words }) => (
              <section key={l.id} className="flex flex-col gap-2">
                <h2 className="flex items-baseline gap-2">
                  <span className="label tnum text-muted">{l.order}</span>
                  <Link href={lessonHref(l)} className="font-display font-bold text-ink no-underline hover:text-accent" lang="en">
                    {l.title.en}
                  </Link>
                </h2>
                <ul className="flex flex-col divide-y divide-rule">
                  {words.map((w) => (
                    <li key={w.en} className="flex min-h-[52px] items-center gap-3 py-1">
                      <span lang="en" className="min-w-[8ch] font-display text-h2 font-medium">
                        {w.en}
                      </span>
                      <span lang="id" className="id-text flex-1">
                        {w.id}
                      </span>
                      <PlayButton text={w.en} onPlay={() => void speak(w.en)} small />
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </>
      )}
    </PageShell>
  );
}
