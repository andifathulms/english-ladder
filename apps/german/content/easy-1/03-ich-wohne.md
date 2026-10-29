---
id: easy1-03-ich-wohne
rung: easy-1
order: 3
status: draft
minutes: 10
title: { id: "Kata kerja selalu nomor dua", en: "The verb is always second", de: "Ich wohne in Balikpapan" }
summary:
  id: "Ubah kata kerja beraturan (*ich wohne, du wohnst, er wohnt*) dan taruh kata kerja di posisi 2, juga saat kalimat dimulai dengan *heute* atau tempat."
  en: "Conjugate regular verbs (*ich wohne, du wohnst, er wohnt*) and keep the verb in position 2, also when the sentence starts with *heute* or a place."
introduces: [a1-present-regular, a1-verb-second]
spiral: word-order
visual: { id: verb-bracket, props: { verb: wohnen, subject: ich, parts: ["in Balikpapan"], modal: null, id: "Aku tinggal di Balikpapan." } }
examples:
  - { de: "Ich [[wohne]] in Balikpapan.", id: "Aku tinggal di Balikpapan." }
  - { de: "In Balikpapan [[wohne]] ich.", id: "Di Balikpapan aku tinggal.", note: { id: "Tempat maju ke depan, kata kerja tetap nomor 2, *ich* pindah ke belakangnya.", en: "The place moves to the front, the verb stays second, *ich* moves behind it." } }
  - { de: "Budi [[arbeitet]] in Hamburg.", id: "Budi kerja di Hamburg." }
  - { de: "Heute [[lerne]] ich Deutsch.", id: "Hari ini aku belajar bahasa Jerman." }
  - { de: "Du [[arbeitest]] viel.", id: "Kamu banyak kerja.", note: { id: "Akar kata berakhir *-t*: tambah *e*, jadi *arbeitest*, *arbeitet*.", en: "The stem ends in *-t*: add *e*, so *arbeitest*, *arbeitet*." } }
  - { de: "Wir [[kochen]] heute zusammen.", id: "Hari ini kita masak bareng." }
pair:
  off: "Heute ich lerne Deutsch."
  natural: "Heute [[lerne]] ich Deutsch."
sound:
  focus: "w"
  words: ["wohnen", "wir wohnen", "Ich wohne in Balikpapan."]
  tip:
    id: "*W* dalam bahasa Jerman dibaca seperti *v*/*f* lembut: gigi atas menyentuh bibir bawah. *Wohnen* bukan *uonen*."
    en: "German *w* sounds like English *v*: upper teeth on the lower lip. *Wohnen* is not *wonen*."
talk:
  lines:
    - { who: Mei, de: "Ich lerne jetzt Deutsch.", id: "Sekarang aku belajar bahasa Jerman." }
    - { who: Putu, de: "Ich auch! Heute lernen wir zusammen.", id: "Aku juga! Hari ini kita belajar bareng, ya." }
    - { who: Mei, de: "Gut! Ich mache Kaffee.", id: "Oke! Aku bikin kopi." }
tirukan: { de: "Heute lerne ich Deutsch.", id: "Hari ini aku belajar bahasa Jerman." }
check:
  - id: e1-03-c1
    type: wordorder
    cue: "Hari ini aku kerja di Bandung."
    tiles: [ich, arbeite, Heute, in Bandung]
    answer: [Heute, arbeite, ich, in Bandung]
    zones: [p1, verb, middle, middle]
    why: { id: "Kata kerja di posisi 2. Kalau *Heute* di depan, *ich* pindah ke belakang kata kerja.", en: "The verb is in position 2. With *Heute* in front, *ich* moves behind the verb." }
  - id: e1-03-c2
    type: form
    cue: "Kamu kerja di Berlin."
    base: arbeiten
    target: { person: du, tense: praesens }
    frame: "Du ___ in Berlin."
    options: [arbeitest, arbeitst, arbeiten]
    answer: arbeitest
    why: { id: "*Arbeit-* berakhir *-t*, jadi ada *e* sebelum *-st*: *arbeitest*.", en: "*Arbeit-* ends in *-t*, so an *e* goes before *-st*: *arbeitest*." }
  - id: e1-03-c3
    type: conjugate
    verb: wohnen
    tense: praesens
    persons: [ich, du, er, wir]
    answers: { ich: wohne, du: wohnst, er: wohnt, wir: wohnen }
    why: { id: "Akhirannya: *-e, -st, -t, -en*.", en: "The endings: *-e, -st, -t, -en*." }
  - id: e1-03-c4
    type: fix
    cue: "Hari ini aku masak nasi."
    wrong: "Heute ich koche Reis."
    options: ["Heute koche ich Reis.", "Heute ich kochen Reis."]
    answer: "Heute koche ich Reis."
    why: { id: "Setelah *Heute*, kata kerja langsung menyusul, baru *ich*.", en: "After *Heute*, the verb comes next, then *ich*." }
  - id: e1-03-c5
    type: gap
    cue: "Lena belajar bahasa Indonesia."
    prompt: "Lena ___ Indonesisch."
    options: [lernt, lerne, lernst]
    answer: lernt
    why: { id: "*Lena* = *sie*: akhiran *-t*.", en: "*Lena* = *sie*: the ending *-t*." }
  - id: e1-03-c6
    type: listen
    audio: "Wir spielen heute Fußball."
    options: ["Wir spielen heute Fußball.", "Wir spielen hier Fußball."]
    answer: "Wir spielen heute Fußball."
    why: { id: "*Heute* = hari ini; *hier* = di sini.", en: "*Heute* = today; *hier* = here." }
glossary:
  - { de: wohnen, id: tinggal, pos: verb, verb: { aux: haben, partizip: gewohnt } }
  - { de: arbeiten, id: bekerja, pos: verb, verb: { aux: haben, partizip: gearbeitet } }
  - { de: lernen, id: belajar, pos: verb, verb: { aux: haben, partizip: gelernt } }
  - { de: machen, id: "membuat; melakukan", pos: verb, verb: { aux: haben, partizip: gemacht } }
  - { de: kochen, id: memasak, pos: verb, verb: { aux: haben, partizip: gekocht } }
  - { de: spielen, id: bermain, pos: verb, verb: { aux: haben, partizip: gespielt } }
  - { de: hören, id: mendengar, pos: verb, verb: { aux: haben, partizip: gehört } }
  - { de: heute, id: hari ini, pos: adv }
  - { de: viel, id: banyak, pos: adv }
  - { de: zusammen, id: bersama, pos: adv }
  - { de: Fußball, id: sepak bola, pos: noun, gender: m, plural: Fußbälle }
  - { de: Musik, id: musik, pos: noun, gender: f, plural: "—" }
next: easy1-04-fragen
---

## concept.id
Kata kerja beraturan: buang *-en*, lalu tambah akhiran: *ich wohn**e**, du wohn**st**, er/sie wohn**t**, wir wohn**en**, ihr wohn**t**, sie/Sie wohn**en***. Kalau akarnya berakhir *-t* atau *-d*, tambah *e*: *du arbeit**e**st*. Aturan besarnya: dalam kalimat berita, **kata kerja selalu di posisi 2**.

## concept.en
Regular verbs: drop *-en* and add the ending: *ich wohn**e**, du wohn**st**, er/sie wohn**t**, wir wohn**en**, ihr wohn**t**, sie/Sie wohn**en***. If the stem ends in *-t* or *-d*, add an *e*: *du arbeit**e**st*. The big rule: in a statement, **the verb is always in position 2**.

## contrast.id
Bahasa Indonesia tidak mengubah kata kerja (*aku tinggal, dia tinggal*), dan *Hari ini aku kerja* terdengar biasa. Bahasa Jerman mengunci kata kerja di posisi 2. Kalau *heute* maju ke depan, subjeknya pindah: *Heute **arbeite** ich*, bukan *Heute ich arbeite*.

## contrast.en
Indonesian doesn't change the verb (*aku tinggal, dia tinggal*), and *Hari ini aku kerja* sounds normal. German locks the verb in position 2. If *heute* comes first, the subject moves: *Heute **arbeite** ich*, not *Heute ich arbeite*.
