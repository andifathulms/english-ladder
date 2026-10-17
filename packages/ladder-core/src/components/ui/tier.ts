import type { Rung } from '@ladder/core/lib/types';

type Tier = Rung['tier'];

export const tierName = (tier: Tier) => tier.charAt(0).toUpperCase() + tier.slice(1);

/** CEFR labels as shown: with `localise`, Indonesian says "Pra-A1" for Pre-A1 (fixes.cefrLabelLocalised). */
export const cefrLabel = (cefr: string, lang: 'id' | 'en' = 'id', localise = false) =>
  localise && lang === 'id' ? cefr.replace(/^Pre-/, 'Pra-') : cefr;

/** "A1–A2−" for the rungs of one tier, in curriculum order. */
export function tierRange(rungs: Rung[], tier: Tier, label: (cefr: string) => string = (c) => c): string {
  const inTier = rungs.filter((r) => r.tier === tier);
  if (!inTier.length) return '';
  const first = label(inTier[0].cefr);
  const last = label(inTier[inTier.length - 1].cefr);
  return first === last ? first : `${first}–${last}`;
}
