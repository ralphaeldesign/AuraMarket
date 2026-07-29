import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, MapPin, Package, LogOut, Save, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useShop();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">You are not logged in</h2>
        <Link to="/login" className="text-xs font-bold text-orange-600 underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* User Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
              <span className="bg-orange-100 text-orange-600 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/orders"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4 text-orange-500" />
            My Orders
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Details Form Left (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg text-gray-900 pb-4 border-b border-gray-100 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" />
            Personal Details
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 font-medium focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 font-medium focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 font-medium focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>

        {/* Saved Addresses Right (1 col) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            Primary Shipping Address
          </h3>

          {user.addresses && user.addresses[0] ? (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
              <span className="font-bold text-gray-900 block">{user.addresses[0].fullName}</span>
              <p className="text-gray-600">{user.addresses[0].street}</p>
              <p className="text-gray-600">{user.addresses[0].city}, {user.addresses[0].state} {user.addresses[0].zipCode}</p>
              <p className="text-gray-600">{user.addresses[0].country}</p>
              <span className="inline-block mt-2 font-bold text-emerald-600 text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                Default Address
              </span>
            </div>
          ) : (
            <p className="text-xs text-gray-500">No default shipping address set.</p>
          )}
        </div>
      </div>
    </div>
  );
};
