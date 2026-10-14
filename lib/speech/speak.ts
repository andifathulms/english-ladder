// Web Speech API wrapper. Resolves silently when speech is unavailable.

export type Accent = 'gb' | 'us';
type Opts = { accent?: Accent; rate?: number; onBoundary?: (charIndex: number) => void };

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

export function pickVoice(list: SpeechSynthesisVoice[], accent: Accent = 'gb'): SpeechSynthesisVoice | null {
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();
  const order = accent === 'gb' ? ['en-gb', 'en-us'] : ['en-us', 'en-gb'];
  for (const lang of order) {
    const v = list.find((x) => norm(x) === lang && x.localService) ?? list.find((x) => norm(x) === lang);
    if (v) return v;
  }
  return list.find((x) => norm(x).startsWith('en')) ?? null;
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

export function stopSpeaking() {
  synth()?.cancel();
  current = null;
}

export function speak(text: string, opts: Opts = {}): Promise<void> {
  const s = synth();
  if (!s) return Promise.resolve();
  refreshVoices();
  const voice = pickVoice(voices, opts.accent);
  if (!voice) return Promise.resolve();
  s.cancel();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = (opts.rate ?? 1) * 0.95;
    if (opts.onBoundary) {
      u.onboundary = (e) => {
        if (e.name === 'word' || e.name === undefined) opts.onBoundary!(e.charIndex);
      };
    }
    const done = () => {
      if (current === u) current = null;
      resolve();
    };
    u.onend = done;
    u.onerror = done;
    current = u;
    s.speak(u);
  });
}
