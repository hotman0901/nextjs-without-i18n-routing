// 'use client';
import { useTranslations } from 'next-intl';

import PageLayout from '@/components/PageLayout';

export default function Custom404() {
  const t = useTranslations('Error');

  return (
    <PageLayout title={t('404')} code={'404'}>
      <div className='notFound'>
        <div className="morty">
          <div className="hair"></div>
          <div className="ears"></div>
          <div className="face"></div>
          <div className="eyes"></div>
          <div className="nose"></div>
          <div className="mouth"></div>
          <div className="lines"></div>
        </div>
        <div className='text'>ERROR 404</div>
      </div>
    </PageLayout>
  )
}
