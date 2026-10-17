'use client';

import { useCallback, useEffect, useState } from 'react';
import { canSpeak, onVoicesChanged, speak } from '@ladder/core/lib/speech/speak';
import { useSettings } from './ProgressProvider';

/** Whether English speech is available, updated when voices load. False on the server. */
export function useCanSpeak(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(canSpeak());
    const off = onVoicesChanged(() => setOk(canSpeak()));
    return () => {
      off();
    };
  }, []);
  return ok;
}

export function useSpeak() {
  const { accent, voice, rate } = useSettings();
  return useCallback(
    (text: string, onBoundary?: (i: number) => void) => speak(text, { accent, gender: voice, rate, onBoundary }),
    [accent, voice, rate],
  );
}
