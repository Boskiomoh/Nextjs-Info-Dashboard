import React from 'react';

interface ConceptCardProps {
  title: string;
  description: string;
  code?: string;
  tag?: string;
}

/**
 * LAYMAN EXPLANATION:
 * This is a simple UI component to display Next.js concepts.
 * We pass "props" (properties) to it, and it renders them beautifully.
 */
const ConceptCard: React.FC<ConceptCardProps> = ({ title, description, code, tag }) => {
  return (
    <div className="card glass">
      {tag && <span className="tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      {code && (
        <pre>
          <code>{code}</code>
        </pre>
      )}

      <style jsx>{`
        .card {
          padding: 1.5rem;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
          border-color: var(--primary);
        }

        .tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          background: var(--primary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          width: fit-content;
          font-weight: 700;
        }

        h3 {
          font-size: 1.25rem;
          color: var(--primary);
        }

        p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          overflow-x: auto;
          border: 1px solid var(--glass-border);
        }

        code {
          color: #a5b4fc;
        }
      `}</style>
    </div>
  );
};

export default ConceptCard;
