---
id: easy2-01-uhrzeit
rung: easy-2
order: 1
status: draft
minutes: 10
title: { id: "Jam dan hari: um, am, im", en: "Time and days: um, am, im", de: "Es ist halb acht" }
summary:
  id: "Sebut jam (*Es ist halb acht*, *Viertel nach drei*) dan pakai *um* untuk jam, *am* untuk hari dan bagian hari, *im* untuk bulan dan musim."
  en: "Tell the time (*Es ist halb acht*, *Viertel nach drei*) and use *um* for clock times, *am* for days and parts of the day, *im* for months and seasons."
introduces: [a1-time]
spiral: prepositions
visual: { id: day-planner, props: {} }
examples:
  - { de: "Es ist [[halb]] acht.", id: "Sekarang jam setengah delapan.", note: { id: "*Halb acht* = 7.30, persis seperti *setengah delapan*: setengah menuju jam delapan.", en: "*Halb acht* = 7:30, just like Indonesian *setengah delapan*: half on the way to eight." } }
  - { de: "Es ist Viertel [[nach]] drei.", id: "Sekarang jam tiga lewat seperempat." }
  - { de: "Der Deutschkurs beginnt [[um]] neun Uhr.", id: "Kursus bahasa Jermannya mulai jam sembilan." }
  - { de: "[[Am]] Montag arbeite ich in der Klinik.", id: "Hari Senin aku kerja di klinik." }
  - { de: "Lena kommt [[am]] Abend.", id: "Lena datang malam nanti." }
  - { de: "[[Im]] August habe ich Urlaub.", id: "Bulan Agustus aku cuti." }
pair:
  off: "Ich arbeite in Montag."
  natural: "Ich arbeite [[am]] Montag."
work:
  situation: { id: "Rina baru mulai Ausbildung perawat. Bu Becker menjelaskan jadwal sifnya.", en: "Rina has just started her nursing Ausbildung. Frau Becker explains her shifts." }
  lines:
    - { who: Frau Becker, de: "Sie haben am Montag Frühschicht.", id: "Hari Senin Anda masuk sif pagi." }
    - { who: Rina, de: "Um wie viel Uhr beginnt die Frühschicht?", id: "Sif pagi mulai jam berapa?" }
    - { who: Frau Becker, de: "Um sechs Uhr. Die Spätschicht beginnt um zwei.", id: "Jam enam. Sif siang mulai jam dua." }
    - { who: Rina, de: "Gut, danke. Am Montag um sechs.", id: "Baik, terima kasih. Senin jam enam." }
words:
  id: "**Die Frühschicht** = *früh* (pagi) + *die Schicht* (sif). **Die Spätschicht** = *spät* + *Schicht*. Kata terakhir menentukan artikelnya: *die*."
  en: "**Die Frühschicht** = *früh* (early) + *die Schicht* (shift). **Die Spätschicht** = *spät* + *Schicht*. The last word decides the article: *die*."
  compounds: [[Früh, Schicht], [Spät, Schicht]]
talk:
  lines:
    - { who: Andi, de: "Wie spät ist es?", id: "Jam berapa sekarang?" }
    - { who: Mei, de: "Es ist Viertel vor neun.", id: "Jam sembilan kurang seperempat." }
    - { who: Andi, de: "Oh nein! Der Kurs ist um neun!", id: "Aduh! Kursusnya jam sembilan!" }
tirukan: { de: "Es ist halb acht.", id: "Sekarang jam setengah delapan." }
check:
  - id: e2-01-c1
    type: choice
    lang: id
    prompt: "*Es ist halb acht* artinya jam …"
    options: ["7.30", "8.30", "8.00"]
    answer: "7.30"
    why: { id: "*Halb acht* = setengah delapan = 7.30. Sama seperti bahasa Indonesia!", en: "*Halb acht* = half on the way to eight = 7:30. Just like Indonesian *setengah delapan*!" }
  - id: e2-01-c2
    type: gap
    cue: "Hari Senin aku libur."
    prompt: "Ich habe ___ Montag frei."
    options: [am, um, im]
    answer: am
    why: { id: "Hari memakai *am*: *am Montag*.", en: "Days take *am*: *am Montag*." }
  - id: e2-01-c3
    type: gap
    prompt: "Der Kurs beginnt ___ neun Uhr."
    options: [um, am, im]
    answer: um
    why: { id: "Jam memakai *um*: *um neun Uhr*.", en: "Clock times take *um*: *um neun Uhr*." }
  - id: e2-01-c4
    type: gap
    cue: "Bulan Juli aku cuti."
    prompt: "___ Juli habe ich Urlaub."
    options: [Im, Am, Um]
    answer: Im
    why: { id: "Bulan dan musim memakai *im*: *im Juli*, *im Winter*.", en: "Months and seasons take *im*: *im Juli*, *im Winter*." }
  - id: e2-01-c5
    type: listen
    audio: "Es ist Viertel nach drei."
    options: ["Es ist Viertel nach drei.", "Es ist Viertel vor drei."]
    answer: "Es ist Viertel nach drei."
    why: { id: "*Nach* = lewat (3.15); *vor* = kurang (2.45).", en: "*Nach* = past (3:15); *vor* = to (2:45)." }
  - id: e2-01-c6
    type: wordorder
    cue: "Hari Sabtu aku nggak kerja."
    tiles: [arbeite, Am Samstag, ich, nicht]
    answer: [Am Samstag, arbeite, ich, nicht]
    zones: [p1, verb, middle, middle]
    why: { id: "*Am Samstag* di posisi 1, kata kerja tetap di posisi 2, lalu *ich*.", en: "*Am Samstag* in position 1, the verb stays second, then *ich*." }
glossary:
  - { de: Uhr, id: jam; pukul, en: clock; o'clock, pos: noun, gender: f, plural: Uhren }
  - { de: halb, id: setengah, en: half, pos: adv }
  - { de: Viertel, id: seperempat, en: quarter, pos: noun, gender: n, plural: Viertel }
  - { de: Montag, id: Senin, en: Monday, pos: noun, gender: m, plural: Montage }
  - { de: Abend, id: malam (petang), en: evening, pos: noun, gender: m, plural: Abende }
  - { de: Monat, id: bulan, en: month, pos: noun, gender: m, plural: Monate }
  - { de: Urlaub, id: cuti; liburan, en: holiday; leave, pos: noun, gender: m, plural: Urlaube }
  - { de: beginnen, id: mulai, en: to begin, pos: verb, verb: { aux: haben, partizip: begonnen } }
  - { de: frei, id: libur; kosong, en: free; off, pos: adj }
  - { de: Frühschicht, id: sif pagi, en: early shift, pos: noun, gender: f, plural: Frühschichten }
  - { de: Spätschicht, id: sif siang, en: late shift, pos: noun, gender: f, plural: Spätschichten }
  - { de: "Wie spät ist es?", id: jam berapa sekarang?, en: what time is it?, pos: expr }
next: easy2-02-aufstehen
---

## concept.id
Jam: *Es ist acht Uhr* (8.00), *halb neun* (8.30), *Viertel nach acht* (8.15), *Viertel vor neun* (8.45). Untuk menyebut kapan: **um** + jam (*um neun Uhr*), **am** + hari atau bagian hari (*am Montag, am Abend*), **im** + bulan atau musim (*im Juli, im Winter*). Pengecualian kecil: *in der Nacht* (malam hari).

## concept.en
Clock times: *Es ist acht Uhr* (8:00), *halb neun* (8:30), *Viertel nach acht* (8:15), *Viertel vor neun* (8:45). To say when: **um** + a clock time (*um neun Uhr*), **am** + a day or part of the day (*am Montag, am Abend*), **im** + a month or season (*im Juli, im Winter*). One small exception: *in der Nacht* (at night).

## contrast.id
Kabar baik: *halb acht* bekerja persis seperti *setengah delapan* (7.30). Bahasa Inggris malah bilang *half past seven*. Yang beda: bahasa Indonesia cukup *hari Senin* atau *bulan Juli*, sedangkan bahasa Jerman wajib memakai kata depan: *am Montag*, *im Juli*.

## contrast.en
Good news: *halb acht* works exactly like Indonesian *setengah delapan* (7:30). English says *half past seven* instead. The difference: Indonesian just says *hari Senin* or *bulan Juli*, but German needs a preposition: *am Montag*, *im Juli*.
