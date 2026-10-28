# Spanish Ladder — Design

**Read with:** `PRD.md`, `CLAUDE.md`.
**Baseline:** `ladder-core` as it renders the siblings today: cream catalogue, screens, components, motion and sound. Spanish is Latin script and left to right, so it uses English Ladder's text components almost unchanged. The deliberate differences are colour (§3), the board pattern (§8) and the Spanish-specific visuals (§7).

**Precedence:** owner's words → this file → the siblings → the house layer.

---

## 1. The feeling

The same quiet study desk, now on **a tiled courtyard table in the afternoon: terracotta under your elbows, a strip of blue-and-white azulejo, a cup of something warm.** The board is fired clay; the accent is cobalt glaze; the paper stays cream. Spanish sentences are confident, open and large. This is the language where Indonesians sound good early, and the design should let that feel true.

The sibling promises stay (kind, visible progress, handmade). One is added:

4. **Endings are the story.** In Spanish, meaning lives in endings (-o, -a, -amos, -aron). Every visual and every sentence makes endings easy to see, without turning text into confetti.

---

## 2. Brand
- **Name:** Spanish Ladder. The word **escalera** (ladder, staircase) sits beside the wordmark.
- **Mark:** the sibling ladder. The app icon is the same, on terracotta `#7D3B24`.
- **Wordmark:** "Spanish Ladder" in the Latin display face; underneath, the mono line "A1 → C1 · DELE" and *escalera* in the display face, italic `--board-muted`.
- **Board pattern:** **Azulejo**, a four-fold tile repeat (§8).
- **Voice:** a warm older sibling who spent a year in Mexico City and a summer in Madrid. Playful, encouraging, plain.

---

## 3. Colour

### 3.1 Palette: terracotta, azulejo and cream

Token names, roles and the dark mechanism are as in `ladder-core`. Set these values in `apps/spanish/styles/theme.css`.

| Token | Light | Dark | |
|---|---|---|---|
| `--paper` | `#F6F1E7` | `#15120F` | |
| `--paper-2` | `#ECE5D6` | `#1C1814` | |
| `--surface` | `#FFFDF8` | `#2A231E` | |
| `--ink` | `#22201C` | `#EFE9DF` | |
| `--muted` | `#625B52` | `#B3AAA0` | |
| `--rule` | `#E0D7C6` | `#3A322B` | |
| `--accent` | `#1E4FA0` | `#8FB2EE` | azulejo cobalt: buttons, links, focus, verb endings |
| `--accent-ink` | `#FFFFFF` | `#15120F` | |
| `--accent-soft` | `#E2EAF6` | `#1F2A40` | |
| `--board` / `--board-2` | `#7D3B24` / `#93492E` | `#5E2C1B` / `#723722` | terracotta |
| `--board-ink` / `--board-muted` | `#F6F1E7` / `#EBCDBF` | `#F2ECDF` / `#DDBFB2` | |
| `--brass` | `#E2BE7A` | `#E6C487` | |
| `--rung` / `--rung-soft` | `#B8862E` / `#F7EBCF` | `#E2B45A` / `#2C2516` | same |
| `--good` / `--good-bg` | `#2F6B45` / `#E3F0E4` | `#8FCB9F` / `#16281F` | same |
| `--off` / `--off-bg` | `#9B3254` / `#F6E2E8` | `#F08FB0` / `#3A1B26` | raspberry, so it doesn't blend with the terracotta board |
| `--easy` / `--easy-soft` | `#2D7480` / `#E1EEF0` | `#7CC4CF` / `#13282B` | teal |
| `--medium` / `--medium-soft` | `#2A4A7F` / `#E4E9F2` | `#9DB8E6` / `#1E2C4B` | same |
| `--hard` / `--hard-soft` | `#6A4E8F` / `#EDE7F3` | `#C1A8E6` / `#251E37` | same |
| `--wood` / `--card…` | as siblings | as siblings | same |
| `--subject` | `#556B2F` | `#A9BE6A` | olive ball |
| `--shadow-rgb` | `70 40 25` | `0 0 0` | warm |

Manifest `theme_color` and icon background: `#7D3B24`.

### 3.2 New tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--dasar` / `--dasar-soft` | `#865A22` / `#F3E8D6` | `#D9AE6E` / `#2A2216` | Dasar tier |
| `--masc` | `#1F6E78` | `#7CC4CF` | Masculine marker (teal) |
| `--fem` | `#9A5B0E` | `#E6B45C` | Feminine marker (amber) |
| `--es` / `--es-soft` | `#A0402A` / `#F7E4DE` | `#F09A80` / `#3A211A` | España strand edge and chip |

**Gender colours are never blue and pink,** and never the only signal: el/la, m/f letters and shapes (a square chip for masculine, a round one for feminine) always go with them.

**Measured contrast:** accent on paper 7.0, board-ink on board 7.4, masculine on surface 5.8, feminine on surface 5.3, olive subject on paper-2 4.7. A unit test re-checks them, both themes.

---

## 4. Typography

| Role | Face |
|---|---|
| Display | Newsreader (as siblings), Latin + latin-ext |
| Body | Atkinson Hyperlegible Next (as siblings) |
| Mono | IBM Plex Mono (as siblings) |

**Spanish uses the sibling Latin faces.** There are no new fonts. Each face must cover á é í ó ú ü ñ Á É Í Ó Ú Ñ ¿ ¡ « », and a test checks it.

**Spanish sentences** use English Ladder's sentence style: display face, `--t-sentence`, with Indonesian in italic `--muted` below. English Ladder's conventions carry over unchanged, including the focus word in accent, bold and underlined.

**Endings:** inside ConjugationGrid, Agreement, `form` feedback and the España card, verb and adjective endings render in `--accent` (not bold), with the stem in `--ink`. In running lesson sentences, endings are not coloured; only the lesson's focus is marked.

**Opening punctuation** (¿ ¡) is always shown in content and is never stripped by text processing.

---

## 5. Space, shape, depth, motion

Identical to the siblings. New motion:

| Name | Duration / easing | Use |
|---|---|---|
| **ripple** | `--m-object-d`, `--ease-object` | Agreement: when the noun changes, the article and adjective endings flip in sequence, left to right, 60ms apart |
| **boot** | `--m-base-d` | ConjugationGrid: the stem-change "boot" outline draws around the changing persons |
| **sweep** | 600ms, linear | RoutineClock hand |

With reduced motion, all three become instant.

---

## 6. Layout and screens

Left to right; the sibling shell unchanged.

- **Home:** the terracotta board with Azulejo. Two doors: "Baru mulai" / "Sudah pernah belajar".
- **Ladder:** tiers Hard → Medium → Easy → Dasar; each row has a **CEFR/DELE chip** ("A1 · DELE").
- **Lesson player:** as English Ladder. The top-bar toggle **Penjelasan ID/ES** appears at Medium 2–3 only and is lesson-scoped.

**Strand cards:**

| Card | Look |
|---|---|
| **Bunyi** | `--paper-2`; label "BUNYI"; words with play buttons; minimal pairs side by side (pero ↔ perro) |
| **España** | `--surface` with a 3px inline-start edge in `--es`; label "● ESPAÑA"; two rows "AMÉRICA LATINA" and "ESPAÑA", each a sentence with audio in its accent; one-line note |
| **Kata** | `--accent-soft`; Indonesian ↔ Portuguese ↔ Spanish bridges shown as a three-step chain (*meja* ← mesa (Portugis) = **mesa**); false friends with a small ⚠ in `--off` |
| **Ngobrol** | as siblings |
| **Tirukan** | as siblings, with the stressed syllable of each word underlined lightly |

**Check items:**
- **Text inputs** always show the accent bar: a row of 34px keys in `--paper-2` for á é í ó ú ü ñ ¿ ¡. Tapping one inserts at the cursor.
- **`conjugate`:** a compact grid with person labels in mono and an input per cell; correct cells fill `--good-bg`.
- **`agree`:** tiles for article and adjective forms under a noun with its gender chip.
- **`stress`:** syllable chips for the word; tap the stressed one; then a yes/no "perlu aksen?" pair.
- **Lenient accents:** an accepted answer that's missing an accent shows the green sheet plus a small `--muted` line: "Hampir sempurna: *está*."

**My words:** gender chip, plural, España variant, play, and "lihat konjugasi" for verbs (opens ConjugationGrid in a sheet).

**Climb moment:** the terracotta board with Azulejo; the line "Satu anak tangga lagi. *Pelan-pelan, tapi naik.*" and *Paso a paso.* in display italic `--board-muted`.

---

## 7. Visuals

All follow the shared illustration system (oblique 2.5D, light from the top-left, three tones, 1.5px edges, ground shadows, olive subject, mono labels, `--paper-2` stage, radiogroups with roving focus, live text alternatives).

### 7.1 StressMap (Dasar)
- The word split into syllable blocks (48px tall); the stressed block raised 8px with an `--accent` underline.
- Three lanes below:
  - AGUDA (last): accent needed if the word ends in vowel, n or s
  - LLANA (second to last): accent needed if it does **not**
  - ESDRÚJULA (third to last): always accented
- The word slides into its lane, and a ✓ or ´ shows whether an accent is needed.
- Presets: café, casa, árbol, joven, música, ciudad, lápiz.

### 7.2 Agreement (Easy 1)
- Three linked tiles: article · noun · adjective (e.g. **la** · casa · blanc**a**). The noun tile has a gender chip (square m / round f); toggles for singular/plural.
- **Changing the noun:** a picker offers casa, libro, ciudad, problema, mano, coche. The article and adjective endings flip (`ripple`), with changed letters in `--accent`.
- **Exceptions:** el problema and la mano show a small ⚠ "pengecualian" chip.

### 7.3 SerEstar (Easy 1)
- One person (an original drawing in the illustration system, simple and friendly) in the middle.
- **Left panel SER:** identity, origin, profession, character, time. **Right panel ESTAR:** location, feelings, temporary states, results.
- **Interaction:** sentence chips at the bottom; drag or tap-then-tap them to a panel. Correct: the chip settles and a one-line reason appears. Wrong: it slides back with a hint.
- **Footer contrast:** *Ella es aburrida* (dia membosankan) vs *Ella está aburrida* (dia sedang bosan), the same words with a different verb and meaning.

### 7.4 ConjugationGrid (Easy 1 → every rung)
- **Rows:** yo · tú · él/ella/usted · nosotros/as · vosotros/as · ellos/ellas/ustedes. The vosotros row is greyed with a small ESPAÑA chip; tapping the chip shows it fully.
- **Columns:** one tense, or up to three side by side on desktop.
- **Cells:** stem in `--ink` + ending in `--accent`. Irregular forms have a dashed `--off` outline; stem-changing verbs get the `boot` outline around yo, tú, él and ellos.
- **Controls:** a verb picker (search with or without accents), a tense chooser (only tenses taught so far), play per cell.
- **Pattern view:** hides the stems and shows only the endings, so -ar / -er / -ir patterns read at a glance.

### 7.5 GustarFlip (Easy 2)
- **Two rows:**
  - Indonesian *Saya → suka → kopi* with an arrow from Saya
  - Spanish *Me → gusta → el café*, with the arrow reversed (café → me) and *el café* highlighted as the subject
- A plural toggle (kopi / buku-buku) switches *gusta* ↔ *gustan* and highlights the agreement with the thing liked.
- A pronoun picker changes me / te / le / nos / les.

### 7.6 PlaceScene, Spanish (Easy 1)
The shared scene with the olive ball. Radiogroup: en · sobre · debajo de · al lado de · detrás de · delante de. Sentence: *La pelota está debajo de la mesa.* A small note: "Urutannya sama dengan bahasa Indonesia." Uses *estar* for location, which ties back to SerEstar.

### 7.7 RoutineClock (Easy 2)
- A 24-hour dial (paper face, `--rule` ticks, mono hours).
- Routine icons around the rim: alarm, shower, breakfast, bus, desk, lunch, gym, dinner, bed. Simple line icons in the illustration style, not emoji.
- **Dragging the hand** (`sweep`) snaps to an activity. The sentence updates (*Me levanto a las seis y media.*) with the reflexive pronoun and ending in `--accent`.
- **Toggle "¿Qué hora es?"** switches to *Son las…* / *Es la una*.

---

## 8. Azulejo (board pattern)
- A four-fold tile: 64px squares, each with a quatrefoil formed by four arcs, a small centred diamond, and corner quarter-circles that form circles across tiles.
- **Strokes:** `--board-ink` at 0.07, 1px; every fourth tile's quatrefoil in `--brass` at 0.22 (the siblings' values).
- Generated in code, `aria-hidden`, with the shared inline-start fade mask.

---

## 9. Sound
The siblings' effects unchanged.

---

## 10. Copy voice
As the siblings.

Spanish-specific:
- Introduce terms in Indonesian first: "kata kerja tak beraturan (*verbo irregular*)".
- Be honest about the head start ("Pengucapanmu akan cepat bagus") and about the mountain ("Konjugasi itu banyak. Kita naik pelan-pelan").
- Indonesian translations keep register: *tú* → *kamu*, *usted* → *Anda / Bapak / Ibu*.
- Names and places are mixed across the Spanish-speaking world (Lucía, Mateo, Valentina, Diego; Ciudad de México, Bogotá, Lima, Madrid, Buenos Aires) and Indonesian (Rina, Budi).

---

## 11. Accessibility
Sibling rules, plus:
- `lang="es"` on Spanish (`es-419` for Latin American lines, `es-ES` for España lines), `lang="id"` on Indonesian.
- Gender chips have text labels.
- The accent bar keys have accessible names ("a dengan aksen").
- ConjugationGrid is a real `<table>` with headers.
- Drag interactions (SerEstar, RoutineClock) have tap and keyboard equivalents.

---

## 12. Never
The siblings' list, plus:
- Blue/pink gender colours, or gender shown by colour alone.
- Flags as language icons (Spanish isn't one country).
- Bullfighting, sombreros, flamenco dresses or similar clichés as decoration.

---

## 13. Quality bar
All sibling checks, plus:
- [ ] Every face renders ñ, á–ú, ü, ¿, ¡ (glyph test)
- [ ] Accent bar works on iOS and Android, inserts at the cursor, never covers the input
- [ ] Endings in grids and Agreement are visible in both themes; running sentences aren't over-coloured
- [ ] España content always carries its chip and edge
- [ ] Raspberry wrong vs terracotta board vs cobalt accent are all distinguishable in both themes
