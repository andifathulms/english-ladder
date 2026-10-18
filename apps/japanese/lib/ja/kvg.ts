// KanjiVG → the shared stroke format (CLAUDE.md §5.6, §7.5). Pure: used by scripts/strokes-extract.ts
// at build time and by its tests. KanjiVG strokes are centrelines in a 109 box, y down; the stroke
// file keeps them as they are (kind 'centreline') and adds medians sampled from them in the matcher's
// y-up 1024 grid (lib/strokes/trace.ts: y = 900 − screen y).
import type { Point, StrokeData } from '@ladder/core/lib/strokes/trace';

export const KVG_SIZE = 109;

type Seg = { cmd: string; args: number[] };

/** Splits an SVG path into commands with their numbers ("5.25-0.5" and ".5.5" included). */
export function parsePath(d: string): Seg[] {
  const out: Seg[] = [];
  const re = /([MmCcSsLlHhVvZzQqTt])|(-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d))) {
    if (m[1]) out.push({ cmd: m[1], args: [] });
    else if (out.length) out[out.length - 1].args.push(Number(m[2]));
  }
  return out;
}

const cubic = (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};

/** Points along a path in its own space (y down): every curve sampled at `per` steps. */
export function samplePath(d: string, per = 8): Point[] {
  const pts: Point[] = [];
  let cur: Point = [0, 0];
  let start: Point = [0, 0];
  let lastCtrl: Point | null = null;
  const curve = (c1: Point, c2: Point, end: Point) => {
    for (let i = 1; i <= per; i++) pts.push(cubic(cur, c1, c2, end, i / per));
    lastCtrl = c2;
    cur = end;
  };
  const line = (end: Point) => {
    pts.push(end);
    lastCtrl = null;
    cur = end;
  };
  for (const { cmd, args } of parsePath(d)) {
    const rel = cmd === cmd.toLowerCase();
    const at = (x: number, y: number): Point => (rel ? [cur[0] + x, cur[1] + y] : [x, y]);
    switch (cmd.toUpperCase()) {
      case 'M':
        for (let i = 0; i + 1 < args.length; i += 2) {
          const p = at(args[i], args[i + 1]);
          if (i === 0) {
            cur = p;
            start = p;
            pts.push(p);
            lastCtrl = null;
          } else line(p);
        }
        break;
      case 'L':
        for (let i = 0; i + 1 < args.length; i += 2) line(at(args[i], args[i + 1]));
        break;
      case 'H':
        for (const x of args) line(rel ? [cur[0] + x, cur[1]] : [x, cur[1]]);
        break;
      case 'V':
        for (const y of args) line(rel ? [cur[0], cur[1] + y] : [cur[0], y]);
        break;
      case 'C':
        for (let i = 0; i + 5 < args.length; i += 6) {
          const base = cur;
          const p = (x: number, y: number): Point => (rel ? [base[0] + x, base[1] + y] : [x, y]);
          curve(p(args[i], args[i + 1]), p(args[i + 2], args[i + 3]), p(args[i + 4], args[i + 5]));
        }
        break;
      case 'S':
        for (let i = 0; i + 3 < args.length; i += 4) {
          const base = cur;
          const p = (x: number, y: number): Point => (rel ? [base[0] + x, base[1] + y] : [x, y]);
          const prev = lastCtrl as Point | null;
          const c1: Point = prev ? [2 * cur[0] - prev[0], 2 * cur[1] - prev[1]] : cur;
          curve(c1, p(args[i], args[i + 1]), p(args[i + 2], args[i + 3]));
        }
        break;
      case 'Z':
        line(start);
        break;
      default:
        throw new Error(`Unsupported path command ${cmd} in KanjiVG path`);
    }
  }
  return pts;
}

/** A point in the KanjiVG box (y down) in the matcher's y-up 1024 grid. */
export const toGrid = ([x, y]: Point, size = KVG_SIZE): Point => {
  const k = 1024 / size;
  return [round1(x * k), round1(900 - y * k)];
};

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The stroke paths and their types (kvg:type) of one KanjiVG file, in stroke order. */
export function readKvg(svg: string): { strokes: string[]; types: string[] } {
  const strokes: string[] = [];
  const types: string[] = [];
  const re = /<path\b([^>]*)\/?>/g;
  let m: RegExpExecArray | null;
  const order: { n: number; d: string; type: string }[] = [];
  while ((m = re.exec(svg))) {
    const attrs = m[1];
    const id = /\bid="[^"]*-s(\d+)"/.exec(attrs);
    const d = /\bd="([^"]+)"/.exec(attrs);
    if (!id || !d) continue;
    order.push({ n: Number(id[1]), d: d[1], type: /kvg:type="([^"]*)"/.exec(attrs)?.[1] ?? '' });
  }
  order.sort((a, b) => a.n - b.n);
  for (const s of order) {
    strokes.push(s.d);
    types.push(s.type);
  }
  return { strokes, types };
}

/** The shared stroke file for one KanjiVG character. */
export function kvgToStrokes(svg: string): StrokeData {
  const { strokes, types } = readKvg(svg);
  return {
    kind: 'centreline',
    size: KVG_SIZE,
    strokes,
    medians: strokes.map((d) => thin(samplePath(d).map((p) => toGrid(p)))),
    types,
  };
}

/** Drops points closer than 4 grid units to the last kept one (the matcher resamples anyway). */
function thin(pts: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (!q || Math.hypot(p[0] - q[0], p[1] - q[1]) >= 4) out.push(p);
  }
  const last = pts[pts.length - 1];
  if (last && out[out.length - 1] !== last) out.push(last);
  return out;
}
