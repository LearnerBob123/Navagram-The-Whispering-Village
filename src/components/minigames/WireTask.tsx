import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const COLORS = ['red', 'blue', 'yellow', 'green'];
const COLOR_MAP: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
};

export function WireTask({ onComplete, onClose }: { onComplete: () => void, onClose: () => void }) {
  const [leftWires] = useState(() => [...COLORS].sort(() => Math.random() - 0.5));
  const [rightWires] = useState(() => [...COLORS].sort(() => Math.random() - 0.5));
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({}); // leftColor -> rightColor

  const handleLeftClick = (color: string) => {
    if (!connections[color]) setSelectedLeft(color);
  };

  const handleRightClick = (color: string) => {
    if (selectedLeft && !Object.values(connections).includes(color)) {
      if (selectedLeft === color) {
        setConnections(prev => ({ ...prev, [selectedLeft]: color }));
        setSelectedLeft(null);
      } else {
        setSelectedLeft(null); // wrong connection, reset selection
      }
    }
  };

  useEffect(() => {
    if (Object.keys(connections).length === COLORS.length) {
      setTimeout(onComplete, 500);
    }
  }, [connections, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-zinc-900 border-4 border-zinc-700 rounded-xl p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Fix the Drone</h2>
        <p className="text-zinc-400 text-sm mb-6">Connect the matching wires to extract the data.</p>
        
        <div className="flex justify-between items-center px-8">
          <div className="flex flex-col gap-6">
            {leftWires.map(color => (
              <div key={`l-${color}`} className="flex items-center gap-2">
                <div 
                  onClick={() => handleLeftClick(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-4 ${connections[color] ? 'border-zinc-500 opacity-50' : selectedLeft === color ? 'border-white scale-110' : 'border-transparent'} ${COLOR_MAP[color]}`}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-6">
            {rightWires.map(color => (
              <div key={`r-${color}`} className="flex items-center gap-2">
                <div 
                  onClick={() => handleRightClick(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-4 ${Object.values(connections).includes(color) ? 'border-zinc-500 opacity-50' : 'border-transparent'} ${COLOR_MAP[color]}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
