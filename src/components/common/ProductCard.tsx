import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useShop();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
        {product.discountPercentage && product.discountPercentage > 0 ? (
          <span className="bg-orange-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
            -{product.discountPercentage}%
          </span>
        ) : null}
        {product.isFlashSale && (
          <span className="bg-slate-900 text-orange-400 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
            FLASH SALE
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-md ${
          isWishlisted
            ? 'bg-red-50 text-red-500 hover:bg-red-100'
            : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist action"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
      </button>

      {/* Product Image Container */}
      <div className="relative bg-gray-50 pt-[85%] overflow-hidden group">
        <Link to={`/product/${product.id}`} className="absolute inset-0 p-4 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4">
          <button
            onClick={() => openQuickView(product)}
            className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 text-white font-medium text-xs rounded-xl backdrop-blur-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
          >
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span className="uppercase tracking-wider text-[11px] text-orange-600 font-semibold">{product.category}</span>
            <span>{product.brand}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-orange-500 transition-colors mb-2 block"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-800 ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.stockCount <= 5 && product.stockCount > 0 && (
              <span className="text-[10px] text-red-500 font-medium block">
                Only {product.stockCount} left!
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
