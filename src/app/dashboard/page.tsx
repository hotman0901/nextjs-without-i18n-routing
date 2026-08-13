import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import PageLayout from '@/components/PageLayout';

// 頁面層級的 metadata：會套用 layout 定義的 `%s | ...` 樣板
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Dashboard');

  return {
    title: t('title'),
    description: t('description'),
  };
}

// 受 withAuth 保護：沒有 token 時會在 proxy 就被導向 /login
export default function Dashboard() {
  const t = useTranslations('Dashboard');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
    </PageLayout>
  );
}
