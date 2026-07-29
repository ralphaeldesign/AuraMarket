import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, ShoppingCart, Heart, Check, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();

  if (!quickViewProduct) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            aria-label="Close Quick View"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto p-6 sm:p-8 gap-8">
            {/* Gallery Left */}
            <div className="flex flex-col gap-4">
              <div className="relative bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-72 sm:h-80 border border-gray-100">
                <img
                  src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
                {quickViewProduct.discountPercentage && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                    -{quickViewProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Image Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-gray-50 flex items-center justify-center shrink-0 transition-all ${
                        selectedImage === idx ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Right */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">
                  <span>{quickViewProduct.category}</span>
                  <span>•</span>
                  <span className="text-gray-500">{quickViewProduct.brand}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-gray-800 ml-1">
                      {quickViewProduct.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">({quickViewProduct.reviewCount} customer reviews)</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                    In Stock ({quickViewProduct.stockCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Color Selection */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedColor === color
                              ? 'border-orange-500 bg-orange-50 text-orange-600 font-semibold shadow-sm'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Size: <span className="font-normal text-gray-500">{selectedSize}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all ${
                            selectedSize === size
                              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Quantity */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200 text-sm font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold text-sm min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockCount, q + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200 text-sm font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 rounded-xl border transition-all ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-red-500'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                {/* View Full Product Details Link */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-orange-500" /> Free Shipping over $100</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> 2-Yr Warranty</span>
                  </div>
                  <Link
                    to={`/product/${quickViewProduct.id}`}
                    onClick={closeQuickView}
                    className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 underline"
                  >
                    Full Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
