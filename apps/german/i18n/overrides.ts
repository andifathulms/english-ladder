// German Ladder's UI strings over the engine's base tables: its own wording of engine keys, and keys
// only its components use (GermanKey). Merged with extendStrings in course.config.ts.
import type { StringTable } from '@ladder/core/lib/i18n';

/** Keys only German Ladder's components use (useT<GermanKey>()). */
export type GermanKey =
  | 'placement.section.dasar'
  | 'placement.section.easy1'
  | 'placement.section.easy2'
  | 'placement.section.easy3'
  | 'placement.sectionShort.dasar'
  | 'placement.sectionShort.easy1'
  | 'placement.sectionShort.easy2'
  | 'placement.sectionShort.easy3'
  | 'placement.result.dasar'
  | 'placement.result.easy-1'
  | 'placement.result.easy-2'
  | 'settings.caseColours'
  | 'settings.caseColoursHint'
  | 'settings.caseColours.rung'
  | 'settings.caseColours.on'
  | 'settings.caseColours.off'
  | 'settings.spellingStrict'
  | 'settings.spellingStrictHint'
  | 'settings.spellingStrict.rung'
  | 'settings.spellingStrict.always'
  | 'settings.deckDaily'
  | 'settings.deckFace'
  | 'settings.deckFace.word'
  | 'settings.deckFace.meaning'
  | 'settings.deckFace.audio'
  | 'about.dataTitle'
  | 'check.spelling.digraph'
  | 'check.spelling.umlaut'
  | 'check.spelling.caps'
  | 'deck.title'
  | 'deck.list'
  | 'deck.none'
  | 'deck.playWord'
  | 'deck.level'
  | 'deck.learned'
  | 'deck.today'
  | 'deck.start'
  | 'deck.nothing'
  | 'deck.filter'
  | 'deck.filter.all'
  | 'deck.filter.new'
  | 'deck.filter.learned'
  | 'deck.filter.lessons'
  | 'deck.state.new'
  | 'deck.state.learned'
  | 'deck.more'
  | 'deck.flip'
  | 'deck.again'
  | 'deck.know'
  | 'deck.close'
  | 'deck.summary'
  | 'deck.done'
  | 'deck.back'
  | 'deck.soon'
  | 'words.close'
  | 'sound.pairs'
  | 'words.bridges'
  | 'words.bridgeOff'
  | 'words.falseFriends'
  | 'words.plural'
  | 'words.tab'
  | 'words.deckTab'
  | 'home.doorNote'
  | 'home.doorNoteLink'
  | 'gender.m'
  | 'gender.f'
  | 'gender.n'
  | 'lesson.work'
  | 'words.dutch'
  | 'words.compounds'
  | 'words.compoundRule'
  | 'words.noPlural'
  | 'words.perfekt'
  | 'words.clue'
  | 'rung.exit'
  | 'rung.preA1'
  | 'climb.exit'
  | 'accent.ae'
  | 'accent.oe'
  | 'accent.ue'
  | 'accent.ss'
  | 'accent.AE'
  | 'accent.OE'
  | 'accent.UE'
  | 'tense.praesens'
  | 'tense.perfekt'
  | 'tense.praeteritum'
  | 'tense.imperativ'
  | 'tense.konj2'
  | 'check.formPrompt'
  | 'check.formLabel'
  | 'check.dictationPrompt'
  | 'check.dictationLabel'
  | 'check.conjugatePrompt'
  | 'check.genderPrompt'
  | 'check.genderOptions'
  | 'check.casePrompt'
  | 'check.caseLabel'
  | 'check.role.nom'
  | 'check.role.akk'
  | 'check.role.dat'
  | 'check.role.gen'
  | 'check.wo'
  | 'check.wohin'
  | 'check.wechselPrompt'
  | 'check.wordorderPrompt'
  | 'check.bracket'
  | 'zone.p1'
  | 'zone.verb'
  | 'zone.middle'
  | 'zone.end';

type Overrides = Partial<StringTable> & Partial<Record<GermanKey, string>>;

export const idOverrides: Overrides = {
  'app.name': 'German Ladder',
  'nav.words': 'Kata',
  'rung.inProgress': '{n} dari {total} pelajaran',
  'climb.title': '{rung} · naik',
  'settings.importFail': 'File ini tidak bisa dibaca sebagai progres German Ladder.',
  'settings.speechOff': 'Browser ini tidak punya suara bahasa Jerman. Rekaman tetap diputar; tombol putar lain disembunyikan.',
  'settings.voiceSampleText': 'Hallo! Das ist die Stimme deiner German Ladder. Hörst du mich gut?',
  'me.aboutHint': 'Cara kerja German Ladder dan arti A1 sampai C1',
  'words.searchPlaceholder': 'Cari kata, Jerman atau Indonesia',
  'lesson.talk': 'Ngobrol',
  'lesson.sound': 'Bunyi',
  'lesson.words': 'Kata',
  'check.listenNoAudio': 'Browser ini tidak punya suara bahasa Jerman. Baca kalimat ini, lalu pilih yang sama:',
  'read.done': 'Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Jerman.',
  'talk.done': 'Selesai. Kamu baru saja mengikuti satu percakapan utuh dalam bahasa Jerman.',
  'home.doorsBody': 'Belum pernah belajar bahasa Jerman? Mulai dari Easy 1. Sudah pernah belajar? Ikut cek level, lalu mulai dari tempat yang pas.',
  'home.door1': 'Baru mulai',
  'home.door1Sub': 'Mulai dari Easy 1, pelajaran 1',
  'home.door2': 'Sudah pernah belajar',
  'home.door2Sub': 'Cek level, 24 soal, ±10 menit',
  'rung.placementRetake': 'Cek level lagi',
  'rung.placementRetakeMeta': '24 soal · tidak pernah menurunkan anak tangga',
  'rung.missedHint': 'Ditandai: pelajaran di balik soal cek level yang terlewat.',
  'placement.title': 'Cek level',
  'placement.eyebrow': 'Sudah pernah belajar?',
  'placement.intro': 'Cek level · 24 soal · tanpa waktu. Kamu mulai dari anak tangga pertama yang nilainya di bawah 75%. Kamu bisa mengulang kapan saja.',
  'placement.section.dasar': 'Bunyi dan ejaan (6 soal)',
  'placement.section.easy1': 'Easy 1: posisi kata kerja, der/die/das, akusatif (6 soal)',
  'placement.section.easy2': 'Easy 2: kata kerja terpisah, modal, datif (6 soal)',
  'placement.section.easy3': 'Easy 3: Perfekt, weil dan dass (6 soal)',
  'placement.sectionShort.dasar': 'Dasar',
  'placement.sectionShort.easy1': 'Easy 1',
  'placement.sectionShort.easy2': 'Easy 2',
  'placement.sectionShort.easy3': 'Easy 3',
  'placement.result.dasar': 'Mulai dari Dasar: bunyi dan ejaan. Sebentar saja, lalu kamu naik ke Easy 1.',
  'placement.result.easy-1': 'Mulai dari Easy 1. Dasar ditandai sudah dinaiki.',
  'placement.result.easy-2': 'Mulai dari Easy 2. Dasar dan Easy 1 ditandai sudah dinaiki, dan pelajaran yang perlu diulang ditandai.',
  'settings.caseColours': 'Warna kasus',
  'settings.caseColoursHint': 'Mewarnai huruf yang berubah (den, dem) di visual dan umpan balik. Labelnya tetap ada.',
  'settings.caseColours.rung': 'Ikuti anak tangga',
  'settings.caseColours.on': 'Nyala',
  'settings.caseColours.off': 'Mati',
  'settings.spellingStrict': 'Ejaan',
  'settings.spellingStrictHint': 'Sebelum Easy 3, ae/oe/ue/ss dan umlaut yang terlewat tetap diterima dengan catatan.',
  'settings.spellingStrict.rung': 'Ikuti anak tangga',
  'settings.spellingStrict.always': 'Selalu ketat',
  'settings.deckDaily': 'Kartu baru per hari',
  'settings.deckFace': 'Sisi depan kartu',
  'settings.deckFace.word': 'Kata',
  'settings.deckFace.meaning': 'Arti',
  'settings.deckFace.audio': 'Suara',
  'about.dataTitle': 'Data dan lisensi',
  'check.spelling.digraph': 'Hampir tepat. Tulisannya *{answer}*: ae, oe, ue dan ss ditulis ä, ö, ü dan ß.',
  'check.spelling.umlaut': 'Hampir tepat. Jangan lupa umlautnya: *{answer}*.',
  'check.spelling.caps': 'Kata benda selalu diawali huruf besar: *{answer}*.',
  'deck.title': 'Kartu kata {level}',
  'deck.list': 'Semua kata',
  'deck.none': 'Kartu kata muncul begitu A1 punya pelajaran.',
  'deck.playWord': 'Putar kata',
  'deck.level': '{level} · perkiraan',
  'deck.learned': '{n} dari {total} dipelajari',
  'deck.today': 'Hari ini: {n} baru · {k} diulang',
  'deck.start': 'Mulai',
  'deck.nothing': 'Tidak ada kartu untuk hari ini',
  'deck.filter': 'Saring',
  'deck.filter.all': 'Semua',
  'deck.filter.new': 'baru',
  'deck.filter.learned': 'dipelajari',
  'deck.filter.lessons': 'dari pelajaran',
  'deck.state.new': 'baru',
  'deck.state.learned': 'dipelajari',
  'deck.more': 'dan {n} lagi: pakai pencarian',
  'deck.flip': 'Balik kartu',
  'deck.again': 'Belum ingat',
  'deck.know': 'Ingat',
  'deck.close': 'Tutup kartu',
  'deck.summary': '{k} dari {n} kamu ingat.',
  'deck.done': 'Kartu berikutnya muncul lagi sesuai jadwal ulangnya.',
  'deck.back': 'Kembali ke daftar',
  'deck.soon': 'Kartu kata A1 terbuka bersama pelajaran Easy 1.',
  'words.close': 'Tutup',
  'sound.pairs': 'Pasangan bunyi',
  'words.bridges': 'Jembatan kata',
  'words.bridgeOff': 'Jembatan ini menyesatkan',
  'words.falseFriends': 'Teman palsu',
  'words.plural': 'jamak:',
  'words.tab': 'Kata',
  'words.deckTab': 'Kartu kata',
  'home.doorNote': 'Mau latihan bunyi dulu?',
  'home.doorNoteLink': 'Mulai dari Dasar.',
  'gender.m': 'maskulin',
  'gender.f': 'feminin',
  'gender.n': 'netral',
  'lesson.work': 'Kerja',
  'words.dutch': 'Belanda',
  'words.compounds': 'Kata majemuk',
  'words.compoundRule': 'Kata majemuk ikut jenis kata terakhirnya.',
  'words.noPlural': 'tidak ada',
  'words.perfekt': 'Perfekt:',
  'words.clue': 'Petunjuk: akhiran {suffix}',
  'rung.exit': 'Level ujian',
  'rung.preA1': 'Pra-A1',
  'climb.exit': '{level} selesai. Ini level ujian {exam}.',
  'accent.ae': 'a umlaut',
  'accent.oe': 'o umlaut',
  'accent.ue': 'u umlaut',
  'accent.ss': 'eszett (ss tajam)',
  'accent.AE': 'A umlaut besar',
  'accent.OE': 'O umlaut besar',
  'accent.UE': 'U umlaut besar',
  'tense.praesens': 'Präsens (sekarang)',
  'tense.perfekt': 'Perfekt (lampau)',
  'tense.praeteritum': 'Präteritum (lampau tulis)',
  'tense.imperativ': 'perintah (Imperativ)',
  'tense.konj2': 'Konjunktiv II',
  'check.formPrompt': 'Tulis bentuk yang tepat.',
  'check.formLabel': 'Bentuknya',
  'check.dictationPrompt': 'Dengarkan, lalu tulis kalimatnya.',
  'check.dictationLabel': 'Kalimatnya',
  'check.conjugatePrompt': 'Lengkapi bentuknya:',
  'check.genderPrompt': 'der, die, atau das?',
  'check.genderOptions': 'Pilih artikel',
  'check.casePrompt': 'Isi artikelnya. Perannya:',
  'check.caseLabel': 'Artikelnya',
  'check.role.nom': 'subjek (Nominativ)',
  'check.role.akk': 'objek langsung (Akkusativ)',
  'check.role.dat': 'objek tak langsung (Dativ)',
  'check.role.gen': 'pemilik (Genitiv)',
  'check.wo': 'wo? diam',
  'check.wohin': 'wohin? bergerak',
  'check.wechselPrompt': 'Pilih artikelnya.',
  'check.wordorderPrompt': 'Susun kalimatnya.',
  'check.bracket': 'Kerangka kalimat',
  'zone.p1': 'Posisi 1',
  'zone.verb': 'Verb',
  'zone.middle': 'Tengah',
  'zone.end': 'Akhir',
};

export const enOverrides: Overrides = {
  'app.name': 'German Ladder',
  'nav.words': 'Words',
  'rung.inProgress': '{n} of {total} lessons',
  'climb.title': '{rung} · climbed',
  'settings.importFail': "This file can't be read as German Ladder progress.",
  'settings.speechOff': 'This browser has no German voice. Recordings still play; other play buttons are hidden.',
  'settings.voiceSampleText': 'Hallo! Das ist die Stimme deiner German Ladder. Hörst du mich gut?',
  'me.aboutHint': 'How German Ladder works and what A1 to C1 mean',
  'words.searchPlaceholder': 'Search German or Indonesian',
  'lesson.talk': 'Ngobrol',
  'lesson.sound': 'Sounds',
  'lesson.words': 'Words',
  'check.listenNoAudio': 'This browser has no German voice. Read the sentence, then pick the same one:',
  'read.done': 'Done. You just read a whole text in German.',
  'talk.done': 'Done. You just followed a whole conversation in German.',
  'home.doorsBody': 'Never studied German? Start at Easy 1. Studied some before? Take the level check and start where it fits.',
  'home.door1': "I'm just starting",
  'home.door1Sub': 'Start at Easy 1, lesson 1',
  'home.door2': "I've studied some",
  'home.door2Sub': 'Level check, 24 questions, about 10 minutes',
  'rung.placementRetake': 'Take the level check again',
  'rung.placementRetakeMeta': '24 questions · never moves you down',
  'rung.missedHint': 'Marked: lessons behind the level-check questions you missed.',
  'placement.title': 'Level check',
  'placement.eyebrow': 'Studied some before?',
  'placement.intro': 'Level check · 24 questions · no timer. You start at the first rung where you score under 75%. You can retake it any time.',
  'placement.section.dasar': 'Sounds and spelling (6 questions)',
  'placement.section.easy1': 'Easy 1: verb position, der/die/das, accusative (6 questions)',
  'placement.section.easy2': 'Easy 2: separable verbs, modals, dative (6 questions)',
  'placement.section.easy3': 'Easy 3: the Perfekt, weil and dass (6 questions)',
  'placement.sectionShort.dasar': 'Dasar',
  'placement.sectionShort.easy1': 'Easy 1',
  'placement.sectionShort.easy2': 'Easy 2',
  'placement.sectionShort.easy3': 'Easy 3',
  'placement.result.dasar': 'Start at Dasar: sounds and spelling. It is short, then you move up to Easy 1.',
  'placement.result.easy-1': 'Start at Easy 1. Dasar is marked climbed.',
  'placement.result.easy-2': 'Start at Easy 2. Dasar and Easy 1 are marked climbed, and the lessons worth a second look are marked.',
  'settings.caseColours': 'Case colours',
  'settings.caseColoursHint': 'Colours the changed letters (den, dem) in visuals and feedback. The labels always stay.',
  'settings.caseColours.rung': 'Follow the rung',
  'settings.caseColours.on': 'On',
  'settings.caseColours.off': 'Off',
  'settings.spellingStrict': 'Spelling',
  'settings.spellingStrictHint': 'Before Easy 3, ae/oe/ue/ss and a missed umlaut are accepted with a note.',
  'settings.spellingStrict.rung': 'Follow the rung',
  'settings.spellingStrict.always': 'Always strict',
  'settings.deckDaily': 'New cards per day',
  'settings.deckFace': 'Card front',
  'settings.deckFace.word': 'Word',
  'settings.deckFace.meaning': 'Meaning',
  'settings.deckFace.audio': 'Sound',
  'about.dataTitle': 'Data and licences',
  'check.spelling.digraph': 'Almost. It is written *{answer}*: ae, oe, ue and ss are ä, ö, ü and ß.',
  'check.spelling.umlaut': 'Almost. Mind the umlaut: *{answer}*.',
  'check.spelling.caps': 'Nouns always start with a capital: *{answer}*.',
  'deck.title': 'Word cards {level}',
  'deck.list': 'All words',
  'deck.none': 'Word cards appear once A1 has lessons.',
  'deck.playWord': 'Play the word',
  'deck.level': '{level} · estimate',
  'deck.learned': '{n} of {total} learned',
  'deck.today': 'Today: {n} new · {k} to review',
  'deck.start': 'Start',
  'deck.nothing': 'No cards for today',
  'deck.filter': 'Filter',
  'deck.filter.all': 'All',
  'deck.filter.new': 'new',
  'deck.filter.learned': 'learned',
  'deck.filter.lessons': 'from lessons',
  'deck.state.new': 'new',
  'deck.state.learned': 'learned',
  'deck.more': 'and {n} more: use the search',
  'deck.flip': 'Turn the card',
  'deck.again': 'Not yet',
  'deck.know': 'Got it',
  'deck.close': 'Close the cards',
  'deck.summary': 'You remembered {k} of {n}.',
  'deck.done': 'Each card comes back on its review day.',
  'deck.back': 'Back to the list',
  'deck.soon': 'The A1 word deck opens with the Easy 1 lessons.',
  'words.close': 'Close',
  'sound.pairs': 'Sound pairs',
  'words.bridges': 'Word bridges',
  'words.bridgeOff': 'This bridge misleads',
  'words.falseFriends': 'False friends',
  'words.plural': 'plural:',
  'words.tab': 'Words',
  'words.deckTab': 'Word deck',
  'home.doorNote': 'Want to practise the sounds first?',
  'home.doorNoteLink': 'Start with Dasar.',
  'gender.m': 'masculine',
  'gender.f': 'feminine',
  'gender.n': 'neuter',
  'lesson.work': 'Work',
  'words.dutch': 'Dutch',
  'words.compounds': 'Compounds',
  'words.compoundRule': 'A compound takes its last word’s gender.',
  'words.noPlural': 'none',
  'words.perfekt': 'Perfekt:',
  'words.clue': 'Clue: the ending {suffix}',
  'rung.exit': 'Exam level',
  'rung.preA1': 'Pre-A1',
  'climb.exit': '{level} done. This is the {exam} exam level.',
  'accent.ae': 'a umlaut',
  'accent.oe': 'o umlaut',
  'accent.ue': 'u umlaut',
  'accent.ss': 'eszett (sharp s)',
  'accent.AE': 'capital A umlaut',
  'accent.OE': 'capital O umlaut',
  'accent.UE': 'capital U umlaut',
  'tense.praesens': 'Präsens (present)',
  'tense.perfekt': 'Perfekt (past)',
  'tense.praeteritum': 'Präteritum (written past)',
  'tense.imperativ': 'imperative',
  'tense.konj2': 'Konjunktiv II',
  'check.formPrompt': 'Write the right form.',
  'check.formLabel': 'The form',
  'check.dictationPrompt': 'Listen, then write the sentence.',
  'check.dictationLabel': 'The sentence',
  'check.conjugatePrompt': 'Fill in the forms:',
  'check.genderPrompt': 'der, die or das?',
  'check.genderOptions': 'Pick the article',
  'check.casePrompt': 'Fill in the article. Its role:',
  'check.caseLabel': 'The article',
  'check.role.nom': 'subject (nominative)',
  'check.role.akk': 'direct object (accusative)',
  'check.role.dat': 'indirect object (dative)',
  'check.role.gen': 'owner (genitive)',
  'check.wo': 'wo? staying',
  'check.wohin': 'wohin? moving',
  'check.wechselPrompt': 'Pick the article.',
  'check.wordorderPrompt': 'Put the sentence in order.',
  'check.bracket': 'Sentence frame',
  'zone.p1': 'Position 1',
  'zone.verb': 'Verb',
  'zone.middle': 'Middle',
  'zone.end': 'End',
};
