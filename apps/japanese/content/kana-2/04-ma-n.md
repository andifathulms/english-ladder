---
id: kana2-04-ma-n
rung: kana-2
order: 4
status: draft
minutes: 9
title: { id: "マ sampai ン, dan huruf kembar", en: "マ to ン, and look-alikes", ja: "シ ツ ソ ン", kana: "シ ツ ソ ン" }
summary:
  id: "Kamu bisa membaca katakana マ sampai ン dan membedakan シ dari ツ, ソ dari ン."
  en: "You can read katakana マ to ン and tell シ from ツ, ソ from ン."
introduces: [k2-ma-n]
spiral: kana
kana_new: [マ, ミ, ム, メ, モ, ヤ, ユ, ヨ, ラ, リ, ル, レ, ロ, ワ, ヲ, ン]
visual: { id: kana-chart, props: { initial: { script: kata }, highlight: [シ, ツ, ソ, ン] } }
examples:
  - { ja: "ホテ[[ル]]", kana: "ホテル", id: "hotel" }
  - { ja: "カ[[メ]]ラ", kana: "カメラ", id: "kamera" }
  - { ja: "トイ[[レ]]", kana: "トイレ", id: "toilet" }
  - { ja: "ク[[ラ]]ス", kana: "クラス", id: "kelas" }
  - { ja: "[[ミ]]ルク", kana: "ミルク", id: "susu" }
  - { ja: "レモ[[ン]]", kana: "レモン", id: "lemon" }
pair:
  off: { ja: "レモソ", kana: "レモソ" }
  natural: { ja: "レモ[[ン]]", kana: "レモン" }
sound:
  words: [{ ja: "シ", kana: "シ" }, { ja: "ツ", kana: "ツ" }, { ja: "ソ", kana: "ソ" }, { ja: "ン", kana: "ン" }]
  kind: kana
  tip: { id: "シ dan ン ditulis dari bawah ke atas pada goresan terakhir; ツ dan ソ dari atas ke bawah. Titik シ di kiri, titik ツ di atas.", en: "シ and ン end with a stroke from bottom up; ツ and ソ from top down. シ has its dots on the left, ツ on top." }
tirukan: { ja: "トイレ は どこ です か 。", kana: "トイレ は どこ です か 。", id: "Toiletnya di mana?" }
check:
  - id: k2-04-c1
    type: listen
    audio: "kana-ン"
    options: [ン, ソ, シ]
    answer: ン
    why: { id: "ン: n. ソ so, シ shi.", en: "ン: n. ソ is so, シ shi." }
  - id: k2-04-c2
    type: choice
    prompt: "カメラ"
    options: [kamera, kelas, toilet]
    answer: kamera
    why: { id: "カメラ: kamera. Kelas クラス, toilet トイレ.", en: "カメラ: camera. A class is クラス, a toilet トイレ." }
  - id: k2-04-c3
    type: gap
    cue: "Toiletnya di mana?"
    prompt: "___ は どこ です か 。"
    options: [トイレ, ホテル, クラス]
    answer: トイレ
    why: { id: "トイレ は どこ です か: kalimat yang paling berguna di Jepang.", en: "トイレ は どこ です か: the most useful sentence in Japan." }
  - id: k2-04-c4
    type: kana
    audio: "ホテル"
    answer: ホテル
    script: katakana
    why: { id: "ホテル: ho-te-ru.", en: "ホテル: ho-te-ru." }
  - id: k2-04-c5
    type: order
    prompt: "Susun kata *kamera*."
    tiles: [ラ, メ, カ]
    answer: [カ, メ, ラ]
    why: { id: "カメラ: ka-me-ra.", en: "カメラ: ka-me-ra." }
  - id: k2-04-c6
    type: trace
    char: ツ
    guide: on
    why: { id: "ツ: dua titik di atas, lalu satu goresan panjang dari kanan atas ke bawah kiri.", en: "ツ: two dots on top, then one long stroke from the top right down to the left." }
glossary:
  - { ja: "ホテル", kana: "ホテル", id: "hotel", en: "hotel", type: noun, jlpt: N5 }
  - { ja: "カメラ", kana: "カメラ", id: "kamera", en: "camera", type: noun, jlpt: N5 }
  - { ja: "トイレ", kana: "トイレ", id: "toilet", en: "toilet", type: noun, jlpt: N5 }
  - { ja: "クラス", kana: "クラス", id: "kelas", en: "class", type: noun, jlpt: N5 }
  - { ja: "キロ", kana: "キロ", id: "kilo", en: "kilo", type: noun, jlpt: N5 }
  - { ja: "ハンカチ", kana: "ハンカチ", id: "sapu tangan", en: "handkerchief", type: noun, jlpt: N5 }
  - { ja: "ミルク", kana: "ミルク", id: "susu", en: "milk", type: noun }
  - { ja: "レモン", kana: "レモン", id: "lemon", en: "lemon", type: noun }
  - { ja: "どこ", kana: "どこ", id: "di mana", en: "where", type: pronoun, jlpt: N5 }
extra:
  - { ja: "ミルク", reason: "Daftar komunitas mencatatnya di N3; kata sehari-hari untuk latihan ミ ル." }
  - { ja: "レモン", reason: "Kata serapan sehari-hari untuk membedakan ン dari ソ; tidak ada di daftar N5." }
next: kana2-05-tanda-panjang
---

## concept.id
マ sampai ン melengkapi katakana. Empat huruf ini sering tertukar: シ (shi) dan ツ (tsu), ソ (so) dan ン (n). Bedanya ada pada arah goresan terakhir dan letak titiknya.

## concept.en
マ to ン complete katakana. Four letters are often confused: シ (shi) and ツ (tsu), ソ (so) and ン (n). The difference is the direction of the last stroke and where the dots sit.

## contrast.id
Bahasa Indonesia tidak punya huruf yang hanya berbeda arah goresan, jadi mata kita belum terbiasa. Lihat goresan panjangnya: naik dari bawah (シ, ン) atau turun dari atas (ツ, ソ). レモン ditulis dengan ン; レモソ tidak bisa dibaca sebagai lemon.

## contrast.en
Indonesian has no letters that differ only in stroke direction, so our eyes aren't used to it. Look at the long stroke: rising from the bottom (シ, ン) or falling from the top (ツ, ソ). レモン is written with ン; レモソ can't be read as lemon.
