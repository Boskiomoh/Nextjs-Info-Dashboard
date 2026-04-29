'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLinkProps } from '@/types';

/**
 * LAYMAN EXPLANATION:
 * The PDF mentions that Next.js's standard <Link> doesn't automatically highlight
 * which page you are currently on. 
 * This custom NavLink component uses the 'usePathname' hook to look at the current 
 * URL in your browser. If the URL matches the link's destination (href), 
 * it adds an "active" class so we can style it differently (e.g., make it purple).
 */
const NavLink: React.FC<NavLinkProps> = ({ href, children, collapsed }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`
        block w-full rounded-xl transition-all duration-300 font-medium
        ${collapsed ? 'text-center px-0 py-3' : 'text-left px-4 py-3'}
        ${isActive 
          ? 'text-[#6366f1] bg-[#6366f1]/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
          : 'text-[var(--text-dim)] hover:text-[#6366f1] hover:bg-[#6366f1]/5 dark:hover:text-white dark:hover:bg-white/5'}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;
