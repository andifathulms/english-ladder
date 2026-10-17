---
# Draft by Claude. Huruf rungs have no Mesir strand.
# Convention: alif carrying a short vowel is written with its hamzah sign (أَ إِ أُ); lesson 11 explains hamzah.
id: huruf1-05-tidak-menyambung
rung: huruf-1
order: 5
status: draft
minutes: 8
title: { id: "Enam huruf yang tidak menyambung", en: "The six letters that never join forward", ar: "أَ دَ ذَ رَ زَ وَ" }
summary:
  id: "Kamu membaca ا د ذ ر ز و, dan tahu bahwa keenamnya tidak pernah menyambung ke huruf sesudahnya."
  en: "You read ا د ذ ر ز و, and know that these six never join to the letter after them."
introduces: [non-joiners]
spiral: script
visual: { id: letter-forms, props: { letter: "د" } }
examples:
  - ar: "أَ إِ أُ"
    tr: "a i u"
    id: "latihan: alif membawa tiga vokal"
    en: "drill: alif carrying the three vowels"
    note: { id: "Kalau alif membawa vokal, ada tanda kecil (hamzah) di atas atau di bawahnya.", en: "When alif carries a vowel, a small sign (hamzah) sits above or below it." }
  - ar: "دَ ذَ رَ زَ وَ"
    tr: "da dza ra za wa"
    id: "latihan suku kata: lima huruf yang tidak menyambung"
    en: "syllable drill: five letters that don't join"
  - ar: "أَدَبُ"
    tr: "adabu"
    id: "adab, sopan santun"
    en: "manners"
    note: { id: "أ dan د tidak menyambung ke kiri, jadi ketiga hurufnya berdiri sendiri-sendiri.", en: "أ and د don't join to the left, so all three letters stand apart." }
  - ar: "خَبَرُ"
    tr: "khabaru"
    id: "kabar, berita"
    en: "news"
  - ar: "بَدَنُ"
    tr: "badanu"
    id: "badan, tubuh"
    en: "body"
    note: { id: "ب menyambung ke د, tapi د tidak menyambung ke ن.", en: "ب joins to د, but د does not join to ن." }
  - ar: "أُذُنُ"
    tr: "udzunu"
    id: "telinga"
    en: "ear"
pair:
  off: { ar: "أُزُنُ", tr: "uzunu" }
  natural: { ar: "أُذُنُ", tr: "udzunu" }
sound:
  focus: "ذ"
  compare: "ز"
  words:
    - { ar: "ذَ", tr: "dza" }
    - { ar: "ذِ", tr: "dzi" }
    - { ar: "ذُ", tr: "dzu" }
    - { ar: "أُذُنُ", tr: "udzunu" }
  tip:
    id: "ذ seperti ث, tapi bersuara: ujung lidah di antara gigi, seperti *th* di kata Inggris *this*. ز adalah *z* biasa, lidah di belakang gigi."
    en: "ذ is like ث but voiced: tongue tip between the teeth, like *th* in *this*. ز is an ordinary *z*, tongue behind the teeth."
words:
  id: "Kamu sudah kenal tiga kata hari ini: *kabar*, *badan* dan *adab*. Artinya hampir sama dengan bahasa Indonesia. Hanya bunyinya bergeser: خ yang serak jadi *k* biasa di *kabar*."
  en: "You already know three of today's words: *kabar*, *badan* and *adab*. The meanings are nearly the same as in Indonesian. Only the sound shifted: the rasping خ became a plain *k* in *kabar*."
tirukan:
  ar: "أَدَبُ، خَبَرُ، بَدَنُ"
  tr: "adabu, khabaru, badanu"
  id: "adab, kabar, badan"
  en: "manners, news, body"
check:
  - id: h1-05-c1
    type: choice
    match: exact
    prompt: "Huruf mana yang tidak pernah menyambung ke huruf sesudahnya?"
    options: ["د", "ب", "ن"]
    answer: "د"
    why: { id: "د termasuk enam huruf yang tidak menyambung ke kiri: ا د ذ ر ز و.", en: "د is one of the six letters that never join to the left: ا د ذ ر ز و." }
  - id: h1-05-c2
    type: read
    match: exact
    ar: "خَبَرُ"
    options: ["khabaru", "ḥabaru", "kabaru"]
    answer: "khabaru"
    why: { id: "Titik di atas huruf pertama: خ, dibaca *kh*.", en: "A dot above the first letter: خ, read *kh*." }
  - id: h1-05-c3
    type: read
    match: exact
    ar: "أُذُنُ"
    options: ["udzunu", "uzunu", "adzanu"]
    answer: "udzunu"
    why: { id: "ذ (seperti د dengan titik) dibaca *dz*, dan semua vokalnya dhammah.", en: "ذ (like د with a dot) is read *dz*, and every vowel is dhammah." }
  - id: h1-05-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf terakhir."
    ar: "أَدَبُ"
    target: 2
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *adabu*: ب terakhir berharakat dhammah.", en: "It is read *adabu*: the last ب has dhammah." }
  - id: h1-05-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *kha-ba-ru*."
    letters: ["خَ", "بَ", "رُ"]
    distractors: ["زُ", "حَ"]
    answer: "خَبَرُ"
    why: { id: "Dari kanan: خَ, بَ, lalu رُ yang tanpa titik.", en: "From the right: خَ, بَ, then dotless رُ." }
  - id: h1-05-c6
    type: choice
    match: exact
    prompt: "Alif yang membawa kasrah ditulis seperti apa?"
    options: ["إِ", "أَ", "أُ"]
    answer: "إِ"
    why: { id: "Kasrah ada di bawah, jadi tanda hamzahnya juga di bawah alif: إِ.", en: "Kasrah goes below, so the hamzah sign sits below the alif too: إِ." }
glossary:
  - { ar: "خَبَرُ", tr: "khabaru", id: "kabar, berita", en: "news", gender: m, pos: noun, root: "خ-ب-ر" }
  - { ar: "بَدَنُ", tr: "badanu", id: "badan, tubuh", en: "body", gender: m, pos: noun }
  - { ar: "أَدَبُ", tr: "adabu", id: "adab, sopan santun", en: "manners", gender: m, pos: noun }
  - { ar: "أُذُنُ", tr: "udzunu", id: "telinga", en: "ear", gender: f, pos: noun }
next: huruf1-06-sin-syin-shad-dhad
---

## concept.id
Kebanyakan huruf Arab bergandengan dengan huruf sesudahnya. Enam huruf ini tidak pernah: **ا د ذ ر ز و**. Mereka mau disambung dari kanan, tapi tidak mengulurkan tangan ke kiri. Huruf sesudahnya mulai baru, seperti di awal kata.

**د** dan **ذ** bentuknya sama, ذ dengan satu titik. **ر** dan **ز** juga, ز dengan satu titik. **و** (*wau*) dibaca *wa wi wu*. Dan **ا** (*alif*) adalah garis tegak.

Alif sendiri tidak berbunyi. Kalau ia membawa vokal pendek, di aplikasi ini kami menulisnya dengan tanda kecil **ء** (hamzah) di atas atau di bawahnya: **أَ إِ أُ**, dibaca *a i u*. Hamzah akan dibahas lebih dalam di pelajaran 11.

## concept.en
Most Arabic letters hold hands with the letter after them. These six never do: **ا د ذ ر ز و**. They accept a join from the right but never reach out to the left. The letter after them starts fresh, as at the start of a word.

**د** and **ذ** share a shape, ذ with one dot. So do **ر** and **ز**, ز with one dot. **و** (*waw*) is read *wa wi wu*. And **ا** (*alif*) is a straight upright stroke.

Alif on its own has no sound. When it carries a short vowel, this app writes it with a small **ء** (hamzah) sign above or below: **أَ إِ أُ**, read *a i u*. Hamzah gets a closer look in lesson 11.

## contrast.id
Karena huruf-huruf ini tidak menyambung, satu kata bisa terlihat seperti terpotong. **أَدَبُ** terlihat seperti tiga huruf lepas, padahal itu satu kata. Jarak kecil setelah د bukan spasi antarkata.

Lalu soal bunyi: ذ bukan *z*. Banyak orang Indonesia membaca **أُذُنُ** sebagai *uzunu*. Untuk ذ, ujung lidah keluar sedikit di antara gigi, seperti ث tapi bersuara.

## contrast.en
Because these letters don't join, a word can look broken. **أَدَبُ** looks like three loose letters, yet it is one word. The small gap after د is not a space between words.

Then the sound: ذ is not *z*. Many Indonesians read **أُذُنُ** as *uzunu*. For ذ the tongue tip comes out a little between the teeth, like ث but voiced.
