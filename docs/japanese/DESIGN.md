# Japanese Ladder — Design

**Read with:** `PRD.md` (what), `CLAUDE.md` (how to build).
**Baseline:** the sibling engine `ladder-core`, which renders English Ladder exactly as built (its `RECON.md` §6–§7). Japanese Ladder keeps the cream catalogue, screens, components, motion and sound. The deliberate differences are colour (sumi ink and vermilion, §3), the board pattern (§9), and what Japanese text needs (§4, §6). It reuses Mandarin Ladder's ruby, stroke, tracing and deck designs; where this file says "as Mandarin Ladder", its DESIGN.md has the detail.

**Precedence:** owner's words → this file → the siblings → the portfolio house layer.

---

## 1. The feeling

The same quiet study desk, now with **a sheet of washi paper, an ink stone, and a vermilion name seal (*hanko*).** The board is sumi ink; the paper is washi cream; vermilion is the seal you press when something is done well. Japanese text is the most beautiful thing on every screen, set in a textbook hand, with room above it for furigana.

The sibling promises stay (kind, visible progress, handmade). One is added:

4. **Rhythm is visible.** Japanese is timed in beats (morae). Long vowels, the small っ and ん are beats you can see and count, never only described.

---

## 2. Brand

- **Name:** Japanese Ladder. The word **はしご** (*hashigo*, ladder) appears beside the wordmark. It's written in hiragana on purpose: it's the first word a Kana 1 learner can read.
- **Mark:** the sibling ladder (two rails, three rungs, top rung `--rung`). The app icon is the same, on sumi `#2A2830`.
- **Wordmark:** mark in a 40px `--board-ink` disc; "Japanese Ladder" in the Latin display face at `--t-wordmark` 600; underneath, the mono line "KANA → N1" followed by はしご in the Japanese face at 1rem.
- **Board pattern:** **Seigaiha** (overlapping wave arcs, §9), in place of Contours, Lattice and Grid.
- **Seal motif:** the climb moment and the "lesson done" badge use a small square vermilion seal with 済 (*sumi*, "done") in white, in place of the plain check badge. It's the one decorative flourish.
- **Voice:** a patient older sibling who worked in Japan for three years. Warm, plain, a little playful; polite where Japanese is polite.

---

## 3. Colour

### 3.1 Palette: sumi, washi and vermilion

Token names, roles and the dark-mode mechanism are as in `ladder-core`'s `tokens.css`. `apps/japanese/styles/theme.css` sets these values. Rows marked **same** keep English Ladder's value.

| Token | Light | Dark | |
|---|---|---|---|
| `--paper` | `#F4F1EA` | `#121115` | washi |
| `--paper-2` | `#E9E4D8` | `#19181D` | |
| `--surface` | `#FFFDF9` | `#212026` | |
| `--ink` | `#1E1D20` | `#EEEAE2` | sumi |
| `--muted` | `#5E5B61` | `#ADA8B2` | |
| `--rule` | `#DDD6C8` | `#34323B` | |
| `--accent` | `#B23A22` | `#F08F70` | shu vermilion: buttons, links, focus |
| `--accent-ink` | `#FFFFFF` | `#121115` | |
| `--accent-soft` | `#F5E2DA` | `#3A211A` | |
| `--board` / `--board-2` | `#2A2830` / `#3A3742` | `#26242C` / `#34313B` | sumi ink |
| `--board-ink` / `--board-muted` | `#F4F1EA` / `#C4BFC8` | `#F2EEE6` / `#BEB8C4` | |
| `--brass` | `#CFAE73` | `#DDBA7E` | gold leaf |
| `--rung` / `--rung-soft` | `#B8862E` / `#F7EBCF` | `#E2B45A` / `#2C2516` | same |
| `--good` / `--good-bg` | `#2F6B45` / `#E3F0E4` | `#8FCB9F` / `#16281F` | same |
| `--off` / `--off-bg` | `#9B3254` / `#F6E2E8` | `#F08FB0` / `#3A1B26` | raspberry, as Mandarin Ladder (vermilion is the brand) |
| `--easy` / `--easy-soft` | `#2D7480` / `#E1EEF0` | `#7CC4CF` / `#13282B` | teal |
| `--medium` / `--medium-soft` | `#2A4A7F` / `#E4E9F2` | `#9DB8E6` / `#1E2C4B` | same |
| `--hard` / `--hard-soft` | `#6A4E8F` / `#EDE7F3` | `#C1A8E6` / `#251E37` | same |
| `--wood` / `--wood-dark` | `#B98A5A` / `#8C6440` | `#9C7550` / `#6E5236` | same |
| `--card` / `--card-top` / `--card-side` | `#D9C3A0` / `#E8D7BA` / `#B79E77` | `#B39C78` / `#C3AE8C` / `#8E7956` | same |
| `--subject` | `#2E4C7A` | `#8FA9DA` | ai indigo ball, distinct from vermilion |
| `--shadow-rgb` | `30 29 32` | `0 0 0` | |

Manifest `theme_color` and icon background: `#2A2830`. The `theme-color` meta follows the in-app theme.

### 3.2 New tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--kana` / `--kana-soft` | `#865A22` / `#F3E8D6` | `#D9AE6E` / `#2A2216` | Kana tier (ink brown, as Huruf/Dasar) |
| `--pitch` | `#2E4C7A` | `#8FA9DA` | Pitch lines and high marks |
| `--beat` | `color-mix(in srgb, var(--ink) 12%, transparent)` | same | MoraBeats blocks |
| `--seal` | `#B23A22` | `#C2442A` | The 済 seal (vermilion in both themes, with white text) |
| `--grid-line` | `color-mix(in srgb, var(--accent) 22%, transparent)` | same | Tracing grid |

### 3.3 Brand red vs wrong
Same approach as Mandarin Ladder:
- **Hue:** vermilion (orange-red) for the brand, raspberry (blue-red) for wrong.
- **Shape:** ✕ and strikethrough on wrong.
- **Place:** vermilion on buttons, focus and the seal; raspberry only on answered pills and the "terdengar aneh" card.

**Measured contrast:** accent on paper 5.3, accent on its soft background 4.8, board-ink on board 12.9, brass on board 6.9, pitch on surface 8.5. A unit test re-checks them.

---

## 4. Typography

### 4.1 Families

| Role | Face | Notes |
|---|---|---|
| Latin display / body / mono | Newsreader / Atkinson Hyperlegible Next / IBM Plex Mono | As siblings. Atkinson also sets romaji (Kana 1, My words) with macrons where used |
| **Japanese (teaching)** | **Klee One** 400/600 (OFL, Fontworks) | Every Japanese sentence, word, tile, option, glossary entry. Its textbook-handwriting style shows stroke endings (*tome*, *hane*, *harai*) the way learners write them |
| **Japanese (UI)** | **Noto Sans JP** 400/500 | Small Japanese in chips, SVG labels, deck lists |
| Stroke data | KanjiVG | Drawn from path data, not a font |

Both Japanese faces are subset at build time to the characters used (as Mandarin Ladder). **Never** use the Mandarin app's Chinese fonts for Japanese, even for shared characters: glyph shapes differ.

### 4.2 Scale

The siblings' Latin tokens stay. Japanese tokens:

| Token | Size | Line-height | Face | Use |
|---|---|---|---|---|
| `--t-ja-sentence` | 1.875rem (1.625rem ≤ 480px) | 2.3 (room for furigana) | Klee One 600 | The sentence being taught |
| `--t-ja-body` | 1.375rem | 2.1 | Klee One 400 | Talk lines, readings, options, tiles |
| `--t-ja-small` | 1.125rem | 1.8 | Klee One / Noto Sans JP | Glossary, deck list, review rows |
| `--t-ja-glyph` | 6rem (4.5rem ≤ 480px) | 1.2 | Klee One 600 | Single kana and kanji, deck faces |
| `--t-furigana` | 0.5em of the base | 1 | Klee One 400 | Furigana |
| `--t-romaji` | `--t-small` | 1.5 | Atkinson 400, upright | Romaji under kana (Kana 1 only) |

The **Ukuran teks Jepang** setting scales `--t-ja-*` via `:root[data-ja-size]` (100 / 120 / 140%).

### 4.3 Furigana
- `<ruby>` per word, with `<rt>` per kanji (per-character readings from the markup), so okurigana stay outside the ruby: `<ruby>食<rt>た</rt></ruby>べる`.
- Furigana is `--muted` at `--t-furigana`; a hidden `rt` keeps its height.
- Kanji above the learner's current rung always show furigana.
- Hold a word or press **F** to reveal one word's furigana.

### 4.4 Text conventions
From the siblings: Indonesian italic and muted; wrong sentences in `--off` with strikethrough; balanced headings.

Japanese rules:
- **Never italic, never letter-spaced, never uppercase-transformed, never bold for emphasis inside a sentence.** The focus style is a 2px underline offset 4px in `--accent`, with `--accent` colour.
- **Romaji is upright** (italic means Indonesian) and appears only where PRD §4.5 allows.
- `lang="ja"` on all Japanese; `lang="ja-Latn"` on romaji.
- Japanese punctuation is full-width (、。「」？！).
- **Line breaking:** `line-break: strict; word-break: keep-all` on the sentence block, so words stay whole and small kana or punctuation never start a line (kinsoku).
- **Pitch marks** (when on): a thin `--pitch` line above the furigana layer, high morae marked by the line and the drop marked with a small notch. Never shown inside running sentences, only on words in My words, deck cards, the Bunyi card and PitchLine.

---

## 5. Space, shape, depth, motion

Identical to the siblings (spacing, radii, `--e-1`, `--e-2`, motion tokens, reduced-motion overrides, `--m-settle-d`). The Mandarin Ladder motions `stroke` and `explode` are reused.

New:

| Name | Duration / easing | Use |
|---|---|---|
| **beat** | 1 mora = 220ms at 1×, linear | MoraBeats: blocks light in time with audio; っ is a lit empty block; long vowels light over two beats |
| **morph** | 600ms, `--ease` | KanaOrigins: crossfade and scale from the source kanji to the kana |
| **couple** | `--m-object-d`, `--ease-object` | ParticleTrain: cars slide and couple; the locomotive stays put |
| **stamp** | 280ms, `cubic-bezier(.3,1.4,.5,1)` | The 済 seal presses in (scale 1.15 → 1, slight rotation −4°) |

With reduced motion, beats light without timing (all at once, then dim in order), morph and couple become fades, and stamp appears without scale.

---

## 6. Layout and screens

### 6.1 Direction
Horizontal, left to right, throughout. Vertical writing (*tategaki*) is not used in v1. A short note about it appears in Hard 3.

### 6.2 Home
As the siblings. First visit shows two doors on the sumi board ("Baru mulai dari nol" / "Sudah bisa hiragana"). The continue quote shows Japanese in `--t-ja-body` with furigana in `--board-muted`.

### 6.3 Ladder
Tiers top to bottom: Hard → Medium → Easy → **Kana** (`--kana` dot). Each rung row shows a **JLPT chip** (mono, e.g. "N5"). Medium 1 also has a small "JFT" chip in `--brass`. Row subtitles in Noto Sans JP (e.g. Kana 1 · ひらがな). Notch bars with more than 12 notches use the compact style from Mandarin Ladder.

### 6.4 The Japanese sentence block (`JaSentence`)

```
┌──────────────────────────────────────────────┐
│    はこ    うえ                               │  ← furigana per kanji
│  ボールは 箱 の [[上]] に あります。     ▶    │  ← Klee One --t-ja-sentence, focus underlined
│  Bolanya ada di atas kotak.                  │  ← Indonesian italic muted
└──────────────────────────────────────────────┘
```

- An LTR row with the text block and a 44px play button; Indonesian beneath.
- **Speaking highlight:** per word, from recorded timings or browser boundary events.
- **Tap a word:** a sheet with the word, its reading, pitch line, word type, meaning, and stroke order for each kanji.
- **Kana 1 variant:** romaji under each kana group in `--t-romaji`, aligned per word, fading as PRD §4.5 describes.
- **Variants:** `body`, `glyph` (on the practice grid), `pair`.

### 6.5 Lesson player
As the siblings. Top bar toggles (lesson-scoped):
- **Furigana**, when the rung is `new` or `on-request`
- **Romaji**, Kana 1 lessons 7–8 only

Concept title: the Latin title, the Indonesian italic, and a Japanese title with furigana.

### 6.6 Strand cards

| Card | Look |
|---|---|
| **Bunyi** | `--paper-2`; label "BUNYI"; the word as MoraBeats mini (beats in a row) with a PitchLine mini above, and play; minimal pairs side by side |
| **Kanji** | `--surface`; each new kanji as a 72px `glyph` tile with stroke count; meaning; on (katakana) and kun (hiragana) readings; "▶ goresan"; the lesson's words using it |
| **Sopan** | `--surface` with a 3px inline-start edge in `--brass`; two or three rows labelled "TEMAN", "SOPAN", "HORMAT", each a `JaSentence` (body) with the Indonesian equivalent (*kamu* / *Anda* / *Bapak-Ibu*) |
| **Kerja** | `--surface` with a 3px inline-start edge in `--board`; label "● KERJA"; a short exchange (supervisor and worker) with the situation in one Indonesian line above ("Saat datang ke tempat kerja") |
| **Kata** | `--accent-soft`, as siblings; katakana English shows "English: *mansion* (rumah mewah)" ↔ "マンション: apartemen" |
| **Ngobrol** | As siblings, with furigana |
| **Tirukan** | As siblings, with a MoraBeats mini over the sentence |

### 6.7 Check items (Japanese)
- **Options with Japanese:** pills in `--t-ja-body`; furigana only if the item allows.
- **`kana`:** an input that converts romaji to kana as you type (*ki* → き, *kk* → っk, *n'* or *nn* → ん, *-* → ー); the kana preview is large above the field, with helper keys っ ー ゃ ゅ ょ.
- **`mora`:**
  - Count mode: number pills 3–7 under a large play button.
  - Spelling mode: kana options, each with its beat row drawn small beneath.
- **`pitch`:** the play button plus two meaning options, each with a small line drawing in the illustration system (a bridge; a pair of chopsticks) and its PitchLine glyph.
- **`form`:** the source word with its form label ("bentuk ます") and an arrow, then options or a `kana` input.
- **`trace`:** Mandarin Ladder's TracePad with KanjiVG data; kana are traced on the same grid.
- **`order`:** word tiles; the answer line joins without spaces, with furigana if allowed.
- **Feedback:** as siblings.

### 6.8 Decks
**Kartu kata** as Mandarin Ladder. **Kartu kanji:**
- **Front:** the kanji at `--t-ja-glyph` on the practice grid.
- **Back:**
  - meaning (Indonesian)
  - on readings in katakana, kun readings in hiragana with okurigana after a dot (た.べる)
  - 2–3 example words from the learner's rung with furigana and audio
  - the stroke count, and "Tulis" (write), which opens a one-character tracing card
- Grade with "Belum ingat" and "Ingat".

### 6.9 Lesson done and climb
- **Lesson done:** the 済 seal (64px, `--seal` square with radius 6px, white Klee One 600) stamps in (`stamp`) in place of the check badge; everything else is as the siblings.
- **Climb moment:**
  - the sumi board with Seigaiha
  - the rung's Japanese name in Klee One brass with furigana
  - the title translated
  - the line "Satu anak tangga lagi. *Pelan-pelan, tapi naik.*"
  - 一歩ずつ (*ippo zutsu*, one step at a time) in Klee One `--board-muted` with furigana
  - a larger seal stamp

### 6.10 Placement (Cek kana)
As the siblings, with "Baru mulai" / "Sudah bisa hiragana".

---

## 7. Components (inventory)

From `ladder-core` and Mandarin Ladder's additions (ruby, TracePad, decks, toggles, two doors, placement, capstones, Tirukan). New or changed for Japanese:

| Component | Status |
|---|---|
| `JaSentence`, `Furigana`, `RomajiLine`, `PitchMarks` | new |
| `KanaInput` | new: romaji → kana conversion |
| `MoraOption`, `PitchOption`, `FormPrompt` | new |
| `KanjiDeckCard` | new (extends DeckCard) |
| `Seal` | new: the 済 stamp |
| `Seigaiha` | new board pattern |
| `JlptChip` | new |
| `StrandCards` | changed: Bunyi, Kanji, Sopan, Kerja, Kata, Ngobrol |
| `Wordmark` | changed: Japanese Ladder + はしご |

---

## 8. Visuals

All follow the shared illustration system (oblique 2.5D objects, light from the top-left, three tones, 1.5px edges, ground shadows, subject in `--subject` (indigo here), mono labels, `--paper-2` stage, radiogroups with roving focus, live text alternatives). Diagrams of sound and script are flat line drawings in the palette.

### 8.1 KanaChart (Kana 1–2)
- **Grid:** columns あ い う え お; rows ∅ k s t n h m y r w + ん. Cells are 56px squares on `--surface` with Klee One kana at 1.75rem and romaji below in `--t-romaji` (hidden from Kana 1 lesson 9).
- **Irregular cells** (し ち つ ふ を, plus じ ぢ づ) carry a small `--accent` corner mark; tapping one shows a note ("し dibaca *shi*, bukan *si*").
- **Toggles:** ひらがな / カタカナ; ゛゜ (dakuten); ゃゅょ (combinations, opening a second grid).
- Tapping a cell plays the sound and opens StrokeOrder for that kana in a sheet.

### 8.2 KanaOrigins (Kana 1–2)
- The source kanji (Klee One, `--muted`) at `--t-ja-glyph` morphs (`morph`) into the kana (`--ink`).
- The part that survived is highlighted in `--accent` during the morph, using KanjiVG stroke groups where they match. Where they don't, the whole glyph crossfades.
- A row of chips selects the kana; a toggle switches hiragana (cursive origin) and katakana (part-of-kanji origin).

### 8.3 MoraBeats (Kana 1–2, strand cards, Tirukan)
- The word sits on a row of beat blocks (40×40, `--beat`), each block holding one mora:
  - っ is an empty block with a small hatched pattern
  - a long vowel extends the previous block across two beats with ー or the vowel kana
  - ん sits in its own block
- **Play:** blocks light in `--accent-soft` in time (`beat`) with the audio, with a soft tick in the sound effects.
- **Compare:** two rows (おばさん / おばあさん), with beat counts at the end in mono.

### 8.4 PitchLine (Kana 2, decks, Bunyi)
- The morae across, with a line above them in `--pitch`: high morae on the upper rail, low on the lower, joined by a line; the drop after an accented mora marked with a small ⌝.
- The following particle is shown in `--muted` to show whether the pitch drops onto it (はしが bridge vs はしが chopsticks).
- Minimal pairs side by side, each with a small line drawing in the illustration system (a bridge; a pair of chopsticks).

### 8.5 StrokeOrder (Kana 1 →)
Mandarin Ladder's component, fed KanjiVG data, on a practice grid (square with a dashed cross). Stroke numbers in mono; current stroke `--accent`; drawn strokes `--ink`; guide `--rule`. Stroke names in Indonesian below (*tarik ke bawah*, *kait*, *sapuan*), with the Japanese term on hover (はね, はらい, とめ).

### 8.6 ParticleTrain (Easy 1)
- **Locomotive:** the verb, always last on the right, in `--board` with `--board-ink` text.
- **Cars:** noun phrases in `--card` tones, each with a particle tag on its coupling in `--accent` (は を に で へ が).
- **Rails:** `--wood-dark`.
- Drag cars (or use the arrow buttons) to reorder them. They couple (`couple`) and the sentence above updates. The locomotive can't be moved: "Kata kerja selalu di belakang."
- **Indonesia toggle:** a second track below showing the Indonesian sentence in SVO order, with thin lines linking matching words.

### 8.7 PlaceScene, Japanese (Easy 1)
The shared scene (table, box, ball in indigo). The radiogroup holds 上 下 中 となり うしろ まえ with furigana. Sentence: ボールは箱の[[上]]にあります。 A "Bandingkan" toggle shows *Bola ada di [atas] kotak* with linking lines, so the reversal is visible (as Mandarin Ladder).

### 8.8 Counters (Easy 1)
The shelf from Mandarin Ladder's MeasureWords, with Japanese objects: pens (本), paper (枚), cats (匹), books (冊), apples (個), people (人).
- **Number stepper:** 1–10. Readings update with the sound changes highlighted in `--accent`: いっぽん, にほん, さんぼん, よんほん, ごほん, ろっぽん, ななほん, はっぽん, きゅうほん, じゅっぽん.
- **Pattern note:** "1, 6, 8, 10 → っ; 3 → ぼん".
- Where Indonesian has a matching classifier, it's shown (*sebatang pena*, *selembar kertas*, *seekor kucing*).

---

## 9. Seigaiha (board pattern)

- Overlapping concentric arcs (three rings per wave) on a 64 × 32 tile, rows offset by half a tile.
- **Strokes:** `--board-ink` at 0.07 opacity, 1px; every fifth wave's outer ring in `--brass` at 0.22 (the siblings' values).
- Generated in code, `aria-hidden`, with the same inline-start fade mask as Lattice and Grid, so text sits on plain sumi.

---

## 10. Sound

The siblings' effects unchanged, plus a soft **tick** for MoraBeats (sine at 1,320Hz, 20ms, peak 0.04) that plays only during a MoraBeats playback.

---

## 11. Copy voice

As the siblings: *kamu*, short sentences, specific feedback, no shaming, no exclamation marks except at the climb, no emoji.

Japanese-specific:
- Introduce terms in Indonesian first: "partikel (助詞 *joshi*)".
- Encourage on sounds early ("Bunyi bahasa Jepang dekat dengan bahasa Indonesia"), and be specific about the hard parts.
- Japanese example dialogues use the right register for the relationship. The Indonesian translation matches the register (*kamu* vs *Anda* vs *Bapak*).
- No anime quotes or copyrighted lines. Everyday and workplace situations: the konbini, the train, the factory floor, the care home, the office, the dormitory.

Sample strings:

| Place | Bahasa Indonesia | English |
|---|---|---|
| Door 1 | Baru mulai dari nol | Starting from zero |
| Door 2 | Sudah bisa hiragana | I can already read hiragana |
| Beat hint | Hitung ketukannya. っ juga satu ketukan. | Count the beats. っ is a beat too. |
| Verb hint | Kata kerja selalu di belakang. | The verb always goes last. |
| Trace miss | Coba lagi. Perhatikan arah goresannya. | Try again. Watch the stroke's direction. |
| Climb | Satu anak tangga lagi. Pelan-pelan, tapi naik. | One more rung. Slowly, but upward. |

---

## 12. Accessibility

Sibling §12 applies, plus:
- `lang="ja"` on Japanese, `lang="ja-Latn"` on romaji, `lang="id"` on Indonesian.
- A `JaSentence`'s accessible name is the text followed by its full kana reading in brackets, so screen readers don't interleave furigana.
- Pitch and beat visuals have text equivalents ("は-し, tinggi lalu rendah", "5 ketukan").
- **Tracing alternatives** as Mandarin Ladder. **ParticleTrain** reorders with buttons as well as drag.
- Japanese size up to 140% with text at 130% on 360px, with furigana intact.

---

## 13. Things this app never does

Everything in the siblings' lists, plus:
- Japanese rendered in Chinese fonts, or with Chinese stroke order.
- Romaji after Kana 1 in lessons.
- Japanese in italic, bold-for-emphasis, or letter-spaced.
- Cherry blossoms, torii gates, Mount Fuji, geisha or anime characters as decoration.
- Copyrighted anime or song lines as content.

---

## 14. Quality bar

All sibling checks, plus:
- [ ] Furigana aligns per kanji, okurigana outside the ruby, with no collisions at 140%
- [ ] No Japanese falls back to a Chinese or system font; subset coverage test passes
- [ ] Stroke order comes from KanjiVG (spot-check 必, 右, 左, 生)
- [ ] MoraBeats and the long-vowel/っ items read correctly with and without audio
- [ ] Vermilion (accent) and raspberry (wrong) are distinguishable side by side in both themes
- [ ] The seal renders in both themes with white text at ≥ 4.5:1
