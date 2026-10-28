---
id: easy1-02-soy-de
rung: easy-1
order: 2
status: draft
minutes: 8
title: { id: "Aku dari Indonesia", en: "I'm from Indonesia", es: "Soy de Indonesia" }
summary:
  id: "*Ser* untuk siapa kamu dan dari mana: *soy Rina*, *soy de Indonesia*, *soy estudiante*."
  en: "*Ser* for who you are and where you're from: *soy Rina*, *soy de Indonesia*, *soy estudiante*."
introduces: [a1-ser-identity]
spiral: ser-estar
worked:
  - { es: "Soy Rina. Soy de Indonesia.", id: "Aku Rina. Aku dari Indonesia." }
  - { es: "Mateo es de México. Es profesor.", id: "Mateo dari Meksiko. Dia guru." }
  - { es: "¿De dónde eres?", id: "Kamu dari mana?" }
examples:
  - { es: "[[Soy]] de Indonesia.", id: "Aku dari Indonesia." }
  - { es: "¿De dónde [[eres]]?", id: "Kamu dari mana?" }
  - { es: "Lucía [[es]] de Bogotá.", id: "Lucía dari Bogotá." }
  - { es: "[[Somos]] estudiantes.", id: "Kami mahasiswa." }
  - { es: "Diego y Ana [[son]] de Lima.", id: "Diego dan Ana dari Lima." }
  - { es: "Soy [[profesora]].", id: "Aku guru." }
pair:
  off: "Yo de Indonesia."
  natural: "Yo [[soy]] de Indonesia."
spain:
  rows:
    - { latam: "¿De dónde son ustedes?", es: "¿De dónde sois vosotros?" }
  note:
    id: "Untuk 'kalian' yang akrab, Spanyol memakai *vosotros sois*. Amerika Latin selalu *ustedes son*. Cukup kenali saja."
    en: "For a friendly 'you all', Spain uses *vosotros sois*. Latin America always says *ustedes son*. Just recognise it."
talk:
  lines:
    - { who: Budi, es: "Hola, me llamo Budi. ¿Y tú?", id: "Halo, namaku Budi. Kamu?" }
    - { who: Valentina, es: "Soy Valentina. Soy de Colombia.", id: "Aku Valentina. Aku dari Kolombia." }
    - { who: Budi, es: "¿Eres estudiante?", id: "Kamu mahasiswa?" }
    - { who: Valentina, es: "No, soy médica. ¿Y tú?", id: "Bukan, aku dokter. Kamu?" }
tirukan: { es: "Soy de Indonesia. ¿Y tú?", id: "Aku dari Indonesia. Kamu?" }
check:
  - id: e1-02-c1
    type: gap
    cue: "Aku dari Medan."
    prompt: "Yo ___ de Medan."
    options: [soy, eres, es]
    answer: soy
    why: { id: "*Yo* berpasangan dengan *soy*.", en: "*Yo* goes with *soy*." }
  - id: e1-02-c2
    type: gap
    cue: "Kamu dari mana?"
    prompt: "¿De dónde ___ tú?"
    options: [eres, es, soy]
    answer: eres
    why: { id: "*Tú* berpasangan dengan *eres*.", en: "*Tú* goes with *eres*." }
  - id: e1-02-c3
    type: gap
    cue: "Ana dan Diego dari Peru."
    prompt: "Ana y Diego ___ de Perú."
    options: [son, somos, es]
    answer: son
    why: { id: "Dua orang (*ellos*): *son*.", en: "Two people (*ellos*): *son*." }
  - id: e1-02-c4
    type: form
    cue: "Kami dari Indonesia."
    base: ser
    target: { person: nosotros, tense: presente }
    frame: "___ de Indonesia."
    answer: somos
    why: { id: "*Nosotros* berpasangan dengan *somos*.", en: "*Nosotros* goes with *somos*." }
  - id: e1-02-c5
    type: order
    cue: "Mateo dari Meksiko."
    tiles: [es, México, Mateo, de]
    answer: [Mateo, es, de, México]
    why: { id: "Subjek, lalu *es de* + tempat asal.", en: "Subject, then *es de* + place of origin." }
  - id: e1-02-c6
    type: fix
    cue: "Aku dokter."
    wrong: "Yo médico."
    options: ["Soy médico.", "Soy un médico.", "Estoy médico."]
    answer: "Soy médico."
    why: { id: "Pekerjaan memakai *ser*, dan biasanya tanpa *un*.", en: "A job takes *ser*, usually without *un*." }
glossary:
  - { es: ser, id: "adalah (identitas, asal, pekerjaan)", pos: verb, verb: { group: er, irregular: true } }
  - { es: estudiante, id: "pelajar, mahasiswa", pos: noun, gender: mf }
  - { es: profesor, id: "guru (laki-laki)", pos: noun, gender: m }
  - { es: profesora, id: "guru (perempuan)", pos: noun, gender: f }
  - { es: médico, id: "dokter (laki-laki)", pos: noun, gender: m }
  - { es: médica, id: "dokter (perempuan)", pos: noun, gender: f }
  - { es: país, id: negara, pos: noun, gender: m }
  - { es: ciudad, id: kota, pos: noun, gender: f }
  - { es: indonesio, id: "orang Indonesia; dari Indonesia", pos: adj }
  - { es: mexicano, id: "orang Meksiko; dari Meksiko", pos: adj }
next: easy1-03-el-la
---

## concept.id
**Ser** dipakai untuk menyebut siapa kamu: nama, asal dan pekerjaan. *Soy Rina. Soy de Medan. Soy estudiante.* Bentuknya berubah menurut orangnya: *soy*, *eres*, *es*, *somos*, *son*. Untuk pekerjaan, biasanya tanpa *un* atau *una*: *soy médica*.

## concept.en
**Ser** says who you are: your name, origin and job. *Soy Rina. Soy de Medan. Soy estudiante.* Its form changes with the person: *soy*, *eres*, *es*, *somos*, *son*. Jobs usually take no *un* or *una*: *soy médica*.

## contrast.id
Bahasa Indonesia cukup bilang *aku dari Indonesia*, tanpa kata kerja. Bahasa Spanyol butuh kata kerja: *soy de Indonesia*. Subjeknya boleh hilang, karena *soy* sudah berarti 'aku'.

## contrast.en
Indonesian says *aku dari Indonesia* with no verb. Spanish needs one: *soy de Indonesia*. The subject can go, because *soy* already means 'I'.
