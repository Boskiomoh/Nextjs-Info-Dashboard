'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ConceptCard from '@/components/ConceptCard';

export default function RouterDemoPage() {
  const router = useRouter();

  const handleManualNav = () => {
    if (confirm('Do you want to go back to the home page?')) {
      router.push('/');
    }
  };

  return (
    <>
      <h1>Programmatic Routing</h1>
      <p className="subtitle">Sometimes you need to move users around using code, not just links.</p>

      <div className="demo-box glass">
        <h3>Need to Redirect?</h3>
        <p>Clicking the button below uses the <code>useRouter()</code> hook to navigate.</p>
        <button onClick={handleManualNav} className="btn">
          Go Home (Programmatically)
        </button>
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Hook"
          title="useRouter"
          description="In App Router, use 'next/navigation' to get the router object. It allows you to push, replace, or go back/forward in the browser history."
        />
        <ConceptCard 
          tag="Method"
          title="router.push()"
          description="The most common method. It adds a new entry to the browser history, essentially 'clicking' a link via JavaScript logic."
        />
        <ConceptCard 
          tag="Usage"
          title="After Actions"
          description="Commonly used after a form submission or a successful login to take the user to their dashboard automatically."
        />
      </div>

      <style jsx>{`
        h1 { color: var(--primary); font-size: 3rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }

        .demo-box {
          padding: 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 1.5rem;
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
