// English words for the place scene: the sentence and the text alternative. Geometry is shared
// (@ladder/core/components/visuals/place/geometry).
import { PLACE_SPEC, type Place } from '@ladder/core/components/visuals/place/geometry';

export { BALL_R, PLACES, PLACE_SPEC, isPlace, type Place, type Slot } from '@ladder/core/components/visuals/place/geometry';

export function placeSentence(p: Place): { en: string; id: string } {
  const s = PLACE_SPEC[p];
  const objEn = s.ref === 'table' ? 'table' : 'box';
  const objId = s.ref === 'table' ? 'meja' : 'kotak';
  return { en: `The ball is [[${p}]] the ${objEn}.`, id: `Bolanya ${s.id} ${objId}.` };
}

export function placeAlt(p: Place, lang: 'id' | 'en'): string {
  const s = PLACE_SPEC[p];
  return lang === 'en'
    ? `The ball is ${p} the ${s.ref}.`
    : `Bola ada ${s.id} ${s.ref === 'table' ? 'meja' : 'kotak'}.`;
}
