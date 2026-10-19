---
id: kana1-06-wa-wo-n
rung: kana-1
order: 6
status: draft
minutes: 9
title: { id: "わ, を, ん dan partikel", en: "わ, を, ん and particles", ja: "わ を ん", kana: "わ を ん" }
summary:
  id: "Kamu bisa membaca わ を ん, dan kalimat pendek dengan partikel は (*wa*), を (*o*) dan へ (*e*)."
  en: "You can read わ を ん, and short sentences with the particles は (*wa*), を (*o*) and へ (*e*)."
introduces: [k1-w-n, k1-particles-wa-e]
spiral: particles
kana_new: [わ, を, ん]
visual: { id: kana-chart, props: { highlight: [わ, を, ん] } }
examples:
  - { ja: "[[わ]]たし", kana: "わたし", id: "saya" }
  - { ja: "ほ[[ん]]", kana: "ほん", id: "buku", note: { id: "ん adalah satu ketukan penuh: ほん = ho-n, dua ketukan.", en: "ん is a full beat: ほん = ho-n, two beats." } }
  - { ja: "わたし [[は]] ほん を よみます 。", kana: "わたし は ほん を よみます 。", id: "Saya membaca buku.", note: { id: "Sebagai partikel, は dibaca *wa*.", en: "As a particle, は is read *wa*." } }
  - { ja: "ほん [[を]] かいます 。", kana: "ほん を かいます 。", id: "Saya membeli buku.", note: { id: "を hanya dipakai sebagai partikel, dan dibaca *o*.", en: "を is used only as a particle, and is read *o*." } }
  - { ja: "やま [[へ]] いきます 。", kana: "やま へ いきます 。", id: "Saya pergi ke gunung.", note: { id: "Sebagai partikel, へ dibaca *e*.", en: "As a particle, へ is read *e*." } }
pair:
  off: { ja: "わたし わ ほん を よみます 。", kana: "わたし わ ほん を よみます 。" }
  natural: { ja: "わたし [[は]] ほん を よみます 。", kana: "わたし は ほん を よみます 。" }
sound:
  words: [{ ja: "ほん", kana: "ほん" }, { ja: "てんき", kana: "てんき" }, { ja: "おんな", kana: "おんな" }]
  kind: n
  tip: { id: "ん selalu satu ketukan sendiri. てんき: te-n-ki, tiga ketukan. Jangan ditelan seperti *n* di *tenda*.", en: "ん is always a beat of its own. てんき: te-n-ki, three beats. Don't swallow it like the n in *tenda*." }
talk:
  lines:
    - { who: Rina, ja: "なに を よみます か 。", kana: "なに を よみます か 。", id: "Kamu membaca apa?" }
    - { who: Budi, ja: "ほん を よみます 。", kana: "ほん を よみます 。", id: "Saya membaca buku." }
tirukan: { ja: "わたし は ほん を よみます 。", kana: "わたし は ほん を よみます 。", id: "Saya membaca buku." }
check:
  - id: k1-06-c1
    type: gap
    cue: "Saya membaca buku."
    prompt: "わたし ___ ほん を よみます 。"
    options: [は, わ, を]
    answer: は
    why: { id: "Partikel topik ditulis は, walaupun dibaca *wa*.", en: "The topic particle is written は, though it's said *wa*." }
  - id: k1-06-c2
    type: gap
    cue: "Saya pergi ke gunung."
    prompt: "やま ___ いきます 。"
    options: [へ, え, を]
    answer: へ
    why: { id: "Arah ditulis へ dan dibaca *e*. Partikelnya datang sesudah tempat: やま へ, bukan *ke* gunung.", en: "Direction is written へ and said *e*. It comes after the place: やま へ, the reverse of Indonesian *ke gunung*." }
  - id: k1-06-c3
    type: listen
    audio: "ほん"
    options: [ほん, ほし, はな]
    answer: ほん
    why: { id: "ほん: ho-n, buku.", en: "ほん: ho-n, book." }
  - id: k1-06-c4
    type: kana
    audio: "わたし"
    answer: わたし
    why: { id: "わたし: wa-ta-shi, saya.", en: "わたし: wa-ta-shi, I." }
  - id: k1-06-c5
    type: order
    cue: "Saya membaca buku."
    tiles: [を, わたし, よみます, は, ほん]
    answer: [わたし, は, ほん, を, よみます]
    why: { id: "Kata kerja selalu di belakang: わたし は ほん を よみます.", en: "The verb always goes last: わたし は ほん を よみます." }
  - id: k1-06-c6
    type: trace
    char: を
    guide: on
    why: { id: "を tiga goresan: mendatar, miring dengan lengkung, lalu lengkung besar di bawah.", en: "を takes three strokes: across, a slant with a bend, then a big curve below." }
glossary:
  - { ja: "わたし", kana: "わたし", id: "saya", en: "I", type: pronoun, jlpt: N5 }
  - { ja: "ほん", kana: "ほん", id: "buku", en: "book", type: noun, jlpt: N5 }
  - { ja: "かわ", kana: "かわ", id: "sungai", en: "river", type: noun, jlpt: N5 }
  - { ja: "にわ", kana: "にわ", id: "halaman, kebun", en: "garden", type: noun, jlpt: N5 }
  - { ja: "てんき", kana: "てんき", id: "cuaca", en: "weather", type: noun, jlpt: N5 }
  - { ja: "おんな", kana: "おんな", id: "perempuan", en: "woman", type: noun, jlpt: N5 }
  - { ja: "よむ", kana: "よむ", id: "membaca", en: "to read", type: verb-1, jlpt: N5 }
  - { ja: "かう", kana: "かう", id: "membeli", en: "to buy", type: verb-1, jlpt: N5 }
  - { ja: "いく", kana: "いく", id: "pergi", en: "to go", type: verb-1, jlpt: N5 }
  - { ja: "なに", kana: "なに", id: "apa", en: "what", type: pronoun, jlpt: N5 }
next: kana1-07-dakuten
---

## concept.id
わ を ん melengkapi tabel. ん adalah satu-satunya huruf tanpa vokal, tapi tetap satu ketukan. を sekarang hanya dipakai sebagai partikel dan dibaca *o*. Dua huruf lain juga dibaca berbeda saat menjadi partikel: は dibaca *wa*, へ dibaca *e*.

## concept.en
わ を ん complete the chart. ん is the only letter without a vowel, but it is still a beat. を is used today only as a particle, read *o*. Two other letters are read differently as particles too: は is read *wa*, へ is read *e*.

## contrast.id
Karena は partikel dibaca *wa*, pelajar sering menulisnya わ. Itu salah eja: partikel topik selalu ditulis は. Ingat juga urutannya: bahasa Indonesia meletakkan kata depan sebelum tempat (*ke gunung*), bahasa Jepang meletakkan partikel sesudahnya (やま へ).

## contrast.en
Because the particle は is said *wa*, learners often write it わ. That's a misspelling: the topic particle is always written は. Mind the order too: Indonesian puts the preposition before the place (*ke gunung*), Japanese puts the particle after it (やま へ).
