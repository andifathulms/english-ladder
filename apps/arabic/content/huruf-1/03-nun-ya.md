---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-03-nun-ya
rung: huruf-1
order: 3
status: draft
minutes: 7
title: { id: "Nun, ya dan bentuk gigi", en: "Nun, ya and the tooth shape", ar: "نَ يَ" }
summary:
  id: "Kamu membaca ن dan ي, dan membedakan lima huruf bergigi di tengah kata dari titiknya."
  en: "You read ن and ي, and tell the five toothed letters apart in the middle of a word by their dots."
introduces: [letters-nun-ya]
spiral: script
visual: { id: letter-forms, props: { letter: "ن" } }
examples:
  - ar: "نَ نِ نُ"
    tr: "na ni nu"
    id: "latihan suku kata: na, ni, nu"
    en: "syllable drill: na, ni, nu"
  - ar: "يَ يِ يُ"
    tr: "ya yi yu"
    id: "latihan suku kata: ya, yi, yu"
    en: "syllable drill: ya, yi, yu"
    note: { id: "Di akhir kata ي berekor dan titiknya dua di bawah.", en: "At the end of a word ي has a tail and two dots below." }
  - ar: "بَتَثَنَيَ"
    tr: "batatsanaya"
    id: "latihan: lima gigi berderet, hanya titiknya yang beda"
    en: "drill: five teeth in a row, only the dots differ"
    note: { id: "Dari kanan: ba (1 bawah), ta (2 atas), tsa (3 atas), na (1 atas), ya (2 bawah).", en: "From the right: ba (1 below), ta (2 above), tha (3 above), na (1 above), ya (2 below)." }
  - ar: "نَبَتَ"
    tr: "nabata"
    id: "tumbuh"
    en: "grew"
    note: { id: "Dari akar kata ini datang kata Indonesia *nabati*.", en: "Indonesian *nabati* (plant-based) comes from this root." }
  - ar: "يَثِبُ"
    tr: "yatsibu"
    id: "melompat"
    en: "jumps"
pair:
  off: { ar: "بَنَتَ", tr: "banata" }
  natural: { ar: "نَبَتَ", tr: "nabata" }
tirukan:
  ar: "نَ نِ نُ، يَ يِ يُ"
  tr: "na ni nu, ya yi yu"
  id: "na ni nu, ya yi yu"
  en: "na ni nu, ya yi yu"
check:
  - id: h1-03-c1
    type: read
    match: exact
    ar: "نِ"
    options: ["na", "ni", "nu"]
    answer: "ni"
    why: { id: "Satu titik di atas adalah ن, kasrah dibaca *i*: *ni*.", en: "One dot above is ن, kasrah is read *i*: *ni*." }
  - id: h1-03-c2
    type: choice
    match: exact
    prompt: "Huruf mana yang titiknya dua di bawah?"
    options: ["ي", "ت", "ن"]
    answer: "ي"
    why: { id: "ي dua titik di bawah. ت dua di atas, ن satu di atas.", en: "ي has two dots below. ت has two above, ن one above." }
  - id: h1-03-c3
    type: read
    match: exact
    ar: "نَبَتَ"
    options: ["nabata", "banata", "tabana"]
    answer: "nabata"
    why: { id: "Dari kanan: titik di atas (na), titik di bawah (ba), dua titik di atas (ta).", en: "From the right: dot above (na), dot below (ba), two dots above (ta)." }
  - id: h1-03-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf kedua."
    ar: "يَثِبُ"
    target: 1
    options: [fatha, kasra, damma]
    answer: kasra
    why: { id: "Dibaca *yatsibu*: ث berharakat kasrah.", en: "It is read *yatsibu*: ث has kasrah." }
  - id: h1-03-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *na-ba-ta*."
    letters: ["نَ", "بَ", "تَ"]
    distractors: ["يَ", "ثَ"]
    answer: "نَبَتَ"
    why: { id: "Dari kanan: نَ, بَ, تَ. Perhatikan letak titiknya.", en: "From the right: نَ, بَ, تَ. Watch where the dots sit." }
glossary:
  - { ar: "نَ", tr: "na", id: "huruf nun berharakat fathah", en: "the letter nun with fathah" }
  - { ar: "يُ", tr: "yu", id: "huruf ya berharakat dhammah", en: "the letter ya with dhammah" }
  - { ar: "نَبَ", tr: "naba", id: "latihan suku kata *na-ba*", en: "syllable drill *na-ba*" }
next: huruf1-04-jim-ha-kha
---

## concept.id
Dua huruf baru: **ن** (*nun*) dengan satu titik di atas, dan **ي** (*ya*) dengan dua titik di bawah. Seperti biasa, langsung baca dengan tiga vokal: **نَ نِ نُ**, **يَ يِ يُ**.

Di awal dan tengah kata, ن dan ي menyusut jadi satu "gigi" kecil, sama seperti ب ت ث. Jadi di tengah kata ada lima huruf yang bentuknya sama persis. Yang membedakan hanya titik: jumlahnya dan letaknya, di atas atau di bawah.

Biasakan mata membaca titik dulu, baru bentuknya. Di **نَبَتَ** (*nabata*) ada tiga gigi: satu titik di atas, satu di bawah, dua di atas.

## concept.en
Two new letters: **ن** (*nun*) with one dot above, and **ي** (*ya*) with two dots below. As always, read them straight away with three vowels: **نَ نِ نُ**, **يَ يِ يُ**.

At the start and in the middle of a word, ن and ي shrink to one small "tooth", just like ب ت ث. So in the middle of a word five letters have exactly the same shape. Only the dots tell them apart: how many, and whether above or below.

Train your eyes to read the dots first, then the shape. In **نَبَتَ** (*nabata*) there are three teeth: one dot above, one below, two above.

## contrast.id
Kesalahan yang paling sering di sini bukan bunyi, melainkan mata. Titik di atas dan titik di bawah gampang tertukar, jadi **نَبَتَ** terbaca *banata*. Pelan-pelan saja: satu gigi, satu titik.

Di akhir kata bentuknya berbeda. ن akhir seperti mangkuk dengan titik di atas, dan ي akhir punya ekor yang melengkung di bawah garis. Kamu akan berlatih keempat bentuk ini lagi di pelajaran 12.

## contrast.en
The most common mistake here is not sound but sight. Dots above and dots below are easy to swap, so **نَبَتَ** gets read *banata*. Go slowly: one tooth, one dot.

At the end of a word the shapes differ. Final ن is a bowl with a dot above, and final ي has a tail that curves below the line. You will practise all four forms again in lesson 12.
