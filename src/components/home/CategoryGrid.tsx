import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Layers, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">SHOP BY CATEGORY</h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Explore our wide selection of departments</p>
        </div>
        <Link
          to="/categories"
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          All Departments <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CATEGORIES.slice(0, 6).map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-50 p-2 mb-3 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h4>
              <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                {cat.itemCount} items
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
