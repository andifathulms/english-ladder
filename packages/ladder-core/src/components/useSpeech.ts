'use client';

import { useCallback, useEffect, useState } from 'react';
import { getVoices, onVoicesChanged, speak } from '@ladder/core/lib/speech/speak';
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
        onBoundary,
      }),
    [speech, settings],
  );
}
