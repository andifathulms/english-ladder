---
id: easy2-08-arzt
rung: easy-2
order: 8
status: draft
minutes: 10
title: { id: "Ke dokter: janji temu dan rasa sakit", en: "At the doctor's: appointments and pain", de: "Mein Kopf tut weh" }
summary:
  id: "Buat janji ke dokter (*Ich brauche einen Termin*), sebut bagian tubuh dan katakan apa yang sakit: *Mein Kopf tut weh*, *Ich habe Fieber*."
  en: "Make a doctor's appointment (*Ich brauche einen Termin*), name body parts and say what hurts: *Mein Kopf tut weh*, *Ich habe Fieber*."
introduces: [a1-doctor]
spiral: work
worked:
  - { de: "Guten Tag. Ich brauche einen Termin, bitte.", id: "Selamat siang. Saya perlu janji temu." }
  - { de: "Was haben Sie?", id: "Anda sakit apa?" }
  - { de: "Ich habe Fieber, und mein Hals tut weh.", id: "Saya demam, dan tenggorokan saya sakit." }
  - { de: "Können Sie morgen um neun Uhr kommen?", id: "Bisa datang besok jam sembilan?" }
  - { de: "Ja. Bringen Sie bitte Ihre Gesundheitskarte mit.", id: "Ya. Tolong bawa kartu asuransi kesehatan Anda." }
examples:
  - { de: "Mein Kopf [[tut]] [[weh]].", id: "Kepalaku sakit." }
  - { de: "Die Füße [[tun]] [[weh]].", id: "Kakiku sakit.", note: { id: "Satu bagian tubuh: *tut weh*; jamak: *tun weh*.", en: "One body part: *tut weh*; plural: *tun weh*." } }
  - { de: "Ich habe [[Fieber]].", id: "Aku demam." }
  - { de: "Seit gestern habe ich [[Kopfschmerzen]].", id: "Sejak kemarin aku sakit kepala." }
  - { de: "Ich brauche einen [[Termin]], bitte.", id: "Saya perlu janji temu, ya." }
  - { de: "[[Bringen]] Sie bitte Ihre Gesundheitskarte [[mit]].", id: "Tolong bawa kartu asuransi kesehatan Anda." }
pair:
  off: "Mein Kopf ist krank."
  natural: "Mein Kopf [[tut]] [[weh]]."
work:
  situation: { id: "Agus sakit dan menelepon instruktur Ausbildung-nya pagi-pagi.", en: "Agus is ill and phones his Ausbildung instructor early in the morning." }
  lines:
    - { who: Agus, de: "Guten Morgen, Herr Schmidt. Ich bin krank. Ich habe Fieber.", id: "Selamat pagi, Pak Schmidt. Saya sakit. Saya demam." }
    - { who: Herr Schmidt, de: "Oh! Gute Besserung! Gehen Sie bitte zum Arzt.", id: "Wah! Semoga cepat sembuh! Silakan ke dokter." }
    - { who: Agus, de: "Ja, ich habe um zehn Uhr einen Termin.", id: "Ya, saya ada janji jam sepuluh." }
    - { who: Herr Schmidt, de: "Gut. Bringen Sie dann bitte die Krankmeldung mit.", id: "Baik. Nanti tolong bawa surat keterangan sakitnya." }
words:
  id: "*Dokter* untuk dokter yang mengobati adalah **der Arzt** (*Doktor* hanya gelar). **Der Hausarzt** = *Haus* + *Arzt*: dokter umum langgananmu. **Der Kopfschmerz** = *Kopf* + *Schmerz*; biasanya jamak: *Kopfschmerzen*."
  en: "A doctor who treats you is **der Arzt** (*Doktor* is only a title). **Der Hausarzt** = *Haus* + *Arzt*: your regular family doctor. **Der Kopfschmerz** = *Kopf* + *Schmerz*; usually plural: *Kopfschmerzen*."
  bridges: [Arzt]
  compounds: [[Haus, Arzt], [Kopf, Schmerz]]
talk:
  lines:
    - { who: Siti, de: "Was ist los, Fitri?", id: "Ada apa, Fitri?" }
    - { who: Fitri, de: "Mein Bauch tut weh.", id: "Perutku sakit." }
    - { who: Siti, de: "Oh nein! Trink einen Tee und bleib im Bett.", id: "Aduh! Minum teh, terus istirahat di tempat tidur, ya." }
tirukan: { de: "Mein Kopf tut weh.", id: "Kepalaku sakit." }
check:
  - id: e2-08-c1
    type: gap
    cue: "Perutku sakit."
    prompt: "Mein Bauch ___ weh."
    options: [tut, tun, ist]
    answer: tut
    why: { id: "*Mein Bauch* = *er*: *tut weh*.", en: "*Mein Bauch* = *er*: *tut weh*." }
  - id: e2-08-c2
    type: gap
    prompt: "Meine Augen ___ weh."
    options: [tun, tut]
    answer: tun
    why: { id: "*Die Augen* jamak: *tun weh*.", en: "*Die Augen* is plural: *tun weh*." }
  - id: e2-08-c3
    type: gender
    noun: Auge
    answer: n
    why: { id: "*Das Auge*, jamak *die Augen*. Gender bagian tubuh harus dihafal.", en: "*Das Auge*, plural *die Augen*. Body-part genders have to be learnt." }
  - id: e2-08-c4
    type: fix
    cue: "Kepalaku sakit."
    wrong: "Mein Kopf ist krank."
    options: ["Mein Kopf tut weh.", "Mein Kopf tun weh."]
    answer: "Mein Kopf tut weh."
    why: { id: "*Krank* untuk orang (*Ich bin krank*). Untuk bagian tubuh: *tut weh*.", en: "*Krank* is for a person (*Ich bin krank*). For a body part: *tut weh*." }
  - id: e2-08-c5
    type: listen
    prompt: "Wann ist der Termin?"
    audio: "Ihr Termin ist am Dienstag um halb zehn."
    options: ["Ihr Termin ist am Dienstag um halb zehn.", "Ihr Termin ist am Donnerstag um halb zehn."]
    answer: "Ihr Termin ist am Dienstag um halb zehn."
    why: { id: "*Dienstag* = Selasa; *Donnerstag* = Kamis. *Halb zehn* = 9.30.", en: "*Dienstag* = Tuesday; *Donnerstag* = Thursday. *Halb zehn* = 9:30." }
  - id: e2-08-c6
    type: dictation
    cue: "Saya demam."
    audio: "Ich habe Fieber."
    answer: "Ich habe Fieber."
    why: { id: "Demam memakai *haben*: *Ich habe Fieber*, bukan *Ich bin Fieber*.", en: "A fever takes *haben*: *Ich habe Fieber*, not *Ich bin Fieber*." }
glossary:
  - { de: wehtun, id: terasa sakit, en: to hurt, pos: verb, sep: weh, verb: { aux: haben, partizip: wehgetan } }
  - { de: Termin, id: janji temu, en: appointment, pos: noun, gender: m, plural: Termine }
  - { de: Kopf, id: kepala, en: head, pos: noun, gender: m, plural: Köpfe }
  - { de: Bauch, id: perut, en: stomach, pos: noun, gender: m, plural: Bäuche }
  - { de: Hals, id: leher; tenggorokan, en: neck; throat, pos: noun, gender: m, plural: Hälse }
  - { de: Auge, id: mata, en: eye, pos: noun, gender: n, plural: Augen }
  - { de: Fieber, id: demam, en: fever, pos: noun, gender: n, plural: "—" }
  - { de: Kopfschmerz, id: sakit kepala, en: headache, pos: noun, gender: m, plural: Kopfschmerzen }
  - { de: Krankmeldung, id: surat keterangan sakit, en: sick note, pos: noun, gender: f, plural: Krankmeldungen }
  - { de: Gesundheitskarte, id: kartu asuransi kesehatan, en: health insurance card, pos: noun, gender: f, plural: Gesundheitskarten }
  - { de: mitbringen, id: membawa (serta), en: to bring along, pos: verb, sep: mit, verb: { aux: haben, partizip: mitgebracht } }
  - { de: Gute Besserung!, id: semoga lekas sembuh!, en: get well soon!, pos: expr }
next: easy2-09-wohnung
---

## concept.id
Di praktik dokter: *Ich brauche einen **Termin*** (janji temu). Yang sakit: ***Mein Kopf tut weh*** (*wehtun*: *tut* di posisi 2, *weh* di akhir), atau *Ich habe Kopfschmerzen / Fieber*. Untuk beberapa bagian tubuh: *Die Füße **tun** weh*. Orang Jerman juga bilang *Mir tut der Kopf weh*: *mir* adalah datif dari *ich*.

## concept.en
At the doctor's: *Ich brauche einen **Termin*** (appointment). What hurts: ***Mein Kopf tut weh*** (*wehtun*: *tut* in position 2, *weh* at the end), or *Ich habe Kopfschmerzen / Fieber*. For several body parts: *Die Füße **tun** weh*. Germans also say *Mir tut der Kopf weh*: *mir* is the dative of *ich*.

## contrast.id
*Kepalaku sakit* tidak bisa diterjemahkan kata per kata menjadi *Mein Kopf ist krank*: *krank* hanya untuk orangnya (*Ich bin krank*). Di Jerman, ke dokter hampir selalu dengan janji temu, dan kamu membawa *Gesundheitskarte*. Kalau sakit dan tidak bisa kerja, kamu perlu *Krankmeldung* dari dokter.

## contrast.en
*Kepalaku sakit* can't be translated word for word as *Mein Kopf ist krank*: *krank* is only for the person (*Ich bin krank*). In Germany you almost always see a doctor by appointment, and you bring your *Gesundheitskarte*. If you're ill and can't work, you need a *Krankmeldung* (sick note) from the doctor.
