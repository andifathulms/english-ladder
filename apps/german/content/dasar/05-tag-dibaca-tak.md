---
id: dasar-05-tag-dibaca-tak
rung: dasar
order: 5
status: draft
minutes: 8
title: { id: "Tag dibaca Tak", en: "Tag sounds like Tak", de: "Tag, Straße, Vater" }
summary:
  id: "Kamu tahu bahwa *b*, *d*, *g* di akhir kata dibaca *p*, *t*, *k*, kapan menulis *ß* atau *ss*, dan bagaimana *r* dibaca."
  en: "You know that *b*, *d*, *g* at the end of a word sound like *p*, *t*, *k*, when to write *ß* or *ss*, and how *r* is said."
introduces: [d-devoicing]
spiral: sounds
worked:
  - { de: "der Tag, die Tage", id: "hari: Tak, tapi Ta-ge" }
  - { de: "der Hund", id: "anjing: Hunt" }
  - { de: "die Straße, das Wasser", id: "jalan, air: ß setelah vokal panjang, ss setelah vokal pendek" }
  - { de: "das Brot, der Vater", id: "roti, ayah: r di tenggorokan, -er hampir a" }
examples:
  - { de: "der Ta[[g]]", id: "hari", note: { id: "Terdengar *Tak*.", en: "Sounds like *Tak*." } }
  - { de: "der Hun[[d]]", id: "anjing", note: { id: "Terdengar *Hunt*.", en: "Sounds like *Hunt*." } }
  - { de: "die Stra[[ß]]e", id: "jalan" }
  - { de: "gro[[ß]]", id: "besar" }
  - { de: "das B[[r]]ot", id: "roti" }
  - { de: "der Vat[[er]]", id: "ayah", note: { id: "*-er* di akhir hampir seperti *a*: *Fata*.", en: "Final *-er* is almost an *a*: *Fata*." } }
pair:
  off: "der Hunt"
  natural: "der Hun[[d]]"
sound:
  focus: "akhir kata"
  words: ["Tag", "Hund", "Straße", "groß", "Brot", "Vater"]
  pairs: [["Tag", "Tage"], ["Rad", "Rat"]]
  tip:
    id: "*Rad* (sepeda) dan *Rat* (nasihat) terdengar sama: *d* di akhir dibaca *t*. Tapi di *Tage* bunyi *g* kembali, karena tidak lagi di akhir."
    en: "*Rad* (bike) and *Rat* (advice) sound the same: a final *d* is said as *t*. In *Tage* the *g* comes back, because it is no longer at the end."
tirukan: { de: "der Tag, die Straße, das Brot", id: "hari, jalan, roti" }
check:
  - id: d-05-c1
    type: choice
    lang: id
    prompt: "*Hund* diucapkan seperti …"
    options: ["*Hunt*", "*Hund* dengan *d* jelas", "*Hun*"]
    answer: "*Hunt*"
    why: { id: "Di akhir kata, *d* dibaca *t*: *Hunt*.", en: "At the end of a word, *d* is said as *t*: *Hunt*." }
  - id: d-05-c2
    type: listen
    audio: "die Tage"
    options: ["der Tag", "die Tage"]
    answer: "die Tage"
    why: { id: "*Ta-ge*: *g* di antara vokal tetap *g*. *Tag* sendiri terdengar *Tak*.", en: "*Ta-ge*: a *g* between vowels stays *g*. *Tag* on its own sounds like *Tak*." }
  - id: d-05-c3
    type: choice
    lang: id
    prompt: "Kapan kamu menulis *ß*?"
    options: ["setelah vokal panjang atau diftong", "setelah vokal pendek", "di awal kata"]
    answer: "setelah vokal panjang atau diftong"
    why: { id: "*Straße*, *groß*: vokal panjang, jadi *ß*. *Wasser*: vokal pendek, jadi *ss*.", en: "*Straße*, *groß*: a long vowel, so *ß*. *Wasser*: a short vowel, so *ss*." }
  - id: d-05-c4
    type: dictation
    audio: "die Straße"
    answer: "die Straße"
    why: { id: "*A* dalam *Straße* panjang, jadi *ß*. Di Swiss orang menulis *Strasse*, tapi di Jerman *Straße*.", en: "The *a* in *Straße* is long, so *ß*. Switzerland writes *Strasse*, but Germany writes *Straße*." }
  - id: d-05-c5
    type: choice
    lang: id
    prompt: "*-er* di akhir *Vater* dibaca …"
    options: ["hampir seperti *a*", "*er* dengan *r* bergetar", "*e* saja"]
    answer: "hampir seperti *a*"
    why: { id: "Di akhir kata, *-er* menjadi *a* yang lemah: *Fata*.", en: "At the end of a word, *-er* becomes a weak *a*: *Fata*." }
glossary:
  - { de: Tag, id: hari, pos: noun, gender: m, plural: Tage }
  - { de: Hund, id: anjing, pos: noun, gender: m, plural: Hunde }
  - { de: Straße, id: jalan, pos: noun, gender: f, plural: Straßen }
  - { de: groß, id: "besar, tinggi", pos: adj }
  - { de: Brot, id: roti, pos: noun, gender: n, plural: Brote }
next: dasar-06-membaca-nyaring
---

## concept.id
Di akhir kata, *b*, *d* dan *g* dibaca *p*, *t* dan *k*: *Tag* terdengar *Tak*, *Hund* terdengar *Hunt*. *ß* adalah *s* yang tajam: tulis *ß* setelah vokal panjang atau diftong (*Straße*, *groß*), dan *ss* setelah vokal pendek (*Wasser*). *R* di awal suku kata dibaca di tenggorokan (*Brot*), dan *-er* di akhir kata hampir menjadi *a* (*Vater*).

## concept.en
At the end of a word, *b*, *d* and *g* are said as *p*, *t* and *k*: *Tag* sounds like *Tak*, *Hund* like *Hunt*. *ß* is a sharp *s*: write *ß* after a long vowel or a diphthong (*Straße*, *groß*), and *ss* after a short vowel (*Wasser*). *R* at the start of a syllable is made in the throat (*Brot*), and *-er* at the end of a word is almost an *a* (*Vater*).

## contrast.id
Kabar baik: bahasa Indonesia juga melakukannya, karena *sebab* dan *abad* sering terdengar *sebap* dan *abat*. *R* Jerman mirip *gh* dalam *ghaib*. *R* bergetar seperti bahasa Indonesia tetap dimengerti, dan memang terdengar di Bayern dan Austria.

## contrast.en
Good news: Indonesian does this too, since *sebab* and *abad* often sound like *sebap* and *abat*. German *r* is close to the *gh* in *ghaib*. A rolled *r* as in Indonesian is still understood, and you will hear it in Bavaria and Austria.
