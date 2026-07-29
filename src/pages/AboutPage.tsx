import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Globe, Zap, Heart, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-orange-100 text-orange-600 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
          OUR MISSION & STORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Redefining Online Shopping For Every Home
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Founded in 2024, AuraMarket connects millions of shoppers worldwide with high-performance electronics, trendy fashion, top-grade home kitchen equipment, and authentic athletic wear.
        </p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-orange-500 block">50K+</span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1 block">Active Shoppers</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-orange-500 block">10+</span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1 block">Departments</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-orange-500 block">99.8%</span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1 block">On-Time Delivery</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-orange-500 block">24/7</span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-1 block">Customer Service</span>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-black">Why Customers Choose AuraMarket</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Built with customer satisfaction, quality verification, and lightning speed as our foundational pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <Zap className="w-8 h-8 text-orange-400 mb-3" />
            <h4 className="font-bold text-base mb-2">Lightning Express Logistics</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated fulfillment hubs ensuring same-day dispatch and rapid local transit across all states.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <ShieldCheck className="w-8 h-8 text-orange-400 mb-3" />
            <h4 className="font-bold text-base mb-2">100% Authentic Guarantee</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct brand partnerships with Apple, Nike, Sony, and Samsung ensure zero counterfeit merchandise.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <Heart className="w-8 h-8 text-orange-400 mb-3" />
            <h4 className="font-bold text-base mb-2">Dedicated VIP Care</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Human support teams ready to assist with sizing, tracking, and warranty claims around the clock.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-orange-50 border border-orange-200 p-10 rounded-3xl">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Ready to Experience AuraMarket?</h2>
        <p className="text-xs text-gray-600 mb-6">Join thousands of happy shoppers enjoying daily flash deals and exclusive perks.</p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all inline-block"
        >
          Start Shopping Catalog
        </Link>
      </div>
    </div>
  );
};
