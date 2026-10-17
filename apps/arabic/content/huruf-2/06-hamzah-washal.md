---
# Draft by Claude. Hamzat wasl is written as a plain alif: with kasrah when a word starts the reading, bare when it is passed over.
id: huruf2-06-hamzah-washal
rung: huruf-2
order: 6
status: draft
minutes: 7
title: { id: "Hamzah washal: alif yang dilewati", en: "Hamzat wasl: the alif you skip", ar: "هَمْزَةُ الوَصْلِ" }
summary:
  id: "Kamu bisa membaca hamzah washal: dibaca *i* saat memulai, dan dilewati saat menyambung dari kata sebelumnya."
  en: "You can read hamzat wasl: said *i* when you start with it, and skipped when you run on from the word before."
introduces: [hamzat-wasl]
spiral: script
worked:
  - { ar: "[[اِ]]سْمٌ", tr: "[[i]]smun", id: "nama: di awal bacaan, dibaca *i*" }
  - { ar: "مَا اسْمُكَ؟", tr: "mā smuka?", id: "siapa namamu: setelah *mā*, alifnya dilewati" }
  - { ar: "[[اِ]]بْنٌ", tr: "[[i]]bnun", id: "anak laki-laki: di awal, *i*" }
  - { ar: "فِي البَيْتِ", tr: "fī l-bayti", id: "di rumah: setelah *fī*, al- jadi *l-*" }
examples:
  - ar: "[[اِ]]سْمٌ"
    tr: "[[i]]smun"
    id: "nama"
    en: "name"
    note: { id: "Tidak ada kata Arab yang dimulai huruf mati, jadi alif ini memberi *i* untuk memulai.", en: "No Arabic word starts on a closed letter, so this alif gives an *i* to start with." }
  - ar: "مَا اسْمُكَ؟"
    tr: "mā smuka?"
    id: "Siapa namamu?"
    en: "What's your name?"
    note: { id: "Sudah ada vokal dari *mā*, jadi alifnya dilewati: *mā smuka*.", en: "*Mā* already gives a vowel, so the alif is skipped: *mā smuka*." }
  - ar: "[[اِ]]سْتِرَاحَةٌ"
    tr: "[[i]]stirāḥatun"
    id: "istirahat"
    en: "a break, rest"
  - ar: "فِي البَيْتِ"
    tr: "fī l-bayti"
    id: "di rumah"
    en: "at home"
    note: { id: "Alif di ال juga hamzah washal: setelah *fī*, cukup *l-bayti*.", en: "The alif of ال is hamzat wasl too: after *fī*, just *l-bayti*." }
  - ar: "[[اِ]]مْرَأَةٌ"
    tr: "[[i]]mraʾatun"
    id: "perempuan"
    en: "woman"
pair:
  off: { ar: "مَا إِسْمُكَ؟", tr: "mā ismuka?" }
  natural: { ar: "مَا اسْمُكَ؟", tr: "mā smuka?" }
words:
  id: "*Istirahat* berasal dari اِسْتِرَاحَةٌ (*istirāḥatun*). *I-* di depannya adalah hamzah washal. Bahasa Indonesia menyimpan *i-* itu karena kata ini selalu diucapkan sendiri, di awal."
  en: "*Istirahat* (a break) comes from اِسْتِرَاحَةٌ (*istirāḥatun*). The *i-* at the front is hamzat wasl. Indonesian kept that *i-* because the word is always said on its own, at the start."
tirukan:
  ar: "مَا اسْمُكَ؟"
  tr: "mā smuka?"
  id: "Siapa namamu?"
  en: "What's your name?"
check:
  - id: h2-06-c1
    type: read
    match: exact
    ar: "مَا اسْمُكَ؟"
    options: ["mā ismuka", "mā smuka", "mā asmuka"]
    answer: "mā smuka"
    why: { id: "Setelah *mā*, hamzah washal dilewati: *mā smuka*.", en: "After *mā*, hamzat wasl is skipped: *mā smuka*." }
  - id: h2-06-c2
    type: mark
    match: exact
    prompt: "Kata ini dibaca sendiri. Vokal apa di alif?"
    ar: "اِسْمٌ"
    target: 0
    options: [kasra, fatha, damma]
    answer: kasra
    why: { id: "Di awal bacaan, hamzah washal pada kata ini dibaca *i*: *ismun*.", en: "At the start of reading, the hamzat wasl in this word is read *i*: *ismun*." }
  - id: h2-06-c3
    type: read
    match: exact
    ar: "اِبْنٌ"
    options: ["abnun", "ibnun", "ibnan"]
    answer: "ibnun"
    why: { id: "Dimulai dari alif berkasrah: *i*, lalu *bnun*.", en: "It starts from the alif with kasrah: *i*, then *bnun*." }
  - id: h2-06-c4
    type: read
    match: exact
    ar: "فِي البَيْتِ"
    options: ["fī l-bayti", "fī al-bayti", "fī l-baytun"]
    answer: "fī l-bayti"
    why: { id: "Alif ال dilewati setelah *fī*, dan setelah kata depan akhirannya *-i*.", en: "The alif of ال is skipped after *fī*, and after a preposition the ending is *-i*." }
  - id: h2-06-c5
    type: fix
    match: exact
    wrong: "مَا إِسْمُكَ؟"
    options: ["مَا اسْمُكَ؟", "مَا أَسْمُكَ؟"]
    answer: "مَا اسْمُكَ؟"
    why: { id: "Hamzah washal ditulis alif saja, tanpa kepala hamzah.", en: "Hamzat wasl is written as a plain alif, with no hamza sign." }
glossary:
  - { ar: "اِسْمٌ", tr: "ismun", id: "nama", en: "name", gender: m, pos: noun }
  - { ar: "اِبْنٌ", tr: "ibnun", id: "anak laki-laki (putra)", en: "son", gender: m, pos: noun }
  - { ar: "اِسْتِرَاحَةٌ", tr: "istirāḥatun", id: "istirahat", en: "a break, rest", gender: f, pos: noun }
  - { ar: "اِمْرَأَةٌ", tr: "imraʾatun", id: "perempuan", en: "woman", gender: f, pos: noun }
next: huruf2-07-ain-ha-kha
---

## concept.id
Bahasa Arab tidak pernah memulai kata dengan huruf mati. Kata seperti **سْمٌ** butuh bantuan, jadi ditambah alif di depan: **اِسْمٌ** (*ismun*). Alif ini namanya *hamzah washal*, hamzah penyambung. Saat kamu memulai bacaan dengannya, bacalah dengan vokal, biasanya *i*.

Tapi kalau ada kata sebelumnya yang berakhir dengan vokal, alif ini dilewati begitu saja. **مَا اسْمُكَ؟** dibaca **mā smuka**, bukan *mā ismuka*.

Alif di **ال** juga hamzah washal. Itu sebabnya **فِي البَيْتِ** dibaca **fī l-bayti**.

## concept.en
Arabic never starts a word on a closed letter. A word like **سْمٌ** needs help, so an alif is added in front: **اِسْمٌ** (*ismun*). This alif is called *hamzat wasl*, the joining hamza. When you start reading with it, you give it a vowel, usually *i*.

But if a word before it ends in a vowel, the alif is simply skipped. **مَا اسْمُكَ؟** is read **mā smuka**, not *mā ismuka*.

The alif of **ال** is hamzat wasl too. That's why **فِي البَيْتِ** is read **fī l-bayti**.

## contrast.id
Hamzah washal berbeda dengan hamzah biasa (*hamzah qatha'*), yang ditulis dengan kepala hamzah: أ atau إ. Hamzah biasa selalu dibaca, di mana pun letaknya. Hamzah washal tidak punya kepala hamzah dan hanya dibaca di awal.

Penutur Indonesia cenderung membaca setiap alif dengan jelas, seperti menulis *istirahat* lengkap. Di tengah kalimat, biarkan suaranya mengalir dari kata sebelumnya.

## contrast.en
Hamzat wasl is different from an ordinary hamza (*hamzat qat'*), which is written with the hamza sign: أ or إ. An ordinary hamza is always said, wherever it is. Hamzat wasl has no hamza sign and is only said at the start.

Indonesian speakers tend to say every alif clearly, the way *istirahat* is said in full. In the middle of a sentence, let your voice flow on from the word before.
