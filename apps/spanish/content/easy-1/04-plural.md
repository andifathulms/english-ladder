---
id: easy1-04-plural
rung: easy-1
order: 4
status: draft
minutes: 9
title: { id: "Jamak dan persesuaian", en: "Plurals and agreement", es: "Las casas blancas" }
summary:
  id: "Artikel dan kata sifat ikut gender dan jumlah kata bendanya: *los libros nuevos*, *las casas blancas*."
  en: "Articles and adjectives follow the noun's gender and number: *los libros nuevos*, *las casas blancas*."
introduces: [a1-plural-agreement]
spiral: agreement
visual: { id: agreement, props: { initial: { noun: casa } } }
examples:
  - { es: "Los [[libros]] son nuevos.", id: "Buku-bukunya baru." }
  - { es: "Las casas son [[blancas]].", id: "Rumah-rumahnya putih." }
  - { es: "Es un carro [[rojo]].", id: "Itu mobil merah.", es_es: "Es un coche [[rojo]]." }
  - { es: "Son unas flores [[amarillas]].", id: "Itu bunga-bunga kuning." }
  - { es: "La ciudad es muy [[bonita]].", id: "Kotanya cantik sekali." }
  - { es: "Son dos perros [[pequeños]].", id: "Itu dua anjing kecil." }
pair:
  off: "Las casas blanco."
  natural: "Las casas [[blancas]]."
spain:
  rows:
    - { latam: "Es un carro rojo.", es: "Es un coche rojo." }
  note:
    id: "Mobil: *carro* di Amerika Latin, *coche* di Spanyol. Keduanya maskulin."
    en: "Car: *carro* in Latin America, *coche* in Spain. Both are masculine."
talk:
  lines:
    - { who: Ana, es: "¿Es el carro de Luis?", id: "Itu mobilnya Luis?" }
    - { who: Diego, es: "Sí, es el carro rojo.", id: "Ya, yang merah itu." }
    - { who: Ana, es: "¡Es muy bonito!", id: "Bagus sekali!" }
tirukan: { es: "Las casas blancas son bonitas.", id: "Rumah-rumah putih itu cantik." }
check:
  - id: e1-04-c1
    type: agree
    noun: { es: libros, gender: m, number: pl, id: buku-buku }
    adj: nuevo
    definite: true
    options: { article: [los, las], adjective: [nuevos, nuevas] }
    answers: { article: los, adjective: nuevos }
    why: { id: "*Libro* maskulin, jamak: *los* dan *nuevos*.", en: "*Libro* is masculine, plural: *los* and *nuevos*." }
  - id: e1-04-c2
    type: agree
    noun: { es: ciudades, gender: f, number: pl, id: kota-kota }
    adj: grande
    definite: true
    options: { article: [los, las], adjective: [grande, grandes] }
    answers: { article: las, adjective: grandes }
    why: { id: "*Grande* sama untuk maskulin dan feminin; jamaknya *grandes*.", en: "*Grande* is the same for both genders; its plural is *grandes*." }
  - id: e1-04-c3
    type: gap
    cue: "Anjing-anjingnya kecil."
    prompt: "Los perros son ___."
    options: [pequeños, pequeñas, pequeño]
    answer: pequeños
    why: { id: "*Perros* maskulin jamak: *pequeños*.", en: "*Perros* is masculine plural: *pequeños*." }
  - id: e1-04-c4
    type: form
    cue: "rumah-rumah putih"
    base: "las casas (blanco)"
    target: { gender: f, number: pl }
    answer: blancas
    why: { id: "Feminin jamak: *-as*.", en: "Feminine plural: *-as*." }
  - id: e1-04-c5
    type: fix
    cue: "Meja-mejanya besar."
    wrong: "Las mesa son grandes."
    options: ["Las mesas son grandes.", "La mesas son grandes."]
    answer: "Las mesas son grandes."
    why: { id: "Artikel dan kata benda sama-sama jamak: *las mesas*.", en: "Article and noun are both plural: *las mesas*." }
glossary:
  - { es: blanco, id: putih, pos: adj }
  - { es: rojo, id: merah, pos: adj }
  - { es: negro, id: hitam, pos: adj }
  - { es: amarillo, id: kuning, pos: adj }
  - { es: azul, id: biru, pos: adj }
  - { es: verde, id: hijau, pos: adj }
  - { es: pequeño, id: kecil, pos: adj }
  - { es: carro, id: mobil, pos: noun, gender: m, es_es: coche }
  - { es: flor, id: bunga, pos: noun, gender: f }
next: easy1-05-tengo-anos
---

## concept.id
Jamak dibuat dengan **-s** setelah vokal (*libros*) dan **-es** setelah konsonan (*ciudades*). Artikel dan kata sifat ikut gender dan jumlah kata bendanya: *el libro nuevo*, *los libros nuevos*, *la casa blanca*, *las casas blancas*. Kata sifat yang berakhir *-e* atau konsonan sama untuk kedua gender: *grande*, *azul*.

## concept.en
Plurals add **-s** after a vowel (*libros*) and **-es** after a consonant (*ciudades*). Articles and adjectives follow the noun's gender and number: *el libro nuevo*, *los libros nuevos*, *la casa blanca*, *las casas blancas*. Adjectives in *-e* or a consonant are the same for both genders: *grande*, *azul*.

## contrast.id
Bahasa Indonesia mengulang kata (*buku-buku*) atau tidak menandai jamak sama sekali. Bahasa Spanyol menandai jamak di setiap kata dalam frasa: artikel, kata benda dan kata sifat. Kata sifatnya juga datang setelah kata benda, seperti bahasa Indonesia: *rumah putih*, *casa blanca*.

## contrast.en
Indonesian repeats the word (*buku-buku*) or doesn't mark the plural at all. Spanish marks it on every word of the phrase: article, noun and adjective. The adjective comes after the noun, as in Indonesian: *rumah putih*, *casa blanca*.
