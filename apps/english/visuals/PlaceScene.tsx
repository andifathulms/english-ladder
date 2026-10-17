'use client';

import { PLACES, isPlace, placeAlt, placeSentence, type Place } from './placeLogic';
import { PlaceDrawing, usePlace } from '@ladder/core/components/visuals/place/PlaceDrawing';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import type { VisualProps } from '@ladder/core/components/visuals/types';

type Props = VisualProps<Place> & { initial?: Place };

/** Table, box and ball (the shared PlaceDrawing) with English · Indonesian labels, controls and sentence. */
export function PlaceScene({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const { place, from, set } = usePlace(isPlace(initial) ? initial : 'on', isPlace(state) ? state : undefined, onStateChange);
  const roving = useRoving(PLACES, place, set);
  const sentence = placeSentence(place);

  return (
    <div className="flex flex-col gap-4" data-visual="place-scene">
      <PlaceDrawing
        place={place}
        from={from}
        alt={placeAlt(place, lang)}
        labels={{
          table: (
            <>
              <tspan lang="en">table</tspan> · <tspan lang="id" fontStyle="italic">meja</tspan>
            </>
          ),
          box: (
            <>
              <tspan lang="en">box</tspan> · <tspan lang="id" fontStyle="italic">kotak</tspan>
            </>
          ),
        }}
      />

      <p className="sr-only" aria-live="polite">
        {placeAlt(place, lang)}
      </p>

      {interactive && (
        <>
          <div role="radiogroup" aria-label={lang === 'en' ? 'Where is the ball?' : 'Di mana bolanya?'} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {PLACES.map((p, i) => (
              <button
                key={p}
                type="button"
                lang="en"
                {...roving.itemProps(p, i)}
                className="min-h-touch rounded-full border-2 px-4 font-body font-semibold transition-colors duration-quick"
                style={
                  p === place
                    ? { background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }
                    : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--rule)' }
                }
              >
                {p}
              </button>
            ))}
          </div>
          <Sentence en={sentence.en} id={sentence.id} />
        </>
      )}
    </div>
  );
}
