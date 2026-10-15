'use client';

import Link from 'next/link';
import type { ContinueTarget } from '@/lib/progress/derive';
import type { Rung } from '@/lib/types';
import { lessonHref, testHref } from '@/lib/routes';
import { IconArrowRight } from '../ui/Icon';
import { useT } from '../ProgressProvider';
import { STEP_KEYS } from '../lesson/steps';
import { Contours } from '../ui/Contours';

/** Sets the last word in brass italic, the way the board marks what matters. */
export function Accented({ text, tone = 'text-brass' }: { text: string; tone?: string }) {
  const i = text.trimEnd().lastIndexOf(' ');
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i + 1)}
      <em className={`font-display italic ${tone}`}>{text.slice(i + 1)}</em>
    </>
  );
}

/** A quoted sentence; a ___ blank becomes a gold underline on the board. */
function BoardSentence({ text }: { text: string }) {
  const parts = text.split('___');
  return (
    <p className="font-display text-h1 font-medium leading-tight tracking-[-0.01em] text-board-ink" lang="en">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <>
              <span aria-hidden className="mx-[2px] inline-block h-[0.9em] w-[2.4em] border-b-[3px] align-[-0.1em]" style={{ borderColor: 'var(--brass)' }} />
              <span className="sr-only">blank</span>
            </>
          )}
        </span>
      ))}
    </p>
  );
}

function StepDots({ step }: { step: number }) {
  return (
    <span aria-hidden className="flex min-w-[120px] flex-1 gap-[4px]">
      {STEP_KEYS.map((k, i) => (
        <span key={k} className={`h-[4px] flex-1 rounded-full ${i <= step ? 'bg-brass' : 'bg-board-2'}`} />
      ))}
    </span>
  );
}

/** The board: the single next thing to do, quoting the exact sentence where you stopped. */
type CardProps = { target: ContinueTarget; firstLessonHref: string | null; starterHref?: string | null; rungs: Rung[] };

export function ContinueCard({ target, firstLessonHref, starterHref, rungs }: CardProps) {
  const { t, lang } = useT();
  const shell = 'board flex flex-col gap-4 p-6 min-[900px]:gap-5 min-[900px]:p-9';

  if (target.kind === 'welcome') {
    return (
      <section className={shell} aria-labelledby="welcome-title">
        <Contours />
        <p className="label text-brass">{t('home.startHere')}</p>
        <h2 id="welcome-title" className="max-w-[16ch] text-hero leading-[1.02] tracking-[-0.02em] text-board-ink">
          <Accented text={t('home.welcomeTitle')} />
        </h2>
        <p className="max-w-measure text-board-muted">{t('home.welcomeBody')}</p>
        {firstLessonHref && (
          <div>
            <Link href={firstLessonHref} className="btn btn-board no-underline">
              {t('home.start')} <IconArrowRight />
            </Link>
          </div>
        )}
        {starterHref && (
          <Link href={starterHref} className="self-start text-small text-board-muted underline underline-offset-4 hover:text-board-ink">
            {t('home.starterLink')}
          </Link>
        )}
      </section>
    );
  }

  if (target.kind === 'test') {
    return (
      <section className={shell} aria-labelledby="continue-title">
        <Contours />
        <p id="continue-title" className="label text-brass">
          {t('home.continue')} · {target.rung.name}
        </p>
        <p className="font-display text-h1 font-medium text-board-ink">
          <Accented text={t('test.title', { rung: target.rung.name })} />
        </p>
        <p className="text-board-muted">{t('home.testReady')}</p>
        <div>
          <Link href={testHref(target.rung.id)} className="btn btn-board no-underline">
            {t('home.continueBtn')} <IconArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  const { lesson, step, text } = target;
  const rung = rungs.find((r) => r.id === lesson.rung);
  return (
    <section className={shell} aria-labelledby="continue-title">
      <Contours />
      <p id="continue-title" className="label tnum text-brass">
        {t('home.continue')} · {rung?.name} · {t('home.lessonN', { n: lesson.order })}
        <span aria-hidden> · {t(STEP_KEYS[step])}</span>
        {step > 0 && <span className="sr-only"> · {t('home.step', { n: step + 1 })}</span>}
      </p>
      <BoardSentence text={text} />
      <p className={`text-small text-board-muted ${lang === 'en' ? '' : 'italic'}`} lang={lang}>
        {lang === 'en' ? lesson.title.en : lesson.title.id}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <StepDots step={step} />
        <Link href={lessonHref(lesson)} className="btn btn-board no-underline">
          {t('home.continueBtn')} <IconArrowRight />
        </Link>
      </div>
    </section>
  );
}
