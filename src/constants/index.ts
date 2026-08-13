export const COOKIES = {
  TOKEN: 'tokenJWT',
  LOCALE: 'x-locale',
};

export const API = {
  PROFILE: '/api/profile',
};

export const ROUTES = {
  // 首頁就是登入頁
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  DEMO: '/demo',
  ABOUT: '/about',
};

/**
 * 預設全部需要登入。只有這裡列出的路徑可以在沒有 token 的情況下瀏覽，
 * 其餘一律導向 ROUTES.LOGIN。
 */
export const PUBLIC_ROUTES: string[] = [ROUTES.LOGIN];
