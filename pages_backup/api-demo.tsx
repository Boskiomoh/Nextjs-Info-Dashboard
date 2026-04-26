import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';
import { toast } from 'sonner';

/**
 * LAYMAN EXPLANATION:
 * Next.js isn't just for HTML; it's a full-stack framework!
 * You can write "Backend" code inside the 'pages/api' folder.
 * These files run only on the server, never in the browser.
 */
const ApiDemo: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const json = await res.json();
      setData(json);
      toast.success("API Response Received", {
        description: `Successfully fetched data from /api/hello`
      });
    } catch (e) {
      console.error(e);
      toast.error("API Fetch Failed", {
        description: "Could not connect to the server."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="API Routes Demo">
      <h1>Full-Stack Next.js</h1>
      <p className="subtitle">API routes allow you to build backends without a separate server.</p>

      <div className="demo-box glass">
        <button onClick={fetchApi} disabled={loading} className="btn">
          {loading ? 'Fetching...' : 'Call API Route'}
        </button>
        
        {data && (
          <div className="result animate-fade-in">
            <h4>Response from <code>/api/hello</code>:</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="grid">
        <ConceptCard 
          tag="Structure"
          title="The /api Folder"
          description="Any file in 'pages/api' is mapped to '/api/*'. These routes provide JSON data instead of HTML pages."
        />
        <ConceptCard 
          tag="Security"
          title="Server-Only"
          description="API routes run on the server. You can safely access databases or secret API keys here because the code never reaches the client."
        />
        <ConceptCard 
          tag="Control"
          title="HTTP Methods"
          description="You can check 'req.method' to handle GET, POST, DELETE, etc. differently in the same file."
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
          text-align: left;
        }

        pre {
          background: rgba(0,0,0,0.5);
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
          color: #10b981;
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

export default ApiDemo;
