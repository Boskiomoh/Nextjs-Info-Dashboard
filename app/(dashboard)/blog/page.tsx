import { API_CONFIG } from '@/lib/api-urls';
import Link from 'next/link';
import { DevToArticle } from '@/types';

export const metadata = {
  title: 'Tech Insights | Dev.to Feed',
};

async function getArticles(page = 1, perPage = 3): Promise<DevToArticle[]> {
  const domain = API_CONFIG.getInternalBaseUrl();
  const res = await fetch(`${domain}/api/news?per_page=${perPage}&page=${page}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || '1', 10);
  const perPage = 3; // Matching the grid layout (2 rows of 3)
  const articles = await getArticles(currentPage, perPage);
  const isLastPage = articles.length < perPage;

  return (
    <div className="py-8 flex flex-col items-center">
      <section className="mb-16 text-center max-w-3xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4 tracking-tighter">Tech Insights</h1>
        <p className="text-slate-400 text-xl font-medium">Real-time developer articles fetched from the Dev.to API.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 w-full max-w-7xl">
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

      {/* Spreading out the Pagination Controls */}
      <div className="flex justify-center items-center gap-3">
        {currentPage > 1 && (
          <Link 
            href={`/blog?page=1`}
            className="px-4 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-[#6366f1] rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5 hover:border-[#6366f1]/50"
            title="First Page"
          >
            First
          </Link>
        )}

        {currentPage > 1 && (
          <Link 
            href={`/blog?page=${currentPage - 1}`}
            className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5 hover:border-[#6366f1]/50"
            title="Previous Page"
          >
            ←
          </Link>
        )}
        
        {(() => {
          const range = [];
          const start = Math.max(1, currentPage - 2);
          const end = isLastPage ? currentPage : currentPage + 2;
          
          for (let i = start; i <= end; i++) {
            range.push(i);
          }

          return range.map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all border ${
                currentPage === p 
                  ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                  : 'bg-slate-800 text-slate-400 border-white/5 hover:border-[#6366f1]/50 hover:text-white'
              }`}
            >
              {p}
            </Link>
          ));
        })()}

        {!isLastPage && (
          <Link 
            href={`/blog?page=${currentPage + 1}`}
            className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5 hover:border-[#6366f1]/50"
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
}
