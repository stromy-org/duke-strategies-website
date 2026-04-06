import en from './ui.en';
import nl from './ui.nl';
import type { UIKey } from './ui.en';
import { defaultLocale, type SupportedLocale } from './pickLocale';

const ui: Record<SupportedLocale, Record<string, string>> = {
  en: en as Record<string, string>,
  nl: { ...en, ...nl } as Record<string, string>,
};

export function getLocaleFromUrl(url: URL): SupportedLocale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'nl') return lang;
  return defaultLocale;
}

export function useTranslations(lang: SupportedLocale) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLocale][key] ?? key;
  };
}

export function localizedPath(path: string, lang: SupportedLocale): string {
  // With prefix-default routing, every locale gets a prefix
  const cleanPath = path.replace(/^\/(en|nl)/, '') || '/';
  return `/${lang}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(en|nl)/, '') || '/';
}
