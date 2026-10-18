// lib/ja: morae, pitch, counters, conjugation, script conversion (CLAUDE.md §9).
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { morae, pitchPattern, toHiragana, toKatakana } from '@/lib/ja/kana';
import { counterReading, counterReadings, soundChange, type Counter } from '@/lib/ja/counters';
import { conjugate, type Target } from '@/lib/ja/conjugate';

describe('morae', () => {
  it('counts small ゃゅょ with the kana before; っ, ん, ー and long vowels are beats', () => {
    expect(morae('きゃ')).toEqual(['きゃ']);
    expect(morae('きって')).toHaveLength(3);
    expect(morae('おばあさん')).toEqual(['お', 'ば', 'あ', 'さ', 'ん']);
    expect(morae('コーヒー')).toEqual(['コ', 'ー', 'ヒ', 'ー']);
    expect(morae('とうきょう')).toEqual(['と', 'う', 'きょ', 'う']);
    expect(morae('しゅっぱつ')).toEqual(['しゅ', 'っ', 'ぱ', 'つ']);
  });
});

describe('pitchPattern', () => {
  const hl = (kana: string, n: number) => {
    const p = pitchPattern(kana, n);
    return p.morae.map((m) => (m.high ? 'H' : 'L')).join('') + (p.particleHigh ? '+H' : '+L');
  };
  it('reads Tokyo accent numbers 0–4', () => {
    expect(hl('さくら', 0)).toBe('LHH+H'); // heiban
    expect(hl('はし', 1)).toBe('HL+L'); // 箸: atamadaka
    expect(hl('はし', 2)).toBe('LH+L'); // 橋: odaka, drops onto the particle
    expect(hl('たまご', 2)).toBe('LHL+L'); // nakadaka
    expect(hl('いもうと', 4)).toBe('LHHH+L'); // odaka
    expect(hl('いもうと', 3)).toBe('LHHL+L');
    expect(hl('え', 0)).toBe('L+H');
  });
});

describe('counters', () => {
  const counters = yaml.load(fs.readFileSync(path.join(process.cwd(), 'content/data/counters.yaml'), 'utf8')) as Counter[];
  it.each([
    ['本', ['いっぽん', 'にほん', 'さんぼん', 'よんほん', 'ごほん', 'ろっぽん', 'ななほん', 'はっぽん', 'きゅうほん', 'じゅっぽん']],
    ['枚', ['いちまい', 'にまい', 'さんまい', 'よんまい', 'ごまい', 'ろくまい', 'ななまい', 'はちまい', 'きゅうまい', 'じゅうまい']],
    ['匹', ['いっぴき', 'にひき', 'さんびき', 'よんひき', 'ごひき', 'ろっぴき', 'ななひき', 'はっぴき', 'きゅうひき', 'じゅっぴき']],
    ['冊', ['いっさつ', 'にさつ', 'さんさつ', 'よんさつ', 'ごさつ', 'ろくさつ', 'ななさつ', 'はっさつ', 'きゅうさつ', 'じゅっさつ']],
    ['個', ['いっこ', 'にこ', 'さんこ', 'よんこ', 'ごこ', 'ろっこ', 'ななこ', 'はっこ', 'きゅうこ', 'じゅっこ']],
    ['人', ['ひとり', 'ふたり', 'さんにん', 'よにん', 'ごにん', 'ろくにん', 'ななにん', 'はちにん', 'きゅうにん', 'じゅうにん']],
  ])('%s 1–10', (c, want) => {
    expect(want.map((_, i) => counterReading(counters, c as string, i + 1))).toEqual(want);
  });
  it('lists alternatives and finds the sound change', () => {
    expect(counterReadings(counters, '本', 10)).toEqual(['じゅっぽん', 'じっぽん']);
    expect(soundChange('さんぼん', 'さんほん')).toEqual({ start: 2, end: 3 });
    expect(soundChange('にほん', 'にほん')).toBeNull();
  });
});

describe('conjugate', () => {
  const T: Target[] = ['masu', 'masen', 'mashita', 'masendeshita', 'masho', 'te', 'nai', 'ta', 'dict', 'potential', 'volitional'];
  const forms = (w: string, t: Parameters<typeof conjugate>[1]) => Object.fromEntries(T.map((x) => [x, conjugate(w, t, x)]));
  it('group 1 (godan), including 行く and ある', () => {
    expect(forms('書く', 'verb-1')).toEqual({
      masu: '書きます', masen: '書きません', mashita: '書きました', masendeshita: '書きませんでした', masho: '書きましょう',
      te: '書いて', nai: '書かない', ta: '書いた', dict: '書く', potential: '書ける', volitional: '書こう',
    });
    expect(conjugate('飲む', 'verb-1', 'te')).toBe('飲んで');
    expect(conjugate('泳ぐ', 'verb-1', 'ta')).toBe('泳いだ');
    expect(conjugate('話す', 'verb-1', 'te')).toBe('話して');
    expect(conjugate('待つ', 'verb-1', 'te')).toBe('待って');
    expect(conjugate('買う', 'verb-1', 'nai')).toBe('買わない');
    expect(conjugate('帰る', 'verb-1', 'masu')).toBe('帰ります');
    expect(conjugate('死ぬ', 'verb-1', 'ta')).toBe('死んだ');
    expect(conjugate('遊ぶ', 'verb-1', 'te')).toBe('遊んで');
    expect(conjugate('行く', 'verb-1', 'te')).toBe('行って');
    expect(conjugate('行く', 'verb-1', 'ta')).toBe('行った');
    expect(conjugate('ある', 'verb-1', 'nai')).toBe('ない');
  });
  it('group 2 (ichidan)', () => {
    expect(forms('食べる', 'verb-2')).toEqual({
      masu: '食べます', masen: '食べません', mashita: '食べました', masendeshita: '食べませんでした', masho: '食べましょう',
      te: '食べて', nai: '食べない', ta: '食べた', dict: '食べる', potential: '食べられる', volitional: '食べよう',
    });
  });
  it('group 3: する, compounds and 来る', () => {
    expect(conjugate('する', 'verb-3', 'masu')).toBe('します');
    expect(conjugate('勉強する', 'verb-3', 'te')).toBe('勉強して');
    expect(conjugate('勉強する', 'verb-3', 'potential')).toBe('勉強できる');
    expect(conjugate('来る', 'verb-3', 'masu')).toBe('来ます');
    expect(conjugate('来る', 'verb-3', 'nai')).toBe('来ない');
    expect(conjugate('くる', 'verb-3', 'nai')).toBe('こない');
    expect(conjugate('くる', 'verb-3', 'te')).toBe('きて');
  });
  it('い and な adjectives, including いい', () => {
    expect(conjugate('高い', 'adj-i', 'nai')).toBe('高くない');
    expect(conjugate('高い', 'adj-i', 'ta')).toBe('高かった');
    expect(conjugate('高い', 'adj-i', 'te')).toBe('高くて');
    expect(conjugate('いい', 'adj-i', 'ta')).toBe('よかった');
    expect(conjugate('いい', 'adj-i', 'masen')).toBe('よくないです');
    expect(conjugate('きれい', 'adj-na', 'nai')).toBe('きれいじゃない');
    expect(conjugate('しずか', 'adj-na', 'mashita')).toBe('しずかでした');
    expect(() => conjugate('高い', 'adj-i', 'potential')).toThrow();
  });
});

describe('script conversion', () => {
  it('converts hiragana ↔ katakana and leaves ー alone', () => {
    expect(toKatakana('ひらがな')).toBe('ヒラガナ');
    expect(toHiragana('コーヒー')).toBe('こーひー');
  });
});
