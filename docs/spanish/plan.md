# Spanish Ladder — build plan

Branch `feat/spanish-ladder`. Written after reading `README.md`, `docs/DEPLOY.md`,
`docs/ladder-core-report.md`, `docs/migrate-arabic.md`, `docs/migrate-mandarin.md`, the Japanese plan,
M8 review and human tasks, the three Spanish spec files, and the code as it is on `main` (`75487ba`:
English, Arabic, Mandarin and Japanese on `ladder-core`, Japanese's C1–C8 merged).

**Status: draft, waiting for approval.**

---

## 1. The short version

Spanish needs less from core than any sibling. Nearly everything the spec asks for already exists
behind config: content model and adapter, two doors, placement, capstones, strand-card registry,
Tirukan, course item types with their own answer areas, recorded-audio-first playback with
varieties, decks, Settings rows, My words rows and tabs, level chips, tiers, `fixes.*`.

So the plan is:

1. **Copy `apps/english`** for the Latin-script shell: fonts, layout, theme script, target-first
   titles, core `Sentence`. Then **add what English never had**, wired the way Japanese does it:
   placement and talk routes, `course/{types,items}.ts`, `components/slots.tsx`,
   `components/check/slots.tsx`, progress features and extensions.
2. **Four small core additions**, generic and default off (§3): AccentBar, grade notes for
   lenient-accent answers, section-based placement outcomes, and a note under the first door.
3. **No core variety strand.** Core already has varieties (§5, R6). The España card is a strand
   card in the app, like Arabic's Mesir card.
4. **Spanish lives in the app**: `lib/es`, the five item types, seven visuals, Azulejo, lint and
   content.

**First step, before any core change: a parity baseline for Japanese.** Japanese has no parity
harness today (`tests/parity/verify.mjs` knows only English, Arabic and Mandarin), so "all four
apps match" can't be checked yet. P0 adds one (§6).

---

## 2. What Spanish reuses from core as-is

| Need (spec) | Core today | How Spanish uses it |
|---|---|---|
| Course config, keys | `CourseConfig` | `spanish-ladder:v1`, prefix `spanish-ladder-`, export `spanish-ladder-progress`, SW `v0.1.0` |
| Latin LTR text | `target`, `shell`, core `Sentence`, `titles: 'target'` | `target: { lang: 'es-419', dir: 'ltr', fontClass: '', sentenceClass: '' }`. Spanish title leads and Indonesian sits below, as in English |
| Two doors | `home.welcome: 'twoDoor'`, `firstRung`, `Ornament` | door 1 → Easy 1 (Dasar is `optional`); *escalera* ornament |
| Placement, "lewat cek", no climb moment | `placement { sections, outcomes, retakeRung }`, `features.placement` | sections `dasar, easy1, easy2, easy3`. Outcome rule needs C3 |
| Optional Dasar rung, tier order | `Rung.optional`, `ladder.tiers` | `tiers: ['hard', 'medium', 'easy', 'dasar']` |
| CEFR/DELE chip, tier range | `ladder.LevelChip`, `tierRange` | "A1 · DELE"; Dasar shows "Pra-A1" |
| Capstones (reading, dialogue) | `features.capstones`, `capstones.dialogue.{tagKey, Badge, edgeClass}` | Easy 1 and 2: reading and dialogue; a Spain-set dialogue carries the España chip and edge (R7) |
| Strand cards | `strands.examples` / `strands.contrast` | Bunyi, España, Ngobrol, Tirukan / Kata |
| Tirukan | core `TirukanCard` + Sentence use `'tirukan'` | Sentence slot adds the light stress underline (from `syllabify`/`stressOf`) |
| Course item types, typed answers | `itemTypes`, `check.types[t].{Prompt, Answer, Option}`, `ItemTypeLogic.answered` | `form`, `conjugate`, `agree`, `dictation`, `stress`. A `form` item with `options` gets pills automatically |
| Grading hooks | `text.{normalise, equals, tokenEquals, trimPunct}` | `normEs` (case, ¿ ¡, trailing punctuation) |
| Varieties in speech and audio | `TargetText variety`, `ListenItem.variety`, `usePlay(text, variety)`, `VoiceScorer(voice, settings, variety)`, `audio.{key, defaultVariety}` | variety `latam` (default) / `es`; the scorer also reads `settings.variety` |
| Recorded audio first | `audio`, manifest, `audio:ingest`, SW audio route | Dasar pairs, stress pairs, Tirukan; everything else browser voice |
| Settings rows | `settings.rows` | `variety` (Amerika Latin / Spanyol), `accentStrict` (rung / always), `deckDaily`, `deckFace` |
| Word deck | core decks (`DeckHome`, `DeckRunner`, `lib/deck`) + `words.tabs` | Kartu kata (A1) |
| My words row | `words.Row`, `words.match` | gender chip, plural, España form, play, "lihat konjugasi" sheet |
| Lesson data for slots | `ContentModel.lessonData` / `visualData` / `postParse` | verb data for grids, glossary genders, per-item accent mode stamped at build |
| Place scene | core `PlaceDrawing` (in, on, under, next to, behind, in front of) | PlaceSceneEs maps to en / sobre / debajo de / al lado de / detrás de / delante de |
| Theme colour, contrast | `themeColor`, `fixes.themeColorFollowsTheme` | `#F6F1E7` / `#15120F`; contrast test as Arabic's `tokens.test` |
| SW, icons | `make-sw.mjs`, `make-icons.mjs '#7D3B24'` | precache shell, `rung/dasar/`, `rung/easy-1/`, `rung/easy-2/`, `placement/`, `words/` |
| Content check | runner + `check.extra` | inventory, lexicon, conjugation, agreement, accents, variety, bridges, reviewers |
| English Ladder fixes | `fixes.*` | **all on** |

---

## 3. Core additions (generic, behind config, default off)

Each is one commit. After each one, parity for all four apps must stay at 0 px, and all their tests
must pass.

| # | Core change | Config surface | Why |
|---|---|---|---|
| **C1** | **AccentBar**: a row of keys under a text input that inserts at the selection (native value setter + `input` event, so React inputs update), keeps focus, has an accessible name per key ("a dengan aksen") and 34px keys in `--paper-2`. Plus an `insertAtCursor` helper | `input.accentKeys?: { char: string; labelKey: string }[]`. Core doesn't render it anywhere by default; course Answer components render it | CLAUDE §5.3. Any Latin-script course with diacritics can use it (Portuguese, French, Vietnamese) |
| **C2** | **Grade notes and grade context**. `ItemTypeLogic.grade` may return `{ correct, note? }` as well as a boolean. `grade()` passes the note through. Feedback sheets (lesson, review) show a muted note line from a string key. Test results show the accepted spelling. `grade` also gets `{ settings }`, so a course can apply a setting such as "always strict". Plus generic `lib/text/marks.ts`: `foldMarks(s, keep)` and `onlyMarksDiffer(a, b, keep)` | `ItemTypeLogic.grade(item, r, text, ctx)`; a note is `{ key, params }` | CLAUDE §5.2 (`{ correct: true, note: 'accent' }`). Core grading returns only `{ correct }` today, and the sheet shows only `why` |
| **C3** | **Section-based placement outcomes**: `PlacementOutcome.requires?: { section: string; min: number }[]`. The first outcome whose requirements are all met wins, and `threshold` still works. Placement stays a single score total | outcomes in config | PRD §5.2: "the first rung where they score under 75%". Core can only threshold the total |
| **C4** | **Door note**: an optional line with a link under door 1 | `home.DoorNote?: ComponentType` | PRD §5.1: "Mau latihan bunyi dulu? Mulai dari Dasar." |

**Deferred (not v1):** **C5, more explanation languages.** Core sections are fixed to
`concept.id/en` and `contrast.id/en`. `mixed` means English with Indonesian collapsed, and strand
cards take `cardLang: 'id' | 'en'`. Spanish's id → mixed → es fade only begins at Medium 2, which is
`soon` in v1. When Medium 2 is written, make section languages come from `explainLangs`
(`concept.es`), let `mixed` mean "the target-language explanation with Indonesian collapsed", and
show the pill only on rungs whose `explain_lang` isn't `id`.

---

## 4. Spanish-only (`apps/spanish`)

- `course.config.ts`, and in `course/`: schema (`es`, `es_es`, `id`, `en`; glossary `gender`,
  `plural`, `pos`, `forms`, `verb`, `bridge`; `review { by, date, es_by }`), types, adapter, content
  model and checks, item types, text, speech, progress, words data, lint.
- `lib/es/`: `normEs`, `accentDiff`, `syllabify`, `stressOf`, `needsAccent`, `conjugate`,
  `agreeAdj`, `article`, plus a form index (every generated form → verb, tense, person) for the
  lint. All pure, tested against `verbs.yaml`.
- Components: Spanish text input (with C1 AccentBar), `form`, `conjugate`, `agree`, `dictation` and
  `stress` answer areas, GenderChip, EsChip, the strand cards (Bunyi, España, Kata, Ngobrol,
  Tirukan), DeleChip, Azulejo, About, WordsRow and the conjugation sheet, and `slots.tsx` and
  `check/slots.tsx`.
- Visuals: StressMap, Agreement, SerEstar, ConjugationGrid, GustarFlip, PlaceSceneEs (on core
  `PlaceDrawing`), RoutineClock.
- Data: `content/data/{grammar,verbs,bridges,names}.yaml`, word lists per rung,
  `content/data/vendor/` with `SOURCE.md`, and `public/audio/` with `SOURCE.md`.
- Scripts: `data:import` (frequency list → level-tagged candidates), `audio:list`. `audio:ingest`
  and `content:check` come from core.
- Styles: `theme.css` (DESIGN §3 plus `--dasar*`, `--masc`, `--fem`, `--es*`) and a Tailwind
  `extend`.
- Tests: `lib/es`, content, component, glyph coverage, contrast, e2e and axe, and a parity
  harness of its own once the shell exists.

---

## 5. Where the spec and the code disagree

| # | Spec says | Code today | Proposed resolution |
|---|---|---|---|
| R1 | §2.2 Start from `apps/english` | English is the thinnest app: no placement or talk routes, no capstones, item types, slots or audio. Its content model, lint and strands are English-shaped | Copy English for the shell (fonts, layout, `themeScript`, titles, core `Sentence`, config skeleton). Add placement and talk routes from the core page factories, and the course/slots layout Japanese uses. Delete English's content, visuals, lint and strand cards. **Don't** keep English's `PlaceScene`: core `PlaceDrawing` already is "the drawing" |
| R2 | Content fields `es` / `es_es` / `id` / `en`; titles `{ id, en, es }` | Core is field-agnostic through the adapter. Only `Bilingual` (why, sections) is `id`/`en` | Spanish schema and adapter. `why` and prose stay `id`/`en` |
| R3 | Explanation fade id → mixed → es; ID/ES toggle at Medium 2–3 | Sections are `id`/`en` only (see C5) | **v1: `lesson.explain: 'ui'`, `explainLangs: []`** (as Arabic and Japanese): explanations follow the UI language. Every live rung is `id` anyway. Curriculum keeps `explain_lang` for every rung. C5 comes with Medium 2 |
| R4 | §5.3 AccentBar is "shown under every text input" | Core has no text input of its own (typed answers are course Answer components). My words search is core's | C1 provides the component; Spanish inputs render it. My words search folds accents through `words.match`, so it doesn't need the bar |
| R5 | §5.2 lenient pass returns `{ correct: true, note: 'accent' }` | `grade()` returns `{ correct }`; no note line in the sheet; grading can't see settings | C2. Accent mode per item: `accents` if authored, else the rung default (lenient before Easy 3), stamped at build by `postParse`; `accentStrict: 'always'` read from the grade context. `stress` is always strict |
| R6 | §2.5 "a `variety` strand mechanism, if Arabic's Egyptian card isn't already generic" | Arabic's Mesir card is app code, but the **mechanism is in core**: per-line variety in TargetText, listen items, `usePlay`, the voice scorer and audio keys, plus dialogue tag, badge and edge | **No core change.** España is an app strand card. `es_es` lines play with variety `es` → es-ES voice and `lang="es-ES"` |
| R7 | PRD §5.5 Easy 2 has a Latin American dialogue **and** a Spain-set one | Core capstones: one dialogue per rung | **Easy 1** dialogue set in Latin America; **Easy 2** dialogue set in Madrid with variety `es` (España chip and `--es` edge through `capstones.dialogue`). Each rung has one dialogue, as now. If you want both at Easy 2, that's a core change (dialogues as a list). I'd rather not |
| R8 | PRD §5.2 placement places at "the first rung under 75%", sections include Easy 3 | Core thresholds the total | C3. Outcomes: Dasar < 75% → **Dasar**. Else Easy 1 < 75% → **Easy 1** (climbs Dasar). Else Easy 2 < 75% → **Easy 2** (climbs Dasar, Easy 1). Else → **Easy 2** with Easy 1 and Dasar climbed, and Easy 2 *not* climbed: Easy 3 is `soon`, so the learner takes the Easy 2 test to climb it. The Easy 3 section keeps its data for v1.1 |
| R9 | §3.3 `accents` default lenient before Easy 3, strict after | No rung-level grading data | `postParse` stamps it (R5). Strict mode in v1 is only reachable through the setting |
| R10 | §3.4 "Hunspell-style accent rules" | No dictionary | Accent lint uses the authored lexicon and word lists (with accents) plus `needsAccent`. A word whose folded form matches a listed word but whose accents differ is an error. The *qué/que, él/el, tú/tu, sí/si, mí/mi, más, sé, dé* pairs are checked where the context is clear (after ¿/¡, before a verb). No Hunspell dependency. I can add LibreOffice's es dictionaries (MPL/LGPL/GPL) as a build-time-only check later if you want it |
| R11 | §4.4 "Conjugations must match `lib/es` + `verbs.yaml`" | — | Lint builds a form index from the library. A token that isn't a known word but folds to, or is one edit from, a form of a glossary verb is an error. A form whose tense is outside the inventory (past before Easy 3, subjunctive before Medium 2, produced vosotros before Hard 2, *se lo* before Medium 1) is an error. Ambiguous forms (*hablamos*, *como*) count as their earliest-taught reading. `es_es` lines may show vosotros |
| R12 | §5.3 Agreement lint on simple noun phrases | — | Article + noun (+ adjective) windows, gender and number from the glossary and lexicon, with *el agua* handled by the lexicon flag. Only phrases where every word is known are checked |
| R13 | §3.4 frequency list from "an openly licensed corpus" | No source chosen | M1 proposes **hermitdave/FrequencyWords** (OpenSubtitles 2018, es 50k; content CC BY-SA 4.0), level tags marked as estimates. **You confirm** (human task). PCIC is © Instituto Cervantes: grammar ids cite PCIC section numbers and no PCIC text is copied |
| R14 | §3.4 verb reference data | — | `verbs.yaml` is authored (draft, for the teacher's review). No vendor verb data is shipped; if you'd like a cross-check source I'll propose one with its licence in `SOURCE.md` |
| R15 | DESIGN §4 fonts must cover á–ú, ñ, ü, ¿ ¡ « » | English loads Newsreader and Plex Mono with the `latin` subset, which already covers all of them (U+00A0–00FF) | Add `latin-ext` as DESIGN asks. Glyph test as Arabic's `fonts.spec` (`document.fonts.check` for each face) plus a unit test on the local Atkinson files' cmap |
| R16 | §2.6 / §6 parity for all four apps | Japanese has no parity harness or baseline | **P0**: Japanese capture harness and baseline from `main` before any core change, added to `verify.mjs` and `test:parity`. Known bistable shots (Mandarin `imported-me` 1280, approved 2026-10-18) keep their approval |
| R17 | §7 build order puts all core work in M3 | Core changes are easier to gate where they're used | C4 in M4 (shell), C1–C3 in M5 (check engine). M3 is then the content pipeline only |
| R18 | DESIGN §11 `lang="es"` with `es-419` / `es-ES` | `target.lang` is one value | `target.lang: 'es-419'`; España rows and `es_es` lines set `es-ES` in the app's components |
| R19 | PRD §5.4 "long-press on mobile keyboards" | OS behaviour | Nothing to build; the bar is the guaranteed path |
| R20 | `en` (Spanish *en*) spans in and on | `PlaceDrawing` has six places | PlaceSceneEs labels *in* and *on* honestly: *en* for inside, *sobre* (or *en*) for on. The note says *en* covers both. Content and teacher detail, not code |
| R21 | CLAUDE §2.3 "ladder chip = CEFR/DELE" | `LevelChip` | `DeleChip`: "A1 · DELE"; "Pra-A1" for Dasar (no DELE) |

---

## 6. Milestones (adjusted)

Each ends with tests passing and all parity gates green. Commits are small, on
`feat/spanish-ladder`. **Stops for your review after M4, M6 and M9.**

| M | Contents | Core |
|---|---|---|
| **P0 Japanese parity** | `apps/japanese/tests/parity/capture.mjs` (fresh routes, seeded learner, lesson steps for a Kana and an Easy 1 lesson with feedback, placement, test and climb, decks), baseline from `main`, entry in `verify.mjs`, `test:parity` runs all four. Re-verify English, Arabic and Mandarin on `main` | — |
| **M0 Scaffold** | Copy `apps/english` → `apps/spanish`; strip content, visuals, lint and strands; package `spanish-ladder`; `course.config.ts` (all `fixes.*` on, `explain: 'ui'`); `theme.css` (DESIGN §3), Tailwind extend, manifest and icons on `#7D3B24`, brand strings, About shell; placement and talk routes; placeholder curriculum with all ten rungs `soon`; root scripts include Spanish; lint, unit and e2e smoke | — |
| **M1 `lib/es` and data** | `lib/es` with the §6 tests (syllabify on 200 words, stress on 150, conjugate on every verb in `verbs.yaml`, `agreeAdj`, `article`, `normEs`); `verbs.yaml`; `grammar.yaml` with PCIC section ids; `bridges.yaml`; frequency-list import, word lists, `vendor/SOURCE.md` | — |
| **M2 Content pipeline** | Schema, adapter, content model, `postParse` (accent mode), lint (inventory, lexicon, conjugation, agreement, accents, variety separation, bridges only from `bridges.yaml`, register, reviewer fields incl. `es_by`, sizes, unique ids); curriculum with ten rungs (`tier`, `cefr`, `dele`, `explain_lang`, `lessons`, `words_target`, `inventory`); one sample lesson | — |
| **M3 Text and speech** | `normEs` text rules, voice scorer (es-MX > es-US > es-419 > es-* except es-ES; es-ES for variety `es`), Sentence slot with Tirukan stress underline, glyph tests, `variety` and `accentStrict` settings rows | — |
| **M4 Shell** | Azulejo, two doors + Dasar note, Dasar tier, DELE chips, strand cards (Bunyi, España, Kata, Ngobrol, Tirukan), capstone wiring, climb moment line, My words row, deck tab (empty) · **stop for review** | **C4** |
| **M5 Check engine** | Text input + AccentBar; `form`, `conjugate`, `agree`, `dictation`, `stress`; lenient-accent note; placement (sections, outcomes, content rules) | **C1, C2, C3** |
| **M6 Visuals** | StressMap, Agreement, SerEstar, ConjugationGrid (+ My words sheet), GustarFlip, PlaceSceneEs, RoutineClock; `ripple`, `boot` and `sweep` motion with reduced-motion fallbacks; component tests · **stop for review** | — |
| **M7 Content** | Dasar (6), Easy 1 (12), Easy 2 (12) as drafts; test pools (Dasar 18 → 10/8; Easy 36 → 16/12); placement pool (24); readings and dialogues; A1 deck. Every form from `lib/es`; `content:check` 0 errors | — |
| **M8 Audio** | Recording keys and manifest for Dasar pairs, stress pairs and Tirukan; `audio:list`; `public/audio/SOURCE.md`; browser fallback until recordings exist | — |
| **M9 Polish and deploy** | Reduced motion, axe on all routes in both themes, Lighthouse ≥ 95 mobile, DESIGN §13 checklist, Spanish parity baseline; `deploy-spanish` job (`NEXT_PUBLIC_BASE_PATH=/spanish-ladder`, push to `andifathulms/spanish-ladder` `gh-pages`), deploy key and `SPANISH_PAGES_DEPLOY_KEY` secret, `docs/DEPLOY.md` · **stop before the first publish and for review** | — |

Nothing is merged to `main`. The first publish runs from `main`, so it can't happen by accident.

**Deploy key.** You asked me to set up the key and the secret. I'll do it with `gh` (deploy key with
write access on `spanish-ladder`, secret here) if my token has the rights. If it doesn't, it stays
on the human-tasks list with the commands.

---

## 7. Things I need from you now

1. **Approve this plan**, especially:
   - **C1–C4** as the only core changes, with C5 (explanation languages) deferred to Medium 2
   - **R3**: explanations follow the UI language in v1
   - **R7**: one dialogue per rung, with Easy 2's set in Madrid
   - **R8**: how placement behaves when someone passes everything while Easy 3 is still `soon`
   - **R13**: the frequency-list candidate
2. Anything in §5 you'd resolve differently.

Human-only tasks are tracked in `docs/spanish/human-tasks.md`.
