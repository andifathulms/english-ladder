// Audio keys, fallback rules and the recording list (CLAUDE.md §7.7, §8).
import { describe, expect, it } from 'vitest';
import { keyOf } from '../../../../packages/ladder-core/scripts/audio-lib';
import { KANA_MORAE, jaAudioKey, kanaKey, pairKey, recordingStem, shownText, soundAudio, speechFallback, spokenJa } from '@/lib/ja/audio';
import { allAudio } from '@/course/audio';
import { getCurriculum } from '@/course/content';

describe('audio keys', () => {
  it('key kana in hiragana, so katakana share the clip', () => {
    expect(kanaKey('カ')).toBe('kana-か');
    expect(jaAudioKey('kana-キャ')).toBe('kana-きゃ');
  });
  it('give a pair word the same recording as the word', () => {
    expect(jaAudioKey(pairKey('{箸|はし}'))).toBe(jaAudioKey('{箸|はし}'));
    expect(spokenJa(pairKey('{箸|はし}'))).toBe('はし');
  });
  it('never fall back to speech for single kana or pairs', () => {
    expect(speechFallback('kana-あ')).toBe(false);
    expect(speechFallback(pairKey('おばさん'))).toBe(false);
    expect(speechFallback('{今日|=きょう} は')).toBe(true);
  });
  it('show the text itself when nothing can play', () => {
    expect(shownText('kana-あ')).toBe('あ');
    expect(shownText(pairKey('おばさん'))).toBe('おばさん');
  });
  it('name recordings in ASCII and read the names back', () => {
    expect(recordingStem('kana-きゃ')).toBe('kana-u304d-u3083');
    expect(keyOf('kana-u304d-u3083')).toBe('kana-きゃ');
    expect(keyOf(recordingStem('kana-ぴょ'))).toBe('kana-ぴょ');
    expect(keyOf('0123456789ab')).toBe('0123456789ab');
    expect(keyOf('syl-lv3')).toBe('syl-lv3');
  });
});

describe('the kana set', () => {
  it('has 46 plain, 25 voiced and 33 contracted morae, all distinct hiragana', () => {
    expect(KANA_MORAE).toHaveLength(104);
    expect(new Set(KANA_MORAE).size).toBe(104);
    for (const k of KANA_MORAE) expect(k).toMatch(/^[ぁ-ゖ]{1,2}$/u);
    expect(KANA_MORAE).toContain('ん');
    expect(KANA_MORAE).toContain('ぴょ');
  });
});

describe('Bunyi words', () => {
  it('play single kana as kana, pairs as pairs, other words as text', () => {
    expect(soundAudio('kana', { ja: 'あ', kana: 'あ' })).toBe('kana-あ');
    expect(soundAudio('long-vowel', { ja: 'おばあさん', kana: 'おばあさん' })).toBe(pairKey('おばあさん'));
    expect(soundAudio('n', { ja: 'ほん', kana: 'ほん' })).toBe('ほん');
  });
});

describe('the recording list', () => {
  const kanaRungs = getCurriculum().filter((r) => r.tier === 'kana');
  const rows = allAudio(kanaRungs);
  it('covers the whole kana set when a Kana rung is in', () => {
    expect(rows.filter((r) => r.kind === 'kana').length).toBeGreaterThanOrEqual(104);
  });
  it('lists lesson lines by key, once', () => {
    expect(new Set(rows.map((r) => r.key)).size).toBe(rows.length);
    expect(rows.find((r) => r.text === 'いえ')).toMatchObject({ kind: 'text', where: 'kana-1/01-lima-vokal' });
  });
  it('lists nothing while no rung is live', () => {
    expect(allAudio()).toEqual([]);
  });
});
