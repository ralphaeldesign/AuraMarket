import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, ArrowRight, Home, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, orders } = useShop();

  const order = (id && getOrderById(id)) || orders[0];

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <Link to="/" className="text-xs font-bold text-orange-600 underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl text-center space-y-8"
      >
        {/* Checkmark Animation */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="bg-emerald-50 text-emerald-600 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            ORDER CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-2">
            We have received your order <strong>#{order.id}</strong>. A confirmation email has been dispatched to <strong>{order.shippingAddress.email}</strong>.
          </p>
        </div>

        {/* Order Progress Tracker */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-500" />
            Estimated Delivery: <span className="text-orange-600">{order.estimatedDelivery}</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
            <div className="flex flex-col items-center gap-1 text-orange-600">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">✓</div>
              <span>Processing</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">2</div>
              <span>Out for Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">3</div>
              <span>Delivered</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-orange-500 h-full w-1/3 rounded-full" />
          </div>

          <div className="text-xs text-gray-500 pt-2 flex flex-wrap justify-between gap-2 border-t border-gray-200/60">
            <span>Tracking #: <strong className="text-gray-900">{order.trackingNumber}</strong></span>
            <span>Payment Method: <strong className="text-gray-900">{order.paymentMethod}</strong></span>
          </div>
        </div>

        {/* Order Items Receipt Breakdown */}
        <div className="text-left space-y-3">
          <h4 className="font-extrabold text-sm text-gray-900 pb-2 border-b border-gray-100">
            Order Receipt Summary
          </h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-3">
                  <img src={item.productImage} alt="" className="w-10 h-10 object-contain rounded bg-gray-50 p-1 border" />
                  <div>
                    <h5 className="font-bold text-gray-900">{item.productName}</h5>
                    <span className="text-gray-500 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-gray-900 pt-2 border-t border-gray-100">
              <span>Total Paid</span>
              <span className="text-orange-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-100">
          <Link
            to="/orders"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            View Order History
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
