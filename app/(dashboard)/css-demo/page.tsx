'use client';

import React, { useState } from 'react';
import ConceptCard from '@/components/ConceptCard';

export default function CssDemoPage() {
  const [color, setColor] = useState('#6366f1');

  return (
    <>
      <h1>Styling in Next.js</h1>
      <p className="subtitle">Learn about styled-jsx and scoped styling.</p>

      <div className="demo-box glass">
        <h2 className="dynamic-title">I am a Scoped H2</h2>
        <p>Changing the color below only affects this specific component.</p>
        <div className="controls">
          <button onClick={() => setColor('#f43f5e')} className="btn red">Red</button>
          <button onClick={() => setColor('#10b981')} className="btn green">Green</button>
          <button onClick={() => setColor('#6366f1')} className="btn blue">Default</button>
        </div>
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Standard"
          title="styled-jsx"
          description="The default library in Next.js. Write <style jsx> blocks to keep your styles close to your HTML."
          code={`<style jsx>{\`
  h1 { color: red; }
\`}</style>`}
        />
        <ConceptCard 
          tag="Global"
          title="Global Styles"
          description="In App Router, global styles are imported in the root layout.tsx file."
          code={`import './globals.css';`}
        />
        <ConceptCard 
          tag="Modern"
          title="CSS Modules"
          description="Next.js also supports .module.css files. They automatically create unique class names to avoid naming conflicts."
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

        .dynamic-title {
          color: ${color};
          font-size: 2.5rem;
          margin-bottom: 1rem;
          transition: color 0.5s ease;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .red { background: #f43f5e; }
        .green { background: #10b981; }
        .blue { background: #6366f1; }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </>
  );
}
