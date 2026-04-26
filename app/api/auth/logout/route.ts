// ============================================================
// FILE: app/api/auth/logout/route.ts
// URL:  POST http://localhost:3000/api/auth/logout
//
// WHAT IS THIS?
// The logout endpoint. When called, it deletes the session cookie.
// Without the cookie, the user is no longer "logged in" —
// the middleware will redirect them to /login on next visit.
//
// WHY POST AND NOT GET?
// Logout changes state (deletes a session), so it should be POST.
// A GET request could be triggered accidentally (e.g. a link preview
// or browser prefetch), which would log the user out unexpectedly.
// Actions that change things = POST, PUT, DELETE.
// Actions that only read things = GET.
// ============================================================

import { NextResponse } from "next/server";

export async function POST() {
  // Create a response that redirects to the login page
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
  );

  // Delete the session cookie by setting it with maxAge = 0
  // This immediately expires the cookie in the browser
  response.cookies.set("session_token", "", {
    httpOnly: true,
    secure: false,   // true in production
    sameSite: "lax",
    maxAge: 0,       // 0 = delete immediately
    path: "/",
  });

  console.log(`🔒 LOGOUT: Session cleared at ${new Date().toISOString()}`);

  return response;
}
