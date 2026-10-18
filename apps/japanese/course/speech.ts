// Japanese voices for CourseConfig.speech: the browser-speech fallback when no recording exists.
// ja-JP first, neural/natural voices preferred, novelty voices pushed out, then the gender.
import type { Settings } from '@ladder/core/lib/progress/types';
import { normJa } from '@/lib/ja/text';

export type VoiceGender = 'female' | 'male';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
// Japanese voice names on common platforms (macOS, Windows, Android, Edge).
const FEMALE = /\b(female|woman|kyoko|nanami|haruka|ayumi|sayaka|mayu|aoi|shiori|o-?ren)\b/i;
const MALE = /\b(male|man|otoya|keita|ichiro|daichi|naoki|hattori)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/** Higher is better. Japanese only: ja-JP first, then any ja-*; a clear voice; the preferred gender. */
export function scoreVoice(v: SpeechSynthesisVoice, gender: VoiceGender = 'female'): number {
  const lang = norm(v);
  if (!lang.startsWith('ja')) return -Infinity;
  let score = lang === 'ja-jp' ? 300 : 240;
  const name = v.name;
  if (NOVELTY.test(name)) score -= 1000;
  if (CLEAR.test(name)) score += 60;
  // "Female" names win over "male" substrings.
  const isFemale = FEMALE.test(name);
  const isMale = !isFemale && MALE.test(name);
  if (gender === 'female' ? isFemale : isMale) score += 40;
  if (gender === 'female' ? isMale : isFemale) score -= 20;
  if (v.default) score += 5;
  return score;
}

export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings) => scoreVoice(v, settings.voice as VoiceGender);

export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits at 。！？ and Latin sentence ends. */
export const sentenceSplit = /[^。！？.!?]+[。！？.!?]+[」』)）]*\s*|[^。！？.!?]+$/g;

/** Japanese utterances are chunked shorter than Latin ones. */
export const chunkMax = 80;

/** こんにちは。: the sample line for “Coba suara”. */
export const sampleText = 'こんにちは。よろしく おねがいします。';

/** Japanese speech is read a little slower than the learner's pace setting. */
export const rateScale = 0.9;

/** Rough speaking time when there is no recording: about 160ms per mora at 1× (the Tirukan pause). */
export const estimateMs = (text: string, rate: number) => (normJa(text).length * 160) / rate;
