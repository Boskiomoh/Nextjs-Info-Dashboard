import React from 'react';
import postsData from '@/data/posts.json';
import { PostsData, PageProps } from '@/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const posts = postsData as PostsData;
  const post = id ? posts[id] : null;

  return {
    title: post ? `${post.title} | Next.js Study` : 'Post Not Found',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const posts = postsData as PostsData;
  const post = id ? posts[id] : null;

  if (!post) {
    notFound();
  }

  return (
    <article className="post-container animate-fade-in">
      <header>
        <span className="category">Study Note</span>
        <h1>{post.title}</h1>
        <div className="meta">
          <span className="date">📅 {post.date}</span>
          <span className="author">👤 PAPAFAM Student</span>
        </div>
      </header>

      <div className="content">
        <p>{post.content}</p>
        <div className="lesson glass">
          <h4>💡 Next.js Lesson Learned:</h4>
          <p>
            I retrieved this post data using <strong>Server Components</strong>. 
            Next.js saw the ID <strong>"{id}"</strong> in the URL and used it to find 
            the correct post in my data file on the server before sending the HTML to your browser.
          </p>
        </div>
      </div>

      <style>{`
        .post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .category {
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        h1 {
          font-size: 3.5rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .meta {
          display: flex;
          gap: 2rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .content {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #cbd5e1;
        }

        .lesson {
          margin-top: 4rem;
          padding: 2rem;
          border-left: 4px solid var(--primary);
        }

        .lesson h4 {
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .lesson p {
          font-size: 1rem;
          margin: 0;
        }
      `}</style>
    </article>
  );
}
