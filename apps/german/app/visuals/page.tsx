import type { Metadata } from 'next';
import { VisualsSheet } from '@/components/VisualsSheet';
import { model } from '@/course/content';
import { VISUAL_IDS } from '@/visuals/visualIds';
import type { DeVisualData } from '@/visuals/data';

// A QA sheet with every visual (CLAUDE.md §6 visual sanity, axe). Not linked from the app.
export const metadata: Metadata = { title: 'Visuals', robots: { index: false } };

export default function VisualsPage() {
  return <VisualsSheet data={model.visualData!(new Set(VISUAL_IDS), {}) as DeVisualData} />;
}
