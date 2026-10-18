/*
 * Imports recorded files from ./recordings (named <stem>.<ext>, as listed by the course's audio:list: a
 * 12-hex text key, syl-<base><tone> for a syllable, or an ASCII-escaped key such as kana-u304d-u3083,
 * see keyOf in audio-lib): trims silence, normalises loudness to −16 LUFS,
 * converts to mono 48 kbps MP3, names each file by content hash, and updates public/audio/manifest.json.
 * Needs ffmpeg and ffprobe on PATH. Optional word timings: <key>.words.json, word start times in ms.
 */
import fs from 'node:fs';
import path from 'node:path';
import { AUDIO_OUT, hasFfmpeg, keyOf, pool, processClip, readManifest, writeManifest } from './audio-lib';

const SRC = path.join(process.cwd(), 'recordings');

async function main() {
  if (!hasFfmpeg()) {
    console.error('audio:ingest needs ffmpeg and ffprobe on PATH (brew install ffmpeg).');
    process.exit(1);
  }
  if (!fs.existsSync(SRC)) {
    console.error('No ./recordings folder. Put <key>.wav files from the audio:list CSV there.');
    process.exit(1);
  }
  const manifest = readManifest();
  const files = fs.readdirSync(SRC).filter((f) => /^([0-9a-f]{12}|syl-[a-zü]+[1-4]|[a-z]+(-u[0-9a-f]{4,5})+)\.(wav|mp3|m4a|flac|ogg|aiff?)$/i.test(f));
  await pool(files, 6, async (f) => {
    const stem = f.replace(/\.[^.]+$/, '');
    const key = keyOf(stem);
    const { file, dur } = await processClip(path.join(SRC, f), stem.replace('ü', 'v'));
    const old = manifest[key]?.file;
    if (old && old !== file && fs.existsSync(path.join(AUDIO_OUT, old))) fs.unlinkSync(path.join(AUDIO_OUT, old));
    const wordsFile = path.join(SRC, `${stem}.words.json`);
    const words = fs.existsSync(wordsFile) ? (JSON.parse(fs.readFileSync(wordsFile, 'utf8')) as number[]) : undefined;
    manifest[key] = { file, dur, ...(words ? { words } : {}) };
  });
  writeManifest(manifest);
  console.log(`audio:ingest — ${files.length} recordings imported, ${Object.keys(manifest).length} in the manifest`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
