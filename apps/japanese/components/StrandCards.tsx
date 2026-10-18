'use client';

// Strand cards (DESIGN §6.6): Bunyi, Kanji, Sopan, Kerja and Ngobrol on the Examples step; Kata on
// the Contrast step. Tirukan is core's card, with a MoraBeats row drawn by the Sentence slot.
import { useState } from 'react';
import { Prose } from '@ladder/core/components/lesson/Prose';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import type { Bilingual, JaKanjiCard, Lesson } from '@/course/types';
import type { JapaneseKey } from '@/i18n/overrides';
import { toPlain } from '@/lib/ja/text';
import { JaSentence } from './ja/JaSentence';
import { JaText } from './ja/JaText';
import { MoraBeatsMini } from '@/visuals/MoraBeatsMini';
import { PitchLineMini } from '@/visuals/PitchLineMini';

/** Bunyi: one pronunciation point, its words as beats (and pitch), minimal pairs side by side. */
export function SoundCard({ sound, pitch }: { sound: NonNullable<Lesson['sound']>; pitch: Record<string, number> }) {
  const { t, lang } = useT<JapaneseKey>();
  const { pitchMarks } = useSettings();
  const play = usePlay();
  const [playing, setPlaying] = useState<string | null>(null);
  const run = async (ja: string) => {
    setPlaying(ja);
    await play(ja);
    setPlaying(null);
  };
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="sound-title">
      <h3 id="sound-title" className="label text-muted">
        {t('lesson.sound')}
      </h3>
      <ul className="flex flex-wrap gap-x-8 gap-y-4">
        {sound.words.map((w) => {
          const accent = pitch[toPlain(w.ja)];
          return (
            <li key={w.ja} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <JaText className="text-ja-body">{toPlain(w.ja)}</JaText>
                <PlayButton text={w.ja} onPlay={() => run(w.ja)} playing={playing === w.ja} small />
              </div>
              {pitchMarks && accent !== undefined && <PitchLineMini kana={w.kana} accent={accent} label={`${w.kana}: ${accent}`} />}
              <MoraBeatsMini kana={w.kana} label={`${w.kana}: ${w.kana.replace(/\s+/g, '').length}`} />
            </li>
          );
        })}
      </ul>
      <div className="text-small">
        <Prose text={lang === 'en' ? sound.tip.en : sound.tip.id} lang={lang} />
      </div>
    </section>
  );
}

/** Kanji: each new kanji on the practice grid with its stroke count, meaning, readings and words. */
export function KanjiCard({ cards }: { cards: JaKanjiCard[] }) {
  const { t, lang } = useT<JapaneseKey>();
  if (!cards.length) return null;
  return (
    <section className="card flex flex-col gap-4 p-5" aria-labelledby="kanji-title">
      <h3 id="kanji-title" className="label text-muted">
        {t('lesson.kanji')}
      </h3>
      <ul className="flex flex-col gap-4">
        {cards.map((c) => (
          <li key={c.char} className="flex items-start gap-4">
            <JaText className="practice-grid flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-md bg-paper-2 text-[3rem] font-semibold leading-none">
              {c.char}
            </JaText>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold" lang={c.meaning.lang}>
                  {lang === 'en' && c.meaning.en ? c.meaning.en : c.meaning.text}
                </span>
                <span className="label tnum text-muted">
                  {c.strokes} {t('lesson.strokes')}
                </span>
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-2 text-small">
                {c.on.length > 0 && (
                  <>
                    <dt className="label text-muted">{t('lesson.onyomi')}</dt>
                    <dd>
                      <JaText face="ui">{c.on.join('・')}</JaText>
                    </dd>
                  </>
                )}
                {c.kun.length > 0 && (
                  <>
                    <dt className="label text-muted">{t('lesson.kunyomi')}</dt>
                    <dd>
                      <JaText face="ui">{c.kun.join('・')}</JaText>
                    </dd>
                  </>
                )}
              </dl>
              {c.words.length > 0 && (
                <p className="flex flex-wrap gap-x-3 text-small">
                  {c.words.map((w) => (
                    <JaText key={w} face="ui">
                      {w}
                    </JaText>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const LEVEL_KEY = { casual: 'lesson.politeCasual', polite: 'lesson.politePolite', honorific: 'lesson.politeHonorific' } as const;

/** Sopan: one meaning at two or three politeness levels, mapped to kamu / Anda / Bapak-Ibu. */
export function PoliteCard({ polite }: { polite: NonNullable<Lesson['polite']> }) {
  const { t } = useT<JapaneseKey>();
  return (
    <section className="card flex flex-col gap-4 border-s-[3px] border-brass p-5" aria-labelledby="polite-title">
      <h3 id="polite-title" className="label text-muted">
        {t('lesson.polite')}
      </h3>
      <ol className="flex flex-col gap-3">
        {polite.rows.map((r) => (
          <li key={r.level} className="flex flex-col gap-1">
            <span className="label text-muted">{t(LEVEL_KEY[r.level])}</span>
            <JaSentence ja={r.ja} id={r.id} size="body" />
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Kerja: a short workplace exchange with its situation in one line above. */
export function WorkCard({ work }: { work: NonNullable<Lesson['work']> }) {
  const { t, lang } = useT<JapaneseKey>();
  return (
    <section className="card flex flex-col gap-4 border-s-[3px] border-board p-5" aria-labelledby="work-title">
      <h3 id="work-title" className="label text-muted">
        ● {t('lesson.work')}
      </h3>
      <p className="id-text" lang={lang}>
        {lang === 'en' ? work.situation.en : work.situation.id}
      </p>
      <ol className="flex flex-col gap-4">
        {work.lines.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <JaSentence ja={line.ja} id={line.id} en={line.en} size="body" />
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Kata: loanword traps and katakana English. */
export function WordsCard({ words }: { words: Bilingual }) {
  const { t, lang } = useT<JapaneseKey>();
  return (
    <section className="flex flex-col gap-3 rounded-lg bg-accent-soft p-5" aria-labelledby="words-title">
      <h3 id="words-title" className="eyebrow">
        {t('lesson.words')}
      </h3>
      <Prose text={lang === 'en' ? words.en : words.id} lang={lang} />
    </section>
  );
}

/** Ngobrol: a 2–4 line exchange. */
export function TalkCard({ talk }: { talk: NonNullable<Lesson['talk']> }) {
  const { t, lang } = useT<JapaneseKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="talk-title">
      <h3 id="talk-title" className="eyebrow">
        {t('lesson.talk')}
      </h3>
      <ol className="flex flex-col gap-4">
        {talk.lines.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <JaSentence ja={line.ja} id={line.id} en={line.en} size="body" />
            {line.note && (
              <div className="self-start rounded-sm bg-accent-soft px-3 py-1 text-small text-ink" role="note">
                <Prose text={lang === 'en' ? line.note.en : line.note.id} lang={lang} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
