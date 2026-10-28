# Spanish Ladder — things only you can do

Added as the build reaches them. Ticked when done.

| # | Task | Needed by | Status |
|---|---|---|---|
| H1 | **A qualified Latin American Spanish teacher** to approve the sequence (PRD §4.1, §12.0) and review lessons, and **a Spain speaker** for the España cards (`review.es_by`). Every lesson stays `status: draft` until a reviewer is named in `review: { by, date }`. Their first job is the sequence and the draft `grammar.yaml`, which cites PCIC section numbers that need checking. | Before content beyond Easy 2; before any release | open |
| H2 | **Recordings**: about 60 clips (the Dasar minimal pairs such as pero/perro and caro/carro, and the stress pairs) plus the Tirukan sentences. Commission a native speaker of neutral Mexico City Spanish (and a Spain speaker for the España lines, if they are recorded), or **confirm that browser voices are acceptable for v1**. The clip list comes from `audio:list` in M8. | M8 / v1.0 | open |
| H3 | **Confirm the frequency-list source and its licence.** Candidate: hermitdave/FrequencyWords (OpenSubtitles 2018, Spanish 50k; content CC BY-SA 4.0). Level tags derived from it are estimates. The details will be in `apps/spanish/content/data/vendor/SOURCE.md`. | M1 → deck in M7 | open (candidate proposed) |
| H4 | **Add the deploy secret**: a deploy key with write access on `andifathulms/spanish-ladder` and the `SPANISH_PAGES_DEPLOY_KEY` secret in this repo. I'll create both with `gh` in M9 if my token allows; otherwise follow `docs/DEPLOY.md`. After the first publish (run from `main`): `spanish-ladder` → Settings → Pages → *Deploy from a branch*, `gh-pages`, `/ (root)`. | M9 | open |
