# German Ladder — Product Requirements (v1)

**Status:** Draft for build · **Owner:** Fathul · **Date:** 28 October 2026
**Companion docs:** `CLAUDE.md` (how to build), `DESIGN.md` (how it looks and feels)
**Siblings:** English, Arabic, Mandarin, Japanese and Spanish Ladder, all apps in the Ladder monorepo on `ladder-core`. German is the sixth app. It's Latin script and left to right like English and Spanish, and reuses Spanish's accent-bar and lenient-spelling work. This document covers only what German needs.

---

## 1. Summary

German Ladder is a levelled German course for Indonesian speakers, from zero to C1. It keeps the sibling engine and look; its colour is **petrol and Bauhaus red** on cream.

What makes it a German course:

1. **A ladder built around the milestones Indonesians actually need.** Rungs follow CEFR A1 → C1 in the half-levels German courses use (A1.1, A1.2, A2.1 …), checked against *Profile Deutsch* and the Goethe-Institut word lists. Three exits are marked on the ladder:
   - **A1:** Goethe-Zertifikat A1 / Start Deutsch 1, the first official certificate and a common visa requirement
   - **B1:** most *Ausbildung* (vocational training) programmes
   - **B2:** nursing recognition (*Pflege*) and many university programmes
2. **The real mountain is cases, gender and word order, so they get the best visuals.** Indonesian has none of these. German has all three in every sentence. The signature visuals are:
   - **CaseMachine:** articles changing by case and gender
   - **VerbBracket** (*Satzklammer*): the verb in second place, its partner at the end, and the verb jumping to the end in a subordinate clause
   - **GenderTiles:** der/die/das, with the noun endings that predict gender
   - **Wechselpräpositionen** on the shared table scene: *wo?* is dative, *wohin?* is accusative, and the ball shows the difference
3. **A short sound rung.** German spelling is regular once you know about a dozen rules. The new sounds for Indonesians are ü, ö, the two *ch* sounds, and final devoicing. The optional **Dasar** rung covers them in six lessons, with recorded minimal pairs (schon/schön, Mutter/Mütter).
4. **Built for Indonesian speakers.** Indonesian took many words from Dutch, German's close cousin, so learners already know some German shapes:
   - koper / **Koffer**, handuk / **Handtuch**, apotek / **Apotheke**, setrum / **Strom**, gratis / **gratis**
   - false friends: *bioskop* is **Kino**; *Pension* is a guesthouse, not a retirement

   The course then drills where Indonesian misleads:
   - the verb is not always where Indonesian puts it
   - adjectives take endings
   - *Sie* vs *du* maps to *Anda* vs *kamu*, but is stricter
5. **Work in Germany is a strand, not an afterthought.** A **Kerja** card (as in Japanese Ladder) appears wherever there's a natural workplace use: shifts, asking a supervisor, phone calls, forms. At B1–B2 it focuses on *Ausbildung* and *Pflege* situations.

**v1 ships Dasar (optional), Easy 1 and Easy 2 (A1 complete):** 30 lessons, three rung tests, the placement check, the A1 word deck, readings and dialogues, seven visuals, and the full app shell with all ten rungs on the ladder.

---

## 2. Goals and non-goals

### Goals (v1)
- After Dasar, a beginner reads any German word aloud correctly and hears ü/u, ö/o and ich/ach in minimal pairs at 80% or better.
- After Easy 2 (A1 complete), a learner can handle what the Goethe A1 exam expects:
  - introduce themselves
  - fill in a simple form
  - talk about family, work, daily routine, time and prices
  - ask for directions
  - understand short notices
  - use nominative and accusative correctly, with the verb in second position
- Every German line has audio. Browser `de-DE` voices are good on most devices; the Dasar minimal pairs and Tirukan use recordings.
- No German text in a shipped lesson has been seen only by AI. Every reviewed lesson names its reviewer.

### Non-goals (v1)
- Speaking assessment or microphone input.
- Austrian or Swiss German as tracks. A recognition card appears at Medium 2.
- Goethe, telc, TestDaF or DSH exam simulation.
- Accounts, sync, leaderboards, analytics, ads.

---

## 3. Audience

| Persona | Starting point | Door |
|---|---|---|
| **Ausbildung candidate** (often through an Indonesian agency or LPK) | Zero to A1, needs B1–B2 | Easy 1 or placement; Kerja strand |
| **Nurse heading to Germany** | Needs B2 for recognition | Any door; Pflege situations in Kerja from Medium 2 |
| **Student** (LPDP, DAAD, university) | Needs B1–C1, TestDaF or DSH | Any door; Hard rungs add academic German |
| **Job seeker on Germany's skilled-immigration routes** | Needs A1–B1 | Easy rungs |
| **True beginner, curious** | Zero | Dasar or Easy 1 |

---

## 4. The curriculum

### 4.1 How this sequence was checked
- **Profile Deutsch** and the **Goethe-Institut exam word lists** (A1, A2, B1) for vocabulary and functions per level.
- **Common textbook order** (*Schritte plus Neu*, *Menschen*, *Netzwerk neu*: the books Goethe-Institut Indonesia and most Ausbildung agencies use):
  - present tense and verb position first
  - nominative → accusative → dative
  - modal verbs, separable verbs, then the perfect tense, at A1–A2
  - subordinate clauses (*weil*, *dass*, *wenn*) at A2
  - genitive, passive, *Konjunktiv II* and relative clauses at B1
- **Goethe exam descriptors** for what each rung test checks.

**Where German Ladder differs:**
- Cases are taught through one visual (CaseMachine) that grows each time, rather than four separate tables.
- The perfect tense (*Perfekt*) comes before the simple past (*Präteritum*) for most verbs, as spoken German uses it, with *war/hatte* as the early exception.

A qualified German teacher must approve the sequence before content beyond Easy 2 is written (§12).

### 4.2 Rungs

| # | Rung | Tier | CEFR | Exit marked | Lessons | New words | Status |
|---|---|---|---|---|---|---|---|
| 0 | **Dasar** · Bunyi dan ejaan | dasar | Pre-A1 | | 6 + test | 30 | **v1** (optional) |
| 1 | **Easy 1** · Hallo! | easy | A1.1 | | 12 + test | 250 | **v1** |
| 2 | **Easy 2** · Alltag | easy | A1.2 | **A1 · Goethe / Start Deutsch 1** | 12 + test | 300 | **v1** |
| 3 | Easy 3 · Gestern und morgen | easy | A2.1 | | 12 + test | 300 | v1.1 |
| 4 | Medium 1 · Unterwegs | medium | A2.2 | A2 | 12 + test | 350 | v1.2 |
| 5 | Medium 2 · Meinungen | medium | B1.1 | | 12 + test | 400 | later |
| 6 | Medium 3 · Beruf | medium | B1.2 | **B1 · Ausbildung** | 12 + test | 450 | later |
| 7 | Hard 1 · Genauer | hard | B2.1 | | 12 + test | 500 | later |
| 8 | Hard 2 · Pflege, Arbeit, Studium | hard | B2.2 | **B2 · Pflege / Studium** | 12 + test | 600 | later |
| 9 | Hard 3 · Fließend | hard | C1 | C1 · TestDaF / DSH | 12 + test | 700 | later |

That's 114 lessons and about 3,700 words, plus each rung's word deck.

**Explanations:** Bahasa Indonesia until Medium 1, mixed at Medium 2–3, German with Indonesian notes at Hard.

### 4.3 Topics per rung

**Dasar · Bunyi dan ejaan (optional, 6 lessons)**
1. *Kamu sudah tahu*: Dutch-loan bridges (Koffer, Handtuch, Apotheke, Strom); nouns are capitalised
2. Vowels and Umlauts: a/ä, o/ö, u/ü (Mutter/Mütter, schon/schön)
3. ei vs ie, eu/äu, and long and short vowels
4. ch (ich vs ach), sch, sp/st, z, w, v, j
5. Final devoicing (Tag sounds like *Tak*), ß and ss, r
6. Stress and reading aloud: signs, a menu, a short text

**Easy 1 · Hallo! (A1.1, 12 lessons)**
1. Greetings; *du* and *Sie* (kamu / Anda) and when to use which
2. Ich heiße…, ich komme aus Indonesien; *sein* (bin, bist, ist…)
3. Regular verbs in the present; **verb in position 2** (Ich wohne in Balikpapan. In Balikpapan wohne ich.)
4. W-questions and yes/no questions (Wo wohnst du? Wohnst du hier?)
5. Nouns and gender: der, die, das, plus the first gender clues (-ung, -chen, -e)
6. Numbers 0–100, age, telephone numbers
7. Indefinite article and *kein* (ein, eine, kein, keine)
8. *haben*; family; possessives mein and dein
9. Plurals: the main patterns (-e, -en, -er, Umlaut, -s)
10. Accusative (1): ich habe **einen** Bruder; **den / einen / keinen**
11. Food and shopping: *möchte*, prices, Euro
12. Where things are: in, auf, unter, neben, hinter, vor (with dative, introduced as fixed phrases)

**Easy 2 · Alltag (A1.2, 12 lessons)**
1. Time and the daily schedule; um, am, im
2. **Separable verbs**: ich stehe um 6 Uhr auf (the prefix goes to the end)
3. **Modal verbs**: können, müssen, wollen, dürfen; the infinitive at the end (the bracket)
4. Accusative (2): personal pronouns mich, dich, ihn…
5. Imperative (Sie, du): instructions at work
6. **Dative** (1): mit dem Bus, bei der Arbeit; dative after mit, bei, zu, aus, von, nach
7. Directions: links, rechts, geradeaus; **Wechselpräpositionen** (wo? dative / wohin? accusative)
8. Appointments and the doctor: *Termin*, body parts, *wehtun*
9. Housing: rooms, furniture, the classified ad
10. Forms and personal data: *Formular*, *Ausweis*, the A1 exam's writing task
11. *Perfekt* (1): ich habe gearbeitet, ich bin gefahren; *war* and *hatte*
12. A whole day: dialogue capstone, A1 review

**Later rungs** (outline, entered with `status: soon`; textbook and Profile Deutsch order)
- **Easy 3 · Gestern und morgen (A2.1):** *Perfekt* in full (separable, irregular, sein/haben); dative pronouns; dative verbs (helfen, gefallen, gehören); *weil* and *dass* with the verb at the end; comparatives and superlatives.
- **Medium 1 · Unterwegs (A2.2):** adjective endings (1) after definite and indefinite articles; *wenn* clauses; reflexive verbs; *Präteritum* of modal verbs; *werden* (future and "become"); travel, the train, bureaucracy.
- **Medium 2 · Meinungen (B1.1):** adjective endings (complete); relative clauses; genitive; *Konjunktiv II* (würde, hätte, wäre) for politeness and wishes; giving opinions; a DACH recognition card (Austria, Switzerland).
- **Medium 3 · Beruf (B1.2):** passive (present and past); *Präteritum* for narration; infinitive with *zu*; two-part connectors (sowohl… als auch, entweder… oder); job applications, interviews, the *Ausbildung* workplace; B1 exam readiness review.
- **Hard 1 · Genauer (B2.1):** passive with modals; *Konjunktiv I* (reported speech in media); nominal style; participles as adjectives; prepositions with genitive.
- **Hard 2 · Pflege, Arbeit, Studium (B2.2):** nursing communication (handover, documentation, talking with patients and families); workplace email and meetings; academic reading; B2 readiness review.
- **Hard 3 · Fließend (C1):** idioms and *Redewendungen*; academic writing (TestDaF / DSH style); long authentic texts; register control.

### 4.4 The four skills
- **Listening:** audio on every line; `listen` items; Dasar minimal pairs; dialogues.
- **Speaking:** Tirukan with the stressed syllable marked.
- **Reading:** every lesson, readings per rung, notices and forms from Easy 2.
- **Writing:** `form`, `dictation`, `case` and `wordorder` items. Easy 2 includes the A1 exam's form-filling and short-message tasks.

### 4.5 Kerja strand
Workplace exchanges from Easy 1 (greeting colleagues, *Sie* at work), growing to shifts, sick notes, instructions and safety at A2, and *Ausbildung* and *Pflege* scenarios at B1–B2. The scenarios follow common Ausbildung and nursing-preparation materials, and are checked by the reviewer for real workplace usage.

### 4.6 Inventory rule
As the siblings, with these detectors:
- dative forms produced before Easy 2 lesson 6 (except fixed phrases marked `chunk`)
- *Perfekt* before Easy 2 lesson 11
- subordinate clauses before Easy 3
- genitive and *Konjunktiv II* before Medium 2
- passive before Medium 3

### 4.7 Spiral threads
`sounds`, `gender`, `plural`, `cases`, `word-order`, `separable`, `modals`, `perfekt`, `prepositions`, `adjective-endings`, `subordinate`, `konjunktiv`, `passive`, `register`, `work`.

---

## 5. Features

Everything in the engine carries over:
- two doors, placement, lesson player, strand cards, Tirukan
- tests, capstones, review, deck, My words, settings
- the accent bar (here ä ö ü ß), lenient spelling, `fixes.*` all on

### 5.1 Home: two doors
- **Baru mulai** → Easy 1 (with a link to Dasar)
- **Sudah pernah belajar** → placement

### 5.2 Placement (Cek level)
- 24 items over Dasar to Easy 3 topics, with no feedback during the check.
- Places at the first rung under 75%; lower rungs are marked "lewat cek", with no climb moment.

### 5.3 Lesson player and strand cards
The six steps. Strand cards:
- **Bunyi:** a sound point or minimal pair, with play buttons
- **Kerja:** a workplace exchange with a one-line situation
- **Kata:** Dutch-loan bridges, false friends, and compound-noun breakdowns (*Kranken·haus* = hospital, literally "sick-house")
- **Ngobrol:** a short exchange

**Top-bar toggle:** Penjelasan ID/DE at Medium 2–3, lesson-scoped.

### 5.4 Check engine
The siblings' types (including Spanish's `form`, `conjugate`, `dictation`) plus:

| Type | Interaction | Example |
|---|---|---|
| `gender` | Pick der / die / das for a noun | ___ Zeitung → die |
| `case` | Pick or type the article or ending for a slot, with its role shown | Ich sehe ___ Mann. (Akk) → den |
| `wordorder` | Order word tiles into a sentence with bracket slots visible (position 1, verb, middle, end) | ich / heute / auf / stehe / um 6 Uhr → Heute stehe ich um 6 Uhr auf. |
| `wechsel` | A PlaceScene state with motion or no motion; choose dative or accusative and the article | Ich lege das Buch auf ___ Tisch → den |

**Typing help:** the core accent bar with ä ö ü ß Ä Ö Ü.

**Grading:**
- *ae/oe/ue/ss* are accepted for *ä/ö/ü/ß*, with a gentle note.
- Capitalisation matters for nouns from Easy 1 lesson 5 (a missing capital is wrong, with the reason). Otherwise case is ignored.
- Umlaut leniency (a typed *u* for *ü*) is accepted with a note only before Easy 3 and never in Dasar `listen` or `form` items, because *u* vs *ü* changes meaning (schon/schön).

### 5.5 Tests and capstones
- **Dasar:** draw 10 of 18, pass 8.
- **Easy 1 and Easy 2:** draw 16 of 36, pass 12. The Easy 2 test mirrors the Goethe A1 skills (a listening, a reading and a form task) without copying exam material.
- **Capstones:** Baca dan dengar, and Ngobrol (city, workplace and Ausbildung-agency settings).

### 5.6 Audio
- **Browser voice:** prefer `de-DE` neural/natural voices.
- **Recordings:** the Dasar minimal pairs (about 50) and Tirukan sentences.

### 5.7 My words and deck
- Each word shows its article chip (der/die/das), plural, gender-clue hint ("-ung → die"), the separable-verb marker (an|rufen), and audio.
- **Deck:** the A1 deck from the Goethe A1 list cross-checked with a frequency list; source and licence in `SOURCE.md`.

### 5.8 Settings (changes)
- Spelling strictness: follow the rung, or always strict.
- Case colours on or off: they're on by default up to Medium 1 and colour article endings in visuals and feedback only.

---

## 6. Content model (summary)

| Field | Meaning |
|---|---|
| `de` | German, `[[focus]]` markup |
| `id` | Indonesian translation |
| `en` | English (optional) |

Glossary entries add `gender`, `plural`, `pos`, `sep` (separable prefix), `verb: { aux: haben | sein, partizip, irregular? }`. Reviewed lessons need `review: { by, date }`.

---

## 7. Visual components (v1)

| Visual | Rung | What it shows |
|---|---|---|
| **MouthPlaces (German)** | Dasar | The shared mouth section: ü (i-shape tongue + rounded lips), ö (e-shape + rounded lips), ich-Laut (front) vs ach-Laut (back, like Arabic خ / Indonesian *kh*). Minimal pairs play side by side |
| **GenderTiles** | Easy 1 | Nouns as tiles sorted into three trays (der / die / das), with ending clues as labels (-ung, -heit, -keit → die; -chen, -lein → das; -er people → der). Drag or tap to sort; exceptions marked |
| **CaseMachine** | Easy 1 → every rung | A sentence with role slots (subject · direct object · indirect object · owner). Each slot's article changes by gender and case; the changed letters are coloured by case. Grows rung by rung: nominative and accusative in Easy 1, dative in Easy 2, genitive at Medium 2 |
| **VerbBracket** | Easy 1–2 | The sentence as a frame: position 1 · **verb** · middle · **end**. Move any part to position 1 and the subject moves behind the verb. Add a modal and the infinitive drops to the end; pick a separable verb and its prefix flies to the end. From Easy 3, *weil/dass* sends the verb to the very end |
| **Wechselpräpositionen** | Easy 2 | The shared table, box and ball. No movement (*wo?*): "Der Ball liegt **auf dem** Tisch" (dative). With a motion arrow (*wohin?*): "Ich lege den Ball **auf den** Tisch" (accusative). Toggle motion and the article changes. Indonesian has one *di/ke* split, which the card uses as the bridge: *di* ≈ wo/dative, *ke* ≈ wohin/accusative |
| **CompoundBuilder** | Easy 2 | Snap word blocks together (Kranken + Haus, Hand + Tuch, Arbeit + s + Platz). The compound takes the **last** block's gender; the linking -s- or -n- shows as a small joint |
| **DayPlanner** | Easy 2 | A weekly planner (Mon–Sun, hours). Drag an activity into a slot and the sentence builds with um / am / im and the separable-verb bracket: "Am Montag **stehe** ich um 6 Uhr **auf**." |

Later visuals (spec'd with their rungs): **AdjectiveEndings** (the ending table as weak / mixed / strong lanes), **ClauseSwitch** (main clause ↔ *weil/dass* clause), **PassiveFlip**.

---

## 8. Progress data
As the siblings, with key `german-ladder:v1`, `capstones`, `placement`, `deck`, and settings including `spellingStrict: 'rung' | 'always'` and `caseColours: 'rung' | 'on' | 'off'`.

---

## 9. Non-functional requirements
As the siblings.
- All faces cover ä ö ü ß Ä Ö Ü ẞ „ " ‚ ' and the guillemets » «.
- German compounds are long, so text must hyphenate sensibly: `hyphens: auto` with `lang="de"`, and soft hyphens authored where the browser fails. No horizontal overflow at 360px and 130% text.

---

## 10. Success measures
- 5 beginners finish Easy 1. At least 4 of 5 score ≥ 75% on its test and place the verb correctly in 8 of 10 new sentences.
- After Easy 2, testers complete a Goethe A1 practice paper (official free model test) at the pass level.
- A native German teacher rates every Ngobrol and Kerja dialogue as natural.

---

## 11. Release plan

| Release | Contents |
|---|---|
| **v1.0** | App in the monorepo, all ten rungs on the ladder, placement, Dasar, Easy 1, Easy 2 (A1), seven visuals, A1 deck |
| v1.1 | Easy 3 (A2.1) + ClauseSwitch |
| v1.2 | Medium 1 (A2.2) + AdjectiveEndings |
| later | B1 (Ausbildung exit), B2 (Pflege / Studium), C1 |

---

## 12. Decisions made
0. **Sequence approval:** a qualified German teacher reviews §4 before content beyond Easy 2 is written.
1. **Standard:** German as spoken in Germany (*Standarddeutsch*), with Austria and Switzerland as recognition at Medium 2.
2. **Levels:** CEFR half-levels A1.1 → C1, checked against Profile Deutsch and the Goethe word lists, with exits at A1, B1 and B2.
3. **Explanations** fade from Indonesian to German from Medium 2.
4. **Audio:** browser `de-DE`, plus recordings for Dasar pairs and Tirukan.

## 13. Open questions
- Should Hard 2 split into separate Pflege and Studium tracks, given how different the vocabulary is?
- Is a Dutch side note worth adding (Indonesians who know Dutch-loan words might enjoy it), or is it noise?
