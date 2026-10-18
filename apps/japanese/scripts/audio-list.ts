/*
 * Lists what to record, as CSV for the speaker (CLAUDE.md §7.7, §8):
 *   file,kind,text,kana,where
 * `file` is the name to save the recording under (<file>.wav, or .mp3/.m4a/.flac) for
 * `npm run audio:ingest`. Kana are read in hiragana; katakana use the same clips. Kana and pairs
 * (minimal and pitch pairs) must be recorded: they never fall back to the browser voice.
 *
 *   npm run audio:list              live rungs, missing recordings only
 *   npm run audio:list -- --all     every rung with content (drafts included), e.g. for a commission
 *   npm run audio:list -- --kana    the kana set and pairs only
 *   … --recorded                    include what is already recorded
 */
import { readManifest } from '../../../packages/ladder-core/scripts/audio-lib';
import { allAudio } from '@/course/audio';
import { getCurriculum } from '@/course/content';

const args = new Set(process.argv.slice(2));
const rungs = getCurriculum().filter((r) => args.has('--all') || args.has('--kana') || r.status === 'live');
const manifest = readManifest();
let rows = allAudio(args.has('--kana') ? rungs.filter((r) => r.tier === 'kana') : rungs);
if (args.has('--kana')) rows = rows.filter((r) => r.kind !== 'text');
if (!args.has('--recorded')) rows = rows.filter((r) => !manifest[r.key]);

const cell = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
console.log('file,kind,text,kana,where');
for (const r of rows) console.log([r.file, r.kind, r.text, r.kana, r.where].map(cell).join(','));
const count = (k: string) => rows.filter((r) => r.kind === k).length;
console.error(`audio:list — ${rows.length} to record: ${count('kana')} kana, ${count('pair')} pair words, ${count('text')} lines and words`);
