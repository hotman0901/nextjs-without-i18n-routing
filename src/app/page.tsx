import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import LoginForm from '@/components/LoginForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');

  return {
    title: t('title'),
  };
}

// 首頁即登入頁。已登入的話會在 proxy 就被導向 /dashboard
export default function Home() {
  return <LoginForm />;
}
