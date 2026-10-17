# Migrating Arabic Ladder onto ladder-core

Branch: `migrate/arabic`. Source: `../arabic-ladder` at `aedfae7` (= `origin/main` = what is live at
<https://andifathulms.github.io/arabic-ladder/>, last deploy 2026-10-15). Upstream copy point:
English Ladder `58eab3c` (named in the source `UPSTREAM.md` / `README.md`; present in this repo's history).

Status: **done, on branch `migrate/arabic` (not merged).** Sections 1–5 are the recon, 6 the plan,
7 your decisions, 8 the English Ladder fix flags, and 9 the final report.

---

## 1. What the source app is

Arabic Ladder: a calm, levelled Arabic course for Indonesian speakers. 11 rungs (Huruf 1–2, Easy 1–3,
Medium 1–3, Hard 1–3); live: **Huruf 1 (12 lessons), Huruf 2 (10), Easy 1 (12)**, 314 check items,
placement check (20 items), capstones (Huruf 2 reading; Easy 1 reading + Egyptian dialogue), 7 visuals,
recorded-audio pipeline (manifest currently empty → browser speech fallback for all 769 strings).

Its defining constraints (source CLAUDE.md §6, DESIGN §6.1):
- **The page stays LTR** (`<html lang="id" dir="ltr">`); every Arabic run is an RTL *island*
  (`ArIsland`). The shell, arrows, step transitions and ladder are never mirrored.
- Target-language fields are named by language: `ar`, `tr`, `eg`, `eg_tr`; `id` is Indonesian and `en`
  is an optional **English gloss**, not the target.
- Lesson-scoped reading toggles (Latin, Harakat) instead of the explanation-language pill.
- Progress: `arabic-ladder:v1`, `SCHEMA_VERSION = 1`, with `capstones`, `placement`, `rungs[].via`,
  and settings `arabicSize` (no `explain`, no `accent`).

Git log since the copy: 27 commits, all 2026-10-15 (M0 rebrand → M10 e2e, plus three fix commits).

## 2. Source gates (recorded 2026-10-17, in `../arabic-ladder`)

| Command | Result |
|---|---|
| `npm run lint` | ✓ no warnings or errors |
| `npm run test` | ✓ 16 files, **352 tests** |
| `npm run content:check` | ✓ 11 rungs, 34 lessons, 314 items: **0 errors, 1 warning** (769 strings without recordings, accepted by `content/audio/fallback.yaml`) |
| `npm run build` (`NEXT_PUBLIC_SHOW_DRAFTS=true`) | ✓ static export, 34 lesson pages, 3 tests, 2 readings, 1 talk, placement, joining |
| `npm run test:e2e` | ✓ **54 passed** (axe on every route ×2 themes, 7 flows, 2 font checks, joining-sheet pixel snapshot) |

## 3. Parity baseline

`apps/arabic/tests/parity/capture.mjs` (new) captured **200 shots** into
`apps/arabic/tests/parity/baseline/`: 50 screens × {360, 1280} × {light, dark}, from the source build
(drafts on, no base path) served on :4174. Determinism as in the English harness (fixed `Date`,
reduced motion, no transitions), plus a **seeded `Math.random`** so test/review draws repeat.

| Group | Shots (×4) |
|---|---|
| Fresh-state routes | home (two doors), placement intro, rung huruf-1 / huruf-2 / easy-1 / hard-3 (soon), test intro huruf-1 / easy-1, read huruf-2 / easy-1, talk easy-1, review (empty), words (empty), me, settings, about, joining sheet, 404 |
| Seeded learner (3 lessons done, 1 mid-lesson, review due) | home continue card, rung huruf-1 with progress, **My words filled**, Saya, review landing, **review running** (with the exit ✕) |
| Lesson steps (all six + feedback sheet) | huruf-1 `02-ba-ta-tsa` (LetterForms; read/mark/spell items), huruf-2 `05-syamsiyah-qamariyah` (SunMoon), easy-1 `12-prepositions` (PlaceSceneAr; scene/gap/fix/listen) |
| Placement | first item, **result** (20/20 → Easy 1, Huruf marked "lewat cek") |
| Rung test (huruf-1) | first item (QuestionBar), **climb moment**, **results** |

There is no word deck in Arabic (that is Mandarin's), so no deck shots.

## 4. Classification of every changed or added file (vs `58eab3c`)

**A** = app-only, **E** = engine, **D** = fork drift. Content (`content/**`) is all app-only and is
not listed file by file. "⚠ EN" = would change English if applied unconditionally → must be behind
config, default off.

### 4.1 Added files

| File | Class | Notes |
|---|---|---|
| `lib/arabic/*` (alphabet, chars, display, index, join, marks, names, text, translit) | A | Language library → `apps/arabic/lib/arabic` |
| `components/ar/*` (ArIsland, ArSentence, EgChip, HoldReveal, JoiningSheet, LessonText, Translit) | A | Plug into core slots (§6.2). `LessonText`'s *provider pattern* is the engine slot |
| `components/visuals/{Agreement,HarakatBuilder,LetterForms,Makhraj,PlaceSceneAr,SunMoon,WordJoiner}` | A | Need `usePlay` and visual data from core |
| `components/visuals/VisualData.tsx`, `lib/content/visualData.ts` | **E** | Build-time visual data via context; generalises core's `nouns` prop threading |
| `components/check/ArTileTray.tsx`, `MarkOption.tsx` | A | Via item-renderer / tile-tray slots |
| `components/check/PlacementRunner.tsx`, `lib/check/placement.ts`, `app/placement/page.tsx` | **E** (+A ids) | Placement runner; hard-codes `huruf-*` ids and sections → make data-driven |
| `components/ladder/TwoDoorWelcome.tsx` | **E** (+A glyph) | Two-door welcome |
| `components/ladder/CapstoneCard.tsx`, `components/lesson/DialogueView.tsx`, `app/rung/[rung]/talk/page.tsx` | **E** (+A eg chip) | Capstones: cards with Done badge, dialogue capstone route |
| `components/lesson/LessonTopToggles.tsx` | **E** pattern / A toggles | Lesson-scoped toggles (replaces ExplainToggle) |
| `components/lesson/TirukanCard.tsx` | **E** | Repeat-after card |
| `components/lesson/GlossaryChips.tsx` | **E** (+A translit line) | Done-screen glossary with audio (EL issue 15) ⚠ EN |
| `components/lesson/QuestionBar.tsx` | **E** | "Soal i dari N" test progress (EL issue 6) ⚠ EN |
| `components/ui/Lattice.tsx` | A | Board pattern (needs `boardPattern` actually wired, §5) |
| `lib/speech/audio.ts`, `lib/speech/sha1.ts` | **E** | Recorded-audio-first playback + manifest (key = sha1(normalise+`|`+variety)) |
| `lib/content/arabicTexts.ts` | A | Collects Arabic strings for lint/audio |
| `public/audio/manifest.json` | A | Data |
| `scripts/audio-list.ts` | A (uses arabicTexts) | → `apps/arabic/scripts` |
| `scripts/audio-ingest.ts` | **E** | Generic ffmpeg ingest → core `scripts/audio-ingest.ts` |
| `scripts/translit-check.ts` | A | → app scripts |
| `scripts/lint-physical.ts` | **E** | Physical-CSS lint; scoped dirs become a parameter |
| `scripts/upstream.mjs`, `UPSTREAM.md` | obsolete | Not carried over (the monorepo replaces the copy-and-port model) |
| `app/joining/page.tsx` | A | QA sheet route |
| `tests/unit/{arabic,ArSentence,bidi,lint,sw,tokens}.test.*`, `translit-pairs.ts`, `tests/e2e/{fonts,joining}.spec.ts` + snapshot | A | Move with the app (`sw.test` → core if the audio route goes into the template) |

### 4.2 Removed files

| File | Why | In the monorepo |
|---|---|---|
| `components/lesson/ExplainToggle.tsx` | replaced by LessonTopToggles | stays in core (English uses it) |
| `components/ui/Contours.tsx` | replaced by Lattice | stays in core |
| `components/visuals/{NearFar,NounBuilder,nounLogic}` | English only | already in `apps/english` |

### 4.3 Modified files

| File | What changed | Class |
|---|---|---|
| **lib/progress/constants** | key `arabic-ladder:v1`, `SCHEMA_VERSION 1` | A (values) — **core doesn't read `course.storageKey` yet** (§5) |
| lib/progress/types, defaults, migrations | + `capstones`, `placement`, `rungs[].via`, `arabicSize`; − `explain`, `accent`; − EL's 1→2 step | **E** (capstones, placement, via) / D (settings shape) |
| lib/progress/store | `applyPlacement` (never un-climbs), `completeCapstone`, `via` on recordTest | **E** |
| lib/progress/derive | continue target after placement; `Quote {text, tr}` | **E** |
| lib/check/grade | `compare(a,b,match)`, `matchOf`, spell/mark grading, Arabic punctuation | D (core has `course.text`) + **E** (`match` field, extra item types' grading hook) |
| lib/check/text | itemText/answerText for read/spell/mark, Indonesian listen text | **E** (per-type hook) + A |
| lib/content/schema | `ar/tr/eg` fields, read/spell/mark items, rung `name_ar/harakat/translit/lessons/words_target/threads`, dialogue, placement, letters, makhraj, lexicon entries | A (content model) — needs **pluggable schemas** in core |
| lib/content/load | JSON_SCHEMA YAML, dialogue/placement/letters/makhraj loaders, multi-file lexicon, `keyword`, `Quote` resume | **E** (capstone & placement loaders, JSON_SCHEMA, multi-file lexicon) + A |
| lib/content/lint | Arabic lint (verbs, case terms, clitics, harakat completeness, Huruf-1 script, reviewers) | A (lint rules) |
| lib/types | Arabic types, `Quote`, `keyword`, `GlossaryEntry` | D/A |
| lib/routes | `talkHref`, `placementHref` | **E** |
| lib/visualIds, components/visuals/registry | Arabic ids | A (core already has `course.visuals`) |
| lib/basePath | comment only | D (identical behaviour) |
| lib/speech/speak | Arabic voice scoring by variety, `؟۔` split, rate ×0.9 | D (core has scorer/split) + **E** (per-call variety, `rateScale`) |
| lib/i18n/{id,en} | −17 keys, +~68 keys, ~84 value changes | **E** (new engine keys) + A overrides — core can't take app-added keys today |
| components/check/CheckItemView | Arabic prompt/option islands, BigPlay listen, read/mark/spell, ArTileTray, `wideOptions`/badge | D + **E** (item-type renderer registry, tile items) + A |
| components/check/CheckStep, VisualStage | `nouns` prop dropped | D (→ visual-data context) |
| components/check/ClimbMoment | Lattice, logical CSS, `name_ar`, sullaman line, title in UI lang | **E** (title lang, board pattern) + A + D ⚠ EN |
| components/check/OptionPill | number badge, island labels, `gap-3` | **E** (badge) + A ⚠ EN (gap) |
| components/check/ReviewRunner | exit ✕ while running (EL issue 3), `py-2` | **E** ⚠ EN |
| components/check/TestRunner | QuestionBar, lesson titles in UI lang | **E** + D ⚠ EN |
| components/check/WhyLine | `mr-2→me-2` | D (already in core) |
| components/ladder/ContinueCard | Lattice, Quote with translit, two-door welcome, placement link | **E** (welcome slot) + A ⚠ EN |
| components/ladder/HomeView | placement door, `cefrLabel` | **E** + D |
| components/ladder/LadderRail | `huruf` tier, `name_ar` subtitle, "lewat cek" chip, logical CSS | **E** (tiers from config, via chip, subtitle slot) + A + D |
| components/ladder/LessonRow | missed-lesson flag, keyword chip, UI-lang title | **E** (flag) + A + D ⚠ EN |
| components/ladder/LessonStrip | UI-lang title + Arabic island | D + A ⚠ EN |
| components/ladder/NotchBar | `{n, total}` | **E** bug fix — **core still does `.replace('/8')`** (§5) |
| components/ladder/RungDetail | Lattice, capstones section + Done date, missed hints, placement retake card, translit/harakat meta | **E** + A ⚠ EN |
| components/ladder/RungView, app/page, app/rung/[rung]/page | pass dialogue/placement | **E** |
| components/lesson/LessonPlayer | lesson-scoped toggles + text provider, explain = UI lang, ArSentence, Mesir/Sound/Tirukan cards, GlossaryChips | **E** (toggles slot, strand registry, Tirukan) + D (explain mode) + A |
| components/lesson/PairCard, Prose, Sentence, StrandCards | Arabic rendering; Prose wraps Arabic runs | D/A via TargetSentence / prose slots |
| components/lesson/PlayButton, components/useSpeech | `useCanPlay/usePlay(text, variety)` via audio | **E** |
| components/lesson/ReadingView | saves capstone + records answers; glossary chips | **E** + D |
| components/ProgressProvider | `data-ar-size`; theme-color meta follows in-app theme (EL issue 14) | **E** ⚠ EN (browser chrome only) |
| components/SettingsView | no explain/accent rows; Arabic size row + preview; recorded sample | D (row gating) + **E** (second size setting) + A |
| components/WordsView | loose Arabic/translit search, all-rung grouping labelled "Huruf 2 · Pelajaran 3" (EL issue 11), gender/root/EG row | D + **E** (row/match slot, group label) + A ⚠ EN |
| components/AboutView | copy | A |
| components/ui/AppNav, Mark | brand | D (core already has `course.name`/`rangeLabel`) + A (سُلَّم glyph) |
| components/ui/tier.ts | `cefrLabel` "Pre-"→"Pra-" | **E** ⚠ EN (English Starter is "Pre-A1") |
| components/visuals/PlaceScene | split into `PlaceDrawing` + `usePlace` | A (English's copy lives in the app) |
| components/visuals/useRoving | `dir` arg | D — already in core, identical |
| app/layout, app/themeScript | fonts, single theme-color meta, `data-ar-size`, drops EL's `schemaVersion>=2` guard | A + **E** (theme-color) |
| app/fonts | 3 Arabic faces, latin-ext | A |
| app/review, test, [lesson], read routes | VisualDataProvider instead of nouns; `title.id` metadata | D/E |
| styles/tokens.css | green palette (values) + new tokens (`--huruf*`, `--eg*`, `--harakat`, `--t-ar-*`, `--t-tr`, `--ar-scale`, `data-ar-size`) + `--m-settle-d` | A (theme) + **E** (`--m-settle-d`, same value) |
| styles/globals.css | `.ar`, `.ar-focus`, `.tr-*`, mark keyframes; `tirukan-fill` | A + **E** (tirukan-fill) |
| tailwind.config.ts | `font-ar*`, `text-ar-*`, `huruf/eg/harakat` colours | A (app `extend` over the core preset) |
| public/sw.js | prefix/version/shell + **audio cache-first on first play** | template values + **E** (audio route) |
| public/manifest, icons/icon.svg, scripts/make-icons | green brand | A (make-icons takes the colour as an argument) |
| scripts/serve.mjs | `.mp3` MIME | **E** (harmless for English) |
| scripts/content-check | capstones, placement, data, Arabic lint, physical lint, audio, `lessons` count, unique item ids | **E** runner hooks + A checks |
| tests/* (adapted) | Arabic flows/a11y/helpers/progress/check/content | A |
| .gitignore | `recordings/` | A |
| package.json / lock, next/playwright/postcss/tsconfig/vitest configs | names, scripts | A (become the workspace's configs) |

## 5. Findings in core that block or affect the migration

These are things the `refactor/ladder-core` report says are configurable but aren't, or that would
break Arabic users:

1. **`course.storageKey` is not wired.** `lib/progress/store.ts` and `apps/english/app/themeScript.ts`
   import the hard-coded `STORAGE_KEY = 'english-ladder:v1'`. Arabic built on core today would read
   and write *English's* key, and every existing Arabic learner would start from zero.
2. **Migrations are global.** Core is at `SCHEMA_VERSION 2`, and step `1→2` rewrites `theme:'system'`
   to `'light'`. Arabic stores `schemaVersion: 1`. Running core's migrations would silently override
   any Arabic learner who picked "system", and future English steps would run on Arabic data.
   Schema version, steps and settings normalisation must be per course.
3. **`course.boardPattern` is not wired.** `Contours` is imported directly in ClimbMoment,
   ContinueCard (×3) and RungDetail.
4. **NotchBar still does `.replace('/8', …)`** on a string that is now `'{n}/{total} pelajaran'`. On
   English today the aria-label reads "3/{total} pelajaran". This doesn't change pixels. I'd fix it
   in core as a bug fix (parity holds) unless you object.
5. **`target.dir` mixes two jobs.** It sets the direction of target text *and* mirrors shell behaviour
   (LessonPlayer arrow keys, the ClimbMoment marker). Arabic needs RTL target text with an LTR shell.
   Separately, ~20 core spots tag `title.en` / `glossary.en` / options with `lang={target.lang}`; in
   Arabic, `en` is the English gloss.
6. **Strings can't be extended with new keys.** `extendStrings` takes `Partial<Record<StringKey>>`,
   so an app can't add keys.
7. **SettingsView hard-codes the explain and accent rows**, and the effective explanation language
   still reads `settings.explain` / `rung.explain_lang`.
8. **WordsView search doesn't use `course.text.normalise`.**

## 6. Migration plan

Guiding rule: every engine change ships behind an optional `CourseConfig` field (or a registry). The
default reproduces today's English pixels exactly. After each engine commit:
`npm test` (core + English) and `node tests/parity/verify.mjs` must give **60/60 identical**.

### 6.1 Core foundations (Step 2, first commits; they unblock everything else)

| # | Change in core | Config surface (default = English behaviour) |
|---|---|---|
| F1 | Wire storage: `configureStore({storageKey, schemaVersion, migrations, normalizeSettings})` called by `ProgressProvider` from the course; `themeScript` built by a core `buildThemeScript(course)` | `course.progress: { schemaVersion, migrations, settings: {defaults, normalize} }`. English passes its v2 + the 1→2 step |
| F2 | Pluggable content model: core loaders take the course's zod schemas (rung, lesson frontmatter, check items, reading, test pool) and a `summarize(lesson)`; core types become generic over a `CourseContent` type param, with `Quote = {text, tr?}` | `course.content` (build-time module, imported by the routes and the checker, never by the client) |
| F3 | Split direction: `target.dir` (target text) vs `shell.mirror` (arrows, climb marker; default `target.dir === 'rtl'`, which keeps the RTL seam test) | `course.shell?.mirror` |
| F4 | Rendering slots: `TargetSentence`, `ProseTerm`/prose run wrapper, `OptionLabel`, `TileTray`, `BoardSentence`, `lessonTitle(l, uiLang)`, `rungSubtitle`, `wordmarkExtra` | `course.components.*`; defaults are today's core components |
| F5 | Extensible strings: `extendStrings<AppKeys>()` lets apps add keys; new engine keys live in core base tables | — |
| F6 | Wire `boardPattern` (Contours stays English's value) | existing field |
| F7 | Visual-data context replaces `nouns` prop threading (English feeds `nouns` through it) | `course.content.visualData()` |

### 6.2 Engine features into core (one commit each, all default off)

| # | Feature | From | Notes / choice |
|---|---|---|---|
| E1 | **Item-type registry**: extra check types with schema + renderer + grader + itemText/answerText; `match: exact\|loose`; tile items (`order` + `spell`) | CheckItemView, grade.ts, text.ts | read/spell/mark *renderers* stay in the app |
| E2 | **Recorded-audio-first playback**: manifest, `audioKey`, `usePlay/useCanPlay(text, variety)`, word timings, per-call variety in the scorer, `speech.rateScale` (English 0.95), sw.js audio cache route, `.mp3` in serve, generic `audio-ingest` script | lib/speech/audio, sha1, useSpeech, PlayButton | `course.audio?` (absent = English, browser speech only) |
| E3 | **Placement check**: runner, data-driven scoring, `applyPlacement` (never un-climbs), `rungs[].via` + "lewat cek" chip, missed-lesson flags, retake card, `/placement` route | PlacementRunner, placement.ts, store | **More general than both siblings**: both hard-code rung ids. Core takes `course.placement = {sections, outcomes: [{result, minKey, climbs}], retakeRung}`; Arabic maps its existing `thresholds: {easy1, huruf2}` keys, so content is unchanged |
| E4 | **Two-door welcome** | TwoDoorWelcome, ContinueCard, HomeView | `course.home.welcome: 'start' \| 'twoDoor'` + an ornament slot |
| E5 | **Capstones**: reading + dialogue cards with Done date, `completeCapstone`, answers recorded, `/talk` route, DialogueView | CapstoneCard, RungDetail, ReadingView, DialogueView | `course.capstones: {kinds: [...]}`. English keeps its current reading card unless enabled |
| E6 | **Lesson-scoped toggles + lesson-text context** (replace the explain pill per course; "explain = UI language" mode) | LessonTopToggles, LessonText pattern, LessonPlayer | `course.lesson.toggles` component + provider; `course.lesson.explain: 'setting' \| 'ui'` |
| E7 | **Strand-card registry** (Examples/Contrast steps) + **Tirukan** repeat-after card | StrandCards, TirukanCard, LessonPlayer | `course.lesson.strandCards`; English's Sound/Talk/Words are the default |
| E8 | **Glossary chips with audio** on Done and reading (EL issue 15) | GlossaryChips | `course.lesson.glossaryAudio` |
| E9 | **Test QuestionBar** "Soal i dari N" (EL issue 6) | QuestionBar, TestRunner | `course.features.questionBar` |
| E10 | **Review exit control** (EL issue 3) | ReviewRunner | `course.features.reviewExit` |
| E11 | **Climb title in UI language** (EL issue 13) + climb extra-line slot | ClimbMoment | `course.climb.titleLang`, `course.climb.Extra` |
| E12 | **theme-color follows the in-app theme** (EL issue 14) | ProgressProvider, themeScript | `course.themeColor?` |
| E13 | **Second target-text size setting** (`data-target-size`; Arabic keeps its `arabicSize` key and `data-ar-size` attribute through config) | SettingsView, ProgressProvider, themeScript | `course.settings.targetSize?` |
| E14 | **Ladder extensions**: tiers from config (adds `huruf`), rung subtitle, CEFR label localiser, lesson-row trailing slot, `lessons` notch count from data | LadderRail, LessonRow, tier.ts | `course.ladder.*`; `cefrLabel` defaults to identity (English keeps "Pre-A1") |
| E15 | **My words**: match/Row slots, all-rung grouping with "Rung · Pelajaran n" labels (EL issue 11) | WordsView | `course.words.*` |
| E16 | **Option number badge**, settings rows gating (explain/accent/target size/preview) | OptionPill, SettingsView | `course.settings.rows` |
| E17 | **Content-check runner hooks**: extra checks (capstones, placement, data files, lessons count, global unique item ids), physical-CSS lint (dirs as config), JSON_SCHEMA YAML option, multi-file lexicon | content-check.ts, lint-physical.ts, load.ts | `course.check.extra(ctx)` |
| E18 | Small: `--m-settle-d` token, `tirukan-fill` keyframes, `talkHref`/`placementHref` | tokens/globals/routes | Same values, so no pixel change |

NotchBar `{n,total}` goes into F-series as a plain bug fix (finding 4).

**Mandarin note.** The sibling lives at `../chinese-ladder` (deployed as `mandarin-ladder`), not
`../mandarin-ladder`. It was forked *from Arabic* ("drop the Arabic layer"), so E2–E10 have the same
shape there. I compared placement, doors, capstones, toggles, Tirukan and audio: the differences are
rung ids, section names and settings. That's why E3 and E13 are written to be data-driven, so the
Mandarin migration can reuse them. Mandarin-only features (deck, TracePad, ruby, HSK chips) are out of
scope for this run.

### 6.3 Drift removal (delete the app copy, use core + hook)

WhyLine, useRoving, basePath, AppNav, Mark (+ `wordmarkExtra`), NotchBar, MeView, TileTray, steps,
StepBar, BottomActionBar, AppShell/PageShell/Badge/Icon/Toggle/Segmented/ProgressRing/TierDot,
WeekStrip, sfx, draw/leitner/random, markup, sections, sw.ts, and the progress store/migrations (via F1).
Also speak.ts (via scorer + `rateScale` + variety), grade/text (via `course.text` + E1), CheckStep and
VisualStage (via F7), LessonStrip/LessonRow titles (via `lessonTitle`), SettingsView, WordsView and
Prose/PairCard (via slots).

### 6.4 The app (Step 3)

`apps/arabic/`, laid out like `apps/english`:
- `content/` byte-identical (same lesson, check and word ids).
- `lib/arabic/`, `components/ar/`, `visuals/` (7 + PlaceDrawing), `check/` (ArTileTray, MarkOption,
  read/spell/mark renderers), `lesson/` (Arabic strand cards, toggles), `components/` (AboutView,
  Lattice, EgChip).
- `app/` thin routes, adding `placement/`, `joining/`, `rung/[rung]/talk/`.
- `app/fonts.ts`, `app/font-files/`, `styles/theme.css` (green palette + Arabic tokens), a
  `tailwind.config.ts` extending the core preset, `i18n/overrides.ts`, `public/`.
- `course.config.ts` with `storageKey: 'arabic-ladder:v1'`, `schemaVersion: 1` (no English steps),
  `cachePrefix: 'arabic-ladder-'` (SW `CACHE_VERSION` stays `v0.1.0`), `exportFilePrefix` unchanged,
  `target: {lang:'ar', dir:'rtl'}`, `shell.mirror: false`.
- `scripts/` (audio-list, translit-check; audio-ingest from core).
- `tests/` (unit, e2e, joining snapshot, parity).
- Root `package.json` scripts run all workspaces (`test`, `lint`, `content:check`, `build`), with
  `:english` / `:arabic` variants.

### 6.5 Deploy (Step 4)

- New job in `.github/workflows/deploy.yml`: build `apps/arabic` with
  `NEXT_PUBLIC_BASE_PATH=/arabic-ladder`, `NEXT_PUBLIC_SHOW_DRAFTS=true`, then push `apps/arabic/out`
  (with `.nojekyll`) to the **`gh-pages` branch of `andifathulms/arabic-ladder`**, using a deploy key
  stored as the `ARABIC_PAGES_DEPLOY_KEY` secret (write access on the source repo only).
- `docs/DEPLOY.md`: key generation, adding the public key to arabic-ladder (Deploy keys, write), adding
  the private key as a secret here, and switching arabic-ladder Pages to "Deploy from branch:
  gh-pages /".
- Source repo: on branch `docs/moved-to-monorepo`, a README note that development moved here. See
  decision D4 about its own workflow.

### 6.6 Tests and the progress-import check

- From the root, `npm test` runs core, English and Arabic suites. English parity: `tests/parity/verify.mjs`
  (60 shots). Arabic parity: a `verify.mjs` variant over the 200-shot baseline.
- **Live export fixture:** drive the live site (`/arabic-ladder/`) with Playwright: placement → one
  Huruf 1 lesson → the Huruf 2 reading capstone → settings changes (Arabic 140%, dark, male voice).
  Then click **Ekspor** and save the JSON to `apps/arabic/tests/fixtures/live-export.json`. A test
  imports it into the migrated app and checks the store state field by field, plus an e2e that the
  imported state renders the same continue card, "lewat cek" chips, capstone ✓ and settings.

### 6.7 Commit sequence

1. `docs: Arabic migration recon` (this doc, the capture script, the baseline)
2. F1…F7, then E1…E18: one commit each, English parity verified after each
3. `feat(arabic): move the app` (content, lib, components, visuals, public, fonts, scripts)
4. `feat(arabic): course.config.ts`
5. `refactor(arabic): remove fork drift`
6. `ci: deploy apps/arabic to arabic-ladder Pages`
7. `test(arabic): parity, live-export import, root test wiring`

### 6.8 Risks

- **Size.** F2 (pluggable content model) and F4 (rendering slots) touch most core components. They're
  the riskiest for English parity, and the per-commit English parity gate is the guard.
- **Pixel parity for Arabic.** Arabic copies of core components carry small style differences
  (`gap-3` in OptionPill, `py-2` in the review header, the ClimbMoment line style, the LessonStrip
  subtitle). Each becomes a config value so Arabic keeps its pixels. Any remaining difference will be
  listed here for your approval.
- **Joining snapshot** (`joining-sheet-chromium-darwin.png`) is platform-specific; it moves as-is.

## 7. Decisions (answered)

- **D1. Fixes for English**: each fix is a `CourseConfig.fixes.*` flag, on for Arabic, off for English,
  so English parity stays at 0 diff. They go on for English in a separate branch with a fresh baseline.
  The NotchBar aria-label fix was applied for everyone (no pixel change; see §9.6).
- **D2. Content model**: per-course schemas, no content file changes. Core reads lessons only through
  a course adapter (`ContentAdapter`: titles, target lines, translit, meaning, focus texts, glossary,
  readings, dialogues), so Mandarin and Japanese plug in the same way.
- **D3. Live export**: made with Playwright on the live site in a throwaway profile
  (`apps/arabic/tests/fixtures/make-live-export.mjs`).
- **D4. Source repo**: README note and the Pages workflow set to `workflow_dispatch` only, on branch
  `docs/moved-to-monorepo` in `../arabic-ladder` (one local commit, not pushed).
- **D5. Mandarin path**: the sibling is `../mandarin-ladder` (it was `../chinese-ladder` at recon time).

## 8. English Ladder fix flags (`CourseConfig.fixes`)

Every flag defaults to off. Arabic Ladder turns them all on (it shipped with these fixes, PRD §5.9).

| Flag | What it does | EL recon issue |
|---|---|---|
| `fixes.reviewExit` | A close control while a quick review runs; answers given stay recorded | 3 |
| `fixes.capstoneDone` | Capstone completion saved with its date, shown on the cards; reading answers feed review | 4 |
| `fixes.lessonScopedToggles` | The ID/EN explanation pill changes only the current lesson, not the global setting | 5 |
| `fixes.testProgressLabel` | Rung test progress bar labelled by question ("Soal 3 dari 16"), not lesson steps | 6 |
| `fixes.climbTitleTranslated` | The climb title is marked in the UI language (the wording itself is a string override, e.g. `'{rung} · naik'`) | 13 |
| `fixes.themeColorFollowsTheme` | The browser's theme-color follows the in-app theme (needs `themeColor`; pre-paint via `buildThemeScript`) | 14 |
| `fixes.glossaryAudio` | New-word chips (Done step, reading) with audio and transliteration | 15 |
| `fixes.wordsGroupLabel` | My words grouped by rung, then lesson, labelled "Rung · Pelajaran n" | 11 |
| `fixes.cefrLabelLocalised` | "Pra-A1" for Pre-A1 in the Indonesian UI | — |

Issue 7 (notch counts from data) is fixed for everyone (§9.6). Turning a flag on for English will
change English pixels on purpose; recapture `tests/parity/baseline` in that branch.

## 9. Report

### 9.1 What went into core

All behind optional `CourseConfig` fields or registries; absent = English's behaviour.

| Commit | Into core |
|---|---|
| `f0f6615` | **Progress per course**: `store.configure(progressConfigOf(course))` — storage key (was hard-coded to English's), schema version, the course's own migrations (English's 1→2 step moved into `apps/english`), the course's own settings; `buildThemeScript()` |
| `fa1e0c7` | **Content model + adapter** (D2): `createContent(model)` loaders, `ContentAdapter`, `Line`/`Title`/`Gloss`/`Quote`; the Sentence slot; strand registry; core page factories (`@ladder/core/pages/*`); visual data via `VisualDataProvider` (F7); `content:check` as a runner with hooks. English's schema, word lint and strand cards moved into `apps/english` |
| `f99b2e4` | `--m-settle-d`, `tirukan-fill`, `talkHref`/`placementHref` |
| `afce4c7` | **Course item types** (`registerItemTypes`: grade, text, tiles, options) and **check slots** (Inline, Prompt, Wrong, Listen, TileTray, option layout/badge/label, type renderers); `TextRules.equals` (exact/loose) |
| `195da17` | **Recorded audio first** (`course.audio`): manifest, `audioKey`, `play()`, `useCanPlay`/`usePlay`, variety-aware voice scoring, `speech.rateScale`, SW audio route, `audio:ingest` script, `startCourse()` |
| `6711d32` | Extensible UI strings (`extendStrings<K>`, `useT<K>`) |
| `9cfe575`, `5a4bd43`, `48253de` | `boardPattern` wired; `shell.dir` separate from `target.dir`; NotchBar label |
| `2d02f72` | `titles: 'ui'`, `components.TargetText`, `BoardQuote`, `prose.Term/Text`, `target.textAttrs`, keyword chip |
| `97fce59` | Ladder: tiers, rung subtitle, rung meta line; `fixes.cefrLabelLocalised` |
| `23199da` | **Placement check**, data-driven outcomes (both siblings hard-coded rung ids; core takes them from config) |
| `f3bad17` | **Two-door welcome** |
| `c37b613` | **Capstones**: dialogue capstone route and view, capstone cards, `fixes.capstoneDone` |
| `41faa1c` | **Lesson sessions** (lesson-scoped toggles/provider) and UI-language explanations; `fixes.lessonScopedToggles` |
| `7fc3bfb` | **Tirukan** repeat-after card |
| `17cc321`, `0b3f96f`, `e8b9197`, `89cb867`, `659d7cf` | `fixes.glossaryAudio`, `fixes.testProgressLabel`, `fixes.reviewExit`, climb config + `fixes.climbTitleTranslated`, `fixes.themeColorFollowsTheme` |
| `c957bcf`, `8f20020` | Target-text size setting; settings rows follow the course's settings; recorded voice sample |
| `1fcdcbc` | My words `match`/`Row` slots; `fixes.wordsGroupLabel` |
| `4802539` | Physical-CSS lint (dirs as a parameter); logical climb marker |
| `bff55f7`, `65e663a`, `b4f9ef4`, `b78c5ce`, `ae8c7d2` | Engine-item text overrides; wordmark extra; TileTray attrs; checker registers item types; generic draws |
| `daa1327` | **Shared place-scene drawing** (PlaceDrawing, usePlace, geometry) used by English and Arabic |
| `307eab2` | `make-sw.mjs`; `make-icons.mjs` takes the board colour |

When Mandarin migrates, it should reuse: placement, two doors, capstones, lesson sessions, Tirukan,
recorded audio, item types, check slots, UI-first titles, the target-size setting and the fixes. It
adds its own deck, TracePad and ruby rendering.

### 9.2 What stayed in the app (`apps/arabic`)

- `content/`: byte-identical to the source (`diff -r` clean); same lesson, check and word ids.
- `lib/arabic/`: the Arabic text library (unchanged apart from one import).
- `course/`: schema, types, adapter, text rules (exact/loose `compare`, `matchOf`), item types (read, spell, mark), speech (voice scorer, split, 0.9), Arabic lint, `arabicTexts`, progress (key `arabic-ladder:v1`, schema 1), content model and check hooks.
- `components/`: ArIsland, ArSentence, Translit, HoldReveal, LessonText, EgChip, JoiningSheet, ArTileTray, MarkOption, Arabic strand cards (Bunyi, Mesir, Kata, Ngobrol), Latin/Harakat toggles, Lattice, About, plus `slots.tsx`, `check/slots.tsx` and `WordsRow.tsx` (the Arabic rendering the engine's slots call).
- `visuals/`: LetterForms, WordJoiner, HarakatBuilder, Makhraj, SunMoon, PlaceSceneAr (on the core drawing), Agreement.
- `styles/theme.css` (palette and Arabic type tokens over core tokens), `styles/arabic.css` (mark keyframes), and the `.ar` classes as a Tailwind plugin.
- Fonts, `public/` (manifest, icons, empty audio manifest, generated `sw.js`), `i18n/overrides.ts` (40 own keys + its wording of engine keys), `scripts/` (audio:list, translit:check), and tests.

### 9.3 Drift removed

Arabic's modified copies of these engine files were **not carried over**, because core now does
what they did through config: LessonPlayer, PairCard, Prose, Sentence, ReadingView, StrandCards
(engine part), CheckItemView, CheckStep, OptionPill, TileTray, WhyLine, ClimbMoment, ReviewRunner,
TestRunner, ContinueCard, HomeView, LadderRail, LessonRow, LessonStrip, NotchBar, RungDetail,
RungView, AppNav, Mark, tier.ts, ProgressProvider, SettingsView, WordsView, MeView, useSpeech,
PlayButton, VisualStage, useRoving, the `lib/progress/*`, `lib/check/*`, `lib/speech/speak.ts`,
`lib/content/load.ts`, `lib/i18n/*`, `lib/routes.ts`, `lib/basePath.ts`, `lib/markup.ts`,
`lib/sw.ts`, tokens/globals CSS, the routes' logic (now core page factories), `serve.mjs`,
`make-icons.mjs`, `lint-physical.ts` and `content-check.ts`. Also dropped: `upstream.mjs` and
`UPSTREAM.md` (the copy-and-port model is over).

Removed after the move (`9946b42`): the app's copy of English Ladder's place-scene drawing and
geometry (now core's `PlaceDrawing`, used by both apps), and duplicate copies of core tests
(`Sentence.test.tsx`, `markup.test.ts`; these run once, with English).

### 9.4 Couldn't be made (fully) generic

- **Course-specific types at the boundary.** Core types course items, rungs and lessons as opaque (`[field]: unknown`); app code casts to its own types where it reads its own fields (adapter, slots, tests). Making core components generic over item types would have made every core narrowing harder; the boundary casts are explicit and few.
- **Placement content rules** (6/6/4/4 items per section, `match: exact`, threshold order) stay in Arabic's check hook; they are course policy, not engine.
- **`target.textAttrs: { lang: 'en' }`**: Arabic marked topics, threads and test-result answers `lang="en"`, even where the answer is Arabic. This is kept so behaviour and pixels are unchanged; worth fixing in Arabic later (the answer text should be an island).
- **`content:check` module instances**: an app's content model can load core through its alias, a separate module instance from the checker's relative imports, so the checker registers the course's item types itself (`b78c5ce`). It works, but it's a quirk of consuming core as source.
- **Joining-sheet snapshot** (`joining-sheet-chromium-darwin.png`) is platform-specific, as it was in the source repo.

### 9.5 Behaviour differences from the live app (please approve)

1. **Spell items in rung tests can now be answered** (`0b3f96f`). In the live app, once a learner places letters on a `spell` item in a rung test, *Next* stays disabled: TestRunner only counted `order` tiles. Huruf 1's pool has 5 spell items and Huruf 2's has 2, so some test draws can't be finished. Core now counts tiles for any tile item type. No pixel change in the baseline (its seeded draw has no spell item).
2. **The service worker file changes once.** `sw.js` is generated from the core template, with the same cache name (`arabic-ladder-v0.1.0`), the same precache list and the same audio route. The only difference is how the prefix is written. Browsers install it as an update; nothing cached is lost.

There are no visual differences.

### 9.6 English changes (all pixel-identical)

- NotchBar aria-label: "3/{total} pelajaran" → "3/10 pelajaran" (it was broken since the refactor).
- The store reads the course's key: still `english-ladder:v1`, still schema 2 with its 1→2 step; theme script byte-identical.
- Everything else behind config defaults. English parity was verified (60/60, 0 px) after every core commit.

### 9.7 Parity results

| Gate | Result |
|---|---|
| English parity (`node tests/parity/verify.mjs english`) | **60/60, 0 differing pixels**, after every engine commit and at the end |
| Arabic parity vs source build (`aedfae7`) | **200/200, 0 differing pixels**: every route, all six lesson steps + feedback sheet for Huruf 1, Huruf 2 and Easy 1, placement item and result, test item, climb moment, test results, review running, filled My words, 360/1280 × light/dark |
| Arabic parity vs **live site** with a learner's imported progress | **24/24, 0 differing pixels** (home, rung Easy 1 and Huruf 2, My words, Saya, Settings × 2 widths × 2 themes) |
| Live export import | `live-export.json` (from the live app) imports and exports back byte for byte (unit); the e2e imports it through Settings and shows the same continue card, "lewat cek" climbs, capstone date, My words and settings |
| Unit tests (root `npm run test`) | English + core 106 ✓, Arabic 347 ✓ (the source had 352; 4 duplicate core `Sentence` tests and 4 `markup` tests now run once with English, and 3 new live-import tests were added) |
| `content:check` | English 0/0; Arabic 11 rungs, 34 lessons, 314 items, 0 errors, 1 accepted audio warning: identical to the source |
| e2e (root `npm run test:e2e`) | English 35 ✓, Arabic 55 ✓ (the source's 54 + the live-import test) |
| Lint | both clean |
| `audio:list` / `translit:check` | identical output to the source (769-row CSV byte-identical; 0 differences) |

Parity notes: the 3/255 per-channel tolerance and re-capture loop from the English harness are unchanged; `MAX_ATTEMPTS` went from 4 to 6. Two shots are bistable in antialiasing: `/words` (already known) and `imported-me__light__1280`. For the latter, two captures of the **live site itself** differ by 27 px, and the local build matches one of them exactly. The baseline keeps that live capture.

### 9.8 What you need to do

1. Review `migrate/arabic` and merge when happy.
2. Deploy setup (`docs/DEPLOY.md`): create the deploy key, add it to `arabic-ladder` (write), add `ARABIC_PAGES_DEPLOY_KEY` here, run the workflow on `main`, then switch `arabic-ladder` Pages to the `gh-pages` branch.
3. Push and merge `docs/moved-to-monorepo` in `../arabic-ladder` (README note, workflow on `workflow_dispatch` only).
4. Approve or reject the two behaviour differences in §9.5.
