export type Settings = {
  uiLang: 'id' | 'en';
  explain: 'rung' | 'id' | 'en';
  accent: 'gb' | 'us';
  voice: 'female' | 'male';
  rate: 0.75 | 1;
  sfx: boolean;
  textSize: 100 | 115 | 130;
  theme: 'system' | 'light' | 'dark';
  motion: 'system' | 'reduce';
};

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

export type RungProgress = { tests: TestAttempt[]; climbed: boolean };

export type ProgressState = {
  schemaVersion: number;
  lessons: Record<string, LessonProgress>;
  items: Record<string, ItemProgress>;
  rungs: Record<string, RungProgress>;
  /** Local dates (YYYY-MM-DD) with practice, newest last, at most 60. */
  days: string[];
  /** Lessons whose glossary has been seen (for My words). */
  opened: string[];
  settings: Settings;
};
