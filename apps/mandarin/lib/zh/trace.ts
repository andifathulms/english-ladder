// Mandarin's stroke names (DESIGN §8.5) and the heuristic that names a stroke from its median. The
// geometry and the matcher are core's (@ladder/core/lib/strokes/trace), re-exported here.
import { GRID, resample, toScreen, turns, type Point } from '@ladder/core/lib/strokes/trace';

export * from '@ladder/core/lib/strokes/trace';

export type StrokeName = 'heng' | 'shu' | 'pie' | 'dian' | 'na' | 'ti' | 'zhe' | 'gou';

/** The eight basic strokes (DESIGN §8.5): 横 竖 撇 点 捺 提 折 钩. */
export const STROKE_NAMES: Record<StrokeName, { zh: string; py: string; id: string; en: string }> = {
  heng: { zh: '横', py: 'héng', id: 'mendatar', en: 'horizontal' },
  shu: { zh: '竖', py: 'shù', id: 'tegak', en: 'vertical' },
  pie: { zh: '撇', py: 'piě', id: 'sapuan kiri', en: 'left-falling' },
  dian: { zh: '点', py: 'diǎn', id: 'titik', en: 'dot' },
  na: { zh: '捺', py: 'nà', id: 'sapuan kanan', en: 'right-falling' },
  ti: { zh: '提', py: 'tí', id: 'naik', en: 'rising' },
  zhe: { zh: '折', py: 'zhé', id: 'belok', en: 'turning' },
  gou: { zh: '钩', py: 'gōu', id: 'kait', en: 'hook' },
};

/**
 * Names a stroke from its median. The stroke data carries no types, so this is a heuristic: a sharp
 * turn makes it 折, or 钩 in the last 30%; otherwise direction and length decide. Characters that
 * lessons teach stroke by stroke get authored names (content/data/stroke-names.yaml), which win.
 */
export function classifyStroke(median: Point[]): StrokeName {
  const pts = resample(median.map(toScreen), 20);
  const t = turns(pts);
  const [x0, y0] = pts[0];
  const [x1, y1] = pts[pts.length - 1];
  const dx = x1 - x0;
  const dy = y1 - y0; // screen space: down is positive
  const len = Math.hypot(dx, dy);
  // The pen's entry (the first 15%) often curls; it is not a turn. A turn in the last 30% is a hook.
  const skip = Math.ceil(t.length * 0.15);
  const sharp = t.findIndex((a, i) => i >= skip && a + (t[i + 1] ?? 0) + (t[i + 2] ?? 0) > 65);
  if (sharp >= 0) return sharp >= t.length * 0.7 ? 'gou' : 'zhe';
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI; // 0 right, 90 down
  if (len < GRID * 0.08) return 'dian';
  if (ang > -12 && ang < 15) return 'heng';
  if (len < GRID * 0.18 && !(ang >= 68 && ang <= 112)) return 'dian';
  // Direction of the last third: a vertical that sweeps left at the end is a 撇.
  const k = Math.floor(pts.length * 0.66);
  const endAng = (Math.atan2(y1 - pts[k][1], x1 - pts[k][0]) * 180) / Math.PI;
  if (ang > -12 && ang < 15) return 'heng';
  if (ang <= -12 && ang > -85) return 'ti';
  if (ang >= 15 && ang < 68) return len < GRID * 0.26 ? 'dian' : 'na';
  if (ang >= 68 && ang <= 112) return endAng > 125 ? 'pie' : 'shu';
  if (ang > 112) return 'pie';
  return 'heng';
}

