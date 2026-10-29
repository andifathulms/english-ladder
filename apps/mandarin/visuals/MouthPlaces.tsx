'use client';

import { useState } from 'react';
import { INITIAL_GROUPS } from '@/lib/zh/syllables';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { MouthDrawing } from '@ladder/core/components/visuals/mouth/MouthDrawing';
import type { MandarinKey } from '@/i18n/overrides';

type Group = 'lips' | 'tip' | 'teeth' | 'curled' | 'flat' | 'back';
const GROUPS = INITIAL_GROUPS.map((g) => g.id) as Group[];

/** Where each group is made, and the tongue's shape for it (side section facing left, 400×260). */
const SHAPE: Record<Group, { place: [number, number]; tongue: string }> = {
  // Tongue at rest; the lips close (b p m) or the lower lip meets the upper teeth (f).
  lips: { place: [70, 146], tongue: 'M108,176 C130,150 200,140 250,150 C275,156 290,175 292,200 L110,200 Z' },
  // Tip on the ridge behind the upper teeth.
  tip: { place: [116, 122], tongue: 'M104,178 C104,150 112,128 122,126 C150,128 210,140 250,150 C276,158 290,176 292,200 L110,200 Z' },
  // Tip flat behind the teeth, a narrow gap for the hiss.
  teeth: { place: [104, 140], tongue: 'M100,176 C100,156 106,146 114,144 C150,140 210,142 250,150 C276,158 290,176 292,200 L110,200 Z' },
  // Tip curled up and back behind the ridge.
  curled: { place: [138, 110], tongue: 'M110,180 C118,150 128,122 136,114 C142,108 150,112 146,124 C170,132 220,140 252,150 C276,158 290,176 292,200 L112,200 Z' },
  // Tip down behind the lower teeth, the middle of the tongue raised flat to the hard palate.
  flat: { place: [176, 104], tongue: 'M102,178 C112,150 140,116 178,110 C214,108 246,126 262,146 C280,164 290,180 292,200 L108,200 Z' },
  // The back of the tongue raised to the soft palate.
  back: { place: [262, 116], tongue: 'M108,178 C140,160 190,150 228,136 C246,126 262,120 274,124 C288,140 292,170 292,200 L110,200 Z' },
};

const ASPIRATED: Partial<Record<Group, [string, string]>> = { lips: ['b', 'p'], tip: ['d', 't'], back: ['g', 'k'], teeth: ['z', 'c'], curled: ['zh', 'ch'], flat: ['j', 'q'] };

type Props = VisualProps<Group> & { initial?: Group; aspiration?: boolean };

/**
 * MouthPlaces (DESIGN §8.3): where z/zh/j are made and how the tongue curls for the retroflex set,
 * plus a puff of air for the aspirated initials, with the Indonesian note.
 */
export function MouthPlaces({ state, interactive = true, onStateChange, initial, aspiration: aspInit = false }: Props) {
  const { t } = useT<MandarinKey>();
  const [own, setOwn] = useState<Group>(initial ?? 'tip');
  const g = state ?? own;
  const [puff, setPuff] = useState(aspInit);
  const set = (x: Group) => {
    setOwn(x);
    onStateChange?.(x);
  };
  const roving = useRoving(GROUPS, g, set);
  const s = SHAPE[g];
  const pair = ASPIRATED[g];
  const initials = INITIAL_GROUPS.find((x) => x.id === g)!.initials;
  const alt = `${t(`place.${g}`)} (${initials.join(' ')}): ${t(`place.${g}.how`)}`;

  return (
    <div className="flex flex-col gap-4" data-visual="mouth-places">
      <MouthDrawing tongue={s.tongue} tongueKey={g} place={s.place} alt={alt} puff={puff && !!pair} label={initials.join(' ')} />
      <p className="text-small" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={t('place.pick')} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {GROUPS.map((x, i) => (
              <button
                key={x}
                type="button"
                {...roving.itemProps(x, i)}
                className={`flex min-h-touch flex-col items-start rounded-md border-2 px-3 py-1 text-start ${x === g ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}
              >
                <span className="text-small font-bold">{t(`place.${x}`)}</span>
                <span lang="zh-Latn-pinyin" className="font-mono text-small text-muted">
                  {INITIAL_GROUPS.find((y) => y.id === x)!.initials.join(' ')}
                </span>
              </button>
            ))}
          </div>
          {pair && (
            <div className="flex flex-col gap-2 rounded-md bg-surface p-3">
              <Toggle
                label={t('place.puff', { a: pair[1], b: pair[0] })}
                checked={puff}
                onChange={setPuff}
                onLabel={pair[1]}
                offLabel={pair[0]}
              />
              <p className="text-small text-muted">{t('place.puffNote')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
