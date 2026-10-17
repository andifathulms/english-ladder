---
# Draft by Claude. Reviewer: please check the listening pair خَرَزٌ / كَرَزٌ (beads / cherries) in h2-07-c3.
id: huruf2-07-ain-ha-kha
rung: huruf-2
order: 7
status: draft
minutes: 8
title: { id: "Bunyi tenggorokan: ع ء, ح ه, خ ك", en: "Throat sounds: ع ء, ح ه, خ ك", ar: "أَصْوَاتُ الحَلْقِ" }
summary:
  id: "Kamu bisa membedakan tiga pasang bunyi yang sering tertukar: ع dan ء, ح dan ه, خ dan ك."
  en: "You can tell apart three pairs of sounds that often get mixed up: ع and ء, ح and ه, خ and ك."
introduces: [sounds-throat]
spiral: sounds
visual: { id: makhraj, props: { pair: ["ع", "ء"] } }
examples:
  - ar: "[[عَ]]لَمٌ"
    tr: "[[ʿa]]lamun"
    id: "bendera"
    en: "flag"
    note: { id: "ع dari tengah tenggorokan: tenggorokan agak dijepit, suaranya tetap keluar.", en: "ع comes from the middle of the throat: squeeze it a little and keep the voice going." }
  - ar: "[[أَ]]لَمٌ"
    tr: "[[a]]lamun"
    id: "rasa sakit"
    en: "pain"
    note: { id: "ء dari pangkal tenggorokan: putus sebentar, seperti di tengah kata *saat*.", en: "ء comes from the bottom of the throat: a short catch, like the break in *uh-oh*." }
  - ar: "[[حَا]]لٌ"
    tr: "[[ḥā]]lun"
    id: "keadaan"
    en: "state, condition"
    note: { id: "ح desah yang tajam dari tengah tenggorokan, seperti mengembus kaca supaya berembun, tapi lebih sempit.", en: "ح is a sharp breath from the middle of the throat, like fogging a mirror, but tighter." }
  - ar: "كَيْفَ ال[[حَا]]لُ؟"
    tr: "kayfa l-[[ḥā]]lu?"
    id: "Apa kabar?"
    en: "How are you?"
  - ar: "[[خَ]]بَرٌ"
    tr: "[[kha]]barun"
    id: "berita, kabar"
    en: "news"
    note: { id: "خ bunyi gesek di ujung tenggorokan, seperti mendengkur pelan. ك tertutup rapat dan meletup.", en: "خ is a rasping sound at the top of the throat, like a soft snore. ك closes fully and pops." }
  - ar: "أَ[[هْ]]لٌ"
    tr: "a[[h]]lun"
    id: "keluarga"
    en: "family"
pair:
  off: { ar: "أَلَمٌ", tr: "alamun" }
  natural: { ar: "عَلَمٌ", tr: "ʿalamun" }
sound:
  focus: "ع"
  compare: "ء"
  words:
    - { ar: "عَلَمٌ", tr: "ʿalamun" }
    - { ar: "أَلَمٌ", tr: "alamun" }
    - { ar: "عَلِيمٌ", tr: "ʿalīmun" }
    - { ar: "أَلِيمٌ", tr: "alīmun" }
    - { ar: "عِلْمٌ", tr: "ʿilmun" }
    - { ar: "أَهْلٌ", tr: "ahlun" }
  tip:
    id: "Untuk ع, bayangkan suara *a* yang ditekan dari tenggorokan, seperti saat mengangkat barang berat. Untuk ء, cukup putus sebentar lalu lanjut."
    en: "For ع, imagine an *a* pressed from the throat, as when you lift something heavy. For ء, just a short catch and carry on."
words:
  id: "*Ahli* di bahasa Indonesia berarti pakar. Di bahasa Arab, أَهْلٌ (*ahlun*) berarti keluarga atau penghuni: أَهْلِي berarti keluargaku. *Kabar* berasal dari خَبَرٌ (*khabarun*): bahasa Indonesia mengubah خ jadi *k*, persis pertukaran yang dibahas di sini."
  en: "*Ahli* in Indonesian means an expert. In Arabic, أَهْلٌ (*ahlun*) means family or the people of a place: أَهْلِي is my family. *Kabar* (news) comes from خَبَرٌ (*khabarun*): Indonesian turned خ into *k*, exactly the swap this lesson is about."
tirukan:
  ar: "عَلَمٌ، أَلَمٌ، حَالٌ"
  tr: "ʿalamun, alamun, ḥālun"
  id: "bendera, rasa sakit, keadaan"
  en: "flag, pain, state"
check:
  - id: h2-07-c1
    type: listen
    match: exact
    audio: "عَلَمٌ"
    options: ["أَلَمٌ", "عَلَمٌ"]
    answer: "عَلَمٌ"
    why: { id: "Kamu mendengar suara tertekan dari tenggorokan: ع, *ʿalamun*, bendera.", en: "You heard a pressed throat sound: ع, *ʿalamun*, flag." }
  - id: h2-07-c2
    type: listen
    match: exact
    audio: "حَالٌ"
    options: ["حَالٌ", "هَالٌ"]
    answer: "حَالٌ"
    why: { id: "Desahnya tajam dan sempit: ح. ه lebih ringan, seperti napas biasa.", en: "The breath was sharp and narrow: ح. ه is lighter, like a normal breath." }
  - id: h2-07-c3
    type: listen
    match: exact
    audio: "خَرَزٌ"
    options: ["كَرَزٌ", "خَرَزٌ"]
    answer: "خَرَزٌ"
    why: { id: "Ada bunyi gesek di awal: خ, *kharazun*, manik-manik. كَرَزٌ artinya ceri.", en: "There was a rasping sound at the start: خ, *kharazun*, beads. كَرَزٌ means cherries." }
  - id: h2-07-c4
    type: read
    match: exact
    ar: "أَهْلٌ"
    options: ["ʿahlun", "ahlun", "aḥlun"]
    answer: "ahlun"
    why: { id: "Dimulai ء, bukan ع, dan hurufnya ه, bukan ح: *ahlun*.", en: "It starts with ء, not ع, and the letter is ه, not ح: *ahlun*." }
  - id: h2-07-c5
    type: read
    match: exact
    ar: "خَبَرٌ"
    options: ["kabarun", "ḥabarun", "khabarun"]
    answer: "khabarun"
    why: { id: "خ ditulis *kh*. Bahasa Indonesia menyerapnya jadi *kabar*.", en: "خ is written *kh*. Indonesian borrowed it as *kabar*." }
  - id: h2-07-c6
    type: choice
    match: exact
    prompt: "Mana yang berarti *rasa sakit*?"
    options: ["عَلَمٌ", "أَلَمٌ"]
    answer: "أَلَمٌ"
    why: { id: "أَلَمٌ dengan ء adalah rasa sakit. عَلَمٌ dengan ع adalah bendera.", en: "أَلَمٌ with ء is pain. عَلَمٌ with ع is a flag." }
glossary:
  - { ar: "عَلَمٌ", tr: "ʿalamun", id: "bendera", en: "flag", gender: m, pos: noun }
  - { ar: "أَلَمٌ", tr: "alamun", id: "rasa sakit", en: "pain", gender: m, pos: noun }
  - { ar: "حَالٌ", tr: "ḥālun", id: "keadaan", en: "state, condition", pos: noun }
  - { ar: "خَبَرٌ", tr: "khabarun", id: "berita, kabar", en: "news", gender: m, pos: noun, root: "خ-ب-ر" }
  - { ar: "أَهْلٌ", tr: "ahlun", id: "keluarga", en: "family", gender: m, pos: noun }
next: huruf2-08-qaf-tsa-dzal-dad
---

## concept.id
Bahasa Indonesia hanya punya satu *h* dan satu *k*, dan tidak membedakan *a* biasa dari *a* yang tertekan. Bahasa Arab punya dua untuk masing-masing. Kalau tertukar, kata berubah: **عَلَمٌ** (*ʿalamun*) adalah bendera, **أَلَمٌ** (*alamun*) adalah rasa sakit.

Tiga pasang di pelajaran ini: **ع** (tengah tenggorokan, tertekan) dan **ء** (putus sebentar); **ح** (desah tajam dari tengah tenggorokan) dan **ه** (napas ringan); **خ** (gesek di ujung tenggorokan) dan **ك** (pangkal lidah, meletup).

Di transliterasi, ع ditulis **ʿ**, ح ditulis **ḥ**, dan خ ditulis **kh**. Perhatikan tanda-tanda kecil itu.

## concept.en
Indonesian has one *h* and one *k*, and doesn't tell a plain *a* from a pressed one. Arabic has two of each. Swap them and the word changes: **عَلَمٌ** (*ʿalamun*) is a flag, **أَلَمٌ** (*alamun*) is pain.

The three pairs in this lesson: **ع** (middle of the throat, pressed) and **ء** (a short catch); **ح** (a sharp breath from the middle of the throat) and **ه** (a light breath); **خ** (rasping at the top of the throat) and **ك** (back of the tongue, a pop).

In transliteration, ع is written **ʿ**, ح is **ḥ**, and خ is **kh**. Watch for those small marks.

## contrast.id
Kata serapan menunjukkan bagaimana telinga Indonesia mendengar bunyi ini: ع jadi *a* atau hilang (*ilmu* dari عِلْمٌ), ح jadi *h* (*hal* dari حَالٌ), خ jadi *k* atau *kh* (*kabar*, *akhir*). Itu bukan salah di bahasa Indonesia. Tapi saat bicara bahasa Arab, bedanya harus terdengar.

Kalau kamu mengaji, kamu sudah melatih ini sebagai *makharijul huruf*. Lihat gambar mulut di atas dan tekan tombol putar untuk tiap pasangan.

## contrast.en
Loanwords show how Indonesian ears hear these sounds: ع becomes *a* or disappears (*ilmu* from عِلْمٌ), ح becomes *h* (*hal* from حَالٌ), خ becomes *k* or *kh* (*kabar*, *akhir*). That's not wrong in Indonesian. But when you speak Arabic, the difference has to be heard.

If you recite the Qur'an, you've already practised this as *makharijul huruf*. Look at the mouth diagram above and press play for each pair.
