// Spanish voices for CourseConfig.speech (CLAUDE.md §5.4): the browser-speech fallback when no
// recording exists. Latin American lines prefer es-MX > es-US > es-419 > other es-* (es-ES last);
// Spain lines (variety 'es', or the "Spanyol" setting) prefer es-ES. Neural/natural voices first,
// novelty voices pushed out, then the gender.
import type { Settings } from '@ladder/core/lib/progress/types';

export type VoiceGender = 'female' | 'male';
export type Variety = 'latam' | 'es';

// Novelty and very old synthesis voices (macOS extras, eSpeak, Eloquence) sound robotic or blurry.
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy|espeak|compact|eloquence)\b/i;
// Markers of the clearer neural or network voices.
const CLEAR = /\b(natural|neural|online|enhanced|premium|siri)\b|^google\b/i;
// Spanish voice names on common platforms (macOS, Windows, Android, Edge).
const FEMALE = /\b(female|woman|paulina|monica|mónica|marisol|angelica|angélica|soledad|isabela|isabel|elvira|dalia|helena|laura|sabina|lucia|lucía|esperanza|paloma|valentina|camila|ximena)\b/i;
const MALE = /\b(male|man|juan|jorge|diego|carlos|pablo|alvaro|álvaro|raul|raúl|jorge|alonso|tomas|tomás|gonzalo|enrique)\b/i;

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();

/** The language score: the variety's own locales first. Non-Spanish voices are excluded. */
function langScore(lang: string, variety: Variety): number {
  if (!lang.startsWith('es')) return -Infinity;
  if (variety === 'es') return lang === 'es-es' ? 300 : 150;
  if (lang === 'es-mx') return 300;
  if (lang === 'es-us') return 280;
  if (lang === 'es-419') return 260;
  if (lang === 'es-es') return 150;
  return 220;
}

/** Higher is better: the variety's locale, then a clear voice, then the preferred gender. */
export function scoreVoice(v: SpeechSynthesisVoice, variety: Variety = 'latam', gender: VoiceGender = 'female'): number {
  let score = langScore(norm(v), variety);
  if (score === -Infinity) return score;
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

/** A line's own variety wins (España lines); otherwise the learner's "variety of speech audio". */
export const voiceScorer = (v: SpeechSynthesisVoice, settings: Settings, variety?: string) =>
  scoreVoice(v, variety === 'es' ? 'es' : variety === 'latam' ? 'latam' : ((settings.variety as Variety) ?? 'latam'), settings.voice as VoiceGender);

export const canSpeak = (voices: SpeechSynthesisVoice[]) => voices.some((v) => scoreVoice(v) > -Infinity);

/** Splits long text at sentence ends (¿…? and ¡…! stay whole). */
export const sentenceSplit = /[^.!?…]+[.!?…]+["'»)\]]*\s*|[^.!?…]+$/g;

export const sampleText = '¡Hola! Esta es la voz de tu Spanish Ladder. ¿Se escucha bien?';
