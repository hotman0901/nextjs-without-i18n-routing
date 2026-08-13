import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { CustomMiddleware } from '@/middlewares/chain';

const PUBLIC_FILE = /\.(.*)$/;

export default function withPublicStatic(middleware: CustomMiddleware) {
  return async (
    req: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // 靜態資源與 api 直接放行，不進入後續 middleware
    if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return response;
    }

    return middleware(req, event, response);
  };
}
