// Japanese audio keys (CLAUDE.md §7.7), for CourseConfig.audio and the audio scripts.
import { stripMarkup } from '@ladder/core/lib/markup';
import { sha1 } from '@ladder/core/lib/speech/sha1';
import { morae, toHiragana } from './kana';
import { normJa, toKana } from './text';

/** A single kana's recording key: kana-<hiragana>, e.g. kana-きゃ. Katakana share the hiragana clip. */
export const kanaKey = (kana: string) => `kana-${toHiragana(kana)}`;
export const isKanaKey = (s: string) => /^kana-[぀-ヿ]{1,3}$/u.test(s);

/**
 * A word played as one side of a minimal or pitch pair: "pair:<text>". It shares the word's
 * recording, but never falls back to speech (a browser voice can't be trusted with the contrast).
 */
export const pairKey = (text: string) => `pair:${text}`;
export const isPairKey = (s: string) => s.startsWith('pair:');
const unpair = (s: string) => (isPairKey(s) ? s.slice(5) : s);

/** What a string sounds like: its kana reading (from the ruby markup), so kanji are always read right. */
export function spokenJa(text: string): string {
  const t = unpair(text);
  if (isKanaKey(t)) return t.slice(5);
  try {
    return toKana(stripMarkup(t)).replace(/\s+/g, '');
  } catch {
    return normJa(t);
  }
}

/** The audio key: sha1(normJa(reading)), first 12 hex digits; a kana key is its own key (in hiragana). */
export function jaAudioKey(text: string): string {
  const t = unpair(text);
  return isKanaKey(t) ? kanaKey(t.slice(5)) : sha1(normJa(spokenJa(t))).slice(0, 12);
}

/** Whether a string may play with the browser voice when it has no recording (CLAUDE.md §7.7). */
export const speechFallback = (text: string) => !isKanaKey(text) && !isPairKey(text);

/**
 * What a Bunyi word plays: a single kana its kana recording; long vowels, small っ and pitch are
 * minimal pairs (recordings only); anything else the word itself.
 */
export function soundAudio(kind: string, w: { ja: string; kana: string }): string {
  if (kind === 'long-vowel' || kind === 'small-tsu' || kind === 'pitch') return pairKey(w.ja);
  if (morae(w.kana).length === 1 && !/[一-鿿]/u.test(w.ja)) return kanaKey(w.kana.trim());
  return w.ja;
}

/** The text to show when a string can't be played. */
export const shownText = (text: string) => {
  const t = unpair(text);
  return isKanaKey(t) ? t.slice(5) : t;
};

/**
 * A recording's file name stem, ASCII only (file systems store kana in different normal forms):
 * text keys as they are; kana keys as kana-u304d-u3083.
 */
export const recordingStem = (key: string) => (isKanaKey(key) ? `kana-${[...key.slice(5)].map((c) => `u${c.codePointAt(0)!.toString(16)}`).join('-')}` : key);

const SEION = 'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも や ゆ よ らりるれろ わ を ん';
const DAKUON = 'がぎぐげご ざじずぜぞ だぢづでど ばびぶべぼ ぱぴぷぺぽ';
const YOON = [...'きしちにひみりぎじびぴ'].flatMap((c) => [...'ゃゅょ'].map((s) => c + s));

/** Every kana mora with its own recording (hiragana; katakana reuse them): 46 + 25 + 33. */
export const KANA_MORAE: readonly string[] = [...SEION.replace(/\s/g, ''), ...DAKUON.replace(/\s/g, ''), ...YOON];
