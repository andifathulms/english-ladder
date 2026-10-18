// The imported data says what a learner will rely on (content/data/vendor/SOURCE.md spot checks).
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const load = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/data/vendor', f), 'utf8')) as T;
const words = load<{ id: string; ja: string; kana: string; alt?: string[]; jlpt: string }[]>('jlpt-words.json');
const kanji = Object.fromEntries(load<{ char: string; jlpt: string | null; strokes: number }[]>('kanji.json').map((k) => [k.char, k]));
const pitch = load<Record<string, number[]>>('pitch.json');
const jmdict = load<{ k: string[]; r: string[]; pos: string[] }[]>('jmdict.json');

describe('imported data', () => {
  it('has N5 words with their readings and permanent ids', () => {
    const taberu = words.find((w) => w.ja === '食べる')!;
    expect(taberu).toMatchObject({ kana: 'たべる', jlpt: 'N5' });
    expect(taberu.id).toMatch(/^w-n5-[0-9a-f]{8}$/);
    expect(words.find((w) => w.ja === '行く')).toMatchObject({ kana: 'いく', alt: ['ゆく'] });
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
  });

  it('gives Tokyo pitch for the minimal pairs Kana 2 teaches', () => {
    expect(pitch['箸|はし']).toEqual([1]);
    expect(pitch['橋|はし']).toEqual([2]);
    expect(pitch['雨|あめ']).toEqual([1]);
    expect(pitch['飴|あめ']).toEqual([0]);
  });

  it('has kanji levels and stroke counts, and JMdict word types', () => {
    expect(kanji['右']).toMatchObject({ jlpt: 'N5', strokes: 5 });
    expect(kanji['必']).toMatchObject({ jlpt: 'N3', strokes: 5 });
    expect(jmdict.find((e) => e.k.includes('食べる'))!.pos).toContain('v1');
  });
});
