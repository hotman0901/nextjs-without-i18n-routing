'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useTransition } from 'react';

import { setLocale } from '@/actions/locale';
import SignOutButton from '@/components/SignOutButton';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { type Locale, LOCALES } from '@/i18n/routing';

type MenuBtnProps = {
  href: string;
  children: ReactNode;
};

const MenuBtn = ({ href, children }: MenuBtnProps) => {
  const router = useRouter();
  // usePathname 只回傳路徑（不含 query 與 hash），例如 /demo
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      disabled={isActive}
      variant={isActive ? 'secondary' : 'default'}
      aria-current={isActive ? 'page' : undefined}
      onClick={() => router.push(href)}
    >
      {children}
    </Button>
  );
};

// Header 只會出現在登入後的頁面（登入頁沒有套用 PageLayout）
export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Common');
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (next: Locale) => {
    if (next === locale) return;

    startTransition(() => {
      setLocale(next);
    });
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 border-b pb-4">
      <MenuBtn href={ROUTES.DASHBOARD}>{t('dashboard')}</MenuBtn>
      <MenuBtn href={ROUTES.DEMO}>{t('demo')}</MenuBtn>
      <MenuBtn href={ROUTES.ABOUT}>{t('about')}</MenuBtn>

      <span className="mx-2 text-sm text-muted-foreground">
        {t('changeLanguage')}
      </span>
      {LOCALES.map((item) => (
        <Button
          key={item}
          disabled={isPending || item === locale}
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
  );
}
