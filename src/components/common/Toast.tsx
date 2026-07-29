import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let bgColor = 'bg-slate-900 text-white border-l-4 border-orange-500';
          let iconColor = 'text-orange-400';

          if (toast.type === 'error') {
            bgColor = 'bg-slate-900 text-white border-l-4 border-red-500';
            iconColor = 'text-red-400';
            Icon = AlertCircle;
          } else if (toast.type === 'info') {
            bgColor = 'bg-slate-900 text-white border-l-4 border-blue-500';
            iconColor = 'text-blue-400';
            Icon = Info;
          } else if (toast.type === 'warning') {
            bgColor = 'bg-slate-900 text-white border-l-4 border-amber-500';
            iconColor = 'text-amber-400';
            Icon = AlertTriangle;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`pointer-events-auto p-4 rounded-xl shadow-2xl flex items-start gap-3 border border-slate-800 ${bgColor}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 pr-2">
                <h4 className="font-semibold text-sm leading-tight text-white">{toast.title}</h4>
                {toast.message && <p className="text-xs text-slate-300 mt-1 leading-snug">{toast.message}</p>}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
