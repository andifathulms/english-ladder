'use client';

// Spanish Ladder's rendering slots (CourseConfig.components): how Spanish lines draw per place.
import type { SentenceSlotProps } from '@ladder/core/course/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { EsLine } from './es/EsLine';

/** Core's Sentence everywhere, except Tirukan (stressed syllables lightly underlined) and lines
 *  with a variety of their own (a Spain-set dialogue). */
export function SpanishSentence({ line, use }: SentenceSlotProps) {
  const variety = line.variety === 'es' ? 'es' : 'latam';
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
      return <EsLine text={line.text} id={line.meaning?.id} variety={variety} size="body" />;
    case 'tirukan':
      return <EsLine text={line.text} id={line.meaning?.id} play={false} stress />;
  }
}
