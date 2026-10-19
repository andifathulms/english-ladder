---
id: easy1-12-na-adj
rung: easy-1
order: 12
status: draft
minutes: 9
title: { id: "Kota yang tenang", en: "A quiet town", ja: "{静|しず}か な {町|まち}", kana: "しずか な まち" }
summary:
  id: "Kata sifat な: しずか な まち (kota yang tenang), tapi まち は しずか です. な hanya muncul di depan kata benda."
  en: "な adjectives: しずか な まち (a quiet town), but まち は しずか です. な only appears before a noun."
introduces: [n5-na-adj]
spiral: adjectives
kanji: [気, 天, 雨]
worked:
  - { ja: "{町|まち} は [[{静|しず}か]] です 。", kana: "まち は しずか です 。", id: "Kotanya tenang." }
  - { ja: "{静|しず}か [[な]] {町|まち} です 。", kana: "しずか な まち です 。", id: "Ini kota yang tenang." }
  - { ja: "{部屋|=へや} は [[きれい]] です 。", kana: "へや は きれい です 。", id: "Kamarnya bersih." }
  - { ja: "きれい [[な]] {部屋|=へや} です 。", kana: "きれい な へや です 。", id: "Ini kamar yang bersih." }
examples:
  - { ja: "ここ は {静|しず}か [[な]] {町|まち} です 。", kana: "ここ は しずか な まち です 。", id: "Ini kota yang tenang." }
  - { ja: "リナ さん は [[{元気|げん|き}]] です 。", kana: "リナ さん は げんき です 。", id: "Rina sehat-sehat saja." }
  - { ja: "{田中|た|なか} さん の {部屋|=へや} は [[きれい]] です 。", kana: "たなか さん の へや は きれい です 。", id: "Kamar Pak Tanaka bersih." }
  - { ja: "{東京|とう|きょう} は にぎやか [[な]] {町|まち} です 。", kana: "とうきょう は にぎやか な まち です 。", id: "Tokyo kota yang ramai." }
  - { ja: "コンビニ は [[{便利|べん|り}]] です 。", kana: "コンビニ は べんり です 。", id: "Konbini itu praktis." }
  - { ja: "{雨|あめ} の {日|ひ} は [[{静|しず}か]] です 。", kana: "あめ の ひ は しずか です 。", id: "Kalau hujan, suasananya sepi." }
pair:
  off: { ja: "{静|しず}か {町|まち} です 。", kana: "しずか まち です 。" }
  natural: { ja: "{静|しず}か [[な]] {町|まち} です 。", kana: "しずか な まち です 。" }
talk:
  lines:
    - { who: Tanaka, ja: "アンディ さん 、 お{元気|げん|き} です か 。", kana: "アンディ さん 、 おげんき です か 。", id: "Andi, apa kabar?", note: { id: "お元気ですか dipakai kalau sudah lama tidak bertemu, bukan sapaan setiap hari.", en: "お元気ですか is for someone you haven't seen for a while, not an everyday greeting." } }
    - { who: Andi, ja: "はい 、 {元気|げん|き} です 。", kana: "はい 、 げんき です 。", id: "Baik, sehat." }
    - { who: Tanaka, ja: "{今日|=きょう} は いい {天気|てん|き} です ね 。", kana: "きょう は いい てんき です ね 。", id: "Cuacanya bagus hari ini, ya." }
    - { who: Andi, ja: "そう です ね 。", kana: "そう です ね 。", id: "Iya, ya." }
words:
  id: "**きれい** dan **ゆうめい** (terkenal) berakhir dengan い, tapi keduanya kata sifat な: きれい な へや, bukan きれい へや. **すき** dari が すき juga kata sifat な: すき な たべもの (makanan kesukaan)."
  en: "**きれい** and **ゆうめい** (famous) end in い, but both are な adjectives: きれい な へや, not きれい へや. **すき** from が すき is a な adjective too: すき な たべもの (favourite food)."
tirukan: { ja: "{静|しず}か な {町|まち} です 。", kana: "しずか な まち です 。", id: "Ini kota yang tenang." }
check:
  - id: e1-12-c1
    type: gap
    cue: "Ini kamar yang bersih."
    prompt: "きれい ___ {部屋|=へや} です 。"
    options: [な, の, です]
    answer: な
    why: { id: "きれい adalah kata sifat な: di depan kata benda ia butuh な.", en: "きれい is a な adjective: before a noun it needs な." }
  - id: e1-12-c2
    type: fix
    wrong: "{東京|とう|きょう} は にぎやか {町|まち} です 。"
    options: ["{東京|とう|きょう} は にぎやか な {町|まち} です 。", "{東京|とう|きょう} は {町|まち} にぎやか です 。"]
    answer: "{東京|とう|きょう} は にぎやか な {町|まち} です 。"
    why: { id: "Kata sifat な di depan kata benda: にぎやか な まち.", en: "A な adjective before a noun: にぎやか な まち." }
  - id: e1-12-c3
    type: choice
    cue: "Rina sehat-sehat saja."
    prompt: "Pilih kalimat yang benar."
    options: ["リナ さん は {元気|げん|き} です 。", "リナ さん は {元気|げん|き} な です 。"]
    answer: "リナ さん は {元気|げん|き} です 。"
    why: { id: "Sebelum です tidak ada な: げんき です.", en: "No な before です: げんき です." }
  - id: e1-12-c4
    type: order
    cue: "Ini kota yang tenang."
    tiles: [です, "{町|まち}", な, ここ, "{静|しず}か", は]
    answer: [ここ, は, "{静|しず}か", な, "{町|まち}", です]
    why: { id: "Kata sifat dulu, lalu な, lalu kata benda: しずか な まち.", en: "Adjective first, then な, then the noun: しずか な まち." }
  - id: e1-12-c5
    type: kana
    ja: "天気"
    furigana: false
    answer: てんき
    why: { id: "天気 dibaca てんき: cuaca.", en: "天気 is read てんき: weather." }
  - id: e1-12-c6
    type: trace
    char: 雨
    guide: on
    why: { id: "雨: garis atas dulu, lalu bingkai, garis tengah, dan terakhir empat titik hujan.", en: "雨: the top line first, then the frame, the middle line, and last the four raindrops." }
glossary:
  - { ja: "きれい", kana: "きれい", id: "cantik, bersih", en: "pretty, clean", type: adj-na, jlpt: N5 }
  - { ja: "{静|しず}か", kana: "しずか", id: "tenang, sepi", en: "quiet", type: adj-na, jlpt: N5 }
  - { ja: "{元気|げん|き}", kana: "げんき", id: "sehat, bersemangat", en: "well, healthy", type: adj-na, jlpt: N5 }
  - { ja: "にぎやか", kana: "にぎやか", id: "ramai", en: "lively, busy", type: adj-na, jlpt: N5 }
  - { ja: "{便利|べん|り}", kana: "べんり", id: "praktis, mudah", en: "convenient", type: adj-na, jlpt: N5 }
  - { ja: "{有名|ゆう|めい}", kana: "ゆうめい", id: "terkenal", en: "famous", type: adj-na, jlpt: N5 }
  - { ja: "いい", kana: "いい", id: "baik, bagus", en: "good", type: adj-i, jlpt: N5 }
  - { ja: "{天気|てん|き}", kana: "てんき", id: "cuaca", en: "weather", type: noun, jlpt: N5 }
  - { ja: "{雨|あめ}", kana: "あめ", id: "hujan", en: "rain", type: noun, jlpt: N5 }
  - { ja: "{部屋|=へや}", kana: "へや", id: "kamar", en: "room", type: noun, jlpt: N5 }
  - { ja: "{町|まち}", kana: "まち", id: "kota, kota kecil", en: "town", type: noun, jlpt: N5 }
next: easy1-13-arimasu-imasu
---

## concept.id
Kata sifat **な** seperti きれい, しずか dan げんき butuh **な** kalau berdiri di depan kata benda: しずか な まち (kota yang tenang). Di akhir kalimat, sebelum です, な tidak dipakai: まち は しずか です. Hati-hati: きれい berakhir dengan い, tapi tetap kata sifat な.

## concept.en
**な** adjectives such as きれい, しずか and げんき need **な** when they stand before a noun: しずか な まち (a quiet town). At the end of a sentence, before です, there is no な: まち は しずか です. Careful: きれい ends in い, but it is still a な adjective.

## contrast.id
Bahasa Indonesia menaruh kata sifat sesudah kata benda, sering dengan *yang*: *kota yang tenang*. Bahasa Jepang membalik urutannya: kata sifat dulu, lalu な, lalu kata bendanya. Kamu bisa mengingat な sebagai *yang* yang pindah ke depan kata benda.

## contrast.en
Indonesian puts the adjective after the noun, often with *yang*: *kota yang tenang*. Japanese reverses the order: adjective first, then な, then the noun. You can think of な as a *yang* that moved in front of the noun.
