// What a course's target-script fonts need: the app's fonts.config.ts exports `fonts` of this shape,
// and scripts/fonts-fetch.ts and scripts/fonts-subset.ts read it from the app in the current directory.
export type FontFace = {
  /** CSS family name (a renamed family, as the OFL asks of modified versions). */
  family: string;
  /** Source file in fonts-src/. */
  file: string;
  weight: number;
  /** Output file prefix, e.g. wenkai-400. */
  slug: string;
};

export type FontSource = { file: string; url: string; sha256: string };

export type FontsConfig = {
  /** Output names: styles/fonts-<name>.css, styles/fonts-<name>/, styles/fonts-<name>.json. */
  name: string;
  /** The comment at the top of the generated CSS. */
  header: string;
  faces: readonly FontFace[];
  /** Downloads for fonts:fetch, verified by SHA-256. */
  sources: readonly FontSource[];
  /** Every target-script character the site may show, in order of first appearance. */
  chars: () => string[];
  /** Characters always in the first slice (punctuation, ASCII), so mixed lines never fall back. */
  always: string;
  /** Sizes of the first slices; later slices hold `rest` characters each. */
  sliceSizes: readonly number[];
  rest: number;
  /** Fails the build when this face's subset (all slices) is over `bytes`. */
  budget: { slug: string; label: string; bytes: number };
  /** Names the first slice of a face in the summary line (e.g. "WenKai"). */
  firstSliceLabel: string;
};

/** "U+4E00-4E02, U+4E0A" for a set of characters. */
export function unicodeRange(chars: string[]): string {
  const cps = [...new Set(chars.map((c) => c.codePointAt(0)!))].sort((a, b) => a - b);
  const parts: string[] = [];
  for (let i = 0; i < cps.length; ) {
    let j = i;
    while (j + 1 < cps.length && cps[j + 1] === cps[j] + 1) j++;
    const hex = (n: number) => n.toString(16).toUpperCase();
    parts.push(i === j ? `U+${hex(cps[i])}` : `U+${hex(cps[i])}-${hex(cps[j])}`);
    i = j + 1;
  }
  return parts.join(', ');
}
