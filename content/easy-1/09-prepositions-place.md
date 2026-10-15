---
id: easy1-07-prepositions-place
rung: easy-1
order: 9
status: draft
minutes: 9
title: { en: "Where things are", id: "Di mana bendanya?" }
summary:
  id: "Kamu bisa bilang di mana benda berada."
  en: "You can say where things are."
introduces: [prep-place-basic]
spiral: prepositions
visual: { id: place-scene, props: { initial: on } }
examples:
  - { en: "My phone is [[in]] my bag.", id: "HP-ku di dalam tas." }
  - { en: "The keys are [[on]] the table.", id: "Kuncinya di atas meja.", note: { id: "On: di atas dan menempel di permukaan.", en: "On: on top of and touching a surface." } }
  - { en: "The cat is [[under]] the bed.", id: "Kucingnya di bawah kasur." }
  - { en: "The mosque is [[next to]] the school.", id: "Masjidnya di sebelah sekolah." }
  - { en: "Budi's motorbike is [[behind]] the house.", id: "Motor Budi di belakang rumah." }
  - { en: "Rina is [[in front of]] the warung.", id: "Rina di depan warung.", note: { id: "In front of: tiga kata, satu arti.", en: "In front of: three words, one meaning." } }
pair:
  off: "The book is at the table."
  natural: "The book is [[on]] the table."
check:
  - id: e1-07-c1
    type: choice
    cue: "Kuncinya di atas meja."
    prompt: "The keys are ___ the table."
    options: [in, on, at]
    answer: on
    why: { id: "On: di atas permukaan.", en: "On: on top of a surface." }
  - id: e1-07-c2
    type: gap
    cue: "Sepatuku di bawah kasur."
    prompt: "My shoes are ___ the bed."
    options: [under, on, in]
    answer: under
    why: { id: "Under: di bawah.", en: "Under: below something." }
  - id: e1-07-c3
    type: scene
    visual: { id: place-scene, props: { state: behind } }
    options: ["The ball is behind the box.", "The ball is in front of the box.", "The ball is in the box."]
    answer: "The ball is behind the box."
    why: { id: "Bolanya di belakang kotak, jadi sebagian tertutup.", en: "The ball is at the back of the box, so part of it is hidden." }
  - id: e1-07-c4
    type: scene
    visual: { id: place-scene, props: { state: in } }
    options: ["The ball is on the box.", "The ball is in the box.", "The ball is under the box."]
    answer: "The ball is in the box."
    why: { id: "Bolanya di dalam kotak: in.", en: "The ball is inside the box: in." }
  - id: e1-07-c5
    type: fix
    cue: "HP-nya di dalam tas."
    wrong: "Her phone is at her bag."
    options: ["Her phone is in her bag.", "Her phone is on her bag.", "Her phone is under her bag."]
    answer: "Her phone is in her bag."
    why: { id: "Di dalam sesuatu: in, bukan at.", en: "Inside something: in, not at." }
  - id: e1-07-c6
    type: order
    cue: "Masjidnya di sebelah sekolah."
    tiles: [mosque, is, next, to, The, the, school]
    answer: [The, mosque, is, next, to, the, school]
    why: { id: "Next to selalu dua kata, berurutan.", en: "Next to is always two words, together." }
glossary:
  - { en: in, id: "di dalam" }
  - { en: on, id: "di atas" }
  - { en: under, id: "di bawah" }
  - { en: next to, id: "di sebelah" }
  - { en: behind, id: "di belakang" }
  - { en: in front of, id: "di depan" }
  - { en: table, id: "meja" }
  - { en: bed, id: "kasur" }
  - { en: key, id: "kunci" }
  - { en: school, id: "sekolah" }
  - { en: shoe, id: "sepatu" }
  - { en: warung, id: "warung" }
sound:
  focus: "weak of, to"
  words: [in front of, next to, "It's next to the school."]
  tip: { id: "Of dan to dibaca lemah: in front of terdengar /ɪn frʌnt əv/, next to terdengar /neks tə/.", en: "Of and to are weak: in front of sounds like /ɪn frʌnt əv/, next to like /neks tə/." }
talk:
  - { who: Andi, en: "Where's my phone?", id: "HP-ku di mana?" }
  - { who: Mei, en: "It's on the table.", id: "Di atas meja." }
words: { id: "**At home**, **at school**, **at work**: tanpa *the*. Kamu akan sering mendengarnya. Dan *di atas* bisa juga berarti **above**, kalau tidak menempel.", en: "**At home**, **at school**, **at work**: no *the*. You will hear these a lot. And *di atas* can also mean **above**, when nothing touches." }
next: easy1-08-to-be-questions
---

## concept.id
Kata depan tempat (**preposition**) menjawab pertanyaan *di mana?* Bahasa Inggris punya kata yang berbeda untuk tiap posisi: **in** (di dalam), **on** (menempel di permukaan, atas atau samping), **under** (di bawah), **next to** (di sebelah), **behind** (di belakang) dan **in front of** (di depan). Perhatikan juga patokannya: bola **under the table**, tapi bola **on the box**. Kata **the** menunjuk benda yang sudah jelas, mirip *-nya*: *kuncinya* menjadi **the keys**.

## concept.en
Prepositions of place answer the question *di mana?* English has a different word for each position: **in**, **on** (touching a surface, top or side), **under**, **next to**, **behind** and **in front of**. Notice the reference object too: the ball is **under the table**, but **on the box**. **The** points to a thing we both know, a bit like *-nya*: *kuncinya* becomes **the keys**.

## contrast.id
Bahasa Indonesia memakai *di* untuk hampir semua posisi, dan *di* terasa seperti **at**. **At the table** memang ada, tapi artinya *di dekat meja*, seperti orang yang duduk di meja makan. Untuk buku yang ada di atasnya, pilih kata yang menunjukkan posisinya: **on**.

## contrast.en
Indonesian uses *di* for almost every position, and *di* feels like **at**. **At the table** is real English, but it means *by the table*, like people sitting down to eat. For a book lying on top, choose the word that shows the position: **on**.
