# CLAUDE.md — Japanese Ladder

Guidance for Claude Code in this repository. Read `PRD.md` for what to build and `DESIGN.md` for how it must look. This file covers how to build it.

---

## 1. What this is

A static, levelled Japanese course for Indonesian speakers, from zero to N1. Eleven rungs: Kana 1 (hiragana), Kana 2 (katakana and sounds), then Easy 1–3, Medium 1–3 and Hard 1–3, mapped to JLPT N5–N1, with JFT-Basic marked at Medium 1.

v1 ships Kana 1, Kana 2 and Easy 1 (first half of N5) with the placement check, word and kanji decks, tracing, recorded kana and eight visuals. It deploys as a static site; progress lives only in the browser.

It is an app in the **Ladder monorepo**, on the shared engine `packages/ladder-core`, alongside English (built), Arabic and Mandarin (specified). It reuses the most from Mandarin Ladder.

---

## 2. Starting point

1. The monorepo and `ladder-core` must exist: the English Ladder repo after the `refactor/ladder-core` branch is merged (see `docs/ladder-core-report.md` there).
2. Copy `apps/english` to `apps/japanese`. Delete its `content/**` (keep the layout), English visuals and English lint rules. Keep `PlaceScene`'s drawing.
3. Write `apps/japanese/course.config.ts`:
   - `target: { lang: 'ja', dir: 'ltr' }`
   - storage key `japanese-ladder:v1`, cache prefix `japanese-ladder-`
   - Japanese `text` hooks (§7.1), voice scorer (§7.7) and lint (§6)
   - `explainLangs: []`; Seigaiha as `boardPattern`
4. Set `styles/theme.css` (DESIGN §3); replace the manifest, icons, metadata and About copy.
5. **Engine features go into `ladder-core`, behind config, never as forks in the app.**
   - If Mandarin Ladder already put ruby rendering, TracePad, the word deck, two doors, placement, capstones, lesson-scoped toggles, Tirukan and the audio manifest pipeline into core, use them.
   - If not, build them in core now, generically, so Mandarin can use them.
   - Japanese-only code (`lib/ja`, Japanese visuals, `JaSentence`, `KanaInput`, content) lives in `apps/japanese`.
6. After every engine change, English Ladder's parity screenshots must still match.

---

## 3. Stack

The monorepo's: Next.js 14.2 static export, React 18.3, TypeScript strict, Tailwind 3.4 with the `ladder-core` preset, gray-matter + js-yaml + zod at build, Vitest, Playwright + axe, npm workspaces.

- **Runtime dependencies** stay `next`, `react` and `react-dom`. Romaji–kana conversion, mora counting, pitch rendering and stroke matching are hand-written and tested.
- **Build-only:** the font subsetter used by Mandarin Ladder (shared script in core).
- **Fonts:**
  - Latin faces through core
  - **Klee One** (OFL) and **Noto Sans JP** (OFL) as source files in `apps/japanese/fonts-src/`, subset at build to `public/fonts/` with generated `styles/fonts-ja.css`
  - Never load Japanese fonts from Google Fonts at runtime

---

## 4. Commands (inside `apps/japanese`, or from the root with `-w apps/japanese`)

```bash
npm run dev
npm run build             # data:check → content:check → fonts:subset → strokes:extract → static export
npm run preview
npm run content:check     # schema, word/kanji inventory, furigana and reading checks, audio manifest
npm run data:import       # rebuild content/data from vendor sources (§5.6); rarely run
npm run fonts:subset
npm run strokes:extract   # KanjiVG → public/strokes/ for every kana and kanji used
npm run audio:list
npm run audio:ingest
npm run test
npm run test:e2e
npm run lint
```

---

## 5. Content model

### 5.1 `content/curriculum.yaml`

```yaml
rungs:
  - id: easy-1
    name: Easy 1
    name_ja: "{初|しょ}{級|きゅう} 1"
    tier: easy                 # kana | easy | medium | hard
    jlpt: N5                   # "—" for kana rungs
    jft: false                 # true on medium-1
    cefr: A1
    status: live
    optional: false
    lessons: 16
    furigana: always           # always | new | on-request | off
    romaji: none               # kana-1 only: "fade" (rules in §7.2)
    words_cum: 400             # estimates; checked against the imported lists (±20%)
    kanji_cum: 50
    description: { id: "...", en: "..." }
    topics: [...]
    threads: [...]
    inventory: [...]           # grammar ids from content/data/grammar.yaml
```

### 5.2 Lesson file `content/<rung>/<nn>-<slug>.md`

```yaml
id: easy1-13-arimasu-imasu
rung: easy-1
order: 13
status: draft
review: { by: "…先生", date: 2026-12-01 }    # required when reviewed
minutes: 8
title: { id: "Ada di mana?", en: "Where is it?", ja: "どこに ありますか" }
summary: { id: "...", en: "..." }
introduces: [n5-arimasu, n5-imasu, n5-position-nouns]
spiral: existence
visual: { id: place-scene-ja, props: { initial: ue } }
examples:
  - ja: "ボール は {箱|はこ} の [[{上|うえ}]] に あります 。"
    kana: "ぼーる は はこ の うえ に あります 。"
    id: "Bolanya ada di atas kotak."
    en: "The ball is on the box."           # optional
    pitch: { 箱: 0, 上: 0 }                 # optional, Tokyo accent numbers per word
pair:
  off: { ja: "{上|うえ} {箱|はこ} の に あります 。" }
  natural: { ja: "{箱|はこ} の [[{上|うえ}]] に あります 。" }
sound:  { words: ["おばさん", "おばあさん"], kind: long-vowel, tip: { id, en } }   # Bunyi card
kanji:  [上, 下, 中]                     # kanji introduced here
polite: { rows: [{ level: casual|polite|honorific, ja, id }] }   # Sopan card (optional)
work:   { situation: { id, en }, lines: [{ who, ja, id }] }      # Kerja card (optional)
words:  { id: "...", en: "..." }        # Kata card
talk:   { lines: [{ who, ja, id, en? }] }
tirukan: { ja: "...", kana: "...", id: "..." }
check: [ ...4–6 items ]
glossary:
  - { ja: "{箱|はこ}", kana: "はこ", id: "kotak", type: noun, pitch: 0, jlpt: N5 }
  - { ja: "あります", kana: "あります", id: "ada (benda)", type: verb-1, jlpt: N5 }
next: easy1-14-counters
```

**Markup rules:**
- **Ruby:** `{漢字|かん|じ}` gives per-character readings (`{箱|はこ}` for a single kanji; `{今日|きょう}` for a jukujikun word read as a whole, flagged with `{今日|=きょう}`). Okurigana are written outside: `{食|た}べる`.
- **Spacing:** words separated by single spaces; punctuation is its own token; spaces are removed at render.
- **Focus:** `[[…]]` may wrap a ruby group.
- **`kana`:** the full reading with the same word tokens. `content:check` verifies it equals the ruby readings plus the kana in `ja`, token by token.
- **Particles:** は and へ are written as particles (`は`, `へ`); `kana` writes them the same, and audio and lint know they're said *wa* and *e*.

Body sections: `concept.id`, `concept.en`, `contrast.id`, `contrast.en`, as the siblings.

### 5.3 Check items
Shared fields: `id`, `cue?`, `why: { id, en }`, `from?`, `furigana?: boolean` (default: follow the rung, except reading tests where it is false for kanji at or below the rung).

| type | fields |
|---|---|
| `choice`, `gap`, `fix`, `scene`, `listen`, `order` | as siblings; Japanese strings use §5.2 markup |
| `trace` | `char` (kana, or a kanji on this rung's handwriting set), `guide: on | off` |
| `build` | `char`, `parts`, `answer` (kanji components) |
| `kana` | `audio` or `ja` (shown without furigana), `answer` (kana), `script: hiragana | katakana | any` |
| `mora` | `audio`, `ask: count | spelling`, `options`, `answer` |
| `pitch` | `audio`, `pair` (two words with pitch numbers), `answer` |
| `form` | `from` (word), `target` (form id: `masu`, `te`, `nai`, `ta`, `dict`, `potential`, …), `options?` or typed (`kana` input), `answer`, `accept?` |

### 5.4 Other content files
- `content/<rung>/test.yaml`, `content/placement.yaml` (thresholds `{ easy1: 17, kana2: 12 }`)
- `content/<rung>/reading.yaml` and `dialogue.yaml` (capstones)
- `content/data/kana.yaml`: every kana `{ kana, romaji, row, column, script, origin_kanji, irregular_note? }`
- `content/data/counters.yaml`: `{ counter, reading_rules (1–10 with sound changes), id_classifier?, objects }`
- `content/data/grammar.yaml`: grammar points per level with ids (authored from the textbooks' common order and checked by the reviewer)
- `content/data/politeness.yaml`: common verb triples (casual / polite / honorific / humble)

### 5.5 Ids
Lesson, check, word (`w-<jlpt>-<sha1(ja+kana) first 8>`) and kanji (`k-<char>`) ids are permanent.

### 5.6 Imported data (`content/data/vendor/`, `public/strokes/`)

| Data | Source | Licence | Notes |
|---|---|---|---|
| Word readings, meanings, word types | JMdict (EDRDG) | CC BY-SA 4.0 | Validate authored `kana` and `type`; attribution on About |
| Kanji readings, stroke counts, grades, jōyō flag | KANJIDIC2 (EDRDG) | CC BY-SA 4.0 | For the kanji deck and lint |
| JLPT word and kanji lists (N5–N1) | A vetted community list (JLPT publishes none since 2010) | Recorded in `SOURCE.md` | Labelled "perkiraan" (estimate) in the app; a teacher spot-checks 50 entries per level |
| Pitch accent | An open pitch-accent dataset (licence recorded in `SOURCE.md`) | Must allow redistribution | Optional per word; missing pitch shows nothing |
| Stroke order and paths | KanjiVG | CC BY-SA 3.0 | Kana and kanji; `strokes:extract` converts to the shared stroke JSON format from Mandarin Ladder (medians computed from KanjiVG centrelines) |

Nothing is fetched at runtime. CC BY-SA data means the derived data files are shared under the same licence; note this in `SOURCE.md` and the About page.

---

## 6. Content and accuracy rules (most important section)

1. **Inventory.**
   - Words in lesson Japanese must be on this rung's list or below, or be names in `names.yaml`, or be listed in `extra:` with a reason.
   - Grammar must be in the inventory up to this lesson.
   - Kanji written without furigana in a reading test must be at or below this rung.
   - Kanji above the rung always carry ruby.
2. **Register.**
   - Up to Easy 2, all sentences addressed to the learner and all examples are polite (です/ます), except inside the Sopan card.
   - Casual forms appear from Easy 3; honorific and humble forms from Medium 1.
   - Lint flags plain-form sentence endings before Easy 3.
3. **Kana 1 script rule.** Examples use only kana taught so far. Romaji is authored nowhere: it's generated from `kana` by `lib/ja/romaji.ts` (Hepburn) and shown per the fade.
4. **Readings must be right.**
   - `kana` and ruby readings are checked against JMdict for each word, allowing listed alternatives.
   - Counter readings come from `counters.yaml` only.
   - Rendaku and jukujikun must match JMdict.
   - Errors in reviewed lessons, warnings in drafts.
5. **Particles in `kana`** stay は/へ/を. `romaji.ts` renders them wa/e/o when they're tagged as particles (a token on its own).
6. **Japanese fonts and stroke data only.** Never reuse Mandarin Ladder's Chinese fonts or stroke files, even for shared characters (§5.6, DESIGN §4.1).
7. **Indonesian contrast must be true and specific.** When politeness maps to *kamu / Anda / Bapak*, add the honest limit in one line (Japanese politeness also depends on in-group and out-group, not just rank).
8. **Work content** (Kerja cards) follows real workplace usage; the reviewer checks register. No company names.
9. **Content sources.** No anime, manga, drama or song lines. Original everyday and workplace content only.
10. **Reviews.**
    - Claude drafts with `status: draft`; never sets `reviewed` or fills `review`.
    - Reviewed lessons need `review.by` and `review.date`, enforced by `content:check`.
11. **Sizes:** one idea per lesson; 4–6 examples; 4–6 checks; 8–16 glossary words; 3–8 new kanji per Easy lesson.
12. **Ids are permanent.**

---

## 7. Architecture

### 7.1 `lib/ja/` (pure, unit-tested)

| Function | Purpose |
|---|---|
| `parseRuby(ja)` | Parse `{漢字|か|じ}` / `{今日|=きょう}` / `[[…]]` into tokens: `{ base, readings[], focus, isParticle }` |
| `toPlain(ja)` / `toKana(ja)` | Display text without markup / full reading |
| `romajiToKana(input, script)` | Live IME-like conversion (Hepburn and common variants: shi/si, tsu/tu, chi/ti, fu/hu, ji/zi; double consonant → っ; `n'`/`nn`/n before a consonant → ん; `-` → ー in katakana) |
| `kanaToRomaji(kana, { particles })` | Hepburn for Kana 1 and My words; particles は/へ/を → wa/e/o |
| `hira ↔ kata` | Script conversion |
| `morae(kana)` | Split into morae (small ゃゅょ join the previous kana; っ, ん, ー and long vowels are their own morae); used by MoraBeats, `mora` items and audio timing |
| `pitchPattern(kana, n)` | Tokyo accent number → high/low per mora + following particle |
| `normJa(s)` | NFKC, punctuation unified, spaces removed |
| `counterReading(counter, n)` | From `counters.yaml` |
| `conjugate(word, type, target)` | Rule-based conjugation for `form` items' answer check and authoring help. Authored answers remain the truth; a mismatch is a lint warning |

### 7.2 Rendering
- `LessonContext` holds `{ furigana: 'always' | 'new' | 'on-request' | 'off', showFurigana, romaji: 'show' | 'new' | 'hide', recentKanji, rungKanji }`.
- `JaSentence`:
  - renders one `<ruby>` per kanji group with `<rt>` per character (or one `rt` for jukujikun), okurigana outside
  - hidden `rt` uses `visibility: hidden`
  - kanji outside `rungKanji` always show their `rt`
- **Romaji fade in Kana 1:** lessons 1–6 `show`; 7–8 `new` (only on kana introduced in those lessons); 9–10 `hide`.
- `JaSentence` sets `lang="ja"`, `line-break: strict`, `word-break: keep-all`, and wraps words in spans from the authored spaces.

### 7.3 Grading (core hooks)
- `compare(a, b)`: `normJa(toKana-or-plain(a)) === normJa(…b)`. Items say which form they compare.
- `kana` items compare kana exactly after `normJa`, so long vowels and っ count. With `script: any`, hiragana and katakana are unified first.
- `form`: compares the plain text and the kana reading; either matching the answer or `accept` passes.
- `order`: token arrays with `normJa`.

### 7.4 Progress (core, configured)
- Key `japanese-ladder:v1`.
- Extra state: `capstones`, `placement`, `deck`, `kanjiDeck`, `traces`.
- Settings per PRD §8.

### 7.5 Strokes and tracing
- Use the core TracePad and stroke format (from Mandarin Ladder).
- `strokes:extract` converts KanjiVG SVG paths to `{ strokes, medians }`. KanjiVG paths are centrelines, so outlines for drawing are built by stroking the centreline at a fixed width.
- Matching thresholds come from core config. Kana use the same thresholds, with hooks (はね) given the looser shape tolerance.
- A test suite of recorded traces for 20 kana and 20 kanji (fixtures) must pass.

### 7.6 Fonts
`scripts/fonts-subset` (core) runs with:
- sources Klee One (400, 600) and Noto Sans JP (400, 500)
- characters: all kana (always included, about 180 code points), every kanji and symbol in content and i18n, and every kanji on live rungs' kanji lists (for the decks)

Budget: Klee One 400 subset ≤ 400 KB. A test asserts coverage.

### 7.7 Speech and audio
- **Recording keys:** `sha1(normJa(kana)).slice(0, 12)` for text; `kana-<kana>` for single kana (e.g. `kana-きゃ`).
- **Fallback:** Web Speech prefers `ja-JP` neural/natural voices, penalises novelty voices, respects gender. Single kana and minimal pairs never use the fallback; if unrecorded, the play button hides.
- **Speech text:** reads `kana`, not `ja`, so kanji readings are always correct.
- **Word timings:** from recordings when present (manifest), else boundary events. MoraBeats timing uses `morae()` and the clip duration.
- `chunks()` splits on 。！？.

### 7.8 Components (in `apps/japanese` unless generic)
- **App:** `JaSentence`, `Furigana`, `RomajiLine`, `PitchMarks`, `KanaInput`, `MoraOption`, `PitchOption`, `FormPrompt`, `KanjiDeckCard`, `Seal`, `Seigaiha`, `JlptChip`
- **Visuals:** `KanaChart`, `KanaOrigins`, `MoraBeats` (+ mini), `PitchLine` (+ mini), `ParticleTrain`, `PlaceSceneJa`, `Counters`
- **Core (generic, add if missing):** `Seal`-style badge slot in the Done screen (configurable badge component), chip slot on ladder rows (JLPT/HSK/CEFR from config), strand card registry (apps register their card types)

### 7.9 i18n, theme, SW
- **i18n:** app overrides for brand and Japanese-specific keys (doors, placement, toggles, strand card labels, decks, JLPT/JFT labels).
- **Theme:**
  - DESIGN §3 values in `theme.css`; `data-ja-size`; `theme-color` follows the app theme
  - a contrast test over the tokens, including the seal (white on `--seal` ≥ 4.5:1 in both themes)
- **SW:**
  - cache prefix `japanese-ladder-`
  - precache the shell, `rung/kana-1/`, `rung/kana-2/`, `rung/easy-1/`, `placement/`, `words/`, `fonts-ja.css` and the Klee One 400 subset
  - audio and strokes on demand

---

## 8. Audio and licences checklist

- **Kana set** (about 110 morae, hiragana readings; katakana uses the same clips) plus the Kana 2 minimal pairs (about 40) and pitch pairs (about 20). Either commission a native Tokyo-standard speaker, or use an existing set **only if** its licence allows trimming and redistribution in a free public app. Record the choice in `public/audio/SOURCE.md`.
- **Sentences:** commissioned where possible; browser ja-JP fallback otherwise.
- **About page attributions:** JMdict and KANJIDIC2 (EDRDG, CC BY-SA 4.0), KanjiVG (CC BY-SA 3.0), the JLPT list source, the pitch data source, Klee One and Noto Sans JP (OFL), audio sources.

---

## 9. Testing

Sibling tests, plus:
- **Unit (`lib/ja`):**
  - `parseRuby` (okurigana, jukujikun, focus over ruby)
  - `romajiToKana` against 300 inputs including edge cases (`kka`, `nna`, `n'a`, `shi`/`si`, `tchi`, long vowels in katakana)
  - `kanaToRomaji` with particles
  - `morae` (きゃ = 1, っ = 1, ー = 1, ん = 1)
  - `pitchPattern` for accent types 0–4
  - `counterReading` 1–10 for 本 枚 匹 冊 個 人
  - `conjugate` for group 1, 2 and 3 verbs and い/な adjectives in every target form
- **Content:** `kana` matches ruby, readings match JMdict, inventory and register lint, romaji never authored.
- **Component:**
  - `JaSentence` (`rt` count, hidden `rt` keeps its space, out-of-rung kanji always ruby'd, `lang`)
  - `KanaInput` live conversion
  - MoraBeats with a fake clock
  - ParticleTrain keyboard reorder keeping the verb last
- **Fonts:** subset coverage; a Playwright check that Klee One renders, and that 直 骨 角 render with Japanese glyph shapes (screenshot compared with a stored baseline).
- **Strokes:** fixture traces pass; KanjiVG order spot-checks for 必, 右, 左, 生.
- **E2E:**
  - door 1 → Kana 1 lesson 1, with romaji visible
  - Kana 1 lesson 9 has no romaji
  - door 2 → seeded placement → Easy 1, no climb moment
  - a `kana` typing item
  - a kanji deck card trace
- **Accessibility:** axe on all routes in both themes, and at 140% Japanese size.

---

## 10. Build order

Finish each milestone with tests passing before starting the next.

1. **M0 App scaffold:** §2; `apps/japanese` builds empty; config, theme, brand.
2. **M1 Data:** `data:import` (JMdict and KANJIDIC2 subsets, JLPT lists, pitch data, KanjiVG); `SOURCE.md` with licences and spot checks.
3. **M2 Japanese text core:** `lib/ja/*` with tests; font subsetting; `JaSentence`, `Furigana`, `RomajiLine`; `data-ja-size`.
4. **M3 Content pipeline:** schema (§5); lint (§6); curriculum with all eleven rungs; `lessons` and estimate checks.
5. **M4 Shell:** Seigaiha, two doors, Kana tier, JLPT/JFT chips, capstones, toggles, strand cards (Bunyi, Kanji, Sopan, Kerja, Kata, Ngobrol), Tirukan, Seal on the Done screen. Reuse core where it already exists.
6. **M5 Check engine:** `kana` (KanaInput), `mora`, `pitch`, `form`; placement runner.
7. **M6 Strokes:** `strokes:extract` from KanjiVG; StrokeOrder and TracePad with Japanese data; fixtures.
8. **M7 Audio:** kana recordings, manifest, ja-JP fallback, SW caching.
9. **M8 Kana:**
   - KanaChart, KanaOrigins, MoraBeats, PitchLine
   - 20 lessons, two test pools, placement pool, Kana 2 reading
   - **Release v1.0-kana** after review and recordings
10. **M9 Easy 1:**
    - ParticleTrain, PlaceSceneJa, Counters
    - 16 lessons, test pool, reading, dialogue
    - word and kanji decks for Easy 1
11. **M10 Polish:** delight list, reduced motion, axe, Lighthouse ≥ 95 mobile, DESIGN §14 checklist. **Release v1.0.**

---

## 11. Definition of done

Sibling definition, plus:
- Furigana aligns per kanji and never collides at 140% Japanese / 130% text on 360px.
- No Japanese renders in a Chinese or system font.
- `lang="ja"` everywhere Japanese appears; romaji `lang="ja-Latn"`.
- `content:check` is clean, including readings, inventory, register and reviewer fields.
- Every kana used in a live rung has a recording.

---

## 12. Don't

Everything in the siblings' lists, plus:
- Don't fork engine code into `apps/japanese`; change `ladder-core` behind config.
- Don't use Chinese fonts or Chinese stroke data for Japanese.
- Don't author romaji; don't show romaji in lessons after Kana 1.
- Don't author furigana for kanji the learner should be reading at that rung in a reading test.
- Don't use plain-form sentence endings before Easy 3 outside the Sopan card.
- Don't use anime, manga, drama or song lines as content.
- Don't set `status: reviewed` or fill `review` fields.
- Don't fall back to Web Speech for single kana or minimal pairs.
