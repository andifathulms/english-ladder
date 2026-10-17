import { parseInline } from '@ladder/core/lib/markup';
import { useCourse } from '@ladder/core/course/context';

/**
 * Explanation text. Paragraphs split on blank lines. In prose, **bold** marks target-language
 * words and *italic* marks Indonesian phrases, matching the app's type conventions.
 */
export function Prose({ text, lang }: { text: string; lang: 'id' | 'en' }) {
  const { target, prose } = useCourse();
  const Term = prose?.Term;
  const Text = prose?.Text;
  return (
    <div lang={lang} className="flex max-w-measure flex-col gap-3">
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i}>
          {parseInline(para.replace(/\s*\n\s*/g, ' ')).map((tok, j) => {
            if (tok.t === 'strong')
              return Term ? (
                <Term key={j} text={tok.v} kind="strong" />
              ) : (
                <strong key={j} lang={target.lang} dir={target.dir} className="font-bold text-accent">
                  {tok.v}
                </strong>
              );
            if (tok.t === 'em')
              return (
                <em key={j} lang={lang === 'en' ? 'id' : undefined}>
                  {Text ? <Text text={tok.v} /> : tok.v}
                </em>
              );
            if (tok.t === 'focus')
              return Term ? (
                <Term key={j} text={tok.v} kind="focus" />
              ) : (
                <span key={j} lang={target.lang} dir={target.dir} className="focus-word">
                  {tok.v}
                </span>
              );
            return <span key={j}>{Text ? <Text text={tok.v} /> : tok.v}</span>;
          })}
        </p>
      ))}
    </div>
  );
}
