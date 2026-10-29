import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// DESIGN §3.2: the measured contrasts (gender and case tokens included), re-checked in both themes.
const css = fs.readFileSync(path.join(__dirname, '../../styles/theme.css'), 'utf8');

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
}
const light = block(':root {');
const dark = block(":root[data-theme='dark']");

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [foreground, background, minimum]: text pairs need 4.5, the olive subject (a shape) 3.
const PAIRS: [string, string, number][] = [
  ['accent', 'paper', 4.5],
  ['board-ink', 'board', 4.5],
  ['board-muted', 'board', 4.5],
  ['masc', 'surface', 4.5],
  ['fem', 'surface', 4.5],
  ['neut', 'surface', 4.5],
  ['work', 'surface', 4.5],
  ['akk', 'surface', 4.5],
  ['dat', 'surface', 4.5],
  ['gen', 'surface', 4.5],
  ['off', 'off-bg', 4.5],
  ['ink', 'paper', 4.5],
  ['muted', 'paper', 4.5],
  ['dasar', 'paper', 4.5],
  ['subject', 'paper-2', 3],
];

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme contrast', (_name, t) => {
  // Dark redefines only what differs; fall back to the light value.
  const v = (k: string) => t[k] ?? light[k];
  it.each(PAIRS)('%s on %s ≥ %s', (fg, bg, min) => {
    expect(v(fg), fg).toBeDefined();
    expect(contrast(v(fg), v(bg))).toBeGreaterThanOrEqual(min);
  });
});

it('the measured light values in DESIGN §3.2 hold (on --surface)', () => {
  const on = (k: string) => contrast(light[k], light.surface);
  expect(contrast(light.accent, light.paper)).toBeGreaterThan(5.5);
  expect(on('masc')).toBeGreaterThan(5.8);
  expect(on('fem')).toBeGreaterThan(5.3);
  expect(on('neut')).toBeGreaterThan(6.4);
  expect(on('akk')).toBeGreaterThan(6.3);
  expect(on('dat')).toBeGreaterThan(6.3);
  expect(on('gen')).toBeGreaterThan(6.7);
  expect(contrast(light['board-ink'], light.board)).toBeGreaterThan(9.2);
});
