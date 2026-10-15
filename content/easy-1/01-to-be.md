---
id: easy1-01-to-be
rung: easy-1
order: 1
status: draft
minutes: 6
title: { en: "I am, you are", id: "Aku, kamu" }
summary:
  id: "Kamu bisa bilang siapa kamu dan bagaimana keadaanmu dengan am, is dan are."
  en: "You can say who you are and how you are with am, is and are."
introduces: [be-present]
spiral: be
worked:
  - { en: "I [[am]] ready.", id: "Aku siap." }
  - { en: "You [[are]] ready.", id: "Kamu siap." }
  - { en: "We [[are]] ready.", id: "Kami siap." }
  - { en: "Rina [[is]] ready.", id: "Rina siap." }
examples:
  - { en: "I [[am]] Budi.", id: "Aku Budi.", note: { id: "Am hanya dipakai dengan I.", en: "Am goes only with I." } }
  - { en: "Budi [[is]] here.", id: "Budi di sini.", note: { id: "Sebelum tempat juga butuh is: Budi di sini menjadi Budi is here.", en: "A place needs is too: Budi di sini becomes Budi is here." } }
  - { en: "Mei [[is]] five.", id: "Mei umurnya lima tahun.", note: { id: "Umur juga memakai am, is atau are.", en: "Age also takes am, is or are." } }
  - { en: "Dewi [[is]] busy.", id: "Dewi lagi sibuk.", note: { id: "Satu orang, pakai is.", en: "One person, so is." } }
  - { en: "I[['m]] tired.", id: "Aku capek.", note: { id: "I'm adalah I am yang dipendekkan. Biasa dipakai saat bicara.", en: "I'm is short for I am. Common in speech." } }
  - { en: "You[['re]] right.", id: "Kamu benar." }
pair:
  off: "I happy."
  natural: "I [[am]] happy."
check:
  - id: e1-01-c1
    type: gap
    cue: "Aku lapar."
    prompt: "I ___ hungry."
    options: [am, is, are]
    answer: am
    why: { id: "Dengan I, pakai am.", en: "With I, use am." }
  - id: e1-01-c2
    type: gap
    cue: "Kamu benar."
    prompt: "You ___ right."
    options: [am, is, are]
    answer: are
    why: { id: "Dengan you, pakai are.", en: "With you, use are." }
  - id: e1-01-c3
    type: choice
    cue: "Putu sibuk."
    prompt: "Putu ___ busy."
    options: [am, is, are]
    answer: is
    why: { id: "Satu nama orang, pakai is.", en: "One person's name takes is." }
  - id: e1-01-c4
    type: fix
    cue: "Kami siap."
    wrong: "We ready."
    options: ["We are ready.", "We is ready.", "We am ready."]
    answer: "We are ready."
    why: { id: "Bahasa Inggris butuh are di sini. We selalu dengan are.", en: "English needs are here. We always takes are." }
  - id: e1-01-c5
    type: order
    cue: "Aku capek."
    tiles: [tired, I, am]
    answer: [I, am, tired]
    accept: []
    why: { id: "Urutannya: siapa, am, lalu keadaan.", en: "The order is: who, am, then how." }
  - id: e1-01-c6
    type: listen
    audio: "I'm tired."
    options: ["I'm tired.", "I tired."]
    answer: "I'm tired."
    why: { id: "I'm terdengar pendek, tapi am-nya ada di sana.", en: "I'm sounds short, but the am is there." }
glossary:
  - { en: happy, id: "senang" }
  - { en: tired, id: "capek" }
  - { en: hungry, id: "lapar" }
  - { en: busy, id: "sibuk" }
  - { en: late, id: "telat" }
  - { en: ready, id: "siap" }
  - { en: right, id: "benar" }
  - { en: sick, id: "sakit" }
sound:
  focus: "I'm · we're"
  words: ["I'm ready.", "We're ready.", "You're right."]
  tip: { id: "Saat bicara, am dan are biasanya dipendekkan. I'm cuma satu suku kata, begitu juga we're.", en: "In speech, am and are are usually shortened. I'm is just one syllable, and so is we're." }
talk:
  - { who: Rina, en: "Hi, Budi! How are you?", id: "Hai, Budi! Apa kabar?" }
  - { who: Budi, en: "I'm fine, thanks. And you?", id: "Baik, makasih. Kamu?", note: { id: "How are you? itu sapaan, bukan pertanyaan soal kesehatan. Jawab singkat saja.", en: "How are you? is a greeting, not a health question. Keep the answer short." } }
  - { who: Rina, en: "I'm tired!", id: "Capek!" }
words: { id: "*Sakit* = **sick** (Amerika) atau **ill** (Inggris). Kalau maksudnya rasa sakit di badan, itu kata lain, **hurt**, yang datang di Easy 2.", en: "*Sakit* = **sick** (US) or **ill** (UK). For pain in your body, English uses another word, **hurt**, which comes in Easy 2." }
next: easy1-02-pronouns
---

## concept.id
Dalam bahasa Inggris, kalimat butuh kata kerja. Kalau tidak ada kata kerja lain, pakai **to be**: **am**, **is** atau **are**. Pakai **am** dengan **I**, **are** dengan **you** dan **we**, dan **is** dengan satu orang lain, misalnya **Rina**.

## concept.en
An English sentence needs a verb. When there is no other verb, use **to be**: **am**, **is** or **are**. Use **am** with **I**, **are** with **you** and **we**, and **is** with one other person, like **Rina**.

## contrast.id
Bahasa Indonesia bilang *Aku senang* tanpa kata tambahan. Bahasa Inggris tidak bisa begitu: **I happy** terdengar seperti bahasa bayi. Selalu taruh **am**, **is** atau **are** di tengah.

## contrast.en
Indonesian says *Aku senang* with no extra word. English can't: **I happy** sounds like baby talk. Always put **am**, **is** or **are** in the middle.
