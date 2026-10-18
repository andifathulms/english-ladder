import { pitchPattern } from '@/lib/ja/kana';

const W = 22;
const HI = 6;
const LO = 20;

/**
 * Pitch accent over a word's morae (DESIGN §8.4), small: high on the upper rail, low on the lower,
 * joined by a line in --pitch; the following particle in --muted shows whether the pitch drops onto it.
 */
export function PitchLineMini({ kana, accent, label }: { kana: string; accent: number; label: string }) {
  const { morae, particleHigh } = pitchPattern(kana, accent);
  const pts = [...morae.map((m) => m.high), particleHigh];
  const width = pts.length * W;
  const y = (h: boolean) => (h ? HI : LO);
  return (
    <span role="img" aria-label={label} className="inline-flex flex-col items-start">
      <svg width={width} height={26} viewBox={`0 0 ${width} 26`} aria-hidden focusable={false}>
        <polyline
          points={pts.map((h, i) => `${i * W + W / 2},${y(h)}`).join(' ')}
          fill="none"
          stroke="var(--pitch)"
          strokeWidth={1.5}
          strokeDasharray={undefined}
        />
        {pts.map((h, i) => (
          <circle key={i} cx={i * W + W / 2} cy={y(h)} r={3} fill={i === pts.length - 1 ? 'var(--paper-2)' : 'var(--pitch)'} stroke="var(--pitch)" strokeWidth={1.5} />
        ))}
      </svg>
      <span aria-hidden lang="ja" className="ja flex font-ja text-[0.85rem] leading-none">
        {morae.map((m, i) => (
          <span key={i} className={`inline-block whitespace-nowrap text-center ${[...m.mora].length > 1 ? 'text-[0.7rem]' : ''}`} style={{ width: W }}>
            {m.mora}
          </span>
        ))}
        <span className="inline-block text-center text-muted" style={{ width: W }}>
          が
        </span>
      </span>
    </span>
  );
}
