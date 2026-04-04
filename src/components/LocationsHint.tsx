import React, { useState } from 'react';
import { Compass, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LocationsHint() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-24 right-4 z-40 flex flex-col items-end">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900/90 border-2 border-emerald-500/50 p-3 rounded-full text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-all shadow-lg backdrop-blur-md"
        title="Locations Hint"
      >
        <Compass size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="mt-4 bg-zinc-950/95 border-2 border-emerald-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-xl w-64"
          >
            <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
              <h3 className="text-emerald-400 font-black uppercase text-sm tracking-wider flex items-center gap-2">
                <Compass size={16} /> Map Legend
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <ul className="text-xs text-zinc-300 space-y-2 font-medium">
              <li className="flex justify-between"><span className="text-emerald-500/80">North</span> <span>North Fields</span></li>
              <li className="flex justify-between"><span className="text-emerald-500/80">South</span> <span>Abandoned Warehouse</span></li>
              <li className="flex justify-between"><span className="text-emerald-500/80">South West</span> <span>Library</span></li>
              <li className="flex justify-between"><span className="text-emerald-500/80">West South</span> <span>Village Hall</span></li>
              <li className="flex justify-between"><span className="text-emerald-500/80">Centre</span> <span>Old Banyan Tree</span></li>
              <li className="flex justify-between"><span className="text-emerald-500/80">North West</span> <span>Chai Nashta Point</span></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
