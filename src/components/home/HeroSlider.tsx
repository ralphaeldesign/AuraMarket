import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    id: 1,
    title: 'AuraSound Max Wireless',
    subtitle: 'NEXT-GEN ACTIVE NOISE CANCELLATION',
    discount: 'SAVE 30% TODAY',
    description: 'Immerse yourself in pure studio sound with 40-hour ultra battery endurance and adaptive spatial audio.',
    buttonText: 'Shop Headphones Now',
    link: '/product/prod-1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-slate-900 via-slate-800 to-orange-950',
  },
  {
    id: 2,
    title: 'AuraPro Vision 5G Smartphone',
    subtitle: 'REDEFINING MOBILE PHOTOGRAPHY',
    discount: 'UP TO $200 OFF',
    description: '200MP Triple AI Camera, 120Hz LTPO AMOLED curved screen, and 65W ultra-fast charging.',
    buttonText: 'Explore Smartphones',
    link: '/product/prod-2',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-slate-950 via-zinc-900 to-slate-900',
  },
  {
    id: 3,
    title: 'Urban Runner Pro Sneakers',
    subtitle: 'UNMATCHED COMFORT & ENERGY RETURN',
    discount: 'FLASH SALE DEAL',
    description: 'Breathable flyknit design with responsive cloud-foam cushioning engineered for daily athletic performance.',
    buttonText: 'Shop Footwear',
    link: '/product/prod-9',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-orange-950 via-slate-900 to-zinc-900',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden rounded-3xl shadow-2xl my-4 sm:my-6 border border-slate-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative min-h-[440px] sm:min-h-[500px] flex items-center p-6 sm:p-12 bg-gradient-to-r ${slide.bgGradient}`}
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
            {/* Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 fill-orange-400" />
                {slide.subtitle}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                {slide.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={slide.link}
                  className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 flex items-center gap-2 group"
                >
                  {slide.buttonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-xs font-bold text-orange-400 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  {slide.discount}
                </span>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative max-w-sm w-full bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl flex items-center justify-center h-64 sm:h-80"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl backdrop-blur-md border border-slate-800">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-orange-500' : 'w-2 bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
