import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { UserAddress } from '../types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, user, cartSubtotal, discountAmount, shippingFee, cartTotal, createOrder } = useShop();
  const navigate = useNavigate();

  const [address, setAddress] = useState<UserAddress>({
    fullName: user?.name || 'Alex Morgan',
    email: user?.email || 'alex.morgan@example.com',
    phone: user?.phone || '+1 (555) 234-5678',
    street: user?.addresses[0]?.street || '742 Evergreen Terrace',
    city: user?.addresses[0]?.city || 'San Francisco',
    state: user?.addresses[0]?.state || 'CA',
    zipCode: user?.addresses[0]?.zipCode || '94107',
    country: user?.addresses[0]?.country || 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">No items in cart to checkout</h2>
        <Link to="/shop" className="text-xs font-bold text-orange-600 underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    let paymentDesc = 'Credit Card (**** 4242)';
    if (paymentMethod === 'paypal') paymentDesc = 'PayPal Account';
    if (paymentMethod === 'cod') paymentDesc = 'Cash on Delivery';
    if (paymentMethod === 'applepay') paymentDesc = 'Apple Pay Express';

    const newOrder = createOrder(address, paymentDesc);
    if (newOrder) {
      navigate(`/order-success/${newOrder.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to="/cart" className="hover:text-orange-500">Cart</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">Checkout</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">
        Secure Checkout
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping & Payment Left (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">State / Province</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  required
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h2 className="text-lg font-bold text-gray-900">Payment Options</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-xs text-gray-900 block">Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-500">Visa, Mastercard, Amex</span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'paypal' ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-5 h-5 rounded bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                  P
                </div>
                <div className="flex-1">
                  <span className="font-bold text-xs text-gray-900 block">PayPal Express</span>
                  <span className="text-[10px] text-gray-500">Safe online wallet</span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-xs text-gray-900 block">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-500">Pay when order arrives</span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('applepay')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'applepay' ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-bold text-base shrink-0"></span>
                <div className="flex-1">
                  <span className="font-bold text-xs text-gray-900 block">Apple Pay</span>
                  <span className="text-[10px] text-gray-500">Instant biometric checkout</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white rounded-xl border border-gray-200 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Expiration Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white rounded-xl border border-gray-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white rounded-xl border border-gray-200 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Right (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm sticky top-24 space-y-6">
          <h3 className="font-extrabold text-lg text-gray-900 pb-4 border-b border-gray-100">
            Items in Order ({cart.length})
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.images[0]} alt="" className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1 border" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs text-gray-900 truncate">{item.product.name}</h5>
                  <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-xs text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-bold text-gray-900">${shippingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
              <span>Total Due</span>
              <span className="text-orange-600">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Place Order Now (${cartTotal.toFixed(2)})</span>
          </button>

          <p className="text-[10px] text-gray-400 text-center leading-snug">
            By placing your order, you agree to AuraMarket's Terms of Service and Return Policy.
          </p>
        </div>
      </form>
    </div>
  );
};
