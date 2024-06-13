import { cookies,headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get('x-locale')?.value || 'en';
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
