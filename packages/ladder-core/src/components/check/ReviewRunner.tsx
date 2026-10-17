'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CheckItem, Noun } from '@ladder/core/lib/types';
import { drawReview } from '@ladder/core/lib/check/draw';
import * as store from '@ladder/core/lib/progress/store';
import { useProgress, useT } from '../ProgressProvider';
import { PageShell } from '../ui/PageShell';
import { BottomActionBar } from '../lesson/BottomActionBar';
import { IconArrowRight, IconReview } from '../ui/Icon';
import { CheckItemView } from './CheckItemView';

type Props = { items: { item: CheckItem; lessonId: string }[]; nouns?: Noun[] };

export function ReviewRunner({ items, nouns }: Props) {
  const { t } = useT();
  const progress = useProgress();
  const [run, setRun] = useState<{ items: CheckItem[]; i: number; solved: boolean; first: boolean[] } | null>(null);
  const [done, setDone] = useState<boolean[] | null>(null);

  const completed = Object.values(progress.lessons).filter((l) => l.completed).length;

  const start = () => {
    setDone(null);
    setRun({ items: drawReview(store.getState(), items), i: 0, solved: false, first: [] });
    window.scrollTo({ top: 0 });
  };

  if (!run) {
    return (
      <PageShell title={t('review.title')}>
        {done ? (
          <>
            <p className="font-display text-h2 font-medium tnum">
              {done.every(Boolean) ? t('review.summaryAll') : t('review.summary', { c: done.filter(Boolean).length, n: done.length })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/" className="btn btn-primary no-underline">
                {t('review.done')}
              </Link>
              <button type="button" className="btn btn-quiet" onClick={start}>
                {t('review.again')}
              </button>
            </div>
          </>
        ) : completed < 2 ? (
          <div className="card flex flex-col items-start gap-3 p-5">
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-md bg-paper-2 text-muted">
              <IconReview size={24} />
            </span>
            <h2 className="text-h2">{t('review.emptyTitle')}</h2>
            <p className="max-w-measure text-muted">{t('review.empty')}</p>
            <Link href="/" className="btn btn-ghost no-underline">
              {t('review.done')}
            </Link>
          </div>
        ) : (
          <div className="card flex flex-col items-start gap-3 p-5">
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-md bg-accent-soft text-accent">
              <IconReview size={24} />
            </span>
            <h2 className="text-h2">{t('review.readyTitle')}</h2>
            <p className="max-w-measure text-muted">{t('review.intro')}</p>
            <button type="button" className="btn btn-primary" onClick={start}>
              {t('review.start')} <IconArrowRight />
            </button>
          </div>
        )}
      </PageShell>
    );
  }

  const item = run.items[run.i];
  const last = run.i === run.items.length - 1;
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-10 border-b border-rule bg-surface">
        <div className="page flex max-w-lesson items-center justify-between gap-3 py-3">
          <span className="label text-muted">{t('review.title')}</span>
          <span className="label tnum text-muted">
            {run.i + 1} / {run.items.length}
          </span>
        </div>
      </header>
      <main className="flex-1 py-5 sm:py-7">
        <div className="page max-w-lesson sm:rounded-lg sm:bg-surface sm:px-7 sm:py-7 sm:shadow-e2">
          <CheckItemView
            key={item.id}
            mode="practice"
            item={item}
            nouns={nouns}
            whyInSheet
            onSolved={(firstTry) => {
              store.recordAnswer(item.id, firstTry);
              setRun({ ...run, solved: true, first: [...run.first, firstTry] });
            }}
          />
        </div>
      </main>
      <BottomActionBar feedback={run.solved ? item.why : null}>
        <button
          type="button"
          className={`btn w-full max-w-[360px] ${run.solved ? 'btn-good' : 'btn-primary'}`}
          disabled={!run.solved}
          onClick={() => {
            if (last) {
              setDone(run.first);
              setRun(null);
            } else setRun({ ...run, i: run.i + 1, solved: false });
          }}
        >
          {last ? t('test.finish') : t('lesson.next')} <IconArrowRight />
        </button>
      </BottomActionBar>
    </div>
  );
}
