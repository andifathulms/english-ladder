// Stroke names for StrokeOrder and the trace keyboard alternative (DESIGN §8.5): Indonesian names,
// with the Japanese term for how the stroke ends (とめ stop, はね flick, はらい sweep). Named from
// KanjiVG's kvg:type (a CJK stroke character, U+31C0–31E3); a stroke without a type is named from
// its shape.
import { isHookOrTurn, resample, toScreen, type Point } from '@ladder/core/lib/strokes/trace';

export type JaStrokeName = 'yoko' | 'tate' | 'hidari' | 'migi' | 'ten' | 'age' | 'kagi' | 'ore';

export const JA_STROKE_ORDER: readonly JaStrokeName[] = ['yoko', 'tate', 'hidari', 'migi', 'ten', 'age', 'kagi', 'ore'];

export const JA_STROKE_NAMES: Record<JaStrokeName, { ja: string; id: string; en: string }> = {
  yoko: { ja: 'とめ', id: 'mendatar', en: 'horizontal' },
  tate: { ja: 'とめ', id: 'tarik ke bawah', en: 'pull down' },
  hidari: { ja: 'はらい', id: 'sapuan kiri', en: 'left sweep' },
  migi: { ja: 'はらい', id: 'sapuan kanan', en: 'right sweep' },
  ten: { ja: 'とめ', id: 'titik', en: 'dot' },
  age: { ja: 'はね', id: 'naik', en: 'rising' },
  kagi: { ja: 'はね', id: 'kait', en: 'hook' },
  ore: { ja: 'とめ', id: 'belok', en: 'turn' },
};

// CJK strokes by code point − 0x31C0 (Unicode names in the comments).
const BY_TYPE: JaStrokeName[] = [
  'age', // T
  'kagi', // WG
  'kagi', // XG
  'kagi', // BXG
  'ore', // SW
  'ore', // HZZ
  'kagi', // HZG
  'ore', // HP
  'kagi', // HZWG
  'kagi', // SZWG
  'kagi', // HZT
  'ore', // HZZP
  'kagi', // HPWG
  'ore', // HZW
  'ore', // HZZZ
  'migi', // N
  'yoko', // H
  'tate', // S
  'hidari', // P
  'hidari', // SP
  'ten', // D
  'ore', // HZ
  'kagi', // HG
  'ore', // SZ
  'ore', // SWZ
  'kagi', // ST
  'kagi', // SG
  'ore', // PD
  'ore', // PZ
  'migi', // TN
  'ore', // SZZ
  'kagi', // SWG
  'kagi', // HXWG
  'kagi', // HZZZG
  'kagi', // PG
  'ore', // Q
];

/** A stroke's name from its kvg:type ("㇒", "㇐b", "㇔/㇀": the first stroke character wins). */
export function nameFromType(type: string): JaStrokeName | null {
  const cp = type.codePointAt(0);
  if (cp === undefined || cp < 0x31c0 || cp > 0x31e3) return null;
  return BY_TYPE[cp - 0x31c0];
}

/** A stroke's name from its median (y-up 1024 grid) when KanjiVG gives no type, as for most kana. */
export function nameFromShape(median: Point[]): JaStrokeName {
  const pts = resample(median.map(toScreen), 20);
  const [x0, y0] = pts[0];
  const [x1, y1] = pts[pts.length - 1];
  const len = Math.hypot(x1 - x0, y1 - y0);
  if (isHookOrTurn(median)) return 'ore';
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI; // 0 right, 90 down
  if (len < 1024 * 0.12) return 'ten';
  if (ang > -15 && ang < 15) return 'yoko';
  if (ang <= -15 && ang > -85) return 'age';
  if (ang >= 15 && ang < 70) return 'migi';
  if (ang >= 70 && ang <= 105) return 'tate';
  return 'hidari';
}

export const strokeNames = (types: string[] | undefined, medians: Point[][]): JaStrokeName[] =>
  medians.map((m, i) => nameFromType(types?.[i] ?? '') ?? nameFromShape(m));
