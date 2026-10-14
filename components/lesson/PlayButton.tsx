'use client';

import { IconPlay } from '../ui/Icon';
import { useT } from '../ProgressProvider';
import { useCanSpeak } from '../useSpeech';

type Props = { text: string; onPlay: () => void; playing?: boolean; small?: boolean };

/** 40px icon-only play button. Renders nothing when the browser can't speak English. */
export function PlayButton({ text, onPlay, playing, small }: Props) {
  const { t } = useT();
  const ok = useCanSpeak();
  if (!ok) return null;
  return (
    <button
      type="button"
      onClick={onPlay}
      data-play
      aria-label={t('audio.playText', { text })}
      aria-pressed={playing || undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-accent transition-colors duration-quick hover:bg-accent-soft ${
        small ? 'h-[40px] w-[40px]' : 'h-[44px] w-[44px]'
      } ${playing ? 'bg-accent-soft' : ''}`}
    >
      <IconPlay size={small ? 16 : 18} />
    </button>
  );
}
