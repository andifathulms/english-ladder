'use client';

import { PLACE_SPEC, PLACES, isPlace, type Place } from '@ladder/core/components/visuals/place/geometry';
import { PlaceDrawing, usePlace } from '@ladder/core/components/visuals/place/PlaceDrawing';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';

/** The six places in Spanish (DESIGN §7.6), each with the Indonesian. */
export const POSITION: Record<Place, { es: string; id: string }> = {
  in: { es: 'en', id: 'di dalam' },
  on: { es: 'sobre', id: 'di atas' },
  under: { es: 'debajo de', id: 'di bawah' },
  'next to': { es: 'al lado de', id: 'di sebelah' },
  behind: { es: 'detrás de', id: 'di belakang' },
  'in front of': { es: 'delante de', id: 'di depan' },
};

/** La pelota está debajo de la mesa: the sentence for a place, the position in focus. */
export function placeSentenceEs(p: Place): { es: string; id: string } {
  const table = PLACE_SPEC[p].ref === 'table';
  const obj = table ? { es: 'la mesa', id: 'meja' } : { es: 'la caja', id: 'kotak' };
  return { es: `La pelota está [[${POSITION[p].es}]] ${obj.es}.`, id: `Bolanya ada ${POSITION[p].id} ${obj.id}.` };
}

const TEXT = {
  id: {
    where: 'Di mana bolanya?',
    order: 'Urutannya sama dengan bahasa Indonesia: tempat dulu, lalu bendanya.',
    en: '*En* bisa berarti di dalam atau di atas; *sobre* jelas di atas.',
  },
  en: {
    where: 'Where is the ball?',
    order: 'The order matches Indonesian: the place first, then the object.',
    en: '*En* can mean in or on; *sobre* is clearly on top.',
  },
};

type Props = VisualProps<Place> & { initial?: Place };

/**
 * PlaceScene, Spanish (DESIGN §7.6): the shared table, box and olive ball with en, sobre, debajo de,
 * al lado de, detrás de and delante de. The sentence uses *estar* for location, which ties back to
 * SerEstar; a note says the order matches Indonesian.
 */
export function PlaceSceneEs({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const t = TEXT[lang];
  const { place, from, set } = usePlace(isPlace(initial) ? initial : 'on', state, onStateChange);
  const roving = useRoving(PLACES, place, set);
  const s = placeSentenceEs(place);
  const alt = `${s.es.replace(/\[\[|\]\]/g, '')} ${s.id}`;
  const label = (es: string, id: string) => (
    <>
      <tspan lang="es-419">{es}</tspan> · <tspan lang="id" fontStyle="italic">{id}</tspan>
    </>
  );

  return (
    <div className="flex flex-col gap-4" data-visual="place-scene-es">
      <PlaceDrawing place={place} from={from} alt={alt} labels={{ table: label('mesa', 'meja'), box: label('caja', 'kotak') }} />
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={t.where} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {PLACES.map((p, i) => (
              <button
                key={p}
                type="button"
                {...roving.itemProps(p, i)}
                lang="es-419"
                aria-label={`${POSITION[p].es}, ${POSITION[p].id}`}
                className={`flex min-h-touch items-center rounded-full border-2 px-4 py-1 transition-colors duration-quick ${
                  p === place ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'
                }`}
              >
                {POSITION[p].es}
              </button>
            ))}
          </div>
          <Sentence en={s.es} id={s.id} />
          <p className="text-small text-muted">{t.order}</p>
          {(place === 'in' || place === 'on') && <p className="text-small text-muted">{t.en.replace(/\*/g, '')}</p>}
        </>
      )}
    </div>
  );
}
