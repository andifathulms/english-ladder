// English Ladder's course configuration. Reproduces the engine's historical English
// behaviour exactly, so the app looks and behaves identically after the extraction.
import type { CourseConfig } from '@ladder/core/course/types';
import { Contours } from '@ladder/core/components/ui/Contours';
import { DEFAULT_SETTINGS } from '@ladder/core/lib/progress/defaults';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { INVENTORY_DETECTORS, STRUCTURE_RULES, WORD_REGEX, knownWord } from '@/course/lint';
import { wordAnnotator } from '@/course/words';

export const course: CourseConfig = {
  id: 'english-ladder',
  name: 'English Ladder',
  rangeLabel: 'A1 → C1',
  storageKey: 'english-ladder:v1',
  cachePrefix: 'english-ladder-',
  exportFilePrefix: 'english-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/english-ladder',

  target: { lang: 'en', dir: 'ltr', fontClass: '', sentenceClass: '' },
  ui: { defaultLang: 'id' },

  explainLangs: [
    { value: 'id', label: { id: 'ID', en: 'ID' } },
    { value: 'en', label: { id: 'EN', en: 'EN' } },
  ],

  settings: {
    defaults: DEFAULT_SETTINGS,
    options: {
      accents: [
        { value: 'gb', label: { id: 'Britania', en: 'British' } },
        { value: 'us', label: { id: 'Amerika', en: 'American' } },
      ],
      voices: [
        { value: 'female', label: { id: 'Perempuan', en: 'Female' } },
        { value: 'male', label: { id: 'Laki-laki', en: 'Male' } },
      ],
    },
  },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText },

  text,

  lint: {
    wordRegex: WORD_REGEX,
    knownWord,
    detectors: Object.entries(INVENTORY_DETECTORS).map(([id, re]) => ({ id, re })),
    structureRules: STRUCTURE_RULES,
  },

  visuals: registry,
  visualIds: VISUAL_IDS,
  boardPattern: Contours,

  extraData: { nounsFile: 'data/nouns.yaml', wordAnnotator },
};
