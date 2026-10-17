import type { CourseConfig } from './types';
import { progressConfigOf } from './types';
import * as store from '@ladder/core/lib/progress/store';
import { registerItemTypes } from '@ladder/core/lib/check/itemTypes';
import { configureAudio } from '@ladder/core/lib/speech/audio';

/**
 * Points the engine's module-level services at a course: the progress store (key, schema,
 * migrations, settings), course item types, and recorded audio. Call once at app start, before
 * anything reads progress (the app's providers do it at module load; tests in their setup).
 */
export function startCourse(course: CourseConfig) {
  store.configure(progressConfigOf(course));
  if (course.itemTypes) registerItemTypes(course.itemTypes);
  configureAudio(course.audio ? { normalise: course.text.normalise, defaultVariety: course.audio.defaultVariety } : null);
}
