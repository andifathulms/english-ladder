---
id: easy2-10-hace-calor
rung: easy-2
order: 10
status: draft
minutes: 8
title: { id: "Cuaca dan musim", en: "Weather and seasons", es: "Hace calor" }
summary:
  id: "Cuaca memakai tiga kata kerja: *hace* (calor, frío, sol, viento), *está* (nublado) dan *hay* (lluvia, viento); juga *llueve* dan *nieva*."
  en: "Weather takes three verbs: *hace* (calor, frío, sol, viento), *está* (nublado) and *hay* (lluvia, viento); plus *llueve* and *nieva*."
introduces: [a1-weather]
spiral: present
worked:
  - { es: "Hace calor.", id: "Panas." }
  - { es: "Está nublado.", id: "Mendung." }
  - { es: "Hay viento.", id: "Berangin." }
examples:
  - { es: "En Jakarta [[hace]] calor todo el año.", id: "Di Jakarta panas sepanjang tahun." }
  - { es: "Hoy [[está]] nublado.", id: "Hari ini mendung." }
  - { es: "En invierno [[nieva]] en Santiago.", id: "Di Santiago turun salju pada musim dingin." }
  - { es: "En abril [[llueve]] mucho.", id: "Bulan April sering hujan." }
  - { es: "[[Hay]] mucho viento en la playa.", id: "Di pantai banyak angin." }
  - { es: "¿Qué tiempo [[hace]] en Bogotá?", id: "Bagaimana cuaca di Bogotá?" }
pair:
  off: "Es calor hoy."
  natural: "[[Hace]] calor hoy."
words:
  id: "*Tiempo* berarti cuaca dan juga waktu: *¿qué tiempo hace?* (cuacanya bagaimana?) tetapi *no tengo tiempo* (aku nggak punya waktu). Di Indonesia musimnya dua; di Chile dan Argentina, Desember adalah musim panas."
  en: "*Tiempo* means both weather and time: *¿qué tiempo hace?* (what's the weather like?) but *no tengo tiempo* (I have no time). Indonesia has two seasons; in Chile and Argentina, December is summer."
talk:
  lines:
    - { who: Mateo, es: "¿Qué tiempo hace en Medan?", id: "Cuaca di Medan gimana?" }
    - { who: Siti, es: "Hace calor y llueve mucho.", id: "Panas, dan sering hujan." }
    - { who: Mateo, es: "Aquí en Santiago hace frío.", id: "Di sini di Santiago dingin." }
tirukan: { es: "Hoy hace sol, pero hace frío.", id: "Hari ini cerah, tapi dingin." }
check:
  - id: e2-10-c1
    type: gap
    cue: "Panas."
    prompt: "___ calor."
    options: [Hace, Es, Está]
    answer: Hace
    why: { id: "Panas dan dingin memakai *hace*: *hace calor*.", en: "Heat and cold take *hace*: *hace calor*." }
  - id: e2-10-c2
    type: gap
    cue: "Hari ini mendung."
    prompt: "Hoy ___ nublado."
    options: [está, hace, es]
    answer: está
    why: { id: "*Nublado* adalah keadaan: *está nublado*.", en: "*Nublado* is a state: *está nublado*." }
  - id: e2-10-c3
    type: gap
    cue: "Bulan April sering hujan."
    prompt: "En abril ___ mucho."
    options: [llueve, lluvia]
    answer: llueve
    why: { id: "*Llueve* kata kerja (hujan turun); *lluvia* kata benda (hujan).", en: "*Llueve* is the verb (it rains); *lluvia* is the noun (rain)." }
  - id: e2-10-c4
    type: choice
    lang: id
    prompt: "*Nieva* artinya…"
    options: ["turun salju", "turun hujan", "berangin"]
    answer: "turun salju"
    why: { id: "*Nevar* → *nieva* (e → ie).", en: "*Nevar* → *nieva* (e → ie)." }
  - id: e2-10-c5
    type: dictation
    audio: "¿Qué tiempo hace?"
    answer: "¿Qué tiempo hace?"
    why: { id: "*¿Qué tiempo hace?*: cuacanya bagaimana?", en: "*¿Qué tiempo hace?*: what's the weather like?" }
glossary:
  - { es: tiempo, id: "cuaca; waktu", pos: noun, gender: m }
  - { es: calor, id: panas, pos: noun, gender: m }
  - { es: sol, id: matahari, pos: noun, gender: m }
  - { es: viento, id: angin, pos: noun, gender: m }
  - { es: lluvia, id: hujan, pos: noun, gender: f }
  - { es: nublado, id: mendung, pos: adj }
  - { es: invierno, id: "musim dingin", pos: noun, gender: m }
  - { es: verano, id: "musim panas", pos: noun, gender: m }
  - { es: primavera, id: "musim semi", pos: noun, gender: f }
  - { es: otoño, id: "musim gugur", pos: noun, gender: m }
  - { es: llover, id: hujan, pos: verb, verb: { group: er, irregular: true } }
  - { es: nevar, id: "turun salju", pos: verb, verb: { group: ar, irregular: true } }
next: easy2-11-mas-que
---

## concept.id
Untuk cuaca, pakai **hace** dengan kata benda: *hace calor*, *hace frío*, *hace sol*, *hace viento*. Untuk keadaan langit, pakai **está**: *está nublado*. **Hay** untuk sesuatu yang ada: *hay viento*. Hujan dan salju punya kata kerja sendiri: **llueve**, **nieva**.

## concept.en
For weather, use **hace** with a noun: *hace calor*, *hace frío*, *hace sol*, *hace viento*. For the state of the sky, use **está**: *está nublado*. **Hay** is for something that is there: *hay viento*. Rain and snow have their own verbs: **llueve**, **nieva**.

## contrast.id
Bahasa Indonesia cukup *panas* atau *dingin*, tanpa kata kerja. Bahasa Spanyol butuh *hace*: *hace calor*, bukan *es calor*. Untuk orang yang merasa panas, pakai *tener*: *tengo calor*.

## contrast.en
Indonesian just says *panas* or *dingin*, with no verb. Spanish needs *hace*: *hace calor*, not *es calor*. For a person who feels hot, use *tener*: *tengo calor*.
