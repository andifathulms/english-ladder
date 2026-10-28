# Vendor data: sources and licences

Spanish Ladder ships one piece of third-party data. Everything else in `content/data/` (verbs,
grammar points, bridges, word lists) is authored for this course, as drafts for the teacher's review.

## frequency.json — word frequency (estimates)

| | |
|---|---|
| What | The 10,000 most frequent Spanish word forms (letters only), as `{ word: rank }` |
| Source | Hermit Dave, *FrequencyWords*, `content/2018/es/es_50k.txt`, built from the OpenSubtitles 2018 corpus: <https://github.com/hermitdave/FrequencyWords> |
| Licence | Content **CC BY-SA 4.0** (<https://creativecommons.org/licenses/by-sa/4.0/>); the repository's code is MIT. `frequency.json` is a derived subset and is shared under CC BY-SA 4.0 too |
| Version | `master` as fetched 2026-10-28; source file sha256 `dcff3ad4316192f4dc4ff7d26e637c6ff314ef1ca0f3f720c5649018a71056c0` |
| Made by | `npm run data:import -w spanish-ladder` (scripts/data-import.ts) |
| Attribution | On the About page ("Data dan lisensi") |

**How it is used.** It orders the word deck (Kartu kata) and gives each word a rank. The level tags
on the deck (A1 …) come from the course's authored word lists, checked against PCIC vocabulary
notions by eye, and are **estimates**; the frequency list itself has no levels.

**Known quirks.** Subtitles over-represent spoken and dramatic words (*señor*, *chicos*, *matar*),
under-represent written and everyday-object words (*cuaderno*, *calcetín*), and mix Spain and Latin
American forms. Inflected forms are ranked separately (*es*, *son*, *eres*), so a lemma's rank is
taken as its most frequent listed form.

**Status:** candidate. The owner confirms the source and licence (docs/spanish/human-tasks.md H3).

## PCIC

The *Plan Curricular del Instituto Cervantes* (© Instituto Cervantes) is a reference only. Grammar
points in `content/data/grammar.yaml` cite PCIC section numbers; no PCIC text is copied.
