import React from 'react';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import { DevToArticle } from '@/types';

export const metadata = {
  title: 'Tech Insights | Dev.to Feed',
};

async function getArticles(): Promise<DevToArticle[]> {
  const baseUrl = process.env.DEVTO_API_URL;
  const res = await fetch(`${baseUrl}?per_page=10`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="py-8 flex flex-col items-center">
      <section className="mb-16 text-center max-w-3xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4 tracking-tighter">Tech Insights</h1>
        <p className="text-slate-400 text-xl font-medium">Real-time developer articles fetched from the Dev.to API.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((article: DevToArticle) => (
          <Link key={article.id} href={`/blog/${article.id}`} className="group">
            <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              {article.cover_image && (
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={article.cover_image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tag_list.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-[#6366f1] bg-[#6366f1]/10 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6366f1] transition-colors">{article.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">{article.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500 font-medium italic">⏱️ {article.reading_time_minutes} min read</span>
                  <span className="text-xs text-[#6366f1] font-bold group-hover:translate-x-1 transition-transform">Read Full Article →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
