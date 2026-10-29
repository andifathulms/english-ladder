'use client';

// German Ladder's rendering slots (CourseConfig.components): how German lines draw per place.
// (M4 adds the board, chips and climb slots.)
import type { SentenceSlotProps } from '@ladder/core/course/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { StressWords } from './de/StressWords';

/** Tirukan: the line to repeat, each word's stressed syllable underlined (no play button: the card has its own). */
function TirukanLine({ text, id }: { text: string; id?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p lang="de" className="font-display text-sentence font-medium text-ink">
        <StressWords text={text} />
      </p>
      {id && (
        <p lang="id" className="id-text">
          {id}
        </p>
      )}
    </div>
  );
}

/** Core's Sentence everywhere, and the stress view for Tirukan. */
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
      return <TirukanLine text={line.text} id={line.meaning?.id} />;
  }
}
