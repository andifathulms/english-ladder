'use client';

import { useState } from 'react';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { conjugateParts } from '@/lib/de/conjugate';
import { verbOf, type DeVisualData } from './data';

const DAYS = [
  { de: 'Montag', id: 'Senin', short: 'Mo' },
  { de: 'Dienstag', id: 'Selasa', short: 'Di' },
  { de: 'Mittwoch', id: 'Rabu', short: 'Mi' },
  { de: 'Donnerstag', id: 'Kamis', short: 'Do' },
  { de: 'Freitag', id: 'Jumat', short: 'Fr' },
  { de: 'Samstag', id: 'Sabtu', short: 'Sa' },
  { de: 'Sonntag', id: 'Minggu', short: 'So' },
];
/** Activities: a verb (verbs.yaml) and what stands in the middle with it; the Indonesian gloss. */
const ACTIVITIES = [
  { verb: 'aufstehen', middle: '', id: 'bangun' },
  { verb: 'frühstücken', middle: '', id: 'sarapan' },
  { verb: 'arbeiten', middle: '', id: 'bekerja' },
  { verb: 'einkaufen', middle: '', id: 'belanja' },
  { verb: 'anrufen', middle: 'meine Mutter', id: 'menelepon ibuku' },
  { verb: 'lernen', middle: 'Deutsch', id: 'belajar bahasa Jerman' },
  { verb: 'fernsehen', middle: '', id: 'menonton TV' },
];
const HOURS = [6, 7, 8, 9, 12, 14, 17, 19, 20];

const COPY = {
  id: { day: 'Hari', hour: 'Jam', activity: 'Kegiatan', place: 'Taruh di jadwal', planned: 'Jadwal minggu ini', at: (h: number) => `jam ${h}` },
  en: { day: 'Day', hour: 'Time', activity: 'Activity', place: 'Put it in the planner', planned: 'This week', at: (h: number) => `at ${h}` },
};

export type PlannerState = { day: number; hour: number; activity: number; planned: { day: number; hour: number; activity: number }[] };
type Props = VisualProps<PlannerState>;

/**
 * DayPlanner (DESIGN §7.7): a week (Mon–Sun) and hours. Put an activity in a slot and the sentence builds
 * with am + day, um + hour and the separable-verb bracket: "Am Montag stehe ich um 6 Uhr auf." Forms from
 * lib/de; separable prefixes go to the end.
 */
export function DayPlanner({ state, interactive = true, onStateChange, lang }: Props) {
  const c = COPY[lang];
  const data = useVisualData<DeVisualData>();
  const [own, setOwn] = useState<PlannerState>({ day: 0, hour: 0, activity: 0, planned: [] });
  const s = state ?? own;
  const update = (patch: Partial<PlannerState>) => {
    const next = { ...s, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const dayRoving = useRoving(DAYS.map((_, i) => i), s.day, (d) => update({ day: d }));
  const actRoving = useRoving(ACTIVITIES.map((_, i) => i), s.activity, (a) => update({ activity: a }));

  const sentenceOf = (day: number, hour: number, activity: number) => {
    const a = ACTIVITIES[activity];
    const v = verbOf(data, a.verb);
    const p = v ? conjugateParts(v, 'praesens', 'ich') : null;
    const finite = p?.finite ?? a.verb;
    const words = [`Am ${DAYS[day].de}`, finite, 'ich', `um ${HOURS[hour]} Uhr`, a.middle, p?.rest ?? ''].filter(Boolean);
    return { de: `${words.join(' ')}.`, finite, rest: p?.rest ?? null, id: `Hari ${DAYS[day].id} aku ${a.id} jam ${HOURS[hour]}.` };
  };
  const now = sentenceOf(s.day, s.hour, s.activity);

  return (
    <div className="flex flex-col gap-4" data-visual="day-planner">
      <div role="radiogroup" aria-label={c.day} className="grid grid-cols-7 gap-1" onKeyDown={dayRoving.onKeyDown}>
        {DAYS.map((d, i) => (
          <button key={d.de} type="button" {...dayRoving.itemProps(i, i)} aria-label={d.de} lang="de" className={`flex min-h-[72px] flex-col items-center gap-1 rounded-sm border-2 py-1 ${i === s.day ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}>
            <span className="label">{d.short}</span>
            <span className="flex flex-col gap-[2px]" aria-hidden>
              {s.planned
                .filter((x) => x.day === i)
                .map((x, k) => (
                  <span key={k} className="h-[6px] w-[18px] rounded-full bg-board" />
                ))}
            </span>
          </button>
        ))}
      </div>
      <label className="flex items-center gap-3 text-small">
        <span className="font-bold">{c.hour}</span>
        <select value={s.hour} onChange={(e) => update({ hour: Number(e.target.value) })} disabled={!interactive} className="min-h-touch rounded-sm bg-surface px-2" lang="de">
          {HOURS.map((h, i) => (
            <option key={h} value={i}>
              {h} Uhr
            </option>
          ))}
        </select>
      </label>
      <div role="radiogroup" aria-label={c.activity} className="flex flex-wrap gap-2" onKeyDown={actRoving.onKeyDown}>
        {ACTIVITIES.map((a, i) => {
          const v = verbOf(data, a.verb);
          return (
            <button key={a.verb} type="button" {...actRoving.itemProps(i, i)} lang="de" className={`min-h-touch rounded-md border-2 px-3 ${i === s.activity ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}>
              {v?.sep ? (
                <>
                  {v.sep}
                  <span aria-hidden className="text-accent">
                    |
                  </span>
                  {a.verb.slice(v.sep.length)}
                </>
              ) : (
                a.verb
              )}
            </button>
          );
        })}
      </div>
      <p lang="de" className="font-display text-sentence font-medium" aria-live="polite" data-sentence>
        Am {DAYS[s.day].de} <strong className="text-accent">{now.finite}</strong> ich um {HOURS[s.hour]} Uhr{ACTIVITIES[s.activity].middle ? ` ${ACTIVITIES[s.activity].middle}` : ''}
        {now.rest && (
          <>
            {' '}
            <strong className="text-accent">{now.rest}</strong>
          </>
        )}
        .
      </p>
      <p lang="id" className="id-text">
        {now.id}
      </p>
      {interactive && (
        <button type="button" className="btn btn-ghost self-start" onClick={() => update({ planned: [...s.planned, { day: s.day, hour: s.hour, activity: s.activity }] })}>
          {c.place}
        </button>
      )}
      {s.planned.length > 0 && (
        <section aria-label={c.planned} className="flex flex-col gap-1">
          <h4 className="label text-muted">{c.planned}</h4>
          <ul className="flex flex-col gap-1">
            {[...s.planned]
              .sort((a, b) => a.day - b.day || HOURS[a.hour] - HOURS[b.hour])
              .map((x, k) => (
                <li key={k} lang="de" className="text-small">
                  {sentenceOf(x.day, x.hour, x.activity).de}
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
