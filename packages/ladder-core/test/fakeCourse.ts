// A minimal RTL course for engine tests: everything English-specific is absent.
import type { CourseConfig } from '@ladder/core/course/types';
import { baseStrings } from '@ladder/core/lib/i18n';
import { CORE_DEFAULT_SETTINGS } from '@ladder/core/lib/progress/config';

export const fakeArabic: CourseConfig = {
  id: 'fake-arabic',
  name: 'Arabic Ladder',
  rangeLabel: 'A1 → C1',
  storageKey: 'fake-arabic:v1',
  cachePrefix: 'fake-arabic-',
  exportFilePrefix: 'fake-arabic-progress',
  repoUrl: 'https://example.com',
  target: { lang: 'ar', dir: 'rtl', fontClass: 'font-arabic', sentenceClass: 'sentence-arabic' },
  ui: { defaultLang: 'id' },
  strings: baseStrings,
  explainLangs: [],
  settings: { defaults: CORE_DEFAULT_SETTINGS, options: { accents: [], voices: [] } },
  progress: { schemaVersion: 1 },
  speech: { voiceScorer: () => -Infinity, sentenceSplit: /[^.!?]+[.!?]*/g, canSpeak: () => false, sampleText: '' },
  text: { normalise: (s) => s, tokenEquals: (a, b) => a === b, trimPunct: /$/u, tokenise: () => [] },
  adapter: {
    lesson: {
      title: () => ({ target: null, id: '', en: '' }),
      examples: () => [],
      worked: () => null,
      pair: () => ({ off: { text: '' }, natural: { text: '' } }),
      glossary: () => [],
      closing: () => '',
      focusTexts: () => [],
    },
    reading: {
      title: () => ({ target: null, id: '', en: '' }),
      text: () => ({ text: '' }),
      translation: () => ({ text: '', lang: 'id' }),
      glossary: () => [],
    },
  },
  visuals: {},
  visualIds: [],
  boardPattern: () => null,
};
