---
id: easy2-04-me-levanto
rung: easy-2
order: 4
status: draft
minutes: 9
title: { id: "Rutinitas pagi: kata kerja refleksif", en: "Morning routine: reflexive verbs", es: "Me levanto temprano" }
summary:
  id: "Kata kerja refleksif seperti *levantarse* membawa *me, te, se, nos* di depannya: *me levanto*, *te duchas*, *se acuesta*."
  en: "Reflexive verbs like *levantarse* carry *me, te, se, nos* in front: *me levanto*, *te duchas*, *se acuesta*."
introduces: [a1-reflexive]
spiral: reflexive
visual: { id: routine-clock, props: { initial: 0 } }
examples:
  - { es: "[[Me levanto]] a las seis.", id: "Aku bangun jam enam." }
  - { es: "Mateo [[se ducha]] por la mañana.", id: "Mateo mandi pagi-pagi." }
  - { es: "¿A qué hora [[te acuestas]]?", id: "Kamu tidur jam berapa?" }
  - { es: "Nos [[vestimos]] rápido.", id: "Kami berpakaian dengan cepat." }
  - { es: "Valentina [[se peina]] antes de salir.", id: "Valentina menyisir rambut sebelum keluar." }
  - { es: "Me [[cepillo]] los dientes después del desayuno.", id: "Aku sikat gigi sesudah sarapan." }
pair:
  off: "Yo levanto a las seis."
  natural: "Yo [[me levanto]] a las seis."
sound:
  focus: "ll"
  words: ["me cepillo", "me llamo", "calle"]
  tip:
    id: "Di sebagian besar Amerika Latin, *ll* dibaca seperti *y* Indonesia: *ce-pi-yo*. Di Argentina bunyinya mirip *sy*."
    en: "In most of Latin America *ll* sounds like *y*: *ce-pi-yo*. In Argentina it sounds closer to *sh*."
talk:
  lines:
    - { who: Camila, es: "¿A qué hora te levantas?", id: "Kamu bangun jam berapa?" }
    - { who: Budi, es: "Me levanto a las cinco, para rezar.", id: "Aku bangun jam lima, buat salat." }
    - { who: Camila, es: "¡Qué temprano!", id: "Pagi banget!" }
tirukan: { es: "Me levanto, me ducho y me visto.", id: "Aku bangun, mandi, lalu berpakaian." }
check:
  - id: e2-04-c1
    type: gap
    cue: "Aku bangun jam enam."
    prompt: "Yo ___ levanto a las seis."
    options: [me, te, se]
    answer: me
    why: { id: "*Yo* → *me*: *me levanto*.", en: "*Yo* → *me*: *me levanto*." }
  - id: e2-04-c2
    type: gap
    cue: "Valentina mandi pagi-pagi."
    prompt: "Valentina ___ ducha por la mañana."
    options: [se, me, te]
    answer: se
    why: { id: "*Ella* → *se*: *se ducha*.", en: "*Ella* → *se*: *se ducha*." }
  - id: e2-04-c3
    type: conjugate
    verb: acostarse
    tense: presente
    persons: [yo, tu, el]
    answers: { yo: me acuesto, tu: te acuestas, el: se acuesta }
    why: { id: "*Acostarse*: o → ue, dan kata gantinya ikut orangnya.", en: "*Acostarse*: o → ue, and the pronoun follows the person." }
  - id: e2-04-c4
    type: order
    cue: "Aku berpakaian dengan cepat."
    tiles: [visto, rápido, Me]
    answer: [Me, visto, rápido]
    why: { id: "*Me* di depan kata kerja: *me visto*.", en: "*Me* goes before the verb: *me visto*." }
  - id: e2-04-c5
    type: form
    cue: "Kami bangun jam tujuh."
    base: levantarse
    target: { person: nosotros, tense: presente }
    frame: "___ a las siete."
    answer: "nos levantamos"
    why: { id: "*Nosotros* → *nos levantamos*.", en: "*Nosotros* → *nos levantamos*." }
glossary:
  - { es: levantarse, id: "bangun (dari tempat tidur)", pos: verb, verb: { group: ar, reflexive: true } }
  - { es: despertarse, id: "bangun (dari tidur)", pos: verb, verb: { group: ar, irregular: true, reflexive: true } }
  - { es: ducharse, id: mandi, pos: verb, verb: { group: ar, reflexive: true } }
  - { es: acostarse, id: "pergi tidur", pos: verb, verb: { group: ar, irregular: true, reflexive: true } }
  - { es: vestirse, id: berpakaian, pos: verb, verb: { group: ir, irregular: true, reflexive: true } }
  - { es: cepillarse, id: "menyikat (gigi)", pos: verb, verb: { group: ar, reflexive: true } }
  - { es: peinarse, id: "menyisir rambut", pos: verb, verb: { group: ar, reflexive: true } }
  - { es: rezar, id: "berdoa, salat", pos: verb, verb: { group: ar } }
  - { es: diente, id: gigi, pos: noun, gender: m }
  - { es: desayuno, id: sarapan, pos: noun, gender: m }
  - { es: rápido, id: cepat, pos: adv }
next: easy2-05-que-hora-es
---

## concept.id
Kata kerja refleksif berakhir **-se** di kamus: *levantarse*, *ducharse*. Saat dipakai, **se** berubah mengikuti orangnya dan pindah ke depan: **me** levanto, **te** levantas, **se** levanta, **nos** levantamos, **se** levantan. Tindakannya kembali ke diri sendiri: aku "membangunkan diriku".

## concept.en
Reflexive verbs end in **-se** in the dictionary: *levantarse*, *ducharse*. In use, **se** changes with the person and moves to the front: **me** levanto, **te** levantas, **se** levanta, **nos** levantamos, **se** levantan. The action comes back to the doer: I "get myself up".

## contrast.id
Bahasa Indonesia tidak menandai ini: *aku bangun*, *aku mandi*. Di bahasa Spanyol, tanpa *me* artinya lain: *levanto la mesa* berarti aku mengangkat meja.

## contrast.en
Indonesian doesn't mark this: *aku bangun*, *aku mandi*. In Spanish, leaving out *me* changes the meaning: *levanto la mesa* means I lift the table.
