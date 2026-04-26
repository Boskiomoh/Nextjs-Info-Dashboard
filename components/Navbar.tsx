// ============================================================
// FILE: components/Navbar.tsx
//
// WHAT IS THIS?
// The navigation bar shown at the top of every page (except login).
// It shows:
//   - The app name/logo
//   - Navigation links (with active link highlighted)
//   - The logged-in user's name + role
//   - A logout button
//
// WHY "use client"?
// We need usePathname() to detect the current URL and highlight
// the active link. usePathname is a React hook — hooks only work
// in Client Components (browser-side).
//
// SECURITY NOTE:
// The session data (user name, role) is passed as a PROP from the
// Server Component (layout.tsx). The server reads the cookie,
// the Navbar just displays what it's given.
// This means NO auth logic runs in the browser — it's all server-side.
// ============================================================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Props: what data this component expects ──────────────────
type NavbarProps = {
  user: {
    name: string;
    email: string;
    role: string;
  } | null; // null means not logged in (shows nothing or login link)
};

// ── Nav links config ─────────────────────────────────────────
const NAV_LINKS = [
  { href: "/dashboard", label: "📊 Dashboard" },
  { href: "/devices",   label: "🖥️ Devices"   },
  { href: "/settings",  label: "⚙️ Settings"  },
];

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname(); // e.g. "/dashboard"

  // Don't show the navbar on the login page
  if (pathname === "/login") return null;

  async function handleLogout() {
    // Send POST to our logout API — clears the cookie server-side
    await fetch("/api/auth/logout", { method: "POST" });
    // After logout, redirect to login page
    window.location.href = "/login";
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        height: "56px",
        background: "#0d0d1f",
        borderBottom: "1px solid #1e1e3a",
        position: "sticky",   // Stays at top when you scroll
        top: 0,
        zIndex: 100,          // Sits above all page content
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── Left: Logo + Nav Links ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Logo */}
        <Link
          href="/dashboard"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span style={{ fontSize: "1.3rem" }}>🛡️</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.02em" }}>
            SecureNet
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  // Active link gets a subtle highlight
                  background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                  color: isActive ? "#60a5fa" : "#aaa",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Right: User Info + Logout ── */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Role badge */}
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "999px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: user.role === "admin" ? "rgba(234,179,8,0.15)" : "rgba(59,130,246,0.15)",
              color: user.role === "admin" ? "#eab308" : "#60a5fa",
            }}
          >
            {user.role}
          </span>

          {/* User name */}
          <span style={{ fontSize: "0.85rem", color: "#ddd" }}>
            {user.name ?? user.email}
          </span>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 12px",
              background: "transparent",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#888",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "#e74c3c";
              (e.target as HTMLButtonElement).style.color = "#e74c3c";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "#333";
              (e.target as HTMLButtonElement).style.color = "#888";
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
