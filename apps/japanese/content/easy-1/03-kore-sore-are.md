---
id: easy1-03-kore-sore-are
rung: easy-1
order: 3
status: draft
minutes: 9
title: { id: "Ini, itu, yang di sana", en: "This, that, that over there", ja: "これ ・ それ ・ あれ", kana: "これ ・ それ ・ あれ" }
summary:
  id: "これ dekat saya, それ dekat kamu, あれ jauh dari kita berdua. Sebelum kata benda: この, その, あの."
  en: "これ is near me, それ near you, あれ far from us both. Before a noun: この, その, あの."
introduces: [n5-kosoado-kore]
spiral: pointing
kanji: [車, 電, 話]
worked:
  - { ja: "[[これ]] は {電話|でん|わ} です 。", kana: "これ は でんわ です 。", id: "Ini telepon.", note: { id: "Dekat saya.", en: "Near me." } }
  - { ja: "[[それ]] は {電話|でん|わ} です 。", kana: "それ は でんわ です 。", id: "Itu telepon.", note: { id: "Dekat kamu.", en: "Near you." } }
  - { ja: "[[あれ]] は {車|くるま} です 。", kana: "あれ は くるま です 。", id: "Itu mobil.", note: { id: "Jauh dari kita berdua.", en: "Far from both of us." } }
  - { ja: "[[この]] {車|くるま} は {田中|た|なか} さん の {車|くるま} です 。", kana: "この くるま は たなか さん の くるま です 。", id: "Mobil ini mobil Pak Tanaka.", note: { id: "この selalu diikuti kata benda.", en: "この is always followed by a noun." } }
examples:
  - { ja: "[[これ]] は {会社|かい|しゃ} の {電話|でん|わ} です 。", kana: "これ は かいしゃ の でんわ です 。", id: "Ini telepon kantor." }
  - { ja: "[[それ]] は {何|なん} です か 。", kana: "それ は なん です か 。", id: "Itu apa?" }
  - { ja: "[[あれ]] は {田中|た|なか} さん の {車|くるま} です 。", kana: "あれ は たなか さん の くるま です 。", id: "Yang di sana itu mobil Pak Tanaka." }
  - { ja: "[[この]] {本|ほん} は {日本語|に|ほん|ご} の {本|ほん} です 。", kana: "この ほん は にほんご の ほん です 。", id: "Buku ini buku bahasa Jepang." }
  - { ja: "[[あの]] {人|ひと} は {山田|やま|だ} さん です 。", kana: "あの ひと は やまだ さん です 。", id: "Orang itu Pak Yamada." }
  - { ja: "[[あれ]] は {電車|でん|しゃ} です か 。", kana: "あれ は でんしゃ です か 。", id: "Yang di sana itu kereta?" }
pair:
  off: { ja: "この は {田中|た|なか} さん の {車|くるま} です 。", kana: "この は たなか さん の くるま です 。" }
  natural: { ja: "[[これ]] は {田中|た|なか} さん の {車|くるま} です 。", kana: "これ は たなか さん の くるま です 。" }
talk:
  lines:
    - { who: Siti, ja: "それ は {何|なん} です か 。", kana: "それ は なん です か 。", id: "Itu apa?" }
    - { who: "Sato", ja: "これ です か 。 {日本|に|ほん} の おかし です 。", kana: "これ です か 。 にほん の おかし です 。", id: "Yang ini? Ini camilan Jepang.", note: { id: "Benda di tangan Sato: Siti bilang それ, Sato bilang これ.", en: "The thing is in Sato's hand: Siti says それ, Sato says これ." } }
    - { who: Siti, ja: "あの {人|ひと} は だれ です か 。", kana: "あの ひと は だれ です か 。", id: "Orang itu siapa?" }
    - { who: "Sato", ja: "{鈴木|すず|き} さん です 。 {大学|だい|がく} の {先生|せん|せい} です 。", kana: "すずき さん です 。 だいがく の せんせい です 。", id: "Pak Suzuki. Dosen." }
words:
  id: "**車** sendirian dibaca くるま: mobil. Di dalam **電車** dibaca しゃ: でんしゃ, kereta listrik. Banyak kanji punya dua bacaan begini: satu untuk kata sendiri, satu di dalam kata gabungan."
  en: "**車** alone is read くるま: car. Inside **電車** it's read しゃ: でんしゃ, electric train. Many kanji have two readings like this: one for the word on its own, one inside compounds."
tirukan: { ja: "それ は {何|なん} です か 。", kana: "それ は なん です か 。", id: "Itu apa?" }
check:
  - id: e1-03-c1
    type: gap
    cue: "Itu apa? (bendanya dekat lawan bicaramu)"
    prompt: "___ は {何|なん} です か 。"
    options: [これ, それ, あれ]
    answer: それ
    why: { id: "Dekat lawan bicara: それ. Dekat kamu sendiri: これ. Jauh dari kalian berdua: あれ.", en: "Near the listener: それ. Near you: これ. Far from you both: あれ." }
  - id: e1-03-c2
    type: gap
    cue: "Mobil yang di sana itu mobil Pak Tanaka."
    prompt: "___ {車|くるま} は {田中|た|なか} さん の {車|くるま} です 。"
    options: [あの, あれ, その]
    answer: あの
    why: { id: "Sebelum kata benda (車) pakai あの, bukan あれ. Jauh dari kalian berdua: あ.", en: "Before a noun (車) use あの, not あれ. Far from you both: あ." }
  - id: e1-03-c3
    type: fix
    wrong: "この は {電話|でん|わ} です 。"
    options: ["これ は {電話|でん|わ} です 。", "これ {電話|でん|わ} は です 。"]
    answer: "これ は {電話|でん|わ} です 。"
    why: { id: "この harus diikuti kata benda. Kalau berdiri sendiri, pakai これ.", en: "この needs a noun after it. On its own, use これ." }
  - id: e1-03-c4
    type: kana
    ja: "{電車|でん|しゃ}"
    furigana: false
    answer: でんしゃ
    why: { id: "電車 dibaca でんしゃ: kereta listrik. 車 di sini dibaca しゃ.", en: "電車 is read でんしゃ: electric train. Here 車 is read しゃ." }
  - id: e1-03-c5
    type: listen
    audio: "あれ は {田中|た|なか} さん の {車|くるま} です 。"
    options: ["あれ は {田中|た|なか} さん の {車|くるま} です 。", "これ は {田中|た|なか} さん の {電話|でん|わ} です 。", "それ は {田中|た|なか} さん の {本|ほん} です 。"]
    answer: "あれ は {田中|た|なか} さん の {車|くるま} です 。"
    why: { id: "あれ … くるま: yang di sana itu mobil Pak Tanaka.", en: "あれ … くるま: that over there is Mr Tanaka's car." }
  - id: e1-03-c6
    type: trace
    char: 車
    guide: on
    why: { id: "車: gambar gerobak dilihat dari atas. Garis tegak yang panjang ditulis paling akhir.", en: "車: a cart seen from above. The long vertical stroke comes last." }
glossary:
  - { ja: "これ", kana: "これ", id: "ini (dekat saya)", en: "this one (near me)", type: pronoun, jlpt: N5 }
  - { ja: "それ", kana: "それ", id: "itu (dekat kamu)", en: "that one (near you)", type: pronoun, jlpt: N5 }
  - { ja: "あれ", kana: "あれ", id: "itu (jauh dari kita)", en: "that one over there", type: pronoun, jlpt: N5 }
  - { ja: "この", kana: "この", id: "… ini", en: "this …", type: other, jlpt: N5 }
  - { ja: "その", kana: "その", id: "… itu (dekat kamu)", en: "that … (near you)", type: other, jlpt: N5 }
  - { ja: "あの", kana: "あの", id: "… itu (di sana)", en: "that … over there", type: other, jlpt: N5 }
  - { ja: "{車|くるま}", kana: "くるま", id: "mobil", en: "car", type: noun, jlpt: N5 }
  - { ja: "{電車|でん|しゃ}", kana: "でんしゃ", id: "kereta listrik", en: "train", type: noun, jlpt: N5 }
  - { ja: "{電話|でん|わ}", kana: "でんわ", id: "telepon", en: "telephone", type: noun, jlpt: N5 }
  - { ja: "{会社|かい|しゃ}", kana: "かいしゃ", id: "perusahaan, kantor", en: "company", type: noun, jlpt: N5 }
  - { ja: "{本|ほん}", kana: "ほん", id: "buku", en: "book", type: noun, jlpt: N5 }
  - { ja: "だれ", kana: "だれ", id: "siapa", en: "who", type: pronoun, jlpt: N5 }
  - { ja: "おかし", kana: "おかし", id: "camilan, kue", en: "sweets, snacks", type: noun, jlpt: N5 }
next: easy1-04-koko-soko
---

## concept.id
Bahasa Jepang menunjuk dengan tiga jarak: **これ** dekat saya, **それ** dekat kamu, **あれ** jauh dari kita berdua. Ketiganya berdiri sendiri: これ は でんわ です. Kalau langsung diikuti kata benda, pakai **この**, **その**, **あの**: この くるま, mobil ini.

## concept.en
Japanese points at three distances: **これ** near me, **それ** near you, **あれ** far from both of us. All three stand alone: これ は でんわ です. When a noun follows directly, use **この**, **その**, **あの**: この くるま, this car.

## contrast.id
Bahasa Indonesia hanya punya dua, *ini* dan *itu*; bahasa Jepang memecah *itu* menjadi それ (dekat kamu) dan あれ (jauh dari kita berdua). *Ini* juga bisa berdiri sendiri atau ikut di belakang kata benda (*mobil ini*), sedangkan bahasa Jepang memakai dua kata: これ sendiri, この di depan kata benda (この くるま).

## contrast.en
Indonesian has only two, *ini* and *itu*; Japanese splits *itu* into それ (near you) and あれ (far from both of us). Indonesian *ini* also works alone or after a noun (*mobil ini*), while Japanese uses two words: これ alone, この in front of the noun (この くるま).
