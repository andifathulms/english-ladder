'use client';

import { CourseProvider } from '@ladder/core/course/context';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { progressConfigOf } from '@ladder/core/course/types';
import * as store from '@ladder/core/lib/progress/store';
import { course } from '@/course.config';

// Point the progress store at this course before anything reads it.
store.configure(progressConfigOf(course));

/** Wires the active course config and progress store. Both are client providers, so the
 *  non-serialisable config (functions, component references) stays inside the client bundle. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider config={course}>
      <ProgressProvider>{children}</ProgressProvider>
    </CourseProvider>
  );
}
