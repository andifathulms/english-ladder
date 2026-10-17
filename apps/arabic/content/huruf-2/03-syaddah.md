---
# Draft by Claude. Before tanwin, words are shown as you say them when you stop (no ending).
id: huruf2-03-syaddah
rung: huruf-2
order: 3
status: draft
minutes: 7
title: { id: "Syaddah: huruf dobel", en: "Shaddah: the doubled letter", ar: "الشَّدَّةُ" }
summary:
  id: "Kamu bisa membaca syaddah: satu huruf yang diucapkan dua kali, sekali mati dan sekali hidup."
  en: "You can read shaddah: one letter said twice, once closed and once with its vowel."
introduces: [syaddah]
spiral: script
visual: { id: harakat-builder, props: { letter: "م", set: full } }
examples:
  - ar: "سُ[[كَّ]]ر"
    tr: "su[[kka]]r"
    id: "gula"
    en: "sugar"
    note: { id: "كّ = كْ + كَ: *suk-kar*.", en: "كّ = كْ + كَ: *suk-kar*." }
  - ar: "حَ[[مَّ]]ام"
    tr: "ḥa[[mmā]]m"
    id: "kamar mandi"
    en: "bathroom"
  - ar: "جَ[[دَّ]]ة"
    tr: "ja[[dda]]"
    id: "nenek"
    en: "grandmother"
    note: { id: "Ta marbuta (ة) di akhir kata, saat berhenti, dibaca *a*.", en: "Ta marbuta (ة) at the end of a word is read *a* when you stop." }
  - ar: "أُ[[مّ]]"
    tr: "u[[mm]]"
    id: "ibu"
    en: "mother"
  - ar: "كُرْسِ[[يّ]]"
    tr: "kursi[[yy]]"
    id: "kursi"
    en: "chair"
pair:
  off: { ar: "حَمَام", tr: "ḥamām" }
  natural: { ar: "حَمَّام", tr: "ḥammām" }
words:
  id: "Bahasa Indonesia biasanya membuang syaddah: *kursi* dari كُرْسِيّ (*kursiyy*), *umat* dari أُمَّة (*umma*). Di bahasa Arab huruf dobel itu harus terdengar, karena bisa mengubah kata."
  en: "Indonesian usually drops the shaddah: *kursi* from كُرْسِيّ (*kursiyy*), *umat* from أُمَّة (*umma*). In Arabic the doubled letter must be heard, because it can change the word."
tirukan:
  ar: "سُكَّر، حَمَّام، كُرْسِيّ"
  tr: "sukkar, ḥammām, kursiyy"
  id: "gula, kamar mandi, kursi"
  en: "sugar, bathroom, chair"
check:
  - id: h2-03-c1
    type: read
    match: exact
    ar: "سُكَّر"
    options: ["sukar", "sūkar", "sukkar"]
    answer: "sukkar"
    why: { id: "Syaddah di ك: *k* diucapkan dua kali, *suk-kar*.", en: "Shaddah on ك: *k* is said twice, *suk-kar*." }
  - id: h2-03-c2
    type: mark
    match: exact
    prompt: "Tanda apa di huruf kedua?"
    ar: "حَمَّام"
    target: 1
    options: [shadda, sukun, fatha]
    answer: shadda
    why: { id: "*Ḥammām*: م dobel, jadi ada syaddah.", en: "*Ḥammām*: م is doubled, so there is a shaddah." }
  - id: h2-03-c3
    type: listen
    match: exact
    audio: "حَمَّام"
    options: ["حَمَام", "حَمَّام"]
    answer: "حَمَّام"
    why: { id: "Kamu mendengar *mm* dobel: kamar mandi. Tanpa syaddah, حَمَام artinya burung merpati.", en: "You heard a double *mm*: bathroom. Without the shaddah, حَمَام means pigeons." }
  - id: h2-03-c4
    type: read
    match: exact
    ar: "جَدَّة"
    options: ["jada", "jadda", "jāda"]
    answer: "jadda"
    why: { id: "Syaddah di د: *jad-da*.", en: "Shaddah on د: *jad-da*." }
  - id: h2-03-c5
    type: choice
    match: exact
    prompt: "Mana yang dibaca *umm* (ibu)?"
    options: ["أُم", "أَم", "أُمّ"]
    answer: "أُمّ"
    why: { id: "*Umm* punya *m* dobel, jadi ada syaddah di atas م.", en: "*Umm* has a double *m*, so م carries a shaddah." }
glossary:
  - { ar: "سُكَّر", tr: "sukkar", id: "gula", en: "sugar", gender: m, pos: noun }
  - { ar: "حَمَّام", tr: "ḥammām", id: "kamar mandi", en: "bathroom", gender: m, pos: noun }
  - { ar: "جَدَّة", tr: "jadda", id: "nenek", en: "grandmother", gender: f, pos: noun }
  - { ar: "أُمّ", tr: "umm", id: "ibu", en: "mother", gender: f, pos: noun }
  - { ar: "كُرْسِيّ", tr: "kursiyy", id: "kursi", en: "chair", gender: m, pos: noun }
next: huruf2-04-tanwin
---

## concept.id
Tanda kecil seperti huruf *w* di atas huruf, **ـّ**, namanya *syaddah*. Artinya huruf itu dobel: sekali mati, sekali hidup. **سُكَّر** dibaca **suk-kar**: *k* pertama menutup *suk*, *k* kedua membuka *kar*.

Syaddah selalu datang bersama vokal: fathahnya di atas syaddah, kasrahnya biasanya di bawah syaddah. Jadi kamu membaca dua hal sekaligus: hurufnya dobel, dan vokalnya apa.

## concept.en
The small *w*-like mark above a letter, **ـّ**, is called *shaddah*. It means the letter is doubled: once closed, once open. **سُكَّر** is read **suk-kar**: the first *k* closes *suk*, the second opens *kar*.

Shaddah always comes with a vowel: the fathah sits above the shaddah, the kasrah usually just under it. So you read two things at once: the letter is doubled, and which vowel follows.

## contrast.id
Bahasa Indonesia jarang punya huruf dobel, jadi syaddah sering terbaca satu kali saja. Padahal di bahasa Arab hasilnya bisa kata lain. **ḥammām** adalah kamar mandi, tapi **ḥamām** adalah burung merpati.

Tahan sebentar huruf yang bersyaddah, seperti dua *k* yang bertemu di *bapak kami*. Kalau kamu mengaji, ini tanda yang sama dengan *tasydid*.

## contrast.en
Indonesian has few doubled letters, so shaddah often gets read only once. In Arabic that can give you another word. **ḥammām** is a bathroom, but **ḥamām** is pigeons.

Hold the doubled letter for a moment, like the two *k*s meeting in *bapak kami* (our father), or *nn* in *unnamed*. If you recite the Qur'an, this is the same mark as *tasydid*.
