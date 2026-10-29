---
id: easy1-06-zahlen
rung: easy-1
order: 6
status: draft
minutes: 9
title: { id: "Angka, umur, nomor telepon", en: "Numbers, age, phone numbers", de: "Zahlen" }
summary:
  id: "Hitung 0–100, sebut umurmu dengan *Ich bin … Jahre alt* dan bacakan nomor telepon angka per angka."
  en: "Count 0–100, give your age with *Ich bin … Jahre alt* and read out a phone number digit by digit."
introduces: [a1-numbers]
spiral: sounds
worked:
  - { de: "einundzwanzig", id: "dua puluh satu (satu-dan-dua puluh)" }
  - { de: "fünfundvierzig", id: "empat puluh lima (lima-dan-empat puluh)" }
  - { de: "Wie alt bist du?", id: "Umurmu berapa?" }
  - { de: "Ich bin dreiundzwanzig Jahre alt.", id: "Umurku dua puluh tiga tahun." }
examples:
  - { de: "Ich bin [[dreiundzwanzig]] Jahre alt.", id: "Umurku dua puluh tiga tahun." }
  - { de: "Wie [[alt]] bist du?", id: "Umurmu berapa?" }
  - { de: "Budi ist [[vierzig]].", id: "Budi umurnya empat puluh." }
  - { de: "Frau Becker ist [[einundsechzig]] Jahre alt.", id: "Bu Becker berumur enam puluh satu tahun." }
  - { de: "Die Nummer ist [[null]], eins, fünf, sieben.", id: "Nomornya nol, satu, lima, tujuh." }
  - { de: "Zimmer [[siebzehn]], bitte.", id: "Kamar tujuh belas, ya." }
pair:
  off: "Ich bin zwanzigdrei Jahre alt."
  natural: "Ich bin [[dreiundzwanzig]] Jahre alt."
sound:
  focus: "-zehn dan -zig"
  pairs: [["dreizehn", "dreißig"], ["sechzehn", "sechzig"], ["siebzehn", "siebzig"]]
  tip:
    id: "*-zehn* = belasan, *-zig* = puluhan. Tiga puluh ditulis *dreißig* dengan *ß*. Di telepon orang sering bilang *zwo* untuk *zwei* supaya tidak tertukar dengan *drei*."
    en: "*-zehn* = teens, *-zig* = tens. Thirty is *dreißig*, with *ß*. On the phone people often say *zwo* for *zwei* so it isn't confused with *drei*."
work:
  situation: { id: "Siti mendaftar kursus bahasa untuk Ausbildung Pflege. Petugas mengisi formulir.", en: "Siti signs up for a language course for her nursing Ausbildung. The clerk fills in a form." }
  lines:
    - { who: Herr Schmidt, de: "Wie alt sind Sie?", id: "Umur Anda berapa?" }
    - { who: Siti, de: "Ich bin achtundzwanzig Jahre alt.", id: "Umur saya dua puluh delapan tahun." }
    - { who: Herr Schmidt, de: "Gut. Und die Telefonnummer?", id: "Baik. Nomor teleponnya?" }
    - { who: Siti, de: "Null, eins, sieben, sechs, drei, vier, neun, zwei.", id: "Nol, satu, tujuh, enam, tiga, empat, sembilan, dua." }
tirukan: { de: "Ich bin dreiundzwanzig Jahre alt.", id: "Umurku dua puluh tiga tahun." }
check:
  - id: e1-06-c1
    type: listen
    audio: "Ich bin vierunddreißig Jahre alt."
    options: ["Ich bin vierunddreißig Jahre alt.", "Ich bin dreiundvierzig Jahre alt."]
    answer: "Ich bin vierunddreißig Jahre alt."
    why: { id: "Satuan dulu, puluhan belakangan: *vier-und-dreißig* = 4 + 30 = 34.", en: "Units first, tens last: *vier-und-dreißig* = 4 + 30 = 34." }
  - id: e1-06-c2
    type: choice
    prompt: "21 = ?"
    options: [einundzwanzig, zwanzigeins, zweiundzwanzig]
    answer: einundzwanzig
    why: { id: "*Ein-und-zwanzig*: satu dan dua puluh.", en: "*Ein-und-zwanzig*: one and twenty." }
  - id: e1-06-c3
    type: dictation
    audio: "sechzehn"
    answer: "sechzehn"
    why: { id: "16 = *sechzehn*: *s* dari *sechs* hilang.", en: "16 = *sechzehn*: the *s* of *sechs* drops." }
  - id: e1-06-c4
    type: gap
    cue: "Umurmu berapa?"
    prompt: "Wie ___ bist du?"
    options: [alt, viel, wo]
    answer: alt
    why: { id: "Bahasa Jerman bertanya *seberapa tua*: *Wie alt bist du?*", en: "German asks *how old*: *Wie alt bist du?*" }
  - id: e1-06-c5
    type: choice
    lang: id
    prompt: "*Dreißig* adalah …"
    options: ["30", "13", "33"]
    answer: "30"
    why: { id: "*-ßig*/*-zig* = puluhan. 13 = *dreizehn*.", en: "*-ßig*/*-zig* = tens. 13 = *dreizehn*." }
  - id: e1-06-c6
    type: fix
    cue: "Umurku 25 tahun."
    wrong: "Ich bin 25 Jahre."
    options: ["Ich bin 25 Jahre alt.", "Ich bin 25 alt Jahre."]
    answer: "Ich bin 25 Jahre alt."
    why: { id: "Umur selalu dengan *alt* di akhir: *… Jahre alt*.", en: "Age always ends with *alt*: *… Jahre alt*." }
glossary:
  - { de: Jahr, id: tahun, pos: noun, gender: n, plural: Jahre }
  - { de: Zahl, id: angka, pos: noun, gender: f, plural: Zahlen }
  - { de: Nummer, id: nomor, pos: noun, gender: f, plural: Nummern }
  - { de: Telefonnummer, id: nomor telepon, pos: noun, gender: f, plural: Telefonnummern }
  - { de: Handynummer, id: nomor HP, pos: noun, gender: f, plural: Handynummern }
  - { de: "Wie alt bist du?", id: "umurmu berapa?", pos: expr }
  - { de: "Wie alt sind Sie?", id: "umur Anda berapa?", pos: expr }
  - { de: bitte, id: "tolong; silakan", pos: interj }
next: easy1-07-ein-kein
---

## concept.id
Angka 21–99 dibaca terbalik: satuan dulu, lalu *und*, lalu puluhan: *einundzwanzig* (21), *fünfundvierzig* (45). Ditulis jadi satu kata. Umur: *Ich bin … Jahre alt.* Nomor telepon dibaca angka per angka: *null, eins, fünf …*

## concept.en
The numbers 21–99 are said backwards: the units, then *und*, then the tens: *einundzwanzig* (21), *fünfundvierzig* (45). They're written as one word. Age: *Ich bin … Jahre alt.* Phone numbers are read digit by digit: *null, eins, fünf …*

## contrast.id
Bahasa Indonesia menyebut puluhan dulu: *dua puluh satu*. Bahasa Jerman menyebut satuannya dulu, jadi dengarkan sampai akhir sebelum menulis angkanya. Untuk umur, bahasa Jerman bertanya *seberapa tua* (*Wie alt?*) dan menjawab dengan *alt*.

## contrast.en
Indonesian says the tens first: *dua puluh satu*. German says the units first, so listen to the end before writing the number down. For age, German asks *how old* (*Wie alt?*) and answers with *alt*.
