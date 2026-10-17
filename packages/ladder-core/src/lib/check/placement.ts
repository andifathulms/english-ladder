import type { CheckItem, Placement } from '../types';
import type { PlacementOutcome, TextRules } from '@ladder/core/course/types';
import { grade, type Response } from './grade';

export type PlacementScore = {
  score: number;
  total: number;
  bySection: Record<string, { score: number; total: number }>;
  /** The rung the learner is placed in. */
  result: string;
  /** Lesson ids behind missed items (deduplicated). */
  missed: string[];
};

/** The first outcome whose threshold the score reaches; the last outcome is the fallback. */
export function placementOutcome(score: number, p: Placement, outcomes: PlacementOutcome[]): PlacementOutcome {
  return outcomes.find((o) => !o.threshold || score >= (p.thresholds[o.threshold] ?? Infinity)) ?? outcomes[outcomes.length - 1];
}

export function scorePlacement(
  p: Placement,
  answers: Record<string, Response | undefined>,
  cfg: { sections: string[]; outcomes: PlacementOutcome[] },
  text: TextRules,
): PlacementScore {
  const bySection = Object.fromEntries(cfg.sections.map((s) => [s, { score: 0, total: 0 }]));
  const missed: string[] = [];
  let score = 0;
  for (const item of p.items as CheckItem[]) {
    const sec = bySection[item.section ?? cfg.sections[0]] ?? (bySection[cfg.sections[0]] as { score: number; total: number });
    sec.total += 1;
    const a = answers[item.id];
    const ok = a !== undefined && grade(item, a, text).correct;
    if (ok) {
      score += 1;
      sec.score += 1;
    } else if (item.from && !missed.includes(item.from)) missed.push(item.from);
  }
  return { score, total: p.items.length, bySection, result: placementOutcome(score, p, cfg.outcomes).result, missed };
}
