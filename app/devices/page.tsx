"use client";

import { useEffect, useState } from "react";
import DeviceCard from "@/components/DeviceCard";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch devices from our API
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.devices || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>Network Devices</h1>
        <p style={{ color: "#888" }}>Manage and monitor all connected hardware</p>
      </header>

      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {devices.map((device: any) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
}
