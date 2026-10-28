# Spanish Ladder: M5–M6 (check engine, visuals) review

Branch `feat/spanish-ladder`, 2026-10-29. The second planned review stop (after M6). M4 decisions are
recorded in `m4-review.md`.

## What's in

| M | Commit | Contents |
|---|---|---|
| C1 | `1a05637` | Core **AccentBar** (`input.accentKeys`): inserts at the cursor, keeps focus, spoken key names |
| C2 | `a5ebad8` | Core **grade notes and grade context**: an item may be accepted with a note, shown in the feedback sheet; grading sees the learner's settings |
| C3 | `9f638d4` | Core **placement by section** (`PlacementOutcome.requires`) |
| M5 | `6578f00` | `form`, `conjugate`, `agree`, `dictation`, `stress` items and their answer areas; the lenient-accent note; the 24-item level check (draft) |
| M6 | `bea57eb` | StressMap, Agreement, SerEstar, ConjugationGrid (also in My words), GustarFlip, PlaceSceneEs, RoutineClock; `/visuals/` QA sheet |

## Gates

| Gate | Result |
|---|---|
| Spanish unit tests | 839 ✓ |
| Spanish e2e + axe | 45 ✓ (every route incl. `/placement/` and `/visuals/`, both themes; the lenient answer; the accent bar; door 2 → placement → Easy 2 through a conjugate grid; the verb sheet) |
| Spanish `content:check` | 0 errors; 28 warnings, all vocabulary that the rung word lists (M7) will cover |
| Core C1, C2, C3 | each gated in its own git worktree at its commit (a C1 build contains no C2 code): all siblings' unit tests ✓; English **60/60** and Arabic **224/224** at 0 px for all three; Mandarin and Japanese see below |

**Mandarin and Japanese misses are sidebar antialiasing, not these changes.** Every miss in the three
gates sits in the sidebar's left column (x ≤ 226 px at 1280: the wordmark disc, the nav icons, the
week-strip rings) or is a single pixel, and none of C1–C3 renders anything there.

| Shot | C1 | C2 | C3 | Where |
|---|---|---|---|---|
| Mandarin `imported-me` 1280 (approved 2026-10-18) | ✗ | ✗ light | ✗ | wordmark disc, week strip |
| Mandarin `rung-hard-3` dark 1280 | ✗ 40 px | ✓ | ✗ 40 px | wordmark and nav icons |
| Mandarin `review` / `words` light 1280 | ✓ | ✗ 9 px | ✗ 9 px (`words`) | week-strip rings |
| Mandarin `not-found` dark 360 | ✓ | ✗ 1 px | ✓ | one pixel |
| Japanese `me` 1280 (accepted at M4) | ✗ | ✗ light | ✗ light | wordmark disc |
| Japanese `review` light 1280 | ✗ 37 px | ✗ 37 px | ✓ | wordmark disc, nav icons |
| Japanese `rung-kana-2` light 1280 | ✗ 37 px | ✓ | ✓ | wordmark disc, nav icons |

Each shot outside the already-accepted ones matched at 0 px in at least one run, which is the
harness's own test for a bistable shot (`tests/parity/verify.mjs`). Nothing in the lesson, check,
placement or home areas differs.

## Where to look

`npm run dev:spanish`, then:
- `/visuals/`: all seven visuals (not linked from the app)
- `/placement/`: the level check, with stress, agree, conjugate and form items
- `/rung/easy-1/01-hola/`, Latihan step: item 6 is typed. Answer *estas* to see "Hampir sempurna:
  *estás*, dengan aksen."
- `/words/` after opening lesson 1: *llamarse* → "lihat konjugasi"

## Decisions for you

1. **Agreement uses *carro*, not *coche*** (DESIGN §7.2 lists *coche*). *Coche* is the Spain word, and
   Latin American content uses *carro* (CLAUDE.md §4.2). OK?
2. **RoutineClock's dial has midnight at the top**, so 6:00 is on the right and 18:00 on the left, as a
   24-hour dial reads. The morning (6:30–9:00) is crowded on a 24-hour face, so its icons step inward to
   avoid overlapping.
3. **ConjugationGrid shows one tense at a time.** DESIGN §7.4 allows up to three columns side by side on
   desktop. v1 only teaches the present (and tú commands), so the tense chips are enough for now. I'd add
   columns when Easy 3 brings the past tenses.
4. **SerEstar's person stands above the panels on phones** (between them from 480px up), so both
   panels keep a readable width at 360px.

## Notes

- The level check places by section as planned: Dasar < 75% → Dasar; else Easy 1 < 75% → Easy 1;
  else → Easy 2, with Dasar and Easy 1 climbed. "lewat cek" chips appear once those rungs are live
  (M7); until then the stored state shows the climbs.
- Test results count an accent-forgiven answer as correct but don't repeat the note (the sheet does,
  in lessons and review).
- `/visuals/` follows Arabic's unlinked `/joining/` sheet pattern.

## Next

M7: Dasar (6), Easy 1 (12), Easy 2 (12) lessons as drafts, test pools, readings, dialogues, the A1
word lists and deck.
