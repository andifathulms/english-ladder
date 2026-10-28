---
id: easy1-03-el-la
rung: easy-1
order: 3
status: draft
minutes: 8
title: { id: "Laki-laki atau perempuan? Kata benda", en: "Masculine or feminine nouns", es: "El o la" }
summary:
  id: "Setiap kata benda punya gender: *el libro*, *la casa*. Pelajari kata benda bersama artikelnya."
  en: "Every noun has a gender: *el libro*, *la casa*. Learn each noun with its article."
introduces: [a1-gender]
spiral: gender
worked:
  - { es: "el libro, el carro, el perro", id: "buku, mobil, anjing" }
  - { es: "la casa, la mesa, la ciudad", id: "rumah, meja, kota" }
  - { es: "un día, una mano", id: "satu hari, satu tangan" }
examples:
  - { es: "[[El]] libro es nuevo.", id: "Bukunya baru." }
  - { es: "[[La]] casa es grande.", id: "Rumahnya besar." }
  - { es: "Es [[un]] perro.", id: "Itu seekor anjing." }
  - { es: "Es [[una]] mesa.", id: "Itu sebuah meja." }
  - { es: "Es un [[día]] bonito.", id: "Hari yang indah." }
  - { es: "[[La]] foto es bonita.", id: "Fotonya bagus." }
pair:
  off: "La problema es grande."
  natural: "[[El]] problema es grande."
words:
  id: "Banyak kata yang sudah kamu kenal datang dari bahasa Portugis, saudara dekat bahasa Spanyol."
  en: "Many words you already know came from Portuguese, a close relative of Spanish."
  bridges: [mesa, bandera, zapato]
talk:
  lines:
    - { who: Rina, es: "¿Qué es?", id: "Itu apa?" }
    - { who: Mateo, es: "Es una bandera.", id: "Itu bendera." }
    - { who: Rina, es: "¿Es de México?", id: "Bendera Meksiko?" }
    - { who: Mateo, es: "Sí, es la bandera de México.", id: "Ya, itu bendera Meksiko." }
tirukan: { es: "Es una mesa. Es un libro.", id: "Itu meja. Itu buku." }
check:
  - id: e1-03-c1
    type: gap
    cue: "Itu sebuah buku."
    prompt: "Es ___ libro."
    options: [un, una]
    answer: un
    why: { id: "*Libro* maskulin: *un libro*.", en: "*Libro* is masculine: *un libro*." }
  - id: e1-03-c2
    type: gap
    cue: "Itu sebuah rumah."
    prompt: "Es ___ casa."
    options: [un, una]
    answer: una
    why: { id: "*Casa* feminin: *una casa*.", en: "*Casa* is feminine: *una casa*." }
  - id: e1-03-c3
    type: gap
    cue: "Harinya indah."
    prompt: "___ día es bonito."
    options: [El, La]
    answer: El
    why: { id: "*Día* berakhir -a tapi maskulin: *el día*.", en: "*Día* ends in -a but is masculine: *el día*." }
  - id: e1-03-c4
    type: gap
    cue: "Itu sebuah tangan."
    prompt: "Es ___ mano."
    options: [un, una]
    answer: una
    why: { id: "*Mano* berakhir -o tapi feminin: *una mano*.", en: "*Mano* ends in -o but is feminine: *una mano*." }
  - id: e1-03-c5
    type: choice
    lang: id
    prompt: "Kata benda mana yang feminin?"
    options: [mesa, libro, carro]
    answer: mesa
    why: { id: "*La mesa*: kebanyakan kata yang berakhir -a feminin.", en: "*La mesa*: most nouns in -a are feminine." }
glossary:
  - { es: libro, id: buku, pos: noun, gender: m }
  - { es: casa, id: rumah, pos: noun, gender: f }
  - { es: perro, id: anjing, pos: noun, gender: m }
  - { es: mesa, id: meja, pos: noun, gender: f, bridge: { pt: mesa, id: meja } }
  - { es: bandera, id: bendera, pos: noun, gender: f, bridge: { pt: bandeira, id: bendera } }
  - { es: día, id: hari, pos: noun, gender: m }
  - { es: mano, id: tangan, pos: noun, gender: f }
  - { es: foto, id: foto, pos: noun, gender: f }
  - { es: problema, id: masalah, pos: noun, gender: m }
  - { es: bonito, id: "cantik, indah", pos: adj }
  - { es: nuevo, id: baru, pos: adj }
  - { es: grande, id: besar, pos: adj }
next: easy1-04-plural
---

## concept.id
Setiap kata benda Spanyol maskulin atau feminin, dan artikelnya ikut: **el** dan **un** untuk maskulin, **la** dan **una** untuk feminin. Kata yang berakhir *-o* biasanya maskulin, yang berakhir *-a* biasanya feminin. Pengecualian yang segera kamu temui: *el día*, *el problema*, *la mano*, *la foto*.

## concept.en
Every Spanish noun is masculine or feminine, and its article follows: **el** and **un** for masculine, **la** and **una** for feminine. Nouns in *-o* are usually masculine, nouns in *-a* usually feminine. Exceptions you'll meet soon: *el día*, *el problema*, *la mano*, *la foto*.

## contrast.id
Bahasa Indonesia tidak punya gender untuk benda; ada *sebuah*, *seekor*, *-nya*. Di bahasa Spanyol, hafalkan kata benda bersama artikelnya: bukan *mesa*, tapi *la mesa*.

## contrast.en
Indonesian nouns have no gender; it has *sebuah*, *seekor* and *-nya* instead. In Spanish, learn each noun with its article: not *mesa*, but *la mesa*.
