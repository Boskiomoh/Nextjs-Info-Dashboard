import React from 'react';
import ConceptCard from '@/components/ConceptCard';

export const metadata = {
  title: 'About Next.js Routing | Study Portal',
};

export default function AboutPage() {
  return (
    <>
      <section className="header animate-fade-in">
        <h1>Filesystem Routing</h1>
        <p className="subtitle">The simplest way to organize a web application.</p>
      </section>

      <div className="grid">
        <ConceptCard 
          tag="Standard Route"
          title="Static Routes"
          description="A file named 'app/contact/page.tsx' automatically becomes the '/contact' page. This makes it incredibly intuitive to understand your site's structure just by looking at your folder."
        />
        <ConceptCard 
          tag="Nested Route"
          title="Nested Folders"
          description="If you have 'app/settings/profile/page.tsx', it will be available at '/settings/profile'. Folders create sub-paths automatically."
        />
        <ConceptCard 
          tag="Dynamic Route"
          title="Dynamic Parameters"
          description="Using brackets like [id]/page.tsx tells Next.js that this part of the URL is a variable. '/blog/1' and '/blog/2' will both use the same [id]/page.tsx file."
        />
      </div>

      <style>{`
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </>
  );
}
