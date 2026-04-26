// ============================================================
// FILE: app/layout.tsx
//
// WHAT IS THIS?
// The root layout is the "frame" that wraps EVERY single page
// in your entire app — like the walls of a building.
// Every page renders inside the {children} slot here.
//
// FILE STRUCTURE VISUAL:
//
//  ┌─────────────────────────────────┐
//  │  <html>                         │
//  │    <body>                       │
//  │      <Navbar user={session} />  │  ← always visible
//  │      ┌───────────────────────┐  │
//  │      │  {children}           │  │  ← changes per page
//  │      │  (dashboard, login,   │  │
//  │      │   settings, etc.)     │  │
//  │      └───────────────────────┘  │
//  │    </body>                      │
//  │  </html>                        │
//  └─────────────────────────────────┘
//
// HOW THE SESSION FLOWS:
//   1. Browser sends a request with the session cookie
//   2. This layout (Server Component) reads the cookie via getSession()
//   3. Passes the user info as a PROP to the Navbar
//   4. Navbar (Client Component) displays the name/role/logout button
//
// WHY IS THIS PATTERN SECURE?
//   - The cookie is read on the SERVER (safe)
//   - The Navbar only receives the display data it needs (name, role)
//   - Raw session tokens never touch the browser JavaScript
// ============================================================

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

// ── Fonts ─────────────────────────────────────────────────────
// next/font automatically self-hosts fonts — no Google tracking in production
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Site-Wide Metadata ────────────────────────────────────────
// Individual pages can override title using their own metadata export.
// This is the default/fallback for pages that don't set their own.
export const metadata: Metadata = {
  title: "SecureNet | Network Infrastructure Portal",
  description: "Monitor and manage your company network infrastructure securely",
};

// ── Root Layout ───────────────────────────────────────────────
// "async" because we need to await getSession() to read the cookie
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the session on the server — safe, runs before the page loads
  // Returns null if the user is not logged in
  const session = await getSession();

  // Build the user object to pass to Navbar
  // We only pass what the Navbar actually needs to display
  // (not the full session token or any sensitive data)
  const navUser = session
    ? {
        name: session.email.split("@")[0], // "admin" from "admin@company.com"
        email: session.email,
        role: session.role,
      }
    : null;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ background: "#0f0f1a" }} // Dark background for the whole app
    >
      <body style={{ margin: 0, minHeight: "100vh", background: "#0f0f1a" }}>

        {/* ── Navbar: appears on EVERY page ── */}
        {/* The Navbar itself will hide itself on the /login page */}
        <Navbar user={navUser} />

        {/* ── Page Content ── */}
        {/* "children" is whatever page the user is currently on */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
