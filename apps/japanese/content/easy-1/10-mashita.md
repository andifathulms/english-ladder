---
id: easy1-10-mashita
rung: easy-1
order: 10
status: draft
minutes: 9
title: { id: "Kemarin", en: "Yesterday", ja: "{昨日|=きのう} {何|なに} を しました か", kana: "きのう なに を しました か" }
summary:
  id: "Untuk masa lalu, ます jadi ました dan ません jadi ませんでした. Bagian depan kata kerjanya tetap."
  en: "For the past, ます becomes ました and ません becomes ませんでした. The front of the verb stays the same."
introduces: [n5-mashita]
spiral: verbs
kanji: [年, 火, 木, 金, 土]
worked:
  - { ja: "{毎日|まい|にち} {本|ほん} を [[{読|よ}みます]] 。", kana: "まいにち ほん を よみます 。", id: "Setiap hari saya membaca buku." }
  - { ja: "{昨日|=きのう} {本|ほん} を [[{読|よ}みました]] 。", kana: "きのう ほん を よみました 。", id: "Kemarin saya membaca buku." }
  - { ja: "{昨日|=きのう} {本|ほん} を [[{読|よ}みませんでした]] 。", kana: "きのう ほん を よみませんでした 。", id: "Kemarin saya tidak membaca buku." }
examples:
  - { ja: "{去年|きょ|ねん} {日本|に|ほん} へ [[{来|き}ました]] 。", kana: "きょねん にほん へ きました 。", id: "Saya datang ke Jepang tahun lalu." }
  - { ja: "{土曜日|ど|よう|び} は {東京|とう|きょう} へ [[{行|い}きました]] 。", kana: "どようび は とうきょう へ いきました 。", id: "Hari Sabtu saya pergi ke Tokyo." }
  - { ja: "{金曜日|きん|よう|び} は {会社|かい|しゃ} へ [[{行|い}きませんでした]] 。", kana: "きんようび は かいしゃ へ いきませんでした 。", id: "Hari Jumat saya tidak ke kantor." }
  - { ja: "{木曜日|もく|よう|び} は {図書館|と|しょ|かん} で {日本語|に|ほん|ご} を [[{勉強|べん|きょう}しました]] 。", kana: "もくようび は としょかん で にほんご を べんきょうしました 。", id: "Hari Kamis saya belajar bahasa Jepang di perpustakaan." }
  - { ja: "{火曜日|か|よう|び} は テレビ を [[{見|み}ませんでした]] 。", kana: "かようび は テレビ を みませんでした 。", id: "Hari Selasa saya tidak menonton TV." }
  - { ja: "{昨日|=きのう} {何|なに} を [[しました]] か 。", kana: "きのう なに を しました か 。", id: "Apa yang kamu lakukan kemarin?" }
pair:
  off: { ja: "{昨日|=きのう} {本|ほん} を {読|よ}みます 。", kana: "きのう ほん を よみます 。" }
  natural: { ja: "{昨日|=きのう} {本|ほん} を [[{読|よ}みました]] 。", kana: "きのう ほん を よみました 。" }
sound:
  words:
    - { ja: "{行|い}きました", kana: "いきました" }
    - { ja: "{来|き}ました", kana: "きました" }
  kind: mora
  tip:
    id: "Vokal i di し pada ました hampir tidak terdengar, tapi tetap satu ketukan: い・き・ま・し・た, lima ketukan."
    en: "The i in the し of ました is barely heard, but it's still a beat: い・き・ま・し・た, five beats."
talk:
  lines:
    - { who: Tanaka, ja: "デウィ さん 、 {土曜日|ど|よう|び} は {何|なに} を しました か 。", kana: "デウィ さん 、 どようび は なに を しました か 。", id: "Dewi, apa yang kamu lakukan hari Sabtu?" }
    - { who: Dewi, ja: "{大阪|おお|さか} へ {行|い}きました 。", kana: "おおさか へ いきました 。", id: "Saya pergi ke Osaka." }
    - { who: Dewi, ja: "{田中|た|なか} さん は {何|なに} を しました か 。", kana: "たなか さん は なに を しました か 。", id: "Kalau Pak Tanaka sendiri, apa yang Bapak lakukan?", note: { id: "Lawan bicara dipanggil dengan nama + さん, bukan あなた.", en: "Address the other person by name + さん, not あなた." } }
    - { who: Tanaka, ja: "うち で テレビ を {見|み}ました 。", kana: "うち で テレビ を みました 。", id: "Saya menonton TV di rumah." }
words:
  id: "Nama hari memakai unsur alam: **火** api (かようび, Selasa), **木** pohon (もくようび, Kamis), **金** emas (きんようび, Jumat), **土** tanah (どようび, Sabtu). Semuanya diakhiri ようび."
  en: "Weekday names use the elements: **火** fire (かようび, Tuesday), **木** tree (もくようび, Thursday), **金** gold (きんようび, Friday), **土** earth (どようび, Saturday). All end in ようび."
tirukan: { ja: "{去年|きょ|ねん} {日本|に|ほん} へ {来|き}ました 。", kana: "きょねん にほん へ きました 。", id: "Saya datang ke Jepang tahun lalu." }
check:
  - id: e1-10-c1
    type: form
    word: "{飲|の}みます"
    target: mashita
    options: ["{飲|の}みました", "{飲|の}むました", "{飲|の}みませんでした"]
    answer: "{飲|の}みました"
    why: { id: "ます jadi ました: のみました. のみませんでした artinya tidak minum.", en: "ます becomes ました: のみました. のみませんでした means didn't drink." }
  - id: e1-10-c2
    type: form
    word: "{見|み}ません"
    target: masendeshita
    options: ["{見|み}ませんでした", "{見|み}ましたでした", "{見|み}ませんました"]
    answer: "{見|み}ませんでした"
    why: { id: "ません + でした = ませんでした: tidak (waktu itu).", en: "ません + でした = ませんでした: didn't." }
  - id: e1-10-c3
    type: gap
    cue: "Kemarin saya tidak pergi ke kantor."
    prompt: "{昨日|=きのう} {会社|かい|しゃ} へ ___ 。"
    options: ["{行|い}きませんでした", "{行|い}きません", "{行|い}きました"]
    answer: "{行|い}きませんでした"
    why: { id: "Kemarin + tidak: ませんでした. Kata きのう saja tidak cukup; kata kerjanya ikut berubah.", en: "Yesterday + not: ませんでした. きのう alone isn't enough; the verb changes too." }
  - id: e1-10-c4
    type: choice
    prompt: "{金曜日|きん|よう|び}"
    options: [Jumat, Kamis, Sabtu]
    answer: Jumat
    why: { id: "きんようび: Jumat. もくようび Kamis, どようび Sabtu.", en: "きんようび: Friday. もくようび Thursday, どようび Saturday." }
  - id: e1-10-c5
    type: listen
    audio: "{去年|きょ|ねん} {日本|に|ほん} へ {来|き}ました 。"
    options:
      - "{去年|きょ|ねん} {日本|に|ほん} へ {来|き}ました 。"
      - "{去年|きょ|ねん} {日本|に|ほん} へ {来|き}ませんでした 。"
      - "{来年|らい|ねん} {日本|に|ほん} へ {来|き}ます 。"
    answer: "{去年|きょ|ねん} {日本|に|ほん} へ {来|き}ました 。"
    why: { id: "きょねん (tahun lalu) + きました (datang). らいねん artinya tahun depan.", en: "きょねん (last year) + きました (came). らいねん means next year." }
  - id: e1-10-c6
    type: trace
    char: 年
    guide: on
    why: { id: "年: 6 goresan. Garis tegak panjang di tengah ditulis paling akhir.", en: "年: 6 strokes. The long vertical through the middle comes last." }
glossary:
  - { ja: "{昨日|=きのう}", kana: "きのう", id: "kemarin", en: "yesterday", type: noun, jlpt: N5 }
  - { ja: "{去年|きょ|ねん}", kana: "きょねん", id: "tahun lalu", en: "last year", type: noun, jlpt: N5 }
  - { ja: "{今年|=ことし}", kana: "ことし", id: "tahun ini", en: "this year", type: noun, jlpt: N5 }
  - { ja: "{毎年|まい|とし}", kana: "まいとし", id: "setiap tahun", en: "every year", type: noun, jlpt: N5 }
  - { ja: "{火曜日|か|よう|び}", kana: "かようび", id: "hari Selasa", en: "Tuesday", type: noun, jlpt: N5 }
  - { ja: "{木曜日|もく|よう|び}", kana: "もくようび", id: "hari Kamis", en: "Thursday", type: noun, jlpt: N5 }
  - { ja: "{金曜日|きん|よう|び}", kana: "きんようび", id: "hari Jumat", en: "Friday", type: noun, jlpt: N5 }
  - { ja: "{土曜日|ど|よう|び}", kana: "どようび", id: "hari Sabtu", en: "Saturday", type: noun, jlpt: N5 }
  - { ja: "する", kana: "する", id: "melakukan, mengerjakan", en: "to do", type: verb-3, jlpt: N5 }
  - { ja: "まだ", kana: "まだ", id: "belum, masih", en: "not yet, still", type: adverb, jlpt: N5 }
next: easy1-11-i-adj
---

## concept.id
Untuk masa lalu, ganti ujung kata kerjanya: **ます → ました**, **ません → ませんでした**. よみます jadi よみました (membaca, waktu lalu), dan よみません jadi よみませんでした (tidak membaca). Bagian depan kata kerjanya tidak berubah.

## concept.en
For the past, change the end of the verb: **ます → ました**, **ません → ませんでした**. よみます becomes よみました (read, in the past), and よみません becomes よみませんでした (didn't read). The front of the verb doesn't change.

## contrast.id
Bahasa Indonesia tidak mengubah kata kerja: *kemarin saya membaca*, waktunya ditunjukkan oleh *kemarin*. Bahasa Jepang mengubah ujung kata kerjanya, jadi ました tetap perlu walaupun sudah ada きのう. Hati-hati: *belum* tidak dijawab dengan ませんでした, tapi dengan まだ です.

## contrast.en
Indonesian doesn't change the verb: *kemarin saya membaca*, and *kemarin* shows the time. Japanese changes the end of the verb, so ました is still needed even with きのう. Careful: *not yet* isn't ませんでした but まだ です.
