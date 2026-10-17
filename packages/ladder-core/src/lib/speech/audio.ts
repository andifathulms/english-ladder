// Recorded audio first, browser speech second. A course turns this on with CourseConfig.audio:
// every target string gets a key, sha1(normalise(text) + '|' + variety) (first 12 hex digits), and
// public/audio/<key>-<hash>.mp3 plays when the manifest lists it. Without a recording (or without
// audio config) the course's browser voice speaks it.
import { stripMarkup } from '../markup';
import { withBase } from '../basePath';
import { sha1 } from './sha1';
import { speak, stopSpeaking, type SpeakOpts } from './speak';

export type ManifestEntry = { file: string; dur: number; words?: number[] };
export type Manifest = Record<string, ManifestEntry>;

export type AudioConfig = {
  /** Canonical text for keys (the course's text normaliser). */
  normalise: (s: string) => string;
  /** Variety used when a caller doesn't name one (e.g. Arabic 'fusha'). */
  defaultVariety?: string;
  /** The course's own key scheme (default: sha1(normalise(text)|variety), 12 hex digits). */
  key?: (text: string, variety?: string) => string;
  /** False for strings that must never fall back to browser speech (e.g. Mandarin syllables). */
  speechFallback?: (text: string) => boolean;
  /** The text browser speech actually reads (default: the text without markup). */
  spoken?: (plain: string) => string;
};

let config: AudioConfig | null = null;

/** Turns recorded audio on for this course (the app's providers call it at module load). */
export function configureAudio(c: AudioConfig | null) {
  config = c;
}

export const audioEnabled = () => config !== null;

/** The audio key for a string: sha1(normalise(text) + '|' + variety), first 12 hex digits. */
export function audioKey(text: string, variety?: string, normalise = config?.normalise ?? ((s: string) => s)): string {
  if (config?.key) return config.key(text, variety);
  return sha1(`${normalise(stripMarkup(text))}|${variety ?? config?.defaultVariety ?? ''}`).slice(0, 12);
}

let manifest: Manifest | null = null;
let loading: Promise<Manifest> | null = null;
const listeners = new Set<() => void>();

/** Loads public/audio/manifest.json once. Missing or broken manifests count as empty. */
export function loadManifest(): Promise<Manifest> {
  if (manifest) return Promise.resolve(manifest);
  if (!config) return Promise.resolve({});
  if (!loading) {
    loading =
      typeof fetch === 'undefined'
        ? Promise.resolve({})
        : fetch(withBase('/audio/manifest.json'))
            .then((r) => (r.ok ? r.json() : {}))
            .catch(() => ({}))
            .then((m: Manifest) => {
              manifest = m && typeof m === 'object' ? m : {};
              for (const l of listeners) l();
              return manifest;
            });
  }
  return loading;
}

export function onManifest(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Test helper. */
export function __setManifest(m: Manifest | null) {
  manifest = m;
  loading = m ? Promise.resolve(m) : null;
  for (const l of listeners) l();
}

/** Whether browser speech may read this string when it has no recording. */
export const speechAllowed = (text: string) => config?.speechFallback?.(text) ?? true;

export function audioFor(text: string, variety?: string): ManifestEntry | null {
  if (!config) return null;
  return manifest?.[audioKey(text, variety)] ?? null;
}

let el: HTMLAudioElement | null = null;
let stopCurrent: (() => void) | null = null;

export function stop() {
  stopCurrent?.();
  stopCurrent = null;
  stopSpeaking();
}

export type PlayOpts = Omit<SpeakOpts, 'onBoundary'> & {
  variety?: string;
  /** Word index being spoken (manifest timings, or speech boundaries mapped through `tokenise`). */
  onWord?: (index: number) => void;
  /** Browser speech only: the raw character offset of each boundary in the spoken text. */
  onChar?: (charIndex: number) => void;
  tokenise?: (s: string) => { start: number; end: number }[];
};

/**
 * Plays a string. A recording goes through one shared audio element with pitch preserved at the
 * chosen rate, reporting word indexes from the manifest timings. Otherwise browser speech, which
 * reports word indexes from boundary events when the engine fires them.
 */
export async function play(text: string, opts: PlayOpts): Promise<void> {
  const plain = stripMarkup(text);
  await loadManifest();
  stop();
  const entry = audioFor(plain, opts.variety);
  if (entry && typeof Audio !== 'undefined') {
    el ??= new Audio();
    const a = el;
    a.src = withBase(`/audio/${entry.file}`);
    a.playbackRate = opts.rate ?? 1;
    (a as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
    return new Promise<void>((resolve) => {
      let last = -1;
      const onTime = () => {
        if (!entry.words || !opts.onWord) return;
        const ms = a.currentTime * 1000;
        let k = -1;
        for (let i = 0; i < entry.words.length; i++) if (entry.words[i] <= ms) k = i;
        if (k !== last) opts.onWord((last = k));
      };
      const finish = () => {
        a.removeEventListener('timeupdate', onTime);
        a.removeEventListener('ended', finish);
        a.removeEventListener('error', finish);
        stopCurrent = null;
        resolve();
      };
      stopCurrent = () => {
        a.pause();
        finish();
      };
      a.addEventListener('timeupdate', onTime);
      a.addEventListener('ended', finish);
      a.addEventListener('error', finish);
      a.play().catch(finish);
    });
  }
  if (!speechAllowed(text)) return;
  const words = opts.tokenise?.(plain) ?? [];
  const { onWord, onChar, tokenise: _t, variety: _v, ...speakOpts } = opts;
  return speak(config?.spoken ? config.spoken(plain) : plain, {
    ...speakOpts,
    onBoundary:
      onWord || onChar
        ? (ci) => {
            onChar?.(ci);
            if (!onWord) return;
            const k = words.findIndex((w) => ci >= w.start && ci < w.end);
            if (k >= 0) onWord(k);
          }
        : undefined,
  });
}
