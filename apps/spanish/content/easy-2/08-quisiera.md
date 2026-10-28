---
id: easy2-08-quisiera
rung: easy-2
order: 8
status: draft
minutes: 8
title: { id: "Memesan makanan", en: "Ordering food", es: "Quisiera la sopa" }
summary:
  id: "*Quisiera…* (saya mau…) dan *para mí…* (untuk saya…) adalah cara sopan memesan; *la cuenta, por favor* untuk minta tagihan."
  en: "*Quisiera…* (I'd like…) and *para mí…* (for me…) are the polite way to order; *la cuenta, por favor* asks for the bill."
introduces: [a1-quisiera]
spiral: register
worked:
  - { es: "Quisiera un café, por favor.", id: "Saya mau kopi, ya." }
  - { es: "Para mí, la sopa.", id: "Untuk saya, supnya." }
examples:
  - { es: "[[Quisiera]] el menú, por favor.", id: "Saya minta menunya, ya." }
  - { es: "Para [[mí]], el pollo con arroz.", id: "Untuk saya, ayam dengan nasi." }
  - { es: "¿Me trae la [[cuenta]], por favor?", id: "Boleh minta tagihannya?" }
  - { es: "Quisiera agua sin [[hielo]].", id: "Saya mau air tanpa es." }
  - { es: "¿Qué [[postre]] tienen?", id: "Ada hidangan penutup apa?" }
pair:
  off: "Quiero menú. ¡Rápido!"
  natural: "[[Quisiera]] el menú, por favor."
spain:
  rows:
    - { latam: "Mesero, la cuenta, por favor.", es: "Camarero, la cuenta, por favor." }
  note:
    id: "Pelayan: *mesero* di Meksiko dan Kolombia, *camarero* di Spanyol. Di beberapa negara orang memanggil *joven* atau *señorita*."
    en: "Waiter: *mesero* in Mexico and Colombia, *camarero* in Spain. In some countries people call *joven* or *señorita*."
talk:
  lines:
    - { who: Mesero, es: "Buenas noches. ¿Qué van a pedir?", id: "Selamat malam. Mau pesan apa?" }
    - { who: Rina, es: "Quisiera la sopa de pollo.", id: "Saya mau sup ayam." }
    - { who: Budi, es: "Para mí, arroz con pescado.", id: "Untuk saya, nasi dengan ikan." }
    - { who: Mesero, es: "Muy bien. ¿Y para tomar?", id: "Baik. Minumnya apa?" }
tirukan: { es: "Quisiera agua, por favor. Para mí, el pescado.", id: "Saya mau air, ya. Untuk saya, ikannya." }
check:
  - id: e2-08-c1
    type: choice
    lang: id
    prompt: "Cara paling sopan memesan kopi:"
    options: ["Quisiera un café, por favor.", "Dame un café.", "Un café."]
    answer: "Quisiera un café, por favor."
    why: { id: "*Quisiera… por favor* terdengar sopan di restoran.", en: "*Quisiera… por favor* sounds polite in a restaurant." }
  - id: e2-08-c2
    type: gap
    cue: "Untuk saya, ayamnya."
    prompt: "Para ___, el pollo."
    options: [mí, mi, yo]
    answer: mí
    why: { id: "Setelah *para*: *mí*, dengan aksen. *Mi* tanpa aksen artinya 'milikku'.", en: "After *para*: *mí*, with an accent. *Mi* without it means 'my'." }
  - id: e2-08-c3
    type: choice
    prompt: "¿Qué dices para pagar?"
    options: ["La cuenta, por favor.", "El menú, por favor.", "Para mí, la sopa."]
    answer: "La cuenta, por favor."
    why: { id: "*La cuenta*: tagihan.", en: "*La cuenta*: the bill." }
  - id: e2-08-c4
    type: order
    cue: "Untuk saya, nasinya."
    tiles: [el, mí, arroz, Para]
    answer: [Para, mí, el, arroz]
    why: { id: "*Para mí* + yang dipesan.", en: "*Para mí* + what you order." }
  - id: e2-08-c5
    type: dictation
    audio: "Quisiera agua sin hielo."
    answer: "Quisiera agua sin hielo."
    why: { id: "*Sin hielo*: tanpa es.", en: "*Sin hielo*: without ice." }
glossary:
  - { es: mesero, id: "pelayan (restoran)", pos: noun, gender: m, es_es: camarero }
  - { es: menú, id: menu, pos: noun, gender: m }
  - { es: cuenta, id: tagihan, pos: noun, gender: f }
  - { es: postre, id: "hidangan penutup", pos: noun, gender: m }
  - { es: arroz, id: "nasi, beras", pos: noun, gender: m }
  - { es: pescado, id: "ikan (makanan)", pos: noun, gender: m }
  - { es: hielo, id: "es (batu)", pos: noun, gender: m }
  - { es: plato, id: "piring, hidangan", pos: noun, gender: m }
  - { es: ensalada, id: salad, pos: noun, gender: f }
  - { es: pagar, id: membayar, pos: verb, verb: { group: ar } }
  - { es: tomar, id: "minum, mengambil, naik", pos: verb, verb: { group: ar } }
next: easy2-09-gira
---

## concept.id
Untuk memesan dengan sopan, pakai **quisiera** (saya mau): *quisiera la sopa*. Untuk menyebut pesananmu, pakai **para mí**: *para mí, el pollo*. *Quisiera* berasal dari *querer*, tetapi di sini cukup dihafal sebagai satu ungkapan.

## concept.en
To order politely, use **quisiera** (I'd like): *quisiera la sopa*. To say what you're having, use **para mí**: *para mí, el pollo*. *Quisiera* comes from *querer*, but here just learn it as one expression.

## contrast.id
*Mau* bisa dipakai di mana saja dalam bahasa Indonesia. *Quiero* juga benar, tetapi kepada pelayan *quisiera* terdengar lebih halus, seperti *saya mau… ya*.

## contrast.en
Indonesian *mau* works anywhere. *Quiero* is also correct, but to a waiter *quisiera* sounds softer, like *saya mau… ya*.
