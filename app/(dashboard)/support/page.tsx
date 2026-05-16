"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export default function SupportPage() {
    const { user } = useAuthStore();
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.subject || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        setStatus("sending");
        
        try {
            const response = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user?.username || "Guest User",
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ email: '', subject: '', message: '' });
                toast.success("Ticket Sent Successfully!");
            } else {
                const data = await response.json();
                setStatus("error");
                toast.error(data.error || "Failed to send ticket");
            }
        } catch (error) {
            setStatus("error");
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-white tracking-tight">Support <span className="text-[#6366f1]">Center</span></h1>
                <p className="text-slate-400">Have a question or feedback? Submit a ticket to our support team.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#6366f1]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                        <input 
                            type="text" 
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Briefly describe your issue"
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                        <textarea 
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us more about how we can help..."
                            rows={6}
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 transition-all placeholder:text-slate-600 resize-none"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            status === 'sending' 
                            ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                            : 'bg-[#6366f1] hover:bg-[#5558e3] text-white shadow-xl shadow-[#6366f1]/20 hover:shadow-[#6366f1]/40 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                    >
                        {status === 'sending' ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Sending Ticket...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                Submit Ticket
                            </>
                        )}
                    </button>
                </form>

                {status === 'success' && (
                    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm font-medium animate-fade-in">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Your support ticket has been received! We'll get back to you soon.
                    </div>
                )}
            </div>

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
        </div>
    );
}
