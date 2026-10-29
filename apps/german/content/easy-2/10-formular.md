---
id: easy2-10-formular
rung: easy-2
order: 10
status: draft
minutes: 10
title: { id: "Formulir dan data pribadi", en: "Forms and personal data", de: "Bitte füllen Sie das Formular aus" }
summary:
  id: "Isi formulir Jerman: *Vorname, Nachname, Geburtsdatum, Geburtsort, Staatsangehörigkeit, Familienstand, Unterschrift*, dan jawab pertanyaan data pribadi."
  en: "Fill in a German form: *Vorname, Nachname, Geburtsdatum, Geburtsort, Staatsangehörigkeit, Familienstand, Unterschrift*, and answer questions about your personal details."
introduces: [a1-forms]
spiral: register
worked:
  - { de: "Vorname: Dewi", id: "Nama depan: Dewi" }
  - { de: "Nachname: Santoso", id: "Nama keluarga: Santoso" }
  - { de: "Geburtsdatum: 14.03.2002", id: "Tanggal lahir: 14 Maret 2002" }
  - { de: "Geburtsort: Bandung", id: "Tempat lahir: Bandung" }
  - { de: "Staatsangehörigkeit: indonesisch", id: "Kewarganegaraan: Indonesia" }
  - { de: "Familienstand: ledig", id: "Status: belum menikah" }
examples:
  - { de: "Wie ist Ihr [[Vorname]]?", id: "Nama depan Anda siapa?" }
  - { de: "Mein [[Nachname]] ist Santoso.", id: "Nama keluarga saya Santoso." }
  - { de: "Bitte [[füllen]] Sie das Formular [[aus]].", id: "Silakan isi formulirnya." }
  - { de: "Können Sie das bitte [[buchstabieren]]?", id: "Bisa tolong dieja?" }
  - { de: "[[Unterschreiben]] Sie bitte hier.", id: "Silakan tanda tangan di sini." }
  - { de: "Ich bin am 14. März 2002 in Bandung [[geboren]].", id: "Saya lahir tanggal 14 Maret 2002 di Bandung." }
pair:
  off: "Ich bin geboren in Bandung."
  natural: "Ich bin in Bandung [[geboren]]."
work:
  situation: { id: "Hari pertama Ausbildung. Putu mengisi formulir data pribadi di bagian personalia.", en: "First day of the Ausbildung. Putu fills in a personal details form in the HR office." }
  lines:
    - { who: Frau Wagner, de: "Füllen Sie bitte dieses Formular aus.", id: "Silakan isi formulir ini." }
    - { who: Putu, de: "Was ist hier „Familienstand“?", id: "Di sini *Familienstand* itu apa?" }
    - { who: Frau Wagner, de: "Sind Sie ledig oder verheiratet?", id: "Anda belum menikah atau sudah menikah?" }
    - { who: Putu, de: "Ich bin ledig. Und wo muss ich unterschreiben?", id: "Saya belum menikah. Lalu saya tanda tangan di mana?" }
words:
  id: "**Der Geburtsort** = *die Geburt* (kelahiran) + *s* + *der Ort* (tempat). **Das Geburtsdatum** = *Geburt* + *s* + *Datum*. Huruf *s* di tengah hanya penyambung."
  en: "**Der Geburtsort** = *die Geburt* (birth) + *s* + *der Ort* (place). **Das Geburtsdatum** = *Geburt* + *s* + *Datum*. The *s* in the middle is just a link."
  compounds: [[Geburt, Ort], [Geburt, Datum], [Haus, Nummer]]
talk:
  lines:
    - { who: Lena, de: "Füllst du das Formular aus?", id: "Kamu lagi isi formulirnya?" }
    - { who: Wayan, de: "Ja, aber was ist „Geburtsort“?", id: "Iya, tapi *Geburtsort* itu apa?" }
    - { who: Lena, de: "Das ist die Stadt. Du bist in Denpasar geboren, oder?", id: "Itu kotanya. Kamu lahir di Denpasar, kan?" }
    - { who: Wayan, de: "Ja, genau!", id: "Iya, betul!" }
tirukan: { de: "Bitte füllen Sie das Formular aus.", id: "Silakan isi formulirnya." }
check:
  - id: e2-10-c1
    type: form
    cue: "Silakan tanda tangan di sini."
    base: unterschreiben
    target: { person: sie, tense: imperativ }
    frame: "Bitte ___ hier."
    answer: unterschreiben Sie
    why: { id: "Perintah sopan: kata kerja lalu *Sie*. *Unter-* di sini tidak terpisah.", en: "A polite instruction: the verb, then *Sie*. *Unter-* doesn't separate here." }
  - id: e2-10-c2
    type: choice
    lang: id
    prompt: "Di formulir Jerman, *Nachname* artinya …"
    options: ["nama keluarga", "nama depan", "nama panggilan"]
    answer: "nama keluarga"
    why: { id: "*Vorname* = nama depan; *Nachname* = nama keluarga. Kalau namamu hanya satu kata, tanyakan cara mengisinya.", en: "*Vorname* = first name; *Nachname* = surname. If you have only one name, ask how to fill it in." }
  - id: e2-10-c3
    type: choice
    prompt: "Name: Hartono. Geburtsort: Medan. Wo ist Herr Hartono geboren?"
    options: ["In Medan.", "In Hamburg.", "In Bandung."]
    answer: "In Medan."
    why: { id: "*Geburtsort* = tempat lahir: Medan.", en: "*Geburtsort* = place of birth: Medan." }
  - id: e2-10-c4
    type: wordorder
    cue: "Aku lahir di Bandung."
    tiles: [geboren, Ich, in Bandung, bin]
    answer: [Ich, bin, in Bandung, geboren]
    accept: [[in Bandung, bin, Ich, geboren]]
    why: { id: "*Bin* di posisi 2, *geboren* di akhir, seperti penjepit.", en: "*Bin* in position 2, *geboren* at the end, like a bracket." }
  - id: e2-10-c5
    type: dictation
    audio: "Mein Vorname ist Siti."
    answer: "Mein Vorname ist Siti."
    why: { id: "*Vorname*: kata benda, jadi huruf besar.", en: "*Vorname* is a noun, so it has a capital." }
  - id: e2-10-c6
    type: gap
    cue: "Anda belum menikah atau sudah menikah?"
    prompt: "Sind Sie ledig oder ___?"
    options: [verheiratet, geboren, Familienstand]
    answer: verheiratet
    why: { id: "*Ledig* = belum menikah; *verheiratet* = sudah menikah.", en: "*Ledig* = single; *verheiratet* = married." }
glossary:
  - { de: Formular, id: formulir, en: form, pos: noun, gender: n, plural: Formulare }
  - { de: Vorname, id: nama depan, en: first name, pos: noun, gender: m, plural: Vornamen }
  - { de: Nachname, id: nama keluarga, en: surname, pos: noun, gender: m, plural: Nachnamen }
  - { de: Geburtsdatum, id: tanggal lahir, en: date of birth, pos: noun, gender: n, plural: Geburtsdaten }
  - { de: Geburtsort, id: tempat lahir, en: place of birth, pos: noun, gender: m, plural: Geburtsorte }
  - { de: Staatsangehörigkeit, id: kewarganegaraan, en: nationality (citizenship), pos: noun, gender: f, plural: Staatsangehörigkeiten }
  - { de: Familienstand, id: status pernikahan, en: marital status, pos: noun, gender: m, plural: "—" }
  - { de: Unterschrift, id: tanda tangan, en: signature, pos: noun, gender: f, plural: Unterschriften }
  - { de: ausfüllen, id: mengisi (formulir), en: to fill in, pos: verb, sep: aus, verb: { aux: haben, partizip: ausgefüllt } }
  - { de: unterschreiben, id: menandatangani, en: to sign, pos: verb, verb: { aux: haben, partizip: unterschrieben } }
  - { de: buchstabieren, id: mengeja, en: to spell, pos: verb, verb: { aux: haben, partizip: buchstabiert } }
  - { de: geboren, id: lahir, en: born, pos: adj }
next: easy2-11-perfekt
---

## concept.id
Formulir Jerman menanyakan: *Vorname* (nama depan), *Nachname* (nama keluarga), *Geburtsdatum* (tanggal lahir, ditulis 14.03.2002), *Geburtsort*, *Staatsangehörigkeit*, *Familienstand* (*ledig, verheiratet*), dan *Unterschrift*. Petugas bilang *Bitte füllen Sie das Formular aus* dan *Können Sie das buchstabieren?* Lahir: *Ich bin in Bandung **geboren***: *geboren* di akhir.

## concept.en
German forms ask for: *Vorname* (first name), *Nachname* (surname), *Geburtsdatum* (date of birth, written 14.03.2002), *Geburtsort*, *Staatsangehörigkeit*, *Familienstand* (*ledig, verheiratet*), and *Unterschrift*. Officials say *Bitte füllen Sie das Formular aus* and *Können Sie das buchstabieren?* Born: *Ich bin in Bandung **geboren***: *geboren* goes at the end.

## contrast.id
Banyak orang Indonesia punya satu nama saja, padahal formulir Jerman hampir selalu meminta *Vorname* dan *Nachname*. Ikuti tulisan di paspormu, dan tanyakan petugas kalau ragu. Urutan *aku lahir di Bandung* juga berbeda: bahasa Jerman menaruh *geboren* di paling akhir.

## contrast.en
Many Indonesians have just one name, but German forms almost always ask for *Vorname* and *Nachname*. Follow what your passport says, and ask the official if you're unsure. The order of *aku lahir di Bandung* differs too: German puts *geboren* at the very end.
