'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LessonSummary, Rung } from '@ladder/core/lib/types';
import { missedCount } from '@ladder/core/lib/progress/derive';
import { lessonHref } from '@ladder/core/lib/routes';
import { useProgress, useT } from './ProgressProvider';
import { useCourse } from '@ladder/core/course/context';
import { PageShell } from './ui/PageShell';
import { Segmented } from './ui/Segmented';
import { PlayButton } from './lesson/PlayButton';
import { IconBook, IconSearch } from './ui/Icon';
import { usePlay, useSpeak } from './useSpeech';

type Props = { lessons: LessonSummary[]; rungs?: Rung[]; wordData?: unknown; tabData?: unknown };

export function WordsView({ lessons, rungs = [], wordData, tabData }: Props) {
  const { t, lang } = useT();
  const course = useCourse();
  const play = usePlay();
  // fixes.wordsGroupLabel: groups across rungs, in rung order, labelled with the rung.
  const byRung = !!course.fixes?.wordsGroupLabel;
  const rungIndex = (id: string) => rungs.findIndex((r) => r.id === id);
  const rungName = (id: string) => rungs.find((r) => r.id === id)?.name ?? id;
  const Row = course.words?.Row;
  const matches = course.words?.match;
  const progress = useProgress();
  const speak = useSpeak();
  const [q, setQ] = useState('');
  const [only, setOnly] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(false);
  // words.tabs: more tabs (e.g. word decks), each opened by its #hash; '' is My words.
  const tabs = course.words?.tabs;
  const [onTab, setOnTab] = useState('');
  useEffect(() => {
    if (!tabs) return;
    const sync = () => {
      const h = window.location.hash.slice(1);
      setOnTab(tabs.list.some((x) => x.hash === h) ? h : '');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [tabs]);

  const opened = lessons
    .filter((l) => progress.opened.includes(l.id))
    .sort((a, b) => (byRung ? rungIndex(a.rung) - rungIndex(b.rung) : 0) || a.order - b.order);
  const total = opened.reduce((n, l) => n + l.glossary.length, 0);
  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return opened
      .filter((l) => (!only || l.id === only) && (!mistakes || missedCount(l, progress) > 0))
      .map((l) => ({
        l,
        words: l.glossary.filter((g) =>
          matches ? matches(g, q) : !needle || g.text.toLowerCase().includes(needle) || g.meaning.id.toLowerCase().includes(needle),
        ),
      }))
      .filter((g) => g.words.length);
  }, [opened, q, only, mistakes, progress]);

  const chip = (on: boolean) =>
    `min-h-touch shrink-0 rounded-full px-4 text-small font-bold transition-colors duration-quick ${
      on ? 'bg-ink text-paper' : 'bg-surface text-ink shadow-e1 hover:bg-paper-2'
    }`;

  const list = (
    <>
      {total === 0 ? (
        <div className="card flex flex-col items-start gap-3 p-5">
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-md bg-paper-2 text-muted">
            <IconBook size={24} />
          </span>
          <p className="max-w-measure text-muted">{t('words.empty')}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <label className="flex min-h-[48px] items-center gap-2 rounded-lg bg-surface px-3 text-muted shadow-e1 focus-within:outline focus-within:outline-2 focus-within:outline-accent">
              <IconSearch />
              <span className="sr-only">{t('words.search')}</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('words.searchPlaceholder')}
                dir={matches && course.target.dir === 'rtl' ? 'auto' : undefined}
                className="min-h-touch min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
              />
            </label>
            <div className="relative -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1" role="group" aria-label={t('rung.lessons')}>
              <button type="button" aria-pressed={!only} className={chip(!only)} onClick={() => setOnly(null)}>
                {t('words.all')}
              </button>
              {opened.map((l) => (
                <button key={l.id} type="button" aria-pressed={only === l.id} className={chip(only === l.id)} onClick={() => setOnly(l.id)}>
                  {byRung ? (
                    <>
                      {rungName(l.rung)} · <span className="tnum">{l.order}</span>
                    </>
                  ) : (
                    <>
                      <span className="tnum">{l.order}</span> · <span lang={course.target.lang} dir={course.target.dir}>{l.title.target}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
            <label className="flex min-h-touch items-center gap-2 text-small">
              <input
                type="checkbox"
                checked={mistakes}
                onChange={(e) => setMistakes(e.target.checked)}
                className="h-[20px] w-[20px]"
                style={{ accentColor: 'var(--accent)' }}
              />
              {t('words.mistakesOnly')}
            </label>
          </div>
          {groups.length === 0 ? (
            <p className="text-muted">{t('words.noMatch')}</p>
          ) : (
            groups.map(({ l, words }) => (
              <section key={l.id} className="flex flex-col gap-2">
                <h2 className="eyebrow">
                  <Link href={lessonHref(l)} className="text-muted no-underline hover:text-accent">
                    {byRung ? t('words.group', { rung: rungName(l.rung), n: l.order }) : t('home.lessonN', { n: l.order })} · {course.titles === 'ui' ? (
                      lang === 'en' ? l.title.en : l.title.id
                    ) : (
                      <span lang={course.target.lang} dir={course.target.dir}>{l.title.target}</span>
                    )}
                  </Link>
                </h2>
                <ul className="card flex flex-col divide-y divide-rule overflow-hidden">
                  {words.map((w) => {
                    if (Row) return <Row key={w.key} word={w} rungs={rungs} lessons={lessons} data={wordData} />;
                    const ann = course.extraData?.wordAnnotator?.(w, wordData) ?? {};
                    return (
                      <li key={w.key} className="flex min-h-[60px] items-center gap-3 px-4 py-2">
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span lang={course.target.lang} dir={course.target.dir} className="font-display text-body font-semibold">
                            {w.text}
                            {ann.pluralSuffix && (
                              <span className="font-medium text-muted"> → {ann.pluralSuffix}</span>
                            )}
                          </span>
                          <span lang="id" className="id-text text-small">
                            {w.meaning.id}
                          </span>
                        </span>
                        {ann.badge && (
                          <span lang={course.target.lang} dir={course.target.dir} className="label rounded-sm bg-accent-soft px-2 py-[2px] normal-case tracking-normal text-accent">
                            {ann.badge}
                          </span>
                        )}
                        <PlayButton text={w.text} onPlay={() => void (course.audio ? play(w.text) : speak(w.text))} small />
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </>
      )}
    </>
  );

  if (tabs) {
    const choose = (hash: string) => {
      setOnTab(hash);
      history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
    };
    const Panel = tabs.list.find((x) => x.hash === onTab)?.Panel;
    return (
      <PageShell title={t(tabs.titleKey as never)}>
        <Segmented<string>
          label={t(tabs.titleKey as never)}
          value={onTab}
          onChange={choose}
          options={[{ value: '', label: t('words.title') }, ...tabs.list.map((x) => ({ value: x.hash, label: t(x.labelKey as never) }))]}
        />
        {Panel ? (
          <Panel data={tabData} />
        ) : (
          <>
            {total > 0 && <p className="text-body text-muted">{t('words.subtitle', { n: total, l: opened.length })}</p>}
            {list}
          </>
        )}
      </PageShell>
    );
  }

  return (
    <PageShell
      title={t('words.title')}
      subtitle={total > 0 ? t('words.subtitle', { n: total, l: opened.length }) : undefined}
    >
      {list}
    </PageShell>
  );
}
