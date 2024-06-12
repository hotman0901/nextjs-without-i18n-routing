import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // cookies 無法 改用 header
  const headersList = headers();
  // middleware 有塞
  const locale = headersList.get('x-locale') || 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
