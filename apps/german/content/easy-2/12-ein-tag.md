---
id: easy2-12-ein-tag
rung: easy-2
order: 12
status: draft
minutes: 12
title: { id: "Satu hari utuh", en: "A whole day", de: "Mein Alltag in Hamburg" }
summary:
  id: "Ceritakan satu hari penuh dengan semua yang sudah kamu pelajari: jam, kata kerja terpisah dan modal, datif, perintah dan Perfekt. Ulangan untuk level A1."
  en: "Describe a whole day with everything you've learnt: times, separable and modal verbs, the dative, commands and the Perfekt. A review for the A1 level."
introduces: [a1-review]
spiral: word-order
worked:
  - { de: "Mein Wecker klingelt um halb sechs.", id: "Wekerku berbunyi jam setengah enam." }
  - { de: "Ich stehe auf. Dann frühstücke ich.", id: "Aku bangun. Lalu aku sarapan." }
  - { de: "Ich fahre mit der U-Bahn zur Arbeit.", id: "Aku naik kereta bawah tanah ke tempat kerja." }
  - { de: "Um sieben muss ich anfangen.", id: "Jam tujuh aku harus mulai." }
  - { de: "Nach der Arbeit kaufe ich im Supermarkt ein.", id: "Sesudah kerja aku belanja di supermarket." }
  - { de: "Am Abend rufe ich meine Familie an.", id: "Malam hari aku menelepon keluargaku." }
examples:
  - { de: "Ich [[stehe]] um halb sechs [[auf]].", id: "Aku bangun jam setengah enam." }
  - { de: "Ich [[muss]] um sieben Uhr [[anfangen]].", id: "Aku harus mulai jam tujuh." }
  - { de: "Ich fahre [[mit der]] U-Bahn zur Arbeit.", id: "Aku naik kereta bawah tanah ke tempat kerja." }
  - { de: "Nach der Arbeit [[kaufe]] ich im Supermarkt [[ein]].", id: "Sesudah kerja aku belanja di supermarket." }
  - { de: "Gestern [[habe]] ich bis neun Uhr [[gearbeitet]].", id: "Kemarin aku kerja sampai jam sembilan." }
  - { de: "[[Ruf]] mich heute Abend [[an]]!", id: "Telepon aku nanti malam, ya!" }
pair:
  off: "Nach der Arbeit ich kaufe ein."
  natural: "Nach der Arbeit [[kaufe]] ich [[ein]]."
work:
  situation: { id: "Sif Rina selesai. Dia pamit kepada Bu Becker.", en: "Rina's shift is over. She says goodbye to Frau Becker." }
  lines:
    - { who: Rina, de: "Frau Becker, ich habe jetzt Feierabend.", id: "Bu Becker, saya sudah selesai sif." }
    - { who: Frau Becker, de: "Danke, Rina. Wann kommen Sie morgen?", id: "Terima kasih, Rina. Besok Anda datang jam berapa?" }
    - { who: Rina, de: "Morgen habe ich Spätschicht. Ich komme um zwei.", id: "Besok saya sif siang. Saya datang jam dua." }
    - { who: Frau Becker, de: "Gut. Bis morgen!", id: "Baik. Sampai besok!" }
talk:
  lines:
    - { who: Rina, de: "Hallo Mama! Wie geht es dir?", id: "Halo, Ma! Apa kabar?" }
    - { who: Mama, de: "Gut! Was hast du heute gemacht?", id: "Baik! Hari ini kamu ngapain aja?" }
    - { who: Rina, de: "Ich habe gearbeitet und Deutsch gelernt. Jetzt habe ich endlich Feierabend!", id: "Aku kerja dan belajar bahasa Jerman. Sekarang akhirnya aku bebas!" }
tirukan: { de: "Ich stehe um halb sechs auf.", id: "Aku bangun jam setengah enam." }
check:
  - id: e2-12-c1
    type: wordorder
    cue: "Hari Sabtu aku belanja di supermarket."
    tiles: [ein, Am Samstag, kaufe, ich, im Supermarkt]
    answer: [Am Samstag, kaufe, ich, im Supermarkt, ein]
    zones: [p1, verb, middle, middle, end]
    why: { id: "*Kaufe* di posisi 2, *ein* di paling akhir.", en: "*Kaufe* in position 2, *ein* at the very end." }
  - id: e2-12-c2
    type: form
    base: müssen
    target: { person: du, tense: praesens }
    frame: "Du ___ heute lange arbeiten."
    options: [musst, muss, müsst]
    answer: musst
    why: { id: "*Du musst*; *arbeiten* di akhir dalam bentuk dasar.", en: "*Du musst*; *arbeiten* at the end in its base form." }
  - id: e2-12-c3
    type: case
    cue: "Aku naik trem."
    sentence: "Ich fahre mit ___ Straßenbahn."
    role: dat
    noun: Straßenbahn
    options: [der, die, dem]
    answer: der
    why: { id: "*Mit* + datif; *die Straßenbahn* → *mit der Straßenbahn*.", en: "*Mit* + dative; *die Straßenbahn* → *mit der Straßenbahn*." }
  - id: e2-12-c4
    type: listen
    prompt: "Wo fährt der Zug ab?"
    audio: "Der Zug nach Hamburg fährt heute von Gleis fünf ab."
    options: ["Der Zug nach Hamburg fährt heute von Gleis fünf ab.", "Der Zug nach Hamburg fährt heute von Gleis neun ab."]
    answer: "Der Zug nach Hamburg fährt heute von Gleis fünf ab."
    why: { id: "*Fünf* = 5, *neun* = 9. *Abfahren* = berangkat: *fährt … ab*.", en: "*Fünf* = 5, *neun* = 9. *Abfahren* = to depart: *fährt … ab*." }
  - id: e2-12-c5
    type: choice
    cue: "Kamu menulis kepada Lena: sayangnya hari ini kamu nggak bisa datang."
    prompt: "Welcher Satz ist richtig?"
    options: ["Ich kann heute leider nicht kommen.", "Ich kann heute leider nicht komme.", "Ich heute kann leider nicht kommen."]
    answer: "Ich kann heute leider nicht kommen."
    why: { id: "*Kann* di posisi 2, *kommen* di akhir dalam bentuk dasar.", en: "*Kann* in position 2, *kommen* at the end in its base form." }
  - id: e2-12-c6
    type: dictation
    audio: "Gestern war ich sehr müde."
    answer: "Gestern war ich sehr müde."
    why: { id: "*Gestern* di posisi 1, *war* di posisi 2, lalu *ich*.", en: "*Gestern* in position 1, *war* in position 2, then *ich*." }
glossary:
  - { de: Alltag, id: keseharian, en: everyday life, pos: noun, gender: m, plural: "—" }
  - { de: Wecker, id: jam weker, en: alarm clock, pos: noun, gender: m, plural: Wecker }
  - { de: klingeln, id: berdering, en: to ring, pos: verb, verb: { aux: haben, partizip: geklingelt } }
  - { de: Satz, id: kalimat, en: sentence, pos: noun, gender: m, plural: Sätze }
  - { de: endlich, id: akhirnya, en: at last, pos: adv }
  - { de: leider, id: sayangnya, en: unfortunately, pos: adv }
  - { de: Bis morgen!, id: sampai besok!, en: see you tomorrow!, pos: expr }
  - { de: Liebe …, id: "… yang baik (pembuka pesan, untuk perempuan)", en: "Dear … (to a woman)", pos: expr }
  - { de: Lieber …, id: "… yang baik (pembuka pesan, untuk laki-laki)", en: "Dear … (to a man)", pos: expr }
  - { de: Viele Grüße, id: salam (penutup pesan), en: best wishes, pos: expr }
next: null
---

## concept.id
Satu hari, semua alat A1: jam (*um halb sechs*), kata kerja terpisah (*ich stehe auf*), modal (*ich muss anfangen*), datif (*mit der U-Bahn*), perintah (*Ruf mich an!*) dan Perfekt (*ich habe gearbeitet*). Aturan yang mengikat semuanya: **kata kerja di posisi 2**, bagian kedua di **akhir**. Pesan pendek dibuka dengan *Liebe Lena,* / *Lieber Jonas,* dan ditutup *Viele Grüße*.

## concept.en
One day, every A1 tool: times (*um halb sechs*), separable verbs (*ich stehe auf*), modals (*ich muss anfangen*), the dative (*mit der U-Bahn*), commands (*Ruf mich an!*) and the Perfekt (*ich habe gearbeitet*). The rule that ties them together: **the verb in position 2**, the second part at the **end**. A short message opens with *Liebe Lena,* / *Lieber Jonas,* and closes with *Viele Grüße*.

## contrast.id
Dalam bahasa Indonesia, kata kerja cukup satu dan urutannya bebas: *habis kerja aku belanja*. Bahasa Jerman membangun penjepit: *Nach der Arbeit **kaufe** ich im Supermarkt **ein***. Kalau kamu bisa membuat kalimat ini tanpa berpikir lama, kamu siap untuk ujian A1.

## contrast.en
In Indonesian one verb is enough and the order is free: *habis kerja aku belanja*. German builds a clamp: *Nach der Arbeit **kaufe** ich im Supermarkt **ein***. If you can make this sentence without thinking for long, you're ready for the A1 exam.
