'use client';

import { CourseProvider } from '@ladder/core/course/context';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { startCourse } from '@ladder/core/course/start';
import { course } from '@/course.config';
import { CaseColours } from '@/components/CaseColours';

// Point the engine (progress store, item types, audio) at this course before anything reads it.
startCourse(course);

/** Wires the active course config and progress store. Both are client providers, so the
 *  non-serialisable config (functions, component references) stays inside the client bundle. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider config={course}>
      <ProgressProvider>
        <CaseColours />
        {children}
      </ProgressProvider>
    </CourseProvider>
  );
}
