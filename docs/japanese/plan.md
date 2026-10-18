# Japanese Ladder — build plan

Branch `feat/japanese-ladder`. Written after reading `README.md`, `docs/ladder-core-report.md`,
`docs/migrate-arabic.md`, `docs/migrate-mandarin.md`, `docs/DEPLOY.md`, the three Japanese spec
files, and the code as it is now (English, Arabic and Mandarin on `ladder-core`).

**Status: approved 2026-10-18, with all recommendations (R1–R23, C1–C8).**

---

## 1. The short version

The spec assumes Mandarin put ruby rendering, TracePad, the word deck and font subsetting **into
core**. It didn't: those live in `apps/mandarin`, written for Chinese. What *is* in core, and
Japanese can use as-is, is everything structural: two doors, placement, capstones, lesson
sessions, Tirukan, strand cards, item types with custom answer areas, the content adapter,
progress extensions, per-course audio keys, the `fixes.*` flags.

So the plan is:

1. Build `apps/japanese` the way `apps/mandarin` is built (course config, content model,
   adapter, slots), not by copying `apps/english`.
2. **Promote four Mandarin pieces into core, generically**, and move Mandarin onto them with
   parity at 0 px: strokes and tracing, the word deck, font subsetting, and the shelf drawing
   for the Counters visual.
3. Add a few small core slots Japanese needs: the done-screen badge (the 済 seal), extra
   Settings rows, more than one My words tab, and two chips on a ladder row (JLPT + JFT).
4. Everything Japanese (ruby markup, `lib/ja`, KanaInput, the visuals, content) stays in the app.

Every core change is gated by English 60/60, Arabic 224/224 and Mandarin 212/212 (plus their
imported shots) at 0 differing pixels, with all their tests passing.

---

## 2. What Japanese reuses from core as-is

| Need (spec) | Core today | How Japanese uses it |
|---|---|---|
| Course config, storage key, cache prefix, export name | `CourseConfig` | key `japanese-ladder:v1`, prefix `japanese-ladder-`, export `japanese-ladder-progress` |
| Two doors on the board | `home.welcome: 'twoDoor'`, `firstRung`, `Ornament` | first rung Kana 1; はしご ornament |
| Placement, outcomes, no climb moment | `placement { sections, outcomes, retakeRung, Wrap }` | 17+ → Easy 1 (climbs Kana 1, 2); 12+ → Kana 2 (climbs Kana 1); else Kana 1. Thresholds `{ easy1, kana2 }` |
| Kana rungs optional, climbable by placement | `Rung.optional`, `features.placement` | `optional: true` on both Kana rungs |
| Capstones (reading, dialogue) with done dates | `features.capstones`, `capstones.Wrap`, `fixes.capstoneDone` | Kana 2 reading; Easy 1 reading + dialogue |
| Lesson-scoped toggles and a provider round the step | `lesson.useSession` → `{ toggles, wrap, examplesIntro }` | Furigana / Romaji toggles, the romaji fade, the F hold hint |
| Strand card registry | `strands.examples` / `strands.contrast` | Bunyi, Kanji, Sopan, Kerja, Ngobrol, Tirukan / Kata |
| Tirukan | core `TirukanCard` + Sentence slot `'tirukan'` | MoraBeats mini drawn by the slot above the sentence |
| UI-first titles, title's target line | `titles: 'ui'`, `components.TitleTarget` | Japanese title with furigana |
| Target sentence rendering | `components.Sentence` (per use) | `JaSentence` |
| Course item types | `itemTypes` + `check.types[t].{Prompt, Option, Answer}` | `kana` (Answer: KanaInput), `mora`, `pitch` (Option), `form` (Option or Answer), `trace`, `build` |
| Answered rules in tests/placement | `ItemTypeLogic.answered` | empty KanaInput is not an answer |
| Grading rules | `text.{normalise, equals, tokenEquals, trimPunct}` | `normJa`; `kana` exact after normJa; `form` plain-or-kana |
| Item text/answer wording | `itemText`, `answerText` overrides | Indonesian wording, no spaces in Japanese |
| Level chip, tier range, rung subtitle, long notch bar | `adapter.rung.levelLabel`, `ladder.LevelChip`, `tierRange`, `RungSubtitle`, `longRung` | JLPT label; subtitles in Noto Sans JP; compact notches from 13 lessons (DESIGN §6.3: "more than 12") |
| Rung page extra (deck cards) | `ContentModel.rungData` → `ladder.RungExtra` | links to Kartu kata / Kartu kanji |
| Lesson data for slots | `ContentModel.lessonData` → `useLessonData` | words for tap-a-word, rung kanji, recent kanji, deck ids |
| Content post-parse | `ContentModel.postParse` | (if needed) derive readings from ruby |
| Progress state of its own | `progress.extensions` + `onCompleteLesson` | `deck`, `kanjiDeck`, `traces` |
| Recorded audio first, keys per course, no speech for some strings | `audio.{key, speechFallback, spoken}`, `audio:ingest` | key `sha1(normJa(toKana(text)))`; `kana-<kana>`; single kana and minimal pairs never spoken |
| Voice scorer, chunking, rate | `speech.*` | ja-JP neural first; split on 。！？ |
| Theme script, theme-color following the theme, target size | `buildThemeScript`, `themeColor`, `settings.targetSize` | `jaSize` → `data-ja-size` |
| SW from template with on-demand routes | `make-sw.mjs --cache-first` | audio + `strokes:.json` |
| English Ladder fixes | `fixes.*` | **all on** |
| Content check runner + hooks | `content-check.ts`, `check.lesson`/`extra` | readings vs JMdict, inventory, register, kanji ruby rules, review fields |
| Deploy to its own Pages | `deploy-arabic` / `deploy-mandarin` pattern | `deploy-japanese` with `JAPANESE_PAGES_DEPLOY_KEY` |

---

## 3. What core needs to gain (generic, behind config, default off)

Ordered by the milestone that needs them. Each is one commit, gated by all three apps' parity.

| # | Core change | Why | Mandarin |
|---|---|---|---|
| **C1** | **Font subsetting as a core script**: `scripts/fonts-subset.ts` (and `fonts-fetch.ts` with SHA-256 checks) taking the faces, family names, output folder and a `chars()` function from an app module | Spec §3, §7.6: "shared script in core" | Moves onto it; subset files must stay byte-identical (already checked file for file) |
| **C2** | **Done-screen badge and climb badge slots**: `lesson.DoneBadge`, `climb.Badge` | The 済 seal (DESIGN §6.9) | Unchanged (absent) |
| **C3** | **Extra Settings rows**: `settings.rows` (course components rendered in a given group) | Pitch marks, romaji in My words, deck daily count and card face (PRD §5.8) | Unchanged |
| **C4** | **My words tabs as a list**: `words.tabs[]` instead of one `words.tab` | Kata-kataku · Kartu kata · Kartu kanji | Moves to a one-item list; parity |
| **C5** | **Strokes and tracing in core**: `lib/strokes/trace.ts` (matching, thresholds from config, stroke-name classifier as a hook), `useStrokes`, `TracePad`, `StrokeOrder` + `PracticeGrid`, a `trace` item renderer | Spec §7.5 ("core TracePad and stroke format") | Moves onto them with its Chinese stroke names as its classifier; parity and its trace fixtures |
| **C6** | **Stroke format: centreline strokes**: `{ strokes, medians, kind?: 'outline' \| 'centreline' }`; centreline strokes draw with a stroke width instead of a fill | KanjiVG paths are centrelines (spec §7.5) | Unchanged (outline is the default) |
| **C7** | **Word decks in core**: `lib/deck/schedule.ts`, `DeckHome`/`DeckRunner` with a card slot, several named decks (each its own progress extension) | Kartu kata + Kartu kanji (PRD §5.7) | Moves onto it (its `DeckCard` becomes its card slot); parity incl. `imported-deck` |
| **C8** | **Shelf drawing in core** (like `PlaceDrawing`): Mandarin's MeasureWords shelf as a drawing component | Counters "uses the shelf from MeasureWords" (PRD §7) | MeasureWords moves onto it; parity |

The spec's other "core, add if missing" items already exist: the chip on ladder rows
(`ladder.LevelChip`; a component, so it can draw "N4" plus a brass "JFT"), and the strand card
registry.

---

## 4. What is Japanese-only (`apps/japanese`)

- `course.config.ts`, `course/` (schema, types, adapter, content model and checks, item types,
  text rules, speech, progress, words data, lint), `i18n/overrides.ts`, `styles/theme.css`,
  `styles/japanese.css`, a Tailwind plugin for the `.ja*` classes.
- `lib/ja/`: `parseRuby`, `toPlain`, `toKana`, `romajiToKana`, `kanaToRomaji`, hira↔kata,
  `morae`, `pitchPattern`, `normJa`, `counterReading`, `conjugate` (all hand-written, tested).
- Components: `JaSentence`, `Furigana`, `RomajiLine`, `PitchMarks`, `KanaInput`, `MoraOption`,
  `PitchOption`, `FormPrompt`, `KanjiDeckCard`, `Seal`, `Seigaiha`, `JlptChip`, strand cards,
  toggles, About, and the slots files.
- Visuals: KanaChart, KanaOrigins, MoraBeats (+ mini), PitchLine (+ mini), PlaceSceneJa (core
  `PlaceDrawing`), ParticleTrain, Counters (core shelf), StrokeOrder via core with KanjiVG data.
- Scripts: `data:import` (JMdict and KANJIDIC2 subsets, JLPT lists, pitch data), `data:check`,
  `strokes:extract` (KanjiVG → shared stroke JSON, centreline kind), `audio:list`; fonts through
  the core script (C1).
- Data: `content/data/{kana,counters,grammar,politeness,names}.yaml`, `content/data/vendor/`
  with `SOURCE.md`, `public/strokes/` (KanjiVG only), `public/audio/` with `SOURCE.md`.
- Klee One and Noto Sans JP in `fonts-src/` (fetched, not committed). Never Mandarin's fonts or
  stroke files.

---

## 5. Where the spec and the current code disagree

| # | Spec says | Code today | Proposed resolution |
|---|---|---|---|
| R1 | §2.2 "Copy `apps/english` to `apps/japanese`" | Arabic and Mandarin show the working pattern: a fresh app wired through `course.config.ts`, a content model, an adapter and slots | Scaffold like `apps/mandarin` (routes from core page factories, providers, configs). Copy nothing from English; reuse `PlaceDrawing` from core |
| R2 | §2.5, PRD §5, DESIGN §7: ruby, TracePad, decks, font subsetting are already in core "from Mandarin" | They're in `apps/mandarin`, Chinese-specific | Promote strokes/tracing, decks and font subsetting (C1, C5–C7) and move Mandarin onto them with parity. **Ruby stays per app**: the markup and rules differ (`{漢字|か|じ}` per-character readings vs Mandarin's word-aligned pinyin), so `JaSentence` is Japanese-only and plugs into the existing Sentence slot |
| R3 | §2.3 `target: { lang: 'ja' }` | `target` also needs `fontClass`, `sentenceClass`, `textAttrs`, `topicAttrs`; `shell.dir`, `titles` | `target: { lang: 'ja', dir: 'ltr', fontClass: 'font-ja', sentenceClass: '', textAttrs: { lang: 'en' }, topicAttrs: { lang: 'id' } }`, `shell.dir: 'ltr'`, `titles: 'ui'` (as Mandarin) |
| R4 | §7.1 `text` hooks "compare(a, b)" | `TextRules { normalise, tokenEquals, trimPunct, tokenise, equals? }` | `normalise = normJa`; `equals` per item (kana exact; `script: any` unifies scripts; `form` plain or kana); `tokenEquals` with normJa |
| R5 | §7.4 "Extra state: `capstones`, `placement`, `deck`, `kanjiDeck`, `traces`" | `capstones`/`placement` are core features; the rest are `progress.extensions` | `features: { capstones, placement }`; extensions `deck`, `kanjiDeck`, `traces` (stored after `opened`) |
| R6 | §7.7 recording key `sha1(normJa(kana))`; speech reads `kana` | Core plays the text it's given and keys it via `audio.key` | `audio.key = (t) => isKanaKey(t) ? t : sha1(normJa(toKana(t)))` and `audio.spoken = toKana`: the reading is derived from the ruby markup, so core components that play `line.text` (Tirukan, glossary chips, sentences) get the right key and the right speech. `content:check` verifies `toKana(ja) === kana` |
| R7 | §7.6 subset "to `public/fonts/` with generated `styles/fonts-ja.css`"; SW §7.9 precaches `fonts-ja.css` and the Klee One 400 subset | Mandarin subsets into `styles/fonts-zh/`; Next bundles them as hashed assets, cached on first use | Do as Mandarin (C1): `styles/fonts-ja/` + `styles/fonts-ja.css`, hashed by Next. The SW caches them on first use (cache-first `_next/static`). Precaching hashed names needs a build-time SW step; propose deferring to M10 if you want it |
| R8 | §5.4 `counters.yaml`, `grammar.yaml`, `politeness.yaml` authored | Fine | As written. The grammar list is authored by me as draft data and marked for the teacher's review |
| R9 | §5.6 JLPT list "vetted community list" | No source chosen | M1 proposes 1–2 candidates with licences in `SOURCE.md`; **you confirm** (human task) before decks ship |
| R10 | §5.6 pitch data "an open dataset" | No source chosen | M1 proposes a candidate whose licence allows redistribution; if none qualifies, pitch is omitted (spec allows "missing pitch shows nothing") |
| R11 | §7.5 "matching thresholds come from core config; kana hooks looser" | Mandarin's thresholds are constants in its `trace.ts` | C5 makes thresholds config, with a per-stroke tolerance hook Japanese uses for はね |
| R12 | §7.8 "Seal-style badge slot in the Done screen" | No slot | C2 |
| R13 | PRD §5.8 settings rows (pitch marks, romaji in My words, deck counts, card faces) | Core Settings renders core rows + one target size | C3. (Mandarin stores deck settings but shows no Settings rows for them, so it's unaffected) |
| R14 | PRD §5.7 three word tabs | `words.tab` supports one extra tab | C4 |
| R15 | DESIGN §6.3 "more than 12 notches compact" | `ladder.longRung.minLessons`, compact below 480px | `longRung: { minLessons: 13 }` (same 480px rule as Mandarin) |
| R16 | DESIGN §6.3 JFT chip in brass on Medium 1 | `LevelChip` is a component | Japanese `LevelChip` draws "N4" and, when `rung.jft`, a brass "JFT" |
| R17 | §4 `npm run build` = data:check → content:check → fonts:subset → strokes:extract → export | Mandarin runs `strokes:extract` by hand and commits `public/strokes` (CI has no source data) | Commit `public/strokes` (KanjiVG-derived, CC BY-SA 3.0 noted) and run `strokes:extract` by hand like Mandarin; `content:check` fails if a used character has no stroke file. CI then needs only the fonts |
| R18 | §7.8 "JaSentence's accessible name: text + full kana reading" | Fine | As written |
| R19 | Tirukan "with a MoraBeats mini over the sentence" | Sentence slot `'tirukan'` | Drawn in the slot, as Mandarin's tone contour |
| R20 | Hold a word or press **F** for furigana | Arabic (H) and Mandarin do this in app code | App code, in the session provider |
| R21 | PRD §5.5 Kana 1 has no capstones; Kana 2 a short kana reading | Capstones appear only when the file exists | Just the files |
| R22 | §10 build order puts all engine work implicitly in M0/M4 | Core work needs Mandarin parity gates | Engine changes are scheduled per milestone (below) |
| R23 | Kana 1 romaji fade by lesson number (§7.2) | Session hook knows the rung and step, not the lesson | `useSession` reads the lesson through `useLessonData` (lesson order and the kana it introduces) |

---

## 6. Milestones (adjusted)

Each ends with tests passing and all parity gates green. Stops for your review after **M4**,
**M8** and **M10**.

| M | Contents | Core changes |
|---|---|---|
| **M0 Scaffold** | `apps/japanese` built like Mandarin: configs, `package.json`, routes, providers, theme script, `course.config.ts` (all `fixes.*` on), `theme.css` (DESIGN §3), manifest and icons on `#2A2830`, brand strings, About shell, placeholder curriculum with all eleven rungs as `soon`; builds empty; lint, unit and e2e smoke; root scripts include Japanese | — |
| **M1 Data** | `data:import` from JMdict, KANJIDIC2, the JLPT lists (candidate), pitch data (candidate), KanjiVG; subsets in `content/data/vendor/` with `SOURCE.md` (licences, versions, spot checks); `data:check` | — |
| **M2 Japanese text** | `lib/ja/*` with the §9 tests; fonts (Klee One, Noto Sans JP) through the core subsetter; `JaSentence`, `Furigana`, `RomajiLine`; `data-ja-size` | **C1** (fonts script; Mandarin moves) |
| **M3 Content pipeline** | Schema (§5), adapter, content model, lint (§6: inventory, register, readings vs JMdict, ruby rules, reviewer fields, romaji never authored), curriculum with all eleven rungs, lesson-count and estimate checks | — |
| **M4 Shell** | Seigaiha, two doors, Kana tier, JLPT/JFT chips, capstone wiring, toggles and the romaji fade, strand cards (Bunyi, Kanji, Sopan, Kerja, Kata, Ngobrol), Tirukan with MoraBeats mini, Seal on the Done screen and the climb, Settings rows, three My words tabs (decks empty) · **stop for review** | **C2, C3, C4** |
| **M5 Check engine** | `kana` (KanaInput), `mora`, `pitch`, `form`; placement wiring and its content rules | — (existing item-type hooks) |
| **M6 Strokes** | `strokes:extract` from KanjiVG (centreline kind); StrokeOrder, TracePad and `trace` items from core with Japanese data; 20 kana + 20 kanji trace fixtures; spot checks 必 右 左 生 | **C5, C6** (Mandarin moves onto core strokes) |
| **M7 Audio** | `kana-<kana>` keys, ja-JP fallback rules, manifest, `audio:list`, SW routes; `public/audio/SOURCE.md`. Recordings themselves are a human task; until then kana play buttons hide (spec) | — |
| **M8 Kana** | KanaChart, KanaOrigins, MoraBeats, PitchLine; 20 draft lessons; two test pools (28 each, draw 14, pass 11); placement pool (20); Kana 2 reading · **stop for review** (v1.0-kana needs the teacher and recordings) | — |
| **M9 Easy 1** | ParticleTrain, PlaceSceneJa, Counters; 16 draft lessons, test pool (40, draw 20, pass 15), reading, dialogue; word and kanji decks with KanjiDeckCard and its tracing card | **C7, C8** (Mandarin moves onto core decks and shelf) |
| **M10 Polish + deploy** | Delight list, reduced motion, axe (both themes, 140% Japanese), Lighthouse ≥ 95 mobile, DESIGN §14 checklist; `deploy-japanese` job, deploy key and secret; **stop before the first publish** · **stop for review** | — |

Branch only; nothing is merged to `main` (the first publish runs from `main`, so it can't happen
by accident).

---

## 7. Things I need from you now

1. **Approve this plan**, especially R2 (promote strokes, decks, fonts and the shelf into core
   and move Mandarin onto them) and R7 (fonts handled as Mandarin does).
2. Anything in §5 you'd resolve differently.

Human-only tasks are tracked in `docs/japanese/human-tasks.md`.
