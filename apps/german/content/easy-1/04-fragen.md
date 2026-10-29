---
id: easy1-04-fragen
rung: easy-1
order: 4
status: draft
minutes: 8
title: { id: "Bertanya", en: "Asking questions", de: "Wo wohnst du?" }
summary:
  id: "Tanya dengan kata tanya (*wo, woher, was, wer, wie*) + kata kerja, atau mulai dengan kata kerja untuk pertanyaan ja/nein: *Wohnst du hier?*"
  en: "Ask with a question word (*wo, woher, was, wer, wie*) + the verb, or start with the verb for a yes/no question: *Wohnst du hier?*"
introduces: [a1-questions]
spiral: word-order
worked:
  - { de: "Du wohnst in Bandung.", id: "Kamu tinggal di Bandung." }
  - { de: "Wohnst du in Bandung?", id: "Kamu tinggal di Bandung?" }
  - { de: "Wo wohnst du?", id: "Kamu tinggal di mana?" }
examples:
  - { de: "[[Wo]] wohnst du?", id: "Kamu tinggal di mana?" }
  - { de: "[[Was]] machst du?", id: "Kamu lagi ngapain?" }
  - { de: "[[Woher]] kommen Sie?", id: "Anda dari mana?" }
  - { de: "[[Arbeitest]] du heute?", id: "Hari ini kamu kerja?" }
  - { de: "[[Sprechen]] Sie Deutsch?", id: "Anda bisa bahasa Jerman?", note: { id: "*Sprechen* sedikit tidak beraturan: *du sprichst, er spricht*.", en: "*Sprechen* is slightly irregular: *du sprichst, er spricht*." } }
  - { de: "[[Wer]] ist das?", id: "Itu siapa?" }
pair:
  off: "Wo du wohnst?"
  natural: "Wo [[wohnst]] du?"
sound:
  focus: "nada tanya"
  words: ["Wohnst du hier?", "Wo wohnst du?"]
  tip:
    id: "Pertanyaan ja/nein naik di akhir: *Wohnst du hier?* ↗. Pertanyaan dengan kata tanya biasanya turun: *Wo wohnst du?* ↘."
    en: "Yes/no questions rise at the end: *Wohnst du hier?* ↗. Questions with a question word usually fall: *Wo wohnst du?* ↘."
work:
  situation: { id: "Di klinik, Budi (peserta Ausbildung perawat) mencatat data pasien baru.", en: "At the clinic, Budi (a nursing trainee) takes a new patient's details." }
  lines:
    - { who: Budi, de: "Guten Morgen! Wie heißen Sie?", id: "Selamat pagi! Siapa nama Bapak?" }
    - { who: Herr Klein, de: "Klein. Paul Klein.", id: "Klein. Paul Klein." }
    - { who: Budi, de: "Wo wohnen Sie, Herr Klein?", id: "Bapak tinggal di mana, Pak Klein?" }
    - { who: Herr Klein, de: "Ich wohne hier in Köln.", id: "Saya tinggal di sini, di Köln." }
talk:
  lines:
    - { who: Siti, de: "Wohnst du in Hamburg?", id: "Kamu tinggal di Hamburg?" }
    - { who: Jonas, de: "Ja. Und du? Wo wohnst du?", id: "Iya. Kamu? Kamu tinggal di mana?" }
    - { who: Siti, de: "In Berlin. Ich lerne dort Deutsch.", id: "Di Berlin. Aku belajar bahasa Jerman di sana." }
tirukan: { de: "Wo wohnst du?", id: "Kamu tinggal di mana?" }
check:
  - id: e1-04-c1
    type: order
    cue: "Kamu kerja di mana?"
    tiles: [du, arbeitest, Wo]
    answer: [Wo, arbeitest, du]
    why: { id: "Kata tanya di posisi 1, kata kerja di posisi 2, lalu subjek.", en: "The question word in position 1, the verb in position 2, then the subject." }
  - id: e1-04-c2
    type: wordorder
    cue: "Kamu belajar bahasa Jerman?"
    tiles: [Deutsch, du, Lernst]
    answer: [Lernst, du, Deutsch]
    zones: [verb, middle, middle]
    why: { id: "Pertanyaan ja/nein dimulai dengan kata kerja.", en: "A yes/no question starts with the verb." }
  - id: e1-04-c3
    type: gap
    cue: "Anda dari mana?"
    prompt: "___ kommen Sie?"
    options: [Woher, Wo, Wer]
    answer: Woher
    why: { id: "*Woher* = dari mana; *wo* = di mana; *wer* = siapa.", en: "*Woher* = where from; *wo* = where; *wer* = who." }
  - id: e1-04-c4
    type: choice
    lang: id
    prompt: "*Was machst du?* artinya …"
    options: ["Kamu lagi ngapain?", "Kamu di mana?", "Kamu siapa?"]
    answer: "Kamu lagi ngapain?"
    why: { id: "*Was* = apa; *machst* = (kamu) lakukan.", en: "*Was* = what; *machst* = (you) do." }
  - id: e1-04-c5
    type: listen
    audio: "Wohnen Sie hier?"
    options: ["Wohnen Sie hier?", "Wo wohnen Sie?"]
    answer: "Wohnen Sie hier?"
    why: { id: "Kata kerja di depan: pertanyaan ja/nein. Dengan *wo*: kamu harus menyebut tempat.", en: "The verb first: a yes/no question. With *wo*: you have to name a place." }
  - id: e1-04-c6
    type: fix
    cue: "Kamu kerja di mana?"
    wrong: "Wo du arbeitest?"
    options: ["Wo arbeitest du?", "Wo arbeitet du?"]
    answer: "Wo arbeitest du?"
    why: { id: "Setelah *wo*, kata kerja dulu, baru *du*. Dan *du* memakai *arbeitest*.", en: "After *wo*, the verb comes first, then *du*. And *du* takes *arbeitest*." }
glossary:
  - { de: wo, id: di mana, pos: adv }
  - { de: was, id: apa, pos: pron }
  - { de: wer, id: siapa, pos: pron }
  - { de: sprechen, id: berbicara, pos: verb, verb: { aux: haben, partizip: gesprochen } }
  - { de: verstehen, id: mengerti, pos: verb, verb: { aux: haben, partizip: verstanden } }
  - { de: hier, id: di sini, pos: adv }
  - { de: dort, id: di sana, pos: adv }
  - { de: "Wie bitte?", id: "maaf, apa?", pos: expr }
  - { de: Entschuldigung, id: permisi; maaf, pos: interj }
  - { de: Frage, id: pertanyaan, pos: noun, gender: f, plural: Fragen }
  - { de: Antwort, id: jawaban, pos: noun, gender: f, plural: Antworten }
next: easy1-05-der-die-das
---

## concept.id
Ada dua macam pertanyaan. Dengan kata tanya (*wo, woher, was, wer, wie*), kata tanya di posisi 1 dan kata kerja tetap di posisi 2: *Wo **wohnst** du?* Untuk pertanyaan ja/nein, kata kerja pindah ke **posisi 1**: ***Wohnst** du hier?*

## concept.en
There are two kinds of question. With a question word (*wo, woher, was, wer, wie*), the question word is in position 1 and the verb stays in position 2: *Wo **wohnst** du?* For a yes/no question, the verb moves to **position 1**: ***Wohnst** du hier?*

## contrast.id
Bahasa Indonesia cukup menaikkan nada (*Kamu tinggal di sini?*) atau menambah *apakah*. Bahasa Jerman membalik urutannya: kata kerja ke depan. Jadi *Di mana kamu tinggal?* menjadi *Wo wohnst du?*, bukan *Wo du wohnst?*

## contrast.en
Indonesian just raises the voice (*Kamu tinggal di sini?*) or adds *apakah*. German flips the order: the verb comes forward. So *Di mana kamu tinggal?* becomes *Wo wohnst du?*, not *Wo du wohnst?*
