---
# Draft by Claude. Check items hide transliteration; the examples read as one short passage.
id: huruf2-10-membaca
rung: huruf-2
order: 10
status: draft
minutes: 8
title: { id: "Membaca tanpa transliterasi", en: "Reading without transliteration", ar: "القِرَاءَةُ" }
summary:
  id: "Kamu bisa membaca kalimat pendek berharakat lengkap sendiri, tanpa bantuan huruf Latin."
  en: "You can read short, fully vowelled sentences on your own, without Latin letters to help."
introduces: [reading-passage]
spiral: script
worked:
  - { ar: "الشَّايُ [[حَارٌّ]].", tr: "asy-syāyu [[ḥārr]].", id: "Tehnya panas. (berhenti: *ḥārr*)" }
  - { ar: "المَاءُ [[بَارِدٌ]].", tr: "al-māʾu [[bārid]].", id: "Airnya dingin. (berhenti: *bārid*)" }
examples:
  - ar: "هٰذَا [[مَطْبَخٌ]]."
    tr: "hādzā [[maṭbakhun]]."
    id: "Ini dapur."
    en: "This is a kitchen."
    note: { id: "Alif kecil di atas ه (ـٰ) dibaca panjang: *hā*.", en: "The small alif above ه (ـٰ) is read long: *hā*." }
  - ar: "المَطْبَخُ [[صَغِيرٌ]]."
    tr: "al-maṭbakhu [[ṣaghīrun]]."
    id: "Dapurnya kecil."
    en: "The kitchen is small."
  - ar: "الأُمُّ [[فِي]] المَطْبَخِ."
    tr: "al-ummu [[fī]] l-maṭbakhi."
    id: "Ibu di dapur."
    en: "Mother is in the kitchen."
  - ar: "الشَّايُ [[حَارٌّ]]."
    tr: "asy-syāyu [[ḥārrun]]."
    id: "Tehnya panas."
    en: "The tea is hot."
  - ar: "المَاءُ [[بَارِدٌ]]."
    tr: "al-māʾu [[bāridun]]."
    id: "Airnya dingin."
    en: "The water is cold."
pair:
  off: { ar: "الشَّايُ حَارٌّ.", tr: "asy-syāyu ḥārrun." }
  natural: { ar: "الشَّايُ حَارٌّ.", tr: "asy-syāyu ḥārr." }
words:
  id: "*Kalimat* di bahasa Indonesia berarti satu kalimat utuh. Di bahasa Arab, كَلِمَةٌ (*kalimatun*) hanya satu kata. Jadi الشَّايُ حَارٌّ adalah satu kalimat yang terdiri dari dua كَلِمَة."
  en: "*Kalimat* in Indonesian means a whole sentence. In Arabic, كَلِمَةٌ (*kalimatun*) is just one word. So الشَّايُ حَارٌّ is one sentence made of two كَلِمَة."
tirukan:
  ar: "الأُمُّ فِي المَطْبَخِ."
  tr: "al-ummu fī l-maṭbakhi."
  id: "Ibu di dapur."
  en: "Mother is in the kitchen."
check:
  - id: h2-10-c1
    type: read
    match: exact
    ar: "المَطْبَخُ صَغِيرٌ."
    options: ["Dapurnya kecil.", "Dapurnya besar.", "Ini dapur."]
    answer: "Dapurnya kecil."
    why: { id: "صَغِيرٌ artinya kecil. Al- di المَطْبَخُ berarti dapur yang itu.", en: "صَغِيرٌ means small. The al- on المَطْبَخُ means that particular kitchen." }
  - id: h2-10-c2
    type: read
    match: exact
    ar: "الشَّايُ حَارٌّ."
    options: ["Tehnya dingin.", "Tehnya panas.", "Airnya panas."]
    answer: "Tehnya panas."
    why: { id: "الشَّايُ adalah teh, حَارٌّ adalah panas.", en: "الشَّايُ is the tea, حَارٌّ is hot." }
  - id: h2-10-c3
    type: read
    match: exact
    ar: "المَاءُ بَارِدٌ."
    options: ["al-māʾu bāridun", "al-maʾu bāridan", "am-māʾu bāridun"]
    answer: "al-māʾu bāridun"
    why: { id: "م huruf qamariyah, jadi *al-*. *Mā* panjang, dan akhirannya *-un*.", en: "م is a moon letter, so *al-*. *Mā* is long, and the ending is *-un*." }
  - id: h2-10-c4
    type: read
    match: exact
    ar: "الأُمُّ فِي المَطْبَخِ."
    options: ["Ibu di dapur.", "Ibu di sekolah.", "Nenek di dapur."]
    answer: "Ibu di dapur."
    why: { id: "الأُمُّ adalah ibu, فِي المَطْبَخِ adalah di dapur.", en: "الأُمُّ is mother, فِي المَطْبَخِ is in the kitchen." }
  - id: h2-10-c5
    type: mark
    match: exact
    prompt: "Tanda apa di ر?"
    ar: "حَارٌّ"
    target: 2
    options: [shadda, sukun, tanwin-damm]
    answer: shadda
    why: { id: "*Ḥārrun*: ر dobel, jadi ada syaddah (bersama tanwin).", en: "*Ḥārrun*: ر is doubled, so there is a shaddah (with tanwin)." }
glossary:
  - { ar: "مَطْبَخٌ", tr: "maṭbakhun", id: "dapur", en: "kitchen", gender: m, pos: noun, root: "ط-ب-خ" }
  - { ar: "صَغِيرٌ", tr: "ṣaghīrun", id: "kecil", en: "small", pos: adj }
  - { ar: "حَارٌّ", tr: "ḥārrun", id: "panas", en: "hot", pos: adj }
  - { ar: "بَارِدٌ", tr: "bāridun", id: "dingin", en: "cold", pos: adj }
---

## concept.id
Kamu sudah mengenal semua huruf dan semua tanda. Sekarang saatnya membaca kalimat sendiri. Di soal latihan, huruf Latin disembunyikan: hanya ada tulisan Arab dan kamu.

Bacalah per kata, dari kanan ke kiri. Untuk tiap kata, tanyakan: ada ال? Huruf sesudahnya syamsiyah atau qamariyah? Ada mad, sukun, syaddah atau tanwin? Lalu sambungkan kata-katanya. Kalau kata sebelumnya berakhir vokal, alif ال dilewati: **fī l-maṭbakhi**.

Saat berhenti di akhir kalimat, vokal atau tanwin terakhir boleh tidak dibaca: **ḥārr**, bukan *ḥārrun*. Ini namanya *waqaf*, berhenti.

## concept.en
You know every letter and every mark now. Time to read sentences on your own. In the check items the Latin letters are hidden: it's just the Arabic and you.

Read word by word, right to left. For each word, ask: is there ال? Is the next letter a sun or moon letter? Is there mad, sukun, shaddah or tanwin? Then join the words. If the word before ends in a vowel, the alif of ال is skipped: **fī l-maṭbakhi**.

When you stop at the end of a sentence, the last vowel or tanwin can be left off: **ḥārr**, not *ḥārrun*. This is called *waqaf*, stopping.

## contrast.id
Selama ini kamu bisa melirik transliterasi. Wajar kalau mata masih mencarinya. Coba tutup baris Latin dengan jari, baca dulu, baru cek.

Ini juga yang membedakan membaca dari mengaji hafalan: kamu membaca kata yang belum pernah kamu dengar. Pelan tidak apa-apa. Tepat lebih penting dari cepat.

## contrast.en
Until now you could glance at the transliteration. It's natural if your eyes still look for it. Try covering the Latin line with your finger, read first, then check.

This is also what makes reading different from reciting from memory: you're reading words you've never heard. Slow is fine. Accurate matters more than fast.
