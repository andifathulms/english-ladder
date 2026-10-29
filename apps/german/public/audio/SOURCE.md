# Audio sources (CLAUDE.md §5.4)

## Recorded: none yet

- **Planned:** Dasar's minimal pairs, sound words and listen items, and every Tirukan sentence: 89 clips
  for the live rungs (`npm run audio:list`), by a speaker of standard German as spoken in Germany.
- **Source:** not chosen (docs/german/human-tasks.md H2). Either a commissioned speaker, or an existing
  set **only if** its licence allows trimming and redistribution in a free public app. Record the
  speaker, the licence and the date here when chosen.
- **Until then:** everything plays with the browser's German voice: de-DE first (natural voices
  preferred, novelty voices avoided, the gender setting respected), then de-AT and de-CH.

## Keys

`sha1(baseDe(text) + '|')`, first 12 hex digits (core `audioKey`; German has no variety). `baseDe` keeps
case (a noun's capital is part of the word) and drops quotation marks and closing punctuation. A
recording plays wherever the same text appears.

## Workflow

1. `npm run audio:list -w german-ladder -- --all > to-record.csv` lists what to record; the `file`
   column is the name to save each recording under.
2. Put the files in `apps/german/recordings/` and run `npm run audio:ingest -w german-ladder` (needs
   ffmpeg). It trims silence, normalises loudness to −16 LUFS, writes mono 48 kbps MP3 named by
   content hash, and updates `manifest.json`. The service worker caches clips on first play.
