---
id: easy2-07-wo-wohin
rung: easy-2
order: 7
status: draft
minutes: 10
title: { id: "Di mana? Ke mana? Kiri, kanan, lurus", en: "Where? Where to? Left, right, straight on", de: "Wo liegt das Handy?" }
summary:
  id: "*In, auf, unter, neben, hinter, vor, über, zwischen*: diam (*wo?*) memakai datif, bergerak ke suatu tempat (*wohin?*) memakai akusatif. Plus arah: *links, rechts, geradeaus*."
  en: "*In, auf, unter, neben, hinter, vor, über, zwischen*: staying put (*wo?*) takes the dative, moving somewhere (*wohin?*) takes the accusative. Plus directions: *links, rechts, geradeaus*."
introduces: [a1-wechsel]
spiral: prepositions
visual: { id: wechsel-scene, props: { initial: on, motion: false } }
examples:
  - { de: "Das Handy liegt auf [[dem]] Tisch.", id: "HP-nya ada di atas meja.", note: { id: "*Wo?* Tidak bergerak: datif, *auf dem Tisch*.", en: "*Wo?* No movement: dative, *auf dem Tisch*." } }
  - { de: "Ich lege das Handy auf [[den]] Tisch.", id: "Aku taruh HP-nya ke atas meja.", note: { id: "*Wohin?* Bergerak ke sana: akusatif, *auf den Tisch*.", en: "*Wohin?* Moving there: accusative, *auf den Tisch*." } }
  - { de: "Die Milch steht [[im]] Kühlschrank.", id: "Susunya ada di dalam kulkas." }
  - { de: "Ich stelle die Milch in [[den]] Kühlschrank.", id: "Aku taruh susunya ke dalam kulkas." }
  - { de: "Gehen Sie [[geradeaus]] und dann links.", id: "Jalan lurus, lalu belok kiri." }
  - { de: "Die Apotheke ist [[rechts]], neben der Bank.", id: "Apoteknya di sebelah kanan, di samping bank." }
pair:
  off: "Ich lege das Handy auf dem Tisch."
  natural: "Ich lege das Handy auf [[den]] Tisch."
work:
  situation: { id: "Wayan membereskan kamar pasien bersama Bu Becker.", en: "Wayan tidies a patient's room with Frau Becker." }
  lines:
    - { who: Frau Becker, de: "Stellen Sie die Flaschen bitte in den Schrank.", id: "Tolong taruh botol-botolnya ke dalam lemari." }
    - { who: Wayan, de: "Und wo liegen die Handtücher?", id: "Handuknya di mana, Bu?" }
    - { who: Frau Becker, de: "Im Regal, links neben der Tür.", id: "Di rak, sebelah kiri pintu." }
    - { who: Wayan, de: "Danke. Ich lege sie auf das Bett.", id: "Terima kasih. Saya taruh di atas tempat tidur." }
words:
  id: "*Bioskop* datang dari bahasa Belanda *bioscoop*, tapi bahasa Jerman memakai **das Kino**. *Liegen/legen* untuk benda yang berbaring (HP, buku), *stehen/stellen* untuk benda yang berdiri (botol, gelas)."
  en: "*Bioskop* comes from Dutch *bioscoop*, but German says **das Kino**. *Liegen/legen* is for things lying flat (a phone, a book), *stehen/stellen* for things standing up (a bottle, a glass)."
  bridges: [Kino]
talk:
  lines:
    - { who: Lestari, de: "Wo ist der Supermarkt?", id: "Supermarketnya di mana?" }
    - { who: Joko, de: "Geh hier geradeaus und dann rechts. Er ist neben dem Kino.", id: "Jalan lurus dari sini, terus belok kanan. Ada di sebelah bioskop." }
    - { who: Lestari, de: "Danke, Joko!", id: "Makasih, Joko!" }
tirukan: { de: "Gehen Sie geradeaus und dann links.", id: "Jalan lurus, lalu belok kiri." }
check:
  - id: e2-07-c1
    type: wechsel
    cue: "Aku taruh kuncinya ke atas meja."
    scene: { place: on, motion: true }
    sentence: "Ich lege den Schlüssel auf ___ Tisch."
    verb: legen
    options: [den, dem]
    answer: den
    why: { id: "Ada gerakan (*wohin?*): akusatif, *auf den Tisch*.", en: "There's movement (*wohin?*): accusative, *auf den Tisch*." }
  - id: e2-07-c2
    type: wechsel
    scene: { place: "next to", motion: false }
    sentence: "Die Tasche steht neben ___ Stuhl."
    verb: stehen
    options: [dem, den]
    answer: dem
    why: { id: "Tidak bergerak (*wo?*): datif, *neben dem Stuhl*.", en: "No movement (*wo?*): dative, *neben dem Stuhl*." }
  - id: e2-07-c3
    type: wechsel
    cue: "Aku taruh sepatunya ke bawah tempat tidur."
    scene: { place: under, motion: true }
    sentence: "Ich stelle die Schuhe unter ___ Bett."
    verb: stellen
    options: [das, dem]
    answer: das
    why: { id: "*Wohin?* Akusatif: *das Bett* tetap *das*.", en: "*Wohin?* Accusative: *das Bett* stays *das*." }
  - id: e2-07-c4
    type: wechsel
    scene: { place: in, motion: false }
    sentence: "Das Buch liegt in ___ Tasche."
    verb: liegen
    options: [der, die]
    answer: der
    why: { id: "*Wo?* Datif: *die Tasche* → *in der Tasche*.", en: "*Wo?* Dative: *die Tasche* → *in der Tasche*." }
  - id: e2-07-c5
    type: listen
    audio: "Gehen Sie geradeaus und dann links."
    options: ["Gehen Sie geradeaus und dann links.", "Gehen Sie geradeaus und dann rechts."]
    answer: "Gehen Sie geradeaus und dann links."
    why: { id: "*Links* = kiri; *rechts* = kanan.", en: "*Links* = left; *rechts* = right." }
  - id: e2-07-c6
    type: gap
    cue: "HP-nya di mana? Di atas meja."
    prompt: "Wo ___ das Handy? Auf dem Tisch."
    options: [liegt, legt]
    answer: liegt
    why: { id: "*Liegen* = terletak (diam); *legen* = menaruh (ada gerakan).", en: "*Liegen* = to lie (no movement); *legen* = to put down (movement)." }
glossary:
  - { de: liegen, id: terletak (berbaring), en: to lie, pos: verb, verb: { aux: haben, partizip: gelegen } }
  - { de: legen, id: menaruh (berbaring), en: to lay; put, pos: verb, verb: { aux: haben, partizip: gelegt } }
  - { de: stehen, id: berdiri; terletak (tegak), en: to stand, pos: verb, verb: { aux: haben, partizip: gestanden } }
  - { de: stellen, id: menaruh (berdiri), en: to stand; put, pos: verb, verb: { aux: haben, partizip: gestellt } }
  - { de: links, id: kiri; di kiri, en: left, pos: adv }
  - { de: rechts, id: kanan; di kanan, en: right, pos: adv }
  - { de: geradeaus, id: lurus, en: straight on, pos: adv }
  - { de: zwischen, id: di antara, en: between, pos: prep }
  - { de: Kino, id: bioskop, en: cinema, pos: noun, gender: n, plural: Kinos, bridge: { nl: bioscoop, id: bioskop } }
  - { de: Regal, id: rak, en: shelf, pos: noun, gender: n, plural: Regale }
  - { de: Kreuzung, id: perempatan, en: crossroads, pos: noun, gender: f, plural: Kreuzungen }
  - { de: abbiegen, id: berbelok, en: to turn, pos: verb, sep: ab, verb: { aux: sein, partizip: abgebogen } }
next: easy2-08-arzt
---

## concept.id
*In, auf, unter, neben, hinter, vor, über, zwischen* punya dua wajah. **Wo?** (di mana, diam): datif, *Das Handy liegt auf **dem** Tisch*. **Wohin?** (ke mana, bergerak): akusatif, *Ich lege das Handy auf **den** Tisch*. Arah di jalan: *links* (kiri), *rechts* (kanan), *geradeaus* (lurus), *Biegen Sie an der Ampel links ab*.

## concept.en
*In, auf, unter, neben, hinter, vor, über, zwischen* have two faces. **Wo?** (where, staying put): dative, *Das Handy liegt auf **dem** Tisch*. **Wohin?** (where to, moving): accusative, *Ich lege das Handy auf **den** Tisch*. Directions in the street: *links*, *rechts*, *geradeaus*, *Biegen Sie an der Ampel links ab* (turn left at the lights).

## contrast.id
Bahasa Indonesia membedakannya dengan kata depan: *di* atas meja (diam) dan *ke* atas meja (bergerak). Bahasa Jerman memakai kata depan yang sama dan mengganti artikelnya: *di* → datif (*dem, der*), *ke* → akusatif (*den, die, das*). Jadi tanyakan dulu: *di* atau *ke*?

## contrast.en
Indonesian marks the difference with the preposition: *di* atas meja (staying) and *ke* atas meja (moving). German keeps the same preposition and changes the article: *di* → dative (*dem, der*), *ke* → accusative (*den, die, das*). So ask first: *di* or *ke*?
