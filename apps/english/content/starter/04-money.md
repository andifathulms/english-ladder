---
id: starter-04-money
rung: starter
order: 4
status: draft
minutes: 7
title: { en: "Twenty-five thousand rupiah", id: "Harga dan angka besar" }
summary:
  id: "Kamu bisa menyebut harga dalam rupiah dan membaca angka cara bahasa Inggris."
  en: "You can say prices in rupiah and read numbers the English way."
introduces: [money]
spiral: numbers
worked:
  - { en: "one [[thousand]]", id: "1.000" }
  - { en: "ten [[thousand]]", id: "10.000" }
  - { en: "one [[million]]", id: "1.000.000" }
examples:
  - { en: "[[twenty-five thousand]] rupiah", id: "Rp25.000" }
  - { en: "[[one hundred thousand]] rupiah", id: "Rp100.000" }
  - { en: "[[one million]] rupiah", id: "Rp1.000.000" }
  - { en: "How much is it? [[Fifteen thousand]].", id: "Berapa? Lima belas ribu." }
  - { en: "[[two point five]] kilos", id: "2,5 kg", note: { id: "Desimal dibaca point. Two and a half juga umum.", en: "Decimals are read point. Two and a half is common too." } }
  - { en: "1,500 = [[one thousand five hundred]]", id: "1.500", note: { id: "Bahasa Inggris memakai koma untuk ribuan dan titik untuk desimal.", en: "English uses a comma for thousands and a full stop for decimals." } }
pair:
  off: "twenty-five thousands rupiah"
  natural: "twenty-five [[thousand]] rupiah"
check:
  - id: st-04-c1
    type: gap
    cue: "Rp50.000"
    prompt: "fifty ___ rupiah"
    options: [thousand, thousands, hundred]
    answer: thousand
    why: { id: "Setelah angka, thousand tidak ditambah -s.", en: "After a number, thousand takes no -s." }
  - id: st-04-c2
    type: choice
    cue: "2,5 kg"
    prompt: "2.5 kilos ="
    options: [two point five kilos, two comma five kilos, twenty-five kilos]
    answer: two point five kilos
    why: { id: "Desimal dibaca point.", en: "A decimal is read point." }
  - id: st-04-c3
    type: choice
    cue: "Dalam tulisan bahasa Inggris, 1,500 artinya…"
    prompt: "1,500 ="
    options: [one thousand five hundred, one point five]
    answer: one thousand five hundred
    why: { id: "Koma dalam angka bahasa Inggris memisahkan ribuan.", en: "In English numbers, the comma separates thousands." }
  - id: st-04-c4
    type: listen
    audio: "Thirty-five thousand rupiah."
    options: ["Rp35.000", "Rp53.000", "Rp3.500"]
    answer: "Rp35.000"
    why: { id: "Thirty-five thousand: 35 ribu.", en: "Thirty-five thousand: 35,000." }
  - id: st-04-c5
    type: gap
    cue: "Berapa harganya?"
    prompt: "How much is ___?"
    options: [it, they, a]
    answer: it
    why: { id: "Tanya harga satu barang: How much is it?", en: "Asking the price of one thing: How much is it?" }
glossary:
  - { en: thousand, id: "ribu" }
  - { en: million, id: "juta" }
  - { en: rupiah, id: "rupiah" }
  - { en: point, id: "koma (desimal)" }
  - { en: half, id: "setengah" }
  - { en: kilo, id: "kilo" }
  - { en: how much, id: "berapa (harga)" }
  - { en: price, id: "harga" }
talk:
  - { who: Rina, en: "How much is it?", id: "Berapa, Bu?" }
  - { who: Bu Dewi, en: "Twelve thousand.", id: "Dua belas ribu." }
  - { who: Rina, en: "OK. Thank you.", id: "Oke. Makasih." }
words: { id: "*Goceng* dan *ceban* tidak punya padanan. Sebut angkanya saja: **five thousand**, **ten thousand**.", en: "*Goceng* and *ceban* have no English match. Just say the number: **five thousand**, **ten thousand**." }
next: starter-05-time
---

## concept.id
Ribuan dibaca **thousand** dan jutaan **million**, dan setelah angka keduanya tidak pernah ditambah -s: **twenty-five thousand rupiah**. Penulisannya terbalik dari bahasa Indonesia: koma untuk ribuan (**25,000**) dan titik untuk desimal (**2.5**).

## concept.en
Thousands are **thousand** and millions **million**, and after a number neither takes -s: **twenty-five thousand rupiah**. The writing is the reverse of Indonesian: a comma for thousands (**25,000**) and a full stop for decimals (**2.5**).

## contrast.id
Di Indonesia *Rp25.000* memakai titik dan *2,5 kg* memakai koma. Dalam bahasa Inggris, **2,500** berarti dua ribu lima ratus, bukan dua koma lima. Desimal dibaca **point**: **two point five**.

## contrast.en
In Indonesia *Rp25.000* uses a full stop and *2,5 kg* a comma. In English, **2,500** means two thousand five hundred, not two point five. Decimals are read **point**: **two point five**.
