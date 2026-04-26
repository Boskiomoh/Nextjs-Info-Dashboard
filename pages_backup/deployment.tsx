import React from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * Deploying means taking your app from your computer and putting it 
 * on the internet so anyone can see it. 
 * Next.js belongs to Vercel, so they made it super easy to deploy there.
 */
const Deployment: React.FC = () => {
  return (
    <Layout title="Deployment | Study Project">
      <h1>Going Live</h1>
      <p className="subtitle">The transition from Localhood to the World Wide Web.</p>

      <div className="grid">
        <ConceptCard 
          tag="Command"
          title="npm run build"
          description="This command tells Next.js to package everything up for production. It optimizes your code and pre-renders as much as possible."
          code="npm run build"
        />
        <ConceptCard 
          tag="Command"
          title="npm run start"
          description="After building, this command starts the server in production mode. It's much faster and more solid than 'dev' mode."
          code="npm run start"
        />
        <ConceptCard 
          tag="Platform"
          title="Vercel"
          description="The creators of Next.js. You can literally just connect your GitHub repo, and it will deploy your app automatically every time you push code."
        />
      </div>

      <style jsx>{`
        h1 { color: var(--primary); font-size: 3rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Deployment;
