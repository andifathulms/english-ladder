---
id: easy1-05-ikura
rung: easy-1
order: 5
status: draft
minutes: 10
title: { id: "Berapa harganya?", en: "How much is it?", ja: "いくら です か", kana: "いくら です か" }
summary:
  id: "Angka, harga dengan ～円 (えん), dan pertanyaan いくら です か di toko."
  en: "Numbers, prices with ～円 (えん), and the question いくら です か at the shop."
introduces: [n5-numbers]
spiral: numbers
kanji: [四, 五, 六, 七, 八, 九, 十, 円]
worked:
  - { ja: "{一|いち} 、 {二|に} 、 {三|さん} 、 {四|よん} 、 {五|ご}", kana: "いち 、 に 、 さん 、 よん 、 ご", id: "satu, dua, tiga, empat, lima" }
  - { ja: "{六|ろく} 、 {七|なな} 、 {八|はち} 、 {九|きゅう} 、 {十|じゅう}", kana: "ろく 、 なな 、 はち 、 きゅう 、 じゅう", id: "enam, tujuh, delapan, sembilan, sepuluh" }
  - { ja: "{十一|じゅう|いち} 、 {二十|に|じゅう} 、 {四十五|よん|じゅう|ご}", kana: "じゅういち 、 にじゅう 、 よんじゅうご", id: "sebelas, dua puluh, empat puluh lima", note: { id: "Seperti bahasa Indonesia: dua-sepuluh = dua puluh.", en: "Like Indonesian: two-ten = twenty." } }
  - { ja: "これ は [[いくら]] です か 。", kana: "これ は いくら です か 。", id: "Ini berapa?" }
  - { ja: "[[{百六十円|ひゃく|ろく|じゅう|えん}]] です 。", kana: "ひゃくろくじゅうえん です 。", id: "Seratus enam puluh yen." }
examples:
  - { ja: "すみません 、 これ は [[いくら]] です か 。", kana: "すみません 、 これ は いくら です か 。", id: "Permisi, ini berapa?" }
  - { ja: "この おにぎり は [[{百六十円|ひゃく|ろく|じゅう|えん}]] です 。", kana: "この おにぎり は ひゃくろくじゅうえん です 。", id: "Onigiri ini 160 yen." }
  - { ja: "バナナ は [[{九十八円|きゅう|じゅう|はち|えん}]] です 。", kana: "バナナ は きゅうじゅうはちえん です 。", id: "Pisangnya 98 yen." }
  - { ja: "お{茶|ちゃ} は [[{百四十円|ひゃく|よん|じゅう|えん}]] です 。", kana: "おちゃ は ひゃくよんじゅうえん です 。", id: "Tehnya 140 yen." }
  - { ja: "パン は [[{百七十円|ひゃく|なな|じゅう|えん}]] です 。", kana: "パン は ひゃくななじゅうえん です 。", id: "Rotinya 170 yen." }
  - { ja: "ふくろ は [[{五円|ご|えん}]] です 。", kana: "ふくろ は ごえん です 。", id: "Kantong plastiknya 5 yen." }
pair:
  off: { ja: "いくら は これ です か 。", kana: "いくら は これ です か 。" }
  natural: { ja: "これ は [[いくら]] です か 。", kana: "これ は いくら です か 。" }
sound:
  words:
    - { ja: "{九|きゅう}", kana: "きゅう" }
    - { ja: "{十|じゅう}", kana: "じゅう" }
  kind: long-vowel
  tip:
    id: "きゅう dan じゅう dibaca dengan u panjang, seperti きゅー dan じゅー: dua ketukan."
    en: "きゅう and じゅう have a long u, like きゅー and じゅー: two beats."
talk:
  lines:
    - { who: Andi, ja: "すみません 、 これ は いくら です か 。", kana: "すみません 、 これ は いくら です か 。", id: "Permisi, ini berapa?" }
    - { who: "Kasir", ja: "{百六十円|ひゃく|ろく|じゅう|えん} です 。", kana: "ひゃくろくじゅうえん です 。", id: "160 yen." }
    - { who: Andi, ja: "これ を ください 。", kana: "これ を ください 。", id: "Saya ambil ini." }
    - { who: "Kasir", ja: "ありがとう ございます 。", kana: "ありがとう ございます 。", id: "Terima kasih." }
words:
  id: "Di toko, 4, 7 dan 9 hampir selalu dibaca **よん**, **なな**, **きゅう** (よんじゅう, ななじゅう, きゅうじゅう). Satu pengecualian yang akan kamu temui: 4 yen dibaca **よえん**, bukan よんえん."
  en: "At the shop, 4, 7 and 9 are nearly always **よん**, **なな**, **きゅう** (よんじゅう, ななじゅう, きゅうじゅう). One exception you'll meet: 4 yen is **よえん**, not よんえん."
tirukan: { ja: "これ は いくら です か 。", kana: "これ は いくら です か 。", id: "Ini berapa?" }
check:
  - id: e1-05-c1
    type: gap
    cue: "Ini berapa?"
    prompt: "これ は ___ です か 。"
    options: [いくら, どこ, だれ]
    answer: いくら
    why: { id: "いくら: berapa (harga). どこ untuk tempat, だれ untuk orang.", en: "いくら: how much. どこ is for places, だれ for people." }
  - id: e1-05-c2
    type: choice
    prompt: "{九十八円|きゅう|じゅう|はち|えん}"
    options: [98 yen, 89 yen, 980 yen]
    answer: 98 yen
    why: { id: "九十 (きゅうじゅう) = 90, lalu 八 (はち) = 8: 98 yen.", en: "九十 (きゅうじゅう) = 90, then 八 (はち) = 8: 98 yen." }
  - id: e1-05-c3
    type: kana
    ja: "{四十円|よん|じゅう|えん}"
    furigana: false
    answer: よんじゅうえん
    why: { id: "四十 di harga dibaca よんじゅう: 40 yen.", en: "四十 in a price is read よんじゅう: 40 yen." }
  - id: e1-05-c4
    type: listen
    audio: "{百七十円|ひゃく|なな|じゅう|えん} です 。"
    options: ["{百七十円|ひゃく|なな|じゅう|えん} です 。", "{百四十円|ひゃく|よん|じゅう|えん} です 。", "{百十七円|ひゃく|じゅう|なな|えん} です 。"]
    answer: "{百七十円|ひゃく|なな|じゅう|えん} です 。"
    why: { id: "ひゃく-ななじゅう: 170 yen. Kalau 117, じゅう datang sebelum なな.", en: "ひゃく-ななじゅう: 170 yen. In 117, じゅう comes before なな." }
  - id: e1-05-c5
    type: fix
    wrong: "いくら は これ です か 。"
    options: ["これ は いくら です か 。", "これ いくら は です か 。"]
    answer: "これ は いくら です か 。"
    why: { id: "いくら berdiri di tempat jawabannya: これ は (ひゃくろくじゅうえん) です → これ は いくら です か.", en: "いくら sits where the answer goes: これ は (ひゃくろくじゅうえん) です → これ は いくら です か." }
  - id: e1-05-c6
    type: trace
    char: 円
    guide: on
    why: { id: "円: empat goresan. Bingkai luar dulu (kiri, lalu atas dan kanan), baru garis di dalamnya.", en: "円: four strokes. The outer frame first (left, then top and right), then the lines inside." }
glossary:
  - { ja: "{四|よん}", kana: "よん", id: "empat", en: "four", type: number }
  - { ja: "{五|ご}", kana: "ご", id: "lima", en: "five", type: number, jlpt: N5 }
  - { ja: "{六|ろく}", kana: "ろく", id: "enam", en: "six", type: number, jlpt: N5 }
  - { ja: "{七|なな}", kana: "なな", id: "tujuh", en: "seven", type: number }
  - { ja: "{八|はち}", kana: "はち", id: "delapan", en: "eight", type: number, jlpt: N5 }
  - { ja: "{九|きゅう}", kana: "きゅう", id: "sembilan", en: "nine", type: number, jlpt: N5 }
  - { ja: "{十|じゅう}", kana: "じゅう", id: "sepuluh", en: "ten", type: number, jlpt: N5 }
  - { ja: "{百|ひゃく}", kana: "ひゃく", id: "seratus", en: "hundred", type: number, jlpt: N5 }
  - { ja: "{円|えん}", kana: "えん", id: "yen", en: "yen", type: counter, jlpt: N5 }
  - { ja: "いくら", kana: "いくら", id: "berapa (harga)", en: "how much", type: adverb, jlpt: N5 }
  - { ja: "おにぎり", kana: "おにぎり", id: "onigiri, nasi kepal", en: "rice ball", type: noun }
  - { ja: "バナナ", kana: "バナナ", id: "pisang", en: "banana", type: noun }
  - { ja: "パン", kana: "パン", id: "roti", en: "bread", type: noun, jlpt: N5 }
  - { ja: "お{茶|ちゃ}", kana: "おちゃ", id: "teh (Jepang)", en: "(green) tea", type: noun, jlpt: N5 }
  - { ja: "ふくろ", kana: "ふくろ", id: "kantong, tas plastik", en: "bag", type: noun }
  - { ja: "ください", kana: "ください", id: "minta …, tolong beri", en: "please give me", type: expression, jlpt: N5 }
extra:
  - { ja: "{四|よん}", reason: "Bacaan よん untuk 4 dipakai di harga dan jam; daftar komunitas menaruh 四 (よん) di N3 dan 四 (し) di N5." }
  - { ja: "{七|なな}", reason: "Bacaan なな untuk 7 yang paling umum di harga; daftar komunitas hanya mencatat しち." }
  - { ja: "{円|えん}", reason: "～円 (yen) tercatat N5; entri 円 tanpa ～ (lingkaran) tercatat N3." }
  - { ja: "おにぎり", reason: "Makanan konbini sehari-hari; tidak ada di daftar komunitas." }
  - { ja: "バナナ", reason: "Kata serapan yang langsung dikenali; tidak ada di daftar komunitas." }
  - { ja: "ふくろ", reason: "Kasir konbini selalu menanyakan kantong plastik (berbayar); daftar komunitas menaruhnya di N3." }
next: easy1-06-nanji
---

## concept.id
Angka 1 sampai 10: いち, に, さん, よん, ご, ろく, なな, はち, きゅう, じゅう. Puluhan dibentuk seperti *dua puluh*: 二十 (にじゅう), 四十 (よんじゅう), dan seratus adalah ひゃく. Harga = angka + **円** (えん); untuk bertanya pakai **いくら**: これ は いくら です か. 4, 7 dan 9 juga punya bacaan lain (し, しち, く); しち dan く akan kamu temui lagi di pelajaran jam.

## concept.en
Numbers 1 to 10: いち, に, さん, よん, ご, ろく, なな, はち, きゅう, じゅう. Tens are built like *dua puluh*: 二十 (にじゅう), 四十 (よんじゅう), and a hundred is ひゃく. A price = number + **円** (えん); to ask, use **いくら**: これ は いくら です か. 4, 7 and 9 also have other readings (し, しち, く); you'll meet しち and く again with clock times.

## contrast.id
Bahasa Indonesia boleh menaruh kata tanya di depan: *Berapa ini?* Bahasa Jepang menaruh いくら di tempat jawabannya: これ は **いくら** です か → これ は **ひゃくえん** です. Urutan harganya sama dengan bahasa Indonesia: angka dulu, lalu mata uangnya (ひゃくえん, *seratus yen*).

## contrast.en
Indonesian can put the question word first: *Berapa ini?* Japanese puts いくら where the answer goes: これ は **いくら** です か → これ は **ひゃくえん** です. Prices run in the same order as Indonesian: the number, then the currency (ひゃくえん, *a hundred yen*).
