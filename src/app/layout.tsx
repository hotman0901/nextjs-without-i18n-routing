import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import Providers from '@/components/Providers';

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  // i18n.ts 這邊有塞語系
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>next-intl</title>
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Toaster />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
