// German voices for CourseConfig.speech (CLAUDE.md §5.4): the browser-speech fallback when no
// recording exists. de-DE first (neural/natural voices preferred), then any de-*; de-AT and de-CH only
// rank below de-DE (DACH cards at Medium 2 will ask for them by variety). Novelty voices pushed out,
// then the gender.
import type { Settings } from '@ladder/core/lib/progress/types';

export type VoiceGender = 'female' | 'male';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact|eloquence)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
// German voice names on common platforms (macOS, Windows, Android, Edge).
const FEMALE = /\b(female|woman|anna|petra|helena|hedda|katja|amala|seraphina|marlene|vicki|elke|louisa|tanja|maja|gisela)\b/i;
const MALE = /\b(male|man|markus|yannick|stefan|conrad|killian|florian|hans|reed|viktor|ralf|bernd|christoph)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/** Higher is better: de-DE, then other German; a clear voice; the preferred gender. */
export function scoreVoice(v: SpeechSynthesisVoice, gender: VoiceGender = 'female', variety?: string): number {
  const lang = norm(v);
  if (!lang.startsWith('de')) return -Infinity;
  const want = variety === 'at' ? 'de-at' : variety === 'ch' ? 'de-ch' : 'de-de';
  let score = lang === want ? 300 : lang === 'de-de' ? 260 : 200;
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

export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings, variety?: string) => scoreVoice(v, settings.voice as VoiceGender, variety);

export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits long text at sentence ends. */
export const sentenceSplit = /[^.!?…]+[.!?…]+["'“”»«)\]]*\s*|[^.!?…]+$/g;

export const sampleText = 'Hallo! Das ist die Stimme deiner German Ladder. Hörst du mich gut?';
