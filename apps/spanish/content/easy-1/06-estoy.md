---
id: easy1-06-estoy
rung: easy-1
order: 6
status: draft
minutes: 8
title: { id: "Di mana dan bagaimana: estar", en: "Where and how: estar", es: "Estoy en casa" }
summary:
  id: "*Estar* untuk tempat dan keadaan: *estoy en casa*, *estoy cansado*."
  en: "*Estar* for places and states: *estoy en casa*, *estoy cansado*."
introduces: [a1-estar]
spiral: ser-estar
worked:
  - { es: "Estoy en casa.", id: "Aku di rumah." }
  - { es: "Ana está en la escuela.", id: "Ana di sekolah." }
  - { es: "Estamos cansados.", id: "Kami capek." }
examples:
  - { es: "[[Estoy]] en casa.", id: "Aku di rumah." }
  - { es: "Lucía [[está]] en Madrid.", id: "Lucía sedang di Madrid." }
  - { es: "¿Dónde [[estás]]?", id: "Kamu di mana?" }
  - { es: "Estamos [[cansados]].", id: "Kami capek." }
  - { es: "Los niños están [[contentos]].", id: "Anak-anak senang." }
  - { es: "El café está [[caliente]].", id: "Kopinya panas." }
pair:
  off: "Soy en casa."
  natural: "[[Estoy]] en casa."
talk:
  lines:
    - { who: Andi, es: "Hola, Camila. ¿Dónde estás?", id: "Halo, Camila. Kamu di mana?" }
    - { who: Camila, es: "Estoy en la escuela. ¿Y tú?", id: "Aku di sekolah. Kamu?" }
    - { who: Andi, es: "Estoy en casa. Estoy un poco cansado.", id: "Aku di rumah. Agak capek." }
    - { who: Camila, es: "¡Yo también!", id: "Aku juga!" }
tirukan: { es: "¿Dónde estás? Estoy en casa.", id: "Kamu di mana? Aku di rumah." }
check:
  - id: e1-06-c1
    type: gap
    cue: "Aku di kantor."
    prompt: "Yo ___ en la oficina."
    options: [estoy, soy]
    answer: estoy
    why: { id: "Tempat memakai *estar*: *estoy en…*", en: "Location takes *estar*: *estoy en…*" }
  - id: e1-06-c2
    type: gap
    cue: "Diego di mana?"
    prompt: "¿Dónde ___ Diego?"
    options: [está, es]
    answer: está
    why: { id: "*¿Dónde está…?* menanyakan tempat.", en: "*¿Dónde está…?* asks where someone is." }
  - id: e1-06-c3
    type: form
    cue: "Kami di Lima."
    base: estar
    target: { person: nosotros, tense: presente }
    frame: "___ en Lima."
    answer: estamos
    why: { id: "*Nosotros* + *estar*: *estamos*.", en: "*Nosotros* + *estar*: *estamos*." }
  - id: e1-06-c4
    type: gap
    cue: "Ana capek."
    prompt: "Ana está ___."
    options: [cansada, cansado]
    answer: cansada
    why: { id: "Ana perempuan: *cansada*.", en: "Ana is a woman: *cansada*." }
  - id: e1-06-c5
    type: listen
    audio: "¿Dónde estás?"
    options: ["¿Dónde estás?", "¿Dónde está?"]
    answer: "¿Dónde estás?"
    why: { id: "Ada *-s* di akhir: *estás*, untuk *tú*.", en: "There's an *-s* at the end: *estás*, for *tú*." }
glossary:
  - { es: estar, id: "berada; sedang (keadaan)", pos: verb, verb: { group: ar, irregular: true } }
  - { es: oficina, id: kantor, pos: noun, gender: f }
  - { es: escuela, id: sekolah, pos: noun, gender: f, bridge: { pt: escola, id: sekolah } }
  - { es: cansado, id: "lelah, capek", pos: adj }
  - { es: contento, id: senang, pos: adj }
  - { es: enfermo, id: sakit, pos: adj }
  - { es: ocupado, id: sibuk, pos: adj }
  - { es: café, id: kopi, pos: noun, gender: m }
  - { es: caliente, id: panas, pos: adj }
  - { es: frío, id: dingin, pos: adj }
next: easy1-07-ser-estar
---

## concept.id
**Estar** dipakai untuk di mana sesuatu berada dan bagaimana keadaannya sekarang: *estoy en casa*, *estoy cansado*. Bentuknya: *estoy*, *estás*, *está*, *estamos*, *están*. Kata sifatnya tetap ikut orangnya: *Ana está cansada*.

## concept.en
**Estar** says where something is and how it is right now: *estoy en casa*, *estoy cansado*. Its forms: *estoy*, *estás*, *está*, *estamos*, *están*. The adjective still agrees with the person: *Ana está cansada*.

## contrast.id
Bahasa Indonesia cukup bilang *aku di rumah* atau *aku capek*. Bahasa Spanyol butuh kata kerja, dan untuk tempat dan perasaan kata kerjanya *estar*, bukan *ser*.

## contrast.en
Indonesian just says *aku di rumah* or *aku capek*. Spanish needs a verb, and for places and feelings that verb is *estar*, not *ser*.
