import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationStack: React.FC = () => {
  const { notifications, dismissNotification } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {notifications.map((notif, index) => {
          // Stacking visual offset
          const offset = index * 4;
          const scale = 1 - index * 0.05;
          const opacity = 1 - index * 0.15;

          return (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity,
                y: -offset,
                scale,
                transition: { type: 'spring', stiffness: 450, damping: 25 },
              }}
              exit={{ opacity: 0, scale: 0.85, x: 50, transition: { duration: 0.2 } }}
              className="pointer-events-auto w-full glass-panel-glow p-3.5 rounded-xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl flex items-start gap-3 relative overflow-hidden"
              style={{
                background: 'rgba(11, 20, 38, 0.92)',
              }}
            >
              <div className="mt-0.5 p-1.5 rounded-lg bg-blue-500/20 text-cyan-400 border border-cyan-400/30">
                {notif.type === 'alert' ? (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                ) : notif.type === 'info' ? (
                  <Info className="w-4 h-4 text-blue-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 font-body">
                  {notif.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => dismissNotification(notif.id)}
                className="absolute top-2.5 right-2 text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
