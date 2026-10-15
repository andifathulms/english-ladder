'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Reading, Rung } from '@/lib/types';
import { rungHref } from '@/lib/routes';
import { useT } from '../ProgressProvider';
import { IconArrowLeft } from '../ui/Icon';
import { CheckItemView } from '../check/CheckItemView';
import { Sentence } from './Sentence';

/** The rung's Read & listen capstone: one short text read aloud, then a few questions. */
export function ReadingView({ rung, reading }: { rung: Rung; reading: Reading }) {
  const { t } = useT();
  const [solved, setSolved] = useState<string[]>([]);
  const allDone = solved.length === reading.items.length;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-10 border-b border-rule bg-surface">
        <div className="page flex max-w-lesson items-center gap-3 py-2">
          <Link
            href={rungHref(rung.id)}
            aria-label={t('nav.back')}
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-ink hover:bg-paper-2"
          >
            <IconArrowLeft />
          </Link>
          <span className="label text-muted">
            {rung.name} · {t('read.title')}
          </span>
        </div>
      </header>

      <main className="page flex max-w-lesson flex-1 flex-col gap-6 py-7">
        <div className="flex flex-col gap-1">
          <p className="eyebrow">{t('read.title')}</p>
          <h1 className="text-h1" lang="en">
            {reading.title.en}
          </h1>
          <p className="id-text" lang="id">
            {reading.title.id}
          </p>
        </div>

        <section className="card flex flex-col gap-4 p-5" aria-label={reading.title.en}>
          <Sentence en={reading.text} size="body" />
          <details>
            <summary className="label cursor-pointer py-2 text-accent">{t('read.translation')}</summary>
            <p lang="id" className="id-text">
              {reading.translation}
            </p>
          </details>
        </section>

        {reading.glossary.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="eyebrow">{t('lesson.newWords')}</h2>
            <ul className="flex flex-wrap gap-2">
              {reading.glossary.map((g) => (
                <li key={g.en} className="card flex items-baseline gap-2 px-3 py-1">
                  <span lang="en" className="font-display font-semibold">
                    {g.en}
                  </span>
                  <span lang="id" className="id-text text-small">
                    {g.id}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-6" aria-labelledby="read-questions">
          <h2 id="read-questions" className="text-h2">
            {t('read.questions')}
          </h2>
          {reading.items.map((item, i) => (
            <div key={item.id} className="flex flex-col gap-3 border-t border-rule pt-5">
              <p className="text-small font-bold tnum text-muted">{t('check.counter', { n: i + 1, total: reading.items.length })}</p>
              <CheckItemView
                mode="practice"
                item={item}
                numberKeys={false}
                onSolved={() => setSolved((s) => (s.includes(item.id) ? s : [...s, item.id]))}
              />
            </div>
          ))}
        </section>

        <p aria-live="polite" className="font-bold text-good">
          {allDone ? t('read.done') : ''}
        </p>
        <Link href={rungHref(rung.id)} className="btn btn-ghost self-start no-underline">
          {t('lesson.backToRung', { rung: rung.name })}
        </Link>
      </main>
    </div>
  );
}
