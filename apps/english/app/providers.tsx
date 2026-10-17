'use client';

import { CourseProvider } from '@ladder/core/course/context';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { course } from '@/course.config';

/** Wires the active course config and progress store. Both are client providers, so the
 *  non-serialisable config (functions, component references) stays inside the client bundle. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider config={course}>
      <ProgressProvider>{children}</ProgressProvider>
    </CourseProvider>
  );
}
