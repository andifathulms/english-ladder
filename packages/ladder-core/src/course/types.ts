import type { ComponentType } from 'react';
import type { Settings } from '@ladder/core/lib/progress/types';
import type { MigrationStep, ProgressConfig, ProgressFeatures } from '@ladder/core/lib/progress/config';
import type { Gloss, Lesson, Line, Rung } from '@ladder/core/lib/types';
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { StringTables, UiLang } from '@ladder/core/lib/i18n';

/** Per-word annotation shown in My words (English: the a/an badge and irregular-plural suffix). */
export type WordAnnotation = { badge?: string; pluralSuffix?: string };

/** Scores a browser voice for a course's target language; higher is better, -Infinity to exclude. */
export type VoiceScorer = (voice: SpeechSynthesisVoice, settings: Settings) => number;

/** One token with its character offsets in the plain (markup-stripped) string. */
export type Token = { text: string; start: number; end: number };

/** How grading, search and lint compare and segment the target language. */
export type TextRules = {
  /** Canonical form for equality (used by grade(), My-words search and lint). */
  normalise: (s: string) => string;
  /** Compares token i of an ordered answer (replaces English's "first word case-sensitive" rule). */
  tokenEquals: (a: string, b: string, i: number) => boolean;
  /** Trailing punctuation stripped before an ordered-answer comparison. */
  trimPunct: RegExp;
  /** Splits a sentence into words with offsets, for speech-boundary highlighting. */
  tokenise: (s: string) => Token[];
};

/** How the course finds and reads voices for its target language. */
export type SpeechRules = {
  voiceScorer: VoiceScorer;
  /** Splits long text into speakable chunks at sentence ends. */
  sentenceSplit: RegExp;
  /** True when at least one usable target-language voice exists. */
  canSpeak: (voices: SpeechSynthesisVoice[]) => boolean;
  /** Spoken by the "try voice" button in Settings. */
  sampleText: string;
};

/** Option lists that course-specific Settings controls render. */
export type SettingsOptions = {
  accents: { value: string; label: Record<UiLang, string> }[];
  voices: { value: string; label: Record<UiLang, string> }[];
};

/** One option for the lesson explanation-language toggle; `[]` hides the toggle. */
export type ExplainLang = { value: string; label: Record<UiLang, string> };

/** Where a target line appears; the Sentence slot picks size, play button and note from it. */
export type SentenceUse = 'example' | 'worked' | 'pairOff' | 'pairNatural' | 'reading';
export type SentenceSlotProps = { line: Line; use: SentenceUse };

/** A strand card on the Examples or Contrast step. Renders nothing when the lesson has none.
 *  `cardLang` is the language short cards explain in (the lesson's explanation language). */
export type StrandCard = ComponentType<{ lesson: Lesson; rung: Rung; cardLang: 'id' | 'en' }>;

/** Everything that differs between language courses, injected into the shared engine. */
export type CourseConfig = {
  id: string;
  name: string;
  rangeLabel: string;
  storageKey: string;
  cachePrefix: string;
  exportFilePrefix: string;
  repoUrl: string;
  target: { lang: string; dir: 'ltr' | 'rtl'; fontClass: string; sentenceClass: string };
  ui: { defaultLang: UiLang };
  /** UI strings: core base tables extended with this course's overrides. */
  strings: StringTables;
  explainLangs: ExplainLang[];
  settings: {
    /** Default settings, in stored key order (core settings plus the course's own). */
    defaults: Settings;
    /** Allowed values for the course's own settings (core settings are built in). */
    allowed?: Record<string, readonly unknown[]>;
    options: SettingsOptions;
  };
  /** The stored progress shape. `storageKey` above is where it lives. */
  progress: {
    schemaVersion: number;
    /** Steps keyed by the version they upgrade from (0 → 1 is built in). */
    migrations?: Record<number, MigrationStep>;
    features?: ProgressFeatures;
  };
  speech: SpeechRules;
  text: TextRules;
  /** How the engine reads this course's lessons and readings (lib/content/adapter.ts). */
  adapter: ContentAdapter;
  /** Course item types' grading/text logic, registered at app start with registerItemTypes(). */
  itemTypes?: Record<string, ItemTypeLogic>;
  /** Strand cards per lesson step, in order (e.g. English Talk + Sound, then Words). */
  strands?: { examples?: StrandCard[]; contrast?: StrandCard[] };
  /** Rendering slots; each defaults to the engine's own component. */
  components?: {
    /** A target-language line (examples, worked, pair, reading, …). Default: core Sentence. */
    Sentence?: ComponentType<SentenceSlotProps>;
  };
  /** Visual id → component (the lesson/scene registry). */
  visuals: Record<string, ComponentType<never>>;
  visualIds: readonly string[];
  /** Decorative board background (Contours for English). */
  boardPattern: ComponentType;
  extraData?: {
    /** Extra annotation for a word in My words (e.g. the English a/an article badge).
     *  `data` is the build-time word data from the content model (ContentModel.wordData). */
    wordAnnotator?: (word: Gloss, data: unknown) => WordAnnotation;
  };
};

/** The store configuration for a course (pass to store.configure at app start). */
export function progressConfigOf(c: CourseConfig): ProgressConfig {
  return {
    storageKey: c.storageKey,
    schemaVersion: c.progress.schemaVersion,
    migrations: c.progress.migrations ?? {},
    defaults: c.settings.defaults,
    allowed: c.settings.allowed ?? {},
    features: c.progress.features ?? {},
  };
}
