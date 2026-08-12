export const LOCALES = ['en', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value?: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
