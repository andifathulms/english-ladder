# German Ladder — things only you can do

Added as the build reaches them. Ticked when done.

| # | Task | Needed by | Status |
|---|---|---|---|
| H1 | **A qualified German teacher** to approve the sequence (PRD §4.1, §12.0) and review lessons, and **someone with real Ausbildung or nursing experience in Germany** for the Kerja cards from B1 (`review.work_by`). Every lesson stays `status: draft` until a reviewer is named in `review: { by, date }`. | Before content beyond Easy 2; before any release | open |
| H2 | **Recordings**: about 50 Dasar minimal-pair words (schon/schön, Mutter/Mütter, ich/ach …) plus the Tirukan sentences, from a speaker of standard German (Germany), or **confirm that browser `de-DE` voices are acceptable for v1**. The clip list is ready: **89 clips** (34 pair and listen words, 25 sound words, 30 Tirukan sentences) in `docs/german/recordings.csv`, from `npm run audio:list -w german-ladder`; the workflow is in `apps/german/public/audio/SOURCE.md`. | M8 / v1.0 | open |
| H3 | **Goethe word lists**: confirm they may be used for **level tagging only** (proposed: never shipped or copied; the deck uses our own word lists ordered by the openly licensed FrequencyWords German list, CC BY-SA 4.0). If you have written permission to reuse the lists themselves, say so. **Decided 2026-10-29: level tagging only.** | M1 → deck in M7 | decided (tagging only); FrequencyWords source still to confirm |
| H4 | **Deploy repo and secret**: `andifathulms/german-ladder` didn't exist on 2026-10-29. **Done 2026-10-29:** `andifathulms/german-ladder` created (public, empty), deploy key "ladder monorepo" with write access, `GERMAN_PAGES_DEPLOY_KEY` set on `english-ladder`. Nothing published: the `deploy-german` job runs on `main` only, so the first publish happens when you merge. | M9 | done |
