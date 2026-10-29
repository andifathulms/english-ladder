'use client';

import { useState } from 'react';
import { MouthDrawing } from '@ladder/core/components/visuals/mouth/MouthDrawing';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';

export const MOUTH_SOUNDS = ['i', 'ü', 'e', 'ö', 'ich', 'ach'] as const;
export type MouthSound = (typeof MOUTH_SOUNDS)[number];

// Tongue shapes in the shared 400×260 side section (facing left).
const FRONT_HIGH = 'M102,178 C112,150 140,116 178,110 C214,108 246,126 262,146 C280,164 290,180 292,200 L108,200 Z';
const FRONT_MID = 'M102,180 C114,160 140,134 178,128 C214,126 246,140 262,154 C280,168 290,182 292,200 L108,200 Z';
const BACK_HIGH = 'M108,178 C140,160 190,150 228,136 C246,126 262,120 274,124 C288,140 292,170 292,200 L110,200 Z';

const SOUND: Record<MouthSound, { tongue: string; key: string; place: [number, number]; rounded: boolean }> = {
  i: { tongue: FRONT_HIGH, key: 'front-high', place: [178, 112], rounded: false },
  ü: { tongue: FRONT_HIGH, key: 'front-high', place: [178, 112], rounded: true },
  e: { tongue: FRONT_MID, key: 'front-mid', place: [178, 130], rounded: false },
  ö: { tongue: FRONT_MID, key: 'front-mid', place: [178, 130], rounded: true },
  // ich-Laut: friction at the hard palate; ach-Laut: at the soft palate, like Indonesian kh.
  ich: { tongue: FRONT_HIGH, key: 'front-high', place: [176, 104], rounded: false },
  ach: { tongue: BACK_HIGH, key: 'back-high', place: [262, 116], rounded: false },
};
const ROUNDED_OF: Partial<Record<MouthSound, MouthSound>> = { i: 'ü', e: 'ö', ü: 'i', ö: 'e' };

const COPY = {
  id: {
    pick: 'Pilih bunyi',
    round: 'Bibir bulat',
    alt: {
      i: 'i: lidah depan naik tinggi, bibir lebar seperti tersenyum.',
      ü: 'ü: lidahnya seperti i, tapi bibir bulat seperti u. Coba: ucapkan i, lalu bulatkan bibir.',
      e: 'e: lidah depan setengah naik, bibir lebar.',
      ö: 'ö: lidahnya seperti e, tapi bibir bulat seperti o.',
      ich: 'ich: udara bergesek di langit-langit keras, di depan. Seperti desis panjang, bukan kh.',
      ach: 'ach: udara bergesek di langit-langit lunak, di belakang. Seperti kh dalam khusus, atau خ dalam bahasa Arab.',
    },
    word: { i: 'Kiel', ü: 'kühl', e: 'Sehne', ö: 'Söhne', ich: 'ich', ach: 'acht' },
  },
  en: {
    pick: 'Pick a sound',
    round: 'Rounded lips',
    alt: {
      i: 'i: the front of the tongue high, lips spread as in a smile.',
      ü: 'ü: the tongue as for i, but the lips rounded as for u. Try: say i, then round your lips.',
      e: 'e: the front of the tongue half raised, lips spread.',
      ö: 'ö: the tongue as for e, but the lips rounded as for o.',
      ich: 'ich: the air rubs at the hard palate, at the front. A long hiss, not kh.',
      ach: 'ach: the air rubs at the soft palate, at the back. Like kh in Indonesian khusus, or Arabic خ.',
    },
    word: { i: 'Kiel', ü: 'kühl', e: 'Sehne', ö: 'Söhne', ich: 'ich', ach: 'acht' },
  },
};

type Props = VisualProps<MouthSound> & { initial?: MouthSound };

/**
 * MouthPlaces, German (DESIGN §7.1): the shared mouth section. ü = i-tongue + rounded lips, ö =
 * e-tongue + rounded lips (the rounding toggle shows the difference); ich at the hard palate, ach at the
 * soft palate.
 */
export function MouthPlacesDe({ state, interactive = true, onStateChange, initial, lang }: Props) {
  const c = COPY[lang];
  const [own, setOwn] = useState<MouthSound>(initial ?? 'ü');
  const s = state ?? own;
  const set = (x: MouthSound) => {
    setOwn(x);
    onStateChange?.(x);
  };
  const roving = useRoving(MOUTH_SOUNDS, s, set);
  const spec = SOUND[s];
  const pair = ROUNDED_OF[s];
  const alt = c.alt[s];
  return (
    <div className="flex flex-col gap-4" data-visual="mouth-places-de">
      <MouthDrawing tongue={spec.tongue} tongueKey={spec.key} place={spec.place} alt={alt} lips={spec.rounded ? 'rounded' : 'spread'} label={c.word[s]} />
      <p className="text-small" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={c.pick} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {MOUTH_SOUNDS.map((x, i) => (
              <button
                key={x}
                type="button"
                {...roving.itemProps(x, i)}
                lang="de"
                className={`min-h-touch min-w-[56px] rounded-md border-2 px-3 font-display text-[1.25rem] ${x === s ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}
              >
                {x}
              </button>
            ))}
          </div>
          {pair && (
            <div className="rounded-md bg-surface p-3">
              <Toggle label={c.round} checked={SOUND[s].rounded} onChange={() => set(pair)} onLabel={SOUND[s].rounded ? s : pair} offLabel={SOUND[s].rounded ? pair : s} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
