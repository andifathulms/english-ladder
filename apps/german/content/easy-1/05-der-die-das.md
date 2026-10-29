---
id: easy1-05-der-die-das
rung: easy-1
order: 5
status: draft
minutes: 9
title: { id: "der, die, das", en: "der, die, das", de: "Der Tisch, die Lampe, das Bett" }
summary:
  id: "Setiap kata benda punya jenis: *der*, *die* atau *das*. Hafalkan kata benda bersama artikelnya, dan pakai petunjuk akhiran *-ung*, *-chen* dan *-e*."
  en: "Every noun has a gender: *der*, *die* or *das*. Learn each noun with its article, and use the ending clues *-ung*, *-chen* and *-e*."
introduces: [a1-gender-definite]
spiral: gender
visual: { id: gender-tiles, props: { nouns: [Zeitung, Wohnung, Mädchen, Brötchen, Lehrer, Information, Tisch, Hand, Bett, Kuchen] } }
examples:
  - { de: "[[Der]] Tisch ist neu.", id: "Mejanya baru." }
  - { de: "[[Die]] Lampe ist alt.", id: "Lampunya sudah tua.", note: { id: "Banyak kata berakhiran *-e* adalah *die*, tapi tidak semua.", en: "Many nouns ending in *-e* are *die*, but not all." } }
  - { de: "[[Das]] Bett ist groß.", id: "Tempat tidurnya besar." }
  - { de: "[[Die]] Wohnung ist klein.", id: "Apartemennya kecil.", note: { id: "*-ung* selalu *die*.", en: "*-ung* is always *die*." } }
  - { de: "[[Das]] Brötchen ist gut.", id: "Rotinya enak.", note: { id: "*-chen* selalu *das*.", en: "*-chen* is always *das*." } }
  - { de: "[[Der]] Kaffee ist kalt.", id: "Kopinya dingin." }
pair:
  off: "Tisch ist neu."
  natural: "[[Der]] Tisch ist neu."
words:
  id: "Kata majemuk ikut kata **terakhir**: *der Schrank* → **der Kühlschrank**, *das Zimmer* → **das Wohnzimmer**, *das Haus* → **das Krankenhaus** (rumah + sakit, urutannya terbalik dari bahasa Indonesia)."
  en: "A compound takes the gender of its **last** word: *der Schrank* → **der Kühlschrank**, *das Zimmer* → **das Wohnzimmer**, *das Haus* → **das Krankenhaus** (house + sick, the reverse of the Indonesian order)."
  compounds: [[Kühl, Schrank], [Wohn, Zimmer], [Kranken, Haus]]
talk:
  lines:
    - { who: Rina, de: "Die Wohnung ist schön!", id: "Apartemenmu bagus!" }
    - { who: Lena, de: "Danke! Die Küche ist klein, aber das Zimmer ist groß.", id: "Makasih! Dapurnya kecil, tapi kamarnya besar." }
tirukan: { de: "Die Wohnung ist schön.", id: "Apartemennya bagus." }
check:
  - id: e1-05-c1
    type: gender
    noun: Wohnung
    answer: f
    why: { id: "*-ung* selalu *die*: *die Wohnung*.", en: "*-ung* is always *die*: *die Wohnung*." }
  - id: e1-05-c2
    type: gender
    noun: Mädchen
    answer: n
    why: { id: "*-chen* selalu *das*, walaupun artinya anak perempuan: *das Mädchen*.", en: "*-chen* is always *das*, even for a girl: *das Mädchen*." }
  - id: e1-05-c3
    type: gender
    noun: Kühlschrank
    answer: m
    why: { id: "Kata terakhir menentukan: *der Schrank* → *der Kühlschrank*.", en: "The last word decides: *der Schrank* → *der Kühlschrank*." }
  - id: e1-05-c4
    type: gap
    cue: "Dapurnya kecil."
    prompt: "___ Küche ist klein."
    options: [Der, Die, Das]
    answer: Die
    why: { id: "*Küche* berakhiran *-e*, dan memang *die Küche*.", en: "*Küche* ends in *-e*, and it is *die Küche*." }
  - id: e1-05-c5
    type: dictation
    audio: "Der Tisch ist neu."
    answer: "Der Tisch ist neu."
    why: { id: "Kata benda selalu ditulis dengan huruf besar: *Tisch*.", en: "Nouns are always written with a capital: *Tisch*." }
  - id: e1-05-c6
    type: choice
    lang: id
    prompt: "Kata benda mana yang hampir selalu *die*?"
    options: ["yang berakhiran -ung", "yang berakhiran -chen", "yang berakhiran -er untuk orang"]
    answer: "yang berakhiran -ung"
    why: { id: "*-ung* → *die*; *-chen* → *das*; *-er* untuk orang (*Lehrer*) → *der*.", en: "*-ung* → *die*; *-chen* → *das*; *-er* for people (*Lehrer*) → *der*." }
glossary:
  - { de: Tisch, id: meja, pos: noun, gender: m, plural: Tische }
  - { de: Lampe, id: lampu, pos: noun, gender: f, plural: Lampen }
  - { de: Bett, id: tempat tidur, pos: noun, gender: n, plural: Betten }
  - { de: Wohnung, id: apartemen; tempat tinggal, pos: noun, gender: f, plural: Wohnungen }
  - { de: Küche, id: dapur, pos: noun, gender: f, plural: Küchen }
  - { de: Zimmer, id: kamar, pos: noun, gender: n, plural: Zimmer }
  - { de: Brötchen, id: roti kecil, pos: noun, gender: n, plural: Brötchen }
  - { de: Kühlschrank, id: kulkas, pos: noun, gender: m, plural: Kühlschränke }
  - { de: neu, id: baru, pos: adj }
  - { de: alt, id: "tua; lama", pos: adj }
  - { de: groß, id: besar, pos: adj }
  - { de: klein, id: kecil, pos: adj }
next: easy1-06-zahlen
---

## concept.id
Setiap kata benda bahasa Jerman punya jenis (*Genus*): maskulin **der**, feminin **die** atau netral **das**. Jenisnya sering tidak ada hubungannya dengan arti, jadi hafalkan kata benda bersama artikelnya: *der Tisch*, bukan cuma *Tisch*. Beberapa akhiran membantu: *-ung* → die, *-chen* → das, dan banyak kata berakhiran *-e* → die.

## concept.en
Every German noun has a gender (*Genus*): masculine **der**, feminine **die** or neuter **das**. The gender often has nothing to do with the meaning, so learn each noun with its article: *der Tisch*, not just *Tisch*. Some endings help: *-ung* → die, *-chen* → das, and many nouns ending in *-e* → die.

## contrast.id
Bahasa Indonesia tidak punya artikel; *-nya* sudah cukup (*mejanya*). Bahasa Jerman hampir selalu butuh artikel di depan kata benda: *Tisch ist neu* terdengar seperti telegram. Kata benda juga selalu ditulis dengan huruf besar.

## contrast.en
Indonesian has no articles; *-nya* is enough (*mejanya*). German almost always needs an article before a noun: *Tisch ist neu* sounds like a telegram. Nouns are also always written with a capital.
