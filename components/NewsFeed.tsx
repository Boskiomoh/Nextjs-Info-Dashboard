'use client'

import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '@/lib/api-urls';
import Link from 'next/link';
import { DevToArticle } from '@/types';

const NewsFeed = ({ page = 1 }: { page?: number }) => {
  const perPage = 3;
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(false);
      try {
        const domain = API_CONFIG.getInternalBaseUrl();
        // STYLE: Automatically uses relative path in browser, absolute on server
        const res = await fetch(`${domain}/api/news?per_page=${perPage}&page=${page}`);
        
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        
        setArticles(data);
        setIsLastPage(data.length < perPage);
      } catch (err) {
        console.error('NewsFeed error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [page]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-80 bg-slate-800/50 rounded-2xl border border-white/5" />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-400 font-bold">Failed to load news. Check console for details.</p>;
  return (
    <div className="space-y-12">
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
        {/* {page > 1 && (
          <Link 
            href={`/news?page=1`}
            className="px-4 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-[#6366f1] rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5 hover:border-[#6366f1]/50"
            title="First Page"
          >
            First
          </Link>
        )} */}

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
          // We show a window of pages around the current page
          // If we haven't hit the end, we allow going forward
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
          title={isLastPage ? "You are on the Last Page" : "End of data not reached yet"}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
