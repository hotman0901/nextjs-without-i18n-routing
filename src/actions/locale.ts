'use server';

import { cookies } from 'next/headers';

import { COOKIES } from '@/constants';
import { type Locale } from '@/i18n/routing';

// 在 server 寫 cookie，寫入與重新渲染在同一個 request 內完成，
// 不像 client 端寫 cookie 再 refresh 那樣有競態
export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIES.LOCALE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
