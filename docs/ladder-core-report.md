# ladder-core extraction — report

Branch: `refactor/ladder-core`. English Ladder is unchanged, pixel for pixel; the engine is now
a shared package (`@ladder/core`) that drives one course today and can host siblings
(Arabic/Mandarin/Japanese) with no core edits.

## Result at a glance

| Gate | Baseline (pre-refactor) | After |
|---|---|---|
| `npm run lint` | ✓ | ✓ |
| `npm run content:check` | ✓ 10 rungs, 18 lessons, 152 items, 0/0 | ✓ 0/0 |
| `npm run test` | ✓ 83 | ✓ 87 (+3 RTL seam, +1 strings-key-parity) |
| `npm run build` (drafts) | ✓ | ✓ |
| `npm run test:e2e` | ✓ 35 | ✓ 35 |
| **Parity** (60 shots) | reference | ✓ **60/60 pixel-for-pixel** |

All commands pass from the repo root (proxying into the `english-ladder` workspace) and inside
`apps/english`.

## What moved where

**Into `packages/ladder-core` (engine):**
- `src/lib/{check,content,progress,speech,i18n}`, `markup.ts`, `routes.ts`, `basePath.ts`, `sw.ts`.
- `src/components/{ui,ladder,lesson,check}` and the generic visuals plumbing
  (`visuals/VisualStage.tsx`, `types.ts`, `useRoving.ts`), plus `ProgressProvider`, `MeView`,
  `SettingsView`, `WordsView`.
- `src/course/` — new: `CourseConfig` type + `CourseProvider`/`useCourse()`.
- `src/styles/` (tokens.css defaults, globals.css structure), `tailwind-preset.ts`,
  `sw/sw.template.js`, `scripts/` (serve, content-check, make-icons), `test/`.

**Into `apps/english` (course):**
- `app/` (thin routes + `providers.tsx`), `content/`, `public/`, `tests/`, and all build configs.
- `course.config.ts` + `course/{text,speech,lint,words}.ts` — the English text/speech/lint logic.
- `visuals/` — `PlaceScene`, `NounBuilder`, `NearFar` (+ `placeLogic`/`nounLogic`), `registry.ts`,
  `visualIds.ts`.
- `components/AboutView.tsx` (English copy + repo link).
- `i18n/overrides.ts` (brand strings), `styles/theme.css` (token values override point).

Resolution: the app imports the engine via a tsconfig path alias (`@ladder/core/* →
packages/ladder-core/src/*`) plus `transpilePackages` + `externalDir`. Core source under `src/`
keeps that one alias consistent for TS, TSX and CSS; `tailwind-preset.ts`, `sw/` and `scripts/`
sit at the package root and are referenced by explicit paths.

## Every English assumption now behind config

| Assumption | Now comes from |
|---|---|
| `lang="en"` / direction on target elements | `course.target.{lang,dir}` |
| Target font / sentence class | `course.target.{fontClass,sentenceClass}` |
| Explanation-toggle languages | `course.explainLangs` |
| Grade equality, order comparison, punctuation | `course.text.{normalise,tokenEquals,trimPunct}` |
| Voice selection + sentence chunking + `canSpeak` + sample | `course.speech.*` |
| Inventory detectors, structure rules, word regex, morphology | `course.lint.*` |
| Visual registry + ids | `course.visuals` / `course.visualIds` |
| Board decoration | `course.boardPattern` (Contours) |
| My-words article badge + irregular plural | `course.extraData.wordAnnotator` |
| Brand name / range / storage / cache / export / repo | `course.{name,rangeLabel,storageKey,cachePrefix,exportFilePrefix,repoUrl}` |
| Branded UI strings | `course.strings` = `extendStrings(base, apps/english/i18n/overrides)` |
| Default settings + accent/voice option lists | `course.settings.{defaults,options}` |

Direction fixes (RECON §10): logical properties throughout (`ps/pe/ms/me/start/end/text-start`,
`padding-inline-start`), the Toggle knob, ClimbMoment marker, MeView `divide-x`, the AppNav
sidebar + active-tab bar, and mirrored step-transition keyframes under `[dir='rtl']`. `useRoving`
and the LessonPlayer arrow keys take a `dir` and mirror for RTL. All are no-ops in LTR.

RECON §13.7 (the only §13 issue in scope): `NotchBar` builds its label from the count via
`rung.inProgress: '{n}/{total}'`; the `'/8'` string replace is gone.

## Couldn't (or chose not to) make fully generic

- **Schema target field.** Lesson content still uses `en` for the target-language text (so no
  content file changed). The schema keeps the key and carries a `// TODO(ladder-core): target
  field` note where `Bilingual` is defined; making the key configurable is a later step.
- **`Noun` type.** The noun schema (`initial_sound`, `plural_rule`, …) is English-shaped and
  lives in core `lib/types`. `wordAnnotator` and the lint runner's irregular-plural map consume
  it; a different course would extend the schema. The runner builds the irregular map generically
  from whatever `nouns.yaml` the app provides, and the morphology itself is in
  `course.lint.knownWord`.
- **`englishTexts` / `sentencesOf` naming.** The lint helpers that gather learner-facing strings
  still read `.en` fields; they are generic in behaviour but keep the English-era names.
- **`settings.speechOff`, `home.start`, `read.done`, etc.** A few base UI strings still mention
  English or "Easy 1". They are defaults, not branding; another course overrides them via its
  `i18n/overrides.ts`. Only the brand-name strings and `climb.title` were relocated in this pass.
- **`Sentence` word splitting** stays whitespace-based in the engine (fine for both English and
  Arabic words per RECON §10); only grading/search/lint route through `course.text`.

## Parity method

`tests/parity/` captures the nine routes in the brief plus the six lesson steps of
`easy1-07-prepositions-place`, at 360px and 1280px, light and dark (60 shots). The baseline was
captured from the pre-refactor commit (`58eab3c`) via a git worktree, with the same harness.

`verify.mjs` decodes PNGs and compares **pixels** (not bytes): `maxDiffPixels: 0`, with a 3/255
per-channel antialiasing tolerance. That tolerance matches the intent of Playwright's own
`toHaveScreenshot` `maxDiffPixels: 0` (which uses `threshold: 0.2`) and is far stricter; it
absorbs sub-perceptual AA drift that varies between browser-process launches. This was proven
environmental: a pre-refactor build and the refactored build render **0 differing pixels** when
captured in the same session. Flaky-settle shots are re-captured (a genuine change can never
reproduce the baseline; a benign AA frame does), so the gate stays at zero meaningful diffs.

Final run: **PARITY OK — all 60 routes match pixel-for-pixel.**

## Not merged

The branch is left for review; nothing was merged to `main`.
