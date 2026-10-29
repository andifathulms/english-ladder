'use client';

// Strand cards (DESIGN §6): Bunyi, Kerja, Ngobrol and Tirukan on the Examples step; Kata on the
// Contrast step. Tirukan is core's card; the Sentence slot underlines the stressed syllables.
import { useState } from 'react';
import type { StrandCard } from '@ladder/core/course/types';
import { Prose } from '@ladder/core/components/lesson/Prose';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { TirukanCard } from '@ladder/core/components/lesson/TirukanCard';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useLessonData } from '@ladder/core/components/lesson/LessonData';
import type { Lesson } from '@/course/types';
import type { GermanKey } from '@/i18n/overrides';
import type { DeCompound, DeLessonData } from '@/course/lessonData';
import { GenderChip } from './GenderChip';

const sl = (l: unknown) => l as Lesson;

/** A word with its own play button. */
function PlayWord({ text }: { text: string }) {
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(text);
    setPlaying(false);
  };
  return (
    <span className="inline-flex items-center gap-2">
      <span lang="de" className="font-display text-[1.375rem] font-medium leading-tight">
        {text}
      </span>
      <PlayButton text={text} onPlay={run} playing={playing} small />
    </span>
  );
}

/** Bunyi: a sound point; words to play, and minimal pairs side by side (schon ↔ schön). */
export function SoundCard({ sound }: { sound: NonNullable<Lesson['sound']> }) {
  const { t, lang } = useT<GermanKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="sound-title">
      <h3 id="sound-title" className="label text-muted">
        {t('lesson.sound')}
        {sound.focus && <span className="sr-only">: {sound.focus}</span>}
      </h3>
      {sound.words.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {sound.words.map((w) => (
            <li key={w}>
              <PlayWord text={w} />
            </li>
          ))}
        </ul>
      )}
      {sound.pairs && sound.pairs.length > 0 && (
        <ul className="flex flex-col gap-3" aria-label={t('sound.pairs')}>
          {sound.pairs.map(([a, b]) => (
            <li key={`${a}-${b}`} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <PlayWord text={a} />
              <span aria-hidden className="text-muted">
                ↔
              </span>
              <PlayWord text={b} />
            </li>
          ))}
        </ul>
      )}
      <div className="text-small">
        <Prose text={lang === 'en' ? sound.tip.en : sound.tip.id} lang={lang} />
      </div>
    </section>
  );
}

/** Kerja (DESIGN §6): a workplace exchange with Sie, on --surface with a petrol inline-start edge. */
export function WorkCard({ work }: { work: NonNullable<Lesson['work']> }) {
  const { t, lang } = useT<GermanKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-surface p-5 shadow-e1" style={{ borderInlineStart: '3px solid var(--board)' }} aria-labelledby="work-title">
      <h3 id="work-title" className="label text-work">
        <span aria-hidden>● </span>
        {t('lesson.work')}
      </h3>
      <p className="text-small text-muted">{lang === 'en' ? work.situation.en : work.situation.id}</p>
      <ol className="flex flex-col gap-4">
        {work.lines.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <Sentence en={line.de} id={line.id} size="body" />
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

/** A compound with its joints shown as · and the last part's gender (Kranken · haus → das). */
function CompoundLine({ c }: { c: DeCompound }) {
  const { t } = useT<GermanKey>();
  return (
    <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span lang="de" className="font-medium">
        {c.parts.map((p, i) => (
          <span key={i}>
            {i > 0 && (
              <span aria-hidden className="text-muted">
                {' · '}
              </span>
            )}
            {i > 0 ? p.charAt(0).toLowerCase() + p.slice(1) : p}
            {i < c.parts.length - 1 && c.links[i] && <span className="text-accent">{c.links[i]}</span>}
          </span>
        ))}
      </span>
      <span aria-hidden className="text-muted">
        →
      </span>
      <GenderChip gender={c.gender} />
      <strong lang="de">{c.word}</strong>
      <span className="sr-only">{t('words.compoundRule')}</span>
    </li>
  );
}

/** Kata: Indonesian ← Dutch = German bridges, false friends with ⚠, and compound breakdowns (DESIGN §6). */
export function WordsCard({ words, data }: { words: NonNullable<Lesson['words']>; data: DeLessonData | undefined }) {
  const { t, lang } = useT<GermanKey>();
  const bridges = data?.bridges ?? [];
  const falseFriends = data?.falseFriends ?? [];
  const compounds = data?.compounds ?? [];
  return (
    <section className="flex flex-col gap-3 rounded-lg bg-accent-soft p-5" aria-labelledby="words-title">
      <h3 id="words-title" className="eyebrow">
        {t('lesson.words')}
      </h3>
      {bridges.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label={t('words.bridges')}>
          {bridges.map((b) => (
            <li key={b.de} className="flex flex-col gap-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <em lang="id">{b.id}</em>
                <span aria-hidden className="text-muted">
                  ←
                </span>
                <span lang="nl">{b.nl}</span>
                <span className="label text-muted">{t('words.dutch')}</span>
                <span aria-hidden className="text-muted">
                  {b.kind === 'off' ? '≠' : '='}
                </span>
                <strong lang="de">{b.de}</strong>
                {b.kind === 'off' && <span className="text-small text-off">{t('words.bridgeOff')}</span>}
              </span>
              {b.note && (
                <span className="text-small">
                  <Prose text={lang === 'en' ? b.note.en : b.note.id} lang={lang} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {falseFriends.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label={t('words.falseFriends')}>
          {falseFriends.map((f) => (
            <li key={f.de} className="flex flex-col gap-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span aria-hidden className="text-off">
                  ⚠
                </span>
                <strong lang="de">{f.de}</strong>
                <span lang="id">= {f.id}</span>
              </span>
              <span className="text-small">
                <Prose text={lang === 'en' ? f.note.en : f.note.id} lang={lang} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {compounds.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label={t('words.compounds')}>
          {compounds.map((c) => (
            <CompoundLine key={c.word} c={c} />
          ))}
        </ul>
      )}
      <Prose text={lang === 'en' ? words.en : words.id} lang={lang} />
    </section>
  );
}

/** Ngobrol: a 2–4 line exchange. */
export function TalkCard({ talk }: { talk: NonNullable<Lesson['talk']> }) {
  const { t, lang } = useT<GermanKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="talk-title">
      <h3 id="talk-title" className="eyebrow">
        {t('lesson.talk')}
      </h3>
      <ol className="flex flex-col gap-4">
        {talk.lines.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <Sentence en={line.de} id={line.id} size="body" />
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

export const SoundStrand: StrandCard = ({ lesson }) => (sl(lesson).sound ? <SoundCard sound={sl(lesson).sound!} /> : null);
export const WorkStrand: StrandCard = ({ lesson }) => (sl(lesson).work ? <WorkCard work={sl(lesson).work!} /> : null);
export const TalkStrand: StrandCard = ({ lesson }) => (sl(lesson).talk ? <TalkCard talk={sl(lesson).talk!} /> : null);
export const TirukanStrand: StrandCard = ({ lesson }) => {
  const x = sl(lesson).tirukan;
  return <TirukanCard line={{ text: x.de, meaning: { id: x.id, ...(x.en ? { en: x.en } : {}) }, raw: x }} />;
};
export const WordsStrand: StrandCard = ({ lesson }) => {
  const data = useLessonData<DeLessonData | undefined>();
  return sl(lesson).words ? <WordsCard words={sl(lesson).words!} data={data} /> : null;
};
