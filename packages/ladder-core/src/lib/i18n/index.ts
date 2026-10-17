import { id, type StringKey } from './id';
import { en } from './en';

export type UiLang = 'id' | 'en';
export type { StringKey };
export type StringTable = Record<StringKey, string>;
export type StringTables = Record<UiLang, StringTable>;

/** Base UI strings. Apps extend these per language with extendStrings(). */
export const baseStrings: StringTables = { id, en };
export { id, en };

/**
 * Merges a course's strings onto a base table: overrides of engine keys, plus keys of its own
 * (`K`, used by the course's components through useT<K>()). Both languages must define the same
 * keys (checked by each app's unit test).
 */
export function extendStrings<K extends string = never>(
  base: StringTable,
  overrides: Partial<StringTable> & Partial<Record<K, string>>,
): StringTable {
  return { ...base, ...overrides };
}

export function translate(
  tables: StringTables,
  lang: UiLang,
  key: StringKey | (string & {}),
  vars?: Record<string, string | number>,
): string {
  const table = tables[lang] as Record<string, string>;
  let s = table[key] ?? (tables.id as Record<string, string>)[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}
