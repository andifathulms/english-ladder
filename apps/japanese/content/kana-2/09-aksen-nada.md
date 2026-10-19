---
id: kana2-09-aksen-nada
rung: kana-2
order: 9
status: draft
minutes: 8
title: { id: "Nada tinggi dan rendah", en: "High and low pitch", ja: "はし あめ", kana: "はし あめ" }
summary:
  id: "Kamu sadar bahwa nada tinggi-rendah bisa membedakan kata Jepang, seperti はし (jembatan) dan はし (sumpit)."
  en: "You're aware that high and low pitch can tell Japanese words apart, like はし (bridge) and はし (chopsticks)."
introduces: [k2-pitch]
spiral: pitch
visual:
  id: pitch-line
  props:
    pairs:
      - - { ja: "{橋|はし}", kana: "はし", accent: 2, id: "jembatan", en: "bridge", drawing: bridge }
        - { ja: "{箸|はし}", kana: "はし", accent: 1, id: "sumpit", en: "chopsticks", drawing: chopsticks }
      - - { ja: "{雨|あめ}", kana: "あめ", accent: 1, id: "hujan", en: "rain", drawing: rain }
        - { ja: "{飴|あめ}", kana: "あめ", accent: 0, id: "permen", en: "candy", drawing: candy }
examples:
  - { ja: "[[{箸|はし}]]", kana: "はし", id: "sumpit: tinggi lalu rendah", pitch: { 箸: 1 } }
  - { ja: "[[{橋|はし}]]", kana: "はし", id: "jembatan: rendah lalu tinggi, turun pada partikel", pitch: { 橋: 2 } }
  - { ja: "[[{雨|あめ}]]", kana: "あめ", id: "hujan: tinggi lalu rendah", pitch: { 雨: 1 } }
  - { ja: "[[{飴|あめ}]]", kana: "あめ", id: "permen: rendah lalu tinggi, tetap tinggi", pitch: { 飴: 0 } }
  - { ja: "{橋|はし} [[が]] あります 。", kana: "はし が あります 。", id: "Ada jembatan.", note: { id: "Pada 橋, nada turun tepat di が. Pada 端 (ujung) tidak turun.", en: "With 橋, the pitch drops right on が. With 端 (edge) it doesn't." } }
pair:
  off: { ja: "{箸|はし} を わたります 。", kana: "はし を わたります 。" }
  natural: { ja: "[[{橋|はし}]] を わたります 。", kana: "はし を わたります 。" }
sound:
  words: [{ ja: "{箸|はし}", kana: "はし" }, { ja: "{橋|はし}", kana: "はし" }]
  kind: pitch
  tip: { id: "Dengarkan beberapa kali. Kamu tidak perlu menghafal nada setiap kata sekarang; cukup sadar bahwa nada itu ada.", en: "Listen a few times. You don't need to memorise every word's pitch now; just know that pitch is there." }
tirukan: { ja: "{雨|あめ} が ふります 。", kana: "あめ が ふります 。", id: "Hujan turun." }
check:
  - id: k2-09-c1
    type: pitch
    audio: "{箸|はし}"
    pair:
      - { ja: "{橋|はし}", kana: "はし", pitch: 2, id: "jembatan", en: "bridge" }
      - { ja: "{箸|はし}", kana: "はし", pitch: 1, id: "sumpit", en: "chopsticks" }
    answer: sumpit
    why: { id: "Tinggi lalu rendah: はし sumpit.", en: "High then low: はし, chopsticks." }
  - id: k2-09-c2
    type: pitch
    audio: "{飴|あめ}"
    pair:
      - { ja: "{雨|あめ}", kana: "あめ", pitch: 1, id: "hujan", en: "rain" }
      - { ja: "{飴|あめ}", kana: "あめ", pitch: 0, id: "permen", en: "candy" }
    answer: permen
    why: { id: "Rendah lalu tinggi: あめ permen.", en: "Low then high: あめ, candy." }
  - id: k2-09-c3
    type: choice
    cue: "Dalam bahasa Indonesia, naik-turun suara biasanya menunjukkan..."
    prompt: "Bahasa Indonesia"
    options: [kalimat tanya atau penekanan, arti kata yang berbeda]
    answer: kalimat tanya atau penekanan
    why: { id: "Di bahasa Indonesia, nada menandai kalimat (bertanya, menekankan), bukan arti kata. Di bahasa Jepang, nada bisa membedakan kata.", en: "In Indonesian, pitch marks the sentence (a question, emphasis), not a word's meaning. In Japanese, pitch can tell words apart." }
  - id: k2-09-c4
    type: listen
    audio: "{雨|あめ} が ふります 。"
    options: ["{雨|あめ} が ふります 。", "{飴|あめ} を ください 。", "{橋|はし} が あります 。"]
    answer: "{雨|あめ} が ふります 。"
    why: { id: "あめ が ふります: hujan turun. Konteks juga membantu: permen tidak turun dari langit.", en: "あめ が ふります: it's raining. Context helps too: candy doesn't fall from the sky." }
glossary:
  - { ja: "{橋|はし}", kana: "はし", id: "jembatan", en: "bridge", type: noun, pitch: 2, jlpt: N5 }
  - { ja: "{箸|はし}", kana: "はし", id: "sumpit", en: "chopsticks", type: noun, pitch: 1, jlpt: N5 }
  - { ja: "{雨|あめ}", kana: "あめ", id: "hujan", en: "rain", type: noun, pitch: 1, jlpt: N5 }
  - { ja: "{飴|あめ}", kana: "あめ", id: "permen", en: "candy", type: noun, pitch: 0, jlpt: N5 }
  - { ja: "わたる", kana: "わたる", id: "menyeberang", en: "to cross", type: verb-1, jlpt: N5 }
  - { ja: "ふる", kana: "ふる", id: "turun (hujan, salju)", en: "to fall (rain, snow)", type: verb-1, jlpt: N5 }
  - { ja: "ある", kana: "ある", id: "ada (benda)", en: "to be, to exist (things)", type: verb-1, jlpt: N5 }
  - { ja: "ください", kana: "ください", id: "tolong berikan, minta", en: "please give", type: expression, jlpt: N5 }
next: kana2-10-kanji-pertama
---

## concept.id
Bahasa Jepang Tokyo memakai nada: setiap ketukan diucapkan tinggi atau rendah. Dua kata yang ditulis sama bisa berbeda nadanya: はし (sumpit) tinggi-rendah, はし (jembatan) rendah-tinggi. Di sini kamu cukup mendengar perbedaannya; garis nada di Kata-kataku akan membantu nanti.

## concept.en
Tokyo Japanese uses pitch: each beat is said high or low. Two words spelled the same can differ in pitch: はし (chopsticks) high-low, はし (bridge) low-high. Here you only need to hear the difference; the pitch lines in My words will help later.

## contrast.id
Bahasa Indonesia tidak punya nada kata: suara naik-turun untuk kalimat, misalnya saat bertanya. Kalau nadamu datar, orang Jepang biasanya tetap paham dari konteks, jadi jangan takut bicara. Tapi menyeberangi はし sumpit tetap terdengar lucu.

## contrast.en
Indonesian has no word pitch: the voice rises and falls over a sentence, for example in a question. If your pitch is flat, Japanese listeners usually still understand from context, so don't be afraid to speak. But crossing a はし of chopsticks still sounds funny.
