import '@/styles/globals.css'

import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

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
      <body
          className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Toaster />
            <NuqsAdapter>{children}</NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
