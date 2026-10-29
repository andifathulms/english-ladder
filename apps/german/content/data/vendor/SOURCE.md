# Vendor data: sources and licences

German Ladder ships one piece of third-party data. Everything else in `content/data/` (verbs, nouns,
grammar points, bridges, word lists) is authored for this course, as drafts for the teacher's review.

## frequency.json: word frequency (estimates)

| | |
|---|---|
| What | The 10,000 most frequent German word forms (letters only, lower-cased), as `{ word: rank }` |
| Source | Hermit Dave, *FrequencyWords*, `content/2018/de/de_50k.txt`, built from the OpenSubtitles 2018 corpus: <https://github.com/hermitdave/FrequencyWords> |
| Licence | Content **CC BY-SA 4.0** (<https://creativecommons.org/licenses/by-sa/4.0/>); the repository's code is MIT. `frequency.json` is a derived subset and is shared under CC BY-SA 4.0 too |
| Version | `master` as fetched 2026-10-29; source file sha256 `d9e50546fd7e8b6fe6542a2b33c51d1331092b2a3916ec09f80d97856068705b` |
| Made by | `npm run data:import -w german-ladder` (scripts/data-import.ts) |
| Attribution | On the About page ("Data dan lisensi") |

**How it is used.** It orders the word deck (Kartu kata) and gives each word a rank. The words
themselves come from the course's authored lists (`nouns.yaml`, `verbs.yaml`, lesson glossaries).

**Known quirks.** The list is lower-cased, so a noun and a word spelled the same (*Essen* / *essen*)
share one rank. Subtitles over-represent spoken and dramatic words and under-represent written and
everyday-object words (*Bahnhof* ranks 3,737). Inflected forms are ranked separately (*ist*, *bin*,
*sind*), so a lemma's rank is taken as its most frequent listed form.

**Status:** candidate. The owner confirms the source and licence (docs/german/human-tasks.md H3).

## Goethe-Institut word lists (reference only, not shipped)

The Goethe-Institut publishes the word lists of the *Goethe-Zertifikat A1: Start Deutsch 1*, *A2* and
*B1* exams for learners (© Goethe-Institut). Their terms don't grant reuse, so German Ladder **does not
copy them** (the approved plan, H3): no list, no example sentence and no exam task is reproduced.
They are used only as a **level reference**. The `level` on a noun in `nouns.yaml` records which
list a word is on, checked by eye, and is an estimate the teacher confirms.

## Profile Deutsch

*Profile deutsch* (Glaboniat, Müller, Rusch, Schmitz, Wertenschlag; Langenscheidt) is a reference
only. The `level` of each point in `grammar.yaml` follows its grammar inventory as the reviewer
checks it; no text is copied.
