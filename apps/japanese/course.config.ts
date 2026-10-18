// Japanese Ladder's course configuration: everything the shared engine needs to run the course
// (docs/japanese/CLAUDE.md, adjusted by docs/japanese/plan.md).
import type { ComponentType } from 'react';
import type { CourseConfig, TargetTextProps } from '@ladder/core/course/types';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { IconChat } from '@ladder/core/components/ui/Icon';
import { isKanaKey, jaAudioKey, spokenJa } from '@/lib/ja/audio';
import { idOverrides, enOverrides, type JapaneseKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { answerText, itemText, itemTypes } from '@/course/items';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, chunkMax, estimateMs, sentenceSplit, sampleText, rateScale } from '@/course/speech';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, EXTENSIONS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR } from '@/course/progress';
import type { Rung } from '@/course/types';
import { Seigaiha } from '@/components/Seigaiha';
import {
  ClimbExtra,
  DoorsOrnament,
  JaSizePreview,
  JapaneseSentence,
  JapaneseTargetText,
  LevelChip,
  RungSubtitle,
  WordmarkHashigo,
} from '@/components/slots';

const rung = (r: unknown) => r as Rung;

/** "N5" or "N4–N3" for the rungs of one tier, in curriculum order; empty for Kana. */
function tierRange(rungs: unknown[], tier: string): string {
  const inTier = (rungs as Rung[]).filter((r) => r.tier === tier && r.jlpt !== '—');
  if (!inTier.length) return '';
  const first = inTier[0].jlpt;
  const last = inTier[inTier.length - 1].jlpt;
  return first === last ? first : `${first}–${last}`;
}

export const course: CourseConfig = {
  id: 'japanese-ladder',
  name: 'Japanese Ladder',
  rangeLabel: 'KANA → N1',
  storageKey: STORAGE_KEY,
  cachePrefix: 'japanese-ladder-',
  exportFilePrefix: 'japanese-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/japanese-ladder',

  // Japanese is set in lang="ja" spans and ruby; the page and its shell stay LTR (DESIGN §6.1).
  target: { lang: 'ja', dir: 'ltr', fontClass: 'font-ja', sentenceClass: '', textAttrs: { lang: 'en' }, topicAttrs: { lang: 'id' } },
  shell: { dir: 'ltr' },
  titles: 'ui',
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings<JapaneseKey>(baseStrings.id, idOverrides),
    en: extendStrings<JapaneseKey>(baseStrings.en, enOverrides),
  },

  // Explanations are always in the UI language; the fades are romaji and furigana (PRD §4.5).
  explainLangs: [],

  settings: {
    defaults: DEFAULT_SETTINGS,
    allowed: ALLOWED_SETTINGS,
    options: {
      accents: [],
      voices: [
        { value: 'female', label: { id: 'Perempuan', en: 'Female' } },
        { value: 'male', label: { id: 'Laki-laki', en: 'Male' } },
      ],
    },
    targetSize: { key: 'jaSize', attr: 'data-ja-size', options: [100, 120, 140], labelKey: 'settings.jaSize', Preview: JaSizePreview },
  },
  progress: { schemaVersion: SCHEMA_VERSION, features: { capstones: true, placement: true }, extensions: EXTENSIONS },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText, rateScale, chunkMax, estimateMs },
  // Recorded audio first, keyed by the reading; single kana and minimal pairs never fall back to speech.
  audio: { key: jaAudioKey, spoken: spokenJa, speechFallback: (t) => !isKanaKey(t) },
  text,
  adapter,
  itemTypes,
  itemText,
  answerText,
  components: {
    Sentence: JapaneseSentence,
    TargetText: JapaneseTargetText as ComponentType<TargetTextProps>,
    WordmarkExtra: WordmarkHashigo,
  },
  lesson: { explain: 'ui', exampleListClass: 'flex flex-col gap-6' },
  ladder: {
    tiers: ['hard', 'medium', 'easy', 'kana'],
    RungSubtitle,
    LevelChip,
    tierRange,
    longRung: { minLessons: 13 },
    rungMeta: (r, t) => [t(`rung.furigana.${rung(r).furigana}`), ' · ', t(`rung.romaji.${rung(r).romaji}`)],
  },
  home: {
    welcome: 'twoDoor',
    // Door 1 opens Kana 1, lesson 1.
    firstRung: (rungs) => rungs.find((r) => r.tier === 'kana' && r.status === 'live'),
    Ornament: DoorsOrnament,
  },
  placement: {
    sections: ['hiragana', 'katakana', 'dakuten', 'ear', 'typing', 'kanji'],
    // 17+ → Easy 1; 12–16 → Kana 2; under 12 → Kana 1 (PRD §5.2); thresholds from placement.yaml.
    outcomes: [
      { result: 'easy-1', threshold: 'easy1', climbs: ['kana-1', 'kana-2'] },
      { result: 'kana-2', threshold: 'kana2', climbs: ['kana-1'] },
      { result: 'kana-1', climbs: [] },
    ],
    retakeRung: 'kana-1',
  },
  capstones: { dialogue: { Icon: IconChat } },
  climb: { Extra: ClimbExtra },
  themeColor: THEME_COLOR,
  // The English Ladder fixes the siblings ship with (all on).
  fixes: {
    reviewExit: true,
    capstoneDone: true,
    lessonScopedToggles: true,
    testProgressLabel: true,
    climbTitleTranslated: true,
    themeColorFollowsTheme: true,
    glossaryAudio: true,
    wordsGroupLabel: true,
    cefrLabelLocalised: true,
  },

  visuals: registry,
  visualIds: VISUAL_IDS,
  boardPattern: Seigaiha,
};
