---
# Draft by Claude. Huruf rungs have no Mesir strand.
id: huruf1-04-jim-ha-kha
rung: huruf-1
order: 4
status: draft
minutes: 8
title: { id: "Jim, ḥa, kha", en: "Jim, ḥa, kha", ar: "جَ حَ خَ" }
summary:
  id: "Kamu membaca ج ح خ: satu bentuk, titik di bawah, tanpa titik, titik di atas."
  en: "You read ج ح خ: one shape, a dot below, no dot, a dot above."
introduces: [letters-jim-family]
spiral: sounds
visual: { id: letter-forms, props: { letter: "ح" } }
examples:
  - ar: "جَ جِ جُ"
    tr: "ja ji ju"
    id: "latihan suku kata: ja, ji, ju"
    en: "syllable drill: ja, ji, ju"
  - ar: "حَ حِ حُ"
    tr: "ḥa ḥi ḥu"
    id: "latihan suku kata: ḥa, ḥi, ḥu"
    en: "syllable drill: ḥa, ḥi, ḥu"
    note: { id: "Bunyi *h* yang dalam dan berdesis dari tengah tenggorokan, seperti menghembus kaca untuk dibersihkan.", en: "A deep, breathy *h* from the middle of the throat, like breathing on glass to clean it." }
  - ar: "خَ خِ خُ"
    tr: "kha khi khu"
    id: "latihan suku kata: kha, khi, khu"
    en: "syllable drill: kha, khi, khu"
    note: { id: "Seperti *kh* di kata *akhir*: bunyi serak di pangkal lidah.", en: "Like *kh* in Indonesian *akhir*: a rasping sound at the back of the tongue." }
  - ar: "جَحَخَ"
    tr: "jaḥakha"
    id: "latihan: titik di bawah, tanpa titik, titik di atas"
    en: "drill: dot below, no dot, dot above"
  - ar: "بَحَثَ"
    tr: "baḥatsa"
    id: "meneliti, membahas"
    en: "researched, discussed"
    note: { id: "Dari kata ini datang *bahas* di bahasa Indonesia.", en: "Indonesian *bahas* (to discuss) comes from this word." }
  - ar: "نَجَحَ"
    tr: "najaḥa"
    id: "berhasil"
    en: "succeeded"
pair:
  off: { ar: "بَهَثَ", tr: "bahatsa" }
  natural: { ar: "بَحَثَ", tr: "baḥatsa" }
sound:
  focus: "ح"
  compare: "ه"
  words:
    - { ar: "حَ", tr: "ḥa" }
    - { ar: "حِ", tr: "ḥi" }
    - { ar: "حُ", tr: "ḥu" }
    - { ar: "بَحَثَ", tr: "baḥatsa" }
    - { ar: "نَجَحَ", tr: "najaḥa" }
  tip:
    id: "Untuk ح, sempitkan tengah tenggorokan lalu hembuskan udara kuat-kuat, tanpa suara serak. Kalau terdengar serak, itu خ. Kalau ringan seperti *h* biasa, itu huruf lain yang akan kamu temui di pelajaran 10."
    en: "For ح, narrow the middle of your throat and breathe out hard, without rasping. If it rasps, that is خ. If it is light like an ordinary *h*, that is another letter you will meet in lesson 10."
tirukan:
  ar: "جَ حَ خَ، جِ حِ خِ، جُ حُ خُ"
  tr: "ja ḥa kha, ji ḥi khi, ju ḥu khu"
  id: "ja ḥa kha, ji ḥi khi, ju ḥu khu"
  en: "ja ḥa kha, ji ḥi khi, ju ḥu khu"
check:
  - id: h1-04-c1
    type: choice
    match: exact
    prompt: "Huruf mana yang titiknya di atas?"
    options: ["خ", "ج", "ح"]
    answer: "خ"
    why: { id: "خ titiknya di atas, ج di bawah, ح tanpa titik.", en: "خ has its dot above, ج below, ح none." }
  - id: h1-04-c2
    type: read
    match: exact
    ar: "خِ"
    options: ["khi", "ḥi", "ji"]
    answer: "khi"
    why: { id: "Titik di atas adalah خ, dan kasrah dibaca *i*: *khi*.", en: "A dot above is خ, and kasrah is read *i*: *khi*." }
  - id: h1-04-c3
    type: read
    match: exact
    ar: "بَحَثَ"
    options: ["baḥatsa", "bakhatsa", "bajatsa"]
    answer: "baḥatsa"
    why: { id: "Huruf tengahnya tanpa titik, jadi ح: *baḥatsa*.", en: "The middle letter has no dot, so it is ح: *baḥatsa*." }
  - id: h1-04-c4
    type: mark
    match: exact
    prompt: "Dengarkan, lalu pilih harakat huruf kedua."
    ar: "نَجَحَ"
    target: 1
    options: [fatha, kasra, damma]
    answer: fatha
    why: { id: "Dibaca *najaḥa*: ج berharakat fathah.", en: "It is read *najaḥa*: ج has fathah." }
  - id: h1-04-c5
    type: spell
    match: exact
    prompt: "Susun suku katanya: *na-ja-ḥa*."
    letters: ["نَ", "جَ", "حَ"]
    distractors: ["خَ", "حُ"]
    answer: "نَجَحَ"
    why: { id: "Dari kanan: نَ, جَ, lalu حَ tanpa titik.", en: "From the right: نَ, جَ, then dotless حَ." }
  - id: h1-04-c6
    type: listen
    match: exact
    audio: "حَ"
    options: ["حَ", "خَ", "جَ"]
    answer: "حَ"
    why: { id: "Kamu mendengar *ḥa*: dalam dan berdesis, tidak serak.", en: "You heard *ḥa*: deep and breathy, not rasping." }
glossary:
  - { ar: "جَ", tr: "ja", id: "huruf jim berharakat fathah", en: "the letter jim with fathah" }
  - { ar: "حِ", tr: "ḥi", id: "huruf ḥa berharakat kasrah", en: "the letter ḥa with kasrah" }
  - { ar: "خُ", tr: "khu", id: "huruf kha berharakat dhammah", en: "the letter kha with dhammah" }
next: huruf1-05-tidak-menyambung
---

## concept.id
Keluarga baru, satu bentuk lagi: **ج** (*jim*), **ح** (*ḥa*) dan **خ** (*kha*). Bentuknya seperti kail. Bedanya lagi-lagi hanya titik: ج satu titik di bawah, ح tanpa titik, خ satu titik di atas.

Baca dengan tiga vokal seperti biasa: **جَ جِ جُ**, **حَ حِ حُ**, **خَ خِ خُ**. Huruf ج dibaca *j* seperti di bahasa Indonesia. Huruf خ dibaca *kh*, seperti di kata *akhir* atau *khusus*.

Kamu juga sudah bisa membaca kata yang jadi bahasa Indonesia: **بَحَثَ** (*baḥatsa*) adalah asal kata *bahas*.

## concept.en
A new family, one more shape: **ج** (*jim*), **ح** (*ḥa*) and **خ** (*kha*). The shape looks like a hook. Once again only the dots differ: ج one dot below, ح no dot, خ one dot above.

Read them with three vowels as usual: **جَ جِ جُ**, **حَ حِ حُ**, **خَ خِ خُ**. ج is read *j* as in Indonesian. خ is read *kh*, as in Indonesian *akhir* or *khusus*.

You can already read a word that became Indonesian: **بَحَثَ** (*baḥatsa*) is where *bahas* comes from.

## contrast.id
Di lidah Indonesia, ح biasanya jadi *h* biasa. Makanya بَحَثَ menjadi *bahas*, dan ث-nya pun jadi *s*. Di bahasa Indonesia itu wajar, tapi saat membaca Arab, ح perlu bunyinya sendiri.

ح bukan *h* ringan dan bukan *kh* yang serak. Bayangkan kamu menghembus kaca sebelum mengelapnya: tenggorokan menyempit, udara keluar kuat, tanpa suara serak. Bunyi itulah ح.

## contrast.en
On Indonesian tongues ح usually becomes a plain *h*. That is why بَحَثَ became *bahas*, with the ث turning into *s* as well. That is natural in Indonesian, but when reading Arabic, ح needs its own sound.

ح is not a light *h* and not a rasping *kh*. Imagine breathing on glass before wiping it: the throat narrows, the air comes out hard, with no rasp. That sound is ح.
