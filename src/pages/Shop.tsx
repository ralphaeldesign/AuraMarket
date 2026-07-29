import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/categories';
import {
  SlidersHorizontal,
  X,
  Filter,
  Grid,
  List,
  Star,
  RotateCcw,
  Search,
  ShoppingCart,
  Heart,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const Shop: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, openQuickView } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters state initialization
  const urlCategory = searchParams.get('category') || 'All';
  const urlBrand = searchParams.get('brand') || '';
  const urlSearch = searchParams.get('search') || '';
  const urlFlashSale = searchParams.get('flashSale') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(urlBrand ? [urlBrand] : []);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [flashSaleOnly, setFlashSaleOnly] = useState(urlFlashSale);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL changes
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category') || 'All');
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('brand')) setSelectedBrands([searchParams.get('brand') || '']);
    if (searchParams.get('flashSale') === 'true') setFlashSaleOnly(true);
  }, [searchParams]);

  // Extract all available brands
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(2500);
    setMinRating(0);
    setInStockOnly(false);
    setFlashSaleOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filtered & sorted products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }
        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
        // Rating filter
        if (product.rating < minRating) {
          return false;
        }
        // In stock only
        if (inStockOnly && !product.inStock) {
          return false;
        }
        // Flash sale only
        if (flashSaleOnly && !product.isFlashSale) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchBrand && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: popular
        return b.reviewCount - a.reviewCount;
      });
  }, [
    products,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    flashSaleOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Breadcrumb & Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">Shop Catalog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {/* Controls: Search input, Sort, Grid/List view */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-orange-500 shadow-sm"
            >
              <option value="popular">Sort by: Most Popular</option>
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Sort by: Top Rated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-500" />
              Filter Products
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search filter input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-3 pr-8 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500"
              />
              <Search className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Category</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-orange-500 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-orange-500 text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-80">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span className="uppercase tracking-wider">Price Range</span>
              <span className="text-orange-600">${minPrice} - ${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2500"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 bg-gray-200 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Brands</label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-xs text-gray-700 font-medium cursor-pointer hover:text-orange-600">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-orange-500 rounded"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Minimum Rating</label>
            <div className="flex items-center gap-1">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    minRating === stars
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{stars}+</span>
                  <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <label className="flex items-center gap-2 text-xs text-gray-800 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-orange-500 rounded"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-gray-800 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={flashSaleOnly}
                onChange={(e) => setFlashSaleOnly(e.target.checked)}
                className="accent-orange-500 rounded"
              />
              <span className="text-orange-600 font-bold">Flash Sales Deals Only ⚡</span>
            </label>
          </div>
        </div>

        {/* Product Catalog Display */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-2xl font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold text-gray-900">No matching products found</h3>
              <p className="text-xs text-gray-500 max-w-sm">
                Try adjusting your search keywords, price range sliders, or department filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* List View Mode */
            <div className="flex flex-col gap-4">
              {filteredProducts.map((product) => {
                const isWishlisted = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <div className="w-full sm:w-48 h-48 bg-gray-50 rounded-xl p-3 flex items-center justify-center shrink-0">
                      <img src={product.images[0]} alt="" className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">{product.category}</span>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.shortDescription}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-xs font-bold text-gray-800 ml-1">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openQuickView(product)}
                          className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`p-2.5 rounded-xl border transition-colors ${
                            isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/60 z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 top-16 bg-white z-50 lg:hidden rounded-t-3xl p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="font-extrabold text-base text-gray-900">Filter Products</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        selectedCategory === 'All' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          selectedCategory === cat.name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Max Price: ${maxPrice}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="w-1/3 py-3 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-2/3 py-3 bg-orange-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Apply ({filteredProducts.length} Results)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
