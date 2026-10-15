---
id: easy1-04-plurals
rung: easy-1
order: 4
status: draft
minutes: 7
title: { en: "One, two, many", id: "Satu, dua, banyak" }
summary:
  id: "Kamu bisa membuat bentuk jamak, termasuk beberapa yang berubah total."
  en: "You can make plurals, including a few that change completely."
introduces: [plural-regular, plural-irregular-core]
spiral: articles
visual: { id: noun-builder, props: { initial: box, featured: [book, box, bus, city, baby, knife, child, man, person, fish] } }
examples:
  - { en: "They are [[students]].", id: "Mereka pelajar.", note: { id: "Lebih dari satu: tambah -s, tanpa a.", en: "More than one: add -s, no a." } }
  - { en: "We are [[nurses]].", id: "Kami perawat." }
  - { en: "The [[boxes]] are here.", id: "Kotak-kotaknya di sini.", note: { id: "Setelah x, tambahkan -es.", en: "After x, add -es." } }
  - { en: "The [[babies]] are hungry.", id: "Bayi-bayinya lapar.", note: { id: "Konsonan + y menjadi -ies: baby, babies.", en: "Consonant + y becomes -ies: baby, babies." } }
  - { en: "The [[children]] are here.", id: "Anak-anaknya di sini.", note: { id: "Child menjadi children. Bentuk ini harus dihafal.", en: "Child becomes children. Learn this one by heart." } }
  - { en: "The [[men]] are tired.", id: "Bapak-bapaknya capek.", note: { id: "Man menjadi men, woman menjadi women.", en: "Man becomes men, woman becomes women." } }
pair:
  off: "They are teacher."
  natural: "They are [[teachers]]."
check:
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
  - id: e1-pl-c1
    type: gap
    cue: "Bayi-bayinya lapar."
    prompt: "The ___ are hungry."
    options: [babys, babies, baby]
    answer: babies
    why: { id: "Konsonan + y menjadi -ies: babies.", en: "Consonant + y becomes -ies: babies." }
  - id: e1-pl-c2
    type: choice
    cue: "Mereka perempuan."
    prompt: "They are ___."
    options: [womans, women, woman]
    answer: women
    why: { id: "Woman menjadi women, bukan womans.", en: "Woman becomes women, not womans." }
  - id: e1-03-c6
    type: order
    cue: "Mereka anak-anak."
    tiles: [are, They, children]
    answer: [They, are, children]
    why: { id: "Child menjadi children, bukan childs.", en: "Child becomes children, not childs." }
glossary:
  - { en: book, id: "buku" }
  - { en: box, id: "kotak" }
  - { en: bus, id: "bus" }
  - { en: baby, id: "bayi" }
  - { en: child, id: "anak" }
  - { en: man, id: "laki-laki, bapak" }
  - { en: woman, id: "perempuan, ibu" }
next: easy1-04-demonstratives
---

## concept.id
Untuk lebih dari satu, kebanyakan kata benda mendapat **-s**: **book**, **books**. Setelah s, sh, ch atau x, tambahkan **-es** (**boxes**), dan konsonan + y menjadi **-ies** (**baby**, **babies**). Beberapa kata berubah total dan harus dihafal: **child**, **children**; **man**, **men**.

## concept.en
For more than one, most nouns add **-s**: **book**, **books**. After s, sh, ch or x, add **-es** (**boxes**), and consonant + y becomes **-ies** (**baby**, **babies**). A few words change completely and must be learned: **child**, **children**; **man**, **men**.

## contrast.id
Bahasa Indonesia bilang *dua buku*: setelah angka, kata bendanya tidak berubah. Bahasa Inggris selalu menandai jamak, **two books**, dan jamak tidak memakai **a**: **They are teachers**. Kata berakhiran -o berbeda-beda (**photos**, tapi **tomatoes**), jadi hafalkan satu per satu.

## contrast.en
Indonesian says *dua buku*: after a number, the noun doesn't change. English always marks the plural, **two books**, and plurals take no **a**: **They are teachers**. Words ending in -o vary (**photos**, but **tomatoes**), so learn them one at a time.
