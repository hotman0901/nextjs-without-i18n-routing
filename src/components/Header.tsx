'use client';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { COOKIES } from '@/constants';
import { type Locale, LOCALES } from '@/i18n/routing';

export default function Header() {
  const router = useRouter()
  const changeLanguage = (lan: Locale) => {
    const oldLan = getCookie(COOKIES.LOCALE)
    if (lan !== oldLan) {
      setCookie(COOKIES.LOCALE, lan, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
      router.refresh()
    }
  }

  return (
    <div>
      <Button onClick={() => router.push('/about')}>About</Button>
      <Button onClick={() => router.push('/')}>Home</Button>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Change Language</h2>
      {LOCALES.map((locale) => (
        <Button key={locale} onClick={() => changeLanguage(locale)}>
          {locale}
        </Button>
      ))}
    </div>
  )
}
