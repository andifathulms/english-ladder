---
id: easy2-06-mit-dem-bus
rung: easy-2
order: 6
status: draft
minutes: 10
title: { id: "Datif: mit, bei, zu, aus, von, nach", en: "The dative: mit, bei, zu, aus, von, nach", de: "Ich fahre mit dem Bus" }
summary:
  id: "Setelah *mit, bei, zu, aus, von, nach*, artikel memakai datif: *der/das → dem*, *die → der*, jamak *→ den (+n)*: *mit dem Bus*, *bei der Arbeit*, *zum Arzt*."
  en: "After *mit, bei, zu, aus, von, nach*, articles take the dative: *der/das → dem*, *die → der*, plural *→ den (+n)*: *mit dem Bus*, *bei der Arbeit*, *zum Arzt*."
introduces: [a1-dative-prepositions]
spiral: cases
visual: { id: case-machine, props: { verb: geben, indef: false, nouns: { nom: [Ärztin, Pfleger, Frau], dat: [Patient, Patientin, Kind], akk: [Tablette, Tee, Wasser] } } }
examples:
  - { de: "Ich fahre [[mit dem]] Bus zur Arbeit.", id: "Aku naik bus ke tempat kerja." }
  - { de: "Rina wohnt [[bei einer]] Familie in Köln.", id: "Rina tinggal bersama sebuah keluarga di Köln." }
  - { de: "Nach dem Kurs gehe ich [[zum]] Arzt.", id: "Sesudah kursus aku ke dokter.", note: { id: "*Zu dem* → **zum**, *zu der* → **zur**: *zum Arzt*, *zur Apotheke*.", en: "*Zu dem* → **zum**, *zu der* → **zur**: *zum Arzt*, *zur Apotheke*." } }
  - { de: "Mehmet kommt [[aus der]] Türkei.", id: "Mehmet berasal dari Turki." }
  - { de: "Das Geschenk ist [[von meiner]] Oma.", id: "Hadiahnya dari nenekku." }
  - { de: "[[Nach der]] Arbeit fahre ich zu Lena.", id: "Sesudah kerja aku ke tempat Lena.", note: { id: "Dengan kota dan negara, *nach* tanpa artikel: *nach Berlin*, *nach Indonesien*. Pulang: *nach Hause*.", en: "With towns and countries, *nach* has no article: *nach Berlin*, *nach Indonesien*. Going home: *nach Hause*." } }
pair:
  off: "Ich fahre mit Bus."
  natural: "Ich fahre [[mit dem]] Bus."
work:
  situation: { id: "Di bangsal, Bu Becker meminta Rina mengantar makanan.", en: "On the ward, Frau Becker asks Rina to take some food round." }
  lines:
    - { who: Frau Becker, de: "Bringen Sie das Essen bitte zu Frau Müller.", id: "Tolong antar makanannya ke Bu Müller." }
    - { who: Rina, de: "Mit dem Tee?", id: "Sama tehnya?" }
    - { who: Frau Becker, de: "Ja, mit dem Tee. Und dann sprechen Sie bitte mit der Ärztin.", id: "Ya, sama tehnya. Lalu tolong bicara dengan dokternya." }
    - { who: Rina, de: "Gut, mache ich.", id: "Baik, saya kerjakan." }
words:
  id: "*Halte* datang dari bahasa Belanda *halte*. Bahasa Jerman: **die Haltestelle** = *halte(n)* (berhenti) + *die Stelle* (tempat). **Die Straßenbahn** (trem) = *Straße* + *n* + *Bahn*."
  en: "*Halte* comes from Dutch *halte*. German: **die Haltestelle** = *halte(n)* (stop) + *die Stelle* (place). **Die Straßenbahn** (tram) = *Straße* + *n* + *Bahn*."
  bridges: [Haltestelle]
  compounds: [[Halte, Stelle], [Straße, Bahn]]
talk:
  lines:
    - { who: Jonas, de: "Wie kommst du zur Arbeit?", id: "Kamu ke tempat kerja naik apa?" }
    - { who: Andi, de: "Mit dem Fahrrad. Und du?", id: "Naik sepeda. Kamu?" }
    - { who: Jonas, de: "Ich fahre mit der U-Bahn.", id: "Aku naik kereta bawah tanah." }
tirukan: { de: "Ich fahre mit dem Bus zur Arbeit.", id: "Aku naik bus ke tempat kerja." }
check:
  - id: e2-06-c1
    type: case
    cue: "Aku naik kereta."
    sentence: "Ich fahre mit ___ Zug."
    role: dat
    noun: Zug
    options: [dem, den, der]
    answer: dem
    why: { id: "*Mit* + datif: *der Zug* → *mit dem Zug*.", en: "*Mit* + dative: *der Zug* → *mit dem Zug*." }
  - id: e2-06-c2
    type: case
    cue: "Lena kerja di bank."
    sentence: "Lena arbeitet bei ___ Bank."
    role: dat
    noun: Bank
    options: [der, die, dem]
    answer: der
    why: { id: "*Die Bank* dalam datif → *der Bank*.", en: "*Die Bank* in the dative → *der Bank*." }
  - id: e2-06-c3
    type: case
    sentence: "Das ist ein Brief von ___ Mutter."
    role: dat
    noun: Mutter
    options: [meiner, meine, meinem]
    answer: meiner
    why: { id: "*Meine Mutter* setelah *von* → *von meiner Mutter*.", en: "*Meine Mutter* after *von* → *von meiner Mutter*." }
  - id: e2-06-c4
    type: gap
    cue: "Aku ke dokter."
    prompt: "Ich gehe ___ Arzt."
    options: [zum, zur, zu]
    answer: zum
    why: { id: "*Der Arzt* → *zu dem* → *zum Arzt*.", en: "*Der Arzt* → *zu dem* → *zum Arzt*." }
  - id: e2-06-c5
    type: listen
    audio: "Der Bus fährt zum Bahnhof."
    options: ["Der Bus fährt zum Bahnhof.", "Der Bus fährt zur Bank."]
    answer: "Der Bus fährt zum Bahnhof."
    why: { id: "*Zum Bahnhof* = ke stasiun; *zur Bank* = ke bank.", en: "*Zum Bahnhof* = to the station; *zur Bank* = to the bank." }
  - id: e2-06-c6
    type: fix
    wrong: "Ich wohne bei meine Tante."
    options: ["Ich wohne bei meiner Tante.", "Ich wohne bei meinen Tante."]
    answer: "Ich wohne bei meiner Tante."
    why: { id: "*Bei* + datif: *meine Tante* → *bei meiner Tante*.", en: "*Bei* + dative: *meine Tante* → *bei meiner Tante*." }
glossary:
  - { de: mit, id: dengan; naik, en: with; by, pos: prep }
  - { de: bei, id: di (tempat seseorang), en: at (someone's place), pos: prep }
  - { de: von, id: dari, en: from; of, pos: prep }
  - { de: Zug, id: kereta, en: train, pos: noun, gender: m, plural: Züge }
  - { de: U-Bahn, id: kereta bawah tanah, en: underground, pos: noun, gender: f, plural: U-Bahnen }
  - { de: Straßenbahn, id: trem, en: tram, pos: noun, gender: f, plural: Straßenbahnen }
  - { de: Haltestelle, id: halte, en: stop, pos: noun, gender: f, plural: Haltestellen, bridge: { nl: halte, id: halte } }
  - { de: Bahnhof, id: stasiun, en: station, pos: noun, gender: m, plural: Bahnhöfe }
  - { de: Geschenk, id: hadiah, en: present, pos: noun, gender: n, plural: Geschenke }
  - { de: bringen, id: membawa; mengantar, en: to bring, pos: verb, verb: { aux: haben, partizip: gebracht } }
  - { de: zu Fuß, id: jalan kaki, en: on foot, pos: expr }
  - { de: nach Hause, id: pulang (ke rumah), en: home (going home), pos: expr }
next: easy2-07-wo-wohin
---

## concept.id
Setelah **mit, bei, zu, aus, von, nach** (dan *seit*), kata benda memakai kasus datif (*Dativ*, menjawab *wem?*). Artikelnya: *der/das → **dem***, *die → **der***, jamak → ***den*** (+ *-n*: *mit den Kindern*). *Ein/mein/kein* ikut: *einem, meiner*. Gabungan yang sering: *zu dem = **zum***, *zu der = **zur***, *bei dem = **beim***, *von dem = **vom***.

## concept.en
After **mit, bei, zu, aus, von, nach** (and *seit*), nouns take the dative case (*Dativ*, answering *wem?*). The articles: *der/das → **dem***, *die → **der***, plural → ***den*** (+ *-n*: *mit den Kindern*). *Ein/mein/kein* follow: *einem, meiner*. Common contractions: *zu dem = **zum***, *zu der = **zur***, *bei dem = **beim***, *von dem = **vom***.

## contrast.id
Bahasa Indonesia bilang *naik bus*, tanpa artikel. Bahasa Jerman bilang *mit **dem** Bus*: artikelnya wajib, dan bentuknya datif. Satu kata Indonesia bisa jadi beberapa kata Jerman: *ke dokter* = *zum Arzt*, *ke Berlin* = *nach Berlin*, *pulang* = *nach Hause*.

## contrast.en
Indonesian says *naik bus*, with no article. German says *mit **dem** Bus*: the article is required, and it's in the dative. One Indonesian word can be several German ones: *ke dokter* = *zum Arzt*, *ke Berlin* = *nach Berlin*, going home = *nach Hause*.
