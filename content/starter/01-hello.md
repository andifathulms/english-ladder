---
id: starter-01-hello
rung: starter
order: 1
status: draft
minutes: 6
title: { en: "Hello and goodbye", id: "Halo dan sampai jumpa" }
summary:
  id: "Kamu bisa menyapa sesuai waktunya, berkenalan, dan berpamitan."
  en: "You can greet people at the right time of day, meet someone, and say goodbye."
introduces: [greetings]
spiral: greetings
worked:
  - { en: "[[Hello]]!", id: "Halo!" }
  - { en: "[[Good morning]].", id: "Selamat pagi." }
  - { en: "[[Goodbye]].", id: "Sampai jumpa." }
examples:
  - { en: "[[Good morning]], Bu Siti.", id: "Selamat pagi, Bu Siti.", note: { id: "Good morning dipakai sampai jam 12 siang.", en: "Good morning is used until midday." } }
  - { en: "[[Good afternoon]].", id: "Selamat siang. / Selamat sore.", note: { id: "Good afternoon dipakai dari jam 12 sampai sekitar jam 5 sore. Tidak ada selamat siang terpisah.", en: "Good afternoon runs from midday to about 5 pm. There is no separate word for siang." } }
  - { en: "[[Good evening]].", id: "Selamat malam.", note: { id: "Good evening untuk menyapa saat datang.", en: "Good evening is for arriving." } }
  - { en: "[[Nice to meet you]].", id: "Senang berkenalan." }
  - { en: "Thank you. [[You're welcome]].", id: "Terima kasih. Sama-sama." }
  - { en: "[[Bye]]! See you.", id: "Dah! Sampai ketemu." }
pair:
  off: "Good night, Bu Siti! (arriving at 7 pm)"
  natural: "[[Good evening]], Bu Siti!"
check:
  - id: st-01-c1
    type: gap
    cue: "Jam 8 pagi, kamu bertemu Pak Andi."
    prompt: "___, Pak Andi."
    options: [Good morning, Good night, Goodbye]
    answer: Good morning
    why: { id: "Pagi sampai jam 12: Good morning.", en: "Morning until midday: Good morning." }
  - id: st-01-c2
    type: choice
    cue: "Jam 7 malam, kamu datang ke rumah teman."
    prompt: "You arrive. You say:"
    options: ["Good evening.", "Good night."]
    answer: "Good evening."
    why: { id: "Datang malam hari: Good evening. Good night hanya untuk pamit.", en: "Arriving in the evening: Good evening. Good night is only for leaving." }
  - id: st-01-c3
    type: gap
    cue: "Terima kasih. Sama-sama."
    prompt: "Thank you. You're ___."
    options: [welcome, thanks, fine]
    answer: welcome
    why: { id: "Jawaban untuk thank you: You're welcome.", en: "The answer to thank you: You're welcome." }
  - id: st-01-c4
    type: gap
    cue: "Senang berkenalan."
    prompt: "___ to meet you."
    options: [Nice, Good, Fine]
    answer: Nice
    why: { id: "Ini satu frasa tetap: Nice to meet you.", en: "This is one fixed phrase: Nice to meet you." }
  - id: st-01-c5
    type: listen
    audio: "Good afternoon."
    options: ["Good afternoon.", "Good evening.", "Good morning."]
    answer: "Good afternoon."
    why: { id: "Afternoon: setelah jam 12 siang.", en: "Afternoon: after midday." }
glossary:
  - { en: hello, id: "halo" }
  - { en: good morning, id: "selamat pagi" }
  - { en: good afternoon, id: "selamat siang, selamat sore" }
  - { en: good evening, id: "selamat malam (datang)" }
  - { en: good night, id: "selamat malam (pamit, tidur)" }
  - { en: goodbye, id: "sampai jumpa" }
  - { en: bye, id: "dah" }
  - { en: thank you, id: "terima kasih" }
  - { en: "you're welcome", id: "sama-sama" }
  - { en: nice to meet you, id: "senang berkenalan" }
  - { en: see you, id: "sampai ketemu" }
talk:
  - { who: Putu, en: "Hello! I'm Putu.", id: "Halo! Aku Putu." }
  - { who: Mei, en: "Hi, Putu. I'm Mei. Nice to meet you.", id: "Hai, Putu. Aku Mei. Senang berkenalan." }
  - { who: Putu, en: "Nice to meet you, too.", id: "Senang berkenalan juga." }
words: { id: "*Pak Budi* dan *Bu Siti* memakai nama depan. Dalam bahasa Inggris, **Mr** dan **Ms** biasanya dipakai dengan nama keluarga: **Mr Santoso**. Banyak orang Indonesia hanya punya satu nama, jadi **Mr Budi** juga wajar.", en: "*Pak Budi* and *Bu Siti* use first names. In English, **Mr** and **Ms** usually go with the family name: **Mr Santoso**. Many Indonesians have only one name, so **Mr Budi** is fine too." }
next: starter-02-alphabet
---

## concept.id
Sapaan bahasa Inggris berubah menurut waktu: **Good morning** sampai jam 12, **Good afternoon** sampai sekitar jam 5 sore, lalu **Good evening**. Untuk pamit, pakai **Goodbye** atau **Bye**. **Good night** hanya untuk pamit malam atau sebelum tidur.

## concept.en
English greetings change with the time of day: **Good morning** until midday, **Good afternoon** until about 5 pm, then **Good evening**. To leave, say **Goodbye** or **Bye**. **Good night** is only for leaving at night or going to bed.

## contrast.id
*Selamat malam* bisa dipakai saat datang dan saat pergi. Bahasa Inggris memisahkannya: datang **Good evening**, pergi **Good night**. Dan *selamat siang* serta *selamat sore* sama-sama **Good afternoon**.

## contrast.en
*Selamat malam* works for arriving and for leaving. English splits it: arriving is **Good evening**, leaving is **Good night**. And *selamat siang* and *selamat sore* are both **Good afternoon**.
