import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { LogIn, UserCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useShop();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, 'Alex Morgan');
      navigate('/profile');
    }
  };

  const handleDemoFill = () => {
    setEmail('alex.morgan@example.com');
    setPassword('password123');
    login('alex.morgan@example.com', 'Alex Morgan');
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-xl">
            A
          </div>
          <h1 className="text-2xl font-black text-gray-900">Sign In To AuraMarket</h1>
          <p className="text-xs text-gray-500 mt-1">Access saved orders, wishlist, and fast checkout</p>
        </div>

        {/* Quick Demo Fill Button */}
        <button
          onClick={handleDemoFill}
          className="w-full py-2.5 bg-orange-50 text-orange-600 border border-orange-200 font-bold text-xs rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          Quick Demo One-Click Sign In
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-orange-600 hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};
