import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl font-black text-orange-500 tracking-tighter mb-4">404</div>
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-8">
        Oops! The page you are looking for doesn't exist or might have been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

        <Link
          to="/shop"
          className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Browse Shop Catalog
        </Link>
      </div>
    </div>
  );
};
