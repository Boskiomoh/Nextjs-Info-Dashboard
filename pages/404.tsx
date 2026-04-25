import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

/**
 * LAYMAN EXPLANATION:
 * Next.js allows you to create a custom 404 page.
 * If a user goes to a URL that doesn't exist, Next.js will automatically 
 * show this file instead of a boring error message.
 */
const Custom404: React.FC = () => {
  return (
    <Layout title="Page Not Found">
      <div className="error-container">
        <h1 className="glitch">404</h1>
        <p className="message">This page hasn't been built in the curriculum yet!</p>
        <Link href="/" className="btn">Back to Dashboard</Link>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          text-align: center;
        }

        h1 {
          font-size: 8rem;
          font-weight: 900;
          color: var(--primary);
          margin: 0;
          letter-spacing: -5px;
        }

        .message {
          font-size: 1.5rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .btn {
          background: var(--primary);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 700;
        }

        .btn:hover {
          background: var(--primary-hover);
        }
      `}</style>
    </Layout>
  );
};

export default Custom404;
