export const COOKIES = {
  TOKEN: 'tokenJWT',
  LOCALE: 'x-locale',
};

export const API = {
  LOGIN: '/api/auth/login',
};

export const ROUTES = {
  LOGIN: '/login',
};

// 這些路徑（含子路徑）沒有 token 時會被導向 ROUTES.LOGIN
export const PROTECTED_URL = {
  DASHBOARD: '/dashboard',
};
