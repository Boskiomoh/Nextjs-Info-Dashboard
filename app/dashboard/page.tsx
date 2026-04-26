// ============================================================
// FILE: app/dashboard/page.tsx
// URL:  http://localhost:3000/dashboard
//
// THE BIG PICTURE — HOW THIS PAGE WORKS:
//
//  1. User visits /dashboard in their browser
//  2. Next.js runs THIS file on the SERVER (not the browser)
//  3. The server fetches device data from our API route
//  4. The server builds the full HTML page
//  5. The completed, ready-to-display HTML is sent to the browser
//  6. The browser just shows it — fast, no loading spinner needed
//
// SECURITY:
//  - Authentication check happens here on the server
//  - Data fetch happens here on the server
//  - The browser only receives finished HTML, never raw API keys
// ============================================================

// No "use client" here = this is a Server Component (runs on server)
import DeviceCard from "@/components/DeviceCard";
import styles from "@/styles/Dashboard.module.css";
import { cookies } from "next/headers"; // Added to read cookies for the fetch call

// ── TypeScript Type ─────────────────────────────────────────
// Describes the shape of a device object coming from our API
type Device = {
  id: string;
  name: string;
  status: string;
  ip: string;
  type: string;
};

// ── Metadata ─────────────────────────────────────────────────
// This is the App Router way of setting the browser tab title + SEO description.
// It replaces the old <Head> component from the Pages Router.
export const metadata = {
  title: "Network Dashboard | SecureNet",
  description: "Monitor and manage all network infrastructure devices",
};

// ── Data Fetching Function ───────────────────────────────────
// This is a regular async function — no magic, just a function
// that calls our own API and returns the data.
//
// WHY CALL OUR OWN API? Can't we just put the data directly here?
// Yes, for now we can. But in a real company setup:
//   - The API could be on a different server
//   - The API handles auth/permissions for ALL clients (mobile app, dashboard, etc.)
//   - It creates one single source of truth
async function getDevices(): Promise<Device[]> {
  try {
    // fetch() is built into Next.js — no imports needed
    // We call our own API route using the base URL from .env
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    
    // ── THE FIX: Forward the cookies! ───────────────────────
    // When the server fetches from itself, it doesn't automatically
    // include your browser's cookies. We must pass them manually.
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/api`, {
      // "no-store" = don't cache this. Always get fresh data.
      cache: "no-store",
      headers: {
        // Pass the cookies along so the API knows who we are
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      // response.ok is false when status is 4xx or 5xx
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    return json.devices;
  } catch (error) {
    // If the fetch fails, log it on the server and return empty array
    // so the page still renders (graceful failure)
    console.error("Failed to fetch devices:", error);
    return [];
  }
}

// ── The Page Component ───────────────────────────────────────
// "async" means this component can use "await" — it waits for data
// before building the HTML to send to the browser.
export default async function DashboardPage() {
  // ── Step 1: Fetch devices (runs on server) ───────────────
  const devices = await getDevices();

  // ── Step 2: Calculate summary stats ─────────────────────
  // Array.filter() creates a new array with only matching items.
  // Think of it like a sieve — only the ones that pass the test get through.
  const onlineCount  = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;

  // ── Step 3: Return the HTML to send to the browser ──────
  return (
    <div className={styles.container}>

      {/* ── Page Header ── */}
      <h1 className={styles.title}>🛡️ Network Dashboard</h1>
      <p className={styles.subtitle}>
        Real-time status of all infrastructure devices
      </p>

      {/* ── Summary Stats Bar ── */}
      <div className={styles.summaryBar}>
        <div className={`${styles.summaryCard} ${styles.total}`}>
          <div className={styles.count}>{devices.length}</div>
          <div className={styles.label}>Total Devices</div>
        </div>
        <div className={`${styles.summaryCard} ${styles.online}`}>
          <div className={styles.count}>{onlineCount}</div>
          <div className={styles.label}>Online</div>
        </div>
        <div className={`${styles.summaryCard} ${styles.offline}`}>
          <div className={styles.count}>{offlineCount}</div>
          <div className={styles.label}>Offline</div>
        </div>
      </div>

      {/* ── Device Grid or Empty State ── */}
      {devices.length === 0 ? (
        // Shown if fetch failed or returned no devices
        <div className={styles.error}>
          ⚠️ Could not load devices. Check your API route or network connection.
        </div>
      ) : (
        // .map() = "for each device in the list, create one DeviceCard"
        // It's like a for-loop but returns JSX instead of printing
        <div className={styles.grid}>
          {devices.map((device) => (
            // key= is required by React when rendering lists.
            // It helps React know which card is which when things update.
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}

      {/* ── Security Footer ── */}
      <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#555", textAlign: "center" }}>
        🔒 All data fetched server-side · Secrets never exposed to browser
      </p>
    </div>
  );
}