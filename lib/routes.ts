import type { LessonSummary } from './types';

export const rungHref = (rungId: string) => `/rung/${rungId}/`;
export const lessonHref = (l: Pick<LessonSummary, 'rung' | 'slug'>) => `/rung/${l.rung}/${l.slug}/`;
export const testHref = (rungId: string) => `/rung/${rungId}/test/`;
export const readHref = (rungId: string) => `/rung/${rungId}/read/`;
