// ============================================================
// FILE: lib/auth.ts
//
// WHAT IS THIS?
// A "helper" file. Think of it as a toolbox you can import
// in any file that needs to check "is this person logged in?"
//
// WHY A SEPARATE FILE?
// Instead of copy-pasting the same auth logic into every page,
// we write it once here and import it wherever needed.
// This is a core coding principle: DRY = Don't Repeat Yourself.
//
// WHAT IS A SESSION?
// When you log in successfully, the server creates a "session" —
// a record that says "this cookie belongs to user X".
// Every request the browser makes includes that cookie automatically.
// The server reads it to know who is making the request.
// ============================================================

import { cookies } from "next/headers"; // Next.js built-in: reads cookies on the server
import { SignJWT, jwtVerify } from "jose"; // ⬅️ NEW: The real-world library for secure tokens

// ── The Secret Key ──────────────────────────────────────────
// In the real world, this comes from .env.local
// It's like the "official stamp" used to sign the passport.
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_local_dev_only"
);

// ── How long should the session last? ────────────────────────
const SESSION_EXPIRY = "8h"; // 8 hours

// ── Type: what a decoded session looks like ──────────────────
export type Session = {
  userId: string;
  email: string;
  role: "admin" | "engineer" | "viewer";
  expires: Date; // Added: so we know exactly when the "wristband" expires
};

// ── encrypt() ────────────────────────────────────────────────
// Creates a real, signed JWT.
// This is the "Passport Office" where we create the ID.
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Use the industry-standard algorithm
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(SECRET); // Sign it with our secret "stamp"
}

// ── decrypt() ────────────────────────────────────────────────
// Verifies the signature of the JWT.
// This is the "Customs Officer" who checks if the stamp is real.
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
}

// ── getSession() ─────────────────────────────────────────────
// Call this in any Server Component or API route to check if
// the current user is logged in.
//
// Returns: the session object if logged in, or null if not.
//
// Usage:
//   const session = await getSession();
//   if (!session) redirect("/login");
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return null;

    // 🛡️ REAL WORLD: Verify the token
    // If the user changed even ONE letter in their token,
    // this will FAIL and return null. Tamper-proof!
    const payload = await decrypt(token);

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as "admin" | "engineer" | "viewer",
      expires: new Date(payload.exp! * 1000),
    } as Session;
  } catch {
    // If signature is invalid, token is expired, or tampered with
    return null;
  }
}

// ── isAdmin() ────────────────────────────────────────────────
// Convenience helper — check if the logged-in user is an admin.
// Use this to guard admin-only actions.
//
// Usage:
//   if (!(await isAdmin())) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "admin";
}

// ── requireSession() ─────────────────────────────────────────
// A stricter version of getSession().
// Use in pages/routes where a logged-in user is REQUIRED.
// Throws an error if not logged in (caller handles the redirect).
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }
  return session;
}
