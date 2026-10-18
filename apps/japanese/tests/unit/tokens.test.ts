// Contrast of the Japanese palette (DESIGN §3.3, CLAUDE.md §7.9), both themes, including the seal.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const css = fs.readFileSync(path.join(process.cwd(), 'styles/theme.css'), 'utf8');
const core = fs.readFileSync(path.join(process.cwd(), '../../packages/ladder-core/src/styles/tokens.css'), 'utf8');
const block = (src: string, sel: string) => {
  const i = src.indexOf(sel);
  return Object.fromEntries([...src.slice(i, src.indexOf('}', i)).matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
};
const light = { ...block(core, ':root {'), ...block(css, ':root {') };
const dark = { ...block(core, ":root[data-theme='dark'] {"), ...block(css, ":root[data-theme='dark'] {") };

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme', (_name, t) => {
  it.each([
    ['ink', 'paper'],
    ['muted', 'paper'],
    ['accent', 'paper'],
    ['accent', 'accent-soft'],
    ['board-ink', 'board'],
    ['brass', 'board'],
    ['pitch', 'surface'],
    ['good', 'good-bg'],
    ['off', 'off-bg'],
    ['kana', 'paper'],
  ])('%s on %s ≥ 4.5', (fg, bg) => {
    expect(ratio(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it('the seal: white on --seal ≥ 4.5', () => {
    expect(ratio('#FFFFFF', t.seal ?? light.seal)).toBeGreaterThanOrEqual(4.5);
  });
});
