---
id: easy1-06-possessives
rung: easy-1
order: 8
status: draft
minutes: 8
title: { en: "My, your, his, her, 's", id: "Punya siapa?" }
summary:
  id: "Kamu bisa bilang punya siapa sesuatu, dan memilih his atau her dengan benar."
  en: "You can say whose something is, and choose his or her correctly."
introduces: [possessive-adj, possessive-s]
spiral: possessives
worked:
  - { en: "I → [[my]] bag", id: "tasku" }
  - { en: "you → [[your]] bag", id: "tasmu" }
  - { en: "he → [[his]] bag", id: "tasnya (laki-laki)" }
  - { en: "she → [[her]] bag", id: "tasnya (perempuan)" }
  - { en: "we → [[our]] bag", id: "tas kami" }
  - { en: "they → [[their]] bag", id: "tas mereka" }
  - { en: "Rina → Rina[['s]] bag", id: "tas Rina" }
examples:
  - { en: "[[My]] name is Dewi.", id: "Namaku Dewi." }
  - { en: "Budi? [[His]] bag is new.", id: "Budi? Tasnya baru.", note: { id: "-nya untuk laki-laki: his.", en: "-nya for a man: his." } }
  - { en: "Siti? [[Her]] phone is new.", id: "Siti? HP-nya baru.", note: { id: "-nya untuk perempuan: her.", en: "-nya for a woman: her." } }
  - { en: "This is Putu[['s]] motorbike.", id: "Ini motornya Putu.", note: { id: "Nama ditambah 's artinya punya orang itu. Nama yang berakhiran s, seperti Yohanes: Yohanes's atau Yohanes', dua-duanya dipakai.", en: "A name plus 's means it belongs to that person. A name ending in s, like Yohanes: Yohanes's or Yohanes', both are used." } }
  - { en: "My phone is new. [[Its]] box is small.", id: "HP-ku baru. Kotaknya kecil.", note: { id: "Its = -nya untuk benda atau hewan. Jangan tertukar dengan it's, yaitu it is.", en: "Its = -nya for a thing or an animal. Don't mix it up with it's, which means it is." } }
  - { en: "[[Their]] children are students.", id: "Anak-anak mereka pelajar." }
pair:
  off: "This is the bag of Rina."
  natural: "This is Rina[['s]] bag."
check:
  - id: e1-06-c1
    type: gap
    cue: "Siti? Tasnya biru."
    prompt: "Siti? ___ bag is blue."
    options: [His, Her, Its]
    answer: Her
    why: { id: "Siti perempuan, jadi her.", en: "Siti is a woman, so her." }
  - id: e1-06-c2
    type: gap
    cue: "Budi? HP-nya baru."
    prompt: "Budi? ___ phone is new."
    options: [His, Her, Their]
    answer: His
    why: { id: "Budi laki-laki, jadi his.", en: "Budi is a man, so his." }
  - id: e1-06-c3
    type: choice
    cue: "Ini motornya Rina."
    prompt: "This is ___ motorbike."
    options: ["Rina's", Rina, of Rina]
    answer: "Rina's"
    why: { id: "Nama ditambah 's: Rina's motorbike.", en: "A name plus 's: Rina's motorbike." }
  - id: e1-06-c4
    type: fix
    cue: "Ini rumah Andi."
    wrong: "This is the house of Andi."
    options: ["This is Andi's house.", "This is Andi house.", "This is house Andi's."]
    answer: "This is Andi's house."
    why: { id: "Pemiliknya dulu, pakai 's, lalu bendanya.", en: "The owner first, with 's, then the thing." }
  - id: e1-06-c5
    type: choice
    cue: "Kami punya kucing. Kucing kami kecil."
    prompt: "We have a cat. ___ cat is small."
    options: [Our, Their, We]
    answer: Our
    why: { id: "Punya kami: our.", en: "Belonging to us: our." }
  - id: e1-06-c6
    type: order
    cue: "Namaku Budi."
    tiles: [is, name, My, Budi]
    answer: [My, name, is, Budi]
    why: { id: "My name is, lalu namamu.", en: "My name is, then your name." }
glossary:
  - { en: my, id: "-ku, punyaku" }
  - { en: your, id: "-mu, punyamu" }
  - { en: his, id: "-nya (laki-laki)" }
  - { en: her, id: "-nya (perempuan)" }
  - { en: our, id: "kami, punya kami" }
  - { en: their, id: "mereka, punya mereka" }
  - { en: name, id: "nama" }
  - { en: bag, id: "tas" }
  - { en: phone, id: "HP" }
  - { en: house, id: "rumah" }
  - { en: blue, id: "biru" }
next: easy1-07-prepositions-place
---

## concept.id
Untuk bilang *punya siapa*, taruh kata kepemilikan sebelum bendanya: **my** (-ku), **your** (-mu), **his**, **her**, **our** dan **their**. Untuk nama orang, tambahkan **'s**: **Rina's bag** artinya *tasnya Rina*.

## concept.en
To say whose something is, put the owner word before the thing: **my**, **your**, **his**, **her**, **our** and **their**. For a person's name, add **'s**: **Rina's bag** means *tasnya Rina*.

## contrast.id
*-nya* dipakai untuk siapa saja, jadi banyak orang selalu menerjemahkannya dengan **his**. Pilih **his** untuk laki-laki dan **her** untuk perempuan, sama seperti **he** dan **she**. Jangan terjemahkan *tas Rina* kata per kata menjadi **the bag of Rina**; bilang **Rina's bag**.

## contrast.en
*-nya* works for anyone, so many people always translate it as **his**. Choose **his** for a man and **her** for a woman, just like **he** and **she**. And don't translate *tas Rina* word for word as **the bag of Rina**; say **Rina's bag**.
