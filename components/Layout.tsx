import React, { ReactNode } from 'react';
import NavLink from '@/components/NavLink';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  hideNav?: boolean;
}

/**
 * LAYMAN EXPLANATION:
 * This is a "Wrapper" or "Layout" component. 
 * Instead of repeating the Navigation bar on every single page, we put it here once.
 * Any page wrapped with <Layout> will automatically get this navigation and structure.
 * This is a core React/Next.js pattern for keeping your code "DRY" (Don't Repeat Yourself).
 */
import { useAuth } from '@/contexts/AuthContext';

const Layout: React.FC<LayoutProps> = ({ children, title = 'Next.js Study Portal', hideNav = false }) => {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="layout-container">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!hideNav && (
        <header className="navbar glass">
          <div className="nav-content">
          <div className="logo">NextJS<span>Study</span></div>
          <nav>
            <ul>
              <li><NavLink href="/">Dashboard</NavLink></li>
              <li><NavLink href="/about">About</NavLink></li>
              <li><NavLink href="/blog">Blog</NavLink></li>
              <li><NavLink href="/css-demo">CSS Demo</NavLink></li>
              <li><NavLink href="/api-demo">API Demo</NavLink></li>
              <li><NavLink href="/ssr-vs-csr">SSR/CSR</NavLink></li>
              <li><NavLink href="/lazy-loading">Lazy Loading</NavLink></li>
              <li><NavLink href="/deployment">Deployment</NavLink></li>
            </ul>
          </nav>
          
          <div className="auth-section">
            {isLoading ? (
              <span className="loading-dots">...</span>
            ) : user ? (
              <div className="user-info">
                <span className="username">👋 {user.username}</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </div>
        </div>
      </header>
      )}

      <main className="main-content container animate-fade-in">
        {children}
      </main>

      <footer className="footer glass">
        <p>© 2026 Next.js Study Project. Inspired by PAPA React Handbook.</p>
      </footer>

      <style jsx>{`
        .layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          margin: 1rem 2rem;
          padding: 0.75rem 2rem;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          gap: 2rem;
        }

        .auth-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 150px;
          justify-content: flex-end;
          border-left: 1px solid var(--glass-border);
          padding-left: 1.5rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .username {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--primary);
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid var(--glass-border);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }

        .logo {
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }

        .logo span {
          color: var(--primary);
        }

        nav ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .footer {
          margin: 2rem;
          padding: 1.5rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-direction: column;
            gap: 1rem;
          }
          .navbar {
            margin: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
