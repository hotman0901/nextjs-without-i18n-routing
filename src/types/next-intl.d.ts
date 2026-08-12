import type { Locale } from '@/i18n/routing';

import type messages from '../../messages/en.json';

// 讓 t('...') 具備 key 的自動完成與編譯期檢查，
// 並讓其他語系檔缺 key 時能被發現
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
