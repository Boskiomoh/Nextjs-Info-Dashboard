import React from 'react';
import Link from 'next/link';
import { DevToArticle } from '@/types';

const NewsFeed = async () => {
  const baseUrl = process.env.DEVTO_API_URL || 'https://dev.to/api/articles';
  
  // We fetch "latest" by not providing an ID, and we add some artificial delay 
  // to demonstrate the Skeleton loading effect
  const res = await fetch(`${baseUrl}?per_page=9&top=7`, {
    next: { revalidate: 600 } // Cache for 10 minutes
  });

  if (!res.ok) return <p className="text-red-400">Failed to load news.</p>;

  const articles: DevToArticle[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="pro-card group">
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
  );
};

export default NewsFeed;
