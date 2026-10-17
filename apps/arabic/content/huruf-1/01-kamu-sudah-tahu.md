---
# Draft by Claude. Huruf rungs have no Mesir strand. No letters are taught yet in this lesson, so the
# loanwords are display_only pictures of words, and the vowel marks are shown on a dotted circle (◌َ).
id: huruf1-01-kamu-sudah-tahu
rung: huruf-1
order: 1
status: draft
minutes: 6
title: { id: "Kamu sudah tahu banyak", en: "You already know a lot", ar: "مِنَ اليَمِينِ إِلَى اليَسَارِ" }
summary:
  id: "Kamu tahu tulisan Arab dibaca dari kanan, mengenal tiga vokal pendek, dan melihat kata-kata yang sudah kamu kenal."
  en: "You know Arabic is read from the right, you know the three short vowels, and you see words you already know."
introduces: [script-direction-vowels]
spiral: script
visual: { id: harakat-builder, props: { letter: "ب", set: short } }
examples:
  - ar: "كِتَابٌ"
    tr: "kitābun"
    id: "buku (kitab)"
    en: "book"
    display_only: true
    note: { id: "Di bahasa Indonesia jadi *kitab*. Di bahasa Arab artinya buku apa saja.", en: "In Indonesian it became *kitab*. In Arabic it means any book." }
  - ar: "وَقْتٌ"
    tr: "waqtun"
    id: "waktu"
    en: "time"
    display_only: true
  - ar: "كُرْسِيٌّ"
    tr: "kursiyyun"
    id: "kursi"
    en: "chair"
    display_only: true
  - ar: "عِلْمٌ"
    tr: "ʿilmun"
    id: "ilmu"
    en: "knowledge"
    display_only: true
  - ar: "صَبْرٌ"
    tr: "ṣabrun"
    id: "sabar"
    en: "patience"
    display_only: true
  - ar: "كَلِمَةٌ"
    tr: "kalimatun"
    id: "kata (bukan kalimat)"
    en: "word (not sentence)"
    display_only: true
    note: { id: "Asal kata *kalimat*, tapi di bahasa Arab artinya satu kata saja.", en: "Where *kalimat* comes from, but in Arabic it means just one word." }
pair:
  off: { ar: "◌َ ◌ِ ◌ُ", tr: "u i a" }
  natural: { ar: "◌َ ◌ِ ◌ُ", tr: "a i u" }
words:
  id: "Di bahasa Indonesia *kalimat* berarti satu kalimat utuh. Di bahasa Arab, كَلِمَةٌ hanya satu kata. Kalimat dalam bahasa Arab disebut جُمْلَةٌ."
  en: "In Indonesian *kalimat* means a whole sentence. In Arabic, كَلِمَةٌ is just one word. A sentence in Arabic is جُمْلَةٌ."
tirukan:
  ar: "◌َ ◌ِ ◌ُ"
  tr: "a i u"
  id: "a, i, u: fathah, kasrah, dhammah"
  en: "a, i, u: fathah, kasrah, dhammah"
check:
  - id: h1-01-c1
    type: choice
    match: exact
    prompt: "Tulisan Arab dibaca dari arah mana?"
    options: ["Dari kanan ke kiri", "Dari kiri ke kanan"]
    answer: "Dari kanan ke kiri"
    why: { id: "Arab dimulai dari kanan, kebalikan dari tulisan Latin.", en: "Arabic starts on the right, the opposite of Latin script." }
  - id: h1-01-c2
    type: choice
    match: exact
    prompt: "Garis kecil miring di atas huruf (◌َ) namanya apa?"
    options: ["fathah", "kasrah", "dhammah"]
    answer: "fathah"
    why: { id: "Fathah ada di atas huruf dan dibaca *a*.", en: "Fathah sits above the letter and is read *a*." }
  - id: h1-01-c3
    type: read
    match: exact
    prompt: "Tanda ini dibaca apa?"
    ar: "◌ِ"
    options: ["a", "i", "u"]
    answer: "i"
    why: { id: "Garis di bawah huruf adalah kasrah: *i*.", en: "The stroke below the letter is kasrah: *i*." }
  - id: h1-01-c4
    type: read
    match: exact
    prompt: "Tanda ini dibaca apa?"
    ar: "◌ُ"
    options: ["a", "i", "u"]
    answer: "u"
    why: { id: "Tanda kecil seperti wau di atas huruf adalah dhammah: *u*.", en: "The small waw-like mark above the letter is dhammah: *u*." }
  - id: h1-01-c5
    type: choice
    match: exact
    prompt: "Di bahasa Arab, *kalimah* (asal kata *kalimat*) artinya apa?"
    options: ["satu kata", "satu kalimat utuh"]
    answer: "satu kata"
    why: { id: "Kalimah adalah satu kata. Kalimat utuh namanya *jumlah*.", en: "Kalimah is one word. A whole sentence is *jumlah*." }
glossary:
  - { ar: "كِتَابٌ", tr: "kitābun", id: "buku", en: "book", gender: m, pos: noun, root: "ك-ت-ب", display_only: true }
  - { ar: "وَقْتٌ", tr: "waqtun", id: "waktu", en: "time", gender: m, pos: noun, display_only: true }
  - { ar: "كُرْسِيٌّ", tr: "kursiyyun", id: "kursi", en: "chair", gender: m, pos: noun, display_only: true }
  - { ar: "عِلْمٌ", tr: "ʿilmun", id: "ilmu", en: "knowledge", gender: m, pos: noun, display_only: true }
  - { ar: "صَبْرٌ", tr: "ṣabrun", id: "sabar, kesabaran", en: "patience", gender: m, pos: noun, display_only: true }
  - { ar: "كَلِمَةٌ", tr: "kalimatun", id: "kata", en: "word", gender: f, pos: noun, root: "ك-ل-م", display_only: true }
  - { ar: "دُنْيَا", tr: "dunyā", id: "dunia", en: "world", gender: f, pos: noun, display_only: true }
  - { ar: "فِكْرٌ", tr: "fikrun", id: "pikiran", en: "thought", gender: m, pos: noun, display_only: true }
  - { ar: "قَلْبٌ", tr: "qalbun", id: "hati (kalbu)", en: "heart", gender: m, pos: noun, display_only: true }
  - { ar: "سَلَامٌ", tr: "salāmun", id: "damai, salam", en: "peace", gender: m, pos: noun, display_only: true }
next: huruf1-02-ba-ta-tsa
---

## concept.id
Tulisan Arab dibaca dari **kanan ke kiri**. Bukunya pun dibuka dari sisi yang menurut kita "belakang". Mulai sekarang, matamu berangkat dari kanan.

Huruf Arab kebanyakan ditulis tanpa vokal. Vokalnya ditandai dengan tanda kecil yang namanya harakat. Ada tiga vokal pendek: **fathah** (garis di atas, dibaca *a*), **kasrah** (garis di bawah, dibaca *i*) dan **dhammah** (tanda seperti wau kecil di atas, dibaca *u*).

Kabar baiknya, kamu sudah kenal banyak kata Arab: *kitab*, *waktu*, *kursi*, *ilmu*, *sabar*. Di pelajaran ini kata-kata itu cukup kamu lihat seperti gambar. Mulai pelajaran 2, kamu membaca sendiri, huruf demi huruf.

## concept.en
Arabic is read from **right to left**. Books even open from what feels to us like the "back". From now on, your eyes start on the right.

Arabic letters are mostly written without vowels. The vowels are small marks called harakat. There are three short vowels: **fathah** (a stroke above, read *a*), **kasrah** (a stroke below, read *i*) and **dhammah** (a small waw-like mark above, read *u*).

The good news: you already know many Arabic words: *kitab*, *waktu*, *kursi*, *ilmu*, *sabar*. In this lesson you only look at them, like pictures. From lesson 2 you read on your own, letter by letter.

## contrast.id
Kebiasaan membaca dari kiri sangat kuat. Kalau kamu melihat tiga tanda berjejer, wajar kalau mata langsung lari ke kiri dan membaca *u i a*. Arahnya justru dari kanan: *a i u*.

Satu hal lagi: kata pinjaman sering bergeser artinya. *Kalimat* di bahasa Indonesia berarti satu kalimat utuh, sedangkan كَلِمَةٌ di bahasa Arab hanya satu kata. Bukan salah, hanya berbeda.

## contrast.en
The habit of reading from the left is strong. When you see three marks in a row, your eyes naturally jump to the left and read *u i a*. The direction is the other way: *a i u*.

One more thing: loanwords often shift in meaning. *Kalimat* in Indonesian is a whole sentence, while Arabic كَلِمَةٌ is just one word. Not wrong, just different.
