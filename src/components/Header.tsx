'use client';
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { setLocale } from '@/actions/locale';
import { Button } from '@/components/ui/button'
import { type Locale, LOCALES } from '@/i18n/routing';

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
    <div>
      <Button onClick={() => router.push('/about')}>{t('about')}</Button>
      <Button onClick={() => router.push('/')}>{t('home')}</Button>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Change Language</h2>
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
    </div>
  )
}
