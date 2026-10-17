'use client';

import type { Noun } from '@ladder/core/lib/types';
import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';

type Props = {
  visual: { id: string; props: Record<string, unknown> };
  nouns?: Noun[];
  /** False in scene check items: fixed state, no controls. */
  interactive?: boolean;
};

/** The --paper-2 stage behind a visual, plus the course's registry lookup. */
export function VisualStage({ visual, nouns, interactive = true }: Props) {
  const { lang } = useT();
  const { visuals } = useCourse();
  const C = visuals[visual.id] as React.ComponentType<Record<string, unknown>> | undefined;
  if (!C) return null;
  const { state, ...rest } = visual.props as { state?: unknown };
  return (
    <div className="rounded-lg bg-paper-2 p-4">
      <C {...rest} state={interactive ? undefined : state} initial={(rest as { initial?: unknown }).initial ?? state} interactive={interactive} lang={lang} nouns={nouns ?? []} />
    </div>
  );
}
