'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // 這裡可以接上錯誤回報服務
    console.error(error);
  }, [error]);

  const t = useTranslations('Error');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <Button onClick={reset}>{t('retry')}</Button>
    </div>
  );
}
