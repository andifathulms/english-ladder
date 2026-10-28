---
id: easy2-12-un-dia
rung: easy-2
order: 12
status: draft
minutes: 10
title: { id: "Satu hari utuh", en: "A whole day", es: "Un día normal" }
summary:
  id: "Satu hari dari pagi sampai malam, dengan semua yang dipelajari di Easy 2: rutinitas, jam, *ir a*, *gustar*, dan perintah."
  en: "A day from morning to night with everything from Easy 2: routines, the time, *ir a*, *gustar* and commands."
introduces: [a1-review]
spiral: present
worked:
  - { es: "Me levanto a las seis y desayuno.", id: "Aku bangun jam enam dan sarapan." }
  - { es: "Por la tarde voy al mercado.", id: "Sore hari aku ke pasar." }
  - { es: "Por la noche ceno en casa.", id: "Malam hari aku makan malam di rumah." }
examples:
  - { es: "El lunes [[me levanto]] temprano.", id: "Hari Senin aku bangun pagi." }
  - { es: "Al mediodía [[almuerzo]] con mis compañeros.", id: "Siang hari aku makan bersama rekan kerja." }
  - { es: "Por la tarde [[voy al]] gimnasio.", id: "Sore hari aku ke gym." }
  - { es: "Me [[gusta]] cocinar por la noche.", id: "Aku suka masak malam-malam." }
  - { es: "Antes de dormir, [[rezo]].", id: "Sebelum tidur, aku salat." }
  - { es: "[[Quisiera]] más tiempo libre.", id: "Aku ingin lebih banyak waktu luang." }
pair:
  off: "Yo levanto, desayuno y voy trabajar."
  natural: "Me levanto, desayuno y [[voy a]] trabajar."
talk:
  lines:
    - { who: Valentina, es: "¿Cómo es un día normal para ti?", id: "Hari biasa buatmu kayak gimana?" }
    - { who: Budi, es: "Me levanto a las cinco y voy a la mezquita.", id: "Aku bangun jam lima dan pergi ke masjid." }
    - { who: Valentina, es: "¿Y después?", id: "Terus?" }
    - { who: Budi, es: "Desayuno, me ducho y salgo a las siete.", id: "Sarapan, mandi, lalu berangkat jam tujuh." }
tirukan: { es: "Me levanto, desayuno y salgo a las siete.", id: "Aku bangun, sarapan, lalu berangkat jam tujuh." }
check:
  - id: e2-12-c1
    type: gap
    cue: "Hari Senin aku bangun pagi."
    prompt: "El lunes ___ levanto temprano."
    options: [me, se, te]
    answer: me
    why: { id: "*Yo* → *me levanto*.", en: "*Yo* → *me levanto*." }
  - id: e2-12-c2
    type: gap
    cue: "Aku suka taco."
    prompt: "Me ___ los tacos."
    options: [gustan, gusta]
    answer: gustan
    why: { id: "*Los tacos* jamak: *gustan*.", en: "*Los tacos* is plural: *gustan*." }
  - id: e2-12-c3
    type: form
    cue: "Siang hari aku makan bersama rekan kerja."
    base: almorzar
    target: { person: yo, tense: presente }
    frame: "Al mediodía ___ con mis compañeros."
    answer: almuerzo
    why: { id: "*Almorzar* → *almuerzo* (o → ue).", en: "*Almorzar* → *almuerzo* (o → ue)." }
  - id: e2-12-c4
    type: gap
    cue: "Jam setengah delapan."
    prompt: "___ las siete y media."
    options: [Son, Es]
    answer: Son
    why: { id: "Jam selain satu: *son las…*", en: "Any hour but one: *son las…*" }
  - id: e2-12-c5
    type: gap
    cue: "Belok kanan di sudut jalan."
    prompt: "___ a la derecha en la esquina."
    options: [Gira, Giras, Girar]
    answer: Gira
    why: { id: "Perintah untuk *tú*: *gira*.", en: "A *tú* command: *gira*." }
  - id: e2-12-c6
    type: dictation
    audio: "Voy a cocinar por la noche."
    answer: "Voy a cocinar por la noche."
    why: { id: "*Ir a* + kata kerja dasar untuk rencana.", en: "*Ir a* + infinitive for a plan." }
glossary:
  - { es: compañero, id: "rekan, teman (kerja, sekolah)", pos: noun, gender: m }
  - { es: gimnasio, id: "gym, pusat kebugaran", pos: noun, gender: m }
  - { es: mezquita, id: masjid, pos: noun, gender: f }
  - { es: normal, id: biasa, pos: adj }
  - { es: libre, id: "bebas, kosong", pos: adj }
  - { es: noche, id: malam, pos: noun, gender: f }
  - { es: día, id: hari, pos: noun, gender: m }
  - { es: desayunar, id: sarapan, pos: verb, verb: { group: ar } }
  - { es: cenar, id: "makan malam", pos: verb, verb: { group: ar } }
next: null
---

## concept.id
Pelajaran ini mengulang Easy 2 lewat satu hari: kata kerja refleksif (*me levanto*), akar yang berubah (*almuerzo*), jam (*a las siete*), rencana (*voy a cocinar*) dan *me gusta*. Ceritakan harimu sendiri dengan kalimat-kalimat ini.

## concept.en
This lesson reviews Easy 2 through one day: reflexive verbs (*me levanto*), changing stems (*almuerzo*), the time (*a las siete*), plans (*voy a cocinar*) and *me gusta*. Tell your own day with these sentences.

## contrast.id
Dalam bahasa Indonesia, *aku bangun, sarapan, lalu berangkat* tidak berubah untuk orang lain. Di bahasa Spanyol setiap kata kerja ikut orangnya: *Budi se levanta, desayuna y sale*.

## contrast.en
In Indonesian, *aku bangun, sarapan, lalu berangkat* stays the same for anyone. In Spanish every verb follows the person: *Budi se levanta, desayuna y sale*.
