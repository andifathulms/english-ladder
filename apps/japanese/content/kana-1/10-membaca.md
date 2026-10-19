---
id: kana1-10-membaca
rung: kana-1
order: 10
status: draft
minutes: 9
title: { id: "Membaca tanpa romaji", en: "Reading without romaji", ja: "よんで みましょう", kana: "よんで みましょう" }
summary:
  id: "Kamu bisa membaca kalimat pendek dalam hiragana saja, tanpa romaji."
  en: "You can read short sentences in hiragana alone, with no romaji."
introduces: [k1-reading]
spiral: kana
worked:
  - { ja: "わたし は がくせい です 。", kana: "わたし は がくせい です 。", id: "Saya pelajar." }
  - { ja: "まいにち がっこう へ いきます 。", kana: "まいにち がっこう へ いきます 。", id: "Setiap hari saya pergi ke sekolah." }
  - { ja: "がっこう で にほんご を べんきょう します 。", kana: "がっこう で にほんご を べんきょう します 。", id: "Di sekolah saya belajar bahasa Jepang." }
  - { ja: "ともだち と おちゃ を のみます 。", kana: "ともだち と おちゃ を のみます 。", id: "Saya minum teh dengan teman." }
examples:
  - { ja: "わたし [[は]] がくせい です 。", kana: "わたし は がくせい です 。", id: "Saya pelajar." }
  - { ja: "これ は [[じしょ]] です 。", kana: "これ は じしょ です 。", id: "Ini kamus." }
  - { ja: "ねこ [[が]] すき です 。", kana: "ねこ が すき です 。", id: "Saya suka kucing.", note: { id: "Yang disukai ditandai が, bukan を.", en: "What you like is marked が, not を." } }
  - { ja: "あした [[がっこう]] へ いきます 。", kana: "あした がっこう へ いきます 。", id: "Besok saya pergi ke sekolah." }
  - { ja: "ともだち と おちゃ を [[のみます]] 。", kana: "ともだち と おちゃ を のみます 。", id: "Saya minum teh dengan teman." }
pair:
  off: { ja: "あした がこう へ いきます 。", kana: "あした がこう へ いきます 。" }
  natural: { ja: "あした [[がっこう]] へ いきます 。", kana: "あした がっこう へ いきます 。" }
talk:
  lines:
    - { who: Rina, ja: "げんき です か 。", kana: "げんき です か 。", id: "Apa kabar?" }
    - { who: Budi, ja: "はい 、 げんき です 。", kana: "はい 、 げんき です 。", id: "Ya, baik." }
tirukan: { ja: "ねこ が すき です 。", kana: "ねこ が すき です 。", id: "Saya suka kucing." }
check:
  - id: k1-10-c1
    type: choice
    prompt: "わたし は がくせい です 。"
    options: [Saya pelajar., Saya guru., Saya dokter.]
    answer: Saya pelajar.
    why: { id: "がくせい artinya pelajar. Guru せんせい, dokter いしゃ.", en: "がくせい means student. A teacher is せんせい, a doctor いしゃ." }
  - id: k1-10-c2
    type: listen
    audio: "おちゃ を のみます 。"
    options: [おちゃ を のみます 。, みず を のみます 。, ほん を よみます 。]
    answer: おちゃ を のみます 。
    why: { id: "おちゃ: teh. のみます: minum.", en: "おちゃ: tea. のみます: drink." }
  - id: k1-10-c3
    type: gap
    cue: "Saya suka kucing."
    prompt: "ねこ ___ すき です 。"
    options: [が, を, へ]
    answer: が
    why: { id: "すき memakai が untuk yang disukai.", en: "すき takes が for what you like." }
  - id: k1-10-c4
    type: order
    cue: "Besok saya pergi ke sekolah."
    tiles: [へ, がっこう, いきます, あした]
    answer: [あした, がっこう, へ, いきます]
    why: { id: "Waktu di depan, tempat dengan へ, kata kerja di belakang.", en: "Time first, the place with へ, the verb last." }
  - id: k1-10-c5
    type: kana
    audio: "ともだち"
    answer: ともだち
    why: { id: "ともだち: to-mo-da-chi, teman.", en: "ともだち: to-mo-da-chi, friend." }
  - id: k1-10-c6
    type: trace
    char: ゆ
    guide: on
    why: { id: "ゆ dua goresan: lengkung besar yang berputar, lalu satu garis tegak melengkung di tengah.", en: "ゆ takes two strokes: a big turning curve, then one curved down stroke through the middle." }
glossary:
  - { ja: "がくせい", kana: "がくせい", id: "pelajar", en: "student", type: noun, jlpt: N5 }
  - { ja: "まいにち", kana: "まいにち", id: "setiap hari", en: "every day", type: noun, jlpt: N5 }
  - { ja: "ともだち", kana: "ともだち", id: "teman", en: "friend", type: noun, jlpt: N5 }
  - { ja: "すき", kana: "すき", id: "suka", en: "liked", type: adj-na, jlpt: N5 }
  - { ja: "あした", kana: "あした", id: "besok", en: "tomorrow", type: noun, jlpt: N5 }
  - { ja: "べんきょう", kana: "べんきょう", id: "belajar", en: "study", type: noun, jlpt: N5 }
  - { ja: "げんき", kana: "げんき", id: "sehat, baik", en: "well, healthy", type: adj-na, jlpt: N5 }
  - { ja: "にほんご", kana: "にほんご", id: "bahasa Jepang", en: "Japanese (language)", type: noun }
extra:
  - { ja: "にほんご", reason: "Nama bahasa yang sedang dipelajari; daftar komunitas mencatat 日本語 tanpa level." }
next: null
---

## concept.id
Sekarang kamu membaca tanpa romaji. Baca pelan, satu ketukan demi satu ketukan, lalu baca lagi sebagai kalimat. Kalimat bahasa Jepang biasanya berakhir dengan kata kerja atau です.

## concept.en
Now you read without romaji. Read slowly, one beat at a time, then again as a sentence. A Japanese sentence usually ends with a verb or です.

## contrast.id
Bahasa Indonesia meletakkan kata kerja di tengah: *Saya pergi ke sekolah*. Bahasa Jepang meletakkannya di akhir: がっこう へ いきます. Saat membaca, tunggu akhir kalimat untuk tahu apa yang terjadi. Jangan lupa ketukan っ: がっこう, bukan がこう.

## contrast.en
Indonesian puts the verb in the middle: *Saya pergi ke sekolah*. Japanese puts it at the end: がっこう へ いきます. When you read, wait for the end of the sentence to know what happens. Don't drop the っ beat: がっこう, not がこう.
