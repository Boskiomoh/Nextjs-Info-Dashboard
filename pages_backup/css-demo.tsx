import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';

/**
 * LAYMAN EXPLANATION:
 * Next.js comes with 'styled-jsx' built-in. 
 * This allows you to write actual CSS directly inside your React components.
 * The best part? The CSS is "Scoped". 
 * If you style an <h1> here, it won't affect <h1> tags on other pages!
 */
const CssDemo: React.FC = () => {
  const [color, setColor] = useState('#6366f1');

  return (
    <Layout title="CSS & Styling Demo">
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
          description="Use the 'global' attribute to apply styles to the whole site, or use 'pages/_app.tsx' to import a CSS file."
          code={`<style jsx global>{\`
  body { margin: 0; }
\`}</style>`}
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
    </Layout>
  );
};

export default CssDemo;
