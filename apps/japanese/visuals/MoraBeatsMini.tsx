import { morae } from '@/lib/ja/kana';

/**
 * A word as a row of beats (DESIGN §8.3), small: each mora a block, っ an empty hatched block, ー and
 * long vowels their own beats, ん its own block. For strand cards and Tirukan; the full visual (with
 * timed playback) is MoraBeats.
 */
export function MoraBeatsMini({ kana, label, lit = -1 }: { kana: string; label: string; lit?: number }) {
  const beats = morae(kana);
  return (
    <span role="img" aria-label={label} className="inline-flex flex-wrap items-center gap-[3px]">
      {beats.map((m, i) => (
        <span
          key={i}
          aria-hidden
          lang="ja"
          className={`ja flex h-[28px] min-w-[28px] items-center justify-center rounded-[4px] px-1 font-ja text-[0.9rem] leading-none transition-colors duration-quick ${
            i === lit ? 'bg-accent-soft' : 'bg-beat'
          }`}
          style={m === 'っ' || m === 'ッ' ? { backgroundImage: 'repeating-linear-gradient(135deg, var(--rule) 0 2px, transparent 2px 6px)' } : undefined}
        >
          {m === 'っ' || m === 'ッ' ? '' : m}
        </span>
      ))}
      <span aria-hidden className="label tnum ms-1 text-muted">
        {beats.length}
      </span>
    </span>
  );
}
