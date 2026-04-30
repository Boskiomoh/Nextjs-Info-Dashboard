import React from 'react';


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <header className="hero-header animate-fade-in">
        <h1 className="hero-title">
          Mastering Next.js
        </h1>
        <p className="text-[var(--text-dim)] text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          The ultimate interactive study dashboard for modern web development.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-10">
        <div className="pro-card">
          <span className="text-[10px] uppercase font-bold text-[#6366f1] mb-2 tracking-widest">Core Benefit</span>
          <h3 className="text-xl font-black mb-3 text-[var(--text-main)]">Server Rendering</h3>
          <p className="text-[var(--text-dim)] text-sm leading-relaxed">Pages are pre-rendered on the server for instant loading and perfect SEO.</p>
        </div>
        
        <div className="pro-card">
          <span className="text-[10px] uppercase font-bold text-[#6366f1] mb-2 tracking-widest">Feature</span>
          <h3 className="text-xl font-black mb-3 text-[var(--text-main)]">Auto Routing</h3>
          <p className="text-[var(--text-dim)] text-sm leading-relaxed">The file system is your router. No complex configurations needed.</p>
        </div>

        <div className="pro-card">
          <span className="text-[10px] uppercase font-bold text-[#6366f1] mb-2 tracking-widest">Performance</span>
          <h3 className="text-xl font-black mb-3 text-[var(--text-main)]">Code Splitting</h3>
          <p className="text-[var(--text-dim)] text-sm leading-relaxed">Only download the code you need, keeping your app fast and lightweight.</p>
        </div>

        <div className="pro-card">
          <span className="text-[10px] uppercase font-bold text-[#6366f1] mb-2 tracking-widest">Benefit</span>
          <h3 className="text-xl font-black mb-3 text-[var(--text-main)]">Prefetching</h3>
          <p className="text-[var(--text-dim)] text-sm leading-relaxed">Next.js loads your next page before you even click the link.</p>
        </div>
      </div>
    </div>
  );
}
