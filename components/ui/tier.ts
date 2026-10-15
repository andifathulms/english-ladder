import type { Rung } from '@/lib/types';

type Tier = Rung['tier'];

/** Literal class names so Tailwind keeps them. Soft tints fill one area only: the rung page header. */
export const tierSoftBg: Record<Tier, string> = {
  easy: 'bg-easy-soft',
  medium: 'bg-medium-soft',
  hard: 'bg-hard-soft',
};

export const tierName = (tier: Tier) => tier.charAt(0).toUpperCase() + tier.slice(1);

/** "A1–A2−" for the rungs of one tier, in curriculum order. */
export function tierRange(rungs: Rung[], tier: Tier): string {
  const inTier = rungs.filter((r) => r.tier === tier);
  if (!inTier.length) return '';
  const first = inTier[0].cefr;
  const last = inTier[inTier.length - 1].cefr;
  return first === last ? first : `${first}–${last}`;
}
