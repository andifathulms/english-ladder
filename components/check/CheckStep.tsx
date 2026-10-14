'use client';

import { useEffect } from 'react';
import type { CheckItem, Noun } from '@/lib/types';

type Props = {
  items: CheckItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onComplete: (missed: number) => void;
  nouns?: Noun[];
};

/** Placeholder until the check engine lands. */
export function CheckStep({ onComplete }: Props) {
  useEffect(() => onComplete(0), [onComplete]);
  return null;
}
