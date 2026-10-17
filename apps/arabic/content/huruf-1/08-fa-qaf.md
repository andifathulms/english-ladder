---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-08-fa-qaf
rung: huruf-1
order: 8
status: draft
minutes: 7
title: { id: "Fa dan qaf", en: "Fa and qaf", ar: "فَ قَ" }
summary:
  id: "Kamu membaca ف dan ق, dan mengucapkan ق jauh di belakang, bukan sebagai *k*."
  en: "You read ف and ق, and say ق far back, not as *k*."
introduces: [letters-fa-qaf]
spiral: sounds
visual: { id: letter-forms, props: { letter: "ق" } }
examples:
  - ar: "فَ فِ فُ"
    tr: "fa fi fu"
    id: "latihan suku kata: fa, fi, fu"
    en: "syllable drill: fa, fi, fu"
    note: { id: "ف satu titik di atas. Bibir bawah menyentuh gigi atas: *f*, bukan *p*.", en: "ف has one dot above. The lower lip touches the upper teeth: *f*, not *p*." }
  - ar: "قَ قِ قُ"
    tr: "qa qi qu"
    id: "latihan suku kata: qa, qi, qu"
    en: "syllable drill: qa, qi, qu"
    note: { id: "ق dua titik di atas, dan di akhir kata ekornya lebih dalam dari ف.", en: "ق has two dots above, and at the end of a word its tail dips deeper than ف." }
  - ar: "فَرَسُ"
    tr: "farasu"
    id: "kuda"
    en: "horse"
  - ar: "طَبَقُ"
    tr: "ṭabaqu"
    id: "piring"
    en: "plate"
  - ar: "وَرَقُ"
    tr: "waraqu"
    id: "kertas, daun-daun"
    en: "paper, leaves"
  - ar: "سَفَرُ"
    tr: "safaru"
    id: "perjalanan"
    en: "travel, a journey"
    note: { id: "Dari akar yang sama datang *musafir* di bahasa Indonesia.", en: "Indonesian *musafir* (traveller) comes from the same root." }
pair:
  off: { ar: "وَرَكُ", tr: "waraku" }
  natural: { ar: "وَرَقُ", tr: "waraqu" }
sound:
  focus: "ق"
  compare: "ك"
  words:
    - { ar: "قَ", tr: "qa" }
    - { ar: "قِ", tr: "qi" }
    - { ar: "قُ", tr: "qu" }
    - { ar: "وَرَقُ", tr: "waraqu" }
    - { ar: "طَبَقُ", tr: "ṭabaqu" }
  tip:
    id: "Untuk ق, pangkal lidah menempel lebih jauh ke belakang daripada saat mengucapkan *k*, dekat anak tekak. Bunyinya terdengar lebih dalam dan berat."
    en: "For ق, the back of the tongue presses further back than for *k*, near the uvula. The sound is deeper and heavier."
tirukan:
  ar: "فَرَسُ، طَبَقُ، وَرَقُ"
  tr: "farasu, ṭabaqu, waraqu"
  id: "kuda, piring, kertas"
  en: "horse, plate, paper"
check:
  - id: h1-08-c1
    type: choice
    match: exact
    prompt: "Huruf mana yang titiknya dua di atas?"
    options: ["ق", "ف"]
    answer: "ق"
    why: { id: "ق dua titik di atas, ف satu titik.", en: "ق has two dots above, ف has one." }
  - id: h1-08-c2
    type: read
    match: exact
    ar: "فِ"
    options: ["fa", "fi", "fu"]
    answer: "fi"
    why: { id: "Kasrah di bawah huruf dibaca *i*: *fi*.", en: "Kasrah below the letter is read *i*: *fi*." }
  - id: h1-08-c3
    type: read
    match: exact
    ar: "طَبَقُ"
    options: ["ṭabaqu", "ṭabaku", "tabaqu"]
    answer: "ṭabaqu"
    why: { id: "Huruf terakhir bertitik dua: ق, dibaca *q*, bukan *k*.", en: "The last letter has two dots: ق, read *q*, not *k*." }
  - id: h1-08-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf terakhir."
    ar: "فَرَسُ"
    target: 2
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *farasu*: س terakhir berharakat dhammah.", en: "It is read *farasu*: the last س has dhammah." }
  - id: h1-08-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *wa-ra-qu*."
    letters: ["وَ", "رَ", "قُ"]
    distractors: ["فُ", "زَ"]
    answer: "وَرَقُ"
    why: { id: "Dari kanan: وَ, رَ, lalu قُ dengan dua titik.", en: "From the right: وَ, رَ, then قُ with two dots." }
glossary:
  - { ar: "فَرَسُ", tr: "farasu", id: "kuda", en: "horse", gender: m, pos: noun }
  - { ar: "طَبَقُ", tr: "ṭabaqu", id: "piring", en: "plate", gender: m, pos: noun }
  - { ar: "وَرَقُ", tr: "waraqu", id: "kertas, daun-daun", en: "paper, leaves", gender: m, pos: noun }
next: huruf1-09-kaf-lam
---

## concept.id
Dua huruf baru dari satu bentuk: **ف** (*fa*) dengan satu titik di atas, dan **ق** (*qaf*) dengan dua titik di atas. Di awal dan tengah kata keduanya terlihat seperti kepala bulat kecil. Di akhir kata, ekor ق lebih dalam dan bulat.

Baca dengan tiga vokal: **فَ فِ فُ**, **قَ قِ قُ**. Sekarang kamu sudah bisa membaca kata-kata sehari-hari seperti **طَبَقُ** (piring) dan **وَرَقُ** (kertas).

## concept.en
Two new letters from one shape: **ف** (*fa*) with one dot above, and **ق** (*qaf*) with two dots above. At the start and in the middle of a word both look like a small round head. At the end of a word, ق has a deeper, rounder tail.

Read them with three vowels: **فَ فِ فُ**, **قَ قِ قُ**. Now you can read everyday words like **طَبَقُ** (plate) and **وَرَقُ** (paper).

## contrast.id
Di bahasa Indonesia ق hampir selalu jadi *k*: *kursi*, *kalbu*, *kadar*. Dalam bahasa Arab, ق dan ك adalah dua huruf berbeda. **وَرَقُ** dengan ق berarti kertas, sedangkan *waraku* dengan ك terdengar aneh.

ف juga kadang jadi *p* di bahasa Indonesia, seperti *pikir* dari فِكْرٌ. Saat membaca Arab, pastikan bibir bawah menyentuh gigi atas: *f*.

## contrast.en
In Indonesian ق almost always becomes *k*: *kursi*, *kalbu*, *kadar*. In Arabic, ق and ك are two different letters. **وَرَقُ** with ق means paper, while *waraku* with ك sounds odd.

ف also sometimes becomes *p* in Indonesian, as in *pikir* from فِكْرٌ. When reading Arabic, make sure your lower lip touches your upper teeth: *f*.
