'use client';

import { createContext, useContext } from 'react';

const Ctx = createContext<unknown>(undefined);

/** The page's ContentModel.lessonData, read at build time and handed down to the player. */
export function LessonDataProvider({ value, children }: { value: unknown; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** This lesson's course data (undefined for courses without ContentModel.lessonData). */
export function useLessonData<T>(): T {
  return useContext(Ctx) as T;
}
