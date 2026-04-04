import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CluePopupModal({ clue }: { clue: string | null }) {
  return (
    <AnimatePresence>
      {clue && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
        >
          <div className="bg-black/90 border-4 border-emerald-500 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <h3 className="text-emerald-500 font-black uppercase tracking-widest mb-4 text-xl">Clue Found!</h3>
            <div className="text-8xl font-black text-white tracking-tighter">
              {clue}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
