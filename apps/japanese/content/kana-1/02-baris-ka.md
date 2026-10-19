---
id: kana1-02-baris-ka
rung: kana-1
order: 2
status: draft
minutes: 7
title: { id: "Baris か", en: "The か row", ja: "かきくけこ", kana: "かきくけこ" }
summary:
  id: "Kamu bisa membaca baris か: か き く け こ, dan kata seperti かお dan えき."
  en: "You can read the か row: か き く け こ, and words like かお and えき."
introduces: [k1-k-row]
spiral: kana
kana_new: [か, き, く, け, こ]
visual: { id: kana-chart, props: { highlight: [か, き, く, け, こ] } }
examples:
  - { ja: "[[か]]お", kana: "かお", id: "wajah" }
  - { ja: "[[こ]]え", kana: "こえ", id: "suara" }
  - { ja: "え[[き]]", kana: "えき", id: "stasiun", note: { id: "えき: dua ketukan, e-ki. Jangan dibaca *ek*.", en: "えき: two beats, e-ki. Not *ek*." } }
  - { ja: "い[[け]]", kana: "いけ", id: "kolam" }
  - { ja: "あ[[か]]", kana: "あか", id: "merah" }
  - { ja: "[[き]]く", kana: "きく", id: "mendengar" }
pair:
  off: { ja: "いえ", kana: "いえ" }
  natural: { ja: "[[こ]]え", kana: "こえ" }
tirukan: { ja: "ここ", kana: "ここ", id: "di sini" }
check:
  - id: k1-02-c1
    type: listen
    audio: "kana-き"
    options: [か, き, こ]
    answer: き
    why: { id: "Kamu mendengar き: k dengan vokal i.", en: "You heard き: k with the vowel i." }
  - id: k1-02-c2
    type: choice
    prompt: "かお"
    options: [wajah, suara, merah]
    answer: wajah
    why: { id: "かお artinya wajah. こえ suara, あか merah.", en: "かお means face. こえ is voice, あか is red." }
  - id: k1-02-c3
    type: kana
    audio: "えき"
    answer: えき
    why: { id: "えき: e lalu ki. Ketik *eki*, dan huruf berubah menjadi えき.", en: "えき: e then ki. Type *eki* and it turns into えき." }
  - id: k1-02-c4
    type: order
    prompt: "Susun kata *suara*."
    tiles: [え, こ]
    answer: [こ, え]
    why: { id: "こえ: こ dulu, lalu え. こ punya dua garis mendatar.", en: "こえ: こ first, then え. こ has two strokes lying flat." }
  - id: k1-02-c5
    type: listen
    audio: "あか"
    options: [あか, あき, いけ]
    answer: あか
    why: { id: "あか: a lalu ka. Artinya merah.", en: "あか: a then ka. It means red." }
  - id: k1-02-c6
    type: trace
    char: か
    guide: on
    why: { id: "か ditulis tiga goresan: lengkung dengan kait, garis tegak, lalu titik kecil di kanan.", en: "か takes three strokes: a hooked curve, a down stroke, then a small mark on the right." }
glossary:
  - { ja: "かお", kana: "かお", id: "wajah", en: "face", type: noun, jlpt: N5 }
  - { ja: "こえ", kana: "こえ", id: "suara", en: "voice", type: noun, jlpt: N5 }
  - { ja: "えき", kana: "えき", id: "stasiun", en: "station", type: noun, jlpt: N5 }
  - { ja: "いけ", kana: "いけ", id: "kolam", en: "pond", type: noun, jlpt: N5 }
  - { ja: "あか", kana: "あか", id: "merah", en: "red", type: noun, jlpt: N5 }
  - { ja: "あき", kana: "あき", id: "musim gugur", en: "autumn", type: noun, jlpt: N5 }
  - { ja: "きく", kana: "きく", id: "mendengar", en: "to listen", type: verb-1, jlpt: N5 }
  - { ja: "ここ", kana: "ここ", id: "di sini", en: "here", type: pronoun, jlpt: N5 }
next: kana1-03-baris-sa-ta
---

## concept.id
Baris か berisi か き く け こ. Setiap huruf adalah bunyi k ditambah satu vokal: か = k + あ, き = k + い. Jadi dengan lima vokal dan satu konsonan kamu sudah bisa membaca sepuluh huruf.

## concept.en
The か row holds か き く け こ. Each letter is a k sound plus one vowel: か = k + あ, き = k + い. With five vowels and one consonant you can already read ten letters.

## contrast.id
Bahasa Indonesia sering menutup suku kata dengan k (*bapak*, *enak*). Bahasa Jepang tidak: setiap k diikuti vokal, jadi えき dibaca e-ki, bukan *ek*. Perhatikan juga bentuknya: こ punya dua garis mendatar, い dua garis tegak. こえ artinya suara, いえ rumah.

## contrast.en
Indonesian often closes a syllable with k (*bapak*, *enak*). Japanese doesn't: every k is followed by a vowel, so えき is e-ki, not *ek*. Watch the shapes too: こ has two strokes lying flat, い two standing up. こえ means voice, いえ house.
