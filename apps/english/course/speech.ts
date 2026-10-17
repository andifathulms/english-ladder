// English voice selection for CourseConfig.speech. The generic Web Speech wrapper in
// @ladder/core takes the scorer and sentence-split regex produced here.
import type { Settings } from '@ladder/core/lib/progress/types';

export type Accent = 'gb' | 'us';
export type VoiceGender = 'female' | 'male';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
const FEMALE = /\b(female|woman|samantha|serena|kate|stephanie|martha|karen|moira|tessa|fiona|victoria|allison|ava|susan|zoe|libby|sonia|mia|hazel|aria|jenny|michelle|zira|emma|amy|joanna|salli|kimberly|ivy|nicky|catherine|sara|olivia)\b/i;
const MALE = /\b(male|man|daniel|arthur|oliver|alex|tom|aaron|evan|nathan|george|ryan|thomas|guy|david|mark|christopher|eric|james|brian|matthew|joey|justin|rishi|lee)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/** Higher is better: accent first, then a clear voice, then the preferred gender. */
export function scoreVoice(v: SpeechSynthesisVoice, accent: Accent = 'gb', gender: VoiceGender = 'female'): number {
  const lang = norm(v);
  if (!lang.startsWith('en')) return -Infinity;
  const want = accent === 'gb' ? 'en-gb' : 'en-us';
  const other = accent === 'gb' ? 'en-us' : 'en-gb';
  let score = lang === want ? 300 : lang === other ? 200 : 100;
  const name = v.name;
  if (NOVELTY.test(name)) score -= 1000;
  if (CLEAR.test(name)) score += 60;
  // "Female" names win over "male" substrings (e.g. "Google UK English Female").
  const isFemale = FEMALE.test(name);
  const isMale = !isFemale && MALE.test(name);
  if (gender === 'female' ? isFemale : isMale) score += 40;
  if (gender === 'female' ? isMale : isFemale) score -= 20;
  if (v.default) score += 5;
  return score;
}

/** Scorer bound to the learner's accent and gender settings. */
export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings) =>
  scoreVoice(v, settings.accent, settings.voice);

/** True when any usable English voice exists. */
export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits long text at sentence ends. */
export const sentenceSplit = /[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g;

export const sampleText = 'Hello! This is your English Ladder voice. Is it clear?';
