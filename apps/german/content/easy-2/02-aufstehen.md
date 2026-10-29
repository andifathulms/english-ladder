---
id: easy2-02-aufstehen
rung: easy-2
order: 2
status: draft
minutes: 10
title: { id: "Kata kerja terpisah", en: "Separable verbs", de: "Ich stehe um 6 Uhr auf" }
summary:
  id: "Pakai kata kerja terpisah: bagian depannya (*auf, an, ein, fern*) pindah ke akhir kalimat: *Ich stehe um 6 Uhr auf*."
  en: "Use separable verbs: the front part (*auf, an, ein, fern*) moves to the end of the sentence: *Ich stehe um 6 Uhr auf*."
introduces: [a1-separable]
spiral: separable
visual: { id: verb-bracket, props: { verb: aufstehen, subject: ich, parts: ["um 6 Uhr"], modal: null, id: "Aku bangun jam 6." } }
examples:
  - { de: "Ich [[stehe]] um sechs Uhr [[auf]].", id: "Aku bangun jam enam." }
  - { de: "Der Kurs [[fängt]] um neun Uhr [[an]].", id: "Kursusnya mulai jam sembilan.", note: { id: "*Anfangen* juga mengubah vokal: *ich fange an*, *er fängt an*.", en: "*Anfangen* also changes its vowel: *ich fange an*, *er fängt an*." } }
  - { de: "Am Samstag [[kaufe]] ich im Supermarkt [[ein]].", id: "Hari Sabtu aku belanja di supermarket." }
  - { de: "Rina [[ruft]] am Abend ihre Mutter [[an]].", id: "Malam hari Rina menelepon ibunya." }
  - { de: "Wann [[kommt]] der Zug [[an]]?", id: "Keretanya tiba kapan?" }
  - { de: "Am Sonntag [[sehen]] wir [[fern]].", id: "Hari Minggu kami nonton TV." }
pair:
  off: "Ich aufstehe um sechs Uhr."
  natural: "Ich [[stehe]] um sechs Uhr [[auf]]."
work:
  situation: { id: "Budi ikut Ausbildung montir. Pak Schmidt menjelaskan jam kerja di bengkel.", en: "Budi is training as a mechanic. Herr Schmidt explains the working hours in the workshop." }
  lines:
    - { who: Herr Schmidt, de: "Die Arbeit fängt um sieben Uhr an.", id: "Kerja mulai jam tujuh." }
    - { who: Budi, de: "Und wann haben wir Feierabend?", id: "Kalau pulangnya jam berapa, Pak?" }
    - { who: Herr Schmidt, de: "Um halb vier. Dann räumen wir die Werkstatt auf.", id: "Jam setengah empat. Lalu kita beres-beres bengkel." }
    - { who: Budi, de: "Alles klar, Herr Schmidt.", id: "Baik, Pak Schmidt." }
sound:
  focus: "tekanan di awalan"
  words: ["aufstehen", "anrufen", "einkaufen", "fernsehen"]
  tip:
    id: "Pada kata kerja terpisah, tekanannya di awalan: *AUFstehen*, *ANrufen*. Saat terpisah pun awalan di akhir kalimat tetap dibaca jelas: *Ich stehe um sechs AUF*."
    en: "In separable verbs the stress is on the prefix: *AUFstehen*, *ANrufen*. Even when it's split off, the prefix at the end is said clearly: *Ich stehe um sechs AUF*."
talk:
  lines:
    - { who: Siti, de: "Wann stehst du auf?", id: "Kamu bangun jam berapa?" }
    - { who: Wayan, de: "Um fünf. Ich bete und dann frühstücke ich.", id: "Jam lima. Aku salat, terus sarapan." }
    - { who: Siti, de: "So früh! Ich stehe um sieben auf.", id: "Pagi banget! Aku bangun jam tujuh." }
tirukan: { de: "Ich stehe um sechs Uhr auf.", id: "Aku bangun jam enam." }
check:
  - id: e2-02-c1
    type: wordorder
    cue: "Kursusnya mulai jam sembilan."
    tiles: [an, Der Kurs, um neun Uhr, fängt]
    answer: [Der Kurs, fängt, um neun Uhr, an]
    zones: [p1, verb, middle, end]
    why: { id: "*Fängt* di posisi 2, *an* lompat ke akhir.", en: "*Fängt* in position 2, *an* jumps to the end." }
  - id: e2-02-c2
    type: form
    cue: "Rina menelepon."
    base: anrufen
    target: { person: er, tense: praesens }
    frame: "Rina ___."
    answer: ruft an
    why: { id: "*Rina* = *sie*: *ruft*, dan *an* di akhir.", en: "*Rina* = *sie*: *ruft*, and *an* at the end." }
  - id: e2-02-c3
    type: conjugate
    verb: einkaufen
    tense: praesens
    persons: [ich, du, er, wir]
    answers: { ich: kaufe ein, du: kaufst ein, er: kauft ein, wir: kaufen ein }
    why: { id: "Akhirannya seperti biasa (*-e, -st, -t, -en*); *ein* selalu di belakang.", en: "The usual endings (*-e, -st, -t, -en*); *ein* always comes last." }
  - id: e2-02-c4
    type: fix
    wrong: "Ich aufstehe um sieben Uhr."
    options: ["Ich stehe um sieben Uhr auf.", "Ich stehe auf um sieben Uhr."]
    answer: "Ich stehe um sieben Uhr auf."
    why: { id: "Dalam kalimat utama, *auf* terpisah dan pergi ke paling akhir.", en: "In a main clause, *auf* separates and goes to the very end." }
  - id: e2-02-c5
    type: listen
    audio: "Wir sehen am Abend fern."
    options: ["Wir sehen am Abend fern.", "Wir sehen am Abend einen Film."]
    answer: "Wir sehen am Abend fern."
    why: { id: "*Fernsehen* = menonton TV; *fern* di akhir.", en: "*Fernsehen* = to watch TV; *fern* at the end." }
  - id: e2-02-c6
    type: gap
    cue: "Keretanya tiba jam delapan."
    prompt: "Der Zug kommt um acht Uhr ___."
    options: [an, auf, ein]
    answer: an
    why: { id: "*Ankommen* = tiba: *Der Zug kommt … an*.", en: "*Ankommen* = to arrive: *Der Zug kommt … an*." }
glossary:
  - { de: aufstehen, id: bangun (dari tempat tidur), en: to get up, pos: verb, sep: auf, verb: { aux: sein, partizip: aufgestanden } }
  - { de: anfangen, id: mulai, en: to begin, pos: verb, sep: an, verb: { aux: haben, partizip: angefangen } }
  - { de: einkaufen, id: berbelanja, en: to go shopping, pos: verb, sep: ein, verb: { aux: haben, partizip: eingekauft } }
  - { de: anrufen, id: menelepon, en: to phone, pos: verb, sep: an, verb: { aux: haben, partizip: angerufen } }
  - { de: ankommen, id: tiba, en: to arrive, pos: verb, sep: an, verb: { aux: sein, partizip: angekommen } }
  - { de: fernsehen, id: menonton TV, en: to watch TV, pos: verb, sep: fern, verb: { aux: haben, partizip: ferngesehen } }
  - { de: aufräumen, id: membereskan, en: to tidy up, pos: verb, sep: auf, verb: { aux: haben, partizip: aufgeräumt } }
  - { de: frühstücken, id: sarapan, en: to have breakfast, pos: verb, verb: { aux: haben, partizip: gefrühstückt } }
  - { de: beten, id: berdoa; salat, en: to pray, pos: verb, verb: { aux: haben, partizip: gebetet } }
  - { de: Feierabend, id: jam pulang kerja, en: end of the working day, pos: noun, gender: m, plural: Feierabende }
  - { de: Werkstatt, id: bengkel, en: workshop, pos: noun, gender: f, plural: Werkstätten }
  - { de: Alles klar, id: oke; beres, en: all right, pos: expr }
next: easy2-03-koennen
---

## concept.id
Banyak kata kerja punya awalan yang bisa lepas: *auf|stehen*, *an|rufen*, *ein|kaufen*, *fern|sehen*. Dalam kalimat, bagian utamanya di posisi 2 dan awalannya pergi ke **paling akhir**: *Ich **stehe** um sechs Uhr **auf***. Keduanya seperti penjepit (*Satzklammer*) yang mengapit bagian tengah kalimat.

## concept.en
Many verbs have a prefix that comes off: *auf|stehen*, *an|rufen*, *ein|kaufen*, *fern|sehen*. In a sentence the main part is in position 2 and the prefix goes to the **very end**: *Ich **stehe** um sechs Uhr **auf***. Together they work like a clamp (*Satzklammer*) around the middle of the sentence.

## contrast.id
Bahasa Indonesia tidak pernah memecah kata kerja: *bangun* tetap *bangun*. Karena itu orang Indonesia sering bilang *Ich aufstehe*. Dalam bahasa Jerman, awalan menunggu di akhir: dengarkan sampai kalimat selesai, karena *Ich rufe …* bisa jadi *an* (menelepon) atau *zurück* (menelepon balik).

## contrast.en
Indonesian never splits a verb: *bangun* stays *bangun*. That's why Indonesian speakers often say *Ich aufstehe*. In German the prefix waits at the end: listen until the sentence is over, because *Ich rufe …* can end in *an* (phone) or *zurück* (call back).
