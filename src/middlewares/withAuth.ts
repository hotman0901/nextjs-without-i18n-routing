import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants';
import { CustomMiddleware } from '@/middlewares/chain'

export default function withAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // proxy/middleware 執行環境要用 request.cookies，next/headers 的 cookies() 在這裡不可用
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = request.cookies.get(COOKIES.TOKEN)?.value;
    const response = NextResponse.next();
    return middleware(request, event, response);
  };
}
