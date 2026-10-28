# Spanish Ladder: M4 (shell) review

Branch `feat/spanish-ladder`, 2026-10-29. This is the first planned review stop (after M4). Plan:
`docs/spanish/plan.md` (approved 2026-10-28, all recommendations).

## What's in

| M | Commit | Contents |
|---|---|---|
| P0 | `98ff435` | Japanese parity harness and baseline (196 shots); `test:parity` runs all four siblings |
| M0 | `064389e` | `apps/spanish` from `apps/english`: config (all `fixes.*` on), theme (terracotta, azulejo, cream), brand, routes incl. placement and talk, ten-rung curriculum, root scripts and CI |
| M1 | `3fa8b0b` | `lib/es`: syllables, stress, conjugation (seven tenses), agreement, articles, form index. Data: 106 verbs with hand-written reference forms, grammar points with PCIC references, bridges and false friends, frequency subset (FrequencyWords, CC BY-SA 4.0) with `SOURCE.md` |
| M2 | `3744206` | Content pipeline: data schemas, lint (inventory, lexicon, accents and ¿ ¡, variety, agreement, check items against `lib/es`, bridges), accent mode stamped per rung, inventories, Easy 1 lesson 1 as a draft |
| M3 | `292f4b5` | Sentence slot (es-419 / es-ES lines, Tirukan stress underline), glyph coverage from the fonts' character maps |
| M4 | `38dba16` (core C4), `0dc095b` | Azulejo; two doors with the Dasar line; DELE chips; strand cards Bunyi, España, Ngobrol, Tirukan, Kata; My words row with gender chips; deck tab placeholder; About data and licences |

## Gates

| Gate | Result |
|---|---|
| Spanish unit tests | 811 ✓ (`lib/es` 785, lint 17, config, sentence) |
| Spanish e2e + axe | 37 ✓ (every route, both themes, lesson 1 steps 0–4, dark at 130% text, fonts, shell flows) |
| Spanish `content:check` | 10 rungs, 1 lesson, 5 items: 0 errors, 0 warnings |
| Lint | Spanish clean |
| Core C4 (`home.DoorNote`) | all siblings' unit tests ✓; parity English **60/60**, Arabic **224/224**, Mandarin **210/212**, Japanese **194/196** (see below) |

**The four misses are antialiasing on the sidebar's wordmark disc, not C4.** Mandarin's two are the
`imported-me` 1280 shots already approved on 2026-10-18 (6 and 27 px). Japanese's two are `me` at
1280 (18 and 21 px), and every differing pixel sits on the edge of the 40px wordmark circle
(x 28–52, y 24–63): the same bistable sub-pixel state. C4 adds nothing to `/me` (it only renders under
the first door on the home board, and only when a course sets it). **Please approve** treating
`me__{light,dark}__1280` in Japanese like Mandarin's `imported-me`; if you'd rather, I'll recapture
those two baseline shots instead.

## Where to look

`npm run dev:spanish`, then:
- `/`: the board with Azulejo, door 1, the Dasar line; the ladder with DELE chips
- `/rung/easy-1/01-hola/`: all six steps; the Examples step has Bunyi, España, Ngobrol and Tirukan
- `/words/` (after opening lesson 1), `/words/#deck`, `/settings/` (Ragam suara, Tanda aksen), `/about/`

## Decisions for you

1. **Wordmark range is "A1 → C1", not "A1 → C1 · DELE"** (DESIGN §2). With *escalera* beside it, the
   longer line wraps in the 256px sidebar and the phone header. DELE shows on every rung chip. Approve,
   or I can stack *escalera* under the range line with a small core slot change.
2. **The España chip and edge on the Spain-set dialogue (plan R7)** can't be per rung: core's
   `capstones.dialogue` styling is course-wide. The Madrid dialogue at Easy 2 will be marked in its
   title and play in es-ES voices; its lines are `lang="es-ES"`. A per-dialogue badge needs a small core
   change (a `Badge` that receives the dialogue). Say if you want it.
3. **Sequence vs PCIC** (also in human-tasks H1): PCIC puts stem-changing and yo-irregular presents at
   A2; Easy 2 teaches them at A1, as the textbooks do. `grammar.yaml` marks each such point.
4. **Until Easy 1 is live (M7), the ladder's "current rung" is Dasar**, because every rung is still
   `soon`. It becomes Easy 1 once lessons land.

## Notes

- **M5 work is already written and set aside**: core C1 (AccentBar), C2 (grade notes and grade
  context), C3 (section-based placement), the Spanish item types and answer areas. They're in
  `git stash` (`spanish M5 WIP …`), with a patch copy, so this branch stops cleanly at M4. Core tests
  for C1–C3 pass (44); they'll go through the four-app parity gate before each commit.
- **Mandarin bistable shots on unchanged `main`**: `imported-me` at 1280 (6–7 px, the antialiasing
  difference approved on 2026-10-18) and, in one of two runs, `review` light (2–9 px). I count a
  shot as matching when it reaches 0 px in one of the verify runs, as the harness's re-capture loop
  intends.
- **English and Arabic e2e axe specs have a TypeScript error** (`Page` from two Playwright copies) that
  `tsc` reports but the builds and the tests don't hit. It's in the existing specs, not this branch's
  changes; Japanese and Spanish cast `page as never`. I left it alone.
- Not built yet, by plan: placement and the five item types (M5), the seven visuals (M6), content
  (M7), recordings manifest (M8), deploy (M9).

## Next

M5: commit C1, C2, C3 one at a time through the four-app gate; the Spanish item types (`form`,
`conjugate`, `agree`, `dictation`, `stress`) with the accent bar and the lenient-accent note;
the placement check by section.

## Decisions (answered 2026-10-29)

All as recommended:
1. Japanese `me__{light,dark}__1280` count as known antialiasing on the wordmark disc, like Mandarin's
   `imported-me`. The baseline stays.
2. The wordmark keeps "A1 → C1" beside *escalera*.
3. No core change for the Madrid dialogue: it's marked by its title and Spain voices.
4. Easy 2 keeps the textbook order (stem changes and yo-irregulars at A1); the teacher confirms (H1).
