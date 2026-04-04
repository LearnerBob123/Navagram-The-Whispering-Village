import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function NoCluePopupModal({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
        >
          <div className="bg-black/90 border-4 border-red-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.5)] max-w-md">
            <h3 className="text-red-500 font-black uppercase tracking-widest mb-2 text-2xl">Nothing Found!</h3>
            <div className="text-xl font-bold text-white tracking-tight">
              -15 Seconds Deducted
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
