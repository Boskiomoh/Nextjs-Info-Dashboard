// ============================================================
// FILE: middleware.ts   ← MUST be in the project ROOT (not /app)
//
// WHAT IS MIDDLEWARE?
// Imagine every page request has to walk through a hallway
// before reaching the actual room (page).
// Middleware is a security guard standing in that hallway.
// It runs BEFORE any page or API route loads.
//
// WHY THIS MATTERS FOR SECURITY:
// Without middleware, a user could just type /dashboard in
// their browser and potentially see the page even if not logged in
// (depending on how fast the redirect happens).
//
// With middleware, the redirect happens at the EDGE — before
// any page code runs at all. It's the first line of defence.
//
// HOW IT WORKS:
//   1. User requests /dashboard
//   2. Middleware intercepts the request FIRST
//   3. Checks for a valid session cookie
//   4. If no cookie → immediately redirect to /login (page never loads)
//   5. If valid cookie → let the request through to the dashboard
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// ── Which routes need protection? ────────────────────────────
// Any URL starting with these paths requires a login.
const PROTECTED_ROUTES = [
  "/dashboard",
  "/devices",
  "/settings",
  "/admin",
];

// ── Which routes are PUBLIC (login, home, etc.)? ─────────────
// These are always accessible, even without a session.
const PUBLIC_ROUTES = ["/login", "/", "/api/auth/login"];

// ── The Middleware Function ───────────────────────────────────
// Next.js automatically calls this on every request.
// "request" contains all info about what the user is asking for.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // e.g. "/dashboard" or "/login"

  // ── Check if this route needs protection ─────────────────────
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a public route, let it through immediately
  if (!isProtected) {
    return NextResponse.next();
  }

  // ── Read the session cookie ───────────────────────────────────
  // We can't call our getSession() helper here because middleware
  // runs in a special "Edge Runtime" environment.
  // So we just check if the cookie EXISTS (the page itself will
  // fully verify the token's contents).
  const sessionToken = request.cookies.get("session_token")?.value;

  if (!sessionToken) {
    // No session cookie → user is not logged in → redirect to login
    // We also save where they were trying to go so we can
    // send them back after they log in (UX improvement)
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // e.g. /login?from=/dashboard

    console.log(`🚫 BLOCKED: Unauthenticated access attempt to ${pathname}`);

    return NextResponse.redirect(loginUrl);
  }

  // ── Session exists → let the request through ─────────────────
  // The actual page/route will do a full verification of the token.
  return NextResponse.next();
}

// ── Config: which routes does this middleware apply to? ───────
// "matcher" tells Next.js which URLs to run middleware on.
// We exclude static files (_next, images, favicon) for performance.
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (Next.js build files)
     * - _next/image  (Next.js image optimization)
     * - favicon.ico
     * - Files with extensions (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
