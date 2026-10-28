---
id: dasar-02-huruf-kejutan
rung: dasar
order: 2
status: draft
minutes: 7
title: { id: "Huruf yang mengejutkan", en: "Letters that surprise", es: "Letras" }
summary:
  id: "*H* tidak dibaca, *j* seperti *kh*, *ñ* seperti *ny*, *ll* seperti *y*, dan *b* sama dengan *v*."
  en: "*H* is silent, *j* sounds like *kh*, *ñ* like *ny*, *ll* like *y*, and *b* sounds the same as *v*."
introduces: [d-letters]
spiral: sounds
worked:
  - { es: "hola", id: "halo: h tidak dibaca" }
  - { es: "el jamón", id: "daging ham: j seperti kh" }
  - { es: "España", id: "Spanyol: ñ seperti ny" }
  - { es: "la calle", id: "jalan: ll seperti y" }
examples:
  - { es: "[[h]]ola", id: "halo" }
  - { es: "el [[j]]amón", id: "daging ham" }
  - { es: "la [[g]]ente", id: "orang-orang" }
  - { es: "Espa[[ñ]]a", id: "Spanyol" }
  - { es: "la [[ll]]ave", id: "kunci" }
  - { es: "la [[v]]aca", id: "sapi" }
pair:
  off: "Espanya"
  natural: "Espa[[ñ]]a"
sound:
  focus: "h diam, j seperti kh"
  words: ["hola", "jamón", "gente", "llave"]
  tip:
    id: "*H* selalu diam. *J*, juga *g* sebelum *e* atau *i*, dibaca seperti *kh* dalam *khusus*. *B* dan *v* bunyinya sama."
    en: "*H* is always silent. *J*, and *g* before *e* or *i*, sound like the *kh* in *khusus*. *B* and *v* sound the same."
tirukan: { es: "hola, España", id: "halo, Spanyol" }
check:
  - id: d-02-c1
    type: choice
    lang: id
    prompt: "Huruf mana yang tidak dibaca dalam *hola*?"
    options: [h, o, l]
    answer: h
    why: { id: "*H* selalu diam: *hola* terdengar seperti *ola*.", en: "*H* is always silent: *hola* sounds like *ola*." }
  - id: d-02-c2
    type: choice
    lang: id
    prompt: "*J* dalam *jamón* dibaca seperti …"
    options: ["kh dalam khusus", "j dalam jalan", "y dalam ya"]
    answer: "kh dalam khusus"
    why: { id: "*J* bahasa Spanyol dibaca di tenggorokan, seperti *kh*.", en: "Spanish *j* is said in the throat, like *kh*." }
  - id: d-02-c3
    type: listen
    audio: "la llave"
    options: ["la llave", "la vaca"]
    answer: "la llave"
    why: { id: "*Ll* dibaca seperti *y*: *la yave*.", en: "*Ll* sounds like *y*: *la yave*." }
  - id: d-02-c4
    type: choice
    lang: id
    prompt: "Pasangan huruf mana yang bunyinya sama dalam bahasa Spanyol?"
    options: ["b dan v", "j dan y", "h dan j"]
    answer: "b dan v"
    why: { id: "*B* dan *v* dibaca sama: *vaca* terdengar seperti *baca*.", en: "*B* and *v* sound the same: *vaca* sounds like *baca*." }
  - id: d-02-c5
    type: listen
    audio: "la gente"
    options: ["la gente", "la llave"]
    answer: "la gente"
    why: { id: "*G* sebelum *e* dibaca seperti *kh*: *la khente*.", en: "*G* before *e* sounds like *kh*: *la khente*." }
glossary:
  - { es: jamón, id: "daging ham", pos: noun, gender: m, plural: jamones }
  - { es: gente, id: "orang-orang", pos: noun, gender: f }
  - { es: llave, id: kunci, pos: noun, gender: f, plural: llaves }
  - { es: vaca, id: sapi, pos: noun, gender: f, plural: vacas }
  - { es: calle, id: jalan, pos: noun, gender: f, plural: calles }
next: dasar-03-c-dan-z
---

## concept.id
Beberapa huruf Spanyol dibaca lain dari bahasa Indonesia. *H* tidak pernah dibaca. *J*, dan *g* sebelum *e* atau *i*, dibaca seperti *kh*. *Ñ* dibaca *ny*, *ll* dibaca *y*, dan *b* sama dengan *v*.

## concept.en
A few Spanish letters sound different from Indonesian. *H* is never pronounced. *J*, and *g* before *e* or *i*, sound like *kh*. *Ñ* sounds like *ny*, *ll* like *y*, and *b* the same as *v*.

## contrast.id
Bahasa Indonesia menulis *ny* dengan dua huruf; bahasa Spanyol memakai satu huruf, *ñ*. Kalau kamu menulis *Espanya*, orang tetap mengerti, tapi ejaan yang benar adalah *España*.

## contrast.en
Indonesian writes *ny* with two letters; Spanish uses one, *ñ*. *Espanya* would be understood, but the correct spelling is *España*.
