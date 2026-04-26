import React from 'react';
import ConceptCard from '@/components/ConceptCard';

export const metadata = {
  title: 'Deployment | Next.js Study',
};

export default function DeploymentPage() {
  return (
    <>
      <h1>Deployment</h1>
      <p className="subtitle">Taking your Next.js app from local to production.</p>

      <div className="grid">
        <ConceptCard 
          tag="Vercel"
          title="The Golden Standard"
          description="Vercel created Next.js, so it provides the best experience. Just push your code to GitHub, and Vercel will deploy it automatically."
        />
        <ConceptCard 
          tag="Process"
          title="Build Step"
          description="When you run 'npm run build', Next.js optimizes your code, minifies your CSS, and pre-renders your pages for maximum speed."
        />
        <ConceptCard 
          tag="Checklist"
          title="Production Ready"
          description="Ensure your environment variables are set, your images are optimized, and your security headers are in place."
        />
      </div>

      <style>{`
        h1 { color: var(--primary); font-size: 3rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </>
  );
}
