'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import PageLayout from '@/components/PageLayout';
import { useBearStore } from '@/store/count';

export default function Index() {
  const t = useTranslations('Index');
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <Link href="/about">{t('navigateToAbout')}</Link>
      <h3>store: {bears}</h3>
      <button onClick={() => increase()}>increase</button>
    </PageLayout>
  );
}
