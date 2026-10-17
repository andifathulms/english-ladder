---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-07-tha-zha-ain-ghain
rung: huruf-1
order: 7
status: draft
minutes: 8
title: { id: "Tha, zha, ʿain, ghain", en: "Ta, za, ʿayn, ghayn", ar: "طَ ظَ عَ غَ" }
summary:
  id: "Kamu membaca ط ظ ع غ, dan mengucapkan ع dari tenggorokan, bukan sebagai *a* biasa."
  en: "You read ط ظ ع غ, and say ع from the throat, not as a plain *a*."
introduces: [letters-tha-family]
spiral: sounds
visual: { id: letter-forms, props: { letter: "ع" } }
examples:
  - ar: "طَ ظَ عَ غَ"
    tr: "ṭa ẓa ʿa gha"
    id: "latihan suku kata: dua pasang huruf"
    en: "syllable drill: two pairs of letters"
    note: { id: "ط dan ظ berbentuk lingkaran bertiang. ع dan غ berbentuk seperti mulut terbuka.", en: "ط and ظ are a loop with an upright stroke. ع and غ look like an open mouth." }
  - ar: "عَرَبُ"
    tr: "ʿarabu"
    id: "orang Arab"
    en: "Arabs"
  - ar: "عِنَبُ"
    tr: "ʿinabu"
    id: "anggur"
    en: "grapes"
  - ar: "خَطَرُ"
    tr: "khaṭaru"
    id: "bahaya"
    en: "danger"
    note: { id: "ط adalah *t* yang ditebalkan, seperti ص adalah *s* yang ditebalkan.", en: "ط is a heavy *t*, just as ص is a heavy *s*." }
  - ar: "غَدُ"
    tr: "ghadu"
    id: "besok"
    en: "tomorrow"
    note: { id: "غ seperti *r* Prancis atau bunyi berkumur ringan.", en: "غ is like a French *r*, or a light gargle." }
  - ar: "نَظَرُ"
    tr: "naẓaru"
    id: "pandangan"
    en: "a look, sight"
pair:
  off: { ar: "أَرَبُ", tr: "arabu" }
  natural: { ar: "عَرَبُ", tr: "ʿarabu" }
sound:
  focus: "ع"
  compare: "ء"
  words:
    - { ar: "عَ", tr: "ʿa" }
    - { ar: "عِ", tr: "ʿi" }
    - { ar: "عُ", tr: "ʿu" }
    - { ar: "عَرَبُ", tr: "ʿarabu" }
    - { ar: "عِنَبُ", tr: "ʿinabu" }
  tip:
    id: "Untuk ع, tekan tengah tenggorokan seperti saat menahan muntah ringan, lalu keluarkan vokalnya. Bunyinya tertekan dan bersuara, bukan *a* yang ringan."
    en: "For ع, squeeze the middle of your throat as if holding back a slight gag, then let the vowel out. It sounds pressed and voiced, not a light *a*."
tirukan:
  ar: "عَرَبُ، عِنَبُ، غَدُ"
  tr: "ʿarabu, ʿinabu, ghadu"
  id: "orang Arab, anggur, besok"
  en: "Arabs, grapes, tomorrow"
check:
  - id: h1-07-c1
    type: choice
    match: exact
    prompt: "Mana yang dibaca *gha*?"
    options: ["غَ", "عَ", "ظَ"]
    answer: "غَ"
    why: { id: "غ adalah ع dengan satu titik di atas.", en: "غ is ع with one dot above." }
  - id: h1-07-c2
    type: read
    match: exact
    ar: "عِنَبُ"
    options: ["ʿinabu", "ghinabu", "ʿanabu"]
    answer: "ʿinabu"
    why: { id: "ع tanpa titik, dan kasrah di bawahnya: *ʿi*.", en: "ع without a dot, with kasrah below: *ʿi*." }
  - id: h1-07-c3
    type: read
    match: exact
    ar: "طُ"
    options: ["ṭu", "tu", "ẓu"]
    answer: "ṭu"
    why: { id: "Lingkaran bertiang tanpa titik adalah ط: *t* yang tebal.", en: "The loop with an upright and no dot is ط: a heavy *t*." }
  - id: h1-07-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf kedua."
    ar: "غَدُ"
    target: 1
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *ghadu*: د berharakat dhammah.", en: "It is read *ghadu*: د has dhammah." }
  - id: h1-07-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *ʿa-ra-bu*."
    letters: ["عَ", "رَ", "بُ"]
    distractors: ["غَ", "أَ"]
    answer: "عَرَبُ"
    why: { id: "Arab dimulai dengan ع, bukan alif.", en: "*ʿArab* starts with ع, not alif." }
  - id: h1-07-c6
    type: listen
    match: exact
    audio: "عَ"
    options: ["عَ", "أَ"]
    answer: "عَ"
    why: { id: "Bunyinya tertekan dari tenggorokan: itu ع.", en: "The sound was pressed from the throat: that is ع." }
glossary:
  - { ar: "عَرَبُ", tr: "ʿarabu", id: "orang Arab", en: "Arabs", pos: noun, root: "ع-ر-ب" }
  - { ar: "عِنَبُ", tr: "ʿinabu", id: "anggur", en: "grapes", gender: m, pos: noun }
  - { ar: "خَطَرُ", tr: "khaṭaru", id: "bahaya", en: "danger", gender: m, pos: noun }
  - { ar: "غَدُ", tr: "ghadu", id: "besok", en: "tomorrow", gender: m, pos: noun }
next: huruf1-08-fa-qaf
---

## concept.id
Dua pasang lagi. **ط** (*tha*) adalah lingkaran dengan tiang tegak, dan **ظ** (*zha*) sama dengan satu titik. Lalu **ع** (*ʿain*) yang bentuknya seperti mulut terbuka, dan **غ** (*ghain*) yang sama dengan satu titik di atas.

ط dan ظ termasuk huruf tebal, seperti ص dan ض. ط adalah *t* yang berat, dan ظ adalah ذ yang berat. Baca: **طَ طِ طُ**, **ظَ ظِ ظُ**.

ع adalah bunyi dari tengah tenggorokan yang tidak ada di bahasa Indonesia. غ lebih mudah: seperti *r* Prancis, atau bunyi saat berkumur. Baca: **عَ عِ عُ**, **غَ غِ غُ**.

## concept.en
Two more pairs. **ط** (*ta*) is a loop with an upright stroke, and **ظ** (*za*) is the same with one dot. Then **ع** (*ʿayn*), shaped like an open mouth, and **غ** (*ghayn*), the same with one dot above.

ط and ظ are heavy letters, like ص and ض. ط is a heavy *t*, and ظ is a heavy ذ. Read: **طَ طِ طُ**, **ظَ ظِ ظُ**.

ع is a sound from the middle of the throat that Indonesian doesn't have. غ is easier: like a French *r*, or the sound of gargling. Read: **عَ عِ عُ**, **غَ غِ غُ**.

## contrast.id
Di bahasa Indonesia ع biasanya hilang atau jadi *a* biasa: *Arab*, *ilmu*, *umur*. Saat membaca Arab, ع perlu dibunyikan. Tanpa ع, **عَرَبُ** terdengar seperti *arabu* dengan alif, dan itu kata yang lain.

Rasakan bedanya: ء (hamzah, yang akan kamu pelajari di pelajaran 11) seperti hentakan kecil di tenggorokan, sedangkan ع ditekan dan bersuara. Latih pelan-pelan dengan kartu Bunyi.

## contrast.en
In Indonesian ع usually disappears or becomes a plain *a*: *Arab*, *ilmu*, *umur*. When reading Arabic, ع needs to be sounded. Without it, **عَرَبُ** sounds like *arabu* with an alif, and that is a different word.

Feel the difference: ء (hamzah, which you will learn in lesson 11) is a small catch in the throat, while ع is squeezed and voiced. Practise slowly with the Bunyi card.
