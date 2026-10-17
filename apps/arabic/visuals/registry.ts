import type { ComponentType } from 'react';
import type { VisualId } from '@/visuals/visualIds';
import { LetterForms } from '@/visuals/LetterForms';
import { WordJoiner } from '@/visuals/WordJoiner';
import { HarakatBuilder } from '@/visuals/HarakatBuilder';
import { Makhraj } from '@/visuals/Makhraj';
import { SunMoon } from '@/visuals/SunMoon';
import { PlaceSceneAr } from '@/visuals/PlaceSceneAr';
import { Agreement } from '@/visuals/Agreement';

/** Visual id → component. Lesson frontmatter refers to visuals by id only. */
// Each visual takes VisualProps plus its own props from frontmatter.
export const registry = {
  'letter-forms': LetterForms,
  'word-joiner': WordJoiner,
  'harakat-builder': HarakatBuilder,
  makhraj: Makhraj,
  'sun-moon': SunMoon,
  'place-scene-ar': PlaceSceneAr,
  agreement: Agreement,
} satisfies Record<VisualId, ComponentType<never>>;
