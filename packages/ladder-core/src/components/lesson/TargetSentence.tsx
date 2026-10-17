'use client';

import type { SentenceSlotProps } from '@ladder/core/course/types';
import { useCourse } from '@ladder/core/course/context';
import { Sentence } from './Sentence';

/** The engine's own rendering of a target line, per place it appears. */
function DefaultSentence({ line, use }: SentenceSlotProps) {
  switch (use) {
    case 'example':
      return <Sentence en={line.text} id={line.meaning?.id} note={line.note} />;
    case 'worked':
      return <Sentence en={line.text} id={line.meaning?.id} />;
    case 'pairOff':
      return <Sentence en={line.text} off play={false} />;
    case 'pairNatural':
      return <Sentence en={line.text} />;
    case 'reading':
    case 'dialogue':
      return <Sentence en={line.text} id={line.meaning?.id} size="body" />;
    case 'tirukan':
      return <Sentence en={line.text} id={line.meaning?.id} play={false} />;
  }
}

/** A target-language line, rendered by the course's Sentence slot (or the engine's default). */
export function TargetSentence(props: SentenceSlotProps) {
  const C = useCourse().components?.Sentence ?? DefaultSentence;
  return <C {...props} />;
}
