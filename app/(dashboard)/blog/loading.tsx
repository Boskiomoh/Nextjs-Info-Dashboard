import React from 'react';

export default function Loading() {
  return (
    <div className="py-8 flex flex-col items-center animate-pulse">
      {/* Header Skeleton */}
      <section className="mb-16 text-center max-w-3xl w-full">
        <div className="h-16 bg-white/5 rounded-2xl w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto"></div>
      </section>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 w-full max-w-7xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[450px] flex flex-col bg-slate-800/20 border border-white/5 rounded-2xl overflow-hidden">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-white/5"></div>
            
            <div className="p-6 flex flex-col flex-grow">
              {/* Tags placeholder */}
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-4 bg-white/5 rounded-full"></div>
                <div className="w-16 h-4 bg-white/5 rounded-full"></div>
              </div>
              
              {/* Title placeholder */}
              <div className="h-8 bg-white/5 rounded-lg w-full mb-3"></div>
              <div className="h-8 bg-white/5 rounded-lg w-2/3 mb-6"></div>
              
              {/* Description placeholder */}
              <div className="h-4 bg-white/5 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-white/5 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-white/5 rounded-lg w-4/5 mb-6"></div>
              
              {/* Footer placeholder */}
              <div className="mt-auto flex justify-between items-center">
                <div className="w-20 h-4 bg-white/5 rounded-lg"></div>
                <div className="w-24 h-4 bg-white/5 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center items-center gap-3">
        <div className="w-20 h-10 bg-white/5 rounded-xl"></div>
        <div className="w-10 h-10 bg-white/5 rounded-xl"></div>
        <div className="w-10 h-10 bg-white/5 rounded-xl"></div>
        <div className="w-10 h-10 bg-white/5 rounded-xl"></div>
        <div className="w-20 h-10 bg-white/5 rounded-xl"></div>
      </div>
    </div>
  );
}
