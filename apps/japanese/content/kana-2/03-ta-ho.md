---
id: kana2-03-ta-ho
rung: kana-2
order: 3
status: draft
minutes: 8
title: { id: "タ sampai ホ", en: "タ to ホ", ja: "タチツテト ナニヌネノ ハヒフヘホ", kana: "タチツテト ナニヌネノ ハヒフヘホ" }
summary:
  id: "Kamu bisa membaca katakana タ sampai ホ, dan kata seperti テスト dan ナイフ."
  en: "You can read katakana タ to ホ, and words like テスト and ナイフ."
introduces: [k2-ta-ho]
spiral: kana
kana_new: [タ, チ, ツ, テ, ト, ナ, ニ, ヌ, ネ, ノ, ハ, ヒ, フ, ヘ, ホ]
visual: { id: kana-chart, props: { initial: { script: kata }, highlight: [タ, チ, ツ, テ, ト, ナ, ニ, ヌ, ネ, ノ, ハ, ヒ, フ, ヘ, ホ] } }
examples:
  - { ja: "[[テ]]スト", kana: "テスト", id: "ujian, tes" }
  - { ja: "[[ナ]]イフ", kana: "ナイフ", id: "pisau" }
  - { ja: "[[ネ]]クタイ", kana: "ネクタイ", id: "dasi" }
  - { ja: "テ[[ニ]]ス", kana: "テニス", id: "tenis" }
  - { ja: "ソ[[フ]]ト", kana: "ソフト", id: "lunak; perangkat lunak" }
  - { ja: "[[タ]]イ", kana: "タイ", id: "Thailand" }
pair:
  off: { ja: "テス", kana: "テス" }
  natural: { ja: "テス[[ト]]", kana: "テスト" }
sound:
  words: [{ ja: "ヘ", kana: "ヘ" }, { ja: "へ", kana: "へ" }]
  kind: kana
  tip: { id: "ヘ (katakana) dan へ (hiragana) hampir sama bentuknya dan sama bunyinya. Tulisan di sekitarnya yang memberi tahu jenisnya.", en: "ヘ (katakana) and へ (hiragana) look almost the same and sound the same. The writing around it tells you which it is." }
tirukan: { ja: "テスト", kana: "テスト", id: "ujian" }
check:
  - id: k2-03-c1
    type: listen
    audio: "kana-テ"
    options: [テ, チ, ナ]
    answer: テ
    why: { id: "テ: te.", en: "テ: te." }
  - id: k2-03-c2
    type: choice
    prompt: "ナイフ"
    options: [pisau, garpu, sendok]
    answer: pisau
    why: { id: "ナイフ dari *knife*: pisau.", en: "ナイフ from *knife*." }
  - id: k2-03-c3
    type: kana
    audio: "テスト"
    answer: テスト
    script: katakana
    why: { id: "テスト: te-su-to, tiga ketukan.", en: "テスト: te-su-to, three beats." }
  - id: k2-03-c4
    type: order
    prompt: "Susun kata *dasi*."
    tiles: [イ, ク, タ, ネ]
    answer: [ネ, ク, タ, イ]
    why: { id: "ネクタイ: ne-ku-ta-i.", en: "ネクタイ: ne-ku-ta-i." }
  - id: k2-03-c5
    type: listen
    audio: "テニス"
    options: [テニス, テスト, タイ]
    answer: テニス
    why: { id: "テニス: te-ni-su.", en: "テニス: te-ni-su." }
  - id: k2-03-c6
    type: trace
    char: チ
    guide: on
    why: { id: "チ tiga goresan: miring pendek di atas, mendatar, lalu tarik ke bawah dan melengkung ke kiri.", en: "チ takes three strokes: a short slant on top, one across, then down curving left." }
glossary:
  - { ja: "テスト", kana: "テスト", id: "ujian, tes", en: "test", type: noun, jlpt: N5 }
  - { ja: "ナイフ", kana: "ナイフ", id: "pisau", en: "knife", type: noun, jlpt: N5 }
  - { ja: "ネクタイ", kana: "ネクタイ", id: "dasi", en: "necktie", type: noun, jlpt: N5 }
  - { ja: "テニス", kana: "テニス", id: "tenis", en: "tennis", type: noun }
  - { ja: "テキスト", kana: "テキスト", id: "buku pelajaran, teks", en: "textbook", type: noun }
  - { ja: "ソフト", kana: "ソフト", id: "lunak; perangkat lunak", en: "soft; software", type: noun }
  - { ja: "タイ", kana: "タイ", id: "Thailand", en: "Thailand", type: name }
  - { ja: "コスト", kana: "コスト", id: "biaya", en: "cost", type: noun }
extra:
  - { ja: "テニス", reason: "Daftar komunitas mencatatnya di N4; kata serapan yang mudah untuk latihan タ–ホ." }
  - { ja: "テキスト", reason: "Daftar komunitas mencatatnya di N4; pelajar sering melihatnya di kelas." }
  - { ja: "ソフト", reason: "Daftar komunitas mencatatnya di N4; latihan membaca フ dan ト." }
  - { ja: "タイ", reason: "Nama negara tetangga; latihan membaca タ." }
  - { ja: "コスト", reason: "Kata serapan di tempat kerja; latihan membaca ト. Tidak ada di daftar N5." }
next: kana2-04-ma-n
---

## concept.id
タ sampai ホ dibaca seperti た sampai ほ, termasuk tiga yang khusus: チ *chi*, ツ *tsu* dan フ *fu*. Beberapa katakana mirip hiragananya: ヘ dan へ hampir sama, begitu juga カ dan か.

## concept.en
タ to ホ are read like た to ほ, including the three special ones: チ *chi*, ツ *tsu* and フ *fu*. Some katakana look like their hiragana: ヘ and へ are almost identical, and so are カ and か.

## contrast.id
Kata Inggris yang berakhir konsonan mendapat vokal tambahan di bahasa Jepang, karena bahasa Jepang tidak menutup suku kata dengan konsonan (kecuali ん). *Test* menjadi テスト, te-su-to. Bahasa Indonesia cukup bilang *tes*; di bahasa Jepang テス terdengar terpotong.

## contrast.en
English words that end in a consonant get extra vowels in Japanese, because Japanese doesn't close a syllable with a consonant (except ん). *Test* becomes テスト, te-su-to. Indonesian just says *tes*; in Japanese テス sounds cut off.
