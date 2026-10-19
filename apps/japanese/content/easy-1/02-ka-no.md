---
id: easy1-02-ka-no
rung: easy-1
order: 2
status: draft
minutes: 9
title: { id: "Bertanya dan milik siapa", en: "Questions and whose", ja: "{何|なん} です か", kana: "なん です か" }
summary:
  id: "Tambah か di akhir kalimat, jadilah pertanyaan. の menyambung dua kata benda: わたし の なまえ, nama saya."
  en: "Add か at the end and a sentence becomes a question. の joins two nouns: わたし の なまえ, my name."
introduces: [n5-ka, n5-no]
spiral: word-order
kanji: [何, 名, 前, 大]
worked:
  - { ja: "リナ さん は {学生|がく|せい} です 。", kana: "リナ さん は がくせい です 。", id: "Rina pelajar." }
  - { ja: "リナ さん は {学生|がく|せい} です [[か]] 。", kana: "リナ さん は がくせい です か 。", id: "Apakah Rina pelajar?" }
  - { ja: "はい 、 そう です 。", kana: "はい 、 そう です 。", id: "Ya, betul." }
  - { ja: "わたし [[の]] {名前|な|まえ} は アンディ です 。", kana: "わたし の なまえ は アンディ です 。", id: "Nama saya Andi." }
examples:
  - { ja: "リナ さん は {学生|がく|せい} です [[か]] 。", kana: "リナ さん は がくせい です か 。", id: "Rina pelajar?" }
  - { ja: "お{名前|な|まえ} は [[{何|なん}]] です か 。", kana: "おなまえ は なん です か 。", id: "Namanya siapa?" }
  - { ja: "わたし [[の]] {名前|な|まえ} は デウィ です 。", kana: "わたし の なまえ は デウィ です 。", id: "Nama saya Dewi." }
  - { ja: "{田中|た|なか} さん は {大学|だい|がく} [[の]] {先生|せん|せい} です 。", kana: "たなか さん は だいがく の せんせい です 。", id: "Pak Tanaka dosen." }
  - { ja: "ブディ さん は {日本語|に|ほん|ご} [[の]] {学生|がく|せい} です 。", kana: "ブディ さん は にほんご の がくせい です 。", id: "Budi belajar bahasa Jepang." }
  - { ja: "{山田|やま|だ} さん は {先生|せん|せい} です か 。 [[いいえ]] 、 {学生|がく|せい} です 。", kana: "やまだ さん は せんせい です か 。 いいえ 、 がくせい です 。", id: "Yamada guru? Bukan, dia mahasiswa." }
pair:
  off: { ja: "{名前|な|まえ} の わたし は アンディ です 。", kana: "なまえ の わたし は アンディ です 。" }
  natural: { ja: "わたし [[の]] {名前|な|まえ} は アンディ です 。", kana: "わたし の なまえ は アンディ です 。" }
talk:
  lines:
    - { who: "Tanaka", ja: "お{名前|な|まえ} は {何|なん} です か 。", kana: "おなまえ は なん です か 。", id: "Namanya siapa?" }
    - { who: Budi, ja: "ブディ です 。", kana: "ブディ です 。", id: "Budi." }
    - { who: "Tanaka", ja: "ブディ さん は {学生|がく|せい} です か 。", kana: "ブディ さん は がくせい です か 。", id: "Budi pelajar?" }
    - { who: Budi, ja: "はい 、 {日本語|に|ほん|ご} の {学生|がく|せい} です 。", kana: "はい 、 にほんご の がくせい です 。", id: "Ya, saya belajar bahasa Jepang." }
words:
  id: "**お名前** (おなまえ) dipakai untuk nama orang lain: お menambah sopan. Untuk namamu sendiri cukup **名前**: わたし の 名前 は …"
  en: "**お名前** (おなまえ) is for someone else's name: お adds politeness. For your own name, just **名前**: わたし の 名前 は …"
tirukan: { ja: "お{名前|な|まえ} は {何|なん} です か 。", kana: "おなまえ は なん です か 。", id: "Namanya siapa?" }
check:
  - id: e1-02-c1
    type: gap
    cue: "Apakah Rina pelajar?"
    prompt: "リナ さん は {学生|がく|せい} です ___ 。"
    options: [か, の, は]
    answer: か
    why: { id: "か di akhir kalimat menjadikannya pertanyaan.", en: "か at the end of a sentence makes it a question." }
  - id: e1-02-c2
    type: order
    cue: "Nama saya Andi."
    tiles: [アンディ, の, "{名前|な|まえ}", わたし, は, です]
    answer: [わたし, の, "{名前|な|まえ}", は, アンディ, です]
    why: { id: "Pemilik dulu, lalu の, lalu bendanya: わたし の 名前.", en: "Owner first, then の, then the thing: わたし の 名前." }
  - id: e1-02-c3
    type: fix
    wrong: "{名前|な|まえ} の わたし は ブディ です 。"
    options: ["わたし の {名前|な|まえ} は ブディ です 。", "わたし は {名前|な|まえ} の ブディ です 。"]
    answer: "わたし の {名前|な|まえ} は ブディ です 。"
    why: { id: "*Nama saya* dibalik: わたし の 名前 (saya の nama).", en: "*Nama saya* flips: わたし の 名前 (I の name)." }
  - id: e1-02-c4
    type: choice
    prompt: "{田中|た|なか} さん は {大学|だい|がく} の {先生|せん|せい} です 。"
    options: [Pak Tanaka dosen., Pak Tanaka mahasiswa., Pak Tanaka orang Jepang.]
    answer: Pak Tanaka dosen.
    why: { id: "大学 の 先生: guru di universitas, yaitu dosen.", en: "大学 の 先生: a teacher at a university, a lecturer." }
  - id: e1-02-c5
    type: kana
    ja: "{名前|な|まえ}"
    furigana: false
    answer: なまえ
    why: { id: "名前 dibaca なまえ: nama.", en: "名前 is read なまえ: name." }
  - id: e1-02-c6
    type: trace
    char: 大
    guide: on
    why: { id: "大: garis datar dulu, lalu kiri ke bawah, lalu kanan ke bawah. Seperti orang merentangkan tangan.", en: "大: the flat stroke first, then down to the left, then down to the right. A person with arms spread wide." }
glossary:
  - { ja: "か", kana: "か", id: "(penanda pertanyaan)", en: "(question marker)", type: particle }
  - { ja: "の", kana: "の", id: "(penyambung kata benda: milik, dari)", en: "(links nouns: 's, of)", type: particle }
  - { ja: "{何|なん}", kana: "なん", id: "apa", en: "what", type: pronoun, jlpt: N5 }
  - { ja: "{名前|な|まえ}", kana: "なまえ", id: "nama", en: "name", type: noun, jlpt: N5 }
  - { ja: "{大学|だい|がく}", kana: "だいがく", id: "universitas", en: "university", type: noun, jlpt: N5 }
  - { ja: "{日本語|に|ほん|ご}", kana: "にほんご", id: "bahasa Jepang", en: "Japanese (language)", type: noun }
  - { ja: "はい", kana: "はい", id: "ya", en: "yes", type: other, jlpt: N5 }
  - { ja: "いいえ", kana: "いいえ", id: "bukan, tidak", en: "no", type: other, jlpt: N5 }
  - { ja: "そう", kana: "そう", id: "begitu (そう です: betul)", en: "so (そう です: that's right)", type: adverb, jlpt: N5 }
  - { ja: "{先生|せん|せい}", kana: "せんせい", id: "guru", en: "teacher", type: noun, jlpt: N5 }
extra:
  - { ja: "か", reason: "Partikel tanya: tata bahasa n5-ka, bukan kata dari daftar." }
  - { ja: "の", reason: "Partikel の: tata bahasa n5-no, bukan kata dari daftar." }
  - { ja: "そう", reason: "Dipakai dalam そう です (betul), yang tercatat N5; entri そう sendiri tercatat N4." }
  - { ja: "{日本語|に|ほん|ご}", reason: "日本 + 語: kata dasar untuk pelajar bahasa Jepang; daftar komunitas mencatat 日本 dan ～語 terpisah." }
next: easy1-03-kore-sore-are
---

## concept.id
Untuk bertanya, tambahkan **か** di akhir kalimat: リナ さん は がくせい です **か**. Urutannya tidak berubah. **の** menyambung dua kata benda, pemiliknya di depan: わたし **の** なまえ, nama saya. Untuk *apa*, pakai なん, di tempat jawabannya nanti.

## concept.en
To ask, add **か** at the end: リナ さん は がくせい です **か**. The word order doesn't change. **の** joins two nouns, with the owner first: わたし **の** なまえ, my name. For *what*, use なん, in the place where the answer will go.

## contrast.id
Bahasa Indonesia menaruh pemilik di belakang: *nama saya*. Bahasa Jepang membaliknya: わたし の なまえ, pemilik dulu, lalu の, lalu bendanya. Pertanyaan pun cukup dengan か di akhir, tanpa *apakah* di depan.

## contrast.en
Indonesian puts the owner last: *nama saya*. Japanese flips it: わたし の なまえ, owner first, then の, then the thing. And a question just takes か at the end, with no *apakah* in front.
