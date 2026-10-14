---
id: easy1-03-articles-plurals
rung: easy-1
order: 3
status: draft
minutes: 9
title: { en: "A, an and more than one", id: "A, an, dan jamak" }
summary:
  id: "Kamu bisa memilih a atau an dari bunyinya, dan membuat bentuk jamak."
  en: "You can choose a or an by sound, and make plurals."
introduces: [articles-a-an, plural-regular, plural-irregular-core]
spiral: articles
visual: { id: noun-builder, props: { initial: hour } }
examples:
  - { en: "She is [[a]] teacher.", id: "Dia guru.", note: { id: "Satu orang dengan pekerjaan: pakai a.", en: "One person with a job: use a." } }
  - { en: "It is [[an]] umbrella.", id: "Itu payung.", note: { id: "Umbrella diawali bunyi vokal, jadi an.", en: "Umbrella starts with a vowel sound, so an." } }
  - { en: "Andi is [[a]] university student.", id: "Andi mahasiswa.", note: { id: "University diawali bunyi /j/, seperti y. Itu bunyi konsonan, jadi a.", en: "University starts with a /j/ sound, like y. That is a consonant sound, so a." } }
  - { en: "They are [[students]].", id: "Mereka pelajar.", note: { id: "Lebih dari satu: tambah -s, tanpa a.", en: "More than one: add -s, no a." } }
  - { en: "Two [[children]] are here.", id: "Ada dua anak di sini.", note: { id: "Child menjadi children. Bentuk ini harus dihafal.", en: "Child becomes children. Learn this one by heart." } }
  - { en: "We are [[nurses]].", id: "Kami perawat." }
pair:
  off: "Rina is teacher."
  natural: "Rina is [[a]] teacher."
check:
  - id: e1-03-c1
    type: gap
    cue: "Dia dokter."
    prompt: "She is ___ doctor."
    options: [a, an]
    answer: a
    why: { id: "Doctor diawali bunyi konsonan /d/, jadi a.", en: "Doctor starts with the consonant sound /d/, so a." }
  - id: e1-03-c2
    type: gap
    cue: "Itu payung."
    prompt: "It is ___ umbrella."
    options: [a, an]
    answer: an
    why: { id: "Umbrella diawali bunyi vokal, jadi an.", en: "Umbrella starts with a vowel sound, so an." }
  - id: e1-03-c3
    type: choice
    cue: "Dia mahasiswa."
    prompt: "He is ___ university student."
    options: [a, an]
    answer: a
    why: { id: "Huruf pertamanya u, tapi bunyinya /j/. Dengarkan bunyinya: a.", en: "The first letter is u, but the sound is /j/. Listen to the sound: a." }
  - id: e1-03-c4
    type: fix
    cue: "Mereka guru."
    wrong: "They are teacher."
    options: ["They are teachers.", "They are a teacher.", "They are teacheres."]
    answer: "They are teachers."
    why: { id: "Lebih dari satu orang: teachers, tanpa a.", en: "More than one person: teachers, with no a." }
  - id: e1-03-c5
    type: choice
    cue: "Dua kotak."
    prompt: "two ___"
    options: [boxs, boxes, box]
    answer: boxes
    why: { id: "Kata yang berakhiran x mendapat -es.", en: "Words ending in x take -es." }
  - id: e1-03-c6
    type: order
    cue: "Mereka anak-anak."
    tiles: [are, They, children]
    answer: [They, are, children]
    why: { id: "Child menjadi children, bukan childs.", en: "Child becomes children, not childs." }
glossary:
  - { en: teacher, id: "guru" }
  - { en: doctor, id: "dokter" }
  - { en: student, id: "pelajar, mahasiswa" }
  - { en: nurse, id: "perawat" }
  - { en: umbrella, id: "payung" }
  - { en: hour, id: "jam" }
  - { en: university, id: "universitas" }
  - { en: child, id: "anak" }
  - { en: box, id: "kotak" }
  - { en: book, id: "buku" }
next: easy1-04-demonstratives
---

## concept.id
Untuk **satu** orang atau benda, pakai **a** atau **an**. Pilihannya ditentukan oleh **bunyi** pertama, bukan huruf: **an** sebelum bunyi vokal (**an umbrella**, **an hour**) dan **a** sebelum bunyi konsonan (**a book**, **a university**). Untuk lebih dari satu, tambahkan **-s** (**books**), **-es** setelah s, sh, ch, x atau o (**boxes**), dan hafalkan beberapa kata yang berubah total (**child**, **children**).

## concept.en
For **one** person or thing, use **a** or **an**. The choice depends on the first **sound**, not the letter: **an** before a vowel sound (**an umbrella**, **an hour**) and **a** before a consonant sound (**a book**, **a university**). For more than one, add **-s** (**books**), **-es** after s, sh, ch, x or o (**boxes**), and learn the few words that change completely (**child**, **children**).

## contrast.id
Bahasa Indonesia bilang *Dia guru* dan *dua buku* tanpa tambahan apa pun. Bahasa Inggris butuh **a** untuk satu (**She is a teacher**) dan **-s** setelah angka (**two books**). Dua pengecualian yang akan sering kamu temui: **hour** (h tidak dibunyikan) dan **university** (bunyinya /j/).

## contrast.en
Indonesian says *Dia guru* and *dua buku* with nothing extra. English needs **a** for one (**She is a teacher**) and **-s** after a number (**two books**). Two exceptions you will meet often: **hour** (the h is silent) and **university** (it starts with /j/).
