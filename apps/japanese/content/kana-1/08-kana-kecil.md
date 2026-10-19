---
id: kana1-08-kana-kecil
rung: kana-1
order: 8
status: draft
minutes: 8
title: { id: "ゃ ゅ ょ kecil", en: "Small ゃ ゅ ょ", ja: "きゃ しゅ ちょ", kana: "きゃ しゅ ちょ" }
summary:
  id: "Kamu bisa membaca kana gabungan seperti きゃ しゅ ちょ: dua huruf, satu ketukan."
  en: "You can read combined kana like きゃ しゅ ちょ: two letters, one beat."
introduces: [k1-yoon]
spiral: mora
kana_new: [きゃ, きゅ, きょ, しゃ, しゅ, しょ, ちゃ, ちゅ, ちょ, にゃ, にゅ, にょ, ひゃ, ひゅ, ひょ, みゃ, みゅ, みょ, りゃ, りゅ, りょ, ぎゃ, ぎゅ, ぎょ, じゃ, じゅ, じょ, びゃ, びゅ, びょ]
visual: { id: kana-chart, props: { initial: { combos: true } } }
examples:
  - { ja: "[[しゃ]]しん", kana: "しゃしん", id: "foto" }
  - { ja: "お[[ちゃ]]", kana: "おちゃ", id: "teh" }
  - { ja: "でん[[しゃ]]", kana: "でんしゃ", id: "kereta (listrik)" }
  - { ja: "い[[しゃ]]", kana: "いしゃ", id: "dokter", note: { id: "いしゃ: dua ketukan, i-sha. ゃ kecil tidak dihitung sendiri.", en: "いしゃ: two beats, i-sha. The small ゃ isn't a beat of its own." } }
  - { ja: "[[ひゃ]]く", kana: "ひゃく", id: "seratus" }
  - { ja: "じ[[しょ]]", kana: "じしょ", id: "kamus" }
pair:
  off: { ja: "いしや", kana: "いしや" }
  natural: { ja: "い[[しゃ]]", kana: "いしゃ" }
sound:
  words: [{ ja: "びよういん", kana: "びよういん" }, { ja: "びょういん", kana: "びょういん" }]
  kind: mora
  tip: { id: "Besar atau kecil mengubah arti. びよういん (salon kecantikan) lima ketukan, びょういん (rumah sakit) empat ketukan.", en: "Big or small changes the word. びよういん (beauty salon) is five beats, びょういん (hospital) four." }
tirukan: { ja: "おちゃ を のみます 。", kana: "おちゃ を のみます 。", id: "Saya minum teh." }
check:
  - id: k1-08-c1
    type: listen
    audio: "kana-しゃ"
    options: [しゃ, しや, さ]
    answer: しゃ
    why: { id: "しゃ: satu ketukan, *sha*. しや dua ketukan, *shi-ya*.", en: "しゃ: one beat, *sha*. しや is two beats, *shi-ya*." }
  - id: k1-08-c2
    type: choice
    prompt: "おちゃ"
    options: [teh, air, nasi]
    answer: teh
    why: { id: "おちゃ artinya teh (hijau). Air みず, nasi ごはん.", en: "おちゃ means (green) tea. Water is みず, rice ごはん." }
  - id: k1-08-c3
    type: mora
    audio: "いしゃ"
    ask: count
    options: ["2", "3"]
    answer: "2"
    why: { id: "い-しゃ: dua ketukan. ゃ kecil menempel pada し.", en: "い-しゃ: two beats. The small ゃ joins し." }
  - id: k1-08-c4
    type: kana
    audio: "でんしゃ"
    answer: でんしゃ
    why: { id: "でんしゃ: de-n-sha. Ketik *densha*.", en: "でんしゃ: de-n-sha. Type *densha*." }
  - id: k1-08-c5
    type: listen
    audio: "ひゃく"
    options: [ひゃく, ひやく, ひく]
    answer: ひゃく
    why: { id: "ひゃく: hya-ku, dua ketukan, seratus.", en: "ひゃく: hya-ku, two beats, a hundred." }
  - id: k1-08-c6
    type: order
    prompt: "Susun kata *foto*."
    tiles: [ん, しゃ, し]
    answer: [しゃ, し, ん]
    why: { id: "しゃしん: sha-shi-n.", en: "しゃしん: sha-shi-n." }
glossary:
  - { ja: "しゃしん", kana: "しゃしん", id: "foto", en: "photo", type: noun, jlpt: N5 }
  - { ja: "おちゃ", kana: "おちゃ", id: "teh", en: "tea", type: noun, jlpt: N5 }
  - { ja: "でんしゃ", kana: "でんしゃ", id: "kereta (listrik)", en: "train", type: noun, jlpt: N5 }
  - { ja: "かいしゃ", kana: "かいしゃ", id: "perusahaan", en: "company", type: noun, jlpt: N5 }
  - { ja: "いしゃ", kana: "いしゃ", id: "dokter", en: "doctor", type: noun, jlpt: N5 }
  - { ja: "ひゃく", kana: "ひゃく", id: "seratus", en: "hundred", type: number, jlpt: N5 }
  - { ja: "じしょ", kana: "じしょ", id: "kamus", en: "dictionary", type: noun, jlpt: N5 }
  - { ja: "としょかん", kana: "としょかん", id: "perpustakaan", en: "library", type: noun, jlpt: N5 }
  - { ja: "のむ", kana: "のむ", id: "minum", en: "to drink", type: verb-1, jlpt: N5 }
next: kana1-09-panjang-dan-tsu
---

## concept.id
Huruf kolom い (き し ち に ひ み り, dan versi bertitiknya) bisa digabung dengan ゃ ゅ ょ kecil. Hasilnya satu ketukan: き + ゃ = きゃ. Ukurannya penting: ゃ kecil menempel, や besar berdiri sendiri.

## concept.en
The い-column letters (き し ち に ひ み り, and their dotted versions) can join a small ゃ ゅ ょ. The result is one beat: き + ゃ = きゃ. Size matters: a small ゃ joins, a big や stands alone.

## contrast.id
Bahasa Indonesia menulis bunyi ini dengan dua huruf Latin (*sy*, *ny*), jadi menulis kana besar terasa wajar. Tapi いしや (tiga ketukan) bukan いしゃ (dokter, dua ketukan). Saat menulis, buat ゃ ゅ ょ jelas lebih kecil dan sedikit lebih rendah.

## contrast.en
Indonesian writes these sounds with two Latin letters (*sy*, *ny*), so writing a full-size kana feels natural. But いしや (three beats) isn't いしゃ (doctor, two beats). When you write, make ゃ ゅ ょ clearly smaller and a little lower.
