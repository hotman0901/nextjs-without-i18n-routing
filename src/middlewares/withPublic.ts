import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
import { CustomMiddleware } from "@/middlewares/chain";

export default function withAuth(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    if (
      req.nextUrl.pathname.startsWith("/_next") ||
      req.nextUrl.pathname.includes("/api/") ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return;
    }
    return middleware(req, event, response);
  };
}
