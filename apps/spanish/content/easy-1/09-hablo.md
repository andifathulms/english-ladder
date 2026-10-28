---
id: easy1-09-hablo
rung: easy-1
order: 9
status: draft
minutes: 10
title: { id: "Kata kerja -ar", en: "-ar verbs", es: "Hablo español" }
summary:
  id: "Kata kerja *-ar* di masa kini: *hablo*, *hablas*, *habla*, *hablamos*, *hablan*."
  en: "*-ar* verbs in the present: *hablo*, *hablas*, *habla*, *hablamos*, *hablan*."
introduces: [a1-present-ar]
spiral: present
visual: { id: conjugation-grid, props: { verb: hablar } }
examples:
  - { es: "[[Hablo]] español.", id: "Aku bisa bahasa Spanyol." }
  - { es: "¿[[Trabajas]] en un hospital?", id: "Kamu kerja di rumah sakit?" }
  - { es: "Rina [[estudia]] en la universidad.", id: "Rina kuliah." }
  - { es: "[[Cocinamos]] arroz con pollo.", id: "Kami masak nasi dengan ayam." }
  - { es: "Ustedes [[hablan]] muy bien.", id: "Kalian bicaranya bagus sekali.", es_es: "Vosotros [[habláis]] muy bien." }
  - { es: "Ellos [[escuchan]] música.", id: "Mereka mendengarkan musik." }
pair:
  off: "Yo habla español."
  natural: "Yo [[hablo]] español."
spain:
  rows:
    - { latam: "¿Ustedes hablan español?", es: "¿Vosotros habláis español?" }
  note:
    id: "Akhiran *-áis* hanya dipakai di Spanyol, untuk *vosotros*. Di Amerika Latin: *ustedes hablan*."
    en: "The *-áis* ending is only used in Spain, for *vosotros*. In Latin America: *ustedes hablan*."
talk:
  lines:
    - { who: Carlos, es: "¿Trabajas o estudias?", id: "Kamu kerja atau kuliah?" }
    - { who: Siti, es: "Estudio inglés y trabajo en una tienda.", id: "Aku belajar bahasa Inggris dan kerja di toko." }
    - { who: Carlos, es: "¿Y hablas español?", id: "Kamu bisa bahasa Spanyol?" }
    - { who: Siti, es: "Un poco. Estudio mucho.", id: "Sedikit. Aku banyak belajar." }
tirukan: { es: "Hablo español y un poco de inglés.", id: "Aku bisa bahasa Spanyol dan sedikit bahasa Inggris." }
check:
  - id: e1-09-c1
    type: conjugate
    verb: hablar
    tense: presente
    persons: [yo, tu, el, nosotros, ellos]
    answers: { yo: hablo, tu: hablas, el: habla, nosotros: hablamos, ellos: hablan }
    why: { id: "Akhiran *-ar*: *-o*, *-as*, *-a*, *-amos*, *-an*.", en: "*-ar* endings: *-o*, *-as*, *-a*, *-amos*, *-an*." }
  - id: e1-09-c2
    type: gap
    cue: "Kami kerja di kantor."
    prompt: "Nosotros ___ en una oficina."
    options: [trabajamos, trabajan, trabajo]
    answer: trabajamos
    why: { id: "*Nosotros*: *-amos*.", en: "*Nosotros*: *-amos*." }
  - id: e1-09-c3
    type: form
    cue: "Kamu kuliah di Bogotá?"
    base: estudiar
    target: { person: tu, tense: presente }
    frame: "¿___ en Bogotá?"
    answer: estudias
    why: { id: "*Tú*: *-as*: *estudias*.", en: "*Tú*: *-as*: *estudias*." }
  - id: e1-09-c4
    type: gap
    cue: "Ana memasak nasi."
    prompt: "Ana ___ arroz."
    options: [cocina, cocino]
    answer: cocina
    why: { id: "*Ella*: *-a*: *cocina*.", en: "*Ella*: *-a*: *cocina*." }
  - id: e1-09-c5
    type: dictation
    audio: "Hablamos español."
    answer: "Hablamos español."
    why: { id: "*Hablamos*: *h* tidak dibaca.", en: "*Hablamos*: the *h* is silent." }
glossary:
  - { es: hablar, id: berbicara, pos: verb, verb: { group: ar } }
  - { es: trabajar, id: bekerja, pos: verb, verb: { group: ar } }
  - { es: estudiar, id: "belajar, kuliah", pos: verb, verb: { group: ar } }
  - { es: cocinar, id: memasak, pos: verb, verb: { group: ar } }
  - { es: escuchar, id: mendengarkan, pos: verb, verb: { group: ar } }
  - { es: comprar, id: membeli, pos: verb, verb: { group: ar } }
  - { es: español, id: "bahasa Spanyol", pos: noun, gender: m }
  - { es: inglés, id: "bahasa Inggris", pos: noun, gender: m }
  - { es: música, id: musik, pos: noun, gender: f }
  - { es: universidad, id: universitas, pos: noun, gender: f }
  - { es: arroz, id: "nasi, beras", pos: noun, gender: m }
  - { es: pollo, id: ayam, pos: noun, gender: m }
next: easy1-10-como-vivo
---

## concept.id
Kata kerja yang berakhir **-ar** membuang *-ar*, lalu menambah akhiran menurut orangnya: *habl-o*, *habl-as*, *habl-a*, *habl-amos*, *habl-an*. Akhiran sudah menunjukkan siapa pelakunya, jadi *yo* dan *tú* sering dihilangkan. *Ustedes* (kalian) memakai bentuk yang sama dengan *ellos*: *ustedes hablan*.

## concept.en
Verbs ending in **-ar** drop *-ar* and add an ending for the person: *habl-o*, *habl-as*, *habl-a*, *habl-amos*, *habl-an*. The ending already says who, so *yo* and *tú* are often dropped. *Ustedes* (you all) takes the same form as *ellos*: *ustedes hablan*.

## contrast.id
Kata kerja bahasa Indonesia tidak berubah: *aku bicara*, *kamu bicara*, *mereka bicara*. Di bahasa Spanyol, akhiran kata kerjanya yang memberi tahu siapa yang bicara.

## contrast.en
Indonesian verbs don't change: *aku bicara*, *kamu bicara*, *mereka bicara*. In Spanish, the verb's ending tells you who is speaking.
