---
id: easy1-11-mi-familia
rung: easy-1
order: 11
status: draft
minutes: 9
title: { id: "Keluarga dan milik: mi, tu, su", en: "Family and possessives: mi, tu, su", es: "Mi familia" }
summary:
  id: "*Mi*, *tu*, *su*, *nuestro* di depan kata benda, dan jamaknya *mis*, *tus*, *sus*, *nuestros*."
  en: "*Mi*, *tu*, *su*, *nuestro* before the noun, and their plurals *mis*, *tus*, *sus*, *nuestros*."
introduces: [a1-possessives]
spiral: agreement
worked:
  - { es: "mi madre, mis padres", id: "ibuku, orang tuaku" }
  - { es: "tu hermano, tus hermanos", id: "saudaramu, saudara-saudaramu" }
  - { es: "nuestra casa, nuestros abuelos", id: "rumah kami, kakek-nenek kami" }
examples:
  - { es: "[[Mi]] madre es profesora.", id: "Ibuku guru." }
  - { es: "¿Cómo se llama [[tu]] hermano?", id: "Siapa nama saudaramu?" }
  - { es: "[[Su]] casa está en Lima.", id: "Rumahnya di Lima." }
  - { es: "[[Nuestra]] familia es grande.", id: "Keluarga kami besar." }
  - { es: "Mis [[abuelos]] viven en Medan.", id: "Kakek-nenekku tinggal di Medan." }
  - { es: "Diego vive con [[sus]] padres.", id: "Diego tinggal dengan orang tuanya." }
pair:
  off: "Casa mi es grande."
  natural: "[[Mi]] casa es grande."
spain:
  rows:
    - { latam: "¿Dónde vive su familia?", es: "¿Dónde vive vuestra familia?" }
  note:
    id: "*Vuestro*, *vuestra* adalah 'milik kalian' di Spanyol. Di Amerika Latin pakai *su*."
    en: "*Vuestro*, *vuestra* mean 'your' (you all) in Spain. Latin America uses *su*."
talk:
  lines:
    - { who: Rina, es: "¿Tienes hermanos?", id: "Kamu punya saudara?" }
    - { who: José, es: "Sí, tengo dos hermanas. ¿Y tú?", id: "Ya, dua saudara perempuan. Kamu?" }
    - { who: Rina, es: "Tengo un hermano. Mi familia vive en Bandung.", id: "Satu saudara laki-laki. Keluargaku tinggal di Bandung." }
tirukan: { es: "Mi familia vive en Bandung.", id: "Keluargaku tinggal di Bandung." }
check:
  - id: e1-11-c1
    type: gap
    cue: "Kakak perempuanku berumur dua puluh tahun."
    prompt: "___ hermana tiene veinte años."
    options: [Mi, Tu, Su]
    answer: Mi
    why: { id: "*Mi* = -ku.", en: "*Mi* = my." }
  - id: e1-11-c2
    type: gap
    cue: "Siapa nama ayahmu?"
    prompt: "¿Cómo se llama ___ padre?"
    options: [tu, tú]
    answer: tu
    why: { id: "*Tu* tanpa aksen = -mu; *tú* dengan aksen = kamu.", en: "*Tu* without an accent = your; *tú* with one = you." }
  - id: e1-11-c3
    type: gap
    cue: "Orang tua kami tinggal di Bali."
    prompt: "___ padres viven en Bali."
    options: [Nuestros, Nuestras]
    answer: Nuestros
    why: { id: "*Padres* maskulin jamak: *nuestros*.", en: "*Padres* is masculine plural: *nuestros*." }
  - id: e1-11-c4
    type: gap
    cue: "Kakek-nenekku ramah."
    prompt: "Mis abuelos son ___."
    options: [simpáticos, simpáticas]
    answer: simpáticos
    why: { id: "*Abuelos* (kakek dan nenek) maskulin jamak.", en: "*Abuelos* (grandparents) is masculine plural." }
  - id: e1-11-c5
    type: choice
    lang: id
    prompt: "*Su casa* bisa berarti…"
    options: ["rumahnya, rumah Anda, atau rumah mereka", "hanya rumahnya"]
    answer: "rumahnya, rumah Anda, atau rumah mereka"
    why: { id: "*Su* dipakai untuk *él*, *ella*, *usted*, *ellos* dan *ustedes*.", en: "*Su* serves *él*, *ella*, *usted*, *ellos* and *ustedes*." }
glossary:
  - { es: familia, id: keluarga, pos: noun, gender: f }
  - { es: madre, id: ibu, pos: noun, gender: f }
  - { es: padre, id: ayah, pos: noun, gender: m }
  - { es: abuelo, id: kakek, pos: noun, gender: m }
  - { es: abuela, id: nenek, pos: noun, gender: f }
  - { es: esposo, id: suami, pos: noun, gender: m }
  - { es: esposa, id: istri, pos: noun, gender: f }
  - { es: tío, id: paman, pos: noun, gender: m }
  - { es: tía, id: bibi, pos: noun, gender: f }
  - { es: primo, id: "sepupu (laki-laki)", pos: noun, gender: m }
  - { es: prima, id: "sepupu (perempuan)", pos: noun, gender: f }
next: easy1-12-donde-esta
---

## concept.id
Kata milik datang **sebelum** kata benda: *mi casa*, *tu libro*, *su familia*. Bentuknya ikut jumlah benda yang dimiliki, bukan pemiliknya: *mis padres* (orang tuaku). *Nuestro* juga ikut gendernya: *nuestra casa*. *Su* bisa berarti -nya, milik Anda, atau milik mereka.

## concept.en
Possessives come **before** the noun: *mi casa*, *tu libro*, *su familia*. They agree with the thing owned, not the owner: *mis padres* (my parents). *Nuestro* also agrees in gender: *nuestra casa*. *Su* can mean his, her, your (usted) or their.

## contrast.id
Bahasa Indonesia menaruh pemilik di belakang: *rumahku*, *rumah kami*. Bahasa Spanyol menaruhnya di depan: *mi casa*, *nuestra casa*. *Tu* (milikmu) tidak beraksen; *tú* (kamu) beraksen.

## contrast.en
Indonesian puts the owner after: *rumahku*, *rumah kami*. Spanish puts it before: *mi casa*, *nuestra casa*. *Tu* (your) has no accent; *tú* (you) does.
