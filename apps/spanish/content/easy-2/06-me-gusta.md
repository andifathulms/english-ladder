---
id: easy2-06-me-gusta
rung: easy-2
order: 6
status: draft
minutes: 9
title: { id: "Suka: kata kerja yang \"terbalik\"", en: "Liking: the \"backwards\" verb", es: "Me gusta, me gustan" }
summary:
  id: "*Me gusta el café*: yang disukai adalah subjek, jadi *gusta* untuk satu benda dan *gustan* untuk banyak."
  en: "*Me gusta el café*: the thing liked is the subject, so *gusta* for one thing and *gustan* for several."
introduces: [a1-gustar]
spiral: gustar
visual: { id: gustar-flip, props: {} }
examples:
  - { es: "Me [[gusta]] el café.", id: "Aku suka kopi." }
  - { es: "Me [[gustan]] los tacos.", id: "Aku suka taco." }
  - { es: "¿Te [[gusta]] el fútbol?", id: "Kamu suka sepak bola?" }
  - { es: "A Rina le [[encanta]] la música.", id: "Rina suka banget musik." }
  - { es: "No nos [[gusta]] el frío.", id: "Kami nggak suka dingin." }
  - { es: "¿Les [[gustan]] las películas?", id: "Kalian suka film?" }
pair:
  off: "Yo gusto el café."
  natural: "Me [[gusta]] el café."
spain:
  rows:
    - { latam: "Me gusta el jugo de naranja.", es: "Me gusta el zumo de naranja." }
  note:
    id: "Jus: *jugo* di Amerika Latin, *zumo* di Spanyol. *Gustar* bekerja sama di keduanya."
    en: "Juice: *jugo* in Latin America, *zumo* in Spain. *Gustar* works the same in both."
words:
  id: "*Sopa* itu sup, bukan sabun. Sabun adalah *jabón*, yang sampai ke bahasa Indonesia lewat Portugis *sabão*."
  en: "*Sopa* is soup, not soap. Soap is *jabón*, which reached Indonesian through Portuguese *sabão*."
  bridges: [sopa]
talk:
  lines:
    - { who: Mateo, es: "¿Te gusta el café?", id: "Kamu suka kopi?" }
    - { who: Dewi, es: "Sí, me encanta. ¿Y a ti?", id: "Iya, suka banget. Kamu?" }
    - { who: Mateo, es: "A mí no. Me gusta el té.", id: "Aku nggak. Aku suka teh." }
tirukan: { es: "Me encanta la sopa de pollo.", id: "Aku suka banget sup ayam." }
check:
  - id: e2-06-c1
    type: gap
    cue: "Aku suka taco."
    prompt: "Me ___ los tacos."
    options: [gusta, gustan]
    answer: gustan
    why: { id: "*Los tacos* jamak, jadi *gustan*.", en: "*Los tacos* is plural, so *gustan*." }
  - id: e2-06-c2
    type: gap
    cue: "Kamu suka kopi?"
    prompt: "¿Te ___ el café?"
    options: [gusta, gustas, gusto]
    answer: gusta
    why: { id: "Yang disukai *el café* (satu), jadi *gusta*, walau orangnya *tú*.", en: "What is liked is *el café* (one), so *gusta*, even with *tú*." }
  - id: e2-06-c3
    type: gap
    cue: "Rina suka banget musik."
    prompt: "A Rina ___ encanta la música."
    options: [le, me, te]
    answer: le
    why: { id: "Untuk dia (Rina): *le*.", en: "For her (Rina): *le*." }
  - id: e2-06-c4
    type: choice
    lang: id
    prompt: "Dalam *Me gusta el café*, apa subjeknya?"
    options: ["el café", "me", "gusta"]
    answer: "el café"
    why: { id: "Kopi yang \"menyenangkan\" aku: *el café* subjeknya.", en: "Coffee is what \"pleases\" me: *el café* is the subject." }
  - id: e2-06-c5
    type: order
    cue: "Aku suka film."
    tiles: [películas, gustan, las, Me]
    answer: [Me, gustan, las, películas]
    why: { id: "*Me gustan* + benda jamak.", en: "*Me gustan* + a plural thing." }
glossary:
  - { es: gustar, id: "disukai (suka)", pos: verb, verb: { group: ar } }
  - { es: encantar, id: "sangat disukai", pos: verb, verb: { group: ar } }
  - { es: música, id: musik, pos: noun, gender: f }
  - { es: película, id: film, pos: noun, gender: f }
  - { es: taco, id: taco, pos: noun, gender: m }
  - { es: sopa, id: sup, pos: noun, gender: f }
  - { es: pollo, id: ayam, pos: noun, gender: m }
  - { es: naranja, id: jeruk, pos: noun, gender: f }
  - { es: frío, id: dingin, pos: noun, gender: m }
  - { es: jugo, id: jus, pos: noun, gender: m, es_es: zumo }
  - { es: té, id: teh, pos: noun, gender: m }
  - { es: café, id: kopi, pos: noun, gender: m }
next: easy2-07-este-ese
---

## concept.id
Di bahasa Spanyol, yang disukai menjadi **subjek**: *me gusta el café* artinya "kopi menyenangkan aku". Karena itu kata kerjanya mengikuti bendanya: **gusta** untuk satu, **gustan** untuk banyak. Orangnya ditandai dengan **me, te, le, nos, les**. *Encantar* (suka banget) bekerja sama.

## concept.en
In Spanish, the thing liked is the **subject**: *me gusta el café* means "coffee pleases me". So the verb follows the thing: **gusta** for one, **gustan** for several. The person is marked with **me, te, le, nos, les**. *Encantar* (to love a thing) works the same way.

## contrast.id
Bahasa Indonesia berkata *saya suka kopi*: saya yang melakukan. Jangan terjemahkan langsung menjadi *yo gusto el café*; itu artinya "aku menyenangkan kopi".

## contrast.en
Indonesian says *saya suka kopi*: I do the liking. Don't translate it word for word as *yo gusto el café*; that means "I please the coffee".
