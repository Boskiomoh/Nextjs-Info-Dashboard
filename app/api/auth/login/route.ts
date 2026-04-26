// ============================================================
// FILE: app/api/auth/login/route.ts
// URL:  POST http://localhost:3000/api/auth/login
//
// WHAT IS THIS?
// This is the "bouncer" at the door of your app.
// When the login form submits, it sends email + password HERE.
// This file checks if it's valid and either lets them in or refuses.
//
// HOW REAL AUTH WORKS (simplified):
//   1. User sends email + password
//   2. We find the user in the database by email
//   3. We compare the password to the stored HASH (not plain text!)
//   4. If it matches → create a session token → store in a cookie
//   5. Every future request carries that cookie automatically
//
// WHY COOKIES AND NOT localStorage?
//   localStorage: JavaScript can read it → XSS attacks can steal tokens
//   httpOnly cookies: JavaScript CANNOT read it → much harder to steal
//   This is why we use cookies for auth tokens in secure apps.
//
// NOTE: This is a SIMPLIFIED demo. Production apps use NextAuth.js
// which handles all of this (and more) with battle-tested security.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // ⬅️ NEW: Use bcrypt to handle passwords securely
import { encrypt } from "@/lib/auth"; // ⬅️ NEW: The "Passport Office"

// ── Fake user database ───────────────────────────────────────
// In production: look up the user in a real database
// Password would be a bcrypt hash, not plain text!
//
// Example of what a real hash looks like:
// "$2b$10$abc123xyz..." instead of "password123"
const FAKE_USERS = [
  {
    id: "user_1",
    email: "admin@company.com",
    // 🔐 REAL WORLD: We NEVER store the actual password ("SecurePass123!").
    // We store a "Hash". Even if a hacker steals this database, they 
    // can't turn this string back into the password.
    // Original Password: SecurePass123!
    passwordHash: "$2b$10$Lb/QHyLoDW69xnRQ2yyNDufPgw0jxQIPLYY0gHLspcwojQ5WfwH1O",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "user_2",
    email: "engineer@company.com",
    // Original Password: Engineer456!
    passwordHash: "$2b$10$lhJYwb3COZwod0zmSGlvRuz9KWyYTrMDlPcHLcigh9F.UM4jNCCV2",
    role: "engineer",
    name: "Network Engineer",
  },
];

// ── POST /api/auth/login ──────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── Step 1: Parse the incoming data ─────────────────────────
  // The login form sends JSON: { email: "...", password: "..." }
  let body: { email?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, password } = body;

  // ── Step 2: Validate input ───────────────────────────────────
  // Always check that required fields exist before doing anything
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // ── Step 3: Find the user ────────────────────────────────────
  // In production: const user = await db.users.findOne({ email })
  const user = FAKE_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  // ── Step 4: Check password (The Bcrypt Magic) ────────────────
  //
  // How this works: 
  // 1. We take the "plain text" password the user just typed.
  // 2. We take the "scrambled hash" from our database.
  // 3. Bcrypt runs a complex math function to see if they match.
  //
  // ⚠️ NOTE: You CANNOT do: typedPassword === passwordHash
  // because the hash is totally different every time.
  const isValid = user && (await bcrypt.compare(password, user.passwordHash));

  if (!isValid) {
    // Add a small delay to slow down brute-force attempts
    // In production, use a rate limiter library instead
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { error: "Invalid email or password" }, // Generic message — intentional!
      { status: 401 } // 401 = Unauthorized
    );
  }

  // ── Step 5: Create a session token (THE REAL DEAL) ──────────
  //
  // We use our new "Passport Office" (encrypt) to create a
  // digitally signed JWT. This is what the big companies use.
  const sessionToken = await encrypt({
    userId: user.id,
    role: user.role,
    email: user.email,
  });

  // ── Step 6: Set the session token in a secure cookie ─────────
  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  // Set the cookie on the response
  // This cookie will be sent automatically by the browser on every future request
  response.cookies.set("session_token", sessionToken, {
    httpOnly: true,   // ✅ JavaScript CANNOT read this cookie (prevents XSS theft)
    secure: false,    // Set to TRUE in production (requires HTTPS)
    sameSite: "lax",  // ✅ Prevents CSRF attacks from other websites
    maxAge: 60 * 60 * 8, // 8 hours in seconds — session expires automatically
    path: "/",        // Cookie is sent with ALL requests to this domain
  });

  // Log the login event (in production, send to your security audit log!)
  console.log(`✅ LOGIN: ${user.email} (role: ${user.role}) at ${new Date().toISOString()}`);

  return response;
}
