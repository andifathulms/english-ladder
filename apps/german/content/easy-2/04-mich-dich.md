---
id: easy2-04-mich-dich
rung: easy-2
order: 4
status: draft
minutes: 9
title: { id: "Aku, kamu, dia sebagai objek", en: "Me, you, him as objects", de: "Ich rufe dich an" }
summary:
  id: "Pakai kata ganti objek *mich, dich, ihn, sie, es, uns, euch*: *Ich rufe dich an*. *Ihn, sie, es* mengikuti gender kata bendanya."
  en: "Use the object pronouns *mich, dich, ihn, sie, es, uns, euch*: *Ich rufe dich an*. *Ihn, sie, es* follow the noun's gender."
introduces: [a1-pronouns-akk]
spiral: cases
worked:
  - { de: "Ich sehe den Bus. Ich sehe ihn.", id: "Aku lihat busnya. Aku melihatnya." }
  - { de: "Ich besuche meine Oma. Ich besuche sie.", id: "Aku menjenguk nenekku. Aku menjenguknya." }
  - { de: "Ich lese das Buch. Ich lese es.", id: "Aku baca bukunya. Aku membacanya." }
  - { de: "Lena ruft mich an. Ich rufe sie an.", id: "Lena meneleponku. Aku meneleponnya." }
examples:
  - { de: "Kannst du [[mich]] hören?", id: "Kamu bisa dengar aku?" }
  - { de: "Ich rufe [[dich]] morgen an.", id: "Besok aku teleponin kamu." }
  - { de: "Der Kaffee ist gut. Ich trinke [[ihn]] jeden Tag.", id: "Kopinya enak. Aku minum tiap hari.", note: { id: "*Der Kaffee* → *ihn*: kata gantinya ikut gender kata benda, walaupun bendanya bukan orang.", en: "*Der Kaffee* → *ihn*: the pronoun follows the noun's gender, even for things." } }
  - { de: "Wo ist Lena? Ich sehe [[sie]] nicht.", id: "Lena di mana? Aku nggak lihat dia." }
  - { de: "Wir besuchen [[euch]] am Sonntag.", id: "Hari Minggu kami main ke tempat kalian." }
  - { de: "Herr Schmidt holt [[uns]] um acht Uhr ab.", id: "Pak Schmidt menjemput kami jam delapan." }
pair:
  off: "Der Computer ist neu. Ich kaufe es."
  natural: "Der Computer ist neu. Ich kaufe [[ihn]]."
work:
  situation: { id: "Sif pagi di panti werdha. Bu Becker membagi tugas kepada Wayan.", en: "Early shift at a care home. Frau Becker gives Wayan his tasks." }
  lines:
    - { who: Frau Becker, de: "Frau Müller ruft. Hören Sie sie?", id: "Bu Müller memanggil. Anda dengar?" }
    - { who: Wayan, de: "Ja, ich höre sie. Ich gehe sofort.", id: "Ya, saya dengar. Saya segera ke sana." }
    - { who: Frau Becker, de: "Danke. Und Herr Weber braucht seinen Tee. Können Sie ihn machen?", id: "Terima kasih. Lalu Pak Weber perlu tehnya. Bisa Anda buatkan?" }
    - { who: Wayan, de: "Ja, natürlich. Ich mache ihn gleich.", id: "Ya, tentu. Sebentar lagi saya buatkan." }
talk:
  lines:
    - { who: Ayu, de: "Holst du mich am Bahnhof ab?", id: "Kamu jemput aku di stasiun?" }
    - { who: Rudi, de: "Ja, klar. Wann kommst du an?", id: "Iya dong. Kamu tiba jam berapa?" }
    - { who: Ayu, de: "Um halb drei. Ich rufe dich an!", id: "Jam setengah tiga. Nanti aku telepon kamu!" }
tirukan: { de: "Ich rufe dich morgen an.", id: "Besok aku teleponin kamu." }
check:
  - id: e2-04-c1
    type: gap
    cue: "Mejanya baru. Aku beli mejanya."
    prompt: "Der Tisch ist neu. Ich kaufe ___."
    options: [ihn, sie, es]
    answer: ihn
    why: { id: "*Der Tisch* → *ihn*.", en: "*Der Tisch* → *ihn*." }
  - id: e2-04-c2
    type: gap
    prompt: "Wo ist Lena? Ich suche ___."
    options: [sie, ihn, es]
    answer: sie
    why: { id: "Lena perempuan (*die*) → *sie*.", en: "Lena is a woman (*die*) → *sie*." }
  - id: e2-04-c3
    type: gap
    cue: "Kamu dengar aku? Aku di sini!"
    prompt: "Hörst du ___? Ich bin hier!"
    options: [mich, ich, mir]
    answer: mich
    why: { id: "*Ich* sebagai objek → *mich*.", en: "*Ich* as an object → *mich*." }
  - id: e2-04-c4
    type: fix
    wrong: "Das Buch ist gut. Ich lese ihn."
    options: ["Das Buch ist gut. Ich lese es.", "Das Buch ist gut. Ich lese sie."]
    answer: "Das Buch ist gut. Ich lese es."
    why: { id: "*Das Buch* → *es*.", en: "*Das Buch* → *es*." }
  - id: e2-04-c5
    type: wordorder
    cue: "Aku jemput kamu jam 8."
    tiles: [ab, Ich, dich, hole, um 8 Uhr]
    answer: [Ich, hole, dich, um 8 Uhr, ab]
    zones: [p1, verb, middle, middle, end]
    why: { id: "*Dich* biasanya langsung setelah kata kerja; *ab* di akhir.", en: "*Dich* usually comes right after the verb; *ab* at the end." }
  - id: e2-04-c6
    type: listen
    audio: "Wir besuchen euch am Sonntag."
    options: ["Wir besuchen euch am Sonntag.", "Wir besuchen uns am Sonntag."]
    answer: "Wir besuchen euch am Sonntag."
    why: { id: "*Euch* = kalian; *uns* = kami.", en: "*Euch* = you (plural); *uns* = us." }
glossary:
  - { de: mich, id: aku; saya (objek), en: me, pos: pron }
  - { de: dich, id: kamu (objek), en: you (object), pos: pron }
  - { de: ihn, id: dia; -nya (laki-laki; der), en: him; it (der), pos: pron }
  - { de: uns, id: kami; kita (objek), en: us, pos: pron }
  - { de: euch, id: kalian (objek), en: you all (object), pos: pron }
  - { de: abholen, id: menjemput; mengambil, en: to pick up, pos: verb, sep: ab, verb: { aux: haben, partizip: abgeholt } }
  - { de: treffen, id: bertemu, en: to meet, pos: verb, verb: { aux: haben, partizip: getroffen } }
  - { de: einladen, id: mengundang, en: to invite, pos: verb, sep: ein, verb: { aux: haben, partizip: eingeladen } }
  - { de: sofort, id: segera, en: immediately, pos: adv }
  - { de: klar, id: jelas, en: clear, pos: adj }
  - { de: jeden Tag, id: setiap hari, en: every day, pos: expr }
next: easy2-05-imperativ
---

## concept.id
Sebagai objek, kata ganti berubah: *ich → **mich***, *du → **dich***, *er → **ihn***, *wir → **uns***, *ihr → **euch***. *Sie*, *sie* dan *es* tetap sama. Untuk benda, pilih menurut gendernya: *der Kaffee → ihn*, *die Tasche → sie*, *das Buch → es*.

## concept.en
As objects, pronouns change: *ich → **mich***, *du → **dich***, *er → **ihn***, *wir → **uns***, *ihr → **euch***. *Sie*, *sie* and *es* stay the same. For things, choose by gender: *der Kaffee → ihn*, *die Tasche → sie*, *das Buch → es*.

## contrast.id
Bahasa Indonesia cukup memakai *-nya* untuk semuanya: *aku membelinya*. Bahasa Jerman harus tahu gender bendanya: komputer itu *der Computer*, jadi *Ich kaufe **ihn***, bukan *es*. Karena itu, belajar kata benda selalu bersama artikelnya.

## contrast.en
Indonesian uses *-nya* for everything: *aku membelinya*. German needs the thing's gender: the computer is *der Computer*, so *Ich kaufe **ihn***, not *es*. That's why you always learn a noun with its article.
