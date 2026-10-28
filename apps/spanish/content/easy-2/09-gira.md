---
id: easy2-09-gira
rung: easy-2
order: 9
status: draft
minutes: 9
title: { id: "Arah jalan: belok, terus", en: "Directions: turn, go on", es: "Gira a la derecha" }
summary:
  id: "Perintah untuk *tú* sama dengan bentuk *él* sekarang: *gira*, *sigue*, *cruza*, *toma*. Beberapa pendek dan tak beraturan: *ven*, *ve*."
  en: "*Tú* commands look like the present *él* form: *gira*, *sigue*, *cruza*, *toma*. A few are short and irregular: *ven*, *ve*."
introduces: [a1-imperative-tu]
spiral: commands
worked:
  - { es: "Gira a la derecha.", id: "Belok kanan." }
  - { es: "Sigue derecho.", id: "Jalan terus." }
  - { es: "Cruza la calle.", id: "Seberangi jalan." }
examples:
  - { es: "[[Gira]] a la izquierda en la esquina.", id: "Belok kiri di sudut jalan." }
  - { es: "[[Sigue]] derecho dos cuadras.", id: "Jalan terus dua blok." }
  - { es: "[[Cruza]] la calle en el semáforo.", id: "Seberangi jalan di lampu merah." }
  - { es: "[[Toma]] el metro hasta la plaza.", id: "Naik metro sampai alun-alun." }
  - { es: "[[Ven]] conmigo, es aquí cerca.", id: "Ikut aku, dekat kok." }
  - { es: "El banco está [[enfrente]] del parque.", id: "Banknya di seberang taman." }
pair:
  off: "Girar a la derecha, por favor."
  natural: "[[Gira]] a la derecha, por favor."
spain:
  rows:
    - { latam: "Sigue derecho dos cuadras.", es: "Sigue todo recto dos manzanas." }
  note:
    id: "Di Spanyol: *todo recto* (lurus terus) dan *manzana* (blok); di Amerika Latin *derecho* dan *cuadra*. *Manzana* juga berarti apel."
    en: "In Spain: *todo recto* (straight on) and *manzana* (block); in Latin America *derecho* and *cuadra*. *Manzana* also means apple."
talk:
  lines:
    - { who: Putu, es: "Perdón, ¿dónde está la farmacia?", id: "Permisi, apotek di mana?" }
    - { who: Camila, es: "Sigue derecho y gira a la derecha en el semáforo.", id: "Jalan terus, lalu belok kanan di lampu merah." }
    - { who: Putu, es: "¿Está lejos?", id: "Jauh?" }
    - { who: Camila, es: "No, está cerca. Son dos cuadras.", id: "Nggak, dekat. Dua blok." }
tirukan: { es: "Gira a la izquierda y sigue derecho.", id: "Belok kiri, lalu jalan terus." }
check:
  - id: e2-09-c1
    type: gap
    cue: "Belok kanan."
    prompt: "___ a la derecha."
    options: [Gira, Giras, Girar]
    answer: Gira
    why: { id: "Perintah untuk *tú*: *gira*, sama dengan *él gira*.", en: "A *tú* command: *gira*, like *él gira*." }
  - id: e2-09-c2
    type: gap
    cue: "Seberangi jalan."
    prompt: "___ la calle."
    options: [Cruza, Cruzas, Cruzar]
    answer: Cruza
    why: { id: "*Cruza*: perintah untuk *tú*.", en: "*Cruza*: a *tú* command." }
  - id: e2-09-c3
    type: form
    cue: "Jalan terus."
    base: seguir
    target: { person: tu, tense: imperativo }
    frame: "___ derecho."
    answer: sigue
    why: { id: "*Seguir* → *sigue* (e → i, seperti *él sigue*).", en: "*Seguir* → *sigue* (e → i, as in *él sigue*)." }
  - id: e2-09-c4
    type: choice
    lang: id
    prompt: "*Cuadra* artinya…"
    options: ["blok (dari persimpangan ke persimpangan)", "kotak", "alun-alun"]
    answer: "blok (dari persimpangan ke persimpangan)"
    why: { id: "*Dos cuadras*: dua blok.", en: "*Dos cuadras*: two blocks." }
  - id: e2-09-c5
    type: listen
    audio: "Toma el metro hasta la plaza."
    options: ["Toma el metro hasta la plaza.", "Tomo el metro hasta la plaza.", "Toma el autobús hasta la plaza."]
    answer: "Toma el metro hasta la plaza."
    why: { id: "*Toma*: naiklah (perintah).", en: "*Toma*: take (a command)." }
glossary:
  - { es: girar, id: berbelok, pos: verb, verb: { group: ar } }
  - { es: cruzar, id: menyeberang, pos: verb, verb: { group: ar } }
  - { es: seguir, id: "terus, mengikuti", pos: verb, verb: { group: ir, irregular: true } }
  - { es: calle, id: jalan, pos: noun, gender: f }
  - { es: esquina, id: "sudut jalan", pos: noun, gender: f }
  - { es: cuadra, id: blok, pos: noun, gender: f, es_es: manzana }
  - { es: semáforo, id: "lampu lalu lintas", pos: noun, gender: m }
  - { es: derecha, id: kanan, pos: noun, gender: f }
  - { es: izquierda, id: kiri, pos: noun, gender: f }
  - { es: derecho, id: "lurus, terus", pos: adv, es_es: recto }
  - { es: metro, id: "kereta bawah tanah", pos: noun, gender: m }
  - { es: farmacia, id: apotek, pos: noun, gender: f }
next: easy2-10-hace-calor
---

## concept.id
Untuk memberi petunjuk kepada teman (*tú*), pakai bentuk perintah. Untuk kebanyakan kata kerja, bentuknya sama dengan *él* di masa kini: **gira**, **sigue**, **cruza**, **toma**. Beberapa pendek dan tak beraturan: **ven** (datanglah), **ve** (pergilah), **haz**, **pon**, **sal**.

## concept.en
To give directions to a friend (*tú*), use the command form. For most verbs it is the same as the present *él* form: **gira**, **sigue**, **cruza**, **toma**. A few are short and irregular: **ven** (come), **ve** (go), **haz**, **pon**, **sal**.

## contrast.id
Bahasa Indonesia memakai kata dasar saja: *belok*, *jalan terus*. Bahasa Spanyol tidak memakai infinitif (*girar*) untuk orang di depanmu. Kepada orang yang dihormati (*usted*) bentuknya lain, nanti di Medium 1.

## contrast.en
Indonesian just uses the base word: *belok*, *jalan terus*. Spanish doesn't use the infinitive (*girar*) to the person in front of you. With *usted* the form is different; that comes in Medium 1.
