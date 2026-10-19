---
id: kana2-08-ketukan
rung: kana-2
order: 8
status: draft
minutes: 8
title: { id: "Setiap kana satu ketukan", en: "Every kana is one beat", ja: "しんぶん エレベーター", kana: "しんぶん エレベーター" }
summary:
  id: "Kamu bisa menghitung ketukan kata Jepang: ん, っ dan vokal panjang masing-masing satu ketukan."
  en: "You can count the beats of a Japanese word: ん, っ and long vowels each count as one."
introduces: [k2-mora]
spiral: mora
visual:
  id: mora-beats
  props:
    words:
      - { ja: "しんぶん", kana: "しんぶん", id: "koran" }
      - { ja: "きって", kana: "きって", id: "perangko" }
      - { ja: "コーヒー", kana: "コーヒー", id: "kopi" }
      - { ja: "エレベーター", kana: "エレベーター", id: "lift" }
      - { ja: "せんせい", kana: "せんせい", id: "guru" }
examples:
  - { ja: "ほ[[ん]]", kana: "ほん", id: "buku: ho-n, dua ketukan" }
  - { ja: "し[[ん]]ぶん", kana: "しんぶん", id: "koran: shi-n-bu-n, empat ketukan" }
  - { ja: "き[[っ]]て", kana: "きって", id: "perangko: ki-(diam)-te, tiga ketukan" }
  - { ja: "エレベ[[ー]]ター", kana: "エレベーター", id: "lift: e-re-be-e-ta-a, enam ketukan" }
  - { ja: "ス[[プ]]ーン", kana: "スプーン", id: "sendok: su-pu-u-n, empat ketukan" }
pair:
  off: { ja: "しぶん", kana: "しぶん" }
  natural: { ja: "し[[ん]]ぶん", kana: "しんぶん" }
sound:
  words: [{ ja: "ほん", kana: "ほん" }, { ja: "ほ", kana: "ほ" }]
  kind: n
  tip: { id: "Tepuk tangan sekali untuk setiap ketukan: ほん dua tepukan, しんぶん empat. ん jangan ditelan.", en: "Clap once for every beat: ほん is two claps, しんぶん four. Don't swallow the ん." }
tirukan: { ja: "エレベーター", kana: "エレベーター", id: "lift" }
check:
  - id: k2-08-c1
    type: mora
    audio: "しんぶん"
    ask: count
    options: ["3", "4", "5"]
    answer: "4"
    why: { id: "し-ん-ぶ-ん: empat ketukan.", en: "し-ん-ぶ-ん: four beats." }
  - id: k2-08-c2
    type: mora
    audio: "エレベーター"
    ask: count
    options: ["4", "5", "6"]
    answer: "6"
    why: { id: "エ-レ-ベ-ー-タ-ー: enam ketukan. Kedua ー dihitung.", en: "エ-レ-ベ-ー-タ-ー: six beats. Both ー count." }
  - id: k2-08-c3
    type: mora
    audio: "コーヒー"
    ask: spelling
    options: [コヒー, コーヒ, コーヒー]
    answer: コーヒー
    why: { id: "Kedua vokal panjang: コーヒー, empat ketukan.", en: "Both vowels are long: コーヒー, four beats." }
  - id: k2-08-c4
    type: listen
    audio: "スプーン"
    options: [スプーン, スプン, スーパー]
    answer: スプーン
    why: { id: "スプーン: su-pu-u-n, sendok.", en: "スプーン: su-pu-u-n, spoon." }
  - id: k2-08-c5
    type: kana
    audio: "しんぶん"
    answer: しんぶん
    why: { id: "しんぶん: ketik *shinbun*. ん sebelum b tetap ditulis ん.", en: "しんぶん: type *shinbun*. The ん before b is still written ん." }
glossary:
  - { ja: "しんぶん", kana: "しんぶん", id: "koran", en: "newspaper", type: noun, jlpt: N5 }
  - { ja: "エレベーター", kana: "エレベーター", id: "lift", en: "elevator", type: noun, jlpt: N5 }
  - { ja: "スプーン", kana: "スプーン", id: "sendok", en: "spoon", type: noun, jlpt: N5 }
  - { ja: "プール", kana: "プール", id: "kolam renang", en: "swimming pool", type: noun, jlpt: N5 }
  - { ja: "ページ", kana: "ページ", id: "halaman", en: "page", type: noun, jlpt: N5 }
  - { ja: "メートル", kana: "メートル", id: "meter", en: "metre", type: noun, jlpt: N5 }
  - { ja: "セーター", kana: "セーター", id: "sweter", en: "sweater", type: noun, jlpt: N5 }
  - { ja: "テーブル", kana: "テーブル", id: "meja", en: "table", type: noun, jlpt: N5 }
  - { ja: "カレンダー", kana: "カレンダー", id: "kalender", en: "calendar", type: noun, jlpt: N5 }
next: kana2-09-aksen-nada
---

## concept.id
Bahasa Jepang diucapkan dengan ketukan yang rata, disebut *mora*. Setiap kana satu ketukan, dan tiga hal yang mudah terlewat juga satu ketukan: ん, っ kecil, dan vokal panjang (ー). ゃ ゅ ょ kecil tidak dihitung sendiri.

## concept.en
Japanese is spoken in even beats called *mora*. Every kana is one beat, and three easy-to-miss things are a beat each too: ん, the small っ, and a long vowel (ー). A small ゃ ゅ ょ doesn't count on its own.

## contrast.id
Bahasa Indonesia dihitung per suku kata: *ko-ran* dua suku kata. Bahasa Jepang dihitung per ketukan: しんぶん empat ketukan, karena ん adalah ketukannya sendiri. Kalau ん dipendekkan, しんぶん terdengar seperti しぶん.

## contrast.en
Indonesian counts syllables: *ko-ran* is two. Japanese counts beats: しんぶん is four, because ん is a beat of its own. Shorten the ん and しんぶん sounds like しぶん.
