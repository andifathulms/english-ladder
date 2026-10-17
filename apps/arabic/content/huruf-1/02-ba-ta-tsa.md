---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-02-ba-ta-tsa
rung: huruf-1
order: 2
status: draft
minutes: 7
title: { id: "Ba, ta, tsa", en: "Ba, ta, tha", ar: "بَ تَ ثَ" }
summary:
  id: "Kamu membaca ب ت ث dengan fathah, kasrah dan dhammah, lalu suku kata pertamamu."
  en: "You read ب ت ث with fathah, kasrah and dhammah, then your first syllable strings."
introduces: [letters-ba-family]
spiral: script
visual: { id: letter-forms, props: { letter: "ب" } }
examples:
  - ar: "بَ بِ بُ"
    tr: "ba bi bu"
    id: "latihan suku kata: ba, bi, bu"
    en: "syllable drill: ba, bi, bu"
    note: { id: "Huruf yang sama, tiga vokal: di atas *a*, di bawah *i*, wau kecil *u*.", en: "The same letter, three vowels: above *a*, below *i*, small waw *u*." }
  - ar: "تَ تِ تُ"
    tr: "ta ti tu"
    id: "latihan suku kata: ta, ti, tu"
    en: "syllable drill: ta, ti, tu"
  - ar: "ثَ ثِ ثُ"
    tr: "tsa tsi tsu"
    id: "latihan suku kata: tsa, tsi, tsu"
    en: "syllable drill: tha, thi, thu"
    note: { id: "Ujung lidah keluar sedikit di antara gigi, seperti *th* di kata Inggris *think*.", en: "The tip of the tongue comes out a little between the teeth, like *th* in *think*." }
  - ar: "بَتَ تَبَ"
    tr: "bata taba"
    id: "latihan suku kata: titik di bawah, lalu titik di atas"
    en: "syllable drill: dot below, then dots above"
  - ar: "ثَبَتَ"
    tr: "tsabata"
    id: "tetap, teguh"
    en: "stood firm"
    note: { id: "Tiga huruf menyambung jadi satu kata. Bentuknya sama, titiknya yang membedakan.", en: "Three letters join into one word. Same shape, only the dots differ." }
pair:
  off: { ar: "سَبَتَ", tr: "sabata" }
  natural: { ar: "ثَبَتَ", tr: "tsabata" }
sound:
  focus: "ث"
  compare: "س"
  words:
    - { ar: "ثَ", tr: "tsa" }
    - { ar: "ثِ", tr: "tsi" }
    - { ar: "ثُ", tr: "tsu" }
    - { ar: "ثَبَتَ", tr: "tsabata" }
  tip:
    id: "Untuk ث, letakkan ujung lidah di antara gigi atas dan bawah, lalu hembuskan udara. Kalau lidah tetap di belakang gigi, yang keluar *s*."
    en: "For ث, put the tip of your tongue between your upper and lower teeth and breathe out. If the tongue stays behind the teeth, you get *s*."
tirukan:
  ar: "بَ بِ بُ، تَ تِ تُ، ثَ ثِ ثُ"
  tr: "ba bi bu, ta ti tu, tsa tsi tsu"
  id: "ba bi bu, ta ti tu, tsa tsi tsu"
  en: "ba bi bu, ta ti tu, tha thi thu"
check:
  - id: h1-02-c1
    type: read
    match: exact
    ar: "بِ"
    options: ["ba", "bi", "bu"]
    answer: "bi"
    why: { id: "Garis di bawah huruf adalah kasrah: *bi*.", en: "The stroke below the letter is kasrah: *bi*." }
  - id: h1-02-c2
    type: choice
    match: exact
    prompt: "Mana yang dibaca *tsu*?"
    options: ["ثُ", "تُ", "بُ"]
    answer: "ثُ"
    why: { id: "Tiga titik di atas adalah ث, dan dhammah dibaca *u*.", en: "Three dots above is ث, and dhammah is read *u*." }
  - id: h1-02-c3
    type: choice
    match: exact
    prompt: "Berapa titik huruf ت, dan di mana?"
    options: ["dua di atas", "satu di bawah", "tiga di atas"]
    answer: "dua di atas"
    why: { id: "ت punya dua titik di atas. ب satu di bawah, ث tiga di atas.", en: "ت has two dots above. ب has one below, ث three above." }
  - id: h1-02-c4
    type: read
    match: exact
    ar: "تُ"
    options: ["ta", "ti", "tu"]
    answer: "tu"
    why: { id: "Dhammah di atas huruf dibaca *u*: *tu*.", en: "Dhammah above the letter is read *u*: *tu*." }
  - id: h1-02-c5
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf pertama."
    ar: "ثَبَتَ"
    target: 0
    options: [fatha, kasra, damma]
    answer: fatha
    why: { id: "Kata ini dibaca *tsabata*: huruf pertama berfathah.", en: "This word is read *tsabata*: the first letter has fathah." }
  - id: h1-02-c6
    type: spell
    match: exact
    prompt: "Susun suku katanya: *tsa-ba-ta*."
    letters: ["ثَ", "بَ", "تَ"]
    distractors: ["تُ", "بِ"]
    answer: "ثَبَتَ"
    why: { id: "Dari kanan: ثَ, lalu بَ, lalu تَ.", en: "From the right: ثَ, then بَ, then تَ." }
glossary:
  - { ar: "بَ", tr: "ba", id: "huruf ba berharakat fathah", en: "the letter ba with fathah" }
  - { ar: "تِ", tr: "ti", id: "huruf ta berharakat kasrah", en: "the letter ta with kasrah" }
  - { ar: "ثُ", tr: "tsu", id: "huruf tsa berharakat dhammah", en: "the letter tha with dhammah" }
next: huruf1-03-nun-ya
---

## concept.id
Huruf pertamamu adalah **ب** (*ba*). Bentuknya seperti perahu kecil dengan satu titik di bawah. Pasang fathah dan ia dibaca *ba*, kasrah *bi*, dhammah *bu*. Persis seperti Iqra': **بَ بِ بُ**.

Sekarang kabar baiknya: **ت** (*ta*) dan **ث** (*tsa*) punya bentuk yang sama persis. Yang berubah hanya titiknya: ت dua titik di atas, ث tiga titik di atas. Jadi dari satu bentuk kamu langsung dapat tiga huruf.

Kalau huruf-huruf ini bertemu, mereka menyambung. **ثَبَتَ** (*tsabata*) adalah tiga huruf yang bergandengan, dibaca dari kanan.

## concept.en
Your first letter is **ب** (*ba*). It looks like a small boat with one dot below. Add fathah and it reads *ba*, kasrah *bi*, dhammah *bu*. Just like Iqra': **بَ بِ بُ**.

Now the good news: **ت** (*ta*) and **ث** (*tha*) have exactly the same shape. Only the dots change: ت has two dots above, ث three dots above. So one shape gives you three letters.

When these letters meet, they join. **ثَبَتَ** (*tsabata*) is three letters holding hands, read from the right.

## contrast.id
Bahasa Indonesia tidak punya bunyi ث, jadi banyak orang membacanya *s*: *sabata*. Di bahasa Arab, ث dan س adalah dua huruf berbeda, dan kata bisa berubah arti karenanya.

Triknya: keluarkan sedikit ujung lidah di antara gigi, seperti mengucapkan *th* di kata Inggris *think*. Tidak perlu berlebihan, cukup terasa lidah menyentuh gigi atas.

## contrast.en
Indonesian has no ث sound, so many people read it as *s*: *sabata*. In Arabic, ث and س are two different letters, and a word can change meaning because of it.

The trick: let the tip of your tongue come out a little between your teeth, like *th* in *think*. No need to overdo it; just feel the tongue touch the upper teeth.
