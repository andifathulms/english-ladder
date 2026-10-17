// Arabic Ladder's course configuration: everything the shared engine needs to run the course
// exactly as the standalone app did (same storage key, cache prefix, export name and look).
import type { ComponentType } from 'react';
import type { CourseConfig, TargetTextProps } from '@ladder/core/course/types';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { stripHarakat } from '@/lib/arabic/text';
import { idOverrides, enOverrides, type ArabicKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { itemText, itemTypes } from '@/course/items';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText, rateScale } from '@/course/speech';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR } from '@/course/progress';
import type { Rung } from '@/course/types';
import { Lattice } from '@/components/Lattice';
import { ArIsland } from '@/components/ar/ArIsland';
import { EgChip } from '@/components/ar/EgChip';
import { Translit } from '@/components/ar/Translit';
import { checkSlots } from '@/components/check/slots';
import { WordsRow, matchesWord } from '@/components/WordsRow';
import {
  ArabicSentence,
  ArabicSizePreview,
  BoardQuote,
  ClimbExtra,
  DoorsOrnament,
  MesirStrand,
  PlacementWrap,
  ProseTerm,
  ProseText,
  SoundStrand,
  TalkStrand,
  TirukanStrand,
  WordmarkSullam,
  WordsStrand,
  useArabicSession,
} from '@/components/slots';

const rung = (r: unknown) => r as Rung;

export const course: CourseConfig = {
  id: 'arabic-ladder',
  name: 'Arabic Ladder',
  rangeLabel: 'HURUF → B2+',
  storageKey: STORAGE_KEY,
  cachePrefix: 'arabic-ladder-',
  exportFilePrefix: 'arabic-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/arabic-ladder',

  // Arabic text is RTL, in islands; the page and its shell stay LTR (DESIGN §6.1).
  target: { lang: 'ar', dir: 'rtl', fontClass: 'font-ar', sentenceClass: '', textAttrs: { lang: 'en' } },
  shell: { dir: 'ltr' },
  titles: 'ui',
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings<ArabicKey>(baseStrings.id, idOverrides),
    en: extendStrings<ArabicKey>(baseStrings.en, enOverrides),
  },

  // Explanations are always in the UI language; the fades are transliteration and harakat (PRD §5.3).
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
    targetSize: { key: 'arabicSize', attr: 'data-ar-size', options: [100, 120, 140], labelKey: 'settings.arabicSize', Preview: ArabicSizePreview },
  },
  progress: { schemaVersion: SCHEMA_VERSION, features: { capstones: true, placement: true } },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText, rateScale },
  audio: { defaultVariety: 'fusha' },
  text,
  adapter,
  itemTypes,
  itemText,
  check: checkSlots,
  prose: { Term: ProseTerm, Text: ProseText },
  components: {
    Sentence: ArabicSentence,
    TargetText: ArIsland as ComponentType<TargetTextProps>,
    BoardQuote,
    Translit,
    WordmarkExtra: WordmarkSullam,
  },
  strands: {
    examples: [MesirStrand, SoundStrand, TalkStrand, TirukanStrand],
    contrast: [WordsStrand],
  },
  lesson: { explain: 'ui', useSession: useArabicSession, exampleListClass: 'flex flex-col gap-6' },
  ladder: {
    tiers: ['hard', 'medium', 'easy', 'huruf'],
    rungSubtitle: (r, place) => (place === 'rail' ? stripHarakat(rung(r).name_ar) : rung(r).name_ar),
    rungMeta: (r, t) => [t(`rung.translit.${rung(r).translit}`), ' · ', t(`rung.harakat.${rung(r).harakat}`)],
  },
  home: {
    welcome: 'twoDoor',
    // Door 1 opens Huruf 1, lesson 1.
    firstRung: (rungs) => rungs.find((r) => r.tier === 'huruf' && r.status === 'live'),
    Ornament: DoorsOrnament,
  },
  placement: {
    sections: ['forms', 'reading', 'harakat', 'sounds'],
    // 18+ → Easy 1; 14–17 → Huruf 2; under 14 → Huruf 1 (PRD §5.2); thresholds from placement.yaml.
    outcomes: [
      { result: 'easy-1', threshold: 'easy1', climbs: ['huruf-1', 'huruf-2'] },
      { result: 'huruf-2', threshold: 'huruf2', climbs: ['huruf-1'] },
      { result: 'huruf-1', climbs: [] },
    ],
    retakeRung: 'huruf-1',
    Wrap: PlacementWrap,
  },
  capstones: {
    dialogue: { tagKey: 'lesson.mesir', Badge: EgChip, edgeClass: 'border-s-[3px] border-eg', iconClass: 'bg-eg-soft text-eg' },
  },
  climb: { Extra: ClimbExtra },
  words: { match: matchesWord, Row: WordsRow },
  themeColor: THEME_COLOR,
  // The English Ladder fixes Arabic Ladder shipped with (PRD §5.9).
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
  boardPattern: Lattice,
};
