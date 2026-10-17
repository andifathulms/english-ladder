'use client';

import { useEffect, useRef, useState } from 'react';
import type { Line } from '@ladder/core/lib/types';
import { stripMarkup } from '@ladder/core/lib/markup';
import { audioFor, loadManifest } from '@ladder/core/lib/speech/audio';
import { IconPlay } from '../ui/Icon';
import { useReducedMotion, useSettings, useT } from '../ProgressProvider';
import { useCanPlay, usePlay } from '../useSpeech';
import { TargetSentence } from './TargetSentence';
import { useCourse } from '@ladder/core/course/context';

type Phase = 'idle' | 'first' | 'turn' | 'second';

/** Rough speaking time when there is no recording: about 75ms per character at 1×. */
const estimate = (text: string, rate: number) => (stripMarkup(text).length * 75) / rate;

/**
 * Repeat after (Tirukan): plays the sentence, leaves a pause as long as the sentence plus a second
 * for the learner to say it aloud, then plays it again. Nothing is recorded or scored.
 */
export function TirukanCard({ line }: { line: Line }) {
  const { t } = useT();
  const { rate } = useSettings();
  const reduced = useReducedMotion();
  const play = usePlay();
  const { speech } = useCourse();
  const can = useCanPlay(line.text, line.variety);
  const [phase, setPhase] = useState<Phase>('idle');
  const [pause, setPause] = useState(0);
  const alive = useRef(true);
  useEffect(
    () => () => {
      alive.current = false;
    },
    [],
  );

  const run = async () => {
    if (phase !== 'idle') return;
    await loadManifest();
    const rec = audioFor(stripMarkup(line.text), line.variety);
    const ms = (rec ? rec.dur / rate : (speech.estimateMs ?? estimate)(line.text, rate)) + 1000;
    setPhase('first');
    await play(line.text, line.variety);
    if (!alive.current) return;
    setPause(ms);
    setPhase('turn');
    await new Promise((r) => setTimeout(r, ms));
    if (!alive.current) return;
    setPhase('second');
    await play(line.text, line.variety);
    if (alive.current) setPhase('idle');
  };

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-rule p-5" aria-labelledby="tirukan-title">
      <h3 id="tirukan-title" className="eyebrow">
        {t('lesson.tirukan')}
      </h3>
      <TargetSentence line={line} use="tirukan" />
      <div className="flex items-center gap-4">
        {can && (
          <button
            type="button"
            onClick={run}
            disabled={phase !== 'idle'}
            aria-label={t('lesson.tirukanPlay')}
            className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-opacity duration-quick disabled:opacity-60"
          >
            <IconPlay size={24} />
          </button>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1" aria-live="polite">
          {phase === 'turn' && (
            <>
              <span className="h-[4px] w-full overflow-hidden rounded-full bg-paper-2">
                <span
                  key={pause}
                  className="block h-full rounded-full bg-accent"
                  style={{
                    width: '100%',
                    transformOrigin: 'left',
                    animation: reduced ? undefined : `tirukan-fill ${pause}ms linear both`,
                  }}
                />
              </span>
              <span className="text-small text-muted">{t('lesson.yourTurn')}</span>
            </>
          )}
        </div>
      </div>
      <p className="text-small text-muted">{t('lesson.tirukanHint')}</p>
    </section>
  );
}
