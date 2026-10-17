import type { ComponentType } from 'react';
import type { Settings } from '@ladder/core/lib/progress/types';
import type { MigrationStep, ProgressConfig, ProgressFeatures } from '@ladder/core/lib/progress/config';
import type { CheckItem, ExtraItem, Gloss, Lesson, Line, Quote, Rung } from '@ladder/core/lib/types';
import type { ContentAdapter } from '@ladder/core/lib/content/adapter';
import type { ItemTypeLogic } from '@ladder/core/lib/check/itemTypes';
import type { StringTables, UiLang } from '@ladder/core/lib/i18n';

/** Per-word annotation shown in My words (English: the a/an badge and irregular-plural suffix). */
export type WordAnnotation = { badge?: string; pluralSuffix?: string };

/** Scores a browser voice for a course's target language; higher is better, -Infinity to exclude.
 *  `variety` is the spoken variety a line asks for (e.g. Arabic 'eg'), when the course has them. */
export type VoiceScorer = (voice: SpeechSynthesisVoice, settings: Settings, variety?: string) => number;

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
  /** Answer equality for one item (e.g. Arabic exact vs loose matching). Default: equal after
   *  stripping markup and `normalise`. Also used per token for ordered answers when set. */
  equals?: (given: string, expected: string, item: CheckItem) => boolean;
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
  /** Multiplies the learner's rate for browser speech (default 0.95). */
  rateScale?: number;
};

/** Option lists that course-specific Settings controls render. */
export type SettingsOptions = {
  accents: { value: string; label: Record<UiLang, string> }[];
  voices: { value: string; label: Record<UiLang, string> }[];
};

/** One option for the lesson explanation-language toggle; `[]` hides the toggle. */
export type ExplainLang = { value: string; label: Record<UiLang, string> };

export type TileTrayProps = {
  tiles: string[];
  placed: number[];
  onChange: (placed: number[]) => void;
  locked?: boolean;
  tone?: 'idle' | 'good' | 'off';
};

/** How a course renders check items. Every slot defaults to the engine's English-era rendering. */
export type CheckSlots = {
  /** Learner-language text with markup: cues and short prompts. Default: the plain string. */
  Inline?: ComponentType<{ text: string }>;
  /** Choice/gap/order prompt (`fill` is the solved answer for a gap). */
  Prompt?: ComponentType<{ text: string; fill?: string }>;
  /** The wrong sentence of a fix item. */
  Wrong?: ComponentType<{ text: string }>;
  /** A listen item's play control (and its no-audio fallback). */
  Listen?: ComponentType<{ audio: string; prompt?: string; variety?: string }>;
  /** The tray for tile items (order, and course types with tiles). */
  TileTray?: ComponentType<TileTrayProps & { item: CheckItem; slots: number }>;
  /** Option layout: full-width pills, and the 1–4 number badge. */
  optionLayout?: (item: CheckItem, options: string[]) => { wide: boolean; badge: boolean };
  /** Option pills: attributes and label per option text, and the gap between icon and label. */
  pill?: {
    attrs?: (text: string) => { lang?: string; dir?: 'ltr' | 'rtl' };
    Label?: ComponentType<{ text: string; wrong: boolean }>;
    gapClass?: string;
  };
  /** Course item types: the prompt above the answer area, and (optionally) a custom option. */
  types?: Record<
    string,
    {
      Prompt: ComponentType<{ item: ExtraItem; solved: boolean }>;
      Option?: ComponentType<{ value: string; index: number; state: import('@ladder/core/components/check/OptionPill').PillState; disabled?: boolean; onClick: () => void }>;
      /** aria-label for the option group, when Option is set. */
      optionsLabel?: string;
    }
  >;
};

/** Props of the TargetText slot (the same shape as Arabic's ArIsland). */
export type TargetTextProps = Omit<React.HTMLAttributes<HTMLElement>, 'dir' | 'lang'> & {
  children: React.ReactNode;
  /** A block element instead of an inline one. */
  block?: boolean;
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'li';
  size?: 'sentence' | 'body' | 'small' | 'glyph' | 'title' | 'inherit';
  face?: 'text' | 'display' | 'ui';
  variety?: string;
};

/** Where a placement score lands: the first outcome whose threshold the score reaches. */
export type PlacementOutcome = {
  /** The rung the learner is placed in. */
  result: string;
  /** Key into placement.yaml `thresholds`; omit on the last (fallback) outcome. */
  threshold?: string;
  /** Rungs marked climbed (via placement) by this outcome. */
  climbs: string[];
};

export type PlacementConfig = {
  /** Item sections, in display order (strings: placement.section.<s>, placement.sectionShort.<s>). */
  sections: string[];
  /** Highest first; also the ladder fragment shown on the result screen. */
  outcomes: PlacementOutcome[];
  /** The rung page that offers a retake. */
  retakeRung?: string;
  /** Wraps each item while it is shown (e.g. Arabic: full harakat, no transliteration). */
  Wrap?: ComponentType<{ children: React.ReactNode }>;
};

export type CourseFixes = {
  /** Capstone completion is saved and shown with its date; reading answers feed review (EL issue 4). */
  capstoneDone?: boolean;
  /** CEFR labels in the UI language ("Pra-A1" in Indonesian for Pre-A1). */
  cefrLabelLocalised?: boolean;
};

/** Where a target line appears; the Sentence slot picks size, play button and note from it. */
export type SentenceUse = 'example' | 'worked' | 'pairOff' | 'pairNatural' | 'reading' | 'dialogue';
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
  target: {
    lang: string;
    dir: 'ltr' | 'rtl';
    fontClass: string;
    sentenceClass: string;
    /** Attributes on plain spans of target/metadata text outside the TargetText slot (topics,
     *  threads, test-result answers). Default: { lang, dir } above. */
    textAttrs?: { lang?: string; dir?: 'ltr' | 'rtl' };
  };
  /**
   * How titles read. 'target' (English): the target-language title leads, the Indonesian one
   * below. 'ui': the title in the learner's UI language leads, the target title is a TargetText
   * island beside it (Arabic: Indonesian title, then the Arabic one).
   */
  titles?: 'target' | 'ui';
  /** Explanation prose: how **term** / [[focus]] tokens and plain text runs render. */
  prose?: {
    Term?: ComponentType<{ text: string; kind: 'strong' | 'focus' }>;
    Text?: ComponentType<{ text: string }>;
  };
  /**
   * The app shell's direction: lesson arrow keys and the climb marker follow it. Defaults to the
   * target's. A course whose page stays LTR with RTL target islands (Arabic) sets 'ltr'.
   */
  shell?: { dir: 'ltr' | 'rtl' };
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
  /** Recorded audio (public/audio/manifest.json) before browser speech. Absent: speech only. */
  audio?: { defaultVariety: string };
  text: TextRules;
  /** How the engine reads this course's lessons and readings (lib/content/adapter.ts). */
  adapter: ContentAdapter;
  /** Course item types' grading/text logic, registered at app start with registerItemTypes(). */
  itemTypes?: Record<string, ItemTypeLogic>;
  /** Strand cards per lesson step, in order (e.g. English Talk + Sound, then Words). */
  strands?: { examples?: StrandCard[]; contrast?: StrandCard[] };
  /** Rung capstones (reading, dialogue) shown as cards in their own section of the rung page. */
  capstones?: {
    dialogue?: {
      /** String key appended to the dialogue's name (Arabic: 'lesson.mesir', "Mesir"). */
      tagKey?: string;
      /** Badge in the dialogue header and its card's icon (Arabic: the EG chip). */
      Badge?: ComponentType;
      /** Extra classes for the dialogue card and text section (Arabic: the --eg inline-start edge). */
      edgeClass?: string;
      /** Classes for the dialogue card's icon square. */
      iconClass?: string;
    };
  };
  /** Home: the first-visit board. */
  home?: {
    /** 'start' (default): one button to the first lesson. 'twoDoor': start from the first rung, or
     *  take the placement check (needs placement.yaml). */
    welcome?: 'start' | 'twoDoor';
    /** The rung the first door (or start button) opens. Default: the first live, non-optional rung. */
    firstRung?: (rungs: Rung[]) => Rung | undefined;
    /** A small mark at the top inline-end of the two-door board (Arabic: سُلَّم). */
    Ornament?: ComponentType;
  };
  /** A placement check (placement.yaml) for learners who already know some of the course. */
  placement?: PlacementConfig;
  /** The ladder: tier order and per-rung extras. */
  ladder?: {
    /** Tier sections, top to bottom (default: hard, medium, easy). */
    tiers?: string[];
    /** A second name for a rung (Arabic: الحروف), on the rail (compact) and on boards. */
    rungSubtitle?: (rung: Rung, place: 'rail' | 'board') => string | null;
    /** The small line under the rung board's description (English: the explanation language).
     *  Parts render as separate text nodes, exactly as `{a}: {b}` in JSX would. */
    rungMeta?: (rung: Rung, t: (key: string) => string) => string[] | null;
  };
  /**
   * English Ladder bug fixes (recon §13) that sibling courses ship with. Each is off by default so
   * English stays pixel-identical until its own fix branch turns them on with a fresh baseline.
   */
  fixes?: CourseFixes;
  /** Check-item rendering (see CheckSlots). */
  check?: CheckSlots;
  /** Rendering slots; each defaults to the engine's own component. */
  components?: {
    /** A target-language line (examples, worked, pair, reading, …). Default: core Sentence. */
    Sentence?: ComponentType<SentenceSlotProps>;
    /** Target text outside sentences: titles, keywords, glossary words (Arabic: ArIsland). */
    TargetText?: ComponentType<TargetTextProps>;
    /** The quoted resume line on the board (continue card). Default: the display serif line. */
    BoardQuote?: ComponentType<{ quote: Quote; rung: Rung | undefined }>;
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

/** Direction of the app shell (arrows, mirrored markers). */
export const shellDir = (c: Pick<CourseConfig, 'shell' | 'target'>): 'ltr' | 'rtl' => c.shell?.dir ?? c.target.dir;

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
