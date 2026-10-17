---
# Draft by Claude. Huruf rungs have no Mesir strand.
# Standalone ء, ؤ and ى need sukun or a long vowel in real words, so they are described in prose and
# tested by recognition only; the reading examples use أ إ ئ and ة with short vowels.
id: huruf1-11-hamzah-ta-marbuthah
rung: huruf-1
order: 11
status: draft
minutes: 8
title: { id: "Hamzah, ta marbuthah, alif maqshurah", en: "Hamza, ta marbuta, alif maqsura", ar: "أَ إِ ئِ ةُ" }
summary:
  id: "Kamu mengenali hamzah di atas tempat duduknya, ta marbuthah (ة) dan alif maqshurah (ى)."
  en: "You recognise hamza on its seats, ta marbuta (ة) and alif maqsura (ى)."
introduces: [hamza-ta-marbuta]
spiral: script
visual: { id: letter-forms, props: { letter: "ة" } }
examples:
  - ar: "أَسَدُ"
    tr: "asadu"
    id: "singa"
    en: "lion"
    note: { id: "Hamzah duduk di atas alif dan membawa fathah.", en: "The hamza sits on top of alif and carries fathah." }
  - ar: "إِبِلُ"
    tr: "ibilu"
    id: "unta (sekawanan)"
    en: "camels"
    note: { id: "Hamzah di bawah alif, karena vokalnya kasrah.", en: "The hamza goes under the alif, because its vowel is kasrah." }
  - ar: "رِئَةُ"
    tr: "riʾatu"
    id: "paru-paru"
    en: "lung"
    note: { id: "Setelah kasrah, hamzah duduk di atas gigi ya tanpa titik: ئ.", en: "After kasrah, hamza sits on a dotless ya tooth: ئ." }
  - ar: "لُغَةُ"
    tr: "lughatu"
    id: "bahasa"
    en: "language"
    note: { id: "ة di akhir kata: seperti ه dengan dua titik. Dibaca *t* kalau berharakat.", en: "ة at the end of a word: like ه with two dots. Read *t* when it carries a vowel." }
  - ar: "بَقَرَةُ"
    tr: "baqaratu"
    id: "sapi"
    en: "cow"
  - ar: "ثَمَرَةُ"
    tr: "tsamaratu"
    id: "buah"
    en: "a fruit"
pair:
  off: { ar: "بَقَرَهُ", tr: "baqarahu" }
  natural: { ar: "بَقَرَةُ", tr: "baqaratu" }
words:
  id: "Di bahasa Indonesia *logat* berarti cara bicara atau aksen daerah. Di bahasa Arab, لُغَةٌ adalah bahasa itu sendiri: bahasa Arab, bahasa Indonesia."
  en: "In Indonesian *logat* means a way of speaking or a regional accent. In Arabic, لُغَةٌ is the language itself: Arabic, Indonesian."
tirukan:
  ar: "لُغَةُ، بَقَرَةُ، ثَمَرَةُ"
  tr: "lughatu, baqaratu, tsamaratu"
  id: "bahasa, sapi, buah"
  en: "language, cow, fruit"
check:
  - id: h1-11-c1
    type: choice
    match: exact
    prompt: "Di kata رِئَةُ, hamzah duduk di mana?"
    options: ["di atas gigi ya (ئ)", "di atas alif (أ)", "di atas wau (ؤ)"]
    answer: "di atas gigi ya (ئ)"
    why: { id: "Huruf sebelumnya berkasrah, jadi hamzah duduk di atas gigi ya.", en: "The letter before has kasrah, so hamza sits on a ya tooth." }
  - id: h1-11-c2
    type: read
    match: exact
    ar: "إِبِلُ"
    options: ["ibilu", "abalu", "ubulu"]
    answer: "ibilu"
    why: { id: "Hamzah di bawah alif membawa kasrah: *i*.", en: "Hamza under the alif carries kasrah: *i*." }
  - id: h1-11-c3
    type: choice
    match: exact
    prompt: "Mana ta marbuthah?"
    options: ["ة", "ه", "ت"]
    answer: "ة"
    why: { id: "ة bentuknya seperti ه, dengan dua titik di atas.", en: "ة is shaped like ه, with two dots above." }
  - id: h1-11-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf pertama."
    ar: "لُغَةُ"
    target: 0
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *lughatu*: ل berharakat dhammah.", en: "It is read *lughatu*: ل has dhammah." }
  - id: h1-11-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *ba-qa-ra-tu*."
    letters: ["بَ", "قَ", "رَ", "ةُ"]
    distractors: ["هُ", "كَ"]
    answer: "بَقَرَةُ"
    why: { id: "Sapi diakhiri ة (ta marbuthah), bukan ه.", en: "Cow ends in ة (ta marbuta), not ه." }
  - id: h1-11-c6
    type: choice
    match: exact
    prompt: "Huruf ى (alif maqshurah) di akhir kata dibaca seperti apa?"
    options: ["*ā* panjang, seperti alif", "*y*, seperti ya", "tidak dibaca"]
    answer: "*ā* panjang, seperti alif"
    why: { id: "ى bentuknya seperti ya tanpa titik, tapi bunyinya alif panjang.", en: "ى looks like a dotless ya, but sounds like a long alif." }
glossary:
  - { ar: "لُغَةُ", tr: "lughatu", id: "bahasa", en: "language", gender: f, pos: noun }
  - { ar: "بَقَرَةُ", tr: "baqaratu", id: "sapi", en: "cow", gender: f, pos: noun }
  - { ar: "رِئَةُ", tr: "riʾatu", id: "paru-paru", en: "lung", gender: f, pos: noun }
  - { ar: "ثَمَرَةُ", tr: "tsamaratu", id: "buah", en: "a fruit", gender: f, pos: noun }
next: huruf1-12-empat-bentuk
---

## concept.id
**Hamzah** (ء) adalah hentakan kecil di tenggorokan, seperti jeda di tengah kata *sa'at*. Ia jarang berdiri sendiri. Biasanya ia duduk di atas "kursi": alif (**أ** di atas, **إ** di bawah), wau (**ؤ**), atau gigi ya tanpa titik (**ئ**). Kursinya dipilih oleh vokal di sekitarnya: kasrah memilih ya, seperti di **رِئَةُ** (paru-paru).

**Ta marbuthah** (ة) muncul di akhir kata, bentuknya seperti ه dengan dua titik. Kalau berharakat, ia dibaca *t*: **لُغَةُ** (*lughatu*). Banyak kata benda perempuan berakhiran ة.

**Alif maqshurah** (ى) seperti ya tanpa titik di akhir kata, tapi bunyinya alif panjang, seperti di nama مُنَى (*Munā*). Karena bunyinya panjang, kamu akan membacanya di Huruf 2.

## concept.en
**Hamza** (ء) is a small catch in the throat, like the break in Indonesian *sa'at*. It rarely stands alone. Usually it sits on a "seat": alif (**أ** above, **إ** below), waw (**ؤ**), or a dotless ya tooth (**ئ**). The vowels around it choose the seat: kasrah chooses ya, as in **رِئَةُ** (lung).

**Ta marbuta** (ة) appears at the end of a word, shaped like ه with two dots. When it carries a vowel, it is read *t*: **لُغَةُ** (*lughatu*). Many feminine nouns end in ة.

**Alif maqsura** (ى) looks like a dotless ya at the end of a word, but sounds like a long alif, as in the name مُنَى (*Munā*). Because the sound is long, you will read it in Huruf 2.

## contrast.id
ة dan ه mudah tertukar karena bentuknya sama. Lihat titiknya: ة punya dua titik, ه tidak. **بَقَرَةُ** (sapi) dengan ة dibaca *baqaratu*, sedangkan dengan ه terbaca *baqarahu*, dan artinya berubah.

Jangan bingung juga antara ى dan ي. Di akhir kata, ي punya dua titik di bawah dan dibaca *y* atau *ī*, sedangkan ى tanpa titik dan dibaca *ā*. Hamzah sendiri sering hilang di bahasa Indonesia, tapi di bahasa Arab ia adalah huruf penuh.

## contrast.en
ة and ه are easy to mix up because they share a shape. Look at the dots: ة has two, ه has none. **بَقَرَةُ** (cow) with ة is read *baqaratu*, while with ه it becomes *baqarahu*, and the meaning changes.

Don't mix up ى and ي either. At the end of a word, ي has two dots below and is read *y* or *ī*, while ى has no dots and is read *ā*. Hamza itself often disappears in Indonesian, but in Arabic it is a full letter.
