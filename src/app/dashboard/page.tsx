import { useTranslations } from 'next-intl';

import PageLayout from '@/components/PageLayout';

// 受 withAuth 保護：沒有 token 時會在 proxy 就被導向 /login
export default function Dashboard() {
  const t = useTranslations('Dashboard');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
    </PageLayout>
  );
}
