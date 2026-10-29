---
id: dasar-03-ei-ie-eu
rung: dasar
order: 3
status: draft
minutes: 7
title: { id: "Ei, ie, eu: dua huruf, satu bunyi", en: "Ei, ie, eu: two letters, one sound", de: "ei, ie, eu" }
summary:
  id: "Kamu bisa membaca *ei* (*ai*), *ie* (*i* panjang) dan *eu* (*oi*), dan tahu kapan vokal dibaca pendek atau panjang."
  en: "You can read *ei* (*ai*), *ie* (a long *i*) and *eu* (*oi*), and you know when a vowel is short or long."
introduces: [d-diphthongs]
spiral: sounds
worked:
  - { de: "das Ei, die Arbeit", id: "ei dibaca ai: telur, pekerjaan" }
  - { de: "die Miete", id: "ie dibaca i panjang: sewa" }
  - { de: "neu, die Häuser", id: "eu dan äu dibaca oi: baru, rumah-rumah" }
  - { de: "das Bett", id: "dua huruf mati yang sama: vokalnya pendek" }
examples:
  - { de: "das [[Ei]]", id: "telur" }
  - { de: "die Arb[[ei]]t", id: "pekerjaan, kerja" }
  - { de: "die M[[ie]]te", id: "sewa (rumah)" }
  - { de: "n[[eu]]", id: "baru" }
  - { de: "die H[[äu]]ser", id: "rumah-rumah" }
  - { de: "das Be[[tt]]", id: "tempat tidur", note: { id: "*tt*: *e* sebelumnya pendek.", en: "*tt*: the *e* before it is short." } }
pair:
  off: "die Meite"
  natural: "die M[[ie]]te"
sound:
  focus: "ei, ie, eu"
  words: ["Ei", "Arbeit", "Miete", "neu", "Häuser"]
  pairs: [["Biene", "Beine"], ["Miete", "Mitte"]]
  tip:
    id: "*Ei* seperti *ai* dalam *pantai*, *eu* dan *äu* seperti *oi* dalam *amboi*. *Ie* adalah satu *i* yang panjang, bukan *i* lalu *e*."
    en: "*Ei* is like the *ai* in *pantai*, *eu* and *äu* like the *oi* in *amboi*. *Ie* is one long *i*, not *i* then *e*."
tirukan: { de: "das Ei, die Miete, neu", id: "telur, sewa, baru" }
check:
  - id: d-03-c1
    type: choice
    lang: id
    prompt: "*Ei* dalam *Arbeit* dibaca seperti …"
    options: ["*ai* dalam *pantai*", "*e* lalu *i*", "*i* panjang"]
    answer: "*ai* dalam *pantai*"
    why: { id: "*Ei* selalu *ai*: *Ar-bait*.", en: "*Ei* always sounds like *ai*: *Ar-bait*." }
  - id: d-03-c2
    type: listen
    audio: "die Miete"
    options: ["die Miete", "die Mitte"]
    answer: "die Miete"
    why: { id: "*Miete* (sewa) dengan *i* panjang. *Mitte* (tengah) dengan *i* pendek, karena ada *tt*.", en: "*Miete* (rent) has a long *i*. *Mitte* (middle) has a short *i* because of *tt*." }
  - id: d-03-c3
    type: choice
    lang: id
    prompt: "*Eu* dalam *neu* dibaca seperti …"
    options: ["*oi* dalam *amboi*", "*e* lalu *u*", "*u* panjang"]
    answer: "*oi* dalam *amboi*"
    why: { id: "*Eu* dan *äu* dibaca *oi*: *noi*, *Hoi-ser*.", en: "*Eu* and *äu* sound like *oi*: *noi*, *Hoi-ser*." }
  - id: d-03-c4
    type: listen
    audio: "die Häuser"
    options: ["die Häuser", "das Haus"]
    answer: "die Häuser"
    why: { id: "*Häuser* (rumah-rumah) dengan *äu*, dibaca *oi*. *Haus* dengan *au*.", en: "*Häuser* (houses) has *äu*, read *oi*. *Haus* has *au*." }
  - id: d-03-c5
    type: choice
    lang: id
    prompt: "Dalam kata mana vokalnya pendek?"
    options: ["*e* dalam *Bett*", "*ie* dalam *Miete*", "*ei* dalam *Ei*"]
    answer: "*e* dalam *Bett*"
    why: { id: "Sebelum dua huruf mati yang sama (*tt*), vokal dibaca pendek.", en: "Before a doubled consonant (*tt*), the vowel is short." }
  - id: d-03-c6
    type: dictation
    audio: "die Miete"
    answer: "die Miete"
    why: { id: "*I* panjang ditulis *ie*: *Miete*.", en: "A long *i* is spelled *ie*: *Miete*." }
glossary:
  - { de: Ei, id: telur, pos: noun, gender: n, plural: Eier }
  - { de: Arbeit, id: "pekerjaan, kerja", pos: noun, gender: f, plural: Arbeiten }
  - { de: Miete, id: "sewa (rumah)", pos: noun, gender: f, plural: Mieten }
  - { de: neu, id: baru, pos: adj }
  - { de: Haus, id: rumah, pos: noun, gender: n, plural: Häuser }
  - { de: Bett, id: "tempat tidur", pos: noun, gender: n, plural: Betten }
next: dasar-04-ich-dan-ach
---

## concept.id
Dua vokal yang berdampingan sering dibaca sebagai satu bunyi. *Ei* dibaca *ai* (*Arbeit*), *ie* dibaca *i* panjang (*Miete*), dan *eu* serta *äu* dibaca *oi* (*neu*, *Häuser*). Bahasa Jerman punya aturan. Untungnya, aturannya bisa ditebak.

## concept.en
Two vowels side by side are often read as one sound. *Ei* sounds like *ai* (*Arbeit*), *ie* is a long *i* (*Miete*), and *eu* and *äu* sound like *oi* (*neu*, *Häuser*). German has rules. Luckily, the rules are predictable.

## contrast.id
Bahasa Indonesia menulis bunyi yang sama dengan *ai* dan *oi*; bahasa Jerman menulisnya *ei* dan *eu*. Panjang-pendek vokal tidak mengubah arti dalam bahasa Indonesia, tapi dalam bahasa Jerman bisa: *Miete* (sewa), *Mitte* (tengah). Petunjuknya: sebelum dua huruf mati yang sama vokalnya pendek (*Bett*), sebelum *h* atau vokal ganda vokalnya panjang (*Tee*).

## contrast.en
Indonesian writes the same sounds as *ai* and *oi*; German writes them *ei* and *eu*. Vowel length doesn't change meaning in Indonesian, but in German it can: *Miete* (rent), *Mitte* (middle). The clue: before a doubled consonant the vowel is short (*Bett*); before *h* or a doubled vowel it is long (*Tee*).
