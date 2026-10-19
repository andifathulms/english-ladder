---
id: kana1-07-dakuten
rung: kana-1
order: 7
status: draft
minutes: 8
title: { id: "Dua titik dan lingkaran kecil", en: "Two dots and a small circle", ja: "が ざ だ ば ぱ", kana: "が ざ だ ば ぱ" }
summary:
  id: "Kamu bisa membaca huruf dengan ゛ (dakuten) dan ゜ (handakuten): が ざ だ ば ぱ dan barisnya."
  en: "You can read letters with ゛ (dakuten) and ゜ (handakuten): が ざ だ ば ぱ and their rows."
introduces: [k1-dakuten]
spiral: kana
kana_new: [が, ぎ, ぐ, げ, ご, ざ, じ, ず, ぜ, ぞ, だ, ぢ, づ, で, ど, ば, び, ぶ, べ, ぼ, ぱ, ぴ, ぷ, ぺ, ぽ]
visual: { id: kana-chart, props: { initial: { dakuten: true }, highlight: [が, ざ, だ, ば, ぱ] } }
examples:
  - { ja: "[[ご]]はん", kana: "ごはん", id: "nasi, makan" }
  - { ja: "か[[ぎ]]", kana: "かぎ", id: "kunci" }
  - { ja: "み[[ず]]", kana: "みず", id: "air" }
  - { ja: "[[で]]んわ", kana: "でんわ", id: "telepon" }
  - { ja: "さん[[ぽ]]", kana: "さんぽ", id: "jalan-jalan" }
  - { ja: "これ は か[[ば]]ん です 。", kana: "これ は かばん です 。", id: "Ini tas." }
pair:
  off: { ja: "かき", kana: "かき" }
  natural: { ja: "か[[ぎ]]", kana: "かぎ" }
sound:
  words: [{ ja: "か", kana: "か" }, { ja: "が", kana: "が" }, { ja: "は", kana: "は" }, { ja: "ば", kana: "ば" }, { ja: "ぱ", kana: "ぱ" }]
  kind: kana
  tip: { id: "゛ membuat bunyi bersuara: か → が, さ → ざ, た → だ, は → ば. ゜ hanya ada di baris は: ぱ ぴ ぷ ぺ ぽ.", en: "゛ makes a sound voiced: か → が, さ → ざ, た → だ, は → ば. ゜ only goes on the は row: ぱ ぴ ぷ ぺ ぽ." }
tirukan: { ja: "これ は かばん です 。", kana: "これ は かばん です 。", id: "Ini tas." }
check:
  - id: k1-07-c1
    type: listen
    audio: "kana-が"
    options: [が, か, ざ]
    answer: が
    why: { id: "が: か dengan dua titik, bunyinya *ga*.", en: "が: か with two dots, said *ga*." }
  - id: k1-07-c2
    type: listen
    audio: "かぎ"
    options: [かぎ, かき, かぜ]
    answer: かぎ
    why: { id: "かぎ artinya kunci. Tanpa titik, かき adalah buah kesemek.", en: "かぎ means key. Without the dots, かき is a persimmon." }
  - id: k1-07-c3
    type: gap
    cue: "Ini tas."
    prompt: "これ は ___ です 。"
    options: [かばん, かぎ, ごはん]
    answer: かばん
    why: { id: "かばん artinya tas.", en: "かばん means bag." }
  - id: k1-07-c4
    type: kana
    audio: "みず"
    answer: みず
    why: { id: "みず: mi-zu, air.", en: "みず: mi-zu, water." }
  - id: k1-07-c5
    type: choice
    prompt: "ごはん"
    options: [nasi, air, kunci]
    answer: nasi
    why: { id: "ごはん artinya nasi, dan juga makan secara umum.", en: "ごはん means cooked rice, and a meal in general." }
  - id: k1-07-c6
    type: trace
    char: だ
    guide: on
    why: { id: "だ ditulis seperti た, lalu dua titik kecil di kanan atas.", en: "だ is written like た, then two small dots at the top right." }
glossary:
  - { ja: "ごはん", kana: "ごはん", id: "nasi, makan", en: "rice, meal", type: noun, jlpt: N5 }
  - { ja: "かぎ", kana: "かぎ", id: "kunci", en: "key", type: noun, jlpt: N5 }
  - { ja: "みず", kana: "みず", id: "air", en: "water", type: noun, jlpt: N5 }
  - { ja: "でんわ", kana: "でんわ", id: "telepon", en: "telephone", type: noun, jlpt: N5 }
  - { ja: "かばん", kana: "かばん", id: "tas", en: "bag", type: noun, jlpt: N5 }
  - { ja: "かぜ", kana: "かぜ", id: "angin; pilek", en: "wind; a cold", type: noun, jlpt: N5 }
  - { ja: "さんぽ", kana: "さんぽ", id: "jalan-jalan", en: "a walk", type: noun, jlpt: N5 }
  - { ja: "てがみ", kana: "てがみ", id: "surat", en: "letter", type: noun, jlpt: N5 }
  - { ja: "えんぴつ", kana: "えんぴつ", id: "pensil", en: "pencil", type: noun, jlpt: N5 }
  - { ja: "これ", kana: "これ", id: "ini", en: "this", type: pronoun, jlpt: N5 }
next: kana1-08-kana-kecil
---

## concept.id
Dua titik kecil ゛ (*dakuten*) mengubah bunyi menjadi bersuara: か menjadi が, さ menjadi ざ, た menjadi だ, は menjadi ば. Lingkaran kecil ゜ (*handakuten*) hanya ada di baris は dan membuat bunyi p: ぱ. Mulai pelajaran ini, romaji hanya muncul di huruf baru.

## concept.en
Two small dots ゛ (*dakuten*) make a sound voiced: か becomes が, さ becomes ざ, た becomes だ, は becomes ば. The small circle ゜ (*handakuten*) goes only on the は row and makes a p sound: ぱ. From this lesson, romaji shows only under new letters.

## contrast.id
Bahasa Indonesia juga membedakan k dan g, jadi bunyinya mudah. Yang sering terlupa adalah menulis titiknya: かき (kesemek) dan かぎ (kunci) adalah dua kata berbeda. Satu hal baru: じ dan ぢ dibaca sama, begitu juga ず dan づ. Hampir selalu yang dipakai じ dan ず.

## contrast.en
Indonesian tells k and g apart too, so the sounds are easy. What gets forgotten is writing the dots: かき (persimmon) and かぎ (key) are two different words. One new thing: じ and ぢ sound the same, and so do ず and づ. You'll nearly always see じ and ず.
