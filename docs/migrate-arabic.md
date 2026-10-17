# Migrating Arabic Ladder onto ladder-core

Branch: `migrate/arabic`. Source: `../arabic-ladder` at `aedfae7` (= `origin/main` = what is live at
<https://andifathulms.github.io/arabic-ladder/>, last deploy 2026-10-15). Upstream copy point:
English Ladder `58eab3c` (named in the source `UPSTREAM.md` / `README.md`; present in this repo's history).

Status: **Step 1 (recon) only. Nothing has been moved.** Sections 1–5 are the recon; section 6 is the
plan; section 7 lists the decisions I need from you before Step 2.

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

## 7. Decisions I need before Step 2

- **D1. Fixes for English.** Several engine items are English Ladder bug fixes (issues 3, 6, 11, 13,
  14, 15, and Pra-A1). The brief requires English parity, so I plan to ship them **off for English**
  and turn them on for Arabic only. Turning them on for English would be a separate, later change.
  The one exception is the NotchBar aria-label fix, which changes no pixels. OK?
- **D2. Content model approach.** I recommend F2: core loaders and types take the course's schemas, so
  Arabic content stays byte-identical. The alternative, a shared target-field schema with `en`
  renamed, would mean editing every English and Arabic content file. OK with F2?
- **D3. Live export.** OK for me to drive the live site with Playwright to make the fixture? It only
  writes to a throwaway browser profile. Or would you rather export from your own browser and give
  me the file?
- **D4. Source repo workflow.** After the switch, arabic-ladder's own `deploy.yml` would still build
  and deploy on any push to its `main`, overwriting the monorepo deploy. Should the README branch
  there also remove that workflow (or limit it to `workflow_dispatch`)? Or do you want to handle that
  yourself?
- **D5. Mandarin repo path.** The brief says `../mandarin-ladder`; the repo is `../chinese-ladder`. I'll
  note it for the next run. No action needed now.
