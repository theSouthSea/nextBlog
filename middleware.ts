import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // 1.上报日记
  console.log("middleware-request.nextUrl.href=", request.nextUrl.href);
  console.log("middleware-request.referrer=", request.referrer);
  // Error: The request.ua has been removed in favour of `userAgent` function.
  // console.log("middleware-request.ua=", request.ua);
  console.log("middleware-request.geo=", request.geo);
  console.log("middleware-request.url=", request.url);
  // 2.重定向
  // if (request.nextUrl.pathname === "/tag") {
  //   return NextResponse.redirect(new URL("/user/2", request.url));
  // }
  // return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/about/:path*",
  // matcher: "/abc",
  // matcher: "/*",
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

