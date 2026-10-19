---
id: kana2-01-kenapa-katakana
rung: kana-2
order: 1
status: draft
minutes: 6
title: { id: "Kenapa ada katakana?", en: "Why katakana?", ja: "カタカナ", kana: "カタカナ" }
summary:
  id: "Kamu tahu kapan bahasa Jepang memakai katakana: kata serapan, nama asing dan penekanan."
  en: "You know when Japanese uses katakana: loanwords, foreign names and emphasis."
introduces: [k2-why-katakana]
spiral: kana
worked:
  - { ja: "ひらがな", kana: "ひらがな", id: "huruf untuk kata Jepang, partikel dan akhiran" }
  - { ja: "カタカナ", kana: "カタカナ", id: "huruf untuk kata serapan, nama asing dan penekanan" }
  - { ja: "コーヒー", kana: "コーヒー", id: "kopi, dari bahasa Belanda *koffie*" }
  - { ja: "インドネシア", kana: "インドネシア", id: "nama negara asing selalu katakana" }
examples:
  - { ja: "[[コーヒー]]", kana: "コーヒー", id: "kopi" }
  - { ja: "[[テレビ]]", kana: "テレビ", id: "televisi" }
  - { ja: "[[パン]]", kana: "パン", id: "roti", note: { id: "Dari bahasa Portugis *pão*, kata serapan tertua di Jepang.", en: "From Portuguese *pão*, one of the oldest loanwords in Japanese." } }
  - { ja: "[[ホテル]]", kana: "ホテル", id: "hotel" }
  - { ja: "[[リナ]]", kana: "リナ", id: "Rina (nama)" }
  - { ja: "[[インドネシア]]", kana: "インドネシア", id: "Indonesia" }
pair:
  off: { ja: "こーひー", kana: "こーひー" }
  natural: { ja: "[[コーヒー]]", kana: "コーヒー" }
tirukan: { ja: "コーヒー", kana: "コーヒー", id: "kopi" }
check:
  - id: k2-01-c1
    type: choice
    cue: "Kata ini ditulis dengan huruf apa?"
    prompt: "テレビ"
    options: [katakana, hiragana, kanji]
    answer: katakana
    why: { id: "Garisnya lurus dan bersudut: katakana. Kata serapan seperti テレビ ditulis katakana.", en: "Straight, angular strokes: katakana. Loanwords like テレビ are written in katakana." }
  - id: k2-01-c2
    type: choice
    prompt: "コーヒー"
    options: [kopi, teh, roti]
    answer: kopi
    why: { id: "コーヒー artinya kopi. Roti パン.", en: "コーヒー means coffee. Bread is パン." }
  - id: k2-01-c3
    type: listen
    audio: "パン"
    options: [パン, ペン, ホテル]
    answer: パン
    why: { id: "パン: roti. ペン: pena.", en: "パン: bread. ペン: pen." }
  - id: k2-01-c4
    type: choice
    prompt: "Nama *Rina* ditulis dengan huruf apa?"
    options: [katakana, hiragana]
    answer: katakana
    why: { id: "Nama orang asing, termasuk nama Indonesia, ditulis katakana: リナ.", en: "Foreign names, Indonesian ones included, are written in katakana: リナ." }
glossary:
  - { ja: "コーヒー", kana: "コーヒー", id: "kopi", en: "coffee", type: noun, jlpt: N5 }
  - { ja: "テレビ", kana: "テレビ", id: "televisi", en: "television", type: noun, jlpt: N5 }
  - { ja: "パン", kana: "パン", id: "roti", en: "bread", type: noun, jlpt: N5 }
  - { ja: "ホテル", kana: "ホテル", id: "hotel", en: "hotel", type: noun, jlpt: N5 }
  - { ja: "レストラン", kana: "レストラン", id: "restoran", en: "restaurant", type: noun, jlpt: N5 }
  - { ja: "カメラ", kana: "カメラ", id: "kamera", en: "camera", type: noun, jlpt: N5 }
  - { ja: "ラジオ", kana: "ラジオ", id: "radio", en: "radio", type: noun, jlpt: N5 }
  - { ja: "ひらがな", kana: "ひらがな", id: "hiragana", en: "hiragana", type: noun, jlpt: N5 }
  - { ja: "かたかな", kana: "かたかな", id: "katakana", en: "katakana", type: noun, jlpt: N5 }
extra:
  - { ja: "かたかな", reason: "片仮名 ada di daftar N5; di sini ditulis kana karena kanjinya belum dipelajari." }
next: kana2-02-a-so
---

## concept.id
Katakana adalah huruf kedua bahasa Jepang. Bunyinya sama persis dengan hiragana, hanya bentuknya lain: lebih lurus dan bersudut. Katakana dipakai untuk kata serapan (コーヒー), nama asing (リナ) dan kadang untuk penekanan, seperti huruf miring.

## concept.en
Katakana is the second Japanese script. It has exactly the same sounds as hiragana, only different shapes: straighter and more angular. Katakana is used for loanwords (コーヒー), foreign names (リナ) and sometimes for emphasis, like italics.

## contrast.id
Bahasa Indonesia menulis kata serapan dengan huruf yang sama (*kopi*, *televisi*). Bahasa Jepang memisahkannya: kata serapan dalam katakana, kata Jepang dalam hiragana. こーひー dalam hiragana bisa dibaca, tapi terasa salah, seperti menulis *coffee* di tengah kalimat Indonesia.

## contrast.en
Indonesian writes loanwords in the same letters (*kopi*, *televisi*). Japanese keeps them apart: loanwords in katakana, Japanese words in hiragana. こーひー in hiragana can be read, but it looks wrong, like dropping *coffee* into an Indonesian sentence.
