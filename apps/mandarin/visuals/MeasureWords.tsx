'use client';

import { useState } from 'react';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import { useVisualData } from '@/visuals/data';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { ZhSentence } from '@/components/zh/ZhSentence';
import { ShelfDrawing, type ShelfObject as CoreShelfObject } from '@ladder/core/components/visuals/shelf/ShelfDrawing';

export const OBJECTS = ['book', 'cat', 'cup', 'shirt', 'paper', 'person'] as const satisfies readonly CoreShelfObject[];
export type ShelfObject = (typeof OBJECTS)[number];

/** Each object's phrase and the nearest Indonesian classifier (marked with [[ ]] in both). */
export const PHRASE: Record<ShelfObject, { mw: string; zh: string; py: string; id: string; idWord: string }> = {
  book: { mw: '本', zh: '一 [[本]] 书', py: 'yì [[běn]] shū', id: 'se[[buah]] buku', idWord: 'buku' },
  cat: { mw: '只', zh: '一 [[只]] 猫', py: 'yì [[zhī]] māo', id: 'se[[ekor]] kucing', idWord: 'kucing' },
  cup: { mw: '杯', zh: '一 [[杯]] 茶', py: 'yì [[bēi]] chá', id: 'se[[cangkir]] teh', idWord: 'teh' },
  shirt: { mw: '件', zh: '一 [[件]] 衣服', py: 'yí [[jiàn]] yīfu', id: 'se[[helai]] baju', idWord: 'baju' },
  paper: { mw: '张', zh: '一 [[张]] 纸', py: 'yì [[zhāng]] zhǐ', id: 'se[[lembar]] kertas', idWord: 'kertas' },
  person: { mw: '个', zh: '一 [[个]] 人', py: 'yí [[gè]] rén', id: 'se[[orang]]', idWord: 'orang' },
};

type Props = VisualProps<ShelfObject> & { initial?: ShelfObject };

/**
 * MeasureWords (DESIGN §8.8): objects on a wooden shelf. Picking one lifts it and shows its measure
 * word phrase (一本书) with ruby, with the Indonesian classifier beneath (sebuah buku, seekor kucing);
 * where Indonesian has none, or a different one, the note says so.
 */
export function MeasureWords({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const { measureWords } = useVisualData();
  const [own, setOwn] = useState<ShelfObject>(initial ?? 'book');
  const cur = state ?? own;
  const set = (o: ShelfObject) => {
    setOwn(o);
    onStateChange?.(o);
  };
  const roving = useRoving(OBJECTS, cur, set);
  const ph = PHRASE[cur];
  const note = measureWords.find((m) => m.mw === ph.mw)?.note;
  const idParts = ph.id.split(/\[\[|\]\]/);

  return (
    <div className="flex flex-col gap-4" data-visual="measure-words">
      <ShelfDrawing objects={OBJECTS} lifted={cur} label={`${ph.zh.replace(/\[\[|\]\]|\s/g, '')}: ${ph.id.replace(/\[\[|\]\]/g, '')}`} />
      <div className="flex flex-col gap-1">
        <ZhSentence zh={ph.zh} py={ph.py} size="sentence" wordSheet={false} />
        <p lang="id" className="id-text text-body">
          {idParts.map((p, i) => (i % 2 ? <strong key={i} className="font-bold not-italic text-accent">{p}</strong> : <span key={i}>{p}</span>))}
        </p>
        {note && <p className="text-small text-muted">{note[lang]}</p>}
      </div>
      {interactive && (
        <div role="radiogroup" aria-label={lang === 'en' ? 'Choose a thing' : 'Pilih benda'} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
          {OBJECTS.map((o, i) => (
            <button
              key={o}
              type="button"
              {...roving.itemProps(o, i)}
              aria-label={`${PHRASE[o].zh.replace(/\[\[|\]\]|\s/g, '')}, ${PHRASE[o].idWord}`}
              className={`min-h-touch rounded-full border-2 px-4 ${o === cur ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'}`}
            >
              <span lang="id">{PHRASE[o].idWord}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
