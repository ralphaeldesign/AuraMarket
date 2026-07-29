import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Subscribed!', 'Thank you for subscribing to our newsletter. Enjoy $15 off code: WELCOME20', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 bg-slate-800/80 rounded-3xl border border-slate-700/60 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Free Express Delivery</h5>
              <p className="text-xs text-slate-400 mt-0.5">Free shipping on all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Safe & Secure Payments</h5>
              <p className="text-xs text-slate-400 mt-0.5">256-bit encrypted SSL checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">30 Days Easy Return</h5>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">24/7 VIP Support</h5>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated live customer agent desk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
        {/* Col 1: About & Info */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              A
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              AURA<span className="text-orange-500">MARKET</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            AuraMarket is your destination for world-class electronics, fashion, smartphones, home living, and sports gear with lightning-fast delivery and unbeatable prices.
          </p>

          <div className="flex flex-col gap-2 text-xs text-slate-400 mt-2">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>100 Market Plaza, Suite 400, San Francisco, CA 94103</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <span>+1 (800) 555-AURA (2872)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>support@auramarket.com</span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2.5">
            Customer Service
          </h5>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Help & FAQ Center</Link></li>
            <li><Link to="/orders" className="hover:text-orange-400 transition-colors">Order Tracking</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition-colors">Shipping & Delivery Info</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Returns & Refunds Policy</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2.5">
            Top Categories
          </h5>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li><Link to="/shop?category=Electronics" className="hover:text-orange-400 transition-colors">Electronics & Audio</Link></li>
            <li><Link to="/shop?category=Phones" className="hover:text-orange-400 transition-colors">Smartphones & 5G</Link></li>
            <li><Link to="/shop?category=Fashion" className="hover:text-orange-400 transition-colors">Apparel & Apparel</Link></li>
            <li><Link to="/shop?category=Shoes" className="hover:text-orange-400 transition-colors">Sneakers & Footwear</Link></li>
            <li><Link to="/shop?category=Gaming" className="hover:text-orange-400 transition-colors">Gaming & Consoles</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter Signup */}
        <div>
          <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2.5">
            Stay Connected
          </h5>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Subscribe to get $15 instant discount voucher and special member sale alerts.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2.5 pl-3 pr-10 bg-slate-800 text-white rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-orange-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> No spam. Unsubscribe anytime.
            </span>
          </form>
        </div>
      </div>

      {/* Bottom Bar & Payments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 AuraMarket Inc. All rights reserved. Built with React + Vite + Tailwind CSS.</p>

        {/* Payment Badges */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-slate-400">Accepted Payments:</span>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] border border-slate-700">VISA</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] border border-slate-700">MC</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] border border-slate-700">AMEX</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] border border-slate-700">PAYPAL</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] border border-slate-700">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
