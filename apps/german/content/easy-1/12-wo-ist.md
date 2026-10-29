---
id: easy1-12-wo-ist
rung: easy-1
order: 12
status: draft
minutes: 10
title: { id: "Di mana letaknya?", en: "Where things are", de: "Wo ist der Schlüssel?" }
summary:
  id: "Sebutkan letak benda dengan frasa siap pakai: *auf dem Tisch*, *unter dem Bett*, *neben der Tür*, *im Schrank*, *in der Küche*."
  en: "Say where things are with ready-made phrases: *auf dem Tisch*, *unter dem Bett*, *neben der Tür*, *im Schrank*, *in der Küche*."
introduces: [a1-place-chunks]
spiral: prepositions
worked:
  - { de: "Wo ist das Handy?", id: "HP-nya di mana?" }
  - { de: "Das Handy ist auf dem Tisch.", id: "HP-nya di atas meja." }
  - { de: "Die Katze ist unter dem Bett.", id: "Kucingnya di bawah tempat tidur." }
  - { de: "Die Tasche ist neben der Tür.", id: "Tasnya di sebelah pintu." }
  - { de: "Der Schlüssel ist im Schrank.", id: "Kuncinya di dalam lemari." }
examples:
  - { de: "Der Schlüssel ist [[auf dem]] Tisch.", id: "Kuncinya di atas meja." }
  - { de: "Die Tasche ist [[unter dem]] Stuhl.", id: "Tasnya di bawah kursi." }
  - { de: "Mein Motorrad ist [[hinter dem]] Haus.", id: "Motorku di belakang rumah." }
  - { de: "Rina wartet [[vor der]] Apotheke.", id: "Rina menunggu di depan apotek." }
  - { de: "Die Lampe ist [[neben dem]] Bett.", id: "Lampunya di sebelah tempat tidur." }
  - { de: "Meine Mutter ist [[in der]] Küche.", id: "Ibuku di dapur.", note: { id: "*Der* dan *das* → *dem* (*im* = *in dem*); *die* → *der*. Untuk sekarang, hafalkan frasanya saja.", en: "*Der* and *das* → *dem* (*im* = *in dem*); *die* → *der*. For now, just learn the phrases." } }
pair:
  off: "Das Handy ist in dem Tisch."
  natural: "Das Handy ist [[auf dem]] Tisch."
work:
  situation: { id: "Hari pertama di bangsal. Perawat senior menunjukkan letak barang kepada Rina.", en: "First day on the ward. The senior nurse shows Rina where things are." }
  lines:
    - { who: Frau Becker, de: "Die Handtücher sind im Schrank.", id: "Handuknya di dalam lemari." }
    - { who: Rina, de: "Und die Medikamente?", id: "Kalau obat-obatnya?" }
    - { who: Frau Becker, de: "Auf dem Tisch, neben dem Computer.", id: "Di atas meja, di sebelah komputer." }
    - { who: Rina, de: "Danke, Frau Becker.", id: "Terima kasih, Bu Becker." }
words:
  id: "*Handuk* datang dari bahasa Belanda *handdoek*. Bahasa Jerman: **das Handtuch**, dari *die Hand* (tangan) + *das Tuch* (kain). Kata terakhir menentukan: *das*."
  en: "*Handuk* comes from Dutch *handdoek*. German: **das Handtuch**, from *die Hand* (hand) + *das Tuch* (cloth). The last word decides: *das*."
  bridges: [Handtuch]
  compounds: [[Hand, Tuch]]
tirukan: { de: "Der Schlüssel ist auf dem Tisch.", id: "Kuncinya di atas meja." }
check:
  - id: e1-12-c1
    type: gap
    cue: "Kuncinya di atas meja."
    prompt: "Der Schlüssel ist ___ Tisch."
    options: [auf dem, unter dem, im]
    answer: auf dem
    why: { id: "*Auf* = di atas (menempel di permukaan); *der Tisch* → *auf dem Tisch*.", en: "*Auf* = on (touching the surface); *der Tisch* → *auf dem Tisch*." }
  - id: e1-12-c2
    type: gap
    cue: "Kucingnya di bawah tempat tidur."
    prompt: "Die Katze ist ___ Bett."
    options: [unter dem, unter der]
    answer: unter dem
    why: { id: "*Das Bett* → *unter dem Bett*.", en: "*Das Bett* → *unter dem Bett*." }
  - id: e1-12-c3
    type: gap
    cue: "Tasnya di sebelah pintu."
    prompt: "Die Tasche ist ___ Tür."
    options: [neben der, neben dem]
    answer: neben der
    why: { id: "*Die Tür* → *neben der Tür*.", en: "*Die Tür* → *neben der Tür*." }
  - id: e1-12-c4
    type: listen
    audio: "Das Auto ist hinter dem Haus."
    options: ["Das Auto ist hinter dem Haus.", "Das Auto ist vor dem Haus."]
    answer: "Das Auto ist hinter dem Haus."
    why: { id: "*Hinter* = di belakang; *vor* = di depan.", en: "*Hinter* = behind; *vor* = in front of." }
  - id: e1-12-c5
    type: choice
    lang: id
    prompt: "*Im Schrank* artinya …"
    options: ["di dalam lemari", "di atas lemari", "di depan lemari"]
    answer: "di dalam lemari"
    why: { id: "*Im* = *in dem*: di dalam.", en: "*Im* = *in dem*: in, inside." }
  - id: e1-12-c6
    type: dictation
    audio: "Meine Mutter ist in der Küche."
    answer: "Meine Mutter ist in der Küche."
    why: { id: "*Die Küche* → *in der Küche*.", en: "*Die Küche* → *in der Küche*." }
glossary:
  - { de: auf, id: di atas, pos: prep }
  - { de: unter, id: di bawah, pos: prep }
  - { de: neben, id: di sebelah, pos: prep }
  - { de: hinter, id: di belakang, pos: prep }
  - { de: vor, id: di depan, pos: prep }
  - { de: Schrank, id: lemari, pos: noun, gender: m, plural: Schränke }
  - { de: Tür, id: pintu, pos: noun, gender: f, plural: Türen }
  - { de: Haus, id: rumah, pos: noun, gender: n, plural: Häuser }
  - { de: Tasche, id: tas, pos: noun, gender: f, plural: Taschen }
  - { de: Motorrad, id: sepeda motor, pos: noun, gender: n, plural: Motorräder }
  - { de: Handtuch, id: handuk, pos: noun, gender: n, plural: Handtücher, bridge: { nl: handdoek, id: handuk } }
  - { de: warten, id: menunggu, pos: verb, verb: { aux: haben, partizip: gewartet } }
next: null
---

## concept.id
Untuk menyebut letak: *in* (di dalam), *auf* (di atas), *unter* (di bawah), *neben* (di sebelah), *hinter* (di belakang), *vor* (di depan). Setelah kata-kata ini, *der* dan *das* menjadi **dem**, *die* menjadi **der**, dan *in dem* disingkat **im**. Alasannya (kasus datif) datang di Easy 2; sekarang hafalkan frasanya: *auf dem Tisch*, *in der Küche*.

## concept.en
To say where something is: *in* (in), *auf* (on), *unter* (under), *neben* (next to), *hinter* (behind), *vor* (in front of). After these words, *der* and *das* become **dem**, *die* becomes **der**, and *in dem* shortens to **im**. The reason (the dative case) comes in Easy 2; for now, learn the phrases: *auf dem Tisch*, *in der Küche*.

## contrast.id
Bahasa Indonesia sering cukup bilang *di*: *di meja*, *di dapur*. Bahasa Jerman harus memilih: di atas permukaan meja adalah *auf dem Tisch*, bukan *in dem Tisch* (itu di dalam mejanya!).

## contrast.en
Indonesian often just says *di*: *di meja*, *di dapur*. German has to choose: on top of the table is *auf dem Tisch*, not *in dem Tisch* (that would be inside the table!).
