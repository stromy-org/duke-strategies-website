/** Locale-aware field accessor for Localized<T> objects. */

export type SupportedLocale = 'en' | 'nl';

export type Localized<T> = { en: T; nl?: T };

export const defaultLocale: SupportedLocale = 'en';
export const locales: SupportedLocale[] = ['en', 'nl'];

export function pickLocale<T>(field: Localized<T>, lang: SupportedLocale): T {
  return field[lang] ?? field.en;
}
