import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface Day3PopupModalProps {
  show: boolean;
  onClose: () => void;
}

export function Day3PopupModal({ show, onClose }: Day3PopupModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
        >
          <div className="bg-zinc-900 border-4 border-red-500 rounded-xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl shadow-red-900/20">
            <div className="flex justify-center">
              <AlertTriangle size={48} className="text-red-500 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest text-red-500">Fresh Tire Tracks!</h2>
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/30">
              <p className="text-zinc-300 text-sm italic leading-relaxed">
                "I saw fresh, heavy tire tracks leading up to the Abandoned Warehouse on the edge of town. Nobody has used that place in years, but there's a shiny new padlock on the door."
              </p>
            </div>
            <p className="text-white font-bold text-sm">
              The villain must be hiding there! Head to the Abandoned Warehouse and use your clues to unlock the door.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all active:scale-95 shadow-lg"
            >
              Investigate Warehouse
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
