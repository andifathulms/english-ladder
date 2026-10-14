'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Rung } from '@/lib/types';
import { sfx } from '@/lib/speech/sfx';
import { rungHref } from '@/lib/routes';
import { useReducedMotion, useT } from '../ProgressProvider';
import { NotchBar } from '../ladder/NotchBar';

type Props = { rung: Rung; next: Rung | null; onReview: () => void };

/** The one celebratory moment in the app (DESIGN §6.7). */
export function ClimbMoment({ rung, next, onReview }: Props) {
  const { t } = useT();
  const reduced = useReducedMotion();
  const [climbed, setClimbed] = useState(false);

  useEffect(() => {
    sfx('climbed');
    const id = requestAnimationFrame(() => setClimbed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const ROW = 76;
  return (
    <div
      className="fixed inset-0 z-30 overflow-y-auto"
      style={{ background: 'var(--rung-soft)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="climb-title"
    >
      <div className="page flex min-h-full max-w-lesson flex-col justify-center gap-7 py-8">
        {/* Ladder fragment: this rung and the next */}
        <div className="relative mx-auto w-full max-w-[340px] px-[18px]" style={{ height: ROW * 2 + 16 }} aria-hidden>
          <span className="absolute bottom-0 left-[4px] top-0 w-[6px] rounded-full" style={{ background: 'var(--wood)' }} />
          <span className="absolute bottom-0 right-[4px] top-0 w-[6px] rounded-full" style={{ background: 'var(--wood)' }} />
          {[next, rung].map((r, i) => (
            <div
              key={r?.id ?? 'next'}
              className="absolute left-[18px] right-[18px] flex items-center justify-between gap-3 rounded-sm px-3"
              style={{
                top: 8 + i * ROW,
                height: ROW - 16,
                background: i === 1 ? 'var(--surface)' : 'transparent',
                boxShadow: i === 1 && climbed ? '0 0 0 3px var(--rung)' : 'none',
                transition: reduced ? 'box-shadow var(--m-quick-d) linear' : 'box-shadow var(--m-moment-d) var(--ease-moment)',
              }}
            >
              <span className="font-display font-bold text-ink">{r?.name ?? ''}</span>
              {i === 1 && (
                <span style={{ opacity: climbed ? 1 : 0, transition: `opacity var(--m-moment-d) var(--ease-moment)` }}>
                  <NotchBar total={rung.lessons} done={rung.lessons} climbed size="md" />
                </span>
              )}
              <span
                className="absolute -bottom-[10px] -left-[14px] -right-[14px] h-[4px] rounded-full"
                style={{ background: i === 1 && climbed ? 'var(--rung)' : 'var(--wood-dark)', transition: 'background var(--m-moment-d) var(--ease-moment)' }}
              />
            </div>
          ))}
          <span
            className="absolute left-[-15px] h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent"
            style={{
              borderLeftColor: 'var(--accent)',
              top: 8 + (ROW - 16) / 2 - 8 + (climbed ? 0 : ROW),
              transition: reduced ? 'none' : 'top var(--m-moment-d) var(--ease-moment)',
            }}
          />
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 id="climb-title" className="text-hero" lang="en">
            {t('climb.title', { rung: rung.name })}
          </h1>
          <p className="font-display text-h2 font-medium">{t('climb.line')}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          {next && next.status === 'live' ? (
            <Link href={rungHref(next.id)} className="btn btn-primary no-underline">
              {t('climb.next', { rung: next.name })}
            </Link>
          ) : next ? (
            <p className="label text-muted">{t('climb.nextSoon', { rung: next.name })}</p>
          ) : null}
          <Link href="/" className="btn btn-primary no-underline">
            {t('climb.viewLadder')}
          </Link>
          <button type="button" className="btn btn-quiet" onClick={onReview}>
            {t('test.reviewTitle')}
          </button>
        </div>
      </div>
    </div>
  );
}
