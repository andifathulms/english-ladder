# German Ladder: M5–M6 (check engine, visuals) review

Branch `feat/german-ladder`, 2026-10-29. The second planned review stop (after M6). M4 decisions are
recorded in `m4-review.md`.

## What's in

| M | Commit | Contents |
|---|---|---|
| M5 | `c2f693b` | Answer areas for `form`, `conjugate`, `dictation` (accent bar, the caps hint after a wrong try), `gender` (three chips), `case` (role label, only the changed letters coloured), `wechsel` (mini scene, motion arc, wo?/wohin?), `wordorder` (bracket frame, any valid order); the 24-item level check (draft, written from scratch) |
| G3 | `95666bf` | Core **MouthDrawing**: Mandarin's mouth section moved to core with an opt-in lip rounding; Mandarin renders through it with identical markup |
| G4 | `dcc60a7` | Core **PlaceDrawing** opt-in places *above* (über) and *between* (zwischen, a second box drawn only for that place); the six places draw as before |
| M6 | `8f3b930` | MouthPlacesDe, GenderTiles, CaseMachine, VerbBracket, WechselScene, CompoundBuilder, DayPlanner; `/visuals/` QA sheet |

## Gates

| Gate | Result |
|---|---|
| German unit tests | 329 ✓ (incl. every visual, item views through core's CheckItemView) |
| German e2e + axe | 41 ✓ (every route incl. `/placement/` and `/visuals/`, both themes; door 2 → placement → Easy 2 with an alternative word order; axe on the gender, case, wechsel and wordorder items) |
| German `content:check` | 0 errors; 18 warnings, all placement vocabulary that the rung word lists (M7) will cover |
| Core G3 | all apps build; all unit tests ✓; parity English **60/60**, Arabic **224/224**, Mandarin **236/240**, Japanese **193/196**, Spanish **193/196**; and Mandarin's MouthPlaces renders **byte-identical markup** before and after G3 in all 24 states (6 tongue groups × puff × interactive), checked by rendering the pre-G3 component beside the new one (the parity harness doesn't capture the two Mandarin lessons that use it) |
| Core G4 | all apps build; all unit tests ✓; parity English **60/60** and Arabic **224/224** at 0 px, **including English's prepositions-of-place lesson and Arabic's place scene**, which draw `PlaceDrawing`; Mandarin **237/240**, Japanese **195/196**, Spanish **193/196** |

**Every other miss in both gates is the known sidebar antialiasing.** The pixels sit on the wordmark disc,
the nav icons or the week strip (x ≤ 233), or are 1–3 px specks: Japanese `review` light 1280 has 3 px at
(681, 344) besides the week strip, and `not-found` 1–8 px. Neither G3 nor G4 draws anything on those
pages: `/me`, `/review`, `/not-found` and the rung pages have no mouth or place drawing.

## Where to look

`npm run dev:german`, then:
- `/visuals/`: all seven visuals (not linked from the app)
- `/placement/`: the level check, with gender, case, wechsel and wordorder items
- `/rung/easy-1/01-hallo/`: unchanged since M4 apart from the check areas

## Decisions for you

1. **A core accessibility bug: `Toggle` loses its name.** Core's `Toggle` labels its switch with
   `aria-labelledby="t-<label>"`; a label with spaces (almost all of them: "Efek suara", "Bibir bulat")
   makes an id with spaces, which `aria-labelledby` splits into several ids that don't exist. Screen
   readers then read only the on/off text. It affects every app's settings and visuals, and axe doesn't
   catch it. **I recommend a one-line core fix** (`useId()` for the id) as its own gated change (G6,
   invisible in screenshots). It isn't in the approved plan, so I haven't made it.
2. **Tap, not drag.** GenderTiles (pick a noun, then a tray) and DayPlanner (pick a day, time and
   activity, then "Taruh di jadwal") work by tapping; DESIGN allows "drag or tap". Tapping works the same
   with a keyboard and a screen reader. **I recommend tap only for v1.**
3. **CaseMachine has no WESSEN? slot yet.** The genitive needs noun forms like *des Mannes*, which
   `nouns.yaml` doesn't record; it arrives with Medium 2 (DESIGN §7.3 grows the machine by rung).
4. **WechselScene's nouns.** The box is *die Kiste* (added to `nouns.yaml`), the table *der Tisch* (for
   *unter*), and *zwischen* uses the two boxes: *zwischen den Kisten*. The ball *liegt* (wo?) or *Ich lege
   den Ball* (wohin?).
