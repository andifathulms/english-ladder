---
id: easy1-04-koko-soko
rung: easy-1
order: 4
status: draft
minutes: 9
title: { id: "Di mana?", en: "Where is it?", ja: "どこ です か", kana: "どこ です か" }
summary:
  id: "ここ di sini, そこ di situ, あそこ di sana; どこ di mana. Tempat langsung diikuti です: トイレ は あそこ です."
  en: "ここ here, そこ there, あそこ over there; どこ where. A place goes straight before です: トイレ は あそこ です."
introduces: [n5-kosoado-koko]
spiral: pointing
kanji: [入, 出, 男, 女]
worked:
  - { ja: "[[ここ]] は {入口|いり|ぐち} です 。", kana: "ここ は いりぐち です 。", id: "Di sini pintu masuk.", note: { id: "Dekat saya.", en: "Near me." } }
  - { ja: "[[そこ]] は {出口|で|ぐち} です 。", kana: "そこ は でぐち です 。", id: "Di situ pintu keluar.", note: { id: "Dekat kamu.", en: "Near you." } }
  - { ja: "トイレ は [[あそこ]] です 。", kana: "トイレ は あそこ です 。", id: "Toiletnya di sana.", note: { id: "Jauh dari kita berdua.", en: "Far from both of us." } }
  - { ja: "トイレ は [[どこ]] です か 。", kana: "トイレ は どこ です か 。", id: "Toiletnya di mana?" }
examples:
  - { ja: "すみません 、 トイレ は [[どこ]] です か 。", kana: "すみません 、 トイレ は どこ です か 。", id: "Permisi, toiletnya di mana?" }
  - { ja: "トイレ は [[あそこ]] です 。", kana: "トイレ は あそこ です 。", id: "Toiletnya di sana." }
  - { ja: "[[ここ]] は {入口|いり|ぐち} です 。", kana: "ここ は いりぐち です 。", id: "Ini pintu masuk." }
  - { ja: "{出口|で|ぐち} は [[そこ]] です 。", kana: "でぐち は そこ です 。", id: "Pintu keluarnya di situ." }
  - { ja: "[[あそこ]] の {女|おんな} の {人|ひと} は {佐藤|さ|とう} さん です 。", kana: "あそこ の おんな の ひと は さとう さん です 。", id: "Perempuan yang di sana itu Bu Sato." }
  - { ja: "{山田|やま|だ} さん は [[どこ]] です か 。", kana: "やまだ さん は どこ です か 。", id: "Pak Yamada di mana?" }
pair:
  off: { ja: "トイレ は あそこ に です 。", kana: "トイレ は あそこ に です 。" }
  natural: { ja: "トイレ は [[あそこ]] です 。", kana: "トイレ は あそこ です 。" }
words:
  id: "Di pintu toilet sering tertulis **男** (laki-laki) dan **女** (perempuan); di stasiun ada **入口** (masuk) dan **出口** (keluar). Empat kanji ini sudah cukup untuk banyak papan petunjuk."
  en: "Toilet doors often show **男** (men) and **女** (women); stations show **入口** (entrance) and **出口** (exit). These four kanji already get you through a lot of signs."
work:
  situation: { id: "Hari pertama di pabrik. Andi bertanya di mana kantinnya.", en: "First day at the factory. Andi asks where the canteen is." }
  lines:
    - { who: Andi, ja: "すみません 、 {食堂|しょく|どう} は どこ です か 。", kana: "すみません 、 しょくどう は どこ です か 。", id: "Permisi, kantinnya di mana?" }
    - { who: "Suzuki", ja: "{食堂|しょく|どう} です か 。 あそこ です 。", kana: "しょくどう です か 。 あそこ です 。", id: "Kantin? Di sana." }
    - { who: Andi, ja: "ありがとう ございます 。", kana: "ありがとう ございます 。", id: "Terima kasih." }
tirukan: { ja: "すみません 、 トイレ は どこ です か 。", kana: "すみません 、 トイレ は どこ です か 。", id: "Permisi, toiletnya di mana?" }
check:
  - id: e1-04-c1
    type: gap
    cue: "Toiletnya di mana?"
    prompt: "トイレ は ___ です か 。"
    options: [どこ, ここ, なん]
    answer: どこ
    why: { id: "どこ: di mana. なん berarti apa, untuk benda, bukan tempat.", en: "どこ: where. なん means what, for things, not places." }
  - id: e1-04-c2
    type: choice
    prompt: "Pintu keluar jauh dari kamu dan temanmu. Kalimat mana yang benar?"
    options: ["{出口|で|ぐち} は あそこ です 。", "{出口|で|ぐち} は ここ です 。", "{出口|で|ぐち} は そこ です 。"]
    answer: "{出口|で|ぐち} は あそこ です 。"
    why: { id: "Jauh dari kalian berdua: あそこ. ここ dekat kamu, そこ dekat temanmu.", en: "Far from you both: あそこ. ここ is near you, そこ near your friend." }
  - id: e1-04-c3
    type: fix
    wrong: "トイレ は あそこ に です 。"
    options: ["トイレ は あそこ です 。", "あそこ は トイレ に です 。"]
    answer: "トイレ は あそこ です 。"
    why: { id: "あそこ sudah berarti *di sana*: langsung diikuti です, tanpa partikel.", en: "あそこ already means *over there*: です follows directly, with no particle." }
  - id: e1-04-c4
    type: choice
    prompt: "女"
    furigana: false
    options: [perempuan, laki-laki, pintu masuk]
    answer: perempuan
    why: { id: "女 (おんな): perempuan. 男 (おとこ): laki-laki.", en: "女 (おんな): woman. 男 (おとこ): man." }
  - id: e1-04-c5
    type: kana
    ja: "{出口|で|ぐち}"
    furigana: false
    answer: でぐち
    why: { id: "出口 dibaca でぐち: pintu keluar. くち menjadi ぐち di dalam kata ini.", en: "出口 is read でぐち: exit. くち becomes ぐち inside this word." }
  - id: e1-04-c6
    type: trace
    char: 入
    guide: on
    why: { id: "入: dua goresan, kiri dulu lalu kanan. Jangan tertukar dengan 人 (orang).", en: "入: two strokes, left first, then right. Don't mix it up with 人 (person)." }
glossary:
  - { ja: "ここ", kana: "ここ", id: "di sini", en: "here", type: pronoun, jlpt: N5 }
  - { ja: "そこ", kana: "そこ", id: "di situ (dekat kamu)", en: "there (near you)", type: pronoun, jlpt: N5 }
  - { ja: "あそこ", kana: "あそこ", id: "di sana", en: "over there", type: pronoun, jlpt: N5 }
  - { ja: "どこ", kana: "どこ", id: "di mana", en: "where", type: pronoun, jlpt: N5 }
  - { ja: "{入口|いり|ぐち}", kana: "いりぐち", id: "pintu masuk", en: "entrance", type: noun, jlpt: N5 }
  - { ja: "{出口|で|ぐち}", kana: "でぐち", id: "pintu keluar", en: "exit", type: noun, jlpt: N5 }
  - { ja: "{男|おとこ}", kana: "おとこ", id: "laki-laki", en: "man, male", type: noun, jlpt: N5 }
  - { ja: "{女|おんな}", kana: "おんな", id: "perempuan", en: "woman, female", type: noun, jlpt: N5 }
  - { ja: "トイレ", kana: "トイレ", id: "toilet", en: "toilet", type: noun, jlpt: N5 }
  - { ja: "{食堂|しょく|どう}", kana: "しょくどう", id: "kantin, ruang makan", en: "canteen", type: noun, jlpt: N5 }
  - { ja: "すみません", kana: "すみません", id: "permisi, maaf", en: "excuse me", type: expression }
  - { ja: "ありがとう ございます", kana: "ありがとう ございます", id: "terima kasih", en: "thank you", type: expression }
extra:
  - { ja: "すみません", reason: "Ungkapan wajib untuk bertanya arah; daftar komunitas menaruhnya di N3." }
  - { ja: "ありがとう ございます", reason: "Ucapan terima kasih sopan, dipakai sejak hari pertama; daftar komunitas menaruh bagiannya di N3/N4." }
next: easy1-05-ikura
---

## concept.id
Untuk tempat, bahasa Jepang memakai tiga jarak yang sama seperti これ/それ/あれ: **ここ** di sini, **そこ** di situ (dekat kamu), **あそこ** di sana. Untuk bertanya pakai **どこ**: トイレ は どこ です か. Jawabannya masuk ke tempat どこ: トイレ は あそこ です.

## concept.en
For places, Japanese uses the same three distances as これ/それ/あれ: **ここ** here, **そこ** there (near you), **あそこ** over there. To ask, use **どこ**: トイレ は どこ です か. The answer takes the place of どこ: トイレ は あそこ です.

## contrast.id
Bahasa Indonesia butuh *di*: *Toiletnya **di** sana*. Di bahasa Jepang, あそこ sudah berarti *di sana*, jadi langsung diikuti です tanpa partikel apa pun: トイレ は あそこ です.

## contrast.en
Indonesian needs *di*: *Toiletnya **di** sana*. In Japanese, あそこ already means *over there*, so です follows directly with no particle at all: トイレ は あそこ です.
