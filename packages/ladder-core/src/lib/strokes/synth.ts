// Synthetic labelled traces for a course's matcher fixtures (build-time test tooling, not runtime).
// Drawn from a character's medians with seeded jitter, NOT recorded by hand:
//   correct   every stroke in order, small jitter            → 0 misses
//   sloppy    big jitter, shifted and shrunk, still in order  → 0 misses
//   reversed  the first stroke drawn backwards, then correct  → 1 miss
//   order     the second stroke drawn first, then correct     → 1 miss, judged "order"
// "reversed" and "order" are only written when unambiguous (long first stroke; first two strokes
// starting far apart). Same algorithm as Mandarin's scripts/make-trace-fixtures.ts.
import { rng } from '../check/random';
import { resample, toScreen, type Point } from './trace';

export type TraceSample = { label: string; strokes: Point[][]; misses: number; firstMiss?: 'order' | 'shape' };

function gauss(r: () => number) {
  // Box–Muller
  const u = Math.max(r(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

function draw(median: Point[], r: () => number, opts: { sigma: number; dx: number; dy: number; scale?: number; reverse?: boolean }): Point[] {
  let pts = resample(median.map(toScreen), 24);
  if (opts.reverse) pts = [...pts].reverse();
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const sc = opts.scale ?? 1;
  // Hands wobble slowly over a stroke: noise at four control points, interpolated along it.
  const ctrl = Array.from({ length: 4 }, () => [gauss(r), gauss(r)]);
  const smooth = pts.map((_, i) => {
    const t = (i / (pts.length - 1)) * (ctrl.length - 1);
    const k = Math.min(Math.floor(t), ctrl.length - 2);
    const f = t - k;
    return [ctrl[k][0] * (1 - f) + ctrl[k + 1][0] * f, ctrl[k][1] * (1 - f) + ctrl[k + 1][1] * f];
  });
  return pts.map(([x, y], i) => [Math.round(cx + (x - cx) * sc + opts.dx + smooth[i][0] * opts.sigma), Math.round(cy + (y - cy) * sc + opts.dy + smooth[i][1] * opts.sigma)] as Point);
}

export function synthSamples(medians: Point[][], seed: number): TraceSample[] {
  const r = rng(seed);
  const samples: TraceSample[] = [];
  samples.push({ label: 'correct', strokes: medians.map((m) => draw(m, r, { sigma: 10, dx: 6, dy: -4 })), misses: 0 });
  samples.push({ label: 'sloppy', strokes: medians.map((m) => draw(m, r, { sigma: 22, dx: 40, dy: 30, scale: 0.88 })), misses: 0 });
  const s0 = resample(medians[0].map(toScreen), 8);
  if (Math.hypot(s0[7][0] - s0[0][0], s0[7][1] - s0[0][1]) > 250) {
    samples.push({
      label: 'reversed',
      strokes: [draw(medians[0], r, { sigma: 8, dx: 0, dy: 0, reverse: true }), ...medians.map((m) => draw(m, r, { sigma: 8, dx: 0, dy: 0 }))],
      misses: 1,
    });
  }
  if (medians.length >= 2) {
    const a = toScreen(medians[0][0]);
    const b = toScreen(medians[1][0]);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 0.3 * 1024) {
      samples.push({
        label: 'order',
        strokes: [draw(medians[1], r, { sigma: 8, dx: 0, dy: 0 }), ...medians.map((m) => draw(m, r, { sigma: 8, dx: 0, dy: 0 }))],
        misses: 1,
        firstMiss: 'order',
      });
    }
  }
  return samples;
}
