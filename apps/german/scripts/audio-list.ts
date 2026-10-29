/*
 * Lists what to record, as CSV for the speaker (CLAUDE.md §5.4):
 *   file,kind,text,where
 * `file` is the name to save the recording under (<file>.wav, or .mp3/.m4a/.flac) for
 * `npm run audio:ingest`. Kinds: pair (Dasar minimal pairs and listen items), word (Dasar sound words),
 * tirukan (repeat-after sentences).
 *
 *   npm run audio:list              live rungs, missing recordings only
 *   npm run audio:list -- --all     every rung with content
 *   … --recorded                    include what is already recorded
 */
import { readManifest } from '../../../packages/ladder-core/scripts/audio-lib';
import { allAudio } from '@/course/audio';
import { getCurriculum } from '@/course/content';

const args = new Set(process.argv.slice(2));
const rungs = getCurriculum().filter((r) => args.has('--all') || r.status === 'live');
const manifest = readManifest();
let rows = allAudio(rungs);
if (!args.has('--recorded')) rows = rows.filter((r) => !manifest[r.key]);

const cell = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
console.log('file,kind,text,where');
for (const r of rows) console.log([r.file, r.kind, r.text, r.where].map(cell).join(','));
const count = (k: string) => rows.filter((r) => r.kind === k).length;
console.error(`audio:list — ${rows.length} to record: ${count('pair')} pair and listen words, ${count('word')} sound words, ${count('tirukan')} Tirukan sentences`);
