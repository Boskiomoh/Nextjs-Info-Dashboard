import React from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * This 'about.tsx' file is a perfect example of "Filesystem Routing".
 * Because this file is named 'about.tsx', Next.js makes it available at "/about".
 * No need to write complex routing logic!
 * 
 * THE BIG LESSON:
 * This page is a "Static Page". It doesn't change based on data from a database.
 * Next.js will turn this into a standard .html file during the build process.
 */
const About: React.FC = () => {
  return (
    <Layout title="About Next.js Routing">
      <section className="header animate-fade-in">
        <h1>Filesystem Routing</h1>
        <p className="subtitle">The simplest way to organize a web application.</p>
      </section>

      <div className="grid">
        <ConceptCard 
          tag="Standard Route"
          title="Static Routes"
          description="A file named 'pages/contact.tsx' automatically becomes the '/contact' page. This makes it incredibly intuitive to understand your site's structure just by looking at your folder."
        />
        <ConceptCard 
          tag="Nested Route"
          title="Nested Folders"
          description="If you have 'pages/settings/profile.tsx', it will be available at '/settings/profile'. Folders create sub-paths automatically."
        />
        <ConceptCard 
          tag="Dynamic Route"
          title="Dynamic Parameters"
          description="Using brackets like [id].tsx tells Next.js that this part of the URL is a variable. '/blog/1' and '/blog/2' will both use the same [id].tsx file."
        />
      </div>

      <style jsx>{`
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
    </Layout>
  );
};

export default About;
