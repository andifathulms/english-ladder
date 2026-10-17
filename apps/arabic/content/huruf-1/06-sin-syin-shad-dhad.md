---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-06-sin-syin-shad-dhad
rung: huruf-1
order: 6
status: draft
minutes: 8
title: { id: "Sin, syin, shad, dhad", en: "Sin, shin, sad, dad", ar: "سَ شَ صَ ضَ" }
summary:
  id: "Kamu membaca س ش ص ض, dan mendengar bedanya *s* tipis dan *ṣ* tebal."
  en: "You read س ش ص ض, and hear the difference between thin *s* and heavy *ṣ*."
introduces: [letters-sin-family]
spiral: sounds
visual: { id: letter-forms, props: { letter: "س" } }
examples:
  - ar: "سَ شَ صَ ضَ"
    tr: "sa sya ṣa ḍa"
    id: "latihan suku kata: dua pasang huruf"
    en: "syllable drill: two pairs of letters"
    note: { id: "س dan ش bergerigi tiga. ص dan ض berbentuk lingkaran pipih.", en: "س and ش have three teeth. ص and ض have a flat loop." }
  - ar: "سَبَبُ"
    tr: "sababu"
    id: "sebab, alasan"
    en: "reason, cause"
  - ar: "أَسَدُ"
    tr: "asadu"
    id: "singa"
    en: "lion"
  - ar: "شَجَرُ"
    tr: "syajaru"
    id: "pohon-pohon"
    en: "trees"
    note: { id: "Tiga titik di atas gerigi: ش, dibaca *sy*.", en: "Three dots above the teeth: ش, read *sy*." }
  - ar: "بَصَرُ"
    tr: "baṣaru"
    id: "penglihatan"
    en: "eyesight"
    note: { id: "ص dibaca tebal: pangkal lidah naik, bibir sedikit membulat.", en: "ص is read heavy: the back of the tongue rises, the lips round a little." }
  - ar: "ضَرَرُ"
    tr: "ḍararu"
    id: "kerugian, bahaya"
    en: "harm"
pair:
  off: { ar: "بَسَرُ", tr: "basaru" }
  natural: { ar: "بَصَرُ", tr: "baṣaru" }
sound:
  focus: "ص"
  compare: "س"
  words:
    - { ar: "صَ", tr: "ṣa" }
    - { ar: "صِ", tr: "ṣi" }
    - { ar: "صُ", tr: "ṣu" }
    - { ar: "بَصَرُ", tr: "baṣaru" }
    - { ar: "ضَرَرُ", tr: "ḍararu" }
  tip:
    id: "Ucapkan *sa*, lalu angkat pangkal lidah ke langit-langit belakang sambil menjaga ujung lidah di tempatnya. Bunyinya jadi tebal: *ṣa*. ض adalah *d* yang ditebalkan dengan cara yang sama."
    en: "Say *sa*, then lift the back of your tongue towards the back of the roof of your mouth while the tip stays put. The sound turns heavy: *ṣa*. ض is a *d* made heavy the same way."
words:
  id: "*Sebab* di bahasa Indonesia datang dari سَبَبٌ, dan artinya tetap sama: alasan. Kata *asad* jarang dipakai di Indonesia, tapi namanya sering: *Asad* berarti singa."
  en: "Indonesian *sebab* comes from سَبَبٌ, and the meaning stayed the same: reason. *Asad* is rare as a word in Indonesia, but common as a name: *Asad* means lion."
tirukan:
  ar: "سَبَبُ، بَصَرُ، ضَرَرُ"
  tr: "sababu, baṣaru, ḍararu"
  id: "sebab, penglihatan, kerugian"
  en: "reason, eyesight, harm"
check:
  - id: h1-06-c1
    type: choice
    match: exact
    prompt: "Mana yang dibaca *sya*?"
    options: ["شَ", "سَ", "صَ"]
    answer: "شَ"
    why: { id: "ش adalah س dengan tiga titik di atas.", en: "ش is س with three dots above." }
  - id: h1-06-c2
    type: read
    match: exact
    ar: "ضُ"
    options: ["ḍu", "ṣu", "du"]
    answer: "ḍu"
    why: { id: "Lingkaran pipih dengan satu titik adalah ض, dibaca *ḍ* tebal.", en: "The flat loop with one dot is ض, read as heavy *ḍ*." }
  - id: h1-06-c3
    type: read
    match: exact
    ar: "سَبَبُ"
    options: ["sababu", "syababu", "ṣababu"]
    answer: "sababu"
    why: { id: "Gerigi tanpa titik adalah س, *s* biasa.", en: "Teeth without dots are س, an ordinary *s*." }
  - id: h1-06-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf terakhir."
    ar: "شَجَرُ"
    target: 2
    options: [fatha, kasra, damma]
    answer: damma
    why: { id: "Dibaca *syajaru*: ر terakhir berharakat dhammah.", en: "It is read *syajaru*: the last ر has dhammah." }
  - id: h1-06-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *a-sa-du*."
    letters: ["أَ", "سَ", "دُ"]
    distractors: ["صَ", "ذُ"]
    answer: "أَسَدُ"
    why: { id: "Singa itu *asadu*, dengan س tipis, bukan ص tebal.", en: "A lion is *asadu*, with thin س, not heavy ص." }
  - id: h1-06-c6
    type: listen
    match: exact
    audio: "صَ"
    options: ["صَ", "سَ"]
    answer: "صَ"
    why: { id: "Bunyinya tebal: itu ص, bukan س.", en: "The sound was heavy: that is ص, not س." }
glossary:
  - { ar: "سَبَبُ", tr: "sababu", id: "sebab, alasan", en: "reason, cause", gender: m, pos: noun }
  - { ar: "أَسَدُ", tr: "asadu", id: "singa", en: "lion", gender: m, pos: noun }
  - { ar: "شَجَرُ", tr: "syajaru", id: "pohon-pohon", en: "trees", gender: m, pos: noun }
next: huruf1-07-tha-zha-ain-ghain
---

## concept.id
Dua pasang huruf baru. **س** (*sin*) bergerigi tiga, dan **ش** (*syin*) adalah gerigi yang sama dengan tiga titik di atas. Lalu **ص** (*shad*) dengan lingkaran pipih, dan **ض** (*dhad*) yang sama dengan satu titik.

Baca dengan tiga vokal seperti biasa: **سَ سِ سُ**, **شَ شِ شُ**, **صَ صِ صُ**, **ضَ ضِ ضُ**. س adalah *s* biasa, dan ش dibaca *sy*, seperti di kata *syukur*.

Huruf ص dan ض termasuk huruf "tebal". Lidah tidak hanya menyentuh gigi, pangkalnya juga naik, sehingga bunyinya terdengar lebih berat dan dalam.

## concept.en
Two new pairs. **س** (*sin*) has three teeth, and **ش** (*shin*) is the same teeth with three dots above. Then **ص** (*sad*) with a flat loop, and **ض** (*dad*), the same with one dot.

Read them with three vowels as usual: **سَ سِ سُ**, **شَ شِ شُ**, **صَ صِ صُ**, **ضَ ضِ ضُ**. س is an ordinary *s*, and ش is read *sy* (English *sh*), as in Indonesian *syukur*.

ص and ض are "heavy" letters. The tongue doesn't just touch the teeth; its back rises too, so the sound is heavier and deeper.

## contrast.id
Bahasa Indonesia hanya punya satu *s*, jadi س dan ص gampang terdengar sama. Padahal **بَصَرُ** (penglihatan) dengan ص tebal, dan *basaru* dengan س tipis terdengar aneh di telinga orang Arab.

ض juga sering jadi *d* biasa. Coba ucapkan *da*, lalu tebalkan seperti ص: pangkal lidah naik, mulut terasa lebih bulat. Itulah *ḍa*.

## contrast.en
Indonesian has only one *s*, so س and ص easily sound the same. Yet **بَصَرُ** (eyesight) has heavy ص, and *basaru* with thin س sounds odd to an Arab ear.

ض also often becomes a plain *d*. Try saying *da*, then make it heavy like ص: the back of the tongue rises, the mouth feels rounder. That is *ḍa*.
