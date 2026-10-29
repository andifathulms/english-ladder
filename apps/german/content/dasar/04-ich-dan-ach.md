---
id: dasar-04-ich-dan-ach
rung: dasar
order: 4
status: draft
minutes: 8
title: { id: "Ich dan ach: huruf mati Jerman", en: "Ich and ach: German consonants", de: "ich und ach" }
summary:
  id: "Kamu bisa membaca dua bunyi *ch* (*ich*, *Buch*), *sch*, *sp* dan *st* di awal kata, serta *z*, *w*, *v* dan *j*."
  en: "You can read the two *ch* sounds (*ich*, *Buch*), *sch*, *sp* and *st* at the start of a word, and *z*, *w*, *v* and *j*."
introduces: [d-consonants]
spiral: sounds
visual: { id: mouth-places-de, props: { initial: ich } }
examples:
  - { de: "i[[ch]]", id: "saya", note: { id: "Setelah *i*: bunyi *ch* yang ringan, di langit-langit depan.", en: "After *i*: the light *ch*, at the hard palate." } }
  - { de: "das Bu[[ch]]", id: "buku", note: { id: "Setelah *u*: seperti *kh* dalam *akhir*.", en: "After *u*: like the *kh* in *akhir*." } }
  - { de: "die [[Sch]]ule", id: "sekolah" }
  - { de: "die [[St]]adt", id: "kota" }
  - { de: "die [[Z]]eit", id: "waktu" }
  - { de: "das [[W]]asser", id: "air" }
pair:
  off: "die Schtadt"
  natural: "die [[St]]adt"
sound:
  focus: "ich dan ach"
  words: ["ich", "Buch", "Schule", "Stadt", "Zeit", "Vater"]
  pairs: [["Kirche", "Kirsche"]]
  tip:
    id: "Setelah *a*, *o*, *u* dan *au*, *ch* seperti *kh* dalam *akhir*. Setelah huruf lain, ucapkan *i* lalu hembuskan udara tanpa suara: *ich*."
    en: "After *a*, *o*, *u* and *au*, *ch* is like the *kh* in *akhir*. After other letters, say *i* and then breathe out without voice: *ich*."
tirukan: { de: "ich, das Buch, die Stadt", id: "saya, buku, kota" }
check:
  - id: d-04-c1
    type: choice
    lang: id
    prompt: "*Ch* dalam *Buch* dibaca seperti …"
    options: ["*kh* dalam *akhir*", "*c* dalam *cari*", "*k* dalam *kaki*"]
    answer: "*kh* dalam *akhir*"
    why: { id: "Setelah *u*, *ch* dibaca di belakang mulut, seperti *kh*.", en: "After *u*, *ch* is made at the back of the mouth, like *kh*." }
  - id: d-04-c2
    type: scene
    lang: id
    prompt: "Bunyi *ch* ini dibuat di belakang mulut. Kata mana yang memakainya?"
    visual: { id: mouth-places-de, props: { initial: ach } }
    options: ["das Buch", "ich"]
    answer: "das Buch"
    why: { id: "*Buch*: setelah *u*, *ch* di langit-langit belakang. *Ich*: di langit-langit depan.", en: "*Buch*: after *u*, *ch* is at the soft palate. *Ich*: at the hard palate." }
  - id: d-04-c3
    type: choice
    lang: id
    prompt: "*St* dalam *Stadt* dibaca …"
    options: ["*syt*", "*st*", "*set*"]
    answer: "*syt*"
    why: { id: "Di awal kata, *st* dan *sp* dibaca *syt* dan *syp*: *Stadt* terdengar *Sytat*.", en: "At the start of a word, *st* and *sp* sound like *sht* and *shp*: *Stadt* sounds like *Shtat*." }
  - id: d-04-c4
    type: choice
    lang: id
    prompt: "*Z* dalam *Zeit* dibaca seperti …"
    options: ["*ts*", "*z* dalam *zaman*", "*s*"]
    answer: "*ts*"
    why: { id: "*Z* selalu *ts*: *Zeit* terdengar *tsait*.", en: "*Z* always sounds like *ts*: *Zeit* sounds like *tsait*." }
  - id: d-04-c5
    type: choice
    lang: id
    prompt: "*V* dalam *Vater* dibaca seperti …"
    options: ["*f* dalam *foto*", "*w* dalam *wayang*"]
    answer: "*f* dalam *foto*"
    why: { id: "Dalam kata Jerman asli, *v* dibaca *f*: *Fater*. *W* dibaca seperti *v* bahasa Inggris.", en: "In native German words, *v* sounds like *f*: *Fater*. *W* sounds like English *v*." }
  - id: d-04-c6
    type: dictation
    audio: "das Wasser"
    answer: "das Wasser"
    why: { id: "Bunyi *v* ditulis *w*: *Wasser*. Dua *s* karena *a*-nya pendek.", en: "The *v* sound is spelled *w*: *Wasser*. Two *s*s because the *a* is short." }
glossary:
  - { de: ich, id: "saya, aku", pos: pron }
  - { de: Buch, id: buku, pos: noun, gender: n, plural: Bücher }
  - { de: Schule, id: sekolah, pos: noun, gender: f, plural: Schulen }
  - { de: Stadt, id: kota, pos: noun, gender: f, plural: Städte }
  - { de: Zeit, id: waktu, pos: noun, gender: f, plural: Zeiten }
  - { de: Wasser, id: air, pos: noun, gender: n, plural: "—" }
  - { de: Vater, id: ayah, pos: noun, gender: m, plural: Väter }
next: dasar-05-tag-dibaca-tak
---

## concept.id
Beberapa huruf mati Jerman dibaca lain. *Ch* punya dua bunyi: setelah *a*, *o*, *u* dan *au* seperti *kh* dalam *akhir* (*Buch*), setelah huruf lain lebih ringan (*ich*). *Sch* dibaca *sy*, dan *sp*, *st* di awal kata dibaca *syp*, *syt* (*Stadt*). *Z* dibaca *ts*, *w* seperti *v* dalam bahasa Inggris, *v* biasanya *f* (*Vater*), dan *j* seperti *y* (*ja*).

## concept.en
Some German consonants are read differently. *Ch* has two sounds: after *a*, *o*, *u* and *au* it is like the *kh* in *akhir* (*Buch*), after other letters it is lighter (*ich*). *Sch* sounds like *sh*, and *sp*, *st* at the start of a word sound like *shp*, *sht* (*Stadt*). *Z* is *ts*, *w* is like English *v*, *v* is usually *f* (*Vater*), and *j* is like *y* (*ja*).

## contrast.id
Bunyi *ach* sudah kamu kenal dari kata serapan Arab seperti *akhir* dan *khusus*. Bunyi *ich* tidak ada dalam bahasa Indonesia: ucapkan *i*, lalu hembuskan udara di tempat yang sama tanpa suara. Jangan menggantinya dengan *sy*, karena *Kirche* (gereja) dan *Kirsche* (ceri) berbeda.

## contrast.en
You know the *ach* sound from Arabic loanwords such as *akhir* and *khusus*. The *ich* sound doesn't exist in Indonesian: say *i*, then breathe out in the same place without voice. Don't replace it with *sy*, because *Kirche* (church) and *Kirsche* (cherry) are different words.
