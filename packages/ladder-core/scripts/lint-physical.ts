/*
 * Finds physical (left/right) CSS in components that can hold target text in another direction.
 * Those components must use logical properties (ps/pe/ms/me/start/end, text-start/end,
 * border-s/e, rounded-s/e) so they work whichever side an RTL island sits on. A course's
 * content:check calls lintPhysical() with its own directories.
 */
import fs from 'node:fs';
import path from 'node:path';


// Tailwind utilities, with any variant prefixes (hover:, min-[900px]:, …).
const CLASS_RE =
  /(?<![\w-])(?:[\w-]+(?:-\[[^\]\s]*\])?:)*(-?(?:pl|pr|ml|mr|left|right|scroll-pl|scroll-pr|scroll-ml|scroll-mr)-[\w[\].%/-]+|text-(?:left|right)|border-[lr](?:-[\w[\].%/-]+)?|rounded-(?:l|r|tl|tr|bl|br)(?:-[\w[\].%/-]+)?)(?![\w-])/g;
// Inline style objects.
const STYLE_RE = /(?<![\w-])(left|right|marginLeft|marginRight|paddingLeft|paddingRight|borderLeft\w*|borderRight\w*)\s*:/g;

export type PhysicalFinding = { file: string; line: number; match: string };

function stripComments(src: string): string {
  // Keep line numbers: replace comment text with spaces.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, (m, pre: string) => pre + ' '.repeat(m.length - pre.length));
}

export function findPhysical(src: string, file = 'file'): PhysicalFinding[] {
  const out: PhysicalFinding[] = [];
  const code = stripComments(src);
  const lines = code.split('\n');
  lines.forEach((text, i) => {
    for (const m of text.matchAll(CLASS_RE)) out.push({ file, line: i + 1, match: m[1] });
    for (const m of text.matchAll(STYLE_RE)) out.push({ file, line: i + 1, match: `${m[1]}:` });
  });
  return out;
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(e.name) ? [p] : [];
  });
}

/** Physical CSS in the given directories (relative to root), reported relative to root. */
export function lintPhysical(dirs: string[], root = process.cwd()): PhysicalFinding[] {
  return dirs.flatMap((d) => walk(path.join(root, d))).flatMap((f) =>
    findPhysical(fs.readFileSync(f, 'utf8'), path.relative(root, f)),
  );
}
