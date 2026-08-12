import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { COOKIES } from '@/constants';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/routing';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIES.LOCALE)?.value;
  // 未驗證就直接 import 會讓任意 cookie 值造成執行期錯誤
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
