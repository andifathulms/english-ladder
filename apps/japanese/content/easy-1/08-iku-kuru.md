---
id: easy1-08-iku-kuru
rung: easy-1
order: 8
status: draft
minutes: 9
title: { id: "Pergi, datang, pulang", en: "Go, come, go home", ja: "どこ へ {行|い}きます か", kana: "どこ へ いきます か" }
summary:
  id: "Tempat + へ (atau に) + いきます, きます, かえります: pergi, datang, dan pulang. Partikelnya sesudah tempat."
  en: "Place + へ (or に) + いきます, きます, かえります: go, come and go home. The particle follows the place."
introduces: [n5-e-ni-motion]
spiral: particles
kanji: [行, 来, 毎]
worked:
  - { ja: "わたし は {毎朝|まい|あさ} {駅|えき} [[へ]] {行|い}きます 。", kana: "わたし は まいあさ えき へ いきます 。", id: "Tiap pagi saya pergi ke stasiun." }
  - { ja: "わたし は {毎朝|まい|あさ} {駅|えき} [[に]] {行|い}きます 。", kana: "わたし は まいあさ えき に いきます 。", id: "Tiap pagi saya pergi ke stasiun.", note: { id: "へ atau に: dengan いきます, dua-duanya benar.", en: "へ or に: with いきます, both are right." } }
  - { ja: "{田中|た|なか} さん は うち へ [[{帰|かえ}ります]] 。", kana: "たなか さん は うち へ かえります 。", id: "Pak Tanaka pulang ke rumah." }
examples:
  - { ja: "わたし は {毎日|まい|にち} {会社|かい|しゃ} [[へ]] {行|い}きます 。", kana: "わたし は まいにち かいしゃ へ いきます 。", id: "Saya pergi ke kantor setiap hari." }
  - { ja: "リナ さん は {明日|=あした} {病院|びょう|いん} [[に]] {行|い}きます 。", kana: "リナ さん は あした びょういん に いきます 。", id: "Besok Rina pergi ke rumah sakit." }
  - { ja: "ブディ さん は {来年|らい|ねん} {日本|に|ほん} [[へ]] {来|き}ます 。", kana: "ブディ さん は らいねん にほん へ きます 。", id: "Tahun depan Budi datang ke Jepang." }
  - { ja: "デウィ さん は {来月|らい|げつ} インドネシア [[へ]] {帰|かえ}ります 。", kana: "デウィ さん は らいげつ インドネシア へ かえります 。", id: "Bulan depan Dewi pulang ke Indonesia." }
  - { ja: "{明日|=あした} どこ [[へ]] {行|い}きます か 。", kana: "あした どこ へ いきます か 。", id: "Besok kamu pergi ke mana?" }
  - { ja: "{田中|た|なか} さん は {明日|=あした} {会社|かい|しゃ} [[に]] {来|き}ません 。", kana: "たなか さん は あした かいしゃ に きません 。", id: "Besok Pak Tanaka tidak datang ke kantor." }
pair:
  off: { ja: "わたし は へ {駅|えき} {行|い}きます 。", kana: "わたし は へ えき いきます 。" }
  natural: { ja: "わたし は {駅|えき} [[へ]] {行|い}きます 。", kana: "わたし は えき へ いきます 。" }
sound:
  words:
    - { ja: "{駅|えき} へ", kana: "えき へ" }
    - { ja: "うち へ", kana: "うち へ" }
  kind: kana
  tip:
    id: "Sebagai partikel, へ dibaca え: えき へ terdengar seperti えき え."
    en: "As a particle, へ is said え: えき へ sounds like えき え."
work:
  situation:
    id: "Di pabrik: atasanmu bertanya soal besok."
    en: "At the factory: your supervisor asks about tomorrow."
  lines:
    - { who: Tanaka, ja: "アンディ さん 、 {明日|=あした} {工場|こう|じょう} に {来|き}ます か 。", kana: "アンディ さん 、 あした こうじょう に きます か 。", id: "Andi, besok kamu datang ke pabrik?" }
    - { who: Andi, ja: "すみません 。 {明日|=あした} は {病院|びょう|いん} へ {行|い}きます 。", kana: "すみません 。 あした は びょういん へ いきます 。", id: "Maaf, besok saya ke rumah sakit.", note: { id: "Kalau tidak masuk kerja, mulai dengan すみません.", en: "When you'll miss work, start with すみません." } }
    - { who: Tanaka, ja: "そう です か 。", kana: "そう です か 。", id: "Oh, begitu." }
words:
  id: "**かえります** = *pulang*: ke rumah, ke asrama, ke Indonesia, ke tempatmu sendiri. Ke tempat lain pakai いきます."
  en: "**かえります** = *go home*: to your house, your dorm, Indonesia, your own place. Anywhere else takes いきます."
tirukan: { ja: "{明日|=あした} どこ へ {行|い}きます か 。", kana: "あした どこ へ いきます か 。", id: "Besok kamu pergi ke mana?" }
check:
  - id: e1-08-c1
    type: gap
    cue: "Saya pergi ke stasiun."
    prompt: "わたし は {駅|えき} ___ {行|い}きます 。"
    options: [へ, は, の]
    answer: へ
    why: { id: "へ menunjuk arah dan datang sesudah tempatnya: えき へ.", en: "へ marks the direction and comes after the place: えき へ." }
  - id: e1-08-c2
    type: choice
    prompt: "Bulan depan Dewi pulang ke Indonesia."
    options:
      - "デウィ さん は {来月|らい|げつ} インドネシア へ {帰|かえ}ります 。"
      - "デウィ さん は {来月|らい|げつ} インドネシア へ {来|き}ます 。"
      - "デウィ さん は {来月|らい|げつ} へ インドネシア {帰|かえ}ります 。"
    answer: "デウィ さん は {来月|らい|げつ} インドネシア へ {帰|かえ}ります 。"
    why: { id: "Pulang ke negaranya: かえります. へ sesudah tempat, bukan sesudah waktu.", en: "Going back to her country: かえります. へ follows the place, not the time." }
  - id: e1-08-c3
    type: form
    word: "{来|き}ます"
    target: masen
    options: ["{来|き}ません", "{来|こ}ません", "{来|く}ません"]
    answer: "{来|き}ません"
    why: { id: "きます jadi きません. 来 tetap dibaca き di sini.", en: "きます becomes きません. 来 stays き here." }
  - id: e1-08-c4
    type: listen
    audio: "{明日|=あした} {会社|かい|しゃ} へ {行|い}きます 。"
    options:
      - "{明日|=あした} {会社|かい|しゃ} へ {行|い}きます 。"
      - "{明日|=あした} {会社|かい|しゃ} へ {来|き}ます 。"
      - "{明日|=あした} {会社|かい|しゃ} へ {行|い}きません 。"
    answer: "{明日|=あした} {会社|かい|しゃ} へ {行|い}きます 。"
    why: { id: "いきます: pergi. きます: datang. いきません: tidak pergi.", en: "いきます: go. きます: come. いきません: not go." }
  - id: e1-08-c5
    type: kana
    ja: "{毎日|まい|にち}"
    furigana: false
    answer: まいにち
    why: { id: "毎日 (まいにち): setiap hari. 毎 = setiap.", en: "毎日 (まいにち): every day. 毎 = every." }
  - id: e1-08-c6
    type: trace
    char: 毎
    guide: on
    why: { id: "毎: 6 goresan, mulai dari ノ di kiri atas.", en: "毎: 6 strokes, starting with ノ at the top left." }
glossary:
  - { ja: "{行|い}く", kana: "いく", id: "pergi", en: "to go", type: verb-1, jlpt: N5 }
  - { ja: "{来|く}る", kana: "くる", id: "datang", en: "to come", type: verb-3, jlpt: N5 }
  - { ja: "{帰|かえ}る", kana: "かえる", id: "pulang", en: "to go home, to return", type: verb-1, jlpt: N5 }
  - { ja: "{毎日|まい|にち}", kana: "まいにち", id: "setiap hari", en: "every day", type: noun, jlpt: N5 }
  - { ja: "{毎朝|まい|あさ}", kana: "まいあさ", id: "setiap pagi", en: "every morning", type: noun, jlpt: N5 }
  - { ja: "{明日|=あした}", kana: "あした", id: "besok", en: "tomorrow", type: noun, jlpt: N5 }
  - { ja: "{来年|らい|ねん}", kana: "らいねん", id: "tahun depan", en: "next year", type: noun, jlpt: N5 }
  - { ja: "{来月|らい|げつ}", kana: "らいげつ", id: "bulan depan", en: "next month", type: noun, jlpt: N5 }
  - { ja: "{会社|かい|しゃ}", kana: "かいしゃ", id: "perusahaan, kantor", en: "company, office", type: noun, jlpt: N5 }
  - { ja: "{駅|えき}", kana: "えき", id: "stasiun", en: "station", type: noun, jlpt: N5 }
  - { ja: "{病院|びょう|いん}", kana: "びょういん", id: "rumah sakit", en: "hospital", type: noun, jlpt: N5 }
  - { ja: "うち", kana: "うち", id: "rumah", en: "home", type: noun, jlpt: N5 }
  - { ja: "どこ", kana: "どこ", id: "di mana, ke mana", en: "where", type: pronoun, jlpt: N5 }
  - { ja: "{工場|こう|じょう}", kana: "こうじょう", id: "pabrik", en: "factory", type: noun, jlpt: N4 }
  - { ja: "すみません", kana: "すみません", id: "maaf, permisi", en: "sorry, excuse me", type: expression }
extra:
  - { ja: "{工場|こう|じょう}", reason: "Banyak pekerja Indonesia di Jepang bekerja di pabrik; kata ini dipakai di kartu Kerja. Daftar N5 tidak memuatnya (N4)." }
  - { ja: "すみません", reason: "Ungkapan sopan sehari-hari yang dipakai sejak minggu pertama; daftar komunitas menaruhnya di N3." }
next: easy1-09-wo-de
---

## concept.id
Untuk arah, pakai **tempat + へ** (dibaca え) atau **tempat + に**, lalu kata kerja gerak: いきます (pergi), きます (datang), かえります (pulang). へ menunjuk arah, に menunjuk titik tujuan; dengan tiga kata kerja ini dua-duanya benar. Kata kerjanya tetap di akhir.

## concept.en
For direction, use **place + へ** (said え) or **place + に**, then a verb of motion: いきます (go), きます (come), かえります (go home). へ points the direction, に the destination; with these three verbs both are right. The verb still comes last.

## contrast.id
Dalam bahasa Indonesia *ke* datang sebelum tempat: *ke stasiun*. Dalam bahasa Jepang へ datang sesudah tempat: えき へ. Hati-hati dengan *datang*: きます berarti datang ke tempat pembicara, jadi ke rumah teman kamu bilang いきます, walaupun dalam bahasa Indonesia kita bisa bilang *datang ke rumahmu*.

## contrast.en
In Indonesian *ke* comes before the place: *ke stasiun*. In Japanese へ comes after it: えき へ. Careful with *come*: きます means coming to where the speaker is, so going to a friend's house is いきます, even though Indonesian can say *datang ke rumahmu*.
