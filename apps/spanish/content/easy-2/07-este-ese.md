---
id: easy2-07-este-ese
rung: easy-2
order: 7
status: draft
minutes: 9
title: { id: "Belanja: ini, itu, yang di sana", en: "Shopping: this, that, that one over there", es: "¿Cuánto cuesta esta camisa?" }
summary:
  id: "*Este/esta* (dekat aku), *ese/esa* (dekat kamu), *aquel/aquella* (jauh dari kita berdua), mengikuti gender dan jumlah bendanya."
  en: "*Este/esta* (near me), *ese/esa* (near you), *aquel/aquella* (far from us both), agreeing in gender and number."
introduces: [a1-demonstratives]
spiral: agreement
worked:
  - { es: "Esta camisa es roja.", id: "Kemeja ini merah." }
  - { es: "Ese pantalón es negro.", id: "Celana itu hitam." }
  - { es: "Aquella tienda es nueva.", id: "Toko yang di sana itu baru." }
examples:
  - { es: "¿Cuánto cuesta [[esta]] camisa?", id: "Kemeja ini berapa?" }
  - { es: "[[Ese]] vestido es muy bonito.", id: "Gaun itu cantik sekali." }
  - { es: "Quiero [[estos]] zapatos negros.", id: "Aku mau sepatu hitam ini." }
  - { es: "[[Aquella]] tienda es barata.", id: "Toko yang di sana itu murah." }
  - { es: "¿Tiene [[esta]] falda en azul?", id: "Rok ini ada yang biru, Bu?" }
pair:
  off: "Este camisa es roja."
  natural: "[[Esta]] camisa es roja."
words:
  id: "*Camisa* sampai ke bahasa Indonesia sebagai *kemeja*, dan *zapato* (Portugis *sapato*) sebagai *sepatu*."
  en: "*Camisa* reached Indonesian as *kemeja*, and *zapato* (Portuguese *sapato*) as *sepatu*."
  bridges: [camisa, zapato]
talk:
  lines:
    - { who: Vendedora, es: "Buenas tardes. ¿Qué desea?", id: "Selamat siang. Cari apa, Bu?" }
    - { who: Ana, es: "¿Cuánto cuesta esta chaqueta?", id: "Jaket ini berapa?" }
    - { who: Vendedora, es: "Cuesta ochenta pesos.", id: "Delapan puluh peso." }
    - { who: Ana, es: "Es un poco cara. ¿Y esa?", id: "Agak mahal. Kalau yang itu?" }
tirukan: { es: "¿Cuánto cuesta esta camisa azul?", id: "Kemeja biru ini berapa?" }
check:
  - id: e2-07-c1
    type: gap
    cue: "Kemeja ini merah."
    prompt: "___ camisa es roja."
    options: [Esta, Este, Estos]
    answer: Esta
    why: { id: "*Camisa* feminin tunggal: *esta*.", en: "*Camisa* is feminine singular: *esta*." }
  - id: e2-07-c2
    type: gap
    cue: "Aku mau sepatu ini."
    prompt: "Quiero ___ zapatos."
    options: [estos, estas, este]
    answer: estos
    why: { id: "*Zapatos* maskulin jamak: *estos*.", en: "*Zapatos* is masculine plural: *estos*." }
  - id: e2-07-c3
    type: agree
    noun: { es: camisas, gender: f, number: pl, id: kemeja-kemeja }
    adj: rojo
    definite: true
    options: { article: [los, las], adjective: [rojos, rojas] }
    answers: { article: las, adjective: rojas }
    why: { id: "*Camisas* feminin jamak: *las* dan *rojas*.", en: "*Camisas* is feminine plural: *las* and *rojas*." }
  - id: e2-07-c4
    type: choice
    lang: id
    prompt: "*Aquella tienda* artinya toko…"
    options: ["yang jauh di sana", "yang ini", "yang dekat kamu"]
    answer: "yang jauh di sana"
    why: { id: "*Aquel/aquella*: jauh dari aku dan kamu.", en: "*Aquel/aquella*: far from both of us." }
  - id: e2-07-c5
    type: listen
    audio: "¿Cuánto cuesta?"
    options: ["¿Cuánto cuesta?", "¿Cuándo cierra?", "¿Cuántos son?"]
    answer: "¿Cuánto cuesta?"
    why: { id: "*¿Cuánto cuesta?*: berapa harganya?", en: "*¿Cuánto cuesta?*: how much is it?" }
glossary:
  - { es: costar, id: berharga, pos: verb, verb: { group: ar, irregular: true } }
  - { es: camisa, id: kemeja, pos: noun, gender: f, bridge: { pt: camisa, id: kemeja } }
  - { es: zapato, id: sepatu, pos: noun, gender: m, bridge: { pt: sapato, id: sepatu } }
  - { es: vestido, id: gaun, pos: noun, gender: m }
  - { es: falda, id: rok, pos: noun, gender: f }
  - { es: chaqueta, id: jaket, pos: noun, gender: f }
  - { es: pantalón, id: "celana panjang", pos: noun, gender: m, plural: pantalones }
  - { es: peso, id: "peso (mata uang)", pos: noun, gender: m }
  - { es: rojo, id: merah, pos: adj }
  - { es: negro, id: hitam, pos: adj }
  - { es: barato, id: murah, pos: adj }
  - { es: caro, id: mahal, pos: adj }
next: easy2-08-quisiera
---

## concept.id
Kata tunjuk Spanyol punya tiga jarak: **este** (dekat aku), **ese** (dekat kamu), **aquel** (jauh dari kita berdua). Ketiganya mengikuti gender dan jumlah bendanya: *esta camisa*, *estos zapatos*, *esas faldas*, *aquella tienda*.

## concept.en
Spanish demonstratives have three distances: **este** (near me), **ese** (near you), **aquel** (far from us both). All three agree with the noun: *esta camisa*, *estos zapatos*, *esas faldas*, *aquella tienda*.

## contrast.id
Bahasa Indonesia cukup *ini* dan *itu*, tanpa gender. Untuk yang jauh, kita bilang *yang di sana*; bahasa Spanyol punya kata sendiri, *aquel*.

## contrast.en
Indonesian has just *ini* and *itu*, without gender. For something far away it says *yang di sana*; Spanish has its own word, *aquel*.
