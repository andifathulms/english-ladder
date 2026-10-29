'use client';

import { useState } from 'react';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { CLUES, genderClue } from '@/lib/de/nouns';
import type { Gender } from '@/lib/de/articles';
import { GenderChip } from '@/components/GenderChip';
import { nounOf, type DeVisualData } from './data';

const GENDERS: Gender[] = ['m', 'f', 'n'];
const ARTICLE = { m: 'der', f: 'die', n: 'das' } as const;
/** The clue labels on each tray's edge (DESIGN §7.2). */
const TRAY_CLUES: Record<Gender, string[]> = {
  m: ['-er (orang)', '-ling'],
  f: ['-ung', '-heit', '-keit', '-schaft'],
  n: ['-chen', '-lein', '-ment'],
};
const DEFAULT_NOUNS = ['Zeitung', 'Mädchen', 'Lehrer', 'Freiheit', 'Wohnung', 'Brötchen', 'Tisch', 'Hand', 'Dokument', 'Kuchen'];

const COPY = {
  id: {
    trays: 'Nampan der, die, das',
    tiles: 'Kata benda',
    pick: (w: string) => `${w} dipilih. Sekarang pilih nampannya.`,
    right: (w: string, a: string, clue: string | null) => `Benar: ${a} ${w}.${clue ? ` Petunjuk: akhiran ${clue}.` : ''}`,
    wrong: (w: string, a: string) => `Belum: ${w} itu ${a}.`,
    memorise: 'hafalkan saja',
    start: 'Pilih kata benda, lalu nampan der, die atau das.',
    done: 'Semua kata sudah di nampannya.',
  },
  en: {
    trays: 'The der, die, das trays',
    tiles: 'Nouns',
    pick: (w: string) => `${w} picked. Now pick its tray.`,
    right: (w: string, a: string, clue: string | null) => `Right: ${a} ${w}.${clue ? ` Clue: the ending ${clue}.` : ''}`,
    wrong: (w: string, a: string) => `Not yet: ${w} is ${a}.`,
    memorise: 'just memorise it',
    start: 'Pick a noun, then the der, die or das tray.',
    done: 'Every word is in its tray.',
  },
};

type State = Record<string, Gender>;
type Props = VisualProps<State> & { nouns?: string[] };

/**
 * GenderTiles (DESIGN §7.2): nouns sorted into der / die / das trays headed by their chips. Ending
 * clues sit on the tray edges and light up when a matching noun lands; exceptions say "hafalkan saja".
 * Pick a tile, then a tray (keyboard and screen reader: both are buttons). Genders come from nouns.yaml.
 */
export function GenderTiles({ state, interactive = true, onStateChange, nouns = DEFAULT_NOUNS, lang }: Props) {
  const c = COPY[lang];
  const data = useVisualData<DeVisualData>();
  const words = nouns.map((w) => nounOf(data, w)).filter((n): n is NonNullable<typeof n> => !!n);
  const [own, setOwn] = useState<State>({});
  const placed = state ?? own;
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState(c.start);
  const [lit, setLit] = useState<string | null>(null);

  const drop = (g: Gender) => {
    if (!picked) return;
    const n = words.find((w) => w.de === picked)!;
    if (n.gender !== g) {
      setMsg(c.wrong(n.de, ARTICLE[n.gender]));
      return;
    }
    const clue = genderClue(n.de, { person: n.person });
    const fits = clue && clue.gender === n.gender ? `-${clue.suffix}` : null;
    const next = { ...placed, [n.de]: g };
    setOwn(next);
    onStateChange?.(next);
    setPicked(null);
    setLit(fits);
    const all = words.every((w) => next[w.de]);
    setMsg(`${c.right(n.de, ARTICLE[n.gender], fits)}${n.exception ? ` (${c.memorise})` : ''}${all ? ` ${c.done}` : ''}`);
  };

  const loose = words.filter((w) => !placed[w.de]);
  return (
    <div className="flex flex-col gap-4" data-visual="gender-tiles">
      <div className="grid grid-cols-3 gap-2" role="group" aria-label={c.trays}>
        {GENDERS.map((g) => (
          <button
            key={g}
            type="button"
            disabled={!interactive || !picked}
            onClick={() => drop(g)}
            data-tray={g}
            className="flex min-h-[148px] flex-col items-start gap-2 rounded-lg bg-paper-2 p-2 text-start disabled:cursor-default"
            style={{ boxShadow: picked ? 'inset 0 0 0 2px var(--accent)' : 'inset 0 0 0 1px var(--rule)' }}
          >
            <GenderChip gender={g} />
            <span className="flex flex-wrap gap-1" aria-hidden>
              {TRAY_CLUES[g].map((cl) => (
                <span
                  key={cl}
                  className="font-mono text-[0.75rem]"
                  data-clue={cl}
                  style={{ color: lit && cl.startsWith(lit) ? `var(--${{ m: 'masc', f: 'fem', n: 'neut' }[g]})` : 'var(--muted)', fontWeight: lit && cl.startsWith(lit) ? 700 : 400 }}
                >
                  {cl}
                </span>
              ))}
            </span>
            <span className="flex flex-col gap-1">
              {words
                .filter((w) => placed[w.de] === g)
                .map((w) => (
                  <span key={w.de} lang="de" className="text-small font-medium">
                    {w.de}
                    {w.exception && <span className="ms-1 text-muted">·</span>}
                  </span>
                ))}
            </span>
          </button>
        ))}
      </div>
      {interactive && loose.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={c.tiles}>
          {loose.map((w) => (
            <button
              key={w.de}
              type="button"
              lang="de"
              aria-pressed={picked === w.de}
              onClick={() => {
                setPicked(w.de);
                setMsg(c.pick(w.de));
              }}
              data-noun={w.de}
              className="min-h-pill rounded-md bg-surface px-4 font-display text-[1.25rem] shadow-e1"
              style={{ boxShadow: picked === w.de ? 'inset 0 0 0 2px var(--accent)' : undefined }}
            >
              {w.de}
            </button>
          ))}
        </div>
      )}
      <p className="text-small" aria-live="polite">
        {msg}
      </p>
    </div>
  );
}

/** Every clue the trays show, as lib/de knows it (tested against CLUES). */
export const TRAY_CLUE_SUFFIXES = Object.values(TRAY_CLUES)
  .flat()
  .map((c) => c.replace(/^-| \(orang\)$/g, ''));
export const KNOWN_SUFFIXES = CLUES.map((c) => c.suffix);
