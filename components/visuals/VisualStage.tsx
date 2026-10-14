'use client';

import type { Noun } from '@/lib/types';

type Props = { visual: { id: string; props: Record<string, unknown> }; nouns?: Noun[] };

/** Placeholder until the visual components land. */
export function VisualStage({ visual }: Props) {
  return <div className="rounded-lg bg-paper-2 p-4">{visual.id}</div>;
}
