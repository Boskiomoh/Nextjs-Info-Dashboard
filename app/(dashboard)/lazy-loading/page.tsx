'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ConceptCard from '@/components/ConceptCard';

// This component will only be loaded when we need it
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading heavy component...</p>,
  ssr: false // Optional: only load on client
});

export default function LazyLoadingPage() {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>Lazy Loading</h1>
      <p className="subtitle">Optimize performance by loading code only when needed.</p>

      <div className="demo-box glass">
        <button onClick={() => setShow(!show)} className="btn">
          {show ? 'Hide Component' : 'Show Heavy Component'}
        </button>
        
        {show && (
          <div className="result animate-fade-in">
            <HeavyComponent />
          </div>
        )}
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Concept"
          title="Dynamic Imports"
          description="Use 'next/dynamic' to split your code. This means the browser doesn't download the component code until the user actually needs to see it."
        />
        <ConceptCard 
          tag="Benefit"
          title="Faster LCP"
          description="By reducing the initial JavaScript bundle size, your page becomes interactive much faster, improving your Google Lighthouse scores."
        />
        <ConceptCard 
          tag="Suspense"
          title="Loading States"
          description="You can provide a fallback component (like a spinner) to show while the heavy component is being downloaded."
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
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .result {
          margin-top: 2rem;
          padding: 2rem;
          border: 1px dashed var(--primary);
          border-radius: 12px;
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
