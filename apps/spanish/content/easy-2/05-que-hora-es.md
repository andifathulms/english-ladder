---
id: easy2-05-que-hora-es
rung: easy-2
order: 5
status: draft
minutes: 8
title: { id: "Jam berapa?", en: "What time is it?", es: "¿Qué hora es?" }
summary:
  id: "*Es la una*, *son las dos*; *y media*, *y cuarto*, *menos diez*. Hati-hati: *las seis y media* itu setengah tujuh."
  en: "*Es la una*, *son las dos*; *y media*, *y cuarto*, *menos diez*. Careful: *las seis y media* is Indonesian *setengah tujuh*."
introduces: [a1-time]
spiral: present
worked:
  - { es: "Son las tres.", id: "Jam tiga." }
  - { es: "Es la una y media.", id: "Jam setengah dua." }
  - { es: "Son las seis y media.", id: "Jam setengah tujuh." }
examples:
  - { es: "[[Son las]] dos y cuarto.", id: "Jam dua lewat seperempat." }
  - { es: "[[Es la]] una en punto.", id: "Jam satu tepat." }
  - { es: "La clase es [[a las]] nueve.", id: "Kelasnya jam sembilan." }
  - { es: "La tienda está abierta [[de]] lunes a sábado.", id: "Tokonya buka Senin sampai Sabtu." }
  - { es: "Siempre almuerzo [[a la]] una.", id: "Aku selalu makan siang jam satu." }
  - { es: "Son las siete [[menos]] diez.", id: "Jam tujuh kurang sepuluh." }
pair:
  off: "Son las una."
  natural: "[[Es la]] una."
words:
  id: "*Setengah tujuh* itu 6.30, tapi *las siete y media* itu 7.30. Bahasa Spanyol menghitung dari jam yang sudah lewat: 6.30 adalah *las seis y media*."
  en: "Indonesian *setengah tujuh* is 6:30, but *las siete y media* is 7:30. Spanish counts from the hour just gone: 6:30 is *las seis y media*."
talk:
  lines:
    - { who: Diego, es: "Perdón, ¿qué hora es?", id: "Permisi, jam berapa?" }
    - { who: Siti, es: "Son las seis y media.", id: "Jam setengah tujuh." }
    - { who: Diego, es: "¡Es tarde! Gracias.", id: "Sudah telat! Makasih." }
tirukan: { es: "Son las seis y media de la tarde.", id: "Jam setengah tujuh sore." }
check:
  - id: e2-05-c1
    type: gap
    cue: "Jam satu."
    prompt: "___ la una."
    options: [Es, Son]
    answer: Es
    why: { id: "Jam satu tunggal: *es la una*. Jam lainnya *son las…*", en: "One o'clock is singular: *es la una*. The others are *son las…*" }
  - id: e2-05-c2
    type: choice
    lang: id
    prompt: "Jam 6.30 dalam bahasa Spanyol:"
    options: ["las seis y media", "las siete y media", "las seis y cuarto"]
    answer: "las seis y media"
    why: { id: "Hitung dari jam enam: *las seis y media*, walau kita bilang *setengah tujuh*.", en: "Count from six: *las seis y media*, though Indonesian says *setengah tujuh*." }
  - id: e2-05-c3
    type: gap
    cue: "Jam tiga lewat seperempat."
    prompt: "Son las tres y ___."
    options: [cuarto, media, punto]
    answer: cuarto
    why: { id: "*Y cuarto*: lewat seperempat.", en: "*Y cuarto*: quarter past." }
  - id: e2-05-c4
    type: listen
    audio: "Son las ocho menos cuarto."
    options: ["Son las ocho menos cuarto.", "Son las ocho y cuarto.", "Son las ocho y media."]
    answer: "Son las ocho menos cuarto."
    why: { id: "*Menos cuarto*: kurang seperempat (7.45).", en: "*Menos cuarto*: quarter to (7:45)." }
  - id: e2-05-c5
    type: dictation
    audio: "Es la una y media."
    answer: "Es la una y media."
    why: { id: "*Es la una y media*: jam setengah dua.", en: "*Es la una y media*: half past one." }
glossary:
  - { es: hora, id: "jam (waktu)", pos: noun, gender: f }
  - { es: minuto, id: menit, pos: noun, gender: m }
  - { es: reloj, id: "jam (alat)", pos: noun, gender: m }
  - { es: lunes, id: Senin, pos: noun, gender: m }
  - { es: martes, id: Selasa, pos: noun, gender: m }
  - { es: miércoles, id: Rabu, pos: noun, gender: m }
  - { es: jueves, id: Kamis, pos: noun, gender: m }
  - { es: viernes, id: Jumat, pos: noun, gender: m }
  - { es: mediodía, id: "tengah hari", pos: noun, gender: m }
  - { es: abierto, id: buka, pos: adj }
  - { es: cerrado, id: tutup, pos: adj }
  - { es: almorzar, id: "makan siang", pos: verb, verb: { group: ar, irregular: true } }
next: easy2-06-me-gusta
---

## concept.id
Untuk menyebut jam, pakai **ser**: **es la una**, tetapi **son las dos**, *son las tres*. Menit ditambah dengan **y** (*y cuarto*, *y media*) atau dikurangi dengan **menos** (*menos diez*). Untuk jadwal, pakai **a la / a las**: *la clase es a las nueve*.

## concept.en
To tell the time, use **ser**: **es la una**, but **son las dos**, *son las tres*. Minutes are added with **y** (*y cuarto*, *y media*) or taken away with **menos** (*menos diez*). For schedules, use **a la / a las**: *la clase es a las nueve*.

## contrast.id
Bahasa Indonesia menyebut setengah jam ke depan (*setengah tujuh* = 6.30), bahasa Spanyol ke belakang (*las seis y media*). Untuk pagi, sore dan malam, tambahkan *de la mañana*, *de la tarde*, *de la noche*.

## contrast.en
Indonesian names the half hour by the hour ahead (*setengah tujuh* = 6:30); Spanish by the hour gone (*las seis y media*). For morning, afternoon and night, add *de la mañana*, *de la tarde*, *de la noche*.
