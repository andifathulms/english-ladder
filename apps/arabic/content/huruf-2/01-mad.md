---
# Draft by Claude. Lessons 1–3 come before tanwin, so words are shown as you say them when you stop (no ending).
id: huruf2-01-mad
rung: huruf-2
order: 1
status: draft
minutes: 7
title: { id: "Vokal panjang", en: "Long vowels", ar: "المَدُّ" }
summary:
  id: "Kamu bisa membaca vokal panjang: alif, ya dan waw yang memanjangkan bunyi sebelumnya."
  en: "You can read long vowels: alif, ya and waw stretching the sound before them."
introduces: [mad]
spiral: script
visual: { id: harakat-builder, props: { letter: "ب", set: full } }
examples:
  - ar: "[[بَا]]ب"
    tr: "[[bā]]b"
    id: "pintu"
    en: "door"
    note: { id: "Fathah lalu alif: *a* dibaca dua ketukan, *bā*.", en: "Fathah then alif: *a* held for two beats, *bā*." }
  - ar: "[[فِي]]ل"
    tr: "[[fī]]l"
    id: "gajah"
    en: "elephant"
    note: { id: "Kasrah lalu ya: *ī* panjang.", en: "Kasrah then ya: a long *ī*." }
  - ar: "[[نُو]]ر"
    tr: "[[nū]]r"
    id: "cahaya"
    en: "light"
    note: { id: "Dhammah lalu waw: *ū* panjang.", en: "Dhammah then waw: a long *ū*." }
  - ar: "طَ[[بِي]]ب"
    tr: "ṭa[[bī]]b"
    id: "dokter"
    en: "doctor"
  - ar: "[[سُو]]ق"
    tr: "[[sū]]q"
    id: "pasar"
    en: "market"
pair:
  off: { ar: "طَبِب", tr: "ṭabib" }
  natural: { ar: "طَبِيب", tr: "ṭabīb" }
sound:
  focus: "ا"
  words:
    - { ar: "بَ", tr: "ba" }
    - { ar: "بَا", tr: "bā" }
    - { ar: "بِ", tr: "bi" }
    - { ar: "بِي", tr: "bī" }
    - { ar: "بُ", tr: "bu" }
    - { ar: "بُو", tr: "bū" }
  tip:
    id: "Vokal panjang kira-kira dua kali vokal pendek. Ketuk meja: *ba* satu ketukan, *bā* dua ketukan."
    en: "A long vowel is about twice a short one. Tap the table: *ba* is one beat, *bā* is two."
words:
  id: "Banyak kata serapan kehilangan vokal panjangnya. *Kitab* berasal dari كِتَاب (*kitāb*), *sabun* dari صَابُون (*ṣābūn*). Di bahasa Indonesia panjang-pendek tidak mengubah arti, jadi kita tidak menulisnya. Di bahasa Arab, panjang-pendek adalah bagian dari kata."
  en: "Many loanwords lost their long vowels. *Kitab* comes from كِتَاب (*kitāb*), *sabun* (soap) from صَابُون (*ṣābūn*). In Indonesian length doesn't change meaning, so we don't write it. In Arabic, length is part of the word."
tirukan:
  ar: "بَاب، فِيل، نُور"
  tr: "bāb, fīl, nūr"
  id: "pintu, gajah, cahaya"
  en: "door, elephant, light"
check:
  - id: h2-01-c1
    type: read
    match: exact
    ar: "بَاب"
    options: ["bāb", "bab", "bāba"]
    answer: "bāb"
    why: { id: "Ada alif setelah fathah, jadi *bā* panjang.", en: "There is an alif after the fathah, so *bā* is long." }
  - id: h2-01-c2
    type: read
    match: exact
    ar: "طَبِيب"
    options: ["ṭabib", "ṭabīb", "ṭābib"]
    answer: "ṭabīb"
    why: { id: "Ya setelah kasrah memanjangkan *bi* jadi *bī*.", en: "The ya after the kasrah stretches *bi* into *bī*." }
  - id: h2-01-c3
    type: mark
    match: exact
    prompt: "Vokal apa di huruf pertama?"
    ar: "سُوق"
    target: 0
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Waw panjang selalu didahului dhammah: *sū*.", en: "A long waw always follows a dhammah: *sū*." }
  - id: h2-01-c4
    type: listen
    match: exact
    audio: "نُور"
    options: ["نَار", "نُور"]
    answer: "نُور"
    why: { id: "Kamu mendengar *ū* panjang: نُور, cahaya. نَار (*nār*) artinya api.", en: "You heard a long *ū*: نُور, light. نَار (*nār*) means fire." }
  - id: h2-01-c5
    type: choice
    match: exact
    prompt: "Mana yang dibaca *fīl*?"
    options: ["فِل", "فِيل", "فَال"]
    answer: "فِيل"
    why: { id: "*Fī* panjang ditulis dengan kasrah lalu ya.", en: "A long *fī* is written with kasrah then ya." }
  - id: h2-01-c6
    type: spell
    match: exact
    prompt: "Susun kata *bāb*."
    letters: ["بَ", "ا", "ب"]
    distractors: ["بِ", "ي"]
    answer: "بَاب"
    why: { id: "*Bā* panjang: ba dengan fathah, lalu alif, lalu ba penutup.", en: "A long *bā*: ba with fathah, then alif, then the closing ba." }
glossary:
  - { ar: "بَاب", tr: "bāb", id: "pintu", en: "door", gender: m, pos: noun, root: "ب-و-ب" }
  - { ar: "فِيل", tr: "fīl", id: "gajah", en: "elephant", gender: m, pos: noun }
  - { ar: "طَبِيب", tr: "ṭabīb", id: "dokter", en: "doctor", gender: m, pos: noun, root: "ط-ب-ب" }
  - { ar: "سُوق", tr: "sūq", id: "pasar", en: "market", pos: noun, root: "س-و-ق" }
  - { ar: "نُور", tr: "nūr", id: "cahaya", en: "light", gender: m, pos: noun, root: "ن-و-ر" }
next: huruf2-02-sukun
---

## concept.id
Di Huruf 1 setiap huruf punya satu vokal pendek: *ba*, *bi*, *bu*. Sekarang vokalnya bisa dipanjangkan. Caranya, tulis satu huruf lagi sesudahnya: **ا** (alif) setelah fathah, **ي** (ya) setelah kasrah, **و** (waw) setelah dhammah. Bunyinya jadi **bā**, **bī**, **bū**.

Huruf panjang ini tidak membawa vokal sendiri. Ia hanya menahan bunyi sebelumnya kira-kira dua ketukan. Namanya *mad*, artinya *panjang*.

Di pelajaran ini kata-katanya dibaca seperti saat kamu berhenti, tanpa akhiran: **bāb**, **fīl**. Akhiran kata kamu pelajari di pelajaran tanwin.

## concept.en
In Huruf 1 every letter had one short vowel: *ba*, *bi*, *bu*. Now the vowel can be stretched. You write one more letter after it: **ا** (alif) after fathah, **ي** (ya) after kasrah, **و** (waw) after dhammah. The sound becomes **bā**, **bī**, **bū**.

These long-vowel letters carry no vowel of their own. They just hold the sound before them for about two beats. This is called *mad*, which means *stretching*.

In this lesson words are read the way you say them when you stop, with no ending: **bāb**, **fīl**. Word endings come in the tanwin lesson.

## contrast.id
Bahasa Indonesia tidak punya vokal panjang yang mengubah arti, jadi telinga kita mudah melewatkannya. Di bahasa Arab, **ṭabīb** (dokter) dengan *bī* pendek jadi kata yang tidak ada.

Latih dengan mengetuk: satu ketukan untuk vokal pendek, dua untuk vokal panjang. Kalau kamu sudah biasa mengaji, ini sama dengan *mad thabi'i*, dua harakat.

## contrast.en
Indonesian has no long vowels that change meaning, so our ears easily skip them. In Arabic, **ṭabīb** (doctor) with a short *bi* becomes a word that doesn't exist.

Practise by tapping: one beat for a short vowel, two for a long one. If you already recite the Qur'an, this is the same as *mad thabi'i*, two counts.
