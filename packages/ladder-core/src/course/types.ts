import type { ComponentType } from 'react';
import type { Settings } from '@ladder/core/lib/progress/types';
import type { Noun } from '@ladder/core/lib/types';
import type { UiLang } from '@ladder/core/lib/i18n';

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

/** A grammar-inventory detector: `id` is the inventory id, `re` matches text that uses it. */
export type Detector = { id: string; re: RegExp };
/** A structure-lint rule: `name` is shown in findings, `re` matches untaught grammar. */
export type Rule = { name: string; re: RegExp };

/** Per-course content lint. The runner (core) orchestrates these pieces. */
export type LintRules = {
  /** Matches target-language words in a string. */
  wordRegex: RegExp;
  /** True when a word is covered by the lexicon (handles the language's morphology).
   *  `irregular` maps an irregular inflected form to its lemma (e.g. children → child). */
  knownWord: (word: string, ctx: { lex: Set<string>; irregular: Map<string, string> }) => boolean;
  detectors: Detector[];
  structureRules: Record<string, Rule[]>;
};

/** Option lists that course-specific Settings controls render. */
export type SettingsOptions = {
  accents: { value: string; label: Record<UiLang, string> }[];
  voices: { value: string; label: Record<UiLang, string> }[];
};

/** One option for the lesson explanation-language toggle; `[]` hides the toggle. */
export type ExplainLang = { value: string; label: Record<UiLang, string> };

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
  explainLangs: ExplainLang[];
  settings: { defaults: Settings; options: SettingsOptions };
  speech: SpeechRules;
  text: TextRules;
  lint: LintRules;
  /** Visual id → component (the lesson/scene registry). */
  visuals: Record<string, ComponentType<never>>;
  visualIds: readonly string[];
  /** Decorative board background (Contours for English). */
  boardPattern: ComponentType;
  extraData?: {
    nounsFile?: string;
    /** Extra annotation for a word in My words (e.g. the English a/an article badge). */
    wordAnnotator?: (word: string, noun: Noun | undefined) => WordAnnotation;
  };
};
