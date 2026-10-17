---
id: easy1-04-demonstratives
rung: easy-1
order: 5
status: draft
minutes: 8
title: { en: "This, that, these, those", id: "Ini dan itu" }
summary:
  id: "Kamu bisa menunjuk benda yang dekat atau jauh, satu atau banyak."
  en: "You can point to things near or far, one or many."
introduces: [demonstratives]
spiral: demonstratives
visual: { id: near-far, props: {} }
examples:
  - { en: "[[This]] is a motorbike.", id: "Ini motor.", note: { id: "Dekat dan satu: this.", en: "Near and one: this." } }
  - { en: "[[That]] is a mosque.", id: "Itu masjid.", note: { id: "Jauh dan satu: that.", en: "Far and one: that." } }
  - { en: "[[These]] are durians.", id: "Ini semua durian.", note: { id: "Dekat dan banyak: these, dengan are.", en: "Near and many: these, with are." } }
  - { en: "[[Those]] are umbrellas.", id: "Itu semua payung." }
  - { en: "[[This]] is Rina.", id: "Ini Rina.", note: { id: "This juga dipakai untuk memperkenalkan orang.", en: "This is also how you introduce someone." } }
  - { en: "[[That]]'s an angkot.", id: "Itu angkot.", note: { id: "That's adalah that is yang dipendekkan.", en: "That's is short for that is." } }
pair:
  off: "This books are new."
  natural: "[[These]] books are new."
check:
  - id: e1-04-c1
    type: gap
    cue: "Ini buku."
    prompt: "___ is a book."
    options: [This, These, Those]
    answer: This
    why: { id: "Dekat dan satu: this.", en: "Near and one: this." }
  - id: e1-04-c2
    type: gap
    cue: "Itu semua motor."
    prompt: "___ are motorbikes."
    options: [That, Those, This]
    answer: Those
    why: { id: "Jauh dan lebih dari satu: those.", en: "Far and more than one: those." }
  - id: e1-04-c3
    type: choice
    cue: "Ini semua payung."
    prompt: "___ are umbrellas."
    options: [These, This, That]
    answer: These
    why: { id: "Dekat dan lebih dari satu: these.", en: "Near and more than one: these." }
  - id: e1-04-c4
    type: fix
    cue: "Ini semua buku baru."
    wrong: "This books are new."
    options: ["These books are new.", "These book are new.", "This books is new."]
    answer: "These books are new."
    why: { id: "Banyak buku: these, books dan are harus cocok.", en: "Many books: these, books and are must all match." }
  - id: e1-04-c5
    type: scene
    visual: { id: near-far, props: { state: those } }
    options: ["Those are motorbikes.", "This is a book.", "These are books."]
    answer: "Those are motorbikes."
    why: { id: "Motornya jauh dan lebih dari satu: those.", en: "The motorbikes are far and more than one: those." }
  - id: e1-04-c6
    type: order
    cue: "Itu masjid."
    tiles: [is, That, a, mosque]
    answer: [That, is, a, mosque]
    why: { id: "That, is, lalu a dan bendanya.", en: "That, is, then a and the thing." }
glossary:
  - { en: this, id: "ini (satu)" }
  - { en: that, id: "itu (satu)" }
  - { en: these, id: "ini (banyak)" }
  - { en: those, id: "itu (banyak)" }
  - { en: motorbike, id: "motor" }
  - { en: mosque, id: "masjid" }
  - { en: durian, id: "durian" }
  - { en: angkot, id: "angkot" }
  - { en: new, id: "baru" }
  - { en: near, id: "dekat" }
  - { en: far, id: "jauh" }
sound:
  focus: "/ɪ/ vs /iː/"
  words: [this, these, "This is a book.", "These are books."]
  tip: { id: "This pendek dan diakhiri /s/. These panjang, /iː/, dan diakhiri /z/. Bahasa Indonesia tidak membedakan panjang vokal, jadi latih pasangan ini dengan suara keras.", en: "This is short and ends in /s/. These is long, /iː/, and ends in /z/. Indonesian has no long vowels, so practise this pair out loud." }
talk:
  - { who: Mei, en: "This one, please.", id: "Yang ini, ya." }
  - { who: Pak Andi, en: "This one? OK.", id: "Yang ini? Oke." }
words: { id: "*Yang ini* dan *yang itu* menjadi **this one** dan **that one**. Sangat berguna saat belanja.", en: "*Yang ini* and *yang itu* become **this one** and **that one**. Very useful when shopping." }
next: easy1-06-adjective-noun
---

## concept.id
Bahasa Inggris melihat dua hal sekaligus: dekat atau jauh, dan satu atau banyak. Dekat: **this** untuk satu, **these** untuk banyak. Jauh: **that** untuk satu, **those** untuk banyak, dan keduanya yang banyak memakai **are**.

## concept.en
English looks at two things at once: near or far, and one or many. Near: **this** for one, **these** for many. Far: **that** for one, **those** for many, and the plural ones take **are**.

## contrast.id
*Ini* dan *itu* tidak berubah untuk satu atau banyak, jadi penutur bahasa Indonesia sering bilang **This books** atau **these book**. Di bahasa Inggris, kata penunjuk, bendanya dan **is** atau **are** harus cocok: **These books are new**.

## contrast.en
*Ini* and *itu* don't change for one or many, so Indonesian speakers often say **This books** or **these book**. In English the pointing word, the noun and **is** or **are** must all match: **These books are new**.
