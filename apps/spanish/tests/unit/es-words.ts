// Hand-syllabified words for the lib/es tests (CLAUDE.md §6): syllables split by "-", the stressed
// syllable in capitals. Diphthongs, hiatus, qu/gu/gü, ll/rr/ch, consonant clusters, y as a vowel.
// tl stays together, as in Mexico (a-tlas); none is listed, since Spain splits it.
export const SYLLABLES = `
pa-ÍS ciu-DAD GUE-rra pin-GÜI-no u-ru-GUAY BUEY ca-ca-HUE-te a-HÍ pro-HÍ-be re-ÍR cons-TRUIR
HIE-lo MUY RE-yes ca-ER po-E-ta a-É-re-o LÁ-piz ÁR-bol e-XA-men MÉ-xi-co CA-lle PE-rro ha-BLAR
O-tro in-GLÉS trans-POR-te abs-TRAC-to ins-TAN-te es-TOY HOY QUE-so gui-TA-rra bi-LIN-güe OI-go
DÍ-a BÚ-ho JO-ven ca-FÉ MÚ-si-ca ciu-DA-des ba-ÚL le-ÍS-te es-tu-DIAR cui-DA-do CA-sa LI-bro ME-sa
za-PA-to ban-DE-ra do-MIN-go se-MA-na te-LÉ-fo-no FÁ-cil di-FÍ-cil ca-MIÓN can-CIÓN a-VIÓN
co-ra-ZÓN ra-TÓN SÁ-ba-do MIÉR-co-les JUE-ves VIER-nes LU-nes MAR-tes a-ZÚ-car FÚT-bol ÁR-bo-les
JÓ-ve-nes e-XÁ-me-nes pe-RIÓ-di-co PÚ-bli-co FRÍ-o RÍ-o TÍ-a TÍ-o se-ÑO-ra NI-ño ma-ÑA-na
es-pa-ÑOL es-PA-ña a-ZUL VER-de BLAN-co NE-gro a-ma-RI-llo RO-jo na-RAN-ja GRIS mo-RA-do ro-SA-do
tra-ba-JAR tra-ba-ja-DOR pro-fe-SOR es-tu-DIAN-te doc-TOR MÉ-di-co en-fer-ME-ra in-ge-NIE-ro
a-bo-GA-do co-CI-na BA-ño ha-bi-ta-CIÓN ven-TA-na PUER-ta SI-lla so-FÁ CA-ma co-MI-da a-RROZ PO-llo
PAN A-gua LE-che JU-go TÉ cer-VE-za HUE-vo FRU-ta man-ZA-na PLÁ-ta-no to-MA-te ce-BO-lla PA-pa
ma-MÁ pa-PÁ her-MA-no her-MA-na a-BUE-lo HI-jo fa-MI-lia a-MI-go ve-CI-no PUE-blo a-ve-NI-da
PLA-za mer-CA-do TIEN-da BAN-co hos-pi-TAL es-CUE-la u-ni-ver-si-DAD bi-blio-TE-ca mu-SE-o
i-GLE-sia mez-QUI-ta es-ta-CIÓN au-to-BÚS CA-rro CO-che MO-to bi-ci-CLE-ta a-e-ro-PUER-to TREN
MA-pa di-NE-ro PRE-cio ba-RA-to CA-ro GRAN-de pe-QUE-ño NUE-vo VIE-jo bo-NI-to FE-o a-LE-gre
TRIS-te can-SA-do con-TEN-to en-FER-mo ner-VIO-so a-bu-RRI-do fe-LIZ LLU-via SOL NU-be VIEN-to
ca-LOR in-VIER-no ve-RA-no o-TO-ño pri-ma-VE-ra re-LOJ HO-ra mi-NU-to DÍ-as se-GUN-do
me-dio-DÍ-a NO-che TAR-de tem-PRA-no a-HO-ra SIEM-pre NUN-ca tam-BIÉN a-QUÍ a-LLÍ des-PUÉS
ca-mi-SE-ta cha-QUE-ta pan-ta-LÓN ta-que-RÍ-a mo-CHI-la que-sa-DI-lla gue-RRE-ro
`
  .trim()
  .split(/\s+/)
  .map((w) => {
    const parts = w.split('-');
    const stressed = parts.findIndex((p) => p === p.toUpperCase() && p !== p.toLowerCase());
    return { word: parts.join('').toLowerCase(), syllables: parts.map((p) => p.toLowerCase()), stressed };
  });
