import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CountdownTimer } from '../common/CountdownTimer';
import { ProductCard } from '../common/ProductCard';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FlashSalesSection: React.FC = () => {
  const { products } = useShop();
  const flashProducts = products.filter((p) => p.isFlashSale);

  if (flashProducts.length === 0) return null;

  return (
    <section className="my-10 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-orange-200/60 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-orange-200/60">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500 text-white rounded-2xl shadow-md shadow-orange-500/30">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">FLASH DEALS</h2>
              <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                24H ONLY
              </span>
            </div>
            <p className="text-xs text-gray-600 font-medium mt-0.5">
              Limited time offers with massive price reductions. Grab before stock runs out!
            </p>
          </div>
        </div>

        {/* Timer & View All */}
        <div className="flex items-center gap-6">
          <CountdownTimer />
          <Link
            to="/shop?flashSale=true"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-orange-100 transition-colors"
          >
            View All Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {flashProducts.map((product) => {
          const soldPercentage = Math.min(100, Math.floor(((product.soldCount || 20) / (product.stockCount + (product.soldCount || 20))) * 100));

          return (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />

              {/* Progress Bar for Flash Items */}
              <div className="mt-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xl">
                <div className="flex items-center justify-between text-[11px] text-gray-600 font-bold mb-1">
                  <span>Sold: {product.soldCount || 45} items</span>
                  <span className="text-orange-600 font-extrabold">{soldPercentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
