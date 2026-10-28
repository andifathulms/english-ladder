'use client';

import { stripMarkup } from '@ladder/core/lib/markup';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useState } from 'react';
import { StressWords } from './StressWords';

/** BCP 47 tag of a Spanish line: Latin American lines are es-419, España lines es-ES (DESIGN §11). */
export const langOf = (variety?: string) => (variety === 'es' ? 'es-ES' : 'es-419');

type Props = { text: string; id?: string; variety?: 'latam' | 'es'; size?: 'sentence' | 'body'; play?: boolean; stress?: boolean; className?: string };

/**
 * A Spanish line that plays in its own variety. Latin American lines use the engine's Sentence
 * (word highlighting while speaking); Spain lines and Tirukan's stress view draw their own.
 */
export function EsLine({ text, id, variety = 'latam', size = 'sentence', play = true, stress = false, className = '' }: Props) {
  const playFn = usePlay();
  const [playing, setPlaying] = useState(false);
  if (variety === 'latam' && !stress) return <Sentence en={text} id={id} size={size} play={play} className={className} />;
  const plain = stripMarkup(text);
  const onPlay = async () => {
    setPlaying(true);
    await playFn(plain, variety);
    setPlaying(false);
  };
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-start gap-2">
        <p lang={langOf(variety)} className={`${size === 'sentence' ? 'font-display text-sentence font-medium' : 'text-body'} min-w-0 flex-1 text-start text-ink`}>
          {stress ? <StressWords text={text} /> : plain}
        </p>
        {play && (
          <span className={size === 'sentence' ? 'mt-[2px]' : '-mt-[8px]'}>
            <PlayButton text={plain} variety={variety} onPlay={onPlay} playing={playing} small />
          </span>
        )}
      </div>
      {id && (
        <p lang="id" className="id-text">
          {id}
        </p>
      )}
    </div>
  );
}
