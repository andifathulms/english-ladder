import { STORAGE_KEY } from '@/lib/progress/constants';

// Runs before first paint so theme, text size and motion never flash.
export const themeScript = `(function(){try{
var d=document.documentElement,s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}').settings||{};
if(s.theme==='light'||s.theme==='dark')d.setAttribute('data-theme',s.theme);
if(s.textSize===115||s.textSize===130)d.setAttribute('data-text-size',String(s.textSize));
if(s.motion==='reduce')d.setAttribute('data-motion','reduce');
if(s.uiLang==='en')d.setAttribute('lang','en');
}catch(e){}})();`;
