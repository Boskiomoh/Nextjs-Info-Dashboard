# 🗺️ The SecureNet System Workflow: Step-by-Step

This document explains how our app handles a user from the moment they arrive at the **Login Page** until they see their private **Dashboard**, with specific pointers to the code and logic responsible for each step.

---

## 🏁 Phase 1: The Public Entry (Login Page)
**File:** [app/login/page.tsx](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx) (Client Component)

1.  **The User Arrives:** The user sees the login form. 
    *   **Logic:** The component renders a `<form>` with `onSubmit={handleSubmit}` ([Line 135](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx#L135)).
2.  **State Management:** As the user types, React remembers the input.
    *   **Code:** `useState` hooks for `email` and `password` ([Lines 45-46](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx#L45-L46)).
    *   **Connection:** Inputs use `onChange` to update state on every keystroke ([Lines 151, 181](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx#L151)).
3.  **The "Order" is Placed:** Clicking "Sign In" triggers the `handleSubmit` function.
    *   **Code:** `fetch("/api/auth/login", { method: "POST", ... })` ([Line 68](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx#L68)).

---

## 👩‍🍳 Phase 2: The Security Kitchen (Auth API)
**File:** [app/api/auth/login/route.ts](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts) (Server API)

1.  **Receiving the Order:** The `POST` function extracts credentials from the request.
    *   **Code:** `const { email, password } = await request.json();` ([Lines 60, 68](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts#L60)).
2.  **Verification:** The server validates the credentials against our "database".
    *   **Code:** `const isValid = user && user.password === password;` ([Line 94](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts#L94)).
3.  **Generic Error Handling:** Security through ambiguity.
    *   **Code:** If invalid, returns a **401** with a generic message ([Lines 101-104](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts#L101-L104)).
4.  **The Wristband (The Cookie):** Upon success, a session token is generated and baked into a secure cookie.
    *   **Code:** `response.cookies.set("session_token", ...)` ([Lines 130-136](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts#L130-L136)).
    *   **Security:** `httpOnly: true` ensures the browser's JavaScript cannot steal the token.

---

## 🚦 Phase 3: The Traffic Controller (Middleware)
**File:** [middleware.ts](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts) (Edge Server)

*This file runs **before** every request, acting as a global gatekeeper.*

1.  **Checking the Destination:** Identifies where the user is trying to go.
    *   **Code:** `const { pathname } = request.nextUrl;` ([Line 45](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L45)).
2.  **The Restricted Check:** Compares the path against the `PROTECTED_ROUTES` list.
    *   **Code:** `const isProtected = PROTECTED_ROUTES.some(...)` ([Line 48](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L48)).
3.  **Checking for the Wristband:** Looks for the `session_token` cookie.
    *   **Code:** `const sessionToken = request.cookies.get("session_token")?.value;` ([Line 62](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L62)).
    *   **If missing:** Redirects to `/login` ([Line 73](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L73)).
    *   **If present:** Allows passage via `NextResponse.next()` ([Line 78](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L78)).

---

## 🏗️ Phase 4: The Internal Guard (Dashboard Page)
**File:** [app/dashboard/page.tsx](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx) (Server Component)

1.  **Fetching Data:** The server requests the device list.
    *   **Code:** Calls `getDevices()` ([Line 82](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx#L82)), which fetches from our API ([Line 56](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx#L56)).
2.  **Internal Security Check:** The API itself double-checks the session.
    *   **File:** [app/api/route.ts](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/route.ts)
    *   **Code:** `const session = await getSession();` ([Line 33](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/route.ts#L33)).
3.  **Baking the HTML:** The server constructs the UI with real data.
    *   **Code:** Maps through `devices` to render `DeviceCard` components ([Lines 126-130](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx#L126-L130)).
4.  **Delivery:** The browser receives complete HTML ([Line 80](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx#L80)).

---

## 🖼️ Phase 5: The Frame (Layout & Navbar)
**Files:** [app/layout.tsx](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/layout.tsx) & [components/Navbar.tsx](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/components/Navbar.tsx)

1.  **The Shared Shell:** `layout.tsx` wraps every page and verifies the user.
    *   **Code:** `const session = await getSession();` ([Line 71](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/layout.tsx#L71)).
2.  **Personalized UI:** Passes user info down to the navigation bar.
    *   **Code:** `<Navbar user={navUser} />` ([Line 94](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/layout.tsx#L94)).
3.  **The Display:** The Navbar shows the role and name.
    *   **Code:** Uses `user.role` and `user.name` to show personalized status ([Lines 114-135](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/components/Navbar.tsx#L114)).

---

## 🔐 The Invisible Layer: `.env.local`
**File:** [.env.local](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/.env.local)

*   **JWT_SECRET:** Used to sign session tokens ([Line 29](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/.env.local#L29)).
*   **DATABASE_URL:** Connection string for the data layer ([Line 34](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/.env.local#L34)).
*   **Safety:** These values stay on the server and are NEVER bundled into the code sent to the user's browser.

---

### 📝 The "Hand-off" Summary
| Action | File Responsible | Line Reference |
| :--- | :--- | :--- |
| Typing credentials | `login/page.tsx` | [Line 151, 181](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/login/page.tsx#L151) |
| Verifying & Setting Cookie | `api/auth/login/route.ts` | [Line 130](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/api/auth/login/route.ts#L130) |
| Blocking unauthorized access | `middleware.ts` | [Line 73](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/middleware.ts#L73) |
| Decoding User Session | `lib/auth.ts` | [Line 48](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/lib/auth.ts#L48) |
| Fetching Devices | `dashboard/page.tsx` | [Line 82](file:///c:/Users/Dell/Documents/nextjs%20Tutorial/my-app/app/dashboard/page.tsx#L82) |
| Storing Secret Keys | `.env.local` | Server (Hidden) |
