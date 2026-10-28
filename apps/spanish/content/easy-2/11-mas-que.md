---
id: easy2-11-mas-que
rung: easy-2
order: 11
status: draft
minutes: 8
title: { id: "Membandingkan", en: "Comparing", es: "Más grande que" }
summary:
  id: "*Más … que* (lebih … daripada), *menos … que* (kurang … daripada), *tan … como* (sama … dengan); *mejor*, *peor*, *mayor*, *menor*."
  en: "*Más … que* (more … than), *menos … que* (less … than), *tan … como* (as … as); *mejor*, *peor*, *mayor*, *menor*."
introduces: [a1-comparisons]
spiral: agreement
worked:
  - { es: "Madrid es más grande que Sevilla.", id: "Madrid lebih besar daripada Sevilla." }
  - { es: "El tren es tan rápido como el avión.", id: "Kereta secepat pesawat." }
examples:
  - { es: "Bogotá es [[más]] fría que Lima.", id: "Bogotá lebih dingin daripada Lima." }
  - { es: "El metro es [[menos]] caro que el taxi.", id: "Metro lebih murah daripada taksi." }
  - { es: "Este café es [[tan]] bueno como ese.", id: "Kopi ini sama enaknya dengan yang itu." }
  - { es: "La sopa es [[mejor]] que la ensalada.", id: "Supnya lebih enak daripada saladnya." }
  - { es: "El jugo es [[peor]] que el agua.", id: "Jus lebih buruk daripada air." }
  - { es: "Andi es [[mayor]] que Rina.", id: "Andi lebih tua daripada Rina." }
pair:
  off: "Madrid es más grande de Sevilla."
  natural: "Madrid es más grande [[que]] Sevilla."
spain:
  rows:
    - { latam: "El carro es más rápido que el autobús.", es: "El coche es más rápido que el autobús." }
  note:
    id: "Mobil: *carro* di Amerika Latin, *coche* di Spanyol. Perbandingannya sama persis."
    en: "Car: *carro* in Latin America, *coche* in Spain. The comparison works exactly the same."
talk:
  lines:
    - { who: Dewi, es: "¿Qué prefieres, el tren o el autobús?", id: "Kamu lebih suka kereta atau bus?" }
    - { who: Carlos, es: "El tren. Es más rápido y más cómodo.", id: "Kereta. Lebih cepat dan lebih nyaman." }
    - { who: Dewi, es: "Pero es más caro.", id: "Tapi lebih mahal." }
tirukan: { es: "El tren es más rápido que el autobús.", id: "Kereta lebih cepat daripada bus." }
check:
  - id: e2-11-c1
    type: gap
    cue: "Madrid lebih besar daripada Sevilla."
    prompt: "Madrid es más grande ___ Sevilla."
    options: [que, como, de]
    answer: que
    why: { id: "*Más … que*: lebih … daripada.", en: "*Más … que*: more … than." }
  - id: e2-11-c2
    type: gap
    cue: "Kopi ini sama enaknya dengan yang itu."
    prompt: "Este café es tan bueno ___ ese."
    options: [como, que]
    answer: como
    why: { id: "*Tan … como*: sama … dengan.", en: "*Tan … como*: as … as." }
  - id: e2-11-c3
    type: gap
    cue: "Supnya lebih enak daripada saladnya."
    prompt: "La sopa es ___ que la ensalada."
    options: [mejor, mayor, menor]
    answer: mejor
    why: { id: "*Mejor*: lebih baik, lebih enak (bukan *más bueno*).", en: "*Mejor*: better (not *más bueno*)." }
  - id: e2-11-c4
    type: choice
    lang: id
    prompt: "*Andi es mayor que Rina* artinya…"
    options: ["Andi lebih tua daripada Rina.", "Andi lebih tinggi daripada Rina.", "Andi lebih kecil daripada Rina."]
    answer: "Andi lebih tua daripada Rina."
    why: { id: "*Mayor* untuk umur: lebih tua.", en: "*Mayor* for age: older." }
  - id: e2-11-c5
    type: order
    cue: "Kereta lebih cepat."
    tiles: [rápido, tren, es, El, más]
    answer: [El, tren, es, más, rápido]
    why: { id: "*Más* tepat di depan kata sifat.", en: "*Más* goes right before the adjective." }
glossary:
  - { es: tren, id: "kereta api", pos: noun, gender: m }
  - { es: avión, id: pesawat, pos: noun, gender: m }
  - { es: taxi, id: taksi, pos: noun, gender: m }
  - { es: rápido, id: cepat, pos: adj }
  - { es: cómodo, id: nyaman, pos: adj }
  - { es: grande, id: besar, pos: adj }
  - { es: pequeño, id: kecil, pos: adj }
  - { es: frío, id: dingin, pos: adj }
  - { es: bueno, id: "baik, enak", pos: adj }
  - { es: malo, id: buruk, pos: adj }
  - { es: autobús, id: bus, pos: noun, gender: m }
next: easy2-12-un-dia
---

## concept.id
Untuk membandingkan, pakai **más … que** (lebih … daripada), **menos … que** (kurang … daripada) atau **tan … como** (sama … dengan). Kata sifatnya tetap mengikuti benda pertama: *Bogotá es más fría*. Empat bentuk khusus: **mejor** (lebih baik), **peor** (lebih buruk), **mayor** (lebih tua), **menor** (lebih muda).

## concept.en
To compare, use **más … que** (more … than), **menos … que** (less … than) or **tan … como** (as … as). The adjective still agrees with the first noun: *Bogotá es más fría*. Four special forms: **mejor** (better), **peor** (worse), **mayor** (older), **menor** (younger).

## contrast.id
Bahasa Indonesia memakai *lebih … daripada*. Di bahasa Spanyol *daripada* adalah **que**, bukan *de*: *más grande que Sevilla*. Untuk "lebih enak", pakai *mejor*, bukan *más bueno*.

## contrast.en
Indonesian uses *lebih … daripada*. In Spanish *daripada* is **que**, not *de*: *más grande que Sevilla*. For "better", use *mejor*, not *más bueno*.
