---
id: easy1-16-ichinichi
rung: easy-1
order: 16
status: draft
minutes: 10
title: { id: "Sehari di Jepang", en: "A day in Japan", ja: "{一日|いち|にち}", kana: "いちにち" }
summary:
  id: "Satu hari penuh, dari bangun pagi sampai belanja di konbini: ulangan partikel, waktu, angka, kata bantu bilangan dan ajakan."
  en: "A whole day, from getting up to shopping at the konbini: a review of particles, time, numbers, counters and invitations."
introduces: [n5-review-day]
spiral: particles
kanji: [店, 買, 外]
worked:
  - { ja: "{今|いま} {七時|しち|じ} です 。", kana: "いま しちじ です 。", id: "Sekarang jam tujuh." }
  - { ja: "{朝|あさ}ごはん を {食|た}べます 。", kana: "あさごはん を たべます 。", id: "Saya sarapan." }
  - { ja: "{会社|かい|しゃ} へ {行|い}きます 。", kana: "かいしゃ へ いきます 。", id: "Saya berangkat ke kantor." }
  - { ja: "{昼|ひる} は [[{外|そと}]] で {食|た}べます 。", kana: "ひる は そと で たべます 。", id: "Siang hari saya makan di luar." }
  - { ja: "{夜|よる} は コンビニ へ {行|い}きます 。", kana: "よる は コンビニ へ いきます 。", id: "Malamnya saya pergi ke konbini." }
  - { ja: "コンビニ で おにぎり を [[{二|ふた}つ]] {買|か}います 。", kana: "コンビニ で おにぎり を ふたつ かいます 。", id: "Di konbini saya beli dua onigiri." }
examples:
  - { ja: "コンビニ [[で]] おにぎり を {買|か}います 。", kana: "コンビニ で おにぎり を かいます 。", id: "Saya beli onigiri di konbini." }
  - { ja: "お{茶|ちゃ} を [[{二|ふた}つ]] ください 。", kana: "おちゃ を ふたつ ください 。", id: "Minta tehnya dua." }
  - { ja: "{友|とも}だち は {店|みせ} の [[{外|そと}]] に います 。", kana: "ともだち は みせ の そと に います 。", id: "Temanku ada di luar toko." }
  - { ja: "コンビニ は [[{便利|べん|り}]] です ね 。", kana: "コンビニ は べんり です ね 。", id: "Konbini itu praktis, ya." }
  - { ja: "おにぎり は [[いくら]] です か 。", kana: "おにぎり は いくら です か 。", id: "Onigirinya berapa?" }
  - { ja: "いっしょに {外|そと} で [[{食|た}べませんか]] 。", kana: "いっしょに そと で たべませんか 。", id: "Mau makan di luar bareng?" }
pair:
  off: { ja: "コンビニ に おにぎり を {買|か}います 。", kana: "コンビニ に おにぎり を かいます 。" }
  natural: { ja: "コンビニ [[で]] おにぎり を {買|か}います 。", kana: "コンビニ で おにぎり を かいます 。" }
talk:
  lines:
    - { who: Siti, ja: "すみません 、 おにぎり は どこ です か 。", kana: "すみません 、 おにぎり は どこ です か 。", id: "Permisi, onigirinya di mana?" }
    - { who: Sato, ja: "あそこ です 。", kana: "あそこ です 。", id: "Di sebelah sana." }
    - { who: Siti, ja: "これ は いくら です か 。", kana: "これ は いくら です か 。", id: "Yang ini berapa?" }
    - { who: Sato, ja: "{百五十円|ひゃく|ご|じゅう|えん} です 。", kana: "ひゃくごじゅうえん です 。", id: "Seratus lima puluh yen." }
work:
  situation:
    id: "Kamu kerja paruh waktu di kasir konbini. Seorang pembeli membawa bento."
    en: "You work part-time at a konbini till. A customer brings a boxed lunch."
  lines:
    - { who: Andi, ja: "いらっしゃいませ 。", kana: "いらっしゃいませ 。", id: "Selamat datang." }
    - { who: Yamada, ja: "これ 、 おねがいします 。", kana: "これ 、 おねがいします 。", id: "Ini, ya." }
    - { who: Andi, ja: "{六百円|ろっ|ぴゃく|えん} です 。 お{弁当|べん|とう} は あたためますか 。", kana: "ろっぴゃくえん です 。 おべんとう は あたためますか 。", id: "Enam ratus yen. Bentonya mau dipanaskan?" }
    - { who: Yamada, ja: "はい 、 おねがいします 。", kana: "はい 、 おねがいします 。", id: "Ya, tolong." }
words:
  id: "**いらっしゃいませ** (selamat datang) diucapkan pegawai toko saat kamu masuk. Pembeli tidak perlu menjawabnya: cukup mengangguk atau tersenyum."
  en: "**いらっしゃいませ** (welcome) is what shop staff say as you walk in. Customers don't need to answer it: a nod or a smile is enough."
tirukan: { ja: "コンビニ で おにぎり を {買|か}います 。", kana: "コンビニ で おにぎり を かいます 。", id: "Saya beli onigiri di konbini." }
check:
  - id: e1-16-c1
    type: gap
    cue: "Saya beli onigiri di konbini."
    prompt: "コンビニ ___ おにぎり を {買|か}います 。"
    options: [で, に, を]
    answer: で
    why: { id: "Tempat kamu melakukan sesuatu (membeli) pakai で.", en: "The place where you do something (buy) takes で." }
  - id: e1-16-c2
    type: order
    cue: "Saya makan siang di luar."
    tiles: ["{食|た}べます", を, "{外|そと}", "{昼|ひる}ごはん", で]
    answer: ["{外|そと}", で, "{昼|ひる}ごはん", を, "{食|た}べます"]
    accept:
      - ["{昼|ひる}ごはん", を, "{外|そと}", で, "{食|た}べます"]
    why: { id: "Tempat + で dan benda + を boleh bertukar tempat; kata kerjanya tetap di akhir.", en: "Place + で and object + を can swap; the verb stays at the end." }
  - id: e1-16-c3
    type: listen
    audio: "{百五十円|ひゃく|ご|じゅう|えん} です 。"
    options: ["{百五十円|ひゃく|ご|じゅう|えん}", "{百十五円|ひゃく|じゅう|ご|えん}", "{五百十円|ご|ひゃく|じゅう|えん}"]
    answer: "{百五十円|ひゃく|ご|じゅう|えん}"
    why: { id: "ひゃく ご じゅう: seratus lima puluh, 150 yen.", en: "ひゃく ご じゅう: one hundred fifty, 150 yen." }
  - id: e1-16-c4
    type: fix
    wrong: "{友|とも}だち は {店|みせ} の {外|そと} に あります 。"
    options: ["{友|とも}だち は {店|みせ} の {外|そと} に います 。", "{友|とも}だち は {外|そと} の {店|みせ} に います 。"]
    answer: "{友|とも}だち は {店|みせ} の {外|そと} に います 。"
    why: { id: "Teman itu orang, jadi います. Posisinya sesudah tempat: みせ の そと.", en: "A friend is a person, so います. The position comes after the place: みせ の そと." }
  - id: e1-16-c5
    type: kana
    ja: "店"
    furigana: false
    answer: みせ
    why: { id: "店 sendirian dibaca みせ: toko.", en: "店 on its own is read みせ: shop." }
  - id: e1-16-c6
    type: trace
    char: 買
    guide: on
    why: { id: "買: bagian atas (罒) dulu, lalu 貝 di bawahnya.", en: "買: the top part (罒) first, then 貝 beneath it." }
glossary:
  - { ja: "{店|みせ}", kana: "みせ", id: "toko", en: "shop", type: noun, jlpt: N5 }
  - { ja: "{買|か}う", kana: "かう", id: "membeli", en: "to buy", type: verb-1, jlpt: N5 }
  - { ja: "{外|そと}", kana: "そと", id: "luar", en: "outside", type: noun, jlpt: N5 }
  - { ja: "{夜|よる}", kana: "よる", id: "malam", en: "night, evening", type: noun, jlpt: N5 }
  - { ja: "{友|とも}だち", kana: "ともだち", id: "teman", en: "friend", type: noun, jlpt: N5 }
  - { ja: "お{茶|ちゃ}", kana: "おちゃ", id: "teh (Jepang)", en: "(green) tea", type: noun, jlpt: N5 }
  - { ja: "お{弁当|べん|とう}", kana: "おべんとう", id: "bento, nasi kotak", en: "boxed lunch", type: noun, jlpt: N5 }
  - { ja: "コンビニ", kana: "コンビニ", id: "minimarket (konbini)", en: "convenience store", type: noun }
  - { ja: "おにぎり", kana: "おにぎり", id: "nasi kepal", en: "rice ball", type: noun }
  - { ja: "いらっしゃいませ", kana: "いらっしゃいませ", id: "selamat datang (di toko)", en: "welcome (in a shop)", type: expression }
extra:
  - { ja: "コンビニ", reason: "Toko yang dipakai setiap hari di Jepang; kata serapan dari Kana 2 pelajaran 7, tidak ada di daftar komunitas." }
  - { ja: "おにぎり", reason: "Makanan konbini paling umum; kata dasar di buku N5, tidak ada di daftar komunitas." }
  - { ja: "いらっしゃいませ", reason: "Salam yang didengar di setiap toko; perlu dikenali sejak awal, tidak ada di daftar komunitas." }
next: null
---

## concept.id
Hari ini tidak ada tata bahasa baru: satu hari penuh memakai semua yang sudah kamu pelajari. Waktu sebagai topik (よる は), arah + へ (かいしゃ へ), tempat kegiatan + で (コンビニ で), benda + を, lalu kata kerja di akhir. Di kasir, angka, ～つ dan いくら bekerja bersama.

## concept.en
No new grammar today: one whole day uses everything you've learned. Time as the topic (よる は), direction + へ (かいしゃ へ), place of an activity + で (コンビニ で), object + を, then the verb at the end. At the till, numbers, ～つ and いくら work together.

## contrast.id
Bahasa Indonesia memakai *di* untuk dua hal yang dibedakan bahasa Jepang. *Ada di toko* memakai に (tempat sesuatu berada), tapi *beli di toko* memakai で (tempat kegiatan). Jadi tanyakan: ada kata kerja kegiatan? Kalau ya, で.

## contrast.en
Indonesian uses *di* for two things Japanese keeps apart. *Ada di toko* (is at the shop) takes に (where something is), but *beli di toko* (buy at the shop) takes で (where an activity happens). So ask: is there an action verb? If so, で.
