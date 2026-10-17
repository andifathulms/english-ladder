You are restructuring this repository (English Ladder) into a monorepo that can host several sibling language courses on one shared engine. Arabic Ladder and Mandarin Ladder already exist as separate repos copied from this one; they will be migrated into this monorepo in a later step, one at a time. Japanese Ladder will be built here directly. This step covers English only. Work on a new branch `refactor/ladder-core`. **English Ladder must look and behave exactly the same when you are done.** This is a refactor, not a redesign.

## Before you change anything
1. Read `RECON.md`, `CLAUDE.md`, `DESIGN.md` and `PRD.md`. `RECON.md` §8 (component list, generic vs English-specific), §10 (direction audit) and §11 (reusability and the recommended split) are your map.
2. Run `npm run lint`, `npm run test`, `npm run content:check`, `npm run build` and `npm run test:e2e`, and record the results. These are the baseline; they must all still pass at the end.
3. Take baseline Playwright screenshots of these routes at 360px and 1280px, in light and dark, into `tests/parity/baseline/`:
   - `/`
   - `/rung/easy-1/`
   - one lesson at each of the six steps (use `easy1-07-prepositions-place`)
   - `/rung/easy-1/test/`
   - `/review/`
   - `/words/`
   - `/me/`
   - `/settings/`
   - `/about/`
   - `/rung/easy-1/read/`
4. Write a short plan in `docs/ladder-core-plan.md` and show it to me before moving files.

## Target layout (npm workspaces, no new tooling)

```
package.json                  # workspaces: ["packages/*", "apps/*"]; scripts proxy to apps/english
packages/ladder-core/         # engine, no course content, no brand
  src/lib/{check,content,progress,speech,i18n}/ markup.ts routes.ts basePath.ts sw-register.ts
  src/components/{ui,ladder,lesson,check,visuals}/ ProgressProvider.tsx MeView.tsx SettingsView.tsx WordsView.tsx
  src/course/                 # CourseConfig type + context + useCourse()
  styles/                     # tokens.css (structure + English values as defaults), globals.css
  tailwind-preset.ts
  sw/sw.template.js
  scripts/                    # serve.mjs, content-check runner, make-icons
apps/english/                 # this course
  app/ (thin Next routes)  content/  course.config.ts  visuals/ (PlaceScene, NounBuilder, NearFar)
  i18n/ (overrides)  public/ (manifest, icons)  styles/theme.css (token values)
  next.config.mjs  tailwind.config.ts (uses the preset)  tsconfig.json
```

The core is consumed as source (`transpilePackages: ['@ladder/core']` in Next), not published to npm.

## CourseConfig (the seam)

Create `packages/ladder-core/src/course/types.ts`, and make every English assumption listed in RECON §11 come from it instead of from literals:

```ts
export type CourseConfig = {
  id: string;                        // 'english-ladder'
  name: string;                      // 'English Ladder'
  rangeLabel: string;                // 'A1 → C1'
  storageKey: string;                // 'english-ladder:v1'
  cachePrefix: string;               // 'english-ladder-'
  exportFilePrefix: string;          // 'english-ladder-progress'
  repoUrl: string;
  target: { lang: string; dir: 'ltr' | 'rtl'; fontClass: string; sentenceClass: string };
  ui: { defaultLang: 'id' | 'en' };
  explainLangs: { value: string; label: Record<'id'|'en', string> }[];   // ExplainToggle options; [] hides it
  settings: { defaults: Settings; options: SettingsOptions };            // accents, voices, extra settings per course
  speech: { voiceScorer: VoiceScorer; sentenceSplit: RegExp; canSpeak: (voices) => boolean; sampleText: string };
  text: {
    normalise: (s: string) => string;            // used by grade(), search, lint
    tokenEquals: (a: string, b: string, i: number) => boolean;  // replaces first-word-case rule
    trimPunct: RegExp;
    tokenise: (s: string) => { text: string; start: number; end: number }[];
  };
  lint: { wordRegex: RegExp; knownWord: (w, ctx) => boolean; detectors: Detector[]; structureRules: Record<string, Rule[]> };
  visuals: Record<string, React.ComponentType<any>>;   // registry
  visualIds: readonly string[];
  boardPattern: React.ComponentType;                   // Contours for English
  extraData?: { nounsFile?: string; wordAnnotator?: (word) => ReactNode };  // WordsView article badge etc.
};
```

`apps/english/course.config.ts` provides English Ladder's current values exactly, so behaviour is unchanged.

## Changes inside the core (all must be no-ops for English)
1. Replace every hard-coded `lang="en"` on target-language elements with `course.target.lang`, and add `dir={course.target.dir}` on the same elements.
2. **Logical CSS:** apply the fixes from RECON §10 (the 9 asymmetric Tailwind uses, `.shell` padding, the Toggle knob, ClimbMoment marker, `divide-x` in MeView). Use logical properties (`ps/pe/ms/me/start/end/text-start`, `padding-inline-start`). In LTR the pixels must be identical.
3. `useRoving` and LessonPlayer arrow keys take a `dir` argument (unchanged behaviour for `ltr`).
4. `grade.ts`, `sameOrder`, `speak.chunks`, `itemText` and the lint runner call `course.text.*` / `course.speech.*` / `course.lint.*` instead of English logic. Move the English logic into `apps/english/course/`.
5. `ExplainToggle` options come from `course.explainLangs`.
6. Branding strings (`app.name`, `AppNav` aria-label, HomeView fallback h1, About copy, export filename, SW cache prefix, `climb.title`) come from config or app-level i18n overrides.
7. `NotchBar`: remove the `'/8'` string replace; build the label from the count directly (RECON §13 issue 7).
8. i18n: core keeps the base `id`/`en` tables; apps merge overrides with `extendStrings(base, overrides)`. A unit test checks key parity.
9. The content schema stays in core, but with the target-language field name made configurable later. For now keep `en` as the field name so English content doesn't change. Leave a `// TODO(ladder-core): target field` comment at the one place that reads it.
10. Tokens: core `tokens.css` keeps the token **names** and English values as defaults; `apps/english/styles/theme.css` re-declares the values (identical for now). Other apps will override only `theme.css`.

## Things you must not do
- Don't change any visual value, copy string, content file, lesson id or storage key. The storage key must stay `english-ladder:v1` so existing learners keep their progress.
- Don't add runtime dependencies. Don't add Turborepo, Nx, pnpm or changesets; plain npm workspaces only.
- Don't fix unrelated RECON §13 issues in this branch, except issue 7 (NotchBar), which the refactor touches anyway.
- Don't move English-specific visuals or content into the core.

## Deploy
- Keep the current GitHub Pages output identical: the workflow builds `apps/english` with `NEXT_PUBLIC_BASE_PATH=/english-ladder` (or the repo name, as today) and uploads `apps/english/out`.
- Add a commented matrix stub in the workflow for future apps (`arabic`, `mandarin`, `japanese`), each with its own base path, so adding one later is a few lines. Write `docs/DEPLOY.md` explaining the two options for when a second app exists:
  - (a) one Pages site with each app under its own sub-path
  - (b) each app pushed to its own repo's Pages with a deploy token

  Recommend one; don't implement either yet.

## Done when
- All baseline commands pass from the repo root (`npm run test` etc. proxy into the workspaces) and inside `apps/english`.
- **Parity:** re-take the screenshots into `tests/parity/after/` and compare them pixel by pixel with the baseline (Playwright `toHaveScreenshot` with `maxDiffPixels: 0`, or a small script). Every route matches. If anything differs, fix it; don't loosen the threshold.
- A new test proves the seam works: `packages/ladder-core/test/fake-course.test.tsx` renders `Sentence`, `OptionPill` and `CheckItemView` with a fake RTL course config (`lang: 'ar', dir: 'rtl'`) and asserts `lang`/`dir` attributes and `text-start` alignment.
- `README.md` explains the layout and how to add a new app: copy `apps/english` to `apps/<new>`, replace `content/`, `course.config.ts`, `visuals/`, `styles/theme.css` and `public/`.
- Write `docs/ladder-core-report.md`: what moved where, every English assumption now behind config, anything you couldn't make generic, and the parity result.

Commit in small steps:
1. workspace scaffolding
2. move files with no code changes
3. introduce CourseConfig
4. logical CSS
5. text/speech/lint hooks
6. branding/i18n
7. tests and docs

Don't merge to `main`; leave the branch for me to review.
