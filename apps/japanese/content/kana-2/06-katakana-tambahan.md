---
id: kana2-06-katakana-tambahan
rung: kana-2
order: 6
status: draft
minutes: 8
title: { id: "Katakana tambahan", en: "Extended katakana", ja: "ファ ティ ウィ", kana: "ファ ティ ウィ" }
summary:
  id: "Kamu bisa membaca katakana gabungan untuk bunyi asing: ファ, ティ, ウィ, dan kata seperti フォーク dan パーティー."
  en: "You can read combined katakana for foreign sounds: ファ, ティ, ウィ, and words like フォーク and パーティー."
introduces: [k2-extended]
spiral: kana
kana_new: [ファ, フィ, フェ, フォ, ティ, ディ, ウィ, ウェ, ウォ, ヴ, シャ, シュ, ショ, チャ, チュ, チョ, ッ]
worked:
  - { ja: "フォ", kana: "フォ", id: "フ dengan オ kecil: *fo*" }
  - { ja: "ティ", kana: "ティ", id: "テ dengan イ kecil: *ti*, seperti *ti* di bahasa Indonesia" }
  - { ja: "ウィ", kana: "ウィ", id: "ウ dengan イ kecil: *wi*" }
  - { ja: "シャ", kana: "シャ", id: "シ dengan ャ kecil: *sha*, seperti しゃ" }
examples:
  - { ja: "[[フォ]]ーク", kana: "フォーク", id: "garpu" }
  - { ja: "パー[[ティ]]ー", kana: "パーティー", id: "pesta" }
  - { ja: "[[シャ]]ツ", kana: "シャツ", id: "kemeja, kaus" }
  - { ja: "[[シャ]]ワー", kana: "シャワー", id: "pancuran, mandi" }
  - { ja: "ポケ[[ッ]]ト", kana: "ポケット", id: "saku" }
  - { ja: "[[フィ]]ルム", kana: "フィルム", id: "film (gulungan)" }
pair:
  off: { ja: "パーチー", kana: "パーチー" }
  natural: { ja: "パー[[ティ]]ー", kana: "パーティー" }
sound:
  words: [{ ja: "ティ", kana: "ティ" }, { ja: "チ", kana: "チ" }]
  kind: kana
  tip: { id: "ティ adalah *ti* seperti bahasa Indonesia; チ adalah *chi*. Kata asing dengan *ti* memakai ティ.", en: "ティ is *ti* as in Indonesian; チ is *chi*. Foreign words with *ti* use ティ." }
tirukan: { ja: "パーティー に いきます 。", kana: "パーティー に いきます 。", id: "Saya pergi ke pesta." }
check:
  - id: k2-06-c1
    type: listen
    audio: "kana-ティ"
    options: [ティ, チ, テ]
    answer: ティ
    why: { id: "ティ: *ti*. チ *chi*, テ *te*.", en: "ティ: *ti*. チ is *chi*, テ *te*." }
  - id: k2-06-c2
    type: choice
    prompt: "フォーク"
    options: [garpu, sendok, pisau]
    answer: garpu
    why: { id: "フォーク dari *fork*: garpu. Sendok スプーン, pisau ナイフ.", en: "フォーク from *fork*. A spoon is スプーン, a knife ナイフ." }
  - id: k2-06-c3
    type: kana
    audio: "シャツ"
    answer: シャツ
    script: katakana
    why: { id: "シャツ: sha-tsu, dua ketukan.", en: "シャツ: sha-tsu, two beats." }
  - id: k2-06-c4
    type: mora
    audio: "ポケット"
    ask: spelling
    options: [ポケト, ポケット, ポーケト]
    answer: ポケット
    why: { id: "Ada jeda sebelum ト: ditulis ッ kecil, ポケット.", en: "There's a pause before ト, written with a small ッ: ポケット." }
  - id: k2-06-c5
    type: order
    prompt: "Susun kata *pesta*."
    tiles: [ー, ティ, パ, ー]
    answer: [パ, ー, ティ, ー]
    why: { id: "パーティー: pa-a-ti-i.", en: "パーティー: pa-a-ti-i." }
glossary:
  - { ja: "フォーク", kana: "フォーク", id: "garpu", en: "fork", type: noun, jlpt: N5 }
  - { ja: "パーティー", kana: "パーティー", id: "pesta", en: "party", type: noun, jlpt: N5 }
  - { ja: "シャツ", kana: "シャツ", id: "kemeja, kaus", en: "shirt", type: noun, jlpt: N5 }
  - { ja: "シャワー", kana: "シャワー", id: "pancuran", en: "shower", type: noun, jlpt: N5 }
  - { ja: "ポケット", kana: "ポケット", id: "saku", en: "pocket", type: noun, jlpt: N5 }
  - { ja: "フィルム", kana: "フィルム", id: "film (gulungan)", en: "film (roll)", type: noun, jlpt: N5 }
  - { ja: "コップ", kana: "コップ", id: "gelas", en: "glass, cup", type: noun, jlpt: N5 }
  - { ja: "ベッド", kana: "ベッド", id: "tempat tidur", en: "bed", type: noun, jlpt: N5 }
  - { ja: "ワイシャツ", kana: "ワイシャツ", id: "kemeja kerja", en: "dress shirt", type: noun, jlpt: N5 }
next: kana2-07-kata-serapan
---

## concept.id
Bahasa asing punya bunyi yang tidak ada di tabel kana, seperti *fa*, *ti* dan *wi*. Katakana menulisnya dengan huruf kecil: フ + ァ = ファ, テ + ィ = ティ. ッ kecil dan ャ ュ ョ kecil bekerja sama seperti di hiragana.

## concept.en
Foreign languages have sounds the kana chart lacks, like *fa*, *ti* and *wi*. Katakana writes them with small letters: フ + ァ = ファ, テ + ィ = ティ. The small ッ and small ャ ュ ョ work as they do in hiragana.

## contrast.id
Bahasa Indonesia punya *ti* (*tiga*), tapi tabel kana tidak: チ dibaca *chi*. Untuk kata asing, bahasa Jepang memakai ティ. Kata yang sudah lama dipinjam kadang tetap memakai チ, jadi ikuti ejaan kamus, bukan tebakan.

## contrast.en
Indonesian has *ti* (*tiga*), but the kana chart doesn't: チ is *chi*. For foreign words, Japanese uses ティ. Words borrowed long ago sometimes keep チ, so follow the dictionary spelling, not a guess.
