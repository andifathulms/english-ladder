---
id: easy1-01-hola
rung: easy-1
order: 1
status: draft
minutes: 7
title: { id: "Halo! Kamu dan Anda", en: "Hello! Tú and usted", es: "¡Hola!" }
summary:
  id: "Sapa dengan *hola*, tanya kabar dengan *¿Cómo estás?* untuk teman dan *¿Cómo está usted?* untuk orang yang kamu hormati."
  en: "Greet with *hola*, ask how someone is with *¿Cómo estás?* for a friend and *¿Cómo está usted?* for someone you show respect to."
introduces: [a1-greetings]
spiral: register
worked:
  - { es: "¡Hola! ¿Cómo estás?", id: "Halo! Apa kabar?" }
  - { es: "Buenos días. ¿Cómo está usted?", id: "Selamat pagi. Apa kabar, Pak?" }
  - { es: "Muy bien, gracias. ¿Y tú?", id: "Baik sekali, terima kasih. Kamu?" }
examples:
  - { es: "¡[[Hola]], Lucía!", id: "Halo, Lucía!" }
  - { es: "Buenos días, [[señora]].", id: "Selamat pagi, Bu." }
  - { es: "¿Cómo [[estás]], Diego?", id: "Apa kabar, Diego?" }
  - { es: "¿Cómo [[está]] usted?", id: "Apa kabar, Bu?" }
  - { es: "[[Me llamo]] Rina. ¿Y tú?", id: "Namaku Rina. Kamu?" }
  - { es: "[[Mucho gusto]], Mateo.", id: "Senang berkenalan, Mateo." }
pair:
  off: "Buenos días, señor. ¿Cómo estás?"
  natural: "Buenos días, señor. ¿Cómo [[está]] usted?"
sound:
  focus: "h tidak dibaca"
  words: ["hola", "hasta luego"]
  tip:
    id: "*H* tidak pernah dibaca: *hola* terdengar seperti *ola*."
    en: "*H* is always silent: *hola* sounds like *ola*."
spain:
  rows:
    - { latam: "Hola, chicos. ¿Cómo están?", es: "Hola, chicos. ¿Cómo estáis?" }
  note:
    id: "Di Spanyol, *vosotros* (*estáis*) dipakai untuk 'kalian' yang akrab. Di Amerika Latin selalu *ustedes* (*están*). Cukup kenali saja."
    en: "In Spain, *vosotros* (*estáis*) is the friendly 'you all'. Latin America always uses *ustedes* (*están*). Just recognise it."
talk:
  lines:
    - { who: Lucía, es: "¡Hola! Me llamo Lucía. ¿Y tú?", id: "Halo! Namaku Lucía. Kamu?" }
    - { who: Budi, es: "Me llamo Budi. Mucho gusto.", id: "Namaku Budi. Senang berkenalan." }
    - { who: Lucía, es: "Mucho gusto, Budi. ¿Cómo estás?", id: "Senang berkenalan, Budi. Apa kabar?" }
    - { who: Budi, es: "Muy bien, gracias.", id: "Baik sekali, terima kasih." }
tirukan: { es: "¡Hola! Me llamo Rina. Mucho gusto.", id: "Halo! Namaku Rina. Senang berkenalan." }
check:
  - id: e1-01-c1
    type: gap
    cue: "Diego temanmu."
    prompt: "¿Cómo ___, Diego?"
    options: [estás, está]
    answer: estás
    why: { id: "Diego teman, jadi pakai *tú*: *¿Cómo estás?*", en: "Diego is a friend, so use *tú*: *¿Cómo estás?*" }
  - id: e1-01-c2
    type: gap
    cue: "Kamu menyapa ibu gurumu."
    prompt: "Buenos días, señora. ¿Cómo ___ usted?"
    options: [estás, está]
    answer: está
    why: { id: "Untuk orang yang kamu hormati, pakai *usted* dan *está*.", en: "For someone you show respect to, use *usted* and *está*." }
  - id: e1-01-c3
    type: choice
    lang: id
    prompt: "Apa arti *mucho gusto*?"
    options: ["senang berkenalan", "terima kasih", "sampai jumpa"]
    answer: "senang berkenalan"
    why: { id: "*Mucho gusto* diucapkan saat pertama kali bertemu seseorang.", en: "*Mucho gusto* is what you say when you first meet someone." }
  - id: e1-01-c4
    type: order
    cue: "Namaku Rina."
    tiles: [llamo, Rina, Me]
    answer: [Me, llamo, Rina]
    why: { id: "*Me llamo* + nama: secara harfiah 'aku memanggil diriku Rina'.", en: "*Me llamo* + name: literally 'I call myself Rina'." }
  - id: e1-01-c5
    type: listen
    audio: "Buenas noches."
    options: ["Buenas noches.", "Buenos días.", "Buenas tardes."]
    answer: "Buenas noches."
    why: { id: "*Buenas noches*: selamat malam, juga untuk pamit tidur.", en: "*Buenas noches*: good evening, and good night." }
  - id: e1-01-c6
    type: form
    cue: "Tanya kabar Diego, temanmu."
    base: estar
    target: { person: tu, tense: presente }
    frame: "¿Cómo ___, Diego?"
    answer: estás
    why: { id: "Untuk *tú*, *estar* menjadi *estás*, dengan aksen di *á*.", en: "With *tú*, *estar* becomes *estás*, with an accent on the *á*." }
glossary:
  - { es: hola, id: halo, pos: interj }
  - { es: adiós, id: "selamat tinggal", pos: interj }
  - { es: gracias, id: "terima kasih", pos: interj }
  - { es: buenos días, id: "selamat pagi", pos: expr }
  - { es: buenas tardes, id: "selamat siang, selamat sore", pos: expr }
  - { es: buenas noches, id: "selamat malam", pos: expr }
  - { es: mucho gusto, id: "senang berkenalan", pos: expr }
  - { es: hasta luego, id: "sampai nanti", pos: expr }
  - { es: tú, id: kamu, pos: pron }
  - { es: usted, id: "Anda, Bapak, Ibu", pos: pron }
  - { es: chico, id: "anak muda; teman-teman (sapaan)", pos: noun, gender: m }
  - { es: llamarse, id: bernama, pos: verb, verb: { group: ar, reflexive: true } }
next: null
---

## concept.id
Bahasa Spanyol punya dua cara menyapa satu orang. **Tú** untuk teman, keluarga dan anak muda, seperti *kamu*. **Usted** untuk orang yang lebih tua atau yang kamu hormati, seperti *Anda*, *Bapak* atau *Ibu*. Kata kerjanya ikut berubah: *¿Cómo estás?* untuk tú, *¿Cómo está usted?* untuk usted.

## concept.en
Spanish has two ways to address one person. **Tú** is for friends, family and young people, like Indonesian *kamu*. **Usted** is for older people or people you show respect to, like *Anda*, *Bapak* or *Ibu*. The verb changes with it: *¿Cómo estás?* for tú, *¿Cómo está usted?* for usted.

## contrast.id
Bahasa Indonesia hanya mengganti kata sapaannya: *kamu* jadi *Bapak*, kalimatnya tetap. Bahasa Spanyol juga mengubah kata kerjanya, jadi *señor* dengan *estás* terdengar janggal.

## contrast.en
Indonesian only swaps the form of address: *kamu* becomes *Bapak*, and the rest stays. Spanish changes the verb too, so *señor* with *estás* sounds off.
