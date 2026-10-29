# Authoring German Ladder content

The rules for writing lessons, tests, readings, dialogues and word lists. Read with
`docs/german/CLAUDE.md` §3–§4 and `docs/german/PRD.md` §4. Everything is a **draft** for the teacher:
`status: draft`, never `reviewed`, never a `review:` field.

Check your work with `npm run content:check -w german-ladder` (schema + lint) and
`npm run test -w german-ladder` (data files against `lib/de`). Both must end with **0 errors and 0
warnings** for your rung. Never edit `course/`, `lib/`, `components/` or tests to make content pass: if the
lint is wrong, rephrase if you can and report the case.

## 1. Files

| What | Where |
|---|---|
| Lessons | `content/<rung>/<nn>-<slug>.md` (frontmatter + four prose sections) |
| Rung test pool | `content/<rung>/test.yaml` (~24 items, each `from` a lesson; draw 16, pass 12) |
| Reading (Easy 1, Easy 2) | `content/<rung>/reading.yaml` |
| Dialogue (Easy 1, Easy 2) | `content/<rung>/dialogue.yaml` |
| Word list (the deck) | `content/data/words/<rung>.yaml`: every lesson glossary word plus more A1 words, up to the curriculum's `words_target` |
| New verbs | `content/data/verbs/<rung>.yaml` (same shape as `verbs.yaml`, with hand-written `check.praesens`) |
| New nouns | `content/data/nouns/<rung>.yaml` (same shape as `nouns.yaml`: gender, plural, pattern, level) |
| New names | `content/data/names/<rung>.yaml` |
| Function words | `content/lexicon/core.yaml`, your rung's list only |

Look before adding: a verb or noun may already be in `verbs.yaml` / `nouns.yaml` or another rung's file
(duplicates are errors). New verbs need every present form written out by hand in `check.praesens`; the
tests compare them with `lib/de`. New nouns need the plural pattern that `pluralOf` reproduces (or
`other`), and `exception:` when they break an ending clue (`-ung`, `-chen`, `-er` for people …).

## 2. Lesson frontmatter

```yaml
id: easy1-05-der-die-das          # <rung without dash><nn>-<slug>; permanent
rung: easy-1
order: 5
status: draft
minutes: 8                         # 3–15
title: { id: "…", en: "…", de: "…" }
summary: { id: "…", en: "…" }       # one or two sentences: what the learner can do now
introduces: [a1-gender-definite]   # ids from data/grammar.yaml in this rung's inventory
spiral: gender                     # a thread: sounds gender plural cases word-order separable modals perfekt prepositions register work
visual: { id: gender-tiles, props: { nouns: [Zeitung, Mädchen, …] } }   # or `worked:` (2–8 lines); one of the two
examples: [ { de: "…[[focus]]…", id: "…", note?: { id, en } } ]          # 4–6
pair: { off: "the typical Indonesian-speaker mistake", natural: "the right one with [[focus]]" }
sound?: { focus?: "ü", words: ["…"], pairs?: [["schon","schön"]], tip: { id, en } }   # Bunyi
work?: { situation: { id, en }, lines: [ { who, de, id } ] }  # Kerja: 2–4 lines, always Sie
words?: { id: "…", en: "…", bridges?: [Koffer], compounds?: [[Kranken, Haus]] }      # Kata
talk?: { lines: [ { who, de, id } ] }    # Ngobrol: 2–4 lines
tirukan: { de: "a short line to repeat", id: "…" }
check: [ 4–6 items ]
glossary: [ 6–12 entries (Dasar may have 3+) ]
extra?: [ { de: word, reason: "why it is here before its list" } ]
next: easy1-06-zahlen              # the next lesson id, or null on the last
```

Body: four sections, in this order, each 2–4 short sentences (a beginner reads on a phone):
`## concept.id`, `## concept.en`, `## contrast.id` (Indonesian ↔ German), `## contrast.en`.

**Focus marks** `[[…]]`: one per line. Two only when they form one verbal bracket: *Ich [[stehe]] um 6 Uhr
[[auf]]*, *Ich [[kann]] gut [[schwimmen]]*, *Ich [[habe]] gestern [[gearbeitet]]*.

**Glossary entries:** `{ de, id, en?, pos, gender?, plural?, sep?, verb?, bridge? }`. Nouns are capitalised
and need `gender` and `plural` ("—" for none), matching `nouns.yaml`. Verbs need `verb: { aux, partizip }`
(and `sep` for separable verbs), matching `verbs.yaml`. Phrases (`Guten Tag`, `zu Hause`) are `pos: expr`
and count as taught chunks. `pos ∈ noun verb adj adv pron prep conj det num expr interj name`.

## 3. Check items

Every item: unique permanent `id` (`e1-05-c1`, `e2-t-07`, `d-r-2`), a bilingual `why`, optional `cue`
(the Indonesian line; leave it out on about a third of items from Easy 2 on). `lang: id` when the prompt and
options are Indonesian (the German lint then skips them).

| type | fields |
|---|---|
| `choice` | prompt, options (2–4), answer |
| `gap` | prompt with one `___`, options, answer |
| `order` | tiles, answer, accept? |
| `fix` | wrong, options (sentences), answer |
| `listen` | audio (the German sentence), options, answer, prompt? |
| `scene` | visual `{ id, props }`, prompt?, options, answer |
| `form` | base (infinitive), target `{ person: ich du er wir ihr sie, tense: praesens perfekt praeteritum imperativ konj2 }`, frame? with `___`, options? or typed, answer (must equal `lib/de` conjugate) |
| `conjugate` | verb, tense, persons (2–6), answers per person |
| `dictation` | audio, answer, accept? |
| `gender` | noun, answer `m` `f` `n` |
| `case` | sentence with one `___`, role `nom` `akk` `dat` `gen`, noun (the noun after the slot), options?, answer (an article form that fits the role and gender) |
| `wordorder` | tiles, answer, zones (one per answer tile: `p1` `verb` `middle` `end`), accept? Any valid bracket order is accepted |
| `wechsel` | scene `{ place: in on under "next to" behind "in front of" above between, motion }`, sentence with `___` before the noun, verb, options, answer (dative without motion, accusative with) |

Typed items (`form`, `conjugate`, `dictation`) get lenient spelling before Easy 3 automatically, and noun
capitals count from Easy 1 lesson 5.

## 4. Capstones and tests

- `test.yaml`: `{ rung, draw: 16, pass: 12, items: [...] }`, 22–26 items, at least two per lesson, each with
  `from: <lesson id>`. Easy 2's pool mirrors the A1 exam's **skills** (listening, reading a notice, a form,
  a short message) written from scratch. **Never copy Goethe exam material.**
- `reading.yaml`: `{ rung, title {id en de}, lines: [ {de, id} ] (8–12 lines, 80–120 words), glossary (≤ 8), items (2–4) }`
- `dialogue.yaml`: `{ rung, title, setting: "Hamburg, di halte bus", lines: [ {who, de, id} ] (6–10), note?, items (3–4) }`

## 5. Language rules (CLAUDE.md §4)

- **Inventory.** Use only grammar taught up to this lesson. The lint detects the dative (before Easy 2
  lesson 6, except listed chunks such as *im*, *am*, *auf dem* from Easy 1 lesson 12), the Perfekt (before
  Easy 2 lesson 11), *weil / dass / wenn* (Easy 3), the genitive and Konjunktiv II (Medium 2), the passive,
  Präteritum forms other than *war / hatte* (from Easy 2 lesson 11), imperatives (before Easy 2 lesson 5),
  and adjective endings before a noun (Medium 1: say *Das Haus ist groß*, not *ein großes Haus*).
- **Words.** Every German word must be in the rung's lexicon, a word list, a glossary of this or an earlier
  lesson, the names list, or a verb form of a known verb. Unknown words are warnings in drafts; fix them.
- **Verb in position 2** in main clauses; the separable prefix at the end; never *ich aufstehe* in a main
  clause. Pronoun and verb must agree (*ich wohne*, *du wohnst*).
- **Articles agree** with the noun's gender and number (from `nouns.yaml` and glossaries).
- **Spelling:** nouns capitalised, *ß* (Germany standard: *Straße*, never *Strasse*), German quotation marks
  „…", never capital ẞ, umlauts always.
- **Register:** *Sie* with strangers and in every Kerja card; *du* among friends and family. Indonesian
  follows: *du* → *kamu*, *Sie* → *Anda / Bapak / Ibu*.
- **Indonesian:** natural informal-standard (*kamu*, *-ku*, *-nya*), meaning not word-for-word.
- **People and places:** Rina, Budi, Dewi, Andi, Putu, Siti, Yohanes, Mei, Agus, Wayan, Fitri; Lena, Jonas,
  Frau Becker, Herr Schmidt; Hamburg, Berlin, München, Köln, Jakarta, Bandung, Balikpapan. Everyday,
  Ausbildung and Pflege situations. No employers, agencies, politics, romance or clichés.
- **Bridges and false friends** only from `data/bridges.yaml`.
- One idea per lesson; mention a real exception in one line when beginners will meet it.

## 6. Visuals (`visual: { id, props }`)

| id | props |
|---|---|
| `mouth-places-de` | `initial`: `i ü e ö ich ach` |
| `gender-tiles` | `nouns`: up to 10 nouns from `nouns.yaml` |
| `case-machine` | `verb`: `haben sehen geben zeigen`; `indef`: bool; `nouns`: `{ nom: [...], akk: [...], dat: [...] }` |
| `verb-bracket` | `verb` (infinitive in verbs.yaml), `subject` (`ich du er sie wir ihr Sie`), `parts` (middle chunks), `modal` (a modal infinitive or null), `weil` (Easy 3+), `id` (the Indonesian line) |
| `wechsel-scene` | `initial` (a place), `motion` |
| `compound-builder` | `compounds`: nouns with `parts` in `nouns.yaml` |
| `day-planner` | none |

## 7. Lesson plan (PRD §4.3) and grammar ids

**Dasar** (`dasar`, 6): 01 `d-bridges` *Kamu sudah tahu* (Dutch-loan bridges; nouns capitalised) · 02
`d-umlauts` a/ä, o/ö, u/ü · 03 `d-diphthongs` ei/ie, eu/äu, long and short vowels · 04 `d-consonants` ch
(ich/ach), sch, sp/st, z, w, v, j · 05 `d-devoicing` Tag = *Tak*, ß/ss, r · 06 `d-stress` stress and reading
aloud (a sign, a menu, a short text).

**Easy 1** (`easy-1`, 12): 01 done · 02 `a1-sein-heissen` · 03 `a1-present-regular` + `a1-verb-second` · 04
`a1-questions` · 05 `a1-gender-definite` · 06 `a1-numbers` · 07 `a1-indefinite-kein` · 08
`a1-haben-possessives` · 09 `a1-plural` · 10 `a1-accusative` · 11 `a1-moechte-shopping` · 12 `a1-place-chunks`.

**Easy 2** (`easy-2`, 12): 01 `a1-time` · 02 `a1-separable` · 03 `a1-modals` · 04 `a1-pronouns-akk` · 05
`a1-imperative` · 06 `a1-dative-prepositions` · 07 `a1-wechsel` · 08 `a1-doctor` · 09 `a1-housing` · 10
`a1-forms` · 11 `a1-perfekt-intro` · 12 `a1-review` (a whole day; capstone and A1 review).
