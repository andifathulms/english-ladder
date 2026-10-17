# Plan — extract `@ladder/core`, move English into `apps/english`

Branch: `refactor/ladder-core`. Goal: a monorepo where one engine (`packages/ladder-core`)
drives several language courses, with **English Ladder byte-for-byte identical** when done.
This is a refactor, not a redesign.

## Baseline (recorded before any change, commit `58eab3c` behaviour)

All five commands pass on `main`'s code:

| Command | Result |
|---|---|
| `npm run lint` | ✓ No ESLint warnings or errors |
| `npm run content:check` | ✓ 10 rungs, 18 lessons, 152 check items: 0 errors, 0 warnings |
| `npm run test` | ✓ 10 files, 83 tests passed |
| `npm run build` | ✓ static export to `./out` |
| `npm run test:e2e` | ✓ 35 passed |

**Important e2e nuance:** the Playwright suite runs against the built `./out` and expects
draft lessons to be present. A plain `npm run build` hides drafts (only `/rung/easy-1/none`
is generated) and the suite fails 11 tests. The real baseline build is
`NEXT_PUBLIC_SHOW_DRAFTS=true NEXT_PUBLIC_BASE_PATH='' npm run build`, exactly as CI does.
The workspace scripts must preserve this.

## Parity harness (built, baseline captured)

- `tests/parity/capture.mjs <outDir>` — drives Chromium over every route in the brief at
  **360px and 1280px, light and dark** (60 shots: 9 routes + the 6 lesson steps of
  `easy1-07-prepositions-place` × 2 viewports × 2 themes). Determinism: fixed `Date`
  (stable greeting/today) without freezing timers, reduced motion, injected
  no-transition/no-animation/no-caret CSS, a fresh context per shot.
- `tests/parity/compare.mjs` — byte-exact diff of `baseline/` vs `after/` (the strictest
  possible `maxDiffPixels: 0`); fails on any mismatch.
- `tests/parity/baseline/` — 60 reference PNGs captured and spot-checked. ✓

At the end I re-run `capture.mjs tests/parity/after` against the `apps/english` build and
require `compare.mjs` to report **PARITY OK**. Any diff gets fixed, never the threshold.

## Target layout (npm workspaces, no new tooling)

```
package.json                 # private, "workspaces": ["packages/*","apps/*"]; root scripts
                             #   proxy to apps/english (lint/test/build/content:check/e2e)
packages/ladder-core/
  package.json               # name "@ladder/core", main fields point at src (consumed as source)
  src/lib/{check,content,progress,speech,i18n}/  markup.ts routes.ts basePath.ts sw-register.ts
  src/components/{ui,ladder,lesson,check,visuals}/  ProgressProvider.tsx MeView.tsx
                                                    SettingsView.tsx WordsView.tsx
  src/course/                # CourseConfig type + React context + useCourse()
  styles/                    # tokens.css (names + English values as defaults), globals.css
  tailwind-preset.ts         # the current tailwind theme, as a preset
  sw/sw.template.js          # sw.js with cache prefix / precache list parameterised
  scripts/                   # serve.mjs, content-check runner, make-icons
  test/                      # core-level tests incl. fake-course.test.tsx
apps/english/
  app/                       # thin Next routes importing core views
  content/  course.config.ts  visuals/ (PlaceScene, NounBuilder, NearFar + logic)
  i18n/                      # English string overrides + voice/accent-named copy
  public/ (manifest, icons)  styles/theme.css (token values, identical for now)
  next.config.mjs            # transpilePackages: ['@ladder/core'], basePath, export
  tailwind.config.ts         # uses the preset
  tsconfig.json
.github/workflows/deploy.yml # builds apps/english, uploads apps/english/out; commented
                             #   matrix stub for arabic/mandarin/japanese
docs/DEPLOY.md  docs/ladder-core-report.md  README.md
```

Core is consumed as **source** via `transpilePackages: ['@ladder/core']`, not published.

## The seam: `CourseConfig`

`packages/ladder-core/src/course/types.ts` defines `CourseConfig` (id, name, rangeLabel,
storageKey, cachePrefix, exportFilePrefix, repoUrl; `target {lang,dir,fontClass,sentenceClass}`;
`ui.defaultLang`; `explainLangs[]`; `settings {defaults, options}`;
`speech {voiceScorer, sentenceSplit, canSpeak, sampleText}`;
`text {normalise, tokenEquals, trimPunct, tokenise}`;
`lint {wordRegex, knownWord, detectors, structureRules}`; `visuals`, `visualIds`;
`boardPattern`; `extraData {nounsFile?, wordAnnotator?}`).
A `CourseProvider` + `useCourse()` context supplies it to client components; build-time code
(`lib/content`, `lib/check` lint, `scripts`) receives it directly. `apps/english/course.config.ts`
reproduces every current English value exactly, so behaviour is unchanged.

## Changes inside the core (all no-ops for English / LTR)

1. `lang="en"` on target-language elements → `course.target.lang`, plus `dir={course.target.dir}`.
2. Logical CSS for the 9 asymmetric Tailwind uses + `.shell` padding, Toggle knob,
   ClimbMoment marker, MeView `divide-x` (RECON §10). `ps/pe/ms/me/start/end/text-start`,
   `padding-inline-start`, mirrored step keyframes. LTR pixels stay identical.
3. `useRoving` and LessonPlayer arrow keys take a `dir` argument (unchanged for `ltr`).
4. `grade.ts`, `sameOrder`, `speak.chunks`, `itemText`, lint runner call
   `course.text.*`/`course.speech.*`/`course.lint.*`; the English logic moves to
   `apps/english/course/`.
5. `ExplainToggle` options from `course.explainLangs`.
6. Branding (`app.name`, `AppNav` aria-label, HomeView fallback h1, About copy, export
   filename, SW cache prefix, `climb.title`) from config / app i18n overrides.
7. `NotchBar`: drop the `'/8'` string replace; build the label from the count (RECON §13.7).
8. i18n: core keeps base `id`/`en` tables; apps merge via `extendStrings(base, overrides)`;
   a unit test asserts key parity.
9. Content schema stays in core; target field stays named `en` for now, with a single
   `// TODO(ladder-core): target field` where it is read.
10. Tokens: core `tokens.css` holds names + English defaults; `apps/english/styles/theme.css`
    re-declares identical values. Other apps override only `theme.css`.

## Must NOT do

No change to any visual value, copy string, content file, lesson id, or storage key
(`english-ladder:v1` stays). No runtime deps; plain npm workspaces only (no Turborepo/Nx/pnpm).
No unrelated RECON §13 fixes except issue 7. English visuals/content stay out of core.

## Deploy

Workflow builds `apps/english` with `NEXT_PUBLIC_BASE_PATH=/<repo-name>` and uploads
`apps/english/out` — output identical to today. Add a **commented** matrix stub for
`arabic`/`mandarin`/`japanese`. `docs/DEPLOY.md` explains and recommends one of:
(a) one Pages site, each app under a sub-path, or (b) each app → its own repo's Pages via a
deploy token. Recommendation only; neither implemented here.

## Commit sequence (small steps, matching the brief)

1. **workspace scaffolding** — root `package.json` workspaces + proxy scripts; empty
   `packages/ladder-core` and `apps/english` package.json/tsconfig; parity harness + baseline
   (this doc). English app still builds from the moved files in step 2.
2. **move files, no code changes** — `git mv` lib/components/styles/scripts/public/content/app
   into their new homes; fix import paths only; green on all five commands + parity.
3. **introduce CourseConfig** — types + context + `apps/english/course.config.ts`; wire
   `useCourse()`; branding/text/speech/lint still English literals internally.
4. **logical CSS** — RECON §10 fixes + `lang`/`dir` from config.
5. **text/speech/lint hooks** — route engine through `course.text/speech/lint`; English logic
   into `apps/english/course/`.
6. **branding/i18n** — `extendStrings`, config-driven branding, NotchBar, ExplainToggle,
   SW cache prefix.
7. **tests and docs** — `fake-course.test.tsx` (RTL seam), key-parity test, `README.md`,
   `docs/DEPLOY.md`, `docs/ladder-core-report.md`; re-capture `after/` and assert PARITY OK.

After each step: `lint`, `test`, `content:check`, drafts `build`, `test:e2e`, and parity must
stay green. Branch left for review; not merged to `main`.

## Open questions / risks

- **Parity strictness:** byte-exact is stricter than pixel-equal; if a legitimately
  non-visual artefact (e.g. font hinting across a Next version bump) ever differs I'll switch
  compare.mjs to a pixel diff with `maxDiffPixels: 0`, not relax it.
- **`transpilePackages` + App Router server/client boundary:** `lib/content` (build-only) must
  not leak into client bundles; keep the server/client split intact across the package edge.
- **`@/*` path alias** (`tsconfig` `@/* → ./*`) is used throughout; it gets replaced by the
  workspace package import (`@ladder/core/...`) plus an app-local alias.
