import React, { Suspense } from 'react';
import NewsFeed from '@/components/NewsFeed';
import NewsSkeleton from '@/components/NewsSkeleton';

export const metadata = {
  title: 'Latest Tech News | Next.js Study',
  description: 'Real-time trending articles from the developer community.',
};

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="animate-fade-in">
        <h1 className="text-5xl font-black tracking-tight text-[#6366f1] mb-2 leading-none">
          Tech News
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Real-time trending articles streamed directly from the developer community.
        </p>
      </header>

      {/* 
        This is the magic part! 
        The rest of the page (Sidebar, Header) loads instantly.
        The NewsFeed "streams" in the moment it's ready.
      */}
      <Suspense fallback={<NewsSkeleton />}>
        <NewsFeed />
      </Suspense>
    </div>
  );
}
