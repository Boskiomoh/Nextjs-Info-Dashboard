import React from 'react';
import Link from 'next/link';
import { DevToArticle } from '@/types';

const NewsFeed = async ({ page = 1 }: { page?: number }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const perPage = 3;
  
  // PROXY FETCH (Hidden behind your server)
  const res = await fetch(`${apiUrl}/news?per_page=${perPage}&page=${page}`, {
    next: { revalidate: 600 } 
  });

  if (!res.ok) return <p className="text-red-400">Failed to load news.</p>;

  const articles: DevToArticle[] = await res.json();
  const isLastPage = articles.length < perPage;

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

          return range.map((p, i) => {
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
      </div>
    </div>
  );
};

export default NewsFeed;
