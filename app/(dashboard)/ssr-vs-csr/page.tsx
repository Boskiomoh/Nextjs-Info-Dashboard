import React from 'react';
import ConceptCard from '@/components/ConceptCard';

export const metadata = {
  title: 'SSR vs CSR | Next.js Study',
};

export default async function SsrCsrPage() {
  // In App Router, this is a Server Component by default.
  // Any data fetching here is "Server-Side" by nature.
  const serverTime = new Date().toLocaleTimeString();

  return (
    <>
      <h1>SSR vs CSR</h1>
      <p className="subtitle">Understanding where your code actually runs.</p>

      <div className="demo-box glass">
        <div className="time-display">
          <h3>Server-Rendered Time:</h3>
          <p className="time">{serverTime}</p>
          <small>This time was calculated on the server at the moment of request.</small>
        </div>
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Server"
          title="Server Components"
          description="The new default. They run only on the server, meaning zero JavaScript is sent to the browser for these components. This is perfect for SEO and speed."
        />
        <ConceptCard 
          tag="Client"
          title="Client Components"
          description="Use 'use client' when you need interactivity (onClick, useState, etc.). They still pre-render on the server but then 'hydrate' in the browser."
        />
        <ConceptCard 
          tag="Hybrid"
          title="The Best of Both"
          description="App Router lets you mix them! You can have a fast Server Component page with small, interactive Client Component islands inside it."
        />
      </div>

      <style>{`
        h1 { color: var(--primary); font-size: 3rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }

        .demo-box {
          padding: 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .time-display {
          padding: 2rem;
          border-radius: 12px;
          background: rgba(0,0,0,0.2);
        }

        .time {
          font-size: 3.5rem;
          font-family: monospace;
          color: #10b981;
          margin: 1rem 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </>
  );
}
