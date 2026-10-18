// Japanese audio keys (CLAUDE.md §7.7), for CourseConfig.audio and the audio scripts.
import { stripMarkup } from '@ladder/core/lib/markup';
import { sha1 } from '@ladder/core/lib/speech/sha1';
import { normJa, toKana } from './text';

/** A single kana's recording key: kana-<kana>, e.g. kana-きゃ. */
export const kanaKey = (kana: string) => `kana-${kana}`;
export const isKanaKey = (s: string) => /^kana-[぀-ヿ]{1,3}$/u.test(s);

/** What a string sounds like: its kana reading (from the ruby markup), so kanji are always read right. */
export function spokenJa(text: string): string {
  if (isKanaKey(text)) return text.slice(5);
  try {
    return toKana(stripMarkup(text)).replace(/\s+/g, '');
  } catch {
    return normJa(text);
  }
}

/** The audio key: sha1(normJa(reading)), first 12 hex digits; a kana key is its own key. */
export function jaAudioKey(text: string): string {
  return isKanaKey(text) ? text : sha1(normJa(spokenJa(text))).slice(0, 12);
}
