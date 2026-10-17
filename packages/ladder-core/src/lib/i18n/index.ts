import { id, type StringKey } from './id';
import { en } from './en';

export type UiLang = 'id' | 'en';
export type { StringKey };
export type StringTable = Record<StringKey, string>;
export type StringTables = Record<UiLang, StringTable>;

/** Base UI strings. Apps extend these per language with extendStrings(). */
export const baseStrings: StringTables = { id, en };
export { id, en };

/** Merge per-app overrides onto a base table. Keys stay in sync (checked by a unit test). */
export function extendStrings(base: StringTable, overrides: Partial<StringTable>): StringTable {
  return { ...base, ...overrides };
}

export function translate(
  tables: StringTables,
  lang: UiLang,
  key: StringKey,
  vars?: Record<string, string | number>,
): string {
  let s = tables[lang][key] ?? tables.id[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}
