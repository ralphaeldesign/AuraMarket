import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">Categories</span>
      </div>

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="bg-orange-100 text-orange-600 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
          DEPARTMENTS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Explore All Categories</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Browse through our curated departments to find high quality electronics, fashion, footwear, groceries and home essentials.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="bg-orange-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                      {cat.itemCount} Items Available
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">{cat.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700 pt-3 border-t border-gray-100">
                  <span>Browse {cat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
