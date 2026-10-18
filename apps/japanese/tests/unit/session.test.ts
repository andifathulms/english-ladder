// Kana 1's romaji fade (CLAUDE.md §7.2): lessons 1–6 show, 7–8 only on new kana, 9–10 none.
import { describe, expect, it } from 'vitest';
import { romajiFor } from '@/components/slots';
import type { Rung } from '@/course/types';

describe('romaji fade', () => {
  const kana1 = { romaji: 'fade' } as Rung;
  it('follows the lesson order in Kana 1 only', () => {
    expect([1, 6, 7, 8, 9, 10].map((n) => romajiFor(kana1, n))).toEqual(['show', 'show', 'new', 'new', 'hide', 'hide']);
    expect(romajiFor({ romaji: 'none' } as Rung, 1)).toBe('hide');
  });
});
