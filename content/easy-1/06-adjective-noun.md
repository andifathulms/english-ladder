---
id: easy1-06-adjective-noun
rung: easy-1
order: 6
status: draft
minutes: 7
title: { en: "A new book", id: "Buku baru" }
summary:
  id: "Kamu bisa menaruh kata sifat di tempat yang benar: sebelum bendanya."
  en: "You can put a describing word in the right place: before the thing."
introduces: [adjective-before-noun]
spiral: word-order
worked:
  - { en: "The book is [[new]].", id: "Bukunya baru." }
  - { en: "It is a [[new]] book.", id: "Itu buku baru." }
  - { en: "They are [[new]] books.", id: "Itu buku-buku baru." }
examples:
  - { en: "That is a [[big]] mosque.", id: "Itu masjid besar." }
  - { en: "That is a [[red]] angkot.", id: "Itu angkot merah." }
  - { en: "Rina is a [[good]] teacher.", id: "Rina guru yang baik.", note: { id: "Ada kata yang? Kata sifatnya tetap pindah ke depan.", en: "Even with yang, the describing word moves to the front." } }
  - { en: "These are [[old]] books.", id: "Ini buku-buku lama.", note: { id: "Kata sifat tidak pernah ditambah -s.", en: "A describing word never takes -s." } }
  - { en: "It is [[an]] old motorbike.", id: "Itu motor tua.", note: { id: "A atau an ikut bunyi kata tepat sesudahnya: old diawali vokal.", en: "A or an follows the sound of the very next word: old starts with a vowel." } }
  - { en: "It is a [[hot]] day.", id: "Hari ini panas." }
pair:
  off: "This is a book new."
  natural: "This is a [[new]] book."
check:
  - id: e1-adj-c1
    type: order
    cue: "Itu masjid besar."
    tiles: [big, That, mosque, a, is]
    answer: [That, is, a, big, mosque]
    why: { id: "Kata sifat dulu, lalu bendanya: big mosque.", en: "Describing word first, then the thing: big mosque." }
  - id: e1-adj-c2
    type: choice
    cue: "Itu motor merah."
    prompt: "That is a ___."
    options: ["red motorbike", "motorbike red", "red motorbikes"]
    answer: "red motorbike"
    why: { id: "Merah dulu, lalu motor. Satu motor: tanpa -s.", en: "Red first, then motorbike. Just one: no -s." }
  - id: e1-adj-c3
    type: fix
    cue: "Rina guru yang baik."
    wrong: "Rina is a teacher good."
    options: ["Rina is a good teacher.", "Rina is good a teacher.", "Rina is a teacher is good."]
    answer: "Rina is a good teacher."
    why: { id: "Yang baik menjadi good, dan good pindah ke depan.", en: "Yang baik becomes good, and good moves to the front." }
  - id: e1-adj-c4
    type: gap
    cue: "Ini buku-buku lama."
    prompt: "These are ___ books."
    options: [old, olds, an old]
    answer: old
    why: { id: "Hanya bendanya yang jamak: old books, bukan olds books.", en: "Only the thing is plural: old books, not olds books." }
  - id: e1-adj-c5
    type: gap
    cue: "Itu bus tua."
    prompt: "It is ___ old bus."
    options: [a, an]
    answer: an
    why: { id: "Kata sesudahnya old, diawali bunyi vokal: an.", en: "The next word is old, which starts with a vowel sound: an." }
glossary:
  - { en: big, id: "besar" }
  - { en: small, id: "kecil" }
  - { en: old, id: "tua, lama" }
  - { en: good, id: "baik, bagus" }
  - { en: red, id: "merah" }
  - { en: white, id: "putih" }
  - { en: day, id: "hari" }
next: easy1-05-have-has
---

## concept.id
Dalam bahasa Indonesia, kata sifat datang sesudah bendanya: *buku baru*. Bahasa Inggris kebalikannya: kata sifat datang **sebelum** bendanya, **a new book**. Kata sifat juga tidak pernah berubah untuk jamak: **two new books**.

## concept.en
In Indonesian the describing word comes after the thing: *buku baru*. English is the other way round: it comes **before** the thing, **a new book**. And it never changes for plurals: **two new books**.

## contrast.id
Karena urutannya terasa wajar, penutur bahasa Indonesia sering bilang **a book new**. Kalau ada *yang*, seperti *guru yang baik*, tetap pindahkan ke depan: **a good teacher**. Ingat juga: **a** atau **an** ikut kata sesudahnya, jadi **an old book** tapi **a new umbrella**.

## contrast.en
Because the order feels natural, Indonesian speakers often say **a book new**. Even with *yang*, as in *guru yang baik*, move it to the front: **a good teacher**. And **a** or **an** follows the next word, so **an old book** but **a new umbrella**.
