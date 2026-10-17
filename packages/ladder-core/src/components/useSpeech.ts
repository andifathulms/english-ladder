'use client';

import { useCallback, useEffect, useState } from 'react';
import { getVoices, onVoicesChanged, speak } from '@ladder/core/lib/speech/speak';
import { audioEnabled, audioFor, loadManifest, onManifest, play } from '@ladder/core/lib/speech/audio';
import { useCourse } from '@ladder/core/course/context';
import { useSettings } from './ProgressProvider';

/** Whether target-language speech is available, updated when voices load. False on the server. */
export function useCanSpeak(): boolean {
  const { speech } = useCourse();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const check = () => setOk(speech.canSpeak(getVoices()));
    check();
    const off = onVoicesChanged(check);
    return () => {
      off();
    };
  }, [speech]);
  return ok;
}

export function useSpeak() {
  const { speech } = useCourse();
  const settings = useSettings();
  return useCallback(
    (text: string, onBoundary?: (i: number) => void) =>
      speak(text, {
        score: (v) => speech.voiceScorer(v, settings),
        sentenceSplit: speech.sentenceSplit,
        rate: settings.rate,
        rateScale: speech.rateScale,
        onBoundary,
      }),
    [speech, settings],
  );
}

/** Whether this string can be played: a recording (courses with audio) or a target voice. */
export function useCanPlay(text: string, variety?: string): boolean {
  const { speech } = useCourse();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const check = () => setOk(!!audioFor(text, variety) || speech.canSpeak(getVoices()));
    check();
    if (audioEnabled()) void loadManifest().then(check);
    const offV = onVoicesChanged(check);
    const offM = onManifest(check);
    return () => {
      offV();
      offM();
    };
  }, [text, variety, speech]);
  return ok;
}

/** Plays target text: its recording when there is one, else browser speech. `onWord` gets word indexes. */
export function usePlay() {
  const { speech, text: rules } = useCourse();
  const settings = useSettings();
  return useCallback(
    (text: string, variety?: string, onWord?: (i: number) => void) =>
      play(text, {
        variety,
        score: (v) => speech.voiceScorer(v, settings, variety),
        sentenceSplit: speech.sentenceSplit,
        rate: settings.rate,
        rateScale: speech.rateScale,
        onWord,
        tokenise: rules.tokenise,
      }),
    [speech, settings, rules],
  );
}
