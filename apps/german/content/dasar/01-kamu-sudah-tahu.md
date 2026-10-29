---
id: dasar-01-kamu-sudah-tahu
rung: dasar
order: 1
status: draft
minutes: 6
title: { id: "Kamu sudah tahu", en: "You already know these", de: "Koffer, Handtuch, Apotheke" }
summary:
  id: "Kamu sudah kenal beberapa kata Jerman lewat bahasa Belanda: *Koffer*, *Handtuch*, *Apotheke*. Dan kamu tahu bahwa setiap kata benda Jerman ditulis dengan huruf besar."
  en: "You already know some German words through Dutch: *Koffer*, *Handtuch*, *Apotheke*. And you know that every German noun is written with a capital letter."
introduces: [d-bridges]
spiral: sounds
worked:
  - { de: "der Koffer", id: "koper (Belanda: koffer)" }
  - { de: "das Handtuch", id: "handuk (Belanda: handdoek)" }
  - { de: "die Apotheke", id: "apotek (Belanda: apotheek)" }
  - { de: "der Strom", id: "setrum, arus listrik (Belanda: stroom)" }
examples:
  - { de: "der [[K]]offer", id: "koper" }
  - { de: "das [[H]]andtuch", id: "handuk" }
  - { de: "die [[A]]potheke", id: "apotek" }
  - { de: "der [[S]]trom", id: "listrik, setrum" }
  - { de: "die [[K]]antine", id: "kantin" }
  - { de: "die [[T]]ante", id: "tante, bibi" }
pair:
  off: "der koffer"
  natural: "der [[K]]offer"
sound:
  focus: "kata yang sudah kamu kenal"
  words: ["Koffer", "Handtuch", "Apotheke", "Kantine"]
  tip:
    id: "*Ch* dalam *Handtuch* dibaca seperti *kh* dalam *akhir*, dan *th* dalam *Apotheke* dibaca *t* biasa. *E* di akhir *Kantine* tetap dibaca, pelan seperti *e* dalam *besar*."
    en: "*Ch* in *Handtuch* sounds like the *kh* in *akhir*, and *th* in *Apotheke* is a plain *t*. The final *e* in *Kantine* is still said, softly, like the *e* in *besar*."
words:
  id: "Kata-kata ini masuk ke bahasa Indonesia lewat bahasa Belanda, saudara dekat bahasa Jerman. Ejaannya berubah sedikit, tapi kamu sudah mengenalnya."
  en: "These words came into Indonesian through Dutch, a close relative of German. The spelling changed a little, but you already know them."
  bridges: [Koffer, Handtuch, Apotheke, Strom]
tirukan: { de: "der Koffer, das Handtuch, die Apotheke", id: "koper, handuk, apotek" }
check:
  - id: d-01-c1
    type: choice
    lang: id
    prompt: "*Handtuch* artinya …"
    options: [handuk, tangan, kantong]
    answer: handuk
    why: { id: "*Handuk* datang dari bahasa Belanda *handdoek*, saudara *Handtuch*.", en: "*Handuk* comes from Dutch *handdoek*, a relative of *Handtuch*." }
  - id: d-01-c2
    type: listen
    audio: "die Apotheke"
    options: ["die Apotheke", "die Kantine", "die Tante"]
    answer: "die Apotheke"
    why: { id: "*A-po-THE-ke*: apotek. Tekanannya di suku ketiga.", en: "*A-po-THE-ke*: pharmacy. The stress is on the third syllable." }
  - id: d-01-c3
    type: choice
    lang: id
    prompt: "Mana ejaan yang benar?"
    options: ["der Koffer", "der koffer", "Der koffer"]
    answer: "der Koffer"
    why: { id: "*Koffer* kata benda, jadi huruf besar. *Der* bukan kata benda, jadi huruf kecil.", en: "*Koffer* is a noun, so it takes a capital. *Der* is not a noun, so it stays small." }
  - id: d-01-c4
    type: choice
    lang: id
    prompt: "*Setrum* datang dari bahasa Belanda *stroom*. Dalam bahasa Jerman, listrik adalah …"
    options: [Strom, Setrum, Strum]
    answer: Strom
    why: { id: "*Der Strom*: arus listrik. Bahasa Indonesia mengambilnya dari bahasa Belanda *stroom*.", en: "*Der Strom*: electric current. Indonesian took it from Dutch *stroom*." }
  - id: d-01-c5
    type: dictation
    audio: "Koffer"
    answer: "Koffer"
    nounCaps: true
    why: { id: "*Koffer* kata benda, jadi ditulis dengan *K* besar, dan dengan dua *f*.", en: "*Koffer* is a noun, so it starts with a capital *K*, and has two *f*s." }
  - id: d-01-c6
    type: listen
    audio: "die Kantine"
    options: ["die Kantine", "die Tante"]
    answer: "die Kantine"
    why: { id: "*Kan-TI-ne*: kantin. *E* di akhir tetap dibaca.", en: "*Kan-TI-ne*: canteen. The final *e* is still said." }
glossary:
  - { de: Koffer, id: koper, pos: noun, gender: m, plural: Koffer, bridge: { nl: koffer, id: koper } }
  - { de: Handtuch, id: handuk, pos: noun, gender: n, plural: Handtücher, bridge: { nl: handdoek, id: handuk } }
  - { de: Apotheke, id: apotek, pos: noun, gender: f, plural: Apotheken, bridge: { nl: apotheek, id: apotek } }
  - { de: Strom, id: "listrik, arus listrik", pos: noun, gender: m, plural: Ströme, bridge: { nl: stroom, id: setrum } }
  - { de: Kantine, id: kantin, pos: noun, gender: f, plural: Kantinen, bridge: { nl: kantine, id: kantin } }
  - { de: Tante, id: "tante, bibi", pos: noun, gender: f, plural: Tanten, bridge: { nl: tante, id: tante } }
next: dasar-02-umlaut
---

## concept.id
Kamu sudah tahu beberapa kata Jerman. Bahasa Indonesia meminjam *koper*, *handuk* dan *apotek* dari bahasa Belanda, saudara dekat bahasa Jerman, dan di Jerman kata-kata itu menjadi *Koffer*, *Handtuch* dan *Apotheke*. Satu hal baru: setiap kata benda Jerman ditulis dengan huruf besar, di mana pun letaknya dalam kalimat.

## concept.en
You already know some German words. Indonesian borrowed *koper*, *handuk* and *apotek* from Dutch, a close relative of German, and in German they are *Koffer*, *Handtuch* and *Apotheke*. One new thing: every German noun starts with a capital letter, wherever it stands in a sentence.

## contrast.id
Bahasa Indonesia memakai huruf besar hanya untuk nama dan awal kalimat. Bahasa Jerman juga memakainya untuk semua kata benda: *der Koffer*, *die Kantine*. Hati-hati, tidak semua kata pinjaman cocok: *kamar* dari bahasa Belanda *kamer*, tapi bahasa Jerman memakai *das Zimmer*.

## contrast.en
Indonesian uses capitals only for names and the start of a sentence. German also uses them for every noun: *der Koffer*, *die Kantine*. Careful, not every loanword matches: *kamar* comes from Dutch *kamer*, but German says *das Zimmer*.
