'use client';

import React, { ReactNode } from 'react';
import NavLink from '@/components/NavLink';
import { toast } from 'sonner';
import { LayoutProps } from '@/types';

/**
 * LAYMAN EXPLANATION:
 * This is a "Wrapper" or "Layout" component. 
 * Instead of repeating the Navigation bar on every single page, we put it here once.
 * Any page wrapped with <Layout> will automatically get this navigation and structure.
 * This is a core React/Next.js pattern for keeping your code "DRY" (Don't Repeat Yourself).
 */
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

const Layout: React.FC<LayoutProps> = ({ children, title = 'Next.js Study Portal', hideNav = false }) => {
  const { user, logout, isLoading } = useAuthStore();
  const router = useRouter();

  return (
    <div className="app-wrapper">
      {!hideNav && (
        <header className="pro-navbar">
          <div className="nav-container">
            <div className="nav-logo">
              NextJS<span>Study</span>
            </div>
            
            <nav>
              <ul className="flex items-center gap-4 list-none p-0 m-0">
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
            
            <div className="flex items-center gap-6 pl-8 border-l border-white/10 min-w-[180px] justify-end">
              {isLoading ? (
                <div className="h-4 w-12 bg-slate-700 animate-pulse rounded"></div>
              ) : user ? (
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status</span>
                    <span className="text-sm font-bold text-[#6366f1]">{user.username}</span>
                  </div>
                  <button 
                    onClick={async () => {
                      await logout();
                      toast.info("Logged out successfully");
                      router.push('/login');
                    }} 
                    className="btn-logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink href="/login">Login</NavLink>
              )}
            </div>
          </div>
        </header>
      )}

      <main className="content-main animate-fade-in">
        {children}
      </main>

      <footer className="mt-auto px-12 py-10 text-center opacity-50 text-sm">
        <p>© 2026 Next.js Study Project • Built with Vanilla CSS & Tailwind</p>
      </footer>
    </div>
  );
};

export default Layout;
