---
id: dasar-02-umlaut
rung: dasar
order: 2
status: draft
minutes: 7
title: { id: "Dua titik di atas huruf", en: "Two dots over a letter", de: "ä, ö, ü" }
summary:
  id: "Kamu bisa membedakan *u* dan *ü*, *o* dan *ö*, *a* dan *ä*, dan tahu bahwa dua titik itu bisa mengubah arti: *schon* dan *schön*."
  en: "You can tell *u* from *ü*, *o* from *ö* and *a* from *ä*, and you know the two dots can change the meaning: *schon* and *schön*."
introduces: [d-umlauts]
spiral: sounds
visual: { id: mouth-places-de, props: { initial: ü } }
examples:
  - { de: "die M[[u]]tter", id: "ibu" }
  - { de: "die M[[ü]]tter", id: "ibu-ibu", note: { id: "Di sini umlaut menandai bentuk jamak.", en: "Here the umlaut marks the plural." } }
  - { de: "die T[[ü]]r", id: "pintu" }
  - { de: "sch[[ö]]n", id: "indah, bagus" }
  - { de: "das Br[[ö]]tchen", id: "roti bulat kecil" }
  - { de: "der K[[ä]]se", id: "keju" }
pair:
  off: "die Tur"
  natural: "die T[[ü]]r"
sound:
  focus: "ü dan ö"
  words: ["Tür", "schön", "Brötchen", "Käse"]
  pairs: [["schon", "schön"], ["Mutter", "Mütter"]]
  tip:
    id: "*Ü*: ucapkan *i*, lalu bulatkan bibir seperti mau bilang *u*, tanpa menggerakkan lidah. *Ö*: ucapkan *e* seperti dalam *sate*, lalu bulatkan bibir."
    en: "*Ü*: say *i*, then round your lips as if for *u*, without moving your tongue. *Ö*: say *e* as in *sate*, then round your lips."
tirukan: { de: "schön, die Tür, der Käse", id: "indah, pintu, keju" }
check:
  - id: d-02-c1
    type: listen
    audio: "schön"
    options: [schön, schon]
    answer: schön
    why: { id: "*Schön* (indah) punya *ö*: bibir bulat. *Schon* (sudah) tanpa umlaut.", en: "*Schön* (beautiful) has *ö*: rounded lips. *Schon* (already) has none." }
  - id: d-02-c2
    type: listen
    audio: "die Mütter"
    options: ["die Mutter", "die Mütter"]
    answer: "die Mütter"
    why: { id: "*Mütter* dengan *ü*: banyak ibu. Umlaut di sini menandai jamak.", en: "*Mütter* with *ü*: mothers. Here the umlaut marks the plural." }
  - id: d-02-c3
    type: choice
    lang: id
    prompt: "Bagaimana membuat bunyi *ü*?"
    options: ["ucapkan *i* dengan bibir bulat", "ucapkan *u* biasa", "ucapkan *i* biasa"]
    answer: "ucapkan *i* dengan bibir bulat"
    why: { id: "Lidah di posisi *i*, bibir bulat seperti *u*: itulah *ü*.", en: "Tongue as for *i*, lips rounded as for *u*: that is *ü*." }
  - id: d-02-c4
    type: choice
    lang: id
    prompt: "Keyboard-mu tidak punya *ö*. Bagaimana menulis *schön*?"
    options: [schoen, schon, shon]
    answer: schoen
    why: { id: "Tanpa umlaut, tulis *ae*, *oe*, *ue*: *schoen*. *Schon* artinya lain (sudah).", en: "Without umlauts, write *ae*, *oe*, *ue*: *schoen*. *Schon* means something else (already)." }
  - id: d-02-c5
    type: dictation
    audio: "die Tür"
    answer: "die Tür"
    accept: ["die Tuer"]
    spelling: strict
    why: { id: "*Tür* dengan *ü*. Tanpa umlaut kamu bisa menulis *Tuer*, tapi tidak *Tur*.", en: "*Tür* with *ü*. Without umlauts you may write *Tuer*, but not *Tur*." }
glossary:
  - { de: Mutter, id: ibu, pos: noun, gender: f, plural: Mütter }
  - { de: Tür, id: pintu, pos: noun, gender: f, plural: Türen }
  - { de: schön, id: "indah, bagus", pos: adj }
  - { de: schon, id: sudah, pos: adv }
  - { de: Brötchen, id: "roti bulat kecil", pos: noun, gender: n, plural: Brötchen }
  - { de: Käse, id: keju, pos: noun, gender: m, plural: Käse }
next: dasar-03-ei-ie-eu
---

## concept.id
Tiga vokal Jerman bisa punya dua titik di atasnya: *ä*, *ö*, *ü*. Namanya *Umlaut*. Dua titik itu mengubah bunyi, dan sering juga arti: *schon* berarti sudah, *schön* berarti indah; *Mutter* satu ibu, *Mütter* banyak ibu. Kalau keyboard-mu tidak punya umlaut, tulis *ae*, *oe*, *ue*: *schoen*.

## concept.en
Three German vowels can carry two dots: *ä*, *ö*, *ü*. This is the *Umlaut*. The dots change the sound, and often the meaning too: *schon* means already, *schön* means beautiful; *Mutter* is one mother, *Mütter* several. If your keyboard has no umlauts, write *ae*, *oe*, *ue*: *schoen*.

## contrast.id
Bahasa Indonesia tidak punya *ö* dan *ü*, jadi kita cenderung membacanya *o* dan *u*. Kuncinya di bibir: untuk *ü* lidah di posisi *i* dan bibir bulat, untuk *ö* lidah di posisi *e* dan bibir bulat. *Ä* lebih mudah: bunyinya seperti *e* dalam *bebek*.

## contrast.en
Indonesian has no *ö* or *ü*, so we tend to read them as *o* and *u*. The key is the lips: for *ü* the tongue is in the *i* position with rounded lips, for *ö* it is in the *e* position with rounded lips. *Ä* is easier: it sounds like the *e* in *bebek*.
