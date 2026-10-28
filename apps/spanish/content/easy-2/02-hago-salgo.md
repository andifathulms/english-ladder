---
id: easy2-02-hago-salgo
rung: easy-2
order: 2
status: draft
minutes: 9
title: { id: "Bentuk *yo* yang tak beraturan", en: "Irregular *yo* forms", es: "Hago, salgo, pongo" }
summary:
  id: "Beberapa kata kerja hanya tak beraturan di bentuk *yo*: *hago*, *salgo*, *pongo*, *traigo*, *sé*, *conozco*."
  en: "Some verbs are irregular only in the *yo* form: *hago*, *salgo*, *pongo*, *traigo*, *sé*, *conozco*."
introduces: [a1-yo-irregular]
spiral: irregular
visual: { id: conjugation-grid, props: { verb: hacer, tenses: [presente] } }
examples:
  - { es: "Los sábados [[hago]] deporte.", id: "Tiap Sabtu aku olahraga." }
  - { es: "[[Salgo]] de la oficina a las seis.", id: "Aku keluar dari kantor jam enam." }
  - { es: "[[Pongo]] la ropa en el armario.", id: "Aku menaruh baju di lemari." }
  - { es: "[[Vengo]] en autobús.", id: "Aku datang naik bus." }
  - { es: "No [[sé]] dónde está el banco.", id: "Aku nggak tahu bank di mana." }
  - { es: "[[Conozco]] un restaurante bueno.", id: "Aku tahu restoran yang enak." }
pair:
  off: "Yo haco deporte."
  natural: "Yo [[hago]] deporte."
sound:
  focus: "g dalam -go"
  words: ["hago", "salgo", "pongo", "vengo", "traigo"]
  tip:
    id: "*G* di *-go* selalu keras, seperti di *gado-gado*. *Ga, go, gu* keras; *ge, gi* dibaca *kh*."
    en: "The *g* in *-go* is always hard, as in *go*. *Ga, go, gu* are hard; *ge, gi* sound like *kh*."
words:
  id: "*Armario* sampai ke bahasa Indonesia lewat Portugis *armário*: *lemari*. *Ropa* artinya pakaian, bukan tali."
  en: "*Armario* reached Indonesian through Portuguese *armário*: *lemari*. *Ropa* means clothes, not rope."
  bridges: [armario, ropa]
talk:
  lines:
    - { who: Lucía, es: "¿Qué haces los domingos?", id: "Kamu ngapain tiap Minggu?" }
    - { who: Budi, es: "Salgo al parque.", id: "Aku pergi ke taman." }
    - { who: Lucía, es: "¿Y traes algo?", id: "Bawa sesuatu?" }
    - { who: Budi, es: "Sí, traigo fruta y agua.", id: "Iya, aku bawa buah dan air." }
tirukan: { es: "Hago deporte y salgo al parque.", id: "Aku olahraga dan pergi ke taman." }
check:
  - id: e2-02-c1
    type: form
    cue: "Tiap Sabtu aku olahraga."
    base: hacer
    target: { person: yo, tense: presente }
    frame: "Los sábados ___ deporte."
    answer: hago
    why: { id: "*Hacer* → *hago*: tak beraturan hanya untuk *yo*.", en: "*Hacer* → *hago*: irregular only for *yo*." }
  - id: e2-02-c2
    type: gap
    cue: "Aku keluar dari kantor jam enam."
    prompt: "___ de la oficina a las seis."
    options: [Salgo, Salo, Sale]
    answer: Salgo
    why: { id: "*Salir* → *salgo*, dengan *-go*.", en: "*Salir* → *salgo*, with *-go*." }
  - id: e2-02-c3
    type: conjugate
    verb: poner
    tense: presente
    persons: [yo, tu, el]
    answers: { yo: pongo, tu: pones, el: pone }
    why: { id: "Hanya *yo* yang berubah: *pongo*; *pones* dan *pone* biasa.", en: "Only *yo* changes: *pongo*; *pones* and *pone* are regular." }
  - id: e2-02-c4
    type: gap
    cue: "Aku nggak tahu bank di mana."
    prompt: "No ___ dónde está el banco."
    options: [sé, sabo, sabe]
    answer: sé
    why: { id: "*Saber* → *sé*, dengan aksen.", en: "*Saber* → *sé*, with an accent." }
  - id: e2-02-c5
    type: listen
    audio: "Vengo en autobús."
    options: ["Vengo en autobús.", "Viene en autobús.", "Vienes en autobús."]
    answer: "Vengo en autobús."
    why: { id: "*Vengo*: aku datang.", en: "*Vengo*: I come." }
glossary:
  - { es: hacer, id: "membuat, melakukan", pos: verb, verb: { group: er, irregular: true } }
  - { es: salir, id: "keluar, berangkat", pos: verb, verb: { group: ir, irregular: true } }
  - { es: poner, id: menaruh, pos: verb, verb: { group: er, irregular: true } }
  - { es: venir, id: datang, pos: verb, verb: { group: ir, irregular: true } }
  - { es: traer, id: "membawa (ke sini)", pos: verb, verb: { group: er, irregular: true } }
  - { es: saber, id: tahu, pos: verb, verb: { group: er, irregular: true } }
  - { es: conocer, id: kenal, pos: verb, verb: { group: er, irregular: true } }
  - { es: deporte, id: olahraga, pos: noun, gender: m }
  - { es: oficina, id: kantor, pos: noun, gender: f }
  - { es: armario, id: lemari, pos: noun, gender: m, bridge: { pt: armário, id: lemari } }
  - { es: ropa, id: pakaian, pos: noun, gender: f }
  - { es: banco, id: bank, pos: noun, gender: m }
next: easy2-03-voy-a
---

## concept.id
Beberapa kata kerja yang sering dipakai hanya tak beraturan di bentuk **yo**. Banyak yang berakhir **-go**: *hago*, *salgo*, *pongo*, *traigo*, *vengo*, *digo*. Ada juga **sé** (*saber*) dan **conozco** (*conocer*). Bentuk lainnya mengikuti pola biasa: *haces*, *hace*, *hacemos*.

## concept.en
Some very common verbs are irregular only in the **yo** form. Many end in **-go**: *hago*, *salgo*, *pongo*, *traigo*, *vengo*, *digo*. There are also **sé** (*saber*) and **conozco** (*conocer*). The other forms follow the usual pattern: *haces*, *hace*, *hacemos*.

## contrast.id
*Saber* dan *conocer* sama-sama "tahu". *Saber* untuk fakta (*sé dónde está*), *conocer* untuk orang dan tempat yang pernah kamu temui (*conozco un restaurante*). *Venir* dan *decir* juga berubah akarnya: *vienes*, *dices*.

## contrast.en
*Saber* and *conocer* both mean "to know". *Saber* is for facts (*sé dónde está*), *conocer* for people and places you have met (*conozco un restaurante*). *Venir* and *decir* also change their stem: *vienes*, *dices*.
