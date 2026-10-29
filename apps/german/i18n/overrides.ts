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
  | 'about.dataTitle';

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
};
