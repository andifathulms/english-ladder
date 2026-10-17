import { progressConfig } from './config';
import type { ProgressState } from './types';

export function emptyState(): ProgressState {
  const { schemaVersion, defaults, features, extensions } = progressConfig();
  return {
    schemaVersion,
    lessons: {},
    items: {},
    rungs: {},
    ...(features.capstones ? { capstones: {} } : {}),
    ...(features.placement ? { placement: null } : {}),
    days: [],
    opened: [],
    ...Object.fromEntries(Object.entries(extensions ?? {}).map(([k, e]) => [k, e.empty()])),
    settings: { ...defaults },
  };
}
