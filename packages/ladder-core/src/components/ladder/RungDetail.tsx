'use client';

import Link from 'next/link';
import type { LessonSummary, Rung, Title } from '@ladder/core/lib/types';
import type { ProgressState } from '@ladder/core/lib/progress/types';
import { lessonState } from '@ladder/core/lib/progress/derive';
import { placementHref, readHref, talkHref, testHref, rungHref } from '@ladder/core/lib/routes';
import { CapstoneCard } from './CapstoneCard';
import { LessonRow } from './LessonRow';
import { IconArrowLeft, IconChevron, IconFlag, IconPlay, IconReview } from '../ui/Icon';
import { ProgressRing } from '../ui/ProgressRing';
import { tierName } from '../ui/tier';
import { useT } from '../ProgressProvider';
import { useCourse } from '@ladder/core/course/context';
import { TargetText, useTextAttrs } from '../ui/TargetText';
import { useLevel } from '../ui/useCefr';

type Props = {
  rung: Rung;
  rungs: Rung[];
  lessons: LessonSummary[];
  progress: ProgressState;
  test: TestInfo | null;
  reading?: ReadingInfo | null;
  /** The course has a placement check (its retake rung offers it again). */
  hasPlacement?: boolean;
  dialogue?: DialogueInfo | null;
  /** ContentModel.rungData, for ladder.RungExtra. */
  extra?: unknown;
};

export type TestInfo = { draw: number; pass: number };
export type ReadingInfo = { title: Title; items: number };
export type DialogueInfo = { title: Title; lines: number; items: number };

export function RungDetail({ rung, rungs, lessons, progress, test, reading, hasPlacement, dialogue, extra }: Props) {
  const { t, lang } = useT();
  const course = useCourse();
  const Board = course.boardPattern;
  const textAttrs = useTextAttrs();
  // After placement into this rung, the lessons behind missed check items are marked.
  const missed = new Set(progress.placement?.result === rung.id ? progress.placement.missed : []);
  // Capstone done dates (fixes.capstoneDone).
  const caps = (course.fixes?.capstoneDone && progress.capstones?.[rung.id]) || {};
  const dialogueTag = course.capstones?.dialogue?.tagKey;
  const retake = !!hasPlacement && course.placement?.retakeRung === rung.id;
  const level = useLevel();
  const subtitle = course.ladder?.rungSubtitle?.(rung, 'board') ?? null;
  const { RungSubtitle, LevelChip, RungExtra } = course.ladder ?? {};
  const topicAttrs = course.target.topicAttrs ?? textAttrs;
  const meta = course.ladder?.rungMeta?.(rung, t as (key: string) => string) ?? null;
  const mine = lessons.filter((l) => l.rung === rung.id).sort((a, b) => a.order - b.order);
  const tests = progress.rungs[rung.id]?.tests ?? [];
  const best = tests.length ? Math.max(...tests.map((x) => x.score)) : null;
  const climbed = !!progress.rungs[rung.id]?.climbed;
  const states = mine.map((l) => lessonState(l, progress));
  const done = states.filter((s) => s.kind === 'done' || s.kind === 'review').length;
  // The lesson to open next: the one in progress, else the first not finished.
  const currentIdx = (() => {
    const p = states.findIndex((s) => s.kind === 'progress');
    return p >= 0 ? p : states.findIndex((s) => s.kind === 'new');
  })();
  const later = rungs
    .slice(rungs.findIndex((r) => r.id === rung.id) + 1)
    .map((r) => ({ r, shared: r.threads.filter((th) => rung.threads.includes(th)) }))
    .filter((x) => x.shared.length)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <header className="board -mx-gutter flex flex-col gap-4 rounded-none px-gutter pb-8 pt-3 min-[640px]:mx-0 min-[640px]:rounded-xl min-[640px]:px-8 min-[640px]:pt-5">
        <Board />
        <Link
          href="/"
          className="inline-flex min-h-touch items-center gap-1 self-start text-small font-bold text-board-muted no-underline hover:text-board-ink"
        >
          <IconArrowLeft size={18} /> {t('nav.home')}
        </Link>
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <p className="label flex items-center gap-2 text-brass">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full" style={{ background: `var(--${rung.tier})` }} />
              {LevelChip ? (
                <>
                  {tierName(rung.tier)}
                  <LevelChip rung={rung} onBoard />
                </>
              ) : (
                <>
                  {tierName(rung.tier)} · {level(rung)}
                </>
              )}
            </p>
            <h1 className="text-hero leading-none tracking-[-0.02em] text-board-ink">{rung.name}</h1>
            {RungSubtitle && <RungSubtitle rung={rung} place="board" />}
            {subtitle && (
              <TargetText block as="p" size="title" face="display" className="text-board-muted">
                {subtitle}
              </TargetText>
            )}
          </div>
          {rung.status === 'live' && (
            <ProgressRing
              done={climbed ? rung.lessons : done}
              total={rung.lessons}
              color={climbed ? 'var(--rung)' : 'var(--brass)'}
              track="var(--board-2)"
              onBoard
              label={climbed ? t('rung.climbed') : t('rung.progressRing', { n: done, total: rung.lessons })}
            />
          )}
        </div>
        <p className="max-w-measure text-body text-board-ink">{lang === 'en' ? rung.description.en : rung.description.id}</p>
        {meta && <p className="text-small text-board-muted">{meta}</p>}
      </header>

      {rung.status === 'soon' ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-h2">{t('rung.soonTitle', { rung: rung.name })}</h2>
          <p className="text-muted">{t('rung.soonBody')}</p>
          <ul className="flex flex-wrap gap-2" lang={topicAttrs.lang} dir={topicAttrs.dir}>
            {rung.topics.map((topic) => (
              <li key={topic} className="card px-3 py-1 text-small">
                {topic}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section aria-labelledby={`lessons-${rung.id}`} className="flex flex-col gap-3">
          <h2 id={`lessons-${rung.id}`} className="eyebrow">
            {t('rung.lessons')}
          </h2>
          {mine.length === 0 ? (
            <p className="text-muted">{t('rung.noLessons')}</p>
          ) : (
            <ol className="card flex flex-col divide-y divide-rule overflow-hidden">
              {mine.map((l, i) => (
                <LessonRow key={l.id} lesson={l} state={states[i]} current={i === currentIdx} flagged={missed.has(l.id)} />
              ))}
            </ol>
          )}
          {missed.size > 0 && <p className="text-small text-muted">{t('rung.missedHint')}</p>}
          {course.capstones ? (
            (reading || dialogue) && (
              <div className="mt-3 flex flex-col gap-2">
                <h3 className="eyebrow">{t('rung.capstones')}</h3>
                {reading && (
                  <CapstoneCard
                    href={readHref(rung.id)}
                    kind="reading"
                    title={`${t('read.title')}: ${lang === 'en' ? reading.title.en : reading.title.id}`}
                    meta={t('read.meta', { n: reading.items })}
                    done={caps.reading}
                  />
                )}
                {dialogue && (
                  <CapstoneCard
                    href={talkHref(rung.id)}
                    kind="dialogue"
                    title={`${t('talk.title')}${dialogueTag ? ` · ${t(dialogueTag as never)}` : ''}: ${lang === 'en' ? dialogue.title.en : dialogue.title.id}`}
                    meta={t('talk.meta', { n: dialogue.lines, k: dialogue.items })}
                    done={caps.dialogue}
                  />
                )}
              </div>
            )
          ) : (
            reading && (
              <Link
                href={readHref(rung.id)}
                className="mt-3 flex min-h-[72px] items-center gap-4 rounded-lg bg-accent-soft p-4 text-ink no-underline transition-colors duration-quick hover:bg-paper-2"
              >
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md bg-surface text-accent">
                  <IconPlay />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-card font-medium">
                    {t('read.title')}: <span lang={course.target.lang} dir={course.target.dir}>{reading.title.target}</span>
                  </span>
                  <span className="text-small text-muted tnum">{t('read.meta', { n: reading.items })}</span>
                </span>
                <IconChevron className="shrink-0 text-muted" />
              </Link>
            )
          )}
          {RungExtra && <RungExtra rung={rung} data={extra} />}
          {test && (
            <Link
              href={testHref(rung.id)}
              className={`mt-3 flex min-h-[72px] items-center gap-4 rounded-lg p-4 text-ink no-underline transition-colors duration-quick ${
                climbed ? 'bg-rung-soft' : 'border-2 border-dashed border-rule bg-surface hover:border-accent'
              }`}
            >
              <span
                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md ${climbed ? 'bg-surface' : 'bg-paper-2'}`}
                style={climbed ? { color: 'var(--rung)' } : undefined}
              >
                <IconFlag />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-display text-card font-medium">{t('rung.test')}</span>
                <span className="text-small text-muted tnum">
                  {t('rung.testMeta', { n: test.draw, pass: test.pass })} ·{' '}
                  {best !== null ? t('rung.testBest', { n: best, total: test.draw }) : t('rung.testAlways')}
                </span>
              </span>
              <IconChevron className="shrink-0 text-muted" />
            </Link>
          )}
          {retake && (
            <Link
              href={placementHref}
              className="mt-3 flex min-h-[64px] items-center gap-4 rounded-lg bg-paper-2 p-4 text-ink no-underline transition-colors duration-quick hover:bg-accent-soft"
            >
              <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md bg-surface text-accent">
                <IconReview />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-body font-bold">{t('rung.placementRetake')}</span>
                <span className="text-small text-muted">{t('rung.placementRetakeMeta')}</span>
              </span>
              <IconChevron className="shrink-0 text-muted" />
            </Link>
          )}
        </section>
      )}

      {later.length > 0 && (
        <section aria-labelledby={`spiral-${rung.id}`} className="flex flex-col gap-2">
          <h2 id={`spiral-${rung.id}`} className="eyebrow">
            {t('rung.spiralTitle')}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {later.map(({ r, shared }) => (
              <li key={r.id}>
                <Link href={rungHref(r.id)} className="card flex flex-col px-3 py-2 text-small text-ink no-underline hover:bg-paper-2">
                  <span className="font-display font-semibold">{r.name}</span>
                  <span className="text-muted" lang={textAttrs.lang} dir={textAttrs.dir}>
                    {shared.join(', ')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
