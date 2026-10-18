// Mandarin voices for CourseConfig.speech: the browser-speech fallback when no recording exists.
// Mainland Mandarin only (zh-CN first; never Cantonese or Taiwan voices), then a clear voice, then the gender.
import type { Settings } from '@ladder/core/lib/progress/types';
import { plainZh } from '@/lib/zh/text';

export type VoiceGender = 'female' | 'male';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
// Mainland Mandarin voice names on common platforms (macOS, Windows, Android, Edge).
const FEMALE = /\b(female|woman|ting-?ting|xiaoxiao|xiaoyi|xiaohan|xiaomeng|xiaomo|xiaorui|xiaoshuang|xiaoxuan|xiaoyan|huihui|yaoyao|lili|yu-?shu|mei-?jia|sin-?ji)\b/i;
const MALE = /\b(male|man|yunxi|yunyang|yunjian|yunze|yunfeng|yunhao|yunye|kangkang|li-?mu)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/**
 * Higher is better. Mandarin only: zh-CN first, then cmn-* and other zh-* except Hong Kong and
 * Taiwan (Cantonese, or Taiwanese Mandarin with different tones and vocabulary); never yue.
 * Then a clear voice, then the preferred gender; novelty voices are pushed out.
 */
export function scoreVoice(v: SpeechSynthesisVoice, gender: VoiceGender = 'female'): number {
  const lang = norm(v);
  if (lang.startsWith('yue') || lang === 'zh-hk' || lang === 'zh-tw' || lang === 'zh-mo') return -Infinity;
  if (!(lang.startsWith('zh') || lang.startsWith('cmn'))) return -Infinity;
  let score = lang === 'zh-cn' || lang === 'cmn-hans-cn' || lang === 'cmn-cn' ? 300 : lang.startsWith('cmn') ? 260 : lang === 'zh' || lang === 'zh-hans' ? 240 : 150;
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

/** Scorer bound to the learner's voice setting (Mandarin has one variety). */
export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings) => scoreVoice(v, settings.voice);

/** True when the browser can speak Mandarin. */
export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits at 。！？； and Latin sentence ends: some engines cut off or slur long utterances. */
export const sentenceSplit = /[^。！？；.!?;]+[。！？；.!?;]+[”’」』)）]*\s*|[^。！？；.!?;]+$/g;

/** Mandarin utterances are chunked shorter than Latin ones. */
export const chunkMax = 80;

/** 你好，欢迎！: the sample line for “Coba suara”. */
export const sampleText = '你好，欢迎！';

/** Mandarin speech is read a little slower than the learner's pace setting. */
export const rateScale = 0.9;

/** Rough speaking time when there is no recording: about 260ms per hanzi at 1× (the Tirukan pause). */
export const estimateMs = (text: string, rate: number) => (plainZh(text).length * 260) / rate;
