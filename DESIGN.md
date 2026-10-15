# English Ladder — Design

**Read with:** `PRD.md` (what), `CLAUDE.md` (how to build).
**Precedence:** owner's words → this file → the portfolio house layer for anything this file leaves open. Where the house layer defines rhythm, motion timing or the quality floor, its values win over the ones below; colour, type and layout here are this app's own.

---

## 1. The feeling

> **A quiet study desk at seven in the morning.** Good light, clean paper, a few real objects you can pick up and move. Nobody is watching, nothing is urgent, and every ten minutes you can see that you are a little higher than before.

People stay in an app like this for three reasons, and every design decision should serve one of them:

1. **It feels kind.** Mistakes are normal and cheap. There are no lives, no timers, no red failure screens, no crying mascot, no "you lost your streak."
2. **It feels like progress.** The ladder is always one tap away and always shows how far you've climbed. Small steps fill visibly: a check fills a segment, a lesson fills a notch, a test lights a rung.
3. **It feels handmade.** The visuals are crafted objects that respond to your touch, with weight and timing. Type is generous and clear. Nothing looks like a template.

The English you are learning is the hero of every screen. Explanations, chrome and navigation stay quieter than the sentence being taught.

---

## 2. Brand

- **Name:** English Ladder. Wordmark set in the display face, weight 700, with the two words stacked on narrow screens.
- **Mark:** two rails and three rungs drawn as one shape; the top rung in `--rung` gold. Used as the app icon and favicon. No mascot.
- **Voice:** a patient older sibling who studied abroad. Warm, plain, a little playful, never childish. See §11.

---

## 3. Colour

### 3.1 Tokens

All colour comes from these tokens. Components never use literal colours.

Palette name: **Pagi** (morning). Revised 15 Oct 2026: a slightly deeper teal, a new board colour, and soft tier tints.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#F3F5F0` | `#0E1513` | App background |
| `--paper-2` | `#E7ECE4` | `#141D1A` | Stage behind visuals, inset areas |
| `--surface` | `#FFFFFF` | `#18221F` | Cards, lesson column, sheets, tab bar |
| `--ink` | `#132420` | `#E6EEEA` | Primary text, English sentences |
| `--muted` | `#4F605A` | `#9AABA4` | Secondary text, Indonesian translations |
| `--rule` | `#D5DDD6` | `#26332F` | Borders, dividers |
| `--accent` | `#08715E` | `#5FD0B3` | Primary actions, grammar focus words, links |
| `--accent-ink` | `#FFFFFF` | `#08201A` | Text on accent |
| `--accent-soft` | `#DDEFE8` | `#17322B` | Selected states, soft highlights |
| `--board` / `--board-2` | `#0D3B33` / `#145045` | `#10302A` / `#1A4239` | The board: the one "do this next" card per screen (home continue card, rung test intro, climb backdrop accents) |
| `--board-ink` / `--board-muted` | `#F1F5EE` / `#A9C4BB` | `#EAF2EE` / `#94B5AA` | Text on the board |
| `--rung` | `#E9A825` | `#F0C14E` | Achievement only: climbed rungs, the climb moment, the fresh notch. Also the blank in a quoted sentence on the board |
| `--rung-soft` | `#FCF0D2` | `#2F2615` | Background behind achievement |
| `--good` / `--good-bg` | `#1F6E3C` / `#E1F3E6` | `#8AD3A0` / `#16291D` | Correct answers |
| `--off` / `--off-bg` | `#B2432C` / `#FBE6E0` | `#F0977F` / `#331E18` | Wrong answers, the "sounds off" side of a pair |
| `--easy` / `--easy-soft` | `#2F8F6B` / `#E1F2EA` | `#66CFA4` / `#15291F` | Easy tier marker / tint |
| `--medium` / `--medium-soft` | `#2B6CA3` / `#E2EDF8` | `#7DB8E8` / `#142231` | Medium tier marker / tint |
| `--hard` / `--hard-soft` | `#6E4FA8` / `#EEE8F8` | `#BBA0E8` / `#221B33` | Hard tier marker / tint |

Illustration tokens are in §10.

### 3.2 Rules
- **Gold means earned.** `--rung` appears only for things the learner achieved: climbed rungs, the climb moment, the done-lesson notch. Never on buttons, never decorative.
- **Red is gentle.** `--off` marks wrong answers and the wrong half of a pair, always with a reason next to it. There are no full-screen red states.
- Tier colours appear as small markers (dots, rings, the progress fill inside that tier). Tier **soft** tints may fill one area only: the header of that tier's rung page. Tier colours are never used for small text (Easy green fails AA as text in light mode); text next to them stays `--ink` or `--muted`.
- **The board** is the one place with a dark surface in light mode. At most one per screen, always holding the single next action. Its blank or highlight uses `--rung` only as an underline.
- Contrast: body text and controls meet WCAG AA in both themes. `--muted` on `--paper` must stay ≥ 4.5:1. Check it when tuning values.
- Dark mode is a **night study**, not an inversion: same hues, lowered saturation on surfaces, lifted tier colours.

---

## 4. Typography

| Role | Face | Use |
|---|---|---|
| Display | **Bricolage Grotesque** 500/700 (opsz on) | Headings, rung names, and **English sentences in lessons** |
| Body | **Atkinson Hyperlegible Next** 400/600/700, italic (variable) | Explanations, UI text, Indonesian translations, section headings |
| Utility | **Atkinson Hyperlegible Mono** 600 | CEFR codes, counters, minutes: numbers and codes only |

Atkinson Hyperlegible is chosen on purpose: it was designed for low-vision readers and keeps similar letters distinct (I/l/1, rn/m). For a language learner reading unfamiliar words, that matters. The Next and Mono versions (2025) keep that and add weights; they are self-hosted from `app/font-files` because Next 14's font list predates them.

**Section headings** use the `.eyebrow` style (body 700, `--t-small`, `--muted`, sentence case), not uppercase mono. Uppercase mono (`.label`) is for counters, CEFR codes and step names only.

### 4.1 Scale (rem, base 16px; scaled by the text-size setting)

| Token | Size / line-height | Face | Use |
|---|---|---|---|
| `--t-hero` | 2.75 / 1.05 | Display 700 | Home title, rung climbed moment |
| `--t-h1` | 2.0 / 1.15 | Display 700 | Screen titles |
| `--t-h2` | 1.5 / 1.2 | Display 700 | Section titles |
| `--t-sentence` | 1.6 / 1.3 (phone 1.4) | Display 500 | **The English sentence being taught** |
| `--t-body` | 1.0625 / 1.6 | Body 400 | Explanations |
| `--t-small` | 0.9 / 1.5 | Body 400 | Secondary text |
| `--t-label` | 0.74 / 1.3, +0.1em tracking, uppercase | Mono 500 | Labels |

### 4.2 Text conventions (apply everywhere)
- **English example sentences** use `--t-sentence` in `--ink`. They are the biggest text on a lesson screen.
- **Indonesian text** is always *italic* in `--muted`. Italic Indonesian is the app's visual signal for "translation". Never set English in italic, except titles of works.
- **The grammar focus** in a sentence (the word or words the lesson is about) is in `--accent`, weight 700, with a 2px underline offset 3px. Only one focus per sentence.
- Wrong sentences: `--off` with a 1.5px line-through. Correct counterpart directly beside or below.
- Headings use `text-wrap: balance`. Body text measures 45–65 characters.
- Numbers in counters use `font-variant-numeric: tabular-nums`.

---

## 5. Space, shape, depth, motion

### 5.1 Space
4px base: `--s-1 4` · `--s-2 8` · `--s-3 12` · `--s-4 16` · `--s-5 24` · `--s-6 32` · `--s-7 48` · `--s-8 64`.
Side gutter `max(16px, env(safe-area-inset-left/right))`. Sibling spacing uses `gap`, never margins.

### 5.2 Shape
- Radius: `--r-sm 6` (chips, inputs) · `--r-md 10` (small cards) · `--r-lg 16` (cards, visual stages) · `--r-xl 22` (the board, bottom sheets) · `999` (pills).
- Cards are used only for objects you act on (a lesson row, a check item, the continue card). Explanatory text sits directly on the surface.

### 5.3 Depth
Two levels only:
- `--e-1`: `0 1px 0 var(--rule)` plus a 4% soft shadow, for resting cards. Cards have no outline border.
- `--e-2`: `0 18px 40px -28px rgb(15 30 25 / .45)` for the lesson column on desktop and bottom sheets.
No glassmorphism, no glows, no gradient fills on UI.

### 5.4 Motion
| Token | Duration | Easing | Use |
|---|---|---|---|
| `--m-quick` | 120ms | `cubic-bezier(.2,.7,.2,1)` | Press states, chip selection |
| `--m-base` | 220ms | same | Step transitions, sheet open |
| `--m-object` | 380ms | `cubic-bezier(.3,1.25,.4,1)` (slight overshoot) | Objects moving in visuals |
| `--m-moment` | 900ms | `cubic-bezier(.2,.8,.2,1)` | The rung climbed moment |

- Step transitions: the outgoing step fades and moves 12px left, the incoming one comes from 12px right. Reverse when going back.
- Objects in visuals move with weight: a short overshoot and settle, never linear.
- With reduced motion: all movement becomes a 120ms cross-fade. Objects jump to position. The climb moment becomes a fade-in of the gold rung.
- Nothing animates in on page load except the lesson step that just opened. The home screen is complete on first frame.

---

## 6. Layout and screens

Mobile-first, 360px minimum. Lesson column max 640px; home max 1040px.

### 6.0 Navigation
Four places, each with a visible name. One `<nav>` landmark, two layouts:

| Tab | Route | Holds |
|---|---|---|
| **Tangga** | `/`, `/rung/*` | Home, rung pages (lessons and test start from here) |
| **Ulang** | `/review/` | Quick review; a kind empty state before two lessons are done |
| **Kata** | `/words/` | My words |
| **Saya** | `/me/` | A quiet progress summary, the week strip, links to Settings and About |

- Phones: a bottom tab bar on `--surface` with icon + short label, active tab in `--accent` with an `--accent-soft` pill behind the icon. Safe-area padding below.
- From 900px: a 232px sidebar with the wordmark, long labels, and the week strip at the bottom.
- The lesson player, the rung test and a running review hide the navigation entirely: focus mode is a full screen.
- No badges or counts on tabs.

### 6.1 Home — the Ladder

```
┌──────────────────────────────────┐
│ English Ladder              ● A1 │
│ Kamis, 15 Oktober                │
│ Selamat pagi.                    │  ← time-of-day greeting (copy only)
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ LANJUT · EASY 1 · 3 · CONTOH ┃ │  ← the board (--board): quotes the exact
│ ┃ It is ____ umbrella.         ┃ │    sentence where you stopped; blank is a
│ ┃ ▬▬▬▭▭▭        [Lanjutkan →]  ┃ │    gold underline; 6-step bar
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ Easy 1 · 2 dari 8   Semua pelajaran│
│ [✓ 1][✓ 2][③ 3][4]…  →  swipe    │  ← lessons of your rung, one tap each
│ [⟳ Ulang cepat · 5 soal       ›] │  ← after two lessons
│ Tangganya          1 dari 9 dibuka│
│ ┌ HARD · B2–C1 ─────────────────┐│  ← compact, tier-grouped map
│ │ ╫ Hard 3  C1          segera  ││
│ │ …                             ││
│ │ ╫ Easy 1  A1      ■■□□□□□□    ││  ← your rung: accent-soft row
│ └───────────────────────────────┘│
│ [Tangga][Ulang][Kata][Saya]      │
└──────────────────────────────────┘
```

- **The board** is the focal point. First visit: "Mulai di sini", the welcome title, one sentence, "Mulai Easy 1". All lessons done: the rung test.
- **Lesson strip:** horizontal scroll-snap on phones, a 4-column grid from 900px. Done = filled check, current = accent outline, new = number + minutes.
- **The ladder** is drawn as a map grouped by tier (Hard → Medium → Easy), with two thin wooden rails and the rung bar in each row: `--wood-dark` by default, `--accent` for your rung, `--rung` gold when climbed. Coming-soon rungs are compact single lines in `--muted`, still fully visible.
- **Notches:** 8 small filled bars per rung (`--paper-2` with a rule inset when empty, `--accent` when done, all `--rung` when climbed).
- Desktop: main column (greeting, board, lesson grid, review) and a 320px ladder card on the right.
- The home screen is complete on first frame; only the greeting and date wait for the visitor's clock.

### 6.2 Rung page
- **Header** in the tier's soft tint (`--easy-soft` etc.), full-bleed on phones: back link, tier chip ("Easy · A1"), the rung name at `--t-hero`, a progress ring "2/8" in the tier colour (gold once climbed), the description and explanation language.
- **Lesson path:** numbered nodes on a vertical rule. Done nodes are filled teal with a check; the current lesson (in progress, else first new) is a raised card with its own step bar and a "Lanjut langkah 4" / "Mulai pelajaran" button; others are plain rows. Every row: English title, Indonesian title, minutes, and state as icon + word.
- **The summit:** the rung test sits at the end in a dashed card with a flag ("16 soal · lulus 12 · bisa dicoba kapan saja", or the best score). Gold tint once climbed. Never locked.
- Draft badges appear only in the lesson player's top bar, not in lists.

### 6.3 Lesson player

```
┌──────────────────────────────────┐
│ ←  Easy 1 · 7        ▬▬▬▬▭▭   ✕  │  ← back, position, 6-segment progress, close
│                                  │
│  LIHAT                           │  ← step label (mono, rung language)
│ ┌──────────────────────────────┐ │
│ │        [ visual stage ]      │ │  ← --paper-2, --r-lg
│ └──────────────────────────────┘ │
│  (in) (on) (under) (next to)…    │
│                                  │
│  The ball is under the table.    │  ← --t-sentence, focus word accent
│  Bolanya di bawah meja.          │  ← italic muted
│  ▶                               │
│                                  │
├──────────────────────────────────┤
│        [   Lanjut  →   ]         │  ← sticky bottom bar, thumb zone
└──────────────────────────────────┘
```

- One step per screen on phones; the primary action sits in a sticky bottom bar with safe-area padding.
- Desktop: the same column centred at 640px on `--surface` with `--e-2`, over `--paper`.
- The top bar never scrolls away. Close (✕) returns to the rung page; position is saved silently, with no "are you sure".
- The explanation-language toggle is a small text button under Concept and Contrast: "Explain in English" / "Jelaskan dalam Bahasa Indonesia".

### 6.4 Check step
- One item visible at a time on phones, with a small counter "2 / 5".
- Options are large pills (min 48px tall) in a wrapping row.
- **On correct:** the chosen pill fills `--good-bg` with `--good` text, a check mark draws in (stroke animation, 250ms), the `why` line fades in below, a soft sound plays, and the Continue button activates.
- **On wrong:** the chosen pill turns `--off-bg` and disables; a short "Belum tepat, coba lagi" line appears; the item stays open. After two misses the `why` line appears as a hint. No shaking, no buzzer.
- `order` items: word tiles in a tray; tapping a tile flies it into the answer line (`--m-object`); tapping a placed tile sends it back.
- `scene` items reuse the real visual component in a fixed state.

### 6.5 Lesson done

```
  ✓  Selesai: Where things are

  Kamu sekarang bisa bilang di mana benda berada.
  ┌─────────────────────────┐
  │ Easy 1   ●●●●●●●○       │  ← the notch for this lesson fills gold-then-accent
  └─────────────────────────┘
  Kata baru: in · on · under · next to · behind · in front of
  1 item to review later

  [ Lesson 8 → ]     Back to Easy 1
```

The notch fill is the reward. No confetti.

### 6.6 Rung test
- Neutral and calm: no feedback between items, a simple counter, no timer.
- Results: big score ("13 / 16"), then pass or not-yet in plain words, then the per-item review list grouped by lesson.

### 6.7 The climb moment (rung test passed)
The one celebratory moment in the app. Full screen, `--rung-soft` background:
1. The ladder fragment for this rung and the next is shown.
2. The you-are-here marker climbs to the next rung (`--m-moment`).
3. The climbed rung glows `--rung` with all 8 notches gold.
4. Text: "Easy 1 · climbed" in `--t-hero`, and one Indonesian line: "Satu anak tangga lagi. Pelan-pelan, tapi naik."
5. Rising four-note sound (§9) if sound is on.
6. Buttons: "Lihat tangga" / "Mulai Easy 2" (or "Easy 2 coming soon" in v1).

### 6.8 My words, Settings, About
Simple, list-based, using the same type rules. Settings and About open from Saya and link back to it. Settings groups are cards under eyebrow headings. Settings groups: Bahasa, Suara, Tampilan, Progres. Reset progress uses an inline confirm that requires typing nothing but a second tap on a clearly worded button.

---

## 7. Components (inventory)

`LadderRail`, `RungRow`, `NotchBar`, `ContinueCard`, `WeekStrip`, `LessonRow`, `StepBar` (6 segments), `StepLabel`, `Sentence` (EN + ID + focus + play), `PlayButton`, `PairCard` (off vs natural), `ContrastBox`, `OptionPill`, `TileTray`, `WhyLine`, `BottomActionBar`, `Sheet`, `Toggle`, `Segmented`, `Badge` (draft), `EmptyState`.

`Sentence` is the most-used component. It must:
- render the focus word per §4.2 from markup like `The ball is [[under]] the table.`
- put the play button at the end, 40px target, icon only with an accessible label
- highlight the word being spoken when the browser supports speech boundary events (subtle `--accent-soft` background), and do nothing when it doesn't.

---

## 8. Delight list (build all of these)

1. **Weighted objects.** The ball in the place scene overshoots a little and settles. A soft ground shadow follows it and shrinks when the ball is lifted onto the box.
2. **Speaking highlight.** When audio plays, the current word gets a soft background as it is spoken.
3. **Check marks draw.** The correct-answer check draws as a stroke, not a pop.
4. **Notches fill.** Finishing a lesson fills its notch on the rung, gold first then settling to accent.
5. **The climb.** §6.7, the only big moment.
6. **Continue shows the sentence.** The home continue card quotes the exact sentence or question where the learner stopped.
7. **Tiles fly.** Order-question tiles travel to their place instead of appearing there.
8. **Kind empty states.** My words with no words: "Kata-kata dari pelajaran akan terkumpul di sini." Quick review before two lessons: hidden, not disabled.
9. **Local objects.** Later visuals use objects from Indonesian daily life (a motorbike, a rice cooker, an angkot, a mosque dome on a skyline). v1 keeps the table/box/ball, but the noun builder's noun list includes local things (durian, motorbike, umbrella, kitchen).

---

## 9. Sound

Synthesised with the Web Audio API; no audio files. Default on, quiet (peak around −20 dBFS), toggle in Settings. Never plays before the learner's first interaction.

| Event | Sound |
|---|---|
| Correct | Two sine notes rising a fourth (E5 → A5), 70ms each, soft attack |
| Wrong | One low triangle note (A3), 90ms, very quiet |
| Lesson done | Three-note rising arpeggio (C5 E5 G5) |
| Rung climbed | Four-note arpeggio ending an octave up (C5 E5 G5 C6), slight reverb tail |

Speech audio (examples) is separate from these effects and controlled by its own play buttons.

---

## 10. Illustration system (visual components)

All visuals follow one drawing system so they look like one set.

- **Projection:** oblique 2.5D. Front faces are true rectangles; top faces recede up-right at a fixed offset (20px right, 16px up at scene scale).
- **Light:** from top-left. Each object has three tones: top (lightest), front (base), side (darkest).
- **No outlines**, except a 1.5px stroke in the side tone where two light surfaces meet.
- **Ground shadow:** an ellipse in `--ink` at 8% opacity under objects resting on a surface.
- **Stage:** `--paper-2` with `--r-lg`, padding 16px. Visual viewBox for scenes is 400×260.
- **The subject** (the thing the lesson is about, e.g. the ball) is always in `--subject`; everything else is in material tones. The eye should find the subject in under a second.
- **No people** in v1 visuals. Objects carry the meaning.
- **Labels** inside visuals: Plex Mono 10–12px in `--muted`, English · *Indonesian* (e.g. `table · meja`).

| Token | Light | Dark |
|---|---|---|
| `--wood` / `--wood-dark` | `#B98A5A` / `#8C6440` | `#9C7550` / `#6E5236` |
| `--card` / `--card-top` / `--card-side` | `#D9C3A0` / `#E8D7BA` / `#B79E77` | `#B39C78` / `#C3AE8C` / `#8E7956` |
| `--subject` | `#D2553A` | `#E06A4F` |
| `--glass` | `--card` at 45% opacity | same |

Every visual has: a text alternative updated on each state change (`aria-live="polite"`), keyboard control (arrow keys or option buttons), and a reduced-motion path.

---

## 11. Copy voice

- UI chrome defaults to Bahasa Indonesia, informal-standard (*kamu*, not *Anda*; *lanjut*, not *lanjutkan proses*). English UI available in Settings.
- Short sentences. One idea each.
- Explanations use everyday Indonesian words before grammar terms. Introduce a term once, in context: "kata depan (*preposition*)".
- Feedback is specific: "On: di atas permukaan." beats "Bagus!"
- Never shame. Never "Salah!" alone. Use "Belum tepat" with what to look at.
- No exclamation marks in feedback except the climb moment. No emoji in UI copy.

Sample strings:
| Place | Bahasa Indonesia | English |
|---|---|---|
| Primary start | Mulai dari anak tangga pertama | Start at the first rung |
| Continue | Lanjutkan | Continue |
| Wrong answer | Belum tepat, coba lagi. | Not quite, try again. |
| Test not passed | Hampir. Ulangi pelajaran yang ditandai, lalu coba lagi kapan saja. | Close. Revisit the marked lessons, then try again any time. |
| Climb | Satu anak tangga lagi. Pelan-pelan, tapi naik. | One more rung. Slowly, but upward. |

---

## 12. Accessibility

- WCAG 2.2 AA in both themes.
- Focus ring: 2px `--accent`, 2px offset, on every interactive element; never removed.
- Touch targets ≥ 44×44px; option pills ≥ 48px tall.
- Colour is never the only signal: correct/wrong also use icon and text; rung states use words.
- Text-size setting scales the whole type scale; layouts must survive 130%.
- Screen readers: step changes announce "Langkah 3 dari 6: Contoh". Visuals announce their state. Check results announce the `why` line.
- `lang` attributes: English sentences `lang="en"`, Indonesian `lang="id"`, so screen readers pronounce each correctly.

---

## 13. Things this app never does

- Lives, hearts, energy, timers, countdowns.
- Streak counters, streak loss warnings, guilt notifications.
- Mascots, stock illustrations, emoji in UI, confetti.
- Purple-blue gradients, glass panels, neon accents, `rounded-lg` on everything.
- Popups that interrupt a lesson.
- Locking lessons behind other lessons or tests.
- Full-screen red or failure screens.

---

## 14. Quality bar (check before calling a screen done)

- [ ] Correct in light, dark and system theme, with no hard-coded colours
- [ ] Works at 360px and at 130% text size without horizontal scroll
- [ ] Complete on first frame; nothing waits for an animation to be readable
- [ ] Keyboard-only path works; focus visible throughout
- [ ] Reduced motion path checked
- [ ] English is the largest text on lesson screens; Indonesian is italic and muted
- [ ] Gold appears only for achievements
- [ ] Every interactive visual has a text alternative that updates
- [ ] Copy reviewed against §11
