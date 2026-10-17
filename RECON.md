# English Ladder: reconnaissance of the code as it is now

Snapshot taken from `main` at commit `58eab3c` (working tree clean). This describes what the code does. Where `PRD.md`, `CLAUDE.md` or `DESIGN.md` disagree, the code is reported and the disagreement is listed in §12. `npm run content:check` was run (read-only) and reports: `10 rungs, 18 lessons, 152 check items: 0 errors, 0 warnings`. No build, test run or install was performed.

---

### 1. Snapshot

**Stack and versions** (`package.json`; all versions pinned exactly)

| Concern | Package | Version |
|---|---|---|
| Framework | `next` | 14.2.33 (App Router, `output: 'export'`) |
| UI | `react`, `react-dom` | 18.3.1 |
| Language | `typescript` | 5.9.3, `strict: true` (`tsconfig.json`), path alias `@/*` → `./*` |
| Styling | `tailwindcss` 3.4.18, `postcss` 8.5.6, `autoprefixer` 10.4.21 | |
| Content parsing | `gray-matter` 4.0.3, `js-yaml` 4.1.0, `zod` 3.25.76 | all devDependencies (build time only) |
| Script runner | `tsx` 4.20.6 | runs `scripts/content-check.ts` |
| Unit/component tests | `vitest` 3.2.4, `jsdom` 25.0.1, `@testing-library/react` 16.3.0, `@testing-library/jest-dom` 6.9.1, `@vitejs/plugin-react` 4.7.0 | |
| E2E / a11y | `@playwright/test` 1.56.1, `@axe-core/playwright` 4.10.2 | |
| Lint/format | `eslint` 8.57.1, `eslint-config-next` 14.2.33, `eslint-config-prettier` 9.1.2, `prettier` 3.6.2 | `.eslintrc.json` extends `next/core-web-vitals`, `prettier` |

Runtime dependencies are only `next`, `react`, `react-dom`. No state library, no animation library, no icon library, no D3, no audio files.

**Build / deploy**

- `next.config.mjs`: `output: 'export'`, `basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''`, `assetPrefix: basePath || undefined`, `trailingSlash: true`, `images: { unoptimized: true }`, `reactStrictMode: true`.
- `lib/basePath.ts`: `withBase(path)` prefixes `NEXT_PUBLIC_BASE_PATH` for non-`next/link` URLs (manifest, icons, service worker).
- Drafts: `lib/content/load.ts` `showDrafts()` returns true when `NODE_ENV !== 'production'` **or** `NEXT_PUBLIC_SHOW_DRAFTS === 'true'`. The deploy workflow sets `NEXT_PUBLIC_SHOW_DRAFTS: 'true'`, so all (draft) lessons ship.
- `.github/workflows/deploy.yml`: on push to `main`, PRs, manual. Jobs: `build` (Node 22, `npm ci`, `lint`, `test`, `build` with `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`, `touch out/.nojekyll`, upload Pages artifact), `e2e` (Playwright chromium, build without base path, `npm run test:e2e`), `deploy` (`actions/deploy-pages@v4`, main only, needs `build`, not `e2e`).
- PWA: `public/manifest.webmanifest` (`name`/`short_name` "English Ladder", `lang: id`, `start_url`/`scope` `./`, `display: standalone`, `background_color #F6F2E9`, `theme_color #13213F`, icons: `icons/icon.svg` (any), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (maskable)).
- Service worker `public/sw.js`: `CACHE_VERSION = 'v1.3.0'`, cache `english-ladder-v1.3.0`. Install precaches (relative to scope) `''`, `rung/easy-1/`, `review/`, `words/`, `me/`, `settings/`, `about/`, `manifest.webmanifest`, `icons/icon.svg` (each `add` failure swallowed), then `skipWaiting`. Activate deletes other `english-ladder-*` caches and `clients.claim()`. Fetch: GET same-origin within scope only; `/_next/static/` cache-first; everything else stale-while-revalidate (ignores search for `_rsc` requests), offline fallback to the cached root. Registered by `lib/sw.ts` from `ProgressProvider` only when `NODE_ENV === 'production'`, with `scope: withBase('/')`.
- `scripts/serve.mjs`: tiny static server for `./out` on `PORT` (default 4173), honours base path, 404 → `out/404.html`.
- `scripts/make-icons.mjs`: renders `public/icons/icon.svg` to the three PNGs with Playwright (maskable has 12% padding) on `#13213F`.

**npm scripts**

```
dev            next dev
prebuild       npm run content:check
build          next build
preview        node scripts/serve.mjs
content:check  tsx scripts/content-check.ts
test           vitest run
test:watch     vitest
test:e2e       playwright test
lint           next lint
format         prettier --write .
```

**Last 15 commits** (`git log --oneline -15`)

```
58eab3c feat(speech): clearer voice selection, female by default
0af98a4 feat(read): Read & listen capstone per rung, with the Easy 1 text
758e3d7 feat(starter): optional pre-A1 rung under Easy 1
8bc0b2a content(curriculum): rewrite topics for Easy 2 to Hard 3
465ff20 content(easy-1): sound, words and talk cards for all ten lessons
a078c1c feat(lesson): sound, words and talk cards; listen check items
1d862ae content(easy-1): ten lessons — split a/an from plurals, add adjective order
c963a11 content(easy-1): accuracy pass on lessons, test pool and noun rules
140584b feat: open in the bright cream theme by default
12472d4 style: navy and cream catalogue look
1d143c4 feat(r4): lesson player top bar, feedback sheet, done screen, My words
89b4965 feat(r3): board continue card, lesson strip, tier-grouped ladder, rung path
b9f1cbc feat(r2): four-tab navigation shell and the Saya page
4434a59 style(r1): Pagi palette, board and tier-tint tokens, Atkinson Next and Mono
b75ca69 test: use an in-memory localStorage on every Node version
```

Direction: a visual redesign (R1–R4: navy/cream "catalogue" look, four-tab shell, board continue card), then content depth (strand cards, listen items, ten Easy 1 lessons), then new course surfaces (optional Starter rung, Read & listen capstone), then speech quality.

---

### 2. Curriculum and levels as implemented

**Structure.** 10 rungs in one flat list (`content/curriculum.yaml`), grouped into 3 tiers by a `tier` field: `easy`, `medium`, `hard`. Tier display name is the id capitalised (`components/ui/tier.ts` `tierName`): "Easy", "Medium", "Hard". The ladder UI shows tiers top to bottom Hard → Medium → Easy, rungs within a tier in reverse curriculum order (`components/ladder/LadderRail.tsx`).

| Order | id | Name | Tier | CEFR | explain_lang | Status | lessons (declared) | Optional |
|---|---|---|---|---|---|---|---|---|
| 0 | `starter` | Starter | easy | Pre-A1 | id | **live** | 8 | **yes** |
| 1 | `easy-1` | Easy 1 | easy | A1 | id | **live** | 10 | no |
| 2 | `easy-2` | Easy 2 | easy | A1 | id | soon | 10 | no |
| 3 | `easy-3` | Easy 3 | easy | A2− | id | soon | 9 | no |
| 4 | `medium-1` | Medium 1 | medium | A2 | mixed | soon | 9 | no |
| 5 | `medium-2` | Medium 2 | medium | B1 | mixed | soon | 8 | no |
| 6 | `medium-3` | Medium 3 | medium | B1+ | en | soon | 9 | no |
| 7 | `hard-1` | Hard 1 | hard | B2 | en | soon | 8 | no |
| 8 | `hard-2` | Hard 2 | hard | B2+ | en | soon | 8 | no |
| 9 | `hard-3` | Hard 3 | hard | C1 | en | soon | 8 | no |

`lessons` is a declared count used for notch bars and progress rings; it is not derived from the files. `optional: true` means the rung is never chosen as the learner's "current rung" (`lib/progress/derive.ts` `currentRung`), but a learner working inside it stays there (`continueTarget`). The home welcome card links to Starter with `home.starterLink`.

**`content/curriculum.yaml` (full)**

```yaml
# Single source of truth for the ladder. Bottom (starter) to top (hard-3).
rungs:
  # Optional floor for absolute beginners: sounds, letters, numbers, time and survival phrases.
  - id: starter
    name: Starter
    tier: easy
    cefr: Pre-A1
    explain_lang: id
    status: live
    optional: true
    lessons: 8
    description:
      id: "Sebelum Easy 1: bunyi bahasa Inggris, huruf, angka, harga, jam, dan kalimat penyelamat."
      en: "Before Easy 1: English sounds, letters, numbers, prices, time, and phrases that rescue a conversation."
    topics: [greetings, the alphabet, numbers to 100, prices and big numbers, time and days, consonant sounds, long and short vowels, survival phrases]
    threads: [greetings, sounds, numbers, time, survival]
    inventory: [greetings, alphabet, numbers, money, time, sounds-consonants, sounds-vowels, survival-chunks]

  - id: easy-1
    name: Easy 1
    tier: easy
    cefr: A1
    explain_lang: id
    status: live
    lessons: 10
    description:
      id: "Kalimat pertamamu: siapa, apa, punya siapa, dan di mana."
      en: "Your first sentences: who, what, whose and where."
    topics: [to be, he/she/it/they, a/an, plurals, this/that, adjective before noun, have/has, possessives, prepositions of place, to be questions]
    threads: [be, pronouns, articles, demonstratives, word-order, have, possessives, prepositions, questions]
    inventory: [be-present, subject-pronouns, articles-a-an, plural-regular, plural-irregular-core, demonstratives, adjective-before-noun, have-present, possessive-adj, possessive-s, prep-place-basic, be-questions-negatives]

  # Contrast plan: present simple pair: *I am work* → I work (overcorrection after Easy 1). there is: *In my house have…* (ada covers have and there is).
  # Words strand: pinjam = borrow and lend. Phrasal verbs start here as vocabulary (get up, turn on).
  - id: easy-2
    name: Easy 2
    tier: easy
    cefr: A1
    explain_lang: id
    status: soon
    lessons: 10
    description:
      id: "Kegiatan sehari-hari: apa yang kamu lakukan, kapan, dan apa yang bisa kamu lakukan."
      en: "Daily life: what you do, when, and what you can do."
    topics: [what/who/where with be, present simple, do/does questions, "don't/doesn't", there is/there are, want to and would like, imperatives, can and can't, object pronouns, the vs a, at/on/in for time]
    threads: [tense, questions, modals, prepositions, pronouns, word-order, articles]
    inventory: []

  # Contrast plan: present continuous: sedang → -ing; no *I am knowing*. Past regular: the -ed sounds /t d ɪd/.
  # Comparatives: *bigger from* (dari = than) and *more better*.
  - id: easy-3
    name: Easy 3
    tier: easy
    cefr: A2−
    explain_lang: id
    status: soon
    lessons: 9
    description:
      id: "Sekarang dan kemarin: yang sedang terjadi, yang sudah terjadi, dan rencana."
      en: "Now and yesterday: what is happening, what happened, and plans."
    topics: [present continuous, was/were, past simple regular, past simple irregular (the top 30), past simple irregular (the rest), countable and uncountable with some/any, much/many, going to, comparatives]
    threads: [tense, articles, comparison, future]
    inventory: []

  # Contrast plan: already/yet/still map to sudah/belum/masih: the key lesson for Indonesian speakers (*I already eat*).
  # Modals: mustn't vs don't have to = tidak boleh vs tidak harus. Ever = pernah. too/enough: *too delicious*.
  - id: medium-1
    name: Medium 1
    tier: medium
    cefr: A2
    explain_lang: mixed
    status: soon
    lessons: 9
    description:
      id: "Cerita dan rencana yang lebih panjang, plus aturan dan nasihat."
      en: "Longer stories and plans, plus rules and advice."
    topics: [past continuous, superlatives, will vs going to, present perfect with ever/never, already/yet/still, -ed and -ing adjectives, should/must/have to, first conditional, too/enough, adverbs of manner]
    threads: [tense, comparison, future, modals, conditionals]
    inventory: []

  # Contrast plan: passive: Indonesian di- is far more frequent, so teach when not to use it; *The house built* lacks be.
  # Relative clauses: *the book that I read it*. Question tags: kan? is one tag, English has many.
  - id: medium-2
    name: Medium 2
    tier: medium
    cefr: B1
    explain_lang: mixed
    status: soon
    lessons: 8
    description:
      en: "Connecting time and ideas: experience, habits in the past, and who did what."
      id: "Menghubungkan waktu dan ide: pengalaman, kebiasaan dulu, dan siapa melakukan apa."
    topics: [present perfect vs past simple, present perfect continuous, used to, passive voice, relative clauses, second conditional, verb patterns (stop to, stop -ing), question tags]
    threads: [tense, passive, clauses, conditionals, questions]
    inventory: []

  # Contrast plan: linking words pair: *Although it rained, but we went* (walaupun…, tetapi…). Articles: go to school vs go to the school.
  - id: medium-3
    name: Medium 3
    tier: medium
    cefr: B1+
    explain_lang: en
    status: soon
    lessons: 9
    description:
      en: "Guessing, regretting and linking: sounding more natural in longer talk."
      id: "Menebak, menyesal dan menyambung: terdengar lebih alami saat bicara panjang."
    topics: [past perfect, reported speech, modals of deduction, third conditional, wish, passive in all tenses, articles in depth, phrasal verbs, linking words]
    threads: [tense, reporting, modals, conditionals, passive, articles, discourse]
    inventory: []

  # Contrast plan: it is said that ↔ katanya / konon: Indonesian is the helpful bridge here.
  - id: hard-1
    name: Hard 1
    tier: hard
    cefr: B2
    explain_lang: en
    status: soon
    lessons: 8
    description:
      en: "Precision and emphasis: saying exactly what you mean, and stressing what matters."
      id: "Presisi dan penekanan: bilang persis yang kamu maksud, dan tekankan yang penting."
    topics: [mixed conditionals, future continuous and perfect, it is said that, causatives (make, let, get, have something done), non-defining relative clauses, cleft sentences, emphasis with do, introduction to inversion]
    threads: [conditionals, future, passive, clauses, emphasis]
    inventory: []

  # Contrast plan: emails: Dengan hormat ≠ With respect; Dear Ms Sari, the request first, then the reason.
  - id: hard-2
    name: Hard 2
    tier: hard
    cefr: B2+
    explain_lang: en
    status: soon
    lessons: 8
    description:
      en: "Writing and speaking with control: register, hedging and compact sentences."
      id: "Menulis dan bicara dengan kendali: register, hedging, dan kalimat yang ringkas."
    topics: [participle clauses, subjunctive, hedging, nominalisation, advanced article use, collocations, register, emails and formal letters]
    threads: [clauses, modals, articles, style]
    inventory: []

  # Contrast plan: stress for meaning: I didn't say SHE took it. Teach modal nuance as pragmatics (softening disagreement).
  - id: hard-3
    name: Hard 3
    tier: hard
    cefr: C1
    explain_lang: en
    status: soon
    lessons: 8
    description:
      en: "Polish: the small choices that make English sound fluent and deliberate."
      id: "Polesan akhir: pilihan kecil yang membuat bahasa Inggrismu terdengar fasih dan sengaja."
    topics: [inversion, ellipsis and substitution, discourse markers, nuance in modals and softening, fronting, academic style, idiomatic precision, stress and intonation for meaning]
    threads: [emphasis, discourse, modals, style]
    inventory: []
```

**Live lessons.** All 18 are `status: draft`. Lesson ids are permanent and no longer match file names or order (lessons were reordered and split after ids were issued).

Starter (`content/starter/`, 5 check items each, no visuals, all use `worked` for the See step)

| order | file | id | title.en | title.id | min | strands |
|---|---|---|---|---|---|---|
| 1 | `01-hello.md` | `starter-01-hello` | Hello and goodbye | Halo dan sampai jumpa | 6 | talk, words |
| 2 | `02-alphabet.md` | `starter-02-alphabet` | A, B, C | Mengeja nama | 7 | sound, words |
| 3 | `03-numbers.md` | `starter-03-numbers` | Thirteen or thirty? | Angka 1 sampai 100 | 7 | sound |
| 4 | `04-money.md` | `starter-04-money` | Twenty-five thousand rupiah | Harga dan angka besar | 7 | talk, words |
| 5 | `05-time.md` | `starter-05-time` | Seven thirty on Monday | Jam dan hari | 7 | sound, words |
| 6 | `06-sounds.md` | `starter-06-sounds` | Think, very, zoo, ship | Bunyi yang tidak ada di bahasa Indonesia | 8 | sound |
| 7 | `07-vowels.md` | `starter-07-vowels` | Ship or sheep? | Vokal pendek dan panjang | 7 | sound |
| 8 | `08-survival.md` | `starter-08-survival` | Sorry? Slowly, please. | Kalimat penyelamat | 6 | talk |

Starter test: `content/starter/test.yaml`, `draw: 12`, `pass: 9`, 16 items (5 choice, 5 gap, 5 listen, 1 order). No Starter reading.

Easy 1 (`content/easy-1/`, 6 check items each)

| order | file | id | title.en | title.id | min | See step | strands |
|---|---|---|---|---|---|---|---|
| 1 | `01-to-be.md` | `easy1-01-to-be` | I am, you are | Aku, kamu | 6 | worked | sound, talk, words |
| 2 | `02-pronouns.md` | `easy1-02-pronouns` | He, she, it, they | Dia itu he atau she? | 7 | worked | sound, talk, words |
| 3 | `03-a-an.md` | `easy1-03-articles-plurals` | A or an | A atau an | 7 | noun-builder | sound, talk, words |
| 4 | `04-plurals.md` | `easy1-04-plurals` | One, two, many | Satu, dua, banyak | 7 | noun-builder | sound, words |
| 5 | `05-demonstratives.md` | `easy1-04-demonstratives` | This, that, these, those | Ini dan itu | 8 | near-far | sound, talk, words |
| 6 | `06-adjective-noun.md` | `easy1-06-adjective-noun` | A new book | Buku baru | 7 | worked | sound, talk, words |
| 7 | `07-have-has.md` | `easy1-05-have-has` | Have and has | Punya | 7 | worked | sound, talk, words |
| 8 | `08-possessives.md` | `easy1-06-possessives` | My, your, his, her, 's | Punya siapa? | 8 | worked | sound, talk, words |
| 9 | `09-prepositions-place.md` | `easy1-07-prepositions-place` | Where things are | Di mana bendanya? | 9 | place-scene | sound, talk, words |
| 10 | `10-to-be-questions.md` | `easy1-08-to-be-questions` | Questions and no | Bertanya dan menjawab tidak | 8 | worked | sound, talk, words |

Easy 1 test: `content/easy-1/test.yaml`, `draw: 16`, `pass: 12`, 32 items (16 gap, 6 fix, 4 choice, 3 scene, 2 order, 1 listen). Easy 1 reading: `content/easy-1/reading.yaml` ("Rina's family" / "Keluarga Rina", 4 items).

Other data: `content/data/nouns.yaml` (142 nouns), `content/lexicon/core.yaml` (word lists keyed `starter`, `easy-1`).

**Concepts not in the original PRD's v1 scope** (some were later back-filled into `CLAUDE.md`)

- **Optional Starter rung** (`optional: true`, CEFR "Pre-A1"), never the current rung on its own.
- **Tiers** as a grouping for the ladder (Hard → Medium → Easy sections with a tier dot and CEFR range, e.g. "Easy · Pre-A1–A2−").
- **Read & listen capstone** per rung (`reading.yaml`, route `/rung/<rung>/read/`): one connected text, collapsible translation, glossary, 2–4 check items. Answers are not recorded in progress.
- **Strand cards** in lessons: `sound` (pronunciation point with playable words), `talk` (2–4 line dialogue), `words` (meanings the two languages split differently).
- **`worked` examples** (2–8 sentences) as the See step when there is no visual. Schema requires `visual` or `worked`.
- **`summary`** (required bilingual one-liner) used on the Done screen.
- **`listen`** check item type.
- **`near-far`** visual (third visual, registered in the registry).
- **Spiral `threads`** per rung: lesson `spiral` matched against later rungs' `threads` to say "you'll meet this again in X"; rung page lists up to 3 later rungs sharing threads.
- **Per-pool `draw` and `pass`** in `test.yaml`.
- **Voice gender** setting.
- **Saya (Me) page**: stats and links to Settings/About.
- **Not present:** placement test, units/chapters, XP/points, streak counts, accounts, certificates.

---

### 3. Lesson structure

**Steps** (`components/lesson/steps.ts` `STEP_KEYS`, rendered in `components/lesson/LessonPlayer.tsx`). Six steps, indices 0–5:

| # | key | Bahasa Indonesia | English | Renders |
|---|---|---|---|---|
| 0 | `step.concept` | Konsep | Concept | Step label; `<h1 lang="en">` title.en + italic title.id; explanation `concept` via explain-language logic (Prose) |
| 1 | `step.see` | Lihat | See | `VisualStage` (interactive visual on `--paper-2`) if `visual`, else a `--paper-2` "Contoh lengkap / worked" section listing `worked` sentences (`Sentence` with translation) |
| 2 | `step.examples` | Contoh | Examples | Hint "Ketuk kata yang disorot untuk catatan kecil."; 4–6 `Sentence`s with translation, play button and tappable focus note (`note` or generic "Kata ini yang sedang kita pelajari."); then `TalkCard` (if `talk`) and `SoundCard` (if `sound`) |
| 3 | `step.contrast` | Bandingkan | Contrast | Explanation `contrast`; `PairCard` (off "Terdengar aneh" vs natural "Alami"); `WordsCard` (if `words`) |
| 4 | `step.check` | Latihan | Check | `CheckStep`: counter "Soal n dari N", one `CheckItemView` at a time (practice mode) |
| 5 | `step.done` | Selesai | Done | 76px accent check badge with 10px `--accent-soft` ring; "Selesai: {title}"; `summary`; card with rung name, "n / total" and a large `NotchBar` (fresh notch animates); "Kata baru" glossary chips (en serif + id italic, no play buttons); "{n} soal untuk diulang nanti" or "Semua benar di percobaan pertama."; spiral line; bottom bar: "Pelajaran {n+1} →" or "Ikut tes {rung} →", plus "Kembali ke {rung}" |

Navigation inside the player: back arrow (prev step, or rung page at step 0), close ✕ (rung page), "Lanjut →" in the sticky bottom bar. On step 4 "Lanjut" is disabled until the current item is solved; it advances to the next item, then to Done. Keyboard: ArrowRight next (when allowed), ArrowLeft previous (both ignored when focus is inside `[data-visual]`), Enter continue (when focus is not on a control), Space clicks the first `main [data-play]` button. Position is saved on each step/item change (`setLessonStep(id, step, checkIndex)`); reopening resumes at that step and item. Opening a completed lesson calls `restartLesson` (step 0, completed stays true). Entering step 5 calls `completeLesson` and plays `lessonDone`.

**Content schemas** (`lib/content/schema.ts`, full)

```ts
import { z } from 'zod';
import { VISUAL_IDS } from '../visualIds';

const Bilingual = z.object({ id: z.string().min(1), en: z.string().min(1) }).strict();

const Visual = z
  .object({ id: z.enum(VISUAL_IDS), props: z.record(z.unknown()).default({}) })
  .strict();

const itemBase = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase, digits and dashes'),
  cue: z.string().optional(),
  why: Bilingual,
  from: z.string().optional(),
};

const answerInOptions = (v: { options: string[]; answer: string }) => v.options.includes(v.answer);
const optionsMsg = { message: 'answer must be one of the options' };
const Options = z.array(z.string().min(1)).min(2).max(4);

export const ChoiceItem = z
  .object({ ...itemBase, type: z.literal('choice'), prompt: z.string(), options: Options, answer: z.string() })
  .strict();
export const GapItem = z
  .object({ ...itemBase, type: z.literal('gap'), prompt: z.string(), options: Options, answer: z.string() })
  .strict();
export const OrderItem = z
  .object({
    ...itemBase,
    type: z.literal('order'),
    prompt: z.string().optional(),
    tiles: z.array(z.string().min(1)).min(2),
    answer: z.array(z.string().min(1)).min(2),
    accept: z.array(z.array(z.string().min(1))).optional(),
  })
  .strict();
export const SceneItem = z
  .object({
    ...itemBase,
    type: z.literal('scene'),
    prompt: z.string().optional(),
    visual: Visual,
    options: Options,
    answer: z.string(),
  })
  .strict();
export const FixItem = z
  .object({ ...itemBase, type: z.literal('fix'), wrong: z.string(), options: Options, answer: z.string() })
  .strict();

/** Played through speech; the sentence is shown only when the browser has no English voice. */
export const ListenItem = z
  .object({
    ...itemBase,
    type: z.literal('listen'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    options: Options,
    answer: z.string(),
  })
  .strict();

export const CheckItemSchema = z
  .discriminatedUnion('type', [ChoiceItem, GapItem, OrderItem, SceneItem, FixItem, ListenItem])
  .superRefine((item, ctx) => {
    if ('options' in item && !answerInOptions(item)) {
      ctx.addIssue({ code: 'custom', path: ['answer'], ...optionsMsg });
    }
    if (item.type === 'gap' && item.prompt.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['prompt'], message: 'gap prompt needs exactly one ___' });
    }
    if (item.type === 'order') {
      const sorted = (a: string[]) => [...a].sort().join('\u0000');
      for (const a of [item.answer, ...(item.accept ?? [])]) {
        if (sorted(a) !== sorted(item.tiles)) {
          ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must use exactly the tiles' });
        }
      }
    }
  });

const Example = z
  .object({ en: z.string().min(1), id: z.string().min(1), note: Bilingual.optional() })
  .strict();

/** One pronunciation point: a label, words to play, and a short tip. */
const Sound = z
  .object({ focus: z.string().min(1), words: z.array(z.string().min(1)).min(1).max(6), tip: Bilingual })
  .strict();

/** A short exchange showing the structure in use. */
const TalkLine = z
  .object({ who: z.string().min(1), en: z.string().min(1), id: z.string().min(1), note: Bilingual.optional() })
  .strict();

export const LessonFrontmatterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    rung: z.string(),
    order: z.number().int().min(1).max(12),
    status: z.enum(['draft', 'reviewed']),
    minutes: z.number().int().min(3).max(15),
    title: Bilingual,
    summary: Bilingual,
    introduces: z.array(z.string()).min(1),
    spiral: z.string(),
    visual: Visual.optional(),
    worked: z.array(Example).min(2).max(8).optional(),
    examples: z.array(Example).min(4).max(6),
    pair: z.object({ off: z.string(), natural: z.string() }).strict(),
    sound: Sound.optional(),
    words: Bilingual.optional(),
    talk: z.array(TalkLine).min(2).max(4).optional(),
    check: z.array(CheckItemSchema).min(4).max(6),
    glossary: z
      .array(z.object({ en: z.string().min(1), id: z.string().min(1) }).strict())
      .min(6)
      .max(12),
    next: z.string().nullable().optional(),
  })
  .strict()
  .refine((l) => l.visual || l.worked, {
    message: 'a lesson needs either a visual or a worked example for the See step',
  });

export const RungSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    tier: z.enum(['easy', 'medium', 'hard']),
    cefr: z.string(),
    explain_lang: z.enum(['id', 'mixed', 'en']),
    status: z.enum(['live', 'soon']),
    /** An optional rung (Starter) never becomes the learner's current rung on its own. */
    optional: z.boolean().default(false),
    lessons: z.number().int(),
    description: Bilingual,
    topics: z.array(z.string()).min(1),
    threads: z.array(z.string()).default([]),
    inventory: z.array(z.string()).default([]),
  })
  .strict();

export const CurriculumSchema = z.object({ rungs: z.array(RungSchema).min(1) }).strict();

export const TestPoolSchema = z
  .object({
    rung: z.string(),
    draw: z.number().int().default(16),
    pass: z.number().int().default(12),
    items: z.array(CheckItemSchema).min(16),
  })
  .strict();

/** One short connected text per rung, using only that rung's inventory, with a few questions. */
export const ReadingSchema = z
  .object({
    rung: z.string(),
    title: Bilingual,
    text: z.string().min(1),
    translation: z.string().min(1),
    glossary: z.array(z.object({ en: z.string().min(1), id: z.string().min(1) }).strict()).max(8).default([]),
    items: z.array(CheckItemSchema).min(2).max(4),
  })
  .strict();

export const NounSchema = z
  .object({
    word: z.string(),
    initial_sound: z.enum(['vowel', 'consonant']),
    ipa_hint: z.string(),
    plural: z.string(),
    plural_rule: z.enum(['s', 'es', 'y-ies', 'f-ves', 'irregular', 'same']),
    id: z.string(),
  })
  .strict();
export const NounsSchema = z.array(NounSchema).min(1);

/** Words per rung. An entry may be one word or a flow list of words, for compact groups. */
export const LexiconSchema = z.record(
  z.array(z.union([z.string(), z.array(z.string())])).transform((xs) => xs.flat().map(String)),
);

export const SECTION_HEADINGS = ['concept.id', 'concept.en', 'contrast.id', 'contrast.en'] as const;
```

`lib/visualIds.ts`: `VISUAL_IDS = ['place-scene', 'noun-builder', 'near-far'] as const`.

Derived types (`lib/types.ts`): `Lesson = LessonFrontmatter & { concept: Bilingual; contrast: Bilingual } & { slug }`; `LessonSummary = { id, slug, rung, order, status, minutes, title, checkIds, resume: string[6], checkTexts, glossary }` (the `resume[step]` sentence is what the continue card quotes); `TestPool = { rung, draw, pass, items }`; `Reading`.

Note on field names: `en` always means "the target-language text" in lesson content (examples, pair, glossary, talk, title) **and** "the English UI/explanation translation" in `Bilingual` fields (`why`, `note`, `summary`, `description`, `tip`, `words`). The two roles share one name.

Additional validation in `scripts/content-check.ts`: rung matches folder; `order` matches the 2-digit file prefix; unique lesson ids; `introduces` ⊂ rung `inventory`; globally unique check-item ids across lessons, test pools and readings; at most one `[[focus]]` per sentence; `next` must exist; live rung needs ≥1 lesson; live rung with ≥8 lessons needs `test.yaml`; every test item `from` a real lesson; every lesson represented in the pool; reading `rung` matches; unique noun words; plus lint (§4 of `lib/content/lint.ts`): inventory-before-taught detectors, per-rung structure rules (only `starter` and `easy-1` have rules), lexicon (words from `core.yaml` + glossaries so far; naive English `-s/-es/-ies/'s` stripping; irregular plurals from `nouns.yaml`). Lint findings are errors for `reviewed` lessons and warnings for drafts; test-pool/reading structure findings are always errors, unknown words warnings.

Body sections (`lib/content/sections.ts`): body split on `^##\s+`; headings must be exactly `concept.id`, `concept.en`, `contrast.id`, `contrast.en`; text before the first heading, unknown, duplicate, empty or missing sections throw.

**Example lesson, `content/easy-1/09-prepositions-place.md` (full)**

```markdown
---
id: easy1-07-prepositions-place
rung: easy-1
order: 9
status: draft
minutes: 9
title: { en: "Where things are", id: "Di mana bendanya?" }
summary:
  id: "Kamu bisa bilang di mana benda berada."
  en: "You can say where things are."
introduces: [prep-place-basic]
spiral: prepositions
visual: { id: place-scene, props: { initial: on } }
examples:
  - { en: "My phone is [[in]] my bag.", id: "HP-ku di dalam tas." }
  - { en: "The keys are [[on]] the table.", id: "Kuncinya di atas meja.", note: { id: "On: di atas dan menempel di permukaan.", en: "On: on top of and touching a surface." } }
  - { en: "The cat is [[under]] the bed.", id: "Kucingnya di bawah kasur." }
  - { en: "The mosque is [[next to]] the school.", id: "Masjidnya di sebelah sekolah." }
  - { en: "Budi's motorbike is [[behind]] the house.", id: "Motor Budi di belakang rumah." }
  - { en: "Rina is [[in front of]] the warung.", id: "Rina di depan warung.", note: { id: "In front of: tiga kata, satu arti.", en: "In front of: three words, one meaning." } }
pair:
  off: "The book is at the table."
  natural: "The book is [[on]] the table."
check:
  - id: e1-07-c1
    type: choice
    cue: "Kuncinya di atas meja."
    prompt: "The keys are ___ the table."
    options: [in, on, at]
    answer: on
    why: { id: "On: di atas permukaan.", en: "On: on top of a surface." }
  - id: e1-07-c2
    type: gap
    cue: "Sepatuku di bawah kasur."
    prompt: "My shoes are ___ the bed."
    options: [under, on, in]
    answer: under
    why: { id: "Under: di bawah.", en: "Under: below something." }
  - id: e1-07-c3
    type: scene
    visual: { id: place-scene, props: { state: behind } }
    options: ["The ball is behind the box.", "The ball is in front of the box.", "The ball is in the box."]
    answer: "The ball is behind the box."
    why: { id: "Bolanya di belakang kotak, jadi sebagian tertutup.", en: "The ball is at the back of the box, so part of it is hidden." }
  - id: e1-07-c4
    type: scene
    visual: { id: place-scene, props: { state: in } }
    options: ["The ball is on the box.", "The ball is in the box.", "The ball is under the box."]
    answer: "The ball is in the box."
    why: { id: "Bolanya di dalam kotak: in.", en: "The ball is inside the box: in." }
  - id: e1-07-c5
    type: fix
    cue: "HP-nya di dalam tas."
    wrong: "Her phone is at her bag."
    options: ["Her phone is in her bag.", "Her phone is on her bag.", "Her phone is under her bag."]
    answer: "Her phone is in her bag."
    why: { id: "Di dalam sesuatu: in, bukan at.", en: "Inside something: in, not at." }
  - id: e1-07-c6
    type: order
    cue: "Masjidnya di sebelah sekolah."
    tiles: [mosque, is, next, to, The, the, school]
    answer: [The, mosque, is, next, to, the, school]
    why: { id: "Next to selalu dua kata, berurutan.", en: "Next to is always two words, together." }
glossary:
  - { en: in, id: "di dalam" }
  - { en: on, id: "di atas" }
  - { en: under, id: "di bawah" }
  - { en: next to, id: "di sebelah" }
  - { en: behind, id: "di belakang" }
  - { en: in front of, id: "di depan" }
  - { en: table, id: "meja" }
  - { en: bed, id: "kasur" }
  - { en: key, id: "kunci" }
  - { en: school, id: "sekolah" }
  - { en: shoe, id: "sepatu" }
  - { en: warung, id: "warung" }
sound:
  focus: "weak of, to"
  words: [in front of, next to, "It's next to the school."]
  tip: { id: "Of dan to dibaca lemah: in front of terdengar /ɪn frʌnt əv/, next to terdengar /neks tə/.", en: "Of and to are weak: in front of sounds like /ɪn frʌnt əv/, next to like /neks tə/." }
talk:
  - { who: Andi, en: "Where's my phone?", id: "HP-ku di mana?" }
  - { who: Mei, en: "It's on the table.", id: "Di atas meja." }
words: { id: "**At home**, **at school**, **at work**: tanpa *the*. Kamu akan sering mendengarnya. Dan *di atas* bisa juga berarti **above**, kalau tidak menempel.", en: "**At home**, **at school**, **at work**: no *the*. You will hear these a lot. And *di atas* can also mean **above**, when nothing touches." }
next: easy1-08-to-be-questions
---

## concept.id
Kata depan tempat (**preposition**) menjawab pertanyaan *di mana?* Bahasa Inggris punya kata yang berbeda untuk tiap posisi: **in** (di dalam), **on** (menempel di permukaan, atas atau samping), **under** (di bawah), **next to** (di sebelah), **behind** (di belakang) dan **in front of** (di depan). Perhatikan juga patokannya: bola **under the table**, tapi bola **on the box**. Kata **the** menunjuk benda yang sudah jelas, mirip *-nya*: *kuncinya* menjadi **the keys**.

## concept.en
Prepositions of place answer the question *di mana?* English has a different word for each position: **in**, **on** (touching a surface, top or side), **under**, **next to**, **behind** and **in front of**. Notice the reference object too: the ball is **under the table**, but **on the box**. **The** points to a thing we both know, a bit like *-nya*: *kuncinya* becomes **the keys**.

## contrast.id
Bahasa Indonesia memakai *di* untuk hampir semua posisi, dan *di* terasa seperti **at**. **At the table** memang ada, tapi artinya *di dekat meja*, seperti orang yang duduk di meja makan. Untuk buku yang ada di atasnya, pilih kata yang menunjukkan posisinya: **on**.

## contrast.en
Indonesian uses *di* for almost every position, and *di* feels like **at**. **At the table** is real English, but it means *by the table*, like people sitting down to eat. For a book lying on top, choose the word that shows the position: **on**.
```

YAML frontmatter is parsed with `js-yaml` `JSON_SCHEMA` (so `yes`/`no` stay strings).

**Sentence markup** (`lib/markup.ts`). One regex, `/\[\[(.+?)\]\]|\*\*(.+?)\*\*|\*(.+?)\*/g`, produces tokens `text | focus | strong | em`. No nesting, no escaping. `stripMarkup` joins token values (used for speech, grading, search). `focusCount` counts `[[ ]]`.

Rendering differs by context:
- `Sentence` (`components/lesson/Sentence.tsx`, target-language sentences): splits each token on whitespace into word segments that carry character offsets in the plain string (for speech-boundary highlighting); groups a multi-word focus into one span. `focus` → `.focus-word` (a `<button>` with `aria-expanded` when a note exists); `strong` → `<strong>`; `em` → `<em>`.
- `Prose` (`components/lesson/Prose.tsx`, explanations and strand-card text): paragraphs split on blank lines, single newlines joined. **`**bold**` = target-language (English) term**, rendered `<strong lang="en" class="font-bold text-accent">`; **`*italic*` = Indonesian phrase**, rendered `<em>` (with `lang="id"` when the prose is English); `[[focus]]` → `.focus-word lang="en"`.
- `OptionPill` strips markup to plain text. `CheckItemView` gap prompt is split on `___` and shows a 3.5em underline (`sr-only` "blank"), filled with the answer in `.focus-word` once solved. `ContinueCard` `BoardSentence` turns `___` into a brass underline.

**Explanation-language logic** (`LessonPlayer.tsx` lines 143–159):

```ts
const effective = settings.explain === 'rung' ? rung.explain_lang : settings.explain;
const cardLang = effective === 'id' ? 'id' : 'en';   // strand cards: mixed shows English
```

- `id` → Indonesian prose only. `en` → English prose only. `mixed` → English prose plus a `<details>` "Penjelasan dalam Bahasa Indonesia" (label in UI language) with the Indonesian prose.
- Fading is per rung via `explain_lang` in the curriculum: Starter, Easy 1–3 `id`; Medium 1–2 `mixed`; Medium 3, Hard 1–3 `en`. No per-lesson fading.
- Override: Settings "Bahasa penjelasan" (`rung` default / `id` / `en`), and the **ID | EN** pill in the lesson top bar (`ExplainToggle`) which writes the same global `settings.explain` to `id` or `en` (it cannot set it back to `rung`; in `mixed`, EN shows as pressed).
- Separate from this, the **UI language** (`settings.uiLang`, default `id`) chooses which half of every other `Bilingual` field is shown: `why` lines, example `note`s, talk notes, lesson `summary`, rung `description`, Done-screen title, and the UI strings. The rung page shows the rung's default explanation language as text ("Bahasa penjelasan: Bahasa Indonesia, contoh dalam bahasa Inggris").

---

### 4. Check engine and tests

**Item types** (schema in §3; grading in `lib/check/grade.ts`; UI in `components/check/CheckItemView.tsx`)

| type | Fields | Shows | Graded by |
|---|---|---|---|
| `choice` | id, cue?, prompt, options (2–4), answer, why, from? | cue (italic id), prompt as a sentence (`___` rendered as blank), options as wrapping pills | `stripMarkup(response) === stripMarkup(answer)` |
| `gap` | same, prompt has exactly one `___` | same; blank fills with the answer on solve | same |
| `order` | id, cue?, prompt?, tiles (≥2), answer (array), accept? (array of arrays), why | `TileTray`: answer line + tray; "Periksa" button enabled once all tiles are placed | `sameOrder`: trims whitespace, strips trailing `[.,!?;:]+`, drops empty tokens, equal length, first token case-sensitive, rest case-insensitive; passes if it matches `answer` or any `accept` |
| `scene` | id, cue?, prompt?, visual {id, props}, options, answer | the visual component with `interactive={false}` and `state` from props; prompt or "Kalimat mana yang cocok dengan gambarnya?"; full-width sentence options | exact string |
| `fix` | id, cue?, wrong, options, answer | "Kalimat ini belum tepat. Pilih versi yang benar." + the wrong sentence struck through; full-width options | exact string |
| `listen` | id, cue?, prompt?, audio, options, answer | prompt or "Dengarkan, lalu pilih kalimat yang kamu dengar."; "Putar kalimat" button; if no English voice, the sentence is shown in a `--paper-2` box with "Browser ini tidak punya suara bahasa Inggris. Baca kalimat ini, lalu pilih yang sama:"; full-width options | exact string (against `answer`, not `audio`) |

Check items have no per-item play button (only `listen` plays audio). Number keys 1–4 pick options (`aria-keyshortcuts`), disabled in Read & listen (`numberKeys={false}`).

**Practice feedback** (lesson Check step, quick review, Read & listen)

- Wrong pick: pill → `wrong` state (`--off-bg` background, `--off` text, border `--off-bg`, ✕ icon, text struck through 1.5px), disabled; "Belum tepat, coba lagi." in `--off` in an `aria-live="polite"` region; `sfx('wrong')`. The item stays open; unlimited retries.
- Order wrong: answer-line tile borders turn `--off`; tiles stay placed so the learner can rearrange; `sfx('wrong')`.
- After **2 misses**: the `why` line appears as a hint, prefixed by a mono "Petunjuk:" label (`WhyLine`).
- Correct: pill → `correct` state (`--good-bg`, `--good` text and border, check icon that draws as a stroke); order tiles turn good and lock; `sfx('correct')`; `onSolved(firstTry)` where `firstTry = misses === 0`.
- In the lesson and in quick review (`whyInSheet`): the sticky `BottomActionBar` turns into a **feedback sheet**: `--good-bg`, `rounded-t-xl` (24px top corners), animates `sheet-up`, a 30px `--good` circle with a drawn check, "Tepat" in display `--t-h2` semibold `--good`, then the `why` line in the UI language; the continue button becomes `btn-good`. The sheet is `aria-live="polite"`. In Read & listen the why line appears inline under the item.
- Lesson: `store.recordAnswer(item.id, firstTry)` on solve. A lesson cannot advance past an unsolved item.

**Rung test** (`components/check/TestRunner.tsx`, `/rung/<rung>/test/`)

- Intro screen: title "Tes {rung}", "{n} soal dari semua pelajaran. Tidak ada waktu, tidak ada nilai di tengah jalan. Lulus dengan {pass} jawaban benar.", best score if any, "Mulai tes" button.
- Draw: `drawTest(pool.items, seed, pool.draw)` with `seed = newSeed()` (random 31-bit) per attempt. Algorithm (`lib/check/draw.ts`): mulberry32 PRNG; group by `from`; for each lesson (sorted by id) shuffle and take one; shuffle the rest and fill to n; shuffle the final list. Easy 1: 16 of 32, pass 12. Starter: 12 of 16, pass 9.
- Running: header with ←/✕ to the rung page and "i / N"; a 6-segment `StepBar` used as coarse progress (`floor(i/N*6)`); `CheckItemView mode="test"` (a chosen pill is solid `--ink` with `--paper` text, never graded); back button allowed; "Lanjut"/"Lihat hasil" enabled once answered (order: all tiles placed). No sounds, no feedback.
- Finish: `recordTest(rungId, { score, total, seed, date: ISO }, passed)`; keeps the last 20 attempts; `climbed` becomes true on first pass. Test answers do not touch Leitner boxes.
- Results: `--t-hero` "13 / 16" (focused for screen readers); "Lulus. Kamu sudah menaiki {rung}." or "Hampir. Ulangi pelajaran yang ditandai, lalu coba lagi kapan saja."; if not passed, "Pelajaran yang perlu diulang" with links to the lessons that had misses; "Tinjau jawaban" list grouped by lesson (order · title): each item a card with ✓/✗ icon, the correct sentence (`answerText`, gap filled in), "Jawabanmu: …" struck through when wrong, and the `why`. Bottom bar: "Lihat tangga" (passed) or "Coba tes lagi", plus "Kembali ke {rung}".
- Climb moment (§7) overlays the results when the test is passed for the first time.

**Review / spaced repetition**

- Leitner (`lib/check/leitner.ts`): boxes 1–3; miss → 1; correct → +1, max 3; new items count as box 1.
- `recordAnswer` stores `{ firstTry, box, lastSeen }` per item id (global, not per lesson).
- `drawReview(progress, items, n=5)`: only items from **completed** lessons (lesson check items only, not test pools or readings), sorted by box ascending then `lastSeen` ascending, take 5. Deterministic, no randomness.
- Quick review page (`components/check/ReviewRunner.tsx`): if fewer than 2 completed lessons, a kind empty state ("Belum ada soal untuk diulang" / "Selesaikan dua pelajaran dulu, lalu ulang cepat akan muncul di sini."); else a card "Lima soal, sekitar dua menit" with "Mulai". Running: header "Ulang cepat" and "i / 5", practice mode with the feedback sheet, each solve calls `recordAnswer`. End: "{c} dari {n} tepat di percobaan pertama." or "Semua tepat. Soal-soal ini naik kotak.", buttons "Kembali ke tangga" and "Ulang lagi".
- "Done with mistakes to review" lesson state = any of the lesson's items with `firstTry === false` (`lib/progress/derive.ts` `missedCount`).

---

### 5. Visual components

Contract (`components/visuals/types.ts`):

```ts
export type VisualProps<S> = {
  state?: S;              // controlled state (scene check items)
  interactive?: boolean;  // false in scene checks: no controls, fixed state
  onStateChange?: (s: S) => void;
  lang: 'id' | 'en';      // labels and text alternative (UI language)
};
```

Registry (`components/visuals/registry.ts`): `{ 'place-scene': PlaceScene, 'noun-builder': NounBuilder, 'near-far': NearFar }`, typed against `VISUAL_IDS` in `lib/visualIds.ts` (the zod `Visual.id` enum uses the same list). Content refers to a visual only by `{ id, props }`, in lesson `visual` (See step) or in a `scene` item's `visual`.

`VisualStage` (`components/visuals/VisualStage.tsx`) wraps every visual in `rounded-lg bg-paper-2 p-4`, looks up the registry, and passes `{...props, state: interactive ? undefined : props.state, initial: props.initial ?? props.state, interactive, lang: uiLang, nouns: nouns ?? [] }`. Pages load `nouns.yaml` only when a lesson/pool uses `noun-builder`.

| Visual | File | Shows | State / props |
|---|---|---|---|
| **PlaceScene** | `components/visuals/PlaceScene.tsx`, logic `placeLogic.ts` | SVG `viewBox="0 0 400 260"`: a table in oblique projection, a box on it, a ball (the subject). Picking a preposition moves the ball. Reference object is the table for `under`, the box for all others. Draw-order slots back→front: `under` (before table top), `behind` (before box), `inside` (between box back and see-through front; front at opacity 0.45), `front`. Ball has a ground shadow ellipse (rx 13, or 8 when lifted onto the box). Below the SVG: a radiogroup of 6 pills (`in, on, under, next to, behind, in front of`) and a `Sentence` "The ball is [[p]] the box/table." + Indonesian ("Bolanya di dalam kotak."). | `S = Place`; props `initial?: Place` (default `on`). Ball centres in `PLACE_SPEC` (e.g. `in: {x:190,y:138}`, `on: {x:200,y:102, lifted}`, `under: {x:180,y:230}`), with Indonesian `di dalam / di atas / di bawah / di sebelah / di belakang / di depan`. |
| **NounBuilder** | `components/visuals/NounBuilder.tsx`, logic `nounLogic.ts` | HTML (not SVG). Interactive: featured noun chips (`aria-pressed`), a "Kata lain / More nouns" `<select>` of all nouns (sorted with `localeCompare`), a "Acak / Random" button (deterministic walk `(idx*37+11) % n`). Two cards: **a / an** ("hour → /aʊ/ · bunyi vokal", big "an hour", Indonesian gloss, a `*` note when spelling misleads: "Ejaannya menipu…") and **lebih dari satu** (rule pill, plural built as stem + struck removed part + focus added part, or "word → plural" for irregular/same, "one X · two Xs"). Then a `Sentence` "[[an]] hour · two hours". | `S = string` (noun word); props `nouns: Noun[]`, `initial?: string`, `featured?: string[]` (default `hour, university, umbrella, motorbike, durian, box, city, knife, child, fish`). Article from authored `initial_sound`; plural from authored `plural`; `isTricky` = vowel letter ≠ vowel sound. |
| **NearFar** | `components/visuals/NearFar.tsx` | SVG `viewBox="0 0 400 210"`: a "you" marker dot (accent), near books (1 or 3 stacked, scale 2.2) and far motorbikes (1 or 3, scale 0.9); the inactive group fades to 0.3. 2×2 radiogroup of `this / these / that / those` with "dekat · satu" sublabels, then a `Sentence` ("[[This]] is a book." / "Ini buku."). | `S = 'this' \| 'these' \| 'that' \| 'those'` (default `this`); no props. |

**Drawing conventions actually used**

- Projection: oblique 2.5D. Front faces are rectangles; top faces recede up-right. Box top offset is +20 x / −16 y; the table top recedes +60 / −48. PlaceScene's whole drawing is inside `<g transform="translate(-28 -80) scale(1.15)">`.
- Light from top-left, three tones per object: top lightest, front base, side darkest. Wood: top `color-mix(in srgb, var(--wood) 70%, var(--card-top))`, front `--wood`, side `--wood-dark`. Box: front `--card`, top `--card-top`, side/inner back `--card-side`. Ball: dark rim `color-mix(in srgb, var(--subject) 75%, var(--ink))`, body `--subject`, highlight `color-mix(in srgb, var(--subject) 55%, var(--card-top))`. NearFar books: top `--card-top`, front `--subject`, side `--card-side`; bikes: wheels `--wood-dark`, body `--subject`, seat `--card-side`.
- Strokes: none except 1.5px lines (floor `--rule`; table edge `--wood-dark`; box top edge `--card-side`).
- Ground shadows: `--ink` ellipses at opacity 0.08 (scene floor, box on table, NearFar), ball shadow 0.12. Literal values in components; the tokens `--glass-opacity: 0.45` and `--ground-opacity: 0.08` exist but are unused.
- Subject in `--subject`; everything else in material tokens; no people; the NearFar "speaker" is a dot labelled "you".
- Labels inside SVGs: `font-mono`, `fill: var(--muted)`, 10.5–12px, "`<tspan lang="en">table</tspan> · <tspan lang="id" fontStyle="italic">meja</tspan>`".
- Stage: `--paper-2`, radius `--r-lg` (18px), padding 16px.

**Accessibility for visuals**

- SVGs are `role="img"` with an `aria-label` describing the state; a separate `sr-only` `<p aria-live="polite">` repeats the description in the UI language and updates on each change (`placeAlt`, NearFar `altText`, NounBuilder `alt`).
- Option controls are radiogroups with roving tabindex (`components/visuals/useRoving.ts`): ArrowRight/ArrowDown next, ArrowLeft/ArrowUp previous (wrapping), Home/End; `stopPropagation` so the lesson player's arrow-key step navigation does not fire. The lesson player also ignores arrows inside `[data-visual]`. NounBuilder uses `aria-pressed` buttons plus a native `<select>` instead.
- In scene checks (`interactive={false}`) there are no controls; NounBuilder's card grid is `aria-hidden` then.
- Reduced motion: PlaceScene's ball jumps (no transition); NearFar/glass opacity use `--m-base-d` (120ms when reduced).

---

### 6. Theme and design system

**Colour.** Dark mode is switched in **both** ways: `@media (prefers-color-scheme: dark)` applies dark tokens to `:root:not([data-theme='light'])`, and `:root[data-theme='dark']` forces dark. The theme script (`app/themeScript.ts`) runs inline in `<head>` before paint: default theme is **light**; it sets `data-theme="dark"` if `settings.theme === 'dark'`; leaves `data-theme` unset (follow OS) only when `settings.theme === 'system'` and `schemaVersion >= 2`; otherwise `data-theme="light"`. It also sets `data-text-size` (115/130), `data-motion="reduce"`, and `lang="en"` when the UI language is English. `ProgressProvider.applySettings` keeps these attributes in sync after hydration.

`styles/tokens.css` (full):

```css
/* Every token from DESIGN.md. Components never use literal colours. */
:root {
  color-scheme: light;
  --paper: #F6F2E9;
  --paper-2: #EDE6D6;
  --surface: #FFFDF8;
  --ink: #14213D;
  --muted: #596277;
  --rule: #E2D9C6;
  --accent: #2A4A7F;
  --accent-ink: #FFFFFF;
  --accent-soft: #E4E9F2;
  --board: #13213F;
  --board-2: #1E2F55;
  --board-ink: #F6F2E9;
  --board-muted: #B3BCD0;
  --brass: #D2AE72;
  --rung: #B8862E;
  --rung-soft: #F7EBCF;
  --good: #2F6B45;
  --good-bg: #E3F0E4;
  --off: #A84432;
  --off-bg: #F8E4DD;
  --easy: #3D7A5F;
  --easy-soft: #E5EFE6;
  --medium: #2A4A7F;
  --medium-soft: #E4E9F2;
  --hard: #6A4E8F;
  --hard-soft: #EDE7F3;
  --wood: #B98A5A;
  --wood-dark: #8C6440;
  --card: #D9C3A0;
  --card-top: #E8D7BA;
  --card-side: #B79E77;
  --subject: #C2533A;
  --shadow-rgb: 20 33 61;

  /* Type scale (DESIGN §4.1), rem so the text-size setting scales everything */
  --t-hero: 3rem;
  --t-h1: 2.125rem;
  --t-h2: 1.5rem;
  --t-sentence: 1.6rem;
  --t-sentence-lh: 1.3;
  --t-body: 1.0625rem;
  --t-small: 0.9rem;
  --t-label: 0.74rem;
  --t-tab: 0.72rem;
  --t-card: 1.3rem;
  --t-wordmark: 1.125rem;

  /* Space (DESIGN §5.1) */
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 24px;
  --s-6: 32px;
  --s-7: 48px;
  --s-8: 64px;
  --gutter: max(16px, env(safe-area-inset-left), env(safe-area-inset-right));

  /* Layout chrome */
  --tabbar-h: 64px;
  --sidebar-w: 256px;

  /* Shape and depth (DESIGN §5.2–5.3) */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 18px;
  --r-xl: 24px;
  --e-1: 0 0 0 1px var(--rule), 0 1px 2px rgb(var(--shadow-rgb) / 0.04), 0 8px 24px -16px rgb(var(--shadow-rgb) / 0.18);
  --e-2: 0 18px 40px -28px rgb(var(--shadow-rgb) / 0.45);

  /* Motion (DESIGN §5.4) */
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-object: cubic-bezier(0.3, 1.25, 0.4, 1);
  --ease-moment: cubic-bezier(0.2, 0.8, 0.2, 1);
  --m-quick-d: 120ms;
  --m-base-d: 220ms;
  --m-object-d: 380ms;
  --m-moment-d: 900ms;
  --m-check-d: 250ms;
  --m-shift: 12px;

  /* Illustration (DESIGN §10) */
  --glass-opacity: 0.45;
  --ground-opacity: 0.08;
}

@media (max-width: 480px) {
  :root {
    --t-sentence-lh: 1.4;
    --t-hero: 2.25rem;
  }
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
    --paper: #0D1526;
    --paper-2: #121C31;
    --surface: #16213A;
    --ink: #EEE8DA;
    --muted: #A6AFC3;
    --rule: #26324D;
    --accent: #9DB8E6;
    --accent-ink: #0D1526;
    --accent-soft: #1E2C4B;
    --board: #1B2B4F;
    --board-2: #25386A;
    --board-ink: #F2ECDF;
    --board-muted: #AEB9D2;
    --brass: #DDBA7E;
    --rung: #E2B45A;
    --rung-soft: #2C2516;
    --good: #8FCB9F;
    --good-bg: #16281F;
    --off: #EE9A84;
    --off-bg: #331F1B;
    --easy: #7CC4A0;
    --easy-soft: #152A22;
    --medium: #9DB8E6;
    --medium-soft: #1E2C4B;
    --hard: #C1A8E6;
    --hard-soft: #251E37;
    --wood: #9C7550;
    --wood-dark: #6E5236;
    --card: #B39C78;
    --card-top: #C3AE8C;
    --card-side: #8E7956;
    --subject: #E06A4F;
    --shadow-rgb: 0 0 0;
  }
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --paper: #0D1526;
  --paper-2: #121C31;
  --surface: #16213A;
  --ink: #EEE8DA;
  --muted: #A6AFC3;
  --rule: #26324D;
  --accent: #9DB8E6;
  --accent-ink: #0D1526;
  --accent-soft: #1E2C4B;
  --board: #1B2B4F;
  --board-2: #25386A;
  --board-ink: #F2ECDF;
  --board-muted: #AEB9D2;
  --brass: #DDBA7E;
  --rung: #E2B45A;
  --rung-soft: #2C2516;
  --good: #8FCB9F;
  --good-bg: #16281F;
  --off: #EE9A84;
  --off-bg: #331F1B;
  --easy: #7CC4A0;
  --easy-soft: #152A22;
  --medium: #9DB8E6;
  --medium-soft: #1E2C4B;
  --hard: #C1A8E6;
  --hard-soft: #251E37;
  --wood: #9C7550;
  --wood-dark: #6E5236;
  --card: #B39C78;
  --card-top: #C3AE8C;
  --card-side: #8E7956;
  --subject: #E06A4F;
  --shadow-rgb: 0 0 0;
}

/* Text-size setting (100 / 115 / 130) */
:root[data-text-size='115'] {
  font-size: 115%;
}
:root[data-text-size='130'] {
  font-size: 130%;
}

/* Reduced motion: everything becomes a quick cross-fade */
@media (prefers-reduced-motion: reduce) {
  :root:not([data-motion='full']) {
    --m-base-d: 120ms;
    --m-object-d: 0ms;
    --m-moment-d: 120ms;
    --m-shift: 0px;
  }
}
:root[data-motion='reduce'] {
  --m-base-d: 120ms;
  --m-object-d: 0ms;
  --m-moment-d: 120ms;
  --m-shift: 0px;
}
```

Colour summary (light / dark):

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#F6F2E9` | `#0D1526` |
| `--paper-2` | `#EDE6D6` | `#121C31` |
| `--surface` | `#FFFDF8` | `#16213A` |
| `--ink` | `#14213D` | `#EEE8DA` |
| `--muted` | `#596277` | `#A6AFC3` |
| `--rule` | `#E2D9C6` | `#26324D` |
| `--accent` | `#2A4A7F` | `#9DB8E6` |
| `--accent-ink` | `#FFFFFF` | `#0D1526` |
| `--accent-soft` | `#E4E9F2` | `#1E2C4B` |
| `--board` / `--board-2` | `#13213F` / `#1E2F55` | `#1B2B4F` / `#25386A` |
| `--board-ink` / `--board-muted` | `#F6F2E9` / `#B3BCD0` | `#F2ECDF` / `#AEB9D2` |
| `--brass` | `#D2AE72` | `#DDBA7E` |
| `--rung` / `--rung-soft` | `#B8862E` / `#F7EBCF` | `#E2B45A` / `#2C2516` |
| `--good` / `--good-bg` | `#2F6B45` / `#E3F0E4` | `#8FCB9F` / `#16281F` |
| `--off` / `--off-bg` | `#A84432` / `#F8E4DD` | `#EE9A84` / `#331F1B` |
| `--easy` / `--easy-soft` | `#3D7A5F` / `#E5EFE6` | `#7CC4A0` / `#152A22` |
| `--medium` / `--medium-soft` | `#2A4A7F` / `#E4E9F2` | `#9DB8E6` / `#1E2C4B` |
| `--hard` / `--hard-soft` | `#6A4E8F` / `#EDE7F3` | `#C1A8E6` / `#251E37` |
| `--wood` / `--wood-dark` | `#B98A5A` / `#8C6440` | `#9C7550` / `#6E5236` |
| `--card` / `--card-top` / `--card-side` | `#D9C3A0` / `#E8D7BA` / `#B79E77` | `#B39C78` / `#C3AE8C` / `#8E7956` |
| `--subject` | `#C2533A` | `#E06A4F` |
| `--shadow-rgb` | `20 33 61` | `0 0 0` |

Browser `theme-color` meta (`app/layout.tsx`): `#F6F2E9` for `prefers-color-scheme: light`, `#0D1526` for dark (follows OS, not the in-app setting). Manifest `theme_color: #13213F`.

**Typography**

| Family | Variable | Loaded via | Weights / styles | Fallback |
|---|---|---|---|---|
| Newsreader | `--font-display` | `next/font/google`, `subsets: ['latin']`, `axes: ['opsz']`, normal + italic, `display: swap`, `adjustFontFallback: false` | variable (weights used: 400, 500, 600) | Georgia, serif |
| Atkinson Hyperlegible Next | `--font-body` | `next/font/local` from `app/font-files/AtkinsonNext-Variable.woff2` and `AtkinsonNext-Italic-Variable.woff2`, latin subset | variable `200 800`, normal + italic | system-ui, sans-serif |
| IBM Plex Mono | `--font-mono` | `next/font/google`, `subsets: ['latin']` | 400, 500, 600 | ui-monospace, monospace |

All three are latin-only subsets. Self-hosted at build; no runtime font requests.

Base rules (`styles/globals.css`): `body` uses the body font, `--t-body`, line-height 1.6, `--paper` background, `--ink` text, `min-height: 100dvh`. `h1, h2, h3` use the display font, **weight 500**, letter-spacing −0.01em, `text-wrap: balance`. Links `--accent`, underline offset 3px. Focus: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: var(--r-sm) }`.

Type scale (`tokens.css` + `tailwind.config.ts` `fontSize`):

| Token / class | Size | Line-height | Tracking | Typical weight / face |
|---|---|---|---|---|
| `--t-hero` / `text-hero` | 3rem (2.25rem ≤480px) | 1.05 | pages add `tracking-[-0.02em]` | display 500 (h1) or 400 (Me stats) |
| `--t-h1` / `text-h1` | 2.125rem | 1.15 | — | display 500 |
| `--t-h2` / `text-h2` | 1.5rem | 1.2 | — | display 500 (600 in feedback sheet) |
| `--t-sentence` / `text-sentence` | 1.6rem | `var(--t-sentence-lh)` = 1.3 (1.4 ≤480px) | — | display 500 |
| `--t-body` / `text-body` | 1.0625rem | 1.6 | — | body 400 |
| `--t-small` / `text-small` | 0.9rem | 1.5 | — | body 400 |
| `--t-label` / `text-label` | 0.74rem | 1.3 | 0.1em (Tailwind) | — |
| `.label` class | `--t-label` | 1.3 | **0.12em**, uppercase | mono 500 |
| `.eyebrow` class | `--t-label` | 1.3 | **0.16em**, uppercase, `--muted` | mono 500 |
| `--t-tab` / `text-tab` | 0.72rem | 1.2 | — | body 700 (tab labels) |
| `--t-card` / `text-card` | 1.3rem | 1.15 | — | display 500 (lesson card titles) |
| `--t-wordmark` / `text-wordmark` | 1.125rem | 1 | −0.01em | display 600 |

Text-size setting scales the root `font-size` (115% / 130%), so all rem tokens scale. `.tnum` = tabular numerals.

Special text rules:
- **Target-language (English) sentence**: `Sentence` → `<p lang="en" class="font-display text-sentence font-medium text-ink">` (body-size variant `text-body` for talk lines, reading text, NounBuilder line). Play button (40px) to its right.
- **Translation (Indonesian)**: `.id-text` = italic, `--muted`, `lang="id"`, directly under the sentence.
- **Focus word**: `.focus-word` = `--accent`, weight 700, underline 2px, offset 3px. Only one per sentence (content-checked). While speaking, the current word gets `bg-accent-soft rounded-sm`.
- **Wrong sentence**: `.off-text` = `--off`, line-through 1.5px; focus styling is suppressed inside it. In PairCard it sits on `--off-bg` with "✕ TERDENGAR ANEH"; the natural one on `--good-bg` with "✓ ALAMI".
- **Explanation bold terms**: `--accent` bold, no underline. Italic = Indonesian.
- **Accented last word** (`Accented` in `ContinueCard.tsx`): last word of a hero line in display italic, `text-brass` on navy or `text-accent` on cream ("Selamat *siang.*", "Mulai dari anak tangga *pertama*").
- Buttons, pills, tiles, tabs use the body face, bold/semibold.

**Spacing, radius, shadows, borders**

- Space: `--s-1 4px`, `--s-2 8px`, `--s-3 12px`, `--s-4 16px`, `--s-5 24px`, `--s-6 32px`, `--s-7 48px`, `--s-8 64px`; Tailwind spacing `1–8`, `gutter`, `touch: 44px`, `pill: 48px`, `px: 1px`. `--gutter: max(16px, env(safe-area-inset-left), env(safe-area-inset-right))`. Layout: `--tabbar-h: 64px`, `--sidebar-w: 256px`. Max widths: `lesson 640px`, `home 1040px`, `measure 65ch`. Breakpoints used: Tailwind default `sm` (640px) and arbitrary `min-[640px]`, `min-[900px]`; CSS `max-width: 480px` (type) and `min-width: 900px` (`.shell`).
- Radius: `--r-sm 6px`, `--r-md 10px`, `--r-lg 18px`, `--r-xl 24px`, `full 999px`. A few literal radii: NotchBar 2px / 4px.
- Shadows: `--e-1: 0 0 0 1px var(--rule), 0 1px 2px rgb(var(--shadow-rgb) / 0.04), 0 8px 24px -16px rgb(var(--shadow-rgb) / 0.18)` (cards, so cards do get a 1px ring); `--e-2: 0 18px 40px -28px rgb(var(--shadow-rgb) / 0.45)` (lesson column ≥640px, hover on lesson cards). Board: `box-shadow: inset 0 0 0 1px var(--board-2)`. Done badge ring `0 0 0 10px var(--accent-soft)`. Sidebar active tab `inset 3px 0 0 var(--brass)`.
- Borders: 1px `--rule` dividers/headers; 2px borders on option pills, tiles, NearFar/NounBuilder chips; dashed 2px `--rule` on the un-climbed test card; ghost buttons `inset 0 0 0 1.5px var(--rule)`.
- Component classes (`globals.css`): `.btn` (inline-flex, min-height 48px, padding 0 24px, radius 999px, body 700, nowrap, transitions bg/transform/opacity `--m-quick-d`, `:active` scale 0.98), `.btn-primary` (accent/accent-ink, disabled opacity 0.45), `.btn-board` (board-ink on board), `.btn-navy`, `.btn-ghost`, `.btn-good`, `.btn-quiet`; `.card` (surface, `--r-lg`, `--e-1`); `.board` (navy, `--r-xl`, contours, children `position: relative`); `.doc-grid` (`--paper-2` with a 14px grid of `color-mix(in srgb, var(--rule) 70%, transparent)` 1px lines); `.page` (inline gutter padding, centred); `.shell`; `.sr-only`.

**Motion**

| Token | Value | Used by |
|---|---|---|
| `--ease` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | default Tailwind easing, steps, sheets, buttons |
| `--ease-object` | `cubic-bezier(0.3, 1.25, 0.4, 1)` | PlaceScene ball, TileTray FLIP |
| `--ease-moment` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | ClimbMoment |
| `--m-quick-d` | 120ms | button press/colour, pills, chips, tabs, toggle knob, speaking highlight |
| `--m-base-d` | 220ms | step transitions, `sheet-up`, `fade-in`, StepBar colour, NearFar/glass opacity, bottom bar colour |
| `--m-object-d` | 380ms | ball move, tile fly |
| `--m-moment-d` | 900ms | climb: marker moves up, rung glows gold, notches fade in |
| `--m-check-d` | 250ms | `.check-draw` stroke (dasharray 24) |
| `--m-shift` | 12px | translate distance for step/sheet entrances |
| literal | 1400ms | `.notch-settle` (gold `--rung` 0–40%, then to `--accent`) |

Keyframes (`globals.css`): `step-in-fwd` (from opacity 0, `translateX(var(--m-shift))`), `step-in-back` (from `translateX(-shift)`), `sheet-up` (from `translateY(shift)`), `fade-in`, `draw`, `notch-settle`. Only the **incoming** step animates; the outgoing step is not animated (the step container is keyed and replaced). Nothing animates on page load except the lesson step (only after resume is ready).

Reduced motion: when the OS asks for it (unless `data-motion='full'`, which nothing sets) or the setting is "Aktif" (`data-motion='reduce'`): `--m-base-d 120ms`, `--m-object-d 0ms`, `--m-moment-d 120ms`, `--m-shift 0px` → steps/sheets become 120ms fades. In JS (`useReducedMotion` = setting or OS): TileTray skips FLIP, PlaceScene ball jumps, ClimbMoment uses a 120ms linear box-shadow fade and no marker movement.

**Sound** (`lib/speech/sfx.ts`, Web Audio, no files)

- AudioContext created lazily on first use, only after the first `pointerdown`/`keydown` anywhere (captured once); resumed if suspended. Disabled when `settings.sfx` is false (`setSfxEnabled`).
- Envelope per note: gain 0 → `PEAK` linear in 12ms, exponential to 0.0001 at `dur + 80ms`, oscillator stops at `dur + 100ms`. `PEAK = 0.1` ("around −20 dBFS").
- Notes: A3 220, C5 523.25, E5 659.25, G5 783.99, A5 880, C6 1046.5 Hz.

| Name | When | Synthesis |
|---|---|---|
| `correct` | practice item solved (lesson, review, reading) | sine E5 at t (70ms), sine A5 at t+80ms (70ms) |
| `wrong` | practice wrong pick / wrong order | triangle A3, 90ms, peak 0.05 |
| `lessonDone` | entering the Done step | sine C5, E5, G5 at 0 / 110 / 220ms, 100ms each |
| `climbed` | ClimbMoment mounts | sine C5, E5, G5, C6 at 0/140/280/420ms, 120ms each, last 400ms, through a feedback delay (delay 90ms, feedback 0.35, wet 0.4, dry also to output) |

No sounds in the rung test. Settings toggle "Efek suara" (default on) with hint "Bunyi lembut saat menjawab dan selesai."

**Tailwind config** (`tailwind.config.ts`, full):

```ts
import type { Config } from 'tailwindcss';

// Every value maps to a CSS custom property from styles/tokens.css (DESIGN.md).
// The default palette is replaced, not extended, so literal colours can't sneak in.
const v = (name: string) => `var(--${name})`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: v('paper'),
      'paper-2': v('paper-2'),
      surface: v('surface'),
      ink: v('ink'),
      muted: v('muted'),
      rule: v('rule'),
      accent: v('accent'),
      'accent-ink': v('accent-ink'),
      'accent-soft': v('accent-soft'),
      board: v('board'),
      'board-2': v('board-2'),
      'board-ink': v('board-ink'),
      'board-muted': v('board-muted'),
      brass: v('brass'),
      rung: v('rung'),
      'rung-soft': v('rung-soft'),
      good: v('good'),
      'good-bg': v('good-bg'),
      off: v('off'),
      'off-bg': v('off-bg'),
      easy: v('easy'),
      medium: v('medium'),
      hard: v('hard'),
      'easy-soft': v('easy-soft'),
      'medium-soft': v('medium-soft'),
      'hard-soft': v('hard-soft'),
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      hero: ['var(--t-hero)', { lineHeight: '1.05' }],
      h1: ['var(--t-h1)', { lineHeight: '1.15' }],
      h2: ['var(--t-h2)', { lineHeight: '1.2' }],
      sentence: ['var(--t-sentence)', { lineHeight: 'var(--t-sentence-lh)' }],
      body: ['var(--t-body)', { lineHeight: '1.6' }],
      small: ['var(--t-small)', { lineHeight: '1.5' }],
      label: ['var(--t-label)', { lineHeight: '1.3', letterSpacing: '0.1em' }],
      tab: ['var(--t-tab)', { lineHeight: '1.2' }],
      card: ['var(--t-card)', { lineHeight: '1.15' }],
      wordmark: ['var(--t-wordmark)', { lineHeight: '1', letterSpacing: '-0.01em' }],
    },
    spacing: {
      0: '0',
      px: '1px',
      1: 'var(--s-1)',
      2: 'var(--s-2)',
      3: 'var(--s-3)',
      4: 'var(--s-4)',
      5: 'var(--s-5)',
      6: 'var(--s-6)',
      7: 'var(--s-7)',
      8: 'var(--s-8)',
      gutter: 'var(--gutter)',
      touch: '44px',
      pill: '48px',
    },
    borderRadius: {
      none: '0',
      sm: 'var(--r-sm)',
      md: 'var(--r-md)',
      lg: 'var(--r-lg)',
      xl: 'var(--r-xl)',
      full: '999px',
    },
    boxShadow: {
      none: 'none',
      e1: 'var(--e-1)',
      e2: 'var(--e-2)',
    },
    transitionDuration: {
      quick: 'var(--m-quick-d)',
      base: 'var(--m-base-d)',
      object: 'var(--m-object-d)',
      moment: 'var(--m-moment-d)',
    },
    transitionTimingFunction: {
      DEFAULT: 'var(--ease)',
      ease: 'var(--ease)',
      object: 'var(--ease-object)',
      moment: 'var(--ease-moment)',
    },
    extend: {
      maxWidth: { lesson: '640px', home: '1040px', measure: '65ch' },
      minHeight: { touch: '44px', pill: '48px' },
      minWidth: { touch: '44px' },
    },
  },
  plugins: [],
};

export default config;
```

Components use **tokens only** for colour: the default palette is replaced, there are no raw Tailwind colours and no hex values in `components/` or `app/` other than `app/layout.tsx` `themeColor` (`#F6F2E9`, `#0D1526`). Many components set colours via inline `style={{ background: 'var(--…)' }}`. Sizes and spacing are not token-only: there are many arbitrary pixel values (`h-[44px]`, `w-[220px]`, `min-h-[132px]`, `max-w-[360px]`, `gap-[4px]`, `h-[6px]`, `text-h1 tracking-[-0.015em]`, NotchBar 8×10px, ProgressRing 76px, etc.).

**Iconography and brand**

- Icons: hand-written inline SVGs in `components/ui/Icon.tsx`, 24×24 viewBox, `stroke: currentColor`, stroke-width 2 (check 2.5), round caps/joins, `aria-hidden`. Set: `IconArrowRight`, `IconArrowLeft`, `IconClose`, `IconCheck` (optional `draw` animation), `IconPlay` (filled triangle), `IconSettings`, `IconBook`, `IconLadder`, `IconReview` (two arcs with arrowheads), `IconUser`, `IconFlag`, `IconSearch`, `IconInfo`, `IconChevron` (right), `IconHalf`, `IconCircle`, `IconDot` (last three unused).
- Mark (`components/ui/Mark.tsx`): 32×32: two rails and two lower rungs in `--board` (stroke 3.2, round), the top rung in `--rung`. Wordmark: the mark in a 40px `--board-ink` disc with `--e-1`, "English Ladder" in display `--t-wordmark` 600, and a mono `.label` line "A1 → C1" underneath (board colours on the sidebar).
- App icon / favicon `public/icons/icon.svg`: 64×64, `rx 14` square in `#13213F`, rails and two lower rungs `#F6F2E9`, top rung `#D2AE72` (brass, not `--rung`), stroke 5.5 round. PNGs 192, 512, maskable 512.
- Decoration: `Contours` (`components/ui/Contours.tsx`): deterministic topographic rings (two "peaks", 11 and 7 rings) in an SVG `viewBox="0 0 720 360"` `preserveAspectRatio="xMaxYMid slice"`, strokes `--board-ink` at 0.07 opacity with every 4th ring `--brass` at 0.22; on every `.board` surface (home board, rung header, climb moment). No mascots, no illustrations besides the lesson visuals, no emoji.

---

### 7. Screens and layout

**Navigation model** (`components/ui/AppShell.tsx`, `AppNav.tsx`, `AppHeader.tsx`)

- Tab places: **Tangga** (`/`, matches `/` and `/rung/*`, `IconLadder`), **Ulang** (`/review/`, short "Ulang", long "Ulang cepat"), **Kata** (`/words/`, long "Kata-kataku"), **Saya** (`/me/`, also active on `/settings` and `/about`).
- Phone (<900px): fixed bottom tab bar on `--surface` with top `--rule` border, 4-column grid, icon (22px) in a 52×30 pill that turns `--accent-soft` when active, label `text-tab` bold; active text `--accent`; safe-area bottom padding. A non-sticky phone header (`AppHeader`, hidden ≥900px) shows the wordmark and an optional aside. Content gets `padding-bottom: calc(64px + safe-area + 24px)`.
- Desktop (≥900px): fixed left sidebar, 256px, `--board` navy: wordmark (board colours) with a bottom `--board-2` rule, long labels in body `--t-body` 500, active row `--board-2` background with a 3px brass inset bar on the left, `WeekStrip compact onBoard` pinned at the bottom. Content area gets `padding-left: 256px`.
- Focus mode (no tab bar/sidebar): lesson player, rung test, running quick review, Read & listen. These use a sticky top header (`--surface`, bottom `--rule`) and, for lesson/test/review, a sticky `BottomActionBar`.
- Back behaviour: lesson ← = previous step (rung page at step 0), ✕ = rung page; test ← and ✕ = rung page; read ← = rung page; rung page "← Tangga" = home; Settings and About have a "← Saya" back link; the running quick review has **no** exit control.

**Home** (`/`, `components/ladder/HomeView.tsx`)
Purpose: the one next thing to do, your rung's lessons, review entry, the whole ladder.

Phone:
```
┌────────────────────────────────┐
│ (◉) English Ladder      ● A1   │  ← wordmark; CEFR chip of "your" rung with tier dot → rung page
│     A1 → C1                    │
│ KAMIS, 15 OKTOBER              │  ← eyebrow date (after hydration)
│ Selamat *siang.*               │  ← text-hero, last word italic accent
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ LANJUT · EASY 1 · PELAJARAN┃ │  ← board (navy + contours), brass label
│ ┃ 3 · CONTOH                 ┃ │
│ ┃ It is ____ umbrella.       ┃ │  ← quoted resume sentence, text-h1, blank = brass underline
│ ┃ A atau an                  ┃ │  ← title in UI language (italic for id)
│ ┃ ▬▬▬▭▭▭      [Lanjutkan →]  ┃ │  ← 6 step dots (brass) + btn-board
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ Easy 1 · 2 dari 10  Semua pel… │  ← text-h2 + link to rung page
│ ┌──────┐┌──────┐┌──           │  ← LessonStrip: 220px doc-grid cards,
│ │№ 01 ✓││№ 02  ││              │    scroll-snap, 6px spine left
│ │I am… ││He, s…││              │
│ └──────┘└──────┘└──           │
│ [⟳ Ulang cepat              ›] │  ← accent-soft row, only after ≥2 completed lessons
│ Tangganya        2 dari 10 dibuka│
│ ┌ ● HARD · B2–C1 ────────────┐ │  ← LadderRail in a card
│ │ ╫ Hard 3  C1        segera │ │
│ │ …                          │ │
│ │ ● EASY · PRE-A1–A2−        │ │
│ │ ╫ Easy 1  A1  ▮▮▯▯▯▯▯▯▯▯   │ │  ← your rung: accent-soft, taller, accent bar
│ │ ╫ Starter Pre-A1 · pilihan │ │
│ └────────────────────────────┘ │
│ [Tangga][Ulang][Kata][Saya]    │
└────────────────────────────────┘
```

Desktop (≥900px): sidebar left; main grid `minmax(0,1fr) 320px` in max 1040px: left column (date, greeting, board, lesson grid of **3** columns, review row), right column the ladder card (`self-start`). The board has `p-6` (32px) and, from 900px, `gap-5`; its `min-[900px]:p-9` class generates nothing because the spacing scale stops at 8 (see §13).

States and copy:
- Before hydration (static HTML): h1 "English Ladder", no date.
- Greeting by visitor hour: <11 "Selamat pagi.", <15 "Selamat siang.", <18 "Selamat sore.", else "Selamat malam."
- First visit (no lesson ever opened): board label "MULAI DI SINI", title "Mulai dari anak tangga pertama" (last word brass italic), body "Tiap anak tangga berisi pelajaran pendek, masing-masing sekitar sepuluh menit, dan progresmu tersimpan di browser ini.", button "Mulai Easy 1 →" (first Easy 1 lesson), small link "Benar-benar baru? Mulai dari Starter: bunyi, huruf, angka dan sapaan."
- In progress: quotes `resume[step]` (or the current check item's text on step 4).
- All lessons of the rung done and not climbed: "LANJUT · EASY 1", "Tes Easy 1", "Semua pelajaran selesai. Saatnya tes.", "Lanjutkan →" to the test.
- "Your" rung (`here`): the rung of the lesson the board points at, else `currentRung` (first live, non-optional, unclimbed rung).
- Lesson strip card: `№ 01` mono label, status pill (selesai / n untuk diulang / step "3 / 6" for current), title.en in display `--t-card`; footer: Indonesian title in italic (or state word in English UI) + minutes. Spine: accent = done, brass = current, rule = new; current card has a 2px accent outline.
- Ladder rows: tier sections with eyebrow "● EASY · PRE-A1–A2−"; each row: rails (`--wood`), rung bar (`--wood-dark`, `--accent` for yours, `--rung` climbed), name (display, semibold unless soon), CEFR label, "· pilihan" for optional, right side "segera" or NotchBar (+ "sudah dinaiki" when climbed); climbed rows `bg-rung-soft`.

**Rung page** (`/rung/<id>/`, `RungView` → `RungDetail`)
```
┌────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │  ← navy board header, full-bleed on phones (<640px)
│ ┃ ← Tangga                   ┃ │
│ ┃ ● EASY · A1          ( 2/10)┃ │  ← brass label with tier dot; ProgressRing 76px (brass, gold if climbed)
│ ┃ Easy 1                     ┃ │  ← text-hero
│ ┃ Kalimat pertamamu: …       ┃ │
│ ┃ Bahasa penjelasan: Bahasa… ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ PELAJARAN                      │
│ ┌────────────────────────────┐ │  ← one card, divided rows (LessonRow)
│ │ 1  I am, you are           │ │  ← big serif numeral (good when done, accent when current)
│ │    Aku, kamu               │ │
│ │    ● selesai  6 MNT        │ │
│ ├────────────────────────────┤ │
│ │ 3  A or an    (accent-soft)│ │  ← current: "Lanjut langkah 4 →" / "Mulai pelajaran →"
│ └────────────────────────────┘ │
│ [▶ Baca dan dengar: Rina's family ›] │  ← if reading.yaml exists
│ [⚑ Tes anak tangga           ›] │  ← dashed card; "16 soal · lulus 12 · bisa dicoba kapan saja" or best score; rung-soft when climbed
│ KAMU AKAN KETEMU TOPIK INI LAGI│
│ [Easy 2 / prepositions, …]     │  ← up to 3 later rungs sharing threads
└────────────────────────────────┘
```
Max width 640px (`max-w-lesson`) with the AppShell. "Soon" rungs: "{rung} sedang disiapkan", "Anak tangga ini belum siap. Ini topik yang akan kamu pelajari:", topic chips (`lang="en"`). No lessons: "Belum ada pelajaran yang siap di anak tangga ini." No progress ring for soon rungs. Lessons are never locked.

**Lesson player** (`/rung/<rung>/<slug>/`, `LessonPlayer`)
```
┌────────────────────────────────┐
│ ←  ▬▬▬▬▭▭          [ID|EN]  ✕  │  ← sticky top bar (surface): 44px buttons, StepBar 6px segments
│    EASY 1 · 9 [DRAFT]    4 / 6 │  ← mono labels; Draft badge ≥640px only; counter in accent
├────────────────────────────────┤
│ BANDINGKAN                     │  ← StepLabel (mono label, accent, focus target h2)
│ Bahasa Indonesia memakai *di*… │  ← Prose
│ ┌──────────────┐┌────────────┐ │  ← PairCard (stacked on phone, 2 cols ≥640)
│ │✕ TERDENGAR ANEH││✓ ALAMI   │ │
│ │The book is at…││The book is on…▶│
│ └──────────────┘└────────────┘ │
│ ┌ BEDA KATA ─────────────────┐ │  ← WordsCard on accent-soft
├────────────────────────────────┤
│         [  Lanjut  →  ]        │  ← sticky BottomActionBar, max 360px button
└────────────────────────────────┘
```
Desktop: same 640px column; from 640px the content sits on `--surface` with `--r-lg` and `--e-2` over `--paper`, padding 32px. Screen reader: hidden live region announces "Langkah n dari 6: {name}"; focus moves to the step's `h2`. Title on Concept: "I am, you are" (h1, en) + italic "Aku, kamu".

**Check step**: see §4. Counter "Soal 2 dari 6" (small bold muted, tabular). Feedback sheet replaces the bottom bar on correct.

**Done step**: see §3. Copy: "Selesai: {title}", "Kata baru", "{n} soal untuk diulang nanti" / "Semua benar di percobaan pertama.", "Kamu akan ketemu topik ini lagi di {rung}.", buttons "Pelajaran {n} →" / "Ikut tes {rung} →" and "Kembali ke {rung}". Notch for this lesson animates gold then accent (`notch-settle`) the first time it is completed.

**Rung test** (`/rung/<rung>/test/`): see §4. Focus mode; header "TES EASY 1", "i / 16".

**Climb moment** (`components/check/ClimbMoment.tsx`): fixed full-screen `role="dialog" aria-modal`, **navy `--board` background with Contours** (not `--rung-soft`), scrollable.
```
        ║                    ║
      ▶ ║ Easy 2             ║      ← brass triangle marker moves up one row (--m-moment)
        ╠════════════════════╣
        ║ Easy 1   ▮▮▮▮▮▮▮▮▮▮ ║      ← this rung on --board-2; gets a 3px --rung ring; notches fade in gold
        ╚════════════════════╝      ← rung bar turns from --wood-dark to --rung
      Easy 1 · climbed               ← text-hero, lang="en" in both UI languages
 Satu anak tangga lagi. Pelan-pelan, tapi naik.   ← display h2 italic brass
          [ Mulai Easy 2 ]  or  "EASY 2 SEGERA HADIR"
          [ Lihat tangga ]
          [ Tinjau jawaban ]          ← closes the overlay to the results
```
Plays `climbed`. Only on the first pass.

**Quick review** (`/review/`): see §4. Idle states inside `PageShell` (title "Ulang cepat", text-hero); running state focus mode with header "ULANG CEPAT" and "i / 5".

**Read & listen** (`/rung/<rung>/read/`, `components/lesson/ReadingView.tsx`): focus mode, sticky header (← and "EASY 1 · BACA DAN DENGAR"). Eyebrow "BACA DAN DENGAR", h1 title.en, italic title.id; a card with the whole text as a body-size `Sentence` with play button (long text spoken in ≤160-char chunks) and a `<details>` "Lihat terjemahan"; "Kata baru" glossary chips; "Soal" with all items stacked (practice mode, inline why); when all solved: "Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Inggris."; ghost button "Kembali ke {rung}". Nothing is saved.

**My words** (`/words/`, `components/WordsView.tsx`): PageShell "Kata-kataku", subtitle "{n} kata dari {l} pelajaran". Empty: card with book icon and "Kata-kata dari pelajaran akan terkumpul di sini." Otherwise: search field ("Cari kata, Inggris atau Indonesia"), horizontally scrolling lesson filter chips ("Semua", "3 · A or an" …; active chip `bg-ink text-paper`), checkbox "Hanya dari pelajaran dengan kesalahan", then per lesson an eyebrow link "Pelajaran 3 · A or an" and a card list: word (display semibold, irregular plural "→ children"), Indonesian italic, an article badge ("an") when the word is in `nouns.yaml`, and a play button. "Tidak ada kata yang cocok." when filtered empty. Source: glossaries of lessons in `progress.opened`.

**Saya** (`/me/`, `components/MeView.tsx`): PageShell "Saya". A 3-column stat card (`text-hero` numbers): "pelajaran selesai", "kata terkumpul", "anak tangga dinaiki". On phones only: `WeekStrip` + "Titik terisi menandai hari kamu belajar." (on desktop the week is in the sidebar). "LAINNYA": rows to Pengaturan ("Bahasa, suara, tampilan dan cadangan progres") and Tentang ("Cara kerja English Ladder dan arti A1 sampai C1").

**Settings** (`/settings/`, `components/SettingsView.tsx`): back to Saya. Quiet notice when storage is unavailable: "Progres tidak tersimpan di browser ini." Groups (eyebrow + card): **Bahasa** (Bahasa tampilan: Bahasa Indonesia / English; Bahasa penjelasan: Ikuti anak tangga / Selalu Indonesia / Selalu Inggris), **Suara** (no-voice note; Aksen suara: Britania / Amerika; Suara: Perempuan / Laki-laki; "▶ Coba suara" plays "Hello! This is your English Ladder voice. Is it clear?" and shows "Memakai suara: {name}"; Kecepatan suara: 0,75× / 1×; Efek suara toggle), **Tampilan** (Ukuran teks 100/115/130%; Tema: Terang / Gelap / Sistem; Kurangi gerakan: Ikuti sistem / Aktif), **Progres** (Ekspor progres → downloads `english-ladder-progress-YYYY-MM-DD.json`; Impor progres → file picker, "Progres berhasil diimpor." / "File ini tidak bisa dibaca sebagai progres English Ladder."; "Hapus semua progres" → inline `--off-bg` confirm "Ini menghapus semua pelajaran, tes dan kata. Tidak bisa dibatalkan." with "Ya, hapus semua progres di browser ini" / "Batal"). Segmented controls are radiogroups with roving arrows; selected = `--accent` fill.

**About** (`/about/`, `components/AboutView.tsx`): back to Saya; sections hard-coded in the component per UI language: "Apa ini", "Tentang CEFR", "Progresmu", "Cara pelajaran ditulis", "Siapa yang membuat" ("Dibuat oleh Fathul…"), "Koreksi" with a link to `https://github.com/andifathulms/english-ladder/issues`.

**Not found** (`app/not-found.tsx`): PageShell "Halaman ini tidak ada", "Mungkin tautannya berubah. Kembali ke tangga dan lanjut dari sana.", button "Tangga".

Sticky elements summary: phone tab bar (fixed bottom), desktop sidebar (fixed left), focus-mode top headers (sticky top), `BottomActionBar` (sticky bottom). The phone wordmark header is not sticky.

---

### 8. Components

Generic = would work unchanged for another language course (assuming strings/lang come from props or i18n). English-specific = hard-codes English text, English `lang`, English grammar, or English-only data.

| Component | File | Description | Class |
|---|---|---|---|
| `ProgressProvider`, `useProgress`, `useSettings`, `useT`, `useHydrated`, `useReducedMotion` | `components/ProgressProvider.tsx` | React context over the store; applies theme/text-size/motion/lang attributes; registers SW; sfx toggle | Generic |
| `useCanSpeak`, `useSpeak` | `components/useSpeech.ts` | Hooks over `lib/speech/speak` with accent/gender/rate settings | English-specific (depends on English voice selection) |
| `HomeView` | `components/ladder/HomeView.tsx` | Home: greeting, board, lesson strip, review link, ladder | Generic (wordmark/brand aside) |
| `ContinueCard`, `Accented` | `components/ladder/ContinueCard.tsx` | Navy board with welcome / resume / test states; italic last word | Generic, but quoted sentence `lang="en"`; `Accented` splits on spaces |
| `LadderRail` (+ internal `LadderRow`) | `components/ladder/LadderRail.tsx` | Tier-grouped ladder map with rails and notches | Generic |
| `LessonStrip`, `StatusPill`, `stateWord` | `components/ladder/LessonStrip.tsx` | Workbook-page lesson cards, scroll-snap / grid | Generic (title.en `lang="en"`) |
| `LessonRow` | `components/ladder/LessonRow.tsx` | Rung page lesson row with numeral and state | Generic (`lang="en"` on title) |
| `NotchBar` | `components/ladder/NotchBar.tsx` | n notches, fresh notch animation | Generic |
| `RungDetail` | `components/ladder/RungDetail.tsx` | Rung header board, lessons, reading/test cards, spiral links | Generic |
| `RungView` | `components/ladder/RungView.tsx` | AppShell wrapper for RungDetail | Generic |
| `WeekStrip` | `components/ladder/WeekStrip.tsx` | Monday-first practised-days dots | Generic |
| `LessonPlayer` | `components/lesson/LessonPlayer.tsx` | Six-step player, resume, keyboard, explain logic | Generic shell (sentence/title `lang="en"`) |
| `BottomActionBar` | `components/lesson/BottomActionBar.tsx` | Sticky action bar / green feedback sheet | Generic |
| `ExplainToggle` | `components/lesson/ExplainToggle.tsx` | ID / EN pill writing `settings.explain` | Generic shape; hard-codes the two languages id/en |
| `PairCard` | `components/lesson/PairCard.tsx` | Off vs natural pair | Generic (via Sentence) |
| `PlayButton` | `components/lesson/PlayButton.tsx` | 40/44px play button, hidden without an English voice | English-specific (gated on English voice) |
| `Prose` | `components/lesson/Prose.tsx` | Explanation paragraphs; bold = target term | English-specific (`strong lang="en"`, `focus lang="en"`) |
| `Sentence`, `segments` | `components/lesson/Sentence.tsx` | Target sentence with focus, translation, play, spoken-word highlight, tap note | English-specific (`lang="en"` hard-coded; word split on whitespace) |
| `StepBar` | `components/lesson/StepBar.tsx` | 6-segment progress bar | Generic |
| `StepLabel` | `components/lesson/StepLabel.tsx` | Focusable mono step heading | Generic |
| `TalkCard`, `SoundCard`, `WordsCard` | `components/lesson/StrandCards.tsx` | Dialogue, pronunciation point, word-split cards | Generic structure; SoundCard words `lang="en"` |
| `ReadingView` | `components/lesson/ReadingView.tsx` | Read & listen page | Generic (copy "teks utuh dalam bahasa Inggris" is English-specific) |
| `STEP_KEYS` | `components/lesson/steps.ts` | Step i18n keys | Generic |
| `CheckItemView` (+ `Prompt`, `ListenPrompt`) | `components/check/CheckItemView.tsx` | Renders and grades all six item types (practice/test) | Mostly generic; `lang="en"` on prompts; listen fallback copy mentions English |
| `CheckStep` | `components/check/CheckStep.tsx` | One item at a time with counter, records answers | Generic |
| `OptionPill` | `components/check/OptionPill.tsx` | Answer pill with states | Generic shape; `lang="en"`, `text-left` |
| `TileTray` | `components/check/TileTray.tsx` | FLIP word tiles, answer line + tray | Generic shape; `lang="en"` |
| `WhyLine` | `components/check/WhyLine.tsx` | Reason/hint line | Generic |
| `TestRunner` (+ `ReviewRow`) | `components/check/TestRunner.tsx` | Rung test intro/run/results | Generic |
| `ReviewRunner` | `components/check/ReviewRunner.tsx` | Quick review | Generic |
| `ClimbMoment` | `components/check/ClimbMoment.tsx` | Celebration overlay | Generic (title `lang="en"`; arrow assumes LTR) |
| `AboutView` | `components/AboutView.tsx` | About copy (hard-coded in component) | English-specific (copy about English, repo URL) |
| `MeView` | `components/MeView.tsx` | Saya page | Generic |
| `SettingsView` | `components/SettingsView.tsx` | All settings | Mostly generic; accent GB/US and English voice sample are English-specific |
| `WordsView` | `components/WordsView.tsx` | My words | Generic shape; article badge and irregular plural from English `nouns.yaml` |
| `AppShell` | `components/ui/AppShell.tsx` | Header + content + nav | Generic |
| `AppNav` | `components/ui/AppNav.tsx` | Tab bar / sidebar | Generic (`aria-label="English Ladder"`) |
| `AppHeader`, `BackLink` | `components/ui/AppHeader.tsx` | Phone wordmark header; back link | Generic |
| `PageShell` | `components/ui/PageShell.tsx` | Titled page in the shell | Generic |
| `Badge` | `components/ui/Badge.tsx` | Draft badge | Generic |
| `Contours` | `components/ui/Contours.tsx` | Topographic lines | Generic |
| `Icon*` | `components/ui/Icon.tsx` | Icon set | Generic (directional icons need mirroring) |
| `Mark`, `Wordmark` | `components/ui/Mark.tsx` | Logo mark and wordmark | English-specific text ("English Ladder", "A1 → C1") |
| `ProgressRing` | `components/ui/ProgressRing.tsx` | n/total ring | Generic |
| `Segmented` | `components/ui/Segmented.tsx` | Radiogroup segmented control | Generic |
| `TierDot` | `components/ui/TierDot.tsx` | Tier dot (unused) | Generic |
| `Toggle` | `components/ui/Toggle.tsx` | Switch | Generic (knob uses `left`/`translateX`) |
| `tierName`, `tierRange` | `components/ui/tier.ts` | Tier label helpers | Generic |
| `VisualStage` | `components/visuals/VisualStage.tsx` | Stage + registry lookup | Generic |
| `registry` | `components/visuals/registry.ts` | id → component | Generic mechanism, English entries |
| `VisualProps` | `components/visuals/types.ts` | Visual contract | Generic |
| `useRoving` | `components/visuals/useRoving.ts` | Roving tabindex | Generic (arrow directions assume LTR) |
| `PlaceScene` + `placeLogic` | `components/visuals/PlaceScene.tsx`, `placeLogic.ts` | English prepositions scene | English-specific |
| `NounBuilder` + `nounLogic` | `components/visuals/NounBuilder.tsx`, `nounLogic.ts` | a/an and plurals | English-specific |
| `NearFar` | `components/visuals/NearFar.tsx` | this/that/these/those | English-specific |

---

### 9. State, storage, i18n, audio

**Progress model** (`lib/progress/`)

- Key `english-ladder:v1` (`constants.ts`), `SCHEMA_VERSION = 2`.
- `store.ts` is the only `localStorage` user. Load once on first access: parse + `migrate`, then a write probe (`english-ladder:v1:probe`); any failure → `storageOk = false`, state stays in memory. Writes debounced 250ms (`commit`), flushed on `visibilitychange: hidden` and `pagehide`; settings changes and import/reset flush immediately. `useSyncExternalStore` subscription; server snapshot is an empty state.
- API: `subscribe`, `getState`, `getServerState`, `isStorageAvailable`, `todayKey`, `markPracticedToday`, `setLessonStep(lessonId, step, checkIndex?)` (also adds the lesson to `opened`), `completeLesson(lessonId)` (step 5, completed, marks today), `restartLesson(lessonId)`, `recordAnswer(itemId, correctFirstTry)` (Leitner, marks today), `recordTest(rungId, attempt, passed)` (last 20 attempts, marks today), `getSettings`, `setSettings(patch)`, `exportJSON()` (pretty JSON of the whole state), `importJSON(json)` (migrate → replace → flush; returns `{ok}` or `{ok:false,error}`), `reset()` (empty state, keeps settings), `flush`, `__resetForTests`.
- Derived (`derive.ts`): `lessonState` (new / progress step / done / review n), `rungState` (soon / climbed / progress done / new), `currentRung`, `continueTarget` (welcome / lesson+step+quote / test), `weekDays` (Monday-first), counts.

`lib/progress/types.ts` (full):

```ts
export type Settings = {
  uiLang: 'id' | 'en';
  explain: 'rung' | 'id' | 'en';
  accent: 'gb' | 'us';
  voice: 'female' | 'male';
  rate: 0.75 | 1;
  sfx: boolean;
  textSize: 100 | 115 | 130;
  theme: 'system' | 'light' | 'dark';
  motion: 'system' | 'reduce';
};

export type LessonProgress = {
  /** Step the learner is on (0–5). */
  step: number;
  /** Furthest step reached. */
  furthest: number;
  /** Check item the learner is on, when step is the Check step. */
  checkIndex?: number;
  completed: boolean;
  lastOpened: number;
};

export type ItemProgress = {
  /** Result of the first answer in the most recent attempt. */
  firstTry: boolean;
  /** Leitner box 1–3. */
  box: 1 | 2 | 3;
  lastSeen: number;
};

export type TestAttempt = { score: number; total: number; seed: number; date: string };

export type RungProgress = { tests: TestAttempt[]; climbed: boolean };

export type ProgressState = {
  schemaVersion: number;
  lessons: Record<string, LessonProgress>;
  items: Record<string, ItemProgress>;
  rungs: Record<string, RungProgress>;
  /** Local dates (YYYY-MM-DD) with practice, newest last, at most 60. */
  days: string[];
  /** Lessons whose glossary has been seen (for My words). */
  opened: string[];
  settings: Settings;
};
```

Migrations (`migrations.ts`): stepwise by version. `0 → 1` adds `schemaVersion: 1`. `1 → 2` changes `settings.theme` from `'system'` or missing to `'light'` (light became the default). Newer versions and non-objects throw `MigrationError`. `normalize` fills defaults, drops wrong-typed collections, keeps `days` to the last 60, and validates each setting against its allowed values.

**Settings and defaults** (`lib/progress/defaults.ts`): `uiLang: 'id'`, `explain: 'rung'`, `accent: 'gb'`, `voice: 'female'`, `rate: 1`, `sfx: true`, `textSize: 100`, `theme: 'light'`, `motion: 'system'`.

**i18n** (`lib/i18n/`): two flat tables, `id.ts` (`as const`, source of `StringKey`) and `en.ts` (`Record<StringKey, string>`), same 211 keys (unit-tested). `translate(lang, key, vars)` falls back to Indonesian then the key, interpolates `{name}` placeholders. `useT()` returns `{ t, lang }`. Day names are comma-separated strings (`days.short`, `days.long`). Lesson content carries its own bilingual fields; the About page copy lives in `AboutView.tsx`, not in i18n. Keys by group:

- `app`: app.name
- `nav`: nav.home, nav.settings, nav.words, nav.about, nav.back, nav.main, nav.review, nav.reviewLong, nav.wordsShort, nav.me
- `home`: home.continue, home.continueBtn, home.welcomeTitle, home.welcomeBody, home.start, home.ladder, home.quickReview, home.thisWeek, home.youAreHere, home.lessonN, home.step, home.greet.morning, home.greet.day, home.greet.afternoon, home.greet.night, home.startHere, home.rungProgress, home.allLessons, home.quickReviewMeta, home.ladderMeta, home.testReady, home.starterLink
- `rung`: rung.soon, rung.climbed, rung.inProgress, rung.notStarted, rung.lessons, rung.test, rung.testMeta, rung.testBest, rung.explainLang, rung.explain.id, rung.explain.mixed, rung.explain.en, rung.spiralTitle, rung.soonTitle, rung.soonBody, rung.topics, rung.noLessons, rung.progressRing, rung.resume, rung.startLesson, rung.testAlways, rung.optional
- `lesson`: lesson.state.new, lesson.state.progress, lesson.state.done, lesson.state.review, lesson.minutes, lesson.draft, lesson.next, lesson.prev, lesson.close, lesson.stepAnnounce, lesson.progress, lesson.idCollapsed, lesson.off, lesson.natural, lesson.worked, lesson.tapFocus, lesson.focusNote, lesson.doneTitle, lesson.newWords, lesson.toReview, lesson.allFirstTry, lesson.nextLesson, lesson.backToRung, lesson.takeTest, lesson.spiral, lesson.finishChecks, lesson.explainToggle, lesson.talk, lesson.sound, lesson.words
- `step`: step.concept, step.see, step.examples, step.contrast, step.check, step.done
- `check`: check.wrong, check.correct, check.hint, check.counter, check.tapTiles, check.answerLine, check.tray, check.checkOrder, check.fixPrompt, check.scenePrompt, check.nextItem, check.correctShort, check.listenPrompt, check.listenPlay, check.listenNoAudio
- `test`: test.title, test.intro, test.start, test.finish, test.pass, test.notYet, test.reviewTitle, test.yourAnswer, test.correctAnswer, test.retry, test.missedFrom, test.seeClimb
- `climb`: climb.title, climb.line, climb.viewLadder, climb.next, climb.nextSoon
- `review`: review.title, review.intro, review.summary, review.summaryAll, review.empty, review.start, review.done, review.again, review.emptyTitle, review.readyTitle
- `words`: words.title, words.empty, words.search, words.mistakesOnly, words.noMatch, words.count, words.subtitle, words.searchPlaceholder, words.all
- `settings`: settings.title, settings.group.lang, settings.group.sound, settings.group.display, settings.group.progress, settings.uiLang, settings.explain, settings.explain.rung, settings.explain.id, settings.explain.en, settings.accent, settings.accent.gb, settings.accent.us, settings.speed, settings.speed.slow, settings.speed.normal, settings.sfx, settings.sfxHint, settings.textSize, settings.theme, settings.theme.system, settings.theme.light, settings.theme.dark, settings.motion, settings.motion.system, settings.motion.reduce, settings.export, settings.import, settings.importOk, settings.importFail, settings.reset, settings.resetConfirm, settings.resetCancel, settings.resetWarn, settings.resetDone, settings.storageOff, settings.speechOff, settings.on, settings.off, settings.voice, settings.voice.female, settings.voice.male, settings.voiceSample, settings.voiceSampleText, settings.voiceUsing
- `me`: me.title, me.lessonsDone, me.wordsMet, me.rungsClimbed, me.weekHint, me.more, me.settingsHint, me.aboutHint
- `read`: read.title, read.meta, read.translation, read.questions, read.done
- other: about.title, audio.play, audio.playText, days.short, days.long, days.practised, days.notPractised, notFound.title, notFound.body

Unreferenced keys: app.name, rung.notStarted, rung.topics, lesson.finishChecks, check.nextItem, test.correctAnswer, test.seeClimb, words.count, audio.play.

**Speech** (`lib/speech/speak.ts`): Web Speech API only; no pre-recorded audio.
- Voices loaded with `getVoices()` and refreshed on `voiceschanged` (listeners notify `useCanSpeak`).
- `scoreVoice(v, accent, gender)`: non-`en*` voices excluded; base 300 for the chosen accent (`en-gb` or `en-us`), 200 for the other, 100 for any other `en-*`; −1000 for novelty/robotic names (Albert, Bells, Zarvox, eSpeak, Compact, Fred…); +60 for clear voices (`natural|neural|online|enhanced|premium|siri` or names starting "Google"); +40 for matching gender by name list (female names win over male substrings), −20 for the opposite; +5 for `default`. `pickVoice` takes the highest score.
- `speak(text, { accent, gender, rate, onBoundary })`: cancels current speech; splits text longer than 160 chars into sentence chunks (`/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g`) with offsets; utterance `rate = rate × 0.95`, pitch 1, volume 1, `lang = voice.lang`; word-boundary callback mapped to plain-text offsets for highlighting; a generation counter stops cancelled multi-chunk readings. Resolves silently if unavailable.
- `canSpeak()` is true only when an English voice exists; `PlayButton` renders nothing otherwise; `listen` items fall back to showing the sentence; Settings shows "Browser ini tidak punya suara bahasa Inggris, jadi tombol putar disembunyikan."
- `chosenVoiceName()` shown in Settings. `stopSpeaking()` exists.

---

### 10. Direction-sensitivity audit (important for Arabic)

No `dir` attribute is set anywhere (`app/layout.tsx` sets only `lang="id"`; the theme script and `ProgressProvider` only switch `lang` between `id` and `en`). Nothing in the code would make any element RTL today.

**Physical (left/right) CSS**

Tailwind classes:

| File | Line(s) | Usage | Needs change in RTL? |
|---|---|---|---|
| `components/ui/AppNav.tsx` | 42 | sidebar `min-[900px]:inset-y-0 min-[900px]:right-auto` (pins to the left) | yes |
| `components/ui/AppNav.tsx` | 61 | active tab `shadow-[inset_3px_0_0_var(--brass)]` (left edge bar) | yes |
| `components/ladder/LessonStrip.tsx` | 51 | `pl-6 pr-4` | yes (`ps-6 pe-4`) |
| `components/ladder/LessonStrip.tsx` | 52 | spine `absolute inset-y-0 left-0 w-[6px]` | yes (`start-0`) |
| `components/lesson/StrandCards.tsx` | 55 | `pl-3 pr-1` (play button side) | yes |
| `components/check/OptionPill.tsx` | 36 | `text-left` | yes (`text-start`) |
| `components/visuals/NearFar.tsx` | 94 | `text-left` | yes |
| `components/visuals/NounBuilder.tsx` | 93 | `ml-1` | yes |
| `components/check/WhyLine.tsx` | 10 | `mr-2` after "Petunjuk:" | yes |
| `components/MeView.tsx` | 30 | `divide-x` (Tailwind 3 sets left/right border widths) | yes (`divide-x-reverse` or logical borders) |
| `components/check/ClimbMoment.tsx` | 65, 67 | marker triangle `left-[-15px] border-l-[12px]` + `borderLeftColor` (points right, sits left of the ladder) | yes |
| `components/check/ClimbMoment.tsx` | 38, 39, 43, 59 | rails/rows with symmetric `left-[x] right-[x]` | no (symmetric) |
| `components/ladder/LadderRail.tsx` | 60–62 | rails `left-[2px]`/`right-[2px]`, bar `left/right-[2px]` | no (symmetric) |

Inline styles / CSS:

| File | Line | Usage | RTL? |
|---|---|---|---|
| `styles/globals.css` | 176 | `.shell { padding-left: var(--sidebar-w) }` ≥900px | yes (`padding-inline-start`) |
| `styles/globals.css` | 197, 203 | `step-in-fwd` `translateX(var(--m-shift))`, `step-in-back` `translateX(-shift)` | yes, mirror |
| `components/ui/Toggle.tsx` | 27 | knob `left: 3` and `translateX(20px)` | yes |
| `components/check/TileTray.tsx` | 37 | FLIP `translate(dx, dy)` computed from real positions | no (direction-agnostic) |
| `components/visuals/PlaceScene.tsx`, `NearFar.tsx` | SVG coordinates and transforms | scene layout in SVG space | not affected by `dir`; decide whether scenes mirror |
| `components/ui/ProgressRing.tsx` | 11 | `-rotate-90`, arc runs clockwise | optional mirror |
| `components/ui/Contours.tsx` | 27 | `preserveAspectRatio="xMaxYMid slice"` | decorative, optional |

Counts: 13 Tailwind occurrences in 11 component files, of which 9 occurrences (8 files) are asymmetric and need logical equivalents; plus 3 rules in `globals.css` and 1 inline style in `Toggle.tsx`. Already logical/symmetric: `.page` uses `padding-inline`/`margin-inline`; `px-*`, `mx-*`, `inset-x-0`, `scroll-px-gutter`, `snap-start`, flex `gap` (which mirror automatically under `dir="rtl"`).

**Animations / transitions with direction**
- Step transitions (`.step-fwd` from +12px, `.step-back` from −12px): mirror for RTL.
- Lesson keyboard: `ArrowRight` = next step, `ArrowLeft` = previous (`LessonPlayer.tsx` 116–125): swap in RTL.
- Roving radiogroups (`useRoving.ts`): `ArrowRight/Down` = next, `ArrowLeft/Up` = previous: swap horizontal keys in RTL.
- Progress fills (StepBar, NotchBar, step dots, WeekStrip) are flex rows: they flip automatically with `dir="rtl"`.
- Tiles fly via FLIP: fine. Answer line/tray are `flex-wrap`: flow right-to-left automatically under RTL.
- Lesson strip horizontal scroll-snap: flips with `dir`.
- Climb marker: absolute left triangle pointing right; needs mirroring.
- Toggle knob slides right when on.

**Directional icons** (`components/ui/Icon.tsx`)
- `IconArrowLeft` (back, previous, test "previous"), `IconArrowRight` (Lanjut, Lanjutkan, next lesson, start review/test), `IconChevron` (points right; review row, Me rows, rung reading/test cards): all need mirroring.
- `IconPlay` (triangle pointing right): media play icons are conventionally not mirrored; decide.
- `IconFlag` (flag flies right), `IconReview` (circular arrows): optional.
- `IconBook` spine on the left: optional.
- Text "A1 → C1" in `Mark.tsx`, "word → plural" in NounBuilder, "y → ies" rule labels use a literal → arrow.

**`lang` and `dir` attributes**
- `<html lang="id">` (switched to `en` for English UI). No `dir`.
- `lang="en"` is hard-coded on every target-language surface: `Sentence` `<p>`, `OptionPill`, `TileTray` tiles, `CheckItemView` gap prompt, `Prose` `<strong>` and focus spans, `ContinueCard` quote, `LessonStrip`/`LessonRow`/`TestRunner`/`WordsView`/`RungDetail` titles and words, `ClimbMoment` title, `SoundCard` words, visuals' labels/chips, `ReadingView` title, LessonPlayer h1 and glossary. `lang="id"` on translations, cues, Indonesian titles. `lang={lang}` (UI language) on a few UI-language strings. An Arabic app needs `lang="ar" dir="rtl"` on these, and `dir="ltr"` islands where Indonesian/Latin text sits inside RTL (or vice versa) depending on the chosen page direction.
- `ExplainToggle` buttons have `lang={o.v}`.

**Text handling that would break or degrade with Arabic script**
- **Italic** is the convention for translations (`.id-text`), Prose `<em>`, `Accented` last word, the climb line, the continue-card Indonesian title. Arabic has no true italic; if any Arabic text is set in these styles it gets synthetic slant. Fine as long as italic stays on Indonesian only.
- **Uppercase + letter-spacing**: `.label` (0.12em) and `.eyebrow` (0.16em) are uppercase and tracked; `tracking-[-0.02em]`/`-0.01em` on hero/headings; Tailwind `text-label` 0.1em. Letter-spacing breaks Arabic cursive joining. Any target-language text in labels (e.g. `SoundCard` `sound.focus` is `font-mono normal-case tracking-normal`, OK; topic chips; lesson-filter chips) must avoid tracking.
- **Fonts**: Newsreader, Atkinson Hyperlegible Next and IBM Plex Mono are loaded as latin subsets; none covers Arabic. Arabic would fall back to Georgia/system-ui. An Arabic display + text face is needed (and probably a larger `--t-sentence`, more line-height for diacritics).
- **Mono** used for Plex labels inside SVGs (`table · meja`) and the SoundCard focus label: no Arabic glyphs.
- **Word splitting**: `Sentence.segments` splits on `\s+` (fine for Arabic words), but rendering each word as its own span and a focus span mid-word (e.g. `[[ال]]كتاب`) can break letter joining across element boundaries. `Accented` splits on the last space. `TileTray` tiles are whole strings (fine).
- **Speech-boundary highlight** relies on `onboundary` char indices; Arabic voices often do not emit word boundaries (degrades silently).
- **Grading** (`lib/check/grade.ts`): exact string equality after `stripMarkup`, no Unicode normalisation (NFC/NFKC), no handling of tashkeel (harakat), tatweel, alef/hamza variants, ta marbuta/ha, ya/alif maqsura, or Arabic-Indic vs Western digits. `sameOrder` lowercases (no-op for Arabic) and its "first word case-sensitive" rule is meaningless; `trimPunct` strips only `[.,!?;:]`, not Arabic `، ؛ ؟`.
- **Speech chunking** (`chunks`) splits on `[.!?]` only, not `؟` or `۔`.
- **Lint** (`lib/content/lint.ts`): `words()` uses `[A-Za-z]+(?:'[A-Za-z]+)?`, so Arabic text yields no words (lexicon lint silently passes everything); `knownWord` strips English suffixes; all detectors and structure rules are English regexes with `\b` (JS `\b` is ASCII-only).
- **Search** in My words uses `toLowerCase().includes` (no diacritic-insensitive matching for Arabic).
- **Sorting**: NounBuilder `localeCompare` without a locale.
- **Number keys** 1–4: fine on keyboards; display numbering uses Western digits via `tnum`.
- `tierName` capitalises the tier id (Latin UI only).
- `Prompt` blank width `3.5em` and `align-baseline` underline: fine but untested in RTL.

---

### 11. Reusability assessment

**Could move unchanged (or with trivial parameterisation) into a shared core**

- `lib/check/random.ts`, `lib/check/draw.ts`, `lib/check/leitner.ts`: pure, language-agnostic.
- `lib/progress/*` (store, types, defaults, derive, migrations): generic once `STORAGE_KEY` and the default `Settings` (accent/voice enums) are injected per app.
- `lib/speech/sfx.ts`: fully generic.
- `lib/markup.ts`, `lib/content/sections.ts`: generic.
- `lib/content/load.ts`: generic apart from `getNouns` (English data file) and `summarize` (uses `itemText`).
- `lib/i18n/index.ts` (`translate`), and the UI string tables as a base that each app extends/overrides.
- `lib/basePath.ts`, `lib/routes.ts`, `lib/sw.ts`, `public/sw.js` (with the cache name prefix and precache list as parameters), `scripts/serve.mjs`.
- UI: `AppShell`, `AppNav`, `AppHeader`/`BackLink`, `PageShell`, `Badge`, `Segmented`, `Toggle`, `ProgressRing`, `Contours`, `Icon` set, `NotchBar`, `StepBar`, `StepLabel`, `BottomActionBar`, `WeekStrip`, `LadderRail`, `LessonStrip`, `LessonRow`, `RungDetail`, `RungView`, `HomeView`, `ContinueCard`, `MeView`, `ReviewRunner`, `TestRunner`, `ClimbMoment`, `CheckStep`, `WhyLine`, `VisualStage`, `useRoving`, `ProgressProvider`.
- Styling: `tailwind.config.ts`, `styles/globals.css`, token names (values could stay identical for "look and feel exactly like this app").

**English-specific; need an Arabic counterpart**

- Content: `content/**` (curriculum, lessons, tests, readings), `content/lexicon/core.yaml`, `content/data/nouns.yaml`.
- Visuals: `PlaceScene`/`placeLogic` (English prepositions), `NounBuilder`/`nounLogic` (a/an, English plurals), `NearFar` (this/that/these/those); `NounSchema`; `VISUAL_IDS`.
- Lint rules: `INVENTORY_DETECTORS`, `STRUCTURE_RULES`, `words()`/`knownWord()` morphology.
- Speech voice selection (`scoreVoice`'s `en-gb`/`en-us` preference, name lists, `accent: 'gb' | 'us'` setting, the English sample sentence).
- Fonts (`app/fonts.ts`): need Arabic-capable faces.
- Brand: `Mark`/`Wordmark` text, manifest, metadata, About copy, `app.name`, the icon (could stay).
- Copy in i18n that names English: `home.start` ("Mulai Easy 1"), `settings.speechOff`, `check.listenNoAudio`, `read.done`, `settings.importFail`, `settings.voiceSampleText`, `about.*`, `climb.title` ("· climbed" is English in both tables).

**Hard-coded English assumptions inside "generic" code**

- `grade.ts`: first-word case sensitivity; ASCII punctuation trimming; no Unicode/diacritic normalisation.
- `Sentence`, `OptionPill`, `TileTray`, `Prose`, `CheckItemView` `Prompt`, `ContinueCard`, `LessonStrip`, `LessonRow`, `TestRunner`, `WordsView`, `ClimbMoment`, `LessonPlayer`: `lang="en"` literals.
- `ExplainToggle`: the two explanation languages are literally `id`/`en` ("ID", "EN", "Bahasa Indonesia", "English").
- Schema field names: target-language text lives in fields named `en` (`examples[].en`, `pair`, `glossary[].en`, `talk[].en`, `title.en`), while `Bilingual.en` elsewhere means "English translation of the Indonesian UI/explanation". `title.en` is shown as the primary lesson title everywhere. For Arabic, either rename to `target`/`tl` + `id` (+ optional `en`), or keep `en` meaning "target language", which would be confusing.
- `lib/check/text.ts` `itemText` returns the English literal "Listen and choose." for listen items without a prompt (shown on the continue card).
- `PlayButton`/`canSpeak`/`useCanSpeak` assume the target language is English (`lang.startsWith('en')`).
- `speak.chunks` sentence regex (`.!?`).
- `Accented` and `Sentence` tokenisation by spaces.
- `WordsView` irregular plural and article badge from `nouns.yaml`.
- `rung.inProgress` string "{n}/8" patched by `.replace('/8', …)` in `NotchBar`.
- `HomeView` static fallback h1 "English Ladder"; `AppNav` `aria-label="English Ladder"`; `sw.js` cache prefix `english-ladder-`; `SettingsView` export filename `english-ladder-progress-…`.
- Lexicon/structure lint is keyed by rung id (`starter`, `easy-1`).
- Directional assumptions listed in §10.

**Recommended split**

```
packages/ladder-core/                 # shared, framework code; no course content
  lib/
    check/        grade.ts (with a pluggable normalise(text) + tokenEquals), draw.ts, leitner.ts, random.ts, text.ts
    content/      schema.ts (generic: Bilingual, item types, lesson, rung, test pool, reading),
                  load.ts, sections.ts, lint-core.ts (runner that takes per-app detectors/rules/tokeniser)
    progress/     store.ts, types.ts, derive.ts, migrations.ts (createStore({ storageKey, defaults }))
    speech/       sfx.ts, speak-core.ts (Web Speech wrapper taking a voice scorer + sentence splitter)
    i18n/         translate.ts, base strings (id.ts, en.ts) that apps extend
    markup.ts, routes.ts, basePath.ts, sw-register.ts
  components/
    ui/           AppShell, AppNav, AppHeader, PageShell, Badge, Segmented, Toggle, ProgressRing, Contours, Icon, Mark (props: name, range)
    ladder/       HomeView, ContinueCard, LadderRail, LessonStrip, LessonRow, NotchBar, RungDetail, RungView, WeekStrip
    lesson/       LessonPlayer, StepBar, StepLabel, BottomActionBar, ExplainToggle (languages as props),
                  Sentence, Prose, PairCard, PlayButton, StrandCards, ReadingView
                  (all target-language elements take lang/dir from a CourseConfig context)
    check/        CheckItemView, CheckStep, OptionPill, TileTray, WhyLine, TestRunner, ReviewRunner, ClimbMoment
    visuals/      VisualStage, types.ts, useRoving.ts (RTL-aware), createRegistry()
    ProgressProvider.tsx, MeView, SettingsView (option lists from config), WordsView (noun annotator as a prop)
  styles/         tokens.css (structure + default values), globals.css (logical properties only)
  tailwind-preset.ts
  public/sw.template.js
  scripts/        serve.mjs, content-check runner

apps/english-ladder/                  # per-app
  content/        curriculum.yaml, <rung>/*.md, test.yaml, reading.yaml, lexicon/, data/nouns.yaml
  course.config.ts   { id, name, targetLang: 'en', dir: 'ltr', explainLangs, accents, voiceScorer,
                       normalise, tokenise, lint: { detectors, structureRules, wordRegex }, storageKey }
  visuals/        PlaceScene, NounBuilder, NearFar (+ logic), registry.ts
  i18n/           app-specific string overrides
  app/            Next routes (thin: import core views), fonts.ts, layout.tsx
  public/         manifest, icons

apps/arabic-ladder/
  content/        …Arabic curriculum, lessons, data (e.g. noun gender, broken plurals)
  course.config.ts   { targetLang: 'ar', dir: 'rtl', normalise: strip tashkeel/tatweel, unify alef/ya/ta marbuta,
                       Arabic punctuation; voiceScorer for ar-*; tokenise on spaces }
  visuals/        Arabic-specific visuals
  app/fonts.ts    Arabic display + text faces (Arabic subsets)
```

---

### 12. Drift from the original docs

| Area | What PRD / CLAUDE / DESIGN say | What the code does now |
|---|---|---|
| Easy 1 lesson count | PRD §4.1: 8 + test; PRD §4.4 table lists 8 lessons | 10 lessons (a/an split from plurals; "A new book" adjective-before-noun added) |
| Easy 1 lesson order | PRD §4.4: 3 a/an+plurals, 4 demonstratives, 5 have, 6 possessives, 7 prepositions, 8 questions | 3 a/an, 4 plurals, 5 demonstratives, 6 adjective+noun, 7 have, 8 possessives, 9 prepositions, 10 questions; ids keep old numbers |
| Lessons per rung | PRD §4.1: 8,8,8,8,8,8,8,7,7 | `lessons` in curriculum: Starter 8, Easy 1 10, Easy 2 10, Easy 3 9, Medium 1 9, Medium 2 8, Medium 3 9, Hard 1–3 8 |
| Lesson length | PRD §1, §2: 8–12 minutes | `minutes` 6–9 |
| Rung count / Starter | CLAUDE §1: nine rungs + optional Starter (back-filled) | 10 rungs incl. Starter (live, optional, 8 lessons, own test, CEFR "Pre-A1") |
| Visual components | CLAUDE §1/§4, PRD §7: two (place scene, noun builder); PRD §4.4: demonstratives diagram "inline, not a library component" | Three registered visuals: `place-scene`, `noun-builder`, `near-far` |
| Lesson frontmatter | CLAUDE §5.2 example lacks `summary`, `worked`, example `note` | `summary` required; `worked` (2–8) required when no `visual`; examples may carry `note` |
| Curriculum fields | CLAUDE §5.1 lacks `lessons`, `threads`; inventory lacks `adjective-before-noun` | Both fields present; `adjective-before-noun` in Easy 1 inventory |
| Test pool | CLAUDE §5.5: ~24 items, draw 16; PRD §5.5 ~24 | `draw`/`pass` per pool; Easy 1 32 items (16/12); Starter 16 items (12/9); schema requires ≥16 items |
| Progress API | CLAUDE §7.2: `setLessonStep(lessonId, step)`, `recordTest(rungId, {…})` | `setLessonStep(lessonId, step, checkIndex?)`, `recordTest(rungId, attempt, passed)`, plus `restartLesson`, `isStorageAvailable`, `flush`, `subscribe` |
| Stored progress | PRD §8: per lesson first-try result per item | Item results are stored globally by item id (`items`), plus `opened` list and `checkIndex` |
| Voice selection | CLAUDE §7.5 / PRD §5.7: en-GB → en-US → any en-* by accent | Scored choice: accent, clear/neural voices, novelty penalty, **gender** (new setting, default female), rate × 0.95, long text chunked |
| Audio coverage | PRD §5.7: every example, glossary word and check item has a play button | Examples, worked, talk, pair natural, sound words, reading text and My words have play buttons; check items do not (only `listen`); Done-screen glossary chips do not |
| Service worker | CLAUDE §7.8: precache shell and fonts at install | Precaches 7 pages + manifest + icon; fonts are cached on first fetch (cache-first `/_next/static/`) |
| Explain toggle placement | PRD §5.3: toggle on Concept and Contrast | Always in the lesson top bar (matches DESIGN §6.3) |
| Week strip | PRD §5.1: on home | Not on home; in the desktop sidebar and on Saya (phones) |
| Rung-state copy | PRD §5.1: "in progress (n/8)" | Notches = rung's `lessons`; string patched from "/8" |
| Visual tests | CLAUDE §8: Playwright screenshots of home, visuals, climb at 360/1280 both themes | Not present (e2e has 5 flow tests + axe on 15 routes × 2 themes at 360px) |
| `--t-hero` | DESIGN §4.1: 2.75rem, Display 700 | 3rem (2.25rem ≤480px), headings weight 500 |
| `--t-h1` | DESIGN: 2.0rem, Display 700 | 2.125rem, weight 500 |
| `--t-h2` | DESIGN: Display 700 | weight 500 |
| Extra type tokens | DESIGN §4.1 lists 7 | Also `--t-tab` 0.72rem, `--t-card` 1.3rem, `--t-wordmark` 1.125rem |
| Label tracking | DESIGN: `--t-label` +0.1em | `.label` 0.12em, `.eyebrow` 0.16em (Tailwind `text-label` 0.1em) |
| Wordmark | DESIGN §2: display 700, two words stacked on narrow screens | Display 600, one line, mark in a cream disc, mono "A1 → C1" line |
| Radii | DESIGN §5.2: `--r-lg 16`, `--r-xl 22` | 18px, 24px |
| `--e-1` | DESIGN §5.3: `0 1px 0 var(--rule)` + 4% shadow, no outline border | `0 0 0 1px var(--rule)` ring + 4% + 18% shadows |
| `--e-2` | DESIGN: `rgb(15 30 25 / .45)` | `rgb(var(--shadow-rgb) / 0.45)`, navy-based `20 33 61` (black in dark) |
| `--subject` (light) | DESIGN §10: `#D2553A` | `#C2533A` |
| `--glass` | DESIGN §10: token | `--glass-opacity: 0.45` token exists but unused; literal 0.45 in PlaceScene |
| Sidebar width | DESIGN §6.0: 232px | 256px (`--sidebar-w`) |
| Lesson strip desktop | DESIGN §6.1: 4-column grid from 900px | 3-column grid |
| Rung page header | DESIGN §6.2: tier soft tint (`--easy-soft`), progress ring in tier colour | Navy `.board` header with contours; ring in brass (gold when climbed); tier soft tokens unused |
| Rung lesson list | DESIGN §6.2: numbered nodes on a vertical rule; current lesson a raised card with its own step bar | One card of divided rows with big serif numerals; current row tinted `--accent-soft` with "Lanjut langkah n →" text |
| Climb moment | DESIGN §6.7: `--rung-soft` background; buttons "Lihat tangga" / "Mulai Easy 2" | Navy `--board` with contours; buttons "Mulai {next}" (or "segera hadir"), "Lihat tangga", plus "Tinjau jawaban" |
| Lesson-done notch | DESIGN §6.5: gold, settles to teal | Settles to `--accent` (navy blue) over 1400ms |
| Notches | DESIGN §6.1, §6.7: 8 per rung | `rung.lessons` per rung (8–10) |
| Component inventory | DESIGN §7: `RungRow`, `ContrastBox`, `Sheet`, `EmptyState` | Not present as components (rung row is internal `LadderRow`; sheet is inside `BottomActionBar`; empty states inline) |
| Reduced motion | DESIGN §5.4: climb becomes a fade-in of the gold rung | 120ms linear ring fade, no marker move; notches/opacity still fade |
| Test progress | DESIGN §6.6: simple counter | Counter plus a 6-segment StepBar as coarse progress |
| Draft visibility in prod | PRD §6 / CLAUDE §3: production shows reviewed only | Same rule, but deploy sets `NEXT_PUBLIC_SHOW_DRAFTS=true`, so the live site shows all drafts |
| Nouns | CLAUDE §9 / PRD §7.2: ~120 nouns | 142 nouns |
| Read & listen, strands, listen items | Not in PRD | Present (CLAUDE §5.2, §5.4, §5.5b were updated for them) |

---

### 13. Open issues

No `TODO`, `FIXME`, `XXX` or `HACK` comments exist in `app/`, `components/`, `lib/`, `scripts/`, `styles/`, `public/`, `content/` or `tests/`. Things that look half-built, inconsistent or buggy:

1. **All 18 lessons are drafts**, and the deploy workflow ships drafts (`NEXT_PUBLIC_SHOW_DRAFTS: 'true'`), so the production site shows Draft badges. README says to remove the variable once lessons are reviewed.
2. **Lesson ids don't match order or file names** (`03-a-an.md` → `easy1-03-articles-plurals`; order 5 → `easy1-04-demonstratives`; 7 → `easy1-05-have-has`; 8 → `easy1-06-possessives`; 9 → `easy1-07-prepositions-place` with items `e1-07-c*`; 10 → `easy1-08-to-be-questions`). Intentional (ids are permanent) but easy to trip over.
3. **Running quick review has no exit control** (no back/close in its header, nav hidden).
4. **Read & listen results aren't saved**: no `recordAnswer`, no completion flag, no presence on home or the ladder; the SW doesn't precache `/read/`.
5. **`ExplainToggle` overwrites the global setting** with `id`/`en`; after one tap the per-rung fading (`explain: 'rung'`) is lost for every rung until changed back in Settings. In `mixed` rungs, EN shows pressed.
6. **Test progress bar semantics**: `TestRunner` reuses `StepBar` (6 segments) whose `aria-label` reads "Langkah n dari 6", which is wrong for a 16-item test.
7. **`rung.inProgress` = "{n}/8"** with `NotchBar` doing `.replace('/8', '/' + total)`: fragile string hack.
8. **Dead or unused code/tokens**: `TierDot`, `IconHalf`, `IconCircle`, `IconDot`; `OptionPill` state `'answer'`; tokens `--easy-soft`, `--medium-soft`, `--hard-soft`, `--glass-opacity`, `--ground-opacity`; `HomeView`'s `testRungs` prop (passed, ignored); i18n keys app.name, rung.notStarted, rung.topics, lesson.finishChecks, check.nextItem, test.correctAnswer, test.seeClimb, words.count, audio.play; `:root:not([data-motion='full'])` in `tokens.css` (nothing sets `full`).
9. **Stale comment**: `NearFar.tsx` says "for lesson 4"; demonstratives is now lesson 5.
10. **Lint coverage gaps**: no inventory detector for `adjective-before-noun` or any Starter inventory id; structure rules exist only for `starter` and `easy-1`; lexicon morphology is naive.
11. **My words across rungs**: groups sort by `order` only and label "Pelajaran n", so Starter and Easy 1 lessons with the same number interleave without a rung name. Same for the lesson-filter chips.
12. **Continue card for listen items** without a prompt quotes the English literal "Listen and choose." (`lib/check/text.ts`).
13. **Climb title is English in both UI languages** (`climb.title: '{rung} · climbed'` in `id.ts` too, rendered `lang="en"`).
14. **`theme-color` meta follows the OS**, while the app defaults to light; a dark-OS user sees a dark browser bar over a cream app.
15. **Done screen glossary has no audio**, unlike My words; check items have no audio except `listen` (PRD promised both).
16. **Service worker precache list** covers only `rung/easy-1/` among rung pages (not Starter, tests, reads, lessons); lessons are cached only after being opened, which matches PRD's offline promise.
17. **Reopening a completed lesson always restarts at step 0** (`restartLesson`), with no "review only the check" path.
18. **Quick review threshold** on `/review/` counts completed lessons in stored progress (including lessons that might be hidden in a build), while the home card uses visible lessons only.
19. **Icon colour drift**: `icon.svg` top rung uses `#D2AE72` (brass), the in-app `Mark` uses `--rung` (`#B8862E`); DESIGN says `--rung`.
20. **Many literal pixel sizes** in components (heights, widths, gaps) despite the token rule for colours/type/motion; `notch-settle` uses a literal 1400ms.
21. Test answers are not fed into Leitner boxes or "to review" states; only lesson and review practice are.
22. **Dead Tailwind class**: `ContinueCard.tsx:59` uses `min-[900px]:p-9`, but `tailwind.config.ts` replaces the spacing scale with `1`–`8` only, so no CSS is generated and the desktop board keeps 32px padding.
23. `DESIGN.md` §3.1 says the Navy & cream palette was "revised 15 Oct 2026"; the token values match, but DESIGN §4–§6 still carry older type sizes, radii, shadow and layout descriptions (see §12).
