---
id: easy1-02-pronouns
rung: easy-1
order: 2
status: draft
minutes: 7
title: { en: "He, she, it, they", id: "Dia itu he atau she?" }
summary:
  id: "Kamu bisa memilih he, she, it atau they, dan tidak lagi tertukar karena kata dia."
  en: "You can choose he, she, it or they, without mixing them up because of dia."
introduces: [subject-pronouns]
spiral: pronouns
worked:
  - { en: "[[He]] is tired.", id: "Dia (laki-laki) capek." }
  - { en: "[[She]] is tired.", id: "Dia (perempuan) capek." }
  - { en: "[[It]] is cold.", id: "Dingin." }
  - { en: "[[They]] are tired.", id: "Mereka capek." }
examples:
  - { en: "Budi? [[He]] is hungry.", id: "Budi? Dia lapar.", note: { id: "Budi laki-laki, jadi he.", en: "Budi is a man, so he." } }
  - { en: "Siti? [[She]] is busy.", id: "Siti? Dia lagi sibuk.", note: { id: "Siti perempuan, jadi she.", en: "Siti is a woman, so she." } }
  - { en: "Rina and Dewi? [[They]] are late.", id: "Rina dan Dewi? Mereka telat.", note: { id: "Lebih dari satu orang: they.", en: "More than one person: they." } }
  - { en: "[[It]] is hot.", id: "Panas, ya.", note: { id: "Bahasa Inggris butuh subjek, jadi untuk cuaca pakai it.", en: "English needs a subject, so weather takes it." } }
  - { en: "Yohanes? [[He]]'s right.", id: "Yohanes? Dia benar." }
  - { en: "Mei? [[She]]'s sick.", id: "Mei? Dia sakit." }
pair:
  off: "Budi? She is hungry."
  natural: "Budi? [[He]] is hungry."
check:
  - id: e1-02-c1
    type: gap
    cue: "Dewi? Dia capek."
    prompt: "Dewi? ___ is tired."
    options: [He, She, It]
    answer: She
    why: { id: "Dewi perempuan, jadi she.", en: "Dewi is a woman, so she." }
  - id: e1-02-c2
    type: choice
    cue: "Andi? Dia sibuk."
    prompt: "Andi? ___ is busy."
    options: [He, She, They]
    answer: He
    why: { id: "Andi laki-laki, jadi he.", en: "Andi is a man, so he." }
  - id: e1-02-c3
    type: gap
    cue: "Budi dan Rina? Mereka telat."
    prompt: "Budi and Rina? ___ are late."
    options: [He, She, They]
    answer: They
    why: { id: "Dua orang atau lebih: they.", en: "Two or more people: they." }
  - id: e1-02-c4
    type: fix
    cue: "Panas."
    wrong: "Is hot."
    options: ["It is hot.", "He is hot.", "Hot is."]
    answer: "It is hot."
    why: { id: "Kalimat bahasa Inggris butuh subjek. Untuk cuaca, pakai it.", en: "An English sentence needs a subject. For weather, use it." }
  - id: e1-02-c5
    type: choice
    cue: "Rina dan aku? Kami siap."
    prompt: "Rina and I? ___ are ready."
    options: [We, They, She]
    answer: We
    why: { id: "Aku dan orang lain: we. Sebut dirimu terakhir: Rina and I, bukan I and Rina.", en: "Me and someone else: we. Put yourself last: Rina and I, not I and Rina." }
  - id: e1-02-c6
    type: order
    cue: "Siti? Dia sakit."
    tiles: [sick, She, is]
    answer: [She, is, sick]
    why: { id: "Urutannya: she, is, lalu keadaannya.", en: "The order is: she, is, then how she is." }
glossary:
  - { en: he, id: "dia (laki-laki)" }
  - { en: she, id: "dia (perempuan)" }
  - { en: it, id: "dia, itu (benda, hewan, cuaca)" }
  - { en: they, id: "mereka" }
  - { en: hot, id: "panas" }
  - { en: cold, id: "dingin" }
  - { en: sad, id: "sedih" }
  - { en: sleepy, id: "ngantuk" }
next: easy1-03-articles-plurals
---

## concept.id
Bahasa Indonesia punya satu kata, *dia*, untuk laki-laki dan perempuan. Bahasa Inggris memisahkannya: **he** untuk laki-laki dan **she** untuk perempuan. **It** dipakai untuk benda, hewan dan cuaca, dan **they** untuk lebih dari satu, seperti *mereka*. Kalau kamu tidak tahu laki-laki atau perempuan, **they** juga bisa dipakai untuk satu orang.

## concept.en
Indonesian has one word, *dia*, for both men and women. English splits it: **he** for a man and **she** for a woman. **It** is for things, animals and the weather, and **they** is for more than one, like *mereka*. When you don't know if it's a man or a woman, **they** also works for one person.

## contrast.id
Karena *dia* mencakup keduanya, **he** dan **she** gampang tertukar, apalagi saat bicara cepat. Sebelum bicara, cek dulu: laki-laki atau perempuan? Satu lagi: bahasa Inggris selalu butuh subjek, jadi *Panas* menjadi **It is hot**, bukan **Is hot**.

## contrast.en
Because *dia* covers both, **he** and **she** are easy to swap, especially when speaking fast. Before you speak, check: a man or a woman? One more thing: English always needs a subject, so *Panas* becomes **It is hot**, not **Is hot**.
