'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ConceptCard from '@/components/ConceptCard';

export default function RouterDemoPage() {
  const router = useRouter();

  const handleManualNav = () => {
    if (confirm('Do you want to go back to the home page?')) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-[#6366f1] mb-2 leading-none">Programmatic Routing</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Sometimes you need to move users around using code, not just links.</p>
      </div>

      <div className="p-12 text-center bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h3 className="relative z-10 text-2xl font-bold text-emerald-500 mb-2">Need to Redirect?</h3>
        <p className="relative z-10 text-slate-400 mb-8">Clicking the button below uses the <code className="bg-emerald-500/10 px-2 py-1 rounded text-emerald-400">useRouter()</code> hook to navigate.</p>
        
        <button 
          onClick={handleManualNav} 
          className="relative z-10 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/25 border border-white/10"
        >
          Go Home (Programmatically)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard 
          tag="Hook"
          title="useRouter"
          description="In App Router, use 'next/navigation' to get the router object. It allows you to push, replace, or go back/forward in the browser history."
        />
        <ConceptCard 
          tag="Method"
          title="router.push()"
          description="The most common method. It adds a new entry to the browser history, essentially 'clicking' a link via JavaScript logic."
        />
        <ConceptCard 
          tag="Usage"
          title="After Actions"
          description="Commonly used after a form submission or a successful login to take the user to their dashboard automatically."
        />
      </div>
    </div>
  );
}
