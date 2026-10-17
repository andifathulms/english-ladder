---
id: starter-03-numbers
rung: starter
order: 3
status: draft
minutes: 7
title: { en: "Thirteen or thirty?", id: "Angka 1 sampai 100" }
summary:
  id: "Kamu bisa menyebut dan mendengar angka sampai 100, termasuk -teen dan -ty."
  en: "You can say and hear numbers up to 100, including -teen and -ty."
introduces: [numbers]
spiral: numbers
worked:
  - { en: "one, two, [[three]]", id: "1, 2, 3" }
  - { en: "eleven, [[twelve]]", id: "11, 12" }
  - { en: "[[twenty]], twenty-one", id: "20, 21" }
examples:
  - { en: "[[thirteen]], fourteen, fifteen", id: "13, 14, 15", note: { id: "-teen ditekan: thir-TEEN.", en: "-teen is stressed: thir-TEEN." } }
  - { en: "[[thirty]], forty, fifty", id: "30, 40, 50", note: { id: "-ty tidak ditekan: THIR-ty.", en: "-ty is not stressed: THIR-ty." } }
  - { en: "[[twenty-one]]", id: "21", note: { id: "Puluhan + satuan ditulis dengan tanda hubung.", en: "Tens + ones take a hyphen." } }
  - { en: "I am [[nineteen]].", id: "Umurku 19 tahun." }
  - { en: "My number is [[zero]] eight one two.", id: "Nomorku 0812.", note: { id: "Nomor telepon dibaca satu per satu. 0 bisa zero atau oh.", en: "Phone numbers are read one digit at a time. 0 can be zero or oh." } }
  - { en: "[[a hundred]]", id: "100", note: { id: "Bisa a hundred atau one hundred.", en: "Either a hundred or one hundred." } }
pair:
  off: "fourty"
  natural: "[[forty]]"
check:
  - id: st-03-c1
    type: listen
    audio: "thirteen"
    options: [thirteen, thirty]
    answer: thirteen
    why: { id: "Tekanan di akhir, thir-TEEN: 13.", en: "Stress at the end, thir-TEEN: 13." }
  - id: st-03-c2
    type: listen
    audio: "fifty"
    options: [fifteen, fifty]
    answer: fifty
    why: { id: "Tekanan di depan, FIF-ty: 50.", en: "Stress at the start, FIF-ty: 50." }
  - id: st-03-c3
    type: choice
    cue: "40"
    prompt: "40 ="
    options: [forty, fourty, fourteen]
    answer: forty
    why: { id: "Four punya u, tapi forty tidak.", en: "Four has a u, but forty doesn't." }
  - id: st-03-c4
    type: gap
    cue: "Umurku 21 tahun."
    prompt: "I am ___."
    options: [twenty-one, twelve, one-twenty]
    answer: twenty-one
    why: { id: "21: puluhan dulu, lalu satuan: twenty-one.", en: "21: tens first, then ones: twenty-one." }
  - id: st-03-c5
    type: order
    cue: "Nomornya 0812."
    tiles: [eight, two, zero, one]
    answer: [zero, eight, one, two]
    why: { id: "Nomor telepon dibaca satu angka satu kali.", en: "A phone number is read one digit at a time." }
glossary:
  - { en: number, id: "angka, nomor" }
  - { en: zero, id: "nol" }
  - { en: eleven, id: "sebelas" }
  - { en: twelve, id: "dua belas" }
  - { en: thirteen, id: "tiga belas" }
  - { en: fifteen, id: "lima belas" }
  - { en: nineteen, id: "sembilan belas" }
  - { en: twenty, id: "dua puluh" }
  - { en: thirty, id: "tiga puluh" }
  - { en: forty, id: "empat puluh" }
  - { en: fifty, id: "lima puluh" }
  - { en: hundred, id: "ratus" }
sound:
  focus: "thir-TEEN · THIR-ty"
  words: [thirteen, thirty, fifteen, fifty]
  tip: { id: "Bedanya ada di tekanan. -teen panjang dan keras; -ty pendek dan lemah.", en: "The difference is the stress. -teen is long and strong; -ty is short and weak." }
next: starter-04-money
---

## concept.id
Angka 13 sampai 19 diakhiri **-teen** dan ditekan di akhir: thir**TEEN**. Puluhan diakhiri **-ty** dan ditekan di depan: **THIR**ty. Angka seperti 21 ditulis dengan tanda hubung: **twenty-one**.

## concept.en
Numbers 13 to 19 end in **-teen** and are stressed at the end: thir**TEEN**. Tens end in **-ty** and are stressed at the front: **THIR**ty. Numbers like 21 take a hyphen: **twenty-one**.

## contrast.id
Saat bicara cepat, **thirteen** dan **thirty** mudah tertukar. Dengarkan tekanannya, dan kalau ragu, tanya balik: *One three or three zero?* Perhatikan juga ejaannya: **four** dan **fourteen**, tapi **forty**.

## contrast.en
In fast speech, **thirteen** and **thirty** are easy to confuse. Listen for the stress, and if you're not sure, ask back: *One three or three zero?* Watch the spelling too: **four** and **fourteen**, but **forty**.
