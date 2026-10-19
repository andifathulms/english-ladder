// Japanese audio keys (CLAUDE.md §7.7), for CourseConfig.audio and the audio scripts.
import { stripMarkup } from '@ladder/core/lib/markup';
import { sha1 } from '@ladder/core/lib/speech/sha1';
import { morae, toHiragana } from './kana';
import { hasKanji, normJa, toKana, toPlain } from './text';

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

/** Kana-only text of one mora (a worked あ, the word え): it is that kana's recording. */
function singleKana(t: string): string | null {
  let written: string;
  try {
    written = toPlain(stripMarkup(t)).replace(/\s+/g, '');
  } catch {
    return null;
  }
  // The written text itself is kana (a kanji read as one mora, like 目, stays a word).
  return /^[ぁ-ゖァ-ヺ]+$/u.test(written) && morae(written).length === 1 ? written : null;
}

/**
 * The audio key: sha1 of the reading, first 12 hex digits. Text with kanji adds its written form,
 * so homophones get their own recordings: 橋 and 箸 are both はし, but a pitch pair must play two
 * different clips. A kana key is its own key (in hiragana), and so is any one-mora kana text, so a
 * lone kana never plays from the browser voice.
 */
export function jaAudioKey(text: string): string {
  const t = unpair(text);
  if (isKanaKey(t)) return kanaKey(t.slice(5));
  const one = singleKana(t);
  if (one) return kanaKey(one);
  const reading = normJa(spokenJa(t));
  let written = '';
  try {
    written = normJa(toPlain(stripMarkup(t)));
  } catch {
    written = '';
  }
  return sha1(hasKanji(written) ? `${reading}|${written}` : reading).slice(0, 12);
}

/** Whether a string may play with the browser voice when it has no recording (CLAUDE.md §7.7). */
export const speechFallback = (text: string) => !isPairKey(text) && !isKanaKey(jaAudioKey(text));

/**
 * What a Bunyi word plays: a single kana its kana recording; long vowels, small っ, mora and pitch
 * contrasts are minimal pairs (recordings only); anything else the word itself.
 */
export function soundAudio(kind: string, w: { ja: string; kana: string }): string {
  if (kind === 'long-vowel' || kind === 'small-tsu' || kind === 'mora' || kind === 'pitch') return pairKey(w.ja);
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
