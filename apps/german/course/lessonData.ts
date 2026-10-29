// What a lesson page hands its player and strand cards besides the lesson (ContentModel.lessonData →
// useLessonData). Type-only: safe for client code.
import type { Bilingual } from './types';

export type DeBridge = { de: string; nl: string; id: string; kind: 'same' | 'near' | 'off'; note?: Bilingual };
export type DeFalseFriend = { de: string; id: string; looks_like: { id?: string; en?: string }; note: Bilingual };
/** A compound on the Kata card: its parts, the joint after each part, and the genders from nouns.yaml. */
export type DeCompound = { word: string; parts: string[]; links: (string | null)[]; gender: 'm' | 'f' | 'n'; partGenders: ('m' | 'f' | 'n' | null)[] };

export type DeLessonData = {
  /** Deck word ids of the glossary, which join Kartu kata when the lesson is done. */
  wordIds: string[];
  /** The Kata card's bridges and false friends, from data/bridges.yaml. */
  bridges: DeBridge[];
  falseFriends: DeFalseFriend[];
  /** The Kata card's compound breakdowns, from data/nouns.yaml. */
  compounds: DeCompound[];
};

/** A deck word's id: the lemma as written (German nouns keep their capital: Essen ≠ essen). */
export const wordIdOf = (de: string) => `w-${de.replace(/\s+/g, '-')}`;
