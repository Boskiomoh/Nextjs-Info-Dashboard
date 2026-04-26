// ============================================================
// FILE: app/login/page.tsx
// URL:  http://localhost:3000/login
//
// WHAT IS THIS?
// The login page. This is the "front door" of your app.
// Before a user can see the dashboard, they must prove who they are.
//
// HOW LOGIN WORKS (the simple version):
//   1. User types their email + password and hits "Login"
//   2. The browser sends that to your API (POST /api/auth/login)
//   3. The server checks: "Is this a real user? Is the password correct?"
//   4. If yes → server gives the browser a "session token" (like a wristband)
//   5. The browser stores that token (in a cookie)
//   6. Every future request to /dashboard includes that wristband
//   7. The server checks the wristband → lets them in or kicks them out
//
// SECURITY NOTES:
//   ❌ NEVER check passwords in the browser (client-side) — anyone can see
//   ✅ ALWAYS check passwords on the server (in your API route)
//   ❌ NEVER store plain passwords — always use hashing (bcrypt)
//   ✅ Use secure, httpOnly cookies to store session tokens
//
// "use client" IS NEEDED HERE because:
//   - We need useState to track what the user types
//   - We need onClick/onSubmit for the button
//   - These are browser-only features — the server has no keyboard/mouse
// ============================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router version of router

// ── Metadata can't be exported from "use client" files.
// For client pages, set the title in your layout.tsx instead.

export default function LoginPage() {
  // ── State — React's memory system for a component ──────────
  // useState is like a variable that REMEMBERS its value between renders
  // and AUTOMATICALLY updates the UI when it changes.
  //
  // Think of it like a live text display:
  //   email        = what the input box currently shows
  //   setEmail     = the remote control to change what it shows
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");    // Error message to display
  const [loading,  setLoading]  = useState(false); // Show spinner while waiting

  // useRouter lets us navigate to another page programmatically
  const router = useRouter();

  // ── Form Submit Handler ─────────────────────────────────────
  // "async" because we use "await" to wait for the API response
  async function handleSubmit(e: React.FormEvent) {
    // Prevent the browser's default form behaviour (page reload)
    // Without this, submitting a form refreshes the whole page!
    e.preventDefault();

    // Reset any previous error and show loading state
    setError("");
    setLoading(true);

    try {
      // ── Send credentials to our server-side API ────────────
      // "POST" means we're SENDING data (not just reading it)
      // The body contains the email and password as JSON
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server we're sending JSON
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Server said "no" — show the error message from the server
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      // ── Login successful! ────────────────────────────────────
      // The server set a cookie with the session token automatically.
      // Now we just redirect the user to the dashboard.
      router.push("/dashboard");

    } catch (err) {
      // Network error — couldn't reach the server at all
      setError("Network error. Please check your connection.");
      console.error(err);
    } finally {
      // "finally" always runs — whether success or failure
      setLoading(false);
    }
  }

  // ── UI ──────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#1a1a2e",
          border: "1px solid #2a2a4a",
          borderRadius: "16px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🛡️</div>
          <h1 style={{ color: "#fff", fontSize: "1.5rem", margin: "0.5rem 0 0.25rem" }}>
            SecureNet Portal
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>
            Authorised personnel only
          </p>
        </div>

        {/* ── The Form ── */}
        {/* onSubmit calls our handleSubmit function when the form is submitted */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", color: "#aaa", fontSize: "0.85rem", marginBottom: "6px" }}
            >
              Work Email
            </label>
            <input
              id="email"
              type="email"           // Browser validates email format automatically
              required               // Browser won't submit if this is empty
              autoComplete="email"   // Helps password managers fill this in
              value={email}          // "Controlled input" — React controls what's displayed
              onChange={(e) => setEmail(e.target.value)} // Update state on every keystroke
              placeholder="you@company.com"
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                background: "#0f0f1a",
                border: "1px solid #2a2a4a",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", color: "#aaa", fontSize: "0.85rem", marginBottom: "6px" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"        // Hides characters as user types
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                background: "#0f0f1a",
                border: "1px solid #2a2a4a",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Error Message — only renders if error state is not empty */}
          {error && (
            <div
              style={{
                color: "#e74c3c",
                background: "rgba(231,76,60,0.1)",
                border: "1px solid rgba(231,76,60,0.3)",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Grey out button while waiting for API
            style={{
              marginTop: "0.5rem",
              padding: "0.8rem",
              background: loading ? "#333" : "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {/* Ternary operator: condition ? "if true" : "if false" */}
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* Security notice at the bottom */}
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#555", fontSize: "0.75rem" }}>
          🔒 Connection encrypted · Attempts are logged
        </p>
      </div>
    </div>
  );
}
