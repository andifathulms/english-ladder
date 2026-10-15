---
id: starter-02-alphabet
rung: starter
order: 2
status: draft
minutes: 7
title: { en: "A, B, C", id: "Mengeja nama" }
summary:
  id: "Kamu bisa mengeja namamu dan alamat email dengan nama huruf bahasa Inggris."
  en: "You can spell your name and an email address with English letter names."
introduces: [alphabet]
spiral: sounds
worked:
  - { en: "[[A]]: /eɪ/, like day", id: "Bukan /a/." }
  - { en: "[[E]]: /iː/, like see", id: "Bukan /e/." }
  - { en: "[[I]]: /aɪ/, like my", id: "Bukan /i/." }
examples:
  - { en: "My name is Rina: [[R-I-N-A]].", id: "Namaku Rina: R-I-N-A." }
  - { en: "[[G]]: /dʒiː/, like jeep.", id: "G dibaca seperti ji.", note: { id: "Di bahasa Indonesia G dibaca ge, jadi sering tertukar dengan J.", en: "In Indonesian G is read ge, so it often gets mixed up with J." } }
  - { en: "[[J]]: /dʒeɪ/, like jay.", id: "J dibaca seperti jei." }
  - { en: "[[Y]]: /waɪ/, like why.", id: "Y dibaca wai." }
  - { en: "[[W]]: double u.", id: "W dibaca dabel-yu." }
  - { en: "budi [[at]] mail dot com", id: "budi@mail.com", note: { id: "@ dibaca at, dan titik dibaca dot.", en: "@ is read at, and the full stop is read dot." } }
pair:
  off: "G, like ge."
  natural: "[[G]], like jeep."
check:
  - id: st-02-c1
    type: choice
    cue: "Huruf mana yang bunyinya seperti see?"
    prompt: "It sounds like see:"
    options: [E, I, A]
    answer: E
    why: { id: "E dibaca /iː/, seperti see.", en: "E is /iː/, like see." }
  - id: st-02-c2
    type: choice
    cue: "Huruf mana yang bunyinya seperti my?"
    prompt: "It sounds like my:"
    options: [I, E, Y]
    answer: I
    why: { id: "I dibaca /aɪ/, seperti my.", en: "I is /aɪ/, like my." }
  - id: st-02-c3
    type: choice
    cue: "Huruf mana yang bunyinya seperti jeep?"
    prompt: "It sounds like jeep:"
    options: [G, J]
    answer: G
    why: { id: "G dibaca /dʒiː/. J dibaca /dʒeɪ/.", en: "G is /dʒiː/. J is /dʒeɪ/." }
  - id: st-02-c4
    type: listen
    audio: "J"
    options: [J, G]
    answer: J
    why: { id: "J berbunyi seperti jay.", en: "J sounds like jay." }
  - id: st-02-c5
    type: gap
    cue: "Alamat email: rina@mail.com"
    prompt: "rina ___ mail dot com"
    options: [at, and, a]
    answer: at
    why: { id: "@ dibaca at.", en: "@ is read at." }
glossary:
  - { en: letter, id: "huruf" }
  - { en: spell, id: "mengeja" }
  - { en: name, id: "nama" }
  - { en: email, id: "email, surel" }
  - { en: at, id: "@ (dalam email)" }
  - { en: dot, id: "titik (dalam alamat)" }
  - { en: double, id: "dobel, ganda" }
sound:
  focus: "E · I · A"
  words: [E, I, A, G, J]
  tip: { id: "Dengarkan lima huruf yang paling sering tertukar, lalu ucapkan sendiri.", en: "Listen to the five letters that get mixed up most, then say them yourself." }
words: { id: "*Bisa dieja?* = **How do you spell it?** Pertanyaan ini sangat sering kamu dengar di telepon dan di kantor.", en: "*Bisa dieja?* = **How do you spell it?** You will hear this a lot on the phone and in offices." }
next: starter-03-numbers
---

## concept.id
Nama huruf dalam bahasa Inggris berbeda dari bahasa Indonesia. Yang paling sering tertukar: **A** /eɪ/, **E** /iː/, **I** /aɪ/, serta **G** /dʒiː/ dan **J** /dʒeɪ/. Kamu butuh ini untuk mengeja nama dan alamat email.

## concept.en
English letter names differ from Indonesian ones. The ones that get mixed up most: **A** /eɪ/, **E** /iː/, **I** /aɪ/, and **G** /dʒiː/ with **J** /dʒeɪ/. You need them to spell your name and an email address.

## contrast.id
Bahasa Indonesia membaca huruf apa adanya, jadi **E** dan **I** sering tertukar saat mengeja. Dalam email, **@** dibaca **at** dan titik dibaca **dot**: *budi at mail dot com*.

## contrast.en
Indonesian reads letters as they look, so **E** and **I** get swapped when spelling. In an email address, **@** is **at** and the full stop is **dot**: *budi at mail dot com*.
