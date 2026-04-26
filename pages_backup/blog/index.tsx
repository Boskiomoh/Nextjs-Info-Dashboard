import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import postsData from '@/data/posts.json';
import { PostsData } from '@/types';

/**
 * LAYMAN EXPLANATION:
 * This is the Blog List page. It lists all the posts from our 'posts.json' file.
 * 
 * THE BIG LESSON:
 * Notice how we use the <Link> component with the 'as' prop?
 * The 'href' tells Next.js which file to use ([id].tsx).
 * The 'as' tells the browser what URL to show in the address bar (/blog/hello-world).
 */
const BlogIndex: React.FC = () => {
  const posts = postsData as PostsData;

  return (
    <Layout title="The Blog | Study Project">
      <section className="blog-header">
        <h1>Dynamic Content</h1>
        <p className="subtitle">Showing how Next.js handles multiple items from a data source.</p>
      </section>

      <div className="post-list">
        {Object.entries(posts).map(([slug, post]) => (
          <Link key={slug} href="/blog/[id]" as={`/blog/${slug}`} className="post-link">
            <div className="post-card glass">
              <div className="post-info">
                <h3>{post.title}</h3>
                <span className="date">{post.date}</span>
              </div>
              <p>{post.content.substring(0, 100)}...</p>
              <span className="read-more">Read Full Post →</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .blog-header {
          margin-bottom: 3rem;
        }
        h1 { font-size: 3rem; color: var(--primary); }
        .subtitle { color: var(--text-muted); }

        .post-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .post-card {
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .post-card:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          transform: scale(1.01);
        }

        .post-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .date {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255,255,255,0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        p { color: var(--text-muted); margin-bottom: 1.5rem; }

        .read-more {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
        }
      `}</style>
    </Layout>
  );
};

export default BlogIndex;
