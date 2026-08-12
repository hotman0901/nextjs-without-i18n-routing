import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants';
import { CustomMiddleware } from '@/middlewares/chain'

export default function withAuth(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // proxy 執行環境要用 request.cookies，next/headers 的 cookies() 在這裡不可用
    const token = request.cookies.get(COOKIES.TOKEN)?.value;

    // TODO: 這裡還沒有任何保護邏輯。要啟用時在此比對 PROTECTED_URL
    // 並在缺少 token 時 return NextResponse.redirect(...)
    if (token) {
      response.headers.set('x-authenticated', 'true');
    }

    return middleware(request, event, response);
  };
}
