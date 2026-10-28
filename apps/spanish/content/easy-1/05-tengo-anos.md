---
id: easy1-05-tengo-anos
rung: easy-1
order: 5
status: draft
minutes: 9
title: { id: "Angka dan umur", en: "Numbers and age", es: "Tengo veinte años" }
summary:
  id: "Angka 0–100, dan umur dengan *tener*: *tengo veinticinco años*, bukan *soy*."
  en: "Numbers 0–100, and age with *tener*: *tengo veinticinco años*, not *soy*."
introduces: [a1-numbers-tener]
spiral: present
worked:
  - { es: "uno, dos, tres, cuatro, cinco", id: "satu, dua, tiga, empat, lima" }
  - { es: "diez, veinte, treinta, cuarenta, cincuenta", id: "sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh" }
  - { es: "Tengo veinticinco años.", id: "Umurku dua puluh lima tahun." }
  - { es: "¿Cuántos años tienes?", id: "Umurmu berapa?" }
examples:
  - { es: "[[Tengo]] veinticinco años.", id: "Umurku dua puluh lima tahun." }
  - { es: "¿Cuántos años [[tienes]]?", id: "Umurmu berapa?" }
  - { es: "Ana [[tiene]] treinta años.", id: "Umur Ana tiga puluh tahun." }
  - { es: "[[Tenemos]] dos perros.", id: "Kami punya dua anjing." }
  - { es: "Diego tiene un [[hermano]].", id: "Diego punya seorang saudara laki-laki." }
  - { es: "Los niños tienen [[diez]] años.", id: "Anak-anak itu berumur sepuluh tahun." }
pair:
  off: "Soy veinticinco años."
  natural: "[[Tengo]] veinticinco años."
sound:
  focus: "c dan z"
  words: ["cinco", "doce", "trece", "diez"]
  tip:
    id: "Di Amerika Latin, *c* sebelum *e*/*i* dan *z* dibaca seperti *s*: *cinco*, *diez*. Di Spanyol bunyinya seperti *th* dalam bahasa Inggris."
    en: "In Latin America, *c* before *e*/*i* and *z* sound like *s*: *cinco*, *diez*. In Spain they sound like English *th*."
spain:
  rows:
    - { latam: "¿Cuántos años tienen ustedes?", es: "¿Cuántos años tenéis vosotros?" }
  note:
    id: "Spanyol memakai *tenéis* untuk 'kalian' yang akrab; Amerika Latin *tienen*."
    en: "Spain uses *tenéis* for a friendly 'you all'; Latin America says *tienen*."
talk:
  lines:
    - { who: Siti, es: "¿Cuántos años tienes, Pablo?", id: "Umurmu berapa, Pablo?" }
    - { who: Pablo, es: "Tengo veintidós. ¿Y tú?", id: "Dua puluh dua. Kamu?" }
    - { who: Siti, es: "Tengo diecinueve años.", id: "Sembilan belas tahun." }
tirukan: { es: "Tengo veinticinco años. ¿Y tú?", id: "Umurku dua puluh lima tahun. Kamu?" }
check:
  - id: e1-05-c1
    type: gap
    cue: "Umurmu berapa?"
    prompt: "¿Cuántos años ___?"
    options: [tienes, eres]
    answer: tienes
    why: { id: "Umur memakai *tener*: *¿cuántos años tienes?*", en: "Age takes *tener*: *¿cuántos años tienes?*" }
  - id: e1-05-c2
    type: gap
    cue: "Umurku dua puluh tahun."
    prompt: "Yo ___ veinte años."
    options: [tengo, soy, tiene]
    answer: tengo
    why: { id: "*Tengo veinte años*: secara harfiah 'aku punya dua puluh tahun'.", en: "*Tengo veinte años*: literally 'I have twenty years'." }
  - id: e1-05-c3
    type: conjugate
    verb: tener
    tense: presente
    persons: [yo, tu, el]
    answers: { yo: tengo, tu: tienes, el: tiene }
    why: { id: "*Tener*: *tengo*, lalu *ie* untuk *tú* dan *él*: *tienes*, *tiene*.", en: "*Tener*: *tengo*, then *ie* for *tú* and *él*: *tienes*, *tiene*." }
  - id: e1-05-c4
    type: listen
    audio: "Tengo cuarenta años."
    options: ["Tengo cuarenta años.", "Tengo catorce años.", "Tengo cuatro años."]
    answer: "Tengo cuarenta años."
    why: { id: "*Cuarenta* = 40, *catorce* = 14, *cuatro* = 4.", en: "*Cuarenta* = 40, *catorce* = 14, *cuatro* = 4." }
  - id: e1-05-c5
    type: choice
    lang: id
    prompt: "Berapa *quince*?"
    options: ["15", "50", "5"]
    answer: "15"
    why: { id: "*Quince* = 15; *cincuenta* = 50; *cinco* = 5.", en: "*Quince* = 15; *cincuenta* = 50; *cinco* = 5." }
  - id: e1-05-c6
    type: dictation
    audio: "Tengo treinta años."
    answer: "Tengo treinta años."
    why: { id: "*Treinta* = 30, dengan *ei* seperti dalam *pantai*.", en: "*Treinta* = 30, with *ei* as in *they*." }
glossary:
  - { es: tener, id: "punya; berumur", pos: verb, verb: { group: er, irregular: true } }
  - { es: hermano, id: "saudara laki-laki", pos: noun, gender: m }
  - { es: hermana, id: "saudara perempuan", pos: noun, gender: f }
  - { es: hijo, id: "anak laki-laki", pos: noun, gender: m }
  - { es: hija, id: "anak perempuan", pos: noun, gender: f }
  - { es: niño, id: "anak laki-laki", pos: noun, gender: m }
  - { es: niña, id: "anak perempuan", pos: noun, gender: f }
  - { es: veinticinco, id: "dua puluh lima", pos: num }
  - { es: cien, id: seratus, pos: num }
next: easy1-06-estoy
---

## concept.id
Umur di bahasa Spanyol memakai **tener** (punya), bukan *ser*: *tengo veinticinco años*. Bentuknya: *tengo*, *tienes*, *tiene*, *tenemos*, *tienen*. Angka 16–29 ditulis satu kata: *dieciséis*, *veintidós*; dari 31 pakai *y*: *treinta y uno*.

## concept.en
Age in Spanish uses **tener** (to have), not *ser*: *tengo veinticinco años*. Its forms: *tengo*, *tienes*, *tiene*, *tenemos*, *tienen*. Numbers 16–29 are one word: *dieciséis*, *veintidós*; from 31 they take *y*: *treinta y uno*.

## contrast.id
Bahasa Indonesia bilang *umurku dua puluh tahun*. Bahasa Spanyol bilang 'aku punya dua puluh tahun'. *Soy veinte años* adalah kesalahan yang sering terjadi.

## contrast.en
Indonesian says *umurku dua puluh tahun* (my age is twenty). Spanish says 'I have twenty years'. *Soy veinte años* is a common slip.
