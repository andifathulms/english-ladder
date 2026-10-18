// Counter readings (CLAUDE.md §6.4): from content/data/counters.yaml only, never computed.
export type Counter = {
  counter: string;
  reading: string;
  /** Readings for 1–10. */
  readings: string[];
  /** Also-correct readings by number (e.g. 10 → じっぽん). */
  alt?: Record<string, string[]>;
  id_classifier?: string;
  objects: { id: string; en: string };
};

/** The reading of n (1–10) with a counter, from the authored data. */
export function counterReading(counters: Counter[], counter: string, n: number): string {
  const c = counters.find((x) => x.counter === counter);
  if (!c) throw new Error(`no counter ${counter}`);
  if (n < 1 || n > c.readings.length) throw new Error(`${counter}: no reading for ${n}`);
  return c.readings[n - 1];
}

/** Every accepted reading of n with a counter (the main one first). */
export const counterReadings = (counters: Counter[], counter: string, n: number) => {
  const c = counters.find((x) => x.counter === counter)!;
  return [counterReading(counters, counter, n), ...(c.alt?.[String(n)] ?? [])];
};

/** The sound change in a reading against the plain number + counter (for highlighting): the part that differs. */
export function soundChange(reading: string, plain: string): { start: number; end: number } | null {
  if (reading === plain) return null;
  let s = 0;
  while (s < reading.length && reading[s] === plain[s]) s++;
  let e = 0;
  while (e < reading.length - s && reading[reading.length - 1 - e] === plain[plain.length - 1 - e]) e++;
  return { start: s, end: reading.length - e };
}
