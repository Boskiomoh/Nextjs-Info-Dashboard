"use client";

export default function SettingsPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>Portal Settings</h1>
        <p style={{ color: "#888" }}>Configure your account and network preferences</p>
      </header>

      <div style={{ 
        background: "#1a1a2e", 
        border: "1px solid #2a2a4a", 
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "600px"
      }}>
        <section style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Profile Information</h3>
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Updates to your profile will be audited by the security team.</p>
        </section>

        <section>
          <h3 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Security</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #2a2a4a" }}>
            <span>Two-Factor Authentication</span>
            <span style={{ color: "#e74c3c" }}>Disabled</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" }}>
            <span>Session Timeout</span>
            <span>8 Hours</span>
          </div>
        </section>
      </div>
    </div>
  );
}
