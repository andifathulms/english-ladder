# Japanese Ladder: M8 (Kana) review

Branch `feat/japanese-ladder`, 2026-10-19. M8 is the planned stop before the Kana release. The release itself
still needs the teacher (H1) and the kana recordings (H2).

## What's in

| Part | Contents |
|---|---|
| Visuals | **KanaChart** (gojūon grid, script/dakuten/combination toggles, irregular-reading marks and notes, a stroke-order sheet per cell), **KanaOrigins** (each kana beside its source kanji, crossfading), **MoraBeats** (beat blocks lit in time, compare mode), **PitchLine** (high/low rails, ⌝ drop mark, particle が, small drawings, the Indonesian contrast) |
| Kana 1 | 10 draft lessons, hiragana, the romaji fade (shown 1–6, new kana only 7–8, none from 9) |
| Kana 2 | 10 draft lessons: katakana, ー and dakuten, extended katakana, loanwords and false friends, mora rhythm, pitch awareness, the first ten kanji |
| Tests and checks | Two rung test pools (28 items, draw 14, pass 11), the 20-item placement check (17 → Easy 1, 12 → Kana 2), the Kana 2 reading |
| Data | `content/data/kana.yaml` (71 kana with origins and notes), Indonesian meanings for seven more kanji, KanjiVG stroke files for the new kanji |

Gates: `content:check` 21 lessons and 196 items with 0 errors and 0 warnings. Unit tests 601 ✓, e2e and axe
66 ✓ against a drafts build (light, and dark at 140% Japanese size), lint clean. The one core change (`blip()`
in `sfx.ts`) passed English 60/60 and Arabic 224/224 at 0 px. Mandarin passed 210/212; the two misses are the
`imported-me` 1280 shots at 22–27 px, the anti-aliasing difference approved on 2026-10-18.

## Where to look

Both Kana rungs are still `soon`, because `content:check` won't let a Kana rung go live without its
recordings. So the rung pages show topics, not lessons. Open the lessons directly (`npm run dev:japanese`):

- `/rung/kana-1/01-lima-vokal/` … `/rung/kana-1/10-membaca/`
- `/rung/kana-2/01-kenapa-katakana/` … `/rung/kana-2/10-kanji-pertama/`
- `/rung/kana-1/test/`, `/rung/kana-2/test/`, `/rung/kana-2/read/`, `/placement/`

Every lesson links to the next.

## Decisions for you

1. **Wrong Japanese gets a wavy underline instead of a strike-through** (Japanese only). DESIGN §4.4 asks
   for strike-through, but a line through kanji makes a different character: struck 人 reads as 大, and
   struck 一 disappears. The ✕ label and `--off` colour still mark it wrong. Approve, or I revert it.
   The same problem probably exists in Mandarin (人 → 大); I didn't touch Mandarin.
2. **Audio keys for kanji text now include the spelling** (CLAUDE.md §7.7 says reading only). 橋 and 箸 are
   both はし, so a pitch pair could never play two clips. Kana-only text keeps its reading key. No
   recordings existed, so nothing was re-keyed.
3. **One-mora kana lines use the kana recording** (a worked あ, the word え), so a lone kana never plays from
   the browser voice.
4. **Kana 1 lesson 1 teaches the vowels**, as the existing draft did. PRD §4.3 lists あいうえお under lesson 2,
   which now reviews them. `kana.yaml` dates the vowels to lesson 1.
5. **Kana 2 lessons 2–4 use only the katakana taught so far**, so few of their words are on the N5 list.
   Each such word has an `extra:` reason. The alternative is allowing ー and dakuten earlier than lesson 5.
6. **Kana 2 lesson 10 introduces ten kanji** (PRD §4.3), so the schema now allows ten per lesson. The lint
   still holds Easy lessons to 3–8.
7. **The off half of a pair skips the reading check.** It's wrong on purpose.

## Fixed along the way

- JaSentence let 。 start a line when romaji was on. Punctuation now stays with its word.
- At 360px KanaChart clipped its fifth column, and MoraBeats broke a pair's beat alignment.
- MoraBeats' row became an unreachable scroll region at 140% (axe).

## Known gaps

- **KanaOrigins only crossfades.** DESIGN §8.2 also wants the surviving strokes highlighted where
  KanjiVG stroke groups match. The crossfade is the spec's fallback; matching isn't built.
- **Until recordings exist**, single-kana listen items show the kana, which gives the answer away, and
  pitch and mora pairs show their text.
- `data:check` has 6 warnings from M1: the PRD's cumulative estimates differ from the imported lists by
  22–27%, and いただく has a kanji reading in the source list.

## Next

M9 (Easy 1): ParticleTrain, PlaceSceneJa, Counters (with core C7, C8), 15 more lessons, the test pool, the
reading and dialogue, and the decks.
