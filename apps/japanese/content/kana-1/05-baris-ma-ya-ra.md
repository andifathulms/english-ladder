---
id: kana1-05-baris-ma-ya-ra
rung: kana-1
order: 5
status: draft
minutes: 9
title: { id: "Baris ま, や dan ら", en: "The ま, や and ら rows", ja: "まみむめも やゆよ らりるれろ", kana: "まみむめも やゆよ らりるれろ" }
summary:
  id: "Kamu bisa membaca baris ま, や dan ら, dan tahu bahwa ら adalah satu bunyi di antara r dan l."
  en: "You can read the ま, や and ら rows, and know that ら is one sound between r and l."
introduces: [k1-m-row, k1-y-row, k1-r-row]
spiral: kana
kana_new: [ま, み, む, め, も, や, ゆ, よ, ら, り, る, れ, ろ]
visual: { id: kana-origins, props: { kana: [ま, み, む, め, も, や, ゆ, よ, ら, り, る, れ, ろ] } }
examples:
  - { ja: "[[や]]ま", kana: "やま", id: "gunung" }
  - { ja: "[[み]]み", kana: "みみ", id: "telinga" }
  - { ja: "くる[[ま]]", kana: "くるま", id: "mobil" }
  - { ja: "[[よ]]る", kana: "よる", id: "malam" }
  - { ja: "[[ゆ]]き", kana: "ゆき", id: "salju" }
  - { ja: "い[[ろ]]", kana: "いろ", id: "warna", note: { id: "ろ: lidah menyentuh langit-langit sekali saja, ringan.", en: "ろ: the tongue taps the roof of the mouth once, lightly." } }
pair:
  off: { ja: "よろ", kana: "よろ" }
  natural: { ja: "よ[[る]]", kana: "よる" }
sound:
  words: [{ ja: "ら", kana: "ら" }, { ja: "り", kana: "り" }, { ja: "る", kana: "る" }, { ja: "れ", kana: "れ" }, { ja: "ろ", kana: "ろ" }]
  kind: kana
  tip: { id: "Baris ら: ujung lidah menepuk langit-langit sekali, seperti r yang sangat pendek. Jangan digetarkan seperti *rrr*.", en: "The ら row: the tongue tip taps the roof of the mouth once, like a very short r. Don't roll it." }
tirukan: { ja: "あかい くるま", kana: "あかい くるま", id: "mobil merah" }
check:
  - id: k1-05-c1
    type: listen
    audio: "kana-る"
    options: [る, ろ, れ]
    answer: る
    why: { id: "る: ru. ろ ro, れ re.", en: "る: ru. ろ is ro, れ re." }
  - id: k1-05-c2
    type: choice
    prompt: "やま"
    options: [gunung, sungai, telinga]
    answer: gunung
    why: { id: "やま artinya gunung. Telinga みみ.", en: "やま means mountain. An ear is みみ." }
  - id: k1-05-c3
    type: kana
    audio: "さむい"
    answer: さむい
    why: { id: "さむい: sa-mu-i, dingin.", en: "さむい: sa-mu-i, cold." }
  - id: k1-05-c4
    type: listen
    audio: "あめ"
    options: [あめ, あさ, あき]
    answer: あめ
    why: { id: "あめ artinya hujan.", en: "あめ means rain." }
  - id: k1-05-c5
    type: order
    prompt: "Susun kata *mobil*."
    tiles: [ま, く, る]
    answer: [く, る, ま]
    why: { id: "くるま: ku-ru-ma.", en: "くるま: ku-ru-ma." }
  - id: k1-05-c6
    type: trace
    char: め
    guide: on
    why: { id: "め dua goresan: miring pendek, lalu garis panjang yang melingkar tanpa ekor. ぬ punya ekor kecil.", en: "め has two strokes: a short slant, then a long loop with no tail. ぬ has a small tail." }
glossary:
  - { ja: "やま", kana: "やま", id: "gunung", en: "mountain", type: noun, jlpt: N5 }
  - { ja: "みみ", kana: "みみ", id: "telinga", en: "ear", type: noun, jlpt: N5 }
  - { ja: "め", kana: "め", id: "mata", en: "eye", type: noun, jlpt: N5 }
  - { ja: "くるま", kana: "くるま", id: "mobil", en: "car", type: noun, jlpt: N5 }
  - { ja: "よる", kana: "よる", id: "malam", en: "night", type: noun, jlpt: N5 }
  - { ja: "ゆき", kana: "ゆき", id: "salju", en: "snow", type: noun, jlpt: N5 }
  - { ja: "はる", kana: "はる", id: "musim semi", en: "spring", type: noun, jlpt: N5 }
  - { ja: "みせ", kana: "みせ", id: "toko", en: "shop", type: noun, jlpt: N5 }
  - { ja: "いろ", kana: "いろ", id: "warna", en: "colour", type: noun, jlpt: N5 }
  - { ja: "あめ", kana: "あめ", id: "hujan", en: "rain", type: noun, jlpt: N5 }
  - { ja: "さむい", kana: "さむい", id: "dingin (udara)", en: "cold (weather)", type: adj-i, jlpt: N5 }
next: kana1-06-wa-wo-n
---

## concept.id
Baris ま dan ら punya lima huruf, tapi baris や hanya tiga: や ゆ よ. Baris ら dibaca dengan satu tepukan lidah yang ringan, di antara r dan l bahasa Indonesia.

## concept.en
The ま and ら rows have five letters, but the や row has only three: や ゆ よ. The ら row is said with one light tap of the tongue, between Indonesian r and l.

## contrast.id
Bahasa Indonesia membedakan r dan l (*rupa* dan *lupa*). Bahasa Jepang hanya punya satu bunyi, ら, jadi orang Jepang sering tertukar r dan l saat berbicara bahasa Indonesia. Perhatikan bentuk る dan ろ: る punya lingkaran kecil di bawah. よる artinya malam.

## contrast.en
Indonesian tells r and l apart (*rupa* and *lupa*). Japanese has only one sound, ら, which is why Japanese speakers often mix up r and l in Indonesian. Watch る and ろ: る has a small loop at the bottom. よる means night.
