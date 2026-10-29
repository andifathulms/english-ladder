---
id: easy1-02-ich-heisse
rung: easy-1
order: 2
status: draft
minutes: 8
title: { id: "Namaku …, aku dari …", en: "My name is …, I'm from …", de: "Ich heiße …" }
summary:
  id: "Perkenalkan diri dengan *Ich heiße …*, *Ich komme aus …* dan *Ich bin …*, dan pakai *sein* (bin, bist, ist, sind) dengan benar."
  en: "Introduce yourself with *Ich heiße …*, *Ich komme aus …* and *Ich bin …*, and use *sein* (bin, bist, ist, sind) correctly."
introduces: [a1-sein-heissen]
spiral: register
worked:
  - { de: "Ich heiße Rina.", id: "Namaku Rina." }
  - { de: "Ich komme aus Indonesien.", id: "Aku dari Indonesia." }
  - { de: "Ich bin Studentin.", id: "Aku mahasiswi." }
examples:
  - { de: "Ich [[heiße]] Budi.", id: "Namaku Budi." }
  - { de: "Wie [[heißt]] du?", id: "Siapa namamu?" }
  - { de: "Wie [[heißen]] Sie?", id: "Siapa nama Anda?" }
  - { de: "Ich [[komme]] aus Bandung.", id: "Aku dari Bandung." }
  - { de: "Dewi [[ist]] Lehrerin.", id: "Dewi guru.", note: { id: "Pekerjaan disebut tanpa *ein*: *Lehrerin*, bukan *eine Lehrerin*.", en: "Jobs take no *ein*: *Lehrerin*, not *eine Lehrerin*." } }
  - { de: "Wir [[sind]] in Hamburg.", id: "Kami di Hamburg." }
pair:
  off: "Ich Studentin."
  natural: "Ich [[bin]] Studentin."
work:
  situation: { id: "Hari pertama Ausbildung. Rina melapor di bagian administrasi.", en: "First day of the Ausbildung. Rina reports to the office." }
  lines:
    - { who: Frau Becker, de: "Guten Tag! Wie heißen Sie?", id: "Selamat siang! Siapa nama Anda?" }
    - { who: Rina, de: "Ich heiße Rina Lestari.", id: "Nama saya Rina Lestari." }
    - { who: Frau Becker, de: "Woher kommen Sie?", id: "Anda dari mana?" }
    - { who: Rina, de: "Ich komme aus Indonesien, aus Balikpapan.", id: "Saya dari Indonesia, dari Balikpapan." }
talk:
  lines:
    - { who: Andi, de: "Hallo! Ich bin Andi. Wie heißt du?", id: "Halo! Aku Andi. Namamu siapa?" }
    - { who: Lena, de: "Ich heiße Lena. Woher kommst du?", id: "Aku Lena. Kamu dari mana?" }
    - { who: Andi, de: "Ich komme aus Indonesien. Und du?", id: "Aku dari Indonesia. Kamu?" }
    - { who: Lena, de: "Ich komme aus Köln.", id: "Aku dari Köln." }
tirukan: { de: "Ich heiße Rina. Ich komme aus Indonesien.", id: "Namaku Rina. Aku dari Indonesia." }
check:
  - id: e1-02-c1
    type: form
    cue: "Siapa namamu?"
    base: heißen
    target: { person: du, tense: praesens }
    frame: "Wie ___ du?"
    options: [heißt, heißen, heiße]
    answer: heißt
    why: { id: "*Du* memakai akhiran *-st*, tapi *heiß-* sudah berakhir *ß*, jadi cukup *heißt*.", en: "*Du* takes *-st*, but *heiß-* already ends in *ß*, so it's just *heißt*." }
  - id: e1-02-c2
    type: conjugate
    verb: sein
    tense: praesens
    persons: [ich, du, er, wir]
    answers: { ich: bin, du: bist, er: ist, wir: sind }
    why: { id: "*Sein* tidak beraturan: *ich bin, du bist, er ist, wir sind*. Hafalkan saja.", en: "*Sein* is irregular: *ich bin, du bist, er ist, wir sind*. Just learn it." }
  - id: e1-02-c3
    type: gap
    cue: "Aku dari Surabaya."
    prompt: "Ich komme ___ Surabaya."
    options: [aus, in, nach]
    answer: aus
    why: { id: "Asal: *kommen aus*. *In* artinya *di*.", en: "Where you're from: *kommen aus*. *In* means *in*." }
  - id: e1-02-c4
    type: fix
    cue: "Budi montir."
    wrong: "Budi Mechaniker."
    options: ["Budi ist Mechaniker.", "Budi bist Mechaniker."]
    answer: "Budi ist Mechaniker."
    why: { id: "Bahasa Jerman butuh kata kerja: *Budi ist …*. *Bist* hanya untuk *du*.", en: "German needs a verb: *Budi ist …*. *Bist* is only for *du*." }
  - id: e1-02-c5
    type: listen
    audio: "Wie heißen Sie?"
    options: ["Wie heißen Sie?", "Wie heißt du?"]
    answer: "Wie heißen Sie?"
    why: { id: "*Heißen Sie* untuk orang yang kamu sapa *Sie*; *heißt du* untuk teman.", en: "*Heißen Sie* for someone you call *Sie*; *heißt du* for a friend." }
glossary:
  - { de: sein, id: "adalah; berada", pos: verb, verb: { aux: sein, partizip: gewesen } }
  - { de: heißen, id: bernama, pos: verb, verb: { aux: haben, partizip: geheißen } }
  - { de: kommen, id: datang, pos: verb, verb: { aux: sein, partizip: gekommen } }
  - { de: aus, id: "dari (asal)", pos: prep }
  - { de: woher, id: dari mana, pos: adv }
  - { de: Name, id: nama, pos: noun, gender: m, plural: Namen }
  - { de: Student, id: mahasiswa, pos: noun, gender: m, plural: Studenten }
  - { de: Studentin, id: mahasiswi, pos: noun, gender: f, plural: Studentinnen }
  - { de: Lehrer, id: guru, pos: noun, gender: m, plural: Lehrer }
  - { de: Lehrerin, id: guru (perempuan), pos: noun, gender: f, plural: Lehrerinnen }
  - { de: Mechaniker, id: montir, pos: noun, gender: m, plural: Mechaniker }
  - { de: Krankenschwester, id: perawat (perempuan), pos: noun, gender: f, plural: Krankenschwestern }
next: easy1-03-ich-wohne
---

## concept.id
Untuk memperkenalkan diri ada tiga kalimat: *Ich heiße …* (namaku …), *Ich komme aus …* (aku dari …) dan *Ich bin …* (aku …). **Sein** berubah menurut orangnya: *ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind*. Pekerjaan disebut tanpa artikel: *Ich bin Lehrerin.*

## concept.en
Three sentences introduce you: *Ich heiße …* (my name is …), *Ich komme aus …* (I'm from …) and *Ich bin …* (I am …). **Sein** changes with the person: *ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind*. Jobs take no article: *Ich bin Lehrerin.*

## contrast.id
Bahasa Indonesia cukup bilang *Aku mahasiswi*, tanpa kata kerja. Bahasa Jerman selalu butuh kata kerja: *Ich **bin** Studentin.* Tanpa *bin*, kalimatnya belum lengkap.

## contrast.en
Indonesian just says *Aku mahasiswi*, with no verb. German always needs a verb: *Ich **bin** Studentin.* Without *bin*, the sentence isn't complete.
