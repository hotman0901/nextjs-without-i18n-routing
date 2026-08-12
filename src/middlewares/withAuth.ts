import type { NextFetchEvent, NextRequest, NextResponse as NextResponseType } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIES, PROTECTED_URL,ROUTES } from '@/constants';
import { CustomMiddleware } from '@/middlewares/chain'

export default function withAuth(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponseType
  ) => {
    // proxy 執行環境要用 request.cookies，next/headers 的 cookies() 在這裡不可用
    const token = request.cookies.get(COOKIES.TOKEN)?.value;

    const isProtected = Object.values(PROTECTED_URL).some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtected && !token) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }

    return middleware(request, event, response);
  };
}
