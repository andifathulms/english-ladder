---
id: easy2-03-voy-a
rung: easy-2
order: 3
status: draft
minutes: 8
title: { id: "Pergi dan rencana: *ir a*", en: "Going and plans: *ir a*", es: "Voy a viajar" }
summary:
  id: "*Ir* artinya pergi (*voy, vas, va, vamos, van*). *Ir a* + kata kerja dasar untuk rencana: *voy a nadar*."
  en: "*Ir* means to go (*voy, vas, va, vamos, van*). *Ir a* + infinitive is for plans: *voy a nadar*."
introduces: [a1-ir-a]
spiral: future
worked:
  - { es: "Voy a la playa.", id: "Aku pergi ke pantai." }
  - { es: "Voy a nadar.", id: "Aku akan berenang." }
  - { es: "Vamos al mercado.", id: "Kita pergi ke pasar." }
examples:
  - { es: "[[Voy]] al mercado.", id: "Aku pergi ke pasar." }
  - { es: "Mañana [[vamos a]] cocinar.", id: "Besok kita akan memasak." }
  - { es: "¿Adónde [[vas]] el sábado?", id: "Hari Sabtu kamu mau ke mana?" }
  - { es: "Rina y Andi [[van a]] visitar Lima.", id: "Rina dan Andi akan mengunjungi Lima." }
  - { es: "[[Voy a]] descansar un poco.", id: "Aku mau istirahat sebentar." }
pair:
  off: "Voy nadar mañana."
  natural: "[[Voy a]] nadar mañana."
spain:
  rows:
    - { latam: "¿Van a ir en carro?", es: "¿Vais a ir en coche?" }
  note:
    id: "Di Spanyol mobil disebut *coche*, di Amerika Latin *carro*. *Vais* adalah bentuk *vosotros* dari *ir*."
    en: "A car is *coche* in Spain and *carro* in Latin America. *Vais* is the *vosotros* form of *ir*."
talk:
  lines:
    - { who: Sofía, es: "¿Qué vas a hacer el domingo?", id: "Hari Minggu kamu mau ngapain?" }
    - { who: Andi, es: "Voy a jugar fútbol.", id: "Aku mau main bola." }
    - { who: Sofía, es: "¡Qué bien! Yo voy a descansar.", id: "Asyik! Aku mau istirahat." }
tirukan: { es: "El sábado voy a visitar Lima.", id: "Hari Sabtu aku akan mengunjungi Lima." }
check:
  - id: e2-03-c1
    type: gap
    cue: "Besok aku akan berenang."
    prompt: "Mañana ___ a nadar."
    options: [voy, va, vas]
    answer: voy
    why: { id: "*Yo* → *voy*: *voy a nadar*.", en: "*Yo* → *voy*: *voy a nadar*." }
  - id: e2-03-c2
    type: order
    cue: "Kita akan memasak."
    tiles: [a, cocinar, Vamos]
    answer: [Vamos, a, cocinar]
    why: { id: "*Ir* + *a* + kata kerja dasar.", en: "*Ir* + *a* + infinitive." }
  - id: e2-03-c3
    type: conjugate
    verb: ir
    tense: presente
    persons: [yo, tu, el, nosotros, ellos]
    answers: { yo: voy, tu: vas, el: va, nosotros: vamos, ellos: van }
    why: { id: "*Ir* tak beraturan sepenuhnya: *voy, vas, va, vamos, van*.", en: "*Ir* is fully irregular: *voy, vas, va, vamos, van*." }
  - id: e2-03-c4
    type: choice
    lang: id
    prompt: "*Voy a nadar* artinya…"
    options: ["Aku akan berenang.", "Aku sudah berenang.", "Aku sedang berenang."]
    answer: "Aku akan berenang."
    why: { id: "*Ir a* + kata kerja dasar: rencana yang akan datang.", en: "*Ir a* + infinitive: a plan for later." }
  - id: e2-03-c5
    type: dictation
    audio: "¿Adónde vas?"
    answer: "¿Adónde vas?"
    why: { id: "*¿Adónde?*: ke mana. Jangan lupa ¿ dan aksennya.", en: "*¿Adónde?*: where to. Don't forget ¿ and the accent." }
glossary:
  - { es: ir, id: pergi, pos: verb, verb: { group: ir, irregular: true } }
  - { es: playa, id: pantai, pos: noun, gender: f }
  - { es: mercado, id: pasar, pos: noun, gender: m }
  - { es: parque, id: taman, pos: noun, gender: m }
  - { es: sábado, id: Sabtu, pos: noun, gender: m }
  - { es: domingo, id: "Minggu (hari)", pos: noun, gender: m, bridge: { pt: domingo, id: Minggu } }
  - { es: fútbol, id: "sepak bola", pos: noun, gender: m }
  - { es: cocinar, id: memasak, pos: verb, verb: { group: ar } }
  - { es: visitar, id: mengunjungi, pos: verb, verb: { group: ar } }
  - { es: nadar, id: berenang, pos: verb, verb: { group: ar } }
  - { es: descansar, id: beristirahat, pos: verb, verb: { group: ar } }
next: easy2-04-me-levanto
---

## concept.id
**Ir** (pergi) tak beraturan: *voy, vas, va, vamos, van*. Dengan **a** dan kata kerja dasar, ia menjadi cara paling mudah untuk bicara tentang rencana: *voy a nadar* (aku akan berenang). *A* + *el* menjadi **al**: *voy al mercado*.

## concept.en
**Ir** (to go) is irregular: *voy, vas, va, vamos, van*. With **a** and an infinitive it is the easiest way to talk about plans: *voy a nadar* (I'm going to swim). *A* + *el* becomes **al**: *voy al mercado*.

## contrast.id
Bahasa Indonesia cukup menambah *akan* atau *mau*. Bahasa Spanyol memakai *ir a*, dan *a* tidak boleh hilang: *voy a nadar*, bukan *voy nadar*.

## contrast.en
Indonesian just adds *akan* or *mau*. Spanish uses *ir a*, and the *a* can't be dropped: *voy a nadar*, not *voy nadar*.
