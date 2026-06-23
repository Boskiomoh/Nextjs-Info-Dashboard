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
    
    if (!username.trim()) return;

    setIsSubmitting(true);
    try {
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
    } catch {
      toast.error('Error', {
        description: 'Something went wrong. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Login | Next.js Study" hideNav={true}>
      <div className="flex items-center justify-center min-h-[70vh]">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md p-10 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl animate-fade-in"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2 leading-none">Welcome Back</h2>
            <p className="text-slate-400">Login to your study dashboard</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email Username</label>
              <input 
                type="email" 
                placeholder="e.g. admin@example.com" 
                className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all placeholder:text-slate-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all placeholder:text-slate-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-8 px-6 py-4 bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#6366f1]/20 border border-white/10"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
