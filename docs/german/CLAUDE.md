# CLAUDE.md — German Ladder

Guidance for Claude Code. Read `PRD.md` (what) and `DESIGN.md` (look). This file covers how to build it.

---

## 1. What this is
A static, levelled German course for Indonesian speakers, A1.1 → C1, with exits marked at A1 (Goethe / Start Deutsch 1), B1 (Ausbildung) and B2 (Pflege / Studium). It's the sixth app in the Ladder monorepo, `apps/german`, on `packages/ladder-core`.

v1 ships Dasar (optional), Easy 1 and Easy 2 (A1) with placement, the A1 deck, seven visuals and audio. It deploys to the `german-ladder` repo's Pages.

---

## 2. Starting point
1. Read `README.md`, `docs/DEPLOY.md`, `docs/ladder-core-report.md`, the migration docs, and the Japanese and Spanish plans and reports. Core has grown with each app (accent bar, lenient grading, variety strands, deck, Kerja-style strand cards); use what exists.
2. **Start from `apps/spanish`.** It's the closest sibling: Latin script, LTR, typed answers, accent bar, lenient spelling, `form`/`conjugate`/`dictation` items. Copy it to `apps/german`, delete the Spanish content, visuals and `lib/es`, and keep the PlaceScene drawing.
3. Write `apps/german/course.config.ts`:
   - `target: { lang: 'de', dir: 'ltr' }`
   - storage key `german-ladder:v1`, cache prefix `german-ladder-`
   - German text hooks (§5.1), voice scorer (§5.4), lint (§4)
   - accent bar keys `ä ö ü ß` (+ shift `Ä Ö Ü`)
   - explanation languages `id` / `de` with the rung fade
   - Bauhaus as `boardPattern`; the ladder chip shows CEFR half-levels plus exit flags
   - all `fixes.*` on
4. Set `theme.css` (DESIGN §3, including gender and case tokens); replace the manifest, icons, metadata and About copy.
5. **Engine changes go into core, behind config.** Likely candidates:
   - **ladder exit chips:** a generic "milestone" field on rungs
   - **capitalisation-sensitive grading:** a generic grading option
   - **digraph equivalence in grading** (ae→ä etc.): generic "spelling equivalences" config, alongside Spanish's accent folding
6. After every core change, parity screenshots for **all five** existing apps must match exactly, and all their tests must pass.

---

## 3. Content model

### 3.1 Curriculum
`content/curriculum.yaml`, ten rungs:
- `tier: dasar | easy | medium | hard`
- `cefr` (A1.1 …), `milestone?` (e.g. `{ label: "A1 · Goethe", exam: "Goethe-Zertifikat A1 / Start Deutsch 1" }`)
- `explain_lang: id | mixed | de`
- `lessons`, `words_target`
- `inventory` (grammar ids from `content/data/grammar.yaml`, each with its Profile Deutsch level)

### 3.2 Lesson
```yaml
id: easy2-02-trennbare-verben
rung: easy-2
order: 2
status: draft
review: { by: "Frau …", date: 2026-12-10 }
minutes: 8
title: { id: "Kata kerja yang terpisah", en: "Separable verbs", de: "Trennbare Verben" }
summary: { id: "...", en: "..." }
introduces: [a1-separable-verbs]
spiral: separable
visual: { id: verb-bracket, props: { preset: separable, verb: aufstehen } }
examples:
  - de: "Ich [[stehe]] um 6 Uhr [[auf]]."     # two focus marks allowed only when they form one bracket (lint checks)
    id: "Aku bangun jam 6."
pair:
  off: "Ich aufstehe um 6 Uhr."
  natural: "Ich [[stehe]] um 6 Uhr [[auf]]."
sound:  { words: ["schon", "schön"], tip: { id, en } }
work:   { situation: { id, en }, lines: [{ who, de, id }] }   # Kerja card
words:  { id: "...", en: "..." }                              # Kata card
talk:   { lines: [{ who, de, id }] }
tirukan: { de: "...", id: "..." }
check: [ ...4–6 items ]
glossary:
  - { de: "aufstehen", id: "bangun", pos: verb, sep: auf, verb: { aux: sein, partizip: aufgestanden, irregular: true } }
  - { de: "Zeitung", id: "koran", pos: noun, gender: f, plural: Zeitungen }
next: easy2-03-modalverben
```

**Bracket focus:** a sentence may carry two `[[…]]` marks only if lint confirms they form one verbal bracket (finite verb + separable prefix, modal + infinitive, or auxiliary + participle). The core may need a "linked focus" option for this; add it generically.

### 3.3 Check items
The siblings' types (including `form`, `conjugate`, `dictation`, `stress` from Spanish if useful), plus:

| type | fields |
|---|---|
| `gender` | `noun`, `answer: m | f | n` |
| `case` | `sentence` with one `___` slot, `role: nom | akk | dat | gen`, `noun`, `options`, `answer` |
| `wordorder` | `tiles`, `answer`, `accept?`, `zones?` (expected zone per tile, used to show the bracket in feedback) |
| `wechsel` | `scene` (PlaceScene state + `motion: bool`), `verb`, `options`, `answer` |

**Spelling options per item:**
- `spelling: lenient | strict` (lenient accepts ae/oe/ue/ss, and umlaut-less forms before Easy 3, with a note)
- `nounCaps: true` (default from Easy 1 lesson 5)

### 3.4 Data
- `content/data/grammar.yaml`: grammar points with ids and Profile Deutsch level, authored and checked by the reviewer.
- `content/data/nouns.yaml`: gender, plural, plural pattern, gender-clue tag, and compound parts for compounds.
- `content/data/verbs.yaml`: present-tense irregulars (stem vowel changes: fahren → fährt), separable prefix, auxiliary, Partizip II, Präteritum (for later rungs).
- `content/data/bridges.yaml`: Indonesian ← Dutch ↔ German bridges and false friends, each reviewed.
- **Deck lists:** the Goethe-Institut A1 / A2 / B1 word lists are published for learners. Use them as the **level reference**, and build the deck from them only if their terms allow reuse; otherwise use them for level tagging only, with words from an openly licensed frequency list. Record sources and licences in `content/data/vendor/SOURCE.md`.

---

## 4. Content and accuracy rules
1. **Inventory**, with detectors:
   - dative forms before Easy 2 L6 (except `chunk`s)
   - Perfekt before Easy 2 L11
   - verb-final subordinate clauses before Easy 3
   - genitive, Konjunktiv II and relative clauses before Medium 2
   - passive before Medium 3
   - adjective endings beyond the predicative use (*das Haus ist groß*) before Medium 1
2. **Agreement and case:** lint checks article + noun gender/number/case in simple noun phrases, using `nouns.yaml` and the role tags in `case` items. Every determiner form must match `lib/de/articles.ts`.
3. **Verb position:**
   - Lint flags main clauses where the finite verb isn't in position 2. It uses a simple tokenizer plus a lexicon of finite forms, and is a warning on drafts.
   - Separable prefixes in main clauses must be at the end.
   - `wordorder` answers must pass `lib/de/bracket.ts` validation.
4. **Conjugation:** content forms must match `lib/de/conjugate.ts` + `verbs.yaml`.
5. **Spelling:**
   - nouns capitalised
   - correct umlauts and ß (Germany standard, *Straße* not *Strasse*)
   - German quotation marks
6. **Register:** *Sie* in Kerja cards and with strangers; *du* among friends and family. Indonesian translations follow.
7. **Bridges and false friends** come from `bridges.yaml` only.
8. **Content:** everyday, Ausbildung and Pflege situations; no employer or agency names; no politics; no clichés.
9. **Reviews:**
   - Claude drafts with `status: draft`; never sets `reviewed` or fills `review`.
   - Reviewed lessons need `review.by` and `review.date`.
   - Kerja cards at B1+ also need `review.work_by` (someone with real Ausbildung or nursing experience in Germany).
10. **Sizes:** as the siblings. **Ids are permanent.**

---

## 5. Architecture

### 5.1 `lib/de/` (pure, tested)

| Function | Purpose |
|---|---|
| `normDe(s, { spelling, nounCaps })` | NFC; trim punctuation; lenient maps ae→ä, oe→ö, ue→ü, ss→ß (only where the expected form has them) and, before Easy 3, plain vowel → umlaut; returns `{ value, notes[] }` |
| `capsCheck(given, expected)` | Detects missing noun capitals for the feedback note |
| `article(type, gender, number, kase)` | Definite, indefinite, *kein*, possessives (mein, dein, sein, ihr, unser, euer, Ihr) across all cases |
| `pronoun(person, kase)` | Personal pronouns by case |
| `adjEnding(declension, gender, number, kase)` | Weak / mixed / strong endings (Medium 1+) |
| `conjugate(verb, tense, person)` | Present (with stem-vowel changes), imperative, Perfekt (aux + Partizip II), Präteritum, Konjunktiv II forms; irregulars from `verbs.yaml` |
| `separate(verb)` | Split a separable verb into prefix + base |
| `bracket(tokens, clauseType)` | Assign tokens to zones (position 1, finite verb, middle, end) and validate main and subordinate clause order |
| `genderClue(noun)` | Return the matching ending rule, if any, for GenderTiles and My words |
| `compound(parts)` | Join parts with linking elements from `nouns.yaml`, returning the word and the last part's gender |
| `syllabify(word)` | Basic German syllabification for stress marking and soft-hyphen suggestions |

### 5.2 Grading
- `compare` uses `normDe`. Lenient passes return notes ("umlaut", "digraph", "caps") for the feedback sheet.
- `case` and `gender` items compare exact forms.
- `wordorder` uses `bracket()`, so any valid alternative order is accepted (e.g. *Heute stehe ich um 6 Uhr auf* and *Ich stehe heute um 6 Uhr auf*). The authored `answer` plus `accept` is the fallback.

### 5.3 Typing
Core `AccentBar` configured with ä ö ü ß (shift: Ä Ö Ü). It's visible under every text input.

### 5.4 Speech
- **Voice scorer:** `de-DE` neural/natural > `de-DE` > `de-AT` / `de-CH` (DACH cards only); penalise novelty voices; respect gender.
- **Recordings:** Dasar pairs and Tirukan through the shared manifest.

### 5.5 Visuals (`apps/german/visuals`)
MouthPlacesDe (wrapping the shared mouth drawing), GenderTiles, CaseMachine, VerbBracket, WechselScene (wrapping PlaceScene with a motion arc), CompoundBuilder, DayPlanner. All forms come from `lib/de`; no component hard-codes articles, endings or conjugations.

### 5.6 Theme, SW, i18n
- **Theme:** `theme.css` per DESIGN §3, the `caseColours` setting toggling a root attribute, `theme-color` from the app theme, and a contrast test covering gender and case tokens.
- **SW:** cache prefix `german-ladder-`; precache the shell, `rung/dasar/`, `rung/easy-1/`, `rung/easy-2/`, `placement/`, `words/`.
- **i18n:** app overrides for brand, doors, exit labels, case and gender labels (Nom, Akk, Dat, Gen; der/die/das), Kerja card.

---

## 6. Testing
Sibling tests, plus:
- **`lib/de`:**
  - `article` and `pronoun` full tables
  - `conjugate` for every verb in `verbs.yaml` against the listed forms
  - `separate`
  - `bracket` on 150 sentences (main, question, modal, separable, Perfekt, subordinate)
  - `genderClue` on 200 nouns, with exceptions listed
  - `compound` with linking elements
  - `normDe` lenient and strict, digraphs, caps notes
- **Content:** case/agreement lint, verb-position lint, conjugation match, spelling (ß, caps, quotes), bracket-focus validity.
- **Component:**
  - CaseMachine (role changes → correct articles, labels present with colours off)
  - VerbBracket (move to position 1; modal and separable toggles)
  - WechselScene motion toggle
  - accent bar
  - lenient notes on the feedback sheet
- **Layout:** long compound words at 360px / 130% don't overflow (Playwright check on a fixture page).
- **E2E:** door 1 → Easy 1 lesson 1; door 2 → seeded placement → Easy 2; a `wordorder` item accepting an alternative valid order; a `case` item; the A1 exit chip and climb line.
- **Parity:** all five sibling apps match after every core change.
- **Accessibility:** axe on all routes, both themes, case colours on and off.

---

## 7. Build order
1. **M0 App scaffold** from `apps/spanish`; config; theme; brand.
2. **M1 `lib/de`** with tests; `nouns.yaml`, `verbs.yaml`, `grammar.yaml`.
3. **M2 Content pipeline:** schema, lint (§4), curriculum with ten rungs and milestones.
4. **M3 Core additions:** milestone chips; caps-sensitive grading and spelling equivalences; linked (bracket) focus.
5. **M4 Shell:** Bauhaus pattern, two doors, Dasar tier, CEFR chips with exit flags, strand cards (Bunyi, Kerja, Kata, Ngobrol), Tirukan.
6. **M5 Check engine:** `gender`, `case`, `wordorder`, `wechsel`; placement.
7. **M6 Visuals:** MouthPlacesDe, GenderTiles, CaseMachine, VerbBracket, WechselScene, CompoundBuilder, DayPlanner.
8. **M7 Content:** Dasar (6), Easy 1 (12), Easy 2 (12), test pools (Easy 2 mirroring A1 skills), placement pool, readings, dialogues, A1 deck.
9. **M8 Audio:** Dasar minimal-pair recordings and Tirukan; voice scorer.
10. **M9 Polish:** reduced motion, axe, Lighthouse ≥ 95, DESIGN §13 checklist. **Release v1.0.**

---

## 8. Definition of done
Sibling definition, plus:
- Glyph coverage and long-compound layout pass.
- Every article, ending and conjugation in content matches `lib/de`.
- Verb-position lint is clean on reviewed lessons.
- `lang="de"` everywhere German appears.
- `content:check` is clean, including reviewer fields.
- All sibling parity screenshots match.

---

## 9. Don't
The siblings' list, plus:
- Don't fork core into `apps/german`.
- Don't hard-code articles, endings or conjugations in components; use `lib/de`.
- Don't colour running sentences by case.
- Don't use blue/pink gender colours or show gender by colour alone.
- Don't write *ss* for *ß* in content (Germany standard).
- Don't copy Goethe exam material; mirror the skills only.
- Don't set `status: reviewed`.
