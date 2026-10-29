---
id: easy1-10-akkusativ
rung: easy-1
order: 10
status: draft
minutes: 10
title: { id: "Objek: den, einen, keinen", en: "The object: den, einen, keinen", de: "Ich habe einen Bruder" }
summary:
  id: "Untuk objek kata benda maskulin, *der* menjadi *den* dan *ein* menjadi *einen*: *Ich habe einen Bruder*. *Die*, *das* dan jamak tidak berubah."
  en: "For a masculine object, *der* becomes *den* and *ein* becomes *einen*: *Ich habe einen Bruder*. *Die*, *das* and plurals don't change."
introduces: [a1-accusative]
spiral: cases
visual: { id: case-machine, props: { verb: haben, indef: true, nouns: { nom: [Mann, Frau, Kind], akk: [Bruder, Hund, Computer, Schwester, Katze, Auto, Fahrrad] } } }
examples:
  - { de: "Ich habe [[einen]] Bruder.", id: "Aku punya satu saudara laki-laki." }
  - { de: "Wir kaufen [[den]] Tisch.", id: "Kami beli mejanya." }
  - { de: "Ich habe [[keinen]] Kühlschrank.", id: "Aku nggak punya kulkas." }
  - { de: "Siehst du [[den]] Bus?", id: "Kamu lihat busnya?" }
  - { de: "Rina trinkt [[einen]] Kaffee.", id: "Rina minum kopi." }
  - { de: "Ich kaufe [[eine]] Lampe.", id: "Aku beli lampu.", note: { id: "*Eine* tetap *eine*: hanya maskulin yang berubah.", en: "*Eine* stays *eine*: only the masculine changes." } }
pair:
  off: "Ich habe ein Bruder."
  natural: "Ich habe [[einen]] Bruder."
work:
  situation: { id: "Di bangsal, Wayan membantu perawat senior menyiapkan kamar pasien.", en: "On the ward, Wayan helps a senior nurse get a patient's room ready." }
  lines:
    - { who: Frau Becker, de: "Haben Sie den Schlüssel?", id: "Kuncinya ada di Anda?" }
    - { who: Wayan, de: "Ja, ich habe den Schlüssel.", id: "Ya, kuncinya ada di saya." }
    - { who: Frau Becker, de: "Gut. Der Patient braucht einen Tee.", id: "Bagus. Pasiennya perlu teh." }
    - { who: Wayan, de: "Kein Problem. Ich mache den Tee.", id: "Tidak masalah. Saya buatkan tehnya." }
talk:
  lines:
    - { who: Andi, de: "Hast du einen Computer?", id: "Kamu punya komputer?" }
    - { who: Mei, de: "Nein, ich habe keinen Computer. Ich habe ein Handy.", id: "Nggak, aku nggak punya komputer. Aku punya HP." }
tirukan: { de: "Ich habe einen Bruder.", id: "Aku punya satu saudara laki-laki." }
check:
  - id: e1-10-c1
    type: case
    cue: "Kami beli kulkas."
    sentence: "Wir kaufen ___ Kühlschrank."
    role: akk
    noun: Kühlschrank
    options: [einen, ein, eine]
    answer: einen
    why: { id: "*Der Kühlschrank* adalah objek (WEN? WAS?), jadi *ein* → *einen*.", en: "*Der Kühlschrank* is the object (WEN? WAS?), so *ein* → *einen*." }
  - id: e1-10-c2
    type: case
    cue: "Aku lihat busnya."
    sentence: "Ich sehe ___ Bus."
    role: akk
    noun: Bus
    options: [den, der, das]
    answer: den
    why: { id: "*Der Bus* sebagai objek → *den Bus*.", en: "*Der Bus* as the object → *den Bus*." }
  - id: e1-10-c3
    type: case
    cue: "Siti nggak punya mobil."
    sentence: "Siti hat ___ Auto."
    role: akk
    noun: Auto
    options: [kein, keinen, keine]
    answer: kein
    why: { id: "*Das Auto* netral: tidak berubah, tetap *kein*.", en: "*Das Auto* is neuter: no change, still *kein*." }
  - id: e1-10-c4
    type: fix
    cue: "Aku perlu komputer."
    wrong: "Ich brauche ein Computer."
    options: ["Ich brauche einen Computer.", "Ich brauche einer Computer."]
    answer: "Ich brauche einen Computer."
    why: { id: "*Der Computer* adalah objek dari *brauche*: *einen Computer*.", en: "*Der Computer* is the object of *brauche*: *einen Computer*." }
  - id: e1-10-c5
    type: wordorder
    cue: "Kopinya aku minum sekarang."
    tiles: [trinke, ich, Den Kaffee, jetzt]
    answer: [Den Kaffee, trinke, ich, jetzt]
    zones: [p1, verb, middle, middle]
    why: { id: "*Den* menandai objek, jadi objek boleh di depan. Kata kerja tetap di posisi 2.", en: "*Den* marks the object, so the object can go first. The verb stays in position 2." }
  - id: e1-10-c6
    type: listen
    audio: "Ich habe keinen Hund."
    options: ["Ich habe keinen Hund.", "Ich habe einen Hund."]
    answer: "Ich habe keinen Hund."
    why: { id: "*Keinen* = tidak punya; *einen* = punya satu.", en: "*Keinen* = not any; *einen* = one." }
glossary:
  - { de: sehen, id: melihat, pos: verb, verb: { aux: haben, partizip: gesehen } }
  - { de: trinken, id: minum, pos: verb, verb: { aux: haben, partizip: getrunken } }
  - { de: kaufen, id: membeli, pos: verb, verb: { aux: haben, partizip: gekauft } }
  - { de: Bus, id: bus, pos: noun, gender: m, plural: Busse }
  - { de: Computer, id: komputer, pos: noun, gender: m, plural: Computer }
  - { de: Schlüssel, id: kunci, pos: noun, gender: m, plural: Schlüssel }
  - { de: Tee, id: teh, pos: noun, gender: m, plural: Tees }
  - { de: Patient, id: pasien, pos: noun, gender: m, plural: Patienten }
  - { de: Patientin, id: pasien (perempuan), pos: noun, gender: f, plural: Patientinnen }
  - { de: brauchen, id: perlu, pos: verb, verb: { aux: haben, partizip: gebraucht } }
  - { de: "Kein Problem", id: tidak masalah, pos: expr }
next: easy1-11-einkaufen
---

## concept.id
Objek kalimat (yang ditanya dengan *wen?* atau *was?*) memakai kasus akusatif (*Akkusativ*). Kabar baiknya: hanya maskulin yang berubah. *Der* → **den**, *ein* → **einen**, *kein* → **keinen**. *Die*, *das* dan jamak tetap sama.

## concept.en
The object of a sentence (asked with *wen?* or *was?*) is in the accusative case (*Akkusativ*). The good news: only the masculine changes. *Der* → **den**, *ein* → **einen**, *kein* → **keinen**. *Die*, *das* and plurals stay the same.

## contrast.id
Bahasa Indonesia menunjukkan subjek dan objek lewat urutan kata: *Rina minum kopi*. Bahasa Jerman menandainya di artikel, jadi urutannya bisa lebih bebas: *Den Kaffee trinkt Rina* tetap berarti Rina yang minum. *Ich habe ein Bruder* terdengar salah bagi orang Jerman.

## contrast.en
Indonesian shows subject and object by word order: *Rina minum kopi*. German marks them on the article, so the order can be freer: *Den Kaffee trinkt Rina* still means Rina is drinking. *Ich habe ein Bruder* sounds wrong to a German speaker.
