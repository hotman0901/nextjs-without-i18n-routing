'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { Profile } from '@/app/api/profile/route';
import { API } from '@/constants';

async function fetchProfile(): Promise<Profile> {
  const res = await fetch(API.PROFILE);

  if (!res.ok) {
    throw new Error(`Request failed with ${res.status}`);
  }

  return res.json();
}

// react-query 的使用範例：呼叫 Route Handler 取得目前登入的使用者
export default function ProfileCard() {
  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');

  const { data, isPending, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  if (isPending) {
    return <p className="text-muted-foreground">{tCommon('loading')}</p>;
  }

  if (isError) {
    return <p className="text-destructive">{t('profileError')}</p>;
  }

  return (
    <div className="rounded-lg border p-4">
      <p className="font-medium">{t('welcome', { name: data.name })}</p>
      <p className="text-sm text-muted-foreground">{data.signedInAt}</p>
    </div>
  );
}
