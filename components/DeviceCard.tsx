// ============================================================
// FILE: components/DeviceCard.tsx
//
// WHAT IS A COMPONENT?
// Think of it like a Lego brick. You design the brick once,
// then you can snap it into any page as many times as you want.
//
// This component is the individual "card" shown for each
// network device on the dashboard.
//
// WHY IS IT IN /components AND NOT /app?
// Files in /app = Pages (have a URL)
// Files in /components = Reusable UI bricks (no URL, used inside pages)
// ============================================================

// ── TypeScript Interface ────────────────────────────────────
// An "interface" is a contract. It says: "any Device object
// MUST have these exact fields." If you forget one, TypeScript
// will yell at you BEFORE you even run the code. This catches bugs early.
interface Device {
  id: string;
  name: string;
  status: string; // "online" | "offline"
  ip: string;
  type: string;   // "Router", "Switch", "Firewall", "AccessPoint"
}

interface DeviceCardProps {
  device: Device;
}

// ── The Component ───────────────────────────────────────────
// Props = the data passed IN to this component (like function arguments).
// { device } = we're pulling the 'device' field out of the props object.
export default function DeviceCard({ device }: DeviceCardProps) {
  const isOnline = device.status === "online";

  // Choose an emoji icon based on device type
  const icon: Record<string, string> = {
    Router:      "🌐",
    Switch:      "🔀",
    Firewall:    "🛡️",
    AccessPoint: "📡",
  };

  return (
    <div
      style={{
        background: "#1a1a2e",
        border: `1px solid ${isOnline ? "#2a2a4a" : "rgba(231,76,60,0.3)"}`,
        borderRadius: "12px",
        padding: "1.25rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
        // A red left border visually flags offline devices immediately
        borderLeft: `4px solid ${isOnline ? "#00d084" : "#e74c3c"}`,
      }}
    >
      {/* ── Card Header: icon + name + status badge ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "2px" }}>
            {icon[device.type] ?? "💻"} {device.type}
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff" }}>
            {device.name}
          </div>
        </div>

        {/* Status Badge */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "999px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            background: isOnline ? "rgba(0,208,132,0.15)" : "rgba(231,76,60,0.15)",
            color:      isOnline ? "#00d084"              : "#e74c3c",
          }}
        >
          {/* The dot ● before the status text */}
          ● {device.status}
        </span>
      </div>

      {/* ── IP Address ── */}
      <div
        style={{
          fontSize: "0.85rem",
          color: "#aaa",
          fontFamily: "'Courier New', monospace", // monospace = looks like a terminal/IP address
          marginTop: "0.5rem",
        }}
      >
        IP: {device.ip}
      </div>

      {/* ── Offline Warning ── */}
      {/* This block ONLY renders when the device is offline */}
      {!isOnline && (
        <div
          style={{
            marginTop: "0.75rem",
            fontSize: "0.78rem",
            color: "#e74c3c",
            background: "rgba(231,76,60,0.08)",
            padding: "5px 8px",
            borderRadius: "6px",
          }}
        >
          ⚠️ Device unreachable — investigate immediately
        </div>
      )}
    </div>
  );
}