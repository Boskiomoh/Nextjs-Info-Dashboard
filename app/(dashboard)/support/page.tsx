"use client";

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { useSupportStore } from '@/stores/supportStore';
import { toast } from 'sonner';

import { TicketPayload,SavedTicket  } from '@/types';
import TicketThread from '@/components/TicketThread';


async function submitTicket(payload: TicketPayload) {
  const res = await fetch('/api/support', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to send ticket');
  }
  return res.json();
}

export default function SupportPage() {
  const { user } = useAuthStore();

  // Stores the ticket ID returned by osTicket on success
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [ticketList, setTicketList] = useState<SavedTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SavedTicket | null>(null);

  useEffect(() => {
    // Load tickets from browser memory when the page mounts
    const saved = localStorage.getItem('my_tickets');
    if (saved) {
      setTicketList(JSON.parse(saved));
    }
  }, []);

  // Zustand: persists draft across page navigations (sessionStorage)
  const { email, subject, message, setField, clearDraft } = useSupportStore();

  // TanStack Query: handles loading, error, success lifecycle for the API call
  const { mutate, isPending, reset } = useMutation({
    mutationFn: submitTicket,
    onSuccess: (data) => {
      toast.success('Ticket Sent Successfully!');
      
      // Save to localStorage
      const savedTickets = JSON.parse(localStorage.getItem('my_tickets') || '[]');
      const newTicket: SavedTicket = {
        id: data.ticketId,
        subject: subject, // subject from Zustand store is still available here
        date: new Date().toLocaleDateString(),
        email: email, // Store the email used to submit the ticket
      };
      const updatedTickets = [newTicket, ...savedTickets];
      localStorage.setItem('my_tickets', JSON.stringify(updatedTickets));
      
      setTicketList(updatedTickets);
      clearDraft();           // wipe Zustand draft
      setTicketId(data.ticketId); // capture the osTicket ID
    },
    onError: (err: Error) => {
      toast.error(err.message || 'An unexpected error occurred');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    // Reset any previous success/error state before a new attempt
    reset();
    mutate({
      name: user?.username || 'Guest User',
      email,
      subject,
      message,
    });
  };

  // ── Success receipt view ───────────────────────────────────────────────────
  if (ticketId) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Support <span className="text-[#6366f1]">Center</span>
          </h1>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none rounded-3xl" />

          {/* Check icon */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">Ticket Submitted!</h2>
            <p className="text-slate-400 text-sm">Your support reference number is:</p>
          </div>

          {/* Ticket number */}
          <div className="inline-block px-8 py-4 bg-slate-950/60 border border-emerald-500/20 rounded-2xl">
            <span className="text-5xl font-mono font-bold text-emerald-400 tracking-widest">
              #{ticketId}
            </span>
          </div>

          <p className="text-slate-500 text-sm">
            A confirmation has been sent to <span className="text-slate-300 font-medium">{email || 'your email'}</span>.
            Keep your reference number handy — it matches any emails you receive from us.
          </p>

          <button
            onClick={() => { setTicketId(null); reset(); }}
            className="mt-2 text-[#6366f1] text-sm font-semibold hover:text-[#818cf8] transition-colors underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">
          Support <span className="text-[#6366f1]">Center</span>
        </h1>
        <p className="text-slate-400">
          {selectedTicket 
            ? `Viewing conversation thread for support ticket #${selectedTicket.id}.` 
            : 'Have a question or feedback? Submit a ticket to our support team.'}
        </p>
      </div>

      {selectedTicket ? (
        <TicketThread
          ticketNumber={selectedTicket.id}
          initialEmail={selectedTicket.email || ''}
          onClose={() => setSelectedTicket(null)}
          onEmailResolved={(resolvedEmail) => {
            // Update email in local storage so they don't have to enter it again
            const updated = ticketList.map(t => 
              t.id === selectedTicket.id ? { ...t, email: resolvedEmail } : t
            );
            localStorage.setItem('my_tickets', JSON.stringify(updated));
            setTicketList(updated);
            setSelectedTicket(prev => prev ? { ...prev, email: resolvedEmail } : null);
          }}
        />
      ) : (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
          {/* Decorative icon */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366f1]">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* Draft indicator — shows when Zustand has saved data */}
          {(email || subject || message) && (
            <div className="mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Draft saved — your message is preserved if you navigate away.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Email Address
              </label>
              <input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="your@email.com"
                disabled={isPending}
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Subject
              </label>
              <input
                id="support-subject"
                type="text"
                value={subject}
                onChange={(e) => setField('subject', e.target.value)}
                placeholder="Briefly describe your issue"
                disabled={isPending}
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Message
              </label>
              <textarea
                id="support-message"
                value={message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="Tell us more about how we can help..."
                rows={6}
                disabled={isPending}
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600 resize-none disabled:opacity-50"
              />
            </div>

            {/* Submit Button — state driven by TanStack Query */}
            <button
              id="support-submit-btn"
              type="submit"
              disabled={isPending}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isPending
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-[#6366f1] hover:bg-[#5558e3] text-white shadow-xl shadow-[#6366f1]/20 hover:shadow-[#6366f1]/40 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Sending Ticket...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Submit Ticket
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl">
          <h3 className="text-white font-bold mb-1">Response Time</h3>
          <p className="text-slate-500 text-sm">Typically responds within 24 hours.</p>
        </div>
        <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl">
          <h3 className="text-white font-bold mb-1">Office Hours</h3>
          <p className="text-slate-500 text-sm">Monday - Friday, 9AM - 5PM EST.</p>
        </div>
      </div>

      {/* Recent Tickets List */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden mt-8">
        <h3 className="text-xl font-bold text-white mb-6">Your Recent Tickets</h3>
        
        {ticketList.length === 0 ? (
          <p className="text-slate-500 text-sm">No recent tickets found on this device.</p>
        ) : (
          <ul className="space-y-4">
            {ticketList.map((ticket, index) => (
              <li key={index} className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366f1]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#6366f1] font-mono text-sm font-bold tracking-wider">#{ticket.id}</span>
                      <span className="text-slate-500 text-xs px-2 py-0.5 bg-slate-800 rounded-full">{ticket.date}</span>
                    </div>
                    <p className="text-slate-200 font-medium">{ticket.subject}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setTicketId(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-[#6366f1]/15 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-white/5 hover:border-[#6366f1]/30 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
                >
                  View Thread
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
