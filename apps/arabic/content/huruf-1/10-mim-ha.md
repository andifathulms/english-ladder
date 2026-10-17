---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-10-mim-ha
rung: huruf-1
order: 10
status: draft
minutes: 8
title: { id: "Mim dan ha", en: "Mim and ha", ar: "مَ هَ" }
summary:
  id: "Kamu membaca م dan ه, dan mengenali keempat bentuk ha yang berbeda-beda."
  en: "You read م and ه, and recognise all four quite different forms of ha."
introduces: [letters-mim-ha]
spiral: script
visual: { id: letter-forms, props: { letter: "ه" } }
examples:
  - ar: "مَ مِ مُ"
    tr: "ma mi mu"
    id: "latihan suku kata: ma, mi, mu"
    en: "syllable drill: ma, mi, mu"
  - ar: "هَ هِ هُ"
    tr: "ha hi hu"
    id: "latihan suku kata: ha, hi, hu"
    en: "syllable drill: ha, hi, hu"
    note: { id: "ه adalah *h* ringan, seperti di kata *hari*.", en: "ه is a light *h*, as in Indonesian *hari*." }
  - ar: "قَلَمُ"
    tr: "qalamu"
    id: "pena, pulpen"
    en: "pen"
  - ar: "سَمَكُ"
    tr: "samaku"
    id: "ikan"
    en: "fish"
  - ar: "هَرَمُ"
    tr: "haramu"
    id: "piramida"
    en: "pyramid"
    note: { id: "ه di awal kata: هـ, seperti kepala dengan dua mata.", en: "ه at the start of a word: هـ, like a head with two eyes." }
  - ar: "ذَهَبُ"
    tr: "dzahabu"
    id: "emas"
    en: "gold"
    note: { id: "ه di tengah kata: ـهـ, bentuknya lain lagi.", en: "ه in the middle of a word: ـهـ, a different shape again." }
pair:
  off: { ar: "حَرَمُ", tr: "ḥaramu" }
  natural: { ar: "هَرَمُ", tr: "haramu" }
sound:
  focus: "ه"
  compare: "ح"
  words:
    - { ar: "هَ", tr: "ha" }
    - { ar: "هِ", tr: "hi" }
    - { ar: "هُ", tr: "hu" }
    - { ar: "هَرَمُ", tr: "haramu" }
    - { ar: "ذَهَبُ", tr: "dzahabu" }
  tip:
    id: "ه adalah *h* ringan, seperti di bahasa Indonesia. ح yang kamu pelajari di pelajaran 4 lebih dalam dan berdesis. Bergantian: *ha*, *ḥa*, *ha*, *ḥa*."
    en: "ه is a light *h*, as in Indonesian. ح, from lesson 4, is deeper and breathier. Alternate: *ha*, *ḥa*, *ha*, *ḥa*."
tirukan:
  ar: "قَلَمُ، سَمَكُ، ذَهَبُ"
  tr: "qalamu, samaku, dzahabu"
  id: "pena, ikan, emas"
  en: "pen, fish, gold"
check:
  - id: h1-10-c1
    type: read
    match: exact
    ar: "مِ"
    options: ["ma", "mi", "mu"]
    answer: "mi"
    why: { id: "Kasrah di bawah huruf dibaca *i*: *mi*.", en: "Kasrah below the letter is read *i*: *mi*." }
  - id: h1-10-c2
    type: choice
    match: exact
    prompt: "Di kata ذَهَبُ, di mana posisi huruf ه?"
    options: ["tengah", "awal", "akhir"]
    answer: "tengah"
    why: { id: "ه di antara ذ dan ب, jadi bentuknya bentuk tengah.", en: "ه sits between ذ and ب, so it takes its middle form." }
  - id: h1-10-c3
    type: read
    match: exact
    ar: "هَرَمُ"
    options: ["haramu", "ḥaramu", "harama"]
    answer: "haramu"
    why: { id: "Huruf pertama ه, *h* ringan, dan huruf terakhir berdhammah.", en: "The first letter is ه, a light *h*, and the last letter has dhammah." }
  - id: h1-10-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf terakhir."
    ar: "قَلَمُ"
    target: 2
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *qalamu*: م terakhir berharakat dhammah.", en: "It is read *qalamu*: the last م has dhammah." }
  - id: h1-10-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *sa-ma-ku*."
    letters: ["سَ", "مَ", "كُ"]
    distractors: ["شَ", "قُ"]
    answer: "سَمَكُ"
    why: { id: "Ikan itu *samaku*: س tipis, dan ك di akhir, bukan ق.", en: "Fish is *samaku*: thin س, and ك at the end, not ق." }
  - id: h1-10-c6
    type: listen
    match: exact
    audio: "هَ"
    options: ["هَ", "حَ"]
    answer: "هَ"
    why: { id: "Bunyinya ringan, seperti *h* biasa: itu ه.", en: "It sounded light, like an ordinary *h*: that is ه." }
glossary:
  - { ar: "قَلَمُ", tr: "qalamu", id: "pena, pulpen", en: "pen", gender: m, pos: noun }
  - { ar: "سَمَكُ", tr: "samaku", id: "ikan", en: "fish", gender: m, pos: noun }
  - { ar: "هَرَمُ", tr: "haramu", id: "piramida", en: "pyramid", gender: m, pos: noun }
  - { ar: "ذَهَبُ", tr: "dzahabu", id: "emas", en: "gold", gender: m, pos: noun }
next: huruf1-11-hamzah-ta-marbuthah
---

## concept.id
**م** (*mim*) adalah lingkaran kecil dengan ekor ke bawah. Baca: **مَ مِ مُ**. Dengan م, kamu sekarang bisa membaca kata yang sangat sering muncul: **قَلَمُ** (pena) dan **سَمَكُ** (ikan).

**ه** (*ha*) adalah huruf yang paling suka berganti rupa. Di awal kata ia seperti kepala dengan dua mata (هـ). Di tengah kata bentuknya lain lagi (ـهـ). Di akhir kata ia seperti lingkaran kecil berkait (ـه), dan sendirian ia bulat (ه). Empat wajah, satu bunyi: *h* ringan.

## concept.en
**م** (*mim*) is a small loop with a tail going down. Read: **مَ مِ مُ**. With م you can now read very common words: **قَلَمُ** (pen) and **سَمَكُ** (fish).

**ه** (*ha*) is the letter that most likes to change its look. At the start of a word it is like a head with two eyes (هـ). In the middle it has another shape (ـهـ). At the end it is a small hooked loop (ـه), and on its own it is round (ه). Four faces, one sound: a light *h*.

## contrast.id
Bunyi ه tidak sulit, karena sama dengan *h* di bahasa Indonesia. Yang perlu dijaga adalah bedanya dengan ح. **هَرَمُ** dengan ه berarti piramida. Kalau dibaca dengan ح yang dalam, *ḥaramu*, itu sudah kata lain.

Untuk mata, jangan bingung kalau ه di tengah kata tidak mirip ه yang sendirian. Kartu Lihat menunjukkan keempat bentuknya berdampingan. Kenali satu per satu, nanti matamu terbiasa.

## contrast.en
The sound of ه isn't hard; it is the same as Indonesian *h*. What matters is keeping it apart from ح. **هَرَمُ** with ه means pyramid. Read with the deep ح, *ḥaramu*, it is a different word.

For the eyes, don't worry if ه in the middle of a word looks nothing like ه on its own. The See card shows all four forms side by side. Learn them one at a time, and your eyes will get used to them.
