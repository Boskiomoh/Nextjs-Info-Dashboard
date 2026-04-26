// ============================================================
// FILE: app/api/route.ts
// URL:  http://localhost:3000/api
//
// WHAT IS THIS?
// This is your backend API. Think of it like a restaurant kitchen.
// The customer (browser) places an order (HTTP request).
// This file handles the order and sends back food (data/JSON).
// The customer NEVER sees what happens in the kitchen.
//
// SECURITY NOTE:
// Any code in this file runs on the SERVER ONLY.
// Secrets, passwords, database connections — all safe here.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// ── Fake in-memory "database" of network devices ────────────
// In real life, this would be: const devices = await db.devices.findAll()
const devices = [
  { id: "1", name: "Core Router A", status: "online",  ip: "10.0.0.1",  type: "Router"   },
  { id: "2", name: "Switch B",      status: "online",  ip: "10.0.0.2",  type: "Switch"   },
  { id: "3", name: "Firewall C",    status: "offline", ip: "10.0.0.3",  type: "Firewall" },
  { id: "4", name: "AP West Wing",  status: "online",  ip: "10.0.0.4",  type: "AccessPoint" },
];

// ── GET /api ─────────────────────────────────────────────────
// Called when someone visits /api or fetches it with GET method.
// Returns the list of all devices as JSON.
export async function GET(request: NextRequest) {
  // SECURITY: Check for a valid session. Only logged-in users can see devices.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    count: devices.length,
    devices,
  });
}

// ── POST /api ─────────────────────────────────────────────────
// Called when a form or button sends data to create a new device.
export async function POST(request: NextRequest) {
  // SECURITY: Only logged-in users can add devices.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  // Read the data sent by the browser
  const body = await request.json();

  // SECURITY: Always validate what the user sends. Never trust raw input!
  if (!body.name || !body.ip || !body.type) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: name, ip, type" },
      { status: 400 } // 400 = "Bad Request" — the user sent incomplete data
    );
  }

  // In real life: await db.devices.create({ ...body })
  const newDevice = {
    id: String(devices.length + 1),
    name: body.name,
    ip: body.ip,
    type: body.type,
    status: "online",
  };

  devices.push(newDevice); // This only persists while dev server is running

  // 201 = "Created" — tells the browser something new was made
  return NextResponse.json({ success: true, device: newDevice }, { status: 201 });
}
