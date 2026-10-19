---
id: easy1-15-masenka
rung: easy-1
order: 15
status: draft
minutes: 9
title: { id: "Mau makan bareng?", en: "Shall we eat together?", ja: "いっしょに {食|た}べませんか", kana: "いっしょに たべませんか" }
summary:
  id: "～ませんか untuk mengajak dengan sopan (mau …?), ～ましょう untuk berkata *ayo* atau menerima ajakan."
  en: "～ませんか to invite politely (would you like to …?), ～ましょう to say *let's* or to accept."
introduces: [n5-invitation]
spiral: verbs
kanji: [休, 間, 東, 西]
worked:
  - { ja: "{映画|えい|が} を {見|み}ます か 。", kana: "えいが を みます か 。", id: "Kamu nonton film?" }
  - { ja: "{映画|えい|が} を [[{見|み}ませんか]] 。", kana: "えいが を みませんか 。", id: "Mau nonton film bareng?" }
  - { ja: "ええ 、 [[{見|み}ましょう]] 。", kana: "ええ 、 みましょう 。", id: "Ayo, kita nonton." }
  - { ja: "すみません 、 {明日|=あした} は ちょっと …", kana: "すみません 、 あした は ちょっと …", id: "Maaf, besok agak susah…" }
examples:
  - { ja: "いっしょに {昼|ひる}ごはん を [[{食|た}べませんか]] 。", kana: "いっしょに ひるごはん を たべませんか 。", id: "Mau makan siang bareng?" }
  - { ja: "ええ 、 [[{食|た}べましょう]] 。", kana: "ええ 、 たべましょう 。", id: "Ayo, kita makan." }
  - { ja: "{明日|=あした} 、 {映画|えい|が} を [[{見|み}ませんか]] 。", kana: "あした 、 えいが を みませんか 。", id: "Besok mau nonton film bareng?" }
  - { ja: "ちょっと [[{休|やす}みましょう]] 。", kana: "ちょっと やすみましょう 。", id: "Ayo istirahat sebentar." }
  - { ja: "{東口|ひがし|ぐち} で [[{会|あ}いましょう]] 。", kana: "ひがしぐち で あいましょう 。", id: "Kita ketemu di pintu timur, ya." }
  - { ja: "{西口|にし|ぐち} の {店|みせ} で コーヒー を [[{飲|の}みませんか]] 。", kana: "にしぐち の みせ で コーヒー を のみませんか 。", id: "Mau minum kopi di kedai dekat pintu barat?" }
pair:
  off: { ja: "いっしょに {昼|ひる}ごはん を {食|た}べます か 。", kana: "いっしょに ひるごはん を たべます か 。" }
  natural: { ja: "いっしょに {昼|ひる}ごはん を [[{食|た}べませんか]] 。", kana: "いっしょに ひるごはん を たべませんか 。" }
talk:
  lines:
    - { who: Rina, ja: "ブディ さん 、 {明日|=あした} {映画|えい|が} を {見|み}ませんか 。", kana: "ブディ さん 、 あした えいが を みませんか 。", id: "Budi, besok mau nonton film bareng?" }
    - { who: Budi, ja: "すみません 、 {明日|=あした} は ちょっと …", kana: "すみません 、 あした は ちょっと …", id: "Maaf, besok agak susah…", note: { id: "ちょっと… adalah cara menolak yang sopan: kalimatnya sengaja tidak diselesaikan.", en: "ちょっと… is the polite way to say no: the sentence is left unfinished on purpose." } }
    - { who: Rina, ja: "じゃあ 、 {日曜日|にち|よう|び} は どう です か 。", kana: "じゃあ 、 にちようび は どう です か 。", id: "Kalau hari Minggu, gimana?" }
    - { who: Budi, ja: "いい です ね 。 {見|み}ましょう 。", kana: "いい です ね 。 みましょう 。", id: "Boleh. Ayo nonton." }
work:
  situation:
    id: "Di pabrik, waktu istirahat. Kamu mengajak atasanmu minum kopi."
    en: "At the factory, break time. You invite your supervisor for a coffee."
  lines:
    - { who: Sato, ja: "みなさん 、 {休|やす}み{時間|じ|かん} です 。", kana: "みなさん 、 やすみじかん です 。", id: "Semuanya, waktunya istirahat." }
    - { who: Andi, ja: "{佐藤|さ|とう} さん 、 いっしょに コーヒー を {飲|の}みませんか 。", kana: "さとう さん 、 いっしょに コーヒー を のみませんか 。", id: "Pak Sato, mau minum kopi bareng?" }
    - { who: Sato, ja: "いい です ね 。 {飲|の}みましょう 。", kana: "いい です ね 。 のみましょう 。", id: "Boleh. Ayo minum." }
tirukan: { ja: "いっしょに {食|た}べませんか 。", kana: "いっしょに たべませんか 。", id: "Mau makan bareng?" }
check:
  - id: e1-15-c1
    type: gap
    cue: "Mau minum kopi bareng?"
    prompt: "いっしょに コーヒー を {飲|の}み___ 。"
    options: [ませんか, ますか, ました]
    answer: ませんか
    why: { id: "Untuk mengajak, pakai ～ませんか. ～ますか hanya bertanya.", en: "To invite, use ～ませんか. ～ますか only asks." }
  - id: e1-15-c2
    type: choice
    cue: "Temanmu mengajak nonton film besok, tapi kamu tidak bisa."
    prompt: "Jawaban mana yang sopan?"
    options: ["すみません 、 {明日|=あした} は ちょっと …", "いいえ 、 {見|み}ません 。", "{見|み}ましょう 。"]
    answer: "すみません 、 {明日|=あした} は ちょっと …"
    why: { id: "いいえ、みません terdengar kasar. ちょっと… menolak dengan halus.", en: "いいえ、みません sounds blunt. ちょっと… says no gently." }
  - id: e1-15-c3
    type: order
    cue: "Kita ketemu di pintu timur, ya."
    tiles: ["{会|あ}いましょう", で, "{東口|ひがし|ぐち}"]
    answer: ["{東口|ひがし|ぐち}", で, "{会|あ}いましょう"]
    why: { id: "Tempat + で, lalu kata kerjanya di akhir.", en: "Place + で, then the verb at the end." }
  - id: e1-15-c4
    type: form
    word: "{休|やす}む"
    target: masho
    options: ["{休|やす}みましょう", "{休|やす}みませんか", "{休|やす}みました"]
    answer: "{休|やす}みましょう"
    why: { id: "やすみます → やすみましょう: ganti ます dengan ましょう.", en: "やすみます → やすみましょう: swap ます for ましょう." }
  - id: e1-15-c5
    type: kana
    ja: "時間"
    furigana: false
    answer: じかん
    why: { id: "時間 dibaca じかん: waktu.", en: "時間 is read じかん: time." }
  - id: e1-15-c6
    type: trace
    char: 休
    guide: on
    why: { id: "休: orang (亻) di kiri, pohon (木) di kanan: orang beristirahat di bawah pohon.", en: "休: a person (亻) on the left, a tree (木) on the right: someone resting by a tree." }
glossary:
  - { ja: "いっしょ", kana: "いっしょ", id: "bersama (いっしょに: bareng)", en: "together", type: noun, jlpt: N5 }
  - { ja: "{休|やす}む", kana: "やすむ", id: "istirahat, libur", en: "to rest, to take a day off", type: verb-1, jlpt: N5 }
  - { ja: "{休|やす}み", kana: "やすみ", id: "istirahat, hari libur", en: "break, day off", type: noun, jlpt: N5 }
  - { ja: "{時間|じ|かん}", kana: "じかん", id: "waktu", en: "time", type: noun, jlpt: N5 }
  - { ja: "{東|ひがし}", kana: "ひがし", id: "timur", en: "east", type: noun, jlpt: N5 }
  - { ja: "{西|にし}", kana: "にし", id: "barat", en: "west", type: noun, jlpt: N5 }
  - { ja: "{東口|ひがし|ぐち}", kana: "ひがしぐち", id: "pintu timur (stasiun)", en: "east exit", type: noun }
  - { ja: "{西口|にし|ぐち}", kana: "にしぐち", id: "pintu barat (stasiun)", en: "west exit", type: noun }
  - { ja: "{映画|えい|が}", kana: "えいが", id: "film", en: "film, movie", type: noun, jlpt: N5 }
  - { ja: "{会|あ}う", kana: "あう", id: "bertemu", en: "to meet", type: verb-1, jlpt: N5 }
  - { ja: "{昼|ひる}ごはん", kana: "ひるごはん", id: "makan siang", en: "lunch", type: noun, jlpt: N5 }
  - { ja: "ちょっと", kana: "ちょっと", id: "sebentar, sedikit; agak (menolak)", en: "a little; a bit (declining)", type: adverb, jlpt: N5 }
  - { ja: "ええ", kana: "ええ", id: "ya", en: "yes", type: expression, jlpt: N5 }
extra:
  - { ja: "{東口|ひがし|ぐち}", reason: "東 + 口: nama pintu stasiun yang dilihat setiap hari; 東 dan 口 ada di daftar N5 secara terpisah." }
  - { ja: "{西口|にし|ぐち}", reason: "西 + 口: nama pintu stasiun yang dilihat setiap hari; 西 dan 口 ada di daftar N5 secara terpisah." }
next: easy1-16-ichinichi
---

## concept.id
Untuk mengajak, ganti ます dengan **ませんか**: いっしょに たべませんか (mau makan bareng?). Bentuknya negatif, tapi artinya ajakan sopan yang memberi ruang untuk menolak. Untuk berkata *ayo* atau menerima ajakan, pakai **ましょう**: たべましょう. Menolak cukup dengan すみません、ちょっと…

## concept.en
To invite, swap ます for **ませんか**: いっしょに たべませんか (would you like to eat together?). The form is negative, but it means a polite invitation that leaves room to say no. To say *let's* or to accept, use **ましょう**: たべましょう. To decline, すみません、ちょっと… is enough.

## contrast.id
～ませんか mirip *mau makan bareng, nggak?* dalam bahasa Indonesia: pertanyaan yang memberi pilihan. ～ましょう lebih dekat ke *ayo* atau *yuk*: dipakai kalau kamu yakin orangnya mau, atau untuk menjawab ajakan. Menolak langsung dengan いいえ terasa kasar, jadi orang Jepang membiarkan kalimatnya menggantung: ちょっと…

## contrast.en
～ませんか is like Indonesian *mau makan bareng, nggak?*: a question that leaves a choice. ～ましょう is closer to *ayo* or *yuk*: used when you're sure the other person wants to, or to answer an invitation. Saying no straight out with いいえ feels rude, so Japanese leaves the sentence hanging: ちょっと…
