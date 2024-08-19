'use client';
import { useTranslations } from 'next-intl';

import PageLayout from '@/components/PageLayout';

export default function Custom404() {
  const t = useTranslations('Error');

  return (
    <PageLayout title={t('404')}>
      <h1>{t('404')}</h1>
    </PageLayout>
  )
}
