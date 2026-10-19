---
id: kana2-02-a-so
rung: kana-2
order: 2
status: draft
minutes: 8
title: { id: "ア sampai ソ", en: "ア to ソ", ja: "アイウエオ カキクケコ サシスセソ", kana: "アイウエオ カキクケコ サシスセソ" }
summary:
  id: "Kamu bisa membaca katakana ア sampai ソ, dan tahu dari bagian kanji mana mereka berasal."
  en: "You can read katakana ア to ソ, and know which part of a kanji each came from."
introduces: [k2-a-so]
spiral: kana
kana_new: [ア, イ, ウ, エ, オ, カ, キ, ク, ケ, コ, サ, シ, ス, セ, ソ]
visual: { id: kana-origins, props: { initial: { script: kata }, kana: [ア, イ, ウ, エ, オ, カ, キ, ク, ケ, コ, サ, シ, ス, セ, ソ] } }
examples:
  - { ja: "[[ア]]イス", kana: "アイス", id: "es krim" }
  - { ja: "[[コ]]コア", kana: "ココア", id: "cokelat panas" }
  - { ja: "[[キ]]ウイ", kana: "キウイ", id: "buah kiwi" }
  - { ja: "[[ス]]イス", kana: "スイス", id: "Swiss" }
  - { ja: "イ[[カ]]", kana: "イカ", id: "cumi-cumi" }
  - { ja: "オア[[シ]]ス", kana: "オアシス", id: "oasis" }
pair:
  off: { ja: "エス", kana: "エス" }
  natural: { ja: "[[ア]]イス", kana: "アイス" }
tirukan: { ja: "アイス", kana: "アイス", id: "es krim" }
check:
  - id: k2-02-c1
    type: listen
    audio: "kana-ス"
    options: [サ, ス, セ]
    answer: ス
    why: { id: "ス: su. Katakana memakai rekaman yang sama dengan す.", en: "ス: su. Katakana uses the same recording as す." }
  - id: k2-02-c2
    type: choice
    prompt: "アイス"
    options: [es krim, kopi, roti]
    answer: es krim
    why: { id: "アイス dari *ice (cream)*: es krim.", en: "アイス from *ice (cream)*." }
  - id: k2-02-c3
    type: kana
    audio: "ココア"
    answer: ココア
    script: katakana
    why: { id: "ココア: ko-ko-a, dalam katakana.", en: "ココア: ko-ko-a, in katakana." }
  - id: k2-02-c4
    type: order
    prompt: "Susun kata *es krim*."
    tiles: [ス, イ, ア]
    answer: [ア, イ, ス]
    why: { id: "アイス: a-i-su.", en: "アイス: a-i-su." }
  - id: k2-02-c5
    type: listen
    audio: "スイス"
    options: [スイス, イカ, ココア]
    answer: スイス
    why: { id: "スイス: Swiss, su-i-su.", en: "スイス: Switzerland, su-i-su." }
  - id: k2-02-c6
    type: trace
    char: キ
    guide: on
    why: { id: "キ tiga goresan: dua garis mendatar, lalu satu garis tegak yang miring sedikit.", en: "キ takes three strokes: two across, then one down stroke leaning slightly." }
glossary:
  - { ja: "アイス", kana: "アイス", id: "es krim", en: "ice cream", type: noun }
  - { ja: "ココア", kana: "ココア", id: "cokelat panas", en: "cocoa", type: noun }
  - { ja: "キウイ", kana: "キウイ", id: "buah kiwi", en: "kiwi fruit", type: noun }
  - { ja: "スイス", kana: "スイス", id: "Swiss", en: "Switzerland", type: name }
  - { ja: "イカ", kana: "イカ", id: "cumi-cumi", en: "squid", type: noun }
  - { ja: "オアシス", kana: "オアシス", id: "oasis", en: "oasis", type: noun }
  - { ja: "カカオ", kana: "カカオ", id: "kakao", en: "cacao", type: noun }
  - { ja: "ケア", kana: "ケア", id: "perawatan", en: "care", type: noun }
extra:
  - { ja: "アイス", reason: "Kata serapan sehari-hari untuk latihan membaca ア–ソ; tidak ada di daftar N5." }
  - { ja: "ココア", reason: "Kata serapan sehari-hari untuk latihan membaca ア–ソ; tidak ada di daftar N5." }
  - { ja: "キウイ", reason: "Kata serapan sehari-hari untuk latihan membaca ア–ソ; tidak ada di daftar N5." }
  - { ja: "スイス", reason: "Nama negara; latihan membaca ア–ソ." }
  - { ja: "イカ", reason: "Lauk yang sering ditulis katakana di menu; latihan membaca ア–ソ." }
  - { ja: "オアシス", reason: "Kata serapan untuk latihan membaca ア–ソ; tidak ada di daftar N5." }
  - { ja: "カカオ", reason: "Kata serapan yang juga dikenal dalam bahasa Indonesia; latihan membaca ア–ソ." }
  - { ja: "ケア", reason: "Kata serapan yang sering muncul di tempat kerja perawatan; latihan membaca ア–ソ." }
next: kana2-03-ta-ho
---

## concept.id
Katakana ア sampai ソ dibaca sama dengan あ sampai そ. Banyak katakana adalah sepotong kanji: カ adalah bagian kiri 加, イ bagian kiri 伊. Karena itu katakana terlihat lebih kaku daripada hiragana.

## concept.en
Katakana ア to ソ are read the same as あ to そ. Many katakana are a piece of a kanji: カ is the left part of 加, イ the left part of 伊. That's why katakana look stiffer than hiragana.

## contrast.id
Kata serapan Jepang mengikuti bunyi Jepang, bukan ejaan atau bunyi Indonesia. Kita bilang *es krim*; orang Jepang bilang アイス, dari bunyi *ice*: a-i-su. Jangan menebak dari bahasa Indonesia: エス adalah nama huruf S, bukan es.

## contrast.en
Japanese loanwords follow Japanese sounds, not Indonesian spelling or sounds. Indonesians say *es krim*; Japanese says アイス, from the sound of *ice*: a-i-su. Don't guess from Indonesian: エス is the name of the letter S, not ice.
