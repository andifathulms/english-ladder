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
  /** Longest chunk read in one utterance (default 160 characters). */
  chunkMax?: number;
  /** Speaking time of a line without a recording, for the Tirukan pause (default 75 ms a character). */
  estimateMs?: (text: string, rate: number) => number;
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
  /** Attributes per tile text. Default: the target language and direction. */
  tileAttrs?: (text: string) => { lang?: string; dir?: 'ltr' | 'rtl' };
  /** Classes per tile text. Default: `text-body`. */
  tileClass?: (text: string) => string;
  /** The tile's content. Default: the text. */
  Label?: ComponentType<{ text: string }>;
  /** Shown under the answer line (e.g. Mandarin's joined sentence). */
  AfterLine?: ComponentType<{ placed: string[] }>;
};

/** A course item type's own answer area (in place of option pills), e.g. a text input. */
export type AnswerProps = {
  item: ExtraItem;
  mode: 'practice' | 'test';
  /** The test's current response. */
  value?: import('@ladder/core/lib/check/grade').Response;
  solved: boolean;
  /** Good once solved, off after a wrong try (cleared by onChange). */
  tone: 'idle' | 'good' | 'off';
  /** The response changed (records it in a test; clears the off tone). */
  onChange: (r: import('@ladder/core/lib/check/grade').Response) => void;
  /** Practice: grade the response. `misses` replaces the miss count first (e.g. a trace's own). */
  submit: (r: import('@ladder/core/lib/check/grade').Response, opts?: { misses?: number }) => void;
};

/** How a course renders check items. Every slot defaults to the engine's English-era rendering. */
export type CheckSlots = {
  /** Learner-language text with markup: cues and short prompts. Default: the plain string. */
  Inline?: ComponentType<{ text: string; item: CheckItem }>;
  /** Choice/gap/order prompt (`fill` is the solved answer for a gap). */
  Prompt?: ComponentType<{ text: string; fill?: string; item: CheckItem }>;
  /** The wrong sentence of a fix item. */
  Wrong?: ComponentType<{ text: string; item: CheckItem }>;
  /** A listen item's play control (and its no-audio fallback). */
  Listen?: ComponentType<{ audio: string; prompt?: string; variety?: string; item: CheckItem }>;
  /** Extra attributes on the item's root (e.g. `data-type`). */
  rootAttrs?: (item: CheckItem) => Record<string, string>;
  /** The solved pill is the one that grades correct, not the one equal to `answer`. */
  correctPillByGrade?: boolean;
  /** A wrong answer tried again counts once towards the why line. */
  dedupeWrong?: boolean;
  /** The tray for tile items (order, and course types with tiles). */
  TileTray?: ComponentType<TileTrayProps & { item: CheckItem; slots: number }>;
  /** Option layout: full-width pills, and the 1–4 number badge. */
  optionLayout?: (item: CheckItem, options: string[]) => { wide: boolean; badge: boolean };
  /** Option pills: attributes and label per option text, and the gap between icon and label. */
  pill?: {
    attrs?: (text: string) => { lang?: string; dir?: 'ltr' | 'rtl' } & { [data: `data-${string}`]: string };
    /** `text` is the label without markup; `raw` as authored. */
    Label?: ComponentType<{ text: string; wrong: boolean; raw: string; item?: CheckItem }>;
    gapClass?: string;
  };
  /** Course item types: the prompt above the answer area, and (optionally) a custom option. */
  types?: Record<
    string,
    {
      Prompt: ComponentType<{ item: ExtraItem; solved: boolean }>;
      /** The answer area, when the type is answered some other way than options or tiles. */
      Answer?: ComponentType<AnswerProps>;
      Option?: ComponentType<{ value: string; index: number; state: import('@ladder/core/components/check/OptionPill').PillState; disabled?: boolean; onClick: () => void }>;
      /** UI string key for the option group's aria-label, when Option is set. */
      optionsLabelKey?: string;
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

/** What a lesson session adds to the player. */
export type LessonSession = {
  /** Controls in the top bar, in place of the explanation pill. */
  toggles?: React.ReactNode;
  /** Wraps the step body (e.g. a context provider for the session's state). */
  wrap?: (children: React.ReactNode) => React.ReactNode;
  /** Shown at the top of the Examples step (e.g. a one-time hint). */
  examplesIntro?: React.ReactNode;
};

export type CourseFixes = {
  /** My words groups are ordered by rung, then lesson, and labelled "Rung · Lesson n" (EL issue 11). */
  wordsGroupLabel?: boolean;
  /** The browser's theme-color follows the in-app theme, not the OS (EL issue 14). Needs themeColor. */
  themeColorFollowsTheme?: boolean;
  /** The climb moment's title is in the UI language, not marked as the target language (EL issue 13). */
  climbTitleTranslated?: boolean;
  /** A close control while a quick review runs; answers already given stay recorded (EL issue 3). */
  reviewExit?: boolean;
  /** The rung test's progress bar counts questions ("Question 3 of 16"), not lesson steps (EL issue 6). */
  testProgressLabel?: boolean;
  /** New-word chips (lesson Done step, reading) have audio and a transliteration (EL issue 15). */
  glossaryAudio?: boolean;
  /** The explanation pill changes the current lesson only, not the global setting (EL issue 5). */
  lessonScopedToggles?: boolean;
  /** Capstone completion is saved and shown with its date; reading answers feed review (EL issue 4). */
  capstoneDone?: boolean;
  /** CEFR labels in the UI language ("Pra-A1" in Indonesian for Pre-A1). */
  cefrLabelLocalised?: boolean;
};

/** Where a target line appears; the Sentence slot picks size, play button and note from it. */
export type SentenceUse = 'example' | 'worked' | 'pairOff' | 'pairNatural' | 'reading' | 'dialogue' | 'tirukan';
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
    /** A second size setting for target-language type only (Arabic: Ukuran teks Arab). The value is
     *  mirrored to <html attr="…"> (omitted at 100) and shown under Display with a preview. */
    targetSize?: {
      key: string;
      attr: string;
      options: number[];
      /** UI string key for the row label. */
      labelKey: string;
      Preview?: ComponentType;
    };
    options: SettingsOptions;
  };
  /** The stored progress shape. `storageKey` above is where it lives. */
  progress: {
    schemaVersion: number;
    /** Steps keyed by the version they upgrade from (0 → 1 is built in). */
    migrations?: Record<number, MigrationStep>;
    features?: ProgressFeatures;
    /** The course's own state parts (e.g. Mandarin's deck, traces), stored after `opened`. */
    extensions?: ProgressConfig['extensions'];
    /** Applied in the same commit as completeLesson, with the page's lesson data. */
    onCompleteLesson?: ProgressConfig['onCompleteLesson'];
  };
  speech: SpeechRules;
  /** Recorded audio (public/audio/manifest.json) before browser speech. Absent: speech only. */
  audio?: {
    defaultVariety?: string;
    /** The course's key scheme (default sha1(normalise(text)|variety), 12 hex digits). */
    key?: (text: string, variety?: string) => string;
    /** False for strings that never fall back to browser speech (e.g. Mandarin syllables). */
    speechFallback?: (text: string) => boolean;
    /** The text browser speech reads (default: the text without markup). */
    spoken?: (plain: string) => string;
  };
  text: TextRules;
  /** How the engine reads this course's lessons and readings (lib/content/adapter.ts). */
  adapter: ContentAdapter;
  /** Course item types' grading/text logic, registered at app start with registerItemTypes(). */
  itemTypes?: Record<string, ItemTypeLogic>;
  /** Text of engine item types where the course words it differently (see ContentModel.itemText). */
  itemText?: Record<string, (item: ExtraItem) => string>;
  /** Strand cards per lesson step, in order (e.g. English Talk + Sound, then Words). */
  strands?: { examples?: StrandCard[]; contrast?: StrandCard[] };
  /** The lesson player. */
  lesson?: {
    /** 'setting' (default): explanations follow the learner's setting or the rung default, with the
     *  ID/EN pill. 'ui': always the UI language, no pill. */
    explain?: 'setting' | 'ui';
    /** Lesson-scoped state, alive only while the lesson is open (Arabic: Latin and Harakat toggles). */
    useSession?: (rung: Rung, step: number) => LessonSession;
    /** Classes for the Examples step's list (default 'flex flex-col gap-5'). */
    exampleListClass?: string;
  };
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
  /** The climb moment: the rung's subtitle above the title, the line with its last word accented,
   *  and an extra line below (Arabic: سُلَّمًا سُلَّمًا). Absent: English's layout. */
  climb?: { Extra?: ComponentType };
  /** --paper of each theme, for the browser chrome's theme-color (fixes.themeColorFollowsTheme). */
  themeColor?: { light: string; dark: string };
  /** My words: search and the word row. */
  words?: {
    /** Whether a word matches the search (default: word or Indonesian meaning contains it). */
    match?: (word: Gloss, query: string) => boolean;
    /** The whole <li> for one word (default: word, meaning, annotation badge, play button). */
    Row?: ComponentType<{ word: Gloss; rungs: Rung[]; lessons: import('@ladder/core/lib/types').LessonSummary[] }>;
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
    /** A small mark after the wordmark's range line (Arabic: سُلَّم). */
    WordmarkExtra?: ComponentType;
    /** A transliteration line (Arabic: upright Amiri Latin under the Arabic). */
    Translit?: ComponentType<{ text: string; className?: string; onBoard?: boolean }>;
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
    extensions: c.progress.extensions,
    onCompleteLesson: c.progress.onCompleteLesson,
  };
}
