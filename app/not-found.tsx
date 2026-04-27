'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-[10rem] font-black leading-none tracking-tighter text-[#6366f1] drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] animate-pulse">
          404
        </h1>
        <p className="text-2xl text-slate-400 mt-4 mb-8 max-w-md">
          This page hasn't been built in the curriculum yet!
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#6366f1]/20"
        >
          Back to Dashboard
        </Link>
      </div>
    </Layout>
  );
}
