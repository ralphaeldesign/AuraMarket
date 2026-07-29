import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 2-4 business days. Express overnight delivery is available at checkout for urgent orders.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return policy on all unworn fashion, unopened electronics, and original packaged items.',
  },
  {
    q: 'How do I apply coupon codes?',
    a: 'You can enter coupon codes during checkout or inside the shopping cart summary drawer.',
  },
  {
    q: 'Are all products authentic?',
    a: 'Yes, 100%. We source directly from official manufacturers and authorized distributors.',
  },
];

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      addToast('Message Sent!', 'Thank you for reaching out. Our support team will reply within 2 hours.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="bg-orange-100 text-orange-600 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
          WE ARE HERE TO HELP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Get In Touch With Us</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Have a question about an order, shipping status, or product details? Send us a message below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Left (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Send Us A Direct Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Smith"
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Order Tracking Inquiry"
                className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you today?"
                className="w-full p-3 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        </div>

        {/* Contact Info & Info Right (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
            <h3 className="font-extrabold text-lg text-white">Direct Contact Info</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Headquarters</h5>
                  <p className="text-slate-400">100 Market Plaza, Suite 400, San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Phone Hotline</h5>
                  <p className="text-slate-400">+1 (800) 555-AURA (Mon - Sun, 24/7)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Email Support</h5>
                  <p className="text-slate-400">support@auramarket.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-orange-500" />
              Frequently Asked Questions
            </h3>

            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left font-bold text-xs text-gray-800 hover:text-orange-600 flex items-center justify-between py-1"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-gray-600 mt-1 pl-1 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
