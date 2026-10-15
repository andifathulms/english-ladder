---
id: easy1-08-to-be-questions
rung: easy-1
order: 8
status: draft
minutes: 8
title: { en: "Questions and no", id: "Bertanya dan menjawab tidak" }
summary:
  id: "Kamu bisa bertanya dengan is, am dan are, dan menjawab ya atau tidak."
  en: "You can ask questions with is, am and are, and answer yes or no."
introduces: [be-questions-negatives]
spiral: questions
worked:
  - { en: "You are a teacher.", id: "Kamu guru." }
  - { en: "[[Are]] you a teacher?", id: "Kamu guru?" }
  - { en: "Yes, I [[am]].", id: "Iya." }
  - { en: "No, I[['m not]].", id: "Bukan." }
examples:
  - { en: "[[Is]] she a nurse?", id: "Dia perawat?", note: { id: "Untuk bertanya, is pindah ke depan.", en: "To ask, is moves to the front." } }
  - { en: "Yes, she [[is]].", id: "Iya.", note: { id: "Jawaban pendek memakai bentuk penuh: she is, bukan she's.", en: "Short answers use the full form: she is, not she's." } }
  - { en: "[[Are]] they ready?", id: "Mereka siap?" }
  - { en: "No, they [[aren't]].", id: "Nggak.", note: { id: "Kalau maksudmu belum, bilang Not yet.", en: "If you mean belum, say Not yet." } }
  - { en: "I[['m not]] hungry.", id: "Aku nggak lapar.", note: { id: "I amn't tidak dipakai dalam bahasa Inggris standar. Pakai I'm not.", en: "Standard English doesn't use I amn't. Use I'm not." } }
  - { en: "The keys [[aren't]] on the table.", id: "Kuncinya nggak ada di atas meja." }
pair:
  off: "You are teacher?"
  natural: "[[Are]] you a teacher?"
check:
  - id: e1-08-c1
    type: gap
    cue: "Dia sibuk?"
    prompt: "___ he busy?"
    options: [Is, Are, Am]
    answer: Is
    why: { id: "He memakai is, dan untuk bertanya is pindah ke depan.", en: "He takes is, and to ask, is moves to the front." }
  - id: e1-08-c2
    type: choice
    cue: "Kamu siap? Iya."
    prompt: "Are you ready? Yes, I ___."
    options: [am, is, are]
    answer: am
    why: { id: "Jawaban dengan I memakai am, dalam bentuk penuh.", en: "An answer with I takes am, in the full form." }
  - id: e1-08-c3
    type: fix
    cue: "Aku nggak capek."
    wrong: "I amn't tired."
    options: ["I'm not tired.", "I not tired.", "I isn't tired."]
    answer: "I'm not tired."
    why: { id: "I am not menjadi I'm not. Amn't tidak dipakai dalam bahasa Inggris standar.", en: "I am not becomes I'm not. Standard English doesn't use amn't." }
  - id: e1-08-c4
    type: gap
    cue: "Mereka nggak telat."
    prompt: "They ___ late."
    options: [isn't, "aren't", not]
    answer: "aren't"
    why: { id: "They memakai are, jadi bentuk tidaknya aren't.", en: "They takes are, so the negative is aren't." }
  - id: e1-08-c5
    type: choice
    cue: "Bolanya di bawah meja? Bukan."
    prompt: "Is the ball under the table? No, it ___."
    options: ["isn't", "aren't", not]
    answer: "isn't"
    why: { id: "It memakai is, jadi jawabannya No, it isn't.", en: "It takes is, so the answer is No, it isn't." }
  - id: e1-08-c6
    type: order
    cue: "Rina guru?"
    tiles: [Rina, a, Is, teacher?]
    answer: [Is, Rina, a, teacher?]
    why: { id: "Untuk bertanya: is dulu, lalu orangnya.", en: "To ask: is first, then the person." }
glossary:
  - { en: "yes", id: "ya, iya" }
  - { en: "no", id: "tidak, bukan" }
  - { en: not, id: "tidak, bukan" }
  - { en: question, id: "pertanyaan" }
  - { en: answer, id: "jawaban" }
  - { en: friend, id: "teman" }
next: null
---

## concept.id
Untuk bertanya, pindahkan **am**, **is** atau **are** ke depan: **You are ready** menjadi **Are you ready?** Untuk *tidak* atau *bukan*, taruh **not** sesudahnya: **I'm not**, **he isn't**, **they aren't**. Jawaban pendek memakai bentuk penuh: **Yes, I am**, bukan **Yes, I'm**.

## concept.en
To ask a question, move **am**, **is** or **are** to the front: **You are ready** becomes **Are you ready?** For *no* or *not*, put **not** after it: **I'm not**, **he isn't**, **they aren't**. Short answers use the full form: **Yes, I am**, not **Yes, I'm**.

## contrast.id
Bahasa Indonesia bisa bertanya hanya dengan nada naik: *Kamu guru?* Bahasa Inggris juga mengubah urutan kata: **Are you a teacher?** Dan **I amn't** tidak dipakai dalam bahasa Inggris standar; pakai **I'm not**.

## contrast.en
Indonesian can ask a question with rising intonation alone: *Kamu guru?* English also changes the word order: **Are you a teacher?** And standard English doesn't use **I amn't**; use **I'm not**.
