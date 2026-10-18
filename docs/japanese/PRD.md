# Japanese Ladder — Product Requirements (v1)

**Status:** Draft for build · **Owner:** Fathul · **Date:** 17 October 2026
**Companion docs:** `CLAUDE.md` (how to build), `DESIGN.md` (how it looks and feels)
**Siblings:** English Ladder (built), Arabic Ladder and Mandarin Ladder (specified). All run on one engine, `ladder-core`, as apps in one monorepo. Japanese Ladder reuses the most from Mandarin Ladder: characters, ruby, stroke order, tracing, font subsetting, the word deck. This document covers only what Japanese needs.

---

## 1. Summary

Japanese Ladder is a levelled Japanese course for Indonesian speakers, from **complete zero** (no kana, no words) to reading real Japanese and working in Japanese.

It keeps the sibling engine: ladder, six-step lessons, interactive visuals, check engine, quick review, rung tests, climb moment, word deck, progress saved in the browser, static hosting. Its colour is **sumi ink and vermilion** on washi-cream paper.

What makes it a Japanese course:

1. **The ladder is JLPT, with work in mind.** The rungs follow JLPT N5 → N1, and the end of Medium 1 lines up with **JFT-Basic** (about CEFR A2), the test most Indonesian workers take for Japan's Specified Skilled Worker (*Tokutei Ginou*) and caregiver routes.
2. **Two kana rungs before Easy 1.** *Kana 1* teaches hiragana, and romaji is gone by the end of it. *Kana 2* teaches katakana and the sounds Indonesians tend to miss: long vowels, the small っ, ん, and pitch accent. Learners who already read hiragana can test out.
3. **Kanji from Easy 1, with furigana that fades.** Kanji arrive gradually from the first N5 lesson, with furigana (small kana above them) that thins out rung by rung, like pinyin in Mandarin Ladder.
4. **Politeness is a strand, not an afterthought.** Lessons start in the polite です/ます style, as Minna no Nihongo and Irodori do. Casual style arrives in Easy 3, and workplace keigo from Medium 1. A **Kerja** card in relevant lessons teaches the phrases used on a job in Japan.
5. **Built for Indonesian speakers.** Japanese sounds are friendly to Indonesians (five vowels, open syllables, no tones), so the course says so and builds confidence early. Then it drills where Indonesian misleads:
   - the verb goes at the **end** (私はご飯を食べます vs *saya makan nasi*)
   - particles come **after** the word (東京**に** vs ***ke** Tokyo*)
   - long and short vowels change meaning (おばさん aunt vs おばあさん grandmother)
   - the small っ doubles a consonant (きて vs きって)

   Japanese politeness maps loosely onto *kamu / Anda / Bapak-Ibu*, and the course uses that bridge.

**v1 ships Kana 1, Kana 2 and Easy 1 (first half of N5), complete:** 36 lessons, three rung tests, the placement check, the Easy 1 word and kanji decks, one reading and one dialogue capstone, eight visuals, recorded kana audio, and the full app shell with all eleven rungs on the ladder.

---

## 2. Goals and non-goals

### Goals (v1)
- A true beginner can, after Kana 1–2, read any hiragana or katakana word aloud and write kana for a word they hear, with no romaji.
- They also hear and produce the long vowel / short vowel and っ / no っ distinctions in minimal pairs at 80% or better.
- After Easy 1, a learner can introduce themselves politely, say what things are and where, tell the time and prices, talk about daily actions with ます verbs, and read and write about 50 kanji.
- Every kana and every lesson sentence has audio: kana recorded, sentences recorded where available and from the browser's Japanese voice otherwise.
- No Japanese text in a shipped lesson has been seen only by AI. Every reviewed lesson names its reviewer.

### Non-goals (v1)
- Speaking assessment or microphone scoring (v2).
- Full pitch-accent training beyond awareness and minimal pairs.
- Kansai or other dialects as tracks (recognition notes may appear at Hard).
- JLPT or JFT exam simulation (timed papers).
- Accounts, sync, leaderboards, analytics, ads.

---

## 3. Audience

| Persona | Starting point | Door into the app |
|---|---|---|
| **True beginner** | No kana | Kana 1, lesson 1 |
| **Future worker in Japan** (LPK trainee, caregiver or factory route) | Often some hiragana from a training centre; needs JFT-Basic / N4 and workplace Japanese | Placement → Kana 2 or Easy 1; the Kerja strand; the JFT-Basic marker at Medium 1 |
| **Anime and J-culture learner** | Knows many spoken words, can't read | Placement → Kana 1 or 2 |
| **Scholarship / study** (MEXT, university) | Needs N3–N2 | Any door; JLPT labels on every rung |

Copy, pacing and explanations assume a true beginner.

---

## 4. The curriculum

### 4.1 How this sequence was checked

The order follows established beginner programmes, so a Japanese teacher should recognise it:
- **Minna no Nihongo** (the standard textbook in Indonesian LPK training centres and many campuses): polite ます form first; は/を/に/で/へ in the first ten lessons; い and な adjectives; あります/います; counters; て-form around lesson 14; plain form around lesson 20.
- **Irodori: Japanese for Life in Japan** (Japan Foundation, free, written for SSW workers, CEFR A1–A2 aligned with JFT-Basic): task-based units for daily life and work, which the Ngobrol capstones and Kerja cards follow.
- **Genki** (common in universities): a similar grammar order, with kanji introduced gradually from early lessons.
- **JLPT** levels N5–N1. JLPT has **not** published official vocabulary or kanji lists since 2010. The counts below are the commonly used estimates, and the word and kanji decks use a vetted community list (CLAUDE.md §5.6), labelled as such in the app.

Where Japanese Ladder deliberately differs:
- Romaji is removed **by the end of Kana 1**, earlier than some courses. Long romaji dependence is the most common reason learners stall.
- Pitch accent is introduced as awareness in Kana 2 and marked in My words, not drilled as a system.
- The Indonesian contrast (verb last, particles after, long vowels, small っ, politeness mapping) runs throughout.

A qualified Japanese teacher must approve the sequence before content beyond Easy 1 is written (§12).

### 4.2 Rungs

| # | Rung | Tier | JLPT | CEFR | Lessons | Kanji (cum., est.) | Words (cum., est.) | Furigana | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | **Kana 1** · Hiragana | kana | — | Pre-A1 | 10 + test | 0 | 40 | — (romaji fades out within the rung) | **v1** |
| 1 | **Kana 2** · Katakana dan bunyi | kana | — | Pre-A1 | 10 + test | 10 | 120 | always | **v1** |
| 2 | **Easy 1** · N5 (1) | easy | N5 | A1 | 16 + test | 50 | 400 | always | **v1** |
| 3 | Easy 2 · N5 (2) | easy | N5 | A1 | 16 + test | 100 | 800 | always | v1.1 |
| 4 | Easy 3 · N4 (1) | easy | N4 | A2− | 16 + test | 200 | 1,100 | new kanji only | v1.2 |
| 5 | Medium 1 · N4 (2) · JFT-Basic | medium | N4 | A2 | 16 + test | 300 | 1,500 | new kanji only | later |
| 6 | Medium 2 · N3 (1) | medium | N3 | B1− | 16 + test | 475 | 2,400 | on request | later |
| 7 | Medium 3 · N3 (2) | medium | N3 | B1 | 16 + test | 650 | 3,700 | on request | later |
| 8 | Hard 1 · N2 (1) | hard | N2 | B2− | 18 + test | 825 | 4,800 | on request | later |
| 9 | Hard 2 · N2 (2) | hard | N2 | B2 | 18 + test | 1,000 | 6,000 | off | later |
| 10 | Hard 3 · N1 | hard | N1 | C1 | 20 + test | 2,000 | 10,000 | off | later |

That's 172 lessons. Both Kana rungs are `optional: true` and can be climbed through placement. The About page says plainly that N4 typically takes a year of steady study and N2 three or more.

**Lessons and decks.** As in Mandarin Ladder, lessons teach core words and kanji in context, and two decks per rung hold the rest:
- **Kartu kata** (words)
- **Kartu kanji**: each kanji with its meaning, common readings (on and kun), example words, stroke order, and a tracing card

### 4.3 Topics per rung

**Kana 1 · Hiragana**
1. *Bahasa Jepang lebih ramah dari yang kamu kira*: five vowels like Indonesian; open syllables; words you know (sushi, tsunami, karaoke, anime); the three scripts at a glance
2. あ い う え お, か き く け こ
3. さ し す せ そ, た ち つ て と (し shi, ち chi, つ tsu)
4. な に ぬ ね の, は ひ ふ へ ほ (ふ fu)
5. ま み む め も, や ゆ よ, ら り る れ ろ (r/l: one sound)
6. わ を ん; は and へ as particles (wa, e)
7. Dakuten and handakuten: が ざ だ ば ぱ
8. Small ゃ ゅ ょ: きゃ しゅ ちょ
9. Long vowels and the small っ (おばさん/おばあさん, きて/きって)
10. Reading without romaji: words, then a short sentence; writing practice on screen

Romaji shows under kana in lessons 1–6, only on new kana in 7–8, and not at all from lesson 9.

**Kana 2 · Katakana dan bunyi**
1. Why katakana: loanwords, names, emphasis
2. ア to ソ
3. タ to ホ
4. マ to ン, and look-alikes (シ/ツ, ソ/ン)
5. The long-vowel mark ー; dakuten in katakana
6. Extended katakana: ファ ティ ウィ ヴ
7. English words in Japanese clothes (パソコン, コンビニ, テレビ) and false friends (マンション is an apartment)
8. Mora rhythm: every kana is one beat; ん, っ and long vowels count
9. Pitch accent awareness: はし (bridge / chopsticks), あめ (rain / candy)
10. Your first kanji: 一 二 三 日 月 人 口 山 川 本; reading a short text in kana

**Easy 1 · N5 (1) (16 lessons)**
1. はじめまして: name, country, job; X は Y です
2. Questions with か; の between nouns (わたしの本)
3. これ / それ / あれ, この / その / あの
4. ここ / そこ / あそこ; where things are
5. Numbers, prices, ～円; いくらですか
6. Time and days: ～時 ～分, 今日, 明日
7. Verbs in ます form; **the verb goes last**; ～ます / ～ません
8. Particles of motion: へ / に (行きます, 来ます, 帰ります)
9. を and で: 何を食べますか; レストランで食べます
10. Past polite: ～ました / ～ませんでした
11. い adjectives: 高い, 安い, おいしい
12. な adjectives: きれい, しずか, げんき
13. あります / います: things and living beings; position words (上 下 中 となり)
14. Counters: ～つ, ～人, ～本, ～枚, ～匹, and sound changes (いっぽん, にほん, さんぼん)
15. Invitations: ～ませんか, ～ましょう
16. A whole day: review through a dialogue at a convenience store

**Easy 2 onward** (outline, in `curriculum.yaml` with `status: soon`)
- **Easy 2 · N5 (2):** て-form and its uses (～てください, ～ています, ～てもいいです, ～てはいけません); ～たい; giving reasons with から; comparison (より, いちばん); ～が好き / 上手; family words; transport and directions.
- **Easy 3 · N4 (1):** plain forms (dictionary, ない, た); casual speech among friends; ～と思います; ～ことができます; potential forms; ～たことがあります; conditionals (と, たら, ば); ～つもり.
- **Medium 1 · N4 (2) · JFT-Basic:**
  - giving and receiving (あげる, もらう, くれる); passive; causative (basic)
  - ～そう / ～よう / ～らしい
  - **workplace keigo basics:** お疲れ様です, 失礼します, reporting to a supervisor (報連相)
  - **JFT-Basic readiness review**
- **Medium 2–3 · N3:** keigo system (尊敬語, 謙譲語); complex conditionals; ～ように, ～ために; explanatory のです; reading notices, emails and workplace documents; listening at natural speed.
- **Hard 1–2 · N2:** written style; nuance pairs (～わけ, ～はず, ～べき); news and business Japanese; formal email and meetings.
- **Hard 3 · N1:** formal and literary grammar; idioms and 四字熟語; long authentic texts; interpreting between Indonesian and Japanese.

### 4.4 The four skills

| Skill | How |
|---|---|
| **Listening** | Recorded kana; audio on every sentence; `listen` items; mora and long-vowel minimal pairs; dialogues |
| **Speaking** | **Tirukan** at the end of every Examples step, with mora beats and pitch line shown; no scoring in v1 |
| **Reading** | Every lesson; the romaji and furigana fades; readings at each rung |
| **Writing** | Kana and kanji **tracing** (`trace`); **typing in kana** via romaji input that converts as you type (`kana` items); kanji from components (`build`) |

### 4.5 The two fades

**Romaji** exists only in Kana 1 (it shows under kana in lessons 1–6, only on new kana in 7–8, and not from lesson 9). After Kana 1, romaji appears nowhere in lessons; My words can show it on request.

**Furigana** (rung field `furigana`):
- `always`: over every kanji (Kana 2, Easy 1–2)
- `new`: only over kanji introduced in this lesson and the previous two, plus kanji above the current rung (Easy 3, Medium 1)
- `on-request`: hidden; hold a word or press **F**, or use the lesson's **Furigana** toggle (Medium 2–Hard 1)
- `off`: hidden; My words still shows readings (Hard 2–3)

Kanji above the learner's current rung **always** get furigana at any level, as published learner material does.

### 4.6 Politeness and work

- **Default register:** polite (です/ます) until Easy 3, then casual taught explicitly, then keigo from Medium 1.
- The **Sopan** (politeness) strand card shows one meaning at two or three levels, mapped to Indonesian:
  - 食べる ↔ *makan* (with friends)
  - 食べます ↔ *makan* (polite, to *Anda*)
  - 召し上がる ↔ *bersantap* / *silakan dinikmati, Pak*
- The **Kerja** (work) card appears in lessons with a natural workplace use: greetings at work, asking for instructions, reporting, apologising, safety phrases. It follows Irodori's work scenarios. Medium 1 ends with a JFT-Basic readiness review.

### 4.7 Grammar, vocabulary and kanji inventory rule

Same rule as the siblings: only grammar, words and kanji from earlier rungs plus this rung up to this lesson.
- Words not on the rung's list need `extra:` with a reason.
- Kanji in a sentence that are above the inventory must carry furigana whatever the fade.
- Lint checks both.

### 4.8 Spiral threads
`kana`, `sounds`, `mora`, `pitch`, `kanji`, `particles`, `word-order`, `verbs`, `te-form`, `plain-form`, `adjectives`, `counters`, `existence`, `politeness`, `keigo`, `giving-receiving`, `conditionals`, `work`.

---

## 5. Features

Everything from English Ladder carries over, plus everything Mandarin Ladder adds to the engine: two doors, placement, lesson-scoped toggles, capstones, Tirukan, the word deck, tracing, ruby, font subsetting, and the English Ladder fixes. The changes are listed here.

### 5.1 Home: two doors
On the sumi board:
- **Baru mulai dari nol** → Kana 1, lesson 1
- **Sudah bisa hiragana** → placement

### 5.2 Placement check (Cek kana)
- 20 items, no feedback during the check:
  - hiragana reading (6)
  - katakana reading (4)
  - dakuten and small kana (3)
  - long vowel / っ by ear (3)
  - typing a heard word in kana (2)
  - recognising 2 basic kanji (2)
- **17+:** Kana 1 and 2 climbed; start at Easy 1. **12–16:** Kana 1 climbed; go to Kana 2. **Under 12:** Kana 1.
- Never un-climbs; no climb moment for placement.

### 5.3 Lesson player
The same six steps.

**The Japanese sentence block:** kana and kanji with furigana per the fade, mora and pitch available on tap, the Indonesian translation below, and a play button.

**Top bar toggles** (lesson-scoped):
- **Furigana**, shown when the rung is `new` or `on-request`
- **Romaji**, shown only in Kana 1 lessons 7–8

**Strand cards:**
- **Bunyi**: mora beats and pitch line of a word, with long/short or っ minimal pairs
- **Kanji**: new kanji with stroke order, meaning, readings and the words in this lesson
- **Sopan**: one meaning at two or three politeness levels, mapped to Indonesian
- **Kerja**: a workplace exchange
- **Kata**: loanword traps and katakana English
- **Ngobrol**: a 2–4 line exchange

**Tirukan** closes the Examples step.

Explanations are in Bahasa Indonesia (English UI optional).

### 5.4 Check engine
The siblings' types (`choice`, `gap`, `order`, `scene`, `fix`, `listen`, `trace`, `build`) plus:

| Type | Interaction | Example |
|---|---|---|
| `kana` | Hear a word (or see a kanji word); type its reading in romaji, which converts to kana live; accepted when the kana matches | hear "kitte" → `kitte` → きって |
| `mora` | Hear a word; pick how many beats it has, or pick the right spelling among long/short/っ variants | おばあさん: 5 beats |
| `pitch` | Hear one of a minimal pair; pick the meaning or the pitch line | はし → 箸 (chopsticks) |
| `form` | Change a verb or adjective to a target form, by choosing or typing | 食べる → ます form → 食べます |

**Grading:**
- Japanese is normalised (NFKC for full/half width, punctuation unified, spaces removed).
- `kana` compares kana exactly, so long vowels and っ count. Katakana is accepted for hiragana only where the item allows (`script: any`).
- `form` compares normalised kana or kanji, accepting either when the item lists both.

### 5.5 Rung tests and capstones
- Kana 1: draw 14 of 28, pass 11. Kana 2: draw 14 of 28, pass 11. Easy 1: draw 20 of 40, pass 15.
- Capstones per live rung: **Baca dan dengar** (reading) and **Ngobrol** (dialogue; from Easy 1, set in daily life or at work). Kana 1 has neither; Kana 2 has a short kana reading.

### 5.6 Audio
- Japanese browser voices (ja-JP) are good on most devices for words and sentences. They're less reliable for isolated kana and for pitch accent in minimal pairs.
- **Kana:** the full set (about 110 morae, including dakuten and small-kana combinations) is **recorded**, along with the Kana 2 minimal pairs and pitch pairs.
- **Sentences:** recordings where they exist, otherwise the browser's ja-JP voice. v1 aims to record all Easy 1 examples and dialogues.
- Speed: 0.75× / 1×.

### 5.7 My words and decks
- **My words:** kanji word, reading (kana), romaji on request, Indonesian, pitch accent mark, word type (verb group, い/な adjective), JLPT level.
- **Kartu kata:** as Mandarin Ladder.
- **Kartu kanji:** front shows the kanji; back shows meaning, on and kun readings, 2–3 example words from the learner's level, stroke order, and a "Tulis" (write) button that opens a tracing card.

### 5.8 Settings (changes)
- Speed and voice gender
- Ukuran teks Jepang (100 / 120 / 140%)
- Pitch marks on/off
- Romaji in My words on/off
- Deck daily counts and card faces
- Theme and motion as the siblings

---

## 6. Content model (summary)

Full schema in CLAUDE.md §5.

| Field | Meaning |
|---|---|
| `ja` | Japanese with ruby markup `{漢字|かん|じ}` (per-character readings), words separated by spaces (removed at render), `[[focus]]` markup |
| `kana` | Full reading in kana (for audio keys, `kana` items and lint) |
| `id` | Indonesian translation |
| `en` | English translation (optional) |
| `pitch` | Pitch accent number per word, where known (optional) |

UI bilingual fields stay `{ id, en }`. Reviewed lessons need `review: { by, date }`.

---

## 7. Visual components (v1)

| Visual | Rung | What it shows |
|---|---|---|
| **KanaChart** | Kana 1–2 | The 46-kana grid (vowels × consonant rows). Tap a cell to hear and see the stroke order. Toggles: dakuten, small-kana combinations, hiragana/katakana. Irregular readings (し, ち, つ, ふ) are outlined with a note |
| **KanaOrigins** | Kana 1–2 | Each kana beside the kanji it came from (あ ← 安, ア ← 阿), morphing between them, to make shapes memorable |
| **MoraBeats** | Kana 1–2 | A word laid out as beats: each mora a block, っ an empty beat, long vowels a stretched block, ん its own beat. Plays with a metronome tick under each beat. Compare mode shows minimal pairs |
| **PitchLine** | Kana 2 | High and low marks over each mora with a connecting line, for minimal pairs (はし, あめ, かみ); with Indonesian intonation, which has no word pitch, as the contrast |
| **StrokeOrder** | Kana 1 → | The Mandarin engine with Japanese stroke data (KanjiVG), in a practice grid |
| **ParticleTrain** | Easy 1 | A sentence as a train: noun cars each carrying a particle tag (は, を, に, で), and the verb as the locomotive, always last. Drag cars to reorder: the train still runs while the verb stays at the end. An "Indonesia" toggle shows *Saya makan nasi di rumah* in SVO order beside it |
| **PlaceScene (Japanese)** | Easy 1 | The table, box and ball with position nouns: 箱の上 / 下 / 中 / となり / うしろ / まえ. Like Chinese, the position comes after the object, the opposite of *di atas kotak* |
| **Counters** | Easy 1 | The shelf from Mandarin Ladder's MeasureWords, with Japanese counters (本, 枚, 匹, 冊, 個, 人). Choose a number 1–10 and see the sound changes (いっぽん, にほん, さんぼん, ろっぽん…) with each change highlighted |

---

## 8. Progress data

As the siblings, with:
- key `japanese-ladder:v1`
- `capstones`, `placement`
- `deck` (words) and `kanjiDeck`
- `traces` (kana and kanji)
- settings: `uiLang`, `voice`, `rate`, `sfx`, `textSize`, `jaSize`, `pitchMarks`, `romajiInWords`, `deckDaily`, `deckFace`, `theme`, `motion`

---

## 9. Non-functional requirements

As Mandarin Ladder (font subsetting under budget, ruby without collisions at 140%, tracing by touch, pen and mouse with keyboard alternatives, lazy audio under 8 MB per rung), plus:
- **Japanese glyph shapes:** every Japanese element carries `lang="ja"` and uses Japanese fonts. Chinese and Japanese forms of the same character differ (e.g. 直, 骨, 角), and the engine must never render Japanese with the Mandarin app's Chinese fonts.
- **Japanese stroke order** comes from KanjiVG, not from the Chinese stroke data. Some characters differ (e.g. 必, 右 and 左 first strokes).

---

## 10. Success measures
- 5 true beginners finish Kana 1–2; at least 4 of 5 read 20 unseen kana words aloud correctly and pass the long-vowel/っ minimal pairs at 80%.
- Easy 1 testers score ≥ 75% on the rung test.
- A native Japanese teacher rates every Ngobrol dialogue and Kerja card as natural, with the right politeness.
- Optional: someone preparing for JFT-Basic reviews the Kerja cards against Irodori and finds the situations relevant.

---

## 11. Release plan

| Release | Contents |
|---|---|
| **v1.0-kana** | App in the monorepo, all eleven rungs on the ladder, placement, Kana 1 and 2 with recorded kana, KanaChart, KanaOrigins, MoraBeats, PitchLine, StrokeOrder (kana) |
| **v1.0** | Easy 1 complete, word and kanji decks for Easy 1, ParticleTrain, PlaceScene, Counters, reading and dialogue |
| v1.1 | Easy 2 (rest of N5) |
| v1.2 | Easy 3 (N4 part 1) |
| later | Medium 1 with the JFT-Basic review; then N3, N2, N1; microphone practice (v2) |

---

## 12. Decisions made
0. **Sequence approval:** a qualified Japanese teacher reviews §4 before content beyond Easy 1 is written, and signs off each rung's topic list.
1. **Standard:** standard Japanese (Tokyo), modern kana usage, jōyō kanji; Hepburn romaji (Kana 1 only).
2. **Levels:** JLPT N5–N1, with JFT-Basic marked at Medium 1. Word and kanji lists are community-sourced estimates, labelled as such.
3. **Register:** polite first, casual from Easy 3, keigo from Medium 1.
4. **Character style:** a textbook-style face (Klee One) that shows strokes as written, plus a sans for UI text.
5. **Audio:** recorded kana and minimal pairs; recorded sentences where available, browser ja-JP voice otherwise.
6. **Writing:** tracing for all kana and for Easy 1 kanji in v1.

## 13. Open questions (not blocking v1)
- Is a Kansai recognition card worth adding at Hard 2, given the Osaka and Kobe job market?
- Should the Kerja strand become its own optional side rung ("Bahasa Jepang untuk kerja"), mapped to Irodori units?
- Who records the kana set: a commissioned native speaker, or an existing open-licensed set if its terms allow trimming and redistribution?
