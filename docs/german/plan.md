# German Ladder — build plan

Branch `feat/german-ladder` (from `main` at `6c2f6b2`, with Spanish merged and live). Written after
reading `README.md`, `docs/DEPLOY.md`, `docs/ladder-core-report.md`, the Arabic and Mandarin migration
docs, the Japanese and Spanish plans and reviews, the three German spec files, and the code as it is
now (English, Arabic, Mandarin, Japanese and Spanish on `ladder-core`).

**Status: approved 2026-10-29, with all recommendations: G1–G4 (G5 only if needed); no core change for caps grading, spelling equivalences or milestone chips; Mandarin's mouth drawing moves to core; capital ẞ dropped from the glyph requirement (fonts stay `latin`); the Goethe lists for level tagging only; the `german-ladder` repo created at M9.**

---

## 1. The short version

German is Spanish's closest sibling, and most of what the spec asks for already exists. It's either in
core (two doors, placement, capstones, strand registry, Tirukan, item types with answer areas, grade
notes and grade context, AccentBar, decks, settings rows, level-chip and subtitle slots, `fixes.*`) or
in Spanish, ready to copy (typed answers, lenient notes, the accent bar wiring, the content-lint
pattern, the deck, the parity harness).

1. **Copy `apps/spanish`** to `apps/german`. Remove `lib/es`, the Spanish visuals and the content;
   keep the structure (course/, components/, lint, deck, audio list, tests, parity harness).
2. **Fewer core additions than the kickoff expects.** Capitalisation-sensitive grading and spelling
   equivalences (ae → ä) fit the grade-note channel Spanish added (C2), so they're German app code.
   Milestone chips fit the existing `LevelChip` slot. That leaves five small, generic core changes, all
   default off (§3).
3. **German-only:** `lib/de`, the four item types, seven visuals, the Bauhaus pattern, the Kerja card,
   the lint, the data and the content.

Every core change is gated on all **five** apps: English 60, Arabic 224, Mandarin 212, Japanese 196 and
Spanish 196 screenshots, plus all their unit tests. Each runs in its own worktree at its commit, as for
Spanish.

---

## 2. Reuse as-is

| Need (spec) | Where it is today | How German uses it |
|---|---|---|
| Course config, keys | `CourseConfig` | `german-ladder:v1`, prefix `german-ladder-`, export `german-ladder-progress` |
| Latin LTR text, titles, Sentence slot | core `Sentence`, `titles: 'target'`, Spanish's `SpanishSentence` / `EsLine` pattern | `de` lines with `lang="de"`; Tirukan stress underline from `lib/de` syllables |
| Two doors + Dasar line | `home.welcome: 'twoDoor'`, `firstRung`, `home.DoorNote` (Spanish C4) | Door 1 → Easy 1; "Mau latihan bunyi dulu? Mulai dari Dasar." |
| Placement by section | `placement.outcomes[].requires` (Spanish C3) | Dasar / Easy 1 / Easy 2 / Easy 3 sections, first under 75% |
| Typed answers, accent bar | core `AccentBar` + `input.accentKeys` (C1); Spanish `TypedInput` | keys ä ö ü ß Ä Ö Ü (a Shift key toggles case) |
| Lenient passes with a note | core grade notes + grade context (C2) | "Hampir: *schön* (dengan ö)", "Kata benda selalu huruf besar: *Tisch*"; `spellingStrict` setting |
| Level chip, tiers, subtitles | `ladder.LevelChip`, `tierRange`, `rungSubtitle`, `tiers` | "A1.1" chip plus a brass exit flag ("A1 · Goethe") when `rung.milestone` is set |
| Strand cards | `strands.examples` / `contrast` | Bunyi, Kerja, Ngobrol, Tirukan / Kata |
| Capstones | `features.capstones`, reading + dialogue | city, workplace and agency-office dialogues |
| Word deck | core decks + Spanish `decks.ts` | A1 deck: Dasar + Easy 1 + Easy 2 word lists, frequency-ordered |
| My words row | `words.Row`, `words.match`, tabs | article chip, plural, gender clue, an\|rufen, Perfekt form, audio |
| Recorded audio | `course.audio`, `audio:list`, `audio:ingest` | Dasar pairs and Tirukan; browser `de-DE` otherwise |
| Settings rows | `settings.rows` | `spellingStrict`, `caseColours`, deck rows |
| Place scene | core `PlaceDrawing` | base of WechselScene (two places to add, C4) |
| Parity, SW, icons, deploy | harness, `make-sw`, `make-icons`, option B job | `apps/german/tests/parity`, `deploy-german` |
| English Ladder fixes | `fixes.*` | **all on** |

---

## 3. Core additions (generic, behind config, default off)

One commit each, each gated on all five apps.

| # | Change | Surface | Why |
|---|---|---|---|
| **G1** | **Linked focus**: a course may allow more than one `[[focus]]` in a line when it validates them. `content:check` asks the course instead of erroring on any second mark | `ContentModel.check.focus?(text, count) → string \| null` (an error message, or null for OK). Default: today's "more than one" error | The verbal bracket (*Ich **stehe** um 6 Uhr **auf***); German's lint confirms that the two marks form a bracket |
| **G2** | **Climb slots get the rung**: `climb.Extra` and `climb.Badge` receive `{ rung }` | prop added; existing slots ignore it | "A1 selesai. Ini level ujian Goethe A1." on exit rungs only |
| **G3** | **Mouth drawing in core**: Mandarin's mouth section (palate, tongue, lips) moves to core as `MouthDrawing` with a place highlight and a lip-rounding option; Mandarin's MouthPlaces moves onto it | `components/visuals/mouth/MouthDrawing` | DESIGN §7.1 "the shared mouth section". Today it lives in `apps/mandarin`. Same pattern as the shelf (C8) and the place drawing |
| **G4** | **Two more places in `PlaceDrawing`**, opt-in: *above* (über: over, not touching) and *between* (zwischen: a second box) | `PlaceDrawing places?` (default: today's six) | Wechselpräpositionen uses eight places |
| **G5** | **A course class on target text**, for German hyphenation | `target.textClass?` added to core `Sentence` and `TargetText` (default: none) | `hyphens: auto` on German text (PRD §9). A plain `[lang="de"]` CSS rule in the app may be enough, in which case G5 is dropped. I'll try that first |

**Not needed in core** (the kickoff expected them):
- **Capitalisation-sensitive grading** and **spelling equivalences**: `lib/de/normDe` returns notes, and German's item types return them through C2's `GradeResult`. Core engine items (choice, gap) compare exact option strings, so they need nothing.
- **Milestone chips**: `LevelChip` already renders whatever the course draws.
- **Variety strands**: German has no variety strand in v1 (DACH recognition is Medium 2).

**Deferred, as for Spanish:** the explanation fade id → mixed → de (C5 from the Spanish plan). Core
sections are `concept.id/en` only, and the fade starts at Medium 2. In v1, explanations follow the UI
language (`lesson.explain: 'ui'`).

---

## 4. German-only (`apps/german`)

- **`lib/de/`**: `normDe` (digraph and umlaut leniency with notes, noun capitals), `capsCheck`, `article`
  (der/ein/kein/possessives × gender × number × case), `pronoun`, `adjEnding` (for later rungs, tested
  now), `conjugate` (present with stem-vowel changes, imperative, Perfekt, Präteritum, Konjunktiv II;
  irregular cells from `verbs.yaml`), `separate`, `bracket` (zones and validity), `genderClue`,
  `compound`, `syllabify`, plus a form index for the lint.
- **Item types**: `gender`, `case`, `wordorder` (bracket zones, any valid order accepted), `wechsel`;
  Spanish's `form`, `conjugate` and `dictation` adapted.
- **Visuals**: MouthPlacesDe (on G3), GenderTiles, CaseMachine, VerbBracket, WechselScene (on G4, with a
  motion arc), CompoundBuilder, DayPlanner.
- **Components**: Bauhaus board pattern, gender chips (square der, circle die, triangle das), case labels
  and colours (`caseColours` setting → `data-case-colours` on `<html>`), Kerja card, exit chip, About.
- **Data**: `nouns.yaml` (gender, plural, pattern, clue, compound parts), `verbs.yaml`, `grammar.yaml`
  (Profile Deutsch levels), `bridges.yaml` (Indonesian ← Dutch ↔ German), word lists per rung,
  `vendor/` frequency list with `SOURCE.md`.
- **Lint**: inventory detectors (dative before Easy 2 L6 except chunks, Perfekt before L11, verb-final
  clauses, genitive/K II/relatives, passive, attributive adjective endings), article–noun agreement and
  case, verb position (finite verb in 2; separable prefix at the end; a warning on drafts), conjugation
  match, spelling (ß, noun capitals, „…"), bracket-focus validity (through G1), soft-hyphen suggestions
  for words over 16 letters, register, bridges, reviewer fields incl. `review.work_by` for Kerja at B1+.

---

## 5. Where the spec and the code disagree

| # | Spec says | Code today | Proposed resolution |
|---|---|---|---|
| R1 | CLAUDE §2.5: caps-sensitive grading and spelling equivalences in core | Core has the grade-note channel and grade context (C2); folding and equivalences live in the course (`lib/es`) | German app code over C2 (§3). No core change |
| R2 | Milestone chip as a core "milestone field" | `Rung` is opaque to core; `LevelChip` draws course fields | `milestone` in German's rung schema; German's `LevelChip` draws "A1.1" plus the brass flag. No core change |
| R3 | Two `[[focus]]` marks for a bracket; "core may need a linked focus option" | `content:check` errors on a second mark; core `Sentence` already renders each mark as its own focus span (one note) | G1 (a course validation hook). Rendering needs nothing |
| R4 | "The shared mouth drawing" (DESIGN §7.1, CLAUDE §5.5) | Mandarin and Arabic each draw their own | G3: promote Mandarin's drawing to core, Mandarin moves onto it with parity |
| R5 | Wechselpräpositionen with eight places (über, zwischen) | `PlaceDrawing` has six | G4, opt-in |
| R6 | Climb line names the milestone on exit rungs | `climb.Extra` gets no props | G2 |
| R7 | Explanation fade id → mixed → de, Penjelasan ID/DE toggle at Medium 2–3 | Sections `id/en` only | Deferred to Medium 2; v1 `explain: 'ui'` (as Spanish) |
| R8 | Glyphs: ä ö ü ß **ẞ** „ " ‚ ' » « in all faces | Spanish dropped `latin-ext` for speed; **ẞ (U+1E9E) is only in `latin-ext`** | Keep `latin` and drop ẞ from the glyph requirement: content never uses capital ẞ (Germany standard writes STRASSE or Straße), and the lint forbids it. Or load `latin-ext` for the display and body faces and accept heavier fonts (Spanish measured about −8 Lighthouse points). I recommend the first |
| R9 | Deck from the Goethe A1 list "only if their terms allow reuse" | — | The Goethe word lists are © Goethe-Institut and published for learners, with no reuse licence. **Use them for level tagging only, never shipped or copied.** Deck words are authored per rung and ordered by the hermitdave/FrequencyWords German list (CC BY-SA 4.0), as Spanish. You confirm (human task) |
| R10 | `caseColours: 'rung' \| 'on' \| 'off'` as a root attribute | Core settings rows store values; the theme script mirrors only numeric sizes | A settings row plus a small effect in German's providers sets `data-case-colours` (it applies after hydration, and only visuals and feedback use it, so there's no flash on lesson text) |
| R11 | `hyphens: auto` on German text | No course class on core text | Try an app CSS rule on `[lang="de"]` first (core already sets `lang`); G5 only if a core element misses it |
| R12 | Easy 2 test "mirrors Goethe A1 skills" | Items are ours | Listening, reading-a-notice and form-filling items written from scratch; never Goethe material |
| R13 | "Start from apps/spanish … keep the PlaceScene drawing" | The drawing is core's | Nothing to keep in the app; WechselScene uses core `PlaceDrawing` |
| R14 | Deploy target `german-ladder` "created, empty" | **`andifathulms/german-ladder` doesn't exist** (checked 2026-10-29) | I create it at M9 if you want (as I did for Spanish), set the key and secret, and stop before the first publish |
| R15 | Parity "all five" | Harnesses exist for all five | Each core commit gated in its own worktree (as Spanish C1–C3); the known bistable sidebar shots stay as listed in the Spanish reviews |
| R16 | Lighthouse ≥ 95 | Spanish reached 88–99 with lighter fonts | Same font choices from the start (`latin`, Newsreader without its optical-size axis, display and mono not preloaded) |

---

## 6. Milestones (adjusted)

Each ends with tests passing and every gate green. Commits are small, on `feat/german-ladder`.
**Stops for your review after M4, M6 and M9.**

| M | Contents | Core |
|---|---|---|
| **M0 Scaffold** | Copy `apps/spanish` → `apps/german`; strip Spanish; config (all `fixes.*` on, `explain: 'ui'`), theme (DESIGN §3 incl. gender and case tokens), manifest and icons on `#17464F`, brand, About, ten-rung curriculum with milestones (all `soon`), root scripts and CI | — |
| **M1 `lib/de` and data** | `lib/de` with the §6 tests (article and pronoun tables, every verb, `separate`, `bracket` on 150 sentences, `genderClue` on 200 nouns, `compound`, `normDe`); `nouns.yaml`, `verbs.yaml`, `grammar.yaml`, `bridges.yaml`; frequency import and `SOURCE.md` | — |
| **M2 Content pipeline** | Schema, adapter, content model, lint (§4), one sample lesson | **G1** (linked focus) |
| **M3 Text and speech** | `normDe` text rules, `de-DE` voice scorer, Sentence slot (Tirukan stress), hyphenation, glyph test, long-compound layout check | (G5 only if needed) |
| **M4 Shell** | Bauhaus, two doors + Dasar line, Dasar tier, CEFR chips with exit flags, exit climb line, strand cards (Bunyi, Kerja, Kata, Ngobrol, Tirukan), My words row, deck tab, settings rows · **stop for review** | **G2** |
| **M5 Check engine** | `gender`, `case`, `wordorder` (bracket zones), `wechsel`; `form`/`conjugate`/`dictation` adapted; lenient notes (digraph, umlaut, caps); placement | — |
| **M6 Visuals** | MouthPlacesDe, GenderTiles, CaseMachine, VerbBracket, WechselScene, CompoundBuilder, DayPlanner; QA sheet `/visuals/` · **stop for review** | **G3** (Mandarin moves onto it), **G4** |
| **M7 Content** | Dasar 6, Easy 1 12, Easy 2 12 (drafts), test pools (Easy 2 mirroring A1 skills), placement, readings, dialogues, A1 word lists and deck | — |
| **M8 Audio** | Recording list (Dasar pairs about 50, Tirukan), keys, `SOURCE.md` | — |
| **M9 Polish and deploy** | Reduced motion, axe (both themes, case colours on and off), Lighthouse, DESIGN §13, German parity baseline; `deploy-german` job; repo, key and secret; **stop before the first publish** · **stop for review** | — |

Branch only; nothing is merged to `main`.

---

## 7. Things I need from you now

1. **Approve this plan**, especially:
   - G1–G4 (and G5 only if the CSS-only route fails) as the core changes
   - R1/R2: no core change for caps grading, equivalences or milestone chips
   - R3: G3 moves Mandarin's mouth drawing into core
2. **R8, ẞ:** drop capital ẞ from the glyph requirement and keep fonts light (recommended), or load
   `latin-ext`?
3. **R9:** the Goethe lists used for level tagging only, with deck words from our lists plus
   FrequencyWords. Is that right?
4. **R14:** shall I create `andifathulms/german-ladder` at M9, as for Spanish?

Human-only tasks are tracked in `docs/german/human-tasks.md`.
