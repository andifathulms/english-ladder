// Mandarin Ladder's UI strings over the engine's base tables: its own wording of engine keys, and
// keys only its components use (MandarinKey). Merged with extendStrings in course.config.ts.
// Generated from the standalone app's lib/i18n tables (keys equal to the engine's are left out).
import type { StringTable } from '@ladder/core/lib/i18n';

/** Keys only Mandarin Ladder's components use (useT<MandarinKey>()). */
export type MandarinKey =
  | "settings.zhSize"
  | "settings.zhSizePreview"
  | "words.mw"
  | "words.trad"
  | "toggle.group"
  | "toggle.pinyin"
  | "toggle.pinyinLong"
  | "toggle.tone"
  | "toggle.toneLong"
  | "lesson.holdHint"
  | "rung.pinyin.always"
  | "rung.pinyin.new"
  | "rung.pinyin.on-request"
  | "rung.pinyin.off"
  | "rung.toneColours.on"
  | "rung.toneColours.off"
  | "check.tapLetters"
  | "check.spellLine"
  | "check.letterTray"
  | "check.readPrompt"
  | "check.markPrompt"
  | "check.markOptions"
  | "check.dictationPlay"
  | "check.dictationHint"
  | "placement.section.tones"
  | "placement.section.pinyin"
  | "placement.section.sandhi"
  | "placement.section.strokes"
  | "placement.section.radicals"
  | "placement.section.chars"
  | "placement.sectionShort.tones"
  | "placement.sectionShort.pinyin"
  | "placement.sectionShort.sandhi"
  | "placement.sectionShort.strokes"
  | "placement.sectionShort.radicals"
  | "placement.sectionShort.chars"
  | "placement.result.easy-1"
  | "placement.result.dasar-2"
  | "placement.result.dasar-1"
  | "check.tonePrompt"
  | "check.tonePromptSpoken"
  | "check.toneOptions"
  | "check.toneOption"
  | "tone.neutral"
  | "check.pinyinPrompt"
  | "check.pinyinLabel"
  | "check.pinyinPreview"
  | "check.pinyinKeys"
  | "check.buildBox"
  | "check.buildEmpty"
  | "check.buildParts"
  | "nada.contour"
  | "nada.written"
  | "nada.spoken"
  | "nada.playWritten"
  | "nada.playSpoken"
  | "nada.same"
  | "lesson.hanzi"
  | "hanzi.strokes"
  | "hanzi.radical"
  | "hanzi.playStrokes"
  | "tone.n"
  | "tone.pick"
  | "tone.syllable"
  | "tone.compareWith"
  | "builder.initials"
  | "builder.finals"
  | "builder.tones"
  | "builder.example"
  | "builder.none"
  | "builder.noTone"
  | "builder.rule.ae"
  | "builder.rule.ou"
  | "builder.rule.last"
  | "place.lips"
  | "place.tip"
  | "place.teeth"
  | "place.curled"
  | "place.flat"
  | "place.back"
  | "place.pick"
  | "place.lips.how"
  | "place.tip.how"
  | "place.teeth.how"
  | "place.curled.how"
  | "place.flat.how"
  | "place.back.how"
  | "place.puff"
  | "place.puffNote"
  | "sandhi.mode"
  | "sandhi.presets"
  | "sandhi.rule.3-3"
  | "sandhi.rule.bu"
  | "sandhi.rule.yi"
  | "parts.split"
  | "parts.join"
  | "parts.sound"
  | "parts.meaning"
  | "parts.part"
  | "parts.shared"
  | "parts.pos.left"
  | "parts.pos.right"
  | "parts.pos.top"
  | "parts.pos.bottom"
  | "parts.pos.middle"
  | "parts.pos.outside"
  | "parts.pos.inside"
  | "parts.pos.part"
  | "place.compare"
  | "words.tab"
  | "deck.tab"
  | "deck.title"
  | "deck.learned"
  | "deck.today"
  | "deck.start"
  | "deck.nothing"
  | "deck.list"
  | "deck.filter"
  | "deck.filter.all"
  | "deck.filter.new"
  | "deck.filter.learned"
  | "deck.filter.lessons"
  | "deck.state.new"
  | "deck.state.learned"
  | "deck.more"
  | "deck.none"
  | "deck.flip"
  | "deck.again"
  | "deck.know"
  | "deck.playWord"
  | "deck.close"
  | "deck.summary"
  | "deck.done"
  | "deck.back"
  | "rung.deck"
  | "rung.deckMeta";

type Overrides = Partial<StringTable> & Partial<Record<MandarinKey, string>>;

export const idOverrides: Overrides = {
  "app.name": "Mandarin Ladder",
  "nav.words": "Kata",
  "rung.inProgress": "{n} dari {total} pelajaran",
  "climb.title": "{rung} · naik",
  "settings.zhSize": "Ukuran hanzi",
  "settings.zhSizePreview": "aku baik-baik saja",
  "settings.importFail": "File ini tidak bisa dibaca sebagai progres Mandarin Ladder.",
  "settings.speechOff": "Browser ini tidak punya suara bahasa Mandarin (zh-CN). Rekaman tetap diputar; tombol putar lain disembunyikan.",
  "me.aboutHint": "Cara kerja Mandarin Ladder dan arti Dasar sampai HSK 9",
  "words.searchPlaceholder": "Cari: hanzi, pinyin atau Indonesia",
  "words.mw": "penggolong",
  "words.trad": "tradisional",
  "lesson.talk": "Ngobrol",
  "lesson.sound": "Nada",
  "lesson.words": "Kata",
  "check.listenPrompt": "Dengarkan, lalu pilih yang kamu dengar.",
  "check.listenPlay": "Putar",
  "check.listenNoAudio": "Tidak ada rekaman atau suara bahasa Mandarin di sini. Baca saja, lalu pilih:",
  "read.done": "Selesai. Kamu baru saja membaca satu teks utuh dalam bahasa Mandarin.",
  "toggle.group": "Bantuan membaca untuk pelajaran ini",
  "toggle.pinyin": "Pinyin",
  "toggle.pinyinLong": "Tampilkan pinyin di atas karakter di pelajaran ini",
  "toggle.tone": "Nada",
  "toggle.toneLong": "Warna nada di pelajaran ini",
  "lesson.holdHint": "Tahan sebuah kata (atau tekan P) untuk melihat pinyinnya.",
  "rung.pinyin.always": "Pinyin di atas setiap karakter",
  "rung.pinyin.new": "Pinyin hanya di atas kata baru",
  "rung.pinyin.on-request": "Pinyin bila diminta",
  "rung.pinyin.off": "Tanpa pinyin",
  "rung.toneColours.on": "warna nada menyala",
  "rung.toneColours.off": "warna nada mati",
  "home.doorsBody": "Belum pernah belajar Mandarin? Mulai dari Dasar 1: pinyin dan nada. Sudah bisa membaca pinyin? Ikut cek dasar, lalu mulai dari tempat yang pas.",
  "home.door1": "Baru mulai dari nol",
  "home.door1Sub": "Mulai dari Dasar 1",
  "home.door2": "Sudah bisa pinyin",
  "home.door2Sub": "Cek dasar, 20 soal, ±8 menit",
  "rung.placementRetake": "Cek dasar lagi",
  "rung.placementRetakeMeta": "20 soal · tidak pernah menurunkan anak tangga",
  "rung.missedHint": "Ditandai: pelajaran di balik soal cek dasar yang terlewat.",
  "talk.done": "Selesai. Kamu baru saja mengikuti satu percakapan utuh dalam bahasa Mandarin.",
  "check.tapLetters": "Ketuk sesuai urutan. Ketuk hasilnya untuk menghapus yang terakhir.",
  "check.spellLine": "Hasilnya: {word}. Ketuk untuk menghapus yang terakhir.",
  "check.letterTray": "Yang tersedia",
  "check.readPrompt": "Bagaimana membacanya?",
  "check.markPrompt": "Dengarkan, lalu pilih.",
  "check.markOptions": "Pilihan",
  "check.dictationPlay": "Putar",
  "check.dictationHint": "Dengarkan, lalu susun.",
  "placement.title": "Cek dasar",
  "placement.eyebrow": "Sudah bisa pinyin?",
  "placement.intro": "Cek dasar · 20 soal · tanpa waktu. Hasilnya menentukan dari mana kamu mulai. Kamu bisa mengulang kapan saja.",
  "placement.section.tones": "Mengenali nada lewat pendengaran (6 soal)",
  "placement.section.pinyin": "Menulis pinyin suku kata yang kamu dengar (4 soal)",
  "placement.section.sandhi": "Perubahan nada (2 soal)",
  "placement.section.strokes": "Urutan goresan (2 soal)",
  "placement.section.radicals": "Radikal (3 soal)",
  "placement.section.chars": "Mengenali karakter yang sangat umum (3 soal)",
  "placement.sectionShort.tones": "Nada",
  "placement.sectionShort.pinyin": "Pinyin",
  "placement.sectionShort.sandhi": "Sandhi",
  "placement.sectionShort.strokes": "Goresan",
  "placement.sectionShort.radicals": "Radikal",
  "placement.sectionShort.chars": "Karakter",
  "placement.result.easy-1": "Kamu siap mulai dari Easy 1. Dasar 1 dan Dasar 2 ditandai sudah dinaiki.",
  "placement.result.dasar-2": "Mulai dari Dasar 2: goresan dan radikal. Dasar 1 ditandai sudah dinaiki, dan pelajaran yang perlu diulang sudah ditandai.",
  "placement.result.dasar-1": "Mulai dari Dasar 1. Dalam beberapa menit kamu sudah mengucapkan empat nada pertamamu.",
  "check.tonePrompt": "Dengarkan, lalu pilih nadanya.",
  "check.tonePromptSpoken": "Dengarkan, lalu pilih nada yang diucapkan.",
  "check.toneOptions": "Pilihan nada",
  "check.toneOption": "Nada {tones}",
  "tone.neutral": "netral",
  "check.pinyinPrompt": "Dengarkan, lalu tulis pinyinnya.",
  "check.pinyinLabel": "Pinyin (angka nada boleh: ni3 hao3)",
  "check.pinyinPreview": "Jadi",
  "check.pinyinKeys": "Tombol bantu nada",
  "check.buildBox": "Karakter yang kamu bangun",
  "check.buildEmpty": "Pilih {n} komponen.",
  "check.buildParts": "Komponen",
  "nada.contour": "Kontur nada: {tones}",
  "nada.written": "ditulis",
  "nada.spoken": "diucapkan",
  "nada.playWritten": "Putar per suku kata, dengan nada aslinya",
  "nada.playSpoken": "Putar seperti diucapkan",
  "nada.same": "Di sini nadanya tidak berubah saat diucapkan.",
  "lesson.hanzi": "Hanzi",
  "hanzi.strokes": "{n} goresan",
  "hanzi.radical": "radikal",
  "hanzi.playStrokes": "goresan",
  "tone.n": "nada {n}",
  "tone.pick": "Pilih nada",
  "tone.syllable": "Pilih suku kata",
  "tone.compareWith": "Bandingkan dengan",
  "builder.initials": "Inisial",
  "builder.finals": "Final",
  "builder.tones": "Nada",
  "builder.example": "contoh",
  "builder.none": "Suku kata ini tidak ada dalam bahasa Mandarin.",
  "builder.noTone": "Suku kata ini ada, tapi tidak dengan nada ini.",
  "builder.rule.ae": "Tanda nada di atas a atau e dulu.",
  "builder.rule.ou": "Dalam ou, tanda nada di atas o.",
  "builder.rule.last": "Tanpa a, e atau ou: tanda nada di atas vokal terakhir (iu → u, ui → i).",
  "place.lips": "Bibir",
  "place.tip": "Ujung lidah",
  "place.teeth": "Gigi",
  "place.curled": "Lidah melengkung",
  "place.flat": "Lidah datar",
  "place.back": "Belakang",
  "place.pick": "Pilih tempat bunyi",
  "place.lips.how": "bibir menutup (b p m), atau bibir bawah menyentuh gigi atas (f)",
  "place.tip.how": "ujung lidah menyentuh gusi di belakang gigi atas",
  "place.teeth.how": "ujung lidah datar di belakang gigi, udara mendesis",
  "place.curled.how": "ujung lidah melengkung ke atas dan ke belakang",
  "place.flat.how": "ujung lidah turun, bagian tengah lidah naik ke langit-langit",
  "place.back.how": "pangkal lidah naik ke langit-langit lunak",
  "place.puff": "Hembusan udara: {a} atau {b}",
  "place.puffNote": "b di pinyin tidak bersuara seperti b Indonesia; bedanya hanya hembusan. Taruh tangan di depan mulut: p, t, k terasa hembusannya.",
  "sandhi.mode": "Tampilkan nada",
  "sandhi.presets": "Contoh",
  "sandhi.rule.3-3": "Nada 3 + nada 3: yang pertama diucapkan nada 2.",
  "sandhi.rule.bu": "不 sebelum nada 4 diucapkan bú.",
  "sandhi.rule.yi": "一 berubah: yí sebelum nada 4, yì sebelum nada 1, 2, 3; tetap yī saat berhitung.",
  "parts.split": "Pisahkan",
  "parts.join": "Satukan",
  "parts.sound": "bunyi",
  "parts.meaning": "arti",
  "parts.part": "komponen",
  "parts.shared": "Karakter lain dengan {part}:",
  "parts.pos.left": "kiri",
  "parts.pos.right": "kanan",
  "parts.pos.top": "atas",
  "parts.pos.bottom": "bawah",
  "parts.pos.middle": "tengah",
  "parts.pos.outside": "luar",
  "parts.pos.inside": "dalam",
  "parts.pos.part": "bagian",
  "place.compare": "Bandingkan dengan Indonesia",
  "words.tab": "Kata",
  "deck.tab": "Kartu kata",
  "deck.title": "Kartu kata HSK {hsk}",
  "deck.learned": "{n} dari {total} dipelajari",
  "deck.today": "Hari ini: {n} baru · {k} diulang",
  "deck.start": "Mulai",
  "deck.nothing": "Tidak ada kartu untuk hari ini",
  "deck.list": "Semua kata",
  "deck.filter": "Saring kata",
  "deck.filter.all": "Semua",
  "deck.filter.new": "baru",
  "deck.filter.learned": "dipelajari",
  "deck.filter.lessons": "dari pelajaran",
  "deck.state.new": "baru",
  "deck.state.learned": "dipelajari",
  "deck.more": "dan {n} kata lagi: pakai pencarian",
  "deck.none": "Kartu kata muncul begitu anak tangga HSK pertama siap.",
  "deck.flip": "Balik kartu",
  "deck.again": "Belum ingat",
  "deck.know": "Ingat",
  "deck.playWord": "Putar kata",
  "deck.close": "Tutup kartu kata",
  "deck.summary": "{k} dari {n} kartu kamu ingat.",
  "deck.done": "Selesai untuk hari ini. Kartu yang belum ingat akan muncul lagi besok.",
  "deck.back": "Kembali ke kartu kata",
  "rung.deck": "Kartu kata HSK {hsk}",
  "rung.deckMeta": "{n} kata · semua kata HSK {hsk}",
};

export const enOverrides: Overrides = {
  "app.name": "Mandarin Ladder",
  "nav.words": "Words",
  "home.welcomeTitle": "Start on the first rung",
  "rung.inProgress": "{n} of {total} lessons",
  "lesson.tapFocus": "Tap the highlighted word for a short note.",
  "climb.title": "{rung} · climbed",
  "settings.zhSize": "Hanzi size",
  "settings.zhSizePreview": "I'm fine",
  "settings.importFail": "This file can't be read as Mandarin Ladder progress.",
  "settings.speechOff": "This browser has no Mandarin (zh-CN) voice. Recordings still play; other play buttons are hidden.",
  "me.aboutHint": "How Mandarin Ladder works and what Dasar to HSK 9 mean",
  "words.searchPlaceholder": "Search: hanzi, pinyin or Indonesian",
  "words.mw": "measure word",
  "words.trad": "traditional",
  "lesson.talk": "Talk",
  "lesson.sound": "Tones",
  "lesson.words": "Words",
  "check.listenPrompt": "Listen, then choose what you heard.",
  "check.listenPlay": "Play",
  "check.listenNoAudio": "There is no recording or Mandarin voice here. Read it instead, then choose:",
  "read.done": "Done. You just read a whole text in Mandarin.",
  "toggle.group": "Reading supports for this lesson",
  "toggle.pinyin": "Pinyin",
  "toggle.pinyinLong": "Show pinyin over the characters in this lesson",
  "toggle.tone": "Tones",
  "toggle.toneLong": "Tone colours in this lesson",
  "lesson.holdHint": "Hold a word (or press P) to see its pinyin.",
  "rung.pinyin.always": "Pinyin over every character",
  "rung.pinyin.new": "Pinyin over new words only",
  "rung.pinyin.on-request": "Pinyin on request",
  "rung.pinyin.off": "No pinyin",
  "rung.toneColours.on": "tone colours on",
  "rung.toneColours.off": "tone colours off",
  "home.doorsBody": "Never studied Mandarin? Start at Dasar 1: pinyin and tones. Already read pinyin? Take the foundation check, then start where it fits.",
  "home.door1": "Starting from zero",
  "home.door1Sub": "Start at Dasar 1",
  "home.door2": "I can already read pinyin",
  "home.door2Sub": "Foundation check, 20 questions, about 8 minutes",
  "rung.placementRetake": "Retake the foundation check",
  "rung.placementRetakeMeta": "20 questions · never un-climbs a rung",
  "talk.done": "Done. You just followed a whole conversation in Mandarin.",
  "check.tapLetters": "Tap in order. Tap the result to remove the last one.",
  "check.spellLine": "Your answer: {word}. Tap to remove the last one.",
  "check.letterTray": "To use",
  "check.readPrompt": "How do you read it?",
  "check.markPrompt": "Listen, then choose.",
  "check.markOptions": "Options",
  "check.dictationPlay": "Play",
  "check.dictationHint": "Listen, then build it.",
  "placement.title": "Foundation check",
  "placement.eyebrow": "Already read pinyin?",
  "placement.intro": "Foundation check · 20 questions · no timer. The result decides where you start. You can retake it any time.",
  "placement.section.tones": "Telling tones apart by ear (6 questions)",
  "placement.section.pinyin": "Writing pinyin for a syllable you hear (4 questions)",
  "placement.section.sandhi": "Tone changes (2 questions)",
  "placement.section.strokes": "Stroke order (2 questions)",
  "placement.section.radicals": "Radicals (3 questions)",
  "placement.section.chars": "Recognising very common characters (3 questions)",
  "placement.sectionShort.tones": "Tones",
  "placement.sectionShort.pinyin": "Pinyin",
  "placement.sectionShort.sandhi": "Sandhi",
  "placement.sectionShort.strokes": "Strokes",
  "placement.sectionShort.radicals": "Radicals",
  "placement.sectionShort.chars": "Characters",
  "placement.result.easy-1": "You're ready to start at Easy 1. Dasar 1 and Dasar 2 are marked as climbed.",
  "placement.result.dasar-2": "Start at Dasar 2: strokes and radicals. Dasar 1 is marked as climbed, and the lessons worth revisiting are marked.",
  "placement.result.dasar-1": "Start at Dasar 1. In a few minutes you'll say your first four tones.",
  "check.tonePrompt": "Listen, then choose its tones.",
  "check.tonePromptSpoken": "Listen, then choose the tones as spoken.",
  "check.toneOptions": "Tone options",
  "check.toneOption": "Tones {tones}",
  "tone.neutral": "neutral",
  "check.pinyinPrompt": "Listen, then write its pinyin.",
  "check.pinyinLabel": "Pinyin (tone numbers are fine: ni3 hao3)",
  "check.pinyinPreview": "Reads",
  "check.pinyinKeys": "Tone helper keys",
  "check.buildBox": "The character you are building",
  "check.buildEmpty": "Choose {n} components.",
  "check.buildParts": "Components",
  "nada.contour": "Tone contour: {tones}",
  "nada.written": "written",
  "nada.spoken": "spoken",
  "nada.playWritten": "Play syllable by syllable, in citation tones",
  "nada.playSpoken": "Play as spoken",
  "nada.same": "Here the tones stay the same when spoken.",
  "lesson.hanzi": "Hanzi",
  "hanzi.strokes": "{n} strokes",
  "hanzi.radical": "radical",
  "hanzi.playStrokes": "strokes",
  "tone.n": "tone {n}",
  "tone.pick": "Choose a tone",
  "tone.syllable": "Choose a syllable",
  "tone.compareWith": "Compare with",
  "builder.initials": "Initials",
  "builder.finals": "Finals",
  "builder.tones": "Tones",
  "builder.example": "example",
  "builder.none": "This syllable doesn't exist in Mandarin.",
  "builder.noTone": "This syllable exists, but not with this tone.",
  "builder.rule.ae": "The tone mark goes on a or e first.",
  "builder.rule.ou": "In ou, the tone mark goes on the o.",
  "builder.rule.last": "Without a, e or ou: the mark goes on the last vowel (iu → u, ui → i).",
  "place.lips": "Lips",
  "place.tip": "Tongue tip",
  "place.teeth": "Teeth",
  "place.curled": "Curled tongue",
  "place.flat": "Flat tongue",
  "place.back": "Back",
  "place.pick": "Choose where the sound is made",
  "place.lips.how": "the lips close (b p m), or the lower lip meets the upper teeth (f)",
  "place.tip.how": "the tongue tip touches the ridge behind the upper teeth",
  "place.teeth.how": "the tongue tip lies flat behind the teeth and the air hisses",
  "place.curled.how": "the tongue tip curls up and back",
  "place.flat.how": "the tongue tip goes down and the middle of the tongue rises to the palate",
  "place.back.how": "the back of the tongue rises to the soft palate",
  "place.puff": "A puff of air: {a} or {b}",
  "place.puffNote": "Pinyin b is not voiced like Indonesian b; the difference is only the puff. Hold a hand before your mouth: you feel it on p, t, k.",
  "sandhi.mode": "Show tones",
  "sandhi.presets": "Examples",
  "sandhi.rule.3-3": "Tone 3 + tone 3: the first is said as tone 2.",
  "sandhi.rule.bu": "不 before tone 4 is said bú.",
  "sandhi.rule.yi": "一 changes: yí before tone 4, yì before tones 1, 2, 3; yī when counting.",
  "parts.split": "Split",
  "parts.join": "Join",
  "parts.sound": "sound",
  "parts.meaning": "meaning",
  "parts.part": "component",
  "parts.shared": "Other characters with {part}:",
  "parts.pos.left": "left",
  "parts.pos.right": "right",
  "parts.pos.top": "top",
  "parts.pos.bottom": "bottom",
  "parts.pos.middle": "middle",
  "parts.pos.outside": "outside",
  "parts.pos.inside": "inside",
  "parts.pos.part": "part",
  "place.compare": "Compare with Indonesian",
  "words.tab": "Words",
  "deck.tab": "Word deck",
  "deck.title": "HSK {hsk} word deck",
  "deck.learned": "{n} of {total} learned",
  "deck.today": "Today: {n} new · {k} to review",
  "deck.start": "Start",
  "deck.nothing": "No cards for today",
  "deck.list": "All words",
  "deck.filter": "Filter words",
  "deck.filter.all": "All",
  "deck.filter.new": "new",
  "deck.filter.learned": "learned",
  "deck.filter.lessons": "from lessons",
  "deck.state.new": "new",
  "deck.state.learned": "learned",
  "deck.more": "and {n} more: use search",
  "deck.none": "The word deck appears once the first HSK rung is ready.",
  "deck.flip": "Turn the card",
  "deck.again": "Not yet",
  "deck.know": "Got it",
  "deck.playWord": "Play the word",
  "deck.close": "Close the word deck",
  "deck.summary": "You remembered {k} of {n} cards.",
  "deck.done": "Done for today. Cards you missed will come back tomorrow.",
  "deck.back": "Back to the word deck",
  "rung.deck": "HSK {hsk} word deck",
  "rung.deckMeta": "{n} words · every HSK {hsk} word",
};
