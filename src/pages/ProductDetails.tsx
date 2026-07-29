import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
  MessageSquare,
  ThumbsUp,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, addToast } = useShop();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  // New review form modal
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      setSelectedImage(0);
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return null;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied!', 'Product link copied to your clipboard.', 'info');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      product.reviews.unshift({
        id: 'rev-' + Date.now(),
        userName: reviewName,
        rating: reviewRating,
        date: new Date().toISOString().split('T')[0],
        comment: reviewComment,
        verifiedPurchase: true,
      });
      product.reviewCount += 1;
      addToast('Review Submitted', 'Thank you for your feedback!', 'success');
      setShowReviewForm(false);
      setReviewName('');
      setReviewComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to="/shop" className="hover:text-orange-500">Shop</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-orange-500">{product.category}</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900 truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm mb-12">
        {/* Gallery Left (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative bg-gray-50 rounded-2xl p-6 flex items-center justify-center min-h-[340px] sm:min-h-[420px] border border-gray-100 overflow-hidden">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="max-h-96 max-w-full object-contain filter drop-shadow-md"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                -{product.discountPercentage}% OFF
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow backdrop-blur transition-colors"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl border-2 p-1 bg-gray-50 flex items-center justify-center shrink-0 transition-all ${
                    selectedImage === idx ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Right (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="bg-orange-50 text-orange-600 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-gray-500">Brand: <strong className="text-gray-900">{product.brand}</strong></span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating & Review Summary */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold text-gray-800 ml-1">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ml-auto">
                ✓ In Stock ({product.stockCount} items)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl sm:text-4xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Select Color: <span className="text-orange-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor === color
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Select Size: <span className="text-orange-600">{selectedSize}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${
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

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-4 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                Buy Now
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`h-12 w-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-red-500'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs text-gray-600">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <RotateCcw className="w-4 h-4 text-orange-500 shrink-0" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Official Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-14">
        <div className="flex items-center gap-8 border-b border-gray-100 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-sm font-extrabold transition-colors border-b-2 shrink-0 ${
              activeTab === 'description'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Product Description
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-extrabold transition-colors border-b-2 shrink-0 ${
              activeTab === 'specs'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Technical Specifications
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-extrabold transition-colors border-b-2 shrink-0 ${
              activeTab === 'reviews'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3">Key Highlights & Features:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-2xl">
            <table className="w-full text-xs text-left text-gray-700">
              <tbody>
                {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-bold text-gray-900 w-1/3 border-b border-gray-100">{key}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-gray-900">{product.rating.toFixed(1)}</span>
                  <div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <MessageSquare className="w-4 h-4" />
                Write a Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 space-y-4">
                <h4 className="font-bold text-sm text-gray-900">Share Your Experience</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Below Average</option>
                      <option value="1">1 Star - Poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Write your honest review here..."
                    className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {/* Review List */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No reviews yet. Be the first to leave a review!</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="my-10">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Products You Might Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
