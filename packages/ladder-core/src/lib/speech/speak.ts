// Web Speech API wrapper. Language-neutral: the course supplies a voice scorer and a
// sentence-splitting regex. Resolves silently when speech is unavailable.

export type VoiceScore = (voice: SpeechSynthesisVoice) => number;
type Opts = { score: VoiceScore; sentenceSplit: RegExp; rate?: number; onBoundary?: (charIndex: number) => void };

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

/** The voices currently known to the browser (empty until they load). */
export function getVoices(): SpeechSynthesisVoice[] {
  refreshVoices();
  return voices;
}

/** The highest-scoring voice, or null when none scores above -Infinity. */
export function pickVoice(list: SpeechSynthesisVoice[], score: VoiceScore): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;
  for (const v of list) {
    const s = score(v);
    if (s > bestScore) {
      best = v;
      bestScore = s;
    }
  }
  return bestScore > -Infinity ? best : null;
}

/** Splits long text at sentence ends: some engines cut off or slur long utterances. */
export function chunks(text: string, sentenceSplit: RegExp, max = 160): { text: string; start: number }[] {
  if (text.length <= max) return [{ text, start: 0 }];
  const out: { text: string; start: number }[] = [];
  const re = new RegExp(sentenceSplit.source, sentenceSplit.flags.includes('g') ? sentenceSplit.flags : sentenceSplit.flags + 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const last = out[out.length - 1];
    if (last && last.text.length + m[0].length <= max) last.text += m[0];
    else out.push({ text: m[0], start: m.index });
  }
  return out.map((c) => ({ ...c, text: c.text.trimEnd() }));
}

/** The voice speak() would use now, for showing in Settings. */
export function chosenVoiceName(score: VoiceScore): string | null {
  if (!synth()) return null;
  refreshVoices();
  return pickVoice(voices, score)?.name ?? null;
}

let current: SpeechSynthesisUtterance | null = null;
/** Bumped on every new speak() or stop, so a cancelled reading never continues. */
let generation = 0;

export function stopSpeaking() {
  generation += 1;
  synth()?.cancel();
  current = null;
}

export function speak(text: string, opts: Opts): Promise<void> {
  const s = synth();
  if (!s) return Promise.resolve();
  refreshVoices();
  const voice = pickVoice(voices, opts.score);
  if (!voice) return Promise.resolve();
  s.cancel();
  const mine = ++generation;
  const parts = chunks(text, opts.sentenceSplit);
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
