import type { ComponentType } from 'react';
import type { VisualId } from './visualIds';
import { StressMap } from './StressMap';
import { Agreement } from './Agreement';
import { SerEstar } from './SerEstar';
import { ConjugationGrid } from './ConjugationGrid';
import { GustarFlip } from './GustarFlip';
import { PlaceSceneEs } from './PlaceSceneEs';
import { RoutineClock } from './RoutineClock';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
export const registry = {
  'stress-map': StressMap,
  agreement: Agreement,
  'ser-estar': SerEstar,
  'conjugation-grid': ConjugationGrid,
  'gustar-flip': GustarFlip,
  'place-scene-es': PlaceSceneEs,
  'routine-clock': RoutineClock,
} satisfies Record<VisualId, ComponentType<never>>;
