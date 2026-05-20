'use client'

import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { API_CONFIG } from '@/lib/api-urls';
import Link from 'next/link';
import { DevToArticle } from '@/types';

const perPage = 3;

async function fetchNews(page: number): Promise<DevToArticle[]> {
  const domain = API_CONFIG.getInternalBaseUrl();
  const res = await fetch(`${domain}/api/news?per_page=${perPage}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

const NewsFeed = ({ page = 1 }: { page?: number }) => {
  // TanStack Query: each page is cached separately via queryKey: ['news', page]
  const { data: articles = [], isLoading, isError, isFetching } = useQuery({
    queryKey: ['news', page],
    queryFn: () => fetchNews(page),
    staleTime: 1000 * 60 * 5,         // cache each page for 5 minutes
    placeholderData: keepPreviousData, // show old page while new page loads (no flicker)
  });

  const isLastPage = articles.length < perPage;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-80 bg-slate-800/50 rounded-2xl border border-white/5" />
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-red-400 font-bold">Failed to load news. Check console for details.</p>;

  return (
    <div className="space-y-12">
      {/* Subtle pill indicator during background page transitions (thanks to keepPreviousData) */}
      {isFetching && (
        <div className="fixed top-4 right-4 z-50 px-3 py-1 bg-[#6366f1]/90 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="pro-card group h-full flex flex-col">
            <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
              <img
                src={article.cover_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400'}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tag_list?.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] uppercase bg-[#6366f1]/20 text-[#6366f1] px-2 py-1 rounded font-bold">
                  #{tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#6366f1] transition-colors">
              {article.title}
            </h3>

            <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
              {article.description}
            </p>

            <Link
              href={`/blog/${article.id}`}
              className="mt-auto px-6 py-3 bg-white/5 hover:bg-[#6366f1] text-white rounded-xl font-bold text-center transition-all border border-white/5 hover:border-[#6366f1]/50"
            >
              Read Article
            </Link>
          </div>
        ))}
      </div>

      {/* Numbered Pagination Controls */}
      <div className="flex justify-center items-center gap-2">
        {page > 1 && (
          <Link
            href={`/news?page=${page - 1}`}
            className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5"
            title="Previous Page"
          >
            ←
          </Link>
        )}

        {(() => {
          const range = [];
          const start = Math.max(1, page - 2);
          const end = isLastPage ? page : page + 2;

          for (let i = start; i <= end; i++) {
            range.push(i);
          }

          return range.map((p) => {
            const pageNum = p as number;
            return (
              <Link
                key={pageNum}
                href={`/news?page=${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all border ${
                  page === pageNum
                    ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : 'bg-slate-800 text-slate-400 border-white/5 hover:border-[#6366f1]/50 hover:text-white'
                }`}
              >
                {pageNum}
              </Link>
            );
          });
        })()}

        {!isLastPage && (
          <Link
            href={`/news?page=${page + 1}`}
            className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5"
            title="Next Page"
          >
            →
          </Link>
        )}

        <button
          disabled={!isLastPage}
          className={`px-4 h-10 flex items-center justify-center rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
            isLastPage
              ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.4)]'
              : 'bg-slate-800 text-slate-500 border-white/5 opacity-50 cursor-not-allowed'
          }`}
          title={isLastPage ? 'You are on the Last Page' : 'End of data not reached yet'}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
