---
id: easy1-07-ser-estar
rung: easy-1
order: 7
status: draft
minutes: 9
title: { id: "Ser atau estar?", en: "Ser or estar?", es: "¿Ser o estar?" }
summary:
  id: "*Ser* untuk siapa dan seperti apa seseorang; *estar* untuk di mana dan bagaimana keadaannya sekarang."
  en: "*Ser* for who and what someone is like; *estar* for where they are and how they are now."
introduces: [a1-ser-estar]
spiral: ser-estar
visual: { id: ser-estar, props: { set: basic } }
examples:
  - { es: "Lucía [[es]] de Bogotá.", id: "Lucía berasal dari Bogotá." }
  - { es: "Lucía [[está]] en Madrid.", id: "Lucía sedang di Madrid." }
  - { es: "Diego es [[alto]].", id: "Diego tinggi." }
  - { es: "Diego está [[cansado]].", id: "Diego sedang capek." }
  - { es: "La sopa [[está]] fría.", id: "Supnya dingin." }
  - { es: "Ella [[es]] médica.", id: "Dia dokter." }
pair:
  off: "Yo soy cansado."
  natural: "Yo [[estoy]] cansado."
talk:
  lines:
    - { who: Dewi, es: "¿Cómo es Ana?", id: "Ana orangnya seperti apa?" }
    - { who: Juan, es: "Es alta y muy simpática.", id: "Tinggi dan ramah sekali." }
    - { who: Dewi, es: "¿Y cómo está hoy?", id: "Dan bagaimana kabarnya hari ini?" }
    - { who: Juan, es: "Hoy está enferma.", id: "Hari ini dia sakit." }
tirukan: { es: "Soy de Medan, pero estoy en Lima.", id: "Aku dari Medan, tapi sedang di Lima." }
check:
  - id: e1-07-c1
    type: gap
    cue: "Ana berasal dari Chili."
    prompt: "Ana ___ de Chile."
    options: [es, está]
    answer: es
    why: { id: "Asal: *ser*.", en: "Origin: *ser*." }
  - id: e1-07-c2
    type: gap
    cue: "Ana sedang di Chili."
    prompt: "Ana ___ en Chile."
    options: [es, está]
    answer: está
    why: { id: "Tempat: *estar*.", en: "Location: *estar*." }
  - id: e1-07-c3
    type: gap
    cue: "Hari ini aku senang."
    prompt: "Hoy ___ contento."
    options: [estoy, soy]
    answer: estoy
    why: { id: "Perasaan hari ini: *estar*.", en: "A feeling today: *estar*." }
  - id: e1-07-c4
    type: gap
    cue: "Mateo guru."
    prompt: "Mateo ___ profesor."
    options: [es, está]
    answer: es
    why: { id: "Pekerjaan: *ser*.", en: "A job: *ser*." }
  - id: e1-07-c5
    type: fix
    cue: "Aku dari Peru."
    wrong: "Estoy de Perú."
    options: ["Soy de Perú.", "Estoy de Perú."]
    answer: "Soy de Perú."
    why: { id: "Asal selalu *ser de*.", en: "Origin is always *ser de*." }
  - id: e1-07-c6
    type: choice
    lang: id
    prompt: "*Ella está aburrida* artinya…"
    options: ["dia sedang bosan", "dia membosankan"]
    answer: "dia sedang bosan"
    why: { id: "*Estar aburrida* = sedang bosan; *ser aburrida* = membosankan.", en: "*Estar aburrida* = bored; *ser aburrida* = boring." }
glossary:
  - { es: alto, id: tinggi, pos: adj }
  - { es: bajo, id: pendek, pos: adj }
  - { es: sopa, id: sup, pos: noun, gender: f }
  - { es: aburrido, id: "bosan; membosankan", pos: adj }
  - { es: simpático, id: "ramah, menyenangkan", pos: adj }
  - { es: triste, id: sedih, pos: adj }
  - { es: tranquilo, id: tenang, pos: adj }
  - { es: hoy, id: "hari ini", pos: adv }
next: easy1-08-hay
---

## concept.id
**Ser** menjawab *siapa* dan *seperti apa*: asal, pekerjaan, sifat. **Estar** menjawab *di mana* dan *bagaimana sekarang*: tempat, perasaan, keadaan sementara. Kalimat yang sama bisa berubah arti: *es aburrida* (membosankan), *está aburrida* (sedang bosan).

## concept.en
**Ser** answers *who* and *what like*: origin, job, character. **Estar** answers *where* and *how right now*: place, feeling, a passing state. The same words can change meaning: *es aburrida* (boring), *está aburrida* (bored).

## contrast.id
Bahasa Indonesia tidak membedakan ini; kadang kita bilang *sedang* untuk keadaan sementara. Kalau kamu bisa menambahkan *sedang*, biasanya bahasa Spanyolnya *estar*.

## contrast.en
Indonesian doesn't make this split; sometimes it adds *sedang* for a passing state. If *sedang* fits, the Spanish is usually *estar*.
