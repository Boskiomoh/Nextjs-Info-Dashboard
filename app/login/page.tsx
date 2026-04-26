'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (username.trim()) {
      const success = await login(username, password);
      if (success) {
        toast.success(`Welcome back, ${username}!`, {
          description: "You have successfully logged into your dashboard.",
        });
        router.push('/');
      } else {
        toast.error('Authentication Failed', {
          description: 'Invalid username or password. Please try again.',
        });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Layout title="Login | Next.js Study" hideNav={true}>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-card glass">
          <h2>Welcome Back</h2>
          <p>Login to your study dashboard</p>
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="e.g. NextStudent" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem;
          text-align: center;
        }

        h2 { font-size: 2rem; margin-bottom: 0.5rem; }
        p { color: var(--text-muted); margin-bottom: 2rem; }

        .input-group {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
        }

        input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .login-btn {
          width: 100%;
          padding: 0.75rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .login-btn:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
