import { CourseProvider } from '@ladder/core/course/context';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { course } from '@/course.config';

/** Wraps unit-rendered engine components in the German course + progress providers. */
export function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider config={course}>
      <ProgressProvider>{children}</ProgressProvider>
    </CourseProvider>
  );
}
