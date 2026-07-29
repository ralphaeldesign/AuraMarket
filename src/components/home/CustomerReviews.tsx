import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Ordered the AuraSound Max headphones on Tuesday and they arrived on Wednesday! Incredible sound cancellation and the orange design details look so sleek.',
    product: 'AuraSound Max Headphones',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Best e-commerce experience I have had in a long time. The quick view modal made shopping fast, and checkout took under 30 seconds!',
    product: 'AuraPro Vision Smartphone',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'The Urban Runner sneakers fit perfectly. Customer support responded to my sizing question in less than 5 minutes. 10/10 service!',
    product: 'Urban Runner Pro Sneakers',
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="my-14">
      <div className="text-center mb-10">
        <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          TESTIMONIALS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">What Our Customers Say</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1">
          Over 50,000+ satisfied shoppers trust AuraMarket for quality products and fast delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-100 -z-0" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center text-amber-400 gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-6">
                "{review.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="font-bold text-xs text-gray-900">{review.name}</h5>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                </div>
                <span className="text-[11px] text-gray-400 block">{review.product}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
