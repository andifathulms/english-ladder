// Mandarin audio keys (CLAUDE.md §7.7), for CourseConfig.audio and the audio scripts.
import { stripMarkup } from '@ladder/core/lib/markup';
import { sha1 } from '@ladder/core/lib/speech/sha1';
import { normZh } from './text';

/** A syllable's recording key: syl-<base><tone>, e.g. syl-ma3, syl-lü4. */
export const syllableKey = (base: string, tone: number) => `syl-${base}${tone}`;
export const isSyllableKey = (s: string) => /^syl-[a-zü]+[0-4]$/.test(s);

/** The audio key for Chinese text: sha1(normZh(text)), first 12 hex digits; a syllable key is its own key. */
export function zhAudioKey(text: string): string {
  return isSyllableKey(text) ? text : sha1(normZh(stripMarkup(text))).slice(0, 12);
}
