---
id: kana1-04-baris-na-ha
rung: kana-1
order: 4
status: draft
minutes: 8
title: { id: "Baris な dan は", en: "The な and は rows", ja: "なにぬねの はひふへほ", kana: "なにぬねの はひふへほ" }
summary:
  id: "Kamu bisa membaca baris な dan は, dan tahu bahwa ふ dibaca *fu* yang lembut."
  en: "You can read the な and は rows, and know that ふ is a soft *fu*."
introduces: [k1-n-row, k1-h-row]
spiral: kana
kana_new: [な, に, ぬ, ね, の, は, ひ, ふ, へ, ほ]
visual: { id: kana-chart, props: { highlight: [な, に, ぬ, ね, の, は, ひ, ふ, へ, ほ] } }
examples:
  - { ja: "[[ね]]こ", kana: "ねこ", id: "kucing" }
  - { ja: "い[[ぬ]]", kana: "いぬ", id: "anjing" }
  - { ja: "[[は]]な", kana: "はな", id: "bunga, hidung" }
  - { ja: "[[ひ]]と", kana: "ひと", id: "orang" }
  - { ja: "[[な]]つ", kana: "なつ", id: "musim panas" }
  - { ja: "[[ふ]]たつ", kana: "ふたつ", id: "dua (buah)", note: { id: "ふ: bibir hampir rapat, udara keluar lembut, seperti meniup lilin pelan.", en: "ふ: lips almost closed, a soft breath, like gently blowing out a candle." } }
pair:
  off: { ja: "ほな", kana: "ほな" }
  natural: { ja: "[[は]]な", kana: "はな" }
sound:
  words: [{ ja: "は", kana: "は" }, { ja: "ひ", kana: "ひ" }, { ja: "ふ", kana: "ふ" }]
  kind: kana
  tip: { id: "は dan ひ seperti *ha* dan *hi*. ふ lain: bukan *hu* dan bukan *fu* dengan gigi, tapi hembusan di antara bibir.", en: "は and ひ are like *ha* and *hi*. ふ is different: not *hu*, and not an English *f* with the teeth, but a breath between the lips." }
tirukan: { ja: "ねこ と いぬ", kana: "ねこ と いぬ", id: "kucing dan anjing" }
check:
  - id: k1-04-c1
    type: listen
    audio: "kana-ふ"
    options: [ふ, ぬ, ね]
    answer: ふ
    why: { id: "ふ: hembusan lembut di antara bibir.", en: "ふ: a soft breath between the lips." }
  - id: k1-04-c2
    type: choice
    prompt: "ねこ"
    options: [kucing, anjing, ikan]
    answer: kucing
    why: { id: "ねこ artinya kucing. Anjing いぬ, ikan さかな.", en: "ねこ means cat. A dog is いぬ, a fish さかな." }
  - id: k1-04-c3
    type: choice
    prompt: "Kata mana yang artinya *bunga*?"
    options: [はな, はこ, なつ]
    answer: はな
    why: { id: "はな artinya bunga, juga hidung. はこ kotak, なつ musim panas.", en: "はな means flower, and also nose. はこ is box, なつ summer." }
  - id: k1-04-c4
    type: kana
    audio: "ひとつ"
    answer: ひとつ
    why: { id: "ひとつ: hi-to-tsu, satu buah.", en: "ひとつ: hi-to-tsu, one thing." }
  - id: k1-04-c5
    type: order
    prompt: "Susun kata *ikan*."
    tiles: [な, さ, か]
    answer: [さ, か, な]
    why: { id: "さかな: sa-ka-na.", en: "さかな: sa-ka-na." }
  - id: k1-04-c6
    type: trace
    char: ぬ
    guide: on
    why: { id: "ぬ dua goresan: miring pendek, lalu satu garis panjang yang melingkar dengan ekor kecil. め tidak punya ekor itu.", en: "ぬ has two strokes: a short slant, then one long looping line with a small tail. め has no tail." }
glossary:
  - { ja: "ねこ", kana: "ねこ", id: "kucing", en: "cat", type: noun, jlpt: N5 }
  - { ja: "いぬ", kana: "いぬ", id: "anjing", en: "dog", type: noun, jlpt: N5 }
  - { ja: "はな", kana: "はな", id: "bunga, hidung", en: "flower, nose", type: noun, jlpt: N5 }
  - { ja: "ひと", kana: "ひと", id: "orang", en: "person", type: noun, jlpt: N5 }
  - { ja: "なつ", kana: "なつ", id: "musim panas", en: "summer", type: noun, jlpt: N5 }
  - { ja: "はこ", kana: "はこ", id: "kotak", en: "box", type: noun, jlpt: N5 }
  - { ja: "くに", kana: "くに", id: "negara", en: "country", type: noun, jlpt: N5 }
  - { ja: "さかな", kana: "さかな", id: "ikan", en: "fish", type: noun, jlpt: N5 }
  - { ja: "ひとつ", kana: "ひとつ", id: "satu (buah)", en: "one (thing)", type: number, jlpt: N5 }
  - { ja: "ふたつ", kana: "ふたつ", id: "dua (buah)", en: "two (things)", type: number, jlpt: N5 }
next: kana1-05-baris-ma-ya-ra
---

## concept.id
Baris な dan は juga konsonan ditambah vokal. Satu huruf lain dari barisnya: ふ, yang dibaca *fu* dengan hembusan lembut di antara bibir. Di pelajaran 6 kamu akan bertemu は sebagai partikel, yang dibaca *wa*.

## concept.en
The な and は rows are a consonant plus a vowel as well. One letter breaks its row: ふ, read *fu* with a soft breath between the lips. In lesson 6 you'll meet は as a particle, read *wa*.

## contrast.id
Bahasa Indonesia tidak punya bunyi seperti ふ, jadi kita memilih *hu* atau *fu* dengan gigi. Keduanya terdengar aneh. Perhatikan juga は dan ほ: ほ punya satu garis lagi di atas. はな artinya bunga; ほな bukan kata yang kamu cari.

## contrast.en
Indonesian has no sound like ふ, so we pick *hu* or a toothy *f*. Both sound odd. Watch は and ほ as well: ほ has one more stroke on top. はな means flower; ほな isn't the word you want.
