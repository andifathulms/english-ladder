---
id: dasar-03-c-dan-z
rung: dasar
order: 3
status: draft
minutes: 7
title: { id: "C dan z", en: "C and z", es: "La ce y la zeta" }
summary:
  id: "Di Amerika Latin, *c* sebelum *e*/*i* dan *z* dibaca *s*. *Qu* dan *gu* sebelum *e*/*i*: *u*-nya diam, kecuali *ü*."
  en: "In Latin America, *c* before *e*/*i* and *z* sound like *s*. In *qu* and *gu* before *e*/*i* the *u* is silent, unless it is *ü*."
introduces: [d-c-z]
spiral: sounds
worked:
  - { es: "la ciudad", id: "kota: c sebelum i seperti s" }
  - { es: "el zapato", id: "sepatu: z seperti s" }
  - { es: "el queso", id: "keju: qu seperti k" }
  - { es: "la guitarra", id: "gitar: gu seperti g" }
  - { es: "el pingüino", id: "penguin: ü dibaca" }
examples:
  - { es: "la [[c]]iudad", id: "kota" }
  - { es: "el [[c]]ielo", id: "langit" }
  - { es: "el [[z]]apato", id: "sepatu" }
  - { es: "el [[qu]]eso", id: "keju" }
  - { es: "la [[gu]]itarra", id: "gitar" }
  - { es: "el pin[[gü]]ino", id: "penguin" }
pair:
  off: "kueso"
  natural: "el [[qu]]eso"
sound:
  focus: "c dan z seperti s"
  words: ["ciudad", "cielo", "zapato"]
  tip:
    id: "Di Amerika Latin, *c* sebelum *e* atau *i*, dan *z*, dibaca seperti *s* biasa. *Qu* dan *gu* sebelum *e* atau *i*: *u*-nya diam, kecuali ditulis *ü*."
    en: "In Latin America, *c* before *e* or *i*, and *z*, sound like a plain *s*. In *qu* and *gu* before *e* or *i* the *u* is silent, unless it is written *ü*."
spain:
  rows:
    - { latam: "la ciudad", es: "la ciudad" }
    - { latam: "el zapato", es: "el zapato" }
  note:
    id: "Di sebagian besar Spanyol, *c* sebelum *e*/*i* dan *z* dibaca seperti *th* dalam bahasa Inggris *think*. Tulisannya sama; cukup kenali bunyinya."
    en: "In most of Spain, *c* before *e*/*i* and *z* sound like the *th* in English *think*. The spelling is the same; just learn to recognise the sound."
tirukan: { es: "la ciudad y el cielo", id: "kota dan langit" }
check:
  - id: d-03-c1
    type: listen
    audio: "el queso"
    options: ["el queso", "el cielo"]
    answer: "el queso"
    why: { id: "*Qu* dibaca *k*: *el keso*.", en: "*Qu* sounds like *k*: *el keso*." }
  - id: d-03-c2
    type: choice
    lang: id
    prompt: "Di Amerika Latin, *z* dalam *zapato* dibaca seperti …"
    options: ["s", "z dalam zebra", "th dalam think"]
    answer: "s"
    why: { id: "Di Amerika Latin *z* selalu *s*. Bunyi *th* itu ciri Spanyol.", en: "In Latin America *z* is always *s*. The *th* sound belongs to Spain." }
  - id: d-03-c3
    type: choice
    lang: id
    prompt: "Dalam *guitarra*, huruf *u* …"
    options: ["tidak dibaca", "dibaca seperti u"]
    answer: "tidak dibaca"
    why: { id: "*Gu* sebelum *i*: *u*-nya hanya menjaga *g* tetap *g*. *Guitarra* dibaca *gitara*.", en: "*Gu* before *i*: the *u* only keeps the *g* hard. *Guitarra* sounds like *gitara*." }
  - id: d-03-c4
    type: choice
    lang: id
    prompt: "Dalam *pingüino*, huruf *ü* …"
    options: ["dibaca seperti u", "tidak dibaca"]
    answer: "dibaca seperti u"
    why: { id: "Dua titik di atas *ü* berarti *u*-nya dibaca: *pin-gui-no* dengan bunyi *gu*.", en: "The two dots on *ü* mean the *u* is said: *pingüino* with a *gw* sound." }
  - id: d-03-c5
    type: listen
    audio: "la ciudad"
    variety: es
    prompt: "Dengarkan suara dari Spanyol, lalu pilih."
    options: ["la ciudad", "el cielo"]
    answer: "la ciudad"
    why: { id: "Suara Spanyol: *c* dalam *ciudad* terdengar seperti *th*.", en: "A Spain voice: the *c* in *ciudad* sounds like *th*." }
glossary:
  - { es: ciudad, id: kota, pos: noun, gender: f, plural: ciudades }
  - { es: cielo, id: langit, pos: noun, gender: m, plural: cielos }
  - { es: guitarra, id: gitar, pos: noun, gender: f, plural: guitarras }
  - { es: pingüino, id: penguin, pos: noun, gender: m, plural: pingüinos }
next: dasar-04-r-dan-rr
---

## concept.id
Di Amerika Latin, *c* sebelum *e* atau *i* dibaca *s*, dan *z* juga dibaca *s*. *C* sebelum *a*, *o*, *u* tetap *k*. Pada *que*, *qui*, *gue*, *gui*, huruf *u* tidak dibaca, kecuali ditulis *ü* seperti dalam *pingüino*.

## concept.en
In Latin America, *c* before *e* or *i* sounds like *s*, and so does *z*. *C* before *a*, *o*, *u* stays *k*. In *que*, *qui*, *gue*, *gui* the *u* is silent, unless it is written *ü*, as in *pingüino*.

## contrast.id
Bahasa Indonesia menulis bunyi *k* dengan *k* saja. Bahasa Spanyol memakai *c* sebelum *a*, *o*, *u* dan *qu* sebelum *e*, *i*, jadi *keju* menjadi *queso*.

## contrast.en
Indonesian writes the *k* sound with *k* alone. Spanish uses *c* before *a*, *o*, *u* and *qu* before *e*, *i*, so *keju* becomes *queso*.
