'use client';

import Link from 'next/link';
import type { ContinueTarget } from '@/lib/progress/derive';
import type { Rung } from '@/lib/types';
import { lessonHref, testHref } from '@/lib/routes';
import { IconArrowRight } from '../ui/Icon';
import { useT } from '../ProgressProvider';

export function ContinueCard({ target, firstLessonHref, rungs }: { target: ContinueTarget; firstLessonHref: string | null; rungs: Rung[] }) {
  const { t, lang } = useT();

  if (target.kind === 'welcome') {
    return (
      <section className="card flex flex-col gap-3 p-5" aria-labelledby="welcome-title">
        <h2 id="welcome-title" className="text-h2">{t('home.welcomeTitle')}</h2>
        <p className="max-w-measure text-muted">{t('home.welcomeBody')}</p>
        {firstLessonHref && (
          <div>
            <Link href={firstLessonHref} className="btn btn-primary no-underline">
              {t('home.start')} <IconArrowRight />
            </Link>
          </div>
        )}
      </section>
    );
  }

  if (target.kind === 'test') {
    return (
      <section className="card flex flex-col gap-3 p-5" aria-labelledby="continue-title">
        <p id="continue-title" className="label text-muted">
          {t('home.continue')} · {target.rung.name}
        </p>
        <p className="font-display text-sentence font-medium" lang="en">
          {t('test.title', { rung: target.rung.name })}
        </p>
        <div>
          <Link href={testHref(target.rung.id)} className="btn btn-primary no-underline">
            {t('home.continueBtn')} <IconArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  const { lesson, step, text } = target;
  const rung = rungs.find((r) => r.id === lesson.rung);
  return (
    <section className="card flex flex-col gap-3 p-5" aria-labelledby="continue-title">
      <p id="continue-title" className="label text-muted tnum">
        {t('home.continue')} · {rung?.name} · {t('home.lessonN', { n: lesson.order })}
        {step > 0 && <> · {t('home.step', { n: step + 1 })}</>}
      </p>
      <p className="font-display text-sentence font-medium text-ink" lang="en">
        {text}
      </p>
      <p className="text-small text-muted">{lang === 'en' ? lesson.title.en : lesson.title.id}</p>
      <div>
        <Link href={lessonHref(lesson)} className="btn btn-primary no-underline">
          {t('home.continueBtn')} <IconArrowRight />
        </Link>
      </div>
    </section>
  );
}
