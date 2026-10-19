---
id: kana2-07-kata-serapan
rung: kana-2
order: 7
status: draft
minutes: 8
title: { id: "Kata serapan dan teman palsu", en: "Loanwords and false friends", ja: "パソコン コンビニ", kana: "パソコン コンビニ" }
summary:
  id: "Kamu bisa membaca kata serapan sehari-hari dan tahu yang artinya berbeda dari dugaan, seperti マンション."
  en: "You can read everyday loanwords and know the ones that don't mean what you'd guess, like マンション."
introduces: [k2-loanwords]
spiral: kana
worked:
  - { ja: "パソコン", kana: "パソコン", id: "komputer, dipendekkan dari *personal computer*" }
  - { ja: "コンビニ", kana: "コンビニ", id: "minimarket, dari *convenience store*" }
  - { ja: "スマホ", kana: "スマホ", id: "ponsel pintar, dari *smartphone*" }
examples:
  - { ja: "[[パソコン]]", kana: "パソコン", id: "komputer" }
  - { ja: "[[コンビニ]]", kana: "コンビニ", id: "minimarket" }
  - { ja: "[[マンション]]", kana: "マンション", id: "apartemen", note: { id: "Bukan rumah mewah: マンション adalah gedung apartemen biasa.", en: "Not a mansion: マンション is an ordinary apartment block." } }
  - { ja: "[[アルバイト]]", kana: "アルバイト", id: "kerja paruh waktu", note: { id: "Dari bahasa Jerman *Arbeit*.", en: "From German *Arbeit*." } }
  - { ja: "[[スーパー]]", kana: "スーパー", id: "supermarket" }
  - { ja: "[[スマホ]]", kana: "スマホ", id: "ponsel pintar" }
pair:
  off: { ja: "ハンドフォン", kana: "ハンドフォン" }
  natural: { ja: "[[スマホ]]", kana: "スマホ" }
words: { id: "**マンション** di Jepang adalah apartemen biasa, bukan rumah mewah. **アルバイト** dari bahasa Jerman *Arbeit*: kerja paruh waktu. Dan *HP* kita bukan kata Jepang: orang Jepang bilang **スマホ** atau **けいたい**.", en: "**マンション** in Japan is an ordinary apartment, not a mansion. **アルバイト** comes from German *Arbeit*: a part-time job. And Indonesian *HP* isn't Japanese: people say **スマホ** or **けいたい**." }
talk:
  lines:
    - { who: Rina, ja: "アルバイト を します か 。", kana: "アルバイト を します か 。", id: "Kamu kerja paruh waktu?" }
    - { who: Budi, ja: "はい 、 コンビニ で アルバイト を します 。", kana: "はい 、 コンビニ で アルバイト を します 。", id: "Ya, saya kerja paruh waktu di minimarket." }
tirukan: { ja: "コンビニ で アルバイト を します 。", kana: "コンビニ で アルバイト を します 。", id: "Saya kerja paruh waktu di minimarket." }
check:
  - id: k2-07-c1
    type: choice
    prompt: "マンション"
    options: [apartemen, rumah mewah, hotel]
    answer: apartemen
    why: { id: "マンション adalah apartemen biasa. Rumah mewah bukan artinya.", en: "マンション is an ordinary apartment, not a mansion." }
  - id: k2-07-c2
    type: choice
    prompt: "Bahasa Jepang untuk *HP* (ponsel)?"
    options: [スマホ, ハンドフォン, パソコン]
    answer: スマホ
    why: { id: "*HP* hanya dipakai di Indonesia. Di Jepang: スマホ.", en: "*HP* is used only in Indonesia. In Japan: スマホ." }
  - id: k2-07-c3
    type: listen
    audio: "コンビニ"
    options: [コンビニ, コーヒー, パソコン]
    answer: コンビニ
    why: { id: "コンビニ: ko-n-bi-ni, minimarket.", en: "コンビニ: ko-n-bi-ni, convenience store." }
  - id: k2-07-c4
    type: gap
    cue: "Saya kerja paruh waktu di minimarket."
    prompt: "コンビニ で ___ を します 。"
    options: [アルバイト, パソコン, ニュース]
    answer: アルバイト
    why: { id: "アルバイト を します: bekerja paruh waktu.", en: "アルバイト を します: work part-time." }
  - id: k2-07-c5
    type: kana
    audio: "パソコン"
    answer: パソコン
    script: katakana
    why: { id: "パソコン: pa-so-ko-n.", en: "パソコン: pa-so-ko-n." }
glossary:
  - { ja: "アパート", kana: "アパート", id: "apartemen (kecil)", en: "apartment", type: noun, jlpt: N5 }
  - { ja: "レストラン", kana: "レストラン", id: "restoran", en: "restaurant", type: noun, jlpt: N5 }
  - { ja: "ニュース", kana: "ニュース", id: "berita", en: "news", type: noun, jlpt: N5 }
  - { ja: "パソコン", kana: "パソコン", id: "komputer", en: "personal computer", type: noun }
  - { ja: "コンビニ", kana: "コンビニ", id: "minimarket", en: "convenience store", type: noun }
  - { ja: "スマホ", kana: "スマホ", id: "ponsel pintar", en: "smartphone", type: noun }
  - { ja: "マンション", kana: "マンション", id: "apartemen", en: "apartment block", type: noun }
  - { ja: "アルバイト", kana: "アルバイト", id: "kerja paruh waktu", en: "part-time job", type: noun }
  - { ja: "スーパー", kana: "スーパー", id: "supermarket", en: "supermarket", type: noun }
extra:
  - { ja: "パソコン", reason: "Daftar komunitas mencatatnya di N4; kata kerja dan kampus sehari-hari." }
  - { ja: "コンビニ", reason: "Tempat yang ditemui setiap hari di Jepang; tidak ada di daftar komunitas." }
  - { ja: "スマホ", reason: "Kata sehari-hari untuk ponsel; tidak ada di daftar komunitas." }
  - { ja: "マンション", reason: "Teman palsu yang penting untuk orang yang akan tinggal di Jepang; daftar komunitas mencatatnya di N2." }
  - { ja: "アルバイト", reason: "Daftar komunitas mencatatnya di N4; penting bagi pelajar dan pekerja." }
  - { ja: "スーパー", reason: "Daftar komunitas mencatatnya di N4; tempat belanja sehari-hari." }
next: kana2-08-ketukan
---

## concept.id
Banyak kata serapan Jepang dipendekkan: *personal computer* menjadi パソコン, *convenience store* menjadi コンビニ. Sebagian datang dari bahasa selain Inggris: アルバイト dari bahasa Jerman, パン dari bahasa Portugis. Beberapa artinya bergeser, seperti マンション.

## concept.en
Many Japanese loanwords are shortened: *personal computer* becomes パソコン, *convenience store* becomes コンビニ. Some come from languages other than English: アルバイト from German, パン from Portuguese. A few have shifted meaning, like マンション.

## contrast.id
Bahasa Indonesia juga punya kata serapan buatan sendiri, seperti *HP* untuk ponsel. Kata seperti itu tidak dipahami di Jepang: ハンドフォン terdengar aneh. Pelajari kata serapan Jepang sebagai kata baru, bukan terjemahan dari bahasa Inggris atau Indonesia.

## contrast.en
Indonesian has home-made loanwords too, like *HP* for a mobile phone. Words like that aren't understood in Japan: ハンドフォン sounds odd. Learn Japanese loanwords as new words, not as translations from English or Indonesian.
