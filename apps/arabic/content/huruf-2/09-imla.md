---
# Draft by Claude. Dictation tiles carry their marks (قِ، ي، بَ…), so the learner writes the harakat too and the joined answer stays fully vowelled.
id: huruf2-09-imla
rung: huruf-2
order: 9
status: draft
minutes: 8
title: { id: "Imla': dengar, lalu tulis", en: "Dictation: hear it, then write it", ar: "الإِمْلَاءُ" }
summary:
  id: "Kamu bisa menulis kata yang kamu dengar: hurufnya, harakatnya, dan ta marbuta di ujungnya."
  en: "You can write a word you hear: its letters, its marks, and the ta marbuta at the end."
introduces: [imla]
spiral: script
visual: { id: word-joiner, props: { preset: "مدرسة" } }
examples:
  - ar: "مَدْرَسَ[[ةٌ]]"
    tr: "madrasa[[tun]]"
    id: "sekolah"
    en: "school"
    note: { id: "Bunyi *-atun* di ujung kata biasanya ditulis ة (ta marbuta), bukan ت.", en: "An *-atun* at the end of a word is usually written ة (ta marbuta), not ت." }
  - ar: "[[حَ]]قِيبَةٌ"
    tr: "[[ḥa]]qībatun"
    id: "tas"
    en: "bag"
    note: { id: "Desah tajam di awal: ح, bukan ه.", en: "A sharp breath at the start: ح, not ه." }
  - ar: "[[طَا]]وِلَةٌ"
    tr: "[[ṭā]]wilatun"
    id: "meja"
    en: "table"
    note: { id: "*T* yang tebal dan *a* yang gelap: ط, bukan ت.", en: "A heavy *t* and a dark *a*: ط, not ت." }
  - ar: "[[هَا]]تِفٌ"
    tr: "[[hā]]tifun"
    id: "telepon"
    en: "telephone"
    note: { id: "Napas ringan: ه. *Ā* panjang: tulis alif.", en: "A light breath: ه. A long *ā*: write an alif." }
  - ar: "مِ[[فْ]]تَاحٌ"
    tr: "mi[[f]]tāḥun"
    id: "kunci"
    en: "key"
pair:
  off: { ar: "مَدْرَسَه", tr: "madrasah" }
  natural: { ar: "مَدْرَسَةٌ", tr: "madrasatun" }
words:
  id: "*Madrasah* di bahasa Indonesia berarti sekolah agama. Di bahasa Arab, مَدْرَسَةٌ (*madrasatun*) adalah sekolah apa saja: SD, SMP, sekolah musik."
  en: "*Madrasah* in Indonesian means an Islamic school. In Arabic, مَدْرَسَةٌ (*madrasatun*) is any school: primary, secondary, a music school."
tirukan:
  ar: "مَدْرَسَةٌ، حَقِيبَةٌ"
  tr: "madrasatun, ḥaqībatun"
  id: "sekolah, tas"
  en: "school, bag"
check:
  - id: h2-09-c1
    type: spell
    match: exact
    prompt: "Dengarkan, lalu tulis."
    audio: "هَاتِفٌ"
    dictation: true
    letters: ["هَ", "ا", "تِ", "فٌ"]
    distractors: ["حَ", "طِ"]
    answer: "هَاتِفٌ"
    why: { id: "*Hātifun*: ه ringan, alif untuk *ā* panjang, ت tipis, dan tanwin di ف.", en: "*Hātifun*: a light ه, alif for the long *ā*, a thin ت, and tanwin on ف." }
  - id: h2-09-c2
    type: spell
    match: exact
    prompt: "Dengarkan, lalu tulis."
    audio: "مِفْتَاحٌ"
    dictation: true
    letters: ["مِ", "فْ", "تَ", "ا", "حٌ"]
    distractors: ["هٌ", "طَ"]
    answer: "مِفْتَاحٌ"
    why: { id: "*Miftāḥun*: ف bersukun, *tā* panjang, dan ح tajam di ujung.", en: "*Miftāḥun*: ف with sukun, a long *tā*, and a sharp ح at the end." }
  - id: h2-09-c3
    type: spell
    match: exact
    prompt: "Dengarkan, lalu tulis."
    audio: "حَقِيبَةٌ"
    dictation: true
    letters: ["حَ", "قِ", "ي", "بَ", "ةٌ"]
    distractors: ["هَ", "كِ"]
    answer: "حَقِيبَةٌ"
    why: { id: "*Ḥaqībatun*: ح tajam, ق dalam, *qī* panjang, dan ة di ujung.", en: "*Ḥaqībatun*: a sharp ح, a deep ق, a long *qī*, and ة at the end." }
  - id: h2-09-c4
    type: spell
    match: exact
    prompt: "Dengarkan, lalu tulis."
    audio: "طَاوِلَةٌ"
    dictation: true
    letters: ["طَ", "ا", "وِ", "لَ", "ةٌ"]
    distractors: ["تَ", "تٌ"]
    answer: "طَاوِلَةٌ"
    why: { id: "*Ṭāwilatun*: ط tebal di awal, dan *-atun* di ujung ditulis ة.", en: "*Ṭāwilatun*: a heavy ط at the start, and the final *-atun* is written ة." }
  - id: h2-09-c5
    type: spell
    match: exact
    prompt: "Dengarkan, lalu tulis."
    audio: "مَدْرَسَةٌ"
    dictation: true
    letters: ["مَ", "دْ", "رَ", "سَ", "ةٌ"]
    distractors: ["صَ", "ضْ"]
    answer: "مَدْرَسَةٌ"
    why: { id: "*Madrasatun*: د bersukun, س tipis, dan ة di ujung.", en: "*Madrasatun*: د with sukun, a thin س, and ة at the end." }
glossary:
  - { ar: "مَدْرَسَةٌ", tr: "madrasatun", id: "sekolah", en: "school", gender: f, pos: noun, root: "د-ر-س" }
  - { ar: "حَقِيبَةٌ", tr: "ḥaqībatun", id: "tas", en: "bag", gender: f, pos: noun }
  - { ar: "طَاوِلَةٌ", tr: "ṭāwilatun", id: "meja", en: "table", gender: f, pos: noun }
  - { ar: "هَاتِفٌ", tr: "hātifun", id: "telepon", en: "telephone", gender: m, pos: noun }
  - { ar: "مِفْتَاحٌ", tr: "miftāḥun", id: "kunci", en: "key", gender: m, pos: noun, root: "ف-ت-ح" }
next: huruf2-10-membaca
---

## concept.id
*Imla'* artinya dikte: kamu mendengar kata, lalu menuliskannya. Di sini semua yang sudah kamu pelajari dipakai bersamaan. Dengarkan vokalnya: pendek atau panjang? Ada huruf mati? Ada huruf dobel? Lalu dengarkan hurufnya: ح atau ه, س atau ص, ت atau ط?

Di soal dikte, kamu mengetuk huruf beserta harakatnya, dan huruf-huruf itu menyambung sendiri jadi kata. Kamu tidak perlu memikirkan bentuk awal, tengah atau akhir.

Satu kebiasaan penting: bunyi *-atun* atau *-a* di ujung kata benda hampir selalu ditulis **ة** (ta marbuta).

## concept.en
*Imla'* means dictation: you hear a word, then write it. Here everything you've learned works together. Listen to the vowels: short or long? Is there a closed letter? A doubled one? Then listen to the letters: ح or ه, س or ص, ت or ط?

In dictation items you tap letters with their marks, and they join into a word by themselves. You don't need to think about initial, medial or final forms.

One useful habit: an *-atun* or *-a* at the end of a noun is almost always written **ة** (ta marbuta).

## contrast.id
Penutur Indonesia sering menulis ة sebagai ه, karena di ujung kalimat keduanya terdengar seperti *-ah*: *madrasah*. Ingat dua titik di atasnya. ة bisa dibaca *t* saat kata menyambung, ه tidak pernah.

Kalau ragu antara dua huruf, putar ulang dan dengarkan vokal sesudahnya. Setelah huruf tebal seperti ط atau ص, *a*-nya terdengar lebih gelap.

## contrast.en
Indonesian speakers often write ة as ه, because at the end of a sentence both sound like *-ah*: *madrasah*. Remember the two dots on top. ة can be read *t* when the word runs on; ه never is.

If you're unsure between two letters, replay and listen to the vowel after it. After a heavy letter like ط or ص, the *a* sounds darker.
