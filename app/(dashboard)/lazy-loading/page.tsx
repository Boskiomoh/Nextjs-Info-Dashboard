'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ConceptCard from '@/components/ConceptCard';

// This component will only be loaded when we need it
const CryptoMarket = dynamic(() => import('@/components/CryptoMarket'), {
  loading: () => (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#6366f1] font-bold animate-pulse">Downloading Market Module...</p>
    </div>
  ),
  ssr: false 
});

export default function LazyLoadingPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-[#6366f1] mb-2 leading-none">Lazy Loading</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Optimize performance by loading code only when needed.</p>
      </div>

      <div className="p-12 text-center bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <button 
          onClick={() => setShow(!show)} 
          className="relative z-10 px-10 py-5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#6366f1]/25 border border-white/10"
        >
          {show ? 'Close Market Module' : 'Explore Market Data'}
        </button>
        
        {show && (
          <div className="relative z-10 mt-10 p-10 border-2 border-dashed border-[#6366f1]/20 rounded-3xl animate-fade-in bg-[#6366f1]/5 backdrop-blur-sm text-left">
            <CryptoMarket />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard 
          tag="Concept"
          title="Dynamic Imports"
          description="Use 'next/dynamic' to split your code. This means the browser doesn't download the component code until the user actually needs to see it."
        />
        <ConceptCard 
          tag="Benefit"
          title="Faster LCP"
          description="By reducing the initial JavaScript bundle size, your page becomes interactive much faster, improving your Google Lighthouse scores."
        />
        <ConceptCard 
          tag="Suspense"
          title="Loading States"
          description="You can provide a fallback component (like a spinner) to show while the heavy component is being downloaded."
        />
      </div>
    </div>
  );
}
