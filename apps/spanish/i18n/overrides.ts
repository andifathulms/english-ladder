// Spanish Ladder's UI strings over the engine's base tables: its own wording of engine keys, and
// keys only its components use (SpanishKey). Merged with extendStrings in course.config.ts.
import type { StringTable } from '@ladder/core/lib/i18n';

/** Keys only Spanish Ladder's components use (useT<SpanishKey>()). */
export type SpanishKey =
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
  | 'words.seeConjugation'
  | 'words.close'
  | 'tense.presente'
  | 'tense.preterito'
  | 'tense.imperfecto'
  | 'tense.futuro'
  | 'tense.condicional'
  | 'tense.subjuntivo'
  | 'tense.imperativo'
  | 'number.sg'
  | 'number.pl'
  | 'check.formPrompt'
  | 'check.formLabel'
  | 'check.dictationPrompt'
  | 'check.dictationLabel'
  | 'check.conjugatePrompt'
  | 'check.agreePrompt'
  | 'check.article'
  | 'check.adjective'
  | 'check.stressPrompt'
  | 'check.stressSyllable'
  | 'check.needsAccent'
  | 'check.yes'
  | 'check.no'
  | 'check.accentNote'
  | 'accent.a'
  | 'accent.e'
  | 'accent.i'
  | 'accent.o'
  | 'accent.u'
  | 'accent.ue'
  | 'accent.n'
  | 'accent.q'
  | 'accent.x'
  | 'gender.m'
  | 'gender.f'
  | 'gender.mf'
  | 'sound.pairs'
  | 'lesson.spain'
  | 'lesson.spainLatam'
  | 'lesson.spainEs'
  | 'words.bridges'
  | 'words.portuguese'
  | 'words.bridgeOff'
  | 'words.falseFriends'
  | 'words.plural'
  | 'words.tab'
  | 'words.deckTab'
  | 'home.doorNote'
  | 'home.doorNoteLink'
  | 'deck.soon'
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
  | 'rung.dele'
  | 'rung.noDele'
  | 'settings.variety'
  | 'settings.variety.latam'
  | 'settings.variety.es'
  | 'settings.accentStrict'
  | 'settings.accentStrict.rung'
  | 'settings.accentStrict.always'
  | 'settings.accentStrictHint'
  | 'settings.deckDaily'
  | 'settings.deckFace'
  | 'settings.deckFace.word'
  | 'settings.deckFace.meaning'
  | 'settings.deckFace.audio'
  | 'about.dataTitle';

type Overrides = Partial<StringTable> & Partial<Record<SpanishKey, string>>;

export const idOverrides: Overrides = {
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
  'words.seeConjugation': 'lihat konjugasi',
  'words.close': 'Tutup',
  'tense.presente': 'presente',
  'tense.preterito': 'pretérito indefinido',
  'tense.imperfecto': 'imperfecto',
  'tense.futuro': 'futuro',
  'tense.condicional': 'condicional',
  'tense.subjuntivo': 'subjuntivo',
  'tense.imperativo': 'perintah (imperativo)',
  'number.sg': 'tunggal',
  'number.pl': 'jamak',
  'check.formPrompt': 'Tulis bentuk yang tepat.',
  'check.formLabel': 'Bentuknya',
  'check.dictationPrompt': 'Dengarkan, lalu tulis kalimatnya.',
  'check.dictationLabel': 'Kalimat yang kamu dengar',
  'check.conjugatePrompt': 'Isi tabelnya:',
  'check.agreePrompt': 'Pilih artikel dan bentuk kata sifat yang cocok.',
  'check.article': 'Artikel',
  'check.adjective': 'Kata sifat',
  'check.stressPrompt': 'Ketuk suku kata yang ditekan:',
  'check.stressSyllable': 'Suku kata yang ditekan',
  'check.needsAccent': 'Perlu aksen?',
  'check.yes': 'Ya',
  'check.no': 'Tidak',
  'check.accentNote': 'Hampir sempurna: *{answer}*, dengan aksen.',
  'accent.a': 'a dengan aksen',
  'accent.e': 'e dengan aksen',
  'accent.i': 'i dengan aksen',
  'accent.o': 'o dengan aksen',
  'accent.u': 'u dengan aksen',
  'accent.ue': 'u dengan dua titik',
  'accent.n': 'eñe',
  'accent.q': 'tanda tanya pembuka',
  'accent.x': 'tanda seru pembuka',
  'gender.m': 'maskulin',
  'gender.f': 'feminin',
  'gender.mf': 'maskulin atau feminin',
  'sound.pairs': 'Pasangan bunyi',
  'lesson.spain': 'España',
  'lesson.spainLatam': 'América Latina',
  'lesson.spainEs': 'España',
  'words.bridges': 'Jembatan kata',
  'words.portuguese': 'Portugis',
  'words.bridgeOff': 'Jembatan ini menyesatkan',
  'words.falseFriends': 'Teman palsu',
  'words.plural': 'jamak:',
  'words.tab': 'Kata',
  'words.deckTab': 'Kartu kata',
  'home.doorNote': 'Mau latihan bunyi dulu?',
  'home.doorNoteLink': 'Mulai dari Dasar.',
  'deck.soon': 'Kartu kata A1 terbuka bersama pelajaran Easy 1.',
  'app.name': 'Spanish Ladder',
  'nav.words': 'Kata',
  'rung.inProgress': '{n} dari {total} pelajaran',
  'climb.title': '{rung} · naik',
  'settings.importFail': 'File ini tidak bisa dibaca sebagai progres Spanish Ladder.',
  'settings.speechOff': 'Browser ini tidak punya suara bahasa Spanyol. Rekaman tetap diputar; tombol putar lain disembunyikan.',
  'settings.voiceSampleText': '¡Hola! Esta es la voz de tu Spanish Ladder. ¿Se escucha bien?',
  'me.aboutHint': 'Cara kerja Spanish Ladder dan arti A1 sampai C1',
  'words.searchPlaceholder': 'Cari kata, Spanyol atau Indonesia',
  'lesson.talk': 'Ngobrol',
  'lesson.sound': 'Bunyi',
  'lesson.words': 'Kata',
  'check.listenNoAudio': 'Browser ini tidak punya suara bahasa Spanyol. Baca kalimat ini, lalu pilih yang sama:',
  'read.done': 'Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Spanyol.',
  'talk.done': 'Selesai. Kamu baru saja mengikuti satu percakapan utuh dalam bahasa Spanyol.',
  'home.doorsBody': 'Belum pernah belajar bahasa Spanyol? Mulai dari Easy 1. Sudah pernah belajar? Ikut cek level, lalu mulai dari tempat yang pas.',
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
  'placement.section.easy1': 'Easy 1: ser, estar, gender, kata kerja (6 soal)',
  'placement.section.easy2': 'Easy 2: kata kerja tak beraturan, gustar, rutinitas (6 soal)',
  'placement.section.easy3': 'Easy 3: masa lalu dan kata ganti (6 soal)',
  'placement.sectionShort.dasar': 'Dasar',
  'placement.sectionShort.easy1': 'Easy 1',
  'placement.sectionShort.easy2': 'Easy 2',
  'placement.sectionShort.easy3': 'Easy 3',
  'placement.result.dasar': 'Mulai dari Dasar: bunyi dan ejaan. Sebentar saja, lalu kamu naik ke Easy 1.',
  'placement.result.easy-1': 'Mulai dari Easy 1. Dasar ditandai sudah dinaiki.',
  'placement.result.easy-2': 'Mulai dari Easy 2. Dasar dan Easy 1 ditandai sudah dinaiki, dan pelajaran yang perlu diulang ditandai.',
  'rung.dele': 'DELE',
  'rung.noDele': 'Pra-A1',
  'settings.variety': 'Ragam suara',
  'settings.variety.latam': 'Amerika Latin',
  'settings.variety.es': 'Spanyol',
  'settings.accentStrict': 'Tanda aksen',
  'settings.accentStrict.rung': 'Ikuti anak tangga',
  'settings.accentStrict.always': 'Selalu ketat',
  'settings.accentStrictHint': 'Sebelum Easy 3, jawaban tanpa aksen tetap diterima dengan catatan.',
  'settings.deckDaily': 'Kartu baru per hari',
  'settings.deckFace': 'Sisi depan kartu',
  'settings.deckFace.word': 'Kata',
  'settings.deckFace.meaning': 'Arti',
  'settings.deckFace.audio': 'Suara',
  'about.dataTitle': 'Data dan lisensi',
};

export const enOverrides: Overrides = {
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
  'words.seeConjugation': 'see conjugation',
  'words.close': 'Close',
  'tense.presente': 'present',
  'tense.preterito': 'preterite',
  'tense.imperfecto': 'imperfect',
  'tense.futuro': 'future',
  'tense.condicional': 'conditional',
  'tense.subjuntivo': 'subjunctive',
  'tense.imperativo': 'command (imperativo)',
  'number.sg': 'singular',
  'number.pl': 'plural',
  'check.formPrompt': 'Write the right form.',
  'check.formLabel': 'The form',
  'check.dictationPrompt': 'Listen, then write the sentence.',
  'check.dictationLabel': 'The sentence you heard',
  'check.conjugatePrompt': 'Fill in the grid:',
  'check.agreePrompt': 'Pick the article and the adjective form that agree.',
  'check.article': 'Article',
  'check.adjective': 'Adjective',
  'check.stressPrompt': 'Tap the stressed syllable:',
  'check.stressSyllable': 'The stressed syllable',
  'check.needsAccent': 'Needs an accent?',
  'check.yes': 'Yes',
  'check.no': 'No',
  'check.accentNote': 'Almost perfect: *{answer}*, with its accent.',
  'accent.a': 'a with an accent',
  'accent.e': 'e with an accent',
  'accent.i': 'i with an accent',
  'accent.o': 'o with an accent',
  'accent.u': 'u with an accent',
  'accent.ue': 'u with a diaeresis',
  'accent.n': 'eñe (n with a tilde)',
  'accent.q': 'opening question mark',
  'accent.x': 'opening exclamation mark',
  'gender.m': 'masculine',
  'gender.f': 'feminine',
  'gender.mf': 'masculine or feminine',
  'sound.pairs': 'Sound pairs',
  'lesson.spain': 'España',
  'lesson.spainLatam': 'América Latina',
  'lesson.spainEs': 'España',
  'words.bridges': 'Word bridges',
  'words.portuguese': 'Portuguese',
  'words.bridgeOff': 'This bridge misleads',
  'words.falseFriends': 'False friends',
  'words.plural': 'plural:',
  'words.tab': 'Words',
  'words.deckTab': 'Word deck',
  'home.doorNote': 'Want to practise the sounds first?',
  'home.doorNoteLink': 'Start with Dasar.',
  'deck.soon': 'The A1 word deck opens with the Easy 1 lessons.',
  'app.name': 'Spanish Ladder',
  'nav.words': 'Words',
  'rung.inProgress': '{n} of {total} lessons',
  'climb.title': '{rung} · climbed',
  'settings.importFail': "This file can't be read as Spanish Ladder progress.",
  'settings.speechOff': 'This browser has no Spanish voice. Recordings still play; other play buttons are hidden.',
  'settings.voiceSampleText': '¡Hola! Esta es la voz de tu Spanish Ladder. ¿Se escucha bien?',
  'me.aboutHint': 'How Spanish Ladder works and what A1 to C1 mean',
  'words.searchPlaceholder': 'Search Spanish or Indonesian',
  'lesson.talk': 'Ngobrol',
  'lesson.sound': 'Sounds',
  'lesson.words': 'Words',
  'check.listenNoAudio': 'This browser has no Spanish voice. Read the sentence, then pick the same one:',
  'read.done': 'Done. You just read a whole text in Spanish.',
  'talk.done': 'Done. You just followed a whole conversation in Spanish.',
  'home.doorsBody': 'Never studied Spanish? Start at Easy 1. Studied some before? Take the level check and start where it fits.',
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
  'placement.section.easy1': 'Easy 1: ser, estar, gender, verbs (6 questions)',
  'placement.section.easy2': 'Easy 2: irregular verbs, gustar, routines (6 questions)',
  'placement.section.easy3': 'Easy 3: the past and pronouns (6 questions)',
  'placement.sectionShort.dasar': 'Dasar',
  'placement.sectionShort.easy1': 'Easy 1',
  'placement.sectionShort.easy2': 'Easy 2',
  'placement.sectionShort.easy3': 'Easy 3',
  'placement.result.dasar': 'Start at Dasar: sounds and spelling. It is short, then you move up to Easy 1.',
  'placement.result.easy-1': 'Start at Easy 1. Dasar is marked climbed.',
  'placement.result.easy-2': 'Start at Easy 2. Dasar and Easy 1 are marked climbed, and the lessons worth a second look are marked.',
  'rung.dele': 'DELE',
  'rung.noDele': 'Pre-A1',
  'settings.variety': 'Voice variety',
  'settings.variety.latam': 'Latin American',
  'settings.variety.es': 'Spain',
  'settings.accentStrict': 'Accent marks',
  'settings.accentStrict.rung': 'Follow the rung',
  'settings.accentStrict.always': 'Always strict',
  'settings.accentStrictHint': 'Before Easy 3, an answer missing an accent is accepted with a note.',
  'settings.deckDaily': 'New cards per day',
  'settings.deckFace': 'Card front',
  'settings.deckFace.word': 'Word',
  'settings.deckFace.meaning': 'Meaning',
  'settings.deckFace.audio': 'Sound',
  'about.dataTitle': 'Data and licences',
};
