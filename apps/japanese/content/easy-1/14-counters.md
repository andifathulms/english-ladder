---
id: easy1-14-counters
rung: easy-1
order: 14
status: draft
minutes: 10
title: { id: "Tiga batang, dua lembar", en: "Counting things", ja: "{三本|さん|ぼん} 、 {二枚|に|まい}", kana: "さんぼん 、 にまい" }
summary:
  id: "Angka + kata bantu bilangan: さんぼん (tiga batang), にまい (dua lembar). Letaknya sesudah benda + を, sebelum kata kerja."
  en: "Number + counter: さんぼん (three long things), にまい (two flat things). It goes after object + を, before the verb."
introduces: [n5-counters]
spiral: counters
kanji: [百, 千, 万]
visual: { id: counters, props: { initial: { counter: 本, n: 3 } } }
examples:
  - { ja: "ペン を [[{三本|さん|ぼん}]] {買|か}います 。", kana: "ペン を さんぼん かいます 。", id: "Saya beli tiga batang pena." }
  - { ja: "きっぷ を [[{二枚|に|まい}]] {買|か}います 。", kana: "きっぷ を にまい かいます 。", id: "Saya beli dua lembar tiket." }
  - { ja: "{本|ほん} を [[{一冊|いっ|さつ}]] {読|よ}みました 。", kana: "ほん を いっさつ よみました 。", id: "Saya membaca satu buku." }
  - { ja: "りんご を [[{一個|いっ|こ}]] {食|た}べました 。", kana: "りんご を いっこ たべました 。", id: "Saya makan sebuah apel." }
  - { ja: "{公園|こう|えん} で ねこ を [[{三匹|さん|びき}]] {見|み}ました 。", kana: "こうえん で ねこ を さんびき みました 。", id: "Saya melihat tiga ekor kucing di taman." }
  - { ja: "{家族|か|ぞく} は [[{四人|よ|にん}]] です 。", kana: "かぞく は よにん です 。", id: "Keluarga saya empat orang." }
pair:
  off: { ja: "ペン を {三|さん} {買|か}います 。", kana: "ペン を さん かいます 。" }
  natural: { ja: "ペン を [[{三本|さん|ぼん}]] {買|か}います 。", kana: "ペン を さんぼん かいます 。" }
sound:
  words:
    - { ja: "{百|ひゃく}", kana: "ひゃく" }
    - { ja: "{三百|さん|びゃく}", kana: "さんびゃく" }
    - { ja: "{六百|ろっ|ぴゃく}", kana: "ろっぴゃく" }
    - { ja: "{八百|はっ|ぴゃく}", kana: "はっぴゃく" }
    - { ja: "{三千|さん|ぜん}", kana: "さんぜん" }
    - { ja: "{八千|はっ|せん}", kana: "はっせん" }
  kind: small-tsu
  tip:
    id: "百 dan 千 berubah bunyi seperti 本: さんびゃく, さんぜん; ろっぴゃく, はっぴゃく, はっせん dengan っ kecil. 10.000 dibaca いちまん: 万 selalu butuh angka di depannya."
    en: "百 and 千 change sound like 本: さんびゃく, さんぜん; ろっぴゃく, はっぴゃく, はっせん with a small っ. 10,000 is いちまん: 万 always needs a number before it."
talk:
  lines:
    - { who: Dewi, ja: "すみません 、 りんご は いくら です か 。", kana: "すみません 、 りんご は いくら です か 。", id: "Permisi, apelnya berapa?" }
    - { who: Suzuki, ja: "{一個|いっ|こ} {百円|ひゃく|えん} です 。", kana: "いっこ ひゃくえん です 。", id: "Seratus yen sebuah." }
    - { who: Dewi, ja: "じゃあ 、 {三個|さん|こ} ください 。", kana: "じゃあ 、 さんこ ください 。", id: "Kalau begitu, saya minta tiga." }
    - { who: Suzuki, ja: "{三百円|さん|びゃく|えん} です 。", kana: "さんびゃくえん です 。", id: "Tiga ratus yen." }
words:
  id: "**ひとつ, ふたつ, みっつ** (～つ) bisa dipakai untuk benda apa saja, tapi hanya sampai 10 (とお); sesudah itu pakai angka biasa. Untuk orang dan hewan jangan pakai ～つ. Di warung atau restoran, コーヒー を ふたつ ください sudah cukup."
  en: "**ひとつ, ふたつ, みっつ** (～つ) work for any thing, but only up to 10 (とお); after that use plain numbers. Never use ～つ for people or animals. At a stall or restaurant, コーヒー を ふたつ ください is enough."
tirukan: { ja: "ペン を {三本|さん|ぼん} {買|か}います 。", kana: "ペン を さんぼん かいます 。", id: "Saya beli tiga batang pena." }
check:
  - id: e1-14-c1
    type: gap
    cue: "Saya beli dua lembar tiket."
    prompt: "きっぷ を {二|に} ___ {買|か}います 。"
    options: ["{枚|まい}", "{本|ほん}", "{冊|さつ}"]
    answer: "{枚|まい}"
    why: { id: "Tiket itu tipis, jadi 枚 (まい): にまい.", en: "A ticket is flat, so 枚 (まい): にまい." }
  - id: e1-14-c2
    type: choice
    prompt: "{六|ろく} + {本|ほん}"
    options: [ろっぽん, ろくほん, ろくぼん]
    answer: ろっぽん
    why: { id: "ろく + ほん menjadi ろっぽん: ada っ kecil dan ほ berubah jadi ぽ.", en: "ろく + ほん becomes ろっぽん: a small っ, and ほ turns into ぽ." }
  - id: e1-14-c3
    type: fix
    wrong: "ペン を {三|さん} {買|か}います 。"
    options: ["ペン を {三本|さん|ぼん} {買|か}います 。", "{三|さん} ペン を {買|か}います 。"]
    answer: "ペン を {三本|さん|ぼん} {買|か}います 。"
    why: { id: "Angka butuh kata bantu bilangan: pena itu panjang, jadi さんぼん.", en: "A number needs a counter: a pen is long, so さんぼん." }
  - id: e1-14-c4
    type: listen
    audio: "{三百円|さん|びゃく|えん} です 。"
    options: ["{三百円|さん|びゃく|えん}", "{三千円|さん|ぜん|えん}", "{三万円|さん|まん|えん}"]
    answer: "{三百円|さん|びゃく|えん}"
    why: { id: "さんびゃく = 300. さんぜん = 3.000, さんまん = 30.000.", en: "さんびゃく = 300. さんぜん = 3,000, さんまん = 30,000." }
  - id: e1-14-c5
    type: kana
    ja: "千円"
    furigana: false
    answer: せんえん
    why: { id: "千円 dibaca せんえん: seribu yen.", en: "千円 is read せんえん: a thousand yen." }
  - id: e1-14-c6
    type: trace
    char: 百
    guide: on
    why: { id: "百: garis atas dulu, lalu 白 di bawahnya.", en: "百: the top line first, then 白 beneath it." }
glossary:
  - { ja: "{本|ほん}", kana: "ほん", id: "kata bantu: batang (benda panjang)", en: "counter for long things", type: counter, jlpt: N5 }
  - { ja: "{枚|まい}", kana: "まい", id: "kata bantu: lembar (benda tipis)", en: "counter for flat things", type: counter, jlpt: N5 }
  - { ja: "{冊|さつ}", kana: "さつ", id: "kata bantu: buku, majalah", en: "counter for books", type: counter, jlpt: N5 }
  - { ja: "{匹|ひき}", kana: "ひき", id: "kata bantu: ekor (hewan kecil)", en: "counter for small animals", type: counter, jlpt: N5 }
  - { ja: "{個|こ}", kana: "こ", id: "kata bantu: buah (benda kecil)", en: "counter for small things", type: counter, jlpt: N5 }
  - { ja: "{人|にん}", kana: "にん", id: "kata bantu: orang", en: "counter for people", type: counter, jlpt: N5 }
  - { ja: "{百|ひゃく}", kana: "ひゃく", id: "seratus", en: "hundred", type: number, jlpt: N5 }
  - { ja: "{千|せん}", kana: "せん", id: "seribu", en: "thousand", type: number, jlpt: N5 }
  - { ja: "{万|まん}", kana: "まん", id: "sepuluh ribu", en: "ten thousand", type: number, jlpt: N5 }
  - { ja: "ペン", kana: "ペン", id: "pena", en: "pen", type: noun, jlpt: N5 }
  - { ja: "きっぷ", kana: "きっぷ", id: "tiket, karcis", en: "ticket", type: noun, jlpt: N5 }
  - { ja: "りんご", kana: "りんご", id: "apel", en: "apple", type: noun }
  - { ja: "{公園|こう|えん}", kana: "こうえん", id: "taman", en: "park", type: noun, jlpt: N5 }
  - { ja: "{家族|か|ぞく}", kana: "かぞく", id: "keluarga", en: "family", type: noun, jlpt: N5 }
extra:
  - { ja: "りんご", reason: "Benda yang dihitung dengan 個 di rak kata bantu bilangan; kata dasar di semua buku N5, tapi tidak ada di daftar komunitas." }
next: easy1-15-masenka
---

## concept.id
Untuk menghitung, bahasa Jepang menempelkan **kata bantu bilangan** pada angka: 本 (ほん) benda panjang, 枚 (まい) benda tipis, 冊 (さつ) buku, 匹 (ひき) hewan kecil, 個 (こ) benda kecil, 人 (にん) orang. Letaknya sesudah benda + を, tepat sebelum kata kerja: ペン を さんぼん かいます. Bunyinya sering berubah (いっぽん, さんぼん, ろっぽん), dan untuk orang, satu dan dua adalah ひとり dan ふたり.

## concept.en
To count, Japanese adds a **counter** to the number: 本 (ほん) long things, 枚 (まい) flat things, 冊 (さつ) books, 匹 (ひき) small animals, 個 (こ) small things, 人 (にん) people. It goes after object + を, just before the verb: ペン を さんぼん かいます. The sounds often change (いっぽん, さんぼん, ろっぽん), and for people, one and two are ひとり and ふたり.

## contrast.id
Bahasa Indonesia juga punya kata penggolong: *batang*, *lembar*, *ekor*, *buah*. Bedanya, *tiga pena* tanpa *batang* tetap benar, sedangkan di bahasa Jepang kata bantu bilangan wajib: ペン を さん かいます salah. Urutannya pun lain: *tiga ekor kucing* menjadi ねこ を さんびき, angkanya sesudah bendanya.

## contrast.en
Indonesian has classifiers too: *batang*, *lembar*, *ekor*, *buah*. The difference: *tiga pena* without *batang* is still correct, but in Japanese the counter is required: ペン を さん かいます is wrong. The order differs too: *tiga ekor kucing* becomes ねこ を さんびき, with the number after the noun.
