'use client';

import { createContext, useContext } from 'react';
import type { CourseConfig } from './types';

const Ctx = createContext<CourseConfig | null>(null);

export function CourseProvider({ config, children }: { config: CourseConfig; children: React.ReactNode }) {
  return <Ctx.Provider value={config}>{children}</Ctx.Provider>;
}

/** The active course's config. Must be used under a CourseProvider. */
export function useCourse(): CourseConfig {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCourse outside CourseProvider');
  return c;
}
