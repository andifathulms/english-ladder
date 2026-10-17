---
id: starter-08-survival
rung: starter
order: 8
status: draft
minutes: 6
title: { en: "Sorry? Slowly, please.", id: "Kalimat penyelamat" }
summary:
  id: "Kamu bisa minta diulang, minta pelan-pelan, dan bertanya arti kata."
  en: "You can ask someone to repeat, to slow down, and what a word means."
introduces: [survival-chunks]
spiral: survival
worked:
  - { en: "[[Sorry?]]", id: "Maaf, apa?" }
  - { en: "[[Slowly, please.]]", id: "Pelan-pelan, ya." }
  - { en: "[[I don't understand.]]", id: "Aku nggak ngerti." }
examples:
  - { en: "[[Sorry?]]", id: "Maaf, apa?", note: { id: "Dengan nada naik, Sorry? artinya kamu minta diulang.", en: "With a rising tone, Sorry? asks someone to repeat." } }
  - { en: "[[Slowly, please.]]", id: "Pelan-pelan, ya." }
  - { en: "[[Can you say that again?]]", id: "Bisa diulang?" }
  - { en: "[[What does it mean?]]", id: "Artinya apa?" }
  - { en: "[[How do you say]] warung in English?", id: "Warung bahasa Inggrisnya apa?" }
  - { en: "[[I don't understand.]]", id: "Aku nggak ngerti." }
pair:
  off: "What? Repeat!"
  natural: "[[Sorry]], can you say that again?"
check:
  - id: st-08-c1
    type: choice
    cue: "Kamu tidak dengar. Bilang apa?"
    prompt: "What do you say?"
    options: ["Sorry?", "Repeat!", "What?"]
    answer: "Sorry?"
    why: { id: "Sorry? dengan nada naik terdengar sopan.", en: "Sorry? with a rising tone sounds polite." }
  - id: st-08-c2
    type: gap
    cue: "Pelan-pelan, ya."
    prompt: "Slowly, ___."
    options: [please, thanks, sorry]
    answer: please
    why: { id: "Please membuat permintaan jadi sopan.", en: "Please makes a request polite." }
  - id: st-08-c3
    type: order
    cue: "Warung bahasa Inggrisnya apa?"
    tiles: [you, How, in, say, do, warung, English?]
    answer: [How, do, you, say, warung, in, English?]
    why: { id: "Hafalkan sebagai satu kalimat: How do you say … in English?", en: "Learn it as one sentence: How do you say … in English?" }
  - id: st-08-c4
    type: gap
    cue: "Aku nggak ngerti."
    prompt: "I don't ___."
    options: [understand, hear, mean]
    answer: understand
    why: { id: "Tidak paham: I don't understand.", en: "Not following: I don't understand." }
  - id: st-08-c5
    type: listen
    audio: "Can you say that again?"
    options: ["Can you say that again?", "Can you spell that?"]
    answer: "Can you say that again?"
    why: { id: "Say that again = ulangi. Spell that = eja.", en: "Say that again = repeat. Spell that = spell it." }
glossary:
  - { en: sorry, id: "maaf" }
  - { en: please, id: "tolong, ya (sopan)" }
  - { en: slowly, id: "pelan-pelan" }
  - { en: again, id: "lagi" }
  - { en: understand, id: "mengerti, paham" }
  - { en: mean, id: "berarti" }
  - { en: say, id: "bilang, mengucapkan" }
  - { en: English, id: "bahasa Inggris" }
  - { en: word, id: "kata" }
talk:
  - { who: Pak Andi, en: "It's fifteen thousand.", id: "Lima belas ribu." }
  - { who: Mei, en: "Sorry? Slowly, please.", id: "Maaf? Pelan-pelan, ya." }
  - { who: Pak Andi, en: "Fifteen. Thousand.", id: "Lima belas. Ribu." }
  - { who: Mei, en: "Thank you!", id: "Makasih!" }
next: null
---

## concept.id
Beberapa kalimat pendek bisa menyelamatkan percakapan apa pun. Hafalkan sebagai satu kesatuan, jangan dipecah: **Sorry?**, **Slowly, please.**, **Can you say that again?** dan **How do you say … in English?** Tata bahasanya akan kamu pelajari nanti.

## concept.en
A few short sentences can rescue any conversation. Learn them whole, not word by word: **Sorry?**, **Slowly, please.**, **Can you say that again?** and **How do you say … in English?** You will learn the grammar inside them later.

## contrast.id
Dalam bahasa Indonesia, *Apa?* terdengar wajar. Dalam bahasa Inggris, **What?** saja bisa terdengar kasar. **Sorry?** dengan nada naik lebih sopan dan sama cepatnya.

## contrast.en
In Indonesian, *Apa?* sounds fine. In English, a bare **What?** can sound rude. **Sorry?** with a rising tone is more polite and just as quick.
