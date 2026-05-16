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
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
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
                <li><NavLink href="/support" collapsed={sidebarCollapsed}>{sidebarCollapsed ? '🎧' : 'Support'}</NavLink></li>
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
                    <div className="relative flex items-center group">
                      <input 
                        type={showApiKey ? "text" : "password"}
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                        placeholder="Bearer..."
                        className="w-full bg-slate-800/50 border border-white/5 rounded px-2 py-1 pr-7 text-[10px] text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 text-slate-500 hover:text-emerald-400 transition-colors p-0.5 rounded-sm hover:bg-white/5"
                        title={showApiKey ? "Hide API Key" : "Show API Key"}
                      >
                        {showApiKey ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        )}
                      </button>
                    </div>
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
                  onClick={() => setIsLogoutModalOpen(true)} 
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

      {/* LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-fade-in"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="relative bg-[#1e293b] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-in">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
              <h3 className="text-xl font-black text-white">Sign Out?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Are you sure you want to log out? Your current session vault will be cleared for security.
              </p>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors border border-white/5"
                >
                  Stay
                </button>
                <button 
                  onClick={async () => {
                    await logout();
                    setIsLogoutModalOpen(false);
                    toast.info("Logged out successfully");
                    router.push('/login');
                  }}
                  className="flex-1 px-4 py-3 rounded-2xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-900/20 border border-rose-500/50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
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
