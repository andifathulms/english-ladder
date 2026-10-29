---
id: easy1-08-meine-familie
rung: easy-1
order: 8
status: draft
minutes: 9
title: { id: "Keluargaku", en: "My family", de: "Meine Familie" }
summary:
  id: "Pakai *haben* (ich habe, du hast, er hat) dan *mein/meine*, *dein/deine* untuk bercerita tentang keluarga."
  en: "Use *haben* (ich habe, du hast, er hat) and *mein/meine*, *dein/deine* to talk about your family."
introduces: [a1-haben-possessives]
spiral: gender
worked:
  - { de: "Das ist mein Bruder.", id: "Ini saudara laki-lakiku." }
  - { de: "Das ist meine Schwester.", id: "Ini saudara perempuanku." }
  - { de: "Ich habe eine Schwester.", id: "Aku punya satu saudara perempuan." }
examples:
  - { de: "[[Mein]] Vater ist Fahrer.", id: "Ayahku sopir." }
  - { de: "[[Meine]] Mutter heißt Siti.", id: "Ibuku namanya Siti." }
  - { de: "Ich [[habe]] eine Tochter.", id: "Aku punya anak perempuan." }
  - { de: "[[Hast]] du ein Foto?", id: "Kamu punya fotonya?" }
  - { de: "Ist das [[dein]] Handy?", id: "Ini HP-mu?" }
  - { de: "Wayan [[hat]] eine Katze.", id: "Wayan punya kucing." }
pair:
  off: "Mein Mutter ist Lehrerin."
  natural: "[[Meine]] Mutter ist Lehrerin."
work:
  situation: { id: "Saat istirahat, kepala bangsal bertanya kepada Putu tentang keluarganya.", en: "On a break, the ward manager asks Putu about her family." }
  lines:
    - { who: Frau Becker, de: "Haben Sie Familie in Deutschland?", id: "Anda punya keluarga di Jerman?" }
    - { who: Putu, de: "Nein. Meine Familie wohnt in Bali.", id: "Tidak. Keluarga saya tinggal di Bali." }
    - { who: Frau Becker, de: "Haben Sie ein Foto?", id: "Ada fotonya?" }
    - { who: Putu, de: "Ja, hier. Das ist meine Mutter.", id: "Ada, ini. Ini ibu saya." }
talk:
  lines:
    - { who: Dewi, de: "Hast du eine Schwester?", id: "Kamu punya saudara perempuan?" }
    - { who: Jonas, de: "Ja. Meine Schwester heißt Anna. Sie wohnt in München.", id: "Punya. Namanya Anna. Dia tinggal di München." }
    - { who: Dewi, de: "Und dein Bruder?", id: "Kalau saudara laki-lakimu?" }
    - { who: Jonas, de: "Mein Bruder wohnt hier in Hamburg.", id: "Dia tinggal di sini, di Hamburg." }
tirukan: { de: "Das ist meine Familie.", id: "Ini keluargaku." }
check:
  - id: e1-08-c1
    type: conjugate
    verb: haben
    tense: praesens
    persons: [ich, du, er, wir]
    answers: { ich: habe, du: hast, er: hat, wir: haben }
    why: { id: "*Haben* sedikit tidak beraturan: *du hast, er hat* (tanpa *b*).", en: "*Haben* is slightly irregular: *du hast, er hat* (no *b*)." }
  - id: e1-08-c2
    type: gap
    cue: "Ibuku perawat."
    prompt: "___ Mutter ist Krankenschwester."
    options: [Meine, Mein]
    answer: Meine
    why: { id: "*Die Mutter* → *meine Mutter*. *Mein* mengikuti artikelnya: die → meine.", en: "*Die Mutter* → *meine Mutter*. *Mein* follows the article: die → meine." }
  - id: e1-08-c3
    type: gap
    cue: "Ini HP-mu?"
    prompt: "Ist das ___ Handy?"
    options: [dein, deine]
    answer: dein
    why: { id: "*Das Handy* → *dein Handy*.", en: "*Das Handy* → *dein Handy*." }
  - id: e1-08-c4
    type: form
    cue: "Rina punya saudara perempuan."
    base: haben
    target: { person: er, tense: praesens }
    frame: "Rina ___ eine Schwester."
    options: [hat, habt, hast]
    answer: hat
    why: { id: "*Rina* = *sie*: *hat*.", en: "*Rina* = *sie*: *hat*." }
  - id: e1-08-c5
    type: listen
    audio: "Mein Sohn heißt Joko."
    options: ["Mein Sohn heißt Joko.", "Mein Onkel heißt Joko."]
    answer: "Mein Sohn heißt Joko."
    why: { id: "*Sohn* = anak laki-laki; *Onkel* = paman.", en: "*Sohn* = son; *Onkel* = uncle." }
  - id: e1-08-c6
    type: fix
    cue: "Saudara perempuanku tinggal di Medan."
    wrong: "Mein Schwester wohnt in Medan."
    options: ["Meine Schwester wohnt in Medan.", "Meinen Schwester wohnt in Medan."]
    answer: "Meine Schwester wohnt in Medan."
    why: { id: "*Die Schwester* → *meine Schwester*.", en: "*Die Schwester* → *meine Schwester*." }
glossary:
  - { de: haben, id: punya, pos: verb, verb: { aux: haben, partizip: gehabt } }
  - { de: mein, id: "-ku", pos: det }
  - { de: dein, id: "-mu", pos: det }
  - { de: Familie, id: keluarga, pos: noun, gender: f, plural: Familien }
  - { de: Vater, id: ayah, pos: noun, gender: m, plural: Väter }
  - { de: Mutter, id: ibu, pos: noun, gender: f, plural: Mütter }
  - { de: Bruder, id: saudara laki-laki, pos: noun, gender: m, plural: Brüder }
  - { de: Schwester, id: saudara perempuan, pos: noun, gender: f, plural: Schwestern }
  - { de: Sohn, id: anak laki-laki, pos: noun, gender: m, plural: Söhne }
  - { de: Tochter, id: anak perempuan, pos: noun, gender: f, plural: Töchter }
  - { de: Foto, id: foto, pos: noun, gender: n, plural: Fotos }
  - { de: Katze, id: kucing, pos: noun, gender: f, plural: Katzen }
next: easy1-09-plural
---

## concept.id
**Haben** (punya): *ich habe, du hast, er/sie hat, wir haben, ihr habt, sie/Sie haben*. **Mein** (-ku) dan **dein** (-mu) mengikuti artikel kata bendanya: *der Bruder* → *mein Bruder*, *das Foto* → *mein Foto*, *die Mutter* → *meine Mutter*. Polanya sama dengan *ein/eine*.

## concept.en
**Haben** (to have): *ich habe, du hast, er/sie hat, wir haben, ihr habt, sie/Sie haben*. **Mein** (my) and **dein** (your) follow the noun's article: *der Bruder* → *mein Bruder*, *das Foto* → *mein Foto*, *die Mutter* → *meine Mutter*. The pattern is the same as *ein/eine*.

## contrast.id
Bahasa Indonesia menempel *-ku* di belakang dan tidak pernah berubah: *ibuku, ayahku*. Bahasa Jerman menaruh *mein* di depan, dan bentuknya ikut jenis kata benda: *meine Mutter*, *mein Vater*. *Saudara* juga harus memilih: *Bruder* (laki-laki) atau *Schwester* (perempuan).

## contrast.en
Indonesian adds *-ku* at the end and it never changes: *ibuku, ayahku*. German puts *mein* in front, and its form follows the noun's gender: *meine Mutter*, *mein Vater*. *Saudara* also has to choose: *Bruder* (male) or *Schwester* (female).
