import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  HelpCircle,
  LogOut,
  Package,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { cartCount, wishlistCount, user, logout, products, searchQuery, setSearchQuery } = useShop();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for live search preview
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdowns on route change or click outside
  useEffect(() => {
    setIsCategoryOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar Announcement */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              FLASH OFFER
            </span>
            <span>Up to 50% off select electronics & fashion • Code: <strong className="text-orange-400">AURA10</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Help Center</Link>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-orange-400" /> +1 (800) 555-AURA</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                AURA<span className="text-orange-500">MARKET</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Premium Store
              </span>
            </div>
          </Link>
        </div>

        {/* Categories Dropdown & Live Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 flex-1 max-w-2xl mx-4">
          {/* Categories Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Categories Menu */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    Explore Departments
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.itemCount}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-50 p-2 bg-gray-50">
                    <Link
                      to="/categories"
                      className="block text-center text-xs font-bold text-orange-600 hover:text-orange-700 py-1"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live Search Form */}
          <div ref={searchRef} className="relative flex-1">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products, brands, electronics, fashion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full py-2.5 pl-4 pr-11 bg-gray-100 hover:bg-gray-100/80 focus:bg-white text-sm text-gray-900 rounded-xl border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 overflow-hidden"
                >
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                    Matching Products ({searchResults.length})
                  </div>
                  <div className="flex flex-col gap-1">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50 transition-colors group"
                      >
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-gray-900 truncate group-hover:text-orange-600">
                            {p.name}
                          </h5>
                          <p className="text-[11px] text-gray-500">{p.category} • <strong className="text-gray-900">${p.price.toFixed(2)}</strong></p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-2 py-2 text-center text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                  >
                    See all results for "{searchQuery}"
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-2.5 text-gray-700 hover:text-orange-500 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            className="relative p-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl transition-colors flex items-center justify-center gap-2 px-3 font-semibold text-xs"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold">Cart</span>
          </Link>

          {/* User Account Menu */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="hidden md:inline text-xs font-semibold text-gray-800 max-w-[90px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden md:inline" />
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2.5 text-gray-700 hover:text-orange-500 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2 font-medium text-xs"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* User Dropdown */}
            <AnimatePresence>
              {isUserMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <Package className="w-4 h-4 text-gray-400" />
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                      Saved Wishlist
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 pt-1 mt-1">
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Links (Desktop) */}
      <div className="hidden lg:block bg-gray-50 border-t border-gray-100 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className={`hover:text-orange-600 transition-colors ${location.pathname === '/' ? 'text-orange-600 font-bold' : 'text-gray-700'}`}>
              Home
            </Link>
            <Link to="/shop" className={`hover:text-orange-600 transition-colors ${location.pathname === '/shop' ? 'text-orange-600 font-bold' : 'text-gray-700'}`}>
              Shop Catalog
            </Link>
            <Link to="/categories" className={`hover:text-orange-600 transition-colors ${location.pathname === '/categories' ? 'text-orange-600 font-bold' : 'text-gray-700'}`}>
              All Categories
            </Link>
            <Link to="/shop?flashSale=true" className="text-orange-600 font-bold flex items-center gap-1 hover:text-orange-700">
              <Sparkles className="w-3.5 h-3.5" />
              Flash Deals
            </Link>
            <Link to="/about" className={`hover:text-orange-600 transition-colors ${location.pathname === '/about' ? 'text-orange-600 font-bold' : 'text-gray-700'}`}>
              About Us
            </Link>
            <Link to="/contact" className={`hover:text-orange-600 transition-colors ${location.pathname === '/contact' ? 'text-orange-600 font-bold' : 'text-gray-700'}`}>
              Contact Support
            </Link>
          </div>

          <div className="text-gray-500 font-normal">
            Need help ordering? Call <strong className="text-gray-900 font-semibold">+1 800-555-AURA</strong>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-50 lg:hidden shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold flex items-center justify-center text-base">
                      A
                    </div>
                    <span className="font-extrabold text-lg text-slate-900">AuraMarket</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search Input */}
                <form onSubmit={handleSearchSubmit} className="mb-5 relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-3 pr-10 text-xs bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button type="submit" className="absolute right-2 top-2 text-gray-500">
                    <Search className="w-4 h-4 text-orange-500" />
                  </button>
                </form>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2 font-medium text-sm text-gray-800">
                  <Link to="/" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    Home
                  </Link>
                  <Link to="/shop" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    Shop Catalog
                  </Link>
                  <Link to="/categories" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    Categories
                  </Link>
                  <Link to="/wishlist" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between">
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between">
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  {user ? (
                    <>
                      <Link to="/profile" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        My Profile
                      </Link>
                      <Link to="/orders" className="p-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        My Orders
                      </Link>
                    </>
                  ) : (
                    <Link to="/login" className="p-2.5 rounded-xl bg-orange-500 text-white font-bold text-center mt-2">
                      Sign In / Register
                    </Link>
                  )}
                </div>

                {/* Categories list in mobile drawer */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h6 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Categories
                  </h6>
                  <div className="flex flex-col gap-1 text-xs text-gray-600">
                    {CATEGORIES.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        className="py-1.5 hover:text-orange-500 font-medium"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                <p className="font-semibold text-gray-800 mb-1">AuraMarket Support</p>
                <p>support@auramarket.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
