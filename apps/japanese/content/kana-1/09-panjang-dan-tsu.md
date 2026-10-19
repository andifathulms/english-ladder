---
id: kana1-09-panjang-dan-tsu
rung: kana-1
order: 9
status: draft
minutes: 9
title: { id: "Vokal panjang dan っ kecil", en: "Long vowels and the small っ", ja: "おばあさん きって", kana: "おばあさん きって" }
summary:
  id: "Kamu bisa mendengar dan menulis vokal panjang dan っ kecil, dua hal yang mengubah arti kata."
  en: "You can hear and write long vowels and the small っ, two things that change a word's meaning."
introduces: [k1-long-vowels, k1-small-tsu]
spiral: mora
kana_new: [っ]
visual:
  id: mora-beats
  props:
    compare: true
    words:
      - { ja: "おばさん", kana: "おばさん", id: "bibi" }
      - { ja: "おばあさん", kana: "おばあさん", id: "nenek" }
examples:
  - { ja: "おば[[あ]]さん", kana: "おばあさん", id: "nenek", note: { id: "あ kedua memanjangkan ば: o-ba-a-sa-n, lima ketukan.", en: "The second あ lengthens ば: o-ba-a-sa-n, five beats." } }
  - { ja: "おじ[[い]]さん", kana: "おじいさん", id: "kakek" }
  - { ja: "せんせ[[い]]", kana: "せんせい", id: "guru", note: { id: "えい biasanya dibaca e panjang: se-n-se-e.", en: "えい is usually said as a long e: se-n-se-e." } }
  - { ja: "き[[っ]]て", kana: "きって", id: "perangko", note: { id: "っ kecil adalah satu ketukan diam: ki-(diam)-te.", en: "The small っ is one silent beat: ki-(pause)-te." } }
  - { ja: "が[[っ]]こう", kana: "がっこう", id: "sekolah" }
  - { ja: "ちょ[[っ]]と", kana: "ちょっと", id: "sebentar, sedikit" }
pair:
  off: { ja: "きて", kana: "きて" }
  natural: { ja: "き[[っ]]て", kana: "きって" }
sound:
  words: [{ ja: "きて", kana: "きて" }, { ja: "きって", kana: "きって" }]
  kind: small-tsu
  tip: { id: "きて dua ketukan (datanglah), きって tiga ketukan (perangko). Ketukan っ diam, tapi tetap dihitung: tahan sebentar sebelum て.", en: "きて is two beats (come), きって three (stamp). The っ beat is silent but still counts: hold for a moment before て." }
tirukan: { ja: "がっこう へ いきます 。", kana: "がっこう へ いきます 。", id: "Saya pergi ke sekolah." }
check:
  - id: k1-09-c1
    type: mora
    audio: "おばあさん"
    ask: count
    options: ["4", "5", "6"]
    answer: "5"
    why: { id: "お-ば-あ-さ-ん: lima ketukan. おばさん (bibi) empat.", en: "お-ば-あ-さ-ん: five beats. おばさん (aunt) has four." }
  - id: k1-09-c2
    type: mora
    audio: "きって"
    ask: spelling
    options: [きて, きって, きいて]
    answer: きって
    why: { id: "Ada jeda sebelum て, jadi ditulis っ: きって, perangko.", en: "There's a pause before て, written っ: きって, a stamp." }
  - id: k1-09-c3
    type: listen
    audio: "がっこう"
    options: [がっこう, がこう, がっこ]
    answer: がっこう
    why: { id: "がっこう: ga-(diam)-ko-o, empat ketukan.", en: "がっこう: ga-(pause)-ko-o, four beats." }
  - id: k1-09-c4
    type: kana
    audio: "おじいさん"
    answer: おじいさん
    why: { id: "おじいさん: i panjang, ditulis dengan い kedua. Ketik *ojiisan*.", en: "おじいさん: a long i, written with a second い. Type *ojiisan*." }
  - id: k1-09-c5
    type: choice
    prompt: "せんせい"
    options: [guru, murid, dokter]
    answer: guru
    why: { id: "せんせい artinya guru. Dokter いしゃ.", en: "せんせい means teacher. A doctor is いしゃ." }
glossary:
  - { ja: "おばあさん", kana: "おばあさん", id: "nenek", en: "grandmother", type: noun, jlpt: N5 }
  - { ja: "おばさん", kana: "おばさん", id: "bibi, tante", en: "aunt", type: noun, jlpt: N5 }
  - { ja: "おじいさん", kana: "おじいさん", id: "kakek", en: "grandfather", type: noun, jlpt: N5 }
  - { ja: "おじさん", kana: "おじさん", id: "paman, om", en: "uncle", type: noun, jlpt: N5 }
  - { ja: "せんせい", kana: "せんせい", id: "guru", en: "teacher", type: noun, jlpt: N5 }
  - { ja: "きって", kana: "きって", id: "perangko", en: "stamp", type: noun, jlpt: N5 }
  - { ja: "がっこう", kana: "がっこう", id: "sekolah", en: "school", type: noun, jlpt: N5 }
  - { ja: "ちょっと", kana: "ちょっと", id: "sebentar, sedikit", en: "a little", type: adverb, jlpt: N5 }
  - { ja: "ざっし", kana: "ざっし", id: "majalah", en: "magazine", type: noun, jlpt: N5 }
  - { ja: "きっぷ", kana: "きっぷ", id: "tiket", en: "ticket", type: noun, jlpt: N5 }
next: kana1-10-membaca
---

## concept.id
Dalam hiragana, vokal panjang ditulis dengan menambah huruf vokal: おばあさん, おじいさん. え panjang biasanya ditulis えい (せんせい), o panjang biasanya おう (がっこう). っ kecil adalah satu ketukan diam sebelum konsonan berikutnya: きって. Mulai pelajaran ini, tidak ada romaji lagi.

## concept.en
In hiragana, a long vowel is written by adding a vowel letter: おばあさん, おじいさん. A long e is usually written えい (せんせい), a long o usually おう (がっこう). The small っ is one silent beat before the next consonant: きって. From this lesson on, there is no romaji.

## contrast.id
Di bahasa Indonesia, *bisa* dan *bisaa* adalah kata yang sama diucapkan pelan. Di bahasa Jepang, panjang adalah bagian dari kata: おばさん (bibi) dan おばあさん (nenek) berbeda, begitu juga きて (datanglah) dan きって (perangko). Hitung ketukannya dengan jari.

## contrast.en
In Indonesian, *bisa* said slowly as *bisaa* is the same word. In Japanese, length is part of the word: おばさん (aunt) and おばあさん (grandmother) differ, and so do きて (come) and きって (stamp). Count the beats on your fingers.
