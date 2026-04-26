import React from 'react';
import { NextPageContext } from 'next';
import Layout from '@/components/Layout';
import postsData from '@/data/posts.json';
import { Post, PostsData } from '@/types';

interface BlogPostProps {
  post: Post | null;
  id: string;
}

/**
 * LAYMAN EXPLANATION:
 * This is a "Dynamic Page". The [id] in the filename acts as a variable.
 * Whether you visit /blog/hello-world or /blog/typescript-power, 
 * this same exact code runs.
 * 
 * THE BIG LESSON: getInitialProps
 * This was the original way to fetch data in Next.js.
 * It runs on the SERVER when you first load the page (for fast initial view).
 * It runs on the CLIENT when you click a link (for smooth fast transitions).
 * It "prepares" the data before the component even renders!
 */
const BlogPost = ({ post, id }: BlogPostProps) => {
  if (!post) {
    return (
      <Layout title="Post Not Found">
        <h1>404 Post Not Found</h1>
        <p>Sorry, the post with ID "{id}" does not exist.</p>
      </Layout>
    );
  }

  return (
    <Layout title={`${post.title} | Next.js Study`}>
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
              I retrieved this post data using <code>getInitialProps</code>. 
              Next.js saw the ID <strong>"{id}"</strong> in the URL and used it to find 
              the correct post in my data file before showing this page.
            </p>
          </div>
        </div>
      </article>

      <style jsx>{`
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
    </Layout>
  );
};

/**
 * THE TECHNICAL PART:
 * This function is used to fetch the data required for this page.
 * 'ctx' contains 'query', which holds our dynamic [id].
 */
BlogPost.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  const posts = postsData as PostsData;
  const post = id ? posts[id as string] : null;

  return { post, id: id as string };
};

export default BlogPost;
