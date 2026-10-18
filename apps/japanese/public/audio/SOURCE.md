# Audio sources (CLAUDE.md §7.7, §8)

## Kana and pairs: not recorded yet

- **Needed:** about 104 kana morae (hiragana readings; katakana play the same clips), plus the Kana 2
  minimal pairs (about 40 words: long vowels, small っ) and pitch pairs (about 20 words).
- **Source:** not chosen. Either a commissioned native Tokyo-standard speaker, or an existing set
  **only if** its licence allows trimming and redistribution in a free public app (human task H2 in
  `docs/japanese/human-tasks.md`). Record the speaker, the licence and the date here when chosen.
- **Until then:** kana and pair play buttons stay hidden. They never fall back to the browser voice:
  a synthetic voice can't be trusted with a single kana or with the contrast a pair teaches.
- **Keys:** `kana-<hiragana>` (e.g. `kana-きゃ`); pair words share the word's text key.

## Sentences and words

None yet. Commissioned recordings are planned; until then Japanese text plays with the browser's
ja-JP voice (natural voices preferred, novelty voices avoided, the gender setting respected).
Speech always reads the kana reading, so kanji are read right.

## Workflow

1. `npm run audio:list -- --all > to-record.csv` lists what to record (`--kana` for the kana set
   and pairs only). The `file` column is the name to save each recording under; kana files are
   named in ASCII (`kana-u304d-u3083.wav` for きゃ).
2. Put the files in `apps/japanese/recordings/` and run `npm run audio:ingest` (needs ffmpeg). It
   trims silence, normalises loudness to −16 LUFS, writes mono 48 kbps MP3 named by content hash, and
   updates `manifest.json`.
3. `content:check` fails when a live rung plays a kana or pair word that has no recording.
