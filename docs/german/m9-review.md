# German Ladder: M7–M9 (content, audio, polish) review

Branch `feat/german-ladder`, 2026-10-29. The third and last planned review stop (after M9). M4 and M6
decisions are recorded in `m4-review.md` and `m6-review.md`. **Nothing is merged to `main` and nothing is
published.**

## What's in

| M | Commit | Contents |
|---|---|---|
| G6 | `2d9cc0e` | Core: `Toggle` switches keep their accessible name (`useId`), approved at M6 |
| M7 | `775b9c9` | **Dasar**: six draft lessons (bridges and capitals, umlauts, ei/ie/eu, ich/ach, devoicing with ß and r, stress and reading aloud), test pool (24), word list |
| M7 | `919d16c` | **Easy 1**: lessons 02–12, test pool (26), reading "Rina in Hamburg", a campus-canteen dialogue, the A1.1 word list (272) |
| M7 | `2f91c22` | **Easy 2**: twelve lessons, test pool (27, mirroring A1 skills, written from scratch), a message-chain reading, a doctor's-reception dialogue, the A1.2 word list (313) |
| M7 | `7f5579b`, `b16c015` | Seven lint false positives found while writing, fixed with tests (*heiß*, *Das ist Tee*, *, das ist*, prefixes before *und*, prepositions vs prefixes, *nach Hause*, sentences after „…“) |
| M7 | `dbe0f94` | Dasar, Easy 1, Easy 2 **live**; placement items link their lessons; flows e2e |
| M8 | `59bdbd6` | The recording list (89 clips) and workflow; `docs/german/recordings.csv` for the speaker |
| M9 | `09983ac` | Pages carry only the nouns and verbs their visuals use (a visual lesson: 130 → 61 KB of HTML); axe with case colours off; a reduced-motion check |
| M9 | `ace5f8b` | German parity harness and baseline (196 shots); `test:parity` covers all six apps |
| M9 | `38c2c1b` | `deploy-german` CI job (main only) |

All content is `status: draft`, with no `review` fields: every lesson waits for the teacher (H1).

## Gates

| Gate | Result |
|---|---|
| `content:check` | 10 rungs, **30 lessons, 292 check items: 0 errors, 0 warnings** |
| German unit tests | **364 ✓** (`lib/de`, every verb in every data file, nouns, lint rules, items, visuals, shell, stress, audio keys) |
| German e2e + axe | **78 ✓**: every route in both themes (dark at 130% text), lesson steps with each visual, test/read/talk pages, case colours off; door 1 → Easy 1 lesson 1; the continue card; door 2 → placement → Easy 2 with an alternative word order; the Easy 2 test → the climb moment with "A1 selesai. Ini level ujian Goethe-Zertifikat A1 / Start Deutsch 1."; storage blocked; the A1 deck; long compounds at 360px; reduced motion |
| German parity | **196/196** at 0 px against the new baseline |
| Core G6 | all apps build; all unit tests ✓; parity English 60/60, Arabic 224/224, Japanese 196/196, Mandarin 238/240, Spanish 194/196; the four misses are the approved `imported-me`, `me` and `review-progress` shots; every settings page (where the toggles are) matched at 0 px |
| Lint | clean |

## Lighthouse (mobile)

Lighthouse 12.8, mobile emulation, local gzip server (as GitHub Pages serves it), median of three runs.
Accessibility, best practices and SEO are **100 on every page**.

| Page | Performance |
|---|---|
| `/rung/easy-1/05-der-die-das/` (a lesson with a visual) | **95** (93 before the visual-data trim) |
| `/placement/` | **95** |
| `/rung/easy-1/` | 91 |
| `/words/` | 90 |
| `/` | 86 |

Home and My words stay below 95 for the reason the Spanish review found: on the simulated slow-4G link, the
body face (preloaded, about 120 KB) and the page's HTML decide the paint. Not preloading the body face made
home slower and added a layout shift on lessons (CLS 0.15), so I kept the Spanish font setup you approved.

## DESIGN §13 checklist

- [x] Glyph test passes for ä ö ü ß „ " ‚ ' » « in all faces (capital ẞ dropped by decision R8; the lint forbids it)
- [x] No horizontal overflow from long compounds at 360px and 130% text (e2e)
- [x] Case and gender colours distinguishable and readable with case colours off (contrast tests; labels always shown; axe with colours off)
- [x] VerbBracket and CaseMachine fully operable by keyboard (chips are buttons, nouns are selects, toggles are switches)
- [x] Exit chips on the right rungs: A1 · Goethe on Easy 2, A2 on Medium 1, B1 · Ausbildung on Medium 3, B2 · Pflege/Studium on Hard 2, C1 · TestDaF/DSH on Hard 3

## Deploy

- `deploy-german` builds with `NEXT_PUBLIC_BASE_PATH=/german-ladder` and drafts shown, and pushes `out/`
  to the `gh-pages` branch of `andifathulms/german-ladder` with `GERMAN_PAGES_DEPLOY_KEY`, as the
  siblings do. A base-path build checks out (every link and asset under `/german-ladder/`).
- **Repo, key and secret (done 2026-10-29, as planned in H4):** `andifathulms/german-ladder` created
  (public, empty), deploy key "ladder monorepo" with write access, `GERMAN_PAGES_DEPLOY_KEY` set on
  `english-ladder`. The private key was deleted locally after setting the secret.
- **Stopped before the first publish.** The job only runs on `main`. After you merge, GitHub Pages may need
  "Deploy from branch: gh-pages" switched on once in the new repo's settings, as for Spanish.

## Judgement calls for the teacher (from the writing)

- **Dasar:** the sound descriptions in Indonesian terms (ich: say *i* and breathe out; ach like *kh* in
  *akhir*; eu like *oi* in *amboi*; ö as the *e* of *sate* with rounded lips; r like *gh* in *ghaib*,
  rolled r understood); "Strasse" in Switzerland; *Kaffee* KAF-fee in Germany, Kaf-FEE in Austria; the
  dictation of *die Tür* is strict on purpose.
- **Easy 1:** grammar order enforced by hand inside the rung (no *einen* before lesson 10, no possessives
  before 08); *Woher kommen Sie?* and *Wie heißt du?* as set phrases in lesson 02; *Azubi* as masculine;
  *zwo* on the phone; prices written 3,50 €.
- **Easy 2:** *geboren* as a fixed phrase before the Perfekt; *Was haben Sie?* at reception; Sie with a
  first name on the ward; *Mir tut der Kopf weh* only in an explanation (dative pronouns are Easy 3);
  shift words (*Frühschicht*, *Krankmeldung*) taught in Kerja cards though the lists place them at B1.
- **Levels:** new nouns are tagged A1 by default; some (Kassierer, Kellner, Azubi) may be A2 on the
  Goethe lists.

## Decisions for you

1. **Merge and publish.** Say the word and I'll merge `feat/german-ladder` to `main`, which publishes
   German Ladder to `https://andifathulms.github.io/german-ladder/` (and redeploys the five siblings
   unchanged), then confirm it's live.
2. **Recordings (H2):** 89 clips listed in `docs/german/recordings.csv`, or confirm that browser `de-DE`
   voices are fine for v1 (Spanish shipped on browser voices).

## Still open (human tasks)

The German teacher and the Ausbildung/nursing reviewer (H1), recordings or the browser-voice decision (H2),
and the FrequencyWords licence confirmation (H3).

## Decisions (2026-10-29)

Approved: merge to `main` and publish. Audio: v1 ships on the browser's `de-DE` voice (as Spanish); the
89-clip list stays ready for when a speaker is found (H2 stays open for recordings).
