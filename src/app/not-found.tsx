import { useTranslations } from 'next-intl';

import styles from '@/styles/notFound.module.scss';

// 404 是獨立的整頁版面，不套用 PageLayout（不需要 Header 與標題區塊）
export default function Custom404() {
  const t = useTranslations('Error');

  return (
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
      <div className={styles.text}>{t('404')}</div>
    </div>
  )
}
