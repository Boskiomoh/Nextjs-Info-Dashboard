import React from 'react';

const NewsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 h-[400px] flex flex-col">
          <div className="w-full h-48 bg-white/5 rounded-2xl mb-6"></div>
          <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-white/5 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-white/5 rounded-lg w-5/6 mb-auto"></div>
          <div className="h-10 bg-white/5 rounded-xl w-full mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;
