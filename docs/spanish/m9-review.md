# Spanish Ladder: M7–M9 (content, audio, polish and deploy) review

Branch `feat/spanish-ladder`, 2026-10-29. The last planned review stop (after M9), before the first
publish. M4 and M6 decisions are in `m4-review.md` and `m6-review.md`.

## What's in

| M | Contents |
|---|---|
| M7 | **Content, all `status: draft`**: Dasar 6 lessons, Easy 1 12, Easy 2 12; test pools (Dasar 18 → 10/8, Easy 1 and 2 36 → 16/12, one Spain recognition item each); Easy 1 and Easy 2 readings; dialogues in Ciudad de México (Easy 1) and Madrid (Easy 2, `variety: es`); word lists (Dasar 35, Easy 1 278, Easy 2 247); Kartu kata, the A1 deck, ordered by frequency; placement items linked to their lessons; the three rungs live |
| M8 | Audio: the recording list (77 clips: Dasar pairs and words, Tirukan, España lines), `audio:list`, keys tested against the app's, `public/audio/SOURCE.md`; browser voices until recordings exist |
| M9 | Why lines render their markup; the chosen stress syllable rises; the DESIGN §3.2 contrast test; a Spanish parity baseline (196 shots) in `test:parity`; the `deploy-spanish` job and `docs/DEPLOY.md` steps |

The three rungs were drafted side by side by helper agents working in separate files (each rung's
verbs and names in `data/verbs/<rung>.yaml`, `data/names/<rung>.yaml`), then integrated, linted and
spot-read. Three lint follow-ups came out of that: Spain words from glossaries count in Spain lines,
invariable plurals (el/los lunes) agree either way, and vosotros commands are fine in Spain lines.

## Gates

| Gate | Result |
|---|---|
| `content:check` | 10 rungs, 30 lessons, 281 check items: **0 errors, 0 warnings** |
| Unit tests | **870 ✓** |
| e2e + axe | **83 ✓**: every route, both themes, lesson steps with every visual, test/read/talk pages, the flows (door 1, door 2 → placement → Easy 2, conjugate grid, lenient accent, accent bar, deck, verb sheet) |
| Spanish parity | baseline 196 shots, verified 196/196 at 0 px |
| Lint | all five apps clean |
| Core | unchanged since C3 (gated at M6) |

## Lighthouse (mobile)

Measured locally against the built site through a gzip server (as GitHub Pages serves it), Lighthouse
12.8, mobile emulation, median of three runs. Accessibility, best practices and SEO are 100 on every page.

| Page | Before | After |
|---|---|---|
| `/rung/easy-1/07-ser-estar/` (a lesson) | 80 | **99** |
| `/placement/` | 79 | **94** (93–96) |
| `/words/` | 80 | **90** (89–98) |
| `/rung/easy-1/` | — | **89** |
| `/` | 78 | **88** |
| English `/`, same setup, for reference | 83 | 83 (unchanged) |

**What it was.** Not the engine's rendering: every page's content is in the static HTML and paints at
once (measured with a 4× slower CPU, first paint and LCP were both 0.2–0.3 s). Lighthouse's slow-4G model
made the text wait for **580 KB of preloaded fonts** (12 files). Spanish now loads 7 files, about 250 KB:
- `latin` only. I had added `latin-ext` as DESIGN §4 asks, but `latin` already covers á–ú, ñ, ü, ¿ ¡ « »
  (the glyph test reads the built fonts).
- Newsreader **without its optical-size axis**: 120 KB instead of 270 KB. Serif headings are a little
  heavier and wider at large sizes. **Your call**: say if you'd rather keep the axis, which puts home and
  My words back near 80.
- No preload for the display and mono faces. The body face stays preloaded, since most first-screen
  text uses it. No layout shift was measured (CLS ≤ 0.009).

**Why home and the rung pages stay below 95.** With every font blocked, home scores 94. The rest is the
size of those pages' HTML (home 19–26 KB gzipped, carrying every lesson summary) on the simulated slow
connection. Leaving the glossaries out of home's data cut it by 7 KB but didn't move the score, so I
reverted that core change. No core code changed on this branch.

## DESIGN §13 checklist

- [x] Every face renders ñ, á–ú, ü, ¿, ¡ (character-map test on the built fonts)
- [~] The accent bar inserts at the cursor and never covers the field (e2e in Chromium at 360px). Not
  tried on a physical iOS or Android keyboard.
- [x] Endings visible in the grid and Agreement in both themes; running sentences only mark the focus
- [~] España content carries its chip and edge on every España card and in the grid; the Madrid
  dialogue is marked by its title and Spain voices (decided at M4)
- [x] Raspberry wrong vs terracotta board vs cobalt accent: contrast test in both themes

## Deploy: stopped before the first publish

- `deploy-spanish` builds `apps/spanish` with `NEXT_PUBLIC_BASE_PATH=/spanish-ladder` and drafts on,
  and pushes `out/` to the `gh-pages` branch of `andifathulms/spanish-ladder` with
  `SPANISH_PAGES_DEPLOY_KEY`, as the siblings do. CI's build and e2e jobs include Spanish.
- **Repo, key and secret (done 2026-10-29, on your request):** `andifathulms/spanish-ladder` created
  (public, empty), deploy key "ladder monorepo" with write access, `SPANISH_PAGES_DEPLOY_KEY` set here.
- Nothing is merged to `main`, so no publish can run.

## Decisions for you

1. **Lighthouse**: done (above, commit 5845580); keep Newsreader without its optical-size
   axis, or restore it?
2. **The repo**: done (above).

## Next (after your review)

The teacher and the Spain speaker (H1), recordings or a decision that browser voices do for v1 (H2),
the frequency-list confirmation (H3), the repo and secret (H4), then merge and the first publish.
