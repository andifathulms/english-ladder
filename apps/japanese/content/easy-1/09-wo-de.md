---
id: easy1-09-wo-de
rung: easy-1
order: 9
status: draft
minutes: 9
title: { id: "Makan di mana?", en: "Where do you eat?", ja: "どこ で {食|た}べます か", kana: "どこ で たべます か" }
summary:
  id: "を menandai apa yang dikenai kata kerja, で menandai tempat kegiatannya. Kata kerja tetap di akhir."
  en: "を marks what the verb acts on, で marks where the action happens. The verb still comes last."
introduces: [n5-wo-de]
spiral: particles
kanji: [水, 友, 語]
visual:
  id: particle-train
  props:
    cars:
      - { ja: "{友|とも}だち", particle: "は", id: "temanku" }
      - { ja: "{食堂|しょく|どう}", particle: "で", id: "kantin" }
      - { ja: "カレー", particle: "を", id: "kari" }
    verb: { ja: "{食|た}べます", id: "makan" }
    indonesian:
      - { text: "Temanku", ref: 0 }
      - { text: "makan", ref: "verb" }
      - { text: "kari", ref: 2 }
      - { text: "di kantin", ref: 1 }
examples:
  - { ja: "わたし は {水|みず} [[を]] {飲|の}みます 。", kana: "わたし は みず を のみます 。", id: "Saya minum air." }
  - { ja: "{友|とも}だち は {食堂|しょく|どう} [[で]] カレー を {食|た}べます 。", kana: "ともだち は しょくどう で カレー を たべます 。", id: "Temanku makan kari di kantin." }
  - { ja: "リナ さん は {図書館|と|しょ|かん} [[で]] {日本語|に|ほん|ご} を {勉強|べん|きょう}します 。", kana: "リナ さん は としょかん で にほんご を べんきょうします 。", id: "Rina belajar bahasa Jepang di perpustakaan." }
  - { ja: "ブディ さん は {駅|えき} [[で]] {友|とも}だち を {待|ま}ちます 。", kana: "ブディ さん は えき で ともだち を まちます 。", id: "Budi menunggu temannya di stasiun." }
  - { ja: "{何|なに} [[を]] {食|た}べます か 。", kana: "なに を たべます か 。", id: "Mau makan apa?" }
  - { ja: "どこ [[で]] {日本語|に|ほん|ご} を {勉強|べん|きょう}します か 。", kana: "どこ で にほんご を べんきょうします か 。", id: "Kamu belajar bahasa Jepang di mana?" }
pair:
  off: { ja: "{食堂|しょく|どう} を {食|た}べます 。", kana: "しょくどう を たべます 。" }
  natural: { ja: "{食堂|しょく|どう} [[で]] {食|た}べます 。", kana: "しょくどう で たべます 。" }
sound:
  words:
    - { ja: "{日本語|に|ほん|ご}", kana: "にほんご" }
    - { ja: "{勉強|べん|きょう}", kana: "べんきょう" }
  kind: n
  tip:
    id: "ん adalah satu ketukan penuh: に・ほ・ん・ご, empat ketukan. Di depan ご, ん terdengar seperti *ng*."
    en: "ん is a full beat: に・ほ・ん・ご, four beats. Before ご, ん sounds like *ng*."
talk:
  lines:
    - { who: Rina, ja: "{昼|ひる}ごはん は どこ で {食|た}べます か 。", kana: "ひるごはん は どこ で たべます か 。", id: "Kamu makan siang di mana?" }
    - { who: Andi, ja: "{会社|かい|しゃ} の {食堂|しょく|どう} で {食|た}べます 。", kana: "かいしゃ の しょくどう で たべます 。", id: "Di kantin kantor." }
    - { who: Rina, ja: "{何|なに} を {食|た}べます か 。", kana: "なに を たべます か 。", id: "Makan apa?" }
    - { who: Andi, ja: "{毎日|まい|にち} カレー です 。", kana: "まいにち カレー です 。", id: "Tiap hari kari." }
words:
  id: "**みず** itu air dingin atau air biasa. Air panas punya kata sendiri: おゆ."
  en: "**みず** is cold or room-temperature water. Hot water has its own word: おゆ."
tirukan: { ja: "{食堂|しょく|どう} で カレー を {食|た}べます 。", kana: "しょくどう で カレー を たべます 。", id: "Saya makan kari di kantin." }
check:
  - id: e1-09-c1
    type: gap
    cue: "Saya membaca buku di perpustakaan."
    prompt: "{図書館|と|しょ|かん} ___ {本|ほん} を {読|よ}みます 。"
    options: [で, を, へ]
    answer: で
    why: { id: "Tempat kegiatan (membaca di perpustakaan) memakai で.", en: "The place where something happens (reading at the library) takes で." }
  - id: e1-09-c2
    type: gap
    cue: "Saya minum air."
    prompt: "{水|みず} ___ {飲|の}みます 。"
    options: [を, へ, の]
    answer: を
    why: { id: "Yang diminum, みず, ditandai を.", en: "What you drink, みず, is marked with を." }
  - id: e1-09-c3
    type: order
    cue: "Saya belajar bahasa Jepang di kamar."
    tiles: ["{勉強|べん|きょう}します", "を", "{部屋|へ|や}", "わたし", "で", "{日本語|に|ほん|ご}", "は"]
    answer: ["わたし", "は", "{部屋|へ|や}", "で", "{日本語|に|ほん|ご}", "を", "{勉強|べん|きょう}します"]
    accept:
      - ["わたし", "は", "{日本語|に|ほん|ご}", "を", "{部屋|へ|や}", "で", "{勉強|べん|きょう}します"]
    why: { id: "へや で (tempat), にほんご を (objek), lalu kata kerja di akhir.", en: "へや で (place), にほんご を (object), then the verb last." }
  - id: e1-09-c4
    type: fix
    wrong: "コンビニ を {水|みず} で {買|か}います 。"
    options: ["コンビニ で {水|みず} を {買|か}います 。", "コンビニ へ {水|みず} を {買|か}います 。"]
    answer: "コンビニ で {水|みず} を {買|か}います 。"
    why: { id: "Tempat membeli: コンビニ で. Barang yang dibeli: みず を.", en: "Where you buy: コンビニ で. What you buy: みず を." }
  - id: e1-09-c5
    type: kana
    ja: "{日本語|に|ほん|ご}"
    furigana: false
    answer: にほんご
    why: { id: "日本 (にほん) + 語 (ご, bahasa) = にほんご: bahasa Jepang.", en: "日本 (にほん) + 語 (ご, language) = にほんご: Japanese." }
  - id: e1-09-c6
    type: trace
    char: 語
    guide: on
    why: { id: "語: 14 goresan. 言 di kiri (7 goresan), lalu 吾 di kanan (7 goresan).", en: "語: 14 strokes. 言 on the left (7 strokes), then 吾 on the right (7 strokes)." }
glossary:
  - { ja: "{水|みず}", kana: "みず", id: "air", en: "water", type: noun, jlpt: N5 }
  - { ja: "{友|とも}だち", kana: "ともだち", id: "teman", en: "friend", type: noun, jlpt: N5 }
  - { ja: "{日本語|に|ほん|ご}", kana: "にほんご", id: "bahasa Jepang", en: "Japanese (language)", type: noun }
  - { ja: "{食堂|しょく|どう}", kana: "しょくどう", id: "kantin, ruang makan", en: "cafeteria, dining hall", type: noun, jlpt: N5 }
  - { ja: "{図書館|と|しょ|かん}", kana: "としょかん", id: "perpustakaan", en: "library", type: noun, jlpt: N5 }
  - { ja: "{部屋|へ|や}", kana: "へや", id: "kamar", en: "room", type: noun, jlpt: N5 }
  - { ja: "{勉強|べん|きょう}", kana: "べんきょう", id: "belajar (dengan します)", en: "study (with します)", type: noun, jlpt: N5 }
  - { ja: "{待|ま}つ", kana: "まつ", id: "menunggu", en: "to wait", type: verb-1, jlpt: N5 }
  - { ja: "{買|か}う", kana: "かう", id: "membeli", en: "to buy", type: verb-1, jlpt: N5 }
  - { ja: "{何|なに}", kana: "なに", id: "apa", en: "what", type: pronoun, jlpt: N5 }
  - { ja: "カレー", kana: "カレー", id: "kari, nasi kari", en: "curry", type: noun, jlpt: N5 }
  - { ja: "{昼|ひる}ごはん", kana: "ひるごはん", id: "makan siang", en: "lunch", type: noun, jlpt: N5 }
  - { ja: "コンビニ", kana: "コンビニ", id: "minimarket", en: "convenience store", type: noun }
extra:
  - { ja: "{日本語|に|ほん|ご}", reason: "日本 + 語 (bahasa); daftar N5 memuat 日本 dan 語 secara terpisah. Kata paling dasar bagi pelajar." }
  - { ja: "コンビニ", reason: "Toko yang dipakai setiap hari di Jepang; daftar komunitas tidak memuat singkatan ini." }
next: easy1-10-mashita
---

## concept.id
**を** (dibaca お) menandai benda yang dikenai kata kerja: みず を のみます, minum air. **で** menandai tempat kegiatan terjadi: しょくどう で たべます, makan di kantin. Keduanya menempel sesudah kata bendanya, dan kata kerja tetap di akhir. Untuk bertanya, ganti kata bendanya: なに を? どこ で?

## concept.en
**を** (said お) marks the thing the verb acts on: みず を のみます, drink water. **で** marks where the action happens: しょくどう で たべます, eat at the cafeteria. Both follow their noun, and the verb still comes last. To ask, swap in a question word: なに を? どこ で?

## contrast.id
Bahasa Indonesia menunjukkan objek lewat urutan kata (*makan kari*) dan tempat lewat *di*. Bahasa Jepang menandai keduanya dengan partikel: を untuk objek, で untuk tempat kegiatan. Hati-hati: *di* untuk tempat benda berada (*bukunya di meja*) bukan で, tapi に; itu datang di pelajaran 13.

## contrast.en
Indonesian shows the object by word order (*makan kari*) and the place with *di*. Japanese marks both with particles: を for the object, で for where the action happens. Careful: *di* for where a thing is (*the book is on the table*) isn't で but に; that comes in lesson 13.
