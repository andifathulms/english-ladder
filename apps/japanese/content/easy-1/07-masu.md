---
id: easy1-07-masu
rung: easy-1
order: 7
status: draft
minutes: 9
title: { id: "Makan, minum, membaca", en: "Eat, drink, read", ja: "{食|た}べます", kana: "たべます" }
summary:
  id: "Kata kerja sopan berakhir dengan ます, dan selalu di akhir kalimat. Untuk *tidak*, ます jadi ません."
  en: "Polite verbs end in ます and always come last in the sentence. For *not*, ます becomes ません."
introduces: [n5-masu]
spiral: verbs
kanji: [食, 見, 読, 書]
visual:
  id: particle-train
  props:
    cars:
      - { ja: "わたし", particle: "は", id: "saya" }
      - { ja: "パン", particle: "を", id: "roti" }
    verb: { ja: "{食|た}べます", id: "makan" }
    indonesian:
      - { text: "Saya", ref: 0 }
      - { text: "makan", ref: "verb" }
      - { text: "roti", ref: 1 }
examples:
  - { ja: "わたし は パン を [[{食|た}べます]] 。", kana: "わたし は パン を たべます 。", id: "Saya makan roti." }
  - { ja: "リナ さん は テレビ を [[{見|み}ます]] 。", kana: "リナ さん は テレビ を みます 。", id: "Rina menonton TV." }
  - { ja: "ブディ さん は {本|ほん} を [[{読|よ}みます]] 。", kana: "ブディ さん は ほん を よみます 。", id: "Budi membaca buku." }
  - { ja: "わたし は ひらがな を [[{書|か}きます]] 。", kana: "わたし は ひらがな を かきます 。", id: "Saya menulis hiragana." }
  - { ja: "シティ さん は {豚肉|ぶた|にく} を [[{食|た}べません]] 。", kana: "シティ さん は ぶたにく を たべません 。", id: "Siti tidak makan daging babi." }
  - { ja: "わたし は コーヒー を [[{飲|の}みません]] 。", kana: "わたし は コーヒー を のみません 。", id: "Saya tidak minum kopi." }
pair:
  off: { ja: "わたし は {食|た}べます パン を 。", kana: "わたし は たべます パン を 。" }
  natural: { ja: "わたし は パン を [[{食|た}べます]] 。", kana: "わたし は パン を たべます 。" }
sound:
  words:
    - { ja: "{食|た}べます", kana: "たべます" }
    - { ja: "{見|み}ます", kana: "みます" }
    - { ja: "{読|よ}みます", kana: "よみます" }
  kind: mora
  tip:
    id: "Bunyi u di ujung ます hampir tidak terdengar, tapi ます tetap dua ketukan: ま・す."
    en: "The u at the end of ます is barely heard, but ます is still two beats: ま・す."
talk:
  lines:
    - { who: Andi, ja: "{朝|あさ}ごはん を {食|た}べます か 。", kana: "あさごはん を たべます か 。", id: "Kamu biasanya sarapan?" }
    - { who: Rina, ja: "いいえ 、 {食|た}べません 。 コーヒー を {飲|の}みます 。", kana: "いいえ 、 たべません 。 コーヒー を のみます 。", id: "Nggak. Aku minum kopi saja.", note: { id: "Jawaban singkat mengulang kata kerjanya: いいえ、たべません.", en: "A short answer repeats the verb: いいえ、たべません." } }
words:
  id: "**みます** artinya *melihat* dan juga *menonton*: テレビ を みます (menonton TV). Bahasa Jepang tidak membedakan keduanya."
  en: "**みます** means both *see* and *watch*: テレビ を みます (watch TV). Japanese uses one verb for both."
tirukan: { ja: "わたし は パン を {食|た}べます 。", kana: "わたし は パン を たべます 。", id: "Saya makan roti." }
check:
  - id: e1-07-c1
    type: gap
    cue: "Saya tidak membaca buku."
    prompt: "わたし は {本|ほん} を ___ 。"
    options: ["{読|よ}みます", "{読|よ}みません", "{書|か}きません"]
    answer: "{読|よ}みません"
    why: { id: "*Tidak membaca*: ます jadi ません. かきません artinya tidak menulis.", en: "*Not read*: ます becomes ません. かきません means not write." }
  - id: e1-07-c2
    type: order
    cue: "Rina menonton TV."
    tiles: ["{見|み}ます", "テレビ", "リナ さん", "を", "は"]
    answer: ["リナ さん", "は", "テレビ", "を", "{見|み}ます"]
    accept:
      - ["テレビ", "を", "リナ さん", "は", "{見|み}ます"]
    why: { id: "Kata benda dengan partikelnya dulu, kata kerja みます di akhir.", en: "Nouns with their particles first, the verb みます last." }
  - id: e1-07-c3
    type: form
    word: "{飲|の}みます"
    target: masen
    options: ["{飲|の}みません", "{飲|の}みます", "{飲|の}みませんです"]
    answer: "{飲|の}みません"
    why: { id: "Ganti ます dengan ません: のみません. Tidak perlu です di belakangnya.", en: "Swap ます for ません: のみません. No です after it." }
  - id: e1-07-c4
    type: fix
    wrong: "わたし は {食|た}べます パン を 。"
    options: ["わたし は パン を {食|た}べます 。", "パン わたし は を {食|た}べます 。"]
    answer: "わたし は パン を {食|た}べます 。"
    why: { id: "Kata kerja selalu di akhir: パン を たべます.", en: "The verb always goes last: パン を たべます." }
  - id: e1-07-c5
    type: kana
    ja: "{見|み}ます"
    furigana: false
    answer: みます
    why: { id: "見 dibaca み di みます: melihat, menonton.", en: "見 is read み in みます: see, watch." }
  - id: e1-07-c6
    type: trace
    char: 見
    guide: on
    why: { id: "見: 目 di atas (5 goresan), lalu dua kaki di bawah. Total 7 goresan.", en: "見: 目 on top (5 strokes), then two legs below. 7 strokes in all." }
glossary:
  - { ja: "{食|た}べる", kana: "たべる", id: "makan", en: "to eat", type: verb-2, jlpt: N5 }
  - { ja: "{飲|の}む", kana: "のむ", id: "minum", en: "to drink", type: verb-1, jlpt: N5 }
  - { ja: "{見|み}る", kana: "みる", id: "melihat, menonton", en: "to see, to watch", type: verb-2, jlpt: N5 }
  - { ja: "{読|よ}む", kana: "よむ", id: "membaca", en: "to read", type: verb-1, jlpt: N5 }
  - { ja: "{書|か}く", kana: "かく", id: "menulis", en: "to write", type: verb-1, jlpt: N5 }
  - { ja: "パン", kana: "パン", id: "roti", en: "bread", type: noun, jlpt: N5 }
  - { ja: "テレビ", kana: "テレビ", id: "TV", en: "TV", type: noun, jlpt: N5 }
  - { ja: "{本|ほん}", kana: "ほん", id: "buku", en: "book", type: noun, jlpt: N5 }
  - { ja: "{豚肉|ぶた|にく}", kana: "ぶたにく", id: "daging babi", en: "pork", type: noun, jlpt: N5 }
  - { ja: "コーヒー", kana: "コーヒー", id: "kopi", en: "coffee", type: noun, jlpt: N5 }
  - { ja: "ひらがな", kana: "ひらがな", id: "hiragana", en: "hiragana", type: noun, jlpt: N5 }
  - { ja: "{朝|あさ}ごはん", kana: "あさごはん", id: "sarapan", en: "breakfast", type: noun, jlpt: N5 }
  - { ja: "いいえ", kana: "いいえ", id: "tidak, bukan", en: "no", type: expression, jlpt: N5 }
next: easy1-08-iku-kuru
---

## concept.id
Kata kerja sopan berakhir dengan **ます**: たべます (makan), みます (melihat), よみます (membaca). Untuk *tidak*, ganti ます dengan **ません**: たべません. Bentuk ini dipakai untuk kebiasaan, sekarang, atau nanti, tapi tidak untuk masa lalu. Kata kerjanya selalu di **akhir** kalimat, seperti です.

## concept.en
Polite verbs end in **ます**: たべます (eat), みます (see), よみます (read). For *not*, swap ます for **ません**: たべません. This form covers habits, now and later, but not the past. The verb always comes **last** in the sentence, like です.

## contrast.id
Dalam bahasa Indonesia kata kerja ada di tengah: *Saya makan roti*. Dalam bahasa Jepang kata kerja paling akhir: わたし は パン を たべます. Kata *tidak* juga tidak berdiri sendiri di depan: ません menempel di ujung kata kerja.

## contrast.en
In Indonesian the verb sits in the middle: *Saya makan roti*. In Japanese the verb comes last: わたし は パン を たべます. And *not* isn't a separate word in front: ません attaches to the end of the verb.
