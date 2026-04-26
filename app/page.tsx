// ============================================================
// FILE: app/page.tsx
// URL:  http://localhost:3000/
//
// This is the home/landing page of the app.
// It's a simple redirect page — if you're already logged in,
// it sends you to the dashboard. If not, it sends you to login.
// ============================================================

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "SecureNet | Network Infrastructure Portal",
  description: "Secure network monitoring portal for infrastructure teams",
};

export default async function HomePage() {
  // Check if the user already has a valid session
  const session = await getSession();

  if (session) {
    // Already logged in → go straight to dashboard
    redirect("/dashboard");
  } else {
    // Not logged in → go to login page
    redirect("/login");
  }
}
