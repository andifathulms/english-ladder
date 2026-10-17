// Web Speech API wrapper. Resolves silently when speech is unavailable.

export type Accent = 'gb' | 'us';
export type VoiceGender = 'female' | 'male';
type Opts = { accent?: Accent; gender?: VoiceGender; rate?: number; onBoundary?: (charIndex: number) => void };

let voices: SpeechSynthesisVoice[] = [];
let listening = false;

function synth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
}

function refreshVoices() {
  const s = synth();
  if (!s) return;
  voices = s.getVoices();
  if (!listening) {
    listening = true;
    s.addEventListener?.('voiceschanged', () => {
      voices = s.getVoices();
      for (const l of changeListeners) l();
    });
  }
}

const changeListeners = new Set<() => void>();
/** Notifies when voices load (they arrive asynchronously in most browsers). */
export function onVoicesChanged(l: () => void) {
  refreshVoices();
  changeListeners.add(l);
  return () => changeListeners.delete(l);
}

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

export function pickVoice(
  list: SpeechSynthesisVoice[],
  accent: Accent = 'gb',
  gender: VoiceGender = 'female',
): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;
  for (const v of list) {
    const s = scoreVoice(v, accent, gender);
    if (s > bestScore) {
      best = v;
      bestScore = s;
    }
  }
  return bestScore > -Infinity ? best : null;
}

/** Splits long text at sentence ends: some engines cut off or slur long utterances. */
export function chunks(text: string, max = 160): { text: string; start: number }[] {
  if (text.length <= max) return [{ text, start: 0 }];
  const out: { text: string; start: number }[] = [];
  const re = /[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const last = out[out.length - 1];
    if (last && last.text.length + m[0].length <= max) last.text += m[0];
    else out.push({ text: m[0], start: m.index });
  }
  return out.map((c) => ({ ...c, text: c.text.trimEnd() }));
}

/** The voice speak() would use now, for showing in Settings. */
export function chosenVoiceName(accent: Accent = 'gb', gender: VoiceGender = 'female'): string | null {
  if (!synth()) return null;
  refreshVoices();
  return pickVoice(voices, accent, gender)?.name ?? null;
}

/** True when the browser can speak English. Play buttons render only when true. */
export function canSpeak(): boolean {
  if (!synth()) return false;
  refreshVoices();
  // Some browsers report no voices until voiceschanged; treat "has speechSynthesis" as enough
  // only once voices have loaded and include English.
  return pickVoice(voices) !== null;
}

let current: SpeechSynthesisUtterance | null = null;
/** Bumped on every new speak() or stop, so a cancelled reading never continues. */
let generation = 0;

export function stopSpeaking() {
  generation += 1;
  synth()?.cancel();
  current = null;
}

export function speak(text: string, opts: Opts = {}): Promise<void> {
  const s = synth();
  if (!s) return Promise.resolve();
  refreshVoices();
  const voice = pickVoice(voices, opts.accent, opts.gender);
  if (!voice) return Promise.resolve();
  s.cancel();
  const mine = ++generation;
  const parts = chunks(text);
  const say = (i: number): Promise<void> =>
    new Promise((resolve) => {
      const part = parts[i];
      const u = new SpeechSynthesisUtterance(part.text);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = (opts.rate ?? 1) * 0.95;
      u.pitch = 1;
      u.volume = 1;
      if (opts.onBoundary) {
        u.onboundary = (e) => {
          if (e.name === 'word' || e.name === undefined) opts.onBoundary!(part.start + e.charIndex);
        };
      }
      let finished = false;
      const done = (ok: boolean) => {
        if (finished) return;
        finished = true;
        if (current === u) current = null;
        if (ok && i + 1 < parts.length && mine === generation) resolve(say(i + 1));
        else resolve();
      };
      u.onend = () => done(true);
      u.onerror = () => done(false);
      current = u;
      s.speak(u);
    });
  return say(0);
}
