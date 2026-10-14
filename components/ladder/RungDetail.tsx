'use client';

import Link from 'next/link';
import type { LessonSummary, Rung } from '@/lib/types';
import type { ProgressState } from '@/lib/progress/types';
import { lessonState } from '@/lib/progress/derive';
import { testHref, rungHref } from '@/lib/routes';
import { LessonRow } from './LessonRow';
import { TierDot } from '../ui/TierDot';
import { IconArrowRight } from '../ui/Icon';
import { useT } from '../ProgressProvider';

type Props = {
  rung: Rung;
  rungs: Rung[];
  lessons: LessonSummary[];
  progress: ProgressState;
  hasTest: boolean;
  headingLevel?: 1 | 2;
};

export function RungDetail({ rung, rungs, lessons, progress, hasTest, headingLevel = 1 }: Props) {
  const { t, lang } = useT();
  const H = headingLevel === 1 ? 'h1' : 'h2';
  const mine = lessons.filter((l) => l.rung === rung.id).sort((a, b) => a.order - b.order);
  const tests = progress.rungs[rung.id]?.tests ?? [];
  const best = tests.length ? Math.max(...tests.map((x) => x.score)) : null;
  const later = rungs
    .slice(rungs.findIndex((r) => r.id === rung.id) + 1)
    .map((r) => ({ r, shared: r.threads.filter((th) => rung.threads.includes(th)) }))
    .filter((x) => x.shared.length)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="flex items-center gap-2">
          <TierDot tier={rung.tier} />
          <span className="label text-muted">{rung.cefr}</span>
        </p>
        <H className={headingLevel === 1 ? 'text-h1' : 'text-h2'}>
          {headingLevel === 2 ? <Link href={rungHref(rung.id)} className="text-ink no-underline hover:text-accent">{rung.name}</Link> : rung.name}
        </H>
        <p className="max-w-measure">{lang === 'en' ? rung.description.en : rung.description.id}</p>
        <p className="text-small text-muted">
          {t('rung.explainLang')}: {t(`rung.explain.${rung.explain_lang}`)}
        </p>
      </header>

      {rung.status === 'soon' ? (
        <section className="flex flex-col gap-3">
          <p className="label text-muted">{t('rung.soonTitle', { rung: rung.name })}</p>
          <p>{t('rung.soonBody')}</p>
          <ul className="flex flex-wrap gap-2" lang="en">
            {rung.topics.map((topic) => (
              <li key={topic} className="rounded-full border border-rule px-3 py-1 text-small">
                {topic}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section aria-labelledby={`lessons-${rung.id}`} className="flex flex-col gap-2">
          <h2 id={`lessons-${rung.id}`} className="label text-muted">{t('rung.lessons')}</h2>
          {mine.length === 0 ? (
            <p className="text-muted">{t('rung.noLessons')}</p>
          ) : (
            <ol className="flex flex-col divide-y divide-rule">
              {mine.map((l) => (
                <LessonRow key={l.id} lesson={l} state={lessonState(l, progress)} />
              ))}
            </ol>
          )}
          {hasTest && (
            <Link
              href={testHref(rung.id)}
              className="mt-2 grid min-h-[56px] grid-cols-[1fr_auto] items-center gap-3 border-t-2 border-rule px-2 pt-3 text-ink no-underline hover:text-accent"
            >
              <span className="flex flex-col">
                <span className="font-display font-bold">{t('rung.test')}</span>
                <span className="label tnum text-muted">
                  {t('rung.testMeta')}
                  {best !== null && <> · {t('rung.testBest', { n: best })}</>}
                </span>
              </span>
              <IconArrowRight />
            </Link>
          )}
        </section>
      )}

      {later.length > 0 && (
        <section aria-labelledby={`spiral-${rung.id}`} className="flex flex-col gap-2">
          <h2 id={`spiral-${rung.id}`} className="label text-muted">{t('rung.spiralTitle')}</h2>
          <ul className="flex flex-col gap-1">
            {later.map(({ r, shared }) => (
              <li key={r.id} className="text-small">
                <Link href={rungHref(r.id)}>{r.name}</Link>{' '}
                <span className="text-muted" lang="en">· {shared.join(', ')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
