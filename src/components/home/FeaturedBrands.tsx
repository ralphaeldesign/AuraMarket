import React from 'react';
import { Link } from 'react-router-dom';

const BRANDS = [
  { name: 'Apple', logo: ' Apple', tagline: 'Innovate your world' },
  { name: 'Nike', logo: 'Nike', tagline: 'Just Do It' },
  { name: 'Sony', logo: 'SONY', tagline: 'Make.Believe' },
  { name: 'Samsung', logo: 'SAMSUNG', tagline: 'Do What You Can\'t' },
  { name: 'Adidas', logo: 'adidas', tagline: 'Impossible Is Nothing' },
  { name: 'Aura', logo: 'AURA', tagline: 'Premium Sound & Tech' },
];

export const FeaturedBrands: React.FC = () => {
  return (
    <section className="my-12 py-8 bg-white rounded-3xl border border-gray-100 shadow-sm px-6">
      <div className="text-center mb-6">
        <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Official Partners</h3>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">Featured Premium Brands</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            to={`/shop?brand=${encodeURIComponent(brand.name)}`}
            className="p-4 rounded-2xl bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 transition-all text-center group flex flex-col items-center justify-center h-24"
          >
            <span className="text-lg font-black tracking-tight text-gray-700 group-hover:text-orange-600 transition-colors">
              {brand.logo}
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-1 group-hover:text-gray-600">
              {brand.tagline}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
