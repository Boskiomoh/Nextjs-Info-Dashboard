import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * Most of the time, we use <Link> to move between pages.
 * But sometimes you need to move to a new page using "code" (logic).
 * For example, after a user logs in, you might want to automatically 
 * send them to the Dashboard. This is called "Programmatic Routing".
 */
const RouterDemo: React.FC = () => {
  const router = useRouter();

  // Next.js can even start loading a page BEFORE you click it!
  useEffect(() => {
    router.prefetch('/blog');
  }, [router]);

  const handleManualNav = () => {
    console.log("Navigating via code...");
    router.push('/blog');
  };

  return (
    <Layout title="Programmatic Routing Demo">
      <h1>The Router Hook</h1>
      <p className="subtitle">Controlling your app's navigation with logic.</p>

      <div className="demo-box glass">
        <h3>Try it out:</h3>
        <p>Clicking this button uses <code>router.push('/blog')</code> to take you to the blog list.</p>
        <button onClick={handleManualNav} className="btn">Go to Blog via Code</button>
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Method"
          title="router.push()"
          description="Used to navigate to a new URL. It adds a new entry in your browser history so the 'Back' button still works."
        />
        <ConceptCard 
          tag="Method"
          title="router.prefetch()"
          description="Tells Next.js to start downloading the code for a page in the background. Makes the eventual navigation feel 'instant'."
        />
        <ConceptCard 
          tag="Property"
          title="router.pathname"
          description="Tells you which page is currently active. Perfect for highlighting active links in your navigation menu."
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
          margin-top: 1.5rem;
          transition: background 0.3s;
        }

        .btn:hover {
          background: var(--primary-hover);
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

export default RouterDemo;
