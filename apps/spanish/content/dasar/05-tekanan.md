---
id: dasar-05-tekanan
rung: dasar
order: 5
status: draft
minutes: 8
title: { id: "Tekanan dan tanda aksen", en: "Stress and the accent mark", es: "El acento" }
summary:
  id: "Tanda aksen (´) menunjukkan suku yang ditekan. Tanpa aksen: berakhir vokal, *n* atau *s* → suku kedua dari belakang; selain itu → suku terakhir."
  en: "The accent mark (´) shows the stressed syllable. Without one: ending in a vowel, *n* or *s* → second to last; otherwise → last."
introduces: [d-stress]
spiral: stress
visual: { id: stress-map, props: { initial: café } }
examples:
  - { es: "ca[[fé]]", id: kopi }
  - { es: "[[ca]]sa", id: rumah }
  - { es: "[[ár]]bol", id: pohon }
  - { es: "[[mú]]sica", id: musik }
  - { es: "ciu[[dad]]", id: kota }
  - { es: "[[lá]]piz", id: pensil }
pair:
  off: "cafe"
  natural: "ca[[fé]]"
sound:
  focus: "tekanan kata"
  words: ["café", "casa", "música"]
  tip:
    id: "Kalau ada tanda aksen, tekan suku itu. Kalau tidak ada: kata yang berakhir vokal, *n* atau *s* ditekan di suku kedua dari belakang; kata lain di suku terakhir."
    en: "If there is an accent mark, stress that syllable. If not: words ending in a vowel, *n* or *s* are stressed second to last; other words on the last syllable."
tirukan: { es: "el café, la música", id: "kopi, musik" }
check:
  - { id: d-05-c1, type: stress, word: "café", syllables: [ca, fe], stressed: 1, needsAccent: true, why: { id: "*Ca-FÉ*: ditekan di akhir dan berakhir vokal, jadi perlu aksen.", en: "*Ca-FÉ*: stressed last and ends in a vowel, so it needs an accent." } }
  - { id: d-05-c2, type: stress, word: "casa", syllables: [ca, sa], stressed: 0, needsAccent: false, why: { id: "*CA-sa*: berakhir vokal dan ditekan di suku kedua dari belakang. Itu aturan biasa, jadi tanpa aksen.", en: "*CA-sa*: ends in a vowel, stressed second to last. That is the default, so no accent." } }
  - { id: d-05-c3, type: stress, word: "árbol", syllables: [ar, bol], stressed: 0, needsAccent: true, why: { id: "*ÁR-bol*: berakhir *l*, jadi aturan biasa menekan suku terakhir. Tekanannya di depan, maka perlu aksen.", en: "*ÁR-bol*: ends in *l*, so the default would stress the last syllable. The stress is first, so it needs an accent." } }
  - { id: d-05-c4, type: stress, word: "ciudad", syllables: [ciu, dad], stressed: 1, needsAccent: false, why: { id: "*Ciu-DAD*: berakhir *d* dan ditekan di akhir. Itu aturan biasa, jadi tanpa aksen.", en: "*Ciu-DAD*: ends in *d*, stressed last. That is the default, so no accent." } }
  - { id: d-05-c5, type: stress, word: "lápiz", syllables: [la, piz], stressed: 0, needsAccent: true, why: { id: "*LÁ-piz*: berakhir *z* tapi ditekan di depan, jadi perlu aksen.", en: "*LÁ-piz*: ends in *z* but is stressed first, so it needs an accent." } }
  - { id: d-05-c6, type: stress, word: "joven", syllables: [jo, ven], stressed: 0, needsAccent: false, why: { id: "*JO-ven*: berakhir *n* dan ditekan di suku kedua dari belakang. Aturan biasa, tanpa aksen.", en: "*JO-ven*: ends in *n*, stressed second to last. The default, no accent." } }
glossary:
  - { es: café, id: kopi, pos: noun, gender: m, plural: cafés }
  - { es: casa, id: rumah, pos: noun, gender: f, plural: casas }
  - { es: árbol, id: pohon, pos: noun, gender: m, plural: árboles }
  - { es: música, id: musik, pos: noun, gender: f }
  - { es: lápiz, id: pensil, pos: noun, gender: m, plural: lápices }
  - { es: joven, id: muda, pos: adj }
next: dasar-06-membaca
---

## concept.id
Setiap kata Spanyol punya satu suku yang ditekan. Kalau ada tanda aksen (´), suku itulah yang ditekan. Kalau tidak ada, aturannya sederhana: kata yang berakhir vokal, *n* atau *s* ditekan di suku kedua dari belakang, kata lain di suku terakhir.

## concept.en
Every Spanish word has one stressed syllable. If there is an accent mark (´), that syllable is stressed. If not, the rule is simple: words ending in a vowel, *n* or *s* are stressed second to last, other words on the last syllable.

## contrast.id
Bahasa Indonesia jarang membedakan arti dengan tekanan. Dalam bahasa Spanyol tekanan penting, dan tanda aksen menunjukkannya tanpa kamu perlu menebak.

## contrast.en
Indonesian rarely changes meaning with stress. In Spanish stress matters, and the accent mark shows it so you never have to guess.
