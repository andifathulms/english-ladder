// Arabic Ladder's UI strings over the engine's base tables: its own wording of engine keys, and
// keys only its components use (ArabicKey). Merged with extendStrings in course.config.ts.
import type { StringTable } from '@ladder/core/lib/i18n';

/** Keys only Arabic Ladder's components use (useT<ArabicKey>()). */
export type ArabicKey =
  | "settings.arabicSize"
  | "settings.arabicSizePreview"
  | "toggle.group"
  | "toggle.latin"
  | "toggle.latinLong"
  | "toggle.harakat"
  | "toggle.harakatLong"
  | "lesson.mesir"
  | "lesson.mesirRow"
  | "lesson.fusha"
  | "lesson.holdHint"
  | "rung.translit.always"
  | "rung.translit.on-request"
  | "rung.translit.off"
  | "rung.harakat.full"
  | "rung.harakat.partial"
  | "rung.harakat.none"
  | "words.root"
  | "words.genderM"
  | "words.genderF"
  | "climb.lineAr"
  | "check.tapLetters"
  | "check.spellLine"
  | "check.letterTray"
  | "check.readPrompt"
  | "check.markPrompt"
  | "check.markOptions"
  | "check.dictationPlay"
  | "check.dictationHint"
  | "placement.section.forms"
  | "placement.section.reading"
  | "placement.section.harakat"
  | "placement.section.sounds"
  | "placement.sectionShort.forms"
  | "placement.sectionShort.reading"
  | "placement.sectionShort.harakat"
  | "placement.sectionShort.sounds"
  | "placement.result.easy-1"
  | "placement.result.huruf-2"
  | "placement.result.huruf-1";

type Overrides = Partial<StringTable> & Partial<Record<ArabicKey, string>>;

export const idOverrides: Overrides = {
  "app.name": "Arabic Ladder",
  "rung.inProgress": "{n} dari {total} pelajaran",
  "check.tapTiles": "Ketuk kata untuk menyusun kalimat, dari kanan. Ketuk lagi untuk mengembalikan.",
  "climb.title": "{rung} · naik",
  "settings.arabicSize": "Ukuran teks Arab",
  "settings.arabicSizePreview": "buku baru",
  "settings.importFail": "File ini tidak bisa dibaca sebagai progres Arabic Ladder.",
  "settings.speechOff": "Browser ini tidak punya suara bahasa Arab. Rekaman tetap diputar; tombol putar lain disembunyikan.",
  "me.aboutHint": "Cara kerja Arabic Ladder dan arti Huruf sampai B2+",
  "words.searchPlaceholder": "Cari: Arab, Latin atau Indonesia",
  "lesson.talk": "Ngobrol",
  "lesson.words": "Kata",
  "check.listenPrompt": "Dengarkan, lalu pilih yang kamu dengar.",
  "check.listenPlay": "Putar",
  "check.listenNoAudio": "Tidak ada rekaman atau suara bahasa Arab di sini. Baca saja, lalu pilih:",
  "read.done": "Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Arab.",
  "toggle.group": "Bantuan membaca untuk pelajaran ini",
  "toggle.latin": "Latin",
  "toggle.latinLong": "Tampilkan transliterasi Latin di pelajaran ini",
  "toggle.harakat": "Harakat",
  "toggle.harakatLong": "Selalu tampilkan harakat lengkap di pelajaran ini",
  "lesson.mesir": "Mesir",
  "lesson.mesirRow": "Mesir",
  "lesson.fusha": "Fusha",
  "lesson.holdHint": "Tahan kalimat untuk melihat harakat.",
  "rung.translit.always": "Transliterasi selalu tampil",
  "rung.translit.on-request": "Transliterasi bila diminta",
  "rung.translit.off": "Tanpa transliterasi",
  "rung.harakat.full": "harakat lengkap",
  "rung.harakat.partial": "harakat sebagian",
  "rung.harakat.none": "tanpa harakat",
  "words.root": "Akar",
  "words.genderM": "mudzakkar (laki-laki)",
  "words.genderF": "muannats (perempuan)",
  "home.doorsBody": "Belum kenal huruf Arab? Mulai dari Huruf 1. Sudah lancar membaca Al-Qur'an? Ikut cek huruf, lalu langsung ke Easy 1.",
  "home.door1": "Belum bisa baca huruf Arab",
  "home.door1Sub": "Mulai dari Huruf 1",
  "home.door2": "Sudah bisa baca Al-Qur'an",
  "home.door2Sub": "Cek huruf, 20 soal, ±8 menit",
  "rung.placementRetake": "Cek huruf lagi",
  "rung.placementRetakeMeta": "20 soal · tidak pernah menurunkan anak tangga",
  "rung.missedHint": "Ditandai: pelajaran di balik soal cek huruf yang terlewat.",
  "talk.meta": "Percakapan Mesir · {n} baris · {k} soal",
  "talk.done": "Selesai. Kamu baru saja mengikuti satu percakapan Mesir.",
  "climb.lineAr": "سُلَّمًا سُلَّمًا",
  "check.tapLetters": "Ketuk huruf sesuai urutan. Ketuk kata yang terbentuk untuk menghapus huruf terakhir.",
  "check.spellLine": "Kata yang terbentuk: {word}. Ketuk untuk menghapus huruf terakhir.",
  "check.letterTray": "Huruf yang tersedia",
  "check.readPrompt": "Bagaimana membacanya?",
  "check.markPrompt": "Dengarkan, lalu pilih harakat untuk huruf yang dilingkari.",
  "check.markOptions": "Pilihan harakat",
  "check.dictationPlay": "Putar kata",
  "check.dictationHint": "Dengarkan, lalu susun hurufnya.",
  "placement.title": "Cek huruf",
  "placement.eyebrow": "Sudah bisa baca Al-Qur'an?",
  "placement.intro": "Cek huruf · 20 soal · tanpa waktu. Hasilnya menentukan dari mana kamu mulai. Kamu bisa mengulang kapan saja.",
  "placement.section.forms": "Mengenali huruf dalam empat bentuknya (6 soal)",
  "placement.section.reading": "Membaca kata berharakat (6 soal)",
  "placement.section.harakat": "Harakat (4 soal)",
  "placement.section.sounds": "Membedakan bunyi lewat pendengaran (4 soal)",
  "placement.sectionShort.forms": "Bentuk huruf",
  "placement.sectionShort.reading": "Membaca",
  "placement.sectionShort.harakat": "Harakat",
  "placement.sectionShort.sounds": "Bunyi",
  "placement.result.easy-1": "Kamu siap mulai dari Easy 1. Huruf 1 dan Huruf 2 ditandai sudah dinaiki.",
  "placement.result.huruf-2": "Mulai dari Huruf 2. Huruf 1 ditandai sudah dinaiki, dan pelajaran yang perlu diulang sudah ditandai.",
  "placement.result.huruf-1": "Mulai dari Huruf 1. Dalam beberapa menit kamu sudah membaca suku kata pertamamu.",
};

export const enOverrides: Overrides = {
  "app.name": "Arabic Ladder",
  "home.welcomeTitle": "Start on the first rung",
  "rung.inProgress": "{n} of {total} lessons",
  "lesson.tapFocus": "Tap the highlighted word for a short note.",
  "check.tapTiles": "Tap words to build the sentence, from the right. Tap again to send one back.",
  "climb.title": "{rung} · climbed",
  "settings.arabicSize": "Arabic text size",
  "settings.arabicSizePreview": "a new book",
  "settings.importFail": "This file can't be read as Arabic Ladder progress.",
  "settings.speechOff": "This browser has no Arabic voice. Recordings still play; other play buttons are hidden.",
  "me.aboutHint": "How Arabic Ladder works and what Huruf to B2+ mean",
  "words.searchPlaceholder": "Search: Arabic, Latin or Indonesian",
  "lesson.talk": "Talk",
  "lesson.words": "Words",
  "check.listenPrompt": "Listen, then choose what you heard.",
  "check.listenPlay": "Play",
  "check.listenNoAudio": "There is no recording or Arabic voice here. Read it instead, then choose:",
  "read.done": "Done. You just read a whole text in Arabic.",
  "toggle.group": "Reading supports for this lesson",
  "toggle.latin": "Latin",
  "toggle.latinLong": "Show Latin transliteration in this lesson",
  "toggle.harakat": "Harakat",
  "toggle.harakatLong": "Always show full vowel marks in this lesson",
  "lesson.mesir": "Egyptian",
  "lesson.mesirRow": "Egyptian",
  "lesson.fusha": "Fusha",
  "lesson.holdHint": "Hold a sentence to see its vowel marks.",
  "rung.translit.always": "Transliteration always shown",
  "rung.translit.on-request": "Transliteration on request",
  "rung.translit.off": "No transliteration",
  "rung.harakat.full": "full vowel marks",
  "rung.harakat.partial": "some vowel marks",
  "rung.harakat.none": "no vowel marks",
  "words.root": "Root",
  "words.genderM": "masculine",
  "words.genderF": "feminine",
  "home.doorsBody": "New to the Arabic script? Start at Huruf 1. Already read the Qur'an fluently? Take the letter check and go straight to Easy 1.",
  "home.door1": "I can't read Arabic script yet",
  "home.door1Sub": "Start at Huruf 1",
  "home.door2": "I can already read the Qur'an",
  "home.door2Sub": "Letter check, 20 questions, about 8 minutes",
  "rung.placementRetake": "Retake the letter check",
  "rung.placementRetakeMeta": "20 questions · never un-climbs a rung",
  "rung.missedHint": "Marked: lessons behind the letter-check questions you missed.",
  "talk.meta": "Egyptian conversation · {n} lines · {k} questions",
  "talk.done": "Done. You just followed a whole Egyptian conversation.",
  "climb.lineAr": "سُلَّمًا سُلَّمًا",
  "check.tapLetters": "Tap the letters in order. Tap the word to remove the last letter.",
  "check.spellLine": "Your word: {word}. Tap to remove the last letter.",
  "check.letterTray": "Letters to use",
  "check.readPrompt": "How do you read it?",
  "check.markPrompt": "Listen, then choose the mark for the circled letter.",
  "check.markOptions": "Mark options",
  "check.dictationPlay": "Play the word",
  "check.dictationHint": "Listen, then spell it.",
  "placement.title": "Letter check",
  "placement.eyebrow": "Already read the Qur'an?",
  "placement.intro": "Letter check · 20 questions · no timer. The result decides where you start. You can retake it any time.",
  "placement.section.forms": "Recognising letters in their four forms (6 questions)",
  "placement.section.reading": "Reading vowelled words (6 questions)",
  "placement.section.harakat": "Vowel marks (4 questions)",
  "placement.section.sounds": "Telling sounds apart by ear (4 questions)",
  "placement.sectionShort.forms": "Letter forms",
  "placement.sectionShort.reading": "Reading",
  "placement.sectionShort.harakat": "Marks",
  "placement.sectionShort.sounds": "Sounds",
  "placement.result.easy-1": "You're ready to start at Easy 1. Huruf 1 and Huruf 2 are marked as climbed.",
  "placement.result.huruf-2": "Start at Huruf 2. Huruf 1 is marked as climbed, and the lessons worth revisiting are marked.",
  "placement.result.huruf-1": "Start at Huruf 1. In a few minutes you'll read your first syllables.",
};
