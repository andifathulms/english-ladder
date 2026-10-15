# CLAUDE.md — English Ladder

Guidance for Claude Code working in this repository. Read `PRD.md` for what to build and `DESIGN.md` for how it must look and feel. This file covers how to build it.

---

## 1. What this is

A static, levelled English course for Indonesian speakers. Nine rungs (Easy 1 → Hard 3, CEFR A1 → C1). v1 ships the full app shell plus **Easy 1** content: 8 lessons, a rung test, two interactive visual components (place scene, noun builder), quick review, My words, settings, and offline support. Progress is stored only in the learner's browser. Deployed to GitHub Pages.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14, App Router, **`output: 'export'`** (fully static), TypeScript strict |
| Styling | Tailwind CSS, with every colour, radius, shadow and motion value mapped to the CSS custom properties defined in `DESIGN.md` (no Tailwind default palette in components) |
| Fonts | Self-hosted at build: Newsreader and IBM Plex Mono via `next/font/google`; Atkinson Hyperlegible Next via `next/font/local` (`app/font-files`) |
| Content | Markdown + YAML frontmatter, parsed at build with `gray-matter` and `js-yaml`, validated with `zod` |
| Visuals | React components rendering inline SVG. No D3 or canvas needed for v1 |
| Audio | Web Speech API for speech; Web Audio API for sound effects (synthesised, no files) |
| State | React context + a single storage module over `localStorage` |
| Offline | Hand-written service worker in `public/sw.js` |
| Tests | Vitest + Testing Library (unit, component); Playwright + `@axe-core/playwright` (e2e, accessibility) |
| Lint/format | ESLint (next config) + Prettier |

No backend, no API routes, no server actions, no analytics, no third-party requests at runtime.

---

## 3. Commands

```bash
npm install
npm run dev            # local dev, shows draft lessons with a Draft badge
npm run build          # static export to ./out (reviewed lessons only)
npm run preview        # serve ./out locally
npm run content:check  # validate all content (schema + inventory lint); fails on errors
npm run test           # vitest
npm run test:e2e       # playwright, against the built site
npm run lint
```

`npm run build` must run `content:check` first and fail on any content error.

`NEXT_PUBLIC_BASE_PATH` sets the GitHub Pages base path (e.g. `/english-ladder`). Every internal link and asset must work with and without it.

---

## 4. Repository layout

```
app/
  layout.tsx                 # fonts, theme script, providers
  page.tsx                   # Home: the Ladder
  rung/[rung]/page.tsx       # Rung page
  rung/[rung]/[lesson]/page.tsx   # Lesson player
  rung/[rung]/test/page.tsx  # Rung test
  review/page.tsx            # Quick review
  words/page.tsx             # My words
  me/page.tsx                # Saya: progress summary, week, links to settings/about
  settings/page.tsx
  about/page.tsx
components/
  ladder/  lesson/  check/  ui/      # ui/AppShell + AppNav: tab bar (phone) / sidebar (≥900px)
  visuals/
    PlaceScene.tsx
    NounBuilder.tsx
    registry.ts              # visual id -> component
lib/
  content/                   # loaders + zod schemas (build time only)
  check/                     # check engine: grade(), seeds, Leitner
  progress/                  # storage module, migrations, export/import
  speech/                    # speech + sound effects
  i18n/                      # UI strings id/en
content/
  curriculum.yaml
  easy-1/
    01-to-be.md … 08-to-be-questions.md
    test.yaml
  data/
    nouns.yaml
  lexicon/
    core.yaml                # function words allowed per rung
public/
  sw.js  manifest.webmanifest  icons/
scripts/
  content-check.ts
styles/
  tokens.css                 # every DESIGN.md token, light + dark + data-theme
tests/
```

---

## 5. Content model

### 5.1 `content/curriculum.yaml`

```yaml
rungs:
  - id: easy-1
    name: Easy 1
    tier: easy            # easy | medium | hard
    cefr: A1
    explain_lang: id      # id | mixed | en  (default explanation language)
    status: live          # live | soon
    description: { id: "...", en: "..." }
    topics: [to be, he/she/it/they, a/an and plurals, this/that, have/has, possessives, prepositions of place, to be questions]
    inventory: [be-present, subject-pronouns, articles-a-an, plural-regular, plural-irregular-core, demonstratives, have-present, possessive-adj, possessive-s, prep-place-basic, be-questions-negatives]
  # … all nine rungs, later ones with status: soon
```

### 5.2 Lesson file `content/<rung>/<nn>-<slug>.md`

Frontmatter (validated by zod):

```yaml
id: easy1-07-prepositions-place
rung: easy-1
order: 7
status: draft                     # draft | reviewed
minutes: 9
title: { en: "Where things are", id: "Di mana bendanya?" }
introduces: [prep-place-basic]    # inventory ids taught here
spiral: prepositions
visual: { id: place-scene, props: { initial: on } }   # optional
examples:
  - { en: "My phone is [[in]] my bag.", id: "HP-ku di dalam tas." }
pair:                             # the wrong → right pair for the Contrast step
  off: "The book is at the table."
  natural: "The book is [[on]] the table."
check:
  - id: e1-07-c1
    type: choice                  # choice | gap | order | scene | fix
    cue: "Kuncinya di atas meja."
    prompt: "The keys are ___ the table."
    options: [in, on, at]
    answer: on
    why: { id: "On: di atas permukaan.", en: "On: on top of a surface." }
glossary:
  - { en: under, id: "di bawah" }
next: easy1-08-to-be-questions
```

Body: prose sections introduced by fixed headings. The parser maps them by heading text and errors on unknown ones.

```markdown
## concept.id
Kata depan tempat menjawab pertanyaan *di mana?* …

## concept.en
Prepositions of place answer the question *where?* …

## contrast.id
Bahasa Indonesia memakai **di** untuk hampir semua posisi …

## contrast.en
Indonesian uses **di** for almost every position …
```

### 5.3 Markup inside sentences
- `[[word]]` marks the grammar focus (one per sentence). Rendered per DESIGN §4.2.
- `*text*` is italic, `**text**` is bold. No other inline markup.

### 5.4 Check item types

| type | required fields |
|---|---|
| `choice` | prompt, options (2–4), answer |
| `gap` | prompt (contains `___` once), options, answer |
| `order` | tiles (array), answer (array), optional `accept` (array of arrays) |
| `scene` | visual `{id, props}`, options (sentences), answer |
| `fix` | wrong (sentence), options (sentences), answer |

Every item needs a globally unique `id` and a bilingual `why`. Ids are permanent: progress and Leitner boxes are keyed by them, so never rename an id after release. Replace items by adding new ids.

### 5.5 Rung test `content/<rung>/test.yaml`
A pool of ~24 items in the same item shape, each with `from: <lesson id>`. The test draws 16 using a seeded shuffle (seed stored per attempt) with at least one item from every lesson.

### 5.6 `content/data/nouns.yaml`

```yaml
- { word: hour, initial_sound: vowel, ipa_hint: "/aʊ/", plural: hours, plural_rule: s, id: jam }
- { word: university, initial_sound: consonant, ipa_hint: "/j/", plural: universities, plural_rule: y-ies, id: universitas }
- { word: child, initial_sound: consonant, ipa_hint: "/tʃ/", plural: children, plural_rule: irregular, id: anak }
```
`plural_rule ∈ s | es | y-ies | f-ves | irregular | same`. All values authored; the component never guesses.

---

## 6. Content rules (most important section)

These rules decide whether a beginner can actually use the app.

1. **Grammar inventory.** English in a lesson (examples, pair, check items, glossary) may use only structures from earlier rungs plus this rung's inventory up to and including this lesson's `introduces`. Example: lesson 3 cannot use *have*, possessives or prepositions yet.
2. **Lexicon.** Words in English text must come from `content/lexicon/core.yaml` for the rung, or from glossaries of this and earlier lessons. `content:check` flags unknown words as **errors** in reviewed lessons and **warnings** in drafts.
3. **Structure lint.** `content:check` also flags patterns that signal untaught grammar for the rung (e.g. for Easy 1: `-ed` past forms, `will`, `going to`, `have been`, `-ing` after a form of *be*, any modal verb such as *can*, which arrives in Easy 2). Rules live in `scripts/content-check.ts` per rung.
4. **Indonesian quality.** Natural, informal-standard Indonesian (*kamu*, *-ku*, *-nya* as people actually speak). Not word-for-word translations of the English. Translations show meaning, not structure.
5. **Everyday content.** Sentences come from daily Indonesian life: family, work, motorbikes, warung, mosque, school, phones, rain. Names: varied Indonesian names (Rina, Budi, Dewi, Andi, Putu, Siti, Yohanes, Mei). No stereotypes, no politics, no romance.
6. **One idea per lesson.** If an explanation needs a second idea, it belongs in another lesson.
7. **Explanations are short.** Concept: 2–4 sentences. Contrast: 2–3 sentences plus the pair. A beginner reads on a phone.
8. **Drafting.** Claude may draft lessons with `status: draft`. Only the owner changes `status` to `reviewed`. Never set `reviewed` yourself.
9. **Accuracy.** When a rule has a real exception that beginners will meet, mention it in one line rather than hiding it. When usage differs between British and American English, say so.

---

## 7. Architecture notes

### 7.1 Static generation
- All routes use `generateStaticParams` from the curriculum and lesson files.
- Content loaders run at build only (`lib/content` must never be imported by client components). Pass plain JSON props to client components.
- Lesson pages are server components that render the shell and hand the lesson JSON to a client `LessonPlayer`.

### 7.2 Progress module `lib/progress`
Single owner of `localStorage`. Everything else calls its API.

```ts
getState(): ProgressState
setLessonStep(lessonId, step)
completeLesson(lessonId)
recordAnswer(itemId, correctFirstTry: boolean)   // also updates Leitner box
recordTest(rungId, { score, total, seed, date })
getSettings() / setSettings(patch)
markPracticedToday()
exportJSON(): string
importJSON(json): Result
reset()
```

- Key: `english-ladder:v1`. State has `schemaVersion`. `migrations.ts` exists from day one.
- Every read/write is wrapped in try/catch. If storage is unavailable, keep state in memory and show one quiet notice in Settings ("Progres tidak tersimpan di browser ini").
- Writes are debounced (250ms) and flushed on `visibilitychange`.

### 7.3 Check engine `lib/check`
- `grade(item, response): { correct: boolean }` — pure function, fully unit tested. `order` compares token arrays against `answer` and every `accept` entry; comparison is case-sensitive for the first word only and ignores trailing punctuation.
- `drawTest(pool, seed, n=16)` — deterministic; guarantees ≥1 item per lesson.
- `drawReview(progress, items, n=5)` — box 1 first, then box 2, then box 3; ties broken by oldest `lastSeen`.

### 7.4 Visual components
Every visual in `components/visuals` follows one contract:

```ts
type VisualProps<S> = {
  state?: S               // controlled state (used by scene check items)
  interactive?: boolean   // false in scene checks
  onStateChange?: (s: S) => void
  lang: 'id' | 'en'       // for labels and text alternative
}
```
- Pure SVG, viewBox 400×260 for scenes, drawn per DESIGN §10 with token colours only.
- Exposes a live text alternative (`aria-live="polite"`) describing the current state in the UI language.
- Keyboard: option buttons for state, arrow keys move between them.
- Reduced motion handled inside the component.
- Registered in `registry.ts` by id; lesson frontmatter refers to visuals by id only.

### 7.5 Speech and sound `lib/speech`
- `speak(text, { accent, rate, onBoundary })` — chooses voice en-GB → en-US → any `en-*` according to settings; resolves silently if unavailable. Voices load asynchronously; handle `voiceschanged`.
- `canSpeak()` — play buttons render only when true.
- `sfx(name)` — Web Audio synthesis per DESIGN §9; creates the `AudioContext` lazily on first user gesture; no-op when sound is off.

### 7.6 Theme and settings
- An inline script in `layout.tsx` sets `data-theme` and text size before first paint to avoid flashing.
- `styles/tokens.css` defines every token on `:root`, redefines in `@media (prefers-color-scheme: dark)` under `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`.

### 7.7 i18n
- UI strings in `lib/i18n/{id,en}.ts`, typed keys. UI language from settings (default `id`).
- Lesson explanation language: settings override, else the rung's `explain_lang`. `mixed` shows the English explanation with the Indonesian one collapsed under "Penjelasan dalam Bahasa Indonesia".

### 7.8 Offline
`public/sw.js`: precache the app shell and fonts at install; cache-first for `/_next/static/*`; stale-while-revalidate for pages and content JSON. Bump `CACHE_VERSION` on every release. Register only in production.

---

## 8. Testing

- **Unit:** `grade`, `drawTest`, `drawReview`, migrations, content parser, sentence markup parser, noun builder logic (article and plural from data).
- **Component:** `Sentence` (focus rendering, `lang` attributes), `OptionPill` states, `PlaceScene` (state → position, text alternative updates, draw order slot for *behind* and *in*), `NounBuilder` (hour → an, university → a).
- **Content:** `content:check` runs in CI; zero errors required.
- **E2E (Playwright):** first visit → start Easy 1 → finish lesson 1 → home shows continue card with the right sentence; close mid-lesson and resume at the same step; pass the rung test with seeded answers → climb moment shows; storage disabled → app still works.
- **Accessibility:** axe on every route in light and dark; zero serious or critical violations.
- **Visual sanity:** Playwright screenshots of home, a lesson step with each visual, and the climb moment at 360px and 1280px, both themes. Review them; don't snapshot-assert pixels.

---

## 9. Build order

Work in this order. Finish each milestone (tests passing) before starting the next.

1. **M0 Foundations** — Next static export with base path, tokens.css from DESIGN.md, fonts, theme script, i18n scaffold, CI (lint, test, build).
2. **M1 Content pipeline** — zod schemas, loaders, body section parser, sentence markup, `content:check` with schema validation. Seed `curriculum.yaml` with all nine rungs and one sample lesson.
3. **M2 Ladder and rung pages** — LadderRail, RungRow, NotchBar, ContinueCard, WeekStrip, LessonRow; all with real progress from a stubbed state.
4. **M3 Lesson player** — six steps, StepBar, BottomActionBar, transitions, keyboard, resume, explanation-language toggle, `Sentence` with audio.
5. **M4 Check engine and rung test** — all five item types, feedback states, sounds, test draw, results, climb moment.
6. **M5 Visuals** — PlaceScene, NounBuilder, `scene` check items using them.
7. **M6 Progress features** — quick review with Leitner, My words, Settings (all options), export/import/reset, migrations.
8. **M7 Content** — draft all eight Easy 1 lessons, the test pool and `nouns.yaml` (~120 nouns); add inventory and lexicon lint; fix every warning.
9. **M8 Polish** — offline, PWA manifest and icon, delight list (DESIGN §8), reduced-motion pass, axe pass, Lighthouse ≥ 95 mobile, quality checklist (DESIGN §14).

---

## 10. Definition of done (any feature)

- Matches DESIGN.md, including both themes, 360px width and 130% text size.
- Keyboard and screen reader paths work.
- No literal colours, font sizes or durations outside tokens.
- Unit/component tests added; existing tests pass; `content:check` clean.
- Works with `localStorage` blocked.
- Works under the GitHub Pages base path.

---

## 11. Don't

- Don't add a backend, API routes, accounts, analytics or any runtime third-party request.
- Don't use the Tailwind default colour palette or arbitrary colour values in components.
- Don't add lives, timers, streak counters, confetti, mascots or emoji (DESIGN §13).
- Don't lock lessons.
- Don't compute grammar facts the content should state (articles, plurals, translations). Author them in data.
- Don't set `status: reviewed` on content.
- Don't rename check item ids after release.
- Don't import `lib/content` into client components.
- Don't introduce grammar in a lesson before the lesson that teaches it (§6.1).
