import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Skip redirection if already on a login page
    if (path.includes("/login")) {
      return NextResponse.next();
    }

    // If not logged in and trying to access protected routes
    if (!token) {
      if (path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/login", req.url));
      }
      if (path.startsWith("/pos")) {
        return NextResponse.redirect(new URL("/pos/login", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based protection for logged-in users
    if (path.startsWith("/dashboard") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/login?error=AccessDenied", req.url));
    }

    if (path.startsWith("/pos") && token.role !== "KASIR" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/pos/login?error=AccessDenied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true to always allow the middleware function to run, 
      // where we handle custom redirects
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/pos/:path*"],
};
