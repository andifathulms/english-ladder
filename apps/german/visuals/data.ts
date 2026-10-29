// The build-time data German visuals read (ContentModel.visualData → useVisualData). Type-only: safe
// for client code. Forms are always computed by lib/de from these; no visual hard-codes them.
import type { VerbData } from '@/lib/de/conjugate';
import type { Gender } from '@/lib/de/articles';

export type VisualNoun = { de: string; gender: Gender; plural: string | null; id: string; person?: boolean; exception?: string; parts?: string[]; links?: (string | null)[] };
export type DeVisualData = { nouns: VisualNoun[]; verbs: VerbData[] };

export const nounOf = (data: DeVisualData | undefined, de: string) => data?.nouns.find((n) => n.de === de);
export const verbOf = (data: DeVisualData | undefined, inf: string) => data?.verbs.find((v) => v.inf === inf);
