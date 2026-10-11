import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, isValidAdminToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = await isValidAdminToken(token);

  // 1. If user is on the login page
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // Already authenticated, redirect to admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Protect mutating API routes (creating/editing/deleting blogs and uploading images)
  const isApiRoute =
    pathname.startsWith("/api/blogs") || pathname.startsWith("/api/upload");

  if (isApiRoute && request.method !== "GET") {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized: Admin session required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/blogs/:path*",
    "/api/upload/:path*",
  ],
};
