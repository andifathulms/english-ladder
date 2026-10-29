import type { ComponentType } from 'react';
import type { VisualId } from './visualIds';
import { MouthPlacesDe } from './MouthPlacesDe';
import { GenderTiles } from './GenderTiles';
import { CaseMachine } from './CaseMachine';
import { VerbBracket } from './VerbBracket';
import { WechselScene } from './WechselScene';
import { CompoundBuilder } from './CompoundBuilder';
import { DayPlanner } from './DayPlanner';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
export const registry = {
  'mouth-places-de': MouthPlacesDe,
  'gender-tiles': GenderTiles,
  'case-machine': CaseMachine,
  'verb-bracket': VerbBracket,
  'wechsel-scene': WechselScene,
  'compound-builder': CompoundBuilder,
  'day-planner': DayPlanner,
} satisfies Record<VisualId, ComponentType<never>>;
