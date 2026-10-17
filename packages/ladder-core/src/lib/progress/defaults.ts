import { progressConfig } from './config';
import type { ProgressState } from './types';

export function emptyState(): ProgressState {
  const { schemaVersion, defaults, features } = progressConfig();
  return {
    schemaVersion,
    lessons: {},
    items: {},
    rungs: {},
    ...(features.capstones ? { capstones: {} } : {}),
    ...(features.placement ? { placement: null } : {}),
    days: [],
    opened: [],
    settings: { ...defaults },
  };
}
