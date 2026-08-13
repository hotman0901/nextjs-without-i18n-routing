'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { logoutAction } from '@/actions/logout';
import { Button } from '@/components/ui/button';

export default function SignOutButton() {
  const t = useTranslations('Common');
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          logoutAction();
        })
      }
    >
      {t('signOut')}
    </Button>
  );
}
