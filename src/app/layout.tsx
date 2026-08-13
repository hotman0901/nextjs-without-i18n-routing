import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

import Providers from '@/components/Providers';

type Props = {
  children: ReactNode;
};

// 用 generateMetadata 而非靜態 metadata，title/description 才會跟著語系走
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('Metadata');

  return {
    title: {
      default: t('title'),
      // 各頁面設定自己的 title 時會套用這個樣板
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children }: Props) {
  // i18n.ts 這邊有塞語系
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster />
            <NuqsAdapter>{children}</NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
