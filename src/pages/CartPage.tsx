import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2, ArrowRight, ShoppingBag, Tag, ShieldCheck, Truck, ChevronRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8">
          Looks like you haven't added any products to your cart yet. Explore our featured deals and start shopping!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
        >
          Explore Shop Catalog
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">Shopping Cart</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">
        Your Shopping Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List Left (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 bg-gray-50 rounded-xl p-2 shrink-0 flex items-center justify-center">
                <img src={item.product.images[0]} alt="" className="max-h-full max-w-full object-contain" />
              </Link>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  {item.product.category}
                </span>
                <Link
                  to={`/product/${item.product.id}`}
                  className="font-bold text-gray-900 text-sm sm:text-base hover:text-orange-500 transition-colors block truncate"
                >
                  {item.product.name}
                </Link>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 mt-1">
                  {item.selectedColor && <span>Color: <strong className="text-gray-800">{item.selectedColor}</strong></span>}
                  {item.selectedSize && <span>Size: <strong className="text-gray-800">{item.selectedSize}</strong></span>}
                  <span>Price: <strong className="text-gray-900">${item.product.price.toFixed(2)}</strong></span>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center gap-4 sm:gap-6 shrink-0 w-full sm:w-auto justify-between">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-xs min-w-[28px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-gray-900 block">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <Link
              to="/shop"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Right (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm sticky top-24 space-y-6">
          <h3 className="font-extrabold text-lg text-gray-900 pb-4 border-b border-gray-100">
            Order Summary
          </h3>

          {/* Coupon Form */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-orange-500" /> Promo Code
            </label>
            {coupon ? (
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs">
                <div>
                  <span className="font-extrabold text-orange-600">{coupon.code}</span>
                  <p className="text-[11px] text-gray-600">{coupon.description}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 font-bold underline hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AURA10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 py-2 px-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[10px] text-gray-400 mt-1">Try codes: <strong>AURA10</strong> (10% off) or <strong>WELCOME20</strong> (20% off)</p>
          </div>

          {/* Price Calculations */}
          <div className="space-y-3 pt-4 border-t border-gray-100 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Estimated Shipping</span>
              <span className="font-bold text-gray-900">
                {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            {shippingFee > 0 && (
              <p className="text-[10px] text-orange-600 italic">
                Add ${(100 - cartSubtotal).toFixed(2)} more to qualify for Free Shipping!
              </p>
            )}

            <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
              <span>Grand Total</span>
              <span className="text-orange-600">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Action Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-[11px] text-gray-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted SSL 256-bit safe checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
