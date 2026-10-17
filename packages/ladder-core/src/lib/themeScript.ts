/** A numeric size setting mirrored onto <html> before first paint (e.g. textSize → data-text-size). */
export type SizeAttr = { key: string; attr: string; values: readonly number[] };

export type ThemeScriptOptions = {
  storageKey: string;
  /**
   * Stored `theme: 'system'` is honoured only from this schema version on (English: 2, because the
   * 1 → 2 migration moved the untouched old "system" default to "light"). Omit to always honour it.
   */
  systemThemeSince?: number;
  /** Extra size settings after textSize (e.g. Arabic's arabicSize → data-ar-size). */
  sizes?: readonly SizeAttr[];
  /** When set, the theme-color meta follows the in-app theme (fixes.themeColorFollowsTheme). */
  themeColor?: { light: string; dark: string };
};

const TEXT_SIZE: SizeAttr = { key: 'textSize', attr: 'data-text-size', values: [115, 130] };

const sizeLine = ({ key, attr, values }: SizeAttr) =>
  `if(${values.map((v) => `s.${key}===${v}`).join('||')})d.setAttribute('${attr}',String(s.${key}));\n`;

/**
 * The inline script that runs before first paint so theme, text sizes and motion never flash.
 * Bright (light) is the default; "system" follows the OS only when the learner picked it.
 */
export function buildThemeScript(o: ThemeScriptOptions): string {
  const system = o.systemThemeSince
    ? `(s.theme==='system'&&(o.schemaVersion||0)>=${o.systemThemeSince})`
    : `s.theme==='system'`;
  const meta = o.themeColor
    ? `\nvar k=t==='system'?(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t,
m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',k==='dark'?'${o.themeColor.dark}':'${o.themeColor.light}');`
    : '';
  return `(function(){var d=document.documentElement,t='light';try{
var o=JSON.parse(localStorage.getItem('${o.storageKey}')||'{}'),s=o.settings||{};
if(s.theme==='dark'||${system})t=s.theme;
${[TEXT_SIZE, ...(o.sizes ?? [])].map(sizeLine).join('')}if(s.motion==='reduce')d.setAttribute('data-motion','reduce');
if(s.uiLang==='en')d.setAttribute('lang','en');
}catch(e){}if(t!=='system')d.setAttribute('data-theme',t);${meta}})();`;
}
