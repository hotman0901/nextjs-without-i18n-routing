// 'use client';
import { useTranslations } from 'next-intl';

import PageLayout from '@/components/PageLayout';
import styles from '@/styles/notFound.module.scss';

export default function Custom404() {
  const t = useTranslations('Error');

  return (
    <PageLayout title={t('404')} code={'404'}>
      <div className={styles.notFound}>
        <div className={styles.morty}>
          <div className={styles.hair}></div>
          <div className={styles.ears}></div>
          <div className={styles.face}></div>
          <div className={styles.eyes}></div>
          <div className={styles.nose}></div>
          <div className={styles.mouth}></div>
          <div className={styles.lines}></div>
        </div>
        <div className={styles.text}>ERROR 404</div>
      </div>
    </PageLayout>
  )
}
