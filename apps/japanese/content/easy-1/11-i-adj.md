---
id: easy1-11-i-adj
rung: easy-1
order: 11
status: draft
minutes: 8
title: { id: "Mahal, murah, enak", en: "Expensive, cheap, tasty", ja: "{高|たか}い です", kana: "たかい です" }
summary:
  id: "Kata sifat い (たかい, やすい, おいしい) dipakai sebelum です atau langsung sebelum kata benda."
  en: "い adjectives (たかい, やすい, おいしい) go before です or straight before a noun."
introduces: [n5-i-adj]
spiral: adjectives
kanji: [高, 小, 長, 白]
worked:
  - { ja: "この {傘|かさ} は [[{長|なが}い]] です 。", kana: "この かさ は ながい です 。", id: "Payung ini panjang." }
  - { ja: "これ は [[{長|なが}い]] {傘|かさ} です 。", kana: "これ は ながい かさ です 。", id: "Ini payung panjang." }
examples:
  - { ja: "この かばん は [[{高|たか}い]] です 。", kana: "この かばん は たかい です 。", id: "Tas ini mahal." }
  - { ja: "{食堂|しょく|どう} の カレー は [[{安|やす}い]] です 。", kana: "しょくどう の カレー は やすい です 。", id: "Kari di kantin murah." }
  - { ja: "{日本|に|ほん} の {水|みず} は [[おいしい]] です 。", kana: "にほん の みず は おいしい です 。", id: "Air di Jepang enak." }
  - { ja: "わたし の {部屋|へ|や} は [[{小|ちい}さい]] です 。", kana: "わたし の へや は ちいさい です 。", id: "Kamarku kecil." }
  - { ja: "これ は [[{白|しろ}い]] シャツ です 。", kana: "これ は しろい シャツ です 。", id: "Ini kemeja putih." }
  - { ja: "あれ は [[{高|たか}い]] {山|やま} です 。", kana: "あれ は たかい やま です 。", id: "Itu gunung yang tinggi." }
pair:
  off: { ja: "これ は かばん {高|たか}い です 。", kana: "これ は かばん たかい です 。" }
  natural: { ja: "これ は [[{高|たか}い]] かばん です 。", kana: "これ は たかい かばん です 。" }
talk:
  lines:
    - { who: Andi, ja: "この {白|しろ}い シャツ は いくら です か 。", kana: "この しろい シャツ は いくら です か 。", id: "Kemeja putih ini berapa?" }
    - { who: Suzuki, ja: "{三千円|さん|ぜん|えん} です 。", kana: "さんぜんえん です 。", id: "Tiga ribu yen." }
    - { who: Andi, ja: "{安|やす}い です 。 これ を {買|か}います 。", kana: "やすい です 。 これ を かいます 。", id: "Murah. Saya beli yang ini." }
words:
  id: "**たかい** berarti *mahal* dan juga *tinggi*: たかい かばん (tas mahal), たかい やま (gunung tinggi). Lawannya beda: *murah* やすい, *rendah* ひくい."
  en: "**たかい** means both *expensive* and *tall, high*: たかい かばん (an expensive bag), たかい やま (a high mountain). The opposites differ: *cheap* やすい, *low* ひくい."
tirukan: { ja: "この かばん は {高|たか}い です 。", kana: "この かばん は たかい です 。", id: "Tas ini mahal." }
check:
  - id: e1-11-c1
    type: order
    cue: "Ini tas mahal."
    tiles: ["かばん", "これ", "です", "{高|たか}い", "は"]
    answer: ["これ", "は", "{高|たか}い", "かばん", "です"]
    why: { id: "Kata sifat di depan kata benda: たかい かばん.", en: "The adjective goes before the noun: たかい かばん." }
  - id: e1-11-c2
    type: choice
    prompt: "{高|たか}い"
    options: ["mahal, tinggi", "murah", "kecil"]
    answer: "mahal, tinggi"
    why: { id: "たかい: mahal, juga tinggi. Murah やすい, kecil ちいさい.", en: "たかい: expensive, also tall or high. Cheap is やすい, small is ちいさい." }
  - id: e1-11-c3
    type: gap
    cue: "Kamarku kecil."
    prompt: "わたし の {部屋|へ|や} は ___ です 。"
    options: ["{小|ちい}さい", "{白|しろ}い", "{長|なが}い"]
    answer: "{小|ちい}さい"
    why: { id: "ちいさい: kecil. しろい putih, ながい panjang.", en: "ちいさい: small. しろい is white, ながい is long." }
  - id: e1-11-c4
    type: fix
    wrong: "これ は かばん {高|たか}い です 。"
    options: ["これ は {高|たか}い かばん です 。", "これ は {高|たか}い の かばん です 。"]
    answer: "これ は {高|たか}い かばん です 。"
    why: { id: "Kata sifat い langsung di depan kata benda, tanpa の.", en: "An い adjective goes straight before the noun, with no の." }
  - id: e1-11-c5
    type: kana
    ja: "{小|ちい}さい"
    furigana: false
    answer: ちいさい
    why: { id: "小 dibaca ちい di ちいさい: kecil.", en: "小 is read ちい in ちいさい: small." }
  - id: e1-11-c6
    type: trace
    char: 白
    guide: on
    why: { id: "白: 5 goresan. Garis miring pendek di atas dulu, lalu 日.", en: "白: 5 strokes. The short slant on top first, then 日." }
glossary:
  - { ja: "{高|たか}い", kana: "たかい", id: "mahal; tinggi", en: "expensive; tall, high", type: adj-i, jlpt: N5 }
  - { ja: "{安|やす}い", kana: "やすい", id: "murah", en: "cheap", type: adj-i, jlpt: N5 }
  - { ja: "{低|ひく}い", kana: "ひくい", id: "rendah", en: "low", type: adj-i, jlpt: N5 }
  - { ja: "おいしい", kana: "おいしい", id: "enak", en: "tasty", type: adj-i, jlpt: N5 }
  - { ja: "{小|ちい}さい", kana: "ちいさい", id: "kecil", en: "small", type: adj-i, jlpt: N5 }
  - { ja: "{大|おお}きい", kana: "おおきい", id: "besar", en: "big", type: adj-i, jlpt: N5 }
  - { ja: "{長|なが}い", kana: "ながい", id: "panjang", en: "long", type: adj-i, jlpt: N5 }
  - { ja: "{白|しろ}い", kana: "しろい", id: "putih", en: "white", type: adj-i, jlpt: N5 }
  - { ja: "かばん", kana: "かばん", id: "tas", en: "bag", type: noun, jlpt: N5 }
  - { ja: "{傘|かさ}", kana: "かさ", id: "payung", en: "umbrella", type: noun, jlpt: N5 }
  - { ja: "シャツ", kana: "シャツ", id: "kemeja, kaus", en: "shirt", type: noun, jlpt: N5 }
  - { ja: "{山|やま}", kana: "やま", id: "gunung", en: "mountain", type: noun, jlpt: N5 }
next: easy1-12-na-adj
---

## concept.id
Kata sifat い berakhir dengan い: たかい (mahal), やすい (murah), おいしい (enak). Taruh **sebelum です** untuk berkata *X itu …*: かばん は たかい です. Atau taruh langsung **sebelum kata benda**: たかい かばん, tas mahal. Hati-hati: きれい juga berakhir dengan い, tapi itu kata sifat jenis lain (pelajaran 12).

## concept.en
い adjectives end in い: たかい (expensive), やすい (cheap), おいしい (tasty). Put one **before です** to say *X is …*: かばん は たかい です. Or put it straight **before a noun**: たかい かばん, an expensive bag. Careful: きれい also ends in い, but it's the other kind of adjective (lesson 12).

## contrast.id
Bahasa Indonesia menaruh kata sifat sesudah kata benda: *tas mahal*. Bahasa Jepang menaruhnya sebelum: たかい かばん, tanpa kata penghubung seperti *yang* atau の. です di belakang kata sifat い hanya membuat kalimatnya sopan.

## contrast.en
Indonesian puts the adjective after the noun: *tas mahal*. Japanese puts it before: たかい かばん, with no linking word like *yang* or の. The です after an い adjective just makes the sentence polite.
