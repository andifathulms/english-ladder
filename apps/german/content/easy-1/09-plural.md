---
id: easy1-09-plural
rung: easy-1
order: 9
status: draft
minutes: 9
title: { id: "Lebih dari satu", en: "More than one", de: "Ein Kind, zwei Kinder" }
summary:
  id: "Kenali pola jamak utama (*-e*, *-en*, *-er*, umlaut, *-s*), ingat bahwa artikel jamak selalu *die*, dan pakai bentuk jamak setelah angka."
  en: "Recognise the main plural patterns (*-e*, *-en*, *-er*, umlaut, *-s*), remember the plural article is always *die*, and use the plural after a number."
introduces: [a1-plural]
spiral: plural
worked:
  - { de: "der Tisch, die Tische", id: "meja, meja-meja" }
  - { de: "die Lampe, die Lampen", id: "lampu, lampu-lampu" }
  - { de: "das Kind, die Kinder", id: "anak, anak-anak" }
  - { de: "der Apfel, die Äpfel", id: "apel, apel-apel" }
  - { de: "das Auto, die Autos", id: "mobil, mobil-mobil" }
examples:
  - { de: "Ich habe zwei [[Kinder]].", id: "Aku punya dua anak." }
  - { de: "Die [[Äpfel]] sind lecker.", id: "Apelnya enak-enak." }
  - { de: "Wir haben drei [[Zimmer]].", id: "Kami punya tiga kamar.", note: { id: "Banyak kata berakhiran *-er* tidak berubah: *das Zimmer, die Zimmer*.", en: "Many nouns ending in *-er* don't change: *das Zimmer, die Zimmer*." } }
  - { de: "Die [[Autos]] sind neu.", id: "Mobil-mobilnya baru." }
  - { de: "Hier sind vier [[Stühle]].", id: "Ini ada empat kursi." }
  - { de: "Meine [[Brüder]] wohnen in Surabaya.", id: "Saudara-saudara laki-lakiku tinggal di Surabaya." }
pair:
  off: "Ich habe zwei Kind."
  natural: "Ich habe zwei [[Kinder]]."
sound:
  focus: "umlaut pada jamak"
  pairs: [["Apfel", "Äpfel"], ["Bruder", "Brüder"], ["Buch", "Bücher"]]
  tip:
    id: "Banyak bentuk jamak menambah umlaut. Dengarkan perubahannya: *a* → *ä* (seperti *e*), *u* → *ü* (*i* dengan bibir bulat)."
    en: "Many plurals add an umlaut. Listen for the change: *a* → *ä* (like *e*), *u* → *ü* (*i* with rounded lips)."
talk:
  lines:
    - { who: Budi, de: "Wie viele Kinder hast du?", id: "Anakmu berapa?" }
    - { who: Fitri, de: "Zwei Töchter. Und du?", id: "Dua, perempuan semua. Kamu?" }
    - { who: Budi, de: "Ich habe drei Kinder.", id: "Aku punya tiga anak." }
tirukan: { de: "Ich habe zwei Kinder.", id: "Aku punya dua anak." }
check:
  - id: e1-09-c1
    type: gap
    cue: "Aku punya tiga buku."
    prompt: "Ich habe drei ___."
    options: [Bücher, Buch, Buchs]
    answer: Bücher
    why: { id: "Setelah angka, pakai jamak: *das Buch, die Bücher* (umlaut + *-er*).", en: "After a number, use the plural: *das Buch, die Bücher* (umlaut + *-er*)." }
  - id: e1-09-c2
    type: gap
    cue: "Satu kursi, dua kursi."
    prompt: "Ein Stuhl, zwei ___."
    options: [Stühle, Stuhle, Stühlen]
    answer: Stühle
    why: { id: "*Der Stuhl, die Stühle*: umlaut + *-e*.", en: "*Der Stuhl, die Stühle*: umlaut + *-e*." }
  - id: e1-09-c3
    type: gap
    cue: "Lampu-lampunya baru."
    prompt: "Die Lampen ___ neu."
    options: [sind, ist]
    answer: sind
    why: { id: "Jamak memakai *sind*.", en: "The plural takes *sind*." }
  - id: e1-09-c4
    type: gap
    cue: "Anak-anak main sepak bola."
    prompt: "___ Kinder spielen Fußball."
    options: [Die, Das, Der]
    answer: Die
    why: { id: "Artikel jamak selalu *die*, juga untuk *das Kind*.", en: "The plural article is always *die*, also for *das Kind*." }
  - id: e1-09-c5
    type: listen
    audio: "Wir haben zwei Autos."
    options: ["Wir haben zwei Autos.", "Wir haben ein Auto."]
    answer: "Wir haben zwei Autos."
    why: { id: "Dengarkan *-s* di akhir: *Autos* = jamak.", en: "Listen for the *-s* at the end: *Autos* = plural." }
  - id: e1-09-c6
    type: dictation
    audio: "Die Äpfel sind lecker."
    answer: "Die Äpfel sind lecker."
    why: { id: "*Der Apfel, die Äpfel*: jamaknya hanya menambah umlaut.", en: "*Der Apfel, die Äpfel*: the plural only adds an umlaut." }
glossary:
  - { de: Kind, id: anak, pos: noun, gender: n, plural: Kinder }
  - { de: Buch, id: buku, pos: noun, gender: n, plural: Bücher }
  - { de: Apfel, id: apel, pos: noun, gender: m, plural: Äpfel }
  - { de: Auto, id: mobil, pos: noun, gender: n, plural: Autos }
  - { de: Banane, id: pisang, pos: noun, gender: f, plural: Bananen }
  - { de: Ei, id: telur, pos: noun, gender: n, plural: Eier }
  - { de: Hund, id: anjing, pos: noun, gender: m, plural: Hunde }
  - { de: lecker, id: enak, pos: adj }
  - { de: "wie viele", id: berapa (banyak), pos: expr }
next: easy1-10-akkusativ
---

## concept.id
Bentuk jamak bahasa Jerman punya beberapa pola: *-e* (Tische), *-en/-n* (Lampen), *-er* dengan umlaut (Bücher), umlaut saja (Äpfel), *-s* (Autos), atau tanpa perubahan (Zimmer). Artikel jamak selalu **die**, apa pun jenisnya. Hafalkan jamaknya bersama kata bendanya: *das Kind, die Kinder*.

## concept.en
German plurals follow a few patterns: *-e* (Tische), *-en/-n* (Lampen), *-er* with an umlaut (Bücher), an umlaut alone (Äpfel), *-s* (Autos), or no change (Zimmer). The plural article is always **die**, whatever the gender. Learn the plural with the noun: *das Kind, die Kinder*.

## contrast.id
Bahasa Indonesia mengulang kata (*anak-anak*) atau cukup memakai angka (*dua anak*). Bahasa Jerman selalu memakai bentuk jamak setelah angka: *zwei Kinder*, bukan *zwei Kind*. Satu petunjuk yang hampir pasti: kata *die* berakhiran *-e* biasanya jamaknya *-n* (*die Lampe, die Lampen*).

## contrast.en
Indonesian repeats the word (*anak-anak*) or just uses the number (*dua anak*). German always uses the plural after a number: *zwei Kinder*, not *zwei Kind*. One near-safe clue: *die* nouns ending in *-e* usually add *-n* (*die Lampe, die Lampen*).
