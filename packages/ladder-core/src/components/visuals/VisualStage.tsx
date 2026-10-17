'use client';

import type { Noun } from '@ladder/core/lib/types';
import type { VisualId } from '@ladder/core/lib/visualIds';
import { registry } from './registry';
import { useT } from '../ProgressProvider';

type Props = {
  visual: { id: VisualId | string; props: Record<string, unknown> };
  nouns?: Noun[];
  /** False in scene check items: fixed state, no controls. */
  interactive?: boolean;
};

/** The --paper-2 stage behind a visual, plus the registry lookup. */
export function VisualStage({ visual, nouns, interactive = true }: Props) {
  const { lang } = useT();
  const C = registry[visual.id as VisualId] as React.ComponentType<Record<string, unknown>> | undefined;
  if (!C) return null;
  const { state, ...rest } = visual.props as { state?: unknown };
  return (
    <div className="rounded-lg bg-paper-2 p-4">
      <C {...rest} state={interactive ? undefined : state} initial={(rest as { initial?: unknown }).initial ?? state} interactive={interactive} lang={lang} nouns={nouns ?? []} />
    </div>
  );
}
