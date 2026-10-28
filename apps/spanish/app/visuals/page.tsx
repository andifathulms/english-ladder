import type { Metadata } from 'next';
import { VisualsSheet } from '@/components/VisualsSheet';
import { getData } from '@/course/content';

// A QA sheet with every visual (CLAUDE.md §8 visual sanity, axe). Not linked from the app.
export const metadata: Metadata = { title: 'Visuals', robots: { index: false } };

export default function VisualsPage() {
  return <VisualsSheet verbs={getData().verbs} />;
}
