import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { HeroSlider } from '../components/home/HeroSlider';
import { FlashSalesSection } from '../components/home/FlashSalesSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedBrands } from '../components/home/FeaturedBrands';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { ProductCard } from '../components/common/ProductCard';
import { Flame, Sparkles, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState<'trending' | 'bestSeller' | 'newArrival' | 'topRated'>('trending');

  const trendingProducts = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const topRated = products.filter((p) => p.isTopRated);

  let displayedProducts = trendingProducts;
  if (activeTab === 'bestSeller') displayedProducts = bestSellers;
  if (activeTab === 'newArrival') displayedProducts = newArrivals;
  if (activeTab === 'topRated') displayedProducts = topRated;

  // Fallback if array is small
  if (displayedProducts.length < 4) {
    displayedProducts = products.slice(0, 8);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Hero Banner Slider */}
      <HeroSlider />

      {/* Featured Categories */}
      <CategoryGrid />

      {/* Flash Sales Deal Section */}
      <FlashSalesSection />

      {/* Tabbed Products Showcase (Trending, Best Sellers, New Arrivals, Top Rated) */}
      <section className="my-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">FEATURED SELECTIONS</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Top picks curated for quality and popularity</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'trending'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Trending Now
            </button>

            <button
              onClick={() => setActiveTab('bestSeller')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'bestSeller'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Best Sellers
            </button>

            <button
              onClick={() => setActiveTab('newArrival')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'newArrival'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Arrivals
            </button>

            <button
              onClick={() => setActiveTab('topRated')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'topRated'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Top Rated
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
          >
            Browse Full Shop Catalog
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>
      </section>

      {/* Featured Brands */}
      <FeaturedBrands />

      {/* Customer Reviews & Testimonials */}
      <CustomerReviews />

      {/* VIP Newsletter */}
      <NewsletterSection />
    </div>
  );
};
