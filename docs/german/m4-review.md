# German Ladder: M4 (shell) review

Branch `feat/german-ladder`, 2026-10-29. This is the first planned review stop (after M4). Plan:
`docs/german/plan.md` (approved 2026-10-29, all recommendations).

## What's in

| M | Commit | Contents |
|---|---|---|
| M0 | `a67e321` | `apps/german` from `apps/spanish`: config (all `fixes.*` on), theme (petrol, Bauhaus red, cream; gender and case tokens), brand, ten-rung curriculum with exits, root scripts and CI |
| M1 | `7622199` | `lib/de`: articles and pronouns, adjective endings, conjugation, separable verbs, the verbal bracket, gender clues, compounds, plural patterns, syllables and stress, lenient spelling. Data: 91 verbs with hand-written reference forms, 302 nouns (29 compounds, 7 listed exceptions), 45 grammar points, 20 bridges and 10 false friends, frequency subset (FrequencyWords, CC BY-SA 4.0) with `SOURCE.md` |
| G1 | `6de1ff0` | Core: `ContentModel.check.focus` (linked focus); without it, content:check is unchanged |
| M2 | `95ad880` | Content pipeline: lint (inventory detectors, lexicon, agreement, verb position, separable prefixes, conjugation, capitals, ß, „…", Kerja register, data consistency, items against `lib/de`), grading for the German item types, Easy 1 lesson 1 as a draft |
| M3 | `f963e2e` | Tirukan stress view with authored stress for loanwords (`stress.yaml`); long-compound layout check; hyphenation through the app CSS (G5 not needed) |
| G2 | `c23a421` | Core: `climb.Extra` and `climb.Badge` receive `{ rung }` |
| M4 | `34ce5f0` | Bauhaus; two doors with the Dasar line; CEFR chips with exit flags; climb exit line; strand cards Bunyi, Kerja, Ngobrol, Tirukan, Kata; gender chips; My words row; Kartu kata tab; accent bar; case colours setting |

## Gates

| Gate | Result |
|---|---|
| German unit tests | 306 ✓ (`lib/de`, verbs, data, lint 27, items, stress, shell) |
| German e2e + axe | 36 ✓ (every route, both themes, lesson 1 steps 0–4, dark at 130% text, fonts, long compounds, exit chips, Kerja, Tirukan) |
| German `content:check` | 10 rungs, 1 lesson, 6 items: 0 errors, 0 warnings |
| Lint | German clean |
| Core G1 | all apps build; all unit tests ✓; parity English **60/60**, Arabic **224/224**, Japanese **196/196**, Mandarin **238/240**, Spanish **194/196** (see below) |
| Core G2 | all apps build; all unit tests ✓; parity English **60/60**, Arabic **224/224**, Mandarin **237/240**, Japanese **193/196**, Spanish **194/196** (see below) |

**The parity misses are the known wordmark-disc antialiasing, not G1.** G1 changes only the build-time
`content-check` script and a build-time type, so it can't change a rendered pixel. Mandarin's two are the
`imported-me` 1280 shots approved on 2026-10-18 (22 and 27 px, mostly on the disc at x 28–52, y 24–63,
plus a few on the sidebar's bottom icons). Spanish's two are `me` and `review-progress` at 1280 (18 and
6 px), every pixel inside the disc corner (x < 80, y < 80). **Please approve** treating them like
Mandarin's `imported-me`, or I'll recapture those baseline shots.

**G2's misses are the same kind.** G2 only passes a prop to the climb moment, which no parity shot shows.
Its misses: the same `imported-me` and `me` shots at 1280; Mandarin `words__light__1280` (9 px, all on the
week strip at the sidebar's bottom, x 24–220, y 833–867); Japanese `not-found__dark__360` (1 px, on the
header's wordmark disc at 16, 28); Spanish `me` and `review-progress` at 1280 (6 px each, on the disc).
Every differing pixel is on the wordmark disc or the week strip, the bistable spots the Spanish reviews list.

## Decisions for you

1. **Accent bar capitals.** Core's accent bar has no Shift layer, so the bar shows seven keys: ä ö ü ß Ä Ö Ü
   (CLAUDE §5.3 asked for Ä Ö Ü on Shift). **I recommend keeping seven keys**: they fit at 360px, and a Shift
   layer would be an unplanned core change. Alternative: add `shift` to core's accent keys (a G-change
   with five-app parity).
2. **Exit flag colour.** `--rung` gold failed contrast on paper (about 3:1), so on paper the flag uses
   `--dasar` (the brass-brown, ≥ 4.5:1); on the board it stays `--brass`. **I recommend this.**
3. **Climb line wording.** On exit rungs: "A1 selesai. Ini level ujian Goethe-Zertifikat A1 / Start Deutsch 1."
   It uses the curriculum's `milestone.exam` as written. **I recommend it**; a shorter exam name per
   milestone is one field away if you prefer "… level ujian Goethe A1."

## Not yet (by plan)

- Door 2 appears once `placement.yaml` exists (M5); every rung reads *Segera* until content lands (M7).
- Visuals (M6), check-item answer areas for `gender`, `case`, `wordorder`, `wechsel` (M5), audio (M8).

## Where to look

`npm run dev:german`, then:
- `/`: the board with Bauhaus, door 1, the Dasar line; the ladder with A1.1… chips and exit flags
- `/rung/easy-1/01-hallo/`: all six steps; the Examples step has Bunyi, Kerja, Ngobrol and Tirukan
- `/words/` (after opening lesson 1), `/words/#deck`, `/settings/` (Warna kasus, Ejaan), `/about/`

## Decisions (2026-10-29)

Approved as recommended: seven accent keys (no core Shift layer); the exit flag in `--dasar` on paper and
`--brass` on the board; the climb line with `milestone.exam` as written; the listed parity misses treated
as the known wordmark-disc and week-strip antialiasing.
