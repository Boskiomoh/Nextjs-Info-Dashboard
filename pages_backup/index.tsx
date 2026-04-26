import React from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * This is your Home Page (index.tsx). 
 * In Next.js, files under the 'pages' folder automatically become URLs.
 * Since this is 'index.tsx', it maps to the root "/" URL.
 * 
 * THE BIG LESSON:
 * This page uses "Static Site Generation" (SSG) by default because we 
 * haven't used getInitialProps or getServerSideProps.
 * This means Next.js builds this page as a simple HTML file once, 
 * making it lightning fast for your users!
 */
const Home: React.FC = () => {
  return (
    <Layout title="Next.js Study Dashboard">
      <section className="hero">
        <h1>Mastering Next.js</h1>
        <p className="subtitle">Interactive Study Dashboard based on Sonny Sangha's Handbook</p>
      </section>

      <div className="grid">
        <ConceptCard 
          tag="Core Benefit"
          title="Server-Side Rendering (SSR)"
          description="Next.js renders your page on the server first. This makes your site visible immediately and is great for SEO because search engines can see your content easily."
        />
        <ConceptCard 
          tag="Feature"
          title="Automatic Routing"
          description="Forget complex route files! Just create a file in the 'pages' directory, and it instantly becomes a URL on your website. 'about.tsx' becomes '/about'."
        />
        <ConceptCard 
          tag="Performance"
          title="Code Splitting"
          description="Next.js doesn't send all the code at once. It only sends the code needed for the specific page you are visiting. This keeps the initial load super fast."
        />
        <ConceptCard 
          tag="Benefit"
          title="Prefetching"
          description="When you use the <Link> component, Next.js starts loading the next page in the background as soon as the link appears on your screen!"
        />
      </div>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          -webkit-text-fill-color: var(--text-muted);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
