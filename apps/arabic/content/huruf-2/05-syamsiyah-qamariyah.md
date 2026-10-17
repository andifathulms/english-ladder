---
# Draft by Claude.
id: huruf2-05-syamsiyah-qamariyah
rung: huruf-2
order: 5
status: draft
minutes: 8
title: { id: "Al-: huruf syamsiyah dan qamariyah", en: "Al-: sun letters and moon letters", ar: "الشَّمْسِيَّةُ وَالقَمَرِيَّةُ" }
summary:
  id: "Kamu bisa membaca ال: lam-nya dibaca sebelum huruf qamariyah, dan melebur sebelum huruf syamsiyah."
  en: "You can read ال: its lam is said before a moon letter and merges before a sun letter."
introduces: [al-sun-moon]
spiral: definiteness
visual: { id: sun-moon, props: { letter: "ش" } }
examples:
  - ar: "ال[[شَّ]]مْسُ"
    tr: "a[[sy-sya]]msu"
    id: "matahari itu"
    en: "the sun"
    note: { id: "ش huruf syamsiyah: lam tidak dibaca, ش jadi dobel.", en: "ش is a sun letter: the lam is silent and ش is doubled." }
  - ar: "ا[[لْ]]قَمَرُ"
    tr: "a[[l-]]qamaru"
    id: "bulan itu"
    en: "the moon"
    note: { id: "ق huruf qamariyah: lam bersukun dan dibaca.", en: "ق is a moon letter: the lam has sukun and is said." }
  - ar: "ال[[سَّ]]مَكُ"
    tr: "a[[s-sa]]maku"
    id: "ikan itu"
    en: "the fish"
  - ar: "ا[[لْ]]بَابُ"
    tr: "a[[l-]]bābu"
    id: "pintu itu"
    en: "the door"
  - ar: "ال[[نَّ]]جْمُ"
    tr: "a[[n-na]]jmu"
    id: "bintang itu"
    en: "the star"
pair:
  off: { ar: "الْشَمْسُ", tr: "al-syamsu" }
  natural: { ar: "الشَّمْسُ", tr: "asy-syamsu" }
sound:
  focus: "ال"
  words:
    - { ar: "الشَّمْسُ", tr: "asy-syamsu" }
    - { ar: "الْقَمَرُ", tr: "al-qamaru" }
    - { ar: "السَّمَكُ", tr: "as-samaku" }
    - { ar: "الْبَابُ", tr: "al-bābu" }
  tip:
    id: "Lihat huruf sesudah ال. Ada syaddah? Lompati lam-nya: **as-samaku**. Ada sukun di lam? Ucapkan lam-nya: **al-bābu**."
    en: "Look at the letter after ال. Is there a shaddah? Skip the lam: **as-samaku**. Is there a sukun on the lam? Say it: **al-bābu**."
words:
  id: "*Assalamualaikum* dimulai dengan السَّلَامُ (*as-salāmu*): *as-* itu sebenarnya *al-*, yang melebur ke س. Itu sebabnya tidak ada yang bilang *al-salamualaikum*."
  en: "*Assalamualaikum* starts with السَّلَامُ (*as-salāmu*): the *as-* is really *al-*, merged into س. That's why nobody says *al-salamualaikum*."
tirukan:
  ar: "الشَّمْسُ، الْقَمَرُ"
  tr: "asy-syamsu, al-qamaru"
  id: "matahari, bulan"
  en: "the sun, the moon"
check:
  - id: h2-05-c1
    type: read
    match: exact
    ar: "الشَّمْسُ"
    options: ["al-syamsu", "asy-syamsu", "asy-syamsun"]
    answer: "asy-syamsu"
    why: { id: "ش huruf syamsiyah, jadi lam melebur: *asy-syamsu*. Dengan al-, tidak ada tanwin.", en: "ش is a sun letter, so the lam merges: *asy-syamsu*. With al-, there is no tanwin." }
  - id: h2-05-c2
    type: read
    match: exact
    ar: "الْقَمَرُ"
    options: ["aq-qamaru", "al-qamarun", "al-qamaru"]
    answer: "al-qamaru"
    why: { id: "ق huruf qamariyah, jadi lam tetap dibaca: *al-qamaru*.", en: "ق is a moon letter, so the lam is said: *al-qamaru*." }
  - id: h2-05-c3
    type: mark
    match: exact
    prompt: "Tanda apa di huruf sesudah ال?"
    ar: "النَّجْمُ"
    target: 2
    options: [shadda, sukun, fatha]
    answer: shadda
    why: { id: "ن huruf syamsiyah: lam melebur, dan ن mendapat syaddah.", en: "ن is a sun letter: the lam merges and ن gets a shaddah." }
  - id: h2-05-c4
    type: mark
    match: exact
    prompt: "Tanda apa di lam?"
    ar: "الْبَابُ"
    target: 1
    options: [sukun, shadda, fatha]
    answer: sukun
    why: { id: "ب huruf qamariyah: lam dibaca mati, jadi bersukun.", en: "ب is a moon letter: the lam is said closed, so it has sukun." }
  - id: h2-05-c5
    type: choice
    match: exact
    prompt: "Mana yang huruf syamsiyah (lam-nya melebur)?"
    options: ["ق", "ب", "س", "ج"]
    answer: "س"
    why: { id: "س huruf syamsiyah: *as-samaku*. ق ب ج huruf qamariyah.", en: "س is a sun letter: *as-samaku*. ق ب ج are moon letters." }
glossary:
  - { ar: "شَمْسٌ", tr: "syamsun", id: "matahari", en: "sun", gender: f, pos: noun }
  - { ar: "قَمَرٌ", tr: "qamarun", id: "bulan", en: "moon", gender: m, pos: noun }
  - { ar: "سَمَكٌ", tr: "samakun", id: "ikan", en: "fish", gender: m, pos: noun }
  - { ar: "نَجْمٌ", tr: "najmun", id: "bintang", en: "star", gender: m, pos: noun }
next: huruf2-06-hamzah-washal
---

## concept.id
**ال** (*al-*) dipasang di depan kata benda untuk menunjuk benda tertentu. Cara membacanya tergantung huruf sesudahnya. Ada 14 huruf *qamariyah* (bulan): lam-nya dibaca dan diberi sukun, **الْقَمَرُ** (*al-qamaru*).

Ada 14 huruf *syamsiyah* (matahari): lam-nya tidak dibaca, dan huruf sesudahnya jadi dobel dengan syaddah, **الشَّمْسُ** (*asy-syamsu*). Huruf syamsiyah adalah ت ث د ذ ر ز س ش ص ض ط ظ ل ن. Sisanya qamariyah.

Perhatikan juga: dengan al-, tanwin hilang. **قَمَرٌ** jadi **الْقَمَرُ**, akhirannya *-u* saja.

## concept.en
**ال** (*al-*) goes in front of a noun to point to a particular thing. How you read it depends on the next letter. There are 14 *moon* letters: the lam is said and carries a sukun, **الْقَمَرُ** (*al-qamaru*).

There are 14 *sun* letters: the lam is silent, and the next letter is doubled with a shaddah, **الشَّمْسُ** (*asy-syamsu*). The sun letters are ت ث د ذ ر ز س ش ص ض ط ظ ل ن. The rest are moon letters.

Notice too: with al-, the tanwin goes. **قَمَرٌ** becomes **الْقَمَرُ**, ending in just *-u*.

## contrast.id
Karena tulisannya selalu ال, pembaca pemula sering membaca *al-* di mana-mana: *al-syamsu*. Kuncinya ada di tanda: kalau huruf sesudah ال bersyaddah, lompati lam-nya.

Kamu mungkin sudah mengenal ini dari mengaji, dengan nama *idgham syamsiyah* dan *izhar qamariyah*. Aturannya sama persis di bahasa Arab sehari-hari.

## contrast.en
Because it's always written ال, beginners often read *al-* everywhere: *al-syamsu*. The key is the marks: if the letter after ال has a shaddah, skip the lam.

You may know this from Qur'an recitation as *idgham syamsiyah* and *izhar qamariyah*. The rule is exactly the same in everyday Arabic.
