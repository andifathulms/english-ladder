---
# Draft by Claude. Before tanwin, words are shown as you say them when you stop (no ending).
id: huruf2-02-sukun
rung: huruf-2
order: 2
status: draft
minutes: 7
title: { id: "Sukun: huruf mati", en: "Sukun: the stopped letter", ar: "السُّكُونُ" }
summary:
  id: "Kamu bisa membaca huruf bersukun: huruf yang ditutup tanpa vokal, langsung menempel ke suku kata sebelumnya."
  en: "You can read a letter with sukun: a letter closed with no vowel, joined straight to the syllable before it."
introduces: [sukun]
spiral: script
visual: { id: harakat-builder, props: { letter: "ق", set: full } }
examples:
  - ar: "بَ[[حْ]]ر"
    tr: "ba[[ḥ]]r"
    id: "laut"
    en: "sea"
    note: { id: "حْ bersukun: *baḥ* satu suku kata, lalu *r*.", en: "حْ has sukun: *baḥ* is one syllable, then *r*." }
  - ar: "خُ[[بْ]]ز"
    tr: "khu[[b]]z"
    id: "roti"
    en: "bread"
  - ar: "وَ[[قْ]]ت"
    tr: "wa[[q]]t"
    id: "waktu"
    en: "time"
  - ar: "بِ[[نْ]]ت"
    tr: "bi[[n]]t"
    id: "anak perempuan"
    en: "girl, daughter"
  - ar: "يَ[[وْ]]م"
    tr: "ya[[w]]m"
    id: "hari"
    en: "day"
    note: { id: "Waw bersukun setelah fathah bukan *ū* panjang, tapi *aw*, seperti *au* di *pulau*.", en: "A waw with sukun after fathah is not a long *ū* but *aw*, like *ow* in *how*." }
  - ar: "مِ[[لْ]]ح"
    tr: "mi[[l]]ḥ"
    id: "garam"
    en: "salt"
pair:
  off: { ar: "خُبُز", tr: "khubuz" }
  natural: { ar: "خُبْز", tr: "khubz" }
words:
  id: "Bahasa Indonesia suka menambah vokal setelah huruf mati: *waktu* dari وَقْت (*waqt*), *ilmu* dari عِلْم (*ʿilm*), *pikir* dari فِكْر (*fikr*). Di bahasa Arab tidak ada *-u* atau *-i* tambahan itu."
  en: "Indonesian likes to add a vowel after a closed letter: *waktu* from وَقْت (*waqt*), *ilmu* from عِلْم (*ʿilm*), *pikir* from فِكْر (*fikr*). Arabic has no such extra *-u* or *-i*."
tirukan:
  ar: "خُبْز، بَحْر، وَقْت"
  tr: "khubz, baḥr, waqt"
  id: "roti, laut, waktu"
  en: "bread, sea, time"
check:
  - id: h2-02-c1
    type: read
    match: exact
    ar: "بَحْر"
    options: ["baḥar", "baḥr", "bāḥr"]
    answer: "baḥr"
    why: { id: "حْ bersukun, jadi tidak ada vokal di antara *ḥ* dan *r*.", en: "حْ has sukun, so there is no vowel between *ḥ* and *r*." }
  - id: h2-02-c2
    type: mark
    match: exact
    prompt: "Tanda apa di huruf kedua?"
    ar: "خُبْز"
    target: 1
    options: [sukun, fatha, damma]
    answer: sukun
    why: { id: "*Khubz*: ب ditutup tanpa vokal, itu sukun.", en: "*Khubz*: ب is closed with no vowel, that is sukun." }
  - id: h2-02-c3
    type: read
    match: exact
    ar: "بِنْت"
    options: ["bint", "binit", "bīnt"]
    answer: "bint"
    why: { id: "نْ bersukun menempel ke *bi*: *bin-t*.", en: "نْ with sukun joins *bi*: *bin-t*." }
  - id: h2-02-c4
    type: choice
    match: exact
    prompt: "Mana yang dibaca *waqt*?"
    options: ["وَقَت", "وَاقِت", "وَقْت"]
    answer: "وَقْت"
    why: { id: "*Waqt* butuh sukun di ق, bukan fathah.", en: "*Waqt* needs a sukun on ق, not a fathah." }
  - id: h2-02-c5
    type: listen
    match: exact
    audio: "يَوْم"
    options: ["يَوَم", "يَوْم"]
    answer: "يَوْم"
    why: { id: "Kamu mendengar *yawm*, satu suku kata *yaw*, lalu *m*.", en: "You heard *yawm*, one syllable *yaw*, then *m*." }
glossary:
  - { ar: "بَحْر", tr: "baḥr", id: "laut", en: "sea", gender: m, pos: noun }
  - { ar: "خُبْز", tr: "khubz", id: "roti", en: "bread", gender: m, pos: noun }
  - { ar: "وَقْت", tr: "waqt", id: "waktu", en: "time", gender: m, pos: noun, root: "و-ق-ت" }
  - { ar: "بِنْت", tr: "bint", id: "anak perempuan", en: "girl, daughter", gender: f, pos: noun }
  - { ar: "مِلْح", tr: "milḥ", id: "garam", en: "salt", gender: m, pos: noun }
next: huruf2-03-syaddah
---

## concept.id
Lingkaran kecil di atas huruf, **ـْ**, namanya *sukun*. Artinya huruf itu *mati*: tidak punya vokal. Ia menutup suku kata sebelumnya. **بَحْر** dibaca **baḥ-r**, bukan *ba-ḥa-r*.

Kamu sudah mengenal bunyi seperti ini di bahasa Indonesia: *n* di *pintu* atau *k* di *bapak* juga mati. Bedanya, bahasa Arab memberi tanda khusus untuknya.

Ada satu kasus menarik: **و** atau **ي** bersukun setelah fathah. Itu bukan vokal panjang, tapi bunyi rangkap: **yawm** (hari), seperti *au* di *pulau*.

## concept.en
The small circle above a letter, **ـْ**, is called *sukun*. It means the letter is *dead*: it has no vowel. It closes the syllable before it. **بَحْر** is read **baḥ-r**, not *ba-ḥa-r*.

You know sounds like this from Indonesian: the *n* in *pintu* or the *k* in *bapak* is closed too. The difference is that Arabic gives it its own mark.

One case to notice: **و** or **ي** with sukun after fathah. That is not a long vowel but a diphthong: **yawm** (day), like *ow* in *how*.

## contrast.id
Penutur bahasa Indonesia sering menyelipkan vokal di antara dua huruf mati, apalagi di akhir kata: *khubuz*, *waqat*. Itu wajar, karena bahasa kita jarang menumpuk konsonan.

Coba baca pelan-pelan dan dengarkan: **khubz** cuma satu suku kata. Kalau kamu mengaji, ini sama dengan huruf yang diberi tanda sukun di mushaf.

## contrast.en
Indonesian speakers often slip a vowel between two closed letters, especially at the end of a word: *khubuz*, *waqat*. That's natural, because Indonesian rarely stacks consonants.

Read slowly and listen: **khubz** is just one syllable. If you recite the Qur'an, it's the same as the sukun mark in the mushaf.
