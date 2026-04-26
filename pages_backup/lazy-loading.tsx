import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * This part is a bit advanced! Dynamic imports (or Lazy Loading) means 
 * "Don't load this code until I actually need it."
 * 
 * Imagine a heavy component (like a map or a video player). 
 * If the user never scrolls down to see it, why download all that extra code?
 * We use 'next/dynamic' to tell Next.js to wait.
 */

// This is our "Heavy Component" that we want to load lazily.
// It will be in its own separate file (bundle).
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <div className="loading">Loading Heavy Component...</div>,
  ssr: false // We can also tell it to ONLY load on the client
});

const LazyLoadingDemo: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <Layout title="Lazy Loading | Demo">
      <h1>Lazy Loading</h1>
      <p className="subtitle">Only download exactly what you need, when you need it.</p>

      <div className="demo-box glass">
        <p>The "Heavy Component" code is NOT loaded yet. Click the button to download and show it.</p>
        {!show ? (
          <button onClick={() => setShow(true)} className="btn">Load Heavy Component</button>
        ) : (
          <div className="animate-fade-in">
             <HeavyComponent />
             <button onClick={() => setShow(false)} className="btn outline">Hide & Reset</button>
          </div>
        )}
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Function"
          title="dynamic()"
          description="Next.js's helper for loading components only when they are rendered. It splits the JS code into a separate bundle."
        />
        <ConceptCard 
          tag="Strategy"
          title="ssr: false"
          description="Sometimes a component (like one that uses 'window') isn't compatible with server rendering. You can disable SSR for that component specifically."
        />
        <ConceptCard 
          tag="Benefit"
          title="Bundle Optimization"
          description="Smaller initial page sizes mean your site loads faster on slow mobile connections!"
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

        .outline {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          margin-top: 1rem;
        }

        .loading {
            padding: 2rem;
            color: var(--primary);
            font-style: italic;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default LazyLoadingDemo;
