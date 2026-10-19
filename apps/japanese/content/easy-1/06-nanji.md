---
id: easy1-06-nanji
rung: easy-1
order: 6
status: draft
minutes: 10
title: { id: "Jam berapa?", en: "What time is it?", ja: "{何時|なん|じ} です か", kana: "なんじ です か" }
summary:
  id: "Jam dengan ～時, menit dengan ～分, setengah dengan 半; hari ini 今日 dan besok 明日."
  en: "Hours with ～時, minutes with ～分, half past with 半; today 今日 and tomorrow 明日."
introduces: [n5-time]
spiral: numbers
kanji: [時, 分, 今, 半, 午, 後]
worked:
  - { ja: "{今|いま} [[{何時|なん|じ}]] です か 。", kana: "いま なんじ です か 。", id: "Sekarang jam berapa?" }
  - { ja: "[[{四時|よ|じ}]] です 。", kana: "よじ です 。", id: "Jam empat.", note: { id: "よじ, bukan よんじ.", en: "よじ, not よんじ." } }
  - { ja: "[[{七時|しち|じ}]] です 。", kana: "しちじ です 。", id: "Jam tujuh.", note: { id: "Bentuk bakunya しちじ; ななじ juga terdengar sehari-hari.", en: "The standard form is しちじ; ななじ is also heard in everyday talk." } }
  - { ja: "[[{九時|く|じ}]] です 。", kana: "くじ です 。", id: "Jam sembilan.", note: { id: "くじ, bukan きゅうじ.", en: "くじ, not きゅうじ." } }
  - { ja: "{三時|さん|じ} [[{十分|じゅっ|ぷん}]] です 。", kana: "さんじ じゅっぷん です 。", id: "Jam tiga lewat sepuluh.", note: { id: "じっぷん juga benar.", en: "じっぷん is also correct." } }
  - { ja: "{四時|よ|じ} [[{半|はん}]] です 。", kana: "よじ はん です 。", id: "Jam setengah lima (4.30).", note: { id: "半 = setengah jam setelah jam empat.", en: "半 = half an hour after four." } }
examples:
  - { ja: "すみません 、 {今|いま} [[{何時|なん|じ}]] です か 。", kana: "すみません 、 いま なんじ です か 。", id: "Permisi, sekarang jam berapa?" }
  - { ja: "{今|いま} {午後|ご|ご} [[{二時|に|じ}]] です 。", kana: "いま ごご にじ です 。", id: "Sekarang jam dua siang." }
  - { ja: "バス は {八時|はち|じ} [[{十五分|じゅう|ご|ふん}]] です 。", kana: "バス は はちじ じゅうごふん です 。", id: "Busnya jam delapan lewat lima belas." }
  - { ja: "テスト は {明日|=あした} の {午前|ご|ぜん} [[{九時|く|じ}]] です 。", kana: "テスト は あした の ごぜん くじ です 。", id: "Ujiannya besok jam sembilan pagi." }
  - { ja: "{休|やす}み は {十二時|じゅう|に|じ} [[{半|はん}]] です 。", kana: "やすみ は じゅうにじ はん です 。", id: "Istirahatnya jam setengah satu." }
  - { ja: "[[{今日|=きょう}]] は {休|やす}み です 。", kana: "きょう は やすみ です 。", id: "Hari ini libur." }
pair:
  off: { ja: "{五時|ご|じ} {半|はん} です 。", kana: "ごじ はん です 。" }
  natural: { ja: "[[{四時|よ|じ}]] {半|はん} です 。", kana: "よじ はん です 。" }
sound:
  words:
    - { ja: "いっぷん", kana: "いっぷん" }
    - { ja: "にふん", kana: "にふん" }
    - { ja: "さんぷん", kana: "さんぷん" }
    - { ja: "ろっぷん", kana: "ろっぷん" }
    - { ja: "じゅっぷん", kana: "じゅっぷん" }
  kind: small-tsu
  tip:
    id: "分 punya tiga bunyi: ふん (2, 5, 7, 9), ぷん (3, 4), dan っぷん dengan jeda kecil (1, 6, 8, 10): いっぷん, ろっぷん, はっぷん, じゅっぷん."
    en: "分 has three sounds: ふん (2, 5, 7, 9), ぷん (3, 4), and っぷん with a small pause (1, 6, 8, 10): いっぷん, ろっぷん, はっぷん, じゅっぷん."
work:
  situation: { id: "Andi bertanya jadwal kerja besok kepada Pak Suzuki.", en: "Andi asks Mr Suzuki about tomorrow's work schedule." }
  lines:
    - { who: Andi, ja: "すみません 、 {明日|=あした} は {何時|なん|じ} です か 。", kana: "すみません 、 あした は なんじ です か 。", id: "Permisi, besok mulai jam berapa?" }
    - { who: "Suzuki", ja: "{午前|ご|ぜん} {八時|はち|じ} です 。", kana: "ごぜん はちじ です 。", id: "Jam delapan pagi." }
    - { who: Andi, ja: "{休|やす}み は {何時|なん|じ} です か 。", kana: "やすみ は なんじ です か 。", id: "Istirahatnya jam berapa?" }
    - { who: "Suzuki", ja: "{十二時|じゅう|に|じ} です 。", kana: "じゅうにじ です 。", id: "Jam dua belas." }
tirukan: { ja: "{今|いま} {何時|なん|じ} です か 。", kana: "いま なんじ です か 。", id: "Sekarang jam berapa?" }
check:
  - id: e1-06-c1
    type: gap
    cue: "Sekarang jam berapa?"
    prompt: "{今|いま} ___ です か 。"
    options: ["{何時|なん|じ}", いくら, どこ]
    answer: "{何時|なん|じ}"
    why: { id: "何時 (なんじ): jam berapa. いくら untuk harga, どこ untuk tempat.", en: "何時 (なんじ): what time. いくら is for prices, どこ for places." }
  - id: e1-06-c2
    type: choice
    prompt: "{四時|よ|じ} {半|はん}"
    options: [jam setengah lima (4.30), jam setengah empat (3.30), jam empat lewat lima (4.05)]
    answer: jam setengah lima (4.30)
    why: { id: "四時半 = jam empat lewat setengah, yaitu *setengah lima* dalam bahasa Indonesia.", en: "四時半 = half past four, which Indonesian calls *setengah lima*." }
  - id: e1-06-c3
    type: kana
    ja: "{九時|く|じ}"
    furigana: false
    answer: くじ
    why: { id: "Jam sembilan dibaca くじ, bukan きゅうじ.", en: "Nine o'clock is read くじ, not きゅうじ." }
  - id: e1-06-c4
    type: listen
    audio: "{七時|しち|じ} です 。"
    options: ["{七時|しち|じ} です 。", "{一時|いち|じ} です 。", "{八時|はち|じ} です 。"]
    answer: "{七時|しち|じ} です 。"
    why: { id: "しちじ (7) dan いちじ (1) mirip: dengarkan bunyi し di depan.", en: "しちじ (7) and いちじ (1) sound alike: listen for the し at the start." }
  - id: e1-06-c5
    type: gap
    cue: "Hari ini libur."
    prompt: "___ は {休|やす}み です 。"
    options: ["{今日|=きょう}", "{明日|=あした}", "{今|いま}"]
    answer: "{今日|=きょう}"
    why: { id: "今日 (きょう): hari ini. 明日 (あした): besok. 今 (いま): sekarang.", en: "今日 (きょう): today. 明日 (あした): tomorrow. 今 (いま): now." }
  - id: e1-06-c6
    type: trace
    char: 午
    guide: on
    why: { id: "午: miring pendek, dua garis datar, lalu garis tegak. Bedanya dengan 牛 (sapi): tegaknya tidak menembus ke atas.", en: "午: a short slant, two flat strokes, then the vertical. Unlike 牛 (cow), the vertical doesn't poke out the top." }
glossary:
  - { ja: "{今|いま}", kana: "いま", id: "sekarang", en: "now", type: noun, jlpt: N5 }
  - { ja: "{何時|なん|じ}", kana: "なんじ", id: "jam berapa", en: "what time", type: pronoun }
  - { ja: "{時|じ}", kana: "じ", id: "jam (pukul)", en: "o'clock", type: counter, jlpt: N5 }
  - { ja: "{分|ふん}", kana: "ふん", id: "menit", en: "minute", type: counter, jlpt: N5 }
  - { ja: "{半|はん}", kana: "はん", id: "setengah (jam)", en: "half past", type: noun, jlpt: N5 }
  - { ja: "{午前|ご|ぜん}", kana: "ごぜん", id: "pagi (sebelum jam 12)", en: "a.m.", type: noun, jlpt: N5 }
  - { ja: "{午後|ご|ご}", kana: "ごご", id: "siang, sore (setelah jam 12)", en: "p.m.", type: noun, jlpt: N5 }
  - { ja: "{今日|=きょう}", kana: "きょう", id: "hari ini", en: "today", type: noun, jlpt: N5 }
  - { ja: "{明日|=あした}", kana: "あした", id: "besok", en: "tomorrow", type: noun, jlpt: N5 }
  - { ja: "{休|やす}み", kana: "やすみ", id: "libur, istirahat", en: "day off, break", type: noun, jlpt: N5 }
  - { ja: "バス", kana: "バス", id: "bus", en: "bus", type: noun, jlpt: N5 }
  - { ja: "テスト", kana: "テスト", id: "ujian, tes", en: "test", type: noun, jlpt: N5 }
extra:
  - { ja: "{何時|なん|じ}", reason: "何 + ～時: pertanyaan jam paling dasar; daftar komunitas mencatat 何 dan ～時 terpisah." }
next: easy1-07-masu
---

## concept.id
Jam = angka + **じ** (時), menit = angka + **ふん/ぷん** (分), setengah = **はん** (半): さんじ じゅっぷん, よじ はん. Untuk bertanya: いま なんじ です か. Hafalkan tiga jam yang beda: よじ (4), しちじ (7), くじ (9). Hari ini **きょう** (今日), besok **あした** (明日).

## concept.en
Hours = number + **じ** (時), minutes = number + **ふん/ぷん** (分), half past = **はん** (半): さんじ じゅっぷん, よじ はん. To ask: いま なんじ です か. Learn the three odd hours: よじ (4), しちじ (7), くじ (9). Today is **きょう** (今日), tomorrow **あした** (明日).

## contrast.id
Awas *setengah*: *jam setengah lima* berarti 4.30, tapi bahasa Jepang menghitung dari jam yang sudah lewat, jadi 4.30 adalah よじ はん (四時半), bukan ごじ はん. ごぜん/ごご (午前/午後) juga datang **sebelum** jamnya: ごご にじ, sedangkan kita bilang *jam dua siang*.

## contrast.en
Watch out for *setengah*: Indonesian *jam setengah lima* means 4:30, but Japanese counts from the hour that has passed, so 4:30 is よじ はん (四時半), not ごじ はん. ごぜん/ごご (午前/午後) also come **before** the hour: ごご にじ, where Indonesian says *jam dua siang*.
