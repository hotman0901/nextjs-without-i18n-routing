import type {
  NextFetchEvent,
  NextRequest,
  NextResponse as NextResponseType,
} from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIES, PUBLIC_ROUTES, ROUTES } from '@/constants';
import { CustomMiddleware } from '@/middlewares/chain';

export default function withAuth(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponseType,
  ) => {
    // proxy 執行環境要用 request.cookies，next/headers 的 cookies() 在這裡不可用
    const token = request.cookies.get(COOKIES.TOKEN)?.value;
    const { pathname } = request.nextUrl;

    const isPublic = PUBLIC_ROUTES.includes(pathname);

    // 未登入：除了公開路徑，其他一律擋下
    if (!isPublic && !token) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }

    // 已登入還停在登入頁就直接送進 dashboard
    if (isPublic && token) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.DASHBOARD;
      return NextResponse.redirect(url);
    }

    return middleware(request, event, response);
  };
}
