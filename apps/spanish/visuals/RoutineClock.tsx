'use client';

import { useRef, useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import { Chips } from './Chips';

const HOURS = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];

/** "la una", "las seis y media", "las ocho y cuarto" for a time of day. */
export function clockPhrase(min: number): { article: 'la' | 'las'; text: string } {
  const h = Math.floor(min / 60) % 12 || 12;
  const m = min % 60;
  const article = h === 1 ? 'la' : 'las';
  const rest = m === 30 ? ' y media' : m === 15 ? ' y cuarto' : m === 0 ? '' : ` y ${m}`;
  return { article, text: `${article} ${HOURS[h]}${rest}` };
}

type Icon = 'alarm' | 'shower' | 'breakfast' | 'bus' | 'desk' | 'lunch' | 'gym' | 'dinner' | 'bed';
type Activity = { min: number; icon: Icon; pre?: string; verb: string; after: string; id: string; en: string };

/** The routine (DESIGN §7.7), in the yo form. Reflexive verbs carry their pronoun. */
const ACTIVITIES: Activity[] = [
  { min: 390, icon: 'alarm', pre: 'Me', verb: 'levanto', after: '', id: 'Aku bangun jam setengah tujuh.', en: 'I get up at half past six.' },
  { min: 420, icon: 'shower', pre: 'Me', verb: 'ducho', after: '', id: 'Aku mandi jam tujuh.', en: 'I shower at seven.' },
  { min: 450, icon: 'breakfast', verb: 'Desayuno', after: '', id: 'Aku sarapan jam setengah delapan.', en: 'I have breakfast at half past seven.' },
  { min: 480, icon: 'bus', verb: 'Tomo', after: 'el autobús', id: 'Aku naik bus jam delapan.', en: 'I take the bus at eight.' },
  { min: 540, icon: 'desk', verb: 'Empiezo', after: 'a trabajar', id: 'Aku mulai bekerja jam sembilan.', en: 'I start work at nine.' },
  { min: 780, icon: 'lunch', verb: 'Almuerzo', after: '', id: 'Aku makan siang jam satu.', en: 'I have lunch at one.' },
  { min: 1080, icon: 'gym', verb: 'Voy', after: 'al gimnasio', id: 'Aku pergi ke gym jam enam sore.', en: 'I go to the gym at six.' },
  { min: 1200, icon: 'dinner', verb: 'Ceno', after: '', id: 'Aku makan malam jam delapan.', en: 'I have dinner at eight.' },
  { min: 1350, icon: 'bed', pre: 'Me', verb: 'acuesto', after: '', id: 'Aku tidur jam setengah sebelas.', en: 'I go to bed at half past ten.' },
];

const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
/** The sentence: pronoun + verb + rest + "a la(s) …" (or "Son las …" / "Es la una."). */
function sentence(a: Activity, clock: boolean): string {
  const c = clockPhrase(a.min);
  if (clock) return `${c.article === 'la' ? 'Es' : 'Son'} ${c.text}.`;
  return [a.pre, a.verb, a.after, `a ${c.text}`].filter(Boolean).join(' ') + '.';
}

/** Simple line icons in the illustration style (not emoji), on a 24-unit box. */
const ICONS: Record<Icon, string> = {
  alarm: 'M12 6a7 7 0 1 1 0 14a7 7 0 1 1 0-14M12 9v4l2.5 2M5 6l3-3M19 6l-3-3',
  shower: 'M5 9a7 7 0 0 1 14 0ZM8 13v2M12 13v3M16 13v2M10 18v1M14 18v1',
  breakfast: 'M5 10h11v4a5 5 0 0 1-10 0ZM16 11h2a2 2 0 0 1 0 4h-2M8 5v2M11 4v3M14 5v2',
  bus: 'M6 5h12v11H6ZM6 11h12M8 16v3M16 16v3M8.5 14h.01M15.5 14h.01',
  desk: 'M5 7h14v8H5ZM3 18h18M10 15v3M14 15v3',
  lunch: 'M12 5a7 7 0 1 1 0 14a7 7 0 1 1 0-14M12 9a3 3 0 1 1 0 6a3 3 0 1 1 0-6',
  gym: 'M4 10v4M7 8v8M17 8v8M20 10v4M7 12h10',
  dinner: 'M5 13h14a7 7 0 0 1-14 0ZM12 9v4M15 6a3 3 0 1 0 3 3',
  bed: 'M4 9v9M4 13h16v5M20 13a3 3 0 0 0-3-3h-7v3M7 11a1.5 1.5 0 1 1 0 .1',
};

const TEXT = {
  id: { choose: 'Pilih kegiatan', clock: '¿Qué hora es?', on: 'Ya', off: 'Tidak', dial: 'Jam 24 jam dengan rutinitas harian', hint: 'Seret jarumnya, atau pilih jam di bawah.' },
  en: { choose: 'Pick an activity', clock: '¿Qué hora es?', on: 'On', off: 'Off', dial: 'A 24-hour clock with a daily routine', hint: 'Drag the hand, or pick a time below.' },
};

const R = 100;
const C = 120;
const at = (min: number, r: number) => {
  const a = (min / 1440) * 2 * Math.PI - Math.PI / 2;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

/**
 * RoutineClock (DESIGN §7.7): a 24-hour dial with the routine's line icons on the rim. Dragging the
 * hand (sweep) snaps to an activity, and the sentence updates, its reflexive pronoun and ending in the
 * accent (*Me levanto a las seis y media.*). "¿Qué hora es?" switches to *Son las …* / *Es la una*.
 */
export function RoutineClock({ state, interactive = true, onStateChange, lang, initial }: VisualProps<number> & { initial?: number }) {
  const t = TEXT[lang];
  const reduced = useReducedMotion();
  const play = usePlay();
  const [own, setOwn] = useState<number>(initial ?? 0);
  const [clock, setClock] = useState(false);
  const [playing, setPlaying] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const i = Math.max(0, Math.min(ACTIVITIES.length - 1, state ?? own));
  const a = ACTIVITIES[i];
  const set = (n: number) => {
    setOwn(n);
    onStateChange?.(n);
  };
  const s = sentence(a, clock);

  /** Pointer → minutes of the day → the nearest activity. */
  const snap = (e: React.PointerEvent) => {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((e.clientX - box.left) / box.width) * 240 - C;
    const y = ((e.clientY - box.top) / box.height) * 240 - C;
    const min = ((((Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI)) * 1440) % 1440 + 1440) % 1440;
    const dist = (m: number) => Math.min(Math.abs(m - min), 1440 - Math.abs(m - min));
    const best = ACTIVITIES.reduce((b, x, k) => (dist(x.min) < dist(ACTIVITIES[b].min) ? k : b), 0);
    if (best !== i) set(best);
  };

  const ending = a.verb.endsWith('oy') ? 'oy' : 'o';
  const run = async () => {
    setPlaying(true);
    await play(s);
    setPlaying(false);
  };

  return (
    <div className="flex flex-col gap-4" data-visual="routine-clock">
      <svg
        ref={svg}
        viewBox="0 0 240 240"
        className="mx-auto h-auto w-full max-w-[320px] touch-none"
        role="img"
        aria-label={`${t.dial}. ${hhmm(a.min)}: ${s}`}
        onPointerDown={(e) => {
          if (!interactive) return;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          snap(e);
        }}
        onPointerMove={(e) => interactive && e.buttons === 1 && snap(e)}
      >
        <circle cx={C} cy={C} r={R + 12} style={{ fill: 'var(--surface)', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
        {Array.from({ length: 24 }, (_, h) => {
          const p1 = at(h * 60, R + 10);
          const p2 = at(h * 60, h % 6 === 0 ? R + 2 : R + 6);
          return <line key={h} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} style={{ stroke: 'var(--rule)', strokeWidth: h % 6 === 0 ? 2 : 1 }} />;
        })}
        {[0, 6, 12, 18].map((h) => {
          const p = at(h * 60, R - 8);
          return (
            <text key={h} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 10 }}>
              {h}
            </text>
          );
        })}
        {ACTIVITIES.map((x, k) => {
          // The morning is crowded on a 24-hour dial: icons step inward so they never overlap.
          const p = at(x.min, R - 30 - (k < 5 ? k % 3 : 0) * 22);
          return (
            <g key={x.icon} transform={`translate(${p.x - 9} ${p.y - 9}) scale(0.75)`}>
              <path d={ICONS[x.icon]} style={{ fill: 'none', stroke: k === i ? 'var(--accent)' : 'var(--muted)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
            </g>
          );
        })}
        <g
          style={{
            transform: `rotate(${(a.min / 1440) * 360}deg)`,
            transformOrigin: `${C}px ${C}px`,
            transition: reduced ? 'none' : 'transform var(--m-sweep-d) linear',
          }}
        >
          <line x1={C} y1={C} x2={C} y2={C - (R - 14)} style={{ stroke: 'var(--accent)', strokeWidth: 3, strokeLinecap: 'round' }} />
          <circle cx={C} cy={C - (R - 14)} r={5} style={{ fill: 'var(--accent)' }} />
        </g>
        <circle cx={C} cy={C} r={5} style={{ fill: 'var(--ink)' }} />
      </svg>
      <div className="flex items-start gap-2">
        <p lang="es-419" className="min-w-0 flex-1 font-display text-sentence font-medium">
          {clock ? (
            s
          ) : (
            <>
              {a.pre && <span className="es-ending">{a.pre} </span>}
              {a.verb.slice(0, -ending.length)}
              <span className="es-ending">{ending}</span>
              {s.slice((a.pre ? a.pre.length + 1 : 0) + a.verb.length)}
            </>
          )}
        </p>
        <PlayButton text={s} onPlay={run} playing={playing} small />
      </div>
      {!clock && <p className="id-text">{lang === 'en' ? a.en : a.id}</p>}
      <p className="sr-only" aria-live="polite">
        {`${hhmm(a.min)}: ${s}`}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3">
          <p className="text-small text-muted">{t.hint}</p>
          <Chips label={t.choose} options={ACTIVITIES.map((_, k) => String(k))} value={String(i)} onChange={(v) => set(Number(v))} render={(v) => <span className="tnum font-mono">{hhmm(ACTIVITIES[Number(v)].min)}</span>} />
          <Toggle label={t.clock} checked={clock} onChange={setClock} onLabel={t.on} offLabel={t.off} />
        </div>
      )}
    </div>
  );
}
