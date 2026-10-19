---
id: kana2-10-kanji-pertama
rung: kana-2
order: 10
status: draft
minutes: 9
title: { id: "Kanji pertamamu", en: "Your first kanji", ja: "{山|やま} {川|かわ} {人|ひと}", kana: "やま かわ ひと" }
summary:
  id: "Kamu mengenal sepuluh kanji pertama: 一 二 三 日 月 人 口 山 川 本, dan tahu bahwa satu kanji bisa punya beberapa bacaan."
  en: "You know your first ten kanji: 一 二 三 日 月 人 口 山 川 本, and that one kanji can have several readings."
introduces: [k2-first-kanji]
spiral: kanji
kanji: [一, 二, 三, 日, 月, 人, 口, 山, 川, 本]
visual: { id: stroke-order, props: { char: 山 } }
examples:
  - { ja: "[[{山|やま}]]", kana: "やま", id: "gunung", note: { id: "Tiga puncak gunung menjadi satu gambar.", en: "Three mountain peaks became one picture." } }
  - { ja: "[[{川|かわ}]]", kana: "かわ", id: "sungai", note: { id: "Tiga garis air yang mengalir.", en: "Three lines of flowing water." } }
  - { ja: "[[{人|ひと}]]", kana: "ひと", id: "orang", note: { id: "Seseorang yang berdiri dengan dua kaki.", en: "A person standing on two legs." } }
  - { ja: "{一|いち} 、 {二|に} 、 [[{三|さん}]]", kana: "いち 、 に 、 さん", id: "satu, dua, tiga" }
  - { ja: "[[{本|ほん}]] を よみます 。", kana: "ほん を よみます 。", id: "Saya membaca buku." }
  - { ja: "[[{毎日|まい|にち}]] がっこう へ いきます 。", kana: "まいにち がっこう へ いきます 。", id: "Setiap hari saya pergi ke sekolah.", note: { id: "日 di sini dibaca *nichi*; sendirian dibaca *hi*.", en: "日 is read *nichi* here; on its own it is *hi*." } }
pair:
  off: { ja: "{人|じん}", kana: "じん" }
  natural: { ja: "[[{人|ひと}]]", kana: "ひと" }
tirukan: { ja: "{山|やま} と {川|かわ}", kana: "やま と かわ", id: "gunung dan sungai" }
check:
  - id: k2-10-c1
    type: choice
    prompt: "山"
    furigana: false
    options: [gunung, sungai, orang]
    answer: gunung
    why: { id: "山 (やま): gunung, tiga puncak.", en: "山 (やま): mountain, three peaks." }
  - id: k2-10-c2
    type: choice
    prompt: "川"
    furigana: false
    options: [sungai, gunung, mulut]
    answer: sungai
    why: { id: "川 (かわ): sungai, tiga garis air.", en: "川 (かわ): river, three lines of water." }
  - id: k2-10-c3
    type: kana
    ja: "人"
    furigana: false
    answer: ひと
    why: { id: "人 sendirian dibaca ひと: orang.", en: "人 on its own is read ひと: person." }
  - id: k2-10-c4
    type: listen
    audio: "{三|さん}"
    options: ["{一|いち}", "{二|に}", "{三|さん}"]
    answer: "{三|さん}"
    why: { id: "さん: tiga, 三, tiga garis.", en: "さん: three, 三, three strokes." }
  - id: k2-10-c5
    type: gap
    cue: "Saya membaca buku."
    prompt: "___ を よみます 。"
    furigana: false
    options: [本, 山, 口]
    answer: 本
    why: { id: "本 (ほん): buku.", en: "本 (ほん): book." }
  - id: k2-10-c6
    type: trace
    char: 川
    guide: on
    why: { id: "川: tiga goresan dari kiri ke kanan; yang kiri melengkung sedikit.", en: "川: three strokes from left to right; the left one curves a little." }
glossary:
  - { ja: "{一|いち}", kana: "いち", id: "satu", en: "one", type: number, jlpt: N5 }
  - { ja: "{二|に}", kana: "に", id: "dua", en: "two", type: number, jlpt: N5 }
  - { ja: "{三|さん}", kana: "さん", id: "tiga", en: "three", type: number, jlpt: N5 }
  - { ja: "{人|ひと}", kana: "ひと", id: "orang", en: "person", type: noun, jlpt: N5 }
  - { ja: "{口|くち}", kana: "くち", id: "mulut", en: "mouth", type: noun, jlpt: N5 }
  - { ja: "{山|やま}", kana: "やま", id: "gunung", en: "mountain", type: noun, jlpt: N5 }
  - { ja: "{川|かわ}", kana: "かわ", id: "sungai", en: "river", type: noun, jlpt: N5 }
  - { ja: "{本|ほん}", kana: "ほん", id: "buku", en: "book", type: noun, jlpt: N5 }
  - { ja: "{毎日|まい|にち}", kana: "まいにち", id: "setiap hari", en: "every day", type: noun, jlpt: N5 }
  - { ja: "{月曜日|げつ|よう|び}", kana: "げつようび", id: "hari Senin", en: "Monday", type: noun, jlpt: N5 }
  - { ja: "{一|ひと}つ", kana: "ひとつ", id: "satu (buah)", en: "one (thing)", type: number, jlpt: N5 }
next: null
---

## concept.id
Kanji adalah huruf ketiga bahasa Jepang: setiap kanji membawa arti, bukan hanya bunyi. Banyak kanji awal berasal dari gambar: 山 gunung, 川 sungai, 人 orang, 口 mulut. Di anak tangga ini, setiap kanji selalu diberi furigana, bacaan kecil di atasnya.

## concept.en
Kanji are the third Japanese script: each kanji carries a meaning, not just a sound. Many early kanji began as pictures: 山 mountain, 川 river, 人 person, 口 mouth. On this rung every kanji always has furigana, the small reading above it.

## contrast.id
Huruf Latin di bahasa Indonesia hampir selalu dibaca sama. Kanji tidak: 人 sendirian dibaca ひと, tapi じん di インドネシア人, jadi 人 sendirian sebagai じん terdengar aneh. 一 dibaca いち saat berhitung, tapi ひと di ひとつ. Hafalkan kanji bersama katanya, bukan satu bacaan saja.

## contrast.en
Latin letters in Indonesian are nearly always read the same way. Kanji aren't: 人 on its own is ひと, but じん in インドネシア人, so 人 alone as じん sounds odd. 一 is いち when counting, but ひと in ひとつ. Learn each kanji with its words, not just one reading.
