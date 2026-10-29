---
id: easy1-07-ein-kein
rung: easy-1
order: 7
status: draft
minutes: 8
title: { id: "Sebuah dan bukan", en: "A and not a", de: "ein, kein" }
summary:
  id: "Pakai *ein/eine* untuk benda yang baru disebut, *kein/keine* untuk menyangkal kata benda, dan *nicht* untuk yang lain."
  en: "Use *ein/eine* for something mentioned for the first time, *kein/keine* to negate a noun, and *nicht* for everything else."
introduces: [a1-indefinite-kein]
spiral: gender
worked:
  - { de: "Das ist ein Stuhl.", id: "Ini kursi." }
  - { de: "Das ist kein Tisch.", id: "Ini bukan meja." }
  - { de: "Rina ist nicht hier.", id: "Rina tidak ada di sini." }
examples:
  - { de: "Das ist [[ein]] Handy.", id: "Ini HP." }
  - { de: "Das ist [[eine]] Apotheke.", id: "Itu apotek." }
  - { de: "Das ist [[kein]] Kaffee.", id: "Ini bukan kopi." }
  - { de: "Das ist [[keine]] Bank. Das ist die Post.", id: "Itu bukan bank. Itu kantor pos." }
  - { de: "Budi ist [[nicht]] müde.", id: "Budi nggak capek.", note: { id: "*Nicht* untuk kata sifat dan kata kerja; *kein* untuk kata benda.", en: "*Nicht* for adjectives and verbs; *kein* for nouns." } }
  - { de: "Ich bin [[kein]] Lehrer. Ich bin Student.", id: "Aku bukan guru. Aku mahasiswa." }
pair:
  off: "Das ist nicht ein Tisch."
  natural: "Das ist [[kein]] Tisch."
words:
  id: "Banyak kata Indonesia datang dari bahasa Belanda dan mirip bahasa Jerman: *apotek* → **die Apotheke**, *kantin* → **die Kantine**, *klinik* → **die Klinik**, *bank* → **die Bank**. Artinya sama; hafalkan juga *die*-nya."
  en: "Many Indonesian words come from Dutch and look like German: *apotek* → **die Apotheke**, *kantin* → **die Kantine**, *klinik* → **die Klinik**, *bank* → **die Bank**. Same meaning; learn the *die* too."
  bridges: [Apotheke, Kantine, Klinik, Bank]
work:
  situation: { id: "Hari pertama di rumah sakit. Andi mencari kantin.", en: "First day at the hospital. Andi is looking for the canteen." }
  lines:
    - { who: Andi, de: "Entschuldigung, ist das die Kantine?", id: "Permisi, ini kantinnya?" }
    - { who: Frau Wagner, de: "Nein. Das ist keine Kantine. Das ist die Apotheke.", id: "Bukan. Ini bukan kantin. Ini apotek." }
    - { who: Andi, de: "Und wo ist die Kantine?", id: "Kantinnya di mana?" }
    - { who: Frau Wagner, de: "Dort. Guten Appetit!", id: "Di sana. Selamat makan!" }
tirukan: { de: "Das ist keine Apotheke.", id: "Ini bukan apotek." }
check:
  - id: e1-07-c1
    type: gap
    cue: "Ini bukan apotek."
    prompt: "Das ist ___ Apotheke."
    options: [keine, kein, nicht]
    answer: keine
    why: { id: "Kata benda disangkal dengan *kein*; *die Apotheke* → *keine*.", en: "A noun is negated with *kein*; *die Apotheke* → *keine*." }
  - id: e1-07-c2
    type: gap
    cue: "Aku nggak capek."
    prompt: "Ich bin ___ müde."
    options: [nicht, kein, keine]
    answer: nicht
    why: { id: "*Müde* kata sifat, jadi *nicht*.", en: "*Müde* is an adjective, so *nicht*." }
  - id: e1-07-c3
    type: fix
    cue: "Ini bukan HP."
    wrong: "Das ist nicht ein Handy."
    options: ["Das ist kein Handy.", "Das ist keine Handy."]
    answer: "Das ist kein Handy."
    why: { id: "*Nicht ein* menjadi *kein*. *Das Handy* netral, jadi *kein*.", en: "*Nicht ein* becomes *kein*. *Das Handy* is neuter, so *kein*." }
  - id: e1-07-c4
    type: gap
    cue: "Ini kursi."
    prompt: "Das ist ___ Stuhl."
    options: [ein, eine]
    answer: ein
    why: { id: "*Der Stuhl* → *ein Stuhl*. *Eine* hanya untuk kata *die*.", en: "*Der Stuhl* → *ein Stuhl*. *Eine* is only for *die* nouns." }
  - id: e1-07-c5
    type: listen
    audio: "Das ist keine Bank."
    options: ["Das ist keine Bank.", "Das ist eine Bank."]
    answer: "Das ist keine Bank."
    why: { id: "Dengarkan bunyi *k* di depan: *keine* = bukan.", en: "Listen for the *k* at the start: *keine* = not a." }
  - id: e1-07-c6
    type: gender
    noun: Handy
    answer: n
    why: { id: "*Das Handy*: hafalkan saja, tidak ada petunjuk akhiran.", en: "*Das Handy*: just learn it, there's no ending clue." }
glossary:
  - { de: Apotheke, id: apotek, pos: noun, gender: f, plural: Apotheken, bridge: { nl: apotheek, id: apotek } }
  - { de: Kantine, id: kantin, pos: noun, gender: f, plural: Kantinen, bridge: { nl: kantine, id: kantin } }
  - { de: Klinik, id: klinik, pos: noun, gender: f, plural: Kliniken, bridge: { nl: kliniek, id: klinik } }
  - { de: Bank, id: bank, pos: noun, gender: f, plural: Banken, bridge: { nl: bank, id: bank } }
  - { de: Post, id: kantor pos, pos: noun, gender: f, plural: "—" }
  - { de: Stuhl, id: kursi, pos: noun, gender: m, plural: Stühle }
  - { de: Handy, id: HP, pos: noun, gender: n, plural: Handys }
  - { de: Kaffee, id: kopi, pos: noun, gender: m, plural: Kaffees }
  - { de: müde, id: capek, pos: adj }
  - { de: nicht, id: tidak, pos: adv }
  - { de: Guten Appetit!, id: selamat makan, pos: expr }
next: easy1-08-meine-familie
---

## concept.id
**Ein** (der, das) dan **eine** (die) untuk benda yang baru disebut: *ein Stuhl, eine Lampe, ein Bett*. Untuk menyangkal kata benda, pakai **kein/keine**: *Das ist kein Tisch.* Untuk kata sifat dan kata kerja, pakai **nicht**: *Ich bin nicht müde.*

## concept.en
**Ein** (der, das) and **eine** (die) are for something mentioned for the first time: *ein Stuhl, eine Lampe, ein Bett*. To negate a noun, use **kein/keine**: *Das ist kein Tisch.* For adjectives and verbs, use **nicht**: *Ich bin nicht müde.*

## contrast.id
Bahasa Indonesia punya *bukan* dan *tidak*, dan aturannya mirip: *bukan meja* → *kein Tisch*, *tidak capek* → *nicht müde*. Tapi bahasa Jerman tidak bilang *nicht ein*; keduanya bergabung jadi satu kata: *kein*.

## contrast.en
Indonesian has *bukan* and *tidak*, and the rule is similar: *bukan meja* → *kein Tisch*, *tidak capek* → *nicht müde*. But German doesn't say *nicht ein*; the two merge into one word: *kein*.
