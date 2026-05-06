'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      {/* Icon/Visual */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-red-500/20 blur-2xl rounded-full animate-pulse"></div>
        <div className="relative w-24 h-24 bg-slate-900 border border-red-500/50 rounded-3xl flex items-center justify-center shadow-2xl">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
        Something went wrong!
      </h2>
      
      <p className="text-slate-400 text-lg max-w-md mb-10 font-medium">
        We ran into an issue while fetching the latest tech articles. This might be a temporary network problem.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            reset(); 
            window.location.reload(); 
            }
          }
          className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Try Again
        </button>
        
        <Link
          href="/"
          className="px-8 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl border border-white/5 hover:bg-slate-700 hover:text-white transition-all duration-300"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Technical details for developers */}
      <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-2xl">
        <p className="text-slate-600 text-sm font-mono break-all">
          Error Log: {error.message || 'Unknown fetching error'}
        </p>
      </div>
    </div>
  );
}
