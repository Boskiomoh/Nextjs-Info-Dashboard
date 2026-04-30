'use client';

import React from 'react';
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

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const { user, logout, isLoading } = useAuthStore();
  const { 
    theme, setTheme, sidebarCollapsed, toggleSidebar 
  } = useSettingsStore();
  const { 
    secureNote, setSecureNote, 
    tempApiKey, setTempApiKey 
  } = useSessionStore();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  // Hydration guard for persistent stores
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted && !hideNav) return <div className="min-h-screen bg-[#0f172a]" />;

  return (
    <div className={`app-wrapper ${theme === 'light' ? 'light' : 'dark'}`}>
      {!hideNav && (
        <aside className={`h-screen sticky top-0 flex flex-col backdrop-blur-xl border-r shadow-2xl transition-all duration-300 ${sidebarCollapsed ? 'w-20 px-3 py-8' : 'w-72 p-8'} ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/50 border-white/10'}`}>
          <div className="nav-logo mb-8 flex-shrink-0 flex items-center justify-between">
            {!sidebarCollapsed && <div>NextJS<span>Study</span></div>}
            <button 
              onClick={toggleSidebar} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          {/* TOP SECTION: Main Navigation */}
          <div className={`flex flex-col min-h-0 ${sidebarCollapsed ? 'flex-1' : 'h-[40%]'}`}>
            {!sidebarCollapsed && <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-4">Navigation</span>}
            <nav className={`flex-1 theme-scrollbar overflow-x-hidden overflow-y-auto ${sidebarCollapsed ? '' : 'pr-2 -mr-2'}`}>
              <ul className="flex flex-col gap-2 list-none p-0 m-0 pb-4">
                <li><NavLink href="/" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🏠' : 'Dashboard'}</NavLink></li>
                <li><NavLink href="/about" collapsed={sidebarCollapsed}>{sidebarCollapsed ? 'ℹ️' : 'About'}</NavLink></li>
                <li><NavLink href="/blog" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '📝' : 'Blog'}</NavLink></li>
                <li><NavLink href="/news" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '📰' : 'News Feed'}</NavLink></li>
                <li><NavLink href="/css-demo" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🎨' : 'CSS Demo'}</NavLink></li>
                <li><NavLink href="/api-demo" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🔌' : 'API Demo'}</NavLink></li>
                <li><NavLink href="/ssr-vs-csr" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '⚡' : 'SSR/CSR'}</NavLink></li>
                <li><NavLink href="/lazy-loading" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '💤' : 'Lazy Loading'}</NavLink></li>
                <li><NavLink href="/deployment" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🚀' : 'Deployment'}</NavLink></li>
              </ul>
            </nav>
          </div>

          {/* BOTTOM SECTION: Tools & Controls */}
          {!sidebarCollapsed && (
            <div className="flex-1 flex flex-col min-h-0 border-t border-white/10 mt-4 pt-4">
              <div className="flex-1 theme-scrollbar overflow-y-auto pr-2 -mr-2 space-y-6 pb-4">
                {/* Secure Vault */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Secure Vault</span>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Temp API Key</label>
                    <input 
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="Bearer..."
                      className="bg-slate-800/50 border border-white/5 rounded px-2 py-1 text-[10px] text-emerald-400 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Scratchpad</label>
                    <textarea 
                      value={secureNote}
                      onChange={(e) => setSecureNote(e.target.value)}
                      placeholder="Secret notes..."
                      rows={2}
                      className="bg-slate-800/50 border border-white/5 rounded px-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-[#6366f1]/50 resize-none"
                    />
                  </div>
                </div>

                {/* Persistence Controls */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Global Settings</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">Theme</span>
                    <button 
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="w-10 h-6 bg-slate-800 rounded-full relative p-1 transition-colors hover:bg-slate-700"
                    >
                      <div className={`w-4 h-4 bg-[#6366f1] rounded-full transition-transform ${theme === 'light' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
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
              <NavLink href="/login" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🔑' : 'Login'}</NavLink>
            )}
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
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
