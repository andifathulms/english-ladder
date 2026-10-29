'use client';

import { useEffect } from 'react';
import { useProgress, useSettings } from '@ladder/core/components/ProgressProvider';

/**
 * The Case colours setting on <html> as data-case-colours (plan R10): theme.css resets the case tokens
 * to ink when it is "off". "Follow the rung" keeps them on until Medium 1 is climbed (PRD §5.8). Case
 * colours only appear in visuals and feedback, which render after hydration, so nothing flashes.
 */
export function caseColoursValue(setting: unknown, pastMedium1: boolean): 'on' | 'off' {
  return setting === 'off' || (setting === 'rung' && pastMedium1) ? 'off' : 'on';
}

export function CaseColours() {
  const { caseColours } = useSettings();
  const progress = useProgress();
  const value = caseColoursValue(caseColours, !!progress.rungs['medium-1']?.climbed);
  useEffect(() => {
    document.documentElement.setAttribute('data-case-colours', value);
  }, [value]);
  return null;
}
