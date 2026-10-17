import { STORAGE_KEY } from '@ladder/core/lib/progress/constants';

// Runs before first paint so theme, text size and motion never flash.
// Bright (light) is the default; "system" follows the OS only when the learner picked it.
export const themeScript = `(function(){var d=document.documentElement,t='light';try{
var o=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}'),s=o.settings||{};
if(s.theme==='dark'||(s.theme==='system'&&(o.schemaVersion||0)>=2))t=s.theme;
if(s.textSize===115||s.textSize===130)d.setAttribute('data-text-size',String(s.textSize));
if(s.motion==='reduce')d.setAttribute('data-motion','reduce');
if(s.uiLang==='en')d.setAttribute('lang','en');
}catch(e){}if(t!=='system')d.setAttribute('data-theme',t);})();`;
