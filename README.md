# Ladder

A calm, levelled language-course engine and the courses built on it. The engine
(`@ladder/core`) is shared; each course is a thin app that supplies its content, visuals,
theme and configuration. Courses: **English Ladder** (`apps/english`) and **Arabic Ladder**
(`apps/arabic`, migrated from its own repo: see `docs/migrate-arabic.md`), both for Indonesian
speakers.

Read `PRD.md` for what to build, `DESIGN.md` for how it must look, `CLAUDE.md` for how to
build it, and `RECON.md` for a full map of the engine as it stands.

## Layout

```
package.json                 # npm workspaces: packages/*, apps/*; root scripts proxy to apps/english
packages/ladder-core/        # the engine — no course content, no brand
  src/lib/{check,content,progress,speech,i18n}/  markup.ts routes.ts basePath.ts sw.ts
  src/components/{ui,ladder,lesson,check,visuals}/  ProgressProvider MeView SettingsView WordsView
  src/course/                # CourseConfig type + context + useCourse()
  src/styles/                # tokens.css (names + default values), globals.css (structure, logical)
  tailwind-preset.ts         # the shared Tailwind theme
  sw/sw.template.js          # service-worker template (cache prefix / shell parameterised)
  scripts/                   # serve.mjs, content-check.ts, make-icons.mjs
  test/                      # engine-level tests (e.g. the RTL seam test)
apps/english/                # English Ladder
  app/                       # thin Next routes + providers, fonts, layout, themeScript
  content/                   # curriculum.yaml, <rung>/*.md, test.yaml, reading.yaml, lexicon, data
  course.config.ts           # the course seam (see below)
  course/                    # English text/speech/lint/words logic
  visuals/                   # PlaceScene, NounBuilder, NearFar (+ logic) + registry + visualIds
  components/                # app-specific views (AboutView)
  i18n/overrides.ts          # brand/English string overrides merged onto the core tables
  styles/theme.css           # token values (English delegates to core defaults)
  public/                    # manifest, icons, sw.js
  next.config.mjs tailwind.config.ts tsconfig.json vitest.config.ts playwright.config.ts
apps/arabic/                 # Arabic Ladder: same shape, plus lib/arabic (text library), course/ (content
                             # model, adapter, item types), components/ (ArIsland, slots), tests/parity
tests/parity/                # pixel-parity harness (verify.mjs <app>) + English baseline/
```

The engine is consumed **as source** (`transpilePackages: ['@ladder/core']` + a tsconfig path
alias), not published to npm.

## Commands

Run from the repo root (lint, test, content:check and test:e2e cover every app; build/dev/preview
default to English, with `:arabic` variants) or inside an app:

```bash
npm install
npm run dev            # local dev (drafts shown)
npm run build          # static export to apps/english/out (runs content:check first)
npm run preview        # serve apps/english/out
npm run content:check  # validate content against the course config
npm run test           # vitest (engine + app unit/component tests)
npm run test:e2e       # playwright, against the built site
npm run lint
npm run test:parity    # English 60 + Arabic 224 screenshots, 0 differing pixels
```

`NEXT_PUBLIC_BASE_PATH` sets the GitHub Pages base path (e.g. `/english-ladder`).
`NEXT_PUBLIC_SHOW_DRAFTS=true` ships draft lessons (the deploy and e2e use it).

## The course seam

`packages/ladder-core/src/course/types.ts` defines `CourseConfig`: everything that differs
between courses (brand/storage keys, target `{lang, dir, fontClass, sentenceClass}`, UI-string
overrides, settings options, a voice scorer + sentence splitter, text rules for grading/search,
lint detectors/rules/morphology, the visual registry, the board pattern, and a My-words
annotator). `apps/english/course.config.ts` supplies English Ladder's exact values. The engine
reads it through `useCourse()` (client) and, at build time, the content checker imports the
invoking app's config from its working directory.

## Adding a new course

1. Copy `apps/english` to `apps/<new>`.
2. Replace `content/`, `course.config.ts`, `course/`, `visuals/`, `styles/theme.css`,
   `i18n/overrides.ts`, `components/AboutView.tsx` and `public/` (manifest, icons, `sw.js`).
   For `sw.js`, copy `packages/ladder-core/sw/sw.template.js` and fill its two placeholders.
3. In `course.config.ts`, set `target.dir`/`lang`, the fonts (`app/fonts.ts` for a non-Latin
   script), the voice scorer and text/lint rules for the language, and the visual registry.
4. Add the app to the deploy workflow (see `docs/DEPLOY.md`).

The engine is direction-aware (logical CSS, `dir`-aware roving/arrows, mirrored transitions),
so a `dir: 'rtl'` course lays out correctly without touching core.
