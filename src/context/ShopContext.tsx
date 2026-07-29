import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  Order,
  UserProfile,
  ToastMessage,
  UserAddress,
} from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  user: UserProfile | null;
  orders: Order[];
  toasts: ToastMessage[];
  coupon: Coupon | null;
  quickViewProduct: Product | null;
  searchQuery: string;

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Recently viewed
  addRecentlyViewed: (product: Product) => void;

  // Quick view
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search
  setSearchQuery: (query: string) => void;

  // Toast notifications
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;

  // Auth actions
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Order actions
  createOrder: (shippingAddress: UserAddress, paymentMethod: string) => Order | null;
  getOrderById: (id: string) => Order | undefined;

  // Derived metrics
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'AURA10', discountPercent: 10, description: '10% off on your order' },
  { code: 'WELCOME20', discountPercent: 20, description: '20% off for new customers' },
  { code: 'FLASH30', discountPercent: 30, description: '30% off special deal' },
];

const DEFAULT_USER: UserProfile = {
  id: 'usr-889',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  addresses: [
    {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
    },
  ],
  defaultAddressIndex: 0,
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('auramarket_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('auramarket_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('auramarket_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('auramarket_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('auramarket_orders');
      if (saved) return JSON.parse(saved);
      // Mock initial order
      return [
        {
          id: 'ORD-98231',
          date: '2026-07-20',
          items: [
            {
              productId: 'prod-1',
              productName: 'AuraSound Max Wireless Headphones',
              productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
              price: 249.99,
              quantity: 1,
              color: 'Matte Black',
            },
          ],
          subtotal: 249.99,
          discount: 25.00,
          shipping: 0,
          total: 224.99,
          status: 'Delivered',
          shippingAddress: DEFAULT_USER.addresses[0],
          paymentMethod: 'Credit Card (**** 4242)',
          trackingNumber: 'TRK-90812349',
          estimatedDelivery: '2026-07-23',
        },
      ];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('auramarket_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auramarket_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('auramarket_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auramarket_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auramarket_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('auramarket_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast notification helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart logic
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor, selectedSize }];
      }
    });

    addToast('Added to Cart', `${product.name} (${quantity}x) has been added to your shopping cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item Removed', 'The item was removed from your cart.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (found) {
      setCoupon(found);
      addToast('Coupon Applied!', `${found.discountPercent}% discount applied to your order.`, 'success');
      return true;
    } else {
      addToast('Invalid Coupon', 'The coupon code provided is invalid or expired. Try "AURA10" or "WELCOME20".', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('Coupon Removed', 'Discount coupon removed from order.', 'info');
  };

  // Wishlist logic
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast('Wishlist Updated', `Removed ${product.name} from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Wishlist Updated', `Saved ${product.name} to your wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // Recently viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  // Quick view
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Auth actions
  const login = (email: string, name = 'Alex Morgan') => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(Math.random() * 1000),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      addresses: DEFAULT_USER.addresses,
      defaultAddressIndex: 0,
    };
    setUser(newUser);
    addToast('Welcome Back!', `Logged in successfully as ${name}`, 'success');
  };

  const register = (name: string, email: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    addToast('Logged Out', 'You have been logged out safely.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
    addToast('Profile Updated', 'Your user information has been saved.', 'success');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = coupon ? (cartSubtotal * coupon.discountPercent) / 100 : 0;
  const shippingFee = cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 15.0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Create Order
  const createOrder = (shippingAddress: UserAddress, paymentMethod: string): Order | null => {
    if (cart.length === 0) return null;

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: cartTotal,
      status: 'Processing',
      shippingAddress,
      paymentMethod,
      trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        user,
        orders,
        toasts,
        coupon,
        quickViewProduct,
        searchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        addRecentlyViewed,
        openQuickView,
        closeQuickView,
        setSearchQuery,
        addToast,
        dismissToast,
        login,
        register,
        logout,
        updateProfile,
        createOrder,
        getOrderById,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
