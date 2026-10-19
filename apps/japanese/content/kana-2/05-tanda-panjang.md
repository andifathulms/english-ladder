---
id: kana2-05-tanda-panjang
rung: kana-2
order: 5
status: draft
minutes: 8
title: { id: "Garis panjang ー dan titik", en: "The long mark ー and dots", ja: "コーヒー テレビ", kana: "コーヒー テレビ" }
summary:
  id: "Kamu bisa membaca garis panjang ー dan katakana bertitik: コーヒー, テレビ, バス."
  en: "You can read the long mark ー and dotted katakana: コーヒー, テレビ, バス."
introduces: [k2-long-mark]
spiral: mora
kana_new: [ー, ガ, ギ, グ, ゲ, ゴ, ザ, ジ, ズ, ゼ, ゾ, ダ, ヂ, ヅ, デ, ド, バ, ビ, ブ, ベ, ボ, パ, ピ, プ, ペ, ポ]
visual:
  id: mora-beats
  props:
    compare: true
    words:
      - { ja: "すき", kana: "すき", id: "suka" }
      - { ja: "スキー", kana: "スキー", id: "ski" }
examples:
  - { ja: "コ[[ー]]ヒー", kana: "コーヒー", id: "kopi", note: { id: "ー memanjangkan vokal sebelumnya satu ketukan: ko-o-hi-i, empat ketukan.", en: "ー lengthens the vowel before it by one beat: ko-o-hi-i, four beats." } }
  - { ja: "ノ[[ー]]ト", kana: "ノート", id: "buku catatan" }
  - { ja: "テレ[[ビ]]", kana: "テレビ", id: "televisi" }
  - { ja: "[[バ]]ス", kana: "バス", id: "bus" }
  - { ja: "[[ペ]]ン", kana: "ペン", id: "pena" }
  - { ja: "[[デ]]パート", kana: "デパート", id: "toserba" }
pair:
  off: { ja: "コーヒ", kana: "コーヒ" }
  natural: { ja: "コーヒ[[ー]]", kana: "コーヒー" }
tirukan: { ja: "コーヒー を ください 。", kana: "コーヒー を ください 。", id: "Minta kopi." }
check:
  - id: k2-05-c1
    type: mora
    audio: "コーヒー"
    ask: count
    options: ["2", "3", "4"]
    answer: "4"
    why: { id: "コ-ー-ヒ-ー: empat ketukan. Setiap ー satu ketukan.", en: "コ-ー-ヒ-ー: four beats. Each ー is a beat." }
  - id: k2-05-c2
    type: choice
    prompt: "テレビ"
    options: [televisi, radio, kamera]
    answer: televisi
    why: { id: "テレビ: televisi. Radio ラジオ.", en: "テレビ: television. A radio is ラジオ." }
  - id: k2-05-c3
    type: listen
    audio: "バス"
    options: [バス, パス, ハス]
    answer: バス
    why: { id: "バス: dua titik, bunyi b. パス dengan lingkaran: bunyi p.", en: "バス: two dots, a b sound. パス with the circle: a p sound." }
  - id: k2-05-c4
    type: gap
    cue: "Saya pergi naik bus."
    prompt: "___ で いきます 。"
    options: [バス, ペン, ノート]
    answer: バス
    why: { id: "バス で いきます: pergi dengan bus. で menandai alatnya.", en: "バス で いきます: go by bus. で marks the means." }
  - id: k2-05-c5
    type: kana
    audio: "ノート"
    answer: ノート
    script: katakana
    why: { id: "ノート: no-o-to. Ketik *no-to*: tanda - menjadi ー.", en: "ノート: no-o-to. Type *no-to*: the - becomes ー." }
  - id: k2-05-c6
    type: trace
    char: ポ
    guide: on
    why: { id: "ポ ditulis seperti ホ, lalu lingkaran kecil di kanan atas.", en: "ポ is written like ホ, then a small circle at the top right." }
glossary:
  - { ja: "コーヒー", kana: "コーヒー", id: "kopi", en: "coffee", type: noun, jlpt: N5 }
  - { ja: "ノート", kana: "ノート", id: "buku catatan", en: "notebook", type: noun, jlpt: N5 }
  - { ja: "バス", kana: "バス", id: "bus", en: "bus", type: noun, jlpt: N5 }
  - { ja: "ペン", kana: "ペン", id: "pena", en: "pen", type: noun, jlpt: N5 }
  - { ja: "デパート", kana: "デパート", id: "toserba", en: "department store", type: noun, jlpt: N5 }
  - { ja: "ギター", kana: "ギター", id: "gitar", en: "guitar", type: noun, jlpt: N5 }
  - { ja: "ボタン", kana: "ボタン", id: "kancing; tombol", en: "button", type: noun, jlpt: N5 }
  - { ja: "ゼロ", kana: "ゼロ", id: "nol", en: "zero", type: number, jlpt: N5 }
  - { ja: "ボールペン", kana: "ボールペン", id: "pulpen", en: "ballpoint pen", type: noun, jlpt: N5 }
next: kana2-06-katakana-tambahan
---

## concept.id
Dalam katakana, vokal panjang ditulis dengan garis ー: コーヒー, ノート. Garis ini adalah satu ketukan penuh. Titik ゛ dan lingkaran ゜ bekerja sama seperti di hiragana: カ → ガ, ハ → バ → パ.

## concept.en
In katakana, a long vowel is written with the bar ー: コーヒー, ノート. The bar is a full beat. The dots ゛ and the circle ゜ work as in hiragana: カ → ガ, ハ → バ → パ.

## contrast.id
Kata serapan di bahasa Indonesia jarang punya vokal panjang (*kopi*, *nol*). Di bahasa Jepang, ー mengubah kata: すき (suka) dua ketukan, スキー (ski) tiga ketukan. Menulis コーヒ tanpa ー terakhir terdengar terpotong.

## contrast.en
Indonesian loanwords rarely have long vowels (*kopi*, *nol*). In Japanese, ー changes the word: すき (like) is two beats, スキー (ski) three. Writing コーヒ without the last ー sounds cut off.
