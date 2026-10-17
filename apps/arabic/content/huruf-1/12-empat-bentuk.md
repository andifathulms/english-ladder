---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-12-empat-bentuk
rung: huruf-1
order: 12
status: draft
minutes: 9
title: { id: "Empat bentuk, satu kata", en: "Four forms, one word", ar: "قَلَمُ" }
summary:
  id: "Kamu membaca dan menyusun kata huruf demi huruf, dengan bentuk awal, tengah, akhir dan sendiri."
  en: "You read and build words letter by letter, with initial, middle, final and isolated forms."
introduces: [joining-forms]
spiral: script
visual: { id: word-joiner, props: { preset: "قلم" } }
examples:
  - ar: "قَ لَ مُ"
    tr: "qa la mu"
    id: "tiga suku kata terpisah"
    en: "three separate syllables"
    note: { id: "Huruf yang berdiri sendiri memakai bentuk *sendiri*.", en: "A letter standing alone uses its *isolated* form." }
  - ar: "قَلَمُ"
    tr: "qalamu"
    id: "pena"
    en: "pen"
    note: { id: "Disambung: ق bentuk awal, ل bentuk tengah, م bentuk akhir.", en: "Joined: ق in its initial form, ل in its middle form, م in its final form." }
  - ar: "رَجُلُ"
    tr: "rajulu"
    id: "laki-laki"
    en: "man"
    note: { id: "ر tidak menyambung ke kiri, jadi ج mulai lagi dengan bentuk awal.", en: "ر doesn't join to the left, so ج starts again in its initial form." }
  - ar: "بَلَدُ"
    tr: "baladu"
    id: "negeri, negara"
    en: "country"
  - ar: "وَطَنُ"
    tr: "waṭanu"
    id: "tanah air"
    en: "homeland"
  - ar: "شَجَرَةُ"
    tr: "syajaratu"
    id: "pohon"
    en: "tree"
    note: { id: "ش ج ر menyambung, lalu ة berdiri sendiri karena ر tidak menyambung ke kiri.", en: "ش ج ر join, then ة stands alone because ر doesn't join to the left." }
pair:
  off: { ar: "قَ لَ مُ", tr: "qa la mu" }
  natural: { ar: "قَلَمُ", tr: "qalamu" }
tirukan:
  ar: "رَجُلُ، بَلَدُ، وَطَنُ"
  tr: "rajulu, baladu, waṭanu"
  id: "laki-laki, negeri, tanah air"
  en: "man, country, homeland"
check:
  - id: h1-12-c1
    type: spell
    match: exact
    prompt: "Susun suku katanya: *ra-ju-lu*."
    letters: ["رَ", "جُ", "لُ"]
    distractors: ["زَ", "حُ"]
    answer: "رَجُلُ"
    why: { id: "رَ, lalu جُ, lalu لُ. ر tidak menyambung ke ج.", en: "رَ, then جُ, then لُ. ر doesn't join to ج." }
  - id: h1-12-c2
    type: spell
    match: exact
    prompt: "Susun suku katanya: *ba-la-du*."
    letters: ["بَ", "لَ", "دُ"]
    distractors: ["نَ", "ذُ"]
    answer: "بَلَدُ"
    why: { id: "بَ dan لَ menyambung, lalu دُ di akhir.", en: "بَ and لَ join, then دُ at the end." }
  - id: h1-12-c3
    type: choice
    match: exact
    prompt: "Di kata بَلَدُ, bentuk apa yang dipakai huruf ل?"
    options: ["bentuk tengah", "bentuk awal", "bentuk akhir"]
    answer: "bentuk tengah"
    why: { id: "ل ada di antara ب dan د, dan menyambung ke keduanya.", en: "ل sits between ب and د, and joins to both." }
  - id: h1-12-c4
    type: choice
    match: exact
    prompt: "Ada berapa huruf di kata شَجَرَةُ?"
    options: ["4", "3", "5"]
    answer: "4"
    why: { id: "ش, ج, ر dan ة: empat huruf.", en: "ش, ج, ر and ة: four letters." }
  - id: h1-12-c5
    type: spell
    match: exact
    prompt: "Dengarkan, lalu susun katanya."
    audio: "وَطَنُ"
    letters: ["وَ", "طَ", "نُ"]
    distractors: ["تَ", "فَ"]
    answer: "وَطَنُ"
    why: { id: "Tanah air itu *waṭanu*, dengan ط tebal.", en: "Homeland is *waṭanu*, with heavy ط." }
  - id: h1-12-c6
    type: read
    match: exact
    ar: "مَلِكُ"
    options: ["maliku", "malaku", "muliku"]
    answer: "maliku"
    why: { id: "م berfathah, ل berkasrah, ك berdhammah: *maliku* (raja).", en: "م has fathah, ل kasrah, ك dhammah: *maliku* (king)." }
glossary:
  - { ar: "رَجُلُ", tr: "rajulu", id: "laki-laki", en: "man", gender: m, pos: noun }
  - { ar: "بَلَدُ", tr: "baladu", id: "negeri, negara", en: "country", gender: m, pos: noun }
  - { ar: "وَطَنُ", tr: "waṭanu", id: "tanah air", en: "homeland", gender: m, pos: noun }
---

## concept.id
Kamu sudah mengenal semua huruf. Sekarang kita lihat cara mereka bergandengan. Hampir setiap huruf punya empat bentuk: **sendiri**, **awal**, **tengah** dan **akhir**. Bentuk awal mengulurkan tangan ke kiri, bentuk tengah bergandengan ke dua arah, bentuk akhir hanya menerima dari kanan.

Ambil **ق ل م**. Kalau berdiri sendiri-sendiri: **قَ لَ مُ**. Kalau disambung jadi satu kata: **قَلَمُ** (pena). Hurufnya sama, hanya bentuknya menyesuaikan tempatnya.

Ingat enam huruf dari pelajaran 5 (ا د ذ ر ز و). Setelah mereka, huruf berikutnya kembali ke bentuk awal, seperti di **رَجُلُ** (laki-laki).

## concept.en
You now know every letter. Next, let's see how they hold hands. Almost every letter has four forms: **isolated**, **initial**, **middle** and **final**. The initial form reaches out to the left, the middle form joins both ways, and the final form only accepts a join from the right.

Take **ق ل م**. Standing alone: **قَ لَ مُ**. Joined into one word: **قَلَمُ** (pen). The letters are the same; only their shapes adapt to where they sit.

Remember the six letters from lesson 5 (ا د ذ ر ز و). After them, the next letter goes back to its initial form, as in **رَجُلُ** (man).

## contrast.id
Tulisan Latin cetak menulis huruf berjejer tanpa menyambung, jadi wajar kalau kata Arab yang disambung terasa seperti satu gambar besar. Trik membacanya: cari dulu titik dan tiang, lalu potong kata di setiap sambungan.

Saat menyusun kata, mulai dari kanan, dan ucapkan tiap suku kata sambil menyusun. Kalau kamu bisa menyusun **شَجَرَةُ** sendiri, kamu sudah siap untuk Huruf 2.

## contrast.en
Printed Latin script puts letters side by side without joining, so a joined Arabic word can feel like one big picture. The trick to reading it: find the dots and uprights first, then cut the word at each join.

When building a word, start from the right, and say each syllable as you place it. If you can build **شَجَرَةُ** on your own, you are ready for Huruf 2.
