---
id: kana1-01-lima-vokal
rung: kana-1
order: 1
status: draft
minutes: 7
title: { id: "Lima vokal", en: "Five vowels", ja: "あいうえお", kana: "あいうえお" }
summary:
  id: "Bahasa Jepang punya lima vokal seperti bahasa Indonesia: あ い う え お. Dengan lima huruf ini kamu sudah bisa membaca kata pertamamu."
  en: "Japanese has five vowels, like Indonesian: あ い う え お. With these five letters you can already read your first words."
introduces: [k1-vowels]
spiral: kana
kana_new: [あ, い, う, え, お]
worked:
  - { ja: "あ", kana: "あ", id: "seperti a di *apa*" }
  - { ja: "い", kana: "い", id: "seperti i di *ini*" }
  - { ja: "う", kana: "う", id: "seperti u di *ulang*, bibir tidak terlalu bulat" }
  - { ja: "え", kana: "え", id: "seperti e di *enak*" }
  - { ja: "お", kana: "お", id: "seperti o di *obat*" }
examples:
  - { ja: "[[いえ]]", kana: "いえ", id: "rumah" }
  - { ja: "[[うえ]]", kana: "うえ", id: "atas" }
  - { ja: "[[あお]]", kana: "あお", id: "biru" }
  - { ja: "[[え]]", kana: "え", id: "gambar" }
  - { ja: "[[あう]]", kana: "あう", id: "bertemu" }
pair:
  off: { ja: "いえ", kana: "いえ" }
  natural: { ja: "[[いいえ]]", kana: "いいえ" }
tirukan: { ja: "あお", kana: "あお", id: "biru" }
check:
  - id: k1-01-c1
    type: listen
    audio: "いえ"
    options: [いえ, うえ, あお]
    answer: いえ
    why: { id: "いえ: i lalu e. Artinya rumah.", en: "いえ: i then e. It means house." }
  - id: k1-01-c2
    type: choice
    prompt: "Kata mana yang artinya *biru*?"
    options: [あお, あう, え]
    answer: あお
    why: { id: "あお artinya biru. あう artinya bertemu.", en: "あお means blue. あう means to meet." }
  - id: k1-01-c3
    type: choice
    prompt: "え"
    options: [gambar, rumah, atas]
    answer: gambar
    why: { id: "え, satu huruf saja, artinya gambar.", en: "え, a single letter, means picture." }
  - id: k1-01-c4
    type: order
    prompt: "Susun kata *atas*."
    tiles: [え, う]
    answer: [う, え]
    why: { id: "うえ: u dulu, lalu e.", en: "うえ: u first, then e." }
  - id: k1-01-c5
    type: trace
    char: あ
    guide: on
    why: { id: "あ ditulis tiga goresan: mendatar, tarik ke bawah, lalu lengkung besar.", en: "あ takes three strokes: across, down, then the big curve." }
glossary:
  - { ja: "いえ", kana: "いえ", id: "rumah", en: "house", type: noun, jlpt: N5 }
  - { ja: "うえ", kana: "うえ", id: "atas", en: "above", type: noun, jlpt: N5 }
  - { ja: "あお", kana: "あお", id: "biru", en: "blue", type: noun, jlpt: N5 }
  - { ja: "え", kana: "え", id: "gambar", en: "picture", type: noun, jlpt: N5 }
  - { ja: "あう", kana: "あう", id: "bertemu", en: "to meet", type: verb-1, jlpt: N5 }
---

## concept.id
Bahasa Jepang ditulis dengan tiga jenis huruf: **hiragana**, **katakana** dan **kanji**. Kita mulai dari hiragana. Lima vokalnya, あ い う え お, dibaca hampir sama dengan vokal bahasa Indonesia, jadi kamu sudah tahu bunyinya. Setiap huruf hiragana adalah satu ketukan.

## concept.en
Japanese is written with three kinds of letters: **hiragana**, **katakana** and **kanji**. We start with hiragana. Its five vowels, あ い う え お, sound almost like Indonesian vowels, so you already know them. Each hiragana letter is one beat.

## contrast.id
Di bahasa Indonesia, panjang pendek vokal tidak mengubah arti. Di bahasa Jepang, mengubah: いえ (rumah) dua ketukan, いいえ (tidak) tiga ketukan. Kamu akan berlatih ini di pelajaran 9.

## contrast.en
In Indonesian, vowel length doesn't change meaning. In Japanese it does: いえ (house) is two beats, いいえ (no) is three. You'll practise this in lesson 9.
