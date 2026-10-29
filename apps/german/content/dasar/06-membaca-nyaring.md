---
id: dasar-06-membaca-nyaring
rung: dasar
order: 6
status: draft
minutes: 7
title: { id: "Membaca nyaring", en: "Reading aloud", de: "Ausgang" }
summary:
  id: "Kamu tahu suku kata mana yang ditekan, dan bisa membaca papan tanda, menu dan teks pendek dengan suara keras."
  en: "You know which syllable takes the stress, and you can read a sign, a menu and a short text aloud."
introduces: [d-stress]
spiral: sounds
worked:
  - { de: "Ausgang", id: "Pintu keluar (papan tanda)" }
  - { de: "Eingang", id: "Pintu masuk (papan tanda)" }
  - { de: "Kaffee und Kuchen", id: "Kopi dan kue (menu)" }
  - { de: "Hallo, Rina! Das ist die Kantine. Der Kaffee ist gut.", id: "Halo, Rina! Ini kantinnya. Kopinya enak." }
examples:
  - { de: "[[Aus]]gang", id: "pintu keluar" }
  - { de: "[[Ein]]gang", id: "pintu masuk" }
  - { de: "[[Kaf]]fee", id: "kopi", note: { id: "Di Austria: *Kaf-FEE*.", en: "In Austria: *Kaf-FEE*." } }
  - { de: "die Apo[[the]]ke", id: "apotek", note: { id: "Kata serapan: tekanan di belakang.", en: "A loanword: the stress is further back." } }
  - { de: "die Kan[[ti]]ne", id: "kantin" }
pair:
  off: "die Kantin"
  natural: "die Kantin[[e]]"
sound:
  focus: "tekanan kata"
  words: ["Ausgang", "Eingang", "Kaffee", "Kuchen", "Apotheke", "Kantine"]
  tip:
    id: "Tekan suku pertama dengan jelas: *AUS-gang*, *KU-chen*. Huruf *e* di akhir kata selalu dibaca, pelan seperti *e* dalam *besar*."
    en: "Stress the first syllable clearly: *AUS-gang*, *KU-chen*. A final *e* is always said, softly, like the *e* in *besar*."
tirukan: { de: "Hallo, Rina! Das ist die Kantine. Der Kaffee ist gut.", id: "Halo, Rina! Ini kantinnya. Kopinya enak." }
check:
  - id: d-06-c1
    type: choice
    lang: id
    prompt: "Kamu mau keluar dari gedung. Papan mana yang kamu ikuti?"
    options: [Ausgang, Eingang, Kantine]
    answer: Ausgang
    why: { id: "*Ausgang*: pintu keluar. *Eingang*: pintu masuk.", en: "*Ausgang*: exit. *Eingang*: entrance." }
  - id: d-06-c2
    type: choice
    lang: id
    prompt: "Suku kata mana yang ditekan dalam *Apotheke*?"
    options: ["A-po-THE-ke", "A-PO-the-ke", "A-po-the-KE"]
    answer: "A-po-THE-ke"
    why: { id: "*Apotheke* kata serapan, jadi tekanannya di belakang: *A-po-THE-ke*.", en: "*Apotheke* is a loanword, so the stress is further back: *A-po-THE-ke*." }
  - id: d-06-c3
    type: listen
    audio: "Kaffee und Kuchen"
    options: ["Kaffee und Kuchen", "Kaffee und Käse"]
    answer: "Kaffee und Kuchen"
    why: { id: "*KAF-fee und KU-chen*: kopi dan kue, menu sore yang khas di Jerman.", en: "*KAF-fee und KU-chen*: coffee and cake, a typical German afternoon." }
  - id: d-06-c4
    type: choice
    lang: id
    prompt: "*E* di akhir *Kantine* …"
    options: ["dibaca pelan, seperti *e* dalam *besar*", "tidak dibaca", "dibaca seperti *e* dalam *sate*"]
    answer: "dibaca pelan, seperti *e* dalam *besar*"
    why: { id: "*E* di akhir kata selalu dibaca, tapi pelan: *Kan-TI-ne*.", en: "A final *e* is always said, but softly: *Kan-TI-ne*." }
  - id: d-06-c5
    type: listen
    audio: "Das ist die Kantine."
    options: ["Das ist die Kantine.", "Das ist die Apotheke."]
    answer: "Das ist die Kantine."
    why: { id: "*Das ist die Kan-TI-ne*: ini kantinnya.", en: "*Das ist die Kan-TI-ne*: this is the canteen." }
  - id: d-06-c6
    type: choice
    lang: id
    prompt: "Dalam kata Jerman asli, suku mana yang biasanya ditekan?"
    options: ["suku pertama", "suku terakhir", "suku kedua dari belakang"]
    answer: "suku pertama"
    why: { id: "Biasanya suku pertama: *AR-beit*, *WAS-ser*. Kata serapan sering berbeda.", en: "Usually the first syllable: *AR-beit*, *WAS-ser*. Loanwords often differ." }
glossary:
  - { de: Ausgang, id: "pintu keluar", pos: noun, gender: m, plural: Ausgänge }
  - { de: Eingang, id: "pintu masuk", pos: noun, gender: m, plural: Eingänge }
  - { de: Kaffee, id: kopi, pos: noun, gender: m, plural: Kaffees }
  - { de: Kuchen, id: kue, pos: noun, gender: m, plural: Kuchen }
  - { de: gut, id: "baik, enak", pos: adj }
next: null
---

## concept.id
Kata Jerman biasanya ditekan di suku kata pertama: *AUS-gang*, *KU-chen*. Kata serapan sering ditekan lebih ke belakang: *A-po-THE-ke*, *Kan-TI-ne*. Huruf *e* di akhir kata selalu dibaca, pelan seperti *e* dalam *besar*. Dengan aturan bunyi dari pelajaran sebelumnya, kamu sekarang bisa membaca papan tanda, menu dan teks pendek.

## concept.en
German words are usually stressed on the first syllable: *AUS-gang*, *KU-chen*. Loanwords are often stressed further back: *A-po-THE-ke*, *Kan-TI-ne*. A final *e* is always said, softly, like the *e* in *besar*. With the sound rules from the earlier lessons, you can now read signs, a menu and a short text.

## contrast.id
Tekanan dalam bahasa Indonesia ringan, jadi tekanan Jerman terdengar lebih kuat dan jelas. Kata serapan Indonesia sering membuang *e* di akhir (*apotek*, *kantin*); dalam bahasa Jerman *e* itu tetap ada. Satu catatan: *Kaffee* ditekan di depan di Jerman, tapi di belakang di Austria; keduanya benar.

## contrast.en
Stress in Indonesian is light, so German stress sounds stronger and clearer. Indonesian loanwords often drop the final *e* (*apotek*, *kantin*); in German that *e* stays. One note: *Kaffee* is stressed at the front in Germany but at the end in Austria; both are correct.
