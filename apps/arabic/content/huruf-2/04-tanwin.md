---
# Draft by Claude.
id: huruf2-04-tanwin
rung: huruf-2
order: 4
status: draft
minutes: 7
title: { id: "Tanwin: -an, -in, -un", en: "Tanwin: -an, -in, -un", ar: "التَّنْوِينُ" }
summary:
  id: "Kamu bisa membaca tanwin: harakat dobel di akhir kata yang dibaca *-an*, *-in* atau *-un*."
  en: "You can read tanwin: a doubled vowel mark at the end of a word, read *-an*, *-in* or *-un*."
introduces: [tanwin]
spiral: script
visual: { id: harakat-builder, props: { letter: "ل", set: full } }
examples:
  - ar: "قَلَ[[مٌ]]"
    tr: "qala[[mun]]"
    id: "pena"
    en: "pen"
    note: { id: "Dua dhammah: *-un*.", en: "Two dhammahs: *-un*." }
  - ar: "قَلَ[[مًا]]"
    tr: "qala[[man]]"
    id: "pena (akhiran -an)"
    en: "pen (-an ending)"
    note: { id: "Dua fathah: *-an*. Alif sesudahnya hanya tempat duduk, tidak dibaca.", en: "Two fathahs: *-an*. The alif after it is only a seat and is not read." }
  - ar: "قَلَ[[مٍ]]"
    tr: "qala[[min]]"
    id: "pena (akhiran -in)"
    en: "pen (-in ending)"
    note: { id: "Dua kasrah: *-in*.", en: "Two kasrahs: *-in*." }
  - ar: "مَا[[ءٌ]]"
    tr: "mā[[ʾun]]"
    id: "air"
    en: "water"
  - ar: "شُكْ[[رًا]]"
    tr: "syuk[[ran]]"
    id: "terima kasih"
    en: "thank you"
pair:
  off: { ar: "قَلَمُنْ", tr: "qalamun" }
  natural: { ar: "قَلَمٌ", tr: "qalamun" }
words:
  id: "*Syukran* dan *ahlan* yang sering kamu dengar sebenarnya sudah memakai tanwin: شُكْرًا (*syukran*), أَهْلًا (*ahlan*). Bunyi *-an* di ujungnya itulah tanwin fathah."
  en: "*Syukran* and *ahlan*, which you've probably heard, already use tanwin: شُكْرًا (*syukran*), أَهْلًا (*ahlan*). The *-an* at the end is tanwin fathah."
tirukan:
  ar: "قَلَمٌ، وَلَدٌ، مَاءٌ"
  tr: "qalamun, waladun, māʾun"
  id: "pena, anak laki-laki, air"
  en: "pen, boy, water"
check:
  - id: h2-04-c1
    type: mark
    match: exact
    prompt: "Tanda apa di huruf terakhir?"
    ar: "قَلَمٌ"
    target: 2
    options: [tanwin-damm, damma, tanwin-fath]
    answer: tanwin-damm
    why: { id: "*Qalamun*: akhiran *-un* ditulis dengan dua dhammah.", en: "*Qalamun*: the *-un* ending is written with two dhammahs." }
  - id: h2-04-c2
    type: read
    match: exact
    ar: "شُكْرًا"
    options: ["syukrun", "syukran", "syukrā"]
    answer: "syukran"
    why: { id: "Dua fathah di ر: *-ran*. Alifnya tidak dibaca panjang.", en: "Two fathahs on ر: *-ran*. The alif is not read long." }
  - id: h2-04-c3
    type: read
    match: exact
    ar: "مَاءٌ"
    options: ["māʾun", "maʾun", "māʾan"]
    answer: "māʾun"
    why: { id: "*Mā* panjang karena alif, lalu hamzah dengan tanwin dhammah: *ʾun*.", en: "*Mā* is long because of the alif, then hamza with tanwin dhammah: *ʾun*." }
  - id: h2-04-c4
    type: listen
    match: exact
    audio: "وَلَدًا"
    options: ["وَلَدٌ", "وَلَدًا", "وَلَدٍ"]
    answer: "وَلَدًا"
    why: { id: "Kamu mendengar *waladan*, akhiran *-an*.", en: "You heard *waladan*, the *-an* ending." }
  - id: h2-04-c5
    type: choice
    match: exact
    prompt: "Mana yang dibaca *qalamin*?"
    options: ["قَلَمٌ", "قَلَمًا", "قَلَمٍ"]
    answer: "قَلَمٍ"
    why: { id: "*-in* ditulis dua kasrah di bawah huruf terakhir.", en: "*-in* is written as two kasrahs under the last letter." }
  - id: h2-04-c6
    type: fix
    match: exact
    wrong: "قَلَمُنْ"
    options: ["قَلَمٌ", "قَلَمْ"]
    answer: "قَلَمٌ"
    why: { id: "Bunyi *-un* di akhir kata ditulis sebagai tanwin, tanpa huruf ن.", en: "The *-un* sound at the end of a word is written as tanwin, with no ن." }
glossary:
  - { ar: "قَلَمٌ", tr: "qalamun", id: "pena, pulpen", en: "pen", gender: m, pos: noun, root: "ق-ل-م" }
  - { ar: "وَلَدٌ", tr: "waladun", id: "anak laki-laki", en: "boy", gender: m, pos: noun, root: "و-ل-د" }
  - { ar: "مَاءٌ", tr: "māʾun", id: "air", en: "water", gender: m, pos: noun }
  - { ar: "شَايٌ", tr: "syāyun", id: "teh", en: "tea", gender: m, pos: noun }
  - { ar: "شُكْرًا", tr: "syukran", id: "terima kasih", en: "thank you", pos: chunk }
next: huruf2-05-syamsiyah-qamariyah
---

## concept.id
Kalau harakat di akhir kata ditulis dobel, bunyinya mendapat *n*. Namanya *tanwin*. Dua fathah **ـً** dibaca **-an**, dua kasrah **ـٍ** dibaca **-in**, dua dhammah **ـٌ** dibaca **-un**. Jadi **قَلَمٌ** dibaca **qalamun**.

Bunyi *n* itu tidak ditulis dengan huruf ن. Ia sudah ada di dalam tandanya. Tanwin fathah biasanya duduk di atas alif tambahan, dan alif itu tidak dibaca panjang: **شُكْرًا** dibaca **syukran**.

Mulai sekarang kata-kata ditulis lengkap dengan akhirannya. Di Easy 1 kamu akan tahu bahwa *-un* ini kira-kira berarti *sebuah*.

## concept.en
When the vowel mark at the end of a word is written double, the sound gains an *n*. This is *tanwin*. Two fathahs **ـً** are read **-an**, two kasrahs **ـٍ** **-in**, two dhammahs **ـٌ** **-un**. So **قَلَمٌ** is read **qalamun**.

That *n* is not written with the letter ن. It's built into the mark. Tanwin fathah usually sits on an extra alif, and that alif is not read long: **شُكْرًا** is read **syukran**.

From now on words are written in full, with their endings. In Easy 1 you'll learn that this *-un* roughly means *a*.

## contrast.id
Penulis pemula kadang menulis bunyi *-un* dengan huruf ن: *قَلَمُنْ*. Bacaannya memang sama, tapi tulisan Arab tidak begitu. Di akhir kata, bunyi *n* ini selalu tanwin.

Satu lagi: jangan baca alif di **syukran** sebagai *ā* panjang. Alif itu hanya kursi untuk tanwin, sama seperti di mushaf.

## contrast.en
Beginners sometimes write the *-un* sound with the letter ن: *قَلَمُنْ*. It sounds the same, but that's not how Arabic is written. At the end of a word this *n* is always tanwin.

One more thing: don't read the alif in **syukran** as a long *ā*. That alif is only a seat for the tanwin, just as in the mushaf.
