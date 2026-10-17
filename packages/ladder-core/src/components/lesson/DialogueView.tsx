'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Dialogue, Rung } from '@ladder/core/lib/types';
import * as store from '@ladder/core/lib/progress/store';
import { rungHref } from '@ladder/core/lib/routes';
import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';
import { IconArrowLeft } from '../ui/Icon';
import { TargetText } from '../ui/TargetText';
import { CheckItemView } from '../check/CheckItemView';
import { Prose } from './Prose';
import { TargetSentence } from './TargetSentence';

/** The dialogue capstone: a conversation with audio and translation, then a few questions. */
export function DialogueView({ rung, dialogue }: { rung: Rung; dialogue: Dialogue }) {
  const { t, lang } = useT();
  const course = useCourse();
  const read = course.adapter.dialogue!;
  const cfg = course.capstones?.dialogue;
  const Badge = cfg?.Badge;
  const TitleTarget = course.components?.TitleTarget;
  const CapWrap = course.capstones?.Wrap ?? NoWrap;
  const title = read.title(dialogue);
  const note = read.note(dialogue);
  const variety = read.variety?.(dialogue);
  const [solved, setSolved] = useState<string[]>([]);
  const allDone = solved.length === dialogue.items.length;
  useEffect(() => {
    if (allDone) store.completeCapstone(rung.id, 'dialogue');
  }, [allDone, rung.id]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-10 border-b border-rule bg-surface">
        <div className="page flex max-w-lesson items-center gap-3 py-2">
          <Link
            href={rungHref(rung.id)}
            aria-label={t('nav.back')}
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-ink hover:bg-paper-2"
          >
            <IconArrowLeft />
          </Link>
          <span className="label text-muted">
            {rung.name} · {t('talk.title')}
          </span>
          {Badge && <Badge />}
        </div>
      </header>

      <CapWrap rung={rung}>
      <main className="page flex max-w-lesson flex-1 flex-col gap-6 py-7">
        <div className="flex flex-col gap-1">
          <p className="eyebrow">
            {t('talk.title')}
            {cfg?.tagKey && <> · {t(cfg.tagKey as never)}</>}
          </p>
          <h1 className="text-h1" lang={lang}>
            {lang === 'en' ? title.en : title.id}
          </h1>
          {TitleTarget ? (
            <TitleTarget title={title} place="dialogue" />
          ) : (
            <TargetText block as="p" size="title" face="display" variety={variety} className="text-muted">
              {title.target}
            </TargetText>
          )}
        </div>

        <section className={`card flex flex-col gap-5 p-5 ${cfg?.edgeClass ?? ''}`} aria-label={title.id}>
          <ol className="flex flex-col gap-5">
            {read.lines(dialogue).map(({ who, line }, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="label text-muted">{who}</span>
                <TargetSentence line={line} use="dialogue" />
              </li>
            ))}
          </ol>
          {note && (
            <div className="text-small text-ink">
              <Prose text={lang === 'en' ? note.en : note.id} lang={lang} />
            </div>
          )}
        </section>

        <section className="flex flex-col gap-6" aria-labelledby="talk-questions">
          <h2 id="talk-questions" className="text-h2">
            {t('read.questions')}
          </h2>
          {dialogue.items.map((item, i) => (
            <div key={item.id} className="flex flex-col gap-3 border-t border-rule pt-5">
              <p className="text-small font-bold tnum text-muted">{t('check.counter', { n: i + 1, total: dialogue.items.length })}</p>
              <CheckItemView
                mode="practice"
                item={item}
                numberKeys={false}
                onSolved={(firstTry) => {
                  store.recordAnswer(item.id, firstTry);
                  setSolved((s) => (s.includes(item.id) ? s : [...s, item.id]));
                }}
              />
            </div>
          ))}
        </section>

        <p aria-live="polite" className="font-bold text-good">
          {allDone ? t('talk.done') : ''}
        </p>
        <Link href={rungHref(rung.id)} className="btn btn-ghost self-start no-underline">
          {t('lesson.backToRung', { rung: rung.name })}
        </Link>
      </main>
      </CapWrap>
    </div>
  );
}

function NoWrap({ children }: { rung: Rung; children: React.ReactNode }) {
  return <>{children}</>;
}
