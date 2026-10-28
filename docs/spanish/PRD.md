# Spanish Ladder — Product Requirements (v1)

**Status:** Draft for build · **Owner:** Fathul · **Date:** 21 October 2026
**Companion docs:** `CLAUDE.md` (how to build), `DESIGN.md` (how it looks and feels)
**Siblings:** English, Arabic, Mandarin and Japanese Ladder, all apps in the Ladder monorepo on `ladder-core`. Spanish is the fifth app. Its script and direction are the same as English, so it reuses more of the engine than any sibling. This document covers only what Spanish needs.

---

## 1. Summary

Spanish Ladder is a levelled Spanish course for Indonesian speakers, from zero to C1. It keeps the sibling engine and look; its colour is **terracotta and azulejo blue** on cream.

What makes it a Spanish course:

1. **The ladder is CEFR / DELE, checked against the Instituto Cervantes curriculum.** Rungs follow CEFR A1 → C1, which is also how the official DELE exams are levelled. Topic order is checked against the *Plan Curricular del Instituto Cervantes* (PCIC), the reference inventory of grammar, functions and vocabulary for each level. It plays the role HSK plays for Mandarin.
2. **Sounds are the Indonesian learner's head start.** Spanish has the same five vowels as Indonesian, a rolled *r*, and mostly regular spelling: *ñ* is *ny*, *j* is *kh*. The optional **Dasar** rung is short, and its main message is "you can already pronounce this."
3. **Verbs and gender are the real mountain, so they get the best visuals.** Indonesian has no verb conjugation and no grammatical gender. Spanish has both everywhere. The signature visuals are the **ConjugationGrid** and **Agreement**, and the two famous splits get their own: *ser* vs *estar*, and *pretérito* vs *imperfecto*.
4. **Built for Indonesian speakers.** The course starts from words Indonesians already have, inherited through Portuguese: *meja* / mesa, *sepatu* / zapato, *bendera* / bandera, *garpu* / garfo, *Minggu* / domingo. It then drills where Indonesian misleads:
   - no *ser/estar* split (*adalah* vs *sedang*)
   - adjectives agree with nouns
   - object pronouns move before the verb
   - *por* vs *para* (both *untuk*)
   - the subjunctive, which Indonesian handles with words like *semoga* and *supaya*
5. **One Spanish for the world, with the other side shown.** The main model is **neutral Latin American Spanish** (Mexico City), spoken by about nine in ten Spanish speakers. A **España** strand card shows where Spain differs: *vosotros*, the /θ/ in *cielo*, *coche* vs *carro*, *ordenador* vs *computadora*. Learners recognise both from the start. The default can be switched to Spain in one config value, if recordings for it exist.

**v1 ships Dasar (optional), Easy 1 and Easy 2, complete:** 30 lessons, three rung tests, the placement check, the word deck for those rungs, readings and dialogues, seven visuals, and the full app shell with all ten rungs on the ladder.

---

## 2. Goals and non-goals

### Goals (v1)
- After Dasar, a beginner reads any Spanish word aloud with the right stress and sounds, using the spelling rules alone.
- After Easy 2 (A1 complete), a learner can introduce themselves, describe people and places with *ser* and *estar*, talk about daily routine in the present tense (regular, stem-changing and the common irregulars), say what they like with *gustar*, and handle shopping, directions and time.
- Every Spanish sentence has audio. Browser Spanish voices (es-MX, es-US, es-ES) are good on most devices; minimal pairs and the Dasar sound lessons use recordings.
- No Spanish text in a shipped lesson has been seen only by AI. Every reviewed lesson names its reviewer.

### Non-goals (v1)
- Speaking assessment or microphone input.
- A full Spain-Spanish track. Spain appears through the España strand and recognition items.
- Vos (*voseo*, Argentina and Central America) beyond a recognition card at Medium 2.
- DELE exam simulation.
- Accounts, sync, leaderboards, analytics, ads.

---

## 3. Audience

| Persona | Starting point | Door into the app |
|---|---|---|
| **True beginner** | No Spanish | Dasar (optional) or Easy 1 |
| **Scholarship or study abroad** (LPDP to Spain or Latin America, exchange) | Needs B1–B2 and DELE | Any door; CEFR/DELE labels on every rung |
| **Work and travel** (tourism, hospitality, remote work with Latin American teams) | Needs A2–B1 speaking | Easy rungs, Ngobrol dialogues |
| **Returning learner** | Studied some Spanish, forgot conjugation | Placement → Easy 2 or 3 |

---

## 4. The curriculum

### 4.1 How this sequence was checked
- **PCIC** (Instituto Cervantes): the grammar, function and notion inventories for A1–C1. Topics may not appear before the level PCIC places them, except as fixed chunks.
- **Common textbook order** (*Aula Internacional*, *Español en marcha*, and *Nuevo Prisma*; widely used, including in Indonesian university Spanish courses):
  - *ser* / *estar* / *hay* first, then the present tense (regular → stem-changing → irregular), *gustar*, and reflexive routines
  - then *pretérito perfecto*, then *indefinido* / *imperfecto*
  - the subjunctive from B1
- **DELE level descriptors** for what each rung's test should check.

**Where Spanish Ladder differs:**
- *Pretérito indefinido* and *imperfecto* are taught as a pair (Easy 3 → Medium 1) with a timeline visual, rather than months apart.
- *Por* vs *para* gets its own visual early (Easy 3), because Indonesian *untuk* covers both.

A qualified Spanish teacher must approve the sequence before content beyond Easy 2 is written (§12).

### 4.2 Rungs

| # | Rung | Tier | CEFR / DELE | Lessons | New words | Status |
|---|---|---|---|---|---|---|
| 0 | **Dasar** · Bunyi dan ejaan | dasar | Pre-A1 | 6 + test | 30 | **v1** (optional) |
| 1 | **Easy 1** · Aku dan duniaku | easy | A1 (1) | 12 + test | 250 | **v1** |
| 2 | **Easy 2** · Sehari-hari | easy | A1 (2) | 12 + test | 250 | **v1** |
| 3 | Easy 3 · Dulu dan nanti | easy | A2 (1) | 12 + test | 300 | v1.1 |
| 4 | Medium 1 · Cerita | medium | A2 (2) | 12 + test | 300 | v1.2 |
| 5 | Medium 2 · Pendapat | medium | B1 (1) | 12 + test | 400 | later |
| 6 | Medium 3 · Kemungkinan | medium | B1 (2) | 12 + test | 400 | later |
| 7 | Hard 1 · Nuansa | hard | B2 (1) | 12 + test | 500 | later |
| 8 | Hard 2 · Bahasa kerja dan akademik | hard | B2 (2) | 12 + test | 500 | later |
| 9 | Hard 3 · Fasih | hard | C1 | 12 + test | 600 | later |

That's 114 lessons and about 3,500 words, plus each rung's word deck.

**Explanations:** Bahasa Indonesia until Medium 1, mixed at Medium 2–3, Spanish with Indonesian notes at Hard. Unlike Arabic and Mandarin, Spanish is close enough to Latin-script languages that explaining in the target language becomes realistic.

### 4.3 Topics per rung

**Dasar · Bunyi dan ejaan (optional, 6 lessons)**
1. *Kamu sudah bisa*: five vowels like Indonesian; words you know (mesa/meja, zapato/sepatu, bandera/bendera, domingo/Minggu)
2. Letters that surprise: h (silent), j and g+e/i (*kh*), ñ (*ny*), ll/y, v = b
3. c and z: /s/ in Latin America, /θ/ in Spain; qu, gu, güe
4. r and rr: one tap or a roll (pero / perro)
5. Stress: last or second-to-last syllable, and what the written accent (´) tells you
6. Reading aloud: signs, menus, a short text

**Easy 1 · Aku dan duniaku (A1, 12 lessons)**
1. ¡Hola! Greetings, *tú* and *usted* (mapped to *kamu* / *Anda*)
2. Me llamo…, soy de Indonesia: *ser* for identity and origin
3. Gender: el/la, un/una; nouns ending in -o/-a and the exceptions you meet first (el día, la mano)
4. Plurals and agreement: los libros nuevos, las casas blancas
5. Numbers 0–100, age with *tener* (tengo 25 años; not *soy*)
6. *Estar* for where and how: estoy en casa, estoy cansado
7. *Ser* or *estar*? The first contrast
8. *Hay*: there is, there are
9. Present tense of -ar verbs (hablar, trabajar, estudiar)
10. -er and -ir verbs (comer, vivir), and questions (¿Dónde? ¿Qué? ¿Cuándo?)
11. Family, possessives: mi, tu, su, nuestro
12. Where things are: en, sobre, debajo de, al lado de, detrás de, delante de

**Easy 2 · Sehari-hari (A1, 12 lessons)**
1. Stem-changing verbs: e→ie, o→ue, e→i (quiero, puedo, pido)
2. Irregular "yo" forms: hago, tengo, salgo, pongo, vengo
3. *Ir* and *ir a* + infinitive: plans
4. Reflexive verbs and daily routine (me levanto, me ducho)
5. Telling the time, days and frequency
6. *Gustar* and friends: me gusta / me gustan, the "backwards" verb
7. Shopping: prices, *este/ese/aquel*, colours
8. Food and ordering: *quisiera*, *para mí*
9. Directions and the city; *tú* commands (gira, sigue)
10. Weather and seasons; *hace*, *está*, *hay*
11. Comparisons: más/menos… que, tan… como, mejor/peor
12. A whole day: dialogue capstone review

**Later rungs (outline, entered with `status: soon`; PCIC order)**
- **Easy 3 · Dulu dan nanti (A2):** *pretérito perfecto* (he comido); *pretérito indefinido* regular and irregular; direct and indirect object pronouns (lo, la, le) and their position; *por* vs *para*; *estar* + gerund; future with *ir a* vs simple future (intro).
- **Medium 1 · Cerita (A2):** *imperfecto* and its contrast with *indefinido*; telling stories; *soler*; double object pronouns (se lo); *usted* commands; simple future and conditional.
- **Medium 2 · Pendapat (B1):** present subjunctive after wishes, emotions and opinions (quiero que, espero que, no creo que); *ojalá*; affirmative and negative commands; relative clauses (que, donde, lo que); voseo recognition.
- **Medium 3 · Kemungkinan (B1):** subjunctive in time clauses (cuando llegues) and purpose (para que); *pluscuamperfecto*; conditional sentences (si + present); reported speech (dijo que…).
- **Hard 1 · Nuansa (B2):** imperfect subjunctive; *si* clauses II and III; passive *se* and *ser* passive; aspect nuances; connectors.
- **Hard 2 · Bahasa kerja dan akademik (B2):** formal register, emails, meetings, academic writing; regional vocabulary at scale (Spain, Mexico, Andes, Southern Cone).
- **Hard 3 · Fasih (C1):** idioms and *refranes*; subjunctive in all its corners; nominalisation; long authentic texts; interpreting Indonesian ↔ Spanish.

### 4.4 The four skills
- **Listening:** audio on every line, `listen` items, dialogues. Dasar includes minimal pairs (pero/perro, caro/carro).
- **Speaking:** Tirukan at the end of every Examples step.
- **Reading:** every lesson; readings at each rung.
- **Writing:** typed answers in `form` and `dictation` items, with accent help (§5.4).

### 4.5 The España strand
- The model is neutral Latin American: *ustedes* for plural "you", /s/ for c/z, Latin American vocabulary.
- The **España** card appears wherever Spain differs:
  - *vosotros* forms (shown from Easy 1, recognised but not produced until Hard 2)
  - pronunciation (θ, and the j sound)
  - vocabulary (coche/carro, ordenador/computadora, móvil/celular, zumo/jugo)
  - *pretérito perfecto* use for today's events
- Tests may include one recognition item per rung on Spain forms. They never require producing them.

### 4.6 Inventory rule
Same as the siblings: grammar and words only from earlier rungs plus this rung up to this lesson; PCIC level ids on every grammar point; lint enforces it.

### 4.7 Spiral threads
`sounds`, `stress`, `gender`, `agreement`, `ser-estar`, `present`, `irregular`, `reflexive`, `gustar`, `pronouns`, `past`, `aspect`, `future`, `commands`, `subjunctive`, `por-para`, `register`, `variety`.

---

## 5. Features

Everything in the engine carries over:
- two doors, placement, lesson player, strand cards, Tirukan
- check engine, rung tests, capstones, quick review
- word deck, My words, settings, the `fixes.*` flags (all on)

### 5.1 Home: two doors
- **Baru mulai** → Easy 1, lesson 1 (with a link: "Mau latihan bunyi dulu? Mulai dari Dasar.")
- **Sudah pernah belajar** → placement

### 5.2 Placement (Cek level)
- 24 items across Dasar, Easy 1, Easy 2 and Easy 3 topics, no feedback.
- The result places the learner at the first rung where they score under 75%.
- Rungs below are marked climbed "lewat cek", with no climb moment.

### 5.3 Lesson player
The six steps. Strand cards:
- **Bunyi:** a sound or stress point with playable words
- **España:** Latin America ↔ Spain lines, each with audio in its own accent where recorded
- **Kata:** Portuguese-loan bridges and false friends (*embarazada* is pregnant, not embarrassed; *sopa* is soup, *sabun* is *jabón*)
- **Ngobrol:** a short exchange

**Top bar toggle:**
- **Bahasa penjelasan**, at Medium 2–3 only, lesson-scoped.

### 5.4 Check engine
The siblings' types plus:

| Type | Interaction | Example |
|---|---|---|
| `form` | Type or choose the conjugated or agreed form | (yo) tener → **tengo**; la casa (blanco) → **blanca** |
| `conjugate` | Fill a mini grid (2–6 persons) for one verb and tense | comer, presente: como, comes, come… |
| `agree` | Pick article and adjective forms to match a noun | ___ ciudades ___ (bonito) → las, bonitas |
| `dictation` | Hear a sentence, type it | — |
| `stress` | Tap the stressed syllable, or decide whether the word needs an accent mark | ca-**fé** ✓ ´ |

**Typing help:** an accent bar (á é í ó ú ü ñ ¿ ¡) under every text input, plus long-press on mobile keyboards.

**Grading:**
- **Accents:** with `accents: strict`, a missing accent is wrong. With `accents: lenient` (the default before Easy 3, except in `stress` items), the answer is accepted and a gentle note shows the right spelling ("Hampir: *está*, dengan aksen").
- **Case and punctuation:** case is ignored; the opening ¿ ¡ marks are not required.

### 5.5 Tests and capstones
- **Dasar:** draw 10 of 18, pass 8.
- **Easy 1 and Easy 2:** draw 16 of 36, pass 12.
- **Capstones per live rung:** Baca dan dengar, and Ngobrol (a 6–10 line dialogue set in a Latin American city, with one Spain-set dialogue at Easy 2).

### 5.6 Audio
- **Browser voices:** prefer `es-MX`, then `es-US`, then `es-419`, then `es-ES`, preferring neural/natural voices. España cards use `es-ES`.
- **Recordings:** Dasar minimal pairs and stress pairs (about 60 clips) and the Tirukan sentences are recorded where possible. Everything else uses the browser voice. This is the lightest audio requirement of the five apps.

### 5.7 My words and deck
- Each word shows its gender (el/la), plural, Latin American and Spain forms where they differ, and a play button. Verbs link to their conjugation grid.
- **Kartu kata:** as the siblings, using a frequency list cross-checked against PCIC vocabulary notions per level.

### 5.8 Settings (changes)
- **Variety of speech audio:** Amerika Latin (default) / Spanyol. This only switches the voice; the content is the same.
- Accent strictness: follow the rung (default) or always strict.

---

## 6. Content model (summary)

| Field | Meaning |
|---|---|
| `es` | Spanish (Latin American), `[[focus]]` markup |
| `es_es` | Spain variant (optional) |
| `id` | Indonesian translation |
| `en` | English (optional) |

Glossary entries add `gender`, `plural`, `pos`, and `verb: { infinitive, group, irregular? }`. Reviewed lessons need `review: { by, date }`.

---

## 7. Visual components (v1)

| Visual | Rung | What it shows |
|---|---|---|
| **StressMap** | Dasar | A word split into syllables, with the stressed syllable raised. Rules shown as three lanes (aguda, llana, esdrújula); type or pick words and watch where the accent mark is needed |
| **Agreement** | Easy 1 | Article + noun + adjective as linked tiles. Change the noun's gender or number and the others change with it, with the changed endings highlighted |
| **SerEstar** | Easy 1 | Two panels around the same person: SER (identity, origin, job, character: soy alta, soy de Medan) and ESTAR (location, mood, state: estoy cansada, estoy en Madrid). Drag sentence chips to the right side; each placement explains why |
| **ConjugationGrid** | Easy 1–2 | A 6-person grid (yo, tú, él/ella/usted, nosotros, [vosotros], ellos/ustedes) for any verb. The stem in `--ink`, endings in the accent, irregular parts outlined. Stem-changing verbs show the "boot" shape (the persons that change). The vosotros row is shown greyed with an España chip |
| **GustarFlip** | Easy 2 | *Me gusta el café* vs *saya suka kopi*: what is liked is the subject. Arrows show who does what in each language; singular vs plural (gusta / gustan) follows the thing liked |
| **PlaceScene (Spanish)** | Easy 1 | The shared table, box and ball: en, sobre, debajo de, al lado de, detrás de, delante de. Word order matches Indonesian here, which the card says so learners can relax |
| **RoutineClock** | Easy 2 | A 24-hour dial with reflexive routine verbs at their times (me levanto a las seis). Drag the hand to hear and see the sentence; shows *a las* vs *son las* |

Later visuals (spec'd with their rungs): **AspectTimeline** (indefinido as points, imperfecto as a background line), **PronounSlots**, **PorParaArrows**, **MoodSwitch** (indicative ↔ subjunctive triggers).

---

## 8. Progress data
As the siblings, with key `spanish-ladder:v1`, `capstones`, `placement`, `deck`, and settings `uiLang`, `voice`, `rate`, `sfx`, `textSize`, `theme`, `motion`, `variety: 'latam' | 'es'`, `accentStrict: 'rung' | 'always'`, `deckDaily`, `deckFace`.

---

## 9. Non-functional requirements
As the siblings. Typed answers must work on Indonesian phone keyboards (accent bar always visible on inputs). Latin-script fonts must cover á é í ó ú ü ñ ¿ ¡ in every face.

---

## 10. Success measures
- 5 beginners finish Easy 1; at least 4 of 5 score ≥ 75% on its test and choose correctly between *ser* and *estar* in 8 of 10 new sentences.
- A native Latin American Spanish teacher rates every Ngobrol dialogue natural; a Spain speaker checks every España card.

---

## 11. Release plan

| Release | Contents |
|---|---|
| **v1.0** | App in the monorepo, all ten rungs on the ladder, placement, Dasar, Easy 1, Easy 2, seven visuals, deck for A1 |
| v1.1 | Easy 3 (A2 part 1) + AspectTimeline, PronounSlots, PorParaArrows |
| v1.2 | Medium 1 |
| later | B1 → C1 |

---

## 12. Decisions made
0. **Sequence approval:** a qualified Spanish teacher reviews §4 before content beyond Easy 2 is written.
1. **Model variety:** neutral Latin American (Mexico City) with a España strand. Switchable to Spain as the default by config, if recordings and review exist.
2. **Levels:** CEFR / DELE A1–C1, checked against PCIC.
3. **Explanation language** fades from Indonesian to Spanish from Medium 2.
4. **Audio:** browser voices, plus recordings for Dasar pairs and Tirukan.

## 13. Open questions
- Should the default variety be Spain instead, given that many Indonesian scholarship destinations are Spanish universities?
- Is a Portuguese bridge worth a side note at Hard (Indonesian loans came from Portuguese, and Spanish ↔ Portuguese is a cheap second language)?
