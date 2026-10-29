---
id: easy2-03-koennen
rung: easy-2
order: 3
status: draft
minutes: 10
title: { id: "Bisa, harus, mau, boleh", en: "Can, must, want, may", de: "Ich kann gut schwimmen" }
summary:
  id: "Pakai kata kerja modal *können, müssen, wollen, dürfen*: modalnya di posisi 2, kata kerja kedua dalam bentuk dasar di akhir: *Ich kann gut schwimmen*."
  en: "Use the modal verbs *können, müssen, wollen, dürfen*: the modal in position 2, the second verb in its base form at the end: *Ich kann gut schwimmen*."
introduces: [a1-modals]
spiral: modals
visual: { id: verb-bracket, props: { verb: schwimmen, subject: ich, parts: ["gut"], modal: können, id: "Aku bisa berenang dengan baik." } }
examples:
  - { de: "Ich [[kann]] gut [[schwimmen]].", id: "Aku jago berenang." }
  - { de: "Du [[musst]] heute lange [[arbeiten]].", id: "Hari ini kamu harus kerja lama." }
  - { de: "Wir [[wollen]] am Samstag Fußball [[spielen]].", id: "Hari Sabtu kami mau main sepak bola." }
  - { de: "Hier [[darf]] man nicht [[rauchen]].", id: "Di sini nggak boleh merokok.", note: { id: "*Man* = orang (umum), seperti *dilarang merokok*. Kata kerjanya bentuk *er*: *man darf*.", en: "*Man* = one, people in general. The verb takes the *er* form: *man darf*." } }
  - { de: "[[Kannst]] du morgen [[kommen]]?", id: "Besok kamu bisa datang?" }
  - { de: "Ich [[muss]] um fünf Uhr [[aufstehen]].", id: "Aku harus bangun jam lima.", note: { id: "Dalam bentuk dasar di akhir, kata kerja terpisah menyatu lagi: *aufstehen*.", en: "As a base form at the end, a separable verb is joined again: *aufstehen*." } }
pair:
  off: "Ich kann sprechen Deutsch."
  natural: "Ich [[kann]] Deutsch [[sprechen]]."
work:
  situation: { id: "Hari pertama Fitri di panti werdha. Bu Becker menjelaskan aturan.", en: "Fitri's first day at a care home. Frau Becker explains the rules." }
  lines:
    - { who: Frau Becker, de: "Im Zimmer dürfen Sie nicht telefonieren.", id: "Di kamar pasien Anda tidak boleh bertelepon." }
    - { who: Fitri, de: "Kann ich in der Pause telefonieren?", id: "Kalau waktu istirahat, boleh saya bertelepon?" }
    - { who: Frau Becker, de: "Ja, natürlich. Die Pause ist um zehn Uhr.", id: "Ya, tentu. Istirahatnya jam sepuluh." }
    - { who: Fitri, de: "Gut. Und wann muss ich anfangen?", id: "Baik. Lalu saya harus mulai jam berapa?" }
words:
  id: "**Das Schwimmbad** = *schwimm(en)* (berenang) + *das Bad* (pemandian): kolam renang. Kata terakhir menentukan: *das*."
  en: "**Das Schwimmbad** = *schwimm(en)* (swim) + *das Bad* (bath): a swimming pool. The last word decides: *das*."
  compounds: [[Schwimm, Bad]]
talk:
  lines:
    - { who: Jonas, de: "Kannst du schwimmen?", id: "Kamu bisa berenang?" }
    - { who: Putu, de: "Ja, ich kann gut schwimmen. Ich komme aus Bali!", id: "Bisa, aku jago berenang. Aku dari Bali!" }
    - { who: Jonas, de: "Toll! Wollen wir am Sonntag schwimmen?", id: "Keren! Hari Minggu kita berenang, yuk?" }
tirukan: { de: "Ich kann gut schwimmen.", id: "Aku jago berenang." }
check:
  - id: e2-03-c1
    type: wordorder
    cue: "Hari ini aku harus kerja."
    tiles: [arbeiten, Ich, heute, muss]
    answer: [Ich, muss, heute, arbeiten]
    zones: [p1, verb, middle, end]
    why: { id: "*Muss* di posisi 2, *arbeiten* di akhir.", en: "*Muss* in position 2, *arbeiten* at the end." }
  - id: e2-03-c2
    type: form
    cue: "Kamu bisa masak dengan baik."
    base: können
    target: { person: du, tense: praesens }
    frame: "Du ___ gut kochen."
    options: [kannst, kann, könnst]
    answer: kannst
    why: { id: "*Können* berubah vokal: *ich kann, du kannst, er kann*.", en: "*Können* changes its vowel: *ich kann, du kannst, er kann*." }
  - id: e2-03-c3
    type: conjugate
    verb: müssen
    tense: praesens
    persons: [ich, du, er, wir]
    answers: { ich: muss, du: musst, er: muss, wir: müssen }
    why: { id: "*Ich* dan *er* sama dan tanpa akhiran: *muss*. Umlaut kembali di *wir müssen*.", en: "*Ich* and *er* are the same, with no ending: *muss*. The umlaut comes back in *wir müssen*." }
  - id: e2-03-c4
    type: gap
    cue: "Di sini nggak boleh parkir."
    prompt: "Hier ___ man nicht parken."
    options: [darf, dürfen, darfst]
    answer: darf
    why: { id: "*Man* memakai bentuk *er*: *man darf*.", en: "*Man* takes the *er* form: *man darf*." }
  - id: e2-03-c5
    type: fix
    wrong: "Ich will spielen Fußball."
    options: ["Ich will Fußball spielen.", "Ich will Fußball spiele."]
    answer: "Ich will Fußball spielen."
    why: { id: "Kata kerja kedua ke akhir, dalam bentuk dasar: *spielen*.", en: "The second verb goes to the end, in its base form: *spielen*." }
  - id: e2-03-c6
    type: listen
    audio: "Ich kann heute nicht kommen."
    options: ["Ich kann heute nicht kommen.", "Ich muss heute kommen."]
    answer: "Ich kann heute nicht kommen."
    why: { id: "*Kann … nicht* = tidak bisa; *muss* = harus.", en: "*Kann … nicht* = can't; *muss* = must." }
glossary:
  - { de: können, id: bisa; dapat, en: can, pos: verb, verb: { aux: haben, partizip: gekonnt } }
  - { de: müssen, id: harus, en: must; have to, pos: verb, verb: { aux: haben, partizip: gemusst } }
  - { de: wollen, id: mau; ingin, en: to want, pos: verb, verb: { aux: haben, partizip: gewollt } }
  - { de: dürfen, id: boleh, en: may; be allowed to, pos: verb, verb: { aux: haben, partizip: gedurft } }
  - { de: man, id: orang (umum), en: one; you (general), pos: pron }
  - { de: schwimmen, id: berenang, en: to swim, pos: verb, verb: { aux: sein, partizip: geschwommen } }
  - { de: rauchen, id: merokok, en: to smoke, pos: verb, verb: { aux: haben, partizip: geraucht } }
  - { de: parken, id: parkir, en: to park, pos: verb, verb: { aux: haben, partizip: geparkt } }
  - { de: telefonieren, id: bertelepon, en: to be on the phone, pos: verb, verb: { aux: haben, partizip: telefoniert } }
  - { de: lange, id: lama, en: for a long time, pos: adv }
  - { de: Pause, id: istirahat, en: break, pos: noun, gender: f, plural: Pausen }
  - { de: Schwimmbad, id: kolam renang, en: swimming pool, pos: noun, gender: n, plural: Schwimmbäder }
next: easy2-04-mich-dich
---

## concept.id
Kata kerja modal mengubah arti kata kerja lain: **können** (bisa), **müssen** (harus), **wollen** (mau), **dürfen** (boleh). Modalnya di posisi 2, kata kerja kedua dalam **bentuk dasar di akhir**: *Ich **kann** gut **schwimmen***. Bentuk *ich* dan *er* sama dan tanpa akhiran: *ich kann, er kann*.

## concept.en
Modal verbs change the meaning of another verb: **können** (can), **müssen** (must), **wollen** (want), **dürfen** (may). The modal is in position 2, the second verb in its **base form at the end**: *Ich **kann** gut **schwimmen***. The *ich* and *er* forms are the same, with no ending: *ich kann, er kann*.

## contrast.id
Dalam bahasa Indonesia, *bisa* dan kata kerjanya berdampingan: *aku bisa bicara bahasa Jerman*. Bahasa Jerman memisahkan keduanya: *Ich **kann** Deutsch **sprechen***. Hati-hati: *Ich muss nicht* artinya *aku tidak perlu*, bukan *aku tidak boleh* (itu *ich darf nicht*).

## contrast.en
In Indonesian, *bisa* and its verb sit side by side: *aku bisa bicara bahasa Jerman*. German pulls them apart: *Ich **kann** Deutsch **sprechen***. Careful: *Ich muss nicht* means *I don't have to*, not *I mustn't* (that's *ich darf nicht*).
