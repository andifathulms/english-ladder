---
id: easy1-11-einkaufen
rung: easy-1
order: 11
status: draft
minutes: 9
title: { id: "Belanja dan harga", en: "Shopping and prices", de: "Ich möchte …" }
summary:
  id: "Pesan dengan sopan memakai *Ich möchte …*, tanya harga dengan *Was kostet das?* dan pahami harga dalam euro."
  en: "Order politely with *Ich möchte …*, ask the price with *Was kostet das?* and understand prices in euros."
introduces: [a1-moechte-shopping]
spiral: cases
worked:
  - { de: "Ich möchte einen Kaffee, bitte.", id: "Saya mau kopi satu, ya." }
  - { de: "Was kostet das?", id: "Ini berapa?" }
  - { de: "Das kostet drei Euro fünfzig.", id: "Harganya tiga euro lima puluh sen." }
examples:
  - { de: "Ich [[möchte]] ein Brötchen, bitte.", id: "Saya mau satu roti, ya." }
  - { de: "[[Möchtest]] du einen Tee?", id: "Kamu mau teh?" }
  - { de: "Was [[kostet]] der Reis?", id: "Berasnya berapa?" }
  - { de: "Das Brot [[kostet]] zwei Euro.", id: "Rotinya dua euro." }
  - { de: "Wir [[möchten]] zwei Kilo Kartoffeln.", id: "Kami mau kentang dua kilo." }
  - { de: "Das [[macht]] zusammen zwölf Euro.", id: "Semuanya dua belas euro." }
pair:
  off: "Was kostet?"
  natural: "Was kostet [[das]]?"
work:
  situation: { id: "Jam makan siang di kantin rumah sakit. Fitri membeli makanan.", en: "Lunchtime in the hospital canteen. Fitri buys some food." }
  lines:
    - { who: Fitri, de: "Guten Tag! Ich möchte eine Suppe, bitte.", id: "Selamat siang! Saya mau sup, ya." }
    - { who: Herr Klein, de: "Gern. Möchten Sie auch ein Brötchen?", id: "Baik. Mau roti juga?" }
    - { who: Fitri, de: "Ja, bitte. Was kostet das?", id: "Iya. Semuanya berapa?" }
    - { who: Herr Klein, de: "Das macht vier Euro zwanzig.", id: "Semuanya empat euro dua puluh sen." }
words:
  id: "Hati-hati: **die Rechnung** bukan *rekening*, tapi tagihan atau bon. Orang yang menerima uang di kasir: **der Kassierer** (dari bahasa Belanda *kassier*, seperti *kasir*)."
  en: "Careful: **die Rechnung** isn't a bank account (*rekening*) but a bill. The person at the till: **der Kassierer** (from Dutch *kassier*, like Indonesian *kasir*)."
  bridges: [Rechnung, Kassierer]
tirukan: { de: "Ich möchte einen Kaffee, bitte.", id: "Saya mau kopi satu, ya." }
check:
  - id: e1-11-c1
    type: form
    cue: "Kamu mau apa?"
    base: möchten
    target: { person: du, tense: praesens }
    frame: "Was ___ du?"
    options: [möchtest, möchte, möchtet]
    answer: möchtest
    why: { id: "*Ich möchte*, tapi *du möchtest*.", en: "*Ich möchte*, but *du möchtest*." }
  - id: e1-11-c2
    type: gap
    cue: "Ini berapa?"
    prompt: "Was ___ das?"
    options: [kostet, kosten, kostest]
    answer: kostet
    why: { id: "*Das* = *es*: *kostet*. Akar *kost-* berakhir *-t*, jadi tambah *e*.", en: "*Das* = *es*: *kostet*. The stem *kost-* ends in *-t*, so add *e*." }
  - id: e1-11-c3
    type: case
    cue: "Saya mau satu apel."
    sentence: "Ich möchte ___ Apfel."
    role: akk
    noun: Apfel
    options: [einen, ein, eine]
    answer: einen
    why: { id: "Yang kamu mau adalah objek: *der Apfel* → *einen Apfel*.", en: "What you want is the object: *der Apfel* → *einen Apfel*." }
  - id: e1-11-c4
    type: listen
    audio: "Das kostet sieben Euro."
    options: ["Das kostet sieben Euro.", "Das kostet siebzehn Euro.", "Das kostet siebzig Euro."]
    answer: "Das kostet sieben Euro."
    why: { id: "*Sieben* = 7, *siebzehn* = 17, *siebzig* = 70.", en: "*Sieben* = 7, *siebzehn* = 17, *siebzig* = 70." }
  - id: e1-11-c5
    type: wordorder
    cue: "Saya mau sebotol air."
    tiles: [eine Flasche Wasser, möchte, Ich]
    answer: [Ich, möchte, eine Flasche Wasser]
    zones: [p1, verb, middle]
    why: { id: "*Möchte* di posisi 2, seperti kata kerja lain.", en: "*Möchte* goes in position 2, like any verb." }
  - id: e1-11-c6
    type: fix
    cue: "Berapa harganya?"
    wrong: "Was kostet?"
    options: ["Was kostet das?", "Was kosten das?"]
    answer: "Was kostet das?"
    why: { id: "Bahasa Jerman butuh subjek: *Was kostet **das**?* Bahasa Indonesia cukup *Berapa?*", en: "German needs a subject: *Was kostet **das**?* Indonesian just says *Berapa?*" }
glossary:
  - { de: möchten, id: "ingin, mau (sopan)", pos: verb, verb: { aux: haben, partizip: gemocht } }
  - { de: kosten, id: berharga, pos: verb, verb: { aux: haben, partizip: gekostet } }
  - { de: Euro, id: euro, pos: noun, gender: m, plural: Euro }
  - { de: Brot, id: roti, pos: noun, gender: n, plural: Brote }
  - { de: Reis, id: "nasi; beras", pos: noun, gender: m, plural: "—" }
  - { de: Suppe, id: sup, pos: noun, gender: f, plural: Suppen }
  - { de: Wasser, id: air, pos: noun, gender: n, plural: "—" }
  - { de: Flasche, id: botol, pos: noun, gender: f, plural: Flaschen }
  - { de: Kilo, id: kilo, pos: noun, gender: n, plural: Kilos }
  - { de: Kartoffel, id: kentang, pos: noun, gender: f, plural: Kartoffeln }
  - { de: Preis, id: harga, pos: noun, gender: m, plural: Preise }
  - { de: gern, id: "dengan senang hati; baik", pos: adv }
next: easy1-12-wo-ist
---

## concept.id
**Ich möchte …** adalah cara sopan untuk bilang *mau*: *Ich möchte einen Kaffee.* Bentuknya: *ich möchte, du möchtest, er/sie möchte, wir möchten, Sie möchten*. Harga: *Was kostet das?* dan *Das kostet drei Euro fünfzig* (3,50 €). Yang dipesan adalah objek, jadi maskulin memakai *einen*.

## concept.en
**Ich möchte …** is the polite way to say *I'd like*: *Ich möchte einen Kaffee.* The forms: *ich möchte, du möchtest, er/sie möchte, wir möchten, Sie möchten*. Prices: *Was kostet das?* and *Das kostet drei Euro fünfzig* (€3.50). What you order is the object, so masculine nouns take *einen*.

## contrast.id
Di warung kita cukup bilang *Berapa?* atau *Kopi satu!*. Bahasa Jerman butuh kalimat lengkap dengan subjek: *Was kostet das?*, *Ich möchte einen Kaffee, bitte.* Sen-nya dibaca tanpa kata *Cent*: *drei Euro fünfzig*. Di Jerman, harga ditulis dengan koma: 3,50 €.

## contrast.en
At a warung you just say *Berapa?* or *Kopi satu!*. German needs a full sentence with a subject: *Was kostet das?*, *Ich möchte einen Kaffee, bitte.* The cents come without the word *Cent*: *drei Euro fünfzig*. In Germany, prices use a comma: 3,50 €.
