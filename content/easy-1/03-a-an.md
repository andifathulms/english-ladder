---
id: easy1-03-articles-plurals
rung: easy-1
order: 3
status: draft
minutes: 7
title: { en: "A or an", id: "A atau an" }
summary:
  id: "Kamu bisa memilih a atau an dari bunyi pertamanya, bukan hurufnya."
  en: "You can choose a or an by the first sound, not the letter."
introduces: [articles-a-an]
spiral: articles
visual: { id: noun-builder, props: { initial: hour, featured: [hour, university, umbrella, uniform, egg, island, motorbike, year, engineer, durian] } }
examples:
  - { en: "She is [[a]] teacher.", id: "Dia guru.", note: { id: "Satu orang dengan pekerjaan: pakai a.", en: "One person with a job: use a." } }
  - { en: "It is [[an]] umbrella.", id: "Itu payung.", note: { id: "Umbrella diawali bunyi vokal, jadi an.", en: "Umbrella starts with a vowel sound, so an." } }
  - { en: "Andi is [[a]] university student.", id: "Andi mahasiswa.", note: { id: "University diawali bunyi /j/, seperti y. Itu bunyi konsonan, jadi a.", en: "University starts with a /j/ sound, like y. That is a consonant sound, so a." } }
  - { en: "Dewi is [[an]] engineer.", id: "Dewi insinyur." }
  - { en: "Budi is [[a]] driver.", id: "Budi sopir." }
  - { en: "It is [[an]] egg.", id: "Itu telur." }
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
  - id: e1-03-c7
    type: gap
    cue: "Dewi insinyur."
    prompt: "Dewi is ___ engineer."
    options: [a, an]
    answer: an
    why: { id: "Engineer diawali bunyi vokal /e/, jadi an.", en: "Engineer starts with the vowel sound /e/, so an." }
  - id: e1-03-c8
    type: fix
    cue: "Dia sopir."
    wrong: "He is driver."
    options: ["He is a driver.", "He is an driver.", "He is driver a."]
    answer: "He is a driver."
    why: { id: "Pekerjaan butuh a atau an. Driver diawali bunyi konsonan: a driver.", en: "A job needs a or an. Driver starts with a consonant sound: a driver." }
  - id: e1-03-c9
    type: choice
    cue: "Itu telur."
    prompt: "It is ___ egg."
    options: [a, an]
    answer: an
    why: { id: "Egg diawali bunyi vokal, jadi an.", en: "Egg starts with a vowel sound, so an." }
glossary:
  - { en: teacher, id: "guru" }
  - { en: doctor, id: "dokter" }
  - { en: student, id: "pelajar, mahasiswa" }
  - { en: nurse, id: "perawat" }
  - { en: engineer, id: "insinyur" }
  - { en: driver, id: "sopir" }
  - { en: umbrella, id: "payung" }
  - { en: egg, id: "telur" }
  - { en: hour, id: "jam (60 menit)" }
  - { en: university, id: "universitas" }
next: easy1-04-plurals
---

## concept.id
Untuk **satu** orang atau benda, pakai **a** atau **an**. Pilihannya ditentukan oleh **bunyi** pertama, bukan huruf pertama: **an** sebelum bunyi vokal (**an umbrella**, **an hour**) dan **a** sebelum bunyi konsonan (**a book**, **a university**). Pekerjaan juga butuh a atau an: **She is a teacher**.

## concept.en
For **one** person or thing, use **a** or **an**. The choice depends on the first **sound**, not the first letter: **an** before a vowel sound (**an umbrella**, **an hour**) and **a** before a consonant sound (**a book**, **a university**). Jobs need a or an too: **She is a teacher**.

## contrast.id
Bahasa Indonesia bilang *Dia guru* tanpa tambahan apa pun. Bahasa Inggris butuh **a** atau **an** untuk satu orang atau benda: **She is a teacher**. Dua pengecualian yang akan sering kamu temui: **hour** (h tidak dibunyikan) dan **university** (bunyinya /j/).

## contrast.en
Indonesian says *Dia guru* with nothing extra. English needs **a** or **an** for one person or thing: **She is a teacher**. Two exceptions you will meet often: **hour** (the h is silent) and **university** (it starts with /j/).
