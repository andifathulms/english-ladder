// What a lesson page hands its player and strand cards besides the lesson (ContentModel.lessonData →
// useLessonData). Type-only: safe for client code.
import type { Bilingual } from './types';

export type EsBridge = { es: string; pt: string; id: string; kind: 'same' | 'near' | 'off' };
export type EsFalseFriend = { es: string; means: Bilingual; warn: Bilingual };

export type EsLessonData = {
  /** Deck word ids of the glossary, which join Kartu kata when the lesson is done. */
  wordIds: string[];
  /** The Kata card's bridges and false friends, from data/bridges.yaml. */
  bridges: EsBridge[];
  falseFriends: EsFalseFriend[];
};

/** A deck word's id: the lemma, lowercase. */
export const wordIdOf = (es: string) => `w-${es.toLowerCase().replace(/\s+/g, '-')}`;
