'use client';
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { setLocale } from '@/actions/locale';
import SignOutButton from '@/components/SignOutButton';
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants';
import { type Locale, LOCALES } from '@/i18n/routing';

// Header 只會出現在登入後的頁面（登入頁沒有套用 PageLayout）
export default function Header() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Common')
  const [isPending, startTransition] = useTransition()

  const changeLanguage = (next: Locale) => {
    if (next === locale) return

    startTransition(() => {
      setLocale(next)
    })
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 border-b pb-4">
      <Button onClick={() => router.push(ROUTES.DASHBOARD)}>
        {t('dashboard')}
      </Button>
      <Button onClick={() => router.push('/demo')}>{t('demo')}</Button>
      <Button onClick={() => router.push('/about')}>{t('about')}</Button>

      <span className="mx-2 text-sm text-muted-foreground">
        {t('changeLanguage')}
      </span>
      {LOCALES.map((item) => (
        <Button
          key={item}
          disabled={isPending}
          variant={item === locale ? 'default' : 'outline'}
          onClick={() => changeLanguage(item)}
        >
          {item}
        </Button>
      ))}

      <span className="ml-auto">
        <SignOutButton />
      </span>
    </div>
  )
}
