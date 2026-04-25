import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

/**
 * LAYMAN EXPLANATION:
 * The PDF mentions that Next.js's standard <Link> doesn't automatically highlight
 * which page you are currently on. 
 * This custom NavLink component uses the 'useRouter' hook to look at the current 
 * URL in your browser. If the URL matches the link's destination (href), 
 * it adds an "active" class so we can style it differently (e.g., make it purple).
 */
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
      <style jsx>{`
        a {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
          color: var(--text-muted);
        }

        a:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }

        a.active {
          color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </Link>
  );
};

export default NavLink;
