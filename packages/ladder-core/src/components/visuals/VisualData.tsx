'use client';

import { createContext, useContext } from 'react';

const Ctx = createContext<unknown>(undefined);

/** Build-time data the course's visuals need (e.g. English nouns, Arabic letters), from the page. */
export function VisualDataProvider({ value, children }: { value: unknown; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** The page's visual data, as the course shaped it (ContentModel.visualData). */
export function useVisualData<T>(): T | undefined {
  return useContext(Ctx) as T | undefined;
}
