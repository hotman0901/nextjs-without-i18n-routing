import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import PageLayout from '@/components/PageLayout';
import ProfileCard from '@/components/ProfileCard';

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
      <div className="flex flex-col gap-4">
        <p>{t('description')}</p>
        <ProfileCard />
      </div>
    </PageLayout>
  );
}
