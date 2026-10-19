// Japanese Ladder's UI strings over the engine's base tables: its own wording of engine keys, and
// keys only its components use (JapaneseKey). Merged with extendStrings in course.config.ts.
import type { StringTable } from '@ladder/core/lib/i18n';

/** Keys only Japanese Ladder's components use (useT<JapaneseKey>()). */
export type JapaneseKey =
  | 'settings.jaSize'
  | 'settings.jaSizePreview'
  | 'settings.pitchMarks'
  | 'settings.pitchMarksHint'
  | 'settings.romajiInWords'
  | 'settings.on'
  | 'settings.off'
  | 'toggle.group'
  | 'toggle.furigana'
  | 'toggle.furiganaLong'
  | 'toggle.romaji'
  | 'toggle.romajiLong'
  | 'lesson.holdHint'
  | 'lesson.kanji'
  | 'lesson.polite'
  | 'lesson.work'
  | 'lesson.politeCasual'
  | 'lesson.politePolite'
  | 'lesson.politeHonorific'
  | 'lesson.strokes'
  | 'lesson.onyomi'
  | 'lesson.kunyomi'
  | 'lesson.done'
  | 'rung.furigana.always'
  | 'rung.furigana.new'
  | 'rung.furigana.on-request'
  | 'rung.furigana.off'
  | 'rung.furigana.—'
  | 'rung.romaji.fade'
  | 'rung.romaji.none'
  | 'rung.jft'
  | 'rung.wordDeck'
  | 'rung.wordDeckMeta'
  | 'rung.kanjiDeck'
  | 'rung.kanjiDeckMeta'
  | 'words.tab'
  | 'words.deckTab'
  | 'words.kanjiTab'
  | 'words.estimate'
  | 'placement.section.hiragana'
  | 'placement.section.katakana'
  | 'placement.section.dakuten'
  | 'placement.section.ear'
  | 'placement.section.typing'
  | 'placement.section.kanji'
  | 'placement.sectionShort.hiragana'
  | 'placement.sectionShort.katakana'
  | 'placement.sectionShort.dakuten'
  | 'placement.sectionShort.ear'
  | 'placement.sectionShort.typing'
  | 'placement.sectionShort.kanji'
  | 'placement.result.easy-1'
  | 'placement.result.kana-2'
  | 'placement.result.kana-1'
  | 'about.dataTitle'
  | 'deck.soon'
  | 'settings.deckDaily'
  | 'settings.deckFace'
  | 'settings.deckFace.kanji'
  | 'settings.deckFace.meaning'
  | 'settings.deckFace.audio'
  | 'check.kanaHelpers'
  | 'check.kanaLabel'
  | 'check.kanaPromptAudio'
  | 'check.kanaPromptRead'
  | 'check.moraCount'
  | 'check.moraSpelling'
  | 'check.pitchPrompt'
  | 'check.formPrompt'
  | 'check.beats'
  | 'form.masu'
  | 'form.masen'
  | 'form.mashita'
  | 'form.masendeshita'
  | 'form.masho'
  | 'form.te'
  | 'form.nai'
  | 'form.ta'
  | 'form.dict'
  | 'form.potential'
  | 'form.volitional'
  | 'kana.chart'
  | 'kana.script'
  | 'kana.dakuten'
  | 'kana.combos'
  | 'kana.combosTitle'
  | 'kana.cell'
  | 'kana.noteIrregular'
  | 'kana.noteParticle'
  | 'kana.noteSameAs'
  | 'kana.sheetTitle'
  | 'kana.close'
  | 'kana.irregularMark'
  | 'origins.choose'
  | 'origins.label'
  | 'origins.unknown'
  | 'origins.replay'
  | 'origins.hiraNote'
  | 'origins.kataNote'
  | 'beats.play'
  | 'beats.choose'
  | 'beats.label'
  | 'beats.long'
  | 'beats.small'
  | 'pitch.choose'
  | 'pitch.label'
  | 'pitch.high'
  | 'pitch.low'
  | 'pitch.particle'
  | 'pitch.contrast'
  | 'pitch.play'
  | 'place.compare'
  | 'counters.choose'
  | 'counters.number'
  | 'counters.minus'
  | 'counters.plus'
  | 'counters.changed'
  | 'counters.none'
  | 'counters.id'
  | 'train.label'
  | 'train.left'
  | 'train.right'
  | 'train.verbLast'
  | 'train.compare'
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
  | 'kanjiDeck.learned'
  | 'kanjiDeck.today'
  | 'kanjiDeck.start'
  | 'kanjiDeck.nothing'
  | 'kanjiDeck.filter'
  | 'kanjiDeck.filter.all'
  | 'kanjiDeck.filter.new'
  | 'kanjiDeck.filter.learned'
  | 'kanjiDeck.filter.lessons'
  | 'kanjiDeck.state.new'
  | 'kanjiDeck.state.learned'
  | 'kanjiDeck.more'
  | 'kanjiDeck.flip'
  | 'kanjiDeck.again'
  | 'kanjiDeck.know'
  | 'kanjiDeck.close'
  | 'kanjiDeck.summary'
  | 'kanjiDeck.done'
  | 'kanjiDeck.back'
  | 'deck.title'
  | 'deck.list'
  | 'deck.none'
  | 'deck.playWord'
  | 'deck.pitch'
  | 'deck.level'
  | 'kanjiDeck.title'
  | 'kanjiDeck.list'
  | 'kanjiDeck.none'
  | 'kanji.on'
  | 'kanji.kun'
  | 'kanji.strokes'
  | 'kanji.trace'
  | 'kanji.traceTitle'
  | 'kanji.traceClean'
  | 'kanji.traceDone'
  | 'rung.deckMeta';

type Overrides = Partial<StringTable> & Partial<Record<JapaneseKey, string>>;

export const idOverrides: Overrides = {
  'app.name': 'Japanese Ladder',
  'nav.words': 'Kata',
  'rung.inProgress': '{n} dari {total} pelajaran',
  'climb.title': '{rung} · naik',
  'settings.importFail': 'File ini tidak bisa dibaca sebagai progres Japanese Ladder.',
  'settings.speechOff': 'Browser ini tidak punya suara bahasa Jepang (ja-JP). Rekaman tetap diputar; tombol putar lain disembunyikan.',
  'me.aboutHint': 'Cara kerja Japanese Ladder dan arti Kana sampai N1',
  'words.searchPlaceholder': 'Cari: kana, kanji, romaji atau Indonesia',
  'lesson.talk': 'Ngobrol',
  'lesson.sound': 'Bunyi',
  'lesson.words': 'Kata',
  'check.listenPrompt': 'Dengarkan, lalu pilih yang kamu dengar.',
  'check.listenPlay': 'Putar',
  'check.listenNoAudio': 'Tidak ada rekaman atau suara bahasa Jepang di sini. Baca saja, lalu pilih:',
  'read.done': 'Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Jepang.',
  'talk.done': 'Selesai. Kamu baru saja mengikuti satu percakapan utuh dalam bahasa Jepang.',
  'home.doorsBody': 'Belum pernah belajar bahasa Jepang? Mulai dari Kana 1: hiragana. Sudah bisa membaca hiragana? Ikut cek kana, lalu mulai dari tempat yang pas.',
  'home.door1': 'Baru mulai dari nol',
  'home.door1Sub': 'Mulai dari Kana 1',
  'home.door2': 'Sudah bisa hiragana',
  'home.door2Sub': 'Cek kana, 20 soal, ±8 menit',
  'rung.placementRetake': 'Cek kana lagi',
  'rung.placementRetakeMeta': '20 soal · tidak pernah menurunkan anak tangga',
  'rung.missedHint': 'Ditandai: pelajaran di balik soal cek kana yang terlewat.',
  'placement.title': 'Cek kana',
  'placement.eyebrow': 'Sudah bisa hiragana?',
  'placement.intro': 'Cek kana · 20 soal · tanpa waktu. Hasilnya menentukan dari mana kamu mulai. Kamu bisa mengulang kapan saja.',
  'placement.section.hiragana': 'Membaca hiragana (6 soal)',
  'placement.section.katakana': 'Membaca katakana (4 soal)',
  'placement.section.dakuten': 'Dakuten dan kana kecil (3 soal)',
  'placement.section.ear': 'Vokal panjang dan っ, didengar (3 soal)',
  'placement.section.typing': 'Mengetik kata yang didengar dalam kana (2 soal)',
  'placement.section.kanji': 'Mengenali kanji dasar (2 soal)',
  'placement.sectionShort.hiragana': 'Hiragana',
  'placement.sectionShort.katakana': 'Katakana',
  'placement.sectionShort.dakuten': 'Dakuten',
  'placement.sectionShort.ear': 'Dengar',
  'placement.sectionShort.typing': 'Mengetik',
  'placement.sectionShort.kanji': 'Kanji',
  'placement.result.easy-1': 'Kamu siap mulai dari Easy 1. Kana 1 dan Kana 2 ditandai sudah dinaiki.',
  'placement.result.kana-2': 'Mulai dari Kana 2. Kana 1 ditandai sudah dinaiki, dan pelajaran yang perlu diulang ditandai.',
  'placement.result.kana-1': 'Mulai dari Kana 1. Dalam beberapa menit kamu akan membaca hiragana pertamamu.',
  'settings.jaSize': 'Ukuran teks Jepang',
  'settings.jaSizePreview': 'saya pelajar',
  'settings.pitchMarks': 'Tanda aksen nada',
  'settings.pitchMarksHint': 'Di Kata-kataku, kartu kata dan kartu Bunyi.',
  'settings.romajiInWords': 'Romaji di Kata-kataku',
  'settings.on': 'Nyala',
  'settings.off': 'Mati',
  'toggle.group': 'Bantuan baca',
  'toggle.furigana': 'Furigana',
  'toggle.furiganaLong': 'Tampilkan furigana',
  'toggle.romaji': 'Romaji',
  'toggle.romajiLong': 'Tampilkan romaji',
  'lesson.holdHint': 'Tahan sebuah kata, atau tekan F, untuk melihat furigananya.',
  'lesson.kanji': 'Kanji',
  'lesson.polite': 'Sopan',
  'lesson.work': 'Kerja',
  'lesson.politeCasual': 'Teman',
  'lesson.politePolite': 'Sopan',
  'lesson.politeHonorific': 'Hormat',
  'lesson.strokes': 'goresan',
  'lesson.onyomi': 'on',
  'lesson.kunyomi': 'kun',
  'lesson.done': '済',
  'rung.furigana.always': 'Furigana di semua kanji',
  'rung.furigana.new': 'Furigana hanya di kanji baru',
  'rung.furigana.on-request': 'Furigana kalau diminta',
  'rung.furigana.off': 'Tanpa furigana',
  'rung.furigana.—': 'Tanpa kanji',
  'rung.romaji.fade': 'Romaji menghilang di pelajaran 9',
  'rung.romaji.none': 'Tanpa romaji',
  'rung.jft': 'JFT',
  'rung.wordDeck': 'Kartu kata {jlpt}',
  'rung.wordDeckMeta': '{n} kata (perkiraan)',
  'rung.kanjiDeck': 'Kartu kanji {jlpt}',
  'rung.kanjiDeckMeta': '{n} kanji (perkiraan)',
  'words.tab': 'Kata',
  'words.deckTab': 'Kartu kata',
  'words.kanjiTab': 'Kartu kanji',
  'words.estimate': 'Daftar JLPT perkiraan: JLPT tidak menerbitkan daftar resmi sejak 2010.',
  'about.dataTitle': 'Data dan lisensi',
  'deck.soon': 'Kartu ini terbuka bersama Easy 1.',
  'settings.deckDaily': 'Kartu baru per hari',
  'settings.deckFace': 'Sisi depan kartu',
  'settings.deckFace.kanji': 'Kanji',
  'settings.deckFace.meaning': 'Arti',
  'settings.deckFace.audio': 'Suara',
  'check.kanaHelpers': 'Kana tambahan',
  'check.kanaLabel': 'Ketik dengan romaji: berubah jadi kana',
  'check.kanaPromptAudio': 'Dengarkan, lalu tulis dalam kana.',
  'check.kanaPromptRead': 'Tulis bacaannya dalam kana.',
  'check.moraCount': 'Dengarkan, lalu hitung ketukannya.',
  'check.moraSpelling': 'Dengarkan, lalu pilih tulisannya.',
  'check.pitchPrompt': 'Dengarkan, lalu pilih artinya.',
  'check.formPrompt': 'Ubah ke bentuk ini:',
  'check.beats': '{n} ketukan',
  'form.masu': 'bentuk ます',
  'form.masen': 'bentuk ません',
  'form.mashita': 'bentuk ました',
  'form.masendeshita': 'bentuk ませんでした',
  'form.masho': 'bentuk ましょう',
  'form.te': 'bentuk て',
  'form.nai': 'bentuk ない',
  'form.ta': 'bentuk た',
  'form.dict': 'bentuk kamus',
  'form.potential': 'bentuk potensial',
  'form.volitional': 'bentuk ajakan',
  'kana.chart': 'Tabel kana',
  'kana.script': 'Huruf',
  'kana.dakuten': 'Dakuten',
  'kana.combos': 'Kana gabungan',
  'kana.combosTitle': 'Kana gabungan: kana kolom い dengan ゃ ゅ ょ kecil',
  'kana.cell': '{kana}, dibaca {romaji}',
  'kana.noteIrregular': '{kana} dibaca {romaji}, bukan {regular}.',
  'kana.noteParticle': '{kana} sekarang hanya dipakai sebagai partikel, dan dibaca seperti {like}.',
  'kana.noteSameAs': '{kana} dibaca sama dengan {like}, dan jarang dipakai.',
  'kana.sheetTitle': 'Kana {kana}',
  'kana.close': 'Tutup',
  'kana.irregularMark': 'bacaan khusus',
  'origins.choose': 'Pilih kana',
  'origins.label': '{kana} berasal dari kanji {kanji}',
  'origins.unknown': 'Asal {kana} tidak diketahui pasti.',
  'origins.replay': 'Putar lagi',
  'origins.hiraNote': 'Hiragana lahir dari tulisan tangan cepat seluruh kanji.',
  'origins.kataNote': 'Katakana diambil dari sebagian kanji.',
  'beats.play': 'Putar dengan ketukan',
  'beats.choose': 'Pilih kata',
  'beats.label': '{word}: {n} ketukan',
  'beats.long': 'vokal panjang',
  'beats.small': 'っ kecil: satu ketukan diam',
  'pitch.choose': 'Pilih kata',
  'pitch.label': '{word}, {meaning}: {pattern}',
  'pitch.high': 'tinggi',
  'pitch.low': 'rendah',
  'pitch.particle': 'partikel が {level}',
  'pitch.contrast': 'Bahasa Indonesia tidak punya nada kata: suara naik-turun hanya untuk kalimat, misalnya saat bertanya. Di bahasa Jepang, tinggi-rendah tiap ketukan bisa membedakan dua kata.',
  'pitch.play': 'Putar',
  'place.compare': 'Bandingkan dengan bahasa Indonesia',
  'counters.choose': 'Pilih benda',
  'counters.number': 'Jumlah',
  'counters.minus': 'Kurangi satu',
  'counters.plus': 'Tambah satu',
  'counters.changed': 'Bunyinya berubah pada {list}.',
  'counters.none': 'Bunyinya tidak berubah.',
  'counters.id': 'Dalam bahasa Indonesia:',
  'train.label': 'Kereta kalimat',
  'train.left': 'Pindahkan {car} ke kiri',
  'train.right': 'Pindahkan {car} ke kanan',
  'train.verbLast': 'Kata kerja selalu di belakang. Gerbong lain boleh pindah, karena partikelnya yang menandai peran.',
  'train.compare': 'Bandingkan dengan bahasa Indonesia',
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
  'kanjiDeck.learned': '{n} dari {total} dipelajari',
  'kanjiDeck.today': 'Hari ini: {n} baru · {k} diulang',
  'kanjiDeck.start': 'Mulai',
  'kanjiDeck.nothing': 'Tidak ada kartu untuk hari ini',
  'kanjiDeck.filter': 'Saring',
  'kanjiDeck.filter.all': 'Semua',
  'kanjiDeck.filter.new': 'baru',
  'kanjiDeck.filter.learned': 'dipelajari',
  'kanjiDeck.filter.lessons': 'dari pelajaran',
  'kanjiDeck.state.new': 'baru',
  'kanjiDeck.state.learned': 'dipelajari',
  'kanjiDeck.more': 'dan {n} lagi: pakai pencarian',
  'kanjiDeck.flip': 'Balik kartu',
  'kanjiDeck.again': 'Belum ingat',
  'kanjiDeck.know': 'Ingat',
  'kanjiDeck.close': 'Tutup kartu',
  'kanjiDeck.summary': '{k} dari {n} kamu ingat.',
  'kanjiDeck.done': 'Kartu berikutnya muncul lagi sesuai jadwal ulangnya.',
  'kanjiDeck.back': 'Kembali ke daftar',
  'deck.title': 'Kartu kata {level}',
  'deck.list': 'Semua kata',
  'deck.none': 'Kartu kata muncul begitu anak tangga JLPT pertama punya pelajaran.',
  'deck.playWord': 'Putar kata',
  'deck.pitch': 'Aksen nada {n}',
  'deck.level': 'JLPT {level} · perkiraan',
  'kanjiDeck.title': 'Kartu kanji {level}',
  'kanjiDeck.list': 'Semua kanji',
  'kanjiDeck.none': 'Kartu kanji muncul begitu anak tangga JLPT pertama punya pelajaran.',
  'kanji.on': 'on',
  'kanji.kun': 'kun',
  'kanji.strokes': 'goresan',
  'kanji.trace': 'Latihan menulis',
  'kanji.traceTitle': 'Latihan menulis kanji ini',
  'kanji.traceClean': 'Rapi, tanpa salah goresan.',
  'kanji.traceDone': 'Selesai, {n} goresan perlu diulang.',
  'rung.deckMeta': '{n} kata, daftar perkiraan',
};

export const enOverrides: Overrides = {
  'app.name': 'Japanese Ladder',
  'nav.words': 'Words',
  'rung.inProgress': '{n} of {total} lessons',
  'climb.title': '{rung} · climbed',
  'settings.importFail': "This file can't be read as Japanese Ladder progress.",
  'settings.speechOff': 'This browser has no Japanese (ja-JP) voice. Recordings still play; other play buttons are hidden.',
  'me.aboutHint': 'How Japanese Ladder works, and what Kana to N1 means',
  'words.searchPlaceholder': 'Search: kana, kanji, romaji or Indonesian',
  'lesson.talk': 'Chat',
  'lesson.sound': 'Sound',
  'lesson.words': 'Words',
  'check.listenPrompt': 'Listen, then choose what you heard.',
  'check.listenPlay': 'Play',
  'check.listenNoAudio': 'No recording or Japanese voice here. Read it instead, then choose:',
  'read.done': 'Done. You just read a whole text in Japanese.',
  'talk.done': 'Done. You just followed a whole conversation in Japanese.',
  'home.doorsBody': 'Never studied Japanese? Start at Kana 1: hiragana. Already read hiragana? Take the kana check and start where you fit.',
  'home.door1': 'Starting from zero',
  'home.door1Sub': 'Start at Kana 1',
  'home.door2': 'I can already read hiragana',
  'home.door2Sub': 'Kana check, 20 questions, about 8 minutes',
  'rung.placementRetake': 'Take the kana check again',
  'rung.placementRetakeMeta': '20 questions · never moves you down',
  'rung.missedHint': 'Marked: lessons behind the kana-check questions you missed.',
  'placement.title': 'Kana check',
  'placement.eyebrow': 'Already read hiragana?',
  'placement.intro': 'Kana check · 20 questions · no timer. The result decides where you start. You can retake it any time.',
  'placement.section.hiragana': 'Reading hiragana (6 questions)',
  'placement.section.katakana': 'Reading katakana (4 questions)',
  'placement.section.dakuten': 'Dakuten and small kana (3 questions)',
  'placement.section.ear': 'Long vowels and っ by ear (3 questions)',
  'placement.section.typing': 'Typing a heard word in kana (2 questions)',
  'placement.section.kanji': 'Recognising basic kanji (2 questions)',
  'placement.sectionShort.hiragana': 'Hiragana',
  'placement.sectionShort.katakana': 'Katakana',
  'placement.sectionShort.dakuten': 'Dakuten',
  'placement.sectionShort.ear': 'Listening',
  'placement.sectionShort.typing': 'Typing',
  'placement.sectionShort.kanji': 'Kanji',
  'placement.result.easy-1': "You're ready to start at Easy 1. Kana 1 and Kana 2 are marked as climbed.",
  'placement.result.kana-2': 'Start at Kana 2. Kana 1 is marked as climbed, and the lessons worth revisiting are marked.',
  'placement.result.kana-1': "Start at Kana 1. In a few minutes you'll read your first hiragana.",
  'settings.jaSize': 'Japanese text size',
  'settings.jaSizePreview': "I'm a student",
  'settings.pitchMarks': 'Pitch accent marks',
  'settings.pitchMarksHint': 'In My words, word cards and the Sound card.',
  'settings.romajiInWords': 'Romaji in My words',
  'settings.on': 'On',
  'settings.off': 'Off',
  'toggle.group': 'Reading help',
  'toggle.furigana': 'Furigana',
  'toggle.furiganaLong': 'Show furigana',
  'toggle.romaji': 'Romaji',
  'toggle.romajiLong': 'Show romaji',
  'lesson.holdHint': 'Hold a word, or press F, to see its furigana.',
  'lesson.kanji': 'Kanji',
  'lesson.polite': 'Politeness',
  'lesson.work': 'Work',
  'lesson.politeCasual': 'Friends',
  'lesson.politePolite': 'Polite',
  'lesson.politeHonorific': 'Respectful',
  'lesson.strokes': 'strokes',
  'lesson.onyomi': 'on',
  'lesson.kunyomi': 'kun',
  'lesson.done': '済',
  'rung.furigana.always': 'Furigana on every kanji',
  'rung.furigana.new': 'Furigana on new kanji only',
  'rung.furigana.on-request': 'Furigana on request',
  'rung.furigana.off': 'No furigana',
  'rung.furigana.—': 'No kanji',
  'rung.romaji.fade': 'Romaji gone by lesson 9',
  'rung.romaji.none': 'No romaji',
  'rung.jft': 'JFT',
  'rung.wordDeck': '{jlpt} word cards',
  'rung.wordDeckMeta': '{n} words (estimate)',
  'rung.kanjiDeck': '{jlpt} kanji cards',
  'rung.kanjiDeckMeta': '{n} kanji (estimate)',
  'words.tab': 'Words',
  'words.deckTab': 'Word cards',
  'words.kanjiTab': 'Kanji cards',
  'words.estimate': 'JLPT lists are estimates: JLPT has published no official list since 2010.',
  'about.dataTitle': 'Data and licences',
  'deck.soon': 'These cards open with Easy 1.',
  'settings.deckDaily': 'New cards a day',
  'settings.deckFace': 'Card front',
  'settings.deckFace.kanji': 'Kanji',
  'settings.deckFace.meaning': 'Meaning',
  'settings.deckFace.audio': 'Sound',
  'check.kanaHelpers': 'Extra kana',
  'check.kanaLabel': 'Type in romaji: it turns into kana',
  'check.kanaPromptAudio': 'Listen, then write it in kana.',
  'check.kanaPromptRead': 'Write its reading in kana.',
  'check.moraCount': 'Listen, then count the beats.',
  'check.moraSpelling': 'Listen, then choose the spelling.',
  'check.pitchPrompt': 'Listen, then choose the meaning.',
  'check.formPrompt': 'Change it to this form:',
  'check.beats': '{n} beats',
  'form.masu': 'ます form',
  'form.masen': 'ません form',
  'form.mashita': 'ました form',
  'form.masendeshita': 'ませんでした form',
  'form.masho': 'ましょう form',
  'form.te': 'て form',
  'form.nai': 'ない form',
  'form.ta': 'た form',
  'form.dict': 'dictionary form',
  'form.potential': 'potential form',
  'form.volitional': 'volitional form',
  'kana.chart': 'Kana chart',
  'kana.script': 'Script',
  'kana.dakuten': 'Dakuten',
  'kana.combos': 'Combinations',
  'kana.combosTitle': 'Combinations: the い-column kana with a small ゃ ゅ ょ',
  'kana.cell': '{kana}, read {romaji}',
  'kana.noteIrregular': '{kana} is read {romaji}, not {regular}.',
  'kana.noteParticle': '{kana} is now used only as a particle, and is read like {like}.',
  'kana.noteSameAs': '{kana} sounds the same as {like}, and is rare.',
  'kana.sheetTitle': 'The kana {kana}',
  'kana.close': 'Close',
  'kana.irregularMark': 'special reading',
  'origins.choose': 'Choose a kana',
  'origins.label': '{kana} comes from the kanji {kanji}',
  'origins.unknown': 'Where {kana} came from is not known for sure.',
  'origins.replay': 'Play again',
  'origins.hiraNote': 'Hiragana grew from fast handwriting of a whole kanji.',
  'origins.kataNote': 'Katakana took one part of a kanji.',
  'beats.play': 'Play with beats',
  'beats.choose': 'Choose a word',
  'beats.label': '{word}: {n} beats',
  'beats.long': 'long vowel',
  'beats.small': 'small っ: one silent beat',
  'pitch.choose': 'Choose a word',
  'pitch.label': '{word}, {meaning}: {pattern}',
  'pitch.high': 'high',
  'pitch.low': 'low',
  'pitch.particle': 'particle が {level}',
  'pitch.contrast': 'Indonesian has no word pitch: the voice rises and falls only over a sentence, for example in a question. In Japanese, the high and low of each beat can tell two words apart.',
  'pitch.play': 'Play',
  'place.compare': 'Compare with Indonesian',
  'counters.choose': 'Choose a thing',
  'counters.number': 'Number',
  'counters.minus': 'One fewer',
  'counters.plus': 'One more',
  'counters.changed': 'The sound changes at {list}.',
  'counters.none': 'The sound does not change.',
  'counters.id': 'In Indonesian:',
  'train.label': 'Sentence train',
  'train.left': 'Move {car} left',
  'train.right': 'Move {car} right',
  'train.verbLast': 'The verb always goes last. The other cars can move, because the particles mark the roles.',
  'train.compare': 'Compare with Indonesian',
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
  'kanjiDeck.learned': '{n} of {total} learned',
  'kanjiDeck.today': 'Today: {n} new · {k} to review',
  'kanjiDeck.start': 'Start',
  'kanjiDeck.nothing': 'No cards for today',
  'kanjiDeck.filter': 'Filter',
  'kanjiDeck.filter.all': 'All',
  'kanjiDeck.filter.new': 'new',
  'kanjiDeck.filter.learned': 'learned',
  'kanjiDeck.filter.lessons': 'from lessons',
  'kanjiDeck.state.new': 'new',
  'kanjiDeck.state.learned': 'learned',
  'kanjiDeck.more': 'and {n} more: use the search',
  'kanjiDeck.flip': 'Turn the card',
  'kanjiDeck.again': 'Not yet',
  'kanjiDeck.know': 'Got it',
  'kanjiDeck.close': 'Close the cards',
  'kanjiDeck.summary': 'You remembered {k} of {n}.',
  'kanjiDeck.done': 'Each card comes back on its review day.',
  'kanjiDeck.back': 'Back to the list',
  'deck.title': 'Word cards {level}',
  'deck.list': 'All words',
  'deck.none': 'Word cards appear once the first JLPT rung has lessons.',
  'deck.playWord': 'Play the word',
  'deck.pitch': 'Pitch accent {n}',
  'deck.level': 'JLPT {level} · estimate',
  'kanjiDeck.title': 'Kanji cards {level}',
  'kanjiDeck.list': 'All kanji',
  'kanjiDeck.none': 'Kanji cards appear once the first JLPT rung has lessons.',
  'kanji.on': 'on',
  'kanji.kun': 'kun',
  'kanji.strokes': 'strokes',
  'kanji.trace': 'Practise writing',
  'kanji.traceTitle': 'Practise writing this kanji',
  'kanji.traceClean': 'Neat, no stroke missed.',
  'kanji.traceDone': 'Done, {n} strokes to try again.',
  'rung.deckMeta': '{n} words, an estimated list',
};
