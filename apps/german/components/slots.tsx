'use client';

// German Ladder's rendering slots (CourseConfig.components): how German lines draw per place.
// (M3 adds the Tirukan stress view; M4 the board, chips and climb slots.)
import type { SentenceSlotProps } from '@ladder/core/course/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';

/** Core's Sentence everywhere for now. */
export function GermanSentence({ line, use }: SentenceSlotProps) {
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
