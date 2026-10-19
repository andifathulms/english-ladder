---
id: easy1-13-arimasu-imasu
rung: easy-1
order: 13
status: draft
minutes: 10
title: { id: "Ada di mana?", en: "Where is it?", ja: "どこ に あります か", kana: "どこ に あります か" }
summary:
  id: "あります untuk benda, います untuk orang dan hewan. Letaknya: はこ の うえ に (di atas kotak), posisinya sesudah bendanya."
  en: "あります for things, います for people and animals. Place: はこ の うえ に (on the box), the position after the object."
introduces: [n5-arimasu-imasu]
spiral: existence
kanji: [上, 下, 中, 右, 左]
visual: { id: place-scene-ja, props: { initial: on } }
examples:
  - { ja: "ボール は {箱|はこ} の [[{上|うえ}]] に あります 。", kana: "ボール は はこ の うえ に あります 。", id: "Bolanya ada di atas kotak." }
  - { ja: "ねこ は テーブル の {下|した} に [[います]] 。", kana: "ねこ は テーブル の した に います 。", id: "Kucingnya ada di bawah meja." }
  - { ja: "{財布|さい|ふ} は かばん の [[{中|なか}]] に あります 。", kana: "さいふ は かばん の なか に あります 。", id: "Dompetnya ada di dalam tas." }
  - { ja: "トイレ は ドア の [[{左|ひだり}]] に あります 。", kana: "トイレ は ドア の ひだり に あります 。", id: "Toiletnya ada di sebelah kiri pintu." }
  - { ja: "リナ さん は アンディ さん の [[{右|みぎ}]] に います 。", kana: "リナ さん は アンディ さん の みぎ に います 。", id: "Rina ada di sebelah kanan Andi." }
  - { ja: "{田中|た|なか} さん は {会社|かい|しゃ} に [[います]] 。", kana: "たなか さん は かいしゃ に います 。", id: "Pak Tanaka ada di kantor." }
pair:
  off: { ja: "ねこ は テーブル の {下|した} に あります 。", kana: "ねこ は テーブル の した に あります 。" }
  natural: { ja: "ねこ は テーブル の {下|した} に [[います]] 。", kana: "ねこ は テーブル の した に います 。" }
talk:
  lines:
    - { who: Andi, ja: "すみません 、 かさ は どこ に あります か 。", kana: "すみません 、 かさ は どこ に あります か 。", id: "Maaf, payungnya ada di mana?" }
    - { who: Yamada, ja: "ドア の {右|みぎ} に あります よ 。", kana: "ドア の みぎ に あります よ 。", id: "Ada di sebelah kanan pintu." }
    - { who: Andi, ja: "あ 、 ありました 。 ありがとう ございます 。", kana: "あ 、 ありました 。 ありがとう ございます 。", id: "Oh, ketemu. Terima kasih.", note: { id: "ありました di sini artinya *ketemu!*: kamu baru saja melihatnya.", en: "ありました here means *found it!*: you have just spotted it." } }
words:
  id: "**となり** artinya tepat di sebelah, biasanya untuk dua hal yang sejenis: rumah sebelah, orang di sebelahmu. Untuk *di samping* yang lebih umum, orang Jepang memakai **よこ**."
  en: "**となり** means right next to, usually for two things of the same kind: the house next door, the person beside you. For a looser *beside*, Japanese uses **よこ**."
tirukan: { ja: "ねこ は テーブル の {下|した} に います 。", kana: "ねこ は テーブル の した に います 。", id: "Kucingnya ada di bawah meja." }
check:
  - id: e1-13-c1
    type: scene
    visual: { id: place-scene-ja, props: { state: under } }
    options: ["ボール は テーブル の {下|した} に あります 。", "ボール は テーブル の {上|うえ} に あります 。", "ボール は {箱|はこ} の {中|なか} に あります 。"]
    answer: "ボール は テーブル の {下|した} に あります 。"
    why: { id: "Bolanya di bawah meja: テーブル の した に.", en: "The ball is under the table: テーブル の した に." }
  - id: e1-13-c2
    type: gap
    cue: "Kucingnya ada di bawah kursi."
    prompt: "ねこ は いす の {下|した} に ___ 。"
    options: [います, あります, です]
    answer: います
    why: { id: "Kucing itu hewan, jadi います.", en: "A cat is an animal, so います." }
  - id: e1-13-c3
    type: fix
    wrong: "{先生|せん|せい} は {教室|きょう|しつ} に あります 。"
    options: ["{先生|せん|せい} は {教室|きょう|しつ} に います 。", "{先生|せん|せい} は {教室|きょう|しつ} に です 。"]
    answer: "{先生|せん|せい} は {教室|きょう|しつ} に います 。"
    why: { id: "Untuk orang pakai います, bukan あります.", en: "For people use います, not あります." }
  - id: e1-13-c4
    type: order
    cue: "Tasnya ada di bawah meja."
    tiles: [あります, "{下|した}", かばん, に, つくえ, は, の]
    answer: [かばん, は, つくえ, の, "{下|した}", に, あります]
    why: { id: "Benda dulu, lalu の, lalu posisinya: つくえ の した に.", en: "The object first, then の, then the position: つくえ の した に." }
  - id: e1-13-c5
    type: kana
    ja: "右"
    furigana: false
    answer: みぎ
    why: { id: "右 dibaca みぎ: kanan. Kirinya 左, ひだり.", en: "右 is read みぎ: right. Left is 左, ひだり." }
  - id: e1-13-c6
    type: trace
    char: 中
    guide: on
    why: { id: "中: kotak dulu, lalu garis tegak panjang yang menembusnya paling akhir.", en: "中: the box first, then the long vertical line through it, last." }
glossary:
  - { ja: "ある", kana: "ある", id: "ada (benda)", en: "to be, to exist (things)", type: verb-1, jlpt: N5 }
  - { ja: "いる", kana: "いる", id: "ada (orang, hewan)", en: "to be, to exist (people, animals)", type: verb-2, jlpt: N5 }
  - { ja: "{上|うえ}", kana: "うえ", id: "atas", en: "on, above", type: noun, jlpt: N5 }
  - { ja: "{下|した}", kana: "した", id: "bawah", en: "under, below", type: noun, jlpt: N5 }
  - { ja: "{中|なか}", kana: "なか", id: "dalam", en: "inside", type: noun, jlpt: N5 }
  - { ja: "{右|みぎ}", kana: "みぎ", id: "kanan", en: "right", type: noun, jlpt: N5 }
  - { ja: "{左|ひだり}", kana: "ひだり", id: "kiri", en: "left", type: noun, jlpt: N5 }
  - { ja: "となり", kana: "となり", id: "sebelah", en: "next to", type: noun, jlpt: N5 }
  - { ja: "うしろ", kana: "うしろ", id: "belakang", en: "behind", type: noun, jlpt: N5 }
  - { ja: "{箱|はこ}", kana: "はこ", id: "kotak", en: "box", type: noun, jlpt: N5 }
  - { ja: "ねこ", kana: "ねこ", id: "kucing", en: "cat", type: noun, jlpt: N5 }
  - { ja: "かばん", kana: "かばん", id: "tas", en: "bag", type: noun, jlpt: N5 }
  - { ja: "{財布|さい|ふ}", kana: "さいふ", id: "dompet", en: "wallet", type: noun, jlpt: N5 }
  - { ja: "テーブル", kana: "テーブル", id: "meja", en: "table", type: noun, jlpt: N5 }
  - { ja: "かさ", kana: "かさ", id: "payung", en: "umbrella", type: noun, jlpt: N5 }
  - { ja: "ボール", kana: "ボール", id: "bola", en: "ball", type: noun }
extra:
  - { ja: "ボール", reason: "Benda di gambar tempat (place-scene-ja); kata serapan dasar, di daftar komunitas tercatat N3." }
next: easy1-14-counters
---

## concept.id
Untuk *ada*, bahasa Jepang punya dua kata: **あります** untuk benda (juga tumbuhan), **います** untuk orang dan hewan. Letaknya ditulis **benda + の + posisi + に**: はこ の うえ に (di atas kotak). Kata posisinya: うえ atas, した bawah, なか dalam, みぎ kanan, ひだり kiri, となり sebelah.

## concept.en
For *there is*, Japanese has two words: **あります** for things (plants too), **います** for people and animals. The place is **object + の + position + に**: はこ の うえ に (on the box). The position words: うえ on, した under, なか in, みぎ right, ひだり left, となり next to.

## contrast.id
Bahasa Indonesia memakai *ada* untuk semuanya: *ada buku*, *ada kucing*. Bahasa Jepang harus memilih: ねこ は います, tapi ほん は あります. Urutannya juga terbalik: *di atas kotak* menjadi はこ の うえ に, kata posisinya sesudah bendanya.

## contrast.en
Indonesian uses *ada* for everything: *ada buku*, *ada kucing*. Japanese has to choose: ねこ は います, but ほん は あります. The order is reversed too: *di atas kotak* becomes はこ の うえ に, with the position after the object.
