---
id: easy2-09-wohnung
rung: easy-2
order: 9
status: draft
minutes: 9
title: { id: "Tempat tinggal dan iklan sewa", en: "Housing and the flat ad", de: "Die Wohnung hat drei Zimmer" }
summary:
  id: "Sebut ruangan dan perabot, pahami iklan sewa (*2 Zimmer, 55 m², 650 € warm*) dan bentuk kata majemuk: *Schlaf + Zimmer = das Schlafzimmer*."
  en: "Name rooms and furniture, read a flat ad (*2 Zimmer, 55 m², 650 € warm*) and build compounds: *Schlaf + Zimmer = das Schlafzimmer*."
introduces: [a1-housing]
spiral: gender
visual: { id: compound-builder, props: { compounds: [Wohnzimmer, Schlafzimmer, Kühlschrank, Schreibtisch, Kinderzimmer] } }
examples:
  - { de: "Die Wohnung hat drei [[Zimmer]].", id: "Apartemennya punya tiga kamar." }
  - { de: "Das [[Schlafzimmer]] ist klein, aber hell.", id: "Kamar tidurnya kecil, tapi terang." }
  - { de: "Die Küche hat einen [[Herd]] und einen Kühlschrank.", id: "Dapurnya ada kompor dan kulkas." }
  - { de: "Die [[Miete]] ist 650 Euro warm.", id: "Sewanya 650 euro, sudah termasuk pemanas.", note: { id: "*Warm* = termasuk biaya pemanas dan air; *kalt* = belum termasuk.", en: "*Warm* = heating and water included; *kalt* = not included." } }
  - { de: "Wir suchen eine Wohnung mit [[Balkon]].", id: "Kami cari apartemen yang ada balkonnya." }
  - { de: "Die Wohnung ist ruhig und [[zentral]].", id: "Apartemennya tenang dan di tengah kota." }
pair:
  off: "Das ist das Zimmer Schlaf."
  natural: "Das ist das [[Schlafzimmer]]."
words:
  id: "*Kamar* datang dari bahasa Belanda *kamer*, tapi bahasa Jerman memakai **das Zimmer**; *wastafel* (Belanda *wastafel*) di sini **das Waschbecken**. Kata majemuk dibaca dari belakang: **das Schlafzimmer** = *Zimmer* untuk *schlafen* (kamar tidur). Kata terakhir menentukan artikelnya."
  en: "*Kamar* comes from Dutch *kamer*, but German uses **das Zimmer**; a *wastafel* (Dutch *wastafel*) is **das Waschbecken** here. Compounds read from the back: **das Schlafzimmer** = a *Zimmer* for *schlafen* (a bedroom). The last word decides the article."
  bridges: [Zimmer, Waschbecken]
  compounds: [[Wohn, Zimmer], [Schlaf, Zimmer], [Kühl, Schrank]]
talk:
  lines:
    - { who: Rina, de: "Wie ist deine Wohnung?", id: "Apartemenmu gimana?" }
    - { who: Dewi, de: "Sie ist klein, aber hell. Sie hat ein Zimmer, eine Küche und ein Bad.", id: "Kecil, tapi terang. Ada satu kamar, dapur dan kamar mandi." }
    - { who: Rina, de: "Und die Miete?", id: "Sewanya berapa?" }
    - { who: Dewi, de: "Nur 400 Euro warm!", id: "Cuma 400 euro, udah termasuk pemanas!" }
tirukan: { de: "Das Schlafzimmer ist klein, aber hell.", id: "Kamar tidurnya kecil, tapi terang." }
check:
  - id: e2-09-c1
    type: gender
    noun: Schlafzimmer
    answer: n
    why: { id: "Kata terakhir menentukan: *das Zimmer* → *das Schlafzimmer*.", en: "The last word decides: *das Zimmer* → *das Schlafzimmer*." }
  - id: e2-09-c2
    type: gender
    noun: Schreibtisch
    answer: m
    why: { id: "*Der Tisch* → *der Schreibtisch* (meja untuk menulis).", en: "*Der Tisch* → *der Schreibtisch* (a table for writing)." }
  - id: e2-09-c3
    type: choice
    lang: id
    prompt: "Iklan: *2-Zi.-Whg., 55 m², Balkon, 650 € warm*. Artinya …"
    options: ["apartemen 2 kamar, 55 m², ada balkon, 650 € sudah termasuk pemanas", "rumah 2 lantai, 55 m², ada balkon, 650 € belum termasuk pemanas", "apartemen 2 kamar, 55 m², tanpa balkon, 650 € per minggu"]
    answer: "apartemen 2 kamar, 55 m², ada balkon, 650 € sudah termasuk pemanas"
    why: { id: "*Zi.* = *Zimmer*, *Whg.* = *Wohnung*, *warm* = termasuk pemanas. Iklan Jerman banyak memakai singkatan.", en: "*Zi.* = *Zimmer*, *Whg.* = *Wohnung*, *warm* = heating included. German ads use lots of abbreviations." }
  - id: e2-09-c4
    type: gap
    cue: "Apartemennya punya kamar mandi dan dua kamar."
    prompt: "Die Wohnung hat ein Bad und zwei ___."
    options: [Zimmer, Zimmern, Zimmers]
    answer: Zimmer
    why: { id: "*Das Zimmer*, jamak *die Zimmer*: tidak berubah.", en: "*Das Zimmer*, plural *die Zimmer*: no change." }
  - id: e2-09-c5
    type: listen
    audio: "Die Wohnung hat einen Balkon."
    options: ["Die Wohnung hat einen Balkon.", "Die Wohnung hat keinen Balkon."]
    answer: "Die Wohnung hat einen Balkon."
    why: { id: "*Einen* = ada satu; *keinen* = tidak ada.", en: "*Einen* = there is one; *keinen* = there isn't one." }
  - id: e2-09-c6
    type: wordorder
    cue: "Kami cari apartemen yang ada balkonnya."
    tiles: [eine Wohnung, Wir, mit Balkon, suchen]
    answer: [Wir, suchen, eine Wohnung, mit Balkon]
    zones: [p1, verb, middle, middle]
    why: { id: "*Suchen* di posisi 2; *mit Balkon* menjelaskan apartemennya.", en: "*Suchen* in position 2; *mit Balkon* describes the flat." }
glossary:
  - { de: Schlafzimmer, id: kamar tidur, en: bedroom, pos: noun, gender: n, plural: Schlafzimmer }
  - { de: Kinderzimmer, id: kamar anak, en: children's room, pos: noun, gender: n, plural: Kinderzimmer }
  - { de: Bad, id: kamar mandi, en: bathroom, pos: noun, gender: n, plural: Bäder }
  - { de: Balkon, id: balkon, en: balcony, pos: noun, gender: m, plural: Balkone }
  - { de: Flur, id: lorong (rumah), en: hall, pos: noun, gender: m, plural: Flure }
  - { de: Herd, id: kompor, en: cooker, pos: noun, gender: m, plural: Herde }
  - { de: Schreibtisch, id: meja tulis, en: desk, pos: noun, gender: m, plural: Schreibtische }
  - { de: Anzeige, id: iklan, en: advert, pos: noun, gender: f, plural: Anzeigen }
  - { de: hell, id: terang, en: bright, pos: adj }
  - { de: ruhig, id: tenang, en: quiet; calm, pos: adj }
  - { de: zentral, id: di pusat kota, en: central, pos: adj }
  - { de: mieten, id: menyewa, en: to rent, pos: verb, verb: { aux: haben, partizip: gemietet } }
next: easy2-10-formular
---

## concept.id
Ruangan: *das Wohnzimmer, das Schlafzimmer, die Küche, das Bad, der Flur, der Balkon*. Banyak kata rumah adalah **kata majemuk**: *Schlaf + Zimmer = das Schlafzimmer*, *Kühl + Schrank = der Kühlschrank*. **Kata terakhir menentukan artikelnya.** Iklan sewa memakai singkatan: *Zi.* (Zimmer), *Whg.* (Wohnung), *warm* (termasuk pemanas).

## concept.en
Rooms: *das Wohnzimmer, das Schlafzimmer, die Küche, das Bad, der Flur, der Balkon*. Many home words are **compounds**: *Schlaf + Zimmer = das Schlafzimmer*, *Kühl + Schrank = der Kühlschrank*. **The last word decides the article.** Flat ads use abbreviations: *Zi.* (Zimmer), *Whg.* (Wohnung), *warm* (heating included).

## contrast.id
Bahasa Indonesia meletakkan kata utama di depan: *kamar tidur*, *meja tulis*. Bahasa Jerman membaliknya dan menyatukannya: *Schlafzimmer*, *Schreibtisch*. Jadi *Zimmer Schlaf* salah: baca dari belakang, kata terakhir adalah bendanya.

## contrast.en
Indonesian puts the main word first: *kamar tidur*, *meja tulis*. German flips the order and writes one word: *Schlafzimmer*, *Schreibtisch*. So *Zimmer Schlaf* is wrong: read from the back, the last word is the thing itself.
