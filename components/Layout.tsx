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
    <div className="app-wrapper flex flex-row min-h-screen">
      {!hideNav && (
        <aside className="w-72 h-screen sticky top-0 flex flex-col bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-8 shadow-2xl">
          <div className="nav-logo mb-12 flex-shrink-0">
            NextJS<span>Study</span>
          </div>
          
          <nav className="flex-1 overflow-y-auto theme-scrollbar pr-2 -mr-2">
            <ul className="flex flex-col gap-2 list-none p-0 m-0 pb-6">
              <li><NavLink href="/">Dashboard</NavLink></li>
              <li><NavLink href="/about">About</NavLink></li>
              <li><NavLink href="/blog">Blog</NavLink></li>
              <li><NavLink href="/news">News Feed</NavLink></li>
              <li><NavLink href="/css-demo">CSS Demo</NavLink></li>
              <li><NavLink href="/api-demo">API Demo</NavLink></li>
              <li><NavLink href="/ssr-vs-csr">SSR/CSR</NavLink></li>
              <li><NavLink href="/lazy-loading">Lazy Loading</NavLink></li>
              <li><NavLink href="/deployment">Deployment</NavLink></li>
            </ul>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-white/10 w-full flex-shrink-0">
            {isLoading ? (
              <div className="h-4 w-12 bg-slate-700 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status</span>
                  <span className="text-sm font-bold text-[#6366f1]">{user.username}</span>
                </div>
                <button 
                  onClick={async () => {
                    await logout();
                    toast.info("Logged out successfully");
                    router.push('/login');
                  }} 
                  className="btn-logout w-full text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <main className="content-main animate-fade-in flex-1 w-full max-w-7xl mx-auto px-8 py-10">
          {children}
        </main>

        <footer className="mt-auto px-12 py-10 text-center opacity-50 text-sm border-t border-white/5">
          <p>© 2026 Next.js Study Project • Built with Vanilla CSS & Tailwind</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
