---
id: easy1-12-donde-esta
rung: easy-1
order: 12
status: draft
minutes: 9
title: { id: "Di mana letaknya?", en: "Where things are", es: "¿Dónde está?" }
summary:
  id: "*En*, *sobre*, *debajo de*, *al lado de*, *detrás de*, *delante de*, dengan *estar*: *el libro está sobre la mesa*."
  en: "*En*, *sobre*, *debajo de*, *al lado de*, *detrás de*, *delante de*, with *estar*: *el libro está sobre la mesa*."
introduces: [a1-prep-place]
spiral: ser-estar
visual: { id: place-scene-es, props: { initial: on } }
examples:
  - { es: "El libro está [[sobre]] la mesa.", id: "Bukunya di atas meja." }
  - { es: "La pelota está [[debajo de]] la silla.", id: "Bolanya di bawah kursi." }
  - { es: "Mi celular está [[en]] la mochila.", id: "HP-ku di dalam tas.", es_es: "Mi móvil está [[en]] la mochila." }
  - { es: "El banco está [[al lado de]] la mezquita.", id: "Banknya di sebelah masjid." }
  - { es: "El carro está [[detrás de]] la casa.", id: "Mobilnya di belakang rumah.", es_es: "El coche está [[detrás de]] la casa." }
  - { es: "Rina está [[delante de]] la escuela.", id: "Rina di depan sekolah." }
pair:
  off: "El libro es sobre la mesa."
  natural: "El libro [[está]] sobre la mesa."
spain:
  rows:
    - { latam: "Mi celular está en la mochila.", es: "Mi móvil está en la mochila." }
  note:
    id: "HP: *celular* di Amerika Latin, *móvil* di Spanyol."
    en: "Mobile phone: *celular* in Latin America, *móvil* in Spain."
talk:
  lines:
    - { who: Mateo, es: "¿Dónde están mis llaves?", id: "Kunciku di mana?" }
    - { who: Sofía, es: "Están sobre la mesa, al lado de tu celular.", id: "Di atas meja, di sebelah HP-mu." }
    - { who: Mateo, es: "No, no están aquí.", id: "Nggak, di sini nggak ada." }
    - { who: Sofía, es: "¡Aquí! Están debajo de la silla.", id: "Ini dia! Di bawah kursi." }
tirukan: { es: "El libro está sobre la mesa.", id: "Bukunya di atas meja." }
check:
  - id: e1-12-c1
    type: scene
    prompt: "¿Dónde está la pelota?"
    visual: { id: place-scene-es, props: { state: under } }
    options: ["La pelota está debajo de la mesa.", "La pelota está sobre la mesa.", "La pelota está en la caja."]
    answer: "La pelota está debajo de la mesa."
    why: { id: "*Debajo de* = di bawah.", en: "*Debajo de* = under." }
  - id: e1-12-c2
    type: gap
    cue: "Kuncinya di dalam tas."
    prompt: "Las llaves están ___ la mochila."
    options: [en, sobre, detrás de]
    answer: en
    why: { id: "*En* = di dalam (atau di).", en: "*En* = in (or at)." }
  - id: e1-12-c3
    type: gap
    cue: "Kucingnya di bawah kasur."
    prompt: "El gato está ___ la cama."
    options: [debajo de, delante de]
    answer: debajo de
    why: { id: "*Debajo de* = di bawah; *delante de* = di depan.", en: "*Debajo de* = under; *delante de* = in front of." }
  - id: e1-12-c4
    type: order
    cue: "Banknya di sebelah sekolah."
    tiles: [está, de, al, lado, El, banco, la, escuela]
    answer: [El, banco, está, al, lado, de, la, escuela]
    why: { id: "Urutannya sama dengan bahasa Indonesia: tempat dulu, lalu bendanya.", en: "The order matches Indonesian: the place word, then the object." }
  - id: e1-12-c5
    type: listen
    audio: "El carro está delante de la casa."
    options: ["El carro está delante de la casa.", "El carro está detrás de la casa."]
    answer: "El carro está delante de la casa."
    why: { id: "*Delante de* = di depan; *detrás de* = di belakang.", en: "*Delante de* = in front of; *detrás de* = behind." }
glossary:
  - { es: lado, id: sisi, pos: noun, gender: m }
  - { es: silla, id: kursi, pos: noun, gender: f }
  - { es: pelota, id: bola, pos: noun, gender: f }
  - { es: caja, id: kotak, pos: noun, gender: f }
  - { es: mochila, id: "tas punggung", pos: noun, gender: f }
  - { es: llave, id: kunci, pos: noun, gender: f }
  - { es: cama, id: "kasur, tempat tidur", pos: noun, gender: f }
  - { es: celular, id: HP, pos: noun, gender: m, es_es: móvil }
  - { es: gato, id: kucing, pos: noun, gender: m }
  - { es: debajo de, id: "di bawah", pos: prep }
  - { es: al lado de, id: "di sebelah", pos: prep }
  - { es: delante de, id: "di depan", pos: prep }
next: null
---

## concept.id
Untuk mengatakan letak benda, pakai **estar** dan kata depan tempat: *en* (di, di dalam), *sobre* (di atas), *debajo de* (di bawah), *al lado de* (di sebelah), *detrás de* (di belakang), *delante de* (di depan). *De* + *el* menjadi *del*: *al lado del banco*. *En* juga bisa berarti 'di atas': *en la mesa*.

## concept.en
To say where things are, use **estar** with a place word: *en* (in, at), *sobre* (on), *debajo de* (under), *al lado de* (next to), *detrás de* (behind), *delante de* (in front of). *De* + *el* becomes *del*: *al lado del banco*. *En* can also mean 'on': *en la mesa*.

## contrast.id
Urutannya sama dengan bahasa Indonesia: *di bawah meja*, *debajo de la mesa*. Bedanya hanya kata kerjanya: bahasa Spanyol butuh *está*.

## contrast.en
The order matches Indonesian: *di bawah meja*, *debajo de la mesa*. The only difference is the verb: Spanish needs *está*.
