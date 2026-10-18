# Migrating Mandarin Ladder onto ladder-core

Branch: `migrate/mandarin`. Source: `../mandarin-ladder` at `dd8f5fa` (live at
<https://andifathulms.github.io/mandarin-ladder/>). Mandarin was copied from **Arabic Ladder
`aedfae7`** (itself English Ladder `58eab3c` plus Arabic's generic additions), so the diff baseline
here is Arabic `aedfae7`. This is the **second** migration: everything the Arabic migration put
in core (`docs/migrate-arabic.md` §9.1) is reused, not rebuilt.

Status: **Step 1 (recon) only. Nothing has been moved.** §7 lists the decisions I need.

## 1. What the source app is

Mandarin Ladder teaches Mandarin to Indonesian speakers, from zero to HSK 9, across 11 rungs:
Dasar 1 (pinyin and tones), Dasar 2 (strokes and radicals), then Easy/Medium/Hard 1–3, which
map to HSK 1–9.

- **Live content:** Dasar 1 (10 lessons), Dasar 2 (10) and Easy 1 (18). That is 338 check items,
  a 20-item placement check, capstones (the Dasar 2 reading, plus the Easy 1 reading and
  dialogue), and the HSK 1 word deck of 500 words.
- **New item types:** `tone`, `pinyin`, `build` and `trace` (TracePad, stroke matching).
- **Text rendering:** ruby (per-word pinyin) with tone colours, and a pinyin fade (always, new,
  on-request, off).
- **Audio:** 1,632 recorded syllables (audio-cmn, CC BY-SA); syllables never fall back to speech.
- **Data:** HSK 3.0 lists, CC-CEDICT and Make Me a Hanzi data (stroke files in `public/strokes/`).
- **Fonts:** LXGW WenKai and Noto Sans SC, subset at build time.

**Progress:** stored under `mandarin-ladder:v1` at schema 1. Beyond Arabic's shape it adds
`deck` and `traces` state, and the settings `zhSize`, `toneColours`, `deckDaily` and `deckFace`.

## 2. Source gates (recorded 2026-10-17, in `../mandarin-ladder`)

| Command | Result |
|---|---|
| `npm run lint` | ✓ |
| `npm run test` | ✓ 22 files, **909 tests** |
| `npm run data:check` | ✓ 11,092 words, 3,000 characters, 572 grammar points, 0 errors |
| `npm run content:check` | ✓ 11 rungs, 38 lessons, 338 items: **0 errors, 14 warnings** (Hokkien bridges without a reviewer, 829 strings without recordings, accepted by `fallback.yaml`) |
| `npm run build` (`NEXT_PUBLIC_SHOW_DRAFTS=true`) | ✓ fonts subset to 459 characters (about 120 KB per face); 38 lessons, 3 tests, 2 readings, 1 talk, placement |
| `npm run test:e2e` | ✓ **60 passed** |

## 3. Parity baseline

`apps/mandarin/tests/parity/capture.mjs` captured **212 shots**: 53 screens, each at 360 and
1280px and in light and dark. They come from the source build served on :4177, with a fixed
clock, a seeded `Math.random` and reduced motion.

| Group | Screens |
|---|---|
| Fresh-state routes | home (two doors), placement intro, rung Dasar 1 / Dasar 2 / Easy 1 / Hard 3, test intro Dasar 1 / Easy 1, read Dasar 2 / Easy 1, talk Easy 1, review, My words, **the deck tab (`/words/#deck`)**, Saya, settings, about, 404 |
| Seeded learner | home continue card, rung Dasar 1 with progress, My words filled, Saya, review landing, review running |
| Lesson steps (all six plus the feedback sheet) | Dasar 1 `02-empat-nada` (ToneContour; tone and pinyin items), Dasar 2 `04-kotak-latihan` (StrokeOrder; **trace items drawn along the strokes' medians**), Easy 1 `10-letak` (PlaceSceneZh; scene, order, fix, listen and trace) |
| Placement | first item, result (20/20, placed in Easy 1) |
| Rung test (Dasar 1) | first item, climb moment, results |
| **Word deck** | a card front, the card back, and the end of a five-card session |

A source quirk shows in the trace feedback sheet: the why line prints `**横**` as raw markup.
The baseline keeps it (D5).

## 4. Classification (vs Arabic `aedfae7`; content, strokes, audio and vendor data are app-only)

**Added, all app-only.** Each is listed with how it reaches the engine.

- **`lib/zh/*`** (tokens, pinyin, sandhi, syllables, alignment, contour, trace matcher, word ids): language library.
- **`components/zh/*`:**
  - ZhText, ZhInline and ZhSentence render through the TargetText, check Inline/Prompt and Sentence slots.
  - Ruby, Pinyin, WordSheet and ZhContext are used by those components.
  - PinyinInput, ToneOption, ComponentTiles and TracePad are rendered by the item types.
  - DeckHome, DeckCard and DeckRunner are mounted through a new My-words tab slot (E-M14).
- **Visuals:** ToneContour(+Mini), SyllableBuilder, MouthPlaces, SandhiStrip, StrokeOrder, CharacterParts, PlaceSceneZh (on core's PlaceDrawing) and MeasureWords go to the registry. `ui/Grid` is the 田字格 board pattern; `ui/HskChip` is the level chip (E-M7).
- **Deck and checks:** `lib/deck/schedule.ts` (five-box Leitner) and `check/TraceCheck`.
- **Content model:** `lib/content/{hsk,autopy,lessonData,usedChars,zhTexts}`.
- **Scripts:** data fetch/import/check, fonts fetch/subset, strokes extract, audio syllables and trace fixtures.
- **Misc:** `types/subset-font.d.ts` and the app's tests.

**Removed:** the Arabic layer (lib/arabic, components/ar, Arabic visuals, joining sheet, Arabic tests). None of it applies here.

**Modified copies of engine files** (each is fork drift: core does the job, given the hooks in §5):

| Area | Files | How they map onto core |
|---|---|---|
| Check | CheckItemView, OptionPill, TileTray, TestRunner, PlacementRunner, ClimbMoment | Existing slots plus E-M1–E-M4 and E-M8 |
| Ladder | ContinueCard, HomeView, LadderRail, LessonRow, LessonStrip, NotchBar, RungDetail, RungView, TwoDoorWelcome, CapstoneCard | Existing slots plus E-M5–E-M9 |
| Lesson | LessonPlayer, LessonTopToggles, PairCard, PlayButton, Prose, ReadingView, DialogueView, GlossaryChips, StrandCards, TirukanCard, Sentence | Existing slots (Sentence, prose, strands, session, titles: 'ui') plus E-M10–E-M13 |
| Views | WordsView, SettingsView, ProgressProvider, useSpeech, AboutView (app) | Existing slots plus E-M14 and E-M15 |
| UI | AppNav, Icon (+IconChat, IconCards), Mark (wordmark row `items-end`), tier.ts (HSK labels) | Existing slots plus E-M7 and E-M16 |
| lib | progress/*, speech/{audio,speak}, check/{grade,text,placement}, content/{load,schema,lint,visualData}, types, i18n | Course config plus E-M15, E-M17 and E-M18 |
| Build | tokens.css, globals.css (additions only: `.zh*`, `.tone-*`, `.tianzige`, keyframes), tailwind, sw.js (+ cache-first `/strokes/*.json`), layout, themeScript, fonts | App theme and CSS, plus E-M19 |

Every one of Arabic's additions that Mandarin carries is **already in core**, differing only in
wording, rung ids and Arabic-only markup. That covers the two-door welcome, placement,
capstones, the toggles pattern, Tirukan, the audio pipeline and fixes 3–7 and 13–15.

## 5. New engine features Mandarin needs (all optional; default = today's English/Arabic)

| # | Feature | Notes |
|---|---|---|
| E-M1 | **Custom answer areas for course item types**: `check.types[t].Answer` gets `{ item, mode, value, solved, onChange, submit(resp, { firstTry }) }`, while core keeps sfx, misses, `onSolved` and the why line. Also `ItemTypeLogic.answered?()` for tests and placement. | Needed for pinyin (input), build (component tiles) and trace (TracePad). `answered` reproduces TestRunner's empty-pinyin and build rules per type. |
| E-M2 | **Check slots get the item** (`Inline`, `Prompt`, `Wrong`, `Listen`, `pill.Label`) plus the raw label. `rootAttrs(item)` adds `data-type`. `check.correctPillByGrade` decides the solved pill by `grade` rather than string equality. | Mandarin's prompts use each item's `py` and `show_pinyin` |
| E-M3 | **Tile-tray hooks**: per-tile attrs, class and Label, `data-tile`, and an `AfterLine` (the joined sentence) | Keeps core's FLIP animation |
| E-M4 | `pillStyles` exported; icons `IconChat` and `IconCards` | Trivial |
| E-M5 | **`ladder.RungSubtitle` component** for each place (rail, board, climb, placement) | Mandarin's classes and the board's pinyin line |
| E-M6 | **Long-rung notch bar**: `ladder.longRung = { minLessons: 18, lineBelow: 480 }` | Mandarin's 18-lesson rungs |
| E-M7 | **Level labels instead of CEFR**: `adapter.rung.levelLabel` (HSK n; empty for Dasar), `ladder.LevelChip`, `ladder.tierRange`, and labels joined with `filter(Boolean)` | The same text whenever a label exists, so English and Arabic are unchanged |
| E-M8 | **Rung-page extras**: `ContentModel.rungData` → `ladder.RungExtra` (the deck card), and `target.topicAttrs` | |
| E-M9 | `components.wordmarkAlign: 'end'` | Mandarin's wordmark ruby |
| E-M10 | **Lesson data**: `ContentModel.lessonData(lesson)` → `useLessonData()` for slots and strands (words, recent words, hanzi, Hokkien, word ids). `visualData(ids, { lesson, items })`. `progress.onCompleteLesson` (teaches the lesson's deck words in the same commit). | |
| E-M11 | **Content post-parse**: `ContentModel.postParse` (pinyin auto-fill for items from the rung glossary) | Build time only |
| E-M12 | `adapter.quote(line)` with `Quote.raw`, `summaryExtra`, `components.TitleTarget` (titles drawn as ZhSentence), `capstones.Wrap`, `glossary.Word`/`Extra` | |
| E-M13 | `speech.estimateMs` (Tirukan pause), `speech.chunkMax`, `speech.spoken(text)`, `PlayOpts.onChar` | |
| E-M14 | **My words tabs**: `words.tabs` (My words \| Kartu kata, hash `#deck`), `ContentModel.wordsPageData`, and a `data` prop on `words.Row` | Hosts the word deck in core's page |
| E-M15 | **Progress extensions**: `progress.extensions` (`deck`, `traces`: empty and validate, stored after `opened`), plus `store.getExt` and `updateExt` | Keeps the stored key order, so exports match |
| E-M16 | Search `dir="auto"` only for RTL targets | Unchanged for English and Arabic |
| E-M17 | **Audio keys per course**: `audio.key(text, variety)` (Mandarin: `sha1(normZh)` or `syl-<base><tone>`), `audio.speechFallback(text)` (syllables never spoken), optional `defaultVariety` | Arabic's keys stay byte-identical |
| E-M18 | Content checks for course data (HSK lists, pinyin, strokes, fonts budget) through the existing `check.extra` hook, and `data:check` as an app script | No core change beyond the hook |
| E-M19 | **SW cache-first routes as a list** (`make-sw.mjs --cache-first strokes:.json`; audio stays the default) | English and Arabic output unchanged |

Bug fixes and shipped fixes: Mandarin ships the same English Ladder fixes as Arabic, so it reuses
the existing `fixes.*` flags with all of them on. I found no new engine bug fixes. TestRunner
treating an empty pinyin answer as unanswered is part of E-M1.

## 6. Plan

1. **Engine (step 2)**: E-M1 to E-M19, one commit each. English (60/60) and Arabic (224/224)
   parity must stay at 0 px after every commit, and all tests must pass.
2. **App (step 3)**: create `apps/mandarin` with:
   - `content/` (byte-identical), `lib/zh`, `components/zh`, visuals, the deck, `course/`
     (schema, adapter, item types, text rules, speech, lint, content model, progress), i18n
     overrides, theme.css and mandarin.css
   - `fonts-src/README.md` and the fetch/subset scripts, plus `public/` (manifest, icons, 1,632
     syllable mp3s, 372 stroke files, `sw.js` from the template)
   - `course.config.ts`: key `mandarin-ladder:v1` at schema 1, cache prefix `mandarin-ladder-`
     (v1.0.0), export prefix `mandarin-ladder-progress`, `shell.dir: 'ltr'`, `titles: 'ui'`, and
     every `fixes.*` flag on
3. **Drift removal**: no engine copies carried over. Duplicate tests and Mandarin's copy of the
   place drawing are dropped (core has them).
4. **Deploy (step 4)**: a `deploy-mandarin` job builds with `/mandarin-ladder` and pushes to
   `mandarin-ladder`'s `gh-pages` with a deploy key. CI fetches the fonts (cached, as Mandarin's
   CI does) before the tests and build. Then a README note and a `workflow_dispatch`-only
   workflow in the source repo.
5. **Tests (step 7)**:
   - parity for all three apps
   - a live export from mandarin-ladder imported byte for byte
   - imported-state shots of the live site vs the app, including the deck tab
   - Mandarin's 909 unit tests and 60 e2e tests, ported to core APIs

**Risks:**
- **Breadth.** Core has to render about eight places through ZhText with Mandarin's exact
  classes.
- **Fonts.** Subsetting must produce the same CSS and files as the source build, or hanzi
  pixels change. Use the same font sources, script and character collection.
- **CI time.** Fetching the fonts once per run, cached.

## 7. Decisions I need

- **D1. Live export.** May I use Playwright on the live `mandarin-ladder` site in a throwaway
  profile again? The learner would take the placement, finish a lesson, do the Dasar 2
  reading, study five deck cards, trace a character, change settings, and then export.
- **D2. Deploy.** May I use the same setup as Arabic, with the steps run by me as last time? That
  means a deploy key on `mandarin-ladder`, the `MANDARIN_PAGES_DEPLOY_KEY` secret, the first
  publish, switching Pages to `gh-pages`, and the README note with `workflow_dispatch` in the
  source repo.
- **D3. Repo size.** Moving the app adds about 13 MB of syllable audio and 1.5 MB of stroke data
  to the monorepo, plus 4.3 MB of HSK and dictionary data in `content/data`. Is that OK, or do
  you want Git LFS for the mp3s? I'd keep them as plain files, as Mandarin does today.
- **D4. Fixes.** I'll turn on all the existing `fixes.*` flags for Mandarin, which shipped with
  the same fixes as Arabic. No new flags are needed. OK?
- **D5. Raw `**…**` in trace why lines.** The live app shows literal asterisks in some feedback
  sheets (visible in the baseline). Should I keep that for parity, or fix it and list the
  difference? I'd keep it and list it as a follow-up.

**Answers (2026-10-17):** D1 yes (Playwright on the live site, throwaway profile). D2 yes, same as
Arabic, run by me, source workflow to `workflow_dispatch` only, and stop before the Pages switch.
D3 plain files, no LFS (note in `docs/DEPLOY.md` to reconsider past ~500 MB). D4 all `fixes.*`
on. D5 keep the literal `**…**` for parity here, list it below, and fix it afterwards on
`fix/mandarin-trace-markup` with an updated baseline.

## 8. Report

### 8.1 What went into core

Everything is optional `CourseConfig` / `ContentModel` / `ItemTypeLogic` fields; absent means
today's English and Arabic behaviour. English parity (60/60) and Arabic parity (224/224) stayed at
0 differing pixels after every commit.

| Commit | Into core |
|---|---|
| `1531338` | E-M13, E-M17: `audio.key`, `audio.speechFallback`, `audio.spoken`, `PlayOpts.onChar`; `speech.chunkMax`, `speech.estimateMs` (Tirukan pause); Mandarin's more general `audio-lib`/`audio-ingest` |
| `3553432` | E-M15: `progress.extensions` (stored after `opened`, validated on load, emptied on reset), `store.getExt`/`updateExt`, `progress.onCompleteLesson` |
| `6dcf2bc` | E-M1–E-M4: `check.types[t].Answer` (submit/onChange; core keeps sfx, misses, solved, why), `ItemTypeLogic.answered` + `isAnswered`, slots get the item, `rootAttrs`, `correctPillByGrade`, `dedupeWrong`, pill `data-*`/raw label, TileTray `tileAttrs`/`tileClass`/`Label`/`AfterLine`, `pillStyles`, IconChat/IconCards |
| `5b58596` | E-M5–E-M9: `ladder.RungSubtitle` (rail, board, climb, placement), `adapter.rung.levelLabel` + `useLevel`, `ladder.LevelChip`, `ladder.tierRange`, `ladder.longRung`, `ContentModel.rungData` → `ladder.RungExtra`, `target.topicAttrs`, `components.wordmarkAlign` |
| `92539f5` | E-M10–E-M12: `ContentModel.lessonData` → `useLessonData` (and `completeLesson`), `visualData(ids, { lesson })`, `ContentModel.postParse`, `summaryExtra`, `adapter.lesson.quote`/`closingQuote`, `Title.raw`/`Quote.raw`, `components.TitleTarget`, `capstones.Wrap`, `glossary.Word`/`Extra` |
| `10a180e` | E-M14, E-M16, E-M19: `words.tab` (#hash, Segmented) + `ContentModel.wordsPageData`, `words.Row` data, search `dir="auto"` only for RTL, `make-sw.mjs --cache-first dir:ext` |
| `1a4e297` | Answer-text overrides for engine item types (`answerText`, beside `itemText`) |
| (app commit) | `capstones.dialogue.Icon` (the card icon when it differs from the header badge) |

E-M18 needed nothing new: Mandarin's checks (data files, dialogues and decks, placement sections,
item pinyin, HSK lint, stroke files and names, audio) run through `check.extra`; `data:check` stays
an app script.

### 8.2 What stayed in the app (`apps/mandarin`)

- `content/` and `public/` (audio, strokes, manifest, icons): byte-identical to the source
  (`diff -r` clean apart from the generated `sw.js`); same lesson, item and word ids.
- `lib/zh` (text, pinyin, sandhi, align, contour, ids, trace, syllables, and `audio.ts` for the
  `syl-` and sha1(normZh) keys), `lib/deck/schedule.ts`.
- `course/`: schema, types, adapter, item types (tone, pinyin, trace, build) and the core types'
  wording, text rules, speech, progress (key `mandarin-ladder:v1`, schema 1, deck and traces),
  content model and checks, item pinyin (`autopy`), HSK data, lesson and visual data, words data,
  lint, used characters.
- `components/`: zh (ZhText, ZhSentence, ZhInline, Ruby, Pinyin, WordSheet, PinyinInput,
  ToneOption, ComponentTiles, TracePad, deck), TraceCheck, strand cards, toggles, Grid, HskChip,
  About, plus `slots.tsx`, `check/slots.tsx` and `WordsRow.tsx`.
- `visuals/` (8 visuals and their data hook), `styles/theme.css` (generated: only the tokens that
  differ from core), `styles/mandarin.css` (fonts, `.zh`, tone colours, keyframes), the other
  hanzi classes as a Tailwind plugin, `i18n/overrides.ts` (159 own keys), fonts and scripts
  (data:*, fonts:*, strokes:extract, audio:list, audio:syllables; audio:ingest and content:check
  are core's).

### 8.3 Drift removed

Mandarin's modified copies of engine files were not carried over; core does what they did through
config. That covers CheckItemView, OptionPill, TileTray, TestRunner, PlacementRunner,
ClimbMoment, the ladder components, LessonPlayer, Prose, PairCard, PlayButton, ReadingView,
DialogueView, GlossaryChips, TirukanCard, Sentence, WordsView, SettingsView, ProgressProvider,
useSpeech, AppNav, Mark, tier.ts, VisualData, `lib/progress/*`, `lib/check/*`,
`lib/speech/{audio,speak}`, `lib/content/{load,visualData}`, `lib/i18n/*`, routes, basePath,
markup, tokens and globals CSS, the routes' logic, `serve.mjs`, `content-check.ts`, `audio-lib.ts`,
`audio-ingest.ts` and the place-scene drawing (core's `PlaceDrawing`). Also dropped: `UPSTREAM.md`.

### 8.4 Couldn't be made (fully) generic

- **Opaque course types at the boundary**, as for Arabic: app code casts core's `Rung`, `Lesson`
  and items to Mandarin's types where it reads its own fields. Mandarin rungs have no `cefr`;
  every place core reads it is replaced by `levelLabel`, `LevelChip` and `tierRange`.
- **`.zh` lives unlayered** in `mandarin.css`, not in the Tailwind plugin: plugin components sort
  before core's `.label`, and the source relied on `.zh` coming after it (a hanzi measure-word chip
  inside a mono label keeps normal spacing and case). No utility on a `.zh` element conflicts.
- **Font subsetting scans the app's UI folders** (`i18n`, `components`, `visuals`, `app`, and the
  voice sample in `course/speech.ts`), since the UI moved out of `lib/i18n` and `components/visuals`.
  The subset files are byte-identical to the source build's.

### 8.5 Behaviour differences from the live app (approved 2026-10-18)

1. **The service worker file changes once**: generated from the core template with the same cache
   name (`mandarin-ladder-v1.0.0`), precache list, audio route and stroke route. Only the comments
   and the prefix constant differ. Browsers install it as an update; nothing cached is lost.
2. **Option pills' `data-option` holds the label without markup** (the source kept the raw label).
   It is an attribute for tests only; nothing visible changes.

There are no visual differences.

### 8.6 Known issue kept for parity (D5)

The trace items' why lines in the feedback sheet show literal asterisks (`**横**`) because the source
renders them as plain text. Kept here so the migration is pixel-identical; it will be fixed on
`fix/mandarin-trace-markup` with an updated Mandarin baseline.

**Fixed on `fix/mandarin-trace-markup`:** a `check.WhyText` slot (core default: the plain string,
so English and Arabic are unchanged at 60/60 and 224/224) lets Mandarin draw `**term**`, `[[focus]]`
and `*italic*` in why lines, inline and in the feedback sheet; plain text renders as before. The
Mandarin baseline is updated for the 16 shots that show such a line: `lesson-dasar2-step4-correct`,
`lesson-easy1-step4-correct`, `test-result` and `climb` (over the results page), × 2 widths × 2 themes.

### 8.7 Results

| Gate | Result |
|---|---|
| English parity | **60/60, 0 differing pixels**, after every engine commit and at the end |
| Arabic parity | **224/224, 0 differing pixels**, after every engine commit and at the end |
| Mandarin parity vs the source build (`dd8f5fa`) | **212/212, 0 differing pixels**: every route, all six lesson steps + feedback sheet for Dasar 1, Dasar 2 (trace drawn along the medians) and Easy 1, placement item and result, test item, climb, results, review, My words, the deck tab, deck card front/back/done, 360/1280 × light/dark |
| Mandarin parity vs the **live site** with a learner's imported progress | **26/28 at 0 px** (home, rung Easy 1 and Dasar 2, the deck, My words, Saya, Settings). `imported-me` at 1280 differs by 22–27 px of antialiasing on two circle edges in the sidebar (the wordmark disc, one week-strip ring); see below |
| Live export import | `live-export.json` (placement 20/20, Easy 1 lesson 10 with a trace, the Dasar 2 reading, five deck reviews, settings) imports and exports back byte for byte (unit); the e2e imports it through Settings and shows the same continue card, "lewat cek" climbs, capstone date, lessons, My words and settings |
| Unit tests (root `npm run test`) | English + core 119 ✓, Arabic 347 ✓, Mandarin 912 ✓ (the source's 909, none dropped, + 3 live-import tests) |
| `content:check` | Mandarin 11 rungs, 38 lessons, 338 items, 0 errors, 14 warnings: identical to the source. `data:check` 0 errors |
| e2e | Mandarin 61 ✓ (the source's 60 unchanged + the live-import test) |
| Lint | all three clean |
| Byte checks | `content/` and `public/` identical to the source (bar `sw.js`); theme script identical; `audio:list` CSV identical (829 rows); subset fonts and `fonts-zh.css` identical file for file |

`imported-me__{light,dark}__1280`: three fresh captures of the **live site** differ among
themselves (one by 6 px), and the local build lands on a fourth antialiasing state on the same
two circle edges; text, layout and colours are identical. I kept the live captures as the
baseline. **Approved (2026-10-18)** as a sub-pixel rendering difference, as with Arabic's
`imported-me`. `not-found__dark__360` (1 px) and `rung-hard-3__dark__1280` are the known bistable
shots; both matched at 0 px in the previous full run.

### 8.8 What's left

1. Deploy (D2): create the deploy key on `mandarin-ladder`, the `MANDARIN_PAGES_DEPLOY_KEY`
   secret, push `docs/moved-to-monorepo` (README note, `workflow_dispatch` only; committed
   locally as `2c7ef48`), merge to main and run the first publish. **Then stop before switching
   `mandarin-ladder` Pages to `gh-pages`**, so you can check the live site right after.
2. Approve §8.5 and the `imported-me` antialiasing note above.
3. After merge: `fix/mandarin-trace-markup` (D5) with an updated Mandarin baseline.
