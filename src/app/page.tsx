'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button"
import { useBearStore } from '@/store/count';

export default function Index() {
  const t = useTranslations('Index');
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <Link href="/about">{t('navigateToAbout')}</Link>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">store: {bears}</h3>
      <Button onClick={() => increase()}>increase</Button>
      <Button onClick={() => toast.error('hello')}>toast</Button>
    </PageLayout>
  );
}
