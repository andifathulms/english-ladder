# German Ladder — Design

**Read with:** `PRD.md`, `CLAUDE.md`.
**Baseline:** `ladder-core` as it renders the siblings. German is Latin script and left to right, so English and Spanish text components apply unchanged. The deliberate differences are colour (§3), the board pattern (§8), case and gender colouring (§3.2, §4) and the German visuals (§7).

**Precedence:** owner's words → this file → the siblings → the house layer.

---

## 1. The feeling

The same quiet study desk, now in **a bright Bauhaus classroom: petrol-blue walls, a red stool, a yellow pencil, a timetable on the wall.** It's ordered, clear and a little playful. German has a reputation for being hard and strict; the design should make its rules feel like a well-built machine you can see into, not a wall.

The sibling promises stay (kind, visible progress, handmade). One is added:

4. **Structure is visible.** German meaning lives in positions (the verb bracket) and endings (cases). Every visual shows those positions and endings directly, so a learner can predict them before memorising them.

---

## 2. Brand
- **Name:** German Ladder. The word **Leiter** (ladder) sits beside the wordmark.
- **Mark:** the sibling ladder. The app icon is the same, on petrol `#17464F`.
- **Wordmark:** "German Ladder" in the Latin display face; underneath, the mono line "A1 → C1 · GOETHE" and *Leiter* in display italic `--board-muted`.
- **Board pattern:** **Bauhaus**, a grid of simple circles, squares and quarter-arcs (§8).
- **Voice:** a friendly older sibling who did an Ausbildung in Hamburg. Direct, clear, encouraging, with a little dry humour about German bureaucracy.

---

## 3. Colour

### 3.1 Palette: petrol, Bauhaus red and cream

Token names, roles and the dark mechanism are as `ladder-core`. Set the values in `apps/german/styles/theme.css`.

| Token | Light | Dark | |
|---|---|---|---|
| `--paper` | `#F4F3EE` | `#121718` | |
| `--paper-2` | `#E8E6DE` | `#182022` | |
| `--surface` | `#FFFFFC` | `#212A2D` | |
| `--ink` | `#1D2224` | `#ECEDEA` | |
| `--muted` | `#5A6265` | `#A9B3B6` | |
| `--rule` | `#DCDAD0` | `#2F393C` | |
| `--accent` | `#B3311F` | `#F08B78` | Bauhaus red: buttons, links, focus |
| `--accent-ink` | `#FFFFFF` | `#121718` | |
| `--accent-soft` | `#F6E1DC` | `#3A1E19` | |
| `--board` / `--board-2` | `#17464F` / `#1F5862` | `#123A41` / `#194A53` | petrol |
| `--board-ink` / `--board-muted` | `#F4F3EE` / `#B9CFD2` | `#F2F0EA` / `#A9C3C7` | |
| `--brass` | `#E3B341` | `#EBC25E` | Bauhaus yellow (decorative strokes and labels on the board) |
| `--rung` / `--rung-soft` | `#B8862E` / `#F7EBCF` | `#E2B45A` / `#2C2516` | same |
| `--good` / `--good-bg` | `#2F6B45` / `#E3F0E4` | `#8FCB9F` / `#16281F` | same |
| `--off` / `--off-bg` | `#8E3A6E` / `#F3E3EE` | `#EE9CC8` / `#3A1B2E` | plum, so it stays distinct from the red accent |
| `--easy` / `--medium` / `--hard` | as Spanish Ladder | as Spanish Ladder | teal / navy / purple |
| `--wood` / `--card…` | as siblings | as siblings | |
| `--subject` | `#2A5DB0` | `#8FB2EE` | blue ball |
| `--shadow-rgb` | `23 70 79` | `0 0 0` | |

Manifest `theme_color` and icon background: `#17464F`.

### 3.2 Gender and case colours

German needs two colour systems that never compete, so they are kept to different jobs.

**Gender** marks the noun itself, always with a **chip** that has a letter and a shape:

| Token | Light | Dark | Chip |
|---|---|---|---|
| `--masc` | `#1F6E78` | `#7CC4CF` | square, "der" |
| `--fem` | `#9A5B0E` | `#E6B45C` | circle, "die" |
| `--neut` | `#5E5B70` | `#B3B0C8` | triangle, "das" |

**Case** marks the **changed letters of an article or ending**, never whole words:

| Token | Light | Dark | Label |
|---|---|---|---|
| `--nom` | `var(--ink)` | `var(--ink)` | Nom |
| `--akk` | `#2A5DB0` | `#8FB2EE` | Akk |
| `--dat` | `#8A3FA0` | `#D7A3E6` | Dat |
| `--gen` | `#6B5A1E` | `#D6C27A` | Gen |

**Rules:**
- **No blue/pink gender coding.** Colour is never the only signal: chips have letters and shapes; case colours always come with a small label (Akk, Dat) in visuals and feedback.
- **Case colours appear only in visuals, feedback sheets and My words**, never in running lesson sentences. Those keep only the lesson's focus marking.
- The **Case colours** setting can turn them off entirely; labels remain.

**Measured contrast** (all on `--surface`, both themes ≥ 4.5:1): accent on paper 5.6, masc 5.9, fem 5.4, neut 6.5, akk 6.4, dat 6.4, gen 6.8, plum on its background 5.7, board-ink on board 9.3. A unit test re-checks them.

---

## 4. Typography

The siblings' Latin faces (Newsreader, Atkinson Hyperlegible Next, IBM Plex Mono), with no new fonts. Every face must cover ä ö ü ß ẞ Ä Ö Ü „ " ‚ ' » «, and a test checks it.

- **German sentences** use the sentence style from English Ladder.
- **German quotation marks** „…" in content.
- **Long compounds:** `hyphens: auto` on German text with `lang="de"`; authors may insert soft hyphens (`&shy;`) at compound joints, which lint suggests for words over 16 letters.
- **Noun capitals:** never transformed. `.label` and `.eyebrow` (uppercase) never contain German nouns from content, so the capitals stay meaningful.
- **Case endings:** in CaseMachine, VerbBracket, `case` feedback and My words, only the changed letters take the case colour (*d**en***, *ein**em***), not bold.

---

## 5. Space, shape, depth, motion

Identical to the siblings. New motion:

| Name | Duration / easing | Use |
|---|---|---|
| **shift** | `--m-object-d`, `--ease-object` | VerbBracket: words slide between positions; the verb holds position 2 |
| **fly** | 500ms, `--ease-object` | The separable prefix or infinitive arcs to the end slot |
| **flip** | `--m-base-d` | CaseMachine: changed letters flip like a split-flap display (one flip per letter) |
| **snap** | 200ms, `cubic-bezier(.3,1.4,.5,1)` | CompoundBuilder blocks join |

With reduced motion, all four become instant.

---

## 6. Layout and screens

Left to right; the sibling shell unchanged.

- **Home:** the petrol board with Bauhaus. Two doors: "Baru mulai" / "Sudah pernah belajar".
- **Ladder:** tiers Hard → Medium → Easy → Dasar. Rows have a CEFR chip (A1.1, A1.2…); rungs that complete an exit carry a small **brass flag chip** ("A1 · Goethe", "B1 · Ausbildung", "B2 · Pflege/Studium").
- **Climb moment:** for an exit rung, the line under the title adds the milestone: "A1 selesai. Ini level ujian Goethe A1." Then *Schritt für Schritt.* in display italic `--board-muted`.

**Strand cards:**

| Card | Look |
|---|---|
| **Bunyi** | `--paper-2`; minimal pairs side by side with play; a MouthPlaces mini for ü/ö/ch |
| **Kerja** | `--surface` with a 3px inline-start edge in `--board`; "● KERJA"; situation line; exchange with *Sie* forms |
| **Kata** | `--accent-soft`; bridges (Indonesian ← Dutch = German), false friends with ⚠, compound breakdowns with joints shown as `·` |
| **Ngobrol**, **Tirukan** | as siblings |

**Check items:**
- **Accent bar:** ä ö ü ß, with Ä Ö Ü on shift.
- **`gender`:** three large chips (der square / die circle / das triangle).
- **`case`:** the sentence with the slot underlined and its role label (Akk). Options as pills; feedback shows the CaseMachine row for that noun.
- **`wordorder`:** tiles plus a bracket frame with four labelled zones (Posisi 1 · Verb · Tengah · Akhir). The verb zone highlights when filled.
- **`wechsel`:** a PlaceScene mini with or without a motion arrow, and article options.
- **Lenient spelling notes:** "Hampir: *schön* (dengan ö)". Capitalisation notes: "Kata benda selalu huruf besar: *Tisch*."

**My words:** article chip, plural, gender clue, separable marker (an|rufen), Perfekt form (hat angerufen), and audio.

---

## 7. Visuals

All follow the shared illustration system (oblique 2.5D, light from the top-left, three tones, 1.5px edges, ground shadows, the blue subject ball, mono labels, `--paper-2` stage, radiogroups with roving focus, live text alternatives).

### 7.1 MouthPlaces, German (Dasar)
- The shared mouth section.
- **Rounding toggle:** the lips shown spread vs rounded, so learners see ü = i-tongue + rounded lips and ö = e-tongue + rounded lips.
- **ich vs ach:** the friction point glows at the hard palate (ich) or the soft palate (ach). A note links ach to Indonesian *kh* and Arabic خ.

### 7.2 GenderTiles (Easy 1)
- **Trays:** three, each headed by its chip (der square teal, die circle amber, das triangle slate).
- **Noun tiles:** a drawing in the illustration system + word.
- **Clue labels:** sit on tray edges (-ung, -heit, -keit, -schaft → die; -chen, -lein, -ment → das; -er (people), -ling → der). They light up when a matching noun is dropped.
- **Exceptions** (das Mädchen is fine, it's -chen; die Hand has no clue) show "hafalkan saja" (just memorise).

### 7.3 CaseMachine (Easy 1 → every rung)
- **A row of role slots:** WER? (subject) · WEN? (direct object) · WEM? (indirect object) · WESSEN? (owner). Only the roles taught so far are shown.
- **Each slot:** a noun (choose from a picker) with its gender chip, and its article in the slot's case. The changed letters are coloured and labelled.
- **Sentence:** builds above: "**Der** Mann gibt **dem** Kind **den** Ball."
- **Article grid:** a toggle reveals a compact grid (gender × case) with the current cells highlighted. It's a reference, not the lesson.
- **Indonesian line** below shows the same sentence with no endings at all ("Pria itu memberi anak itu bola"), so the learner sees that German carries roles in endings and Indonesian in word order.

### 7.4 VerbBracket (Easy 1–2, grows later)
- **A horizontal frame** of four zones: POSISI 1 · VERB · TENGAH · AKHIR. The verb zone is outlined in `--accent`.
- **Word chips** sit in zones. Tap any chip to move it to Posisi 1 (`shift`); the subject slides into the middle, and the verb stays in zone 2.
- **Modal toggle:** adds "möchte / kann / muss" to the verb zone; the main verb becomes an infinitive and `fly`s to Akhir.
- **Separable toggle:** with "aufstehen", "auf" flies to Akhir.
- **From Easy 3:** a "weil…" toggle turns the frame into a subordinate clause (verb zone empties, the verb goes to the end).
- **Indonesian line** under the frame, unchanged whatever happens: the contrast is the point.

### 7.5 Wechselpräpositionen (Easy 2)
- The shared scene (table, box, blue ball), with radiogroup in · auf · unter · neben · hinter · vor · über · zwischen, and a **motion** toggle.
- **No motion:** the ball sits; the sentence uses *liegen/stehen* + dative, with "WO?" and a "di" bridge chip.
- **Motion:** a dashed arc arrow shows the ball moving; the sentence uses *legen/stellen* + accusative, with "WOHIN?" and a "ke" bridge chip.
- The article letters flip (`flip`) between dem/den and der/die.

### 7.6 CompoundBuilder (Easy 2)
- Word blocks on a shelf (Kranken, Haus, Hand, Tuch, Arbeit, Platz, Kinder, Garten, Bahn, Hof).
- Dropping two or three together `snap`s them into one word. The joint shows -s- or -n- where needed, as a small bracketed letter.
- The gender chip of the **last** block moves to the front of the whole compound, with "das letzte Wort entscheidet" (the last word decides).
- The Indonesian meaning appears, plus a literal gloss ("rumah sakit — rumah + sakit"), which happens to match Indonesian word-building in reverse order.

### 7.7 DayPlanner (Easy 2)
- A week grid (Mo–So; 6:00–22:00) on paper, with activity cards (aufstehen, frühstücken, arbeiten, einkaufen, anrufen, fernsehen, schlafen).
- **Dragging a card into a slot** builds the sentence with the right time preposition and bracket: "Am Montag **stehe** ich um 6 Uhr **auf**." The separable prefix is marked with a small arc to the end.
- **Keyboard path:** select a card, then a day, then a time.

---

## 8. Bauhaus (board pattern)
- A 64px grid. Each cell holds one of: a circle, a square inset, a quarter-arc, a half-circle, or empty, chosen by a deterministic sequence so the pattern looks composed rather than random.
- **Strokes:** `--board-ink` at 0.07, 1px; every fifth shape in `--brass` at 0.22 (the siblings' values). No fills.
- Generated in code, `aria-hidden`, with the shared inline-start fade mask.

---

## 9. Sound
The siblings' effects unchanged.

---

## 10. Copy voice
As the siblings.

German-specific:
- Introduce terms in Indonesian first: "kasus (*Kasus*): peran kata dalam kalimat".
- Be honest about the mountain ("Bahasa Jerman punya aturan. Untungnya, aturannya bisa ditebak"), and make the bureaucracy jokes gentle and rare.
- Indonesian translations keep register: *du* → *kamu*, *Sie* → *Anda / Bapak / Ibu*.
- Places and names are across the DACH region and Indonesia (Hamburg, München, Berlin, Wien, Zürich; Lena, Jonas, Fatma, Mehmet; Rina, Budi).
- Kerja content reflects real Ausbildung and Pflege situations, without naming employers or agencies.

---

## 11. Accessibility
Sibling rules, plus:
- `lang="de"` on German, `lang="id"` on Indonesian.
- Gender chips have text labels.
- Case labels are text, not colour alone.
- VerbBracket zones are labelled regions, with buttons to move chips.
- CaseMachine and DayPlanner work with keyboard and screen reader.
- Hyphenation never splits inside an article-ending colour span.

---

## 12. Never
The siblings' list, plus:
- Flags as language icons.
- Lederhosen, beer steins, castles, or the black-red-gold palette as decoration.
- Gender shown by colour alone; blue/pink gender colours.
- Case colours in running sentences.

---

## 13. Quality bar
All sibling checks, plus:
- [ ] Glyph test passes for ä ö ü ß ẞ and „ " ‚ ' » « in all faces
- [ ] No horizontal overflow from long compounds at 360px and 130% text
- [ ] Case and gender colours are distinguishable from each other and from the accent in both themes, and readable with case colours off
- [ ] VerbBracket and CaseMachine fully operable by keyboard
- [ ] Exit chips (A1, B1, B2) show on the right rungs
