'use client';

import React, { useState } from 'react';
import ConceptCard from '@/components/ConceptCard';

export default function CssDemoPage() {
  const [color, setColor] = useState('#6366f1');

  return (
    <div className="py-10 flex flex-col items-center">
      <section className="mb-16 text-center max-w-3xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1] mb-4 tracking-tighter">Styling in Next.js</h1>
        <p className="text-slate-400 text-xl font-medium">Mastering modern styling techniques with Tailwind and React.</p>
      </section>
      <div className="p-12 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] text-center mb-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-50"></div>
        
        <h2 
          className="text-5xl font-black mb-6 transition-all duration-500 tracking-tight"
          style={{ color }}
        >
          Dynamic Styling Demo
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          Tailwind makes it easy to handle dynamic states. Use standard React state to swap colors instantly without writing custom CSS.
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setColor('#f43f5e')} 
            className="px-8 py-3 rounded-2xl bg-[#f43f5e] text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-rose-500/20"
          >
            Rose Red
          </button>
          <button 
            onClick={() => setColor('#10b981')} 
            className="px-8 py-3 rounded-2xl bg-[#10b981] text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            Emerald Green
          </button>
          <button 
            onClick={() => setColor('#6366f1')} 
            className="px-8 py-3 rounded-2xl bg-[#6366f1] text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
          >
            Indigo (Default)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ConceptCard 
          tag="Standard"
          title="Tailwind CSS"
          description="The industry standard. Utility-first classes that work perfectly with Next.js Server and Client components."
        />
        <ConceptCard 
          tag="Global"
          title="CSS Variables"
          description="Use :root variables in your globals.css to create a consistent theme that works across your whole app."
        />
        <ConceptCard 
          tag="Advanced"
          title="Glassmorphism"
          description="Combine backdrop-blur and semi-transparent borders to create premium, high-end user interfaces."
        />
      </div>
    </div>
  );
}
