import { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

function compose(functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = compose(functions, index + 1);
    return current(next);
  }

  // 鏈的終點：回傳一路傳遞下來的 response
  return (request, event, response) => response;
}

/**
 * Next 只會傳入 (request, event)，所以初始的 response 由這裡建立一次，
 * 再沿著整條鏈傳遞 — 每一層對它做的修改才不會被下一層丟掉。
 */
export function chain(functions: MiddlewareFactory[]) {
  const middleware = compose(functions);

  return (request: NextRequest, event: NextFetchEvent) =>
    middleware(request, event, NextResponse.next());
}
