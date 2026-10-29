---
id: easy2-11-perfekt
rung: easy-2
order: 11
status: draft
minutes: 11
title: { id: "Kemarin: Perfekt pertama, war dan hatte", en: "Yesterday: a first Perfekt, war and hatte", de: "Ich habe gestern gearbeitet" }
summary:
  id: "Ceritakan yang sudah lewat: *haben/sein* di posisi 2 dan partisip di akhir (*Ich habe gestern gearbeitet*, *Ich bin nach Köln gefahren*), plus *war* dan *hatte*."
  en: "Talk about the past: *haben/sein* in position 2 and the participle at the end (*Ich habe gestern gearbeitet*, *Ich bin nach Köln gefahren*), plus *war* and *hatte*."
introduces: [a1-perfekt-intro]
spiral: perfekt
worked:
  - { de: "Heute arbeite ich. Gestern habe ich gearbeitet.", id: "Hari ini aku kerja. Kemarin aku (sudah) kerja." }
  - { de: "Heute fahre ich nach Köln. Gestern bin ich nach Köln gefahren.", id: "Hari ini aku ke Köln. Kemarin aku ke Köln." }
  - { de: "Heute bin ich müde. Gestern war ich müde.", id: "Hari ini aku capek. Kemarin aku capek." }
  - { de: "Heute habe ich Zeit. Gestern hatte ich Zeit.", id: "Hari ini aku ada waktu. Kemarin aku ada waktu." }
examples:
  - { de: "Ich [[habe]] gestern lange [[gearbeitet]].", id: "Kemarin aku kerja lama." }
  - { de: "Wir [[haben]] am Sonntag zusammen [[gekocht]].", id: "Hari Minggu kami masak bareng." }
  - { de: "Rina [[ist]] nach Berlin [[gefahren]].", id: "Rina pergi ke Berlin.", note: { id: "Kata kerja gerak dari A ke B (*fahren, gehen, kommen, fliegen*) memakai *sein*.", en: "Verbs of moving from A to B (*fahren, gehen, kommen, fliegen*) take *sein*." } }
  - { de: "Am Samstag [[sind]] wir ins Kino [[gegangen]].", id: "Hari Sabtu kami ke bioskop." }
  - { de: "Gestern [[war]] ich krank.", id: "Kemarin aku sakit." }
  - { de: "Ich [[hatte]] keine Zeit.", id: "Aku nggak ada waktu.", note: { id: "Untuk *sein* dan *haben*, orang Jerman biasanya memakai *war* dan *hatte*, bukan Perfekt.", en: "For *sein* and *haben*, Germans usually say *war* and *hatte* rather than the Perfekt." } }
pair:
  off: "Gestern ich arbeite."
  natural: "Gestern [[habe]] ich [[gearbeitet]]."
work:
  situation: { id: "Pagi hari, serah terima sif di bangsal. Rina baru selesai sif malam.", en: "Morning handover on the ward. Rina has just finished a night shift." }
  lines:
    - { who: Frau Becker, de: "Wie war die Nachtschicht?", id: "Sif malamnya bagaimana?" }
    - { who: Rina, de: "Ruhig. Herr Weber hat gut geschlafen.", id: "Tenang. Pak Weber tidurnya nyenyak." }
    - { who: Frau Becker, de: "Und Frau Müller?", id: "Kalau Bu Müller?" }
    - { who: Rina, de: "Sie hatte um drei Uhr Fieber. Ich habe den Arzt gefragt.", id: "Jam tiga dia demam. Saya sudah tanya dokter." }
sound:
  focus: "ge- tanpa tekanan"
  words: ["gearbeitet", "gemacht", "gefahren", "gegangen"]
  tip:
    id: "*Ge-* dibaca pendek dan lemah, seperti *ge* dalam *gelas*. Tekanannya di suku kata berikutnya: *geARbeitet*, *geFAHren*."
    en: "*Ge-* is short and weak, like the *ge* in Indonesian *gelas*. The stress falls on the next syllable: *geARbeitet*, *geFAHren*."
talk:
  lines:
    - { who: Jonas, de: "Was hast du am Wochenende gemacht?", id: "Akhir pekan kamu ngapain?" }
    - { who: Mei, de: "Ich bin nach Hamburg gefahren. Und du?", id: "Aku ke Hamburg. Kamu?" }
    - { who: Jonas, de: "Ich war in Köln. Ich habe viel geschlafen!", id: "Aku di Köln aja. Banyak tidur!" }
tirukan: { de: "Ich habe gestern gearbeitet.", id: "Kemarin aku kerja." }
check:
  - id: e2-11-c1
    type: gap
    cue: "Kemarin aku main sepak bola."
    prompt: "Ich ___ gestern Fußball gespielt."
    options: [habe, bin]
    answer: habe
    why: { id: "*Spielen* memakai *haben*: *ich habe gespielt*.", en: "*Spielen* takes *haben*: *ich habe gespielt*." }
  - id: e2-11-c2
    type: gap
    prompt: "Wir ___ nach München geflogen."
    options: [sind, haben]
    answer: sind
    why: { id: "*Fliegen* adalah gerak dari A ke B: *wir sind geflogen*.", en: "*Fliegen* is moving from A to B: *wir sind geflogen*." }
  - id: e2-11-c3
    type: form
    cue: "Budi (sudah) bekerja."
    base: arbeiten
    target: { person: er, tense: perfekt }
    frame: "Budi ___."
    answer: hat gearbeitet
    why: { id: "*Budi* = *er*: *hat* + *gearbeitet*.", en: "*Budi* = *er*: *hat* + *gearbeitet*." }
  - id: e2-11-c4
    type: conjugate
    verb: fahren
    tense: perfekt
    persons: [ich, du, wir]
    answers: { ich: bin gefahren, du: bist gefahren, wir: sind gefahren }
    why: { id: "*Fahren* memakai *sein*: *bin, bist, sind* + *gefahren*.", en: "*Fahren* takes *sein*: *bin, bist, sind* + *gefahren*." }
  - id: e2-11-c5
    type: gap
    cue: "Kemarin aku capek."
    prompt: "Gestern ___ ich müde."
    options: [war, bin, habe]
    answer: war
    why: { id: "Lampau dari *ich bin*: *ich war*.", en: "The past of *ich bin*: *ich war*." }
  - id: e2-11-c6
    type: wordorder
    tiles: [gelernt, Gestern, habe, ich, Deutsch]
    answer: [Gestern, habe, ich, Deutsch, gelernt]
    zones: [p1, verb, middle, middle, end]
    why: { id: "*Habe* di posisi 2, *gelernt* di akhir. *Ich* pindah ke belakang *habe*.", en: "*Habe* in position 2, *gelernt* at the end. *Ich* moves behind *habe*." }
glossary:
  - { de: gestern, id: kemarin, en: yesterday, pos: adv }
  - { de: vorgestern, id: kemarin lusa, en: the day before yesterday, pos: adv }
  - { de: Wochenende, id: akhir pekan, en: weekend, pos: noun, gender: n, plural: Wochenenden }
  - { de: am Wochenende, id: pada akhir pekan, en: at the weekend, pos: expr }
  - { de: Nachtschicht, id: sif malam, en: night shift, pos: noun, gender: f, plural: Nachtschichten }
  - { de: fliegen, id: terbang; naik pesawat, en: to fly, pos: verb, verb: { aux: sein, partizip: geflogen } }
  - { de: Flughafen, id: bandara, en: airport, pos: noun, gender: m, plural: Flughäfen }
  - { de: Reise, id: perjalanan, en: trip; journey, pos: noun, gender: f, plural: Reisen }
  - { de: Ausflug, id: tamasya, en: day trip, pos: noun, gender: m, plural: Ausflüge }
  - { de: Konzert, id: konser, en: concert, pos: noun, gender: n, plural: Konzerte }
next: easy2-12-ein-tag
---

## concept.id
Untuk cerita lampau dalam percakapan, bahasa Jerman memakai **Perfekt**: *haben* atau *sein* di posisi 2, **partisip** di akhir. Partisip kata kerja beraturan: *ge- + akar + -t* (*gemacht, gearbeitet*). Kata kerja gerak dari A ke B memakai *sein* dan partisip *-en* (*ich bin gefahren, gegangen, gekommen*). Untuk *sein* dan *haben* cukup **war** dan **hatte**.

## concept.en
To talk about the past in conversation, German uses the **Perfekt**: *haben* or *sein* in position 2, the **participle** at the end. Regular participles: *ge- + stem + -t* (*gemacht, gearbeitet*). Verbs of moving from A to B take *sein* and an *-en* participle (*ich bin gefahren, gegangen, gekommen*). For *sein* and *haben*, just use **war** and **hatte**.

## contrast.id
Bahasa Indonesia cukup menambah *kemarin* atau *sudah*: *kemarin aku kerja*. Bahasa Jerman wajib mengubah kata kerjanya: *Gestern **habe** ich **gearbeitet***. *Gestern ich arbeite* terdengar seperti bahasa yang belum jadi.

## contrast.en
Indonesian just adds *kemarin* (yesterday) or *sudah* (already): *kemarin aku kerja*. German must change the verb: *Gestern **habe** ich **gearbeitet***. *Gestern ich arbeite* sounds unfinished.
