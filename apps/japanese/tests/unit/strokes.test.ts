import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { startTrace, totalMisses, traceStep, TRACE_CONFIG, type Point } from '@ladder/core/lib/strokes/trace';
import type { TraceSample } from '@ladder/core/lib/strokes/synth';
import { kvgToStrokes, parsePath, readKvg, samplePath, toGrid } from '@/lib/ja/kvg';
import { JA_STROKE_NAMES, JA_STROKE_ORDER, nameFromShape, nameFromType, strokeNames } from '@/lib/ja/strokeNames';
import { strokes } from '@/components/strokes';

const SVG = path.join(process.cwd(), 'tests', 'fixtures', 'kanjivg');
const svg = (ch: string) => fs.readFileSync(path.join(SVG, `${ch.codePointAt(0)!.toString(16).padStart(5, '0')}.svg`), 'utf8');

type Fixture = { char: string; medians: Point[][]; samples: TraceSample[] };
const DIR = path.join(process.cwd(), 'tests', 'fixtures', 'traces');
const fixtures: Fixture[] = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')));

const cfg = { ...TRACE_CONFIG, ...strokes.config };

describe('KanjiVG paths', () => {
  it('splits numbers that run together', () => {
    expect(parsePath('M43.25,68c5.25-0.5,29.75-3.25,37-3.75')).toEqual([
      { cmd: 'M', args: [43.25, 68] },
      { cmd: 'c', args: [5.25, -0.5, 29.75, -3.25, 37, -3.75] },
    ]);
    expect(parsePath('M1.5.5l.5-.5')).toEqual([
      { cmd: 'M', args: [1.5, 0.5] },
      { cmd: 'l', args: [0.5, -0.5] },
    ]);
  });
  it('samples relative curves and smooth curves from the current point', () => {
    const pts = samplePath('M10,10c0,0,10,0,10,0s10,0,10,0', 4);
    expect(pts[0]).toEqual([10, 10]);
    expect(pts[4]).toEqual([20, 10]);
    expect(pts[8]).toEqual([30, 10]);
  });
  it('maps the 109 box to the y-up 1024 grid', () => {
    expect(toGrid([0, 0])).toEqual([0, 900]);
    expect(toGrid([109, 109])).toEqual([1024, -124]);
  });
  it('keeps strokes in KanjiVG order with their types', () => {
    const { strokes: s, types } = readKvg(svg('右'));
    expect(s).toHaveLength(5);
    expect(types).toEqual(['㇒', '㇐', '㇑', '㇕b', '㇐b']);
  });
  it('writes centreline stroke files with medians from the pen paths', () => {
    const d = kvgToStrokes(svg('一'));
    expect(d).toMatchObject({ kind: 'centreline', size: 109 });
    expect(d.strokes).toHaveLength(1);
    const m = d.medians[0];
    // 一 is drawn left to right, around the middle.
    expect(m[0][0]).toBeLessThan(m[m.length - 1][0]);
    expect(Math.abs(m[0][1] - 900 + 512)).toBeLessThan(150);
  });
});

// Japanese order, not Chinese (PRD §9, DESIGN §14).
describe('stroke order spot checks', () => {
  const types = (ch: string) => readKvg(svg(ch)).types.map((t) => t[0]);
  it('右 starts with the sweep ノ, 左 with the horizontal', () => {
    expect(types('右')[0]).toBe('㇒');
    expect(types('左')[0]).toBe('㇐');
  });
  it('必: the top dot, then ノ, then the hook, then the two dots', () => {
    expect(types('必')).toEqual(['㇔', '㇒', '㇃', '㇔', '㇔']);
  });
  it('生: the vertical comes before the two lower horizontals', () => {
    expect(types('生')).toEqual(['㇒', '㇐', '㇑', '㇐', '㇐']);
  });
});

describe('trace fixtures', () => {
  it('cover 20 kana and 20 kanji', () => {
    expect(fixtures.length).toBe(40);
    expect(fixtures.filter((f) => /[ぁ-ヺ]/u.test(f.char))).toHaveLength(20);
  });
  for (const fx of fixtures) {
    describe(fx.char, () => {
      for (const sample of fx.samples) {
        it(`${sample.label}: ${sample.misses} miss(es), finished`, () => {
          let s = startTrace(fx.medians.length);
          const judged = [];
          for (const d of sample.strokes) {
            const r = traceStep(s, d, fx.medians, cfg);
            s = r.state;
            judged.push(r.judgement);
          }
          expect(s.done).toBe(true);
          expect(totalMisses(s)).toBe(sample.misses);
          expect(totalMisses(s) <= cfg.passMisses).toBe(true);
          if (sample.firstMiss) expect(judged[0]).toMatchObject({ result: 'miss', why: sample.firstMiss });
        });
      }
    });
  }
  it('the fixtures match what the extractor writes now', () => {
    for (const fx of fixtures) expect(kvgToStrokes(svg(fx.char)).medians).toEqual(fx.medians);
  });
});

describe('stroke names', () => {
  it('cover every CJK stroke character', () => {
    for (let cp = 0x31c0; cp <= 0x31e3; cp++) expect(JA_STROKE_ORDER).toContain(nameFromType(String.fromCodePoint(cp)));
    expect(nameFromType('')).toBeNull();
    expect(nameFromType('a')).toBeNull();
  });
  it('name 右 from its types', () => {
    const d = kvgToStrokes(svg('右'));
    expect(strokeNames(d.types, d.medians)).toEqual(['hidari', 'yoko', 'tate', 'ore', 'yoko']);
  });
  it('name a stroke without a type from its shape', () => {
    const line = (a: Point, b: Point): Point[] => [a, b];
    expect(nameFromShape(line([200, 500], [800, 500]))).toBe('yoko');
    expect(nameFromShape(line([500, 800], [500, 100]))).toBe('tate');
    expect(nameFromShape(line([600, 800], [250, 200]))).toBe('hidari');
    expect(nameFromShape(line([400, 700], [450, 640]))).toBe('ten');
  });
  it('give every name an ending term', () => {
    for (const n of JA_STROKE_ORDER) expect(['とめ', 'はね', 'はらい']).toContain(JA_STROKE_NAMES[n].ja);
  });
});

describe('stroke files', () => {
  const OUT = path.join(process.cwd(), 'public', 'strokes');
  it('exist for every kana and are centreline KanjiVG data', () => {
    for (const ch of ['あ', 'ん', 'ア', 'ン']) {
      const d = JSON.parse(fs.readFileSync(path.join(OUT, `${ch.codePointAt(0)!.toString(16)}.json`), 'utf8'));
      expect(d.kind).toBe('centreline');
      expect(d.strokes.length).toBe(d.medians.length);
    }
  });
});
