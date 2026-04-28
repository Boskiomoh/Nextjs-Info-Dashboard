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
import { useSettingsStore } from '@/stores/settingsStore';
import { useSessionStore } from '@/stores/sessionStore';
import { useRouter } from 'next/navigation';

const Layout: React.FC<LayoutProps> = ({ children, title = 'Next.js Study Portal', hideNav = false }) => {
  const { user, logout, isLoading } = useAuthStore();
  const { theme, setTheme, sidebarCollapsed, toggleSidebar } = useSettingsStore();
  const { isPrivacyMode, togglePrivacyMode } = useSessionStore();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  // Hydration guard for persistent stores
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && !hideNav) return <div className="min-h-screen bg-[#0f172a]" />;

  return (
    <div className={`app-wrapper ${theme === 'light' ? 'light' : 'dark'}`}>
      {!hideNav && (
        <aside className={`h-screen sticky top-0 flex flex-col backdrop-blur-xl border-r p-8 shadow-2xl transition-all duration-300 ${sidebarCollapsed ? 'w-24' : 'w-72'} ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/50 border-white/10'}`}>
          <div className="nav-logo mb-12 flex-shrink-0 flex items-center justify-between">
            {!sidebarCollapsed && <div>NextJS<span>Study</span></div>}
            <button 
              onClick={toggleSidebar} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto theme-scrollbar pr-2 -mr-2">
            <ul className="flex flex-col gap-2 list-none p-0 m-0 pb-6">
              <li><NavLink href="/">{sidebarCollapsed ? '🏠' : 'Dashboard'}</NavLink></li>
              <li><NavLink href="/about">{sidebarCollapsed ? 'ℹ️' : 'About'}</NavLink></li>
              <li><NavLink href="/blog">{sidebarCollapsed ? '📝' : 'Blog'}</NavLink></li>
              <li><NavLink href="/news">{sidebarCollapsed ? '📰' : 'News Feed'}</NavLink></li>
              <li><NavLink href="/css-demo">{sidebarCollapsed ? '🎨' : 'CSS Demo'}</NavLink></li>
              <li><NavLink href="/api-demo">{sidebarCollapsed ? '🔌' : 'API Demo'}</NavLink></li>
              <li><NavLink href="/ssr-vs-csr">{sidebarCollapsed ? '⚡' : 'SSR/CSR'}</NavLink></li>
              <li><NavLink href="/lazy-loading">{sidebarCollapsed ? '💤' : 'Lazy Loading'}</NavLink></li>
              <li><NavLink href="/deployment">{sidebarCollapsed ? '🚀' : 'Deployment'}</NavLink></li>
            </ul>
          </nav>

          {/* Persistence Demo Controls */}
          {!sidebarCollapsed && (
            <div className="py-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Theme (Local)</span>
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-6 bg-slate-800 rounded-full relative p-1 transition-colors hover:bg-slate-700"
                >
                  <div className={`w-4 h-4 bg-[#6366f1] rounded-full transition-transform ${theme === 'light' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Privacy (Session)</span>
                <button 
                  onClick={togglePrivacyMode}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${isPrivacyMode ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}
                >
                  {isPrivacyMode ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-auto pt-6 border-t border-white/10 w-full flex-shrink-0">
            {isLoading ? (
              <div className="h-4 w-12 bg-slate-700 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  {!sidebarCollapsed && <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status</span>}
                  <span className="text-sm font-bold text-[#6366f1] truncate">{user.username}</span>
                </div>
                <button 
                  onClick={async () => {
                    await logout();
                    toast.info("Logged out successfully");
                    router.push('/login');
                  }} 
                  className="btn-logout w-full text-center text-xs"
                >
                  {sidebarCollapsed ? '🚪' : 'Logout'}
                </button>
              </div>
            ) : (
              <NavLink href="/login">{sidebarCollapsed ? '🔑' : 'Login'}</NavLink>
            )}
          </div>
        </aside>
      )}

      <div className={`flex-1 flex flex-col min-w-0 ${isPrivacyMode ? 'blur-sm grayscale' : ''}`}>
        <main className="content-main animate-fade-in flex-1 w-full max-w-7xl mx-auto px-8 py-10">
          {children}
        </main>

        <footer className="mt-auto px-12 py-10 text-center opacity-50 text-sm border-t border-white/5">
          <p>© 2026 Next.js Study Project • Multi-Tier Persistence Active</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
