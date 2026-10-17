---
# Draft by Claude. Huruf rungs have no Mesir strand.
# The lam-alif ligature لا is shown in prose only: it carries a long ā (mad), which Huruf 2 teaches.
id: huruf1-09-kaf-lam
rung: huruf-1
order: 9
status: draft
minutes: 7
title: { id: "Kaf, lam dan lam-alif", en: "Kaf, lam and lam-alif", ar: "كَ لَ" }
summary:
  id: "Kamu membaca ك dan ل, dan mengenali bentuk gabungan lam-alif (لا)."
  en: "You read ك and ل, and recognise the joined lam-alif shape (لا)."
introduces: [letters-kaf-lam]
spiral: script
visual: { id: letter-forms, props: { letter: "ل" } }
examples:
  - ar: "كَ كِ كُ"
    tr: "ka ki ku"
    id: "latihan suku kata: ka, ki, ku"
    en: "syllable drill: ka, ki, ku"
    note: { id: "ك di akhir kata punya tanda kecil di dalamnya.", en: "At the end of a word ك has a small mark inside it." }
  - ar: "لَ لِ لُ"
    tr: "la li lu"
    id: "latihan suku kata: la, li, lu"
    en: "syllable drill: la, li, lu"
  - ar: "جَبَلُ"
    tr: "jabalu"
    id: "gunung"
    en: "mountain"
  - ar: "وَلَدُ"
    tr: "waladu"
    id: "anak laki-laki"
    en: "boy"
  - ar: "عَسَلُ"
    tr: "ʿasalu"
    id: "madu"
    en: "honey"
  - ar: "لَبَنُ"
    tr: "labanu"
    id: "susu"
    en: "milk"
    note: { id: "ل di awal kata: tiang tinggi yang menyambung ke kiri.", en: "ل at the start of a word: a tall upright that joins to the left." }
pair:
  off: { ar: "أَسَلُ", tr: "asalu" }
  natural: { ar: "عَسَلُ", tr: "ʿasalu" }
tirukan:
  ar: "جَبَلُ، وَلَدُ، لَبَنُ"
  tr: "jabalu, waladu, labanu"
  id: "gunung, anak laki-laki, susu"
  en: "mountain, boy, milk"
check:
  - id: h1-09-c1
    type: read
    match: exact
    ar: "كُ"
    options: ["ka", "ki", "ku"]
    answer: "ku"
    why: { id: "Dhammah di atas huruf dibaca *u*: *ku*.", en: "Dhammah above the letter is read *u*: *ku*." }
  - id: h1-09-c2
    type: read
    match: exact
    ar: "لَبَنُ"
    options: ["labanu", "lubanu", "labinu"]
    answer: "labanu"
    why: { id: "Dua huruf pertama berfathah, yang terakhir berdhammah: *labanu*.", en: "The first two letters have fathah, the last has dhammah: *labanu*." }
  - id: h1-09-c3
    type: choice
    match: exact
    prompt: "Bentuk gabungan lam-alif terbuat dari dua huruf apa?"
    options: ["lam dan alif", "kaf dan alif", "lam dan wau"]
    answer: "lam dan alif"
    why: { id: "Lam dan alif yang bertemu ditulis jadi satu bentuk khusus.", en: "When lam and alif meet, they are written as one special shape." }
  - id: h1-09-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf kedua."
    ar: "كَتِفُ"
    target: 1
    options: [fatha, kasra, damma]
    answer: kasra
    why: { id: "Dibaca *katifu* (bahu): ت berharakat kasrah.", en: "It is read *katifu* (shoulder): ت has kasrah." }
  - id: h1-09-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *ja-ba-lu*."
    letters: ["جَ", "بَ", "لُ"]
    distractors: ["حَ", "كُ"]
    answer: "جَبَلُ"
    why: { id: "Dari kanan: جَ, بَ, lalu لُ di akhir.", en: "From the right: جَ, بَ, then لُ at the end." }
  - id: h1-09-c6
    type: choice
    match: exact
    prompt: "Mana yang dibaca *waladu*?"
    options: ["وَلَدُ", "وَلِدُ", "وُلَدُ"]
    answer: "وَلَدُ"
    why: { id: "*Wa-la-du*: fathah, fathah, dhammah.", en: "*Wa-la-du*: fathah, fathah, dhammah." }
glossary:
  - { ar: "جَبَلُ", tr: "jabalu", id: "gunung", en: "mountain", gender: m, pos: noun }
  - { ar: "وَلَدُ", tr: "waladu", id: "anak laki-laki", en: "boy", gender: m, pos: noun, root: "و-ل-د" }
  - { ar: "عَسَلُ", tr: "ʿasalu", id: "madu", en: "honey", gender: m, pos: noun }
  - { ar: "لَبَنُ", tr: "labanu", id: "susu", en: "milk", gender: m, pos: noun }
next: huruf1-10-mim-ha
---

## concept.id
**ك** (*kaf*) dan **ل** (*lam*) sama-sama punya tiang tinggi. ك punya "atap" miring di atasnya, dan di akhir kata ada tanda kecil di dalamnya. ل seperti kail tinggi tanpa atap. Baca: **كَ كِ كُ**, **لَ لِ لُ**.

Ada satu bentuk khusus yang perlu kamu kenali. Kalau ل bertemu ا, keduanya tidak ditulis berdampingan biasa, melainkan bergabung jadi satu bentuk seperti huruf V: **لا**. Di pelajaran ini cukup kenali bentuknya. Bunyinya, *lā* dengan vokal panjang, akan kamu baca di Huruf 2.

## concept.en
**ك** (*kaf*) and **ل** (*lam*) both have a tall upright. ك has a slanted "roof" on top, and at the end of a word a small mark inside it. ل is a tall hook with no roof. Read: **كَ كِ كُ**, **لَ لِ لُ**.

There is one special shape to recognise. When ل meets ا, they are not written side by side as usual; they merge into one shape like a letter V: **لا**. In this lesson, just recognise the shape. Its sound, *lā* with a long vowel, comes in Huruf 2.

## contrast.id
ك dan ل mudah diucapkan oleh penutur bahasa Indonesia. Tantangannya ada di mata: tiang ك dan ل bisa tertukar dengan alif. Ingat, alif tidak pernah menyambung ke kiri, sedangkan ك dan ل selalu menyambung.

Satu lagi untuk telinga: **عَسَلُ** (madu) dimulai dengan ع. Tanpa ع ia terdengar seperti *asal* di bahasa Indonesia, kata yang sama sekali lain.

## contrast.en
ك and ل are easy for Indonesian speakers to say. The challenge is for the eyes: the uprights of ك and ل can be mistaken for alif. Remember, alif never joins to the left, while ك and ل always do.

One more for the ear: **عَسَلُ** (honey) starts with ع. Without the ع it sounds like Indonesian *asal* (origin), a completely different word.
