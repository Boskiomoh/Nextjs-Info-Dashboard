import React from 'react';
import postsData from '@/data/posts.json';
import { DevToArticle, PageProps } from '@/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const baseUrl = process.env.DEVTO_API_URL;
  
  const res = await fetch(`${baseUrl}/${id}`);
  const post: DevToArticle = await res.json();

  return {
    title: post?.title ? `${post.title} | Tech Insights` : 'Post Not Found',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const baseUrl = process.env.DEVTO_API_URL;

  // Fetch with revalidation (1 hour)
  const res = await fetch(`${baseUrl}/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    notFound();
  }

  const post: DevToArticle = await res.json();

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      {post.cover_image && (
        <img 
          src={post.cover_image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-2xl" 
        />
      )}
      
      <header className="mb-12">
        <div className="flex gap-3 mb-6">
          {post.tag_list?.map((tag: string) => (
            <span key={tag} className="text-sm font-bold text-[#6366f1] tracking-wide">#{tag}</span>
          ))}
        </div>
        <h1 className="text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-slate-400 text-sm pb-8 border-b border-white/10">
          <span className="flex items-center gap-2">📅 {new Date(post.published_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-2">👤 {post.user?.name}</span>
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <p className="text-2xl font-medium text-slate-200 mb-10 leading-relaxed italic border-l-4 border-[#6366f1] pl-6">
          {post.description}
        </p>
        
        <div className="text-slate-300 text-lg leading-loose whitespace-pre-wrap mb-16">
          {post.body_markdown?.split('\n').slice(0, 15).join('\n') || 'No content available.'}...
        </div>

        <div className="bg-[#6366f1]/5 border-l-4 border-[#6366f1] p-8 rounded-r-2xl backdrop-blur-sm">
          <h4 className="text-[#6366f1] font-bold text-xl mb-3">💡 Next.js Pro Tip:</h4>
          <p className="text-slate-300 leading-relaxed">
            This page is now fully powered by <strong>Tailwind CSS</strong>! 
            Unlike <code>styled-jsx</code>, Tailwind works seamlessly inside Server Components, 
            allowing us to build complex, beautiful layouts that are rendered entirely on the server 
            for maximum performance.
          </p>
        </div>
      </div>
    </article>
  );
}
