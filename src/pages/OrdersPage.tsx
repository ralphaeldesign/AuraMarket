import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Truck, CheckCircle2, ArrowRight, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">No Past Orders Found</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8">
          You haven't placed any orders yet. Once you make a purchase, track your shipping progress here!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">Order History</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">
        Your Orders ({orders.length})
      </h1>

      <div className="space-y-6">
        {orders.map((order) => {
          let badgeColor = 'bg-blue-50 text-blue-600 border-blue-200';
          if (order.status === 'Delivered') badgeColor = 'bg-emerald-50 text-emerald-600 border-emerald-200';
          if (order.status === 'Processing') badgeColor = 'bg-amber-50 text-amber-600 border-amber-200';

          return (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-base text-gray-900">#{order.id}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mt-0.5 block">Placed on {order.date}</span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-500 block">Total Amount</span>
                  <span className="text-base font-extrabold text-orange-600">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Items list */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={item.productImage} alt="" className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 border" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-gray-900 truncate">{item.productName}</h5>
                      <span className="text-[11px] text-gray-500">Qty: {item.quantity} • ${item.price.toFixed(2)} each</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-orange-500" />
                  Tracking Number: <strong className="text-gray-900">{order.trackingNumber}</strong>
                </span>

                <Link
                  to={`/order-success/${order.id}`}
                  className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 underline"
                >
                  View Full Receipt & Progress →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
