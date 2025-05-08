import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const getUrl = request.nextUrl.pathname;

  const isPublicUrl = getUrl === "/login" || getUrl === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicUrl && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
