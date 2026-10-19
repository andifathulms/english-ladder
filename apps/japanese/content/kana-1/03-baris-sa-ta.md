---
id: kana1-03-baris-sa-ta
rung: kana-1
order: 3
status: draft
minutes: 8
title: { id: "Baris さ dan た", en: "The さ and た rows", ja: "さしすせそ たちつてと", kana: "さしすせそ たちつてと" }
summary:
  id: "Kamu bisa membaca baris さ dan た, termasuk tiga huruf yang dibaca lain: し, ち dan つ."
  en: "You can read the さ and た rows, including the three letters read differently: し, ち and つ."
introduces: [k1-s-row, k1-t-row]
spiral: kana
kana_new: [さ, し, す, せ, そ, た, ち, つ, て, と]
visual: { id: kana-origins, props: { kana: [さ, し, す, せ, そ, た, ち, つ, て, と] } }
examples:
  - { ja: "あ[[さ]]", kana: "あさ", id: "pagi" }
  - { ja: "[[し]]た", kana: "した", id: "bawah", note: { id: "し dibaca *shi*, bukan *si*.", en: "し is read *shi*, not *si*." } }
  - { ja: "く[[つ]]", kana: "くつ", id: "sepatu", note: { id: "つ dibaca *tsu*: t dan s menyatu, cepat.", en: "つ is read *tsu*: t and s together, quickly." } }
  - { ja: "[[ち]]かい", kana: "ちかい", id: "dekat", note: { id: "ち dibaca *chi*, seperti *ci* di *cicak*.", en: "ち is read *chi*, like *ci* in Indonesian *cicak*." } }
  - { ja: "[[そ]]と", kana: "そと", id: "luar" }
  - { ja: "[[た]]かい", kana: "たかい", id: "tinggi, mahal" }
pair:
  off: { ja: "あち", kana: "あち" }
  natural: { ja: "あ[[さ]]", kana: "あさ" }
sound:
  words: [{ ja: "し", kana: "し" }, { ja: "ち", kana: "ち" }, { ja: "つ", kana: "つ" }]
  kind: kana
  tip: { id: "Tiga huruf ini tidak mengikuti barisnya: し *shi*, ち *chi*, つ *tsu*. Dengarkan, lalu tirukan pelan.", en: "These three don't follow their rows: し *shi*, ち *chi*, つ *tsu*. Listen, then say them slowly." }
tirukan: { ja: "あかい かさ", kana: "あかい かさ", id: "payung merah" }
check:
  - id: k1-03-c1
    type: listen
    audio: "kana-つ"
    options: [つ, す, ち]
    answer: つ
    why: { id: "つ: *tsu*. す *su* tidak punya bunyi t di depan.", en: "つ: *tsu*. す *su* has no t sound in front." }
  - id: k1-03-c2
    type: choice
    prompt: "くつ"
    options: [sepatu, meja, kursi]
    answer: sepatu
    why: { id: "くつ artinya sepatu. Meja つくえ, kursi いす.", en: "くつ means shoes. A desk is つくえ, a chair いす." }
  - id: k1-03-c3
    type: kana
    audio: "ちかい"
    answer: ちかい
    why: { id: "ちかい: chi-ka-i. Ketik *chikai* atau *tikai*.", en: "ちかい: chi-ka-i. Type *chikai* or *tikai*." }
  - id: k1-03-c4
    type: order
    prompt: "Susun kata *meja*."
    tiles: [え, く, つ]
    answer: [つ, く, え]
    why: { id: "つくえ: tsu-ku-e.", en: "つくえ: tsu-ku-e." }
  - id: k1-03-c5
    type: listen
    audio: "あさ"
    options: [あさ, あし, かさ]
    answer: あさ
    why: { id: "あさ artinya pagi. あし kaki, かさ payung.", en: "あさ means morning. あし is leg, かさ umbrella." }
  - id: k1-03-c6
    type: trace
    char: さ
    guide: on
    why: { id: "さ ditulis tiga goresan: mendatar, miring ke bawah, lalu lengkung di bawah.", en: "さ takes three strokes: across, a slanting down stroke, then the curve below." }
glossary:
  - { ja: "あさ", kana: "あさ", id: "pagi", en: "morning", type: noun, jlpt: N5 }
  - { ja: "かさ", kana: "かさ", id: "payung", en: "umbrella", type: noun, jlpt: N5 }
  - { ja: "した", kana: "した", id: "bawah", en: "below", type: noun, jlpt: N5 }
  - { ja: "そと", kana: "そと", id: "luar", en: "outside", type: noun, jlpt: N5 }
  - { ja: "くつ", kana: "くつ", id: "sepatu", en: "shoes", type: noun, jlpt: N5 }
  - { ja: "つくえ", kana: "つくえ", id: "meja (belajar)", en: "desk", type: noun, jlpt: N5 }
  - { ja: "いす", kana: "いす", id: "kursi", en: "chair", type: noun, jlpt: N5 }
  - { ja: "あし", kana: "あし", id: "kaki", en: "foot, leg", type: noun, jlpt: N5 }
  - { ja: "ちかい", kana: "ちかい", id: "dekat", en: "near", type: adj-i, jlpt: N5 }
  - { ja: "たかい", kana: "たかい", id: "tinggi, mahal", en: "tall, expensive", type: adj-i, jlpt: N5 }
  - { ja: "すし", kana: "すし", id: "sushi", en: "sushi", type: noun }
extra:
  - { ja: "すし", reason: "Kata yang sudah dikenal pelajar dari mana-mana; latihan membaca す dan し. Tidak ada di daftar N5." }
next: kana1-04-baris-na-ha
---

## concept.id
Baris さ dan た mengikuti pola yang sama dengan baris か: konsonan ditambah vokal. Tapi tiga huruf berbeda: し dibaca *shi*, ち *chi*, dan つ *tsu*. Tabel di atas menandai mereka dengan sudut kecil.

## concept.en
The さ and た rows follow the same pattern as the か row: a consonant plus a vowel. Three letters are different: し is read *shi*, ち *chi*, and つ *tsu*. The chart marks them with a small corner.

## contrast.id
Bahasa Indonesia punya bunyi *si* dan *ti*, jadi kita cenderung membaca し sebagai *si* dan ち sebagai *ti*. Orang Jepang mendengar itu sebagai logat asing. Perhatikan juga bentuk さ dan ち: hampir seperti cermin, jadi あさ (pagi) mudah tertulis あち.

## contrast.en
Indonesian has *si* and *ti*, so we tend to read し as *si* and ち as *ti*. A Japanese listener hears that as a foreign accent. Watch the shapes of さ and ち too: they are almost mirror images, so あさ (morning) easily comes out as あち.
