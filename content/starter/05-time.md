---
id: starter-05-time
rung: starter
order: 5
status: draft
minutes: 7
title: { en: "Seven thirty on Monday", id: "Jam dan hari" }
summary:
  id: "Kamu bisa menyebut jam dan hari, dan tidak terjebak setengah delapan."
  en: "You can say the time and the day, without falling into the setengah delapan trap."
introduces: [time]
spiral: time
worked:
  - { en: "It's seven [[o'clock]].", id: "Jam tujuh." }
  - { en: "It's seven [[thirty]].", id: "Jam tujuh tiga puluh." }
  - { en: "It's nine [[fifteen]].", id: "Jam sembilan lima belas." }
examples:
  - { en: "It's [[seven o'clock]].", id: "Jam tujuh." }
  - { en: "It's [[half past seven]].", id: "Jam setengah delapan.", note: { id: "Setengah delapan = 7:30 = half past seven.", en: "Setengah delapan = 7:30 = half past seven." } }
  - { en: "It's [[seven thirty]].", id: "Jam tujuh tiga puluh.", note: { id: "Cara paling aman: sebut angkanya saja.", en: "The safest way: just say the numbers." } }
  - { en: "It's [[a quarter past]] nine.", id: "Jam sembilan lewat seperempat." }
  - { en: "See you on [[Monday]].", id: "Sampai ketemu hari Senin." }
  - { en: "[[Friday]] is busy.", id: "Hari Jumat sibuk." }
pair:
  off: "It's half eight. (for 7:30)"
  natural: "It's [[half past seven]]."
check:
  - id: st-05-c1
    type: choice
    cue: "Jam setengah delapan (7:30)."
    prompt: "7:30 ="
    options: [half past seven, half eight, half past eight]
    answer: half past seven
    why: { id: "Di Inggris, half eight artinya 8:30. Untuk 7:30: half past seven.", en: "In the UK, half eight means 8:30. For 7:30: half past seven." }
  - id: st-05-c2
    type: gap
    cue: "Jam tujuh."
    prompt: "It's seven ___."
    options: ["o'clock", hours, time]
    answer: "o'clock"
    why: { id: "Jam pas: o'clock.", en: "On the hour: o'clock." }
  - id: st-05-c3
    type: choice
    cue: "Hari Kamis"
    prompt: "Kamis ="
    options: [Thursday, Tuesday]
    answer: Thursday
    why: { id: "Thursday diawali /θ/, Tuesday diawali /tj/.", en: "Thursday starts with /θ/, Tuesday with /tj/." }
  - id: st-05-c4
    type: listen
    audio: "It's nine fifteen."
    options: ["9:15", "9:50", "5:19"]
    answer: "9:15"
    why: { id: "Nine fifteen: jam 9 lewat 15 menit.", en: "Nine fifteen: 9:15." }
  - id: st-05-c5
    type: order
    cue: "Sampai ketemu hari Senin."
    tiles: [Monday, See, on, you]
    answer: [See, you, on, Monday]
    why: { id: "Hari memakai on: on Monday.", en: "Days take on: on Monday." }
glossary:
  - { en: "o'clock", id: "jam (pas)" }
  - { en: half past, id: "lewat setengah" }
  - { en: quarter, id: "seperempat" }
  - { en: Monday, id: "Senin" }
  - { en: Tuesday, id: "Selasa" }
  - { en: Wednesday, id: "Rabu" }
  - { en: Thursday, id: "Kamis" }
  - { en: Friday, id: "Jumat" }
  - { en: Saturday, id: "Sabtu" }
  - { en: Sunday, id: "Minggu" }
  - { en: time, id: "waktu, jam" }
sound:
  focus: "Tuesday · Thursday · Wednesday"
  words: [Tuesday, Thursday, Wednesday]
  tip: { id: "Tuesday diawali /tj/, Thursday /θ/. Wednesday dibaca WENZ-day: huruf d pertama tidak dibunyikan.", en: "Tuesday starts with /tj/, Thursday with /θ/. Wednesday is said WENZ-day: the first d is silent." }
words: { id: "*Jam* bisa berarti **hour**, **clock**, **watch** atau **o'clock**. Untuk menyebut waktu: **It's seven o'clock**.", en: "*Jam* can mean **hour**, **clock**, **watch** or **o'clock**. To give the time: **It's seven o'clock**." }
next: starter-06-sounds
---

## concept.id
Untuk jam pas, pakai **o'clock**: **seven o'clock**. Cara paling mudah untuk jam lainnya adalah menyebut angkanya: **seven thirty**, **nine fifteen**. Nama hari selalu diawali huruf besar dan memakai **on**: **on Monday**.

## concept.en
On the hour, use **o'clock**: **seven o'clock**. The easiest way for other times is to say the numbers: **seven thirty**, **nine fifteen**. Days always start with a capital letter and take **on**: **on Monday**.

## contrast.id
*Setengah delapan* artinya 7:30, tapi di Inggris **half eight** artinya 8:30. Jadi untuk 7:30 bilang **half past seven** atau **seven thirty**. Hati-hati juga dengan **Tuesday** dan **Thursday**, yang bunyinya mirip.

## contrast.en
*Setengah delapan* means 7:30, but in the UK **half eight** means 8:30. So for 7:30 say **half past seven** or **seven thirty**. Watch **Tuesday** and **Thursday** too, which sound alike.
