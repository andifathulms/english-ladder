// The Japanese font subsets cover every kana and every Japanese character the site uses, and the
// Klee One Regular subset stays under its 400 KB budget (CLAUDE.md §7.6). Needs npm run fonts:subset.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ALL_KANA, usedChars } from '@/course/usedChars';
import { fonts } from '@/fonts.config';

const manifestFile = path.join(process.cwd(), 'styles/fonts-ja.json');
const manifest = fs.existsSync(manifestFile)
  ? (JSON.parse(fs.readFileSync(manifestFile, 'utf8')) as { chars: string; slices: { face: string; bytes: number }[] })
  : null;

describe.skipIf(!manifest)('Japanese font subsets', () => {
  it('cover every kana and every Japanese character in content and the UI', () => {
    const covered = new Set(manifest!.chars);
    expect(ALL_KANA.filter((c) => !covered.has(c))).toEqual([]);
    expect(usedChars().ordered.filter((c) => !covered.has(c))).toEqual([]);
  });

  it('keep Klee One Regular under budget', () => {
    const klee = manifest!.slices.filter((s) => s.face === 'klee-400').reduce((n, s) => n + s.bytes, 0);
    expect(klee).toBeLessThanOrEqual(fonts.budget.bytes);
  });

  it('use Japanese faces only, never the Chinese ones', () => {
    expect(fonts.faces.map((f) => f.family)).toEqual(['Ladder Klee One', 'Ladder Klee One', 'Ladder Noto JP', 'Ladder Noto JP']);
    expect(fonts.sources.every((s) => !/WenKai|NotoSansSC/.test(s.file))).toBe(true);
  });
});
