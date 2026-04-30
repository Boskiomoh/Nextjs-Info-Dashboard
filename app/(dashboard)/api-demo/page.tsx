'use client';

import React, { useState } from 'react';
import ConceptCard from '@/components/ConceptCard';
import { toast } from 'sonner';
import { useSessionStore } from '@/stores/sessionStore';

export default function ApiDemoPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const { tempApiKey } = useSessionStore();

  const fetchApi = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/hello`, {
        headers: {
          'X-Temp-Key': tempApiKey || 'none'
        }
      });
      const json = await res.json();
      
      // Simulating a more interesting response if a key is present
      const enhancedData = {
        ...json,
        session_security: tempApiKey ? '🔐 Authorized via Session Token' : '⚠️ No Session Token Found',
        sent_header: tempApiKey ? `Bearer ${tempApiKey.substring(0, 4)}...` : 'None'
      };
      
      setData(enhancedData);
      toast.success("API Response Received", {
        description: tempApiKey ? "Authenticated request successful!" : "Unauthenticated request successful!"
      });
    } catch (e) {
      console.error(e);
      toast.error("API Fetch Failed", {
        description: "Could not connect to the server."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex flex-col items-center">
      <section className="mb-16 text-center max-w-3xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899] mb-4 tracking-tighter">Full-Stack Next.js</h1>
        <p className="text-slate-400 text-xl font-medium">API routes allow you to build robust backends directly inside your app.</p>
      </section>
      <div className="p-12 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] mb-16 shadow-2xl relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Try it Out</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Click the button to trigger a real server-side fetch to your API route. 
              The response is fetched on-demand and displayed below.
            </p>
            <button 
              onClick={fetchApi} 
              disabled={loading} 
              className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${
                loading 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-[#6366f1] text-white hover:scale-105 shadow-indigo-500/30'
              }`}
            >
              {loading ? '⚡ Fetching Data...' : '🚀 Call API Route'}
            </button>
          </div>

          <div className="w-full md:w-1/2">
            {data ? (
              <div className="animate-fade-in">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Server Response</span>
                </div>
                <pre className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-emerald-400 text-sm overflow-x-auto shadow-inner">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center text-slate-600 font-medium italic">
                Awaiting server interaction...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ConceptCard 
          tag="Structure"
          title="The /api Folder"
          description="Any file in 'app/api/*/route.ts' is mapped to '/api/*'. These provide JSON instead of HTML."
        />
        <ConceptCard 
          tag="Security"
          title="Server-Only"
          description="API routes run strictly on the server. Safely access databases or secret keys here."
        />
        <ConceptCard 
          tag="Control"
          title="HTTP Methods"
          description="Handle GET, POST, PUT, DELETE with clean, named function exports."
        />
      </div>
    </div>
  );
}
