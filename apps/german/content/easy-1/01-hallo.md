---
id: easy1-01-hallo
rung: easy-1
order: 1
status: draft
minutes: 7
title: { id: "Halo! Kamu dan Anda", en: "Hello! du and Sie", de: "Hallo!" }
summary:
  id: "Sapa dengan *Hallo* atau *Guten Tag*, tanya kabar dengan *Wie geht es dir?* untuk teman dan *Wie geht es Ihnen?* untuk orang yang kamu sapa dengan *Sie*."
  en: "Greet with *Hallo* or *Guten Tag*, and ask how someone is with *Wie geht es dir?* for a friend and *Wie geht es Ihnen?* for someone you call *Sie*."
introduces: [a1-greetings-register]
spiral: register
worked:
  - { de: "Hallo! Wie geht’s?", id: "Halo! Apa kabar?" }
  - { de: "Guten Tag, Frau Becker. Wie geht es Ihnen?", id: "Selamat siang, Bu Becker. Apa kabar?" }
  - { de: "Gut, danke. Und dir?", id: "Baik, terima kasih. Kamu?" }
examples:
  - { de: "[[Hallo]], Lena!", id: "Halo, Lena!" }
  - { de: "Guten [[Morgen]], Herr Schmidt.", id: "Selamat pagi, Pak Schmidt." }
  - { de: "Wie geht es [[dir]], Budi?", id: "Apa kabar, Budi?" }
  - { de: "Wie geht es [[Ihnen]], Frau Wagner?", id: "Apa kabar, Bu Wagner?" }
  - { de: "Gut, [[danke]]. Und Ihnen?", id: "Baik, terima kasih. Ibu sendiri?" }
  - { de: "[[Tschüss]], Dewi! Bis später!", id: "Dah, Dewi! Sampai nanti!" }
pair:
  off: "Guten Tag, Herr Schmidt. Wie geht es dir?"
  natural: "Guten Tag, Herr Schmidt. Wie geht es [[Ihnen]]?"
sound:
  focus: "tsch dan ü"
  words: ["Tschüss", "Guten Morgen"]
  tip:
    id: "*Tsch* dibaca seperti *c* dalam *cari*. *Ü*: ucapkan *i* sambil membulatkan bibir seperti *u*."
    en: "*Tsch* sounds like English *ch* in *chair*. *Ü*: say *i* with your lips rounded as for *u*."
work:
  situation: { id: "Hari pertama magang. Rina menyapa atasannya.", en: "First day of the placement. Rina greets her supervisor." }
  lines:
    - { who: Rina, de: "Guten Morgen, Frau Becker!", id: "Selamat pagi, Bu Becker!" }
    - { who: Frau Becker, de: "Guten Morgen! Wie geht es Ihnen?", id: "Selamat pagi! Apa kabar?" }
    - { who: Rina, de: "Gut, danke. Und Ihnen?", id: "Baik, terima kasih. Ibu sendiri?" }
    - { who: Frau Becker, de: "Auch gut, danke.", id: "Baik juga, terima kasih." }
talk:
  lines:
    - { who: Andi, de: "Hallo, Mei! Wie geht’s?", id: "Halo, Mei! Apa kabar?" }
    - { who: Mei, de: "Gut, danke. Und dir?", id: "Baik, makasih. Kamu?" }
    - { who: Andi, de: "Auch gut. Tschüss, bis später!", id: "Baik juga. Dah, sampai nanti!" }
tirukan: { de: "Guten Tag! Wie geht es Ihnen?", id: "Selamat siang! Apa kabar?" }
check:
  - id: e1-01-c1
    type: gap
    cue: "Budi temanmu."
    prompt: "Wie geht es ___, Budi?"
    options: [dir, Ihnen]
    answer: dir
    why: { id: "Budi teman, jadi *du*: *Wie geht es dir?*", en: "Budi is a friend, so *du*: *Wie geht es dir?*" }
  - id: e1-01-c2
    type: gap
    cue: "Kamu menyapa atasanmu, Pak Schmidt."
    prompt: "Guten Tag, Herr Schmidt. Wie geht es ___?"
    options: [dir, Ihnen]
    answer: Ihnen
    why: { id: "Di tempat kerja dan dengan orang yang belum akrab, pakai *Sie*: *Wie geht es Ihnen?*", en: "At work and with people you don't know well, use *Sie*: *Wie geht es Ihnen?*" }
  - id: e1-01-c3
    type: choice
    lang: id
    prompt: "Kapan kamu bilang *Tschüss*?"
    options: ["saat pamit dengan teman", "saat pertama bertemu", "saat berterima kasih"]
    answer: "saat pamit dengan teman"
    why: { id: "*Tschüss* artinya *dah*: santai, untuk teman. Yang sopan: *Auf Wiedersehen*.", en: "*Tschüss* means *bye*: casual, for friends. The polite one is *Auf Wiedersehen*." }
  - id: e1-01-c4
    type: listen
    audio: "Guten Abend."
    options: ["Guten Abend.", "Guten Morgen.", "Guten Tag."]
    answer: "Guten Abend."
    why: { id: "*Guten Abend*: selamat malam, untuk menyapa di sore dan malam hari.", en: "*Guten Abend*: good evening, a greeting for the evening." }
  - id: e1-01-c5
    type: order
    cue: "Apa kabar, Pak?"
    tiles: [es, Ihnen, Wie, geht]
    answer: [Wie, geht, es, Ihnen]
    why: { id: "*Wie geht es Ihnen?* secara harfiah: 'bagaimana keadaannya untuk Anda?'", en: "*Wie geht es Ihnen?* literally: 'how is it going for you?'" }
  - id: e1-01-c6
    type: fix
    wrong: "Guten Tag, Herr Klein! Wie geht es dir?"
    options: ["Guten Tag, Herr Klein! Wie geht es Ihnen?", "Hallo, Herr Klein! Wie geht es dir?"]
    answer: "Guten Tag, Herr Klein! Wie geht es Ihnen?"
    why: { id: "*Herr Klein* disapa dengan *Sie*, jadi *Ihnen*, bukan *dir*.", en: "You call *Herr Klein* *Sie*, so *Ihnen*, not *dir*." }
glossary:
  - { de: hallo, id: halo, pos: interj }
  - { de: tschüss, id: dah (akrab), pos: interj }
  - { de: danke, id: terima kasih, pos: interj }
  - { de: Guten Morgen, id: selamat pagi, pos: expr }
  - { de: Guten Tag, id: selamat siang, pos: expr }
  - { de: Guten Abend, id: selamat malam, pos: expr }
  - { de: Auf Wiedersehen, id: sampai jumpa (sopan), pos: expr }
  - { de: bis später, id: sampai nanti, pos: expr }
  - { de: gut, id: baik, pos: adj }
  - { de: auch, id: juga, pos: adv }
  - { de: du, id: kamu, pos: pron }
  - { de: Sie, id: "Anda, Bapak, Ibu", pos: pron }
next: easy1-02-ich-heisse
---

## concept.id
Bahasa Jerman punya dua kata untuk *kamu*. **Du** untuk teman, keluarga dan anak-anak. **Sie** (selalu huruf besar) untuk orang yang belum akrab, orang di tempat kerja dan orang yang lebih tua, seperti *Anda*, *Bapak* atau *Ibu*. Tanya kabarnya ikut berubah: *Wie geht es dir?* untuk du, *Wie geht es Ihnen?* untuk Sie.

## concept.en
German has two words for *you*. **Du** is for friends, family and children. **Sie** (always with a capital) is for people you don't know well, people at work and older people, like *Anda*, *Bapak* or *Ibu*. Asking how someone is changes with it: *Wie geht es dir?* for du, *Wie geht es Ihnen?* for Sie.

## contrast.id
Bahasa Indonesia cukup mengganti kata sapaan: *kamu* jadi *Bapak*. Bahasa Jerman mengganti kata gantinya, jadi *Herr Schmidt* dengan *dir* terdengar terlalu akrab. Kalau ragu di Jerman, pakai *Sie*.

## contrast.en
Indonesian only swaps the form of address: *kamu* becomes *Bapak*. German swaps the pronoun, so *Herr Schmidt* with *dir* sounds too familiar. When in doubt in Germany, use *Sie*.
