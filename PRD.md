# English Ladder — Product Requirements (v1)

**Status:** Draft for build · **Owner:** Fathul · **Date:** 15 October 2026
**Companion docs:** `CLAUDE.md` (how to build), `DESIGN.md` (how it looks and feels)

---

## 1. Summary

English Ladder is a levelled English course for Indonesian speakers. It runs from absolute beginner (CEFR A1) to advanced polish (C1) across nine rungs: **Easy 1–3, Medium 1–3, Hard 1–3**, with an optional **Starter** rung below Easy 1 for complete beginners (sounds, letters, numbers, prices, time, survival phrases).

What sets it apart from existing courses:

1. **Grammar you can see.** Every concept that has a shape (position, time, certainty, countability) gets a purpose-built interactive visual instead of a rule list.
2. **Built for Indonesian speakers.** Every lesson says what Indonesian does instead and which mistake that causes. Explanations start in Bahasa Indonesia and move to English as the learner climbs.
3. **Calm and short.** Lessons take 8–12 minutes. There are no accounts, ads, streak guilt or locked content. The app opens where you left off.

It is a static site (GitHub Pages), like the other portfolio apps. Progress lives in the learner's browser.

**v1 ships one rung, Easy 1, complete:** 10 lessons, a rung test, a quick-review mode, and the full app shell for all nine rungs (later rungs shown as "coming soon").

---

## 2. Goals and non-goals

### Goals (v1)
- A complete beginner can finish Easy 1 without outside help, with every explanation available in Bahasa Indonesia.
- The lesson template, two visual components, the check engine, audio and progress are production quality, so later rungs are mostly content work.
- Every lesson is finishable in under 12 minutes on a phone.
- A learner returning after a week lands exactly where they stopped, in one tap.

### Non-goals (v1)
- Accounts, sync between devices, leaderboards, social features.
- Speaking or pronunciation scoring, or microphone input.
- A separate vocabulary course. Lessons carry a small glossary only.
- Placement test (planned after Easy 3 ships).
- IELTS-style drilling (stays in Fasih).
- Any backend, analytics that track individuals, or third-party trackers.

---

## 3. Audience

| Persona | Starting point | What they need |
|---|---|---|
| **Absolute beginner** (school leaver, worker, parent) | Knows a few words, can't form sentences | Indonesian explanations, audio, very small steps, reassurance |
| **Rusty learner** | Studied at school, forgot, afraid of grammar | To restart without embarrassment, quick wins, visible progress |
| **Intermediate polisher** (like the owner) | Reads and speaks, makes fossilized errors | Later rungs (Medium 2+). In v1, uses Easy 1 only to check the product |

v1 is designed for the first two. Copy, pacing and default explanation language assume a beginner.

---

## 4. The curriculum

### 4.1 Rungs

| Rung | CEFR | Lessons | Explanation language | Status |
|---|---|---|---|---|
| Easy 1 | A1 | 8 + test | Bahasa Indonesia, English examples | **v1** |
| Easy 2 | A1 | 8 + test | Bahasa Indonesia, English examples | v1.1 |
| Easy 3 | A2− | 8 + test | Mostly Indonesian, key terms in English | v1.2 |
| Medium 1 | A2 | 8 + test | Mixed, English first | later |
| Medium 2 | B1 | 8 + test | Mixed, English first | later |
| Medium 3 | B1+ | 8 + test | English, Indonesian notes | later |
| Hard 1 | B2 | 8 + test | English, Indonesian contrast boxes | later |
| Hard 2 | B2+ | 7 + test | English | later |
| Hard 3 | C1 | 7 + test | English | later |

The full topic list per rung lives in `content/curriculum.yaml`. It is the single source of truth for the home screen's ladder and for later planning. All nine rungs are entered there in v1, including their topic lists, so the ladder shows the whole climb.

### 4.2 Grammar inventory rule
Each rung has a **grammar inventory**: the structures it teaches. Example sentences, check items and explanations in a lesson may only use structures from **the current rung's inventory up to and including the current lesson, plus all earlier rungs**. This is the most important content rule. A beginner who meets an unknown structure in an example gets lost. See `CLAUDE.md §6` for how it is enforced.

### 4.3 Spiral threads
Topics come back at higher rungs. Each lesson declares a `spiral` thread id (e.g. `prepositions`, `tense`, `articles`). The rung page and the lesson's "Next" step can show "You'll meet this again in Easy 2" using the thread.

### 4.4 Easy 1 lessons (v1 content)

| # | Title (EN / ID) | Core points | Visual | Typical Indonesian-speaker slip |
|---|---|---|---|---|
| 1 | I am, you are / *Aku, kamu* | to be: am/is/are with pronouns; contractions; *to be* before nouns, adjectives, places | — | Dropping *to be*: "She teacher", "I happy" (no copula in Indonesian) |
| 2 | He, she, it, they / *Dia itu he atau she?* | subject pronouns; he vs she; it for things and animals; they | — | He/she swapped, because *dia* covers both |
| 3 | A, an and more than one / *A, an, dan jamak* | a vs an by **sound**; regular plurals -s/-es/-ies; common irregulars | **Noun builder** | No article ("I have car"), no plural after numbers ("two book") |
| 4 | This, that, these, those / *Ini dan itu* | near/far × one/many; with *to be* | small near/far diagram (inline, not a library component) | "This books", "these book" |
| 5 | Have and has / *Punya* | have/has; with a/an and plurals | — | "She have" |
| 6 | My, your, his, her, 's / *Punya siapa?* | possessive adjectives; 's; his vs her | — | *-nya* translated as "his" for everyone; "the bag of Rina" |
| 7 | Where things are / *Di mana bendanya?* | in, on, under, next to, behind, in front of | **Place scene** | Using *at* for everything because *di* feels like *at* |
| 8 | Questions and no / *Bertanya dan menjawab tidak* | Is she…? Are you…? short answers; isn't/aren't; I'm not | — | "You are teacher?" with rising tone only; "I amn't" |
| T | Rung test | 16 items across all ten | uses both components | — |

Each lesson also has a **glossary** of 6–12 words it introduces (word, Indonesian gloss, audio).

---

## 5. Features

### 5.1 Home: the Ladder
- Shows every rung as a vertical ladder: the optional Starter at the bottom, then Easy 1. New learners start at Easy 1, with a link to Starter.
- The learner's position is marked on the rung they are on.
- Rung states: *not started*, *in progress (n/8)*, *climbed* (test passed), *coming soon*.
- A primary **Continue** action resumes the exact lesson and step. If nothing has started: **Mulai dari Easy 1**.
- A secondary **Quick review** card appears once at least two lessons are done (§5.6).
- A small "This week" strip shows days practised in the last 7 days. It informs only; there is no streak count and no loss messaging.

### 5.2 Rung page
- Rung name, CEFR, one-sentence description, explanation language.
- The lesson list with per-lesson state (*new*, *in progress*, *done*, *done with mistakes to review*) and estimated minutes.
- The rung test at the bottom, always available. Lessons are never locked.
- "You'll meet these topics again" spiral links (to coming-soon rungs in v1).

### 5.3 Lesson player
Six steps, in order, one screen at a time on phones and a focused column on desktop:

1. **Concept** — 2–4 short sentences in the rung's explanation language.
2. **See** — the interactive visual, if the lesson has one. Otherwise a worked example card.
3. **Examples** — 4–6 sentences, each with Indonesian translation and a play button. Tapping a highlighted word shows a tiny note.
4. **Contrast** — Indonesian vs English, and the slip it causes, with one wrong → right pair.
5. **Check** — 4–6 items (§5.4). Immediate feedback with a one-line reason. Wrong answers can be retried.
6. **Done** — summary: what you learned (one line), the words you met, items to review, **Next lesson** button.

Requirements:
- Back and forward between steps at any time. Progress bar shows the step.
- Keyboard: ←/→ between steps, 1–4 to pick answers, Enter to continue, Space to play audio.
- Leaving mid-lesson saves position. Reopening returns to that step.
- An "Explain in English / Jelaskan dalam Bahasa Indonesia" toggle on Concept and Contrast overrides the rung default for that learner (persisted).

### 5.4 Check engine
Deterministic; no free typing in v1.

| Type | Interaction | Example |
|---|---|---|
| `choice` | Pick one of 2–4 options | "My shoes are ___ the bed." → under |
| `gap` | Sentence with a gap, options as chips below | "She ___ a teacher." → is |
| `order` | Tap word tiles into the right order | [is] [the] [ball] [under] [table] [the] |
| `scene` | Look at a visual state, pick the sentence that matches (or vice versa) | ball shown behind the box → "The ball is behind the box." |
| `fix` | A sentence with one error; pick the corrected version | "She have two cats." |

Each item has: `prompt` (optional Indonesian cue), `answer`, `options`, `why` (one line, shown after answering), and optional `accept` alternates for `order` (e.g. both contraction and full form).

Scoring: first-try correctness is recorded per item. That record drives review (§5.6) and the lesson state *done with mistakes to review*.

### 5.5 Rung test
- 16 items drawn from a fixed authored pool of ~24 for the rung (deterministic per attempt seed; different order each attempt).
- No feedback until the end, then a review of each item with its `why`.
- **Pass mark: 12 of 16 (75%).** Passing marks the rung *climbed* and plays the climb moment (DESIGN §8).
- Failing shows which lessons the misses came from, with direct links. No penalty, retry any time.

### 5.6 Quick review
- 5 items pulled from completed lessons, weighted toward items missed on first try.
- Simple Leitner boxes (1–3) per item stored locally: a miss sends the item to box 1, a correct answer moves it up one box. Box 1 items are drawn first.
- Takes about 2 minutes. Ends with a one-line summary.

### 5.7 Audio
- Every English example, glossary word and check item has a play button.
- Uses the browser's Web Speech API (`speechSynthesis`). The voice is chosen by preference: en-GB, then en-US, then any en-*. The learner can pick accent and speed (0.75× / 1×) in Settings.
- If speech is unavailable, play buttons are hidden and nothing else breaks.
- v2 consideration: pre-generated audio files for consistent quality.

### 5.8 My words
- All glossary words from lessons the learner has opened, grouped by lesson, with audio.
- Search, and a filter for words from lessons with mistakes.

### 5.9 Settings
- Interface language: Bahasa Indonesia (default) / English.
- Explanation language override: follow the rung (default) / always Indonesian / always English.
- Voice accent (British / American) and speed.
- Text size (100% / 115% / 130%).
- Theme: system / light / dark.
- Sound effects on/off (default on, subtle).
- Reduce motion: follow system / on.
- Progress: export to a JSON file, import from a file, reset (with in-page confirm).

### 5.10 About
What the app is, CEFR explained in one paragraph, who made it, how lessons are written (drafted with AI, reviewed by a person), and a contact line for corrections.

---

## 6. Content model (summary)

One Markdown file per lesson with YAML frontmatter. Full schema in `CLAUDE.md §5`.

- `content/curriculum.yaml` — all nine rungs, topics, CEFR, explanation language, status.
- `content/<rung>/<nn>-<slug>.md` — one lesson.
- `content/<rung>/test.yaml` — the rung test item pool.
- `content/data/nouns.yaml` — data for the noun builder.

Each lesson has `status: draft | reviewed`. Production builds show only `reviewed` lessons. Drafts show in development with a visible "Draft" badge.

---

## 7. Visual components (v1)

### 7.1 Place scene
A table, a box on the table, and a ball. The learner picks a preposition and the ball moves to that position, while the sentence and its Indonesian translation update and audio can play.
- Prepositions: in, on, under, next to, behind, in front of.
- Reference object switches correctly (*under the table*, all others *the box*).
- Draw order is correct: *behind* is partly hidden by the box, *in* shows through a semi-transparent box front.
- Also used in `scene` check items (fixed position, choose the sentence).
- Text alternative for screen readers describes the ball's position.

### 7.2 Noun builder
The learner picks a noun from a set (or a random one) and sees:
- **a / an** chosen by the first **sound**, with the sound shown (`/j/` university → *a*; silent h hour → *an*).
- The plural built step by step, with the rule named: +s, +es (s/sh/ch/x endings and some -o words, authored per noun), y → ies, f → ves, irregular, same form.
- Data comes from `content/data/nouns.yaml` (~120 common nouns with `initial_sound: vowel | consonant`, `ipa_hint`, `plural`, `plural_rule`). No computed guessing; every noun is authored.

---

## 8. Progress data (local)

Stored in `localStorage` under one versioned key, `english-ladder:v1`. All access goes through one module that catches failures; the app works (without saving) if storage is blocked.

Stored:
- per lesson: furthest step, completed flag, first-try result per check item, last opened timestamp
- per rung: test attempts (score, date), climbed flag
- Leitner box per item id
- settings
- days practised (dates only, last 60)

Export and import use the same JSON shape with a `schemaVersion` field. Migration functions exist from day one.

---

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Lighthouse performance ≥ 95 on mobile for home and lesson pages. Lesson page JS ≤ 120 KB gzipped. First contentful paint < 1.5 s on mid-range Android over 4G. |
| Offline | Installable PWA. Once a lesson is opened it works offline (cached by service worker). |
| Accessibility | WCAG 2.2 AA. Full keyboard use. Visuals have text alternatives. Focus always visible. Respects reduced motion. |
| Devices | Works from 360 px wide phones to desktop. Touch targets ≥ 44 px. |
| Browsers | Last 2 versions of Chrome, Safari, Firefox, Samsung Internet. |
| Privacy | No cookies, no analytics that identify people, no third-party requests except Google Fonts (self-host in production; see CLAUDE.md). |
| Hosting | GitHub Pages, static export, base path configurable. |

---

## 10. Success measures

There are no analytics, so success is judged by testing with people:
- 5 beginner testers each complete lessons 1–3 unaided; at least 4 of 5 say they'd continue.
- Median lesson completion time between 7 and 12 minutes.
- Testers score ≥ 75% on the rung test after the ten lessons.
- No tester hits an example sentence with grammar they haven't been taught (inventory check, §4.2).

---

## 11. Release plan

| Release | Contents |
|---|---|
| **v1** | App shell, all nine rungs on the ladder, Easy 1 (10 lessons + test), place scene, noun builder, quick review, My words, settings, PWA |
| v1.1 | Easy 2 + time zoom + word-order slots components |
| v1.2 | Easy 3 + tense timeline; placement test (draws from Easy 1–3) |
| later | Medium and Hard rungs, one per release; pre-generated audio |

---

## 12. Decisions made for v1 (from the blueprint's open questions)

1. **Vocabulary:** per-lesson glossary only, collected in My words. No separate vocabulary track.
2. **Placement test:** after Easy 3, when there are three rungs to place into.
3. **Authoring:** lessons drafted by Claude against the grammar inventory and reviewed by the owner before `status: reviewed`.

## 13. Open questions (not blocking v1)
- Should the Hard rungs carry the corpus-evidence feature from the Nuance draft, and with which corpus?
- Pre-generated audio: which TTS source, and how to keep file size reasonable?
- Should progress export also produce a shareable "certificate" image when a rung is climbed?
