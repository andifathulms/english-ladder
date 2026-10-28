---
id: easy2-01-quiero-puedo
rung: easy-2
order: 1
status: draft
minutes: 9
title: { id: "Mau dan bisa: akar yang berubah", en: "Want and can: stems that change", es: "Quiero, puedo, pido" }
summary:
  id: "Di *quiero*, *puedo* dan *pido*, akar kata kerja berubah (e → ie, o → ue, e → i), kecuali untuk *nosotros* dan *vosotros*."
  en: "In *quiero*, *puedo* and *pido* the stem changes (e → ie, o → ue, e → i), except with *nosotros* and *vosotros*."
introduces: [a1-stem-change]
spiral: present
visual: { id: conjugation-grid, props: { verb: querer, tenses: [presente] } }
examples:
  - { es: "Yo [[quiero]] un café, por favor.", id: "Aku mau kopi, ya." }
  - { es: "¿[[Puedes]] venir hoy?", id: "Kamu bisa datang hari ini?" }
  - { es: "Mateo [[pide]] agua.", id: "Mateo minta air." }
  - { es: "Nosotros [[queremos]] ir al parque.", id: "Kami mau ke taman." }
  - { es: "Las clases [[empiezan]] a las ocho.", id: "Kelasnya mulai jam delapan." }
  - { es: "¿A qué hora [[cierra]] la tienda?", id: "Tokonya tutup jam berapa?" }
pair:
  off: "Yo quero un café."
  natural: "Yo [[quiero]] un café."
sound:
  focus: "ie dan ue"
  words: ["quiero", "puedo", "pienso", "duermo"]
  tip:
    id: "*Ie* dan *ue* dibaca cepat dalam satu ketukan, seperti *ye* dan *we*: *kye-ro*, *pwe-do*."
    en: "*Ie* and *ue* are said quickly in one beat, like *ye* and *we*: *kye-ro*, *pwe-do*."
spain:
  rows:
    - { latam: "¿Pueden venir hoy?", es: "¿Podéis venir hoy?" }
  note:
    id: "Untuk 'kalian', Spanyol memakai *vosotros*: *podéis*. Di bentuk itu akarnya tidak berubah, sama seperti *nosotros*."
    en: "For 'you all', Spain uses *vosotros*: *podéis*. Its stem doesn't change, just like *nosotros*."
talk:
  lines:
    - { who: Rina, es: "¿Quieres un café?", id: "Mau kopi?" }
    - { who: Diego, es: "No, gracias. Prefiero un té.", id: "Nggak, makasih. Aku lebih suka teh." }
    - { who: Rina, es: "¿Puedes esperar un momento?", id: "Bisa tunggu sebentar?" }
    - { who: Diego, es: "Claro.", id: "Tentu." }
tirukan: { es: "Quiero un té, por favor.", id: "Aku mau teh, ya." }
check:
  - id: e2-01-c1
    type: gap
    cue: "Aku mau kopi."
    prompt: "Yo ___ un café."
    options: [quiero, quero, queremos]
    answer: quiero
    why: { id: "*Querer* berubah e → ie: *quiero*.", en: "*Querer* changes e → ie: *quiero*." }
  - id: e2-01-c2
    type: conjugate
    verb: poder
    tense: presente
    persons: [yo, tu, nosotros]
    answers: { yo: puedo, tu: puedes, nosotros: podemos }
    why: { id: "o → ue di *puedo* dan *puedes*; *podemos* tidak berubah.", en: "o → ue in *puedo* and *puedes*; *podemos* keeps its o." }
  - id: e2-01-c3
    type: form
    cue: "Mateo minta air."
    base: pedir
    target: { person: el, tense: presente }
    frame: "Mateo ___ agua."
    answer: pide
    why: { id: "*Pedir* berubah e → i: *pide*.", en: "*Pedir* changes e → i: *pide*." }
  - id: e2-01-c4
    type: choice
    lang: id
    prompt: "Di bentuk mana akar *querer* tidak berubah?"
    options: [queremos, quieres, quieren]
    answer: queremos
    why: { id: "*Nosotros* (dan *vosotros*) memakai akar asli: *queremos*.", en: "*Nosotros* (and *vosotros*) keep the original stem: *queremos*." }
  - id: e2-01-c5
    type: dictation
    audio: "¿Puedes venir hoy?"
    answer: "¿Puedes venir hoy?"
    why: { id: "*Puedes*: o → ue untuk *tú*.", en: "*Puedes*: o → ue for *tú*." }
glossary:
  - { es: querer, id: "mau, ingin", pos: verb, verb: { group: er, irregular: true } }
  - { es: poder, id: "bisa, boleh", pos: verb, verb: { group: er, irregular: true } }
  - { es: pedir, id: "meminta, memesan", pos: verb, verb: { group: ir, irregular: true } }
  - { es: pensar, id: berpikir, pos: verb, verb: { group: ar, irregular: true } }
  - { es: empezar, id: mulai, pos: verb, verb: { group: ar, irregular: true } }
  - { es: cerrar, id: menutup, pos: verb, verb: { group: ar, irregular: true } }
  - { es: preferir, id: "lebih suka", pos: verb, verb: { group: ir, irregular: true } }
  - { es: dormir, id: tidur, pos: verb, verb: { group: ir, irregular: true } }
  - { es: tienda, id: toko, pos: noun, gender: f }
  - { es: clase, id: "kelas, pelajaran", pos: noun, gender: f }
  - { es: momento, id: "saat, sebentar", pos: noun, gender: m }
  - { es: claro, id: tentu, pos: interj }
next: easy2-02-hago-salgo
---

## concept.id
Pada beberapa kata kerja, huruf vokal di akarnya berubah saat ditekan: **querer → quiero** (e → ie), **poder → puedo** (o → ue), **pedir → pido** (e → i). Akhirannya tetap biasa. Perubahan ini terjadi di *yo*, *tú*, *él* dan *ellos*, tetapi tidak di *nosotros* dan *vosotros*: *queremos*, *podemos*.

## concept.en
In some verbs the stem vowel changes when it is stressed: **querer → quiero** (e → ie), **poder → puedo** (o → ue), **pedir → pido** (e → i). The endings stay regular. The change happens with *yo*, *tú*, *él* and *ellos*, but not with *nosotros* and *vosotros*: *queremos*, *podemos*.

## contrast.id
Bahasa Indonesia tidak pernah mengubah kata kerja: *saya mau*, *kami mau*. Di bahasa Spanyol, kamu harus tahu kata kerja mana yang berubah; kamus menulisnya sebagai *querer (ie)*.

## contrast.en
Indonesian never changes its verbs: *saya mau*, *kami mau*. In Spanish you need to know which verbs change; dictionaries mark them, as in *querer (ie)*.
