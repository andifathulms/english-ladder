---
id: easy1-05-have-has
rung: easy-1
order: 7
status: draft
minutes: 7
title: { en: "Have and has", id: "Punya" }
summary:
  id: "Kamu bisa bilang apa yang kamu dan orang lain punya, dengan have dan has."
  en: "You can say what you and other people have, with have and has."
introduces: [have-present]
spiral: have
worked:
  - { en: "I [[have]] a motorbike.", id: "Aku punya motor." }
  - { en: "You [[have]] a motorbike.", id: "Kamu punya motor." }
  - { en: "She [[has]] a motorbike.", id: "Dia punya motor." }
  - { en: "They [[have]] two motorbikes.", id: "Mereka punya dua motor." }
examples:
  - { en: "I [[have]] two sisters.", id: "Aku punya dua saudara perempuan.", note: { id: "Sister bisa kakak atau adik perempuan. Bahasa Inggris tidak menyebut umur kecuali kamu menambahkannya.", en: "Sister can be older or younger. English only says which if you add a word for it." } }
  - { en: "Budi [[has]] a cat.", id: "Budi punya kucing.", note: { id: "Satu nama orang: has.", en: "One person's name: has." } }
  - { en: "We [[have]] a rice cooker.", id: "Kami punya magic com.", note: { id: "Di Inggris sering terdengar I've got. Artinya sama dengan I have.", en: "In the UK you will often hear I've got. It means the same as I have." } }
  - { en: "She [[has]] an umbrella.", id: "Dia punya payung." }
  - { en: "They [[have]] three children.", id: "Mereka punya tiga anak." }
  - { en: "It [[has]] four legs.", id: "Kakinya empat.", note: { id: "It juga memakai has.", en: "It takes has too." } }
pair:
  off: "She have a cat."
  natural: "She [[has]] a cat."
check:
  - id: e1-05-c1
    type: gap
    cue: "Aku punya motor."
    prompt: "I ___ a motorbike."
    options: [have, has]
    answer: have
    why: { id: "Dengan I, pakai have.", en: "With I, use have." }
  - id: e1-05-c2
    type: gap
    cue: "Rina punya dua kucing."
    prompt: "Rina ___ two cats."
    options: [have, has]
    answer: has
    why: { id: "Satu orang (he, she atau satu nama): has.", en: "One person (he, she or one name): has." }
  - id: e1-05-c3
    type: choice
    cue: "Mereka punya magic com."
    prompt: "They ___ a rice cooker."
    options: [have, has]
    answer: have
    why: { id: "Dengan they, pakai have.", en: "With they, use have." }
  - id: e1-05-c4
    type: fix
    cue: "Dia punya payung."
    wrong: "He have an umbrella."
    options: ["He has an umbrella.", "He has a umbrella.", "He is have an umbrella."]
    answer: "He has an umbrella."
    why: { id: "He memakai has, dan umbrella memakai an.", en: "He takes has, and umbrella takes an." }
  - id: e1-05-c5
    type: gap
    cue: "Kakinya empat."
    prompt: "It ___ four legs."
    options: [have, has]
    answer: has
    why: { id: "It sama seperti he dan she: has.", en: "It works like he and she: has." }
  - id: e1-05-c6
    type: order
    cue: "Kami punya tiga anak."
    tiles: [three, have, We, children]
    answer: [We, have, three, children]
    why: { id: "We, have, lalu apa yang dipunya.", en: "We, have, then what we have." }
glossary:
  - { en: have, id: "punya" }
  - { en: has, id: "punya (he, she, it)" }
  - { en: cat, id: "kucing" }
  - { en: sister, id: "saudara perempuan" }
  - { en: brother, id: "saudara laki-laki" }
  - { en: rice cooker, id: "magic com" }
  - { en: leg, id: "kaki" }
  - { en: three, id: "tiga" }
  - { en: four, id: "empat" }
sound:
  focus: "/v/ · /z/"
  words: [have, has, "I have a question."]
  tip: { id: "Have diakhiri /v/, bukan /f/: bibir bawah menyentuh gigi atas, lalu bersuara. Has diakhiri /z/.", en: "Have ends in /v/, not /f/: lower lip on your top teeth, with voice. Has ends in /z/." }
talk:
  - { who: Rina, en: "I have a question.", id: "Aku mau tanya." }
  - { who: Bu Siti, en: "OK, Rina.", id: "Iya, Rina." }
words: { id: "*Kaki* = **leg** dan **foot**; *tangan* = **arm** dan **hand**. Dan *kakak* atau *adik* menjadi **older** atau **younger sister** atau **brother**.", en: "*Kaki* = **leg** and **foot**; *tangan* = **arm** and **hand**. And *kakak* or *adik* become **older** or **younger sister** or **brother**." }
next: easy1-06-possessives
---

## concept.id
Untuk bilang *punya*, pakai **have**. Dengan **he**, **she**, **it** atau satu nama orang, **have** berubah menjadi **has**. Jadi **I have a cat**, tapi **Budi has a cat**.

## concept.en
To say *punya*, use **have**. With **he**, **she**, **it** or one person's name, **have** becomes **has**. So **I have a cat**, but **Budi has a cat**.

## contrast.id
*Punya* tidak pernah berubah, jadi **She have** terasa wajar bagi penutur bahasa Indonesia. Bagi penutur bahasa Inggris, itu langsung terdengar salah. Ingat polanya: **he**, **she**, **it**, lalu **has**.

## contrast.en
*Punya* never changes, so **She have** feels natural to Indonesian speakers. To English speakers it sounds wrong straight away. Remember the pattern: **he**, **she**, **it**, then **has**.
