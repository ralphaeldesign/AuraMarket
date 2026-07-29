import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, Sparkles, Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('VIP Access Granted!', 'Coupon code WELCOME20 sent to your inbox. Enjoy 20% off!', 'success');
      setEmail('');
    }
  };

  return (
    <section className="my-14 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
        <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          JOIN AURA VIP CLUB
        </span>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Get 20% Off Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
          Sign up for our newsletter to receive exclusive member drops, flash deal invitations, and personalized recommendations.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 pl-10 pr-4 bg-slate-800 text-white text-xs rounded-2xl border border-slate-700 focus:outline-none focus:border-orange-500 placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Claim Discount</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
