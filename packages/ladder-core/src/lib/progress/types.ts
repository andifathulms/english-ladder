/** Settings every course has. */
export type CoreSettings = {
  uiLang: 'id' | 'en';
  voice: 'female' | 'male';
  rate: 0.75 | 1;
  sfx: boolean;
  textSize: 100 | 115 | 130;
  theme: 'system' | 'light' | 'dark';
  motion: 'system' | 'reduce';
};

/** Core settings plus the course's own (e.g. English `explain`/`accent`, Arabic `arabicSize`). */
export type Settings = CoreSettings & { [extra: string]: string | number | boolean };

export type LessonProgress = {
  /** Step the learner is on (0–5). */
  step: number;
  /** Furthest step reached. */
  furthest: number;
  /** Check item the learner is on, when step is the Check step. */
  checkIndex?: number;
  completed: boolean;
  lastOpened: number;
};

export type ItemProgress = {
  /** Result of the first answer in the most recent attempt. */
  firstTry: boolean;
  /** Leitner box 1–3. */
  box: 1 | 2 | 3;
  lastSeen: number;
};

export type TestAttempt = { score: number; total: number; seed: number; date: string };

export type RungProgress = {
  tests: TestAttempt[];
  climbed: boolean;
  /** How the rung was climbed (courses with a placement check): its test, or the placement. */
  via?: 'test' | 'placement';
};

/** Done dates (ISO) per capstone kind (e.g. reading, dialogue), per rung. */
export type CapstoneProgress = Record<string, string | undefined>;

export type PlacementRecord = {
  score: number;
  total: number;
  date: string;
  /** The rung the learner was placed in. */
  result: string;
  /** Lesson ids behind the missed items, highlighted on the placed rung's page. */
  missed: string[];
};

export type ProgressState = {
  schemaVersion: number;
  lessons: Record<string, LessonProgress>;
  items: Record<string, ItemProgress>;
  rungs: Record<string, RungProgress>;
  /** Present when the course has capstones (ProgressConfig.features.capstones). */
  capstones?: Record<string, CapstoneProgress>;
  /** Present when the course has a placement check (ProgressConfig.features.placement). */
  placement?: PlacementRecord | null;
  /** Local dates (YYYY-MM-DD) with practice, newest last, at most 60. */
  days: string[];
  /** Lessons whose glossary has been seen (for My words). */
  opened: string[];
  settings: Settings;
};
