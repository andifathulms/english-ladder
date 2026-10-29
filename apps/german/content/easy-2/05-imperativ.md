---
id: easy2-05-imperativ
rung: easy-2
order: 5
status: draft
minutes: 9
title: { id: "Perintah dan instruksi", en: "Commands and instructions", de: "Waschen Sie bitte die Hände" }
summary:
  id: "Beri dan pahami instruksi: dengan *Sie* kata kerja di depan lalu *Sie* (*Warten Sie hier*); dengan *du* cukup akarnya (*Warte!*, *Komm!*)."
  en: "Give and follow instructions: with *Sie* the verb comes first, then *Sie* (*Warten Sie hier*); with *du* just the stem (*Warte!*, *Komm!*)."
introduces: [a1-imperative]
spiral: register
worked:
  - { de: "Sie waschen die Hände. Waschen Sie die Hände!", id: "Anda mencuci tangan. Cuci tangan Anda!" }
  - { de: "Du wartest hier. Warte hier!", id: "Kamu menunggu di sini. Tunggu di sini!" }
  - { de: "Sie rufen den Arzt an. Rufen Sie den Arzt an!", id: "Anda menelepon dokter. Telepon dokternya!" }
  - { de: "Du kommst mit. Komm mit!", id: "Kamu ikut. Ikut, yuk!" }
examples:
  - { de: "[[Waschen]] Sie bitte die Hände.", id: "Silakan cuci tangan Anda." }
  - { de: "[[Tragen]] Sie hier immer Handschuhe.", id: "Di sini selalu pakai sarung tangan." }
  - { de: "[[Warte]] mal kurz!", id: "Tunggu sebentar!" }
  - { de: "[[Komm]], wir gehen!", id: "Ayo, kita pergi!" }
  - { de: "[[Nimm]] den Schlüssel!", id: "Bawa kuncinya!", note: { id: "*Nehmen* berubah vokal juga di perintah *du*: *nimm*. *Fahren* tidak: *fahr*.", en: "*Nehmen* keeps its vowel change in the *du* command: *nimm*. *Fahren* doesn't: *fahr*." } }
  - { de: "[[Rufen]] Sie bitte sofort den Arzt [[an]].", id: "Tolong segera telepon dokter." }
pair:
  off: "Warten hier, bitte!"
  natural: "[[Warten]] Sie hier, bitte!"
work:
  situation: { id: "Hari pertama Budi di bengkel. Pak Schmidt memberi instruksi keselamatan.", en: "Budi's first day in the workshop. Herr Schmidt gives the safety instructions." }
  lines:
    - { who: Herr Schmidt, de: "Tragen Sie bitte immer Handschuhe.", id: "Selalu pakai sarung tangan, ya." }
    - { who: Budi, de: "Und die Brille auch?", id: "Kacamatanya juga, Pak?" }
    - { who: Herr Schmidt, de: "Ja. Und öffnen Sie die Maschine nicht!", id: "Ya. Dan jangan buka mesinnya!" }
    - { who: Budi, de: "Alles klar, Herr Schmidt.", id: "Baik, Pak Schmidt." }
words:
  id: "**Der Handschuh** = *die Hand* (tangan) + *der Schuh* (sepatu): *sepatu tangan*. Kata terakhir menentukan: *der*."
  en: "**Der Handschuh** = *die Hand* (hand) + *der Schuh* (shoe): a *hand shoe*, a glove. The last word decides: *der*."
  compounds: [[Hand, Schuh]]
talk:
  lines:
    - { who: Mei, de: "Komm, der Bus kommt!", id: "Ayo, busnya datang!" }
    - { who: Andi, de: "Warte! Ich suche meinen Schlüssel.", id: "Tunggu! Aku lagi cari kunciku." }
    - { who: Mei, de: "Schnell, Andi!", id: "Cepetan, Andi!" }
tirukan: { de: "Waschen Sie bitte die Hände.", id: "Silakan cuci tangan Anda." }
check:
  - id: e2-05-c1
    type: form
    cue: "Silakan tunggu di sini."
    base: warten
    target: { person: sie, tense: imperativ }
    frame: "Bitte ___ hier."
    options: [warten Sie, Sie warten, wartet]
    answer: warten Sie
    why: { id: "Perintah dengan *Sie*: kata kerja dulu, lalu *Sie*.", en: "A *Sie* command: the verb first, then *Sie*." }
  - id: e2-05-c2
    type: form
    cue: "Lena, ayo datang!"
    base: kommen
    target: { person: du, tense: imperativ }
    frame: "Lena, ___ bitte!"
    options: [komm, kommst, kommen]
    answer: komm
    why: { id: "Perintah *du*: akarnya saja, tanpa *du* dan tanpa *-st*.", en: "A *du* command: just the stem, no *du* and no *-st*." }
  - id: e2-05-c3
    type: conjugate
    verb: nehmen
    tense: imperativ
    persons: [du, ihr, sie]
    answers: { du: nimm, ihr: nehmt, sie: nehmen Sie }
    why: { id: "*Du*: *nimm* (e → i). *Ihr*: seperti biasa, *nehmt*. *Sie*: *nehmen Sie*.", en: "*Du*: *nimm* (e → i). *Ihr*: as usual, *nehmt*. *Sie*: *nehmen Sie*." }
  - id: e2-05-c4
    type: fix
    cue: "Tunggu di sini, ya! (kepada Bu Becker)"
    wrong: "Warten hier, bitte!"
    options: ["Warten Sie hier, bitte!", "Sie warten hier, bitte!"]
    answer: "Warten Sie hier, bitte!"
    why: { id: "Perintah sopan butuh *Sie* setelah kata kerja. Tanpa *Sie* terdengar kasar atau salah.", en: "A polite command needs *Sie* after the verb. Without it, it sounds rude or wrong." }
  - id: e2-05-c5
    type: listen
    audio: "Waschen Sie bitte die Hände."
    options: ["Waschen Sie bitte die Hände.", "Waschen Sie bitte die Handtücher."]
    answer: "Waschen Sie bitte die Hände."
    why: { id: "*Die Hände* = tangan; *die Handtücher* = handuk.", en: "*Die Hände* = hands; *die Handtücher* = towels." }
  - id: e2-05-c6
    type: wordorder
    tiles: [an, Rufen, Sie, bitte, Frau Becker]
    answer: [Rufen, Sie, bitte, Frau Becker, an]
    zones: [verb, middle, middle, middle, end]
    why: { id: "Perintah: kata kerja di depan, *Sie* setelahnya, *an* di akhir.", en: "A command: the verb first, *Sie* after it, *an* at the end." }
glossary:
  - { de: waschen, id: mencuci, en: to wash, pos: verb, verb: { aux: haben, partizip: gewaschen } }
  - { de: tragen, id: memakai; membawa, en: to wear; carry, pos: verb, verb: { aux: haben, partizip: getragen } }
  - { de: öffnen, id: membuka, en: to open, pos: verb, verb: { aux: haben, partizip: geöffnet } }
  - { de: schließen, id: menutup, en: to close, pos: verb, verb: { aux: haben, partizip: geschlossen } }
  - { de: Hand, id: tangan, en: hand, pos: noun, gender: f, plural: Hände }
  - { de: Handschuh, id: sarung tangan, en: glove, pos: noun, gender: m, plural: Handschuhe }
  - { de: Brille, id: kacamata, en: glasses, pos: noun, gender: f, plural: Brillen }
  - { de: Maschine, id: mesin, en: machine, pos: noun, gender: f, plural: Maschinen }
  - { de: immer, id: selalu, en: always, pos: adv }
  - { de: schnell, id: cepat, en: fast, pos: adj }
  - { de: kurz, id: pendek; sebentar, en: short, pos: adj }
  - { de: mal, id: "-lah; coba (melunakkan)", en: just (softener), pos: adv }
next: easy2-06-mit-dem-bus
---

## concept.id
Perintah dengan **Sie**: kata kerja di depan, lalu *Sie*: *Warten Sie hier.* Dengan **du**: akar kata kerja saja, tanpa *du*: *Warte!*, *Komm!* Kata kerja *e → i* tetap berubah (*nimm*, *gib*), kata kerja *a → ä* tidak (*fahr*). Awalan kata kerja terpisah tetap di akhir: *Rufen Sie den Arzt **an***.

## concept.en
Commands with **Sie**: the verb first, then *Sie*: *Warten Sie hier.* With **du**: just the verb stem, no *du*: *Warte!*, *Komm!* Verbs with *e → i* keep the change (*nimm*, *gib*); *a → ä* verbs don't (*fahr*). A separable prefix still goes to the end: *Rufen Sie den Arzt **an***.

## contrast.id
Bahasa Indonesia membuang subjek dalam perintah: *Tunggu di sini!* Dengan *du* bahasa Jerman juga begitu (*Warte hier!*), tapi dengan atasan, pasien atau orang asing, *Sie* wajib ada: *Warten Sie hier, bitte.* Kata *bitte* dan *mal* membuat perintah lebih sopan, seperti *tolong* dan *-lah*.

## contrast.en
Indonesian drops the subject in commands: *Tunggu di sini!* German does that with *du* too (*Warte hier!*), but with a boss, a patient or a stranger, *Sie* must be there: *Warten Sie hier, bitte.* *Bitte* and *mal* make a command softer, like Indonesian *tolong* and *-lah*.
