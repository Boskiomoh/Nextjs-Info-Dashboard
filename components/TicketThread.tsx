"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Message {
  message: string;
  sender: string;
  timestamp: string;
  sender_type: string; // 'R' for response (staff), 'M' for message (customer)
}

interface TicketThreadProps {
  ticketNumber: string;
  initialEmail: string;
  onClose: () => void;
  onEmailResolved?: (email: string) => void;
}

export default function TicketThread({
  ticketNumber,
  initialEmail,
  onClose,
  onEmailResolved,
}: TicketThreadProps) {
  const [email, setEmail] = useState(initialEmail || '');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(!!initialEmail);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [reply, setReply] = useState('');
  const [isSending, setIsSending] = useState(false);

  // TanStack Query for retrieving the support thread
  const {
    data: messages,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery<Message[]>({
    queryKey: ['supportThread', ticketNumber, email],
    queryFn: async () => {
      const res = await fetch(`/api/support/thread?number=${ticketNumber}&email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to retrieve ticket details');
      }
      return res.json();
    },
    enabled: isEmailConfirmed && !!ticketNumber && !!email,
  });

  // Auto-scroll to the bottom of the conversation when messages load
  useEffect(() => {
    if (messages && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isRefetching]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    setIsSending(true);
    const userNameDisplay = email ? email.split('@')[0] : "You";
    const res = await fetch('/api/support/reply', {
        method: 'POST',
        body: JSON.stringify({
            ticketNumber,
            email,
            message: reply,
            userName: userNameDisplay
        })
    });

    if (res.ok) {
        setReply('');
        refetch(); // Reload the thread from TanStack Query
    }
    setIsSending(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    setIsEmailConfirmed(true);
    if (onEmailResolved) {
      onEmailResolved(email);
    }
  };

  // If email is not confirmed/provided yet, show a clean verify screen
  if (!isEmailConfirmed) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-950/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors"
          title="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="space-y-6 max-w-md mx-auto py-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366f1]">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Enter Ticket Email</h3>
            <p className="text-slate-400 text-sm">
              Please verify the email address associated with Ticket <span className="font-mono text-[#6366f1] font-bold">#{ticketNumber}</span> to view its conversation.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-sm bg-[#6366f1] hover:bg-[#5558e3] text-white shadow-xl shadow-[#6366f1]/20 hover:shadow-[#6366f1]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Verify & View Thread
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366f1]">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              Ticket <span className="font-mono text-[#6366f1]">#{ticketNumber}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[250px] sm:max-w-md">
              Authorized via {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="p-2 rounded-xl bg-slate-950/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors disabled:opacity-50"
            title="Refresh messages"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isRefetching || (isLoading && isEmailConfirmed) ? 'animate-spin' : ''}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors"
            title="Close details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages / Conversation Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 theme-scrollbar">
        {isLoading ? (
          /* Loading Skeleton */
          <div className="space-y-4 py-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`flex flex-col gap-2 max-w-[70%] ${
                  n % 2 === 0 ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div className="h-3 w-32 bg-slate-800 rounded-full animate-pulse" />
                <div className="h-16 w-64 bg-slate-800/60 rounded-2xl animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h4 className="text-white font-bold">Failed to load conversation</h4>
            <p className="text-slate-400 text-sm max-w-sm">
              {(error as Error).message || 'An error occurred while communicating with the support database.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEmailConfirmed(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-white/5 hover:border-white/10 transition-colors"
              >
                Change Email
              </button>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-[#6366f1] text-white rounded-xl text-xs font-bold hover:bg-[#5558e3] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <p className="text-slate-500 text-sm">No messages found for this ticket.</p>
          </div>
        ) : (
          /* Actual message list */
          <div className="flex flex-col space-y-4 py-2">
            {messages.map((msg, i) => {
              // Use .toUpperCase() to ensure it catches 'r' or 'R'
              const isSupport = msg.sender_type?.toUpperCase() === 'R';

              return (
                <div 
                  key={i} 
                  className={`max-w-[80%] p-3 rounded-xl flex flex-col ${
                    isSupport 
                      ? 'bg-blue-600 self-start mr-auto items-start text-left' // Support Team
                      : 'bg-slate-700 self-end ml-auto items-end text-right'   // You
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">
                    {isSupport ? 'Support Team' : (email ? email.split('@')[0] : 'You')} • {new Date(msg.timestamp).toLocaleString()}
                  </p>
                  
                  <div 
                    className={`text-sm prose prose-invert max-w-full ${isSupport ? 'text-left' : 'text-right'}`}
                    dangerouslySetInnerHTML={{ __html: msg.message }} 
                  />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Reply Form */}
      {isEmailConfirmed && !isLoading && !error && (
        <form onSubmit={handleReply} className="mt-4 flex gap-2 border-t border-white/10 pt-4 shrink-0">
          <input 
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#6366f1]/50"
          />
          <button 
              disabled={isSending || !reply.trim()}
              className="bg-[#6366f1] px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-[#5558e3] disabled:opacity-50"
          >
              {isSending ? "..." : "Send"}
          </button>
        </form>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between shrink-0 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        <span>System: Live connection</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Synchronized
        </span>
      </div>
    </div>
  );
}
