// Arabic voices for CourseConfig.speech: the browser-speech fallback when no recording exists.
// Egyptian prefers ar-EG; Fusha prefers ar-SA, then any ar-*; then a clear voice, then the gender.
import type { Settings } from '@ladder/core/lib/progress/types';

export type Variety = 'fusha' | 'eg';
export type VoiceGender = 'female' | 'male';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
const FEMALE = /\b(female|woman|hoda|salma|zariyah|laila|layla|amina|amira|mariam|sana|fatima|rana|lana|mouna|mona|reem|iman|nour|yasmin|sara)\b/i;
const MALE = /\b(male|man|maged|majed|naayf|shakir|hamed|tarik|tariq|omar|hamdan|fahed|bassel|moaz|taim|rami|jamal|karim)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/**
 * Higher is better. Arabic only. Egyptian prefers ar-EG; Fusha prefers ar-SA, then any ar-*.
 * Then a clear voice, then the preferred gender.
 */
export function scoreVoice(v: SpeechSynthesisVoice, variety: Variety = 'fusha', gender: VoiceGender = 'female'): number {
  const lang = norm(v);
  if (!lang.startsWith('ar')) return -Infinity;
  let score = 100;
  if (variety === 'eg') score = lang === 'ar-eg' ? 300 : 150;
  else score = lang === 'ar-sa' ? 300 : lang === 'ar' || lang === 'ar-001' ? 260 : lang === 'ar-eg' ? 180 : 200;
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

/** Scorer bound to the line's variety and the learner's voice setting. */
export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings, variety?: string) =>
  scoreVoice(v, (variety as Variety) ?? 'fusha', settings.voice);

/** True when the browser can speak Arabic (any Arabic voice). */
export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits at Latin and Arabic sentence ends (some engines slur long utterances). */
export const sentenceSplit = /[^.!?؟۔]+[.!?؟۔]+["')\]»]*\s*|[^.!?؟۔]+$/g;

/** أَهْلًا وَسَهْلًا: the sample line for “Coba suara”. */
export const sampleText = 'أَهْلًا وَسَهْلًا';

/** Arabic speech is read a little slower than the learner's pace setting. */
export const rateScale = 0.9;
