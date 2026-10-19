'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { PLACE_SPEC, PLACES, isPlace, type Place } from '@ladder/core/components/visuals/place/geometry';
import { PlaceDrawing, usePlace } from '@ladder/core/components/visuals/place/PlaceDrawing';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import { JaSentence } from '@/components/ja/JaSentence';
import { JaInline } from '@/components/ja/JaInline';
import { toPlain } from '@/lib/ja/text';

/** Position nouns (DESIGN §8.7) with ruby, and the Indonesian word. */
export const POSITION: Record<Place, { ja: string; kana: string; id: string }> = {
  on: { ja: '{上|うえ}', kana: 'うえ', id: 'atas' },
  under: { ja: '{下|した}', kana: 'した', id: 'bawah' },
  in: { ja: '{中|なか}', kana: 'なか', id: 'dalam' },
  'next to': { ja: 'となり', kana: 'となり', id: 'sebelah' },
  behind: { ja: 'うしろ', kana: 'うしろ', id: 'belakang' },
  'in front of': { ja: '{前|まえ}', kana: 'まえ', id: 'depan' },
};

type Word = { ja: string; partner: number | null };

/** ボール は 箱 の 上 に あります 。: the sentence for a place, with the position noun in focus. */
export function placeSentenceJa(p: Place): { ja: string; kana: string; id: string; words: Word[]; idWords: string[] } {
  const table = PLACE_SPEC[p].ref === 'table';
  const obj = table ? { ja: 'テーブル', kana: 'テーブル', id: 'meja' } : { ja: '{箱|はこ}', kana: 'はこ', id: 'kotak' };
  const pos = POSITION[p];
  return {
    ja: `ボール は ${obj.ja} の [[${pos.ja}]] に あります 。`,
    kana: `ボール は ${obj.kana} の ${pos.kana} に あります 。`,
    id: `Bolanya ada di ${pos.id} ${obj.id}.`,
    // Japanese order, each linked to its Indonesian partner (は and の have none).
    words: [
      { ja: 'ボール', partner: 0 },
      { ja: 'は', partner: null },
      { ja: obj.ja, partner: 4 },
      { ja: 'の', partner: null },
      { ja: pos.ja, partner: 3 },
      { ja: 'に', partner: 2 },
      { ja: 'あります', partner: 1 },
    ],
    idWords: ['Bola', 'ada', 'di', pos.id, obj.id],
  };
}

/** Japanese words above their Indonesian partners, joined by lines: the position comes after the noun. */
function Compare({ words, idWords }: { words: Word[]; idWords: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const top = useRef<(HTMLSpanElement | null)[]>([]);
  const bottom = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<{ x1: number; x2: number; focus: boolean }[]>([]);
  useLayoutEffect(() => {
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    const mid = (el: HTMLElement | null | undefined) => {
      const r = el?.getBoundingClientRect();
      return r ? r.left + r.width / 2 - b.left : 0;
    };
    setLines(words.flatMap((w, i) => (w.partner === null ? [] : [{ x1: mid(top.current[i]), x2: mid(bottom.current[w.partner]), focus: i === 4 }])));
  }, [words]);
  return (
    <div ref={box} className="relative flex flex-col gap-8 rounded-md bg-surface px-4 py-3" data-compare>
      <div className="flex justify-around gap-1">
        {words.map((w, i) => (
          <span key={i} ref={(el) => {
            top.current[i] = el;
          }} className={`text-ja-body ${w.partner === null ? 'text-muted' : ''}`}>
            <JaInline text={w.ja} className={i === 4 ? 'ja-focus' : ''} />
          </span>
        ))}
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1="50%" x2={l.x2} y2="66%" style={{ stroke: l.focus ? 'var(--accent)' : 'var(--rule)', strokeWidth: l.focus ? 2 : 1.5 }} />
        ))}
      </svg>
      <div className="flex justify-around gap-2" lang="id">
        {idWords.map((w, j) => (
          <span key={j} ref={(el) => {
            bottom.current[j] = el;
          }} className={`id-text ${j === 3 ? 'focus-word not-italic' : ''}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = VisualProps<Place> & { initial?: Place };

/**
 * PlaceScene, Japanese (DESIGN §8.7): the shared table, box and ball (the ball in indigo) with the
 * position nouns 上 下 中 となり うしろ まえ. "Bandingkan" lines the sentence up with the Indonesian:
 * 箱の上 puts the position after the object, the reverse of *di atas kotak*.
 */
export function PlaceSceneJa({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const { t } = useT<JapaneseKey>();
  const { place, from, set } = usePlace(isPlace(initial) ? initial : 'on', state, onStateChange);
  const roving = useRoving(PLACES, place, set);
  const [compare, setCompare] = useState(false);
  const s = placeSentenceJa(place);
  const alt = `${toPlain(s.ja).replace(/\s/g, '')} ${s.id}`;
  const label = (ja: string, id: string) => (
    <>
      <tspan lang="ja" className="font-ja-ui">
        {ja}
      </tspan>{' '}
      · <tspan lang="id" fontStyle="italic">{id}</tspan>
    </>
  );

  return (
    <div className="flex flex-col gap-4" data-visual="place-scene-ja">
      <PlaceDrawing place={place} from={from} alt={alt} labels={{ table: label('テーブル', 'meja'), box: label('箱', 'kotak') }} />
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={lang === 'en' ? 'Where is the ball?' : 'Di mana bolanya?'} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {PLACES.map((p, i) => (
              <button
                key={p}
                type="button"
                {...roving.itemProps(p, i)}
                aria-label={`${toPlain(POSITION[p].ja)} ${POSITION[p].kana}, ${PLACE_SPEC[p].id}`}
                className={`flex min-h-touch items-center rounded-full border-2 px-4 py-1 transition-colors duration-quick ${
                  p === place ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'
                }`}
              >
                {/* Furigana takes the chip's own colour, so it reads on the selected (accent) chip too. */}
                <JaInline text={POSITION[p].ja} furigana className="text-ja-body [&_rt]:text-current" />
              </button>
            ))}
          </div>
          <JaSentence ja={s.ja} id={s.id} />
          <Toggle label={t('place.compare')} checked={compare} onChange={setCompare} onLabel={t('settings.on')} offLabel={t('settings.off')} />
          {compare && <Compare words={s.words} idWords={s.idWords} />}
        </>
      )}
    </div>
  );
}
