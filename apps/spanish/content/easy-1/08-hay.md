---
id: easy1-08-hay
rung: easy-1
order: 8
status: draft
minutes: 8
title: { id: "Ada: hay", en: "There is, there are: hay", es: "Hay un parque" }
summary:
  id: "*Hay* untuk 'ada' sesuatu, satu atau banyak: *hay un parque*, *hay dos mercados*."
  en: "*Hay* for 'there is' or 'there are': *hay un parque*, *hay dos mercados*."
introduces: [a1-hay]
spiral: ser-estar
worked:
  - { es: "Hay un libro en la mesa.", id: "Ada buku di atas meja." }
  - { es: "Hay tres parques en la ciudad.", id: "Ada tiga taman di kota." }
  - { es: "El libro está en la mesa.", id: "Bukunya di atas meja." }
examples:
  - { es: "[[Hay]] un libro en la mesa.", id: "Ada buku di atas meja." }
  - { es: "¿[[Hay]] un banco cerca?", id: "Ada bank di dekat sini?" }
  - { es: "Hay [[dos]] parques en la ciudad.", id: "Ada dua taman di kota ini." }
  - { es: "No [[hay]] agua.", id: "Tidak ada air." }
  - { es: "En la escuela hay [[muchos]] estudiantes.", id: "Di sekolah ada banyak murid." }
  - { es: "[[Hay]] una mezquita en la calle.", id: "Ada masjid di jalan itu." }
pair:
  off: "Está un libro en la mesa."
  natural: "[[Hay]] un libro en la mesa."
words:
  id: "*Mercado* adalah *pasar*, tapi kata kerja *pasar* dalam bahasa Spanyol artinya 'lewat'."
  en: "*Mercado* is a market (Indonesian *pasar*), but the Spanish verb *pasar* means 'to pass'."
  bridges: [pasar]
talk:
  lines:
    - { who: Putu, es: "Perdón, ¿hay un banco cerca?", id: "Permisi, ada bank di dekat sini?" }
    - { who: María, es: "Sí, hay un banco en la calle Lima.", id: "Ada, di Jalan Lima." }
    - { who: Putu, es: "¿Y hay un mercado?", id: "Kalau pasar?" }
    - { who: María, es: "No, no hay mercado aquí.", id: "Tidak, di sini tidak ada pasar." }
tirukan: { es: "¿Hay un banco cerca?", id: "Ada bank di dekat sini?" }
check:
  - id: e1-08-c1
    type: gap
    cue: "Ada taman di dekat sini."
    prompt: "___ un parque cerca."
    options: [Hay, Está]
    answer: Hay
    why: { id: "Sesuatu yang baru disebut: *hay*.", en: "Something mentioned for the first time: *hay*." }
  - id: e1-08-c2
    type: gap
    cue: "Tamannya di dekat sini."
    prompt: "El parque ___ cerca."
    options: [está, hay]
    answer: está
    why: { id: "*El parque* sudah tertentu: *está*.", en: "*El parque* is a known one: *está*." }
  - id: e1-08-c3
    type: gap
    cue: "Di kota ada banyak pasar."
    prompt: "En la ciudad hay ___ mercados."
    options: [muchos, mucho]
    answer: muchos
    why: { id: "*Mercados* maskulin jamak: *muchos*.", en: "*Mercados* is masculine plural: *muchos*." }
  - id: e1-08-c4
    type: dictation
    audio: "Hay una mezquita aquí."
    answer: "Hay una mezquita aquí."
    why: { id: "*H* di *hay* tidak dibaca: *ai*.", en: "The *h* in *hay* is silent: *ai*." }
  - id: e1-08-c5
    type: listen
    audio: "No hay agua."
    options: ["No hay agua.", "No hay café."]
    answer: "No hay agua."
    why: { id: "*Agua* = air.", en: "*Agua* = water." }
glossary:
  - { es: banco, id: bank, pos: noun, gender: m }
  - { es: parque, id: taman, pos: noun, gender: m }
  - { es: calle, id: jalan, pos: noun, gender: f }
  - { es: mezquita, id: masjid, pos: noun, gender: f }
  - { es: mercado, id: pasar, pos: noun, gender: m }
  - { es: agua, id: air, pos: noun, gender: f, el: true }
  - { es: tienda, id: toko, pos: noun, gender: f }
  - { es: restaurante, id: restoran, pos: noun, gender: m }
  - { es: hospital, id: "rumah sakit", pos: noun, gender: m }
next: easy1-09-hablo
---

## concept.id
**Hay** berarti 'ada', untuk satu atau banyak benda: *hay un parque*, *hay dos parques*. Bentuknya tidak pernah berubah. Untuk benda yang sudah tertentu (dengan *el* atau *la*), pakai *estar*: *el parque está cerca*.

## concept.en
**Hay** means 'there is' or 'there are', for one thing or many: *hay un parque*, *hay dos parques*. It never changes. For a thing already known (with *el* or *la*), use *estar*: *el parque está cerca*.

## contrast.id
Bahasa Indonesia memakai *ada* untuk keduanya: *ada taman* dan *tamannya ada di sana*. Bahasa Spanyol memisahkan: *hay* untuk yang baru disebut, *está* untuk yang sudah dikenal.

## contrast.en
Indonesian uses *ada* for both: *ada taman* and *tamannya ada di sana*. Spanish splits them: *hay* for something new, *está* for something already known.
