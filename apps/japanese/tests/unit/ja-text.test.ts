// Ruby markup and normalisation (CLAUDE.md §5.2, §7.1).
import { describe, expect, it } from 'vitest';
import { normJa, parseRuby, toKana, toPlain } from '@/lib/ja/text';
import { jaAudioKey, kanaKey } from '@/lib/ja/audio';

describe('parseRuby', () => {
  it('keeps okurigana outside the ruby and reads per character', () => {
    const [w] = parseRuby('{食|た}べる');
    expect(w.segs).toEqual([
      { text: '食', ruby: ['た'], focus: false },
      { text: 'べる', focus: false },
    ]);
    expect(w.kana).toBe('たべる');
    expect(toKana('{漢字|かん|じ}')).toBe('かんじ');
  });

  it('reads a jukujikun word as a whole', () => {
    const [w] = parseRuby('{今日|=きょう}');
    expect(w.segs[0]).toMatchObject({ text: '今日', ruby: ['きょう'], whole: true });
  });

  it('lets focus wrap a ruby group, and marks lone particles', () => {
    const words = parseRuby('ボール は {箱|はこ} の [[{上|うえ}]] に あります 。');
    expect(words.find((w) => w.plain === '上')!.segs[0].focus).toBe(true);
    expect(words.filter((w) => w.isParticle).map((w) => w.plain)).toEqual(['は', 'の', 'に']);
    expect(words.at(-1)!.isPunct).toBe(true);
    expect(toPlain('ボール は {箱|はこ} の [[{上|うえ}]] に あります 。')).toBe('ボールは箱の上にあります。');
    expect(toKana('ボール は {箱|はこ} の [[{上|うえ}]] に あります 。')).toBe('ボール は はこ の うえ に あります 。');
  });

  it('rejects a reading count that matches neither the characters nor the whole word', () => {
    expect(() => parseRuby('{漢字|か|ん|じ}')).toThrow(/3 readings for 2 characters/);
  });
});

describe('normJa and audio keys', () => {
  it('removes markup and spaces and unifies width and punctuation', () => {
    expect(normJa('{箱|はこ} の [[上]] ?')).toBe('箱の上？');
    expect(normJa('ｶﾀｶﾅ')).toBe('カタカナ');
  });

  it('keys text by its reading, and kanji text by its spelling too, so homophones differ', () => {
    // 橋 (bridge) and 箸 (chopsticks) are both はし: a pitch pair needs two recordings.
    expect(jaAudioKey('{橋|はし}')).not.toBe(jaAudioKey('{箸|はし}'));
    expect(jaAudioKey('[[{橋|はし}]]')).toBe(jaAudioKey('{橋|はし}'));
    // Markup and spacing don't change the key.
    expect(jaAudioKey('わたし [[は]] ほん を よみます 。')).toBe(jaAudioKey('わたし は ほん を よみます 。'));
    expect(jaAudioKey(kanaKey('きゃ'))).toBe('kana-きゃ');
  });
});
