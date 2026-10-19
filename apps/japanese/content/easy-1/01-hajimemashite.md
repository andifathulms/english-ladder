---
id: easy1-01-hajimemashite
rung: easy-1
order: 1
status: draft
minutes: 9
title: { id: "Salam kenal", en: "Nice to meet you", ja: "はじめまして", kana: "はじめまして" }
summary:
  id: "X は Y です: cara menyebut siapa kamu, dari mana, dan apa pekerjaanmu. Kata kerjanya (です) di akhir."
  en: "X は Y です: saying who you are, where you're from and what you do. The verb (です) comes last."
introduces: [n5-wa-desu]
spiral: word-order
kanji: [人, 日, 本, 学, 生, 先]
worked:
  - { ja: "わたし は アンディ です 。", kana: "わたし は アンディ です 。", id: "Saya Andi." }
  - { ja: "わたし は [[{学生|がく|せい}]] です 。", kana: "わたし は がくせい です 。", id: "Saya pelajar." }
examples:
  - { ja: "わたし は [[{学生|がく|せい}]] です 。", kana: "わたし は がくせい です 。", id: "Saya pelajar." }
  - { ja: "リナ さん は インドネシア[[{人|じん}]] です 。", kana: "リナ さん は インドネシアじん です 。", id: "Rina orang Indonesia." }
  - { ja: "{田中|た|なか} さん は [[{日本人|に|ほん|じん}]] です 。", kana: "たなか さん は にほんじん です 。", id: "Pak Tanaka orang Jepang." }
  - { ja: "{田中|た|なか} さん は [[{先生|せん|せい}]] です 。", kana: "たなか さん は せんせい です 。", id: "Pak Tanaka guru." }
  - { ja: "ブディ さん は [[{会社員|かい|しゃ|いん}]] です 。", kana: "ブディ さん は かいしゃいん です 。", id: "Budi karyawan perusahaan." }
pair:
  off: { ja: "{学生|がく|せい} です わたし は 。", kana: "がくせい です わたし は 。" }
  natural: { ja: "わたし は [[{学生|がく|せい}]] です 。", kana: "わたし は がくせい です 。" }
sound:
  words:
    - { ja: "{学生|がく|せい}", kana: "がくせい" }
    - { ja: "{先生|せん|せい}", kana: "せんせい" }
  kind: long-vowel
  tip:
    id: "せい di がくせい dan せんせい dibaca seperti せー, e panjang: dua ketukan."
    en: "The せい in がくせい and せんせい sounds like せー, a long e: two beats."
talk:
  lines:
    - { who: Rina, ja: "はじめまして 。 リナ です 。", kana: "はじめまして 。 リナ です 。", id: "Salam kenal. Saya Rina." }
    - { who: "Tanaka", ja: "はじめまして 。 {田中|た|なか} です 。 よろしく おねがいします 。", kana: "はじめまして 。 たなか です 。 よろしく おねがいします 。", id: "Salam kenal. Saya Tanaka. Senang berkenalan." }
words:
  id: "**さん** dipakai untuk nama orang lain, tidak pernah untuk nama sendiri: リナさん untuk teman, tapi リナ です untuk dirimu."
  en: "**さん** goes after other people's names, never your own: リナさん for a friend, but リナ です for yourself."
tirukan: { ja: "はじめまして 。 わたし は アンディ です 。", kana: "はじめまして 。 わたし は アンディ です 。", id: "Salam kenal. Saya Andi." }
check:
  - id: e1-01-c1
    type: gap
    prompt: "わたし ___ {学生|がく|せい} です 。"
    options: [は, です, さん]
    answer: は
    why: { id: "は menandai topik: わたし. です di akhir.", en: "は marks the topic: わたし. です goes at the end." }
  - id: e1-01-c2
    type: order
    cue: "Saya pelajar."
    tiles: [です, わたし, "{学生|がく|せい}", は]
    answer: [わたし, は, "{学生|がく|せい}", です]
    why: { id: "Topik は dulu, lalu kata bendanya, lalu です di akhir.", en: "Topic は first, then the noun, then です at the end." }
  - id: e1-01-c3
    type: choice
    prompt: "{先生|せん|せい}"
    options: [guru, pelajar, karyawan perusahaan]
    answer: guru
    why: { id: "{先生|せん|せい} (せんせい) artinya guru, juga dokter.", en: "{先生|せん|せい} (せんせい) means teacher, also doctor." }
  - id: e1-01-c4
    type: listen
    audio: "はじめまして 。"
    options: [はじめまして, よろしく おねがいします, わたし は リナ です]
    answer: はじめまして
    why: { id: "はじめまして: salam pertama kali bertemu.", en: "はじめまして: the greeting on first meeting." }
  - id: e1-01-c5
    type: fix
    wrong: "{学生|がく|せい} です わたし は 。"
    options: ["わたし は {学生|がく|せい} です 。", "わたし {学生|がく|せい} は です 。"]
    answer: "わたし は {学生|がく|せい} です 。"
    why: { id: "です selalu di akhir kalimat.", en: "です always goes at the end of the sentence." }
glossary:
  - { ja: "わたし", kana: "わたし", id: "saya", en: "I", type: pronoun, jlpt: N5 }
  - { ja: "{学生|がく|せい}", kana: "がくせい", id: "pelajar, mahasiswa", en: "student", type: noun, jlpt: N5 }
  - { ja: "{先生|せん|せい}", kana: "せんせい", id: "guru", en: "teacher", type: noun, jlpt: N5 }
  - { ja: "{会社員|かい|しゃ|いん}", kana: "かいしゃいん", id: "karyawan perusahaan", en: "company employee", type: noun, jlpt: N5 }
  - { ja: "{日本人|に|ほん|じん}", kana: "にほんじん", id: "orang Jepang", en: "Japanese person", type: noun }
  - { ja: "{人|ひと}", kana: "ひと", id: "orang", en: "person", type: noun, jlpt: N5 }
  - { ja: "さん", kana: "さん", id: "Pak, Bu, Kak (setelah nama)", en: "Mr, Ms (after a name)", type: other, jlpt: N5 }
  - { ja: "です", kana: "です", id: "adalah (sopan)", en: "is (polite)", type: other, jlpt: N5 }
  - { ja: "はじめまして", kana: "はじめまして", id: "salam kenal", en: "nice to meet you", type: expression, jlpt: N5 }
  - { ja: "よろしく おねがいします", kana: "よろしく おねがいします", id: "senang berkenalan, mohon bantuannya", en: "pleased to meet you", type: expression, jlpt: N5 }
extra:
  - { ja: "{日本人|に|ほん|じん}", reason: "Nationality words are built from 日本 + 人; N5 lists carry 日本 and 人 separately." }
  - { ja: "{会社員|かい|しゃ|いん}", reason: "Introductions name a job (Minna no Nihongo lesson 1); the community list omits it." }
  - { ja: "です", reason: "The polite copula is grammar (n5-wa-desu), not a list word." }
  - { ja: "はじめまして", reason: "Set greeting taught in every first lesson; the community list places it at N2." }
  - { ja: "よろしく おねがいします", reason: "Set greeting taught in every first lesson; the community list places its parts at N3/N2." }
next: easy1-02-ka-no
---

## concept.id
Untuk berkata *X adalah Y*, bahasa Jepang memakai **X は Y です**. は (partikel, dibaca seperti わ) menandai siapa yang dibicarakan, dan です datang di **akhir**. わたし は がくせい です: saya pelajar.

## concept.en
To say *X is Y*, Japanese uses **X は Y です**. は (a particle, said like わ) marks who you're talking about, and です comes at the **end**. わたし は がくせい です: I'm a student.

## contrast.id
Bahasa Indonesia tidak butuh kata *adalah* di *Saya pelajar*. Bahasa Jepang butuh です, dan tempatnya selalu di akhir kalimat.

## contrast.en
Indonesian needs no *is* in *Saya pelajar*. Japanese needs です, and it always goes at the end of the sentence.
