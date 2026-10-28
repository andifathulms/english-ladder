---
id: dasar-06-membaca
rung: dasar
order: 6
status: draft
minutes: 7
title: { id: "Membaca nyaring", en: "Reading aloud", es: "A leer" }
summary:
  id: "Bahasa Spanyol dibaca seperti ditulis. Dengan aturan bunyi dan tekanan, kamu bisa membaca papan tanda dan menu."
  en: "Spanish is read as it is written. With the sound and stress rules, you can read signs and menus."
introduces: [d-reading]
spiral: sounds
worked:
  - { es: "Salida", id: "Pintu keluar" }
  - { es: "Entrada", id: "Pintu masuk" }
  - { es: "Baños", id: "Toilet" }
  - { es: "café con leche", id: "kopi susu" }
  - { es: "el agua", id: "air" }
examples:
  - { es: "[[Salida]]", id: "pintu keluar" }
  - { es: "[[Entrada]]", id: "pintu masuk" }
  - { es: "[[Baños]]", id: toilet }
  - { es: "café con [[leche]]", id: "kopi susu" }
  - { es: "el [[menú]]", id: menu }
  - { es: "el [[agua]]", id: air }
pair:
  off: "menu"
  natural: "el [[menú]]"
sound:
  focus: "membaca nyaring"
  words: ["salida", "entrada", "leche"]
  tip:
    id: "Baca setiap huruf seperti aturannya, perhatikan suku yang ditekan, dan kamu akan dimengerti."
    en: "Read every letter by its rule, mind the stressed syllable, and you will be understood."
words:
  id: "Hati-hati: *éxito* bukan pintu keluar."
  en: "Careful: *éxito* is not an exit."
  bridges: [éxito]
tirukan: { es: "café con leche, por favor", id: "kopi susu, ya" }
check:
  - id: d-06-c1
    type: choice
    lang: id
    prompt: "Kamu mencari pintu keluar. Tanda mana yang kamu ikuti?"
    options: [Salida, Entrada, Baños]
    answer: Salida
    why: { id: "*Salida* berarti pintu keluar; *entrada* pintu masuk.", en: "*Salida* is the way out; *entrada* the way in." }
  - id: d-06-c2
    type: choice
    lang: id
    prompt: "Apa arti *éxito*?"
    options: [sukses, "pintu keluar"]
    answer: sukses
    why: { id: "*Éxito* berarti sukses. Pintu keluar adalah *salida*.", en: "*Éxito* means success. An exit is *salida*." }
  - id: d-06-c3
    type: listen
    audio: "café con leche"
    options: ["café con leche", "el agua"]
    answer: "café con leche"
    why: { id: "*Ca-FÉ con LE-che*: kopi susu.", en: "*Ca-FÉ con LE-che*: coffee with milk." }
  - id: d-06-c4
    type: stress
    word: "menú"
    syllables: [me, nu]
    stressed: 1
    needsAccent: true
    why: { id: "*Me-NÚ*: ditekan di akhir dan berakhir vokal, jadi perlu aksen.", en: "*Me-NÚ*: stressed last and ends in a vowel, so it needs an accent." }
  - id: d-06-c5
    type: choice
    lang: id
    prompt: "Di menu tertulis *agua*. Apa itu?"
    options: [air, susu, kopi]
    answer: air
    why: { id: "*Agua* berarti air. Susu adalah *leche*, kopi *café*.", en: "*Agua* is water. Milk is *leche*, coffee *café*." }
glossary:
  - { es: salida, id: "pintu keluar", pos: noun, gender: f, plural: salidas }
  - { es: entrada, id: "pintu masuk", pos: noun, gender: f, plural: entradas }
  - { es: baño, id: "kamar mandi, toilet", pos: noun, gender: m, plural: baños }
  - { es: leche, id: susu, pos: noun, gender: f }
  - { es: menú, id: menu, pos: noun, gender: m, plural: menús }
  - { es: agua, id: air, pos: noun, gender: f, el: true, plural: aguas }
  - { es: éxito, id: sukses, pos: noun, gender: m, plural: éxitos }
next: null
---

## concept.id
Bahasa Spanyol dibaca hampir persis seperti ditulis. Kalau kamu tahu bunyi tiap huruf dan aturan tekanan, kamu bisa membaca kata apa pun dengan benar, bahkan kata yang belum kamu kenal. Mulailah dari papan tanda dan menu.

## concept.en
Spanish is read almost exactly as it is written. If you know each letter's sound and the stress rule, you can read any word correctly, even one you don't know yet. Start with signs and menus.

## contrast.id
Seperti bahasa Indonesia, ejaan Spanyol sangat teratur. Yang perlu kamu tambahkan hanya beberapa huruf khusus dan tanda aksen. Satu catatan: *agua* feminin, tapi memakai *el*: *el agua*.

## contrast.en
Like Indonesian, Spanish spelling is very regular. You only add a few special letters and the accent mark. One note: *agua* is feminine but takes *el*: *el agua*.
